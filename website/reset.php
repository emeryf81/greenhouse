<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

$token = (string) ($_GET['t'] ?? $_POST['t'] ?? '');
$row = peek_token($token, 'reset');
$error = null;
if ($row && ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    if ($p = password_problem((string) ($_POST['password'] ?? ''), (string) ($_POST['password2'] ?? ''))) {
        $error = $p;
    } else {
        consume_token($row);
        q('UPDATE ' . tbl('users') . ' SET password_hash = ?, failed_logins = 0, locked_until = NULL WHERE id = ?', [password_hash((string) $_POST['password'], PASSWORD_DEFAULT), $row['user_id']]);
        audit('password_reset', '', (int) $row['user_id']);
        flash(t('reset.done'));
        redirect('login.php');
    }
}
page_start(t('reset.title'), 'auth');
?>
<section class="card narrow stack">
  <h1><?= e(t('reset.title')) ?></h1>
  <?php if (!$row): ?><div class="flash bad"><?= e(t('verify.bad')) ?></div><?php else: ?>
  <?php if ($error): ?><div class="flash bad"><?= e(t($error)) ?></div><?php endif; ?>
  <form method="post" class="stack"><?= csrf_field() ?><input type="hidden" name="t" value="<?= e($token) ?>">
    <?= field('password', t('account.new'), 'password', '', ['required' => true, 'minlength' => PASSWORD_MIN_LENGTH, 'autocomplete' => 'new-password']) ?>
    <?= field('password2', t('register.repeat'), 'password', '', ['required' => true, 'autocomplete' => 'new-password']) ?>
    <button class="btn primary"><?= e(t('reset.submit')) ?></button></form>
  <?php endif; ?>
</section>
<?php page_end();
