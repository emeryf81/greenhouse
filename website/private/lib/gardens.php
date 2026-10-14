<?php
/**
 * Hortulus web – gardens: access, documents, photos, files, the Home Assistant link.
 */

declare(strict_types=1);

require_once __DIR__ . '/auth.php';

const DOC_KEYS = ['main', 'syslog', 'archive'];
const PRESETS = [
    'nl_be' => 'Nederland / België', 'fr_north' => 'France (Nord) / Frankrijk (noord)', 'de_central' => 'Deutschland (Mitte)',
    'uk_south' => 'United Kingdom (south)', 'uk_north' => 'United Kingdom (north)', 'scandinavia_south' => 'Scandinavia (south)',
    'mediterranean' => 'Méditerranée / Middellandse Zee', 'au_melbourne' => 'Australia (Melbourne)',
    'nz_christchurch' => 'New Zealand (Christchurch)', 'za_highveld' => 'South Africa (Highveld)',
];

/** Gardens the user can open: own ones and shared ones, with the user's role. */
function user_gardens(int $userId): array
{
    return q(
        'SELECT g.*, u.name AS owner_name, "owner" AS my_role FROM ' . tbl('gardens') . ' g JOIN ' . tbl('users') . ' u ON u.id = g.owner_id WHERE g.owner_id = ?
         UNION ALL
         SELECT g.*, u.name AS owner_name, m.role AS my_role FROM ' . tbl('gardens') . ' g JOIN ' . tbl('garden_members') . ' m ON m.garden_id = g.id
           JOIN ' . tbl('users') . ' u ON u.id = g.owner_id WHERE m.user_id = ?
         ORDER BY title',
        [$userId, $userId]
    )->fetchAll();
}

/**
 * The garden if the user may open it (with ``my_role``: owner, editor or viewer), else null.
 * Without membership, a read-only view granted to this session (a shared link, a public
 * garden, the administrator's look) gives ``my_role`` "visitor".
 */
function garden_for(string $gardenId, ?array $user): ?array
{
    if (!preg_match('/^[a-f0-9]{32}$/', $gardenId)) {
        return null;
    }
    if ($user !== null) {
        foreach (user_gardens((int) $user['id']) as $g) {
            if ($g['id'] === $gardenId) {
                return $g;
            }
        }
    }
    return visitor_garden($gardenId);
}

function is_visitor(array $garden): bool
{
    return ($garden['my_role'] ?? '') === 'visitor';
}

function can_edit(array $garden): bool
{
    return in_array($garden['my_role'], ['owner', 'editor'], true);
}

function require_garden(string $gardenId, ?array $user, bool $edit = false): array
{
    $garden = garden_for($gardenId, $user);
    if ($garden === null || ($edit && !can_edit($garden))) {
        if (str_contains((string) ($_SERVER['SCRIPT_NAME'] ?? ''), 'api.php') || str_contains((string) ($_SERVER['SCRIPT_NAME'] ?? ''), 'media.php')) {
            json_out(['ok' => false, 'error' => 'forbidden'], 403);
        }
        http_response_code(404);
        exit('Not found');
    }
    return $garden;
}

function create_garden(array $user, string $title, float $lat, float $lon, string $preset): string
{
    $id = uuid32();
    q(
        'INSERT INTO ' . tbl('gardens') . ' (id, owner_id, title, preset, latitude, longitude, time_zone, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [$id, $user['id'], mb_substr($title, 0, 100), isset(PRESETS[$preset]) ? $preset : 'nl_be', $lat, $lon, DEFAULT_TIMEZONE, now_utc()]
    );
    audit('garden_create', $title);
    return $id;
}

/** Delete a garden; documents, photos, files and links go with it (foreign keys). */
function delete_garden(string $gardenId): void
{
    q('DELETE FROM ' . tbl('gardens') . ' WHERE id = ?', [$gardenId]);
}

// --- documents ----------------------------------------------------------------
function load_documents(string $gardenId): array
{
    $docs = ['main' => null, 'syslog' => null, 'archive' => null, 'revision' => 0];
    foreach (q('SELECT doc_key, content, revision FROM ' . tbl('documents') . ' WHERE garden_id = ?', [$gardenId]) as $row) {
        $docs[$row['doc_key']] = $row['content'];
        if ($row['doc_key'] === 'main') {
            $docs['revision'] = (int) $row['revision'];
        }
    }
    return $docs;
}

/**
 * Save one document.  For the main document the client sends the revision it
 * started from; a mismatch means someone else saved in between (409).
 * Keeps a compressed copy of the main document every 30 minutes (and the last 40).
 */
function save_document(string $gardenId, string $key, ?string $content, int $userId, ?int $baseRevision = null): array
{
    if (!in_array($key, DOC_KEYS, true)) {
        return ['ok' => false, 'error' => 'bad_key'];
    }
    if ($content === null) {
        q('DELETE FROM ' . tbl('documents') . ' WHERE garden_id = ? AND doc_key = ?', [$gardenId, $key]);
        return ['ok' => true];
    }
    if (strlen($content) > 40 * 1024 * 1024 || json_decode($content) === null) {
        return ['ok' => false, 'error' => 'bad_document'];
    }
    $pdo = db();
    $pdo->beginTransaction();
    try {
        $current = q('SELECT revision FROM ' . tbl('documents') . ' WHERE garden_id = ? AND doc_key = ? FOR UPDATE', [$gardenId, $key])->fetchColumn();
        if ($key === 'main' && $current !== false && $baseRevision !== null && (int) $current !== $baseRevision) {
            $pdo->rollBack();
            return ['ok' => false, 'error' => 'conflict', 'revision' => (int) $current];
        }
        $revision = $current === false ? 1 : (int) $current + 1;
        q(
            'INSERT INTO ' . tbl('documents') . ' (garden_id, doc_key, content, revision, updated_by, updated_at) VALUES (?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE content = VALUES(content), revision = VALUES(revision), updated_by = VALUES(updated_by), updated_at = VALUES(updated_at)',
            [$gardenId, $key, $content, $revision, $userId, now_utc()]
        );
        if ($key === 'main') {
            $last = q('SELECT MAX(created_at) FROM ' . tbl('document_versions') . ' WHERE garden_id = ?', [$gardenId])->fetchColumn();
            if (!$last || strtotime($last . ' UTC') < time() - 1800) {
                $packed = gzcompress($content, 6);
                q(
                    'INSERT INTO ' . tbl('document_versions') . ' (garden_id, content, bytes, created_by, created_at) VALUES (?, ?, ?, ?, ?)',
                    [$gardenId, $packed, strlen($content), $userId, now_utc()]
                );
                $keep = q('SELECT id FROM ' . tbl('document_versions') . ' WHERE garden_id = ? ORDER BY id DESC LIMIT 1 OFFSET 39', [$gardenId])->fetchColumn();
                if ($keep) {
                    q('DELETE FROM ' . tbl('document_versions') . ' WHERE garden_id = ? AND id <= ?', [$gardenId, $keep]);
                }
            }
            q('UPDATE ' . tbl('gardens') . ' SET updated_at = ? WHERE id = ?', [now_utc(), $gardenId]);
        }
        $pdo->commit();
    } catch (Throwable $err) {
        $pdo->rollBack();
        throw $err;
    }
    return ['ok' => true, 'revision' => $revision];
}

// --- photos -------------------------------------------------------------------
/**
 * Store an uploaded image: decoded and re-encoded with GD (strips EXIF and any
 * hidden payload), turned upright, at most 1600 px, plus a 512 px thumbnail.
 */
function store_photo(string $gardenId, int $userId, string $tmpPath): array
{
    $info = @getimagesize($tmpPath);
    $allowed = [IMAGETYPE_JPEG => 'jpeg', IMAGETYPE_PNG => 'png', IMAGETYPE_WEBP => 'webp', IMAGETYPE_GIF => 'gif'];
    if ($info === false || !isset($allowed[$info[2]]) || $info[0] < 1 || $info[1] < 1 || $info[0] * $info[1] > 60_000_000) {
        return ['ok' => false, 'error' => 'not_an_image'];
    }
    $src = match ($info[2]) {
        IMAGETYPE_JPEG => @imagecreatefromjpeg($tmpPath),
        IMAGETYPE_PNG => @imagecreatefrompng($tmpPath),
        IMAGETYPE_WEBP => @imagecreatefromwebp($tmpPath),
        IMAGETYPE_GIF => @imagecreatefromgif($tmpPath),
    };
    if (!$src) {
        return ['ok' => false, 'error' => 'not_an_image'];
    }
    if ($info[2] === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
        $exif = @exif_read_data($tmpPath);
        $src = match ((int) ($exif['Orientation'] ?? 1)) {
            3 => imagerotate($src, 180, 0),
            6 => imagerotate($src, -90, 0),
            8 => imagerotate($src, 90, 0),
            default => $src,
        };
    }
    $full = resize_jpeg($src, 1600, 82);
    $thumb = resize_jpeg($src, 512, 78);
    $w = imagesx($src);
    $h = imagesy($src);
    $scale = min(1, 1600 / max($w, $h));
    $id = uuid32();
    q(
        'INSERT INTO ' . tbl('photos') . ' (id, garden_id, user_id, mime, width, height, bytes, data, thumb, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [$id, $gardenId, $userId, 'image/jpeg', (int) round($w * $scale), (int) round($h * $scale), strlen($full), $full, $thumb, now_utc()]
    );
    return ['ok' => true, 'id' => $id];
}

function resize_jpeg(GdImage $src, int $max, int $quality): string
{
    $w = imagesx($src);
    $h = imagesy($src);
    $scale = min(1, $max / max($w, $h));
    $nw = max(1, (int) round($w * $scale));
    $nh = max(1, (int) round($h * $scale));
    $dst = imagecreatetruecolor($nw, $nh);
    imagefill($dst, 0, 0, imagecolorallocate($dst, 255, 255, 255)); // transparent PNGs on white
    imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);
    ob_start();
    imagejpeg($dst, null, $quality);
    return (string) ob_get_clean();
}

// --- files (generated PDFs) ----------------------------------------------------
function store_file(string $gardenId, int $userId, string $filename, string $data): array
{
    if (!str_starts_with($data, '%PDF-') || strlen($data) > 60 * 1024 * 1024) {
        return ['ok' => false, 'error' => 'not_a_pdf'];
    }
    $filename = preg_replace('/[^A-Za-z0-9._-]+/', '-', $filename) ?: 'hortulus.pdf';
    $id = uuid32();
    q(
        'INSERT INTO ' . tbl('files') . ' (id, garden_id, user_id, kind, filename, mime, bytes, data, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [$id, $gardenId, $userId, 'pdf', mb_substr($filename, 0, 190), 'application/pdf', strlen($data), $data, now_utc()]
    );
    // keep the 30 newest per garden
    $old = q('SELECT id FROM ' . tbl('files') . ' WHERE garden_id = ? ORDER BY created_at DESC LIMIT 1000 OFFSET 30', [$gardenId])->fetchAll(PDO::FETCH_COLUMN);
    foreach ($old as $oldId) {
        q('DELETE FROM ' . tbl('files') . ' WHERE id = ?', [$oldId]);
    }
    return ['ok' => true, 'id' => $id];
}

// --- Home Assistant link ----------------------------------------------------------
function ha_link(string $gardenId): ?array
{
    $row = q('SELECT * FROM ' . tbl('ha_links') . ' WHERE garden_id = ? AND enabled = 1', [$gardenId])->fetch();
    if (!$row) {
        return null;
    }
    $token = unseal($row['token_enc']);
    return $token === null ? null : ['url' => rtrim($row['base_url'], '/'), 'token' => $token];
}

/** Only https to a host name; no credentials, query or fragment in the URL (the token must never travel in clear text). */
function ha_url_ok(string $url): bool
{
    $p = parse_url($url);
    return $p !== false && ($p['scheme'] ?? '') === 'https' && !empty($p['host'])
        && !isset($p['user']) && !isset($p['pass']) && !isset($p['query']) && !isset($p['fragment']);
}

/**
 * Resolve the host and refuse loopback, private and reserved addresses, so a
 * garden owner cannot make this server talk to its own internal network.
 * Returns [host, port, ip] or null.
 */
function ha_public_target(string $url): ?array
{
    $p = parse_url($url);
    $host = (string) ($p['host'] ?? '');
    $port = (int) ($p['port'] ?? (($p['scheme'] ?? '') === 'https' ? 443 : 80));
    if ($host === '' || $port < 1 || $port > 65535) {
        return null;
    }
    $ips = filter_var($host, FILTER_VALIDATE_IP) ? [$host] : (gethostbynamel($host) ?: []);
    foreach ($ips as $ip) {
        if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
            return [$host, $port, $ip];
        }
    }
    return null;
}

/** Call the Home Assistant REST API.  Returns [status, decoded body | null, error]. */
function ha_request(array $link, string $method, string $path, ?array $body = null, int $timeout = 12): array
{
    $target = ha_public_target($link['url']);
    if ($target === null) {
        app_log('ha', 'warn', 'Home Assistant ' . parse_url($link['url'], PHP_URL_HOST) . ': adres niet bereikbaar vanaf internet', $link['url'], 60);
        return [0, null, 'address not reachable from the internet'];
    }
    $ch = curl_init($link['url'] . $path);
    // pin the checked address (no DNS rebinding between check and request)
    curl_setopt($ch, CURLOPT_RESOLVE, [$target[0] . ':' . $target[1] . ':' . $target[2]]);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_CONNECTTIMEOUT => 6,
        CURLOPT_FOLLOWLOCATION => false,
        CURLOPT_PROTOCOLS => CURLPROTO_HTTPS,
        CURLOPT_CUSTOMREQUEST => $method,
        CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $link['token'], 'Content-Type: application/json'],
    ]);
    if ($body !== null) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($body));
    }
    $raw = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $err = curl_error($ch);
    if ($raw === false) {
        app_log('ha', 'warn', 'Home Assistant ' . parse_url($link['url'], PHP_URL_HOST) . ': ' . ($err ?: 'connection failed'), "$method $path", 60);
        return [0, null, $err ?: 'connection failed'];
    }
    if ($status >= 400) {
        $hint = $status === 401 ? ' (token ongeldig of verlopen)' : ($status === 404 ? ' (adres of pad bestaat niet)' : '');
        app_log('ha', 'warn', 'Home Assistant ' . parse_url($link['url'], PHP_URL_HOST) . ": HTTP $status$hint", "$method $path\n" . mb_substr((string) $raw, 0, 2000), 60);
    }
    return [$status, json_decode((string) $raw, true), $status >= 400 ? "HTTP $status" : null];
}
