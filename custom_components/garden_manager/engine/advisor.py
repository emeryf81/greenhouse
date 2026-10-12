"""Garden advisor: concrete suggestions for the current plan.

Each rule looks at the plan, the plant database and the latest analysis and
returns :class:`Suggestion` objects - placement, pollination, neighbours,
year-round harvest, soil and ecology.  Suggestions carry an optional action
the panel can apply (add a planting to a bed, open a zone, open a chapter).

Pure and fast (no I/O), so it runs on demand from the websocket API.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from datetime import date, timedelta
from typing import TYPE_CHECKING, Any

from .i18n import t
from .models import FeatureType, GardenData, Plant, Planting, PlantingStatus, Relation, present_in
from .plantdb import PlantDatabase

if TYPE_CHECKING:
    from .analysis import GardenAnalysis

# Good companions to suggest, by purpose.
POLLINATOR_FLOWERS = ("borage", "phacelia", "calendula", "sweet_alyssum", "cornflower")
WINTER_CROPS = (
    "kale",
    "leek",
    "lambs_lettuce",
    "winter_purslane",
    "brussels_sprouts",
    "parsnip",
    "spinach",
    "cavolo_nero",
)
GREENHOUSE_WINTER = ("lambs_lettuce", "winter_purslane", "spinach", "pak_choi", "mizuna", "rocket")
CATCH_CROPS = ("radish", "lettuce", "spinach", "turnip_greens", "rocket", "pak_choi")
TALL_CM = 120
SHORT_CM = 50


@dataclass(slots=True)
class Suggestion:
    id: str
    kind: str  # placement | pollination | neighbours | year_round | soil | eco | growth | greenhouse
    severity: str  # tip | warning | info
    title: str
    text: str
    plants: list[str] = field(default_factory=list)
    zone_id: str | None = None
    bed_id: str | None = None
    planting_id: str | None = None
    action: dict[str, Any] | None = None
    handbook: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return asdict(self)


@dataclass(slots=True)
class Coverage:
    """Harvest coverage of a season: which months have something to pick."""

    months: list[list[str]]  # 12 lists of plant ids (Jan..Dec)
    gaps: list[int]  # month numbers (1-12) without any harvest

    def to_dict(self) -> dict[str, Any]:
        return {"months": self.months, "gaps": self.gaps}


def harvest_coverage(data: GardenData, db: PlantDatabase, analysis: GardenAnalysis) -> Coverage:
    months: list[set[str]] = [set() for _ in range(12)]
    season = analysis.season
    for p in data.plantings:
        plant = db.get(p.plant_id)
        tl = analysis.timelines.get(p.id)
        if plant is None or tl is None or not plant.harvestable or not tl.bearing:
            continue
        if not present_in(p, plant.perennial, season) and abs(p.season - season) > 0:
            continue
        if p.status is PlantingStatus.FAILED:
            continue
        day = tl.harvest_start
        while day <= tl.harvest_end:
            if day.year == season or (day.year == season + 1 and day.month <= 3):
                months[day.month - 1].add(plant.id)
            day = date(day.year + (day.month == 12), day.month % 12 + 1, 1)
    gaps = [i + 1 for i, m in enumerate(months) if not m]
    return Coverage([sorted(m) for m in months], gaps)


def _names(db: PlantDatabase, ids, lang: str) -> list[str]:
    return [plant.name(lang) for pid in ids if (plant := db.get(pid)) is not None]


def advise(data: GardenData, db: PlantDatabase, analysis: GardenAnalysis, lang: str = "en") -> list[Suggestion]:
    out: list[Suggestion] = []
    today, season = analysis.today, analysis.season
    present: list[tuple[Planting, Plant]] = [
        (p, plant)
        for p in data.plantings
        if (plant := db.get(p.plant_id)) is not None
        and present_in(p, plant.perennial, season)
        and p.status is not PlantingStatus.FAILED
    ]
    by_bed: dict[str, list[tuple[Planting, Plant]]] = {}
    for p, plant in present:
        by_bed.setdefault(p.bed_id, []).append((p, plant))

    def add(sid: str, kind: str, severity: str, key: str, **kw: Any) -> None:
        params = kw.pop("params", {})
        out.append(Suggestion(sid, kind, severity, t(f"advice.{key}", lang, **params),
                              t(f"advice.{key}.text", lang, **params), **kw))  # fmt: skip

    # -- pollination partners ---------------------------------------------- #
    for p, plant in present:
        if plant.pollination != "partner":
            continue
        genus = plant.scientific_name.split()[0]
        partners = [
            o for o, op in present if o.id != p.id and (op.id == plant.id or op.scientific_name.split()[0] == genus)
        ]
        if not partners:
            add(f"pollination:{p.id}", "pollination", "warning", "partner",
                params={"plant": plant.name(lang)}, plants=[plant.id], planting_id=p.id, bed_id=p.bed_id,
                action={"type": "add_planting", "plant_id": plant.id, "bed_id": p.bed_id}, handbook="fruit")  # fmt: skip

    # -- pollinator flowers near insect-pollinated crops ------------------- #
    for zone in data.zones:
        beds = {b.id for b in data.beds if b.zone_id == zone.id}
        here = [(p, pl) for p, pl in present if p.bed_id in beds]
        needy = [pl for _p, pl in here if pl.pollination in ("insects", "partner") and pl.harvestable]
        has_flowers = any("pollinators" in pl.tags for _p, pl in here)
        if needy and not has_flowers:
            target = max((b for b in data.beds if b.id in beds), key=lambda b: b.area_m2, default=None)
            add(f"pollinators:{zone.id}", "pollination", "tip", "pollinators",
                params={"zone": zone.name, "plants": ", ".join(sorted({pl.name(lang) for pl in needy})[:4]),
                        "flowers": ", ".join(_names(db, POLLINATOR_FLOWERS[:3], lang))},
                plants=list(POLLINATOR_FLOWERS[:3]), zone_id=zone.id,
                action={"type": "add_planting", "plant_id": POLLINATOR_FLOWERS[0], "bed_id": target.id} if target else None,
                handbook="companions")  # fmt: skip

    # -- bad neighbours ------------------------------------------------------ #
    for bed in data.beds:
        here = by_bed.get(bed.id, [])
        for i, (a, pa) in enumerate(here):
            for b, pb in here[i + 1 :]:
                rel = db.relation(pa.id, pb.id)
                if rel.relation is Relation.ENEMY and rel.strength >= 2:
                    report = analysis.beds.get(bed.id)
                    better = report.compatibility.suggestions.get(a.id, []) if report else []
                    add(f"enemy:{a.id}:{b.id}", "neighbours", "warning", "enemy",
                        params={"a": pa.name(lang), "b": pb.name(lang), "bed": bed.name,
                                "reason": rel.reasons.get(lang) or rel.reasons.get("en", "")},
                        plants=[pa.id, pb.id], bed_id=bed.id, planting_id=a.id,
                        action={"type": "select", "planting_id": a.id},
                        handbook="companions")  # fmt: skip
                    if better:
                        out[-1].text += " " + t("advice.better", lang, plants=", ".join(_names(db, better[:4], lang)))

    # -- tall crops shading short ones (north = top of the map) ------------- #
    for bed in data.beds:
        here = [(p, pl) for p, pl in by_bed.get(bed.id, []) if p.season == season or pl.perennial]
        for a, pa in here:
            if pa.height_cm < TALL_CM:
                continue
            for b, pb in here:
                if pb.height_cm > SHORT_CM or a.id == b.id:
                    continue
                overlap_x = min(a.x_cm + a.width_cm, b.x_cm + b.width_cm) - max(a.x_cm, b.x_cm)
                if overlap_x > 0 and a.y_cm >= b.y_cm + b.length_cm and not pb.shade_tolerant:
                    add(f"shade:{a.id}:{b.id}", "placement", "tip", "shade",
                        params={"tall": pa.name(lang), "short": pb.name(lang), "bed": bed.name},
                        plants=[pa.id, pb.id], bed_id=bed.id, planting_id=a.id,
                        action={"type": "select", "planting_id": a.id}, handbook="planning")  # fmt: skip

    # -- year-round harvest -------------------------------------------------- #
    cov = harvest_coverage(data, db, analysis)
    if data.plantings and cov.gaps:
        winter_gap = [m for m in cov.gaps if m in (11, 12, 1, 2, 3)]
        crops = WINTER_CROPS if winter_gap else CATCH_CROPS
        months = ", ".join(t(f"month.{m}", lang) for m in cov.gaps)
        add("year_round", "year_round", "tip", "gaps", params={"months": months,
            "plants": ", ".join(_names(db, crops[:5], lang))}, plants=list(crops[:5]), handbook="year_round")  # fmt: skip

    # -- empty beds ---------------------------------------------------------- #
    first_frost = analysis.anchors.first_frost
    for bed in data.beds:
        active = [
            p
            for p, _pl in by_bed.get(bed.id, [])
            if (tl := analysis.timelines.get(p.id)) is not None
            and tl.occupancy.start <= today + timedelta(days=30)
            and tl.occupancy.end >= today
        ]
        zone = data.zone(bed.zone_id)
        if active or (zone and zone.type.value in ("orchard", "fruit")):
            continue
        weeks_left = (first_frost - today).days // 7
        if zone and zone.is_enclosed:
            crops, key = GREENHOUSE_WINTER, "empty_greenhouse"
        elif weeks_left >= 8:
            crops, key = CATCH_CROPS, "empty_bed"
        else:
            crops, key = ("phacelia", "winter_rye", "winter_vetch"), "empty_bed_late"
        add(f"empty:{bed.id}", "year_round", "tip", key, params={"bed": bed.name,
            "plants": ", ".join(_names(db, crops[:4], lang))}, plants=list(crops[:4]), bed_id=bed.id,
            action={"type": "add_planting", "plant_id": crops[0], "bed_id": bed.id}, handbook="year_round")  # fmt: skip

    # -- soil: rotation conflicts ------------------------------------------- #
    rot = [(bid, f) for bid, b in analysis.beds.items() for f in b.rotation if f.severity == "error"]
    if rot:
        add("rotation", "soil", "warning", "rotation", params={"n": len(rot)}, bed_id=rot[0][0], handbook="rotation")

    # -- growth: heat stress, hungry beds ------------------------------------ #
    stressed = [pid for pid, ph in analysis.phenology.items() if ph.heat_stress_days]
    if stressed:
        names = sorted(
            {db.get(p.plant_id).name(lang) for p in data.plantings if p.id in stressed and db.get(p.plant_id)}
        )
        add(
            "heat_stress",
            "growth",
            "tip",
            "heat_stress",
            params={"plants": ", ".join(names[:5])},
            handbook="greenhouse",
        )
    for bed_id, ba in analysis.beds.items():
        if ba.nutrients.status == "deficient":
            bed = data.bed(bed_id)
            add(f"feed:{bed_id}", "growth", "tip", "feed", params={"bed": bed.name if bed else bed_id},
                bed_id=bed_id, handbook="fertilizing")  # fmt: skip

    # -- ecology: the garden as a whole -------------------------------------- #
    feature_types = {f.type for f in data.features}
    if present and not any("pollinators" in pl.tags or pl.category.value == "flower" for _p, pl in present):
        add("flowers", "eco", "tip", "flowers", params={"flowers": ", ".join(_names(db, POLLINATOR_FLOWERS, lang))},
            plants=list(POLLINATOR_FLOWERS), handbook="home_remedies")  # fmt: skip
    if data.beds and FeatureType.COMPOST not in feature_types:
        add("compost", "eco", "info", "compost", handbook="soil", action={"type": "draw", "feature": "compost"})
    if data.beds and FeatureType.WATER_BUTT not in feature_types:
        add(
            "water_butt",
            "eco",
            "info",
            "water_butt",
            handbook="watering",
            action={"type": "draw", "feature": "water_butt"},
        )
    if data.beds and not feature_types & {FeatureType.HEDGE, FeatureType.POND, FeatureType.TREE}:
        add("habitat", "eco", "info", "habitat", handbook="home_remedies")
    if any(z.is_enclosed for z in data.zones) and not any(
        z.sensors.air_temperature for z in data.zones if z.is_enclosed
    ):
        add("gh_sensor", "greenhouse", "info", "gh_sensor", handbook="sensors")

    rank = {"warning": 0, "tip": 1, "info": 2}
    out.sort(key=lambda s: rank.get(s.severity, 3))
    return out
