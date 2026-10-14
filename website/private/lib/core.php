<?php
/**
 * Hortulus web – core: sessions, security headers, CSRF, rate limiting, helpers.
 */

declare(strict_types=1);

require_once dirname(__DIR__) . '/db.php';

const HORTULUS_WEB_VERSION = '1.8.5';

/** Escape for HTML. */
function e(?string $value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function now_utc(): string
{
    return gmdate('Y-m-d H:i:s');
}

function is_https(): bool
{
    return (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https')
        || (($_SERVER['SERVER_PORT'] ?? '') === '443');
}

function client_ip(): string
{
    return substr((string) ($_SERVER['REMOTE_ADDR'] ?? ''), 0, 45);
}

function url(string $path = ''): string
{
    return APP_BASE . '/' . ltrim($path, '/');
}

function random_token(int $bytes = 32): string
{
    return bin2hex(random_bytes($bytes));
}

function token_hash(string $token): string
{
    return hash_hmac('sha256', $token, APP_SECRET);
}

/** Security headers for every page. ``$app`` relaxes the policy for the garden app (WebAssembly). */
function send_security_headers(bool $app = false): void
{
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: DENY');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    header('Permissions-Policy: camera=(self), microphone=(), geolocation=(self), payment=()');
    header('Cross-Origin-Opener-Policy: same-origin');
    if (is_https()) {
        header('Strict-Transport-Security: max-age=31536000');
    }
    $images = "'self' data: blob: https://upload.wikimedia.org https://*.wikipedia.org https://api.buienradar.nl https://image.buienradar.nl";
    $connect = "'self' https://*.wikipedia.org https://*.wikimedia.org";
    $script = $app ? "'self' 'wasm-unsafe-eval'" : "'self'";
    header("Content-Security-Policy: default-src 'self'; script-src $script; worker-src 'self' blob:; "
        . "style-src 'self' 'unsafe-inline'; img-src $images; connect-src $connect; font-src 'self' data:; "
        . "frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'");
}

/** Sessions in MariaDB: shared hosting cleans file sessions after ~24 minutes, whatever we ask. */
final class DbSessionHandler implements SessionHandlerInterface
{
    public function open(string $path, string $name): bool
    {
        return true;
    }

    public function close(): bool
    {
        return true;
    }

    public function read(string $id): string|false
    {
        $row = q('SELECT data FROM ' . tbl('sessions') . ' WHERE id = ? AND expires_at > ?', [hash('sha256', $id), time()])->fetchColumn();
        return $row === false ? '' : (string) $row;
    }

    public function write(string $id, string $data): bool
    {
        q(
            'INSERT INTO ' . tbl('sessions') . ' (id, data, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data), expires_at = VALUES(expires_at)',
            [hash('sha256', $id), $data, time() + SESSION_LIFETIME]
        );
        return true;
    }

    public function destroy(string $id): bool
    {
        q('DELETE FROM ' . tbl('sessions') . ' WHERE id = ?', [hash('sha256', $id)]);
        return true;
    }

    public function gc(int $max_lifetime): int|false
    {
        return q('DELETE FROM ' . tbl('sessions') . ' WHERE expires_at < ?', [time()])->rowCount();
    }
}

/**
 * Start the session.  $rotate is false for the app's API calls: they run in
 * parallel, and a new session id in one of them would sign out the others.
 */
function start_session(bool $rotate = true): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    ini_set('session.gc_maxlifetime', (string) SESSION_LIFETIME);
    ini_set('session.gc_probability', '1');
    ini_set('session.gc_divisor', '200');
    try {
        db()->query('SELECT 1 FROM ' . tbl('sessions') . ' LIMIT 0');
        session_set_save_handler(new DbSessionHandler(), true);
    } catch (PDOException) {
        // not installed yet: PHP's own session files for install.php
    }
    session_name(SESSION_NAME);
    session_set_cookie_params([
        'lifetime' => SESSION_LIFETIME,
        'path' => APP_BASE . '/',
        'secure' => is_https(),
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
    $now = time();
    if (!isset($_SESSION['rotated'])) {
        $_SESSION['rotated'] = $now; // a new session already has a fresh id
    } elseif ($rotate && $now - (int) $_SESSION['rotated'] > 3600) {
        session_regenerate_id(true);
        $_SESSION['rotated'] = $now;
    }
    $_SESSION['seen'] = $now;
}

function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = random_token(32);
    }
    return $_SESSION['csrf'];
}

function csrf_field(): string
{
    return '<input type="hidden" name="csrf" value="' . e(csrf_token()) . '">';
}

/** Check the CSRF token of a POST (form field or X-CSRF-Token header); stops the request when wrong. */
function csrf_check(): void
{
    $sent = (string) ($_POST['csrf'] ?? ($_SERVER['HTTP_X_CSRF_TOKEN'] ?? ''));
    if (empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $sent)) {
        http_response_code(403);
        if (str_contains((string) ($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json')) {
            json_out(['ok' => false, 'error' => 'csrf'], 403);
        }
        exit('Sessie verlopen. Ga terug, vernieuw de pagina en probeer opnieuw.');
    }
}

function require_post(): void
{
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
        http_response_code(405);
        exit;
    }
    csrf_check();
}

/**
 * Rate limiting: at most ``$max`` hits for ``$key`` within ``$seconds``.
 * Returns false when the limit is reached (the hit is still counted).
 */
function rate_limit(string $key, int $max, int $seconds): bool
{
    $hash = hash('sha256', $key . '|' . APP_SECRET);
    q('DELETE FROM ' . tbl('attempts') . ' WHERE created_at < ?', [gmdate('Y-m-d H:i:s', time() - 86400)]);
    $count = (int) q(
        'SELECT COUNT(*) FROM ' . tbl('attempts') . ' WHERE key_hash = ? AND created_at >= ?',
        [$hash, gmdate('Y-m-d H:i:s', time() - $seconds)]
    )->fetchColumn();
    q('INSERT INTO ' . tbl('attempts') . ' (key_hash, created_at) VALUES (?, ?)', [$hash, now_utc()]);
    return $count < $max;
}

function clear_rate_limit(string $key): void
{
    q('DELETE FROM ' . tbl('attempts') . ' WHERE key_hash = ?', [hash('sha256', $key . '|' . APP_SECRET)]);
}

function audit(string $action, string $detail = '', ?int $userId = null): void
{
    try {
        q(
            'INSERT INTO ' . tbl('audit') . ' (user_id, action, detail, ip, created_at) VALUES (?, ?, ?, ?, ?)',
            [$userId ?? (current_user()['id'] ?? null), $action, mb_substr($detail, 0, 255), client_ip(), now_utc()]
        );
    } catch (Throwable) {
        // auditing must never break the request
    }
}

/**
 * Beheer → Logboek: what went wrong (and a few things that went right), with the details
 * an admin needs to fix it.  Never breaks the request; falls back to PHP's error log.
 *
 * $level: info | warn | error.  $channel: mail | php | ha | db | auth | system.
 * $dedupeMinutes: skip the entry when the same message was logged that recently
 * (a Home Assistant that is offline would otherwise fill the log every 10 minutes).
 */
function app_log(string $channel, string $level, string $message, ?string $detail = null, int $dedupeMinutes = 0): void
{
    static $busy = false;
    if ($busy) {
        return; // a failing log write must not log itself
    }
    $busy = true;
    $message = mb_substr(trim($message), 0, 500);
    try {
        if ($dedupeMinutes > 0) {
            $seen = q('SELECT 1 FROM ' . tbl('log') . ' WHERE channel = ? AND message = ? AND created_at > ? LIMIT 1',
                [$channel, $message, gmdate('Y-m-d H:i:s', time() - $dedupeMinutes * 60)])->fetchColumn();
            if ($seen) {
                return;
            }
        }
        $uid = null;
        if (session_status() === PHP_SESSION_ACTIVE && function_exists('current_user')) {
            $uid = current_user()['id'] ?? null;
        }
        try {
            q('INSERT INTO ' . tbl('log') . ' (created_at, level, channel, message, detail, user_id, ip, req) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [now_utc(), $level, $channel, $message, $detail === null ? null : mb_substr($detail, 0, 60000), $uid, client_ip(), request_id()]);
        } catch (PDOException) { // before the req column exists
            q('INSERT INTO ' . tbl('log') . ' (created_at, level, channel, message, detail, user_id, ip) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [now_utc(), $level, $channel, $message, $detail === null ? null : mb_substr($detail, 0, 60000), $uid, client_ip()]);
        }
    } catch (Throwable) {
        error_log("[hortulus] $channel/$level: $message");
    } finally {
        $busy = false;
    }
}

function setting(string $name, ?string $default = null): ?string
{
    try {
        $value = q('SELECT value FROM ' . tbl('settings') . ' WHERE name = ?', [$name])->fetchColumn();
    } catch (Throwable) {
        return $default;
    }
    return $value === false ? $default : (string) $value;
}

function set_setting(string $name, string $value): void
{
    q(
        'INSERT INTO ' . tbl('settings') . ' (name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)',
        [$name, $value]
    );
}

function is_installed(): bool
{
    return setting('installed_at') !== null;
}

function redirect(string $path): never
{
    header('Location: ' . (str_starts_with($path, 'http') ? $path : url($path)));
    exit;
}

function flash(?string $message = null, string $kind = 'ok'): ?array
{
    if ($message !== null) {
        $_SESSION['flash'] = ['message' => $message, 'kind' => $kind];
        return null;
    }
    $f = $_SESSION['flash'] ?? null;
    unset($_SESSION['flash']);
    return $f;
}

/** A short code for this request: shown to the user with an error, kept in the log. */
function request_id(): string
{
    static $id = null;
    return $id ??= bin2hex(random_bytes(4));
}

function json_out(mixed $data, int $status = 200): never
{
    if ($status >= 400 && $status !== 401) {
        $action = preg_replace('/[^a-z_]/', '', (string) ($_GET['a'] ?? '')) ?: basename((string) ($_SERVER['SCRIPT_NAME'] ?? ''));
        $error = is_array($data) ? (string) ($data['error'] ?? '') : '';
        app_log('api', $status >= 500 ? 'error' : 'warn', "API $action → HTTP $status" . ($error !== '' ? " ($error)" : ''),
            ($_SERVER['REQUEST_METHOD'] ?? 'GET') . ' ' . ($_SERVER['REQUEST_URI'] ?? ''), $status === 409 ? 0 : 10);
        if (is_array($data)) {
            $data['req'] = request_id();
        }
    }
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function uuid32(): string
{
    return random_token(16);
}

/** Encrypt a secret (Home Assistant token) with the installation key. */
function seal(string $plain): string
{
    $key = sodium_crypto_generichash(APP_SECRET, '', SODIUM_CRYPTO_SECRETBOX_KEYBYTES);
    $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
    return base64_encode($nonce . sodium_crypto_secretbox($plain, $nonce, $key));
}

function unseal(string $sealed): ?string
{
    $raw = base64_decode($sealed, true);
    if ($raw === false || strlen($raw) < SODIUM_CRYPTO_SECRETBOX_NONCEBYTES) {
        return null;
    }
    $key = sodium_crypto_generichash(APP_SECRET, '', SODIUM_CRYPTO_SECRETBOX_KEYBYTES);
    $plain = sodium_crypto_secretbox_open(substr($raw, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES), substr($raw, 0, SODIUM_CRYPTO_SECRETBOX_NONCEBYTES), $key);
    return $plain === false ? null : $plain;
}

/** Start every request: errors hidden from visitors, session, language. */
function boot(bool $app = false, bool $rotate = true): void
{
    ini_set('display_errors', '0');
    error_reporting(E_ALL);
    date_default_timezone_set('UTC');
    send_security_headers($app);
    header('X-Request-Id: ' . request_id());
    set_error_handler(static function (int $no, string $msg, string $file, int $line): bool {
        if (!(error_reporting() & $no)) {
            return false; // silenced with @
        }
        // a deprecation (a newer PHP announcing a change) is a note for the next release, not a fault
        $level = in_array($no, [E_DEPRECATED, E_USER_DEPRECATED], true) ? 'info'
            : (in_array($no, [E_WARNING, E_USER_WARNING, E_USER_ERROR, E_RECOVERABLE_ERROR], true) ? 'error' : 'warn');
        app_log('php', $level, $msg . ' @ ' . basename($file) . ':' . $line, $file . ':' . $line . "\n" . ($_SERVER['REQUEST_URI'] ?? ''), 60);
        return false; // PHP's own error log still gets it
    });
    // a little memory kept aside, so even "memory exhausted" can still be written to the log
    $GLOBALS['hortulus_reserve'] = str_repeat(' ', 256 * 1024);
    register_shutdown_function(static function (): void {
        unset($GLOBALS['hortulus_reserve']);
        $err = error_get_last();
        if ($err && in_array($err['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR], true)) {
            app_log('php', 'error', $err['message'] . ' @ ' . basename($err['file']) . ':' . $err['line'], $err['file'] . ':' . $err['line'] . "\n" . ($_SERVER['REQUEST_URI'] ?? ''));
        }
    });
    set_exception_handler(static function (Throwable $err): void {
        error_log('[hortulus] ' . $err->getMessage() . ' @ ' . $err->getFile() . ':' . $err->getLine());
        app_log($err instanceof PDOException ? 'db' : 'php', 'error', $err->getMessage() . ' @ ' . basename($err->getFile()) . ':' . $err->getLine(),
            get_class($err) . "\n" . ($_SERVER['REQUEST_URI'] ?? '') . "\n\n" . $err->getTraceAsString());
        http_response_code(500);
        if (str_contains((string) ($_SERVER['HTTP_ACCEPT'] ?? ''), 'application/json') || str_contains((string) ($_SERVER['SCRIPT_NAME'] ?? ''), 'api.php')) {
            header('Content-Type: application/json');
            echo json_encode(['ok' => false, 'error' => 'server_error', 'req' => request_id()]);
            return;
        }
        echo '<!doctype html><meta charset="utf-8"><title>Hortulus</title><div style="font-family:sans-serif;padding:2rem;max-width:560px">'
            . '<p>Er ging iets mis. Probeer het zo meteen opnieuw. / Une erreur est survenue. / Something went wrong.</p>'
            . '<p style="color:#66756d">Foutcode / code / error code: <strong>' . request_id() . '</strong></p></div>';
    });
    ensure_schema(); // a new version's database steps, once, before anything uses them
    start_session($rotate);
}
