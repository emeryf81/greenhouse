<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();
$l = (string) ($_GET['l'] ?? '');
if (isset(LANGS[$l])) {
    $_SESSION['lang'] = $l;
    if ($user = current_user()) {
        q('UPDATE ' . tbl('users') . ' SET lang = ? WHERE id = ?', [$l, $user['id']]);
    }
}
$back = (string) ($_SERVER['HTTP_REFERER'] ?? '');
$path = (string) (parse_url($back, PHP_URL_PATH) ?? '');
redirect(str_starts_with($path, APP_BASE . '/') ? APP_URL . substr($path, strlen(APP_BASE)) : '');
