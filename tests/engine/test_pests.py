"""Pest calendar: flight windows from degree-days, calendar fallback, slug weather, tasks."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.models import ClimateDay, PlantingStatus, TaskType, WeatherSnapshot
from custom_components.garden_manager.engine.pests import pest_warnings
from custom_components.garden_manager.engine.tasks import generate_specs
from custom_components.garden_manager.engine.weather import DailyOutlook

TZ = ZoneInfo("Europe/Amsterdam")


def _log(until: date, tmin: float, tmax: float, rain: float = 0.0) -> list[ClimateDay]:
    start = date(until.year, 1, 1)
    return [
        ClimateDay(start + timedelta(days=i), tmin=tmin, tmax=tmax, rain_mm=rain)
        for i in range((until - start).days + 1)
    ]


def _timelines(garden, db, today: date):
    return analyze(
        garden, db, WeatherSnapshot(), {}, now=datetime(today.year, today.month, today.day, 8, tzinfo=TZ), tz=TZ
    ).timelines


def test_carrot_fly_window_from_degree_days(garden, db, make_planting):
    today = date(2026, 5, 20)
    garden.plantings = [make_planting("carrot", "bed_1", 2026, status=PlantingStatus.SOWN)]
    # 140 cool days, 3 degree-days each over base 6 -> 420 GDD: inside the first flight
    garden.climate_log = _log(today, 2.0, 12.0)
    warnings = pest_warnings(garden, db, _timelines(garden, db, today), today, [])
    fly = next(w for w in warnings if w.pest == "carrot_fly")
    assert fly.status == "active" and fly.source == "gdd" and fly.generation == 1 and fly.action == "net"
    assert fly.beds == ["bed_1"] and fly.gdd is not None and 330 <= fly.gdd <= 650


def test_calendar_fallback_without_a_climate_log(garden, db, make_planting):
    today = date(2026, 5, 10)
    garden.plantings = [make_planting("cabbage", "bed_1", 2026, status=PlantingStatus.TRANSPLANTED)]
    garden.climate_log = []
    warnings = {w.pest: w for w in pest_warnings(garden, db, _timelines(garden, db, today), today, [])}
    assert warnings["cabbage_root_fly"].source == "calendar" and warnings["cabbage_root_fly"].status == "active"
    assert warnings["cabbage_white"].status == "active"


def test_slugs_after_a_mild_damp_spell(garden, db, make_planting):
    today = date(2026, 6, 3)
    garden.plantings = [make_planting("lettuce", "bed_1", 2026, status=PlantingStatus.SOWN)]
    garden.climate_log = [ClimateDay(today - timedelta(days=i), tmin=9.0, tmax=17.0, rain_mm=4.0) for i in range(3)]
    outlook = [DailyOutlook(today, 10.0, 18.0, 1.0, None)]
    warnings = {w.pest: w for w in pest_warnings(garden, db, _timelines(garden, db, today), today, outlook)}
    assert warnings["slugs"].source == "weather" and warnings["slugs"].action == "trap"
    garden.climate_log = [ClimateDay(today - timedelta(days=i), tmin=9.0, tmax=24.0, rain_mm=0.0) for i in range(3)]
    dry = {w.pest for w in pest_warnings(garden, db, _timelines(garden, db, today), today, [])}
    assert "slugs" not in dry


def test_pest_calendar_makes_tasks(garden, db, make_planting):
    today = date(2026, 5, 20)
    garden.plantings = [make_planting("carrot", "bed_1", 2026, status=PlantingStatus.SOWN)]
    garden.climate_log = _log(today, 2.0, 12.0)
    result = analyze(garden, db, WeatherSnapshot(), {}, now=datetime(2026, 5, 20, 8, tzinfo=TZ), tz=TZ, lang="nl")
    assert any(w.pest == "carrot_fly" for w in result.pests)
    assert "pests" in result.to_dict()
    specs = [s for s in generate_specs(result.task_context(garden, db)) if s.key.startswith("p:carrot_fly:")]
    assert len(specs) == 1
    spec = specs[0]
    assert spec.type is TaskType.PROTECT and spec.title_key == "task.pest_net" and spec.bed_id == "bed_1"
    assert spec.title_params["pest"] == "wortelvlieg" and "insectengaas" in spec.description
