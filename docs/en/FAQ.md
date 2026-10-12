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

Perennials (fruit trees, berries, asparagus, perennial herbs) carry over to every following season. Select the plant in the planner and choose **Remove**. You get two options: **Gone from this season** (earlier years keep it for rotation and history) or **Delete completely**.

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

Not yet. Hortulus works with one garden per Home Assistant: add zones for a second plot (an allotment, the front garden) in the same plan. A second config entry is possible, but the panel always shows the first one.

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
