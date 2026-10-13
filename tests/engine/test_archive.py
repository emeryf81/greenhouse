"""Old seasons move to the archive document; rotation and reports keep working."""

from __future__ import annotations

from datetime import UTC, datetime

from custom_components.garden_manager.engine.archive import (
    archive_candidates,
    archive_index,
    archive_old_seasons,
    merge_archive,
    prune_archived,
    with_season,
)
from custom_components.garden_manager.engine.models import GardenLayout, PlantingStatus
from custom_components.garden_manager.engine.serde import to_dict


def test_old_seasons_move_out_and_come_back(garden, db, make_planting):
    old = make_planting("tomato", "bed_1", 2021, status=PlantingStatus.FINISHED, id="old")
    failed = make_planting("carrot", "bed_1", 2021, status=PlantingStatus.FAILED, id="failed")
    recent = make_planting("lettuce", "bed_1", 2024, status=PlantingStatus.FINISHED, id="recent")
    carried = make_planting("rhubarb", "bed_1", 2020, status=PlantingStatus.HARVESTING, id="rhubarb", last_season=2026)
    garden.plantings = [old, failed, recent, carried]
    garden.layouts = {"2021": GardenLayout(saved_at=datetime(2021, 12, 31, tzinfo=UTC)), "2025": GardenLayout()}
    garden.rotation_history = []

    moved = archive_old_seasons(garden, 2026, db)

    assert {p.id for p in garden.plantings} == {"recent", "rhubarb"}  # 2024 is within the last three seasons
    assert sorted(moved) == ["2021"] and {p["id"] for p in moved["2021"]["plantings"]} == {"old", "failed"}
    assert moved["2021"]["layout"] is not None and list(garden.layouts) == ["2025"]
    # rotation remembers the tomato family in bed 1 for 2021 (not the failed carrots)
    assert [(r.bed_id, r.season, r.family) for r in garden.rotation_history] == [("bed_1", 2021, "Solanaceae")]

    archive: dict = {}
    merge_archive(archive, moved)
    merge_archive(archive, moved)  # idempotent
    assert len(archive["2021"]["plantings"]) == 2

    view = with_season(garden, archive, 2021)
    assert {p.id for p in view.plantings} == {"recent", "rhubarb", "old", "failed"} and "2021" in view.layouts
    assert len(garden.plantings) == 2  # the original is untouched
    assert with_season(garden, archive, 2019) is garden

    assert archive_old_seasons(garden, 2026, db) == {}  # nothing left to move


def test_candidates_leave_the_garden_alone_until_the_archive_is_stored(garden, db, make_planting):
    old = make_planting("tomato", "bed_1", 2021, status=PlantingStatus.FINISHED, id="old")
    older = make_planting("bean", "bed_1", 2020, status=PlantingStatus.FINISHED, id="older")
    garden.plantings = [old, older]
    garden.layouts = {"2021": GardenLayout()}
    garden.rotation_history = []

    pending = archive_candidates(garden, 2026)
    assert sorted(pending) == ["2020", "2021"] and len(garden.plantings) == 2 and "2021" in garden.layouts

    # only what the stored archive holds may go: 2021 is on disk, 2020 is not (yet)
    stored = archive_index({"2021": {"plantings": [to_dict(old)], "layout": to_dict(GardenLayout())}})
    assert prune_archived(garden, stored, 2026, db) == 2
    assert [p.id for p in garden.plantings] == ["older"] and garden.layouts == {}
    assert [(r.season, r.family) for r in garden.rotation_history] == [(2021, "Solanaceae")]
    assert prune_archived(garden, {}, 2026, db) == 0  # nothing stored: nothing removed


def test_merge_keeps_the_newest_copy_of_a_planting(make_planting):
    archive: dict = {}
    first = make_planting("tomato", "bed_1", 2021, id="old", width_cm=30)
    merge_archive(archive, {"2021": {"plantings": [to_dict(first)], "layout": None}})
    first.width_cm = 60
    merge_archive(archive, {"2021": {"plantings": [to_dict(first)], "layout": None}})
    assert [p["width_cm"] for p in archive["2021"]["plantings"]] == [60]


def test_a_carried_over_planting_comes_back_for_every_season_it_stood(garden, make_planting):
    carried = make_planting("rhubarb", "bed_1", 2018, status=PlantingStatus.FINISHED, id="rhubarb", last_season=2021)
    archive = {"2018": {"plantings": [to_dict(carried)], "layout": None}}
    garden.plantings = []
    assert [p.id for p in with_season(garden, archive, 2020).plantings] == ["rhubarb"]
    assert with_season(garden, archive, 2022) is garden  # removed from the plan after 2021
