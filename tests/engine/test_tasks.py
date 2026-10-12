"""Task generation from a planting plan, merging, recurrence and rescheduling."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.models import (
    LayoutMode,
    PlantingStatus,
    SensorReading,
    SowMethod,
    TaskSource,
    TaskStatus,
    TaskType,
    WeatherSnapshot,
)
from custom_components.garden_manager.engine.tasks import (
    complete_task,
    generate_specs,
    merge_tasks,
    postpone_task,
)

TZ = ZoneInfo("Europe/Amsterdam")


def run(garden, db, now, readings=None, weather=None, ids=None, lang="en"):
    analysis = analyze(garden, db, weather or WeatherSnapshot(), readings or {}, now=now, tz=TZ, lang=lang)
    merge = merge_tasks(
        garden.tasks,
        generate_specs(analysis.task_context(garden, db)),
        today=analysis.today,
        now=now,
        lang=lang,
        **({"id_factory": ids} if ids else {}),
    )
    garden.tasks = merge.tasks
    return analysis, merge


def by_key(tasks, suffix):
    return next(t for t in tasks if t.key and t.key.endswith(suffix) and t.is_open)


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


def test_outdoor_indoor_sown_crop_gets_hardening_off(garden, db, make_planting):
    garden.plantings = [
        make_planting("cabbage", "bed_1", 2026, method=SowMethod.INDOOR_SOW, x_cm=0, y_cm=0, width_cm=45, length_cm=45)
    ]
    _, merge = run(garden, db, datetime(2026, 1, 15, 9, tzinfo=TZ))
    harden = by_key(merge.tasks, ":harden_off")
    plant_out = by_key(merge.tasks, ":transplant")
    assert harden.due == plant_out.due - timedelta(days=10)


def test_regeneration_is_idempotent(garden, db, make_planting):
    garden.plantings = [
        make_planting("tomato", "gh_bed", method=SowMethod.INDOOR_SOW),
        make_planting("carrot", "bed_1", layout=LayoutMode.ROW, width_cm=200, length_cm=25),
    ]
    now = datetime(2026, 3, 1, 9, tzinfo=TZ)
    _, first = run(garden, db, now)
    assert first.created
    _, second = run(garden, db, now)
    assert not second.changed
    assert len({t.key for t in garden.tasks if t.is_open}) == len([t for t in garden.tasks if t.is_open])


def test_completion_updates_planting_and_rolls_recurrence(garden, db, make_planting, ids):
    garden.plantings = [make_planting("tomato", "gh_bed", method=SowMethod.INDOOR_SOW)]
    now = datetime(2026, 2, 1, 9, tzinfo=TZ)
    run(garden, db, now, ids=ids)

    sow = by_key(garden.tasks, ":sow_indoor")
    complete_task(garden, sow.id, now=now, today=now.date(), note="20 seeds")
    planting = garden.plantings[0]
    assert planting.status is PlantingStatus.SOWN_INDOORS and planting.sown_on == now.date()

    later = datetime(2026, 4, 1, 9, tzinfo=TZ)
    run(garden, db, later, ids=ids)
    plant_out = by_key(garden.tasks, ":transplant")
    complete_task(garden, plant_out.id, now=later, today=later.date())
    assert planting.status is PlantingStatus.TRANSPLANTED
    assert planting.transplanted_on == later.date()

    # Care schedule is now anchored on the *actual* transplant date.
    run(garden, db, later, ids=ids)
    prune = by_key(garden.tasks, ":prune")
    assert prune.due == later.date() + timedelta(days=14)

    done_on = prune.due + timedelta(days=2)  # a bit late
    result = complete_task(garden, prune.id, now=later, today=done_on)
    assert result.next_task is not None
    assert result.next_task.due == done_on + timedelta(days=7)
    assert result.task.key.endswith(f"@{prune.due.isoformat()}")

    # Regeneration must not reset the progressed series to its first date.
    run(garden, db, datetime.combine(done_on, datetime.min.time(), TZ), ids=ids)
    assert by_key(garden.tasks, ":prune").due == done_on + timedelta(days=7)


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


def test_removed_planting_removes_its_open_tasks(garden, db, make_planting):
    garden.plantings = [make_planting("radish", "bed_1", width_cm=50, length_cm=15)]
    now = datetime(2026, 3, 20, 9, tzinfo=TZ)
    run(garden, db, now)
    assert any(t.planting_id == "p1" for t in garden.tasks)
    garden.plantings = []
    _, merge = run(garden, db, now)
    assert merge.removed and not any(t.planting_id == "p1" and t.is_open for t in garden.tasks)


def test_direct_sowing_waits_for_warm_soil(garden, db, make_planting):
    """Beans need 12 °C soil: a cold sensor pushes the sow task to tomorrow."""
    garden.plantings = [make_planting("bush_bean", "bed_1", width_cm=100, length_cm=45)]
    now = datetime(2026, 5, 10, 9, tzinfo=TZ)  # inside the window (LF + 2..10 weeks)
    cold = {"sensor.soil_temp_bed_1": SensorReading("sensor.soil_temp_bed_1", 9.0, now)}
    analysis, _ = run(garden, db, now, readings=cold)
    advice = analysis.advice["p1"]
    assert advice.action == "sow" and advice.status == "wait"
    assert advice.reasons[-1][0] == "reason.soil_too_cold"
    sow = by_key(garden.tasks, ":sow_direct")
    assert sow.due == now.date() + timedelta(days=1)
    assert "12" in sow.description

    warm = {"sensor.soil_temp_bed_1": SensorReading("sensor.soil_temp_bed_1", 14.0, now)}
    analysis, _ = run(garden, db, now, readings=warm)
    assert analysis.advice["p1"].status == "go"
    assert by_key(garden.tasks, ":sow_direct").due == now.date()


def test_dry_bed_creates_water_task_that_auto_resolves(garden, db, make_planting):
    garden.plantings = [
        make_planting(
            "lettuce",
            "bed_1",
            status=PlantingStatus.SOWN,
            sown_on=date(2026, 4, 1),
            layout=LayoutMode.BLOCK,
            width_cm=100,
            length_cm=50,
        )
    ]
    now = datetime(2026, 5, 15, 9, tzinfo=TZ)
    dry = {"sensor.soil_moisture_bed_1": SensorReading("sensor.soil_moisture_bed_1", 18.0, now)}
    analysis, merge = run(garden, db, now, readings=dry)
    water = by_key(garden.tasks, f":bed_1:{now.date().isoformat()}")
    assert water.type is TaskType.WATER and water.source is TaskSource.SENSOR
    rec = analysis.beds["bed_1"].irrigation
    assert water.title == f"Water Bed 1 ({round(rec.liters)} L)"

    wet = {"sensor.soil_moisture_bed_1": SensorReading("sensor.soil_moisture_bed_1", 40.0, now)}
    _, merge = run(garden, db, now, readings=wet)
    closed = next(t for t in merge.auto_closed if t.id == water.id)
    assert closed.status is TaskStatus.DONE and closed.notes[-1].text == "auto: resolved"


def test_tasks_are_rendered_in_dutch(garden, db, make_planting):
    garden.plantings = [make_planting("carrot", "bed_1", layout=LayoutMode.ROW, width_cm=200, length_cm=25)]
    run(garden, db, datetime(2026, 3, 1, 9, tzinfo=TZ), lang="nl")
    assert by_key(garden.tasks, ":sow_direct").title == "Wortel zaaien in Bed 1"
    assert by_key(garden.tasks, ":thin").title == "Wortel uitdunnen in Bed 1"


def test_southern_hemisphere_schedule(garden, db, make_planting):
    """Melbourne: last frost mid September -> tomatoes planted out in October."""
    garden.settings.region.preset = "au_melbourne"
    garden.plantings = [make_planting("tomato", "bed_1", 2026, method=SowMethod.INDOOR_SOW)]
    analysis, _ = run(garden, db, datetime(2026, 7, 10, 9, tzinfo=ZoneInfo("Australia/Melbourne")))
    tl = analysis.timelines["p1"]
    assert tl.sow_date.month in (7, 8)
    assert tl.transplant_date.month == 10
    assert tl.harvest_start.year == 2026 and tl.harvest_end.year in (2026, 2027)


def test_dependants_wait_for_an_overdue_prerequisite(garden, db, make_planting):
    """Thinning cannot be due while the sowing itself has not happened yet."""
    garden.plantings = [make_planting("lettuce", "bed_1", sow_date=date(2026, 4, 1), width_cm=60, length_cm=30)]
    now = datetime(2026, 5, 1, 9, tzinfo=TZ)
    run(garden, db, now)
    sow = by_key(garden.tasks, ":sow_direct")
    thin = by_key(garden.tasks, ":thin")
    assert sow.due == date(2026, 4, 1)  # explicit user date -> shown as overdue
    lag = (now.date() - sow.due).days
    assert thin.due == date(2026, 4, 1) + timedelta(days=10 + 7 + lag)
    assert thin.due > now.date()


def test_companion_flowers_get_no_harvest_task(garden, db, make_planting):
    garden.plantings = [make_planting("marigold", "gh_bed", method=SowMethod.INDOOR_SOW)]
    _, merge = run(garden, db, datetime(2026, 2, 15, 9, tzinfo=TZ))
    assert not any(t.type is TaskType.HARVEST for t in merge.created)
    assert any(t.type is TaskType.SOW_INDOOR for t in merge.created)
