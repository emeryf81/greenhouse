# Entity, service & event reference

Entity ids below assume an **English** Home Assistant install and the example garden
(*Bed 1*, *Greenhouse Zone A*). Home Assistant derives entity ids from the translated
entity name and the device name at the moment an entity is first created, so on a Dutch
install `sensor.hortulus_frost_risk_next_48h` becomes
`sensor.hortulus_vorstrisico_komende_48_uur`. Unique ids never change; rename freely.

## Devices

| Device | Created for | Contains |
|---|---|---|
| **Hortulus** | the integration | garden‑wide sensors, calendar, to‑do list, buttons, irrigation controls |
| **<Bed name>** | every bed | moisture, irrigation, companion score, needs water, nutrient balance, water deficit |
| **<Zone name>** | every zone | disease risk, frost risk 48 h, degree days; greenhouses also advice, heat stress, shading |

Beds and zones added in the planner get their devices immediately; deleting a bed or
zone removes its device and entities.

## Sensors

### `sensor.hortulus_frost_risk_next_48h`
Enum: `none` · `low` · `moderate` · `high` · `unknown`.
Classification of the **plant‑level** minimum (forecast 2 m temperature + radiative
adjustment on clear, calm nights): ≤ 0 °C *high*, ≤ 2 °C *moderate*, ≤ 4 °C *low*.

| Attribute | Example | Meaning |
|---|---|---|
| `min_temperature` | `-2.0` | lowest forecast air temperature (°C) |
| `plant_level_min_temperature` | `-4.0` | after ground‑frost adjustment |
| `min_at` | `2026-03-29T04:00:00+00:00` | when the minimum occurs |
| `first_below_zero_at` | … | first hour at/below 0 °C at plant level |
| `hours_below_zero` | `5.0` | duration (DST‑safe) |
| `source` | `hourly` | `hourly` → `daily` → `sensor` → `none` fallback chain |
| `zones` | `{"gh_a": "low"}` | per‑zone level (greenhouses are buffered) |

### `sensor.hortulus_growing_degree_days`
Season total (°C·d) since 30 days before the last frost, base 10 °C, modified average
method capped at 30 °C. Attributes: `base_temperature`, `since`, `days_counted`.

### `sensor.hortulus_tasks_due_today`
Count of open tasks due today or overdue. Attributes: `estimated_minutes`, `overdue`,
`tasks` (up to 25 × `{id, title, type, priority, due}` – handy in templates).

### `sensor.hortulus_next_task`
Title of the next open task.

### `sensor.<bed>_moisture_status`  *(“garden.bed_moisture_status”)*
Enum: `dry` · `slightly_dry` · `optimal` · `wet` · `unknown`.

| Attribute | Meaning |
|---|---|
| `moisture` | current volumetric water content (%) |
| `target_low` / `target_high` | optimal band for the thirstiest active crop, shifted by soil type |
| `water_need` | `low` / `medium` / `high` |
| `soil_temperature` | °C, if mapped |
| `moisture_entity` | the source sensor |

Bands (loam; sandy −6, clay +6, silt +3, peat +8, chalk −2, potting mix +4):

| Water need | dry below | optimal | wet above |
|---|---|---|---|
| low | 18 % | 22–38 % | 55 % |
| medium | 25 % | 30–45 % | 60 % |
| high | 32 % | 38–55 % | 68 % |

### `sensor.<bed>_irrigation_recommendation`  *(“garden.irrigation_recommendation”)*
State: millimetres to apply now. Attributes: `action` (`none`, `water`,
`skip_rain_expected`, `check_manually`), `liters`, `duration_min` (needs a flow rate),
`status`, `moisture`, `target_low/high`, `etc_24h_mm`, `rain_24h_mm`, `rain_48h_mm`,
`confidence` (`high` with sensor + forecast, `low` without sensor), `priority`,
`reasons`, `irrigation_entity`.

### `sensor.<bed>_companion_score` *(disabled by default)*
0–100 (50 = neutral). Attributes: `conflicts`, `rotation_conflicts`.

### `sensor.<zone>_greenhouse_advice`
Enum: `none` · `ventilate` · `shade` · `close_up` · `heat`. Attributes: `inside_now_c`,
`forecast_max_c`, `forecast_min_c`, `limit_max_c`, `limit_min_c`, `limiting_plants`,
`reasons`, `frost_risk`, `air_temperature`.

### `sensor.hortulus_reference_evapotranspiration_today`
ET₀ for today in mm (FAO‑56 Penman‑Monteith when humidity and wind are known,
Hargreaves‑Samani otherwise). Attributes: `method`, `tmin`, `tmax`, `rh_min`, `rh_max`,
`wind_kmh`, `cloud_fraction`, `rain_mm`, `forecast` (3 days of ET₀ and rain).

### `sensor.hortulus_degree_days_today`
Degree days expected today (base of the season GDD sensor).

### `sensor.<bed>_nutrient_balance`
0–100: NPK (mg/kg) or EC (mS/cm) readings compared with the N‑P‑K demand of the active
crops (100 = everything in range). Attributes: `status` (`unknown`, `deficient`,
`balanced`, `excess`), `deficits`, `excess`, `source` (`npk`/`ec`/`none`).
Map the probes in Settings → Beds.

### `sensor.<bed>_soil_water_deficit` *(disabled by default)*
Root‑zone depletion below field capacity in mm from the daily water balance.
Attributes: `available_water_mm` (TAW for the soil and rooting depth), `crop_coefficient`
(Kc of the thirstiest active crop). Watering is advised once half of the TAW is used.

### `sensor.<zone>_disease_risk`
Enum `none` · `low` · `moderate` · `high` · `unknown`. Attributes: `wet_hours_48h`,
`hutton_period` (late‑blight weather), `humidity`, `leaf_wet`, `reasons`.

### `sensor.<zone>_degree_days_this_season` *(disabled by default)*
Season degree days for the zone; enclosed zones add their day‑time warmth.

## Binary sensors

| Entity | Device class | On when |
|---|---|---|
| `binary_sensor.hortulus_frost_warning` | cold | frost risk *moderate* or *high*; attribute `plants_at_risk` |
| `binary_sensor.<zone>_frost_risk_48h` | cold | that zone's plant‑level frost risk is *moderate* or *high* |
| `binary_sensor.<bed>_needs_water` | problem | irrigation action is `water` |
| `binary_sensor.<zone>_heat_stress` | heat | greenhouse advice is `ventilate` or `shade` |
| `binary_sensor.hortulus_irrigation_frost_lockout` | safety | outdoor valves are locked (frost within 12 h or too cold now); attributes `temperature`, `limit` |
| `binary_sensor.hortulus_irrigation_running` | running | a watering run is in progress; attributes `bed_id`, `ends_at`, `last_error` |

## Irrigation & climate controls

| Entity | Notes |
|---|---|
| `switch.hortulus_automatic_irrigation` | on = mode `auto` (valves open at the start time), off = `advise` |
| `select.hortulus_irrigation_mode` | `off` · `advise` · `auto` |
| `number.hortulus_irrigation_max_runtime` | minutes per valve (1–180) |
| `number.hortulus_irrigation_frost_lockout_temperature` | °C; outdoor valves stay shut at or below |
| `number.hortulus_skip_irrigation_above_rain` | mm forecast in the next 24 h |
| `button.hortulus_water_now` / `button.hortulus_stop_watering` | manual run (safety rules apply) / stop and close everything |
| `select.<zone>_shading` | `auto` (follow the advice) · `on` · `off` for the zone's shade screen |

**Safety rules** (also for manual runs): one valve at a time; pump only while a valve is
open (valve → 1 s → pump on … pump off → *lead* seconds → valve closed); max runtime;
frost lockout for outdoor valves; rain skip; every valve that was opened and the pump
are switched off at the end, after an error and on cancellation. Each run is logged and
feeds the bed's water balance.

## Calendar, to‑do list, buttons

| Entity | Notes |
|---|---|
| `calendar.hortulus_garden_tasks` | All‑day events for every task (✓ = done, ‼/! = urgent/high). Create, edit (moving the date postpones the task, dependants follow) and delete from the HA calendar. |
| `todo.hortulus_this_week` | Open tasks due within 7 days (+ overdue), plus tasks completed in the last 2 days. Ticking an item completes the task. |
| `button.hortulus_generate_tasks` | Re‑generate tasks now. |
| `button.hortulus_refresh_forecast` | Fetch the forecast now. |

The calendar also contains the **seasonal garden work** (keys `m:…`): plan the season,
order seed, prepare the sowing station, turn compost, mulch, prepare each bed before
planting (with compost kg and fertiliser g), green manure or winter cover for empty beds,
drain hoses before frost, winter rest, soil test every third season, tool care, and per
greenhouse: spring clean, shading on/off, winter insulation and the autumn clean &
disinfection. Perennials get cut back, divided (every 3 years) and winter protection by
their tags. Switch it off in Settings → Resources.

---

## Services (actions)

All services live in the `garden_manager` domain and return data when called with
`response_variable` (except `delete_task`).

### `garden_manager.add_task`
| Field | Type | Notes |
|---|---|---|
| `title` | string | required |
| `due_date` | date | default today |
| `type` | enum | `custom`, `water`, `weed`, `harvest`, … |
| `description` | string | |
| `priority` | `low`/`normal`/`high`/`urgent` | |
| `estimated_minutes` | int | |
| `bed` | string | bed **id or name** (case‑insensitive) |
| `planting_id` | string | |
| `recurrence_days` | int | repeat N days after each completion |
| `until` | date | last date for the recurrence |

Response: `{task_id}`.

```yaml
action: garden_manager.add_task
data:
  title: Check slug traps
  bed: Bed 1
  priority: high
  recurrence_days: 3
response_variable: created
```

### `garden_manager.complete_task`
Fields: `task_id`, `note`, `photos` (list of image ids/URLs), `skipped` (bool).
Completing **sow**, **transplant** or the first **harvest** task updates the planting
(`sown_on`, `transplanted_on`, `harvest_started_on`, status), which re‑anchors all care
tasks to the real dates. Recurring tasks schedule their next occurrence
`interval` days after *completion*.
Response: `{task_id, status, next_task_id, next_due}`.

### `garden_manager.postpone_task`
Fields: `task_id`, `days` **or** `to_date`, `reason`, `cascade` (default true).
Dependants of the same planting that you have not moved by hand shift by the same delta
(postponing *sow tomatoes* moves *harden off* and *plant out*).
Response: `{task_id, due, shifted: [ids], warnings: ["beyond_window", …]}`.

### `garden_manager.delete_task`
Deletes user tasks; generated tasks are marked *skipped* (otherwise they would be
re‑created).

### `garden_manager.generate_tasks`
Idempotent regeneration from plan + database + sensors + forecast.
Response: `{created, updated, removed, open_tasks}`.

### `garden_manager.recalculate_plan`
Refetch the forecast and recompute everything. Response: `{frost_risk,
weather_available, alerts, season}`.

### `garden_manager.export_plan` *(response only)*
Fields: `include_tasks`, `seasons`. Returns the plan document (see
[configuration](CONFIGURATION.md#5-import--export-format)).

### `garden_manager.import_plan`
Fields: `plan` (object), `mode` (`merge` | `replace`). Response: counts per collection.

### `garden_manager.add_planting` / `update_planting` / `remove_planting`
`add_planting`: `plant_id` and `bed` (id or name) are required; optional `season`,
`layout`, `x_cm`, `y_cm`, `width_cm` (default bed width), `length_cm` (default one row),
`count`, `method`, `status`, planned and actual dates, `notes`. Tasks follow
automatically. `update_planting` takes `planting_id` plus any of those fields;
`remove_planting` takes `planting_id`.

```yaml
action: garden_manager.add_planting
data: {plant_id: dill, bed: Bed 1, layout: row}
response_variable: added
```

### `garden_manager.autofill_plan`
Proposes a season plan. Fields: `season`, `beds` (default: all empty beds), `replace`,
`apply` (store it), and resources `household_size`, `hours_per_week`,
`water_liters_per_week`, `compost_kg`, `goals` (`fresh`, `storage`, `herbs`,
`pollinators`, `winter`, `perennials`, `easy`), `wanted`, `excluded`, `max_crops`.
Response: `plantings`, `placements` (crop, bed, count, m², kg, min/week, L/week,
sowings), `skipped`, `warnings`, `summary`.

### `garden_manager.run_irrigation_plan`
Fields: `dry_run`, `beds`, `amount_mm`. Returns the plan (`runs`, `skipped` with
reasons, `lockout`) and starts it unless `dry_run`. Ignores the irrigation mode, never
the safety rules. `garden_manager.stop_irrigation` stops a run.

### `garden_manager.set_shading_mode`
Fields: `zone` (id or name of a greenhouse/cold frame), `mode` (`auto`/`on`/`off`).

### `garden_manager.export_pdf`
Writes a PDF to `/config/hortulus/exports/` (private; the response contains a signed download link valid for 7 days). Fields:
`document` (`garden`, `zone`, `beds`, `tasks`, `season`, `blank`, `plants`), `page`
(`a4`, `a3`, `a5`, `letter`, `remarkable`), `landscape`, `color_mode` (`color`, `eink`,
`grayscale`), `season`, `zone_id`, `bed_ids`, `days`, `notes`, `grid`, `title`.
Response: `{path, url, filename, bytes}`.

```yaml
# Every Monday morning: this week's checklist for the reMarkable
action: garden_manager.export_pdf
data: {document: tasks, page: remarkable, color_mode: eink, days: 7}
```

---

## Events

| Event | Fired when | Data |
|---|---|---|
| `garden_manager_task_due` | morning digest (every task due) and when a sensor/weather task appears during the day | `task_id, type, title, priority, due, bed_id, zone_id, planting_id` |
| `garden_manager_task_completed` | a task is completed/skipped | `task_id, type, title, skipped, planting_id, bed_id, next_task_id` |
| `garden_manager_frost_warning` | new frost alert (once per zone and night) | `key, severity, zone_id, level, temp, when, plants` |
| `garden_manager_heat_warning` | new greenhouse heat alert (once per zone and day) | `key, severity, zone_id, zone, temp, action` |
| `garden_manager_irrigation_recommended` | a bed needs water (once per bed and day) | `bed_id` + every attribute of the irrigation recommendation |
| `garden_manager_plan_updated` | plan, plants, settings or import changed | `reason, revision` |
| `garden_manager_irrigation_run` | a valve finished (or was stopped) | `bed_id, bed, minutes, liters, mm, source` |

## Websocket API (used by the panel)

`garden_manager/subscribe` (snapshot push), `plants`, `plants/save`, `plants/delete`,
`plants/windows`, `plan/save` (with `base_revision`), `plan/check` (draft compatibility),
`plan/succession`, `plan/export`, `plan/import`, `tasks/add`, `tasks/action`,
`settings/save`, `plan/autofill`, `plan/autofill/apply`, `print/render` (SVG preview),
`handbook/index`, `handbook/chapter`, `handbook/search`, `irrigation/plan`,
`irrigation/run`, `irrigation/stop`. Writes to the plan, plants and settings require an
admin user.

## PDF download

`GET /api/garden_manager/print?document=garden&page=remarkable&color_mode=eink`
(authenticated, same parameters as `export_pdf`, lists comma separated) returns the PDF;
`&format=svg` returns the SVG pages as JSON.
