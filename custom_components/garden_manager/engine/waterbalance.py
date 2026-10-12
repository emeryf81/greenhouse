"""Daily root-zone water balance per bed (FAO-56 bucket).

Run once a day (and on start-up): every *completed* day since the last
update is booked - crop evaporation out (ET0 from the logged min/max
temperature x the growth-stage Kc), effective rain and logged irrigation in.
Beds with a moisture sensor are tracked too, so switching a sensor off
does not leave the planner blind.
"""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from datetime import date, datetime, timedelta, tzinfo

from .models import GardenBed, GardenData, Planting, PlantingStatus, WaterBalance
from .phenology import stage_kc
from .plantdb import PlantDatabase
from .schedule import PlantingTimeline
from .watering import total_available_water, update_water_balance
from .weather import et0_hargreaves

BARE_SOIL_KC = 0.3
INITIAL_DEPLETION = 0.25  # share of TAW when a bed is first tracked
MAX_CATCH_UP_DAYS = 30


def bed_irrigation_mm(data: GardenData, bed_id: str, day: date, tz: tzinfo) -> float:
    return sum(ev.mm for ev in data.irrigation_log if ev.bed_id == bed_id and ev.at.astimezone(tz).date() == day)


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
) -> bool:
    """Book all complete days up to yesterday.  Returns True if anything changed."""
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
            data.water_balance[bed.id] = WaterBalance(today, round(INITIAL_DEPLETION * taw, 1))
            changed = True
            continue
        day = max(wb.day, today - timedelta(days=MAX_CATCH_UP_DAYS))
        depletion = wb.depletion_mm
        while day < today:
            climate = log.get(day)
            if climate and climate.tmin is not None and climate.tmax is not None:
                kc, taw = _bed_state(bed, plantings, timelines, db, day, data.settings.root_zone_depth_mm)
                et0 = et0_hargreaves(climate.tmin, climate.tmax, latitude, day)
                depletion = update_water_balance(
                    min(depletion, taw),
                    et0_mm=et0,
                    kc=kc,
                    rain_mm=climate.rain_mm or 0.0,
                    irrigation_mm=bed_irrigation_mm(data, bed.id, day, tz),
                    taw_mm=taw,
                    enclosed=enclosed,
                )
            day += timedelta(days=1)
        if day != wb.day or depletion != wb.depletion_mm:
            wb.day, wb.depletion_mm = day, depletion
            changed = True
    for bed_id in [k for k in data.water_balance if data.bed(k) is None]:
        del data.water_balance[bed_id]
        changed = True
    return changed


def trim_irrigation_log(data: GardenData, now: datetime, keep_days: int = 60) -> None:
    cutoff = now - timedelta(days=keep_days)
    data.irrigation_log[:] = [ev for ev in data.irrigation_log if ev.at >= cutoff]
