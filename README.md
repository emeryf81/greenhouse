<p align="center">
  <img src="assets/brand/banner.png" alt="Hortulus – plan, grow and harvest right inside Home Assistant" width="100%">
</p>

<p align="center">
  <a href="README.nl.md">🇳🇱 Nederlands</a> ·
  <a href="README.fr.md">🇫🇷 Français</a> ·
  <a href="docs/en/CONFIGURATION.md">Configuration</a> ·
  <a href="docs/en/ENTITY_REFERENCE.md">Entities & services</a> ·
  <a href="docs/en/FAQ.md">FAQ</a> ·
  <a href="docs/BLUEPRINT.md">Architecture blueprint</a> ·
  <a href="docs/DESIGN_SYSTEM.md">Design system</a>
</p>

<p align="center">
  <img alt="HACS custom" src="https://img.shields.io/badge/HACS-custom-41BDF5">
  <img alt="Home Assistant 2025.10+" src="https://img.shields.io/badge/Home%20Assistant-2025.10%2B-18BCF2">
  <img alt="100% local" src="https://img.shields.io/badge/cloud-none-4C8C3F">
  <img alt="English, Dutch, French" src="https://img.shields.io/badge/languages-EN%20%C2%B7%20NL%20%C2%B7%20FR-8B6446">
  <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-8B6446">
</p>

# Hortulus — vegetable garden manager for Home Assistant

*Hortulus* (Latin for "little garden", after Walahfrid Strabo's 9th‑century poem about
tending his monastery vegetable plot) turns Home Assistant into a kitchen‑garden
companion. Draw your beds and greenhouse, drag crops onto them, and Hortulus works out
**when to sow, plant out, feed, prune and harvest** – then keeps those plans honest with
your **soil sensors and the weather forecast**, tells you what to do today, keeps your
garden diary and harvest log, and turns what is ready to pick into **recipes, menus and a
shopping list**.

Everything runs locally. No accounts and no cloud. The only outside calls are optional:
Open‑Meteo for better evaporation estimates (off until you switch it on), plant photos
from Wikipedia in your browser (switch them off in Settings) and, without a radar camera in Home
Assistant, the public Buienradar map on the Weather tab in the Netherlands and Belgium.
The whole panel, the plant database, the handbook and the recipes come in **English,
Dutch and French**.

<table>
  <tr>
    <td width="34%" valign="top"><img src="assets/brand/Hortulus_EN.png" alt="Hortulus: your kitchen garden, planned and cared for"></td>
    <td width="66%" valign="top"><img src="docs/images/en/dashboard.png" alt="Today: tasks, weather, frost and heat warnings"></td>
  </tr>
</table>

## What is in the box

Hortulus adds one **panel** to the Home Assistant sidebar, organised in eight places, plus
entities, services, a dashboard card and voice commands for the rest of Home Assistant.

| Place | Tabs | What it is for |
|---|---|---|
| **Today** | Today · Wall screen | The day at a glance: tasks, warnings, weather, quick harvest, beds. |
| **Garden** | Planner · Garden plan · Crops | Draw the site, arrange the zones, plant the beds; every crop in one list, timeline, sowing plan, seeds, succession and harvest forecast. |
| **Calendar** | Calendar | Month, week, list, season timeline and year view of every task and crop. |
| **Weather** | Weather | Forecast, what it means for your garden, rain radar, climate history. |
| **Journal** | Diary · Harvest · Kitchen · Seed box · Water · Season report · System log | Everything you record, and what it adds up to. |
| **Cooking** | Ideas · My cookbook · Shopping list | A seasonal cookbook from what is ready to pick. |
| **Knowledge** | Plants · Advice · Handbook | 232 crops, questions and answers, a 23‑chapter handbook. |
| **Manage** | Analysis · Print · Settings | Plan check and diagnosis, PDFs for paper and reMarkable, all settings. |

## The garden

### Plan the site in five steps

**1 · Site** (house, driveway, street, terrace, lawn, paths, hedge, fence, trees, pond,
shed, compost bin, water butt …) on a 10 × 10 cm grid, **2 · Growing zones** (vegetable
garden, greenhouse, cold frame, **orchard, soft fruit, herb and flower garden**),
**3 · Beds** and planters inside the zones, **4 · Perennials** (fruit trees, berries,
asparagus, perennial herbs) and **5 · Annuals** – by hand, or let **Autofill** propose a
whole season. Each step edits only its own kind of thing, so a drag in step 5 can never
move a wall. Plants have recognisable **icons** (a carrot looks like a carrot), dense crops
are drawn as rows of seedlings, and an element that sits on top of another (lawn under a
terrace) reduces the area underneath. Multi‑select, align, layers, succession sowings,
undo/redo and import/export are built in.

<table>
  <tr>
    <td width="50%"><img src="docs/images/en/planner.png" alt="Planner with plant icons, orchard and fruit corner"></td>
    <td width="50%"><img src="docs/images/en/planner-crop.png" alt="A crop with its timeline, companions and why it fits here"></td>
  </tr>
  <tr>
    <td><img src="docs/images/en/layout.png" alt="Garden plan: zones, beds and elements"></td>
    <td><img src="docs/images/en/crops.png" alt="Crops: every crop of the season in one list"></td>
  </tr>
</table>

* **Companions & rotation** – live scoring while you drag: friends and enemies, **pest
  deterrence and trap crops, allelopathy, nutrient competition and shading** (hemisphere
  aware), each with an explanation, better‑neighbour suggestions and alternative beds for
  rotation conflicts. *"Why (not) here?"* answers in plain words, per bed.
* **Autofill** – proposes a whole season from your beds, household size, weekly hours,
  water and compost: right amounts per person, tall crops away from the sun, rotation and
  companions respected, quick crops in successive sowings, tender crops under glass.
  Preferences: must‑have and never crops, freedom of choice, pollinator flowers,
  year‑round harvest, perennials allowed, respect the zone type.
* **Perennials that stay** – an apple tree planted this year is still there next year,
  with its own yearly care (winter and summer pruning, thinning, netting, grease bands).
  At the **year‑end transition** you choose what moves into the new season; old seasons go
  to an archive and stay available for rotation, reports and the season book.
* **Crops** – every crop of the season in one table (sowing and planting dates, status,
  notes), plus **timeline**, **sowing plan by week**, **seed needs**, **succession** and a
  **harvest forecast**; change several crops at once.

<table>
  <tr>
    <td width="50%"><img src="docs/images/en/crops-timeline.png" alt="Crop timeline per bed"></td>
    <td width="50%"><img src="docs/images/en/crops-sowing-plan.png" alt="Sowing plan by week"></td>
  </tr>
</table>

### Know what to do – and when

A **task engine** schedules the whole life of every crop – sowing, pricking out, hardening
off, planting out, feeding, pruning, harvest – and the **garden year**: soil preparation
(with kilos of compost), cleaning the greenhouse windows, shading on and off, biological
control, nettle and comfrey feed, gutters and water butts, nest boxes, seed saving, winter
rest, orchard care. Tasks adapt to the weather (heat, dry spell, storm, heavy rain) – the
forecast and the weather that already happened (a check after a storm, the slug patrol
after a downpour, deep watering after a dry week) – wait for warm soil and a frost‑free
forecast, come with the tools each job needs, and nag
politely when overdue. You can assign them to people, tick them off from any dashboard,
and see a weekly look‑ahead.

<table>
  <tr>
    <td width="50%"><img src="docs/images/en/calendar-timeline.png" alt="Season timeline"></td>
    <td width="50%"><img src="docs/images/en/calendar-year.png" alt="Year view: every crop month by month"></td>
  </tr>
  <tr>
    <td><img src="docs/images/en/weather.png" alt="Weather and what it means for the garden"></td>
    <td><img src="docs/images/en/wall.png" alt="Wall screen"></td>
  </tr>
</table>

* **Calendar** – month, week, list, season timeline and year view, also as a Home
  Assistant calendar and to‑do list.
* **Weather** – hourly and daily forecast, what the coming days mean for *your* garden
  (frost, a hot day, rain you can count on, a bed that needs water), a rain radar and the
  climate history.
* **Wall screen** – a calm kiosk view of time, weather and tasks for a tablet in the
  kitchen; dims at night.

**Climate history – what the weather really did here.** Every update folds your outdoor
sensors (or the weather entity) into the day: lowest, highest and mean temperature, humidity,
wind and gusts, rain, solar radiation and sunshine hours – and every temperature sensor you
linked (greenhouse air, soil, air at a bed) gets its own daily minimum, maximum and mean.
Days Hortulus did not see are filled from Home Assistant's recorder and, with Open‑Meteo on,
from Open‑Meteo's observed weather. **Weather → Climate history** shows a daily chart (30
days, 90 days, a year), the last week, month and season next to last year, records, a table of
every temperature sensor, month by month, and your **measured frost dates** against the
regional preset. Months are kept for good, so year‑on‑year comparisons survive. The engine
uses this log too: for degree days, the water balance, disease risk and after‑care tasks.

## Records, kitchen and knowledge

### Journal

A **garden diary** with photos per bed or crop and a photo timeline, a **harvest log** in
kilos that teaches Autofill **your own yields**, a **seed box** that knows which packets
are getting old and which crops still need seed (and puts what is missing on your shopping
list), **water use** from a garden meter and the rain butt with a per‑bed watering history,
**soil analyses** per bed that steer fertiliser and lime advice, costs and savings, and a
**season report** – also as a printable **season book**. A *System log* shows what changed
and lets you undo it.

<table>
  <tr>
    <td width="50%"><img src="docs/images/en/journal-harvest.png" alt="Harvest log and yield per crop"></td>
    <td width="50%"><img src="docs/images/en/journal-water.png" alt="Water use and watering history per bed"></td>
  </tr>
  <tr>
    <td><img src="docs/images/en/journal-seeds.png" alt="Seed box"></td>
    <td><img src="docs/images/en/journal-report.png" alt="Season report"></td>
  </tr>
</table>

### Cooking – from what is ready to pick

Hortulus looks at the crops inside their harvest window (plus what you add from the
cellar, such as stored pumpkins or frozen beans) and proposes **dishes and complete menus**:
soups, oven trays, stir‑fries, pasta, risotto, salads, gratins, curries, frittata, stoemp,
stuffed vegetables, pesto, crumbles, ratatouille, tians, shakshuka, waterzooi, fritters,
clafoutis, vegetable cakes and more – more than sixty kinds of dish – and a chapter on
**preserving the surplus** (quick pickles, chutney, passata, jam, freezing, sauerkraut).
Safe by design: salad crops stay raw, beans and elderberries are never offered raw.

* Tell it what is in the **fridge** (each item is worked into the dishes where it fits),
  what is **always in the house**, a **side** (pasta, rice, bulgur, couscous, pearl couscous,
  gnocchi, potatoes, fries …) and a kind of **meat, fish or vegetarian protein** (or none).
* Every dish gets a **picture of the crops on the plate**, quantities per person, and
  what comes from the garden, what is at home and what to buy.
* **Edit any recipe**: change ingredients and steps, keep your version in **My cookbook**
  with favourites, notes and when you cooked it.
* **One shopping list** for the week: print it, save it as PDF, send it to your phone or to
  a Home Assistant to‑do list. Recipes and the whole cookbook export as PDF.

<table>
  <tr>
    <td width="50%"><img src="docs/images/en/cooking.png" alt="Cooking: ready in the garden, menus and dishes"></td>
    <td width="50%"><img src="docs/images/en/cooking-dish.png" alt="A recipe with its picture, ingredients and method"></td>
  </tr>
  <tr>
    <td><img src="docs/images/en/cooking-menus.png" alt="Complete menus from the garden"></td>
    <td><img src="docs/images/en/cooking-shopping.png" alt="Shopping list: what to buy and what the garden gives"></td>
  </tr>
</table>

### Knowledge

<table>
  <tr>
    <td width="50%"><img src="docs/images/en/library-plant.png" alt="Plant card with calendar, spacing, companions and care"></td>
    <td width="50%"><img src="docs/images/en/advice-answer.png" alt="Ask Hortulus: what should I do now with tomato?"></td>
  </tr>
  <tr>
    <td><img src="docs/images/en/handbook.png" alt="Handbook: 23 chapters"></td>
    <td><img src="docs/images/en/library.png" alt="Plant library"></td>
  </tr>
</table>

* **Plant database** – **232 crops**: 100 vegetables, 75 herbs, 36 fruits and 21 flowers
  and green manures, with Kc per growth stage, N‑P‑K demand, yearly care rules,
  pollination, eco tips and an icon – fully editable, add your own.
* **Advice & Q&A** – ask in a sentence of dropdowns (*"I have a problem with [tomato]:
  [spots, mould or rot]"*) and get the live status, likely causes, what to do now, **eco
  and home remedies** and prevention. Plus suggestions for placement, pollination partners,
  pollinator flowers, bad neighbours, harvest gaps, empty beds and ecology, with one‑click
  apply.
* **Handbook** – 23 chapters on soil, sowing, watering, feeding, rotation, companions, the
  greenhouse, pests, diseases, the garden year, fruit, tools and materials, home remedies,
  year‑round harvest and choosing sensors, with ⓘ tooltips everywhere. A **shopping list**
  works out seed, plants, compost, fleece, mesh and nets from your plan.

## Water, feeding and health

* FAO‑56 **Penman‑Monteith ET₀** (Hargreaves fallback), Kc per growth stage, a root‑zone
  **water balance** per bed that books each past day with its logged humidity, wind and
  sunshine, an NPK/EC **nutrient balance index**, **disease risk** (Hutton criteria –
  forecast and the days behind us – leaf wetness, greenhouse humidity) and degree‑day
  phenology with dynamic harvest dates that follow the weather that actually happened
  (greenhouses count their own air sensor; heat, cold and dull days delay crops).
* **Safe hardware control** – valves and a pump with **pump interlock, maximum runtime,
  frost lockout and rain skip**; a valve that stops reporting ends the run and stops the
  pump; leak and flow monitoring from the water meter; greenhouse vents and shade screens
  in auto mode; everything also as advice only.
* **Manage → Analysis** checks the plan (overlaps, conflicts, rotation, gaps), explains
  *why a plant does not fit*, compares two plans and offers one‑click fixes.

<table>
  <tr>
    <td width="50%"><img src="docs/images/en/analysis.png" alt="Garden check: problems with one-click fixes"></td>
    <td width="50%"><img src="docs/images/en/settings.png" alt="Settings: climate, weather, zones, sensors, irrigation"></td>
  </tr>
</table>

## Print, paper and reMarkable

The **Print** tab previews every page before you download it: garden and greenhouse maps
with legend, scale and north arrow, bed sheets with a grid, checklists, season charts, the
year plan, blank planning sheets, plant cards and a complete **season book** – as PDF in
A4, A3, A5, Letter or for the **reMarkable Paper Pro** (179.6 × 239.5 mm, e‑ink patterns
with a hatch per plant family and dot‑grid note areas to draw on). Automations can produce
the same PDFs with `garden_manager.export_pdf` (saved to `/config/hortulus/exports/`).

<table>
  <tr>
    <td width="25%"><img src="docs/images/en/print.png" alt="Print tab with live preview"></td>
    <td width="25%"><img src="docs/images/pdf-remarkable-garden.png" alt="Garden map, reMarkable e-ink"></td>
    <td width="25%"><img src="docs/images/pdf-remarkable-bed.png" alt="Bed sheet with grid"></td>
    <td width="25%"><img src="docs/images/pdf-a4-season.png" alt="Season chart, A4 colour"></td>
  </tr>
</table>

## On every screen

The panel follows your phone, tablet or desktop, in light or dark, with four colour themes
(Classic, Earth, Night and one that follows the season).

<table>
  <tr>
    <td width="20%"><img src="docs/images/en/mobile-dashboard.png" alt="Today on a phone"></td>
    <td width="20%"><img src="docs/images/en/mobile-planner.png" alt="Planner on a phone"></td>
    <td width="20%"><img src="docs/images/en/mobile-cooking.png" alt="Cooking on a phone"></td>
    <td width="40%"><img src="docs/images/en/dashboard-dark.png" alt="Dark mode"></td>
  </tr>
</table>

## Part of Home Assistant

* **Entities** – sensors, binary sensors, numbers, selects, switches, buttons, a calendar
  and a to‑do list, with diagnostics and translations in English, Dutch and French –
  including climate sensors (rain, mean temperature and sunshine of the last 7 days, frost
  nights this season, each with last year's value).
* **Services** with responses and **bus events** for your automations; push, TTS and
  persistent **notifications**, with action buttons on your phone (done, postpone).
* **Household** – assign tasks to people with automatic rules and personal reminders, and
  tick tasks off from any dashboard with the **`hortulus-tasks-card`**.
* **Voice** – ask Assist *"what do I need to do in the garden today?"* (English, Dutch and
  French sentences).
* **Several gardens** – one Hortulus entry per garden, each with its own plan, tasks and
  records.
* **Blueprints** – frost warning on a lamp, a button or NFC tag that logs a harvest,
  watering a dry bed at a good moment, spoken announcements of urgent jobs.

### Hortulus Web – the same garden on a website (optional)

A separate website edition runs the same engine and the same panel in the browser, with
accounts, several gardens per account, and a public front page. You can **show your garden**
to others – with a link or publicly – and choose per part what visitors see (plan, calendar,
weather, journal, harvest, recipes); visitors never see Home Assistant details. It is
delivered separately from this integration, and the plan files can be exchanged between the
two. The website keeps a climate history too: it fills it from Open‑Meteo for every garden
and, for a garden linked to Home Assistant, from that Home Assistant's recorder through the
garden's token. See [Configuration → Hortulus Web](docs/en/CONFIGURATION.md#10-hortulus-web-optional-website).

<table>
  <tr>
    <td width="33%"><img src="docs/images/en/web-home.png" alt="Website: front page with public gardens"></td>
    <td width="33%"><img src="docs/images/en/web-share.png" alt="Website: share your garden, choose what visitors see"></td>
    <td width="33%"><img src="docs/images/en/web-app.png" alt="Website: the Hortulus panel in the browser"></td>
  </tr>
</table>

## Installation

### HACS (recommended)

1. HACS → ⋮ → **Custom repositories** → add `https://github.com/emeryf81/hortulus` as *Integration*.
2. Install **Hortulus Garden Manager** and restart Home Assistant.
3. **Settings → Devices & services → Add integration → Hortulus**.

### Manual

Copy `custom_components/garden_manager` into `<config>/custom_components/` and restart.
The panel bundle (`frontend/hortulus-panel.js`) is committed, so no Node.js build is needed.

Requirements: Home Assistant **2025.10 or newer**. A weather entity with an hourly and/or
daily forecast (for example the built‑in Met.no `weather.home`) is recommended but optional.

## Quick start

The setup wizard asks for:

1. **Climate profile** – a regional preset (e.g. *Netherlands / Flanders*), a USDA hardiness
   zone, or your own average frost dates; plus the hemisphere.
2. **Weather** – e.g. `weather.home`, optionally an outdoor temperature and rain sensor.
3. **Beds, greenhouses and containers** – name, size, soil, shade, wind, and the sensors
   that belong to them (`sensor.soil_moisture_bed_1`, `sensor.soil_temp_bed_1`,
   `sensor.greenhouse_temp`, …) plus an optional irrigation valve.
4. **Notifications** – persistent notifications, mobile push, TTS and a daily digest time.
5. **Summary** – optionally seed a small companion‑friendly example plan.

Then open **Hortulus** in the sidebar. Details: [CONFIGURATION](docs/en/CONFIGURATION.md).

## What you get in Home Assistant

| Concept in the brief | Entity / action in Home Assistant |
|---|---|
| `garden.bed_moisture_status` | `sensor.<bed>_moisture_status` (dry / slightly_dry / optimal / wet) |
| `garden.frost_risk_next_48h` | `sensor.hortulus_frost_risk_next_48h` + `binary_sensor.hortulus_frost_warning` |
| `garden.irrigation_recommendation` | `sensor.<bed>_irrigation_recommendation` (mm; litres & minutes as attributes) + `binary_sensor.<bed>_needs_water` |
| `garden.growing_degree_days` | `sensor.hortulus_growing_degree_days` |
| greenhouse advice | `sensor.<zone>_greenhouse_advice`, `binary_sensor.<zone>_heat_stress`, `select.<zone>_shading` |
| evaporation & degree days | `sensor.hortulus_reference_evapotranspiration_today`, `sensor.hortulus_degree_days_today`, `sensor.<zone>_degree_days_this_season` |
| soil water & nutrients | `sensor.<bed>_soil_water_deficit`, `sensor.<bed>_nutrient_balance` |
| disease & frost per zone | `sensor.<zone>_disease_risk`, `binary_sensor.<zone>_frost_risk_48h` |
| irrigation control | `switch.hortulus_automatic_irrigation`, `select.hortulus_irrigation_mode`, `number.hortulus_irrigation_max_runtime` (+ frost lockout, rain skip), `button.hortulus_water_now`, `binary_sensor.hortulus_irrigation_frost_lockout`, `binary_sensor.hortulus_irrigation_running` |
| tasks | `calendar.hortulus_garden_tasks`, `todo.hortulus_this_week`, `sensor.hortulus_tasks_due_today`, `sensor.hortulus_next_task` |
| climate history | `sensor.hortulus_rain_7_days`, `sensor.hortulus_mean_temperature_7_days`, `sensor.hortulus_sunshine_7_days`, `sensor.hortulus_frost_nights_this_season` (last year's value as attribute) |
| records | `sensor.hortulus_harvest_this_season`, `sensor.hortulus_garden_water_7_days`, `sensor.hortulus_rain_water_available`, `garden_manager.log_harvest`, `.add_journal_entry`, `.save_soil_test`, `.assign_task` |
| dashboard & voice | `type: custom:hortulus-tasks-card` (loaded automatically), Assist intents via `garden_manager.install_voice_sentences` |
| `garden.add_task` … | `garden_manager.add_task`, `.complete_task`, `.postpone_task`, `.delete_task`, `.generate_tasks`, `.recalculate_plan`, `.export_plan`, `.import_plan` |
| plan & hardware | `garden_manager.add_planting`, `.update_planting`, `.remove_planting`, `.autofill_plan`, `.run_irrigation_plan` (with `dry_run`), `.stop_irrigation`, `.set_shading_mode`, `.export_pdf` |

> Home Assistant requires services to live in the integration's own domain, so the
> `garden.*` names from the specification are exposed as `garden_manager.*`.

Full reference: [ENTITY_REFERENCE](docs/en/ENTITY_REFERENCE.md) · Example
[automations](examples/automations.yaml) and [dashboard](examples/dashboard.yaml).

## Blueprints

Ready-made automations - click to import them into Home Assistant:

- [**Frost warning on a lamp**](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Femeryf81%2Fhortulus%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhortulus%2Ffrost_flash_light.yaml): a lamp flashes blue (and your phone gets a message) when frost is coming.
- [**Log a harvest with a button**](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Femeryf81%2Fhortulus%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhortulus%2Fbutton_log_harvest.yaml): a button or NFC tag logs a fixed amount of one crop.
- [**Water a dry bed at a good moment**](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Femeryf81%2Fhortulus%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhortulus%2Fwater_when_dry.yaml): runs the irrigation plan for a thirsty bed at the hour you choose, never in frost lockout.
- [**Announce urgent garden jobs**](https://my.home-assistant.io/redirect/blueprint_import/?blueprint_url=https%3A%2F%2Fgithub.com%2Femeryf81%2Fhortulus%2Fblob%2Fmain%2Fblueprints%2Fautomation%2Fhortulus%2Furgent_task_announce.yaml): urgent jobs (frost cover, shading, a pest flight) are spoken on a speaker.

## How the horticultural logic works (short)

* **Windows** are stored as weeks relative to the *average last spring frost* /
  *first autumn frost*, so one database serves both hemispheres and every climate.
  Greenhouses shift spring windows earlier by a per‑crop number of weeks.
* **Live refinements:** direct sowing waits for warm enough soil (soil sensor: the lower of
  the reading now and the mean of the last days, so one warm afternoon does not count),
  planting out of tender crops waits for a frost‑free forecast.
* **Companions:** interaction strength decays with distance; enemies weigh double;
  plantings that never share time in the ground (succession!) never conflict.
* **Rotation:** history per bed and family; the same family back too soon is flagged.
* **Watering:** moisture bands per crop water need and soil type; refill deficit + ET₀ × Kc
  minus probability‑weighted rain; greenhouses get no rain credit. ET₀ is FAO‑56
  Penman‑Monteith from temperature, humidity, wind and cloud cover (Hargreaves when those
  are missing), Kc follows the growth stage. Beds without a moisture sensor keep a daily
  **root‑zone bucket** (available water by soil type × rooting depth) and are watered when
  half of it is used; each past day is booked with the rain and the Penman‑Monteith ET₀ of
  the *logged* day (humidity, wind, sunshine or radiation), so windy, sunny days dry beds
  faster.
* **Feeding:** compost per m² by the hungriest following crop (5 / 3 / 1.5 kg, legumes
  0.5), liquid‑feed doses in feed tasks, and a 0–100 nutrient balance index from NPK or EC
  probes against the crops' N‑P‑K demand.
* **Disease:** two humid warm days in a row (Hutton criteria) – forecast, or already logged
  in the climate history – means high late‑blight risk; several wet days behind us, long
  leaf‑wet spells, a wet‑leaf sensor or humid greenhouse air raise the level and
  create inspection tasks for susceptible crops.
* **Phenology:** degree days since planting move the expected harvest (± 3 weeks around
  the calendar date); greenhouse crops count their own air sensor (or the outdoor day with
  greenhouse buffering). Heat days (logged last month and forecast) and a run of dull days
  delay fruiting crops; crops without a degree‑day model are held back by logged cold days
  below their minimum. The crop popup shows the delay and why.
* **Climate history:** own samples first, then the recorder (same sensors, while Hortulus
  was not running), then Open‑Meteo's observed weather for what was not measured well. Days
  stay in the daily log for two seasons (outdoor) or 400 days (sensors); their months are
  kept for good. Measured last and first frost per year are compared with the preset.
* **Irrigation safety:** one valve at a time, pump only while a valve is open, max runtime,
  no outdoor watering with frost forecast within 12 h or with enough rain coming; valves
  and pump are always switched off at the end, also after errors.
* **Frost:** hourly forecast, plant‑level adjustment for clear calm nights, greenhouse
  buffering, heated‑zone floor; falls back to daily forecast, then to the live sensor.
* **Cooking:** a recipe is a *technique* (soup, tray, tian …) filled with the crops that
  are in season, the side, the protein and the fridge items; texts are written per language,
  and the same engine builds menus, the shopping list and the PDFs.

The [architecture blueprint](docs/BLUEPRINT.md) documents every model and algorithm.

## Development

```bash
# Python (integration + engine)
pip install -r requirements_test.txt
pytest -q && ruff check custom_components tests

# Frontend (Lit + TypeScript)
cd frontend && npm ci
npm run typecheck && npm test && npm run build   # writes custom_components/garden_manager/frontend/hortulus-panel.js
```

The panel also runs without Home Assistant in a dev harness
(`frontend/dev`, see its README); the screenshots in this README are made with
`node frontend/dev/screenshots.mjs`. Repository layout and design rationale are described
in the [blueprint](docs/BLUEPRINT.md); the visual language in the
[design system](docs/DESIGN_SYSTEM.md).

## License

MIT © 2026 Emery Frijters. Plant data compiled from common horticultural practice;
always check seed packets and local advice.
