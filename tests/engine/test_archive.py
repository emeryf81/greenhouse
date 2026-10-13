"""Old seasons move to the archive document; rotation and reports keep working."""

from __future__ import annotations

from datetime import UTC, datetime

from custom_components.garden_manager.engine.archive import archive_old_seasons, merge_archive, with_season
from custom_components.garden_manager.engine.models import GardenLayout, PlantingStatus


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
