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

from .models import Level, Plant, SoilTest

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
    lime_g: float = 0.0  # garden lime to reach the target pH (from a soil test)
    # Short keys explaining adjustments made from the soil test (i18n "soil.adj.*").
    adjustments: list[str] = field(default_factory=list)

    def to_dict(self) -> dict[str, Any]:
        return {
            "compost_kg": self.compost_kg,
            "base_fertilizer_g": self.base_fertilizer_g,
            "lime_check": self.lime_check,
            "demand": self.demand.value,
            "crops": self.crops,
            "lime_g": self.lime_g,
            "adjustments": self.adjustments,
        }


def dominant_demand(plants: Sequence[Plant]) -> Level:
    order = {Level.LOW: 0, Level.MEDIUM: 1, Level.HIGH: 2}
    non_legumes = [p for p in plants if not is_legume(p)]
    if not non_legumes:
        return Level.LOW
    return max((p.nutrient_needs for p in non_legumes), key=order.__getitem__)


# Soil test thresholds (mg per 100 g dry soil, common Benelux lab classes).
P_LOW, P_HIGH = 15.0, 45.0
K_LOW, K_HIGH = 10.0, 30.0
LIME_G_PER_PH_M2 = 250.0  # garden lime (CaCO3) to raise loam about 0.1 pH ≈ 25 g/m²


def bed_fertilizer_plan(
    area_m2: float, plants: Sequence[Plant], lang: str = "en", soil: SoilTest | None = None
) -> BedFertilizerPlan:
    """Base dressing for a bed before the given crops go in.

    With a soil test the rates are adjusted: little organic matter means more
    compost, high P/K means less fertiliser, a low pH gives a lime dose.
    """
    demand = dominant_demand(plants)
    only_legumes = bool(plants) and all(is_legume(p) for p in plants)
    compost = 0.5 if only_legumes else COMPOST_KG_M2[demand]
    fert = BASE_FERTILIZER_G_M2[demand]
    brassicas = any("brassica" in p.tags or p.family == "Brassicaceae" for p in plants)
    lime = 0.0
    adjustments: list[str] = []
    if soil is not None:
        if soil.organic_matter_pct is not None:
            if soil.organic_matter_pct < 2.0:
                compost *= 1.5
                adjustments.append("om_low")
            elif soil.organic_matter_pct > 6.0:
                compost *= 0.6
                adjustments.append("om_high")
        high_p = soil.p_mg is not None and soil.p_mg > P_HIGH
        high_k = soil.k_mg is not None and soil.k_mg > K_HIGH
        if high_p and high_k:
            fert *= 0.5
            adjustments.append("pk_high")
        elif (soil.p_mg is not None and soil.p_mg < P_LOW) or (soil.k_mg is not None and soil.k_mg < K_LOW):
            fert = max(fert, 30.0) * 1.3
            adjustments.append("pk_low")
        if soil.ph is not None:
            target = 7.0 if brassicas else 6.5
            if soil.ph < target - 0.2:
                lime = (target - soil.ph) * LIME_G_PER_PH_M2 * area_m2
                adjustments.append("lime")
            elif soil.ph > 7.5:
                adjustments.append("ph_high")
    return BedFertilizerPlan(
        compost_kg=round(compost * area_m2, 1),
        base_fertilizer_g=round(fert * area_m2),
        lime_check=brassicas and (soil is None or soil.ph is None),
        demand=demand,
        crops=sorted({p.name(lang) for p in plants}),
        lime_g=round(lime),
        adjustments=adjustments,
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
