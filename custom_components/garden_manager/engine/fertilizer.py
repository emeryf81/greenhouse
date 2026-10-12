"""Fertilisation: base dressing per bed, feed doses, and nutrient balance.

Rates follow common organic kitchen-garden practice (Western Europe):

==============  ==================  ==========================
nutrient need   compost (kg/m²)     organic base N fertiliser
==============  ==================  ==========================
high            5                   80 g/m² (≈ 3 g N/m²)
medium          3                   40 g/m²
low             1.5                 -
legumes         0.5                 - (they fix nitrogen)
==============  ==================  ==========================

Sensor targets for the nutrient balance index (plant-available, mg/kg) are
scaled by the crop's relative N/P/K demand (``Plant.npk``, 0-3).
"""

from __future__ import annotations

from collections.abc import Sequence
from dataclasses import dataclass, field
from typing import Any

from .models import Level, Plant

COMPOST_KG_M2 = {Level.HIGH: 5.0, Level.MEDIUM: 3.0, Level.LOW: 1.5}
BASE_FERTILIZER_G_M2 = {Level.HIGH: 80.0, Level.MEDIUM: 40.0, Level.LOW: 0.0}
# Target ranges at demand weight 1 (mg/kg); weight 2-3 shifts the lower bound up.
NPK_TARGET = {"n": (20.0, 60.0), "p": (15.0, 50.0), "k": (100.0, 300.0)}
EC_TARGET = {Level.LOW: (0.6, 1.5), Level.MEDIUM: (0.9, 2.0), Level.HIGH: (1.2, 2.6)}  # mS/cm


def is_legume(plant: Plant) -> bool:
    return "nitrogen_fixer" in plant.tags


@dataclass(slots=True)
class BedFertilizerPlan:
    compost_kg: float
    base_fertilizer_g: float
    lime_check: bool  # brassicas: pH >= 6.5 against clubroot
    demand: Level
    crops: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "compost_kg": self.compost_kg,
            "base_fertilizer_g": self.base_fertilizer_g,
            "lime_check": self.lime_check,
            "demand": self.demand.value,
            "crops": self.crops,
        }


def dominant_demand(plants: Sequence[Plant]) -> Level:
    order = {Level.LOW: 0, Level.MEDIUM: 1, Level.HIGH: 2}
    non_legumes = [p for p in plants if not is_legume(p)]
    if not non_legumes:
        return Level.LOW
    return max((p.nutrient_needs for p in non_legumes), key=order.__getitem__)


def bed_fertilizer_plan(area_m2: float, plants: Sequence[Plant], lang: str = "en") -> BedFertilizerPlan:
    """Base dressing for a bed before the given crops go in."""
    demand = dominant_demand(plants)
    only_legumes = bool(plants) and all(is_legume(p) for p in plants)
    compost = 0.5 if only_legumes else COMPOST_KG_M2[demand]
    return BedFertilizerPlan(
        compost_kg=round(compost * area_m2, 1),
        base_fertilizer_g=round(BASE_FERTILIZER_G_M2[demand] * area_m2),
        lime_check=any("brassica" in p.tags or p.family == "Brassicaceae" for p in plants),
        demand=demand,
        crops=sorted({p.name(lang) for p in plants}),
    )


@dataclass(slots=True)
class FeedDose:
    liquid_liters: float  # diluted feed to apply
    concentrate_ml: float  # of a typical liquid feed at 1:100
    dry_grams: float  # or this much organic granular fertiliser
    per_plant_liters: float

    def to_dict(self) -> dict[str, float]:
        return {
            "liquid_liters": self.liquid_liters,
            "concentrate_ml": self.concentrate_ml,
            "dry_grams": self.dry_grams,
            "per_plant_liters": self.per_plant_liters,
        }


def feed_dose(plant: Plant, count: int, area_m2: float) -> FeedDose:
    """One feeding for ``count`` plants (fruiting crops: K-rich liquid feed)."""
    per_plant = 1.5 if "fruiting" in plant.tags else 1.0 if plant.nutrient_needs is Level.HIGH else 0.5
    if plant.spacing_cm < 15:  # dense crops are fed per m² instead
        liquid = round(max(area_m2 * 3.0, 1.0), 1)
        per_plant = round(liquid / max(count, 1), 2)
    else:
        liquid = round(per_plant * max(count, 1), 1)
    grams_m2 = {Level.HIGH: 40.0, Level.MEDIUM: 25.0, Level.LOW: 10.0}[plant.nutrient_needs]
    return FeedDose(liquid, round(liquid * 10), round(grams_m2 * area_m2), per_plant)


@dataclass(slots=True)
class NutrientBalance:
    index: float | None  # 0-100, 100 = everything within target
    status: str  # unknown | deficient | balanced | excess
    deficits: list[str] = field(default_factory=list)  # n | p | k | ec
    excess: list[str] = field(default_factory=list)
    source: str = "none"  # npk | ec | none

    def to_dict(self) -> dict[str, Any]:
        return {
            "index": self.index,
            "status": self.status,
            "deficits": self.deficits,
            "excess": self.excess,
            "source": self.source,
        }


def nutrient_balance(
    plants: Sequence[Plant],
    *,
    n: float | None = None,
    p: float | None = None,
    k: float | None = None,
    ec: float | None = None,
) -> NutrientBalance:
    """Compare probe readings with what the active crops need.

    Each nutrient scores 100 inside its target band and loses points
    proportionally to the relative distance outside it.  With only an EC
    probe, the band depends on the dominant nutrient demand.
    """
    if not plants:
        return NutrientBalance(None, "unknown")
    weights = [sum(pl.npk[i] for pl in plants) / len(plants) for i in range(3)]
    scores: list[float] = []
    out = NutrientBalance(None, "unknown")
    readings = {"n": n, "p": p, "k": k}
    if any(v is not None for v in readings.values()):
        out.source = "npk"
        for i, key in enumerate(("n", "p", "k")):
            value = readings[key]
            if value is None:
                continue
            lo, hi = NPK_TARGET[key]
            lo = lo * (0.6 + 0.4 * max(weights[i], 0.5))  # heavier demand -> higher floor
            if value < lo:
                out.deficits.append(key)
                scores.append(max(0.0, 100 * value / lo))
            elif value > hi * 1.5:
                out.excess.append(key)
                scores.append(max(0.0, 100 - 100 * (value - hi * 1.5) / hi))
            else:
                scores.append(100.0)
    elif ec is not None:
        out.source = "ec"
        lo, hi = EC_TARGET[dominant_demand(plants)]
        if ec < lo:
            out.deficits.append("ec")
            scores.append(max(0.0, 100 * ec / lo))
        elif ec > hi:
            out.excess.append("ec")  # salt stress
            scores.append(max(0.0, 100 - 100 * (ec - hi) / hi))
        else:
            scores.append(100.0)
    if not scores:
        return out
    out.index = round(sum(scores) / len(scores))
    out.status = "deficient" if out.deficits else "excess" if out.excess else "balanced"
    return out
