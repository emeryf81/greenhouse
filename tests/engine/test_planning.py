"""Phase-2 planning: seasonal maintenance tasks, autofill, companion factors, rotation alternatives."""

from __future__ import annotations

from datetime import date, datetime
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.autoplan import AutoplanOptions, autoplan, crop_demand
from custom_components.garden_manager.engine.compatibility import check_bed, evaluate_pair
from custom_components.garden_manager.engine.geometry import Rect
from custom_components.garden_manager.engine.models import (
    BedKind,
    GardenBed,
    GardenResources,
    Hemisphere,
    PlantCategory,
    PlantingStatus,
    RotationRecord,
    TaskType,
    WeatherSnapshot,
)
from custom_components.garden_manager.engine.tasks import generate_specs

TZ = ZoneInfo("Europe/Amsterdam")


def specs_at(garden, db, day: date, lang: str = "en"):
    now = datetime(day.year, day.month, day.day, 9, 0, tzinfo=TZ)
    analysis = analyze(garden, db, WeatherSnapshot(), {}, now=now, tz=TZ, lang=lang)
    return {s.key: s for s in generate_specs(analysis.task_context(garden, db))}


# --------------------------------------------------------------------------- #
# Seasonal maintenance
# --------------------------------------------------------------------------- #
def test_garden_and_greenhouse_calendar(garden, db):
    specs = specs_at(garden, db, date(2026, 10, 1))
    # Winter preparation (first frost NL/BE: 25 Oct) and greenhouse autumn clean.
    assert "m:winter_water:garden:2026" in specs
    assert specs["m:winter_water:garden:2026"].type is TaskType.WINTER_PREP
    assert "m:gh_autumn_clean:gh_a:2026" in specs
    assert specs["m:gh_autumn_clean:gh_a:2026"].zone_id == "gh_a"
    # Next spring is within the horizon too: plan, order seed, spring clean.
    assert "m:plan_season:garden:2027" in specs
    assert "m:gh_spring_clean:gh_a:2027" in specs
    # Shading on is long past for this season and not offered again.
    assert "m:gh_shading_on:gh_a:2026" not in specs


def test_soil_test_every_third_season(garden, db):
    keys = specs_at(garden, db, date(2026, 10, 20)).keys()
    seasons = {int(k.rsplit(":", 1)[1]) for k in keys if k.startswith("m:soil_test:")}
    assert all(s % 3 == 0 for s in seasons)


def test_maintenance_can_be_switched_off(garden, db):
    garden.settings.maintenance_tasks = False
    assert not [k for k in specs_at(garden, db, date(2026, 10, 1)) if k.startswith("m:")]


def test_soil_prep_before_planting_with_compost_amount(garden, db, make_planting):
    garden.plantings = [make_planting("tomato", "gh_bed", 2026, width_cm=260, length_cm=60)]
    specs = specs_at(garden, db, date(2026, 3, 1))
    prep = next(s for k, s in specs.items() if k.startswith("m:soil_prep:gh_bed:"))
    assert prep.type is TaskType.SOIL_PREP
    assert prep.title_params["compost"] == 13.0  # 2.6 m² x 5 kg (high demand)
    assert "13 kg" in prep.description


def test_green_manure_when_bed_falls_empty(garden, db, make_planting):
    p = make_planting("radish", "bed_1", 2026, status=PlantingStatus.SOWN, width_cm=200, length_cm=100)
    p.sown_on = date(2026, 4, 20)
    garden.plantings = [p]
    keys = specs_at(garden, db, date(2026, 7, 15)).keys()
    assert "m:green_manure:bed_1:2026" in keys
    late = specs_at(garden, db, date(2026, 10, 15)).keys()
    assert "m:cover_bed:bed_1:2026" in late


def test_perennial_herb_care_from_tags(garden, db, make_planting):
    garden.plantings = [make_planting("chives", "bed_1", 2024, status=PlantingStatus.TRANSPLANTED)]
    keys = specs_at(garden, db, date(2027, 2, 15)).keys()
    assert any(k.startswith("m:divide:") for k in keys)  # every third year: 2027


def test_maintenance_tasks_render_in_dutch(garden, db):
    from custom_components.garden_manager.engine.i18n import t

    spec = specs_at(garden, db, date(2026, 10, 1), lang="nl")["m:gh_autumn_clean:gh_a:2026"]
    assert t(spec.title_key, "nl", **spec.title_params) == "Greenhouse Zone A kuisen en ontsmetten"


def test_feed_task_has_a_dose(garden, db, make_planting):
    garden.plantings = [make_planting("tomato", "gh_bed", 2026, width_cm=200, length_cm=50)]
    specs = specs_at(garden, db, date(2026, 2, 1))
    feed = next(s for k, s in specs.items() if k.endswith(":feed"))
    assert " L " in feed.description and "ml" in feed.description


# --------------------------------------------------------------------------- #
# Autofill
# --------------------------------------------------------------------------- #
def test_crop_demand_respects_wishes_and_exclusions(db):
    res = GardenResources(household_size=4, goals=["herbs"], wanted=["tomato"], excluded=["basil"])
    demand = crop_demand(db, res, max_crops=8)
    assert demand[0].plant.id == "tomato" and demand[0].reason == "wanted"
    ids = [d.plant.id for d in demand]
    assert "basil" not in ids
    assert all(d.plant.category is PlantCategory.HERB for d in demand[1:])


def test_autoplan_fills_empty_beds_within_bounds(garden, db):
    garden.beds.append(GardenBed("bed_2", "Bed 2", "outdoor", x_cm=50, y_cm=170, width_cm=300, length_cm=120))
    garden.settings.resources = GardenResources(household_size=2, goals=["fresh", "herbs"], wanted=["tomato"])
    result = autoplan(garden, db, AutoplanOptions(season=2027), today=date(2026, 12, 1))
    assert result.plantings and result.yield_kg > 0
    bed_rects = {b.id: b for b in garden.beds}
    for p in result.plantings:
        bed = bed_rects[p.bed_id]
        assert p.x_cm >= 0 and p.x_cm + p.width_cm <= bed.width_cm
        assert p.y_cm >= 0 and p.y_cm + p.length_cm <= bed.length_cm
    # Tender tomato goes under glass, greenhouse-unsuitable crops never do.
    tomato = next(p for p in result.placements if p.plant_id == "tomato")
    assert tomato.bed_id == "gh_bed"
    for p in result.placements:
        if p.bed_id == "gh_bed":
            assert db.get(p.plant_id).greenhouse.suitability.value != "no"
    # No overlapping plantings that share time in the same bed.
    for bed in garden.beds:
        report = check_bed(bed, [p for p in result.plantings if p.bed_id == bed.id], db)
        assert not [f for f in report.pairs if f.kind == "overlap"]
    summary = result.to_dict()["summary"]
    assert summary["minutes_week"] > 0 and summary["compost_kg"] > 0


def test_autoplan_tall_crops_on_the_north_side(garden, db):
    garden.beds = [GardenBed("b", "B", "outdoor", width_cm=300, length_cm=200)]
    garden.settings.resources = GardenResources(goals=["fresh"], wanted=["runner_bean", "lettuce"])
    result = autoplan(garden, db, AutoplanOptions(season=2027, max_crops=2), today=date(2026, 12, 1))
    by_plant = {p.plant_id: p for p in result.plantings}
    assert by_plant["runner_bean"].y_cm < by_plant["lettuce"].y_cm  # canvas y grows south
    garden.settings.region.hemisphere = Hemisphere.SOUTH
    garden.settings.region.mode = "custom"
    garden.settings.region.last_frost, garden.settings.region.first_frost = "10-01", "04-30"
    south = {
        p.plant_id: p
        for p in autoplan(garden, db, AutoplanOptions(season=2027, max_crops=2), today=date(2027, 7, 1)).plantings
    }
    assert south["runner_bean"].y_cm > south["lettuce"].y_cm


def test_autoplan_avoids_rotation_conflicts(garden, db):
    garden.beds = [
        GardenBed("b1", "B1", "outdoor", width_cm=200, length_cm=100),
        GardenBed("b2", "B2", "outdoor", y_cm=150, width_cm=200, length_cm=100),
    ]
    garden.rotation_history = [RotationRecord("b1", 2026, "Solanaceae")]
    garden.settings.resources = GardenResources(goals=["fresh"], wanted=["potato"])
    result = autoplan(garden, db, AutoplanOptions(season=2027, max_crops=1), today=date(2026, 12, 1))
    assert [p.bed_id for p in result.placements] == ["b2"]


def test_autoplan_respects_time_budget(garden, db):
    garden.settings.resources = GardenResources(household_size=2, hours_per_week=0.5, goals=["fresh"])
    result = autoplan(garden, db, AutoplanOptions(season=2027), today=date(2026, 12, 1))
    assert any(s["reason"] == "time_budget" for s in result.skipped)
    assert result.minutes_week <= 30


def test_autoplan_herbs_prefer_containers(garden, db):
    garden.beds.append(GardenBed("pot", "Pot", "outdoor", kind=BedKind.CONTAINER, x_cm=300, width_cm=60, length_cm=40))
    garden.settings.resources = GardenResources(goals=["herbs"])
    result = autoplan(garden, db, AutoplanOptions(season=2027, bed_ids=["pot"]), today=date(2026, 12, 1))
    assert result.placements and all(p.bed_id == "pot" for p in result.placements)


# --------------------------------------------------------------------------- #
# Companion factors and rotation alternatives
# --------------------------------------------------------------------------- #
def pair(db, make_planting, a: str, ra: Rect, b: str, rb: Rect, **kw):
    pa = make_planting(a, x_cm=ra.x, y_cm=ra.y, width_cm=ra.w, length_cm=ra.h)
    pb = make_planting(b, x_cm=rb.x, y_cm=rb.y, width_cm=rb.w, length_cm=rb.h)
    return evaluate_pair(pa, ra, db.get(a), pb, rb, db.get(b), db, radius_cm=60, **kw)


def test_pest_deterrence_and_allelopathy(db, make_planting):
    # Chives deter carrot fly: a neutral-by-family pair still scores positively.
    findings = pair(db, make_planting, "carrot", Rect(0, 0, 30, 30), "chives", Rect(40, 0, 30, 30))
    assert any(f.score > 0 for f in findings)
    findings = pair(db, make_planting, "lettuce", Rect(0, 0, 30, 30), "wormwood", Rect(40, 0, 30, 30))
    assert any(f.kind == "allelopathy" for f in findings)


def test_tall_crop_shades_its_neighbour_on_the_sun_side(db, make_planting):
    # North hemisphere: the sun is in the south (larger y). Sunflowers south of lettuce shade it.
    south = pair(db, make_planting, "lettuce", Rect(0, 0, 60, 30), "sunflower", Rect(0, 40, 60, 30))
    assert any(f.kind == "shading" for f in south)
    north = pair(db, make_planting, "lettuce", Rect(0, 40, 60, 30), "sunflower", Rect(0, 0, 60, 30))
    assert not any(f.kind == "shading" for f in north)
    flipped = pair(
        db, make_planting, "lettuce", Rect(0, 40, 60, 30), "sunflower", Rect(0, 0, 60, 30),
        hemisphere=Hemisphere.SOUTH,
    )  # fmt: skip
    assert any(f.kind == "shading" for f in flipped)


def test_rotation_findings_suggest_alternative_beds(garden, db, make_planting):
    garden.beds.append(GardenBed("bed_2", "Bed 2", "outdoor", y_cm=200, width_cm=200, length_cm=100))
    garden.rotation_history = [RotationRecord("bed_1", 2025, "Solanaceae")]
    garden.plantings = [make_planting("potato", "bed_1", 2026)]
    analysis = analyze(garden, db, WeatherSnapshot(), {}, now=datetime(2026, 2, 1, 9, tzinfo=TZ), tz=TZ)
    (finding,) = analysis.beds["bed_1"].rotation
    assert finding.alternatives == ["bed_2"]
