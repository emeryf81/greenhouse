# Entity, service & event reference

Entity ids below assume an **English** Home Assistant install and the example garden
(*Bed 1*, *Greenhouse Zone A*). Home Assistant derives entity ids from the translated
entity name and the device name at the moment an entity is first created, so on a Dutch
install `sensor.hortulus_frost_risk_next_48h` becomes
`sensor.hortulus_vorstrisico_komende_48_uur`. Unique ids never change; rename freely.

## Devices

| Device | Created for | Contains |
|---|---|---|
| **Hortulus** | the integration | garden‑wide sensors, calendar, to‑do list, buttons |
| **<Bed name>** | every bed | moisture, irrigation, companion score, needs water |
| **<Zone name>** | every greenhouse / cold‑frame zone | greenhouse advice, heat stress |

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

## Binary sensors

| Entity | Device class | On when |
|---|---|---|
| `binary_sensor.hortulus_frost_warning` | cold | frost risk *moderate* or *high*; attribute `plants_at_risk` |
| `binary_sensor.<bed>_needs_water` | problem | irrigation action is `water` |
| `binary_sensor.<zone>_heat_stress` | heat | greenhouse advice is `ventilate` or `shade` |

## Calendar, to‑do list, buttons

| Entity | Notes |
|---|---|
| `calendar.hortulus_garden_tasks` | All‑day events for every task (✓ = done, ‼/! = urgent/high). Create, edit (moving the date postpones the task, dependants follow) and delete from the HA calendar. |
| `todo.hortulus_this_week` | Open tasks due within 7 days (+ overdue), plus tasks completed in the last 2 days. Ticking an item completes the task. |
| `button.hortulus_generate_tasks` | Re‑generate tasks now. |
| `button.hortulus_refresh_forecast` | Fetch the forecast now. |

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

## Websocket API (used by the panel)

`garden_manager/subscribe` (snapshot push), `plants`, `plants/save`, `plants/delete`,
`plants/windows`, `plan/save` (with `base_revision`), `plan/check` (draft compatibility),
`plan/succession`, `plan/export`, `plan/import`, `tasks/add`, `tasks/action`,
`settings/save`. Writes to the plan, plants and settings require an admin user.
