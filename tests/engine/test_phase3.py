"""Phase 3: weather episodes, weather-aware scheduling, overdue reminders, maintenance."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.models import (
    Feature,
    FeatureType,
    LayoutMode,
    PlantingStatus,
    Task,
    TaskPriority,
    TaskType,
    WeatherSnapshot,
)
from custom_components.garden_manager.engine.tasks import TaskSpec, generate_specs, overdue_report, week_ahead
from custom_components.garden_manager.engine.weather import DailyOutlook
from custom_components.garden_manager.engine.weather_tasks import weather_adjust, weather_specs

TZ = ZoneInfo("Europe/Brussels")


def ctx_for(garden, db, now, outlook):
    analysis = analyze(garden, db, WeatherSnapshot(), {}, now=now, tz=TZ)
    ctx = analysis.task_context(garden, db)
    ctx.outlook = outlook
    return ctx


def day(d, tmin=10.0, tmax=20.0, rain=0.0, wind=10.0):
    return DailyOutlook(d, tmin, tmax, rain, None, wind_kmh=wind)


def test_heat_episode_creates_garden_and_greenhouse_tasks(garden, db, make_planting):
    garden.plantings = [make_planting("lettuce", "bed_1", 2026, layout=LayoutMode.BLOCK)]
    today = date(2026, 6, 20)
    outlook = [day(today), day(today + timedelta(days=1), tmax=33), day(today + timedelta(days=2), tmax=30)]
    ctx = ctx_for(garden, db, datetime(2026, 6, 20, 8, tzinfo=TZ), outlook)
    specs = weather_specs(ctx)
    keys = {s.key.split(":")[1] for s in specs}
    assert {"heat", "heat_gh"} <= keys
    heat = next(s for s in specs if s.key.startswith("w:heat:"))
    assert heat.priority is TaskPriority.URGENT  # 33 °C
    assert "curtain" in heat.description  # home remedy for shade


def test_storm_and_heavy_rain(garden, db):
    today = date(2026, 9, 10)
    outlook = [day(today, rain=22), day(today + timedelta(days=1), wind=70)]
    ctx = ctx_for(garden, db, datetime(2026, 9, 10, 8, tzinfo=TZ), outlook)
    types = {s.key.split(":")[1]: s.type for s in weather_specs(ctx)}
    assert types["storm"] is TaskType.PROTECT
    assert types["rain"] is TaskType.PEST_CHECK


def test_sowing_moves_off_a_rainy_day(garden, db):
    today = date(2026, 5, 1)
    outlook = [day(today + timedelta(days=i), rain=12 if i in (0, 1) else 0) for i in range(6)]
    ctx = ctx_for(garden, db, datetime(2026, 5, 1, 8, tzinfo=TZ), outlook)
    spec = TaskSpec(key="p:x:sow_direct", type=TaskType.SOW_DIRECT, due=today, title_key="task.sow_direct", title_params={},
                    window_start=today, window_end=today + timedelta(days=10))  # fmt: skip
    weather_adjust([spec], ctx)
    assert spec.due == today + timedelta(days=2)
    assert "rain" in spec.description


def test_whole_window_bad_keeps_date_with_warning(garden, db):
    today = date(2026, 5, 1)
    outlook = [day(today + timedelta(days=i), tmin=-2) for i in range(3)]
    ctx = ctx_for(garden, db, datetime(2026, 5, 1, 8, tzinfo=TZ), outlook)
    spec = TaskSpec(key="k", type=TaskType.TRANSPLANT, due=today, title_key="task.transplant", title_params={},
                    window_start=today, window_end=today + timedelta(days=2))  # fmt: skip
    weather_adjust([spec], ctx)
    assert spec.due == today and "frost" in spec.description


def test_overdue_report_and_week_ahead():
    today = date(2026, 5, 10)
    tasks = [
        Task(id="a", title="Sow carrots", type=TaskType.SOW_DIRECT, due=today - timedelta(days=9),
             window_end=today - timedelta(days=2)),
        Task(id="b", title="Plant leeks", type=TaskType.TRANSPLANT, due=today - timedelta(days=3),
             window_end=today + timedelta(days=5)),
        Task(id="c", title="Weed", type=TaskType.WEED, due=today - timedelta(days=4)),
        Task(id="d", title="Today", type=TaskType.WEED, due=today),
    ]  # fmt: skip
    report = overdue_report(tasks, today, after_days=1)
    assert [(i.task.id, i.verdict) for i in report] == [("a", "window_closed"), ("c", "do_now"), ("b", "still_ok")]
    plan = week_ahead(tasks, today)
    assert len(plan[today]) == 4 and len(plan) == 7


def test_hedge_trim_only_with_a_hedge(garden, db):
    now = datetime(2026, 7, 20, 8, tzinfo=TZ)

    def keys():
        analysis = analyze(garden, db, WeatherSnapshot(), {}, now=now, tz=TZ)
        return {s.key for s in generate_specs(analysis.task_context(garden, db))}

    assert not any(k.startswith("m:hedge_trim") for k in keys())
    garden.features = [Feature("h", "Haag", FeatureType.HEDGE, width_cm=300, length_cm=60)]
    assert any(k.startswith("m:hedge_trim") for k in keys())


def test_pdf_wrap_cuts_long_words_after_a_break():
    from custom_components.garden_manager.engine.pdf import text_width, wrap

    lines = wrap("Bed " + "x" * 200, 40, 10)
    assert all(text_width(line, 10) <= 40 for line in lines)


def test_tiny_greenhouse_gets_a_positive_bed(db):
    from custom_components.garden_manager.seed import build_initial_data

    data = build_initial_data(
        {
            "region": {"region_mode": "preset", "hemisphere": "north", "preset": "nl_be"},
            "areas": [{"name": "Mini", "type": "greenhouse", "width_m": 0.3, "length_m": 0.4}],
        },
        latitude=51.0, time_zone="Europe/Brussels", language="en", today=date(2026, 3, 1), db=db,
    )  # fmt: skip
    assert data.beds and all(b.width_cm > 0 and b.length_cm > 0 for b in data.beds)


def test_one_frost_night_gives_one_alert(garden, db, make_planting):
    from datetime import UTC

    from tests.conftest import weather

    garden.zones[0].id = "zone_garden"  # a real zone id, not the synthetic "outdoor"
    garden.beds[0].zone_id = "zone_garden"
    lettuce = make_planting("lettuce", "bed_1", 2026, status=PlantingStatus.TRANSPLANTED)
    lettuce.transplanted_on = date(2026, 3, 10)
    garden.plantings = [lettuce]
    snap = weather(hourly="forecast_hourly_dst_frost.json")
    analysis = analyze(garden, db, snap, {}, now=datetime(2026, 3, 28, 12, tzinfo=UTC), tz=ZoneInfo("Europe/Amsterdam"))
    frost = [a for a in analysis.alerts if a.kind == "frost"]
    assert len(frost) == 1
