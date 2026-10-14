<?php
/** E-mail confirmation: then the admin gets the activation mail. */
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

$row = peek_token((string) ($_GET['t'] ?? ''), 'verify');
$ok = false;
if ($row) {
    consume_token($row);
    q('UPDATE ' . tbl('users') . ' SET email_verified_at = ? WHERE id = ? AND email_verified_at IS NULL', [now_utc(), $row['user_id']]);
    $user = q('SELECT * FROM ' . tbl('users') . ' WHERE id = ?', [$row['user_id']])->fetch();
    if ($user && $user['status'] === 'pending') {
        $token = create_token((int) $user['id'], 'activate', 30 * 86400);
        mail_admin_new_user($user, APP_URL . '/activate.php?t=' . $token);
    }
    audit('verify', '', (int) $row['user_id']);
    $ok = true;
}
page_start(t('register.title'), 'auth');
echo '<section class="card narrow stack"><div class="flash ' . ($ok ? 'ok' : 'bad') . '">' . e(t($ok ? 'verify.ok' : 'verify.bad')) . '</div>'
    . '<p><a class="btn" href="' . e(url('login.php')) . '">' . e(t('nav.login')) . '</a></p></section>';
page_end();
