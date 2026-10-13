"""From garden to kitchen: ready crops, surplus, harvest value against costs."""

from __future__ import annotations

from datetime import date, datetime
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.kitchen import economics, kitchen_group, kitchen_report, price_per_kg
from custom_components.garden_manager.engine.models import (
    Expense,
    HarvestEntry,
    PlantingStatus,
    WaterReading,
    WeatherSnapshot,
)

TZ = ZoneInfo("Europe/Amsterdam")


def test_groups_and_prices(db):
    assert kitchen_group(db.get("tomato")) == "fruiting"
    assert kitchen_group(db.get("basil")) == "herb"
    assert kitchen_group(db.get("carrot")) == "root"
    assert price_per_kg("tomato", db.get("tomato"), {}) == 4.5
    assert price_per_kg("tomato", db.get("tomato"), {"tomato": 3.0}) == 3.0


def test_ready_now_and_surplus(garden, db, make_planting):
    today = date(2026, 8, 10)
    garden.plantings = [make_planting("courgette", "bed_1", 2026, status=PlantingStatus.HARVESTING, id="c1")]
    timelines = analyze(garden, db, WeatherSnapshot(), {}, now=datetime(2026, 8, 10, 8, tzinfo=TZ), tz=TZ).timelines
    garden.settings.resources.household_size = 2
    garden.harvest_log = [HarvestEntry(f"h{i}", date(2026, 8, 4 + i), "courgette", kg=1.5) for i in range(4)]
    report = kitchen_report(garden, db, timelines, today, "nl")
    assert [r["planting_id"] for r in report["ready"]] == ["c1"]
    assert "koelkast" in report["ready"][0]["keep"]
    assert report["surplus"][0]["plant_id"] == "courgette" and report["surplus"][0]["kg_week"] == 6.0
    assert "passata" in report["surplus"][0]["ideas"]


def test_economics_balance(garden, db):
    garden.harvest_log = [
        HarvestEntry("h1", date(2026, 7, 1), "tomato", kg=10.0),
        HarvestEntry("h2", date(2025, 7, 1), "tomato", kg=99.0),  # other season
    ]
    garden.expenses = [
        Expense("e1", date(2026, 3, 1), 2026, "seeds", 12.5),
        Expense("e2", date(2026, 4, 1), 2026, "soil", 20.0),
        Expense("e3", date(2025, 4, 1), 2025, "tools", 80.0),
    ]
    garden.water_log = [WaterReading(date(2026, 5, 1), meter_m3=100.0), WaterReading(date(2026, 9, 1), meter_m3=102.0)]
    eco = economics(garden, db, 2026, "nl")
    assert eco["harvest_value"] == 45.0 and eco["harvest_kg"] == 10.0
    assert eco["expenses"] == {"seeds": 12.5, "soil": 20.0}
    assert eco["water_m3"] == 2.0 and eco["water_cost"] == 10.0
    assert eco["total_cost"] == 42.5 and eco["balance"] == 2.5
