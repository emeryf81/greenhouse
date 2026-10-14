<?php
/**
 * Hortulus web – JSON API for the garden app (the web worker that runs Hortulus).
 *
 * Every call needs a signed-in, active user with access to the garden.
 * Changes (POST) also need the CSRF token in the X-CSRF-Token header and
 * edit rights on the garden.
 *
 *   GET  ?a=boot&g=ID          garden, user, documents, weather, Home Assistant states
 *   POST ?a=save&g=ID          {key, content, base_revision}   save a document
 *   POST ?a=photo&g=ID         multipart "file"                 store a photo
 *   GET  ?a=photo_raw&id=ID    the photo as JPEG (for the season book, same garden only)
 *   POST ?a=file&g=ID&name=…   raw PDF body                     store a generated PDF
 *   GET  ?a=weather&g=ID       Open-Meteo forecast (cached 30 min)
 *   GET  ?a=ha_states&g=ID     states from the linked Home Assistant
 *   POST ?a=ha_call&g=ID       {domain, service, data, return_response}
 *   GET  ?a=ha_history&g=ID&entity_ids=…&start=…&end=…
 *   POST ?a=mail_self&g=ID     {subject, text}                  mail a recipe / shopping list to yourself
 */

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

boot(true, false);
header('Cache-Control: no-store');

$user = current_user();
$action = (string) ($_GET['a'] ?? '');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
// A visitor (shared link, public garden, administrator's look) may only read.
const VISITOR_ACTIONS = ['boot', 'weather', 'photo_raw', 'client_log'];
if ($user === null && !in_array($action, VISITOR_ACTIONS, true)) {
    json_out(['ok' => false, 'error' => 'not_signed_in'], 401);
}
if ($method === 'POST') {
    csrf_check();
}
session_write_close(); // do not block parallel requests of the same user

/** Services the app may call on a linked Home Assistant (nothing that switches things). */
const HA_SERVICES = [
    'weather.get_forecasts', 'todo.get_items', 'todo.add_item', 'todo.update_item', 'todo.remove_item',
    'calendar.get_events',
];

/** The garden of this call; a visitor only reaches the read-only calls. */
function api_garden(?array $user, bool $edit = false): array
{
    global $action;
    $garden = require_garden((string) ($_GET['g'] ?? ''), $user, $edit);
    if (is_visitor($garden) && !in_array($action, VISITOR_ACTIONS, true)) {
        json_out(['ok' => false, 'error' => 'read_only'], 403);
    }
    return $garden;
}

function weather_payload(array $garden): ?array
{
    $lat = round((float) $garden['latitude'], 2);
    $lon = round((float) $garden['longitude'], 2);
    $key = hash('sha256', "om|$lat|$lon|" . $garden['time_zone']);
    $row = q('SELECT payload, fetched_at FROM ' . tbl('weather_cache') . ' WHERE cache_key = ?', [$key])->fetch();
    if ($row && strtotime($row['fetched_at'] . ' UTC') > time() - 1800) {
        return json_decode($row['payload'], true);
    }
    $params = [
        'latitude' => $lat, 'longitude' => $lon, 'timezone' => $garden['time_zone'], 'forecast_days' => 10, 'wind_speed_unit' => 'kmh',
        'hourly' => 'temperature_2m,relative_humidity_2m,dew_point_2m,precipitation,precipitation_probability,cloud_cover,wind_speed_10m,wind_direction_10m,shortwave_radiation,weather_code,is_day',
        'daily' => 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,shortwave_radiation_sum',
        'current' => 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,wind_direction_10m,pressure_msl,is_day',
    ];
    $ch = curl_init('https://api.open-meteo.com/v1/forecast?' . http_build_query($params));
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 15, CURLOPT_CONNECTTIMEOUT => 6, CURLOPT_USERAGENT => 'Hortulus/' . HORTULUS_WEB_VERSION]);
    $raw = curl_exec($ch);
    $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
    $data = is_string($raw) && $status === 200 ? json_decode($raw, true) : null;
    if (!is_array($data)) {
        return $row ? json_decode($row['payload'], true) : null; // stale beats nothing
    }
    q(
        'INSERT INTO ' . tbl('weather_cache') . ' (cache_key, payload, fetched_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE payload = VALUES(payload), fetched_at = VALUES(fetched_at)',
        [$key, $raw, now_utc()]
    );
    return $data;
}

/** Sensors, weather, to-do lists ... of the linked Home Assistant (attributes trimmed). */
function ha_states(string $gardenId): array
{
    $link = ha_link($gardenId);
    if ($link === null) {
        return [];
    }
    [$status, $states] = ha_request($link, 'GET', '/api/states');
    if (!is_array($states)) {
        return [];
    }
    $out = [];
    foreach ($states as $s) {
        $id = (string) ($s['entity_id'] ?? '');
        if (!preg_match('/^(sensor|binary_sensor|weather|todo|valve|switch|camera|person|calendar|tts|media_player|cover|fan|input_boolean|input_number)\./', $id)) {
            continue;
        }
        $out[$id] = ['state' => $s['state'] ?? 'unknown', 'attributes' => $s['attributes'] ?? [], 'last_updated' => $s['last_updated'] ?? null];
    }
    return $out;
}

/** The notify services of the linked Home Assistant, as hass.services shows them: {notify: {name: {}}}. */
function ha_services(string $gardenId): array
{
    $link = ha_link($gardenId);
    if ($link === null) {
        return [];
    }
    [$status, $domains] = ha_request($link, 'GET', '/api/services');
    if (!is_array($domains)) {
        return [];
    }
    $out = [];
    foreach ($domains as $d) {
        if (($d['domain'] ?? '') !== 'notify' || !is_array($d['services'] ?? null)) {
            continue;
        }
        foreach (array_keys($d['services']) as $name) {
            if ($name !== 'send_message') {
                $out['notify'][(string) $name] = new stdClass();
            }
        }
    }
    return $out;
}

switch ($action) {
    case 'client_log':
        // Errors in the browser (the garden app, the engine in the worker) for Beheer → Logboek.
        if ($method !== 'POST' || !rate_limit('client-log:' . client_ip(), 60, 3600)) {
            json_out(['ok' => false], 429);
        }
        $body = json_decode((string) file_get_contents('php://input'), true);
        if (!is_array($body)) {
            json_out(['ok' => false], 400);
        }
        $kind = preg_replace('/[^a-z_]/', '', (string) ($body['kind'] ?? 'error')) ?: 'error';
        $message = mb_substr(trim((string) ($body['message'] ?? '')), 0, 400);
        if ($message === '') {
            json_out(['ok' => true]);
        }
        $g = preg_match('/^[a-f0-9]{32}$/', (string) ($_GET['g'] ?? '')) ? (string) $_GET['g'] : '';
        $detail = 'Soort: ' . $kind . "\nPagina: " . mb_substr((string) ($body['url'] ?? ''), 0, 300)
            . "\nTuin: " . ($g ?: '–') . ($user ? '' : ' (bezoeker)')
            . (isset($body['req']) ? "\nServer-foutcode: " . preg_replace('/[^a-f0-9]/', '', (string) $body['req']) : '')
            . "\nBrowser: " . mb_substr((string) ($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 300)
            . "\nVersie: " . HORTULUS_WEB_VERSION
            . (isset($body['detail']) ? "\n\n" . mb_substr((string) $body['detail'], 0, 8000) : '');
        app_log('client', $kind === 'warn' ? 'warn' : 'error', 'In de browser: ' . $message, $detail, 10);
        json_out(['ok' => true]);

    case 'mail_self':
        // A recipe or a shopping list from the cooking tab, to the signed-in user's own address only.
        if ($method !== 'POST') {
            json_out(['ok' => false], 405);
        }
        $garden = api_garden($user);
        if (!rate_limit('mail-self:' . $user['id'], 20, 3600)) {
            json_out(['ok' => false, 'error' => 'mail_limit'], 429);
        }
        $body = json_decode((string) file_get_contents('php://input'), true);
        $subject = mb_substr(trim(preg_replace('/[\r\n]+/', ' ', (string) ($body['subject'] ?? ''))), 0, 120);
        $text = mb_substr(trim((string) ($body['text'] ?? '')), 0, 20000);
        if ($text === '') {
            json_out(['ok' => false, 'error' => 'empty'], 400);
        }
        $subject = 'Hortulus · ' . ($subject !== '' ? $subject : $garden['title']);
        $text .= "\n\n— " . $garden['title'] . "\n" . APP_URL . '/app.php?g=' . $garden['id'];
        $result = null;
        if (!send_mail((string) $user['email'], $subject, $text, null, $result)) {
            app_log('mail', 'error', 'Recept/boodschappenlijst niet verstuurd naar ' . $user['email'], (string) ($result['error'] ?? ''));
            json_out(['ok' => false, 'error' => 'mail_failed'], 502);
        }
        json_out(['ok' => true, 'to' => $user['email']]);

    case 'boot':
        $garden = api_garden($user);
        $docs = load_documents($garden['id']);
        if (is_visitor($garden)) {
            $sections = $garden['view_sections'];
            json_out([
                'ok' => true,
                'garden' => ['id' => $garden['id'], 'title' => $garden['title'], 'preset' => $garden['preset']],
                'gardens' => [],
                'user' => ['id' => 0, 'name' => t('share.visitor'), 'can_edit' => false, 'is_admin' => false],
                'viewer' => ['owner' => public_name($garden['owner_name']), 'sections' => $sections, 'tabs' => visitor_tabs($garden), 'via' => $garden['view_via']],
                'language' => lang(),
                'latitude' => round((float) $garden['latitude'], 2), 'longitude' => round((float) $garden['longitude'], 2), 'time_zone' => $garden['time_zone'],
                'documents' => [
                    'main' => filter_document_for_visitor($docs['main'], $sections),
                    'syslog' => null,
                    'archive' => filter_document_for_visitor($docs['archive'], $sections),
                ],
                'revision' => $docs['revision'],
                'weather' => in_array('weather', $sections, true) ? weather_payload($garden) : null,
                'states' => [],
                'services' => [],
                'ha' => false,
            ]);
        }
        json_out([
            'ok' => true,
            'garden' => ['id' => $garden['id'], 'title' => $garden['title'], 'preset' => $garden['preset']],
            'gardens' => array_map(static fn ($g) => ['id' => $g['id'], 'title' => $g['title']], user_gardens((int) $user['id'])),
            'user' => ['id' => (int) $user['id'], 'name' => $user['name'], 'can_edit' => can_edit($garden), 'is_admin' => $user['role'] === 'admin'],
            'language' => lang(),
            'latitude' => (float) $garden['latitude'], 'longitude' => (float) $garden['longitude'], 'time_zone' => $garden['time_zone'],
            'documents' => ['main' => $docs['main'], 'syslog' => $docs['syslog'], 'archive' => $docs['archive']],
            'revision' => $docs['revision'],
            'weather' => weather_payload($garden),
            'states' => ha_states($garden['id']),
            'services' => ha_services($garden['id']),
            'ha' => ha_link($garden['id']) !== null,
        ]);

    case 'save':
        if ($method !== 'POST') {
            json_out(['ok' => false], 405);
        }
        $garden = api_garden($user, true);
        $body = json_decode((string) file_get_contents('php://input'), true);
        if (!is_array($body)) {
            json_out(['ok' => false, 'error' => 'bad_request'], 400);
        }
        $base = isset($body['base_revision']) ? (int) $body['base_revision'] : null;
        $result = save_document($garden['id'], (string) ($body['key'] ?? ''), isset($body['content']) ? (string) $body['content'] : null, (int) $user['id'], $base);
        json_out($result, $result['ok'] ? 200 : (($result['error'] ?? '') === 'conflict' ? 409 : 400));

    case 'photo':
        if ($method !== 'POST') {
            json_out(['ok' => false], 405);
        }
        $garden = api_garden($user, true);
        $file = $_FILES['file'] ?? null;
        if (!$file || ($file['error'] ?? 1) !== UPLOAD_ERR_OK || $file['size'] > MAX_UPLOAD_MB * 1048576 || !is_uploaded_file($file['tmp_name'])) {
            json_out(['ok' => false, 'error' => 'upload_failed'], 400);
        }
        $result = store_photo($garden['id'], (int) $user['id'], $file['tmp_name']);
        json_out($result, $result['ok'] ? 200 : 415);

    case 'photo_raw':
        $garden = api_garden($user);
        if (is_visitor($garden) && !in_array('journal', $garden['view_sections'], true)) {
            json_out(['ok' => false], 404);
        }
        $row = q('SELECT data FROM ' . tbl('photos') . ' WHERE id = ? AND garden_id = ?', [(string) ($_GET['id'] ?? ''), $garden['id']])->fetch();
        if (!$row) {
            json_out(['ok' => false], 404);
        }
        header('Content-Type: image/jpeg');
        echo $row['data'];
        exit;

    case 'file':
        if ($method !== 'POST') {
            json_out(['ok' => false], 405);
        }
        $garden = api_garden($user);
        $result = store_file($garden['id'], (int) $user['id'], (string) ($_GET['name'] ?? 'hortulus.pdf'), (string) file_get_contents('php://input'));
        json_out($result, $result['ok'] ? 200 : 400);

    case 'weather':
        $garden = api_garden($user);
        if (is_visitor($garden) && !in_array('weather', $garden['view_sections'], true)) {
            json_out(['ok' => true, 'weather' => null]);
        }
        json_out(['ok' => true, 'weather' => weather_payload($garden)]);

    case 'ha_states':
        $garden = api_garden($user);
        json_out(['ok' => true, 'states' => ha_states($garden['id']), 'services' => ha_services($garden['id'])]);

    case 'ha_call':
        if ($method !== 'POST') {
            json_out(['ok' => false], 405);
        }
        $body = json_decode((string) file_get_contents('php://input'), true) ?: [];
        $service = ($body['domain'] ?? '') . '.' . ($body['service'] ?? '');
        $readOnly = in_array($service, ['weather.get_forecasts', 'todo.get_items', 'calendar.get_events'], true);
        $garden = api_garden($user, !$readOnly);
        $link = ha_link($garden['id']);
        if ($link === null || !in_array($service, HA_SERVICES, true)) {
            json_out(['ok' => false, 'error' => 'not_allowed'], 403);
        }
        $path = '/api/services/' . rawurlencode((string) $body['domain']) . '/' . rawurlencode((string) $body['service']) . (!empty($body['return_response']) ? '?return_response' : '');
        [$status, $result, $err] = ha_request($link, 'POST', $path, is_array($body['data'] ?? null) ? $body['data'] : []);
        json_out($err ? ['ok' => false, 'error' => $err] : ['ok' => true, 'result' => $result], $err ? 502 : 200);

    case 'ha_history':
        $garden = api_garden($user);
        $link = ha_link($garden['id']);
        $ids = array_filter(explode(',', (string) ($_GET['entity_ids'] ?? '')), static fn ($id) => preg_match('/^(sensor|binary_sensor)\.[a-z0-9_]+$/', $id));
        $start = gmdate('Y-m-d\TH:i:s\Z', strtotime((string) ($_GET['start'] ?? '-7 days')) ?: time() - 604800);
        $end = gmdate('Y-m-d\TH:i:s\Z', strtotime((string) ($_GET['end'] ?? 'now')) ?: time());
        if ($link === null || !$ids) {
            json_out(['ok' => true, 'result' => []]);
        }
        [$status, $result, $err] = ha_request($link, 'GET', '/api/history/period/' . rawurlencode($start) . '?end_time=' . rawurlencode($end) . '&minimal_response&no_attributes&filter_entity_id=' . rawurlencode(implode(',', $ids)), null, 20);
        json_out(['ok' => !$err, 'result' => is_array($result) ? $result : []]);

    default:
        json_out(['ok' => false, 'error' => 'unknown_action'], 404);
}
