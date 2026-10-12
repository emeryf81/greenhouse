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
from .geometry import Rect, clamp_into, planting_rect
from .models import GardenData, Plant, Planting, Relation, present_in
from .plantdb import PlantDatabase
from .region import season_anchors
from .schedule import planting_timeline
from .seasons import copy_plan, has_layout, layout_for, pending_transition, plan_seasons

Severity = Literal["error", "warning", "info"]

# Issues :func:`fix_issue` can repair in one click.
FIXABLE = frozenset(
    {
        "season_without_plan",
        "planting_not_on_plan",
        "planting_outside_bed",
        "bed_outside_zone",
        "perennial_not_carried",
    }
)


@dataclass(slots=True)
class Issue:
    code: str
    severity: Severity
    params: dict[str, Any] = field(default_factory=dict)
    refs: dict[str, list[str]] = field(default_factory=dict)  # kind -> ids (planting, bed, zone)

    def to_dict(self) -> dict[str, Any]:
        return {
            "code": self.code,
            "severity": self.severity,
            "params": self.params,
            "refs": self.refs,
            "fixable": self.code in FIXABLE,
        }


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


def summary(issues: Iterable[Issue]) -> dict[str, int]:
    """Number of issues per severity (for a badge)."""
    out = {"error": 0, "warning": 0, "info": 0}
    for issue in issues:
        out[issue.severity] += 1
    return out


# --------------------------------------------------------------------------- #
# One-click repairs
# --------------------------------------------------------------------------- #
def _nearest_plan(data: GardenData, season: int) -> int | None:
    """The plan closest to ``season`` (an earlier year wins a tie)."""
    others = [s for s in plan_seasons(data) if s != season]
    return min(others, key=lambda s: (abs(s - season), s > season)) if others else None


def fix_issue(
    data: GardenData,
    code: str,
    params: Mapping[str, Any],
    refs: Mapping[str, list[str]],
    *,
    current_season: int,
) -> dict[str, Any]:
    """Repair what :func:`check_garden` reported.  Returns what was done.

    Raises ``ValueError`` when the issue cannot be repaired (any more).
    """
    season = int(params.get("season", current_season))
    plantings = {p.id: p for p in data.plantings}
    ids = [i for i in refs.get("planting", []) if i in plantings]

    if code == "season_without_plan":
        source = _nearest_plan(data, season)
        if source is None or not copy_plan(data, source, season):
            raise ValueError("no plan to copy")
        return {"copied_from": source, "season": season}

    layout = layout_for(data, season)
    if layout is None:
        raise ValueError("season has no plan")
    beds = {b.id: b for b in layout.beds}

    if code == "planting_not_on_plan":
        if not layout.beds:
            raise ValueError("plan has no beds")
        # a bed that was renamed keeps its name elsewhere: look it up in the other plans
        names: dict[str, str] = {}
        for other in plan_seasons(data):
            other_layout = layout_for(data, other)
            for bed in other_layout.beds if other_layout else []:
                names.setdefault(bed.id, bed.name)
        by_name = {b.name.casefold(): b for b in layout.beds}
        moved = []
        for pid in ids:
            planting = plantings[pid]
            if planting.bed_id in beds:
                continue
            target = by_name.get(names.get(planting.bed_id, "").casefold()) or layout.beds[0]
            planting.bed_id = target.id
            _clamp_planting(planting, target)
            moved.append({"planting": pid, "bed": target.name})
        if not moved:
            raise ValueError("nothing to move")
        return {"moved": moved}

    if code == "planting_outside_bed":
        done = []
        for pid in ids:
            planting = plantings[pid]
            bed = beds.get(planting.bed_id)
            if bed is not None:
                _clamp_planting(planting, bed)
                done.append(pid)
        if not done:
            raise ValueError("nothing to move")
        return {"moved": done}

    if code == "bed_outside_zone":
        zones = {z.id: z for z in layout.zones}
        done = []
        for bed_id in refs.get("bed", []):
            bed = beds.get(bed_id)
            zone = zones.get(bed.zone_id) if bed else None
            if bed is None or zone is None:
                continue
            r = clamp_into(
                Rect(bed.x_cm, bed.y_cm, bed.width_cm, bed.length_cm),
                Rect(zone.x_cm, zone.y_cm, zone.width_cm, zone.length_cm),
            )
            bed.x_cm, bed.y_cm, bed.width_cm, bed.length_cm = r.x, r.y, r.w, r.h
            done.append(bed_id)
        if not done:
            raise ValueError("nothing to move")
        return {"moved": done}

    if code == "perennial_not_carried":
        carried = []
        for pid in ids:
            planting = plantings[pid]
            if planting.bed_id in beds and not present_in(planting, True, season):
                planting.last_season = season
                carried.append(pid)
        if not carried:
            raise ValueError("nothing to carry over")
        return {"carried": carried, "season": season}

    raise ValueError(f"cannot fix {code}")


def _clamp_planting(planting: Planting, bed: Any) -> None:
    r = clamp_into(
        Rect(planting.x_cm, planting.y_cm, planting.width_cm, planting.length_cm),
        Rect(0, 0, bed.width_cm, bed.length_cm),
    )
    planting.x_cm, planting.y_cm, planting.width_cm, planting.length_cm = r.x, r.y, r.w, r.h


# --------------------------------------------------------------------------- #
# Compare two plans
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class PlanView:
    label: str
    zones: list[Any]
    beds: list[Any]
    features: list[Any]
    plantings: list[Planting]


def plan_view(data: GardenData, *, season: int | None = None, plan_id: str | None = None) -> PlanView | None:
    """A season's plan with its crops, or a plan that was set aside."""
    if plan_id:
        plan = next((p for p in data.archived_plans if p.id == plan_id), None)
        if plan is None:
            return None
        return PlanView(plan.name, plan.zones, plan.beds, plan.features, list(plan.plantings))
    if season is None:
        return None
    layout = layout_for(data, season)
    if layout is None:
        return None
    crops = [p for p in data.plantings if present_in(p, False, season)]
    return PlanView(str(season), layout.zones, layout.beds, layout.features, crops)


def _moved(a: Any, b: Any) -> bool:
    return any(abs(getattr(a, k, 0) - getattr(b, k, 0)) > 1 for k in ("x_cm", "y_cm", "width_cm", "length_cm"))


def compare_plans(a: PlanView, b: PlanView, db: PlantDatabase, lang: str = "en") -> dict[str, Any]:
    """What changed from plan ``a`` to plan ``b``: zones, beds, elements and crops."""

    def items(kind: str, left: list[Any], right: list[Any]) -> dict[str, list[dict[str, Any]]]:
        la, rb = {i.id: i for i in left}, {i.id: i for i in right}
        out: dict[str, list[dict[str, Any]]] = {"added": [], "removed": [], "changed": []}
        for i in right:
            if i.id not in la:
                out["added"].append({"id": i.id, "name": i.name})
        for i in left:
            if i.id not in rb:
                out["removed"].append({"id": i.id, "name": i.name})
            else:
                other = rb[i.id]
                what = []
                if _moved(i, other):
                    what.append("moved")
                if i.name != other.name:
                    what.append("renamed")
                if kind == "beds" and i.zone_id != other.zone_id:
                    what.append("zone")
                if kind in ("zones", "features") and getattr(i, "type", None) != getattr(other, "type", None):
                    what.append("type")
                if what:
                    out["changed"].append({"id": i.id, "name": other.name, "was": i.name, "what": what})
        return out

    bed_names = {b.id: b.name for b in [*a.beds, *b.beds]}

    def crop(p: Planting) -> dict[str, Any]:
        return {
            "id": p.id,
            "plant_id": p.plant_id,
            "name": _name(db, p.plant_id, lang),
            "bed": bed_names.get(p.bed_id, p.bed_id),
        }

    pa, pb = {p.id: p for p in a.plantings}, {p.id: p for p in b.plantings}
    crops: dict[str, list[dict[str, Any]]] = {"added": [], "removed": [], "changed": []}
    for p in b.plantings:
        if p.id not in pa:
            crops["added"].append(crop(p))
    for p in a.plantings:
        other = pb.get(p.id)
        if other is None:
            crops["removed"].append(crop(p))
            continue
        what = []
        if p.bed_id != other.bed_id:
            what.append("bed")
        elif _moved(p, other):
            what.append("moved")
        if p.status != other.status:
            what.append("status")
        if what:
            crops["changed"].append({**crop(other), "was_bed": bed_names.get(p.bed_id, p.bed_id), "what": what})
    # the same plant in the same bed under a new id is no real change
    added_keys = {(c["plant_id"], c["bed"]) for c in crops["added"]}
    removed_keys = {(c["plant_id"], c["bed"]) for c in crops["removed"]}
    same = added_keys & removed_keys
    crops["added"] = [c for c in crops["added"] if (c["plant_id"], c["bed"]) not in same]
    crops["removed"] = [c for c in crops["removed"] if (c["plant_id"], c["bed"]) not in same]

    result = {
        "a": a.label,
        "b": b.label,
        "zones": items("zones", a.zones, b.zones),
        "beds": items("beds", a.beds, b.beds),
        "features": items("features", a.features, b.features),
        "plantings": crops,
    }
    result["identical"] = all(
        not v for part in ("zones", "beds", "features", "plantings") for v in result[part].values()
    )
    return result


# --------------------------------------------------------------------------- #
# What can still go in this season?
# --------------------------------------------------------------------------- #
def still_possible(
    data: GardenData, db: PlantDatabase, season: int, *, today: date, limit: int = 200, lang: str = "en"
) -> list[dict[str, Any]]:
    """Plants that still fit into at least one bed of ``season``'s plan, with those beds."""
    layout = layout_for(data, season)
    if layout is None:
        return []
    zones = {z.id: z for z in layout.zones}
    out = []
    for plant in sorted(db.all(), key=lambda p: p.name(lang).casefold()):
        if plant.perennial:
            continue
        beds = [b.id for b in layout.beds if not feasibility(plant, b, zones.get(b.zone_id), data, season, today, True)]
        if beds:
            out.append({"plant_id": plant.id, "beds": beds})
        if len(out) >= limit:
            break
    return out
