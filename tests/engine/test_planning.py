"""Seeds to buy, what follows a crop, expected harvests."""

from __future__ import annotations

from datetime import date

from custom_components.garden_manager.engine import planning
from custom_components.garden_manager.engine.models import PlantingStatus, SeedPacket, SowMethod
from custom_components.garden_manager.engine.region import season_anchors
from custom_components.garden_manager.engine.schedule import planting_timeline


def _timelines(garden, db, season, today):
    anchors = season_anchors(garden.settings.region, season)
    out = {}
    for p in garden.plantings:
        bed = garden.bed(p.bed_id)
        out[p.id] = planting_timeline(p, db.get(p.plant_id), anchors, garden.zone(bed.zone_id) if bed else None, today)
    return out


def test_seed_needs_count_plants_with_a_margin_against_the_stock(garden, db, make_planting):
    garden.layout_season = 2026
    carrots = make_planting("carrot", "bed_1", 2026, id="c", method=SowMethod.DIRECT_SOW, count=40)
    lettuce = make_planting("lettuce", "bed_1", 2026, id="l", method=SowMethod.INDOOR_SOW, count=10)
    bought = make_planting("tomato", "gh_bed", 2026, id="t", method=SowMethod.TRANSPLANT, count=4)
    done = make_planting("radish", "bed_1", 2026, id="r", count=20, status=PlantingStatus.SOWN)
    garden.plantings = [carrots, lettuce, bought, done]
    garden.seed_stock = [SeedPacket("s1", "carrot", year=2025, quantity=500, unit="seeds")]
    needs = {n.plant_id: n for n in planning.seed_needs(garden, db, 2026)}
    assert set(needs) == {"carrot", "lettuce"}  # bought plants and sown crops need no seed
    assert needs["carrot"].seeds == 80 and needs["carrot"].status == "ok"
    assert needs["lettuce"].seeds == 13 and needs["lettuce"].status == "none"


def test_successions_follow_early_crops_without_repeating_the_family(garden, db, make_planting):
    garden.layout_season = 2026
    radish = make_planting("radish", "bed_1", 2026, id="r", width_cm=100, length_cm=30)
    garden.plantings = [radish]
    today = date(2026, 4, 1)
    tl = _timelines(garden, db, 2026, today)
    beds = planning.successions(garden, db, 2026, tl, today=today, first_frost=date(2026, 10, 25), lang="nl")
    assert beds and beds[0].bed_id == "bed_1" and beds[0].leaving == ["radish"]
    radish_family = db.get("radish").family
    assert beds[0].options and all(db.get(o["plant_id"]).family != radish_family for o in beds[0].options)


def test_harvest_forecast_spreads_the_yield_over_the_harvest_weeks(garden, db, make_planting):
    garden.layout_season = 2026
    lettuce = make_planting("lettuce", "bed_1", 2026, id="l", width_cm=100, length_cm=100)
    garden.plantings = [lettuce]
    tl = _timelines(garden, db, 2026, date(2026, 3, 1))
    fc = planning.harvest_forecast(garden, db, 2026, tl)
    total = sum(w["kg"] for w in fc["weeks"])
    assert abs(total - db.get("lettuce").yield_kg_m2) < 0.1
    assert all(date.fromisoformat(w["week"]).weekday() == 0 for w in fc["weeks"])
