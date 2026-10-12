# Configuration

Hortulus is configured in three places, each with a clear job:

| Where | What | Stored in |
|---|---|---|
| **Setup wizard** (config flow) | First‑run: climate, weather, initial beds + sensors, notifications | config entry → seeds the garden store once |
| **Options** (Settings → Devices & services → Hortulus → *Configure*) | Climate, weather/outdoor sensors, notifications, advanced tuning | written into the garden store |
| **Hortulus panel** | Everything else: drawing beds/zones, plantings, sensor mapping, plant database, tasks | `.storage/garden_manager.garden` |

The garden store is the single source of truth after setup; the options flow and the
panel both edit it, so they never disagree.

---

## 1. Setup wizard

### Step 1 – Climate profile
Choose how Hortulus learns your **frost dates**. Every sowing/planting window in the
plant database is expressed relative to them.

| Profile | Use when | Example |
|---|---|---|
| **Regional preset** | You live in a covered region | *Netherlands / Flanders*: last frost 20 Apr, first frost 25 Oct |
| **USDA hardiness zone** | North America or you know your zone | 7a → 8 Apr / 1 Nov (shifted 6 months on the southern hemisphere) |
| **Custom frost dates** | You have local data (best) | `04-28` / `10-15` |

Available presets:

| Preset | Hemisphere | Last frost | First frost |
|---|---|---|---|
| `nl_be` Netherlands / Flanders | N | 04‑20 | 10‑25 |
| `uk_south` | N | 04‑10 | 11‑01 |
| `uk_north` | N | 05‑01 | 10‑15 |
| `de_central` | N | 04‑30 | 10‑15 |
| `fr_north` | N | 04‑15 | 10‑31 |
| `scandinavia_south` | N | 05‑15 | 09‑30 |
| `mediterranean` | N | 03‑01 | 12‑01 |
| `au_melbourne` | S | 09‑15 | 05‑15 |
| `nz_christchurch` | S | 10‑10 | 04‑25 |
| `za_highveld` | S | 09‑01 | 05‑15 |

**Edge cases handled**: a custom `02-29` resolves to Feb 28 in common years; on the
southern hemisphere a *season* runs July → June and is named after the year its spring
falls in (season 2026 = Sep 2026 – May 2027); USDA zones 11+ are treated as frost‑free.

### Step 2 – Weather
* **Weather entity** (recommended): must offer an hourly and/or daily forecast. Hortulus
  calls `weather.get_forecasts` every 30 minutes and whenever the weather entity
  updates (rate‑limited to once per 10 minutes). Forecast units are converted to °C,
  mm and km/h automatically.
* **Outdoor temperature** (optional): used for the growing‑degree‑day log; falls back
  to the weather entity's current temperature. °F sensors are converted.
* **Rain sensor** (optional): a daily rain total in mm (or a binary rain detector).

### Step 3 – Beds, greenhouses and containers
Add as many areas as you like (*Add another…* menu). Each area asks for name, type,
width × length (metres), soil, shade % and wind exposure, followed by sensors:

| Field | Typical entity | Device class filter |
|---|---|---|
| Soil moisture | `sensor.soil_moisture_bed_1` | moisture (%) |
| Soil temperature | `sensor.soil_temp_bed_1` | temperature |
| Air temperature *(greenhouse)* | `sensor.greenhouse_temp` | temperature |
| Air humidity *(greenhouse)* | `sensor.greenhouse_humidity` | humidity |
| Light *(greenhouse)* | `sensor.greenhouse_lux` | illuminance |
| Irrigation | `valve.bed_1` or `switch.drip_bed_1` | – |
| Flow rate | `4` L/min | – |

What the wizard creates:

* **Outdoor beds & containers** → beds inside one outdoor zone (“Garden”), laid out
  left‑to‑right with 50 cm paths.
* **Greenhouse** → a greenhouse *zone* of the given size with one in‑ground bed
  (“Greenhouse Zone A bed”) along the long side; air sensors attach to the zone, soil
  sensors to the bed.

### Step 4 – Notifications
Persistent notifications, any number of `notify.*` services (mobile push), an optional
TTS engine + speakers, and the time of the **daily digest** (default 07:30).

### Step 5 – Summary
Review and optionally seed an **example plan** for the coming season: tomato + basil +
marigold under glass, carrots next to onions (carrot/onion‑fly masking) and three
succession sowings of lettuce.

---

## 2. Sensor mapping rules

Each bed resolves its sensors in this order:

1. sensors set **on the bed**,
2. sensors set **on its zone** (e.g. one greenhouse thermometer for all its beds),
3. for outdoor zones: the **outdoor sensors** from the weather step.

Missing, `unknown` or `unavailable` sensors simply lower precision. A sensor that has not
reported for longer than *sensor stale minutes* (default 360) is ignored and raises a
“sensor stale” alert. Hortulus uses `last_reported`, so a flat‑lining but alive sensor
is not considered stale.

---

## 3. Options flow

| Menu | Fields |
|---|---|
| Climate & frost dates | profile, hemisphere, preset/zone/custom dates |
| Weather & outdoor sensors | weather entity, outdoor temperature, rain |
| Notifications | persistent, push services, TTS, speakers, digest time, frost/heat alerts, TTS frost announcement |
| Advanced tuning | language of generated texts (auto/en/nl), companion radius (cm), sensor stale minutes, root‑zone depth (mm), max irrigation per session (mm) |

Saving reloads the integration; your plan and tasks are untouched.

---

## 4. The panel

Open **Hortulus** in the sidebar (`/hortulus`). Non‑admin users can view everything and
work with tasks; editing the plan, plant database and settings requires an admin.

### Planner
* **Add bed / Add zone** in the toolbar, then drag to move, use the corner handle to
  resize. Beds dropped on a zone join it; moving a zone moves its beds.
* **Plant palette**: choose *Single*, *Block* or *Row*, then drag a plant onto a bed.
  While you hover, Hortulus asks the backend for a live compatibility check and shows
  ♥ friends / ⚠ conflicts / ⟲ rotation issues in the ghost label.
* **Inspector**: layout, method (sow indoors / sow in place / plant), status, size,
  planned date override, a season timeline (sowing window, transplant window, harvest),
  and all warnings with their explanation.
* **Succession sowing**: split a block into strips sown every *N* days (default from the
  plant, e.g. lettuce 21 days) or stack sowings on the same spot. Sowings outside the
  sowing window are skipped and reported.
* **Autofill** (toolbar): enter household size, hours per week, water and compost you
  have, goals (fresh, storage, herbs, pollinators, winter, perennials, low maintenance),
  must‑have and never crops, and which beds to fill. The proposal shows crops, counts,
  m², expected harvest, minutes per week, peak‑week water and compost, plus warnings
  (e.g. "no room for…"). Nothing changes until you press **Apply**. The rules: amounts
  per person from the database; rotation conflicts exclude a bed; companions,
  greenhouse need and shade tolerance score the bed; strips are packed with the tallest
  crops on the side away from the sun; quick crops get three successive sowings.
* **Multi‑select**: <kbd>Shift</kbd>/<kbd>Ctrl</kbd>‑click beds, crops or elements; drag
  them together or use **align** (left, centre, right, top, middle, bottom) and
  **distribute**.
* **Garden elements**: paths, compost heap, water butt, shed, tree, hedge and trellis
  ("+ Element"); they appear on the printouts too.
* **Layers**: show/hide zones, elements and crops.
* **Overlays**: companions (green = friends, dotted green = pest deterrence, red dashed =
  enemies, purple = allelopathy, orange = competition or overlap, grey dotted = shading),
  moisture (bed outline + %), soil temperature. Plant symbols follow the growth habit
  (disc = bush, triangle = climber, diamond = upright, ring = vine, flower = rosette,
  ▼ = root crop, drop = bulb), so the plan reads without colour too.
* **Inspector** extras: growth stage, crop coefficient, degree days and the expected
  harvest date; **better neighbours** for conflicts; **fits in** buttons that move a
  crop to a bed without a rotation conflict.
* **Show garden on**: scrub through the season – plantings not in the ground on that date
  are faded.
* **Autosave**: changes are saved ~1 s after each edit with an optimistic‑concurrency
  revision; if the plan changed elsewhere you get a notice and the latest plan.

Keyboard shortcuts (press <kbd>?</kbd> in the planner):

| Keys | Action |
|---|---|
| <kbd>←</kbd><kbd>↑</kbd><kbd>→</kbd><kbd>↓</kbd> | move selection by one grid step (<kbd>Shift</kbd> = 10×) |
| <kbd>Alt</kbd> + arrows | resize selection |
| <kbd>Ctrl/⌘</kbd>+<kbd>Z</kbd> / <kbd>Ctrl/⌘</kbd>+<kbd>Y</kbd> | undo / redo |
| <kbd>Delete</kbd> | remove selection |
| <kbd>Ctrl/⌘</kbd>+<kbd>D</kbd> | duplicate planting |
| <kbd>[</kbd> <kbd>]</kbd> | select previous / next item |
| <kbd>G</kbd> <kbd>C</kbd> <kbd>M</kbd> <kbd>T</kbd> | grid snap, companions, moisture, temperature overlays |
| <kbd>+</kbd> <kbd>−</kbd> <kbd>0</kbd> | zoom in / out / fit |
| <kbd>Enter</kbd> on a palette plant | add it to the selected bed (keyboard alternative to dragging) |

### Plant library
Search (accent‑insensitive, any language), filter by family, *greenhouse*, *quick
crops* or *my plants*. Every plant shows a sowing calendar computed for **your**
frost dates. *Customize* stores only the fields you changed as an override, so future
updates of the built‑in data still reach you; *Reset to built‑in* removes the override.
*New plant* creates a custom plant (identifier derived from the English name).

### Calendar
Month, week, list and **timeline** views (a Gantt per bed with sowing, growing and
harvest bars, the degree‑day harvest estimate, frost dates and a "garden work" row with
the seasonal tasks); overdue open tasks are shown on today so nothing hides in
the past. On touch screens, swipe a task right to complete it or left to postpone it a
day. The task dialog shows the live context (soil moisture and temperature, water
balance, nutrients, air temperature, humidity, disease and frost risk, today's weather and
ET₀) and links to the matching handbook chapter. Open a task to complete, skip, postpone (+1/+3/+7 days or a date; dependants
follow), change priority, add notes and **photos** (uploaded through Home Assistant's
`image_upload`, stored locally).

### Handbook
16 chapters (EN/NL) with search and a glossary: planning, soil & compost, sowing,
watering (ET₀, Kc, water balance), feeding (NPK, EC), rotation, companion planting, the
greenhouse, pests, diseases, the garden year & winter rest, harvest & storage, seed
saving, no‑dig & mulch, herbs, perennials. The ⓘ buttons across the panel open the
glossary entry for a term and link into the chapter.

### Print
Pick a document – **garden map**, **greenhouse / zone**, **bed sheets**, **checklist**,
**season chart**, **planning sheet** (outlines + dot grid to sketch on) or **plant
cards** – then paper (A4, A3, A5, Letter, **reMarkable Paper Pro**), orientation and
colours (*full colour*, *e‑ink* with light tints and a hatch pattern per family,
*grayscale*). The preview shows every page; **Download PDF** fetches it through Home
Assistant's authenticated API, **Save** writes it to `/config/www/hortulus/`.
Maps contain a legend (families, zones, elements, symbols, numbered crops where names
don't fit), a scale bar with ratio and a north arrow; bed sheets add a 10 cm grid, the
compost and fertiliser for the coming crops and the rotation history.

To put a PDF on the reMarkable: download it and drag it into the reMarkable desktop or
mobile app, or send it with *Send to reMarkable* by email. The page size matches the
Paper Pro screen exactly, so nothing is scaled.

### Settings
Region, weather (+ outdoor humidity, leaf wetness, **Open‑Meteo** opt‑in, elevation),
**sensor mapping per zone and bed** with live values – including **EC, N, P, K** probes
per bed and **PAR** / **leaf wetness** per zone – greenhouse **vent and shade screen**
entities with *off / advise / auto* control, microclimate (*against a warm wall*,
*thermal mass*), **irrigation hardware** (mode, pump, start time, max runtime, frost
lockout, rain skip, pump lead time; valve and flow per bed), **resources** for autofill
and the seasonal task switch, notifications, language, grid size, companion radius and
import/export.

#### Irrigation hardware in 5 steps
1. Settings → Beds: pick the valve (`switch.*` or `valve.*`) and the flow in L/min for
   each bed (measure it: time how long a 10 L bucket takes).
2. Settings → Irrigation hardware: optional pump switch and *pump stop before valve*.
3. Choose the start time and the limits (max runtime, frost lockout, rain skip).
4. Try `garden_manager.run_irrigation_plan` with `dry_run: true` and check the plan.
5. Switch on **Automatic irrigation**. With *advise* you only get watering tasks.

---

## 5. Import & export format

Export from the planner toolbar, Settings, or `garden_manager.export_plan`.

```yaml
format: hortulus-plan
version: "1.4"
exported_at: "2026-03-01T10:00:00+01:00"
zones:
  - id: zone_outdoor
    name: Garden
    type: outdoor          # outdoor | greenhouse | cold_frame
    x_cm: 0
    y_cm: 0
    width_cm: 400
    length_cm: 300
    microclimate: {shade_pct: 0, wind: moderate, heated: false}
    sensors: {air_temperature: null}
beds:
  - id: bed_1
    name: Bed 1
    zone_id: zone_outdoor
    kind: raised           # in_ground | raised | container
    x_cm: 50
    y_cm: 50
    width_cm: 200
    length_cm: 100
    soil: loam
    sensors: {soil_moisture: sensor.soil_moisture_bed_1, soil_temperature: sensor.soil_temp_bed_1}
plantings:
  - id: pl_carrots
    plant_id: carrot
    bed_id: bed_1
    season: 2026
    layout: row            # single | block | row
    x_cm: 0                # relative to the bed
    y_cm: 0
    width_cm: 200
    length_cm: 25
    method: direct_sow     # indoor_sow | direct_sow | transplant
custom_plants: []
plant_overrides: {tomato: {spacing_cm: 60}}
rotation_history:
  - {bed_id: bed_1, season: 2025, family: Solanaceae, source: manual}
```

Import modes: **merge** (upsert by id, nothing deleted) or **replace** (layout and
plantings replaced). Files from older versions are migrated automatically; unknown
fields are ignored, references are validated (a bed must point to an existing zone,
a planting to an existing bed).

---

## 6. Units, language, time

* Units are metric internally (cm, °C, mm, L). Sensors and forecasts in imperial units are
  converted on read.
* Generated task titles, notifications and calendar events follow Home Assistant's
  language (English or Dutch) unless overridden under *Advanced*. The panel follows your
  user language.
* All dates are local (Home Assistant time zone). Forecast hours are handled as absolute
  instants, so DST transitions (23‑ or 25‑hour nights) never skew frost durations.

## 7. Performance

* No sensor polling – state‑change listeners on exactly the mapped entities, debounced
  10 s; the forecast is the only timed fetch (30 min).
* All computation is pure Python on in‑memory data (milliseconds for a typical garden),
  storage writes are debounced (5 s) and never block the event loop.
* The panel bundle is ~55 kB gzipped and is cached with a content hash.
