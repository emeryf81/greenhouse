# FAQ & troubleshooting

## General

**Do I need sensors?**
No. Without sensors Hortulus still plans, schedules and reminds. Soil sensors add
moisture status and precise irrigation; soil temperature makes direct‑sowing advice
wait for warm soil; a greenhouse thermometer enables live ventilation advice.

**Do I need a weather forecast?**
Recommended. Without it frost risk becomes `unknown` (or *low/moderate* from the
current outdoor temperature when it is already cold), irrigation falls back to sensor
only, and transplant timing cannot wait for frost‑free nights.

**Why `garden_manager.*` and not `garden.*`?**
Home Assistant requires actions to use the integration's domain. The integration's
folder and domain is `garden_manager`; the product is called Hortulus.

**Is anything sent to the internet?**
Not by default. The plant database and the handbook ship with the integration; photos go
through Home Assistant's own `image_upload` and stay in your config directory. Only if
you switch on **Open‑Meteo** (Settings → Weather) does Hortulus fetch a forecast from
api.open‑meteo.com, sending the garden's coordinates rounded to two decimals (~1 km).

**Southern hemisphere?**
Fully supported: pick a southern preset, a USDA zone with *southern* hemisphere, or your
own dates. Seasons run July → June and are named after the spring year.

## Planning

**Why is my sowing task “overdue”?**
Either the sowing window has started and you set an explicit date in the past, or the
task was created from a succession series with fixed dates. Complete it, postpone it, or
change the planned date in the planner inspector. Tasks that *depend* on an overdue
prerequisite (thinning after sowing) automatically move back until the prerequisite is
done.

**The sow task says “wait”.**
For direct sowing the soil sensor is colder than the plant's minimum germination
temperature (e.g. beans need 12 °C), or – for planting out – frost is forecast below the
plant's minimum temperature. The task moves to tomorrow and the reason is in the
description.

**Why don't I get harvest tasks for marigolds?**
Companion flowers are marked `harvestable: false`. Set it to true in a custom/override
plant if you grow them for cutting.

**Succession sowings were skipped.**
Sowings that would fall after the last sowing window are dropped on purpose; the planner
tells you how many.

**Two plantings overlap but no warning appears.**
They are not in the ground at the same time (e.g. radishes harvested before beans go
in). Overlap and companion checks only consider plantings whose occupancy windows
overlap. Use *Show garden on* to see what is in the bed on a given date.

**How is “companion radius” used?**
Two plantings interact when their footprints are within
`max(radius, (spacing_a + spacing_b) / 2)`; influence fades linearly with distance.

## Entities

**Entities for a new bed don't appear.**
They are added as soon as the plan is saved (watch the *Saved* indicator in the planner
toolbar). Reload the integration if you edited `.storage` by hand (don't).

**Entity ids are Dutch / English.**
Ids are generated in the HA system language at creation time. Rename them in
Settings → Entities; unique ids are stable.

**Frost sensor shows `unknown`.**
The weather entity is unavailable or provides no forecast. Check
Settings → Devices & services → Hortulus → *Download diagnostics* → `weather.error`.

## Print, handbook, autofill

**How do I get a plan onto my reMarkable Paper Pro?**
Print tab → paper *reMarkable Paper Pro*, colours *E‑ink* → *Download PDF*, then drag
the file into the reMarkable app (or use *Send to reMarkable* by email). The page is
exactly the size of the screen; the dot‑grid notes area and the light tints leave room
to draw. For a weekly checklist, automate `garden_manager.export_pdf` with
`document: tasks` and pick the file up from the signed link in the service response.

**Why do the beds have patterns on the printout?**
In e‑ink and grayscale mode every plant family also gets a hatch pattern, so the map
stays readable without colour and on a monochrome printer.

**Autofill put my tomatoes outside although I have a greenhouse.**
Tomatoes grew in that greenhouse bed last season, so the bed is excluded for nightshades
by the rotation rule. Add another greenhouse bed, or move them anyway – the planner will
show the rotation warning.

**Autofill skipped crops.**
Reasons are listed under *Not placed*: no suitable bed (rotation, frost season too short
outdoors, not suited under glass), no space, or the weekly time/water budget was used
up. Raise the budget, select more beds or tick *replace*.

**Why did the expected harvest date move?**
With a temperature sensor (or the weather entity) Hortulus logs daily minimum and
maximum temperatures and sums degree days since planting; a warm spell brings the
harvest forward, a cold one delays it (at most three weeks either way).

## Irrigation safety

**Can automatic watering flood my garden?**
Every valve has a maximum runtime, only one valve runs at a time, and the pump only runs
while a valve is open. When a run ends, fails or is stopped (button, service, Home
Assistant restart), all valves that were opened and the pump are switched off.

**Why didn't it water this morning?**
Look at `binary_sensor.hortulus_irrigation_frost_lockout` and run
`garden_manager.run_irrigation_plan` with `dry_run: true`: the response lists every
skipped bed with its reason (frost lockout, rain expected, no valve, no flow rate, not
needed, mode not *auto*).

## Troubleshooting

| Symptom | Check |
|---|---|
| Panel shows “Hortulus is not set up” | The integration isn't loaded; see *Settings → System → Logs* for `garden_manager`. |
| Panel is blank after an update | Hard refresh (the module URL is content‑hashed, but some proxies cache aggressively). |
| “Changed elsewhere – reloaded” | Someone (or an import/service) changed the plan while you edited; your last unsaved second of edits was discarded. |
| Irrigation duration missing | Set a flow rate (L/min) for the bed in Settings → Beds & sensors. |
| Sensor stale alert | The sensor has not reported for longer than *sensor stale minutes* (options → advanced). |
| Tasks in the wrong language | Options → Advanced → *Language of generated tasks*. |

Enable debug logging:

```yaml
logger:
  logs:
    custom_components.garden_manager: debug
```

Please attach the **diagnostics** download (it redacts notify services, speakers,
latitude and photos) when opening an issue.

## My apple tree is in the plan every year - how do I remove it?

Perennials (fruit trees, berries, asparagus, perennial herbs) move to a following season only when you include them in the **Year-end transition**. To remove one from the current season, select the plant in the planner and choose **Remove**. You get two options: **Gone from this season** (earlier years keep it for rotation and history) or **Delete completely**.

## Can I get reminders for tasks I forgot?

Yes. Under **Settings › Notifications › Reminders** set a time for the daily overdue reminder (for each task it says whether it is still possible, or too late and better skipped) and a **weekly look-ahead** on a day of your choice. They use the same channels as other notifications.

## Does the schedule take the weather into account?

Yes. With **Weather-aware scheduling** (on by default) sowing, planting out, hardening off, pruning, soil preparation and similar jobs move inside their window to the nearest suitable day (no rain, frost, heat or storm). If none exists the task gets a weather warning. Hortulus also creates tasks for heat, dry spells, storms and heavy rain, with ecological tips.

## Which sensors should I buy?

See the handbook chapter **Choosing and buying sensors**: start with a greenhouse thermometer and one soil moisture sensor in your main bed.

## Can I keep a harvest log and a garden diary?

Yes, in the **Journal** tab: a **diary** with photos per bed, crop or the whole garden; a **harvest log** in kg (also from the task dialog when you tick off a harvest, or from the planner); the **seed box** with use-by years per crop family and the crops in your plan that still need seed; and **water** use from a garden water meter and the rain butt level. After a season, Autofill uses your own kg/m² instead of the database average.

## Can several people share the work?

Yes. Every task can be assigned to a person (`person.*` entity). Under **Settings › Household & voice** choose who gets new tasks by default and per task type, and a notify service per person: everyone then gets their own daily digest and overdue reminders. The dashboard card can show only your tasks (`assignee: me`).

## Can I manage several gardens?

Yes. Add Hortulus again (Settings › Devices & services › Add integration) for an allotment or a second plot, and rename the entry (e.g. "Allotment"). Each garden has its own plan, tasks, journal and harvest. Pick the garden at the top of the panel; your browser remembers it. Services take `garden: Allotment` (title or id), the dashboard card `garden: Allotment`. Without one, everything goes to the first garden, which stays exactly as it was. For a few beds out front, extra zones in the same plan work too.

## How do I use voice commands?

Run **Settings › Household & voice › Install voice sentences** once (or the action `garden_manager.install_voice_sentences`). Then ask Assist, for example, “what do I need to do in the garden today?”, “what can I harvest?”, “how warm is it in the greenhouse?” or “is there frost tonight?”. See the [entity reference](ENTITY_REFERENCE.md#voice-assist).

## Is there a dashboard card?

Yes: `type: custom:hortulus-tasks-card` is loaded automatically. It shows today's and overdue tasks with a tick box; `days`, `assignee` and `max` are optional. See the [entity reference](ENTITY_REFERENCE.md#lovelace-card).

## Does Hortulus use my soil analysis?

Yes. Select a bed in the planner and add a **soil analysis** (pH, organic matter, P and K from a lab report or a home kit). The bed's fertiliser plan, lime advice and the shopping list follow the latest analysis: less phosphate when P is high, lime only when the pH is too low for the crops, more compost when organic matter is low.


## Can I see what changed, and undo it?

Yes. **Journal → System log** lists every change: what you or someone in your household did in the panel, what an automation or action changed, and what Hortulus did itself (creating or closing tasks, clean-up). Each entry shows when, who and what (e.g. *Removed – Crop: Tomato (Greenhouse bed, season 2027)*). **Undo** restores the state from before that action. If an item was changed again since, Hortulus asks before discarding that later change; an undo that would leave a crop without its bed is refused. The undo is logged as well, so it can be reverted too. The last 500 entries are kept.

## Where do the plant photos come from?

Every plant, suggestion and handbook chapter has an illustration drawn by Hortulus itself (works offline). On top of that your browser shows a photo from Wikipedia, looked up by scientific name, with a link to the source. Your browser fetches it directly from Wikipedia; Home Assistant itself makes no connection. To switch it off, use **Settings → Display** (per browser).

## How do the garden plan per year and the year-end transition work?

In **Garden plan** you shape the garden without plants: zones (open ground, greenhouse, cold frame, planters & pots, orchard …), beds and elements such as driveway, house, water butt, hedge, lawn, shed or a path in the greenhouse. That plan holds for one season. In the **Planner** you plant that season on its plan; zones and beds are fixed there.

Nothing moves into a new year by itself, perennials included. At the end of the year open the **Year-end transition** (button in Garden plan and Planner; in January Advice reminds you). Choose which zones and elements go along (or use the plan you already drew for next year), which perennials and overwintering crops (garlic, winter leeks …) move over, and whether the new year becomes your active garden right away. The old plan is archived; everything is in the system log and can be undone.

## Can I start over with a new garden plan?

Yes. In **Garden plan → Plans** choose **Start a new plan**: completely empty (from scratch), with the same zones but no beds or crops, or with zones and beds but no crops. The current plan becomes **inactive**: it is kept with its name, beds and crops, and **Activate** brings it back later (the plan active at that moment becomes inactive in turn). An inactive plan you no longer need can be deleted. Everything is in the system log.

## Autofill places almost nothing. Why?

Usually it is simply too late in the season: in October the sowing or planting window of nearly every crop has passed for this year. The Autofill dialog now says per plant why it was not placed (too late, wrong zone type, not under glass, frost before harvest, crop rotation, bad neighbour, no room left) and offers to fill the **next season** instead. If that season has no garden plan yet, Hortulus fills in on the latest plan and copies it when you apply.

For a single plant, **Analysis → Why not?** shows per bed whether it fits and, if not, why - with the same rules as dragging and autofill.

## Where do I find errors and unexpected things?

In the **Analysis** tab:

- **Check** compares garden plans, crops and seasons and reports what does not add up: a year with crops but no garden plan, crops whose bed is not on the plan (invisible in the planner), beds outside their zone, crops on top of each other or planned too late, a missed year-end transition …, with a button to the right place.
- **Why not?** explains why a plant does not fit somewhere.
- **Errors** lists every action Hortulus refused, with the reason.
- **System log** is the same log as **Journal → System log**.

## Can I change my crops' dates without dragging?

Yes, the **Crops** tab lists every crop of a season (by bed, by crop or by date). Change method, status, count, planned and actual sowing, planting-out, harvest and end dates and notes right there. Leave a planned date empty and Hortulus computes it (in grey below). Click a plant for all details.

## Why does a plant not fit where I put it?

Click the crop in the planner and choose **Why (not) here?**: you see each reason the bed does not suit it (too late, wrong zone type, not under glass, frost before harvest, crop rotation, bad neighbour, no room) and which beds would. Drop a plant on a bed where it does not belong and that explanation appears above the map right away. Click a bed to see which plant families grew there over the last five years.

## Can I change several crops at once?

Yes. Tick the crops in **Crops**; a bar appears to set the status and/or a date (e.g. *Sown on* = today) for all of them. That is one entry in the system log and can be undone in one go. 🗺 **Show on map** jumps to the crop in the planner; **In Crops** in the planner popup takes you back.

## Can Hortulus fix problems itself?

Several findings in **Analysis → Check** have a button: copy a missing garden plan, put crops that are off the plan or outside their bed back, move a bed into its zone, or carry a forgotten perennial into this year. Every fix is in the system log and can be undone. The number on the **Analysis** tab shows how many problems there are right now; it is recomputed after every change. **Export diagnosis** gives one file (check, errors, recent log) to attach when you report a problem.

## Can I compare two plans?

Yes, in **Analysis → Compare** or in **Garden plan → Plans** (*Compare* next to an inactive plan). You see which zones, beds, elements and crops were added, removed or changed.

## My pump is a smart tap (valve) - does that work?

Yes. In **Settings → Irrigation hardware** the pump and bed valve pickers also list `valve.*` and `input_boolean.*` entities. Hortulus opens and closes a `valve` with `valve.open_valve` / `valve.close_valve`, in the same safe order (valve open → pump on … pump off → valve closed).


## How do I test my valve or pump?

In **Settings → Irrigation hardware** every bed valve has **Test (5 s)**. Hortulus opens the valve for 5 seconds (with the pump, in the safe order; the pump is tested this way, never on its own), closes it again and tells you whether the valve reported open and closed. Save the settings first: only linked valves are tested. After every watering run Hortulus also checks the valve reports closed. A valve or the pump open far longer than any run can last (max runtime + 10 minutes) while Hortulus is not watering triggers a notification and a red banner on **Today** with **Close valve**.

Smart taps with their own timer (such as a *Watering Duration* setting) close by themselves after that time. Set it longer than Hortulus' max runtime, or the tap stops earlier than planned.

## Can I see whether watering helps?

Yes: **Journal → Water → Watering per bed** shows soil moisture (from Home Assistant's history), the water Hortulus gave and the rain (rain sensor) per bed over 7, 14 or 30 days. The same chart is in a bed's planner popup.

## What should I sow this week, and which seeds do I need?

**Crops** has four views next to the list: **Sowing plan** (week by week what to sow indoors or outdoors, plant out and start harvesting; **Done** fills in the real date), **Seeds** (seed the plan needs against your stock), **Succession** (beds that free up this season and what still fits there) and **Harvest forecast** (kg per week; it gets more accurate with your own harvests). On a phone the list shows one card per crop.

## Can I quickly add a note or photo to a crop?

Yes, in a crop's or bed's popup (planner or Crops) under **Note or photo**. On a phone *Photo* opens the camera. The note goes into the journal with that crop; the latest notes are shown below.

## Is there a season overview?

**Journal → Season report** (and the **year-end transition**) shows per crop what you planted and harvested against the expectation, what failed, problems from the journal and the water given. Download it as Markdown.


## Can I print my garden year as a book?

Yes: **Print → Season book** (or *Season book (PDF)* in the season report). You get a fully written book: cover, contents, introduction, one chapter per month with what was sown, planted and done, your journal with your own photos, the harvest, water and weather, then the year in numbers, a glossary, colophon and back cover. Choose A5 and print double-sided (flip on the long edge); the page count is always a multiple of four, so it folds into signatures for binding. Photos come from your journal (Home Assistant images), turned upright and scaled down.

## Can Hortulus report a leak or a stuck valve?

With a water meter (Settings › Water): when the meter counts water for 15 minutes while every Hortulus valve is closed, you get a notification and a red banner. During a run Hortulus reads the meter: the log shows the real litres and each bed learns its real flow. If a valve has its own safety timer (e.g. 60 min), enter it under **Settings › Beds › Valve timer**; longer runs are then split. A valve that shuts by itself ends the run and is reported.

## Can I act on a notification from my phone?

Yes, with the Home Assistant app: the morning digest and reminders carry **Done** (for one task), **Tomorrow** and – when beds need water – **Water now**. A valve left open carries **Close valve**.

## How do I record a harvest quickly?

**Today** has **Quick harvest**: tap a crop that is ready, add up the weight with the buttons and save. For an NFC tag or a button: the service `garden_manager.log_harvest` with `plant: Tomato` and `kg: 0.5` finds the crop in your garden (add `bed:` when the plant grows in several beds).

## Can missing seed go on my shopping list?

**Crops → Seeds** shows per crop how many seeds to buy. **Add … to the list** puts what is missing on a Home Assistant to-do list (e.g. the shopping list); items already on it are not added twice.


## Where do I find the weather and the rain radar?

In the **Weather** tab: the weather now, a chart of the next 24 hours (temperature and rain), the coming ten days with frost and heat tags, what it means for the garden (frost nights, hot days, rain so watering can wait, a dry spell) and a **rain radar**. If Home Assistant has a radar camera (e.g. the Buienradar integration), Hortulus shows it; otherwise Buienradar's public map for the Netherlands or Belgium. The forecast comes from the weather entity chosen under **Settings › Weather & outdoor sensors**.

## Where did Plants, Advice and Settings go?

The menu now has seven places: **Today**, **Garden** (Planner, Garden plan, Crops), **Calendar**, **Weather**, **Journal**, **Knowledge** (Plants, Advice, Handbook) and **Manage** (Analysis, Print, Settings). A place's tabs sit in a row above the page; a place reopens on the tab you used last.
