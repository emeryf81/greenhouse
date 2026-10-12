"""Build the first garden document from the config-flow answers."""

from __future__ import annotations

from datetime import date, timedelta
from typing import Any
import uuid

from .const import (
    AREA_CONTAINER,
    AREA_GREENHOUSE,
    CONF_AIR_TEMP,
    CONF_AREA_NAME,
    CONF_AREA_TYPE,
    CONF_AREAS,
    CONF_DIGEST_TIME,
    CONF_FIRST_FROST,
    CONF_FLOW_LPM,
    CONF_HARDINESS_ZONE,
    CONF_HEMISPHERE,
    CONF_HUMIDITY,
    CONF_IMPORT_EXAMPLE,
    CONF_IRRIGATION,
    CONF_LAST_FROST,
    CONF_LENGTH_M,
    CONF_LIGHT,
    CONF_MOISTURE,
    CONF_NOTIFY_SERVICES,
    CONF_OUTDOOR_TEMP,
    CONF_PERSISTENT,
    CONF_PRESET,
    CONF_RAIN_SENSOR,
    CONF_REGION,
    CONF_REGION_MODE,
    CONF_SHADE,
    CONF_SOIL,
    CONF_SOIL_TEMP,
    CONF_TTS_ENTITY,
    CONF_TTS_PLAYERS,
    CONF_WEATHER_ENTITY,
    CONF_WIDTH_M,
    CONF_WIND,
)
from .engine.models import (
    BedKind,
    GardenBed,
    GardenData,
    Hemisphere,
    LayoutMode,
    Microclimate,
    NotificationSettings,
    Planting,
    RegionProfile,
    SensorMapping,
    SoilType,
    SowMethod,
    WindExposure,
    Zone,
    ZoneType,
)
from .engine.plantdb import PlantDatabase
from .engine.region import season_anchors, season_for_date
from .engine.succession import expand_succession

GAP_CM = 50
MARGIN_CM = 50


def _id(prefix: str) -> str:
    return f"{prefix}_{uuid.uuid4().hex[:8]}"


def region_from_conf(conf: dict[str, Any], latitude: float | None, time_zone: str | None) -> RegionProfile:
    return RegionProfile(
        hemisphere=Hemisphere(conf.get(CONF_HEMISPHERE, "north")),
        mode=conf.get(CONF_REGION_MODE, "preset"),
        hardiness_zone=conf.get(CONF_HARDINESS_ZONE),
        preset=conf.get(CONF_PRESET),
        last_frost=conf.get(CONF_LAST_FROST) or "04-20",
        first_frost=conf.get(CONF_FIRST_FROST) or "10-25",
        latitude=latitude,
        time_zone=time_zone,
    )


def notifications_from_conf(conf: dict[str, Any]) -> NotificationSettings:
    return NotificationSettings(
        persistent=conf.get(CONF_PERSISTENT, True),
        notify_services=list(conf.get(CONF_NOTIFY_SERVICES) or []),
        tts_entity=conf.get(CONF_TTS_ENTITY) or None,
        tts_media_players=list(conf.get(CONF_TTS_PLAYERS) or []),
        digest_time=(conf.get(CONF_DIGEST_TIME) or "07:30")[:5],
    )


def build_initial_data(
    entry_data: dict[str, Any],
    *,
    latitude: float | None,
    time_zone: str | None,
    language: str,
    today: date,
    db: PlantDatabase | None = None,
) -> GardenData:
    data = GardenData()
    settings = data.settings
    settings.region = region_from_conf(entry_data.get(CONF_REGION, {}), latitude, time_zone)
    settings.weather_entity = entry_data.get(CONF_WEATHER_ENTITY)
    settings.outdoor_sensors = SensorMapping(
        air_temperature=entry_data.get(CONF_OUTDOOR_TEMP) or None,
        rain=entry_data.get(CONF_RAIN_SENSOR) or None,
    )
    settings.notifications = notifications_from_conf(entry_data.get("notifications", {}))

    areas: list[dict[str, Any]] = list(entry_data.get(CONF_AREAS, []))
    outdoor_areas = [a for a in areas if a.get(CONF_AREA_TYPE) != AREA_GREENHOUSE]
    greenhouse_areas = [a for a in areas if a.get(CONF_AREA_TYPE) == AREA_GREENHOUSE]

    cursor_x = 0.0
    if outdoor_areas or not areas:
        outdoor = Zone(id="zone_outdoor", name="Tuin" if language == "nl" else "Garden", type=ZoneType.OUTDOOR)
        data.zones.append(outdoor)
        x = MARGIN_CM
        tallest = 0.0
        for area in outdoor_areas:
            width = float(area.get(CONF_WIDTH_M, 2)) * 100
            length = float(area.get(CONF_LENGTH_M, 1)) * 100
            data.beds.append(
                GardenBed(
                    id=_id("bed"),
                    name=area[CONF_AREA_NAME],
                    zone_id=outdoor.id,
                    kind=BedKind.CONTAINER if area.get(CONF_AREA_TYPE) == AREA_CONTAINER else BedKind.RAISED,
                    x_cm=x,
                    y_cm=MARGIN_CM,
                    width_cm=width,
                    length_cm=length,
                    soil=SoilType(
                        area.get(CONF_SOIL, "potting_mix" if area.get(CONF_AREA_TYPE) == AREA_CONTAINER else "loam")
                    ),
                    shade_pct=int(area.get(CONF_SHADE, 0)) or None,
                    sensors=_sensors(area),
                    irrigation_entity=area.get(CONF_IRRIGATION) or None,
                    irrigation_flow_lpm=area.get(CONF_FLOW_LPM) or None,
                )
            )
            outdoor.microclimate.wind = WindExposure(area.get(CONF_WIND, outdoor.microclimate.wind.value))
            x += width + GAP_CM
            tallest = max(tallest, length)
        outdoor.width_cm = max(400.0, x - GAP_CM + MARGIN_CM)
        outdoor.length_cm = max(300.0, tallest + 2 * MARGIN_CM)
        cursor_x = outdoor.width_cm + 100

    for area in greenhouse_areas:
        width = float(area.get(CONF_WIDTH_M, 3)) * 100
        length = float(area.get(CONF_LENGTH_M, 2)) * 100
        zone = Zone(
            id=_id("zone"),
            name=area[CONF_AREA_NAME],
            type=ZoneType.GREENHOUSE,
            x_cm=cursor_x,
            y_cm=0,
            width_cm=width,
            length_cm=length,
            microclimate=Microclimate(shade_pct=int(area.get(CONF_SHADE, 0))),
            sensors=SensorMapping(
                air_temperature=area.get(CONF_AIR_TEMP) or None,
                air_humidity=area.get(CONF_HUMIDITY) or None,
                light=area.get(CONF_LIGHT) or None,
            ),
        )
        data.zones.append(zone)
        # A border along the long side with a 60 cm path, the typical layout.
        path = 60 if length >= 180 else 0
        data.beds.append(
            GardenBed(
                id=_id("bed"),
                name=area[CONF_AREA_NAME],
                zone_id=zone.id,
                kind=BedKind.IN_GROUND,
                x_cm=cursor_x + 20,
                y_cm=20,
                width_cm=width - 40,
                length_cm=length - 40 - path,
                soil=SoilType(area.get(CONF_SOIL, "loam")),
                sensors=SensorMapping(
                    soil_moisture=area.get(CONF_MOISTURE) or None,
                    soil_temperature=area.get(CONF_SOIL_TEMP) or None,
                ),
                irrigation_entity=area.get(CONF_IRRIGATION) or None,
                irrigation_flow_lpm=area.get(CONF_FLOW_LPM) or None,
            )
        )
        cursor_x += width + 100

    if entry_data.get(CONF_IMPORT_EXAMPLE) and db is not None:
        add_example_plan(data, db, today)
    return data


def _sensors(area: dict[str, Any]) -> SensorMapping:
    return SensorMapping(
        soil_moisture=area.get(CONF_MOISTURE) or None,
        soil_temperature=area.get(CONF_SOIL_TEMP) or None,
        air_temperature=area.get(CONF_AIR_TEMP) or None,
        air_humidity=area.get(CONF_HUMIDITY) or None,
        light=area.get(CONF_LIGHT) or None,
    )


def add_example_plan(data: GardenData, db: PlantDatabase, today: date) -> None:
    """A small, companion-friendly starter plan for the upcoming season."""
    region = data.settings.region
    season = season_for_date(region, today)
    anchors = season_anchors(region, season)
    if today > anchors.last_frost + timedelta(days=30):
        season += 1
        anchors = season_anchors(region, season)

    def planting(
        plant_id: str, bed: GardenBed, x: float, y: float, w: float, h: float, layout: LayoutMode, method: SowMethod
    ) -> Planting:
        return Planting(
            id=_id("pl"),
            plant_id=plant_id,
            bed_id=bed.id,
            season=season,
            layout=layout,
            x_cm=round(min(x, bed.width_cm - w), 1),
            y_cm=round(min(y, bed.length_cm - h), 1),
            width_cm=min(w, bed.width_cm),
            length_cm=min(h, bed.length_cm),
            method=method,
        )

    for bed in data.beds:
        zone = data.zone(bed.zone_id)
        if zone and zone.type is ZoneType.GREENHOUSE and bed.width_cm >= 120:
            data.plantings += [
                planting("tomato", bed, 0, 0, min(200, bed.width_cm - 50), 50, LayoutMode.ROW, SowMethod.INDOOR_SOW),
                planting("basil", bed, 0, 60, 50, 50, LayoutMode.BLOCK, SowMethod.INDOOR_SOW),
                planting("marigold", bed, 60, 60, 50, 50, LayoutMode.BLOCK, SowMethod.INDOOR_SOW),
            ]
        elif zone and zone.type is ZoneType.OUTDOOR and bed.kind is not BedKind.CONTAINER and bed.width_cm >= 150:
            data.plantings += [
                planting("carrot", bed, 0, 0, bed.width_cm, 25, LayoutMode.ROW, SowMethod.DIRECT_SOW),
                planting("onion", bed, 0, 30, bed.width_cm, 25, LayoutMode.ROW, SowMethod.TRANSPLANT),
            ]
            if bed.length_cm >= 90 and (lettuce := db.get("lettuce")) is not None:
                base = planting(
                    "lettuce", bed, 0, 60, min(bed.width_cm, 150), 30, LayoutMode.BLOCK, SowMethod.DIRECT_SOW
                )
                series, _ = expand_succession(base, lettuce, anchors, zone, count=3)
                data.plantings += series
