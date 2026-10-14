<?php
/** Link from the admin mail: shows the request, activates on confirm. */
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

$admin = require_admin();
$token = (string) ($_GET['t'] ?? $_POST['t'] ?? '');
$row = peek_token($token, 'activate');
$user = $row ? q('SELECT * FROM ' . tbl('users') . ' WHERE id = ?', [$row['user_id']])->fetch() : null;
if ($user && ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    consume_token($row);
    activate_user($user, $admin);
    flash(t('admin.activated'));
    redirect('admin/');
}
page_start(t('admin.activate'));
if (!$user) {
    echo '<section class="card narrow"><div class="flash bad">' . e(t('verify.bad')) . '</div><p><a href="' . e(url('admin/')) . '">' . e(t('admin.title')) . '</a></p></section>';
} else {
    echo '<section class="card narrow stack"><h1>' . e(t('admin.activate')) . '</h1><table class="list">'
        . '<tr><th>' . e(t('register.name')) . '</th><td>' . e($user['name']) . '</td></tr>'
        . '<tr><th>' . e(t('login.email')) . '</th><td>' . e($user['email']) . '</td></tr>'
        . '<tr><th>' . e(t('common.created')) . '</th><td>' . e($user['created_at']) . ' UTC</td></tr>'
        . '<tr><th>' . e(t('common.status')) . '</th><td>' . e(t('status.' . $user['status'])) . '</td></tr></table>'
        . '<form method="post">' . csrf_field() . '<input type="hidden" name="t" value="' . e($token) . '"><button class="btn primary">' . e(t('admin.activate')) . '</button></form></section>';
}
page_end();
