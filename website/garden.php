<?php
/** Garden settings for the owner: name and place, sharing, Home Assistant link, saved PDFs, delete. */
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

$user = require_login();
$garden = require_garden((string) ($_GET['g'] ?? $_POST['g'] ?? ''), $user);
if ($garden['my_role'] !== 'owner') {
    http_response_code(403);
    exit;
}
$gid = $garden['id'];
$back = 'garden.php?g=' . $gid;
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    $action = (string) ($_POST['action'] ?? '');
    if ($action === 'save') {
        $title = trim((string) ($_POST['title'] ?? '')) ?: $garden['title'];
        $lat = max(-90, min(90, (float) str_replace(',', '.', (string) $_POST['lat'])));
        $lon = max(-180, min(180, (float) str_replace(',', '.', (string) $_POST['lon'])));
        $preset = isset(PRESETS[$_POST['preset'] ?? '']) ? (string) $_POST['preset'] : $garden['preset'];
        q('UPDATE ' . tbl('gardens') . ' SET title = ?, latitude = ?, longitude = ?, preset = ? WHERE id = ?', [mb_substr($title, 0, 100), $lat, $lon, $preset, $gid]);
        flash(t('gardens.saved'));
    } elseif ($action === 'share') {
        $other = find_user_by_email((string) ($_POST['email'] ?? ''));
        if (!$other || $other['status'] !== 'active' || (int) $other['id'] === (int) $user['id']) {
            flash(t('gardens.share_unknown'), 'bad');
        } else {
            $role = ($_POST['role'] ?? '') === 'editor' ? 'editor' : 'viewer';
            q('INSERT INTO ' . tbl('garden_members') . ' (garden_id, user_id, role, created_at) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE role = VALUES(role)', [$gid, $other['id'], $role, now_utc()]);
            audit('garden_share', $garden['title'] . ' → ' . $other['email']);
            flash(t('gardens.saved'));
        }
    } elseif ($action === 'show') {
        $mode = in_array($_POST['share_mode'] ?? '', ['off', 'link', 'public'], true) ? (string) $_POST['share_mode'] : 'off';
        $sections = array_values(array_intersect(SHARE_SECTIONS, (array) ($_POST['sections'] ?? [])));
        $icon = in_array($_POST['share_icon'] ?? '', SHARE_ICONS, true) ? (string) $_POST['share_icon'] : null;
        $note = mb_substr(trim(preg_replace('/\s+/', ' ', (string) ($_POST['share_note'] ?? '')) ?? ''), 0, 280);
        $token = $garden['share_token'] ?: random_token(16);
        q('UPDATE ' . tbl('gardens') . ' SET share_mode = ?, share_token = ?, share_sections = ?, share_admin = ?, share_icon = ?, share_note = ?, shared_at = IF(? <> "off" AND (shared_at IS NULL OR share_mode = "off"), ?, shared_at) WHERE id = ?',
            [$mode, $token, implode(',', $sections), !empty($_POST['share_admin']) ? 1 : 0, $icon, $note ?: null, $mode, now_utc(), $gid]);
        audit('garden_show', $garden['title'] . ' → ' . $mode . ($sections ? ' (' . implode(',', $sections) . ')' : '') . (!empty($_POST['share_admin']) ? ' +admin' : ''));
        flash(t('gardens.saved'));
    } elseif ($action === 'new_link') {
        q('UPDATE ' . tbl('gardens') . ' SET share_token = ? WHERE id = ?', [random_token(16), $gid]);
        audit('garden_new_link', $garden['title']);
        flash(t('share.new_link_done'));
    } elseif ($action === 'unshare') {
        q('DELETE FROM ' . tbl('garden_members') . ' WHERE garden_id = ? AND user_id = ?', [$gid, (int) ($_POST['user_id'] ?? 0)]);
        flash(t('gardens.saved'));
    } elseif ($action === 'ha_save') {
        $url = rtrim(trim((string) ($_POST['ha_url'] ?? '')), '/');
        $token = trim((string) ($_POST['ha_token'] ?? ''));
        $existing = q('SELECT token_enc FROM ' . tbl('ha_links') . ' WHERE garden_id = ?', [$gid])->fetchColumn();
        if (!ha_url_ok($url) || ($token === '' && !$existing)) {
            flash(t('gardens.ha_fail', ['error' => 'URL / token']), 'bad');
        } else {
            $sealed = $token !== '' ? seal($token) : (string) $existing;
            q('INSERT INTO ' . tbl('ha_links') . ' (garden_id, base_url, token_enc, enabled) VALUES (?, ?, ?, 1) ON DUPLICATE KEY UPDATE base_url = VALUES(base_url), token_enc = VALUES(token_enc), enabled = 1', [$gid, $url, $sealed]);
            audit('ha_link', $garden['title']);
            $link = ha_link($gid);
            [$status, $states, $err] = $link ? ha_request($link, 'GET', '/api/states') : [0, null, 'token'];
            flash($err ? t('gardens.ha_fail', ['error' => $err]) : t('gardens.ha_ok', ['n' => is_array($states) ? count($states) : 0]), $err ? 'bad' : 'ok');
        }
    } elseif ($action === 'ha_remove') {
        q('DELETE FROM ' . tbl('ha_links') . ' WHERE garden_id = ?', [$gid]);
        flash(t('gardens.saved'));
    } elseif ($action === 'file_delete') {
        q('DELETE FROM ' . tbl('files') . ' WHERE id = ? AND garden_id = ?', [(string) ($_POST['file_id'] ?? ''), $gid]);
        flash(t('gardens.saved'));
    } elseif ($action === 'delete') {
        if (trim((string) ($_POST['confirm'] ?? '')) === $garden['title']) {
            audit('garden_delete', $garden['title']);
            delete_garden($gid);
            flash(t('gardens.deleted'));
            redirect('');
        }
        flash(t('gardens.delete_confirm'), 'bad');
    }
    redirect($back);
}
$members = q('SELECT u.id, u.name, u.email, m.role FROM ' . tbl('garden_members') . ' m JOIN ' . tbl('users') . ' u ON u.id = m.user_id WHERE m.garden_id = ? ORDER BY u.name', [$gid])->fetchAll();
$ha = q('SELECT base_url FROM ' . tbl('ha_links') . ' WHERE garden_id = ?', [$gid])->fetchColumn();
$files = q('SELECT id, filename, bytes, created_at FROM ' . tbl('files') . ' WHERE garden_id = ? ORDER BY created_at DESC', [$gid])->fetchAll();
page_start($garden['title']);
?>
<p><a href="<?= e(url('')) ?>">← <?= e(t('nav.gardens')) ?></a></p>
<h1><?= e($garden['title']) ?></h1>
<div class="cards wide">
<section class="card stack">
  <h2><?= e(t('gardens.settings')) ?></h2>
  <form method="post" class="grid2"><?= csrf_field() ?><input type="hidden" name="action" value="save"><input type="hidden" name="g" value="<?= e($gid) ?>">
    <?= field('title', t('gardens.name'), 'text', $garden['title'], ['required' => true, 'maxlength' => 100]) ?>
    <label class="field"><span><?= e(t('gardens.region')) ?></span><select name="preset">
      <?php foreach (PRESETS as $k => $label): ?><option value="<?= e($k) ?>"<?= $k === $garden['preset'] ? ' selected' : '' ?>><?= e($label) ?></option><?php endforeach; ?></select></label>
    <?= field('lat', t('gardens.lat'), 'text', (string) $garden['latitude'], ['data-geo' => 'lat']) ?>
    <?= field('lon', t('gardens.lon'), 'text', (string) $garden['longitude'], ['data-geo' => 'lon']) ?>
    <div class="row"><button type="button" class="btn ghost" data-locate><?= e(t('gardens.locate')) ?></button><button class="btn primary"><?= e(t('common.save')) ?></button></div>
  </form>
</section>
<section class="card stack">
  <h2><?= e(t('gardens.share')) ?></h2>
  <?php if ($members): ?><table class="list"><?php foreach ($members as $m): ?>
    <tr><td><?= e($m['name']) ?><br><span class="xs muted"><?= e($m['email']) ?></span></td><td><?= e(t('gardens.role.' . $m['role'])) ?></td>
    <td><form method="post"><?= csrf_field() ?><input type="hidden" name="g" value="<?= e($gid) ?>"><input type="hidden" name="action" value="unshare"><input type="hidden" name="user_id" value="<?= (int) $m['id'] ?>"><button class="btn small ghost"><?= e(t('gardens.remove')) ?></button></form></td></tr>
  <?php endforeach; ?></table><?php endif; ?>
  <form method="post" class="grid2"><?= csrf_field() ?><input type="hidden" name="g" value="<?= e($gid) ?>"><input type="hidden" name="action" value="share">
    <?= field('email', t('gardens.share_email'), 'email', '', ['required' => true]) ?>
    <label class="field"><span><?= e(t('common.role')) ?></span><select name="role"><option value="viewer"><?= e(t('gardens.role.viewer')) ?></option><option value="editor"><?= e(t('gardens.role.editor')) ?></option></select></label>
    <div class="row"><button class="btn"><?= e(t('gardens.share_add')) ?></button></div>
  </form>
</section>
<section class="card stack" id="show">
  <h2><?= e(t('share.title')) ?></h2>
  <p class="small muted"><?= e(t('share.intro')) ?></p>
  <?php $mode = $garden['share_mode'] ?? 'off'; $secs = share_sections($garden); $shareUrl = $garden['share_token'] ? APP_URL . '/view.php?s=' . $garden['share_token'] : ''; ?>
  <form method="post" class="stack"><?= csrf_field() ?><input type="hidden" name="g" value="<?= e($gid) ?>"><input type="hidden" name="action" value="show">
    <fieldset class="stack plain"><legend class="small muted"><?= e(t('share.who')) ?></legend>
      <?php foreach (['off', 'link', 'public'] as $m): ?><label class="check opt"><input type="radio" name="share_mode" value="<?= $m ?>"<?= $mode === $m ? ' checked' : '' ?>> <span><strong><?= e(t('share.mode.' . $m)) ?></strong><br><span class="xs muted"><?= e(t('share.mode.' . $m . '_hint')) ?></span></span></label><?php endforeach; ?>
    </fieldset>
    <fieldset class="stack plain"><legend class="small muted"><?= e(t('share.what')) ?></legend>
      <label class="check"><input type="checkbox" checked disabled> <?= e(t('share.part.plan')) ?></label>
      <?php foreach (SHARE_SECTIONS as $sec): ?><label class="check"><input type="checkbox" name="sections[]" value="<?= $sec ?>"<?= in_array($sec, $secs, true) ? ' checked' : '' ?>> <?= e(t('share.part.' . $sec)) ?></label><?php endforeach; ?>
      <p class="xs muted"><?= e(t('share.never')) ?></p>
    </fieldset>
    <fieldset class="plain"><legend class="small muted"><?= e(t('share.icon')) ?></legend>
      <div class="iconpick"><?php foreach (SHARE_ICONS as $ic): ?><label><input type="radio" name="share_icon" value="<?= e($ic) ?>"<?= garden_icon($garden) === $ic ? ' checked' : '' ?>><span class="gicon" style="--h:<?= garden_hue($garden) ?>"><?= $ic ?></span></label><?php endforeach; ?></div>
    </fieldset>
    <label class="field"><span><?= e(t('share.note')) ?></span><textarea name="share_note" rows="2" maxlength="280" placeholder="<?= e(t('share.note_ph')) ?>"><?= e((string) ($garden['share_note'] ?? '')) ?></textarea></label>
    <label class="check"><input type="checkbox" name="share_admin" value="1"<?= (int) ($garden['share_admin'] ?? 0) ? ' checked' : '' ?>> <?= e(t('share.admin')) ?></label>
    <div class="row"><button class="btn primary"><?= e(t('common.save')) ?></button></div>
  </form>
  <?php if ($mode !== 'off' && $shareUrl): ?>
    <label class="field"><span><?= e(t('share.link')) ?></span>
      <span class="row nowrap"><input type="text" readonly value="<?= e($shareUrl) ?>" id="share-url" data-select><button type="button" class="btn small" data-copy="#share-url"><?= e(t('share.copy')) ?></button></span></label>
    <div class="row"><a class="btn small ghost" href="<?= e($shareUrl) ?>" target="_blank" rel="noopener"><?= e(t('share.try')) ?></a>
      <form method="post" class="inline"><?= csrf_field() ?><input type="hidden" name="g" value="<?= e($gid) ?>"><input type="hidden" name="action" value="new_link"><button class="btn small ghost" data-confirm="<?= e(t('share.new_link_confirm')) ?>"><?= e(t('share.new_link')) ?></button></form></div>
  <?php endif; ?>
</section>
<section class="card stack">
  <h2><?= e(t('gardens.ha')) ?></h2>
  <p class="small muted"><?= e(t('gardens.ha_intro')) ?></p>
  <form method="post" class="stack"><?= csrf_field() ?><input type="hidden" name="g" value="<?= e($gid) ?>"><input type="hidden" name="action" value="ha_save">
    <?= field('ha_url', t('gardens.ha_url'), 'url', (string) $ha, ['placeholder' => 'https://xxxxx.ui.nabu.casa']) ?>
    <?= field('ha_token', t('gardens.ha_token'), 'password', '', ['autocomplete' => 'off', 'placeholder' => $ha ? t('gardens.ha_kept') : '']) ?>
    <div class="row"><button class="btn"><?= e(t('gardens.ha_save')) ?></button></div>
  </form>
  <?php if ($ha): ?><form method="post"><?= csrf_field() ?><input type="hidden" name="g" value="<?= e($gid) ?>"><input type="hidden" name="action" value="ha_remove"><button class="btn small ghost"><?= e(t('gardens.ha_remove')) ?></button></form><?php endif; ?>
</section>
<section class="card stack">
  <h2><?= e(t('gardens.files')) ?></h2>
  <?php if (!$files): ?><p class="small muted"><?= e(t('gardens.no_files')) ?></p><?php else: ?><table class="list">
  <?php foreach ($files as $f): ?><tr><td><a href="<?= e(url('media.php?file=' . $f['id'])) ?>"><?= e($f['filename']) ?></a><br><span class="xs muted"><?= e($f['created_at']) ?> UTC · <?= number_format($f['bytes'] / 1024, 0, ',', '.') ?> kB</span></td>
    <td><form method="post"><?= csrf_field() ?><input type="hidden" name="g" value="<?= e($gid) ?>"><input type="hidden" name="action" value="file_delete"><input type="hidden" name="file_id" value="<?= e($f['id']) ?>"><button class="btn small ghost"><?= e(t('gardens.remove')) ?></button></form></td></tr><?php endforeach; ?>
  </table><?php endif; ?>
</section>
<section class="card stack danger">
  <h2><?= e(t('gardens.delete')) ?></h2>
  <p class="small"><?= e(t('gardens.delete_confirm')) ?></p>
  <form method="post" class="row"><?= csrf_field() ?><input type="hidden" name="g" value="<?= e($gid) ?>"><input type="hidden" name="action" value="delete">
    <input name="confirm" placeholder="<?= e($garden['title']) ?>" required><button class="btn danger"><?= e(t('gardens.delete')) ?></button></form>
</section>
</div>
<?php page_end();
