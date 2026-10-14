<?php
/**
 * Hortulus web – loaded by every page.
 *
 * HORTULUS_PRIVATE points at the folder with settings.php, db.php and lib/.
 * It sits next to this file by default, protected by .htaccess.  For extra
 * safety move the "private" folder above the web root and change the path:
 *   define('HORTULUS_PRIVATE', dirname(__DIR__, 2) . '/hortulus_private');
 */

declare(strict_types=1);

define('HORTULUS_PRIVATE', __DIR__ . '/private');

if (PHP_VERSION_ID < 80100) {
    http_response_code(500);
    exit('Hortulus needs PHP 8.1 or newer (this server runs ' . PHP_VERSION . ').');
}

require_once HORTULUS_PRIVATE . '/db.php';
if (is_file(HORTULUS_PRIVATE . '/mail-settings.php')) {
    require_once HORTULUS_PRIVATE . '/mail-settings.php';
}
require_once HORTULUS_PRIVATE . '/lib/core.php';
require_once HORTULUS_PRIVATE . '/lib/migrate.php';
require_once HORTULUS_PRIVATE . '/lib/i18n.php';
require_once HORTULUS_PRIVATE . '/lib/auth.php';
require_once HORTULUS_PRIVATE . '/lib/mail.php';
require_once HORTULUS_PRIVATE . '/lib/gardens.php';
require_once HORTULUS_PRIVATE . '/lib/share.php';
require_once HORTULUS_PRIVATE . '/lib/layout.php';
