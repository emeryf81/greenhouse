"""Garden plans per season and the explicit year-end transition."""

from __future__ import annotations

from datetime import date, datetime
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine import seasons
from custom_components.garden_manager.engine.advisor import advise
from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.models import (
    Feature,
    FeatureType,
    GardenBed,
    PlantingStatus,
    WeatherSnapshot,
    Zone,
    ZoneType,
    present_in,
)
from custom_components.garden_manager.engine.schedule import DateWindow

TZ = ZoneInfo("Europe/Brussels")


def test_adopt_makes_the_existing_garden_this_seasons_plan(garden, db, make_planting):
    tree = make_planting("apple", season=2023, status=PlantingStatus.TRANSPLANTED)
    gone = make_planting("apple", season=2023, removed_season=2025)
    lettuce = make_planting("lettuce", season=2025)
    garden.plantings = [tree, gone, lettuce]
    assert seasons.adopt(garden, 2026, db)
    assert garden.layout_season == 2026
    assert present_in(tree, True, 2026) and not present_in(tree, True, 2027)  # kept this year, not beyond
    assert not present_in(gone, True, 2026) and not present_in(lettuce, False, 2026)
    assert not seasons.adopt(garden, 2027, db)  # only once


def test_plans_are_saved_per_season(garden):
    garden.layout_season = 2026
    live_beds = list(garden.beds)
    draft_zone = Zone(id="z27", name="Siertuin", type=ZoneType.GARDEN)
    draft_bed = GardenBed(id="b27", name="Border", zone_id="z27")
    assert not seasons.store_layout(garden, 2027, [draft_zone], [draft_bed], [])
    assert garden.beds == live_beds  # the live garden is untouched
    assert [b.id for b in seasons.layout_for(garden, 2027).beds] == ["b27"]
    assert seasons.layout_for(garden, 2028) is None and not seasons.has_layout(garden, 2028)
    assert seasons.all_bed_ids(garden) >= {"bed_1", "gh_bed", "b27"}
    assert seasons.delete_layout(garden, 2027) and not seasons.has_layout(garden, 2027)


def test_preview_offers_perennials_and_overwintering_crops(garden, db, make_planting):
    garden.layout_season = 2026
    tree = make_planting("apple", season=2024, last_season=2026, status=PlantingStatus.TRANSPLANTED)
    dead = make_planting("blueberry", season=2025, last_season=2026, status=PlantingStatus.FAILED)
    garlic = make_planting("garlic", season=2026)
    tomato = make_planting("tomato", season=2026)
    garden.plantings = [tree, dead, garlic, tomato]
    occupancy = {
        garlic.id: DateWindow(date(2026, 10, 20), date(2027, 7, 10)),
        tomato.id: DateWindow(date(2026, 5, 15), date(2026, 10, 15)),
    }
    pre = seasons.preview(garden, db, 2026, season_end=date(2026, 12, 31), timelines=occupancy)
    got = {c.planting_id: (c.reason, c.selected) for c in pre.candidates}
    assert got == {tree.id: ("perennial", True), dead.id: ("perennial", False), garlic.id: ("overwinter", True)}
    assert pre.to_season == 2027 and not pre.target_exists and pre.is_live
    assert {z.id for z in pre.zones} == {"outdoor", "gh_a"}


def test_transition_copies_the_chosen_plan_and_carries_the_chosen_crops(garden, db, make_planting):
    garden.layout_season = 2026
    garden.features = [
        Feature("drive", "Oprit", FeatureType.DRIVEWAY),
        Feature("tent", "Partytent", FeatureType.OTHER),
    ]
    tree = make_planting("apple", "bed_1", 2024, last_season=2026)
    pepper = make_planting("sweet_pepper", "gh_bed", 2026, last_season=2026)  # greenhouse zone is dropped
    lettuce = make_planting("lettuce", "bed_1", 2026)
    garden.plantings = [tree, pepper, lettuce]
    res = seasons.apply(
        garden,
        2026,
        zone_ids=["outdoor"],
        feature_ids=["drive"],
        planting_ids=[tree.id, pepper.id],
        now=datetime(2026, 12, 28, tzinfo=TZ),
    )
    assert res.activated and res.carried == [tree.id] and res.skipped == [pepper.id]
    assert garden.layout_season == 2027
    assert [z.id for z in garden.zones] == ["outdoor"] and [b.id for b in garden.beds] == ["bed_1"]
    assert [f.id for f in garden.features] == ["drive"]
    # last year is archived unchanged
    archived = garden.layouts["2026"]
    assert {z.id for z in archived.zones} == {"outdoor", "gh_a"} and len(archived.features) == 2
    assert present_in(tree, True, 2027) and not present_in(pepper, True, 2027) and not present_in(lettuce, False, 2027)
    # the new year's plan is a copy: editing it leaves the archive alone
    garden.beds[0].name = "Moestuin"
    assert archived.beds[0].name == "Bed 1"
    assert seasons.pending_transition(garden, 2027) is None


def test_transition_can_keep_a_designed_plan_for_next_year(garden, db, make_planting):
    garden.layout_season = 2026
    seasons.store_layout(
        garden, 2027, [Zone(id="z", name="Nieuw")], [GardenBed(id="bed_1", name="Bed", zone_id="z")], []
    )
    tree = make_planting("apple", "bed_1", 2024, last_season=2026)
    garden.plantings = [tree]
    res = seasons.apply(garden, 2026, layout="keep", planting_ids=[tree.id])
    assert [z.name for z in garden.zones] == ["Nieuw"] and res.carried == [tree.id]
    assert "2027" not in garden.layouts and "2026" in garden.layouts


def test_transition_without_activating_only_prepares_next_year(garden, db):
    garden.layout_season = 2026
    res = seasons.apply(garden, 2026, activate=False)
    assert not res.activated and garden.layout_season == 2026 and "2027" in garden.layouts


def test_advisor_reminds_of_a_missing_transition(garden, db):
    garden.layout_season = 2026
    now = datetime(2027, 1, 10, 9, tzinfo=TZ)
    analysis = analyze(garden, db, WeatherSnapshot(), {}, now=now, tz=TZ, lang="nl")
    sugg = [s for s in advise(garden, db, analysis, "nl") if s.kind == "season"]
    assert sugg and sugg[0].action == {"type": "year_transition", "from_season": 2026}
    assert "2027" in sugg[0].title
    assert seasons.pending_transition(garden, 2027) == 2026
