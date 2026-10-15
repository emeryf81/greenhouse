"""Daily root-zone water balance per bed (FAO-56 bucket).

Run once a day (and on start-up): every *completed* day since the last
update is booked - crop evaporation out (ET0 of the logged day: Penman-Monteith
with its humidity, wind and sunshine, Hargreaves when only min/max are known,
x the growth-stage Kc), effective rain and logged irrigation in.
Beds with a moisture sensor are tracked too, so switching a sensor off
does not leave the planner blind: once a day the bucket is set from the
reading, and the bed learns how fast it really dries out (``et_factor``).
"""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from datetime import date, datetime, timedelta, tzinfo

from .climate import daily_et0
from .models import GardenBed, GardenData, Level, Planting, PlantingStatus, WaterBalance
from .phenology import stage_kc
from .plantdb import PlantDatabase
from .schedule import PlantingTimeline
from .watering import ENCLOSED_ET_FACTOR, band_for, dominant_need, total_available_water, update_water_balance

BARE_SOIL_KC = 0.3
_MEDIUM = Level.MEDIUM
INITIAL_DEPLETION = 0.25  # share of TAW when a bed is first tracked
MAX_CATCH_UP_DAYS = 30
ET_FACTOR_RANGE = (0.5, 1.6)
LEARN_RATE = 0.3  # weight of one new observation in the learned factor
MIN_LEARN_ET_MM = 3.0  # too little drying between two readings says nothing
WILTING_BELOW_DRY = 15.0  # sensor % below the "dry" edge taken as wilting point


def bed_irrigation_mm(data: GardenData, bed_id: str, day: date, tz: tzinfo) -> float:
    return sum(ev.mm for ev in data.irrigation_log if ev.bed_id == bed_id and ev.at.astimezone(tz).date() == day)


def sensor_depletion(moisture: float, taw: float, bed: GardenBed, needs: Sequence) -> float:
    """Depletion (mm) that a moisture reading stands for: 0 at the wet edge, TAW at wilting."""
    band = band_for(dominant_need(needs) or _MEDIUM, bed.soil)
    field_capacity = band.wet_above
    wilting = max(0.0, band.dry_below - WILTING_BELOW_DRY)
    share = (field_capacity - moisture) / max(field_capacity - wilting, 1.0)
    return round(taw * max(0.0, min(1.0, share)), 1)


def _bed_state(
    bed: GardenBed,
    plantings: Sequence[Planting],
    timelines: Mapping[str, PlantingTimeline],
    db: PlantDatabase,
    day: date,
    default_root_mm: float,
) -> tuple[float, float]:
    """(kc, taw) of a bed on ``day``: thirstiest crop, deepest roots."""
    kcs, roots = [], []
    for p in plantings:
        tl = timelines[p.id]
        plant = db.get(p.plant_id)
        if plant is None or not (tl.in_ground <= day <= tl.harvest_end):
            continue
        kcs.append(stage_kc(plant, tl, day))
        roots.append(plant.root_depth_cm * 10)
    root_mm = min(max(roots, default=default_root_mm), 600.0)
    return max(kcs, default=BARE_SOIL_KC), total_available_water(bed.soil, root_mm)


def advance_water_balance(
    data: GardenData,
    db: PlantDatabase,
    timelines: Mapping[str, PlantingTimeline],
    today: date,
    *,
    latitude: float,
    tz: tzinfo,
    moisture: Mapping[str, float | None] | None = None,
) -> bool:
    """Book all complete days up to yesterday.  Returns True if anything changed.

    ``moisture`` holds the current sensor reading per bed (if any): the bucket
    is then set from it once a day and the bed's drying factor is learned.
    """
    log = {d.day: d for d in data.climate_log}
    changed = False
    for bed in data.beds:
        zone = data.zone(bed.zone_id)
        enclosed = bool(zone and zone.is_enclosed)
        plantings = [
            p
            for p in data.plantings
            if p.bed_id == bed.id and p.id in timelines and p.status is not PlantingStatus.FAILED
        ]

        wb = data.water_balance.get(bed.id)
        if wb is None or wb.day is None:
            _kc, taw = _bed_state(bed, plantings, timelines, db, today, data.settings.root_zone_depth_mm)
            wb = data.water_balance[bed.id] = WaterBalance(today, round(INITIAL_DEPLETION * taw, 1))
            changed = True
            reading = (moisture or {}).get(bed.id)
            if reading is not None:  # a sensor: start from what it measures, not from a guess
                _calibrate(wb, bed, plantings, timelines, db, today, data.settings.root_zone_depth_mm, reading)
            continue
        day = max(wb.day, today - timedelta(days=MAX_CATCH_UP_DAYS))
        depletion = wb.depletion_mm
        while day < today:
            climate = log.get(day)
            rain = (climate.rain_mm or 0.0) if climate else 0.0
            given = bed_irrigation_mm(data, bed.id, day, tz)
            if climate and climate.tmin is not None and climate.tmax is not None:
                kc, taw = _bed_state(bed, plantings, timelines, db, day, data.settings.root_zone_depth_mm)
                # Penman-Monteith from the logged humidity, wind and sun when the day has them
                et0 = daily_et0(climate, latitude, data.settings.elevation_m or 0.0)[0] or 0.0
                depletion = update_water_balance(
                    min(depletion, taw),
                    et0_mm=et0,
                    kc=kc * wb.et_factor,
                    rain_mm=rain,
                    irrigation_mm=given,
                    taw_mm=taw,
                    enclosed=enclosed,
                )
                if wb.calibrated_on is not None:  # the model's own drying, before the learned factor
                    wb.model_et_mm = round(wb.model_et_mm + et0 * kc * (ENCLOSED_ET_FACTOR if enclosed else 1.0), 2)
            else:
                # no temperatures that day: no drying is known, but the water given and the rain still count
                _kc, taw = _bed_state(bed, plantings, timelines, db, day, data.settings.root_zone_depth_mm)
                depletion = update_water_balance(
                    min(depletion, taw),
                    et0_mm=0.0,
                    kc=0.0,
                    rain_mm=rain,
                    irrigation_mm=given,
                    taw_mm=taw,
                    enclosed=enclosed,
                )
            if wb.calibrated_on is not None:  # water in stops learning, also on a day without temperatures
                wb.wet_since = wb.wet_since or given > 0 or (rain > 1.0 and not enclosed)
            day += timedelta(days=1)
        if day != wb.day or depletion != wb.depletion_mm:
            wb.day, wb.depletion_mm = day, depletion
            changed = True
        reading = (moisture or {}).get(bed.id)
        if reading is not None and wb.calibrated_on != today:
            changed |= _calibrate(wb, bed, plantings, timelines, db, today, data.settings.root_zone_depth_mm, reading)
    for bed_id in [k for k in data.water_balance if data.bed(k) is None]:
        del data.water_balance[bed_id]
        changed = True
    return changed


def _calibrate(
    wb: WaterBalance,
    bed: GardenBed,
    plantings: Sequence[Planting],
    timelines: Mapping[str, PlantingTimeline],
    db: PlantDatabase,
    today: date,
    default_root_mm: float,
    reading: float,
) -> bool:
    """Set the bucket from today's sensor reading and learn how fast the bed dries."""
    _kc, taw = _bed_state(bed, plantings, timelines, db, today, default_root_mm)
    needs = [  # the crops in the ground today choose the sensor band, not planned or finished ones
        plant.water_needs
        for p in plantings
        if (plant := db.get(p.plant_id)) is not None
        and timelines[p.id].in_ground <= today <= timelines[p.id].harvest_end
    ]
    measured = sensor_depletion(reading, taw, bed, needs)
    if (
        wb.calibrated_mm is not None
        and not wb.wet_since
        and wb.model_et_mm >= MIN_LEARN_ET_MM
        and 0 < measured < taw  # a sensor at either end of the range says nothing about the rate
    ):
        ratio = (measured - wb.calibrated_mm) / wb.model_et_mm
        if ratio > 0:
            lo, hi = ET_FACTOR_RANGE
            learned = (1 - LEARN_RATE) * wb.et_factor + LEARN_RATE * ratio
            wb.et_factor = round(max(lo, min(hi, learned)), 2)
    wb.depletion_mm = measured
    wb.day = today
    wb.calibrated_on = today
    wb.calibrated_mm = measured
    wb.model_et_mm = 0.0
    wb.wet_since = False
    return True


def trim_irrigation_log(data: GardenData, now: datetime, keep_days: int = 60) -> None:
    cutoff = now - timedelta(days=keep_days)
    data.irrigation_log[:] = [ev for ev in data.irrigation_log if ev.at >= cutoff]
