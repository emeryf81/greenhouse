"""Findings of the whole-repository review: imports are all-or-nothing, plans set aside travel."""

from __future__ import annotations

import copy
from datetime import UTC, datetime

import pytest

from custom_components.garden_manager.engine import planio
from custom_components.garden_manager.engine.models import ArchivedPlan, GardenData

NOW = datetime(2026, 8, 1, tzinfo=UTC)


def test_a_refused_import_leaves_the_garden_as_it_was(garden: GardenData) -> None:
    before = copy.deepcopy(garden)
    doc = planio.export_plan(garden, now=NOW)
    doc.update(zones=[], beds=[], plantings=[], layouts={}, plant_overrides="invalid")
    with pytest.raises(planio.PlanImportError):
        planio.import_plan(garden, doc, "replace")
    assert garden.zones == before.zones and garden.beds == before.beds
    assert garden.plantings == before.plantings and garden.revision == before.revision


def test_plans_set_aside_travel_with_the_export(garden: GardenData) -> None:
    garden.archived_plans = [
        ArchivedPlan(id="ap1", name="Old", season=2025, zones=list(garden.zones), beds=list(garden.beds))
    ]
    doc = planio.export_plan(garden, now=NOW)
    assert [a["id"] for a in doc["archived_plans"]] == ["ap1"]
    fresh = GardenData()
    counts = planio.import_plan(fresh, doc, "replace")
    assert counts["archived_plans"] == 1 and [a.id for a in fresh.archived_plans] == ["ap1"]
    # a file without them leaves the stored ones alone
    without = {k: v for k, v in doc.items() if k != "archived_plans"}
    planio.import_plan(fresh, without, "merge")
    assert [a.id for a in fresh.archived_plans] == ["ap1"]
    doc["archived_plans"][0]["plantings"] = [{"id": "x", "plant_id": "tomato", "bed_id": "nope", "season": 2025}]
    with pytest.raises(planio.PlanImportError):
        planio.import_plan(GardenData(), doc, "replace")


def test_a_bed_too_narrow_for_its_margins_is_skipped_not_a_crash(garden: GardenData, db) -> None:
    from datetime import date

    from custom_components.garden_manager.engine.autoplan import AutoplanOptions, autoplan

    for bed in garden.beds:
        bed.width_cm = 10  # the two margins use it all
    garden.plantings = []
    result = autoplan(garden, db, AutoplanOptions(season=2027), today=date(2026, 12, 1))
    assert result is not None and not result.plantings


def test_a_present_field_of_the_wrong_type_is_refused_not_ignored(garden: GardenData) -> None:
    before = copy.deepcopy(garden)
    for field, bad in (("archived_plans", {}), ("plant_overrides", []), ("plant_overrides", "x")):
        doc = planio.export_plan(garden, now=NOW)
        doc[field] = bad
        with pytest.raises(planio.PlanImportError):
            planio.import_plan(garden, doc, "replace")
    assert garden.zones == before.zones and garden.plant_overrides == before.plant_overrides
    doc = planio.export_plan(garden, now=NOW)
    doc.pop("plant_overrides")  # an older file without the field is fine
    doc.pop("archived_plans")
    assert planio.import_plan(garden, doc, "merge")["zones"] == len(garden.zones)
