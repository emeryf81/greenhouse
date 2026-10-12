"""Analysis module, new plans per season and the reasons autofill gives."""

from __future__ import annotations

from datetime import date

from custom_components.garden_manager.engine import diagnose, seasons
from custom_components.garden_manager.engine.autoplan import AutoplanOptions, autoplan
from custom_components.garden_manager.engine.models import (
    Feature,
    FeatureType,
    GardenBed,
    PlantingStatus,
    Zone,
    ZoneType,
    present_in,
)

TODAY = date(2026, 10, 12)


def codes(issues):
    return {i.code for i in issues}


# --------------------------------------------------------------------------- #
# New plans
# --------------------------------------------------------------------------- #
def _planted(garden, make_planting):
    garden.layout_season = 2026
    garden.features = [Feature("house", "Huis", FeatureType.HOUSE)]
    tree = make_planting("apple", "bed_1", 2024, id="tree", last_season=2026, status=PlantingStatus.TRANSPLANTED)
    lettuce = make_planting("lettuce", "bed_1", 2026, id="sla", x_cm=120)
    garden.plantings = [tree, lettuce]
    return tree, lettuce


def test_new_empty_plan_sets_the_old_one_aside(garden, make_planting):
    tree, _lettuce = _planted(garden, make_planting)
    plan = seasons.start_new_plan(garden, 2026, start="empty", old_name="Oud", plan_id="p1")
    assert garden.zones == [] and garden.beds == [] and garden.features == []
    assert plan.name == "Oud" and {p.id for p in plan.plantings} == {"tree", "sla"}
    # the lettuce leaves the plan, the tree keeps its history but ends in 2025
    assert [p.id for p in garden.plantings] == ["tree"] and not present_in(tree, True, 2026)
    assert present_in(tree, True, 2025)


def test_new_plan_with_the_same_zones_or_zones_and_beds(garden, make_planting):
    _planted(garden, make_planting)
    seasons.start_new_plan(garden, 2026, start="zones", old_name="A", plan_id="a")
    assert {z.id for z in garden.zones} == {"outdoor", "gh_a"} and garden.beds == []
    assert [f.id for f in garden.features] == ["house"]
    garden2_beds = len(garden.archived_plans[0].beds)
    seasons.activate_plan(garden, "a", old_name="leeg", new_id="b")
    seasons.start_new_plan(garden, 2026, start="zones_beds", old_name="C", plan_id="c")
    assert len(garden.beds) == garden2_beds and not [p for p in garden.plantings if present_in(p, False, 2026)]


def test_activating_an_archived_plan_brings_its_crops_back(garden, make_planting):
    _planted(garden, make_planting)
    seasons.start_new_plan(garden, 2026, start="empty", old_name="Oud", plan_id="old")
    garden.zones = [Zone(id="z", name="Nieuw")]
    replaced = seasons.activate_plan(garden, "old", old_name="Nieuw plan", new_id="new")
    assert replaced.name == "Nieuw plan" and [z.name for z in replaced.zones] == ["Nieuw"]
    assert {z.id for z in garden.zones} == {"outdoor", "gh_a"}
    ids = {p.id for p in garden.plantings if present_in(p, False, 2026)}
    assert ids == {"tree", "sla"}
    assert [p.id for p in garden.archived_plans] == ["new"]
    assert seasons.delete_plan(garden, "new") and not garden.archived_plans
    # beds of archived plans stay valid targets for old plantings
    seasons.start_new_plan(garden, 2026, old_name="x", plan_id="x")
    assert "bed_1" in seasons.all_bed_ids(garden)


# --------------------------------------------------------------------------- #
# Autofill: right plan, explained skips
# --------------------------------------------------------------------------- #
def test_autofill_explains_why_crops_are_left_out(garden, db):
    garden.layout_season = 2026
    res = autoplan(garden, db, AutoplanOptions(season=2026, replace=True), today=TODAY)
    late = [s for s in res.skipped if s["reason"] == "too_late"]
    assert late, res.skipped
    reasons = next(iter(late[0]["beds"].values()))
    assert reasons[0]["code"] == "too_late" and reasons[0]["params"]["season"] == 2026


def test_autofill_uses_the_plan_of_the_season_it_fills(garden, db):
    garden.layout_season = 2026
    zone = Zone(id="z27", name="Nieuwe moestuin", width_cm=600, length_cm=400)
    beds = [
        GardenBed(id=f"n{i}", name=f"Nieuw {i}", zone_id="z27", x_cm=i * 130, width_cm=120, length_cm=300)
        for i in range(3)
    ]
    seasons.store_layout(garden, 2027, [zone], beds, [])
    res = autoplan(garden, db, AutoplanOptions(season=2027, replace=True), today=TODAY)
    assert res.plantings and {p.bed_id for p in res.plantings} <= {"n0", "n1", "n2"}
    assert res.plan_from is None


def test_autofill_without_a_plan_proposes_on_the_latest_one(garden, db):
    garden.layout_season = 2026
    res = autoplan(garden, db, AutoplanOptions(season=2027, replace=True), today=TODAY)
    assert res.plan_from == 2026 and res.plantings
    assert any(w["key"] == "autoplan.plan_from" for w in res.warnings)


# --------------------------------------------------------------------------- #
# Garden check & "why not here?"
# --------------------------------------------------------------------------- #
def test_check_finds_crops_off_the_plan_and_other_surprises(garden, db, make_planting):
    garden.layout_season = 2026
    ghost = make_planting("carrot", "gone_bed", 2026, id="ghost")
    late = make_planting("tomato", "bed_1", 2026, id="late", width_cm=50, length_cm=50)
    outside = make_planting("onion", "bed_1", 2026, id="out", x_cm=190, width_cm=40, length_cm=30)
    garden.plantings = [ghost, late, outside]
    garden.zones.append(Zone(id="empty_zone", name="Leeg", type=ZoneType.GARDEN, x_cm=0, y_cm=900))
    garden.beds[0].x_cm = -500  # bed_1 no longer inside its zone
    issues = diagnose.check_garden(garden, db, today=TODAY, current_season=2026, lang="nl")
    found = codes(issues)
    assert {
        "planting_not_on_plan",
        "planting_too_late",
        "planting_outside_bed",
        "bed_outside_zone",
        "zone_without_beds",
    } <= found
    orphan = next(i for i in issues if i.code == "planting_not_on_plan")
    assert orphan.refs["planting"] == ["ghost"] and orphan.severity == "error"
    assert issues[0].severity == "error"  # most serious first


def test_check_reports_a_missed_transition_and_a_year_without_plan(garden, db, make_planting):
    garden.layout_season = 2026
    garden.plantings = [make_planting("lettuce", "bed_1", 2027, id="next")]
    found = codes(diagnose.check_garden(garden, db, today=date(2027, 1, 10), current_season=2027))
    assert {"transition_due", "season_without_plan"} <= found


def test_explain_gives_the_reasons_per_bed(garden, db, make_planting):
    garden.layout_season = 2026
    tomato = db.get("tomato")
    verdicts = {v.bed_id: v for v in diagnose.explain_plant(tomato, garden, db, 2026, today=TODAY)}
    assert not verdicts["bed_1"].ok
    assert "too_late" in {r["code"] for r in verdicts["bed_1"].reasons}
    # next year it fits outdoors; a full bed says so
    garden.plantings = [make_planting("kale", "bed_1", 2027, width_cm=200, length_cm=100)]
    seasons.copy_plan(garden, 2026, 2027)
    verdicts = {v.bed_id: v for v in diagnose.explain_plant(tomato, garden, db, 2027, today=TODAY)}
    got = {r["code"] for r in verdicts["bed_1"].reasons}
    assert "no_space" in got and "bad_neighbour" in got


# --------------------------------------------------------------------------- #
# Repairs, comparing plans, what still fits
# --------------------------------------------------------------------------- #
def test_fix_copies_a_missing_plan_and_moves_orphans(garden, db, make_planting):
    garden.layout_season = 2026
    old = make_planting("lettuce", "bed_1", 2025, id="old")
    stray = make_planting("lettuce", "gone_bed", 2026, id="stray", x_cm=5000)
    garden.plantings = [old, stray]
    issues = {
        i.code: i for i in diagnose.check_garden(garden, db, today=TODAY, current_season=2026, seasons=[2025, 2026])
    }
    assert issues["season_without_plan"].to_dict()["fixable"]
    done = diagnose.fix_issue(garden, "season_without_plan", issues["season_without_plan"].params,
                              issues["season_without_plan"].refs, current_season=2026)  # fmt: skip
    assert done["copied_from"] == 2026 and seasons.has_layout(garden, 2025)
    orphan = issues["planting_not_on_plan"]
    diagnose.fix_issue(garden, orphan.code, orphan.params, orphan.refs, current_season=2026)
    assert stray.bed_id in {b.id for b in garden.beds} and stray.x_cm + stray.width_cm <= garden.beds[0].width_cm
    import pytest

    with pytest.raises(ValueError):  # already repaired
        diagnose.fix_issue(garden, orphan.code, orphan.params, orphan.refs, current_season=2026)


def test_fix_carries_a_forgotten_perennial(garden, db, make_planting):
    garden.layout_season = 2026
    seasons.store_layout(garden, 2025, list(garden.zones), list(garden.beds), [])
    tree = make_planting("apple", "bed_1", 2024, id="tree", last_season=2025)
    garden.plantings = [tree]
    issue = next(
        i
        for i in diagnose.check_garden(garden, db, today=TODAY, current_season=2026)
        if i.code == "perennial_not_carried"
    )
    diagnose.fix_issue(garden, issue.code, issue.params, issue.refs, current_season=2026)
    assert present_in(tree, True, 2026)


def test_compare_plans_lists_what_changed(garden, db, make_planting):
    _planted(garden, make_planting)
    seasons.start_new_plan(garden, 2026, start="zones_beds", old_name="Oud", plan_id="old")
    garden.beds[0].x_cm += 50
    garden.plantings.append(make_planting("carrot", "bed_1", 2026, id="wortel"))
    diff = diagnose.compare_plans(
        diagnose.plan_view(garden, plan_id="old"), diagnose.plan_view(garden, season=2026), db, "nl"
    )
    assert diff["a"] == "Oud" and not diff["identical"]
    assert [c["id"] for c in diff["plantings"]["added"]] == ["wortel"]
    assert {c["id"] for c in diff["plantings"]["removed"]} == {"tree", "sla"}
    assert diff["beds"]["changed"][0]["what"] == ["moved"]
    same = diagnose.compare_plans(diagnose.plan_view(garden, season=2026), diagnose.plan_view(garden, season=2026), db)
    assert same["identical"]


def test_still_possible_in_october_is_short(garden, db):
    garden.layout_season = 2026
    late = {r["plant_id"] for r in diagnose.still_possible(garden, db, 2026, today=TODAY)}
    spring = {r["plant_id"] for r in diagnose.still_possible(garden, db, 2026, today=date(2026, 3, 1))}
    assert len(late) < len(spring) and "tomato" not in late
