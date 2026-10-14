<?php
/** My gardens: open, create; owners reach the settings of each garden. */
declare(strict_types=1);
require __DIR__ . '/bootstrap.php';
boot();

if (!is_installed()) {
    exit('Hortulus is not installed yet: open install.php?token=… (see private/settings.php).');
}
$user = current_user();
if ($user === null) {
    // Signed out: the front page with the gardens their owners show to everyone.
    page_start(t('public.title'), 'front');
    echo '<section class="hero card"><div><h1>' . e(t('front.title')) . '</h1><p>' . e(t('front.intro')) . '</p>'
        . '<p class="row"><a class="btn primary" href="' . e(url('login.php')) . '">' . e(t('nav.login')) . '</a>'
        . '<a class="btn" href="' . e(url('register.php')) . '">' . e(t('nav.register')) . '</a></p></div></section>';
    render_public_gardens();
    page_end();
    exit;
}
$error = null;
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    csrf_check();
    $title = trim((string) ($_POST['title'] ?? ''));
    $lat = (float) str_replace(',', '.', (string) ($_POST['lat'] ?? ''));
    $lon = (float) str_replace(',', '.', (string) ($_POST['lon'] ?? ''));
    if ($title === '' || $lat < -90 || $lat > 90 || $lon < -180 || $lon > 180 || ($lat == 0.0 && $lon == 0.0)) {
        $error = t('gardens.place');
    } elseif (count(q('SELECT id FROM ' . tbl('gardens') . ' WHERE owner_id = ?', [$user['id']])->fetchAll()) >= 20) {
        $error = 'Max. 20';
    } else {
        $id = create_garden($user, $title, $lat, $lon, (string) ($_POST['preset'] ?? 'nl_be'));
        flash(t('gardens.created'));
        redirect('app.php?g=' . $id);
    }
}
$gardens = user_gardens((int) $user['id']);
page_start(t('gardens.title'));
?>
<h1><?= e(t('gardens.title')) ?></h1>
<?php if (!$gardens): ?><p class="muted"><?= e(t('gardens.empty')) ?></p><?php endif; ?>
<div class="cards">
<?php foreach ($gardens as $g): ?>
  <article class="card garden">
    <h2><span class="gicon sm" style="--h:<?= garden_hue($g) ?>" aria-hidden="true"><?= garden_icon($g) ?></span> <?= e($g['title']) ?></h2>
    <?php if ($g['my_role'] === 'owner' && ($g['share_mode'] ?? 'off') !== 'off'): ?><span class="chip"><?= e(t('share.mode.' . $g['share_mode'])) ?></span><?php endif; ?>
    <p class="xs muted"><?= $g['my_role'] === 'owner' ? e(PRESETS[$g['preset']] ?? $g['preset']) : e(t('gardens.shared', ['name' => $g['owner_name']]) . ' · ' . t('gardens.role.' . $g['my_role'])) ?></p>
    <div class="row">
      <a class="btn primary" href="<?= e(url('app.php?g=' . $g['id'])) ?>"><?= e(t('gardens.open')) ?></a>
      <?php if ($g['my_role'] === 'owner'): ?><a class="btn ghost" href="<?= e(url('garden.php?g=' . $g['id'])) ?>"><?= e(t('gardens.settings')) ?></a><?php endif; ?>
    </div>
  </article>
<?php endforeach; ?>
</div>
<?php render_public_gardens(); ?>
<section class="card stack" id="new">
  <h2><?= e(t('gardens.new')) ?></h2>
  <?php if ($error): ?><div class="flash bad"><?= e($error) ?></div><?php endif; ?>
  <form method="post" class="grid2">
    <?= csrf_field() ?>
    <?= field('title', t('gardens.name'), 'text', 'Moestuin', ['required' => true, 'maxlength' => 100]) ?>
    <label class="field"><span><?= e(t('gardens.region')) ?></span><select name="preset">
      <?php foreach (PRESETS as $k => $label): ?><option value="<?= e($k) ?>"><?= e($label) ?></option><?php endforeach; ?></select></label>
    <?= field('lat', t('gardens.lat'), 'text', '50.85', ['required' => true, 'inputmode' => 'decimal', 'data-geo' => 'lat']) ?>
    <?= field('lon', t('gardens.lon'), 'text', '4.35', ['required' => true, 'inputmode' => 'decimal', 'data-geo' => 'lon']) ?>
    <div class="row"><button type="button" class="btn ghost" data-locate><?= e(t('gardens.locate')) ?></button>
      <button class="btn primary"><?= e(t('gardens.create')) ?></button></div>
  </form>
</section>
<?php page_end();
