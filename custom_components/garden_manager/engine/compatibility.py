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

The bed score is ``clamp(50 + sum, 0, 100)`` - 50 is neutral.  Every
contribution carries an i18n key + params so the UI can explain it.
"""

from __future__ import annotations

from collections.abc import Iterable, Sequence
from dataclasses import dataclass, field
from typing import Any, Literal

from .geometry import Rect, planting_rect
from .models import GardenBed, Plant, Planting, Relation, RotationRecord
from .plantdb import PlantDatabase
from .schedule import DateWindow

Severity = Literal["info", "warning", "error"]


@dataclass(slots=True)
class PairFinding:
    a: str  # planting id
    b: str
    kind: Literal["friend", "enemy", "overlap", "same_family"]
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
        }


@dataclass(slots=True)
class CompatibilityReport:
    score: float = 50.0
    pairs: list[PairFinding] = field(default_factory=list)
    rotation: list[RotationFinding] = field(default_factory=list)
    out_of_bounds: list[str] = field(default_factory=list)
    # Plant-vs-place problems, e.g. a crop that does not belong under glass.
    placement: list[dict[str, Any]] = field(default_factory=list)

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
    return findings


def check_bed(
    bed: GardenBed,
    plantings: Sequence[Planting],
    db: PlantDatabase,
    *,
    timelines: dict[str, DateWindow] | None = None,
    radius_cm: float = 60.0,
    lang: str = "en",
) -> CompatibilityReport:
    """Companion + spacing analysis for all plantings of one bed.

    ``timelines`` maps planting id -> occupancy window; plantings that are
    never in the ground at the same time (succession!) never conflict.
    """
    timelines = timelines or {}
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
            if not _overlaps_in_time(timelines.get(pa.id), timelines.get(pb.id)):
                continue
            for finding in evaluate_pair(
                pa,
                ra,
                plant_a,
                pb,
                rb,
                plant_b,
                db,
                radius_cm=radius_cm,
                lang=lang,  # type: ignore[arg-type]
            ):
                report.pairs.append(finding)
                total += finding.score
    report.score = max(0.0, min(100.0, 50.0 + total))
    report.pairs.sort(key=lambda f: ({"error": 0, "warning": 1, "info": 2}[f.severity], f.score))
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


def suggest_companions(plant_id: str, db: PlantDatabase, *, limit: int = 5) -> list[tuple[str, int]]:
    """Best friends of a plant ordered by relation strength."""
    scored = []
    for other in db.friends_of(plant_id):
        scored.append((other, db.relation(plant_id, other).strength))
    scored.sort(key=lambda s: (-s[1], s[0]))
    return scored[:limit]
