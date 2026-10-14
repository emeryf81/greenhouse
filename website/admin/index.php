<?php
/** Admin: activate requests, manage users and gardens, settings, logs, system. */
declare(strict_types=1);
require dirname(__DIR__) . '/bootstrap.php';
boot();

$admin = require_admin();
$tab = (string) ($_GET['tab'] ?? 'users');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    $action = (string) ($_POST['action'] ?? '');
    $uid = (int) ($_POST['user_id'] ?? 0);
    $target = $uid ? q('SELECT * FROM ' . tbl('users') . ' WHERE id = ?', [$uid])->fetch() : null;
    if ($target && (int) $target['id'] === (int) $admin['id'] && $action !== 'reset') {
        flash(t('admin.self'), 'bad');
    } elseif ($target) {
        switch ($action) {
            case 'activate':
                activate_user($target, $admin);
                flash(t('admin.activated'));
                break;
            case 'reject':
            case 'delete':
                q('DELETE FROM ' . tbl('users') . ' WHERE id = ?', [$uid]);
                audit('user_' . $action, $target['email']);
                flash(t('gardens.saved'));
                break;
            case 'disable':
                q('UPDATE ' . tbl('users') . ' SET status = "disabled" WHERE id = ?', [$uid]);
                audit('user_disable', $target['email']);
                break;
            case 'enable':
                q('UPDATE ' . tbl('users') . ' SET status = "active", activated_at = COALESCE(activated_at, ?) WHERE id = ?', [now_utc(), $uid]);
                audit('user_enable', $target['email']);
                break;
            case 'role':
                $role = ($_POST['role'] ?? '') === 'admin' ? 'admin' : 'user';
                q('UPDATE ' . tbl('users') . ' SET role = ? WHERE id = ?', [$role, $uid]);
                audit('user_role', $target['email'] . ' → ' . $role);
                break;
            case 'reset':
                $keep = $_SESSION['lang'] ?? null;
                $_SESSION['lang'] = $target['lang'];
                $token = create_token($uid, 'reset', 3600);
                send_mail($target['email'], t('mail.reset.subject'), t('mail.reset.body', ['name' => $target['name'], 'link' => APP_URL . '/reset.php?t=' . $token]));
                $_SESSION['lang'] = $keep;
                audit('admin_reset_link', $target['email']);
                flash(t('forgot.sent'));
                break;
        }
    } elseif ($action === 'test_mail') {
        $to = trim((string) ($_POST['to'] ?? '')) ?: ADMIN_EMAIL;
        send_mail($to, 'Hortulus: testmail', "Dit is een testmail van Hortulus.\n\nRoute: " . mail_route() . "\nAfzender: " . mail_from() . "\nVerstuurd: " . now_utc() . " UTC\n", null, $res);
        $_SESSION['mail_test'] = ['to' => $to, 'ok' => $res['ok'], 'error' => $res['error'], 'log' => $res['log']];
        audit('admin_test_mail', $to . ($res['ok'] ? ' ok' : ' fout'));
    } elseif ($action === 'log_clear') {
        q('DELETE FROM ' . tbl('log'));
        audit('admin_log_clear');
        flash(t('gardens.saved'));
    } elseif ($action === 'settings') {
        set_setting('registration_open', !empty($_POST['registration_open']) ? '1' : '0');
        audit('settings');
        flash(t('gardens.saved'));
    } elseif ($action === 'garden_delete') {
        $g = q('SELECT title FROM ' . tbl('gardens') . ' WHERE id = ?', [(string) ($_POST['garden_id'] ?? '')])->fetchColumn();
        if ($g !== false) {
            delete_garden((string) $_POST['garden_id']);
            audit('admin_garden_delete', (string) $g);
            flash(t('gardens.deleted'));
        }
    } elseif ($action === 'restore') {
        $v = q('SELECT * FROM ' . tbl('document_versions') . ' WHERE id = ?', [(int) ($_POST['version_id'] ?? 0)])->fetch();
        if ($v) {
            $content = gzuncompress($v['content']);
            if ($content !== false) {
                save_document($v['garden_id'], 'main', $content, (int) $admin['id']);
                audit('admin_restore', $v['garden_id'] . ' @ ' . $v['created_at']);
                flash(t('gardens.saved'));
            }
        }
    }
    redirect('admin/?tab=' . rawurlencode($tab));
}

$problems = 0;
$mailFailed = 0;
try {
    $since = gmdate('Y-m-d H:i:s', time() - 86400);
    $problems = (int) q('SELECT COUNT(*) FROM ' . tbl('log') . ' WHERE level = "error" AND created_at > ?', [$since])->fetchColumn();
    $mailFailed = (int) q('SELECT COUNT(*) FROM ' . tbl('mail_log') . ' WHERE ok = 0 AND created_at > ?', [$since])->fetchColumn();
} catch (Throwable) {
}
$tabs = ['users' => t('admin.users'), 'gardens' => t('admin.gardens'), 'settings' => t('admin.settings'), 'log' => t('admin.log'), 'mail' => t('admin.mail'), 'audit' => t('admin.audit'), 'system' => t('admin.system')];
$badges = ['log' => $problems, 'mail' => $mailFailed];
$pending = q('SELECT * FROM ' . tbl('users') . ' WHERE status = "pending" ORDER BY created_at')->fetchAll();
page_start(t('admin.title'));
function admin_button(string $action, int $uid, string $label, string $class = 'ghost', array $extra = []): string
{
    $h = '<form method="post" class="inline">' . csrf_field() . '<input type="hidden" name="action" value="' . e($action) . '"><input type="hidden" name="user_id" value="' . $uid . '">';
    foreach ($extra as $k => $v) {
        $h .= '<input type="hidden" name="' . e($k) . '" value="' . e($v) . '">';
    }
    $confirm = in_array($action, ['delete', 'reject'], true) ? ' data-confirm="' . e(t('admin.confirm')) . '"' : '';
    return $h . '<button class="btn small ' . e($class) . '"' . $confirm . '>' . e($label) . '</button></form>';
}
?>
<h1><?= e(t('admin.title')) ?></h1>
<section class="card stack">
  <h2><?= e(t('admin.pending')) ?> <span class="chip"><?= count($pending) ?></span></h2>
  <?php if (!$pending): ?><p class="small muted"><?= e(t('admin.none_pending')) ?></p><?php else: ?><table class="list">
  <?php foreach ($pending as $u): ?><tr><td><strong><?= e($u['name']) ?></strong><br><span class="xs muted"><?= e($u['email']) ?> · <?= e($u['created_at']) ?> UTC<?= $u['email_verified_at'] ? '' : ' · ' . e(t('admin.unverified')) ?></span></td>
    <td class="right"><?= admin_button('activate', (int) $u['id'], t('admin.activate'), 'primary') ?> <?= admin_button('reject', (int) $u['id'], t('admin.reject')) ?></td></tr><?php endforeach; ?>
  </table><?php endif; ?>
</section>
<?php if ($problems || $mailFailed): ?><p class="flash bad"><?= e(t('admin.problems', ['n' => $problems, 'm' => $mailFailed])) ?> <a href="?tab=<?= $mailFailed ? 'mail' : 'log' ?>"><?= e(t('admin.show')) ?></a></p><?php endif; ?>
<nav class="tabs"><?php foreach ($tabs as $k => $label): ?><a href="?tab=<?= e($k) ?>" class="<?= $k === $tab ? 'on' : '' ?>"><?= e($label) ?><?= !empty($badges[$k]) ? ' <span class="chip bad">' . (int) $badges[$k] . '</span>' : '' ?></a><?php endforeach; ?></nav>
<section class="card stack">
<?php if ($tab === 'users'):
    $users = q('SELECT u.*, (SELECT COUNT(*) FROM ' . tbl('gardens') . ' g WHERE g.owner_id = u.id) AS gardens FROM ' . tbl('users') . ' u ORDER BY u.created_at DESC')->fetchAll(); ?>
  <table class="list"><tr><th><?= e(t('register.name')) ?></th><th><?= e(t('common.status')) ?></th><th><?= e(t('common.role')) ?></th><th><?= e(t('admin.gardens')) ?></th><th><?= e(t('common.actions')) ?></th></tr>
  <?php foreach ($users as $u): $id = (int) $u['id']; ?><tr>
    <td><strong><?= e($u['name']) ?></strong><br><span class="xs muted"><?= e($u['email']) ?> · <?= e($u['last_login_at'] ?? '–') ?></span></td>
    <td><span class="chip <?= $u['status'] === 'active' ? 'ok' : ($u['status'] === 'disabled' ? 'bad' : '') ?>"><?= e(t('status.' . $u['status'])) ?></span></td>
    <td><?= e($u['role']) ?></td><td><?= (int) $u['gardens'] ?></td>
    <td class="right"><?php if ($id !== (int) $admin['id']): ?>
      <?= $u['status'] === 'active' ? admin_button('disable', $id, t('admin.disable')) : admin_button($u['status'] === 'pending' ? 'activate' : 'enable', $id, $u['status'] === 'pending' ? t('admin.activate') : t('admin.enable')) ?>
      <?= admin_button('role', $id, $u['role'] === 'admin' ? t('admin.make_user') : t('admin.make_admin'), 'ghost', ['role' => $u['role'] === 'admin' ? 'user' : 'admin']) ?>
      <?= $u['status'] === 'active' ? admin_button('reset', $id, t('admin.reset_link')) : '' ?>
      <?= admin_button('delete', $id, t('admin.delete'), 'danger') ?>
    <?php endif; ?></td></tr><?php endforeach; ?></table>
<?php elseif ($tab === 'gardens'):
    $gardens = q('SELECT g.id, g.title, g.updated_at, g.share_mode, g.share_admin, g.share_icon, u.name AS owner, u.email,
        (SELECT LENGTH(content) FROM ' . tbl('documents') . ' d WHERE d.garden_id = g.id AND d.doc_key = "main") AS bytes,
        (SELECT COUNT(*) FROM ' . tbl('photos') . ' p WHERE p.garden_id = g.id) AS photos,
        (SELECT COALESCE(SUM(bytes), 0) FROM ' . tbl('photos') . ' p WHERE p.garden_id = g.id) AS photo_bytes,
        (SELECT COUNT(*) FROM ' . tbl('files') . ' f WHERE f.garden_id = g.id) AS files
        FROM ' . tbl('gardens') . ' g JOIN ' . tbl('users') . ' u ON u.id = g.owner_id ORDER BY g.updated_at DESC')->fetchAll(); ?>
  <table class="list"><tr><th><?= e(t('admin.gardens')) ?></th><th>Data</th><th><?= e(t('common.actions')) ?></th></tr>
  <?php foreach ($gardens as $g): $versions = q('SELECT id, created_at, bytes FROM ' . tbl('document_versions') . ' WHERE garden_id = ? ORDER BY id DESC LIMIT 8', [$g['id']])->fetchAll(); ?><tr>
    <td><span class="gicon sm" style="--h:<?= garden_hue($g) ?>" aria-hidden="true"><?= garden_icon($g) ?></span> <strong><?= e($g['title']) ?></strong>
      <?php if (($g['share_mode'] ?? 'off') !== 'off'): ?><span class="chip"><?= e(t('share.mode.' . $g['share_mode'])) ?></span><?php endif; ?>
      <?php if ((int) ($g['share_admin'] ?? 0)): ?><span class="chip ok"><?= e(t('admin.view_allowed')) ?></span><?php endif; ?>
      <br><span class="xs muted"><?= e($g['owner']) ?> (<?= e($g['email']) ?>) · <?= e($g['updated_at']) ?> UTC</span></td>
    <td class="xs"><?= number_format(((int) $g['bytes']) / 1024, 0, ',', '.') ?> kB · <?= (int) $g['photos'] ?> foto's (<?= number_format($g['photo_bytes'] / 1048576, 1, ',', '.') ?> MB) · <?= (int) $g['files'] ?> PDF</td>
    <td class="right">
      <?php if ($versions): ?><details><summary class="btn small ghost"><?= e(t('admin.versions')) ?></summary>
        <?php foreach ($versions as $v): ?><form method="post" class="inline"><?= csrf_field() ?><input type="hidden" name="action" value="restore"><input type="hidden" name="version_id" value="<?= (int) $v['id'] ?>">
          <button class="btn small ghost" data-confirm="<?= e(t('admin.confirm')) ?>"><?= e($v['created_at']) ?></button></form><?php endforeach; ?></details><?php endif; ?>
      <?php if ((int) ($g['share_admin'] ?? 0)): ?><a class="btn small" href="<?= e(url('view.php?admin=' . $g['id'])) ?>"><?= e(t('admin.view_garden')) ?></a><?php endif; ?>
      <form method="post" class="inline"><?= csrf_field() ?><input type="hidden" name="action" value="garden_delete"><input type="hidden" name="garden_id" value="<?= e($g['id']) ?>"><button class="btn small danger" data-confirm="<?= e(t('admin.confirm')) ?>"><?= e(t('admin.delete')) ?></button></form>
    </td></tr><?php endforeach; ?></table>
<?php elseif ($tab === 'settings'): ?>
  <form method="post" class="stack"><?= csrf_field() ?><input type="hidden" name="action" value="settings">
    <label class="check"><input type="checkbox" name="registration_open" value="1"<?= setting('registration_open', '1') === '1' ? ' checked' : '' ?>> <?= e(t('admin.registration_open')) ?></label>
    <p class="small muted">ADMIN_EMAIL: <?= e(ADMIN_EMAIL) ?> · <?= e(t('admin.mail_from')) ?>: <?= e(mail_from()) ?> · <?= e(mail_route()) ?></p>
    <button class="btn primary"><?= e(t('common.save')) ?></button></form>
<?php elseif ($tab === 'audit'):
    $rows = q('SELECT a.*, u.name FROM ' . tbl('audit') . ' a LEFT JOIN ' . tbl('users') . ' u ON u.id = a.user_id ORDER BY a.id DESC LIMIT 300')->fetchAll(); ?>
  <table class="list xs"><?php foreach ($rows as $r): ?><tr><td><?= e($r['created_at']) ?></td><td><?= e($r['name'] ?? '–') ?></td><td><?= e($r['action']) ?></td><td><?= e($r['detail']) ?></td><td><?= e($r['ip']) ?></td></tr><?php endforeach; ?></table>
<?php elseif ($tab === 'log'):
    try {
        q('DELETE FROM ' . tbl('log') . ' WHERE created_at < ?', [gmdate('Y-m-d H:i:s', time() - 90 * 86400)]); // keep 90 days
    } catch (Throwable) {
    }
    $channels = ['client', 'api', 'php', 'db', 'mail', 'ha', 'share', 'auth', 'system'];
    $req = preg_replace('/[^a-f0-9]/', '', strtolower((string) ($_GET['req'] ?? '')));
    $ch = in_array($_GET['ch'] ?? '', $channels, true) ? (string) $_GET['ch'] : '';
    $lv = in_array($_GET['lv'] ?? '', ['error', 'warn', 'info'], true) ? (string) $_GET['lv'] : '';
    $where = [];
    $args = [];
    if ($ch !== '') { $where[] = 'l.channel = ?'; $args[] = $ch; }
    if ($lv !== '') { $where[] = 'l.level = ?'; $args[] = $lv; }
    if ($req !== '') { $where[] = 'l.req = ?'; $args[] = $req; }
    $rows = q('SELECT l.*, u.name FROM ' . tbl('log') . ' l LEFT JOIN ' . tbl('users') . ' u ON u.id = l.user_id'
        . ($where ? ' WHERE ' . implode(' AND ', $where) : '') . ' ORDER BY l.id DESC LIMIT 300', $args)->fetchAll();
    $counts = q('SELECT channel, level, COUNT(*) AS n FROM ' . tbl('log') . ' GROUP BY channel, level')->fetchAll(); ?>
  <p class="small muted"><?= e(t('admin.log_intro')) ?></p>
  <form method="get" class="row"><input type="hidden" name="tab" value="log"><label class="small"><?= e(t('admin.log_req')) ?> <input name="req" value="<?= e($req) ?>" size="10" placeholder="a1b2c3d4" style="width:auto"></label><button class="btn small"><?= e(t('public.go')) ?></button></form>
  <div class="row wrap">
    <a class="chip<?= $ch === '' && $lv === '' ? ' on' : '' ?>" href="?tab=log"><?= e(t('admin.log_all')) ?></a>
    <a class="chip bad<?= $lv === 'error' ? ' on' : '' ?>" href="?tab=log&amp;lv=error"><?= e(t('admin.log_level.error')) ?></a>
    <a class="chip<?= $lv === 'warn' ? ' on' : '' ?>" href="?tab=log&amp;lv=warn"><?= e(t('admin.log_level.warn')) ?></a>
    <?php foreach ($channels as $c): $n = array_sum(array_map(static fn ($r) => $r['channel'] === $c ? (int) $r['n'] : 0, $counts)); ?>
      <a class="chip<?= $ch === $c ? ' on' : '' ?>" href="?tab=log&amp;ch=<?= e($c) ?>"><?= e(t('admin.log_ch.' . $c)) ?> (<?= $n ?>)</a>
    <?php endforeach; ?>
  </div>
  <?php if (!$rows): ?><p class="small muted"><?= e(t('admin.log_empty')) ?></p><?php else: ?>
  <table class="list xs log">
  <?php foreach ($rows as $r): ?><tr class="lv-<?= e($r['level']) ?>">
    <td class="nowrap"><?= e($r['created_at']) ?></td>
    <td><span class="chip <?= $r['level'] === 'error' ? 'bad' : ($r['level'] === 'warn' ? 'warn' : 'ok') ?>"><?= e(t('admin.log_level.' . $r['level'])) ?></span></td>
    <td><?= e(t('admin.log_ch.' . $r['channel'])) ?></td>
    <td><?= e($r['message']) ?><?php if ($r['detail']): ?><details><summary><?= e(t('admin.details')) ?></summary><pre class="logpre"><?= e($r['detail']) ?></pre></details><?php endif; ?></td>
    <td><?= e($r['name'] ?? '') ?><br><span class="muted"><?= e($r['ip'] ?? '') ?></span><?php if (!empty($r['req'])): ?><br><a class="muted" href="?tab=log&amp;req=<?= e($r['req']) ?>" title="<?= e(t('admin.log_req')) ?>">#<?= e($r['req']) ?></a><?php endif; ?></td>
  </tr><?php endforeach; ?></table><?php endif; ?>
  <form method="post"><?= csrf_field() ?><input type="hidden" name="action" value="log_clear"><button class="btn small ghost" data-confirm="<?= e(t('admin.confirm')) ?>"><?= e(t('admin.log_clear')) ?></button></form>
<?php elseif ($tab === 'mail'):
    $test = $_SESSION['mail_test'] ?? null;
    unset($_SESSION['mail_test']);
    try {
        $rows = q('SELECT * FROM ' . tbl('mail_log') . ' ORDER BY id DESC LIMIT 200')->fetchAll();
    } catch (Throwable) {
        $rows = [];
    } ?>
  <p class="small"><?= e(t('admin.mail_route')) ?>: <strong><?= e(mail_route()) ?></strong> · <?= e(t('admin.mail_from')) ?>: <strong><?= e(mail_from()) ?></strong> · ADMIN_EMAIL: <?= e(ADMIN_EMAIL) ?></p>
  <form method="post" class="row wrap"><?= csrf_field() ?><input type="hidden" name="action" value="test_mail">
    <label><?= e(t('admin.test_to')) ?> <input type="email" name="to" value="<?= e(ADMIN_EMAIL) ?>"></label>
    <button class="btn primary"><?= e(t('admin.test_send')) ?></button></form>
  <?php if ($test): ?><div class="flash <?= $test['ok'] ? 'ok' : 'bad' ?>">
    <strong><?= e($test['ok'] ? t('admin.test_ok', ['to' => $test['to']]) : t('admin.test_fail', ['to' => $test['to']])) ?></strong>
    <?php if (!$test['ok']): ?><p><?= e((string) $test['error']) ?></p><?php endif; ?>
    <details<?= $test['ok'] ? '' : ' open' ?>><summary><?= e(t('admin.mail_conversation')) ?></summary><pre class="logpre"><?= e((string) $test['log']) ?></pre></details>
  </div><?php endif; ?>
  <table class="list xs"><?php foreach ($rows as $r): ?><tr>
    <td class="nowrap"><?= e($r['created_at']) ?></td><td><?= e($r['to_addr']) ?></td><td><?= e($r['subject']) ?></td>
    <td><?= $r['ok'] ? '<span class="chip ok">OK</span>' : '<span class="chip bad">' . e(t('admin.failed')) . '</span>' ?>
      <?php if (!empty($r['error'])): ?><br><?= e($r['error']) ?><?php endif; ?>
      <?php if (!empty($r['detail'])): ?><details><summary><?= e(t('admin.mail_conversation')) ?></summary><pre class="logpre"><?= e($r['detail']) ?></pre></details><?php endif; ?></td>
  </tr><?php endforeach; ?></table>
<?php else:
    $size = q('SELECT COALESCE(SUM(data_length + index_length), 0) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name LIKE ?', [DB_PREFIX . '%'])->fetchColumn(); ?>
  <table class="list">
    <tr><th>Hortulus web</th><td><?= e(HORTULUS_WEB_VERSION) ?></td></tr>
    <tr><th>PHP</th><td><?= e(PHP_VERSION) ?> · upload_max_filesize <?= e((string) ini_get('upload_max_filesize')) ?> · post_max_size <?= e((string) ini_get('post_max_size')) ?></td></tr>
    <tr><th>MariaDB</th><td><?= e((string) db()->query('SELECT VERSION()')->fetchColumn()) ?> · max_allowed_packet <?= number_format((int) db()->query('SELECT @@max_allowed_packet')->fetchColumn() / 1048576, 0) ?> MB</td></tr>
    <tr><th>Database (hortulus_*)</th><td><?= number_format(((int) $size) / 1048576, 1, ',', '.') ?> MB</td></tr>
    <tr><th>HTTPS</th><td><?= is_https() ? 'ja' : '<span class="chip bad">nee</span>' ?></td></tr>
    <tr><th>install.php</th><td><?= is_file(dirname(__DIR__) . '/install.php') ? '<span class="chip bad">nog aanwezig – verwijder het bestand</span>' : 'verwijderd' ?></td></tr>
  </table>
<?php endif; ?>
</section>
<?php page_end();
