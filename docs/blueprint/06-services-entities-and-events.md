<!-- Generated from the sources by a script: code excerpts below are verbatim. -->
[← 5. Frontend (TypeScript)](05-frontend-typescript.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [7. Scheduling, Compatibility, and Watering Algorithms →](07-scheduling-compatibility-and-watering-algorithms.md)

## 6. Services, Entities, and Events

**Entities** (English install; see [ENTITY_REFERENCE](../en/ENTITY_REFERENCE.md)):

| Spec name | Entity | States / unit |
|---|---|---|
| `garden.bed_moisture_status` | `sensor.<bed>_moisture_status` | `dry`, `slightly_dry`, `optimal`, `wet`, `unknown` |
| `garden.frost_risk_next_48h` | `sensor.hortulus_frost_risk_next_48h` | `none`, `low`, `moderate`, `high`, `unknown` |
| `garden.irrigation_recommendation` | `sensor.<bed>_irrigation_recommendation` | mm (+ litres, minutes, action) |
| `garden.growing_degree_days` | `sensor.hortulus_growing_degree_days` | °C·d |
| – | `sensor.<zone>_greenhouse_advice` | `none`, `ventilate`, `shade`, `close_up`, `heat` |
| – | `sensor.hortulus_tasks_due_today`, `sensor.hortulus_next_task`, `sensor.<bed>_companion_score` (disabled by default) | count / text / % |
| – | `sensor.hortulus_reference_evapotranspiration_today`, `sensor.hortulus_degree_days_today`, `sensor.<zone>_degree_days_this_season` (disabled by default), `sensor.<bed>_nutrient_balance`, `sensor.<bed>_soil_water_deficit` (disabled by default), `sensor.<zone>_disease_risk` | mm / °C·d / °C·d / index / mm / `none`…`high` |
| – | `sensor.hortulus_harvest_this_season`, `sensor.hortulus_garden_water_7_days`, `sensor.hortulus_rain_water_available` | kg / L / L |
| – | `sensor.hortulus_rain_7_days`, `sensor.hortulus_mean_temperature_7_days`, `sensor.hortulus_sunshine_7_days`, `sensor.hortulus_frost_nights_this_season` (climate history; `last_year` and period totals as attributes) | mm / °C / h / count |
| – | `binary_sensor.hortulus_frost_warning`, `binary_sensor.<bed>_needs_water`, `binary_sensor.<zone>_heat_stress`, `binary_sensor.<zone>_frost_risk_48h`, `binary_sensor.hortulus_irrigation_frost_lockout`, `binary_sensor.hortulus_irrigation_running` | on/off |
| – | `calendar.hortulus_garden_tasks`, `todo.hortulus_this_week` | editable |
| – | `button.hortulus_generate_tasks`, `button.hortulus_refresh_forecast`, `button.hortulus_water_now`, `button.hortulus_stop_watering` | |
| – | `select.hortulus_irrigation_mode`, `select.<zone>_shading`, `switch.hortulus_automatic_irrigation`, `number.hortulus_irrigation_max_runtime`, `number.hortulus_irrigation_frost_lockout_temperature`, `number.hortulus_skip_irrigation_above_rain` | controls (configuration entities) |

Each bed and zone is a Home Assistant device (created and removed live as the plan changes);
every further garden has its own set, titled *Hortulus 2*, … . Sensors are set up per platform
(`sensor.py` … `todo.py`); the Lovelace card and the panel read the same snapshot, not the entities.

**Services** (`garden.*` in the brief → `garden_manager.*`, HA requires the integration domain). All accept an optional
`garden:` (entry id or title). *Admin* = needs an administrator when the call carries a user (automations and scripts run
without one, 4.19).

| Service | Purpose | Response |
|---|---|---|
| `garden_manager.add_task` | user task, optional recurrence | `task_id` |
| `garden_manager.complete_task` | done/skip, notes, photos; updates planting; rolls recurrence | `status`, `next_task_id`, `next_due` |
| `garden_manager.postpone_task` | move by days or to a date; dependants cascade | `due`, `shifted`, `warnings` |
| `garden_manager.delete_task` | delete user task / skip generated | – |
| `garden_manager.assign_task` | give a task to a `person.*` (or anyone) | – |
| `garden_manager.generate_tasks` *(admin)* | idempotent regeneration | counts |
| `garden_manager.recalculate_plan` *(admin)* | refetch forecast + recompute | frost, alerts, season |
| `garden_manager.export_plan` | plan document | plan (response only) |
| `garden_manager.import_plan` *(admin)* | merge / replace | counts |
| `garden_manager.add_planting` / `update_planting` / `remove_planting` *(admin)* | edit crops (bed by id or name; must sit on a bed of the season's plan) | `planting_id`, `planting` |
| `garden_manager.run_irrigation_plan` / `stop_irrigation` *(admin)* | run the safe plan (`dry_run`, `beds`, `amount_mm`, `only_if_needed`), stop a run | the plan (`runs`, `skipped`, `lockout`, `started`) |
| `garden_manager.set_shading_mode` *(admin)* | `auto` / `on` / `off` for a zone | `zone_id`, `mode` |
| `garden_manager.autofill_plan` *(admin)* | propose a season plan, store it with `apply` | `plantings`, `placements`, `skipped`, `warnings`, `summary` |
| `garden_manager.export_pdf` *(admin)* | printout (any of the 9 documents) into `/config/hortulus/exports` | `path`, signed `url`, `filename`, `bytes` |
| `garden_manager.log_harvest` | kg / pieces; `plant` may be a name (`Tomaat`) – handy for an NFC tag or button | entry |
| `garden_manager.add_journal_entry`, `save_soil_test` | diary entry (photos), soil analysis per bed | – |
| `garden_manager.install_voice_sentences` *(admin)* | copy the Assist sentences to `custom_sentences` | files |

**Events:** `garden_manager_task_due`, `garden_manager_task_completed`,
`garden_manager_frost_warning`, `garden_manager_heat_warning`, `garden_manager_disease_warning`,
`garden_manager_irrigation_recommended` (once per bed per day), `garden_manager_irrigation_run`
(after every run: bed, minutes, litres, mm, source) and `garden_manager_plan_updated`.
The companion app fires `mobile_app_notification_action`, which `actions.py` answers.

**Blueprints** (`blueprints/automation/hortulus/`, importable from the README): frost warning on a lamp
(which returns to how it was), log a harvest with a button or an NFC tag, water a dry bed at a good moment,
announce urgent garden jobs. `tests/test_blueprints.py` validates each and instantiates it.

**Notifications:** persistent notifications (`garden_manager_frost`, `_heat`, `_digest`, valve and leak
problems), any `notify.*` service with a deep link to `/hortulus` and action buttons, optional `tts.speak` for
frost. De‑duplication keys live in `GardenData.notified` (pruned after 14 days).

**Websocket:** 69 commands under `garden_manager/`, grouped and with their permissions in 4.8.

**Assist:** six intents (tasks today, overdue, harvest, greenhouse, water, frost) in English, Dutch and French.

---

---

[← 5. Frontend (TypeScript)](05-frontend-typescript.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [7. Scheduling, Compatibility, and Watering Algorithms →](07-scheduling-compatibility-and-watering-algorithms.md)
