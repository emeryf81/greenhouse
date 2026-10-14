<?php
/**
 * Hortulus web – accounts: login, registration, activation by the admin, password reset.
 */

declare(strict_types=1);

require_once __DIR__ . '/core.php';

function current_user(): ?array
{
    static $cache = null;
    static $loadedFor = null;
    $id = $_SESSION['uid'] ?? null;
    if (!$id) {
        return null;
    }
    if ($loadedFor === $id && $cache !== null) {
        return $cache;
    }
    $user = q('SELECT * FROM ' . tbl('users') . ' WHERE id = ?', [$id])->fetch();
    if (!$user || $user['status'] !== 'active' || (int) ($_SESSION['pwv'] ?? 0) !== password_version($user)) {
        // disabled, deleted or password changed elsewhere: log out
        unset($_SESSION['uid'], $_SESSION['pwv']);
        return null;
    }
    $cache = $user;
    $loadedFor = $id;
    return $user;
}

/** Changes whenever the password hash changes: old sessions end after a password change. */
function password_version(array $user): int
{
    return crc32((string) $user['password_hash']);
}

function is_admin(): bool
{
    return (current_user()['role'] ?? '') === 'admin';
}

function require_login(): array
{
    $user = current_user();
    if ($user === null) {
        $_SESSION['after_login'] = $_SERVER['REQUEST_URI'] ?? url('');
        redirect('login.php');
    }
    return $user;
}

function require_admin(): array
{
    $user = require_login();
    if ($user['role'] !== 'admin') {
        http_response_code(403);
        exit(t('admin.forbidden'));
    }
    return $user;
}

function find_user_by_email(string $email): ?array
{
    $row = q('SELECT * FROM ' . tbl('users') . ' WHERE email = ?', [mb_strtolower(trim($email))])->fetch();
    return $row ?: null;
}

function login_user(array $user): void
{
    session_regenerate_id(true);
    $_SESSION['uid'] = (int) $user['id'];
    $_SESSION['pwv'] = password_version($user);
    $_SESSION['lang'] = $user['lang'];
    q('UPDATE ' . tbl('users') . ' SET last_login_at = ?, failed_logins = 0, locked_until = NULL WHERE id = ?', [now_utc(), $user['id']]);
    audit('login', '', (int) $user['id']);
}

function logout_user(): void
{
    $uid = $_SESSION['uid'] ?? null;
    if ($uid) {
        audit('logout', '', (int) $uid);
    }
    $_SESSION = [];
    if (ini_get('session.use_cookies')) {
        $p = session_get_cookie_params();
        setcookie(session_name(), '', ['expires' => time() - 42000, 'path' => $p['path'], 'secure' => $p['secure'], 'httponly' => true, 'samesite' => 'Lax']);
    }
    session_destroy();
}

/**
 * Check e-mail and password.  Returns [user|null, error-key|null].
 * Same message for unknown e-mail and wrong password; per-account lock after repeated failures.
 */
function attempt_login(string $email, string $password): array
{
    $email = mb_strtolower(trim($email));
    if (!rate_limit('login-ip:' . client_ip(), LOGIN_MAX_ATTEMPTS * 3, 900) || !rate_limit('login-mail:' . $email, LOGIN_MAX_ATTEMPTS, 900)) {
        app_log('auth', 'warn', 'Aanmelden tijdelijk geblokkeerd na te veel pogingen: ' . $email, 'IP ' . client_ip(), 15);
        return [null, 'login.too_many'];
    }
    $user = find_user_by_email($email);
    if ($user === null) {
        password_verify($password, '$2y$12$abcdefghijklmnopqrstuuJ0e7v7u1w0wq1j9x4gk1D6dQ3iFvZbW'); // same timing
        return [null, 'login.wrong'];
    }
    if ($user['locked_until'] !== null && strtotime($user['locked_until'] . ' UTC') > time()) {
        return [null, 'login.locked'];
    }
    if (!password_verify($password, $user['password_hash'])) {
        $failed = (int) $user['failed_logins'] + 1;
        $lock = $failed >= 10 ? gmdate('Y-m-d H:i:s', time() + 3600) : null;
        q('UPDATE ' . tbl('users') . ' SET failed_logins = ?, locked_until = ? WHERE id = ?', [$failed, $lock, $user['id']]);
        audit('login_failed', $email, (int) $user['id']);
        return [null, 'login.wrong'];
    }
    if ($user['status'] === 'pending') {
        return [null, $user['email_verified_at'] === null ? 'login.verify_first' : 'login.pending'];
    }
    if ($user['status'] === 'disabled') {
        return [null, 'login.disabled'];
    }
    if (password_needs_rehash($user['password_hash'], PASSWORD_DEFAULT)) {
        q('UPDATE ' . tbl('users') . ' SET password_hash = ? WHERE id = ?', [password_hash($password, PASSWORD_DEFAULT), $user['id']]);
        $user = find_user_by_email($email);
    }
    clear_rate_limit('login-mail:' . $email);
    return [$user, null];
}

function password_problem(string $password, string $repeat): ?string
{
    if ($password !== $repeat) {
        return 'register.mismatch';
    }
    if (mb_strlen($password) < PASSWORD_MIN_LENGTH) {
        return 'register.short';
    }
    if (preg_match('/^(.)\1+$/u', $password) || in_array(mb_strtolower($password), ['wachtwoord123', 'password1234', 'motdepasse12', 'hortulus123'], true)) {
        return 'register.weak';
    }
    return null;
}

function create_token(int $userId, string $purpose, int $seconds): string
{
    $token = random_token(32);
    q('DELETE FROM ' . tbl('tokens') . ' WHERE user_id = ? AND purpose = ? AND used_at IS NULL', [$userId, $purpose]);
    q(
        'INSERT INTO ' . tbl('tokens') . ' (user_id, purpose, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?, ?)',
        [$userId, $purpose, token_hash($token), gmdate('Y-m-d H:i:s', time() + $seconds), now_utc()]
    );
    return $token;
}

/** The token row if it is valid (not used, not expired) - does not consume it. */
function peek_token(string $token, string $purpose): ?array
{
    if (!preg_match('/^[a-f0-9]{64}$/', $token)) {
        return null;
    }
    $row = q(
        'SELECT * FROM ' . tbl('tokens') . ' WHERE token_hash = ? AND purpose = ? AND used_at IS NULL AND expires_at > ?',
        [token_hash($token), $purpose, now_utc()]
    )->fetch();
    return $row ?: null;
}

function consume_token(array $row): void
{
    q('UPDATE ' . tbl('tokens') . ' SET used_at = ? WHERE id = ?', [now_utc(), $row['id']]);
}

/** Activate a pending account and tell the user (in their language). */
function activate_user(array $user, array $admin): void
{
    q(
        'UPDATE ' . tbl('users') . ' SET status = "active", activated_at = ?, activated_by = ?, email_verified_at = COALESCE(email_verified_at, ?) WHERE id = ?',
        [now_utc(), $admin['id'], now_utc(), $user['id']]
    );
    $keep = $_SESSION['lang'] ?? null;
    $_SESSION['lang'] = $user['lang'];
    send_mail($user['email'], t('mail.activated.subject'), t('mail.activated.body', ['name' => $user['name'], 'link' => APP_URL . '/login.php']));
    $_SESSION['lang'] = $keep;
    audit('activate', $user['email'], (int) $admin['id']);
}
