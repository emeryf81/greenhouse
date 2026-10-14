<?php
/**
 * Hortulus web – one-time installation.
 *
 * Open https://www.emery.be/hortulus/install.php?token=<INSTALL_TOKEN from private/settings.php>
 * It checks the server, creates the tables (prefix DB_PREFIX), stores the site
 * artwork in the database and creates the first administrator.  Once installed
 * it refuses to run again; delete this file afterwards.
 */

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

boot();

$token = (string) ($_GET['token'] ?? $_POST['token'] ?? '');
if (!hash_equals(INSTALL_TOKEN, $token)) {
    http_response_code(403);
    exit('Forbidden: install.php needs ?token=… (see INSTALL_TOKEN in private/settings.php).');
}

$checks = [
    'PHP 8.1+' => PHP_VERSION_ID >= 80100,
    'PDO MySQL' => extension_loaded('pdo_mysql'),
    'GD (photos)' => extension_loaded('gd') && function_exists('imagecreatefromjpeg'),
    'sodium (encryption)' => extension_loaded('sodium'),
    'cURL (weather, Home Assistant)' => extension_loaded('curl'),
    'mbstring' => extension_loaded('mbstring'),
    'zlib' => extension_loaded('zlib'),
];
$dbError = null;
try {
    db()->query('SELECT 1');
    $checks['Database connection'] = true;
} catch (Throwable $err) {
    $checks['Database connection'] = false;
    $dbError = $err->getMessage();
}

function install_schema(): void
{
    $sql = (string) file_get_contents(HORTULUS_PRIVATE . '/sql/schema.sql');
    $sql = str_replace('{P}', DB_PREFIX, preg_replace('/^--.*$/m', '', $sql) ?? '');
    foreach (array_filter(array_map('trim', explode(';', $sql))) as $statement) {
        db()->exec($statement);
    }
}

function install_assets(): void
{
    foreach (glob(__DIR__ . '/assets/img/*.{svg,png,jpg,webp}', GLOB_BRACE) ?: [] as $file) {
        $mime = match (pathinfo($file, PATHINFO_EXTENSION)) {
            'svg' => 'image/svg+xml', 'png' => 'image/png', 'jpg' => 'image/jpeg', 'webp' => 'image/webp',
        };
        q(
            'INSERT INTO ' . tbl('assets') . ' (name, mime, data) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE mime = VALUES(mime), data = VALUES(data)',
            [basename($file), $mime, (string) file_get_contents($file)]
        );
    }
}

$done = false;
$error = null;
$installed = $checks['Database connection'] && is_installed();
if ($installed) {
    install_schema(); // adds tables of a newer version (CREATE TABLE IF NOT EXISTS), keeps the data
    install_assets();
}
if (!$installed && ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST' && !in_array(false, $checks, true)) {
    csrf_check();
    $name = trim((string) ($_POST['name'] ?? ''));
    $email = mb_strtolower(trim((string) ($_POST['email'] ?? '')));
    $password = (string) ($_POST['password'] ?? '');
    if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Vul een naam en een geldig e-mailadres in.';
    } elseif ($p = password_problem($password, (string) ($_POST['password2'] ?? ''))) {
        $error = t($p);
    } else {
        install_schema();
        install_assets();
        q(
            'INSERT INTO ' . tbl('users') . ' (email, name, password_hash, role, status, lang, email_verified_at, activated_at, created_at) VALUES (?, ?, ?, "admin", "active", ?, ?, ?, ?)',
            [$email, mb_substr($name, 0, 100), password_hash($password, PASSWORD_DEFAULT), lang(), now_utc(), now_utc(), now_utc()]
        );
        set_setting('registration_open', '1');
        set_setting('schema_version', (string) SCHEMA_VERSION);
        set_setting('installed_at', now_utc());
        audit('install', HORTULUS_WEB_VERSION, (int) db()->lastInsertId());
        $done = true;
    }
}
?><!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hortulus – installatie</title><link rel="stylesheet" href="assets/web/site.css"></head>
<body><main class="wrap narrow">
<h1>Hortulus – installatie</h1>
<table class="list">
<?php foreach ($checks as $label => $ok): ?>
  <tr><td><?= e($label) ?></td><td><?= $ok ? '<span class="chip ok">OK</span>' : '<span class="chip bad">ontbreekt</span>' ?></td></tr>
<?php endforeach; ?>
</table>
<?php if ($dbError): ?><p class="flash bad">Database: <?= e($dbError) ?></p><?php endif; ?>
<?php if ($done): ?>
  <div class="flash ok">Klaar! De tabellen staan in de database en je beheerdersaccount is aangemaakt.</div>
  <ol>
    <li><strong>Verwijder nu install.php</strong> van de server.</li>
    <li>Meld je aan op <a href="login.php">de aanmeldpagina</a>.</li>
  </ol>
<?php elseif ($installed): ?>
  <div class="flash ok">Hortulus is al geïnstalleerd (ontbrekende tabellen en de afbeeldingen zijn bijgewerkt). Verwijder install.php van de server.</div>
<?php elseif (in_array(false, $checks, true)): ?>
  <div class="flash bad">Los eerst de punten op die ontbreken (vraag je hostingprovider om de PHP-extensies aan te zetten).</div>
<?php else: ?>
  <h2>Eerste beheerder</h2>
  <?php if ($error): ?><div class="flash bad"><?= e($error) ?></div><?php endif; ?>
  <form method="post" class="card stack">
    <?= csrf_field() ?><input type="hidden" name="token" value="<?= e($token) ?>">
    <?= field('name', 'Naam', 'text', '', ['required' => true, 'maxlength' => 100]) ?>
    <?= field('email', 'E-mailadres', 'email', ADMIN_EMAIL, ['required' => true]) ?>
    <?= field('password', 'Wachtwoord (min. ' . PASSWORD_MIN_LENGTH . ' tekens)', 'password', '', ['required' => true, 'autocomplete' => 'new-password', 'minlength' => PASSWORD_MIN_LENGTH]) ?>
    <?= field('password2', 'Herhaal het wachtwoord', 'password', '', ['required' => true, 'autocomplete' => 'new-password']) ?>
    <button class="btn primary">Installeren</button>
  </form>
<?php endif; ?>
</main></body></html>
