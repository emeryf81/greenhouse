"""Ecological gardening and permaculture: organic tips, eco calendar, food forest."""

from __future__ import annotations

from dataclasses import replace
from datetime import date, datetime
from zoneinfo import ZoneInfo

from custom_components.garden_manager.engine.advisor import advise
from custom_components.garden_manager.engine.analysis import analyze
from custom_components.garden_manager.engine.eco import LAYERS, food_forest_layers, forest_layer
from custom_components.garden_manager.engine.models import ClimateDay, PlantingStatus, WeatherSnapshot, ZoneType
from custom_components.garden_manager.engine.pests import pest_warnings
from custom_components.garden_manager.engine.tasks import generate_specs

TZ = ZoneInfo("Europe/Amsterdam")
NOW = datetime(2026, 5, 20, 8, tzinfo=TZ)


def _analysis(garden, db, lang="nl"):
    return analyze(garden, db, WeatherSnapshot(), {}, now=NOW, tz=TZ, lang=lang)


def test_pest_advice_carries_an_organic_tip_unless_switched_off(garden, db, make_planting):
    garden.plantings = [make_planting("carrot", "bed_1", 2026, status=PlantingStatus.SOWN)]
    garden.climate_log = [ClimateDay(date(2026, 1, 1).fromordinal(date(2026, 1, 1).toordinal() + i), tmin=2.0,
                                     tmax=12.0, rain_mm=0.0) for i in range(140)]  # fmt: skip
    tl = _analysis(garden, db).timelines
    fly = next(w for w in pest_warnings(garden, db, tl, date(2026, 5, 20), [], lang="nl") if w.pest == "carrot_fly")
    assert "Biologisch:" in fly.advice and "uien" in fly.advice
    garden.settings.eco_tips = False
    fly = next(w for w in pest_warnings(garden, db, tl, date(2026, 5, 20), [], lang="nl") if w.pest == "carrot_fly")
    assert "Biologisch:" not in fly.advice


def test_eco_calendar_follows_the_setting(garden, db):
    keys = {s.key.split(":")[1] for s in generate_specs(_analysis(garden, db).task_context(garden, db))
            if s.key.startswith("m:")}  # fmt: skip
    assert {"eco_horsetail", "eco_no_dig", "eco_flower_strip"} & keys
    garden.settings.eco_tips = False
    keys = {s.key for s in generate_specs(_analysis(garden, db).task_context(garden, db))}
    assert not any(":eco_" in k for k in keys)


def test_forest_layers_from_plant_shape(db):
    layers = {forest_layer(p) for p in db.all()}
    assert set(LAYERS) - {"climber"} <= layers
    assert forest_layer(db.get("apple")) in ("canopy", "sub_canopy")
    assert forest_layer(db.get("tomato")) is None


def test_food_forest_zone_reports_missing_layers(garden, db, make_planting):
    garden.zones[0] = replace(garden.zones[0], type=ZoneType.FOOD_FOREST)
    garden.plantings = [
        make_planting("apple", "bed_1", 2024, id="apple", status=PlantingStatus.TRANSPLANTED, last_season=2030)
    ]
    (ff,) = food_forest_layers(garden, db, 2026)
    assert ff.zone_id == garden.zones[0].id and "ground" in ff.missing and ff.suggestions["ground"]
    sugg = {s.id.split(":")[0] for s in advise(garden, db, _analysis(garden, db), "nl")}
    assert {"food_forest", "eco_month"} <= sugg
    garden.settings.eco_tips = False
    sugg = {s.id.split(":")[0] for s in advise(garden, db, _analysis(garden, db), "nl")}
    assert not {"food_forest", "eco_month"} & sugg
