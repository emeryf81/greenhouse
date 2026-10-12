"""Companion conflict detection, spacing overlaps and crop rotation."""

from __future__ import annotations

from datetime import date

from custom_components.garden_manager.engine.compatibility import (
    check_bed,
    check_rotation,
    rotation_history,
    suggest_companions,
)
from custom_components.garden_manager.engine.models import RotationRecord
from custom_components.garden_manager.engine.schedule import DateWindow


def bed(garden, bed_id="bed_1"):
    return garden.bed(bed_id)


def test_friends_close_together_raise_the_score(garden, db, make_planting):
    tomato = make_planting("tomato", x_cm=0, y_cm=0, width_cm=50, length_cm=50)
    basil = make_planting("basil", x_cm=60, y_cm=0, width_cm=30, length_cm=30)
    report = check_bed(bed(garden), [tomato, basil], db, radius_cm=60)
    assert report.score > 50
    (finding,) = report.pairs
    assert finding.kind == "friend" and finding.severity == "info"
    assert "thrips" in finding.params["reason"]


def test_enemies_close_together_are_flagged_with_explanation(garden, db, make_planting):
    tomato = make_planting("tomato", x_cm=0, y_cm=0, width_cm=50, length_cm=50)
    kale = make_planting("kale", x_cm=55, y_cm=0, width_cm=45, length_cm=45)
    report = check_bed(bed(garden), [tomato, kale], db, radius_cm=60, lang="nl")
    assert report.score < 50
    conflict = report.conflicts[0]
    assert (conflict.kind, conflict.severity) == ("enemy", "error")
    assert conflict.key == "compat.enemy"
    assert conflict.params["a"] == "Tomaat" and "voeding" in conflict.params["reason"]


def test_enemies_far_apart_do_not_interact(garden, db, make_planting):
    tomato = make_planting("tomato", x_cm=0, y_cm=0, width_cm=50, length_cm=50)
    kale = make_planting("kale", x_cm=150, y_cm=50, width_cm=45, length_cm=45)
    garden.beds[0].width_cm = 200
    report = check_bed(bed(garden), [tomato, kale], db, radius_cm=60)
    assert report.pairs == [] and report.score == 50


def test_alliums_versus_legumes(garden, db, make_planting):
    onion = make_planting("onion", x_cm=0, y_cm=0, width_cm=200, length_cm=25, layout="row")
    pea = make_planting("pea", x_cm=0, y_cm=30, width_cm=200, length_cm=10, layout="row")
    report = check_bed(bed(garden), [onion, pea], db)
    assert report.conflicts[0].kind == "enemy"
    assert db.relation("pea", "onion").relation.value == "enemy"  # symmetric


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


def test_out_of_bounds_planting(garden, db, make_planting):
    p = make_planting("carrot", x_cm=180, y_cm=0, width_cm=50, length_cm=25)
    assert check_bed(bed(garden), [p], db).out_of_bounds == [p.id]


def test_rotation_conflict_same_family_too_soon(garden, db, make_planting):
    last_year = make_planting("tomato", season=2025, x_cm=0, y_cm=0)
    this_year = make_planting("sweet_pepper", season=2026, x_cm=100, y_cm=0)  # also Solanaceae
    history = rotation_history([], [last_year, this_year], db)
    (finding,) = check_rotation(this_year, bed(garden), history, db)
    assert finding.family == "Solanaceae" and finding.conflicting_season == 2025
    assert finding.severity == "error" and finding.years_required == 4


def test_rotation_respects_years_and_manual_history(garden, db, make_planting):
    potatoes_2023 = RotationRecord("bed_1", 2023, "Solanaceae", None, "manual")
    tomato = make_planting("tomato", season=2026)
    (finding,) = check_rotation(tomato, bed(garden), [potatoes_2023], db)
    assert finding.severity == "warning"  # 3 of 4 years: almost there
    assert check_rotation(make_planting("tomato", season=2027), bed(garden), [potatoes_2023], db) == []
    # Different bed or family: no conflict
    assert check_rotation(make_planting("carrot", season=2026), bed(garden), [potatoes_2023], db) == []


def test_companion_suggestions_are_ordered_by_strength(db):
    suggestions = suggest_companions("tomato", db)
    assert suggestions[0] == ("marigold", 3)
    assert ("basil", 2) in suggestions
