<?php
/**
 * Open a garden someone shows: view.php?s=TOKEN (a shared link or a public garden),
 * or view.php?admin=ID for the administrator when the owner allows it.
 * The browser session gets a read-only view and lands in the garden app.
 */

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

boot();

$garden = null;
if (isset($_GET['s']) && preg_match('/^[a-f0-9]{32}$/', (string) $_GET['s'])) {
    if (!rate_limit('view:' . client_ip(), 120, 3600)) {
        http_response_code(429);
        exit('Too many requests');
    }
    $garden = q('SELECT g.* FROM ' . tbl('gardens') . ' g JOIN ' . tbl('users') . ' u ON u.id = g.owner_id WHERE g.share_token = ? AND g.share_mode IN ("link", "public") AND u.status = "active"', [(string) $_GET['s']])->fetch();
    if ($garden) {
        grant_view($garden, $garden['share_mode']);
    } else {
        app_log('share', 'info', 'Gedeelde link niet (meer) geldig', 'token ' . substr((string) $_GET['s'], 0, 6) . '…', 10);
    }
} elseif (isset($_GET['admin'])) {
    $admin = require_admin();
    $garden = q('SELECT * FROM ' . tbl('gardens') . ' WHERE id = ? AND share_admin = 1', [(string) $_GET['admin']])->fetch();
    if ($garden) {
        grant_view($garden, 'admin');
        audit('admin_view_garden', $garden['title']);
    }
}
if (!$garden) {
    http_response_code(404);
    page_start(t('share.gone_title'));
    echo '<section class="card stack narrow"><h1>' . e(t('share.gone_title')) . '</h1><p>' . e(t('share.gone')) . '</p><p><a class="btn" href="' . e(url('')) . '#public">' . e(t('public.title')) . '</a></p></section>';
    page_end();
    exit;
}
redirect('app.php?g=' . $garden['id']);
