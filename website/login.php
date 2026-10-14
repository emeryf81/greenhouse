<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

if (current_user()) {
    redirect('');
}
$error = null;
$email = '';
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    $email = (string) ($_POST['email'] ?? '');
    [$user, $error] = attempt_login($email, (string) ($_POST['password'] ?? ''));
    if ($user) {
        login_user($user);
        $next = (string) ($_SESSION['after_login'] ?? '');
        unset($_SESSION['after_login']);
        // only local paths below the site
        header('Location: ' . (str_starts_with($next, APP_BASE . '/') && !str_contains($next, '//') ? $next : url('')));
        exit;
    }
}
page_start(t('login.title'), 'auth');
?>
<section class="card narrow stack">
  <h1><?= e(t('login.title')) ?></h1>
  <p class="muted"><?= e(t('tagline')) ?></p>
  <?php if ($error): ?><div class="flash bad" role="alert"><?= e(t($error)) ?></div><?php endif; ?>
  <form method="post" class="stack">
    <?= csrf_field() ?>
    <?= field('email', t('login.email'), 'email', $email, ['required' => true, 'autocomplete' => 'email', 'autofocus' => true]) ?>
    <?= field('password', t('login.password'), 'password', '', ['required' => true, 'autocomplete' => 'current-password']) ?>
    <button class="btn primary"><?= e(t('login.submit')) ?></button>
  </form>
  <p class="small"><a href="<?= e(url('forgot.php')) ?>"><?= e(t('login.forgot')) ?></a> · <?= e(t('login.no_account')) ?> <a href="<?= e(url('register.php')) ?>"><?= e(t('nav.register')) ?></a></p>
</section>
<?php page_end();
