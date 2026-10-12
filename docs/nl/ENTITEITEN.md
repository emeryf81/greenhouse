# Entiteiten, diensten en events

> **Entity‑id's en taal.** Home Assistant maakt entity‑id's aan op basis van de vertaalde
> naam in de systeemtaal op het moment van aanmaken. Op een Nederlandstalige installatie:

| Engels systeem | Nederlands systeem |
|---|---|
| `sensor.hortulus_frost_risk_next_48h` | `sensor.hortulus_vorstrisico_komende_48_uur` |
| `binary_sensor.hortulus_frost_warning` | `binary_sensor.hortulus_vorstwaarschuwing` |
| `sensor.hortulus_growing_degree_days` | `sensor.hortulus_graaddagen` |
| `sensor.hortulus_tasks_due_today` | `sensor.hortulus_taken_vandaag` |
| `sensor.hortulus_next_task` | `sensor.hortulus_volgende_taak` |
| `calendar.hortulus_garden_tasks` | `calendar.hortulus_tuintaken` |
| `todo.hortulus_this_week` | `todo.hortulus_deze_week` |
| `sensor.bed_1_moisture_status` | `sensor.bed_1_vochtstatus` |
| `sensor.bed_1_irrigation_recommendation` | `sensor.bed_1_beregeningsadvies` |
| `binary_sensor.bed_1_needs_water` | `binary_sensor.bed_1_heeft_water_nodig` |
| `sensor.greenhouse_zone_a_greenhouse_advice` | `sensor.greenhouse_zone_a_kasadvies` |
| `binary_sensor.greenhouse_zone_a_heat_stress` | `binary_sensor.greenhouse_zone_a_hittestress` |

## Sensoren

| Entiteit | Status | Belangrijkste attributen |
|---|---|---|
| Vorstrisico komende 48 uur | `none`/`low`/`moderate`/`high`/`unknown` (geen/laag/matig/hoog/onbekend) | `min_temperature`, `plant_level_min_temperature`, `min_at`, `hours_below_zero`, `source`, `zones` |
| Graaddagen | °C·d sinds 30 dagen vóór de laatste vorst (basis 10 °C) | `base_temperature`, `since`, `days_counted` |
| Taken vandaag | aantal open taken (vandaag + te laat) | `estimated_minutes`, `overdue`, `tasks` |
| Volgende taak | titel | – |
| `<bed>` Vochtstatus | `dry`/`slightly_dry`/`optimal`/`wet`/`unknown` | `moisture`, `target_low`, `target_high`, `water_need`, `soil_temperature` |
| `<bed>` Beregeningsadvies | mm | `action`, `liters`, `duration_min`, `rain_24h_mm`, `etc_24h_mm`, `confidence`, `reasons` |
| `<bed>` Buurplantenscore (standaard uit) | 0–100 (50 = neutraal) | `conflicts`, `rotation_conflicts` |
| `<zone>` Kasadvies | `none`/`ventilate`/`shade`/`close_up`/`heat` | `inside_now_c`, `forecast_max_c`, `limit_max_c`, `limiting_plants` |

Vorstniveaus gaan uit van de temperatuur op planthoogte (bij heldere, windstille nachten tot
2 °C kouder dan de verwachting): ≤ 0 °C hoog, ≤ 2 °C matig, ≤ 4 °C laag.

Vochtbanden (leem; zand −6, klei +6, löss +3, veen +8, kalk −2, potgrond +4):

| Waterbehoefte | droog onder | optimaal | nat boven |
|---|---|---|---|
| laag | 18 % | 22–38 % | 55 % |
| gemiddeld | 25 % | 30–45 % | 60 % |
| hoog | 32 % | 38–55 % | 68 % |

## Binaire sensoren, kalender, takenlijst, knoppen

* **Vorstwaarschuwing** (cold) – aan bij matig/hoog risico; attribuut `plants_at_risk`.
* **Heeft water nodig** (problem) per bed – aan als het advies `water` is.
* **Hittestress** (heat) per kaszone – aan bij `ventilate` of `shade`.
* **Tuintaken** (kalender) – alle taken als hele‑dag‑afspraken; aanmaken, verplaatsen
  (= uitstellen) en verwijderen kan vanuit de HA‑kalender.
* **Deze week** (takenlijst) – open taken voor de komende 7 dagen; afvinken = afronden.
* Knoppen **Taken genereren** en **Verwachting verversen**.

## Diensten

| Dienst | Velden | Antwoord |
|---|---|---|
| `garden_manager.add_task` | `title`, `due_date`, `type`, `description`, `priority`, `estimated_minutes`, `bed` (id of naam), `planting_id`, `recurrence_days`, `until` | `task_id` |
| `garden_manager.complete_task` | `task_id`, `note`, `photos`, `skipped` | `status`, `next_task_id`, `next_due` |
| `garden_manager.postpone_task` | `task_id`, `days` of `to_date`, `reason`, `cascade` | `due`, `shifted`, `warnings` |
| `garden_manager.delete_task` | `task_id` | – |
| `garden_manager.generate_tasks` | – | `created`, `updated`, `removed`, `open_tasks` |
| `garden_manager.recalculate_plan` | – | `frost_risk`, `weather_available`, `alerts`, `season` |
| `garden_manager.export_plan` | `include_tasks`, `seasons` | het plan |
| `garden_manager.import_plan` | `plan`, `mode` (`merge`/`replace`) | aantallen |

Een zaai‑, uitplant‑ of eerste oogsttaak afronden werkt de beplanting bij; daarna rekenen
alle verzorgingstaken vanaf de echte datum. Herhalende taken plannen de volgende keer
*N* dagen na het afronden.

## Events

| Event | Wanneer | Data |
|---|---|---|
| `garden_manager_task_due` | dagoverzicht, en nieuwe sensor/weer‑taken | `task_id`, `type`, `title`, `priority`, `due`, `bed_id`, … |
| `garden_manager_task_completed` | taak afgerond/overgeslagen | `task_id`, `skipped`, `next_task_id`, … |
| `garden_manager_frost_warning` | nieuwe vorstwaarschuwing (1× per zone per nacht) | `level`, `temp`, `when`, `plants`, `zone_id` |
| `garden_manager_heat_warning` | nieuwe hittewaarschuwing kas (1× per dag) | `zone`, `temp`, `action` |
| `garden_manager_irrigation_recommended` | bed heeft water nodig (1× per bed per dag) | `bed_id` + beregeningsadvies |
| `garden_manager_plan_updated` | plan/planten/instellingen gewijzigd | `reason`, `revision` |

Zie de [Engelse referentie](../en/ENTITY_REFERENCE.md) voor alle details en
[voorbeeldautomatiseringen](../../examples/automations.yaml).
