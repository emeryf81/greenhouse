<?php
/** Own account: name and language, password, download my data, delete account. */
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

$user = require_login();
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    $action = (string) ($_POST['action'] ?? '');
    if ($action === 'profile') {
        $name = trim((string) ($_POST['name'] ?? '')) ?: $user['name'];
        $lang = isset(LANGS[$_POST['lang'] ?? '']) ? (string) $_POST['lang'] : $user['lang'];
        q('UPDATE ' . tbl('users') . ' SET name = ?, lang = ? WHERE id = ?', [mb_substr($name, 0, 100), $lang, $user['id']]);
        $_SESSION['lang'] = $lang;
        flash(t('gardens.saved'));
    } elseif ($action === 'password') {
        if (!password_verify((string) ($_POST['current'] ?? ''), $user['password_hash'])) {
            flash(t('account.wrong_current'), 'bad');
        } elseif ($p = password_problem((string) ($_POST['password'] ?? ''), (string) ($_POST['password2'] ?? ''))) {
            flash(t($p), 'bad');
        } else {
            $hash = password_hash((string) $_POST['password'], PASSWORD_DEFAULT);
            q('UPDATE ' . tbl('users') . ' SET password_hash = ? WHERE id = ?', [$hash, $user['id']]);
            $_SESSION['pwv'] = crc32($hash); // stay signed in here, other sessions end
            session_regenerate_id(true);
            audit('password_change');
            flash(t('gardens.saved'));
        }
    } elseif ($action === 'export') {
        $out = ['user' => ['name' => $user['name'], 'email' => $user['email'], 'lang' => $user['lang'], 'created_at' => $user['created_at']], 'gardens' => []];
        foreach (user_gardens((int) $user['id']) as $g) {
            if ($g['my_role'] !== 'owner') {
                continue;
            }
            $docs = load_documents($g['id']);
            $out['gardens'][] = ['title' => $g['title'], 'latitude' => $g['latitude'], 'longitude' => $g['longitude'],
                'document' => $docs['main'] ? json_decode($docs['main'], true) : null];
        }
        audit('export');
        header('Content-Type: application/json; charset=utf-8');
        header('Content-Disposition: attachment; filename="hortulus-' . date('Y-m-d') . '.json"');
        echo json_encode($out, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit;
    } elseif ($action === 'delete') {
        $word = ['nl' => 'VERWIJDER', 'fr' => 'SUPPRIMER', 'en' => 'DELETE'][lang()];
        if (trim((string) ($_POST['confirm'] ?? '')) === $word && password_verify((string) ($_POST['current'] ?? ''), $user['password_hash'])) {
            $admins = (int) q('SELECT COUNT(*) FROM ' . tbl('users') . ' WHERE role = "admin" AND status = "active"')->fetchColumn();
            if ($user['role'] === 'admin' && $admins <= 1) {
                flash(t('admin.self'), 'bad');
            } else {
                audit('account_delete', $user['email']);
                q('DELETE FROM ' . tbl('users') . ' WHERE id = ?', [$user['id']]); // gardens, tokens, memberships cascade
                logout_user();
                start_session();
                flash(t('account.deleted'));
                redirect('login.php');
            }
        } else {
            flash(t('account.delete_confirm'), 'bad');
        }
    }
    redirect('account.php');
}
page_start(t('account.title'));
?>
<h1><?= e(t('account.title')) ?></h1>
<div class="cards wide">
<section class="card stack"><h2><?= e(t('account.profile')) ?></h2>
  <form method="post" class="stack"><?= csrf_field() ?><input type="hidden" name="action" value="profile">
    <?= field('name', t('register.name'), 'text', $user['name'], ['required' => true, 'maxlength' => 100]) ?>
    <label class="field"><span><?= e(t('login.email')) ?></span><input value="<?= e($user['email']) ?>" disabled></label>
    <label class="field"><span><?= e(t('register.lang')) ?></span><select name="lang"><?php foreach (LANGS as $c => $n): ?><option value="<?= e($c) ?>"<?= $c === $user['lang'] ? ' selected' : '' ?>><?= e($n) ?></option><?php endforeach; ?></select></label>
    <button class="btn primary"><?= e(t('account.save')) ?></button></form></section>
<section class="card stack"><h2><?= e(t('account.password')) ?></h2>
  <form method="post" class="stack"><?= csrf_field() ?><input type="hidden" name="action" value="password">
    <?= field('current', t('account.current'), 'password', '', ['required' => true, 'autocomplete' => 'current-password']) ?>
    <?= field('password', t('account.new'), 'password', '', ['required' => true, 'minlength' => PASSWORD_MIN_LENGTH, 'autocomplete' => 'new-password']) ?>
    <?= field('password2', t('register.repeat'), 'password', '', ['required' => true, 'autocomplete' => 'new-password']) ?>
    <button class="btn primary"><?= e(t('account.save')) ?></button></form></section>
<section class="card stack"><h2><?= e(t('account.export')) ?></h2><p class="small muted"><?= e(t('account.export_intro')) ?></p>
  <form method="post"><?= csrf_field() ?><input type="hidden" name="action" value="export"><button class="btn"><?= e(t('account.export')) ?></button></form></section>
<section class="card stack danger"><h2><?= e(t('account.delete')) ?></h2><p class="small"><?= e(t('account.delete_intro')) ?></p>
  <form method="post" class="stack"><?= csrf_field() ?><input type="hidden" name="action" value="delete">
    <?= field('current', t('account.current'), 'password', '', ['required' => true, 'autocomplete' => 'current-password']) ?>
    <?= field('confirm', t('account.delete_confirm'), 'text', '', ['required' => true]) ?>
    <button class="btn danger"><?= e(t('account.delete')) ?></button></form></section>
</div>
<?php page_end();
