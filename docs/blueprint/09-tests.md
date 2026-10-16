<!-- Generated from the sources by a script: code excerpts below are verbatim. -->
[← 8. Example HA Automations & Dashboards](08-example-ha-automations--dashboards.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [10. Documentation Files (README etc.) →](10-documentation-files-readme-etc.md)

## 9. Tests

```
pip install -r requirements_test.txt
pytest -q                          # 379 tests: pure engine + config flow + full HA setup + blueprints
ruff check custom_components tests scripts frontend/dev && ruff format --check custom_components tests

cd frontend
npm ci
npm run typecheck                  # tsc --noEmit
npm test                           # esbuild --test, then node --test on 11 spec files (≈ 40 tests)
npm run build                      # the committed bundles must equal the sources (CI diffs them)
npm run test:ui                    # Playwright click‑through of the real panel
```

**Strategy.** The engine is pure, so most tests are plain Python on dataclasses and fixtures with no Home
Assistant at all; every rule that changes gets a test. Four layers sit on top:

| Layer | Where | What it proves |
|---|---|---|
| Engine units | `tests/engine/test_*.py` (27 suites) | tasks and merge, frost/DST, compatibility and rotation, agronomy (ET₀ against FAO example 18, GDD), watering and water balance, climate history (`test_climate.py`: sampling, recorder and Open‑Meteo merges, roll‑up, frost dates, zone series, logged stress, disease and tasks), regions and hemispheres, migrations and plan import/export, perennials, seasons and year‑end transition, archive, system log, diagnosis, planning, records, kitchen, pests, eco, coverage, cooking, season book, printing and handbook, Q&A and advice, French parity, `test_extras.py` (the 1.9 extras: sayings, soil estimate, water forecast, silent sensors, summary, local frost, station CSV, solar waiting, card), and `test_review_findings.py` (regressions from whole‑repository reviews) |
| Home Assistant integration | `tests/test_init.py`, `test_config_flow.py`, `test_phase2.py` (with `pytest-homeassistant-custom-component`, pinned to the HA release used in CI) | setup, entities, services and their responses and permissions, websocket API, options flow, unload; irrigation with pump interlock, lockout, valve timers, lost/stuck valves, leaks and the valve test; phone notification buttons; voice; PDF view and signed exports; two gardens side by side; archive write failures; to‑do exports under the user's own rights |
| Boundary guards | `tests/test_init.py` | the website guard (2.2): `websocket_api.py`, `operations.py` and `storage.py` may import only the stubbed `homeassistant.*` modules; admin‑only services refuse a non‑admin user |
| Blueprints | `tests/test_blueprints.py` | every shipped automation blueprint is valid and produces a valid automation (two instances on different lamps keep separate state) |
| Frontend units | `frontend/test/*.test.ts` (node:test) | geometry, history (undo/redo), planner logic, coverage, dates, entity fitting, photos, themes, the tasks card, and **i18n parity**: EN/NL/FR catalogs have identical keys and placeholders |
| Click‑through | `frontend/test-ui/smoke.mjs` (Playwright, Chromium) | every tab renders without errors in Dutch and English; popups open and close; links between tabs work (plant popup, "why here?", crops bulk edit and "show on map", analysis badge, plan comparison) |

**Dev harness.** `frontend/dev/index.html` runs the real panel in a browser *without* Home Assistant, with a mock
`hass` whose websocket answers from `data-{en,nl}.json`; `frontend/dev/make_snapshot.py` produces those files by
running the **real Python engine** over a demo garden, so the UI test sees genuine engine output (CI regenerates
them in the `ui` job). Query parameters select the tab, language, dark mode and narrow layout.

**CI** (`.github/workflows/ci.yml`, on push to `main` and every pull request, read‑only token): `lint-and-test`
(Python 3.13: ruff check + format check + pytest), `frontend` (Node 22: typecheck, unit tests, build, committed
bundles up to date), `ui` (demo data from the engine, Playwright), `hassfest` and HACS validation. **Release** (`.github/workflows/release.yml`, on push to `main`): when the version in
`manifest.json` has no tag yet, it tags `vX.Y.Z` and creates a GitHub release with that version's `CHANGELOG.md` section and
`garden_manager.zip`.

Fixtures (`tests/fixtures/`): an hourly forecast with a clear, calm frost night **across
the 29 March 2026 DST switch**, a rainy late‑spring hourly forecast, a 7‑day daily
forecast, and sensor states (`sensor.soil_moisture_bed_1`, `sensor.soil_temp_bed_1`,
`sensor.greenhouse_temp`, an outdoor sensor in °F, `weather.home`).

### 9.1 Task generation from a planting plan

```python
def test_indoor_tomato_generates_full_lifecycle(garden, db, make_planting, ids):
    """Sow indoors -> plant out -> stake -> prune weekly -> feed -> harvest."""
    garden.plantings = [
        make_planting(
            "tomato", "gh_bed", 2026, method=SowMethod.INDOOR_SOW, layout=LayoutMode.ROW, width_cm=200, length_cm=50
        )
    ]
    now = datetime(2026, 2, 1, 9, 0, tzinfo=TZ)
    analysis, merge = run(garden, db, now, ids=ids)
    keys = {t.key.split(":", 2)[2] for t in merge.created if t.key and t.key.startswith("p:")}
    assert {"sow_indoor", "transplant", "care:0:stake", "care:1:prune", "care:2:feed", "harvest"} <= keys
    # Greenhouse: no hardening off (the plants never leave the glass).
    assert "harden_off" not in keys

    sow = by_key(merge.tasks, ":sow_indoor")
    plant_out = by_key(merge.tasks, ":transplant")
    # NL: last frost 20 April; tomato sown 8-6 weeks before, greenhouse +4 weeks earlier.
    assert sow.window_start == date(2026, 4, 20) - timedelta(weeks=8 + 4)
    # The window is already open on 1 Feb, so the task is due today.
    assert sow.due == max(sow.window_start, now.date())
    # transplant >= sow + 42 days (transplant age) and inside its window
    assert plant_out.due >= sow.due + timedelta(days=42)
    assert plant_out.window_start <= plant_out.due <= plant_out.window_end
    assert ":p1:sow_indoor" in plant_out.depends_on[-1] or "p:p1:sow_indoor" in plant_out.depends_on

    prune = by_key(merge.tasks, ":prune")
    assert prune.recurrence and prune.recurrence.interval_days == 7
    assert prune.due == plant_out.due + timedelta(days=14)

    harvest = by_key(merge.tasks, ":harvest")
    assert harvest.recurrence and harvest.recurrence.interval_days == 3  # continuous picking
    assert harvest.due == analysis.timelines["p1"].harvest_start
    # The 2 x 0.5 m row holds 4 plants at 50 cm.
    assert plant_out.estimated_minutes == 5 + round(4 * 1.5)


def test_postpone_cascades_to_dependants(garden, db, make_planting):
    garden.plantings = [make_planting("cabbage", "bed_1", method=SowMethod.INDOOR_SOW, width_cm=45, length_cm=45)]
    now = datetime(2026, 1, 15, 9, tzinfo=TZ)
    run(garden, db, now)
    sow = by_key(garden.tasks, ":sow_indoor")
    harden = by_key(garden.tasks, ":harden_off")
    plant_out = by_key(garden.tasks, ":transplant")
    before = (harden.due, plant_out.due)

    result = postpone_task(garden, sow.id, now=now, days=7, reason="seeds not delivered")
    assert sow.due - sow.original_due == timedelta(days=7)
    assert {t.id for t in result.shifted} >= {harden.id, plant_out.id}
    assert (harden.due, plant_out.due) == (before[0] + timedelta(days=7), before[1] + timedelta(days=7))
    assert sow.notes[-1].text == "seeds not delivered"

    # A user decision survives regeneration.
    run(garden, db, now)
    assert by_key(garden.tasks, ":sow_indoor").due == sow.original_due + timedelta(days=7)
```

### 9.2 Frost warning computation from forecast

```python
def test_hourly_frost_across_dst_switch():
    """Clear, calm night of 28->29 March 2026 (clocks jump 02:00 -> 03:00)."""
    snap = weather(hourly="forecast_hourly_dst_frost.json")
    now = datetime(2026, 3, 28, 12, 0, tzinfo=UTC)
    frost = assess_frost(snap, now, AMS)
    assert frost.source == "hourly"
    assert frost.min_temp_c == -2.0
    # radiative cooling on a clear calm night: 2 °C colder at plant height
    assert frost.plant_level_min_c == -4.0
    assert frost.level is RiskLevel.HIGH
    # minimum at 04:00 UTC == 06:00 CEST (summer time already active)
    local_min = frost.min_at.astimezone(AMS)
    assert (local_min.date().isoformat(), local_min.hour) == ("2026-03-29", 6)
    assert local_min.utcoffset().total_seconds() == 7200
    # Hours below zero are measured between instants, not by counting local
    # wall-clock hours, so the "missing" 02:00 hour cannot break it.
    assert frost.hours_below_zero > 0
    assert (
        frost.hours_below_zero
        == len(
            [
                p
                for p in snap.hourly
                if p.temperature is not None
                and now <= p.at
                and p.temperature - (2.0 if (p.at.astimezone(AMS).hour >= 18 or p.at.astimezone(AMS).hour < 9) else 0)
                <= 0
            ]
        )
        * 1.0
    )


def test_forecast_unavailable_uses_sensor_or_unknown():
    now = datetime(2026, 4, 25, 5, 0, tzinfo=UTC)
    unavailable = WeatherSnapshot(available=False)
    assert assess_frost(unavailable, now, AMS).level is RiskLevel.UNKNOWN
    cold_now = assess_frost(unavailable, now, AMS, current_temp=1.5)
    assert (cold_now.source, cold_now.level) == ("sensor", RiskLevel.MODERATE)
    mild_now = assess_frost(unavailable, now, AMS, current_temp=12)
    assert mild_now.level is RiskLevel.UNKNOWN  # can't claim "no frost" without a forecast
```

### 9.3 Companion conflict detection

```python
def test_enemies_close_together_are_flagged_with_explanation(garden, db, make_planting):
    tomato = make_planting("tomato", x_cm=0, y_cm=0, width_cm=50, length_cm=50)
    kale = make_planting("kale", x_cm=55, y_cm=0, width_cm=45, length_cm=45)
    report = check_bed(bed(garden), [tomato, kale], db, radius_cm=60, lang="nl")
    assert report.score < 50
    conflict = report.conflicts[0]
    assert (conflict.kind, conflict.severity) == ("enemy", "error")
    assert conflict.key == "compat.enemy"
    assert conflict.params["a"] == "Tomaat" and "voeding" in conflict.params["reason"]


def test_overlap_only_conflicts_when_sharing_time(garden, db, make_planting):
    """Succession: radish then beans in the same spot is fine, together it is not."""
    radish = make_planting("radish", x_cm=0, y_cm=0, width_cm=60, length_cm=30)
    beans = make_planting("bush_bean", x_cm=0, y_cm=0, width_cm=60, length_cm=30)
    sequential = {
        radish.id: DateWindow(date(2026, 3, 20), date(2026, 5, 1)),
        beans.id: DateWindow(date(2026, 5, 10), date(2026, 8, 1)),
    }
    assert check_bed(bed(garden), [radish, beans], db, timelines=sequential).pairs == []
    together = {**sequential, beans.id: DateWindow(date(2026, 4, 15), date(2026, 8, 1))}
    report = check_bed(bed(garden), [radish, beans], db, timelines=together)
    assert any(p.kind == "overlap" and p.severity == "error" for p in report.pairs)
```

### 9.4 End‑to‑end in Home Assistant

```python
async def test_setup_creates_entities_and_frost_warning(hass: HomeAssistant, setup_garden) -> None:
    entry, pushes = setup_garden
    assert entry.state is ConfigEntryState.LOADED

    frost = hass.states.get("sensor.hortulus_frost_risk_next_48h")
    assert frost.state == "high"
    assert frost.attributes["min_temperature"] == -2.0
    assert frost.attributes["source"] == "hourly"
    assert hass.states.get("binary_sensor.hortulus_frost_warning").state == "on"

    moisture = hass.states.get("sensor.bed_1_moisture_status")
    assert moisture.state in ("optimal", "slightly_dry", "dry")
    assert moisture.attributes["moisture"] == 22.5
    assert hass.states.get("sensor.bed_1_irrigation_recommendation") is not None
    assert hass.states.get("binary_sensor.bed_1_needs_water") is not None
    assert hass.states.get("sensor.greenhouse_zone_a_greenhouse_advice") is not None
    assert hass.states.get("calendar.hortulus_garden_tasks") is not None
    assert hass.states.get("todo.hortulus_this_week") is not None
    assert int(hass.states.get("sensor.hortulus_tasks_due_today").state) >= 1

    # Fahrenheit outdoor sensor converted to °C for the climate log (GDD).
    repo = entry.runtime_data.repo
    assert repo.data.climate_log[-1].tmax == 12.5
    # Example plan was seeded: tomatoes/basil/marigold under glass, carrots+onions+lettuce outside.
    assert {p.plant_id for p in repo.data.plantings} >= {"tomato", "basil", "marigold", "carrot", "onion", "lettuce"}
    # Persistent notification + push for frost (onions are planted out and frost-hardy,
    # so the alert is the general "high" risk alert).
    assert any(c.data["title"].startswith("Hortulus") for c in pushes)
    registry = er.async_get(hass)
    assert registry.async_get("sensor.bed_1_companion_score").disabled_by is not None
```

Other suites cover hemispheres/leap days/frost‑free zones, watering (rain credit,
greenhouse, soil shift, no‑sensor balance), ET₀ plausibility incl. polar night,
migrations, import/export (including refused files that must change nothing), succession,
database integrity (EN/NL/FR names, companion references), the config flow (validation, a
second garden gets its own storage), services with responses, the websocket API (revision
conflicts, draft checks, YAML export, permissions) and the options flow.

---

---

[← 8. Example HA Automations & Dashboards](08-example-ha-automations--dashboards.md) · [↑ Blueprint contents](../BLUEPRINT.md) · [10. Documentation Files (README etc.) →](10-documentation-files-readme-etc.md)
