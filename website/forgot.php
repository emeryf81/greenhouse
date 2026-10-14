<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

$sent = false;
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    $email = mb_strtolower(trim((string) ($_POST['email'] ?? '')));
    if (rate_limit('forgot-ip:' . client_ip(), 5, 3600) && rate_limit('forgot-mail:' . $email, 3, 3600)) {
        $user = find_user_by_email($email);
        if ($user && $user['status'] === 'active') {
            $_SESSION['lang'] = $user['lang'];
            $token = create_token((int) $user['id'], 'reset', 3600);
            send_mail($user['email'], t('mail.reset.subject'), t('mail.reset.body', ['name' => $user['name'], 'link' => APP_URL . '/reset.php?t=' . $token]));
            audit('reset_request', '', (int) $user['id']);
        }
    }
    $sent = true; // same answer for every address
}
page_start(t('forgot.title'), 'auth');
?>
<section class="card narrow stack">
  <h1><?= e(t('forgot.title')) ?></h1>
  <?php if ($sent): ?><div class="flash ok"><?= e(t('forgot.sent')) ?></div><?php else: ?>
  <p class="muted"><?= e(t('forgot.intro')) ?></p>
  <form method="post" class="stack"><?= csrf_field() ?>
    <?= field('email', t('login.email'), 'email', '', ['required' => true, 'autocomplete' => 'email']) ?>
    <button class="btn primary"><?= e(t('forgot.submit')) ?></button></form>
  <?php endif; ?>
</section>
<?php page_end();
