<?php
/**
 * Hortulus web – images and files from the database.
 *
 *   media.php?asset=logo.svg               site artwork (public)
 *   media.php?photo=ID&size=256x256        a journal photo (members of its garden)
 *   media.php?file=ID                      a saved PDF (members of its garden)
 *
 * /hortulus/api/image/serve/ID/SIZE is rewritten here by .htaccess (the URL
 * the garden app uses for photos, as in Home Assistant).
 */

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

boot(false, false);
session_write_close();

function not_found(): never
{
    http_response_code(404);
    exit;
}

function send_blob(string $data, string $mime, bool $private, ?string $download = null, int $maxAge = 86400): never
{
    $etag = '"' . substr(sha1($data), 0, 20) . '"';
    header('ETag: ' . $etag);
    header('Cache-Control: ' . ($private ? 'private' : 'public') . ', max-age=' . $maxAge);
    if (($_SERVER['HTTP_IF_NONE_MATCH'] ?? '') === $etag) {
        http_response_code(304);
        exit;
    }
    header('Content-Type: ' . $mime);
    header('Content-Length: ' . strlen($data));
    if ($mime === 'image/svg+xml') {
        header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'");
    }
    if ($download !== null) {
        header('Content-Disposition: attachment; filename="' . str_replace('"', '', $download) . '"');
    }
    echo $data;
    exit;
}

if (isset($_GET['asset'])) {
    $name = (string) $_GET['asset'];
    if (!preg_match('/^[a-z0-9._-]{1,100}$/', $name)) {
        not_found();
    }
    try {
        $row = q('SELECT mime, data FROM ' . tbl('assets') . ' WHERE name = ?', [$name])->fetch();
    } catch (PDOException) {
        not_found(); // not installed yet
    }
    $row ?: not_found();
    send_blob($row['data'], $row['mime'], false, null, 604800);
}

$user = current_user(); // null for a visitor of a shared garden

if (isset($_GET['photo'])) {
    $row = q('SELECT p.garden_id, p.data, p.thumb FROM ' . tbl('photos') . ' p WHERE p.id = ?', [(string) $_GET['photo']])->fetch();
    $garden = $row ? garden_for($row['garden_id'], $user) : null;
    if (!$garden || (is_visitor($garden) && !in_array('journal', $garden['view_sections'], true))) {
        not_found();
    }
    $size = (string) ($_GET['size'] ?? '');
    $small = (int) explode('x', $size)[0] > 0 && (int) explode('x', $size)[0] <= 512;
    send_blob($small ? $row['thumb'] : $row['data'], 'image/jpeg', true, null, 604800);
}

if (isset($_GET['file'])) {
    $row = q('SELECT garden_id, filename, mime, data FROM ' . tbl('files') . ' WHERE id = ?', [(string) $_GET['file']])->fetch();
    $garden = $row && $user ? garden_for($row['garden_id'], $user) : null;
    if (!$garden || is_visitor($garden)) {
        not_found();
    }
    send_blob($row['data'], $row['mime'], true, $row['filename'], 0);
}

not_found();
