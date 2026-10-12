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
No. The plant database ships with the integration; photos go through Home Assistant's
own `image_upload` and stay in your config directory.

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
