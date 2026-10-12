"""Analysis: explain errors and unexpected things in the garden plan.

Two questions the gardener asks most:

* "Why does Hortulus do / show *that*?" - :func:`check_garden` walks the
  whole document and reports inconsistencies (crops that are not on the plan
  of their season, beds outside their zone, a year without a plan, a missed
  year-end transition, crops planned too late ...) with the ids involved, so
  the UI can point at them.
* "Why can't this plant go there?" - :func:`explain_plant` gives, per bed of a
  season's plan, every reason that blocks it (zone type, glass, too late,
  frost, crop rotation, bad neighbours, no free space).

Pure module: no Home Assistant imports.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
from dataclasses import dataclass, field
from datetime import date
from typing import Any, Literal

from .autoplan import feasibility
from .compatibility import check_rotation, rotation_history
from .geometry import Rect, planting_rect
from .models import GardenData, Plant, Planting, Relation, present_in
from .plantdb import PlantDatabase
from .region import season_anchors
from .schedule import planting_timeline
from .seasons import has_layout, layout_for, pending_transition

Severity = Literal["error", "warning", "info"]


@dataclass(slots=True)
class Issue:
    code: str
    severity: Severity
    params: dict[str, Any] = field(default_factory=dict)
    refs: dict[str, list[str]] = field(default_factory=dict)  # kind -> ids (planting, bed, zone)

    def to_dict(self) -> dict[str, Any]:
        return {"code": self.code, "severity": self.severity, "params": self.params, "refs": self.refs}


def _name(db: PlantDatabase, plant_id: str, lang: str) -> str:
    plant = db.get(plant_id)
    return plant.name(lang) if plant else plant_id


def check_garden(
    data: GardenData,
    db: PlantDatabase,
    *,
    today: date,
    current_season: int,
    lang: str = "en",
    seasons: Iterable[int] | None = None,
) -> list[Issue]:
    """Inconsistencies and surprises in the plan, most serious first."""
    issues: list[Issue] = []
    seasons = sorted(set(seasons or {current_season - 1, current_season, current_season + 1}))
    known = {p.id for p in db.all()}

    # -- the year-end transition ------------------------------------------------ #
    due = pending_transition(data, current_season)
    if due is not None:
        issues.append(Issue("transition_due", "warning", {"from": due, "to": due + 1}))

    for season in seasons:
        layout = layout_for(data, season)
        present = [p for p in data.plantings if present_in(p, False, season)]
        if layout is None:
            if present:
                issues.append(Issue("season_without_plan", "error", {"season": season, "n": len(present)},
                                    {"planting": [p.id for p in present]}))  # fmt: skip
            continue
        beds = {b.id: b for b in layout.beds}
        zones = {z.id: z for z in layout.zones}

        # crops whose bed is not on this season's plan: invisible in the planner
        orphans = [p for p in present if p.bed_id not in beds]
        if orphans:
            issues.append(Issue("planting_not_on_plan", "error", {
                "season": season, "n": len(orphans),
                "plants": ", ".join(sorted({_name(db, p.plant_id, lang) for p in orphans})),
            }, {"planting": [p.id for p in orphans]}))  # fmt: skip

        # unknown plants (a custom plant was deleted)
        unknown = [p for p in present if p.plant_id not in known]
        if unknown:
            issues.append(Issue("unknown_plant", "error", {"season": season, "ids": ", ".join(sorted({p.plant_id for p in unknown}))},
                                {"planting": [p.id for p in unknown]}))  # fmt: skip

        # beds: zone missing, outside their zone
        for bed in layout.beds:
            zone = zones.get(bed.zone_id)
            if zone is None:
                issues.append(
                    Issue("bed_without_zone", "error", {"season": season, "bed": bed.name}, {"bed": [bed.id]})
                )
                continue
            zr = Rect(zone.x_cm, zone.y_cm, zone.width_cm, zone.length_cm)
            if not zr.contains(Rect(bed.x_cm, bed.y_cm, bed.width_cm, bed.length_cm), tolerance=1.0):
                issues.append(Issue("bed_outside_zone", "warning", {"season": season, "bed": bed.name, "zone": zone.name},
                                    {"bed": [bed.id], "zone": [zone.id]}))  # fmt: skip

        # zones you cannot plant in
        for zone in layout.zones:
            if not any(b.zone_id == zone.id for b in layout.beds):
                issues.append(
                    Issue("zone_without_beds", "info", {"season": season, "zone": zone.name}, {"zone": [zone.id]})
                )

        # crops outside their bed, crops on top of each other
        by_bed: dict[str, list[Planting]] = {}
        for p in present:
            bed = beds.get(p.bed_id)
            if bed is None:
                continue
            by_bed.setdefault(bed.id, []).append(p)
            if not Rect(0, 0, bed.width_cm, bed.length_cm).contains(planting_rect(p), tolerance=1.0):
                issues.append(Issue("planting_outside_bed", "warning", {
                    "season": season, "plant": _name(db, p.plant_id, lang), "bed": bed.name}, {"planting": [p.id], "bed": [bed.id]}))  # fmt: skip
        for bed_id, items in by_bed.items():
            for i, a in enumerate(items):
                for b in items[i + 1 :]:
                    area = planting_rect(a).intersection_area(planting_rect(b))
                    smaller = min(a.width_cm * a.length_cm, b.width_cm * b.length_cm) or 1
                    if area / smaller > 0.25 and a.season == b.season:
                        issues.append(Issue("plantings_overlap", "warning", {
                            "season": season, "a": _name(db, a.plant_id, lang), "b": _name(db, b.plant_id, lang),
                            "bed": beds[bed_id].name}, {"planting": [a.id, b.id], "bed": [bed_id]}))  # fmt: skip

        # crops planned too late in the running season
        if season == current_season:
            anchors = season_anchors(data.settings.region, season)
            for p in present:
                plant = db.get(p.plant_id)
                if plant is None or p.season != season or p.sown_on or p.transplanted_on or plant.perennial:
                    continue
                zone = zones.get(beds[p.bed_id].zone_id) if p.bed_id in beds else None
                tl = planting_timeline(p, plant, anchors, zone, today)
                if tl.late:
                    issues.append(Issue("planting_too_late", "warning", {
                        "season": season, "plant": plant.name(lang), "next": season + 1}, {"planting": [p.id]}))  # fmt: skip

    # perennials of last year that were not carried into this one
    prev = current_season - 1
    if pending_transition(data, current_season) is None and has_layout(data, prev):
        dropped = [
            p for p in data.plantings
            if (pl := db.get(p.plant_id)) and pl.perennial and present_in(p, True, prev)
            and not present_in(p, True, current_season) and p.removed_season is None and p.finished_on is None
        ]  # fmt: skip
        if dropped:
            issues.append(Issue("perennial_not_carried", "info", {
                "season": current_season, "n": len(dropped),
                "plants": ", ".join(sorted({_name(db, p.plant_id, lang) for p in dropped})),
            }, {"planting": [p.id for p in dropped]}))  # fmt: skip

    rank = {"error": 0, "warning": 1, "info": 2}
    issues.sort(key=lambda i: rank[i.severity])
    return issues


# --------------------------------------------------------------------------- #
# "Why can't this plant go there?"
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class BedVerdict:
    bed_id: str
    bed: str
    zone: str
    ok: bool
    reasons: list[dict[str, Any]] = field(default_factory=list)
    warnings: list[dict[str, Any]] = field(default_factory=list)
    free_m2: float = 0.0

    def to_dict(self) -> dict[str, Any]:
        return {
            "bed_id": self.bed_id,
            "bed": self.bed,
            "zone": self.zone,
            "ok": self.ok,
            "reasons": self.reasons,
            "warnings": self.warnings,
            "free_m2": round(self.free_m2, 2),
        }


def _free_area(bed_w: float, bed_l: float, taken: list[Rect]) -> float:
    """Free bed area in m² (overlaps between existing crops counted once, roughly)."""
    used = sum(r.w * r.h for r in taken)
    return max(0.0, bed_w * bed_l - used) / 10_000


def explain_plant(
    plant: Plant,
    data: GardenData,
    db: PlantDatabase,
    season: int,
    *,
    today: date,
    match_zone: bool = True,
    timelines: Mapping[str, Any] | None = None,
) -> list[BedVerdict]:
    """For every bed of ``season``'s plan: can ``plant`` go there, and if not, why not."""
    layout = layout_for(data, season)
    if layout is None:
        return []
    zones = {z.id: z for z in layout.zones}
    history = list(rotation_history(data.rotation_history, data.plantings, db))
    out: list[BedVerdict] = []
    need = plant.spacing_cm * plant.spacing_cm / 10_000
    for bed in layout.beds:
        zone = zones.get(bed.zone_id)
        reasons = feasibility(plant, bed, zone, data, season, today, match_zone)
        warnings: list[dict[str, Any]] = []
        probe = Planting("probe", plant.id, bed.id, season)
        for finding in check_rotation(probe, bed, history, db):
            entry = {"code": "rotation", "params": {"family": finding.family, "season": finding.conflicting_season,
                                                    "years": finding.years_required}}  # fmt: skip
            (reasons if finding.severity == "error" else warnings).append(entry)
        here = [p for p in data.plantings if p.bed_id == bed.id and present_in(p, False, season)]
        for other in here:
            rel = db.relation(plant.id, other.plant_id)
            if rel.relation is Relation.ENEMY:
                entry = {"code": "bad_neighbour", "params": {"plant_id": other.plant_id,
                                                             "reason": rel.reasons.get("nl") or rel.reasons.get("en", "")}}  # fmt: skip
                (reasons if rel.strength >= 2 else warnings).append(entry)
        free = _free_area(bed.width_cm, bed.length_cm, [planting_rect(p) for p in here])
        if free < need:
            reasons.append({"code": "no_space", "params": {"free_m2": round(free, 2), "need_m2": round(need, 2)}})
        out.append(BedVerdict(bed.id, bed.name, zone.name if zone else "", not reasons, reasons, warnings, free))
    out.sort(key=lambda v: (not v.ok, len(v.reasons)))
    return out
