<?php
/**
 * The garden app: the Hortulus panel (the same as in Home Assistant), with the
 * Hortulus engine running in a web worker (Pyodide).  /hortulus/app/<tab> also lands here.
 */

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

boot(true);
$user = current_user();
$gid = (string) ($_GET['g'] ?? ($_SESSION['garden'] ?? ''));
$garden = $gid !== '' ? garden_for($gid, $user) : null;
if ($garden === null) {
    if ($user === null) {
        redirect('login.php');
    }
    $all = user_gardens((int) $user['id']);
    if (!$all) {
        redirect('');
    }
    $garden = $all[0];
}
$visitor = is_visitor($garden);
if (!$visitor) {
    $_SESSION['garden'] = $garden['id'];
}
$config = [
    'base' => APP_BASE,
    'garden' => $garden['id'],
    'title' => $garden['title'],
    'csrf' => csrf_token(),
    'lang' => lang(),
    'version' => HORTULUS_WEB_VERSION,
    'viewer' => $visitor ? ['owner' => public_name($garden['owner_name']), 'tabs' => visitor_tabs($garden), 'via' => $garden['view_via']] : null,
    'texts' => [
        'loading' => t('app.loading'), 'engine' => t('app.loading_engine'), 'error' => t('app.error'), 'back' => t('app.back'),
        'viewonly' => t('share.viewonly'),
        'viewing' => $visitor ? t('share.viewing', ['name' => public_name($garden['owner_name'])]) : '',
        'saving' => t('app.saving'), 'saved' => t('app.saved'), 'offline' => t('app.offline'), 'conflict' => t('app.conflict'), 'readonly' => t('app.readonly'),
        'mail_limit' => t('cook.mail_limit'), 'mail_failed' => t('cook.mail_failed'),
    ],
];
$v = rawurlencode(HORTULUS_WEB_VERSION);
?><!doctype html>
<html lang="<?= e(lang()) ?>"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex"><meta name="theme-color" content="#2f6b4f">
<title><?= e($garden['title']) ?> · Hortulus</title>
<link rel="icon" href="<?= e(url('media.php?asset=favicon.svg')) ?>">
<link rel="stylesheet" href="<?= e(url('assets/web/app.css?v=' . $v)) ?>">
<script src="<?= e(url('assets/web/look.js?v=' . $v)) ?>"></script>
<script type="application/json" id="hortulus-config"><?= json_encode($config, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
<script type="module" src="<?= e(url('assets/web/shell.js?v=' . $v)) ?>"></script>
</head><body>
<div class="appbar">
  <a class="back" href="<?= e(url($visitor && ($garden['view_via'] ?? '') === 'admin' ? 'admin/?tab=gardens' : ($visitor ? '#public' : ''))) ?>" title="<?= e($visitor ? t('public.title') : t('app.back')) ?>">‹ <?= e($visitor ? (($garden['view_via'] ?? '') === 'admin' ? t('nav.admin') : t('public.title')) : t('app.back')) ?></a>
  <span class="gtitle"><?= $visitor ? '<span class="gicon sm" style="--h:' . garden_hue($garden) . '" aria-hidden="true">' . garden_icon($garden) . '</span> ' : '' ?><?= e($garden['title']) ?></span>
  <?php if ($visitor): ?><span class="viewing">👁 <?= e(t('share.viewing', ['name' => public_name($garden['owner_name'])])) ?></span><?php endif; ?>
  <span class="status" id="save-status" aria-live="polite"></span>
  <?= look_picker() ?>
</div>
<div id="boot" class="boot"><img src="<?= e(url('media.php?asset=logo.svg')) ?>" alt="" width="64" height="64"><p id="boot-text"><?= e(t('app.loading')) ?></p><div class="bar"><span id="boot-bar"></span></div></div>
<hortulus-panel id="panel" hidden></hortulus-panel>
</body></html>
