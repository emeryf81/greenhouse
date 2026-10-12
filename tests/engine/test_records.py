"""Harvest log, learned yields, seed stock, water use, soil tests, assignment."""

from __future__ import annotations

from datetime import date, datetime
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.fertilizer import bed_fertilizer_plan
from custom_components.garden_manager.engine.models import (
    HarvestEntry,
    SeedPacket,
    SoilTest,
    Task,
    TaskType,
    WeatherSnapshot,
)
from custom_components.garden_manager.engine.records import (
    harvest_summary,
    learned_yields,
    record_water,
    seed_report,
    water_stats,
    year_overview,
)
from custom_components.garden_manager.engine.tasks import auto_assign

TZ = ZoneInfo("Europe/Brussels")


def test_harvest_summary_and_learned_yield(garden, make_planting):
    p = make_planting("tomato", "bed_1", 2026, id="tom", width_cm=100, length_cm=50)  # 0.5 m²
    garden.plantings = [p]
    garden.harvest_log = [
        HarvestEntry("h1", date(2026, 8, 1), "tomato", kg=1.5, planting_id="tom"),
        HarvestEntry("h2", date(2026, 8, 9), "tomato", kg=1.0, count=12, planting_id="tom"),
        HarvestEntry("h3", date(2025, 8, 9), "basil", kg=0.2),
    ]
    season = harvest_summary(garden, 2026)
    assert season["tomato"].kg == 2.5 and season["tomato"].count == 12 and season["tomato"].kg_m2 == 5.0
    assert "basil" not in season and "basil" in harvest_summary(garden)
    assert learned_yields(garden) == {"tomato": 5.0}  # basil has no area -> nothing learned


def test_seed_report_flags_old_and_missing_seed(garden, db, make_planting):
    garden.plantings = [make_planting("carrot", "bed_1", 2026), make_planting("lettuce", "bed_1", 2026)]
    garden.seed_stock = [
        SeedPacket("s1", "carrot", year=2021),  # Apiaceae keep ~3 years -> expired
        SeedPacket("s2", "lettuce", year=2025),
        SeedPacket("s3", "tomato", year=2026, quantity=0),
    ]
    report = seed_report(garden, db, 2026)
    status = {p["plant_id"]: p["status"] for p in report["packets"]}
    assert status == {"carrot": "expired", "lettuce": "ok", "tomato": "empty"}
    assert report["missing"] == ["carrot"]


def test_water_stats(garden):
    garden.settings.water.butt_capacity_l = 400
    for day, meter, butt in (
        (date(2026, 6, 1), 10.0, 80),
        (date(2026, 6, 8), 10.35, 50),
        (date(2026, 6, 9), 10.4, None),
    ):
        record_water(garden, day, meter, butt)
    stats = water_stats(garden, date(2026, 6, 9))
    assert stats.week_l == 400  # 10.4 - 10.0 m³
    assert stats.rain_available_l == 200 and stats.butt_pct == 50


def test_soil_test_adjusts_fertilizer(db):
    cabbage = db.get("cabbage")
    plain = bed_fertilizer_plan(2.0, [cabbage])
    acid = bed_fertilizer_plan(
        2.0, [cabbage], soil=SoilTest(date(2026, 3, 1), ph=6.0, organic_matter_pct=1.5, p_mg=60, k_mg=40)
    )
    assert acid.lime_g == round((7.0 - 6.0) * 250 * 2.0)
    assert acid.compost_kg > plain.compost_kg and acid.base_fertilizer_g < plain.base_fertilizer_g
    assert {"lime", "om_low", "pk_high"} <= set(acid.adjustments) and not acid.lime_check


def test_auto_assign_by_type():
    tasks = [Task("a", TaskType.WATER, "Water", date(2026, 6, 1)), Task("b", TaskType.PRUNE, "Prune", date(2026, 6, 1))]
    tasks[1].assignee = "person.jan"
    assert auto_assign(tasks, {"water": "person.emery", "*": "person.an"}) == 1
    assert [t.assignee for t in tasks] == ["person.emery", "person.jan"]


def test_year_overview_marks_months(garden, db, make_planting):
    garden.plantings = [make_planting("tomato", "bed_1", 2026)]
    analysis = analyze(garden, db, WeatherSnapshot(), {}, now=datetime(2026, 5, 1, 9, tzinfo=TZ), tz=TZ)
    year = year_overview(garden, db, analysis)
    row = year["rows"][0]
    assert row["plant_id"] == "tomato"
    assert any("harvest" in row["months"][str(m)] for m in (7, 8, 9))
    assert len(year["tasks"]) == 12
