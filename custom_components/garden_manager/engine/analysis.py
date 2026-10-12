"""One pure function that turns plan + plants + sensors + forecast into insight.

``analyze`` is called by the coordinator on every refresh (forecast update or
debounced sensor change).  It is O(plantings^2 per bed) which is negligible
for garden-sized data, and it never performs I/O.
"""

from __future__ import annotations

from collections.abc import Mapping
from dataclasses import dataclass, field
from datetime import date, datetime, timedelta, tzinfo
from typing import Any

from .compatibility import (
    CompatibilityReport,
    RotationFinding,
    check_bed,
    check_rotation,
    rotation_history,
)
from .models import (
    GardenData,
    GreenhouseAction,
    MoistureStatus,
    Plant,
    RiskLevel,
    SensorMapping,
    SensorReading,
    SensorSnapshot,
    WeatherSnapshot,
)
from .plantdb import PlantDatabase
from .region import SeasonAnchors, season_anchors, season_for_date
from .schedule import PlantingTimeline, TimingAdvice, planting_timeline, timing_advice
from .serde import to_dict
from .tasks import TaskContext, is_active
from .watering import IrrigationRecommendation, recommend_irrigation
from .weather import (
    DailyOutlook,
    FrostAssessment,
    GreenhouseAdvice,
    accumulate_gdd,
    daily_outlook,
    frost_for_zone,
    greenhouse_advice,
)

DEFAULT_LATITUDE = 52.0


@dataclass(slots=True)
class Alert:
    key: str
    kind: str
    severity: str  # info | warning | critical
    message_key: str
    params: dict[str, Any] = field(default_factory=dict)
    zone_id: str | None = None
    bed_id: str | None = None


@dataclass(slots=True)
class BedAnalysis:
    bed_id: str
    sensors: SensorSnapshot
    irrigation: IrrigationRecommendation
    active_plantings: list[str]
    compatibility: CompatibilityReport
    rotation: list[RotationFinding]

    @property
    def moisture_status(self) -> MoistureStatus:
        return self.irrigation.status


@dataclass(slots=True)
class ZoneAnalysis:
    zone_id: str
    frost: FrostAssessment
    greenhouse: GreenhouseAdvice | None
    air_temperature: float | None


@dataclass(slots=True)
class GddSummary:
    season_total: float
    base_c: float
    days_counted: int
    since: date


@dataclass(slots=True)
class GardenAnalysis:
    computed_at: datetime
    today: date
    season: int
    lang: str
    anchors: SeasonAnchors
    frost: FrostAssessment
    beds: dict[str, BedAnalysis]
    zones: dict[str, ZoneAnalysis]
    timelines: dict[str, PlantingTimeline]
    advice: dict[str, TimingAdvice]
    outlook: list[DailyOutlook]
    gdd: GddSummary
    alerts: list[Alert]
    weather_available: bool

    def task_context(self, data: GardenData, db: PlantDatabase) -> TaskContext:
        return TaskContext(
            data=data,
            db=db,
            today=self.today,
            lang=self.lang,
            timelines=self.timelines,
            advice=self.advice,
            irrigation={k: b.irrigation for k, b in self.beds.items()},
            frost_by_zone={k: z.frost for k, z in self.zones.items()},
            greenhouse={k: z.greenhouse for k, z in self.zones.items() if z.greenhouse},
        )

    def to_dict(self) -> dict[str, Any]:
        """JSON for the websocket API / diagnostics."""
        return {
            "computed_at": self.computed_at.isoformat(),
            "today": self.today.isoformat(),
            "season": self.season,
            "anchors": {
                "last_frost": self.anchors.last_frost.isoformat(),
                "first_frost": self.anchors.first_frost.isoformat(),
                "frost_free": self.anchors.frost_free,
            },
            "frost": to_dict(self.frost),
            "beds": {
                k: {
                    "sensors": to_dict(b.sensors),
                    "moisture_status": b.moisture_status.value,
                    "irrigation": b.irrigation.to_dict(),
                    "active_plantings": b.active_plantings,
                    "compatibility": b.compatibility.to_dict(),
                    "rotation": [r.to_dict() for r in b.rotation],
                }
                for k, b in self.beds.items()
            },
            "zones": {
                k: {
                    "frost": to_dict(z.frost),
                    "greenhouse": to_dict(z.greenhouse) if z.greenhouse else None,
                    "air_temperature": z.air_temperature,
                }
                for k, z in self.zones.items()
            },
            "timelines": {k: v.to_dict() for k, v in self.timelines.items()},
            "advice": {k: v.to_dict() for k, v in self.advice.items()},
            "outlook": [to_dict(o) for o in self.outlook],
            "gdd": to_dict(self.gdd),
            "alerts": [to_dict(a) for a in self.alerts],
            "weather_available": self.weather_available,
        }


def resolve_readings(mapping: SensorMapping, readings: Mapping[str, SensorReading]) -> SensorSnapshot:
    def get(entity_id: str | None) -> SensorReading | None:
        return readings.get(entity_id) if entity_id else None

    return SensorSnapshot(
        soil_moisture=get(mapping.soil_moisture),
        soil_temperature=get(mapping.soil_temperature),
        air_temperature=get(mapping.air_temperature),
        air_humidity=get(mapping.air_humidity),
        light=get(mapping.light),
        rain=get(mapping.rain),
    )


def analyze(
    data: GardenData,
    db: PlantDatabase,
    weather: WeatherSnapshot,
    readings: Mapping[str, SensorReading],
    *,
    now: datetime,
    tz: tzinfo,
    latitude: float | None = None,
    lang: str = "en",
) -> GardenAnalysis:
    region = data.settings.region
    today = now.astimezone(tz).date()
    season = season_for_date(region, today)
    anchors_cache: dict[int, SeasonAnchors] = {}

    def anchors(s: int) -> SeasonAnchors:
        if s not in anchors_cache:
            anchors_cache[s] = season_anchors(region, s)
        return anchors_cache[s]

    latitude = latitude if latitude is not None else (region.latitude or DEFAULT_LATITUDE)
    outlook = daily_outlook(weather, now, tz, latitude) if weather.available else []

    outdoor = resolve_readings(data.settings.outdoor_sensors, readings)
    outdoor_temp = SensorSnapshot.value(outdoor.air_temperature)
    if outdoor_temp is None and weather.available:
        outdoor_temp = weather.temperature
    outdoor_frost = frost_for_zone(weather, None, now, tz, outdoor_temp)

    # -- timelines ----------------------------------------------------------- #
    timelines: dict[str, PlantingTimeline] = {}
    plants: dict[str, Plant] = {}
    for p in data.plantings:
        plant = db.get(p.plant_id)
        bed = data.bed(p.bed_id)
        if plant is None or bed is None:
            continue
        plants[p.id] = plant
        timelines[p.id] = planting_timeline(p, plant, anchors(p.season), data.zone(bed.zone_id), today)

    # -- zones --------------------------------------------------------------- #
    zones: dict[str, ZoneAnalysis] = {}
    for zone in data.zones:
        snap = resolve_readings(zone.sensors, readings)
        air = SensorSnapshot.value(snap.air_temperature)
        frost = frost_for_zone(weather, zone, now, tz, outdoor_temp) if zone.is_enclosed else outdoor_frost
        if not zone.is_enclosed and zone.microclimate.wind.value != "moderate":
            frost = frost_for_zone(weather, zone, now, tz, outdoor_temp)
        gh: GreenhouseAdvice | None = None
        if zone.is_enclosed:
            crops = [
                (plants[p.id].name(lang), plants[p.id].greenhouse.min_night_c, plants[p.id].greenhouse.max_day_c)
                for p in data.plantings
                if p.id in plants
                and (bed := data.bed(p.bed_id)) is not None
                and bed.zone_id == zone.id
                and is_active(p, timelines.get(p.id), today)
            ]
            gh = greenhouse_advice(zone, weather, now, air, crops)
        zones[zone.id] = ZoneAnalysis(zone.id, frost, gh, air)

    # -- beds ---------------------------------------------------------------- #
    history = rotation_history(data.rotation_history, data.plantings, db)
    beds: dict[str, BedAnalysis] = {}
    advice: dict[str, TimingAdvice] = {}
    stale_alerts: list[Alert] = []
    for bed in data.beds:
        mapping = data.bed_sensors(bed)
        snap = resolve_readings(mapping, readings)
        for reading in (snap.soil_moisture, snap.soil_temperature, snap.air_temperature):
            if reading is not None and reading.stale:
                stale_alerts.append(
                    Alert(
                        f"stale:{reading.entity_id}",
                        "sensor_stale",
                        "warning",
                        "alert.sensor_stale",
                        {"entity": reading.entity_id},
                        bed_id=bed.id,
                    )
                )
        zone = data.zone(bed.zone_id)
        in_bed = [p for p in data.plantings if p.bed_id == bed.id and p.id in plants]
        active = [p for p in in_bed if is_active(p, timelines.get(p.id), today)]
        irrigation = recommend_irrigation(
            bed,
            zone,
            SensorSnapshot.value(snap.soil_moisture),
            [plants[p.id].water_needs for p in active],
            outlook,
            root_zone_depth_mm=data.settings.root_zone_depth_mm,
            max_irrigation_mm=data.settings.max_irrigation_mm,
        )
        relevant = [p for p in in_bed if abs(p.season - season) <= 1]
        report = check_bed(
            bed,
            relevant,
            db,
            timelines={p.id: timelines[p.id].occupancy for p in relevant if p.id in timelines},
            radius_cm=data.settings.companion_radius_cm,
            lang=lang,
        )
        if zone is not None and zone.is_enclosed:
            for p in relevant:
                if plants[p.id].greenhouse.suitability.value == "no":
                    report.placement.append(
                        {
                            "planting": p.id,
                            "severity": "warning",
                            "key": "reason.not_greenhouse_suitable",
                            "params": {"plant": plants[p.id].name(lang)},
                        }
                    )
        rotation: list[RotationFinding] = []
        for p in in_bed:
            if p.season >= season:
                rotation.extend(check_rotation(p, bed, history, db, lang=lang))
        beds[bed.id] = BedAnalysis(bed.id, snap, irrigation, [p.id for p in active], report, rotation)

        zone_frost = zones[bed.zone_id].frost if bed.zone_id in zones else outdoor_frost
        soil_t = SensorSnapshot.value(snap.soil_temperature)
        for p in in_bed:
            if p.id in timelines:
                advice[p.id] = timing_advice(
                    plants[p.id],
                    p,
                    timelines[p.id],
                    today,
                    soil_temp=soil_t,
                    frost=zone_frost,
                    lang_name=plants[p.id].name(lang),
                )

    # -- GDD ----------------------------------------------------------------- #
    base = data.settings.gdd_base_c
    since = anchors(season).last_frost - timedelta(days=30)
    gdd_total, gdd_days = accumulate_gdd(data.climate_log, since, today, base)
    gdd = GddSummary(gdd_total, base, gdd_days, since)

    # -- alerts -------------------------------------------------------------- #
    alerts: list[Alert] = []
    if data.settings.weather_entity and not weather.available:
        alerts.append(Alert("forecast_unavailable", "forecast", "info", "alert.forecast_unavailable"))
    for zone_id, za in [("outdoor", ZoneAnalysis("outdoor", outdoor_frost, None, outdoor_temp)), *zones.items()]:
        f = za.frost
        if f.level not in (RiskLevel.MODERATE, RiskLevel.HIGH) or f.plant_level_min_c is None:
            continue
        sensitive = [
            plants[p.id].name(lang)
            for p in data.plantings
            if p.id in plants
            and is_active(p, timelines.get(p.id), today)
            and (bed := data.bed(p.bed_id)) is not None
            and (
                bed.zone_id == zone_id or (zone_id == "outdoor" and not (data.zone(bed.zone_id) or _NoZone).is_enclosed)
            )
            and f.plant_level_min_c < plants[p.id].min_temp_c + 1.0
        ]
        if sensitive or (zone_id == "outdoor" and f.level is RiskLevel.HIGH):
            local_min = f.min_at.astimezone(tz) if f.min_at else None
            when = "when.tonight"
            if (
                local_min
                and local_min.date() > today
                and not (local_min.date() == today + timedelta(days=1) and local_min.hour < 10)
            ):
                when = "when.tomorrow_night"
            alerts.append(
                Alert(
                    f"frost:{zone_id}:{(f.min_at or now).astimezone(tz).date().isoformat()}",
                    "frost",
                    "critical" if f.level is RiskLevel.HIGH else "warning",
                    "alert.frost",
                    {
                        "level": f.level.value,
                        "temp": f.plant_level_min_c,
                        "when": when,
                        "plants": sorted(set(sensitive)),
                    },
                    zone_id=None if zone_id == "outdoor" else zone_id,
                )
            )
    for zone in data.zones:
        za = zones[zone.id]
        if za.greenhouse and za.greenhouse.action in (GreenhouseAction.SHADE, GreenhouseAction.VENTILATE):
            temp = (
                za.greenhouse.inside_now_c if za.greenhouse.inside_now_c is not None else za.greenhouse.forecast_max_c
            )
            alerts.append(
                Alert(
                    f"heat:{zone.id}:{today.isoformat()}",
                    "heat",
                    "critical" if za.greenhouse.action is GreenhouseAction.SHADE else "warning",
                    "alert.heat",
                    {"zone": zone.name, "temp": temp, "action": za.greenhouse.action.value},
                    zone_id=zone.id,
                )
            )
    for bed in data.beds:
        ba = beds[bed.id]
        if ba.moisture_status is MoistureStatus.DRY and ba.active_plantings:
            alerts.append(
                Alert(
                    f"dry:{bed.id}:{today.isoformat()}",
                    "dry",
                    "warning",
                    "alert.dry",
                    {"bed": bed.name, "moisture": ba.irrigation.moisture},
                    bed_id=bed.id,
                )
            )
    alerts.extend(stale_alerts)
    order = {"critical": 0, "warning": 1, "info": 2}
    alerts.sort(key=lambda a: order.get(a.severity, 3))

    return GardenAnalysis(
        computed_at=now,
        today=today,
        season=season,
        lang=lang,
        anchors=anchors(season),
        frost=outdoor_frost,
        beds=beds,
        zones=zones,
        timelines=timelines,
        advice=advice,
        outlook=outlook,
        gdd=gdd,
        alerts=alerts,
        weather_available=weather.available,
    )


class _NoZone:
    is_enclosed = False
