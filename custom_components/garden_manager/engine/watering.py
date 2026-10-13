"""Moisture interpretation and irrigation recommendations.

Model (deliberately simple, transparent and explainable):

* Sensor readings are volumetric water content (%) as reported by common
  capacitive probes.  Bands depend on the *thirstiest* crop in the bed and
  are shifted by soil type (clay holds more water at the same "feel").
* Demand for the next 24 h is ``ETc = ET0 (Hargreaves) x Kc x enclosure``.
* Refill the root zone - to the middle of the band when *dry*, to its lower
  edge when *slightly dry*: ``deficit_mm = (target - vwc) / 100 x depth_mm``.
* Probability-weighted forecast rain is credited at 80 % efficiency
  (outdoor beds only - greenhouses don't get rain).
* 1 mm over 1 m^2 = 1 litre, so ``litres = mm x bed area``.
"""

from __future__ import annotations

from collections.abc import Iterable, Sequence
from dataclasses import dataclass, field
from typing import Any, Literal

from .models import (
    GardenBed,
    IrrigationAction,
    Level,
    MoistureStatus,
    SoilType,
    TaskPriority,
    Zone,
)
from .weather import DailyOutlook

# dry_below, target_low, target_high, wet_above (VWC %)
MOISTURE_BANDS: dict[Level, tuple[float, float, float, float]] = {
    Level.LOW: (18.0, 22.0, 38.0, 55.0),
    Level.MEDIUM: (25.0, 30.0, 45.0, 60.0),
    Level.HIGH: (32.0, 38.0, 55.0, 68.0),
}
SOIL_SHIFT: dict[SoilType, float] = {
    SoilType.SANDY: -6.0,
    SoilType.LOAM: 0.0,
    SoilType.CLAY: 6.0,
    SoilType.SILT: 3.0,
    SoilType.PEAT: 8.0,
    SoilType.CHALK: -2.0,
    SoilType.POTTING_MIX: 4.0,
}
CROP_KC: dict[Level, float] = {Level.LOW: 0.6, Level.MEDIUM: 0.85, Level.HIGH: 1.05}
ENCLOSED_ET_FACTOR = 0.7
RAIN_EFFICIENCY = 0.8
# Available water capacity (mm of plant-available water per metre of soil).
AWC_MM_PER_M: dict[SoilType, float] = {
    SoilType.SANDY: 80.0,
    SoilType.LOAM: 160.0,
    SoilType.CLAY: 180.0,
    SoilType.SILT: 200.0,
    SoilType.PEAT: 250.0,
    SoilType.CHALK: 120.0,
    SoilType.POTTING_MIX: 220.0,
}
# Fraction of total available water that may be used before stress (FAO-56 p).
ALLOWED_DEPLETION = 0.5


@dataclass(frozen=True, slots=True)
class MoistureBand:
    dry_below: float
    target_low: float
    target_high: float
    wet_above: float

    @property
    def target_mid(self) -> float:
        return (self.target_low + self.target_high) / 2


def band_for(water_need: Level, soil: SoilType) -> MoistureBand:
    shift = SOIL_SHIFT.get(soil, 0.0)
    d, lo, hi, w = MOISTURE_BANDS[water_need]
    return MoistureBand(d + shift, lo + shift, hi + shift, w + shift)


def dominant_need(needs: Iterable[Level]) -> Level | None:
    order = {Level.LOW: 0, Level.MEDIUM: 1, Level.HIGH: 2}
    needs = list(needs)
    return max(needs, key=order.__getitem__) if needs else None


def classify_moisture(value: float | None, band: MoistureBand) -> MoistureStatus:
    if value is None:
        return MoistureStatus.UNKNOWN
    if value < band.dry_below:
        return MoistureStatus.DRY
    if value < band.target_low:
        return MoistureStatus.SLIGHTLY_DRY
    if value > band.wet_above:
        return MoistureStatus.WET
    return MoistureStatus.OPTIMAL


def total_available_water(soil: SoilType, root_depth_mm: float) -> float:
    """TAW in mm for the root zone (FAO-56 eq. 82)."""
    return AWC_MM_PER_M.get(soil, 160.0) * root_depth_mm / 1000


def update_water_balance(
    depletion_mm: float,
    *,
    et0_mm: float,
    kc: float,
    rain_mm: float,
    irrigation_mm: float,
    taw_mm: float,
    enclosed: bool = False,
) -> float:
    """One day of the root-zone bucket (FAO-56 eq. 85, no capillary rise).

    Depletion grows with crop ET and shrinks with effective rain and
    irrigation; it never drops below 0 (field capacity - excess drains) nor
    rises above TAW (wilting point).
    """
    effective_rain = 0.0 if enclosed else RAIN_EFFICIENCY * rain_mm
    depletion = depletion_mm + et0_mm * kc * (ENCLOSED_ET_FACTOR if enclosed else 1.0)
    depletion -= effective_rain + irrigation_mm
    return round(max(0.0, min(taw_mm, depletion)), 1)


@dataclass(slots=True)
class IrrigationRecommendation:
    bed_id: str
    action: IrrigationAction = IrrigationAction.NONE
    status: MoistureStatus = MoistureStatus.UNKNOWN
    amount_mm: float = 0.0
    liters: float = 0.0
    duration_min: float | None = None
    moisture: float | None = None
    band: MoistureBand | None = None
    water_need: Level | None = None
    etc_24h_mm: float | None = None
    rain_24h_mm: float = 0.0
    rain_48h_mm: float = 0.0
    confidence: Literal["high", "medium", "low"] = "low"
    priority: TaskPriority = TaskPriority.NORMAL
    reasons: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "bed_id": self.bed_id,
            "action": self.action.value,
            "status": self.status.value,
            "amount_mm": self.amount_mm,
            "liters": self.liters,
            "duration_min": self.duration_min,
            "moisture": self.moisture,
            "target_low": self.band.target_low if self.band else None,
            "target_high": self.band.target_high if self.band else None,
            "water_need": self.water_need.value if self.water_need else None,
            "etc_24h_mm": self.etc_24h_mm,
            "rain_24h_mm": self.rain_24h_mm,
            "rain_48h_mm": self.rain_48h_mm,
            "confidence": self.confidence,
            "priority": self.priority.value,
            "reasons": self.reasons,
        }


def recommend_irrigation(
    bed: GardenBed,
    zone: Zone | None,
    moisture: float | None,
    active_needs: Sequence[Level],
    outlook: Sequence[DailyOutlook],
    *,
    root_zone_depth_mm: float = 200.0,
    max_irrigation_mm: float = 20.0,
    kc: float | None = None,
    depletion: tuple[float, float] | None = None,
) -> IrrigationRecommendation:
    """Irrigation advice for one bed.

    ``kc`` is the growth-stage crop coefficient of the thirstiest active crop
    (falls back to a coefficient per water-need class).  ``depletion`` is the
    ``(depletion_mm, taw_mm)`` water-balance bucket used when no moisture sensor
    is mapped.
    """
    need = dominant_need(active_needs)
    band = band_for(need or Level.MEDIUM, bed.soil)
    rec = IrrigationRecommendation(
        bed_id=bed.id,
        moisture=moisture,
        band=band,
        water_need=need,
        status=classify_moisture(moisture, band),
    )
    enclosed = bool(zone and zone.is_enclosed)
    shade = bed.shade_pct if bed.shade_pct is not None else (zone.microclimate.shade_pct if zone else 0)
    crop_kc = kc if kc is not None and kc > 0 else CROP_KC[need or Level.MEDIUM]

    today = outlook[0] if outlook else None
    tomorrow = outlook[1] if len(outlook) > 1 else None
    if not enclosed:
        rec.rain_24h_mm = round(today.rain_mm if today else 0.0, 1)
        rec.rain_48h_mm = round(rec.rain_24h_mm + (tomorrow.rain_mm if tomorrow else 0.0), 1)
    if today and today.et0_mm is not None:
        factor = crop_kc * (ENCLOSED_ET_FACTOR if enclosed else 1.0)
        factor *= 1 - shade / 200  # 50 % shade -> 25 % less demand
        rec.etc_24h_mm = round(today.et0_mm * factor, 1)

    if need is None:
        rec.reasons.append("no_active_crops")
        return rec

    if moisture is None and depletion is not None:
        # Water-balance bucket: water when depletion exceeds the readily
        # available water (p x TAW); refill to field capacity.
        depleted, taw = depletion
        rec.confidence = "medium"
        raw = ALLOWED_DEPLETION * taw
        credited = 0.0 if enclosed else RAIN_EFFICIENCY * rec.rain_24h_mm
        rec.status = (
            MoistureStatus.DRY
            if depleted >= raw
            else MoistureStatus.SLIGHTLY_DRY
            if depleted >= 0.7 * raw
            else MoistureStatus.OPTIMAL
        )
        if depleted >= raw:
            if credited >= 0.8 * depleted:
                rec.action = IrrigationAction.SKIP_RAIN_EXPECTED
                rec.reasons.append("rain_expected")
                return rec
            rec.action = IrrigationAction.WATER
            rec.amount_mm = round(min(max(depleted - credited, 2.0), max_irrigation_mm), 1)
            rec.priority = TaskPriority.HIGH if depleted >= 0.9 * taw else TaskPriority.NORMAL
            rec.reasons.append("water_balance_depleted")
            _finish(rec, bed)
        else:
            rec.reasons.append("water_balance_ok")
        return rec

    if moisture is None:
        # No sensor, no bucket yet: forecast water balance only.
        rec.confidence = "low"
        demand = sum((o.et0_mm or 0.0) * crop_kc * (ENCLOSED_ET_FACTOR if enclosed else 1.0) for o in outlook[:2])
        rain = 0.0 if enclosed else RAIN_EFFICIENCY * rec.rain_48h_mm
        if demand - rain > 6.0 or (enclosed and demand > 4.0):
            rec.action = IrrigationAction.CHECK_MANUALLY
            rec.amount_mm = round(min(max(demand - rain, 0.0), max_irrigation_mm), 1)
            rec.reasons.append("no_sensor_water_balance_negative")
        else:
            rec.reasons.append("no_sensor_water_balance_ok")
        _finish(rec, bed)
        return rec

    rec.confidence = "high" if outlook else "medium"
    if rec.status in (MoistureStatus.OPTIMAL, MoistureStatus.WET):
        rec.reasons.append("moisture_ok" if rec.status is MoistureStatus.OPTIMAL else "moisture_wet")
        return rec

    # Dry: refill to the middle of the band.  Slightly dry: the crop is not
    # stressed yet, only bring it back to the lower edge of the optimum.
    target = band.target_mid if rec.status is MoistureStatus.DRY else band.target_low
    deficit = max(0.0, (target - moisture) / 100 * root_zone_depth_mm)
    need_mm = deficit + (rec.etc_24h_mm or 0.0)
    credited = RAIN_EFFICIENCY * (
        rec.rain_24h_mm
        + (0.5 * (rec.rain_48h_mm - rec.rain_24h_mm) if rec.status is MoistureStatus.SLIGHTLY_DRY else 0.0)
    )
    if not enclosed and credited >= 0.8 * need_mm:
        rec.action = IrrigationAction.SKIP_RAIN_EXPECTED
        rec.reasons.append("rain_expected")
        rec.priority = TaskPriority.LOW
        return rec

    rec.action = IrrigationAction.WATER
    rec.amount_mm = round(min(max(need_mm - credited, 2.0), max_irrigation_mm), 1)
    rec.priority = TaskPriority.HIGH if rec.status is MoistureStatus.DRY else TaskPriority.NORMAL
    rec.reasons.append("moisture_below_target")
    if credited > 0:
        rec.reasons.append("rain_partially_credited")
    _finish(rec, bed)
    return rec


def _finish(rec: IrrigationRecommendation, bed: GardenBed) -> None:
    rec.liters = round(rec.amount_mm * bed.area_m2, 1)
    if (flow := bed.flow_lpm) and rec.liters > 0:
        rec.duration_min = round(rec.liters / flow, 1)
