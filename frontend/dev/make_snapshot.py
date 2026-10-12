"""Build a realistic websocket snapshot from the real engine for the dev harness.

Usage (from the repository root, with the test requirements installed)::

    python frontend/dev/make_snapshot.py en frontend/dev/data-en.json
    python frontend/dev/make_snapshot.py nl frontend/dev/data-nl.json

The garden is the example garden from the brief (Bed 1, Greenhouse Zone A) plus a few
extra beds, frozen on 20 May 2026 with realistic sensor readings and a rainy forecast,
so every panel view has something to show (alerts, overdue tasks, a companion conflict).
"""

from __future__ import annotations

from datetime import date, datetime, timedelta
import json
from pathlib import Path
import sys
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parents[2]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from custom_components.garden_manager.engine import handbook  # noqa: E402
from custom_components.garden_manager.engine.analysis import analyze  # noqa: E402
from custom_components.garden_manager.engine.autoplan import AutoplanOptions, autoplan  # noqa: E402
from custom_components.garden_manager.engine.irrigation import plan_irrigation  # noqa: E402
from custom_components.garden_manager.engine.models import (  # noqa: E402
    Feature,
    FeatureType,
    GardenResources,
    IrrigationEvent,
    LayoutMode,
    Planting,
    PlantingStatus,
    SensorReading,
    SowMethod,
    WeatherSnapshot,
)
from custom_components.garden_manager.engine.plantdb import (  # noqa: E402
    FAMILIES,
    PlantDatabase,
    load_builtin_json,
)
from custom_components.garden_manager.engine.printout import PrintContext, PrintOptions, render_svg  # noqa: E402
from custom_components.garden_manager.engine.serde import to_dict  # noqa: E402
from custom_components.garden_manager.engine.tasks import generate_specs, merge_tasks  # noqa: E402
from custom_components.garden_manager.engine.weather import parse_forecast  # noqa: E402
from custom_components.garden_manager.seed import build_initial_data  # noqa: E402

TZ = ZoneInfo("Europe/Amsterdam")
NOW = datetime(2026, 5, 20, 8, 30, tzinfo=TZ)
ENTRY = {
    "region": {"region_mode": "preset", "hemisphere": "north", "preset": "nl_be"},
    "weather_entity": "weather.home",
    "areas": [
        {
            "name": "Bed 1",
            "type": "outdoor",
            "width_m": 2.0,
            "length_m": 1.0,
            "soil": "loam",
            "soil_moisture": "sensor.soil_moisture_bed_1",
            "soil_temperature": "sensor.soil_temp_bed_1",
        },
        {"name": "Bed 2", "type": "outdoor", "width_m": 2.4, "length_m": 1.2, "soil": "sandy"},
        {"name": "Herb pot", "type": "container", "width_m": 0.6, "length_m": 0.6},
        {
            "name": "Greenhouse Zone A",
            "type": "greenhouse",
            "width_m": 3.0,
            "length_m": 2.0,
            "air_temperature": "sensor.greenhouse_temp",
        },
    ],
    "import_example_plan": True,
}
PROGRESS = {
    "tomato": (PlantingStatus.TRANSPLANTED, date(2026, 2, 1), date(2026, 4, 28)),
    "basil": (PlantingStatus.TRANSPLANTED, date(2026, 2, 1), date(2026, 4, 28)),
    "marigold": (PlantingStatus.TRANSPLANTED, date(2026, 2, 1), date(2026, 4, 28)),
    "onion": (PlantingStatus.TRANSPLANTED, None, date(2026, 4, 2)),
    "carrot": (PlantingStatus.SOWN, date(2026, 4, 12), None),
}


def build(lang: str) -> dict:
    db = PlantDatabase(load_builtin_json())
    data = build_initial_data(
        ENTRY, latitude=52.1, time_zone="Europe/Amsterdam", language=lang, today=NOW.date(), db=db
    )
    greenhouse_bed = next(b for b in data.beds if b.name == "Greenhouse Zone A bed")
    bed2 = next(b for b in data.beds if b.name == "Bed 2")
    data.plantings += [
        # kale right next to the tomatoes: a companion conflict to look at
        Planting("pl_kale", "kale", greenhouse_bed.id, 2026, LayoutMode.SINGLE, x_cm=210, y_cm=0,
                 width_cm=45, length_cm=45, method=SowMethod.INDOOR_SOW),
        Planting("pl_beans", "bush_bean", bed2.id, 2026, LayoutMode.ROW, x_cm=0, y_cm=10, width_cm=240, length_cm=45),
        Planting("pl_courgette", "courgette", bed2.id, 2026, LayoutMode.SINGLE, x_cm=60, y_cm=60, width_cm=90,
                 length_cm=60, method=SowMethod.INDOOR_SOW, status=PlantingStatus.TRANSPLANTED,
                 transplanted_on=NOW.date() - timedelta(days=5)),
    ]  # fmt: skip
    for planting in data.plantings:
        if planting.plant_id in PROGRESS:
            planting.status, planting.sown_on, planting.transplanted_on = PROGRESS[planting.plant_id]
        elif planting.plant_id == "lettuce" and planting.succession_index == 0:
            planting.status, planting.sown_on = PlantingStatus.SOWN, date(2026, 4, 1)
    data.features = [
        Feature(
            "ft_path",
            "Path" if lang == "en" else "Pad",
            FeatureType.PATH,
            x_cm=-20,
            y_cm=-90,
            width_cm=900,
            length_cm=60,
        ),
        Feature(
            "ft_butt",
            "Water butt" if lang == "en" else "Regenton",
            FeatureType.WATER_BUTT,
            x_cm=-110,
            y_cm=0,
            width_cm=60,
            length_cm=60,
        ),
        Feature("ft_compost", "Compost", FeatureType.COMPOST, x_cm=-140, y_cm=120, width_cm=100, length_cm=100),
    ]
    data.settings.resources = GardenResources(
        household_size=3, hours_per_week=4, goals=["fresh", "herbs", "storage"], wanted=["tomato"]
    )
    data.settings.irrigation.pump_entity = "switch.garden_pump"
    bed1 = next(b for b in data.beds if b.name == "Bed 1")
    bed1.irrigation_entity, bed1.irrigation_flow_lpm = "switch.valve_bed_1", 4.0
    data.irrigation_log = [IrrigationEvent(bed1.id, NOW - timedelta(days=1, hours=2), 6.0, 12.0, 3.0, "auto")]
    data.revision = 7

    raw = json.loads((ROOT / "tests/fixtures/forecast_hourly_rain.json").read_text())["weather.home"]["forecast"]
    hourly = parse_forecast(raw)
    shift = NOW - hourly[0].at
    for point in hourly:
        point.at += shift
    weather = WeatherSnapshot(available=True, fetched_at=NOW, temperature=14.0, condition="partlycloudy", hourly=hourly)
    readings = {
        "sensor.soil_moisture_bed_1": SensorReading("sensor.soil_moisture_bed_1", 21.0, NOW),
        "sensor.soil_temp_bed_1": SensorReading("sensor.soil_temp_bed_1", 13.4, NOW),
        "sensor.greenhouse_temp": SensorReading("sensor.greenhouse_temp", 29.5, NOW),
    }
    analysis = analyze(data, db, weather, readings, now=NOW, tz=TZ, latitude=52.1, lang=lang)
    data.tasks = merge_tasks(
        [], generate_specs(analysis.task_context(data, db)), today=analysis.today, now=NOW, lang=lang
    ).tasks
    snapshot = {
        "revision": data.revision,
        "lang": lang,
        "settings": to_dict(data.settings),
        "zones": [to_dict(z) for z in data.zones],
        "beds": [to_dict(b) for b in data.beds],
        "plantings": [to_dict(p) for p in data.plantings],
        "tasks": [to_dict(t) for t in data.tasks],
        "rotation_history": [],
        "features": [to_dict(f) for f in data.features],
        "irrigation_log": [to_dict(e) for e in data.irrigation_log],
        "irrigation_status": {"running": False, "bed_id": None, "ends_at": None, "last_error": None},
        "analysis": analysis.to_dict(),
        "weather": {
            "available": True,
            "temperature": 14.0,
            "condition": "partlycloudy",
            "fetched_at": NOW.isoformat(),
            "daily": [],
            "hourly": [to_dict(p) for p in hourly[:48]],
            "error": None,
        },
    }
    # Canned answers for the other websocket commands, produced by the real engine.
    chapters = handbook.chapters(lang)
    ctx = PrintContext(data, db, analysis.timelines, analysis.today, "Hortulus")
    proposal = autoplan(data, db, AutoplanOptions(season=2027, replace=True, lang=lang), today=analysis.today)
    irrigation = plan_irrigation(
        data, {k: b.irrigation for k, b in analysis.beds.items()}, now=NOW,
        frost_by_zone={k: z.frost for k, z in analysis.zones.items()}, outdoor_frost=analysis.frost, outdoor_temp=14.0, force=True,
    )  # fmt: skip
    extras = {
        "handbook_index": {"chapters": [c.meta() for c in chapters], "glossary": handbook.glossary(lang)},
        "handbook_chapters": {c.id: {**c.meta(), "body": c.body} for c in chapters},
        "print_pages": render_svg(
            ctx, PrintOptions(document="garden", page="remarkable", color_mode="eink", lang=lang)
        ),
        "autofill": {**proposal.to_dict(), "season": 2027, "revision": data.revision},
        "irrigation_plan": {**irrigation.to_dict(), "reasons": {}, "running": False},
    }
    return {
        "snapshot": snapshot,
        "plants": {"plants": db.as_dicts(), "families": FAMILIES, "overrides": {}},
        "extras": extras,
    }


if __name__ == "__main__":
    language = sys.argv[1] if len(sys.argv) > 1 else "en"
    target = Path(sys.argv[2]) if len(sys.argv) > 2 else Path(__file__).parent / f"data-{language}.json"
    target.write_text(json.dumps(build(language)), encoding="utf-8")
    print(f"wrote {target}")
