"""Phenology: growth stage, crop coefficient and dynamic harvest per planting.

* **Growing degree days** since the crop went into the ground are summed from
  the daily climate log (base temperature per plant).
* When a plant defines ``gdd_to_maturity`` the harvest date is projected from
  the recent average GDD per day (blended with the forecast) - so a warm
  spring brings the harvest forward and a cold one pushes it back.
* Heat stress (forecast above the crop's ``max_temp_c``) delays fruiting crops
  by a day per stress day (flower drop / poor pollination).
* The **FAO-56 crop coefficient** Kc follows the four stages initial →
  development → mid-season → late season (15 / 25 / 40 / 20 % of the season).
"""

from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass
from datetime import date, timedelta
from typing import Any

from .models import ClimateDay, Plant
from .schedule import PlantingTimeline
from .weather import DailyOutlook, accumulate_gdd, gdd_for_day

STAGE_FRACTIONS = (0.15, 0.25, 0.40, 0.20)  # FAO-56 typical stage lengths


@dataclass(slots=True)
class PhenologyInfo:
    planting_id: str
    stage: str  # not_planted | establishing | vegetative | flowering | ripening | harvest | finished
    progress: float  # 0..1+ towards first harvest
    kc: float
    gdd: float | None = None
    gdd_target: int | None = None
    harvest_estimate: date | None = None
    heat_stress_days: int = 0
    cold_stress_days: int = 0

    def to_dict(self) -> dict[str, Any]:
        return {
            "planting_id": self.planting_id,
            "stage": self.stage,
            "progress": round(self.progress, 2),
            "kc": round(self.kc, 2),
            "gdd": self.gdd,
            "gdd_target": self.gdd_target,
            "harvest_estimate": self.harvest_estimate.isoformat() if self.harvest_estimate else None,
            "heat_stress_days": self.heat_stress_days,
            "cold_stress_days": self.cold_stress_days,
        }


def stage_kc(plant: Plant, tl: PlantingTimeline, today: date) -> float:
    """Interpolated FAO-56 Kc for ``today`` (perennials: mid-season value)."""
    kc_ini, kc_mid, kc_end = (plant.kc + [0.5, 1.0, 0.8])[:3]
    if plant.perennial:
        return kc_mid
    total = max((tl.harvest_end - tl.in_ground).days, 1)
    elapsed = (today - tl.in_ground).days
    if elapsed < 0:
        return 0.0
    f = elapsed / total
    ini, dev, mid, _late = STAGE_FRACTIONS
    if f <= ini:
        return kc_ini
    if f <= ini + dev:
        return kc_ini + (kc_mid - kc_ini) * (f - ini) / dev
    if f <= ini + dev + mid:
        return kc_mid
    if f <= 1.0:
        return kc_mid + (kc_end - kc_mid) * (f - ini - dev - mid) / (1 - ini - dev - mid)
    return kc_end


def _stage(progress: float, fruiting: bool) -> str:
    if progress < 0.15:
        return "establishing"
    if progress < 0.5:
        return "vegetative"
    if progress < 0.8:
        return "flowering" if fruiting else "vegetative"
    if progress < 1.0:
        return "ripening"
    return "harvest"


def phenology(
    planting_id: str,
    plant: Plant,
    tl: PlantingTimeline,
    today: date,
    climate_log: Sequence[ClimateDay],
    outlook: Sequence[DailyOutlook] = (),
) -> PhenologyInfo:
    if today < tl.in_ground:
        return PhenologyInfo(planting_id, "not_planted", 0.0, 0.0)
    if today > tl.harvest_end:
        return PhenologyInfo(planting_id, "finished", 1.0, stage_kc(plant, tl, today))

    fruiting = "fruiting" in plant.tags
    heat = sum(1 for o in outlook if o.tmax is not None and o.tmax > plant.max_temp_c)
    cold = sum(1 for o in outlook if o.tmin is not None and o.tmin < plant.min_temp_c)
    calendar_days = max((tl.harvest_start - tl.in_ground).days, 1)
    progress = (today - tl.in_ground).days / calendar_days
    info = PhenologyInfo(
        planting_id, _stage(progress, fruiting), progress, stage_kc(plant, tl, today),
        heat_stress_days=heat, cold_stress_days=cold,
    )  # fmt: skip

    if plant.gdd_to_maturity:
        gdd, counted = accumulate_gdd(climate_log, tl.in_ground, today, plant.gdd_base_c)
        info.gdd, info.gdd_target = gdd, plant.gdd_to_maturity
        recent = [
            gdd_for_day(d.tmin, d.tmax, plant.gdd_base_c)
            for d in climate_log
            if today - timedelta(days=14) <= d.day <= today and d.tmin is not None and d.tmax is not None
        ]
        forecast = [
            gdd_for_day(o.tmin, o.tmax, plant.gdd_base_c) for o in outlook if o.tmin is not None and o.tmax is not None
        ]
        rates = recent + forecast
        elapsed = max((today - tl.in_ground).days, 0)
        # Only trust GDD when most days since planting are logged.
        if rates and counted >= max(5, int(elapsed * 0.6)):
            rate = max(sum(rates) / len(rates), 0.5)
            remaining = max(plant.gdd_to_maturity - gdd, 0.0)
            estimate = today + timedelta(days=min(round(remaining / rate), 365))
            if fruiting:
                estimate += timedelta(days=heat)
            # A GDD model should refine, not overrule, the calendar: ±21 days.
            low, high = tl.harvest_start - timedelta(days=21), tl.harvest_start + timedelta(days=21)
            info.harvest_estimate = min(max(estimate, low), high)
            info.progress = gdd / plant.gdd_to_maturity
            info.stage = _stage(info.progress, fruiting)
    return info
