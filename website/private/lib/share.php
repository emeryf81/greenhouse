<?php
/**
 * Hortulus web – showing a garden to others, read only.
 *
 * The owner chooses (Garden settings → Show your garden):
 *   off     nobody but the members
 *   link    whoever has the secret link (view.php?s=…)
 *   public  everybody: the garden is listed on the front page (no sign-in needed)
 * plus which parts are visible (the map and crops always; calendar, weather,
 * journal, harvest & costs, advice optional) and, separately, whether the
 * administrator may look at the whole garden from Beheer.
 *
 * Opening a link gives the browser session a read-only grant for that garden;
 * api.php and media.php honour it (GET only), and parts that are not shared are
 * taken out of the garden document before it leaves the server.
 */

declare(strict_types=1);

const SHARE_SECTIONS = ['calendar', 'weather', 'journal', 'harvest', 'advice'];
const SHARE_ICONS = ['🌱', '🥕', '🍅', '🥬', '🌻', '🍓', '🫛', '🧅', '🥒', '🌽', '🍎', '🍐', '🫐', '🌿', '🌷', '🪴', '🌳', '🥔', '🫑', '🍆', '🥦', '🧄', '🍇', '🍒', '🌼', '🪻', '🍋', '🥝', '🌾', '🍄', '🐝', '🐞'];

/** The garden's icon: the owner's choice, else one picked from its id (always the same). */
function garden_icon(array $garden): string
{
    $icon = (string) ($garden['share_icon'] ?? '');
    return in_array($icon, SHARE_ICONS, true) ? $icon : SHARE_ICONS[hexdec(substr((string) $garden['id'], 0, 6)) % count(SHARE_ICONS)];
}

/** A soft background colour for the icon, from the garden id. */
function garden_hue(array $garden): int
{
    return hexdec(substr((string) $garden['id'], 6, 4)) % 360;
}

/** @return list<string> the optional parts this garden shows */
function share_sections(array $garden): array
{
    $list = array_values(array_intersect(SHARE_SECTIONS, explode(',', (string) ($garden['share_sections'] ?? ''))));
    return $list;
}

/** The panel tabs a visitor may open for these parts. */
function share_tabs(array $sections): array
{
    // the cooking tab shows only the recipes the owner shares
    $tabs = ['dashboard', 'planner', 'layout', 'crops', 'library', 'handbook', 'cooking'];
    if (in_array('calendar', $sections, true)) {
        $tabs[] = 'calendar';
    }
    if (in_array('weather', $sections, true)) {
        $tabs[] = 'weather';
    }
    if (array_intersect(['journal', 'harvest'], $sections)) {
        $tabs[] = 'journal';
    }
    if (in_array('advice', $sections, true)) {
        array_push($tabs, 'advice', 'analysis');
    }
    return $tabs;
}

/** The tabs of a visitor's panel: the plan alone for someone who is not signed in. */
function visitor_tabs(array $garden): array
{
    if (!empty($garden['view_simple'])) {
        return garden_has_shared_recipes((string) $garden['id']) ? ['view', 'cooking'] : ['view'];
    }
    return share_tabs($garden['view_sections']);
}

/** True when the owner shares at least one recipe of this garden's cookbook. */
function garden_has_shared_recipes(string $gardenId): bool
{
    $json = q('SELECT content FROM ' . tbl('documents') . ' WHERE garden_id = ? AND doc_key = "main"', [$gardenId])->fetchColumn();
    $doc = is_string($json) ? json_decode($json, true) : null;
    foreach ((array) ($doc['data']['cookbook'] ?? []) as $r) {
        if (is_array($r) && !empty($r['shared'])) {
            return true;
        }
    }
    return false;
}

/** Remember in this browser session that it may look at the garden (read only). */
function grant_view(array $garden, string $via): void
{
    $_SESSION['views'][$garden['id']] = ['via' => $via, 'token' => (string) ($garden['share_token'] ?? ''), 'at' => time()];
}

/**
 * The garden as a visitor of this session sees it, or null: the grant must still be
 * valid (the owner can switch sharing off or make a new link at any time).
 */
function visitor_garden(string $gardenId): ?array
{
    $grant = $_SESSION['views'][$gardenId] ?? null;
    if (!is_array($grant) || !preg_match('/^[a-f0-9]{32}$/', $gardenId)) {
        return null;
    }
    $g = q('SELECT g.*, u.name AS owner_name FROM ' . tbl('gardens') . ' g JOIN ' . tbl('users') . ' u ON u.id = g.owner_id WHERE g.id = ? AND u.status = "active"', [$gardenId])->fetch();
    if (!$g) {
        return null;
    }
    if ($grant['via'] === 'admin') {
        $user = current_user();
        if (!$user || $user['role'] !== 'admin' || !(int) $g['share_admin']) {
            return null;
        }
        $g['view_sections'] = SHARE_SECTIONS;
    } else {
        if (!in_array($g['share_mode'], ['link', 'public'], true) || !hash_equals((string) $g['share_token'], (string) $grant['token'])) {
            return null;
        }
        $g['view_sections'] = share_sections($g);
        // without signing in: only the plan itself (and the recipes the owner shares)
        if (current_user() === null) {
            $g['view_sections'] = [];
            $g['view_simple'] = true;
        }
    }
    $g['my_role'] = 'visitor';
    $g['view_via'] = $grant['via'];
    return $g;
}

/**
 * A garden document as a visitor may see it: private and unshared parts taken out.
 * Decoded as objects, so empty objects ({}) stay objects; as arrays they would come
 * back as [] and the engine would refuse the document.
 */
function filter_document_for_visitor(?string $json, array $sections): ?string
{
    if ($json === null) {
        return null;
    }
    $doc = json_decode($json);
    if (!is_object($doc) || !is_object($doc->data ?? null)) {
        return $json;
    }
    $d = $doc->data;
    // never: who gets which notification, phone services, internal bookkeeping
    if (is_object($d->settings ?? null)) {
        foreach (['notifications', 'person_notify', 'assignment'] as $k) {
            unset($d->settings->{$k});
        }
    }
    $d->notified = new stdClass();
    if (!in_array('calendar', $sections, true)) {
        $d->tasks = [];
    }
    if (!in_array('journal', $sections, true)) {
        $d->journal = [];
        $d->water_log = [];
        $d->irrigation_log = [];
    }
    if (!in_array('harvest', $sections, true)) {
        $d->harvest_log = [];
        $d->expenses = [];
        $d->seed_stock = [];
        if (is_object($d->settings ?? null)) {
            unset($d->settings->economy);
        }
    }
    // the kitchen: only the recipes the owner shares, never what is in their fridge
    $book = [];
    foreach (is_array($d->cookbook ?? null) ? $d->cookbook : [] as $r) {
        if (is_object($r) && !empty($r->shared)) {
            $r->cooked = [];
            $book[] = $r;
        }
    }
    $d->cookbook = $book;
    $d->cooking_prefs = new stdClass();
    return json_encode($doc, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
}

/** Public gardens for the front page: search, sort, page. @return array{rows: list<array>, total: int} */
function public_gardens(string $search, string $sort, int $page, int $perPage = 24): array
{
    $where = 'g.share_mode = "public" AND u.status = "active"';
    $args = [];
    if ($search !== '') {
        $where .= ' AND (g.title LIKE ? OR u.name LIKE ? OR g.share_note LIKE ?)';
        $like = '%' . str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $search) . '%';
        array_push($args, $like, $like, $like);
    }
    $order = match ($sort) {
        'name' => 'g.title ASC',
        'new' => 'g.shared_at DESC',
        default => 'g.updated_at DESC',
    };
    $total = (int) q('SELECT COUNT(*) FROM ' . tbl('gardens') . ' g JOIN ' . tbl('users') . ' u ON u.id = g.owner_id WHERE ' . $where, $args)->fetchColumn();
    $offset = max(0, ($page - 1) * $perPage);
    $rows = q('SELECT g.id, g.title, g.preset, g.share_token, g.share_icon, g.share_note, g.share_sections, g.updated_at, u.name AS owner_name
        FROM ' . tbl('gardens') . ' g JOIN ' . tbl('users') . ' u ON u.id = g.owner_id WHERE ' . $where . ' ORDER BY ' . $order . ' LIMIT ' . (int) $perPage . ' OFFSET ' . (int) $offset, $args)->fetchAll();
    return ['rows' => $rows, 'total' => $total];
}

/** First name only on public pages. */
function public_name(string $name): string
{
    $first = trim(explode(' ', trim($name))[0] ?? '');
    return $first !== '' ? $first : 'Hortulus';
}

/** The public-gardens block (front page and the logged-in overview). */
function render_public_gardens(string $base = ''): void
{
    $search = mb_substr(trim((string) ($_GET['q'] ?? '')), 0, 60);
    $sort = in_array($_GET['sort'] ?? '', ['name', 'new', 'active'], true) ? (string) $_GET['sort'] : 'active';
    $page = max(1, (int) ($_GET['p'] ?? 1));
    $perPage = 24;
    try {
        $res = public_gardens($search, $sort, $page, $perPage);
    } catch (Throwable) {
        $res = ['rows' => [], 'total' => 0];
    }
    $pages = max(1, (int) ceil($res['total'] / $perPage));
    $link = static fn (array $over) => e(url($base . '?' . http_build_query(array_filter(array_merge(['q' => $search, 'sort' => $sort === 'active' ? '' : $sort, 'p' => $page > 1 ? $page : ''], $over), static fn ($v) => $v !== '' && $v !== null)) . '#public'));
    echo '<section class="card stack" id="public"><div class="row"><h2 style="margin:0">' . e(t('public.title')) . ' <span class="chip">' . $res['total'] . '</span></h2></div>';
    echo '<p class="small muted">' . e(t('public.intro')) . '</p>';
    echo '<form method="get" action="' . e(url($base)) . '#public" class="row pubsearch"><input type="search" name="q" value="' . e($search) . '" placeholder="' . e(t('public.search')) . '" aria-label="' . e(t('public.search')) . '">'
        . '<select name="sort" aria-label="' . e(t('public.sort')) . '">';
    foreach (['active' => t('public.sort_active'), 'new' => t('public.sort_new'), 'name' => t('public.sort_name')] as $k => $label) {
        echo '<option value="' . e($k) . '"' . ($k === $sort ? ' selected' : '') . '>' . e($label) . '</option>';
    }
    echo '</select><button class="btn">' . e(t('public.go')) . '</button></form>';
    if (!$res['rows']) {
        echo '<p class="muted">' . e($search !== '' ? t('public.none_found') : t('public.none')) . '</p></section>';
        return;
    }
    echo '<ul class="pubgrid">';
    foreach ($res['rows'] as $g) {
        $parts = array_map(static fn ($s) => t('share.part.' . $s), share_sections($g));
        echo '<li><a class="pubcard" href="' . e(url('view.php?s=' . $g['share_token'])) . '">'
            . '<span class="gicon" style="--h:' . garden_hue($g) . '" aria-hidden="true">' . garden_icon($g) . '</span>'
            . '<span class="pubbody"><strong>' . e($g['title']) . '</strong>'
            . '<span class="xs muted">' . e(t('public.by', ['name' => public_name($g['owner_name'])])) . ' · ' . e(PRESETS[$g['preset']] ?? $g['preset']) . '</span>'
            . ($g['share_note'] ? '<span class="small">' . e(mb_strimwidth($g['share_note'], 0, 110, '…')) . '</span>' : '')
            . ($parts ? '<span class="xs muted">' . e(implode(' · ', $parts)) . '</span>' : '')
            . '</span></a></li>';
    }
    echo '</ul>';
    if ($pages > 1) {
        echo '<nav class="pager row" aria-label="' . e(t('public.pages')) . '">';
        if ($page > 1) {
            echo '<a class="btn small ghost" href="' . $link(['p' => $page - 1]) . '">‹</a>';
        }
        for ($i = max(1, $page - 3); $i <= min($pages, $page + 3); $i++) {
            echo $i === $page ? '<span class="btn small primary" aria-current="page">' . $i . '</span>' : '<a class="btn small ghost" href="' . $link(['p' => $i]) . '">' . $i . '</a>';
        }
        if ($page < $pages) {
            echo '<a class="btn small ghost" href="' . $link(['p' => $page + 1]) . '">›</a>';
        }
        echo '<span class="xs muted">' . e(t('public.page_of', ['p' => $page, 'n' => $pages])) . '</span></nav>';
    }
    echo '</section>';
}
