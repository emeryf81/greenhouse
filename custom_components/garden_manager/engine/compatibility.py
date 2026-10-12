"""Companion planting, spacing conflicts and crop rotation.

Scoring model
-------------
Two plantings *interact* when they share time in the ground **and** their
footprints are within an interaction distance::

    reach = max(companion_radius, (spacing_a + spacing_b) / 2)

The influence decays linearly with the gap between footprints (1.0 when
touching, 0 at ``reach``).  Each interacting pair contributes::

    friend  : +10 * strength * influence
    enemy   : -20 * strength * influence      (harm weighs double)
    overlap : -30 * overlap_fraction          (physical crowding)
    same family touching: -3                  (shared pests/diseases)

When no explicit relation exists, further factors are evaluated:

    pest synergy  : +6 * influence   A deters / traps a pest that attacks B
    allelopathy   : -10 * influence  fennel, sunflower, wormwood ...
    competition   : -4 * influence   two heavy feeders shoulder to shoulder
    shading       : -8 * influence   a tall crop on the sun side of a sun lover
                    +3 * influence   ... or welcome shade for a shade-tolerant crop

The bed score is ``clamp(50 + sum, 0, 100)`` - 50 is neutral.  Every
contribution carries an i18n key + params so the UI can explain it.
"""

from __future__ import annotations

from collections.abc import Iterable, Sequence
from dataclasses import dataclass, field
from typing import Any, Literal

from .geometry import Rect, planting_rect
from .i18n import pest_label
from .models import GardenBed, Hemisphere, Level, Plant, Planting, Relation, RotationRecord, Zone
from .plantdb import PlantDatabase
from .schedule import DateWindow

Severity = Literal["info", "warning", "error"]


@dataclass(slots=True)
class PairFinding:
    a: str  # planting id
    b: str
    kind: Literal["friend", "enemy", "overlap", "same_family", "pest_synergy", "allelopathy", "competition", "shading"]
    severity: Severity
    score: float
    distance_cm: float
    key: str
    params: dict[str, Any] = field(default_factory=dict)

    def to_dict(self) -> dict[str, Any]:
        return {
            "a": self.a,
            "b": self.b,
            "kind": self.kind,
            "severity": self.severity,
            "score": round(self.score, 1),
            "distance_cm": round(self.distance_cm, 1),
            "key": self.key,
            "params": self.params,
        }


@dataclass(slots=True)
class RotationFinding:
    planting: str
    bed_id: str
    family: str
    conflicting_season: int
    years_required: int
    severity: Severity
    key: str = "compat.rotation"
    params: dict[str, Any] = field(default_factory=dict)
    alternatives: list[str] = field(default_factory=list)  # bed ids without conflict

    def to_dict(self) -> dict[str, Any]:
        return {
            "planting": self.planting,
            "bed_id": self.bed_id,
            "family": self.family,
            "conflicting_season": self.conflicting_season,
            "years_required": self.years_required,
            "severity": self.severity,
            "key": self.key,
            "params": self.params,
            "alternatives": self.alternatives,
        }


@dataclass(slots=True)
class CompatibilityReport:
    score: float = 50.0
    pairs: list[PairFinding] = field(default_factory=list)
    rotation: list[RotationFinding] = field(default_factory=list)
    out_of_bounds: list[str] = field(default_factory=list)
    # Plant-vs-place problems, e.g. a crop that does not belong under glass.
    placement: list[dict[str, Any]] = field(default_factory=list)
    # Better neighbours for plantings that have conflicts: planting id -> plant ids
    suggestions: dict[str, list[str]] = field(default_factory=dict)

    @property
    def conflicts(self) -> list[PairFinding]:
        return [p for p in self.pairs if p.severity != "info"]

    def to_dict(self) -> dict[str, Any]:
        return {
            "score": round(self.score, 1),
            "pairs": [p.to_dict() for p in self.pairs],
            "rotation": [r.to_dict() for r in self.rotation],
            "out_of_bounds": self.out_of_bounds,
            "placement": self.placement,
            "suggestions": self.suggestions,
        }


def _overlaps_in_time(a: DateWindow | None, b: DateWindow | None) -> bool:
    if a is None or b is None:  # unknown timing: assume they coexist
        return True
    return a.start <= b.end and b.start <= a.end


def evaluate_pair(
    pa: Planting,
    ra: Rect,
    plant_a: Plant,
    pb: Planting,
    rb: Rect,
    plant_b: Plant,
    db: PlantDatabase,
    *,
    radius_cm: float,
    lang: str = "en",
    hemisphere: Hemisphere = Hemisphere.NORTH,
) -> list[PairFinding]:
    findings: list[PairFinding] = []
    gap = ra.gap(rb)
    reach = max(radius_cm, (plant_a.spacing_cm + plant_b.spacing_cm) / 2)
    if gap > reach:
        return findings
    influence = max(0.0, 1.0 - gap / reach) if reach else 1.0
    name_a, name_b = plant_a.name(lang), plant_b.name(lang)

    overlap = ra.intersection_area(rb)
    if overlap > 0:
        frac = overlap / max(1.0, min(ra.w * ra.h, rb.w * rb.h))
        if frac > 0.05:
            findings.append(
                PairFinding(
                    pa.id,
                    pb.id,
                    "overlap",
                    "error" if frac > 0.25 else "warning",
                    -30 * min(frac, 1.0),
                    gap,
                    "compat.overlap",
                    {"a": name_a, "b": name_b},
                )
            )

    if pa.plant_id != pb.plant_id:
        rel = db.relation(pa.plant_id, pb.plant_id)
        if rel.relation is Relation.FRIEND:
            findings.append(
                PairFinding(
                    pa.id,
                    pb.id,
                    "friend",
                    "info",
                    10 * rel.strength * influence,
                    gap,
                    "compat.friend",
                    {"a": name_a, "b": name_b, "reason": rel.reasons.get(lang) or rel.reasons.get("en", "")},
                )
            )
        elif rel.relation is Relation.ENEMY:
            findings.append(
                PairFinding(
                    pa.id,
                    pb.id,
                    "enemy",
                    "error" if rel.strength >= 2 and influence > 0.5 else "warning",
                    -20 * rel.strength * influence,
                    gap,
                    "compat.enemy",
                    {"a": name_a, "b": name_b, "reason": rel.reasons.get(lang) or rel.reasons.get("en", "")},
                )
            )
        elif plant_a.family == plant_b.family and gap <= 1.0:
            findings.append(
                PairFinding(
                    pa.id,
                    pb.id,
                    "same_family",
                    "info",
                    -3,
                    gap,
                    "compat.same_family_adjacent",
                    {"a": name_a, "b": name_b},
                )
            )
        if rel.relation is Relation.NEUTRAL or rel.source == "family":
            findings.extend(_secondary_factors(pa, ra, plant_a, pb, rb, plant_b, influence, gap, lang, hemisphere, rel))
    return findings


def _secondary_factors(
    pa: Planting,
    ra: Rect,
    plant_a: Plant,
    pb: Planting,
    rb: Rect,
    plant_b: Plant,
    influence: float,
    gap: float,
    lang: str,
    hemisphere: Hemisphere,
    rel: Any,
) -> list[PairFinding]:
    """Factors derived from plant traits rather than explicit relations."""
    out: list[PairFinding] = []
    name_a, name_b = plant_a.name(lang), plant_b.name(lang)

    # -- pest deterrence / trap crops ------------------------------------ #
    for helper, helper_p, target, target_p in ((plant_a, pa, plant_b, pb), (plant_b, pb, plant_a, pa)):
        deterred = sorted(set(helper.deters) & set(target.pests))
        trapped = sorted(set(helper.trap_for) & set(target.pests))
        if deterred or trapped:
            pests = ", ".join(pest_label(p, lang) for p in (deterred or trapped))
            out.append(
                PairFinding(
                    helper_p.id, target_p.id, "pest_synergy", "info", 6 * influence, gap,
                    "compat.deters" if deterred else "compat.trap",
                    {"a": helper.name(lang), "b": target.name(lang), "pests": pests},
                )
            )  # fmt: skip

    if rel.relation is Relation.FRIEND:
        return out

    # -- allelopathy ------------------------------------------------------ #
    for culprit, culprit_p, victim, victim_p in ((plant_a, pa, plant_b, pb), (plant_b, pb, plant_a, pa)):
        if culprit.allelopathic and not victim.allelopathic:
            out.append(
                PairFinding(
                    culprit_p.id, victim_p.id, "allelopathy", "warning", -10 * influence, gap,
                    "compat.allelopathy", {"a": culprit.name(lang), "b": victim.name(lang)},
                )
            )  # fmt: skip
            break

    # -- nutrient competition -------------------------------------------- #
    if plant_a.nutrient_needs is Level.HIGH and plant_b.nutrient_needs is Level.HIGH and influence > 0.5:
        out.append(
            PairFinding(
                pa.id, pb.id, "competition", "info", -4 * influence, gap,
                "compat.competition", {"a": name_a, "b": name_b},
            )
        )  # fmt: skip

    # -- shading (canvas y grows to the south; sun from the equator side) -- #
    tall, short = (plant_a, plant_b) if plant_a.height_cm >= plant_b.height_cm else (plant_b, plant_a)
    tall_r, short_r = (ra, rb) if tall is plant_a else (rb, ra)
    tall_p, short_p = (pa, pb) if tall is plant_a else (pb, pa)
    if tall.height_cm >= 80 and tall.height_cm >= 1.6 * short.height_cm:
        sun_side = (
            tall_r.center[1] > short_r.center[1]
            if hemisphere is Hemisphere.NORTH
            else tall_r.center[1] < short_r.center[1]
        )
        x_overlap = min(tall_r.x2, short_r.x2) - max(tall_r.x, short_r.x)
        dy = abs(tall_r.center[1] - short_r.center[1])
        if sun_side and x_overlap > -20 and dy <= tall.height_cm:
            if short.shade_tolerant:
                out.append(
                    PairFinding(
                        tall_p.id, short_p.id, "shading", "info", 3 * influence, gap,
                        "compat.shade_benefit", {"a": tall.name(lang), "b": short.name(lang)},
                    )
                )  # fmt: skip
            else:
                out.append(
                    PairFinding(
                        tall_p.id, short_p.id, "shading", "warning", -8 * influence, gap,
                        "compat.shading", {"a": tall.name(lang), "b": short.name(lang), "height": tall.height_cm},
                    )
                )  # fmt: skip
    return out


def check_bed(
    bed: GardenBed,
    plantings: Sequence[Planting],
    db: PlantDatabase,
    *,
    timelines: dict[str, DateWindow] | None = None,
    planned: dict[str, DateWindow] | None = None,
    radius_cm: float = 60.0,
    lang: str = "en",
    hemisphere: Hemisphere = Hemisphere.NORTH,
) -> CompatibilityReport:
    """Companion + spacing analysis for all plantings of one bed.

    ``timelines`` maps planting id -> occupancy window; plantings that are
    never in the ground at the same time (succession!) never conflict.

    ``planned`` holds the occupancy *as planned* (not moved forward to today).
    Annuals of different seasons are compared with it: a crop of this season
    that is planned too late must not "roll over" into next season's plan and
    clash with crops the user does not even see in this season's view.  Real
    overlaps (garlic planted in autumn for next summer) are still found.
    """
    timelines = timelines or {}
    planned = planned or {}
    report = CompatibilityReport()
    bounds = Rect(0, 0, bed.width_cm, bed.length_cm)
    items = [(p, planting_rect(p), db.get(p.plant_id)) for p in plantings if p.bed_id == bed.id]
    items = [(p, r, plant) for p, r, plant in items if plant is not None]
    for p, r, _plant in items:
        if not bounds.contains(r):
            report.out_of_bounds.append(p.id)
    total = 0.0
    for i, (pa, ra, plant_a) in enumerate(items):
        for pb, rb, plant_b in items[i + 1 :]:
            windows = timelines
            if pa.season != pb.season and not plant_a.perennial and not plant_b.perennial:
                windows = {**timelines, **planned}
            if not _overlaps_in_time(windows.get(pa.id), windows.get(pb.id)):
                continue
            for finding in evaluate_pair(
                pa,
                ra,
                plant_a,
                pb,
                rb,
                plant_b,
                db,  # type: ignore[arg-type]
                radius_cm=radius_cm,
                lang=lang,
                hemisphere=hemisphere,
            ):
                report.pairs.append(finding)
                total += finding.score
    report.score = max(0.0, min(100.0, 50.0 + total))
    report.pairs.sort(key=lambda f: ({"error": 0, "warning": 1, "info": 2}[f.severity], f.score))
    # Better neighbours for every planting involved in a conflict.
    present = {p.plant_id for p, _r, _pl in items}
    for finding in report.pairs:
        if finding.severity == "info":
            continue
        for pid in (finding.a, finding.b):
            planting = next((p for p, _r, _pl in items if p.id == pid), None)
            if planting is None or pid in report.suggestions:
                continue
            report.suggestions[pid] = [
                other for other, _s in suggest_companions(planting.plant_id, db, limit=8) if other not in present
            ][:3]
    return report


# --------------------------------------------------------------------------- #
# Crop rotation
# --------------------------------------------------------------------------- #
def rotation_history(
    records: Iterable[RotationRecord],
    plantings: Iterable[Planting],
    db: PlantDatabase,
) -> list[RotationRecord]:
    """Manual history + history implied by the plantings of every season."""
    combined = list(records)
    seen = {(r.bed_id, r.season, r.family) for r in combined}
    for p in plantings:
        plant = db.get(p.plant_id)
        if plant is None or p.status.value == "failed":
            continue
        key = (p.bed_id, p.season, plant.family)
        if key not in seen:
            seen.add(key)
            combined.append(RotationRecord(p.bed_id, p.season, plant.family, p.plant_id, "planting"))
    return combined


def check_rotation(
    planting: Planting,
    bed: GardenBed,
    history: Iterable[RotationRecord],
    db: PlantDatabase,
    *,
    lang: str = "en",
) -> list[RotationFinding]:
    """Flag the same family in the same bed within ``rotation_years``.

    A family that returns *one* season early is a warning, sooner is an error.
    Perennials and plants with ``rotation_years <= 1`` are exempt.
    """
    plant = db.get(planting.plant_id)
    if plant is None or plant.perennial or plant.rotation_years <= 1:
        return []
    findings: list[RotationFinding] = []
    for rec in history:
        if rec.bed_id != bed.id or rec.family != plant.family:
            continue
        gap = planting.season - rec.season
        if 0 < gap < plant.rotation_years:
            findings.append(
                RotationFinding(
                    planting=planting.id,
                    bed_id=bed.id,
                    family=plant.family,
                    conflicting_season=rec.season,
                    years_required=plant.rotation_years,
                    severity="warning" if gap == plant.rotation_years - 1 else "error",
                    params={
                        "family": plant.family,
                        "bed": bed.name,
                        "season": rec.season,
                        "years": plant.rotation_years,
                        "plant": plant.name(lang),
                    },
                )
            )
    findings.sort(key=lambda f: -f.conflicting_season)
    return findings[:1]  # most recent conflict is the one that matters


def suggest_beds(
    planting: Planting,
    beds: Sequence[GardenBed],
    zones: Sequence[Zone],
    history: Iterable[RotationRecord],
    db: PlantDatabase,
) -> list[str]:
    """Beds where this crop would *not* break rotation and suits the zone."""
    plant = db.get(planting.plant_id)
    if plant is None:
        return []
    history = list(history)
    zone_by_id = {z.id: z for z in zones}
    out = []
    for bed in beds:
        if bed.id == planting.bed_id:
            continue
        zone = zone_by_id.get(bed.zone_id)
        if zone is not None and zone.is_enclosed and plant.greenhouse.suitability.value == "no":
            continue
        probe = Planting(id=planting.id, plant_id=planting.plant_id, bed_id=bed.id, season=planting.season)
        if not check_rotation(probe, bed, history, db):
            out.append(bed.id)
    return out


def suggest_companions(plant_id: str, db: PlantDatabase, *, limit: int = 5) -> list[tuple[str, int]]:
    """Best friends of a plant ordered by relation strength."""
    scored = []
    for other in db.friends_of(plant_id):
        scored.append((other, db.relation(plant_id, other).strength))
    scored.sort(key=lambda s: (-s[1], s[0]))
    return scored[:limit]
