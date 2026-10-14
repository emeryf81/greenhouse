<?php
/**
 * Hortulus web – page shell for the site pages (login, gardens, account, admin).
 */

declare(strict_types=1);

function page_start(string $title, string $class = ''): void
{
    $user = current_user();
    $flash = flash();
    $lang = lang();
    echo '<!doctype html><html lang="' . e($lang) . '"><head><meta charset="utf-8">'
        . '<meta name="viewport" content="width=device-width, initial-scale=1">'
        . '<meta name="robots" content="noindex">'
        . '<title>' . e($title) . ' · Hortulus</title>'
        . '<link rel="icon" href="' . e(url('media.php?asset=favicon.svg')) . '">'
        . '<link rel="stylesheet" href="' . e(url('assets/web/site.css?v=' . HORTULUS_WEB_VERSION)) . '">'
        . '<script src="' . e(url('assets/web/look.js?v=' . HORTULUS_WEB_VERSION)) . '"></script>'
        . '<script src="' . e(url('assets/web/site.js?v=' . HORTULUS_WEB_VERSION)) . '" defer></script>'
        . '</head><body class="' . e($class) . '">';
    echo '<header class="top"><a class="brand" href="' . e(url('')) . '"><img src="' . e(url('media.php?asset=logo.svg')) . '" alt="" width="28" height="28"> Hortulus</a><nav>';
    if ($user) {
        echo '<a href="' . e(url('')) . '">' . e(t('nav.gardens')) . '</a>';
        echo '<a href="' . e(url('account.php')) . '">' . e(t('nav.account')) . '</a>';
        if ($user['role'] === 'admin') {
            echo '<a href="' . e(url('admin/')) . '">' . e(t('nav.admin')) . '</a>';
        }
        echo '<form method="post" action="' . e(url('logout.php')) . '">' . csrf_field() . '<button class="link">' . e(t('nav.logout')) . '</button></form>';
    } else {
        echo '<a href="' . e(url('login.php')) . '">' . e(t('nav.login')) . '</a><a href="' . e(url('register.php')) . '">' . e(t('nav.register')) . '</a>';
    }
    echo look_picker();
    echo '<span class="langs">';
    foreach (LANGS as $code => $name) {
        echo '<a href="' . e(url('lang.php?l=' . $code)) . '" class="' . ($code === $lang ? 'on' : '') . '" title="' . e($name) . '">' . strtoupper($code) . '</a>';
    }
    echo '</span></nav></header><main class="wrap">';
    if ($flash) {
        echo '<div class="flash ' . e($flash['kind']) . '" role="status">' . e($flash['message']) . '</div>';
    }
}

/** Colour theme and light/dark: one choice for the site pages and the garden app (look.js). */
function look_picker(): string
{
    $themes = ['classic' => '#3b7334', 'earth' => '#8a4f2a', 'night' => '#1f4a3c', 'season' => 'linear-gradient(90deg,#3f8a3a,#c7952a,#9a4b22,#2f6690)'];
    $out = '<details class="look"><summary title="' . e(t('look.title')) . '" aria-label="' . e(t('look.title')) . '">🎨</summary><div class="menu">';
    $out .= '<b>' . e(t('look.theme')) . '</b><div class="opts">';
    foreach ($themes as $id => $color) {
        $out .= '<button type="button" data-look-theme="' . $id . '" aria-pressed="false"><span class="sw" style="background:' . $color . '"></span>'
            . e(t('look.' . $id)) . '</button>';
    }
    $out .= '</div><b>' . e(t('look.mode')) . '</b><div class="opts">';
    foreach (['auto', 'light', 'dark'] as $id) {
        $out .= '<button type="button" data-look-mode="' . $id . '" aria-pressed="false">' . e(t('look.' . $id)) . '</button>';
    }
    return $out . '</div></div></details>';
}

function page_end(): void
{
    echo '</main><footer class="foot">' . e(t('footer')) . '</footer></body></html>';
}

function field(string $name, string $label, string $type = 'text', string $value = '', array $attrs = []): string
{
    $extra = '';
    foreach ($attrs as $k => $v) {
        $extra .= $v === true ? ' ' . e($k) : ' ' . e($k) . '="' . e((string) $v) . '"';
    }
    return '<label class="field"><span>' . e($label) . '</span><input type="' . e($type) . '" name="' . e($name) . '" value="' . e($value) . '"' . $extra . '></label>';
}
