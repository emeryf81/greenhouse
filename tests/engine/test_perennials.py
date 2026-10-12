"""Perennials persist across seasons until they are removed explicitly."""

from __future__ import annotations

from datetime import datetime
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.models import PlantingStatus, TaskType, WeatherSnapshot, present_in
from custom_components.garden_manager.engine.tasks import generate_specs

TZ = ZoneInfo("Europe/Brussels")


def specs_at(garden, db, now):
    analysis = analyze(garden, db, WeatherSnapshot(), {}, now=now, tz=TZ)
    return analysis, generate_specs(analysis.task_context(garden, db))


def test_present_in_rules():
    from custom_components.garden_manager.engine.models import Planting

    tree = Planting(id="a", plant_id="apple", bed_id="b", season=2025)
    assert not present_in(tree, True, 2024)
    assert present_in(tree, True, 2025) and present_in(tree, True, 2030)
    tree.removed_season = 2028
    assert present_in(tree, True, 2027) and not present_in(tree, True, 2028)
    assert not present_in(tree, False, 2026)  # annuals live one season


def test_apple_tree_carries_over_with_yearly_care(garden, db, make_planting):
    garden.plantings = [
        make_planting(
            "apple", "bed_1", 2025, id="apple1", status=PlantingStatus.TRANSPLANTED, width_cm=100, length_cm=100
        )
    ]
    analysis, specs = specs_at(garden, db, datetime(2027, 1, 20, 9, 0, tzinfo=TZ))
    tl = analysis.timelines["apple1"]
    assert tl.established and not tl.bearing  # year 2 of 3 before the first crop
    keys = {s.key for s in specs if s.planting_id == "apple1"}
    assert any(k.startswith("p:apple1:y2027:") and ":prune" in k for k in keys), keys
    assert not any(k.endswith(":harvest") for k in keys)  # not bearing yet
    assert not any(":sow" in k or ":transplant" in k for k in keys)
    # No weekly weeding for an orchard tree.
    assert not any(s.type is TaskType.WEED and s.bed_id == "bed_1" for s in specs)

    _, specs = specs_at(garden, db, datetime(2028, 6, 1, 9, 0, tzinfo=TZ))
    harvest = [s for s in specs if s.planting_id == "apple1" and s.type is TaskType.HARVEST]
    assert harvest and harvest[0].key.startswith("p:apple1:y2028:")
    assert harvest[0].due.month in (8, 9, 10)


def test_removed_perennial_stops_generating_tasks(garden, db, make_planting):
    tree = make_planting("apple", "bed_1", 2025, id="apple1", status=PlantingStatus.TRANSPLANTED)
    tree.removed_season = 2027
    garden.plantings = [tree]
    _, specs = specs_at(garden, db, datetime(2027, 3, 1, 9, 0, tzinfo=TZ))
    assert not [s for s in specs if s.planting_id == "apple1"]


def test_annual_does_not_carry_over(garden, db, make_planting):
    garden.plantings = [make_planting("lettuce", "bed_1", 2025, id="sla")]
    _, specs = specs_at(garden, db, datetime(2027, 5, 1, 9, 0, tzinfo=TZ))
    assert not [s for s in specs if s.planting_id == "sla"]
