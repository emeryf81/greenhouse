# Changelog

## Unreleased

### Added
- **Why (not) here?** in the planner popup: per crop, why its bed does or does not suit it
  and which beds would; right after dropping a crop where it does not belong a warning
  says why.
- **Links between planner and crops list**: *Show on map* from the crops list (and from
  the analysis) opens the planner with that crop selected; *In Crops* from the planner
  highlights its row.
- **Crops list: several at once** – tick crops and set a status or a date for all of them
  (one system-log entry). Websocket `plantings/update_many`.
- **One popup everywhere** (`hl-modal`): same header, close button, backdrop click and
  Escape; previous/next with the arrow keys in the plant library and crops list. A plant's
  details open from the dashboard, calendar, advice, journal, planner and crops list, and
  show where it grows in your garden.
- **Compare plans** (*Analysis → Compare*, and *Garden plan → Plans → Compare*): zones,
  beds, elements and crops added, removed or changed between two plans. Websocket
  `plan/compare`.
- **Crop rotation strip** per bed in the planner: plant families of the last five years.
- **End of season banner** in the planner: what can still be sown or planted, with a
  jump to next year's plan. Websocket `analysis/still_possible`.
- **Analysis badge** on the tab with the number of problems, re-checked on every change
  (snapshot `diagnosis`); **one-click repairs** (copy a missing plan, put crops back on
  the plan or into their bed, move a bed into its zone, carry a forgotten perennial),
  logged and undoable – websocket `analysis/fix`; **export the diagnosis** as one JSON
  file to attach to a bug report.
- **Click-through UI test** in CI (Playwright, `npm run test:ui`).
- **Start over with a new plan** (*Garden plan → Plans*): from scratch, with the same zones
  but empty, or with zones and beds but no crops. The current plan becomes **inactive** and is
  kept with its beds and crops; activate it again later (swapping places with the active one)
  or delete it. Websocket `plan/new`, `plan/activate`, `plan/delete`.
- **Analysis** tab: *Check* explains inconsistencies (a year with crops but no plan, crops
  whose bed is not on their season's plan, beds outside their zone, overlapping or late crops,
  a missed year-end transition …) with a link to the right place; *Why not?* shows per bed why
  a plant does or does not fit; *Errors* lists every refused action with its reason (refused
  actions are now written to the system log); *System log* is the journal's log. Websocket
  `analysis`, `analysis/explain`.
- **Crops** tab: every crop of a season on one list, with method, status, count, notes and
  planned/actual dates editable in place – nothing to drag. Websocket `plantings/season`,
  `planting/update`.
- Plant icons on dashboard tasks and crop avatars, calendar tasks, the planner's details
  popup, the crops list and the analysis.
- **Garden plan per year** (new tab *Garden plan*): shape the garden without plants – zones
  (open ground, greenhouse, cold frame, planters & pots, orchard …), beds and elements
  (driveway, house, water butt, hedge, lawn, shed, paths – also inside the greenhouse). The
  plan is saved for one season; the *Planner* now only plants, on that season's plan (zones,
  beds and elements are locked there). A season without a plan offers to copy another year's
  or start empty.
- **Year-end transition** (button in Garden plan and Planner, and an advice card once the new
  year has started): **nothing carries into a new year by itself** – not the plan, not
  perennials. Choose which zones and elements go along (or keep the plan already designed for
  next year), which perennials and which overwintering crops (garlic, winter leeks …) move
  over, and whether the new year becomes the active garden right away. The old year's plan is
  archived; everything is in the system log and can be undone. Websocket `year/preview`,
  `year/apply`, `layout/delete`; `plan/save` takes a `season`.
- **System log** (Journal tab → *System log*): every change to the garden – from the panel,
  actions/automations, and what Hortulus adjusts itself (generated tasks, clean-up) – with
  time, who and what. **Every entry can be undone**; an item that was changed again since is
  only overwritten after confirmation, and an undo that would leave a planting without its
  bed is refused. The undo is logged too, so it can be reverted (redo). Kept in its own store
  (`garden_manager.garden.syslog`, last 500 entries); websocket `syslog/list`, `syslog/undo`.

- **Lay out the whole garden**: paths in **stone**, **wood**, **stepping stones** and **bark**
  (the old path is now *gravel path*), **decking**, **wall**, **carport / garage**, **shrub**,
  **swimming pool** and **seating area**, next to house, terrace, lawn, hedge … Elements are
  grouped (buildings & paving, paths, green, outdoor living) and **all** of them can now be
  drawn from a zone's own map too, not only six.
- Zone types **Ornamental garden** and **Planters & pots**; a **Planter / pot** tool draws a
  container bed (potting mix) you can plant like any bed.
- Planner toolbar button **Site & elements** jumps back to drawing the site from any step
  (the planner opens on *Plant* once there are crops, which hid the drawing tools).

- **Pictures everywhere**: every plant in the library has a picture (card and detail), as do
  advice suggestions and answers, and every handbook chapter has an illustrated garden scene
  (overview tiles and chapter header). Pictures are illustrations built from the plant
  stickers, so they work offline; on top of that the browser shows a **photo from
  Wikipedia**, looked up by scientific name (Settings → *Display*, per browser, on by default;
  cached for 30 days). Only photos under a licence Hortulus can honour (CC BY, CC BY-SA, CC0,
  public domain) are shown, credited with creator and licence and linked to the file page;
  small round thumbnails always use the illustration.

### Changed
- Dates read day-month-year in the panel's language (13-04-2026) whatever the browser's
  locale; the calendar button still opens the browser's date picker.
- The pump (and bed valve) picker also lists `valve.*` and `input_boolean.*` entities, e.g.
  a smart garden tap.
- **Plants**: a plant's details open in a popup instead of a side panel; good and bad
  neighbours show their icon and open that plant when clicked.
- **Planner**: larger map at a fixed height; clicking a bed, crop or element opens its details
  in a popup instead of a side column.
- **Autofill** says per plant why it was not placed (too late, zone type, glass, frost,
  rotation, bad neighbour, no room) and offers to fill the next season; it uses the plan of
  the season it fills (or the latest earlier plan, copied on apply).
- **Perennials no longer stay in the plan automatically**: a planting belongs to its own season
  and to the seasons it was moved into at a year-end transition (`last_season`). On upgrade,
  perennials growing now are kept for the current season once. Storage version 1.6.
- Printouts use the garden plan of the chosen season.

### Fixed
- Autofill could hardly assign anything for another season: it proposed on today's beds, and
  applying refused beds of next year's plan as "unknown bed".
- Beds in orchards, herb, flower and the new garden zones now use the outdoor sensors (only
  greenhouses and cold frames have their own climate).
- **Companion check showed crops that are not in the plan you look at.** The planner also
  checks the previous and next season (for overwintering crops), but a crop added to this
  season after its sowing window was moved forward to "today" and so ran into next season,
  clashing with next season's plan – e.g. a chili added in October produced "Tomato and Chili
  pepper overlap", shading and "good neighbours" messages about a tomato and basil of next
  year's example plan. Crops of different seasons are now compared on their *planned* dates,
  and a finding that does involve another season names it ("Tomato (season 2027)").

## 1.3.0 – 2026-10

### Added
- **Journal tab**: garden diary with photos per bed, crop or the whole garden; harvest log in
  kg and pieces (also when ticking off a harvest task and from the planner) with totals per
  crop and **learned yields** (your own kg/m², used by Autofill); **seed box** with use-by
  years per family and the crops in the plan that still need seed (the shopping list skips
  seed you have); **water** use per day/week from a garden water meter and the rain butt level.
- **Year view** in the calendar (crop × month: sow indoors, sow, plant out, growing,
  harvest, plus tasks and hours per month) and a **year plan** printout (`document: year`).
- **Lovelace card** `custom:hortulus-tasks-card`: today's and overdue tasks with a tick box,
  loaded automatically on every dashboard.
- **Household**: assign tasks to people (`person.*`), automatic assignment by default and per
  task type, personal notify service per person for the digest and overdue reminders.
- **Soil analysis per bed** (pH, organic matter, P, K, Mg, lime): fertiliser plan, lime advice
  and shopping list follow the latest analysis.
- **Voice**: six Assist intents (tasks today, overdue, harvest, greenhouse, water, frost) with
  English and Dutch sentences, installed with one click.
- **Rain water first**: watering tasks say how many litres are still in the butts.
- Sensors *Harvest this season*, *Garden water (7 days)*, *Rain water available*.
- Actions `log_harvest`, `add_journal_entry`, `assign_task`, `save_soil_test`,
  `install_voice_sentences`; websocket `records/*`.

### Changed
- PDF exports are private: written to `/config/hortulus/exports/` and served through an
  authenticated view with a signed link valid for 7 days.

### Known limitations
- One garden per Home Assistant: the panel shows the first config entry. Use zones for a
  second plot.

## 1.2.0 – 2026-10

### Added
- **Garden plan in three steps**: draw zones and elements by dragging on the 10 cm grid,
  arrange every zone on its own map (double‑click a zone), then plant by hand or with
  Autofill. New zone types orchard, soft fruit, herb and flower garden; new elements house,
  driveway, street, parking, terrace, lawn, flower bed, fence, pond, play area, beehive.
- **Plant icons**: 45 vector icons coloured per crop instead of dots; dense crops are drawn
  as rows of seedlings with one large icon and a name label; legend for badges.
- **Perennials across seasons**: trees, bushes and perennial herbs carry over every year
  (`removed_season` for explicit removal) with season‑keyed yearly care; harvest tasks only
  once a tree bears (`years_to_bearing`).
- **Plant database 232 crops**: 92 new plants – fruit trees, soft, cane and vine fruit, more
  vegetables, herbs, flowers and green manures – plus icon, colour, emoji, pollination,
  harvest windows and eco tips for every plant.
- **Advice tab**: Q&A sentence builder (subject › target › question/problem) with live status,
  causes, actions, home remedies and prevention; garden suggestions (pollination partners,
  pollinator flowers, bad neighbours, shading, harvest gaps, empty beds, ecology) with
  one‑click apply; harvest per month; seasonal shopping list; tools per job.
- **Tasks**: 21 new yearly maintenance rules (greenhouse windows, biocontrol, nettle and
  comfrey feed, gutters, nest boxes, seed saving, orchard care …), weather episodes (heat,
  dry spell, storm, heavy rain), weather‑aware rescheduling, tools in the task dialog,
  new task types (protect, clean, tie in, thin fruit, pollinate, check, make feed).
- **Reminders**: evening reminder of overdue tasks with a verdict (still possible / too late /
  do now) and a weekly look‑ahead; times configurable in Settings.
- **Autofill preferences**: freedom of choice, respect neighbours, add pollinators, aim for
  year‑round harvests, perennials allowed, respect the zone type.
- **Handbook**: chapters on fruit, tools & materials, home remedies, year‑round harvest and
  choosing sensors; new glossary terms.
- **Websocket API**: `advice`, `qa/options`, `qa/ask`, `supplies`.

## 1.1.0 – 2026-10

### Added
- **Print module**: garden map, greenhouse/zone map, bed sheets, checklist, season chart,
  blank planning sheet and plant cards as PDF (dependency‑free writer) with live SVG
  preview. Paper A4, A3, A5, Letter and **reMarkable Paper Pro** (toolbar margin,
  portrait/landscape); colour, e‑ink and grayscale modes with hatch patterns per plant
  family, legend, scale bar, north arrow and dot‑grid notes areas.
  Service `export_pdf`, authenticated download at `/api/garden_manager/print`.
- **Handbook**: 16 chapters in English and Dutch, search, glossary, and ⓘ tooltips
  throughout the panel.
- **Autofill**: season proposal from beds, household, time, water and compost
  (service `autofill_plan`, planner dialog).
- **Seasonal calendar**: soil preparation with compost amounts, greenhouse spring and
  autumn clean, shading on/off, winter insulation, winter rest and covers, green manure,
  compost, mulch, soil test, tool care, perennial care (cut back, divide, protect).
- **Plant database**: 140 crops (69 vegetables, 60 herbs, fruit, companion flowers) with
  Kc per stage, N‑P‑K demand, height, root depth, yield and plants per person
  (generated by `scripts/build_plantdb.py`).
- **Agronomy**: FAO‑56 Penman‑Monteith ET₀ with Hargreaves fallback, stage Kc, daily
  root‑zone water balance, phenology with degree‑day harvest estimates, disease risk
  (Hutton, leaf wetness, greenhouse humidity), nutrient balance index from NPK/EC probes,
  feed doses in tasks.
- **Companion factors**: pest deterrence and trap crops, allelopathy, nutrient
  competition, hemisphere‑aware shading; better‑neighbour suggestions and alternative
  beds for rotation conflicts; family‑level relations.
- **Hardware**: irrigation controller (pump interlock, max runtime, frost lockout, rain
  skip, guaranteed shut‑off, run log), greenhouse vent and shade control with a shading
  mode per zone, optional Open‑Meteo enrichment.
- **Entities**: ET₀ and degree days today, nutrient balance and water deficit per bed,
  disease risk, degree days and frost risk per zone, irrigation lockout/running, irrigation
  mode select, shading select, automatic‑irrigation switch, irrigation limits as numbers,
  water now / stop buttons.
- **Services**: `add_planting`, `update_planting`, `remove_planting`,
  `run_irrigation_plan`, `stop_irrigation`, `set_shading_mode`, `autofill_plan`,
  `export_pdf`. Event `garden_manager_irrigation_run`.
- **Panel**: Handbook and Print tabs, season timeline, multi‑select with align and
  distribute, paths and garden elements, layers, habit‑shaped plant symbols, phenology in
  the inspector, swipe actions on tasks, live sensor context in the task dialog,
  water & climate card, extended settings.

### Changed
- Storage schema 1.5 (garden elements, water balance, irrigation log, irrigation and
  resource settings); migrated automatically.

## 1.0.0 – 2026-10

First release: planner, plant database, task engine, frost/greenhouse/irrigation advice,
calendar, to‑do list, notifications, EN/NL.
