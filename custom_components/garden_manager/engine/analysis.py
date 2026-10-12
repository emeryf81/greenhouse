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
    suggest_beds,
)
from .fertilizer import NutrientBalance, nutrient_balance
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
    present_in,
)
from .phenology import PhenologyInfo, phenology, stage_kc
from .plantdb import PlantDatabase
from .region import SeasonAnchors, resolve_profile, season_anchors, season_bounds, season_for_date
from .schedule import PlantingTimeline, TimingAdvice, planting_timeline, season_timeline, timing_advice
from .serde import to_dict
from .tasks import TaskContext, is_active
from .waterbalance import bed_irrigation_mm
from .watering import IrrigationRecommendation, recommend_irrigation, total_available_water
from .weather import (
    DailyOutlook,
    DiseaseAssessment,
    FrostAssessment,
    GreenhouseAdvice,
    accumulate_gdd,
    assess_disease,
    daily_outlook,
    frost_for_zone,
    gdd_for_day,
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
    kc: float = 0.0
    nutrients: NutrientBalance = field(default_factory=lambda: NutrientBalance(None, "unknown"))
    taw_mm: float | None = None
    depletion_mm: float | None = None

    @property
    def moisture_status(self) -> MoistureStatus:
        return self.irrigation.status


@dataclass(slots=True)
class ZoneAnalysis:
    zone_id: str
    frost: FrostAssessment
    greenhouse: GreenhouseAdvice | None
    air_temperature: float | None
    disease: DiseaseAssessment = field(default_factory=DiseaseAssessment)
    humidity: float | None = None
    gdd_season: float | None = None


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
    phenology: dict[str, PhenologyInfo] = field(default_factory=dict)
    et0_today: float | None = None
    et0_method: str | None = None
    gdd_today: float | None = None

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
            phenology=self.phenology,
            disease={k: z.disease for k, z in self.zones.items()},
            nutrients={k: b.nutrients for k, b in self.beds.items()},
            outlook=list(self.outlook),
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
                    "kc": round(b.kc, 2),
                    "nutrients": b.nutrients.to_dict(),
                    "taw_mm": b.taw_mm,
                    "depletion_mm": b.depletion_mm,
                }
                for k, b in self.beds.items()
            },
            "zones": {
                k: {
                    "frost": to_dict(z.frost),
                    "greenhouse": to_dict(z.greenhouse) if z.greenhouse else None,
                    "air_temperature": z.air_temperature,
                    "humidity": z.humidity,
                    "disease": to_dict(z.disease),
                    "gdd_season": z.gdd_season,
                }
                for k, z in self.zones.items()
            },
            "timelines": {k: v.to_dict() for k, v in self.timelines.items()},
            "advice": {k: v.to_dict() for k, v in self.advice.items()},
            "outlook": [to_dict(o) for o in self.outlook],
            "gdd": to_dict(self.gdd),
            "alerts": [to_dict(a) for a in self.alerts],
            "weather_available": self.weather_available,
            "phenology": {k: v.to_dict() for k, v in self.phenology.items()},
            "et0_today": self.et0_today,
            "et0_method": self.et0_method,
            "gdd_today": self.gdd_today,
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
        par=get(mapping.par),
        ec=get(mapping.ec),
        npk_n=get(mapping.npk_n),
        npk_p=get(mapping.npk_p),
        npk_k=get(mapping.npk_k),
        leaf_wetness=get(mapping.leaf_wetness),
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
    elevation = data.settings.elevation_m or 0.0
    outlook = daily_outlook(weather, now, tz, latitude, elevation_m=elevation) if weather.available else []

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
        timelines[p.id] = season_timeline(
            p, plant, season, anchors, data.zone(bed.zone_id), today, *season_bounds(region, season)
        )

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
        humidity = SensorSnapshot.value(snap.air_humidity)
        if humidity is None and not zone.is_enclosed:
            humidity = SensorSnapshot.value(outdoor.air_humidity)
        disease = assess_disease(
            weather,
            now,
            tz,
            humidity_now=humidity,
            leaf_wetness_now=SensorSnapshot.value(snap.leaf_wetness),
            enclosed=zone.is_enclosed,
        )
        zones[zone.id] = ZoneAnalysis(zone.id, frost, gh, air, disease, humidity)

    # -- beds ---------------------------------------------------------------- #
    history = list(rotation_history(data.rotation_history, data.plantings, db))
    hemisphere = resolve_profile(region).hemisphere
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
        kc = max((stage_kc(plants[p.id], timelines[p.id], today) for p in active), default=0.0)
        root_mm = max((plants[p.id].root_depth_cm * 10 for p in active), default=data.settings.root_zone_depth_mm)
        taw = total_available_water(bed.soil, min(root_mm, 600.0)) if active else None
        bucket = data.water_balance.get(bed.id)
        # Water given today (logged runs, completed water tasks) counts at once.
        given_today = bed_irrigation_mm(data, bed.id, today, tz) if bucket is not None else 0.0
        depletion = (
            (max(0.0, bucket.depletion_mm - given_today), taw)
            if bucket is not None and bucket.day is not None and taw
            else None
        )
        irrigation = recommend_irrigation(
            bed,
            zone,
            SensorSnapshot.value(snap.soil_moisture),
            [plants[p.id].water_needs for p in active],
            outlook,
            root_zone_depth_mm=data.settings.root_zone_depth_mm,
            max_irrigation_mm=data.settings.max_irrigation_mm,
            kc=kc or None,
            depletion=depletion,
        )
        nutrients = nutrient_balance(
            [plants[p.id] for p in active],
            n=SensorSnapshot.value(snap.npk_n),
            p=SensorSnapshot.value(snap.npk_p),
            k=SensorSnapshot.value(snap.npk_k),
            ec=SensorSnapshot.value(snap.ec),
        )
        relevant = [
            p for p in in_bed
            if (present_in(p, True, season) if plants[p.id].perennial else abs(p.season - season) <= 1)
        ]  # fmt: skip
        report = check_bed(
            bed,
            relevant,
            db,
            timelines={p.id: timelines[p.id].occupancy for p in relevant if p.id in timelines},
            planned={
                p.id: planting_timeline(p, plants[p.id], anchors(p.season), zone, None).occupancy
                for p in relevant
                if p.id in plants
            },
            radius_cm=data.settings.companion_radius_cm,
            lang=lang,
            hemisphere=hemisphere,
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
                found = check_rotation(p, bed, history, db, lang=lang)
                for finding in found:
                    finding.alternatives = suggest_beds(p, data.beds, data.zones, history, db)[:3]
                rotation.extend(found)
        beds[bed.id] = BedAnalysis(
            bed.id,
            snap,
            irrigation,
            [p.id for p in active],
            report,
            rotation,
            kc=kc,
            nutrients=nutrients,
            taw_mm=round(taw, 1) if taw else None,
            depletion_mm=depletion[0] if depletion else None,
        )

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
    today_out = outlook[0] if outlook else None
    gdd_today = None
    if today_out and today_out.tmin is not None and today_out.tmax is not None:
        gdd_today = round(gdd_for_day(today_out.tmin, today_out.tmax, base), 1)
    for zone in data.zones:
        # Enclosed zones run warmer: add the greenhouse day offset per logged day.
        zones[zone.id].gdd_season = (
            round(gdd_total + (gdd_days * 3.0 if zone.is_enclosed else 0.0), 1) if gdd_days else None
        )
    pheno: dict[str, PhenologyInfo] = {}
    for p in data.plantings:
        if p.id in timelines and (plants[p.id].perennial or abs(p.season - season) <= 1):
            pheno[p.id] = phenology(p.id, plants[p.id], timelines[p.id], today, data.climate_log, outlook)

    # -- alerts -------------------------------------------------------------- #
    alerts: list[Alert] = []
    if data.settings.weather_entity and not weather.available:
        alerts.append(Alert("forecast_unavailable", "forecast", "info", "alert.forecast_unavailable"))
    for zone_id, za in [("outdoor", ZoneAnalysis("outdoor", outdoor_frost, None, outdoor_temp)), *zones.items()]:
        f = za.frost
        if zone_id != "outdoor" and f is outdoor_frost:
            continue  # same assessment as the garden-wide alert: one warning, not two
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
    for zone in data.zones:
        dz = zones[zone.id].disease
        has_crops = any(beds[b.id].active_plantings for b in data.beds if b.zone_id == zone.id and b.id in beds)
        if dz.level in ("moderate", "high") and has_crops:
            alerts.append(
                Alert(
                    f"disease:{zone.id}:{today.isoformat()}",
                    "disease",
                    "critical" if dz.level == "high" else "warning",
                    "alert.disease",
                    {"zone": zone.name, "level": dz.level, "reasons": dz.reasons},
                    zone_id=zone.id,
                )
            )
    for bed in data.beds:
        nb = beds[bed.id].nutrients
        if nb.status in ("deficient", "excess"):
            alerts.append(
                Alert(
                    f"nutrients:{bed.id}:{today.isoformat()}",
                    "nutrients",
                    "warning",
                    "alert.nutrients",
                    {"bed": bed.name, "status": nb.status, "deficits": nb.deficits, "excess": nb.excess},
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
        phenology=pheno,
        et0_today=today_out.et0_mm if today_out else None,
        et0_method=today_out.et0_method if today_out else None,
        gdd_today=gdd_today,
    )


class _NoZone:
    is_enclosed = False
