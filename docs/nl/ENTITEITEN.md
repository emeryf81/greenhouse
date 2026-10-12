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
| `sensor.hortulus_reference_evapotranspiration_today` | `sensor.hortulus_referentieverdamping_vandaag` |
| `sensor.bed_1_nutrient_balance` | `sensor.bed_1_voedingsbalans` |
| `sensor.greenhouse_zone_a_disease_risk` | `sensor.greenhouse_zone_a_ziekterisico` |
| `switch.hortulus_automatic_irrigation` | `switch.hortulus_automatisch_bewateren` |
| `select.greenhouse_zone_a_shading` | `select.greenhouse_zone_a_schaduw` |

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
| Referentieverdamping vandaag | mm ET₀ (Penman‑Monteith, anders Hargreaves) | `method`, `rh_min`, `wind_kmh`, `cloud_fraction`, `forecast` |
| Graaddagen vandaag | °C·d | – |
| `<bed>` Voedingsbalans | 0–100 uit NPK‑ of EC‑sensoren t.o.v. de behoefte van de gewassen | `status`, `deficits`, `excess`, `source` |
| `<bed>` Watertekort bodem (standaard uit) | mm onder veldcapaciteit (dagelijkse waterbalans) | `available_water_mm`, `crop_coefficient` |
| `<zone>` Ziekterisico | `none`/`low`/`moderate`/`high`/`unknown` | `wet_hours_48h`, `hutton_period`, `humidity`, `leaf_wet`, `reasons` |
| `<zone>` Graaddagen dit seizoen (standaard uit) | °C·d | – |
| Oogst dit seizoen | kg geoogst dit kalenderjaar (uit het oogstlogboek) | `season`, `per_crop_kg` |
| Tuinwater (7 dagen) | liter leidingwater de laatste 7 dagen (watermeter uit Instellingen) | `season_l`, `per_day` |
| Beschikbaar regenwater | liter in de regentonnen (peil % × inhoud) | – |

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
* Knoppen **Taken genereren**, **Verwachting verversen**, **Nu water geven** en **Bewatering stoppen**.
* **Vorstrisico 48u** (cold) per zone, **Vorstvergrendeling bewatering** (safety) en
  **Bewatering actief** (running).
* **Automatisch bewateren** (schakelaar), **Bewateringsmodus** (`off`/`advise`/`auto`),
  getallen voor **maximale looptijd**, **vorstvergrendeling vanaf** en **overslaan boven
  regen**, en per serre **Schaduw** (`auto`/`on`/`off`).

**Veiligheidsregels bewatering** (ook bij handmatig starten): één klep tegelijk; de pomp
draait alleen als er een klep open is (klep → 1 s → pomp aan … pomp uit → wachttijd →
klep dicht); maximale looptijd; buitenkleppen dicht bij vorst binnen 12 uur of als het nu
te koud is; overslaan bij voldoende regen; op het einde, na een fout en bij annuleren
worden alle geopende kleppen en de pomp uitgeschakeld.

De kalender bevat ook het **seizoenswerk**: seizoen plannen, zaden bestellen, compost
omzetten, mulchen, elk bed klaarmaken vóór het planten (met kg compost), groenbemester of
afdekken als een bed leeg komt, slangen leeg vóór de vorst, winterrust, bodemanalyse om
de drie jaar, gereedschap, en per serre: voorjaarspoets, schaduw aan/af, winterklaar
maken en de **najaarspoets (serre kuisen en ontsmetten)**. Vaste planten krijgen
terugsnoeien, scheuren en winterbescherming.

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
| `garden_manager.add_planting` | `plant_id`, `bed`, optioneel `season`, `layout`, `x_cm`, `y_cm`, `width_cm`, `length_cm`, `count`, `method`, `status`, data, `notes` | `planting_id` |
| `garden_manager.update_planting` | `planting_id` + te wijzigen velden | de teelt |
| `garden_manager.remove_planting` | `planting_id` | – |
| `garden_manager.autofill_plan` | `season`, `beds`, `replace`, `apply`, `household_size`, `hours_per_week`, `water_liters_per_week`, `compost_kg`, `goals`, `wanted`, `excluded`, `max_crops` | voorstel + samenvatting |
| `garden_manager.run_irrigation_plan` | `dry_run`, `beds`, `amount_mm` | plan, overgeslagen bedden met reden |
| `garden_manager.stop_irrigation` | – | – |
| `garden_manager.set_shading_mode` | `zone`, `mode` (`auto`/`on`/`off`) | – |
| `garden_manager.log_harvest` | `planting_id` of `plant_id`, `kg`, `count`, `quality` (1–5), `day`, `note` | `harvest` |
| `garden_manager.add_journal_entry` | `text`, `kind` (`note`/`observation`/`problem`/`milestone`), `planting_id`, `bed`, `photos` | – |
| `garden_manager.assign_task` | `task_id`, `assignee` (`person.*`, leeg = niemand) | – |
| `garden_manager.save_soil_test` | `bed`, `date`, `ph`, `organic_matter_pct`, `p_mg`, `k_mg` (mg/100 g), `notes` | – |
| `garden_manager.install_voice_sentences` | `overwrite` | geïnstalleerde bestanden |
| `garden_manager.export_pdf` | `document` (ook `year` = jaarplan), `page` (incl. `remarkable`), `landscape`, `color_mode` (`color`/`eink`/`grayscale`), `season`, `zone_id`, `bed_ids`, `days`, `notes`, `grid`, `title` | `path`, `url` |

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
| `garden_manager_irrigation_run` | een klep is klaar (of gestopt) | `bed_id`, `minutes`, `liters`, `mm`, `source` |

## Lovelace-kaart

De integratie laadt zelf een kaart op elk dashboard (geen resource toevoegen):

```yaml
type: custom:hortulus-tasks-card
title: Tuin vandaag   # optioneel
days: 0               # 0 = vandaag + achterstallig, 7 = de komende week
assignee: me          # optioneel: me | person.xyz | unassigned
max: 8
```

Een taak afvinken op de kaart rondt ze af in Hortulus.

## Spraak (Assist)

Voer één keer `garden_manager.install_voice_sentences` uit (of Instellingen → Huishouden &
spraak → *Spraakzinnen installeren*). Daarna kun je Assist vragen: „wat moet ik vandaag in de
tuin doen”, „wat ben ik vergeten in de tuin”, „wat kan ik vandaag oogsten”, „hoe warm is het
in de serre”, „moet ik vandaag water geven”, „gaat het vriezen vannacht”.

Zie de [Engelse referentie](../en/ENTITY_REFERENCE.md) voor alle details en
[voorbeeldautomatiseringen](../../examples/automations.yaml).
