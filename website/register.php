<?php
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

if (current_user()) {
    redirect('');
}
$open = setting('registration_open', '1') === '1';
$errors = [];
$done = false;
$values = ['name' => '', 'email' => '', 'lang' => lang()];
if ($open && ($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    $values = ['name' => trim((string) ($_POST['name'] ?? '')), 'email' => mb_strtolower(trim((string) ($_POST['email'] ?? ''))),
        'lang' => isset(LANGS[$_POST['lang'] ?? '']) ? (string) $_POST['lang'] : lang()];
    $started = (int) ($_SESSION['register_form_at'] ?? 0);
    if (($_POST['website'] ?? '') !== '' || time() - $started < 3) {
        $done = true; // bot: pretend all went well
    } elseif (!rate_limit('register:' . client_ip(), 5, 3600)) {
        $errors[] = 'login.too_many';
    } else {
        if ($values['name'] === '' || mb_strlen($values['name']) > 100) {
            $errors[] = 'register.bad_name';
        }
        if (!filter_var($values['email'], FILTER_VALIDATE_EMAIL) || mb_strlen($values['email']) > 190) {
            $errors[] = 'register.bad_email';
        }
        if ($p = password_problem((string) ($_POST['password'] ?? ''), (string) ($_POST['password2'] ?? ''))) {
            $errors[] = $p;
        }
        if (empty($_POST['consent'])) {
            $errors[] = 'register.need_consent';
        }
        if (!$errors) {
            $existing = find_user_by_email($values['email']);
            if ($existing === null) {
                q(
                    'INSERT INTO ' . tbl('users') . ' (email, name, password_hash, lang, created_at) VALUES (?, ?, ?, ?, ?)',
                    [$values['email'], $values['name'], password_hash((string) $_POST['password'], PASSWORD_DEFAULT), $values['lang'], now_utc()]
                );
                $uid = (int) db()->lastInsertId();
                $_SESSION['lang'] = $values['lang'];
                $token = create_token($uid, 'verify', 86400);
                send_mail($values['email'], t('mail.verify.subject'), t('mail.verify.body', ['name' => $values['name'], 'link' => APP_URL . '/verify.php?t=' . $token]));
                audit('register', $values['email'], $uid);
            }
            // Same answer whether or not the address already had an account (no account discovery).
            $done = true;
        }
    }
}
$_SESSION['register_form_at'] = time();
page_start(t('register.title'), 'auth');
?>
<section class="card narrow stack">
  <h1><?= e(t('register.title')) ?></h1>
  <?php if (!$open): ?>
    <div class="flash bad"><?= e(t('register.closed')) ?></div>
  <?php elseif ($done): ?>
    <div class="flash ok" role="status"><?= e(t('register.done')) ?></div>
  <?php else: ?>
    <p class="muted"><?= e(t('register.intro')) ?></p>
    <?php foreach ($errors as $err): ?><div class="flash bad" role="alert"><?= e(t($err)) ?></div><?php endforeach; ?>
    <form method="post" class="stack" autocomplete="on">
      <?= csrf_field() ?>
      <label class="hp" aria-hidden="true">Website <input name="website" tabindex="-1" autocomplete="off"></label>
      <?= field('name', t('register.name'), 'text', $values['name'], ['required' => true, 'maxlength' => 100, 'autocomplete' => 'name']) ?>
      <?= field('email', t('login.email'), 'email', $values['email'], ['required' => true, 'autocomplete' => 'email']) ?>
      <?= field('password', t('login.password'), 'password', '', ['required' => true, 'minlength' => PASSWORD_MIN_LENGTH, 'autocomplete' => 'new-password']) ?>
      <p class="xs muted"><?= e(t('register.hint_pw', ['n' => PASSWORD_MIN_LENGTH])) ?></p>
      <?= field('password2', t('register.repeat'), 'password', '', ['required' => true, 'autocomplete' => 'new-password']) ?>
      <label class="field"><span><?= e(t('register.lang')) ?></span><select name="lang">
        <?php foreach (LANGS as $code => $name): ?><option value="<?= e($code) ?>"<?= $code === $values['lang'] ? ' selected' : '' ?>><?= e($name) ?></option><?php endforeach; ?>
      </select></label>
      <label class="check"><input type="checkbox" name="consent" value="1" required> <?= e(t('register.consent')) ?></label>
      <button class="btn primary"><?= e(t('register.submit')) ?></button>
    </form>
  <?php endif; ?>
</section>
<?php page_end();
