"""Garden plans per season and the explicit year-end transition.

The garden plan (zones, beds, elements) is saved per season.  The plan of
``GardenData.layout_season`` lives in ``zones``/``beds``/``features`` - that
is the garden as it is now and what entities, tasks and irrigation work
with.  Plans of other seasons (last year's archive, next year's draft) live
in ``GardenData.layouts``.

Nothing moves into a new year by itself.  At the end of the year the
gardener opens the transition, chooses which zones and elements of the plan
and which perennials / overwintering crops go along, and applies it: the
new year's plan is created (or the draft kept), the chosen plantings get
``last_season`` extended, and the new plan becomes the live garden.

Pure module: no Home Assistant imports.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping
import copy
from dataclasses import dataclass, field
from datetime import date, datetime
from typing import Any, Literal

from .models import (
    ArchivedPlan,
    Feature,
    GardenBed,
    GardenData,
    GardenLayout,
    Planting,
    PlantingStatus,
    Zone,
    present_in,
)
from .plantdb import PlantDatabase
from .schedule import DateWindow

LayoutChoice = Literal["copy", "keep"]


# --------------------------------------------------------------------------- #
# Layout access
# --------------------------------------------------------------------------- #
def layout_for(data: GardenData, season: int) -> GardenLayout | None:
    """The garden plan of ``season`` (the live one is returned by reference)."""
    if data.layout_season is None or season == data.layout_season:
        return GardenLayout(zones=data.zones, beds=data.beds, features=data.features)
    return data.layouts.get(str(season))


def has_layout(data: GardenData, season: int) -> bool:
    return data.layout_season is None or season == data.layout_season or str(season) in data.layouts


def plan_seasons(data: GardenData) -> list[int]:
    """Seasons that have a saved garden plan."""
    out = {int(k) for k in data.layouts if str(k).lstrip("-").isdigit()}
    if data.layout_season is not None:
        out.add(data.layout_season)
    return sorted(out)


def copy_plan(data: GardenData, source: int, target: int, *, now: datetime | None = None) -> bool:
    """Give ``target`` a copy of ``source``'s plan (same ids) when it has none yet."""
    if has_layout(data, target):
        return False
    layout = layout_for(data, source)
    if layout is None:
        return False
    store_layout(
        data, target, copy.deepcopy(layout.zones), copy.deepcopy(layout.beds), copy.deepcopy(layout.features), now=now
    )
    return True


def store_layout(
    data: GardenData,
    season: int,
    zones: list[Zone],
    beds: list[GardenBed],
    features: list[Feature],
    *,
    now: datetime | None = None,
) -> bool:
    """Save the plan of ``season``.  Returns ``True`` when that is the live garden."""
    if data.layout_season is None or season == data.layout_season:
        data.zones, data.beds, data.features = zones, beds, features
        return True
    data.layouts[str(season)] = GardenLayout(zones=zones, beds=beds, features=features, saved_at=now)
    return False


def delete_layout(data: GardenData, season: int) -> bool:
    """Drop a stored (non-live) plan; the live garden cannot be deleted."""
    return data.layouts.pop(str(season), None) is not None


def all_bed_ids(data: GardenData) -> set[str]:
    """Beds of every saved plan (plantings may refer to any of them)."""
    ids = {b.id for b in data.beds}
    for layout in data.layouts.values():
        ids |= {b.id for b in layout.beds}
    for plan in data.archived_plans:
        ids |= {b.id for b in plan.beds}
    return ids


def adopt(data: GardenData, current_season: int, db: PlantDatabase) -> bool:
    """First load after the upgrade: the existing garden becomes this season's plan.

    Perennials used to stay in the plan by themselves; to keep the garden as
    the gardener knows it, the ones growing now are carried into this season
    once.  From then on every carry-over is explicit.  Returns ``True`` when
    something changed.
    """
    if data.layout_season is not None:
        return False
    data.layout_season = current_season
    for p in data.plantings:
        plant = db.get(p.plant_id)
        if plant is None or not plant.perennial or p.last_season is not None or p.season > current_season:
            continue
        if p.removed_season is not None and p.removed_season <= current_season:
            continue
        p.last_season = current_season
    return True


def pending_transition(data: GardenData, current_season: int) -> int | None:
    """The season still waiting for its year-end transition, if the calendar moved on."""
    if data.layout_season is None or current_season <= data.layout_season:
        return None
    return data.layout_season


# --------------------------------------------------------------------------- #
# Year-end transition
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class CarryCandidate:
    planting_id: str
    plant_id: str
    bed_id: str
    reason: Literal["perennial", "overwinter"]
    selected: bool

    def to_dict(self) -> dict[str, Any]:
        return {
            "planting_id": self.planting_id,
            "plant_id": self.plant_id,
            "bed_id": self.bed_id,
            "reason": self.reason,
            "selected": self.selected,
        }


@dataclass(slots=True)
class TransitionPreview:
    from_season: int
    to_season: int
    zones: list[Zone]
    features: list[Feature]
    beds: list[GardenBed]
    target_exists: bool
    candidates: list[CarryCandidate] = field(default_factory=list)
    is_live: bool = True

    def to_dict(self) -> dict[str, Any]:
        from .serde import to_dict

        return {
            "from_season": self.from_season,
            "to_season": self.to_season,
            "zones": [to_dict(z) for z in self.zones],
            "features": [to_dict(f) for f in self.features],
            "beds": [to_dict(b) for b in self.beds],
            "target_exists": self.target_exists,
            "is_live": self.is_live,
            "candidates": [c.to_dict() for c in self.candidates],
        }


def preview(
    data: GardenData,
    db: PlantDatabase,
    from_season: int,
    *,
    season_end: date | None = None,
    timelines: Mapping[str, DateWindow] | None = None,
) -> TransitionPreview:
    """What a transition ``from_season`` -> next year would offer to carry along.

    Perennials growing in ``from_season`` are pre-selected (unless finished or
    failed).  Annuals whose occupancy runs past ``season_end`` (garlic, winter
    leeks, overwintering onions) are offered as overwintering crops and
    pre-selected too.
    """
    source = layout_for(data, from_season) or GardenLayout()
    to_season = from_season + 1
    timelines = timelines or {}
    candidates: list[CarryCandidate] = []
    for p in data.plantings:
        if not present_in(p, False, from_season) or present_in(p, False, to_season):
            continue
        plant = db.get(p.plant_id)
        if plant is None:
            continue
        done = p.status in (PlantingStatus.FINISHED, PlantingStatus.FAILED) or p.finished_on is not None
        if plant.perennial:
            candidates.append(CarryCandidate(p.id, p.plant_id, p.bed_id, "perennial", not done))
            continue
        window = timelines.get(p.id)
        if season_end is not None and window is not None and window.end > season_end and not done:
            candidates.append(CarryCandidate(p.id, p.plant_id, p.bed_id, "overwinter", True))
    return TransitionPreview(
        from_season=from_season,
        to_season=to_season,
        zones=list(source.zones),
        features=list(source.features),
        beds=list(source.beds),
        target_exists=str(to_season) in data.layouts,
        candidates=candidates,
        is_live=data.layout_season in (None, from_season),
    )


@dataclass(slots=True)
class TransitionResult:
    to_season: int
    carried: list[str]
    skipped: list[str]  # plantings whose bed is not in the new plan
    activated: bool


def apply(
    data: GardenData,
    from_season: int,
    *,
    layout: LayoutChoice = "copy",
    zone_ids: Iterable[str] | None = None,
    feature_ids: Iterable[str] | None = None,
    planting_ids: Iterable[str] = (),
    activate: bool = True,
    now: datetime | None = None,
) -> TransitionResult:
    """Carry the chosen part of ``from_season`` into the next season.

    ``layout="copy"`` builds next year's plan from this year's: the chosen
    zones with all their beds and the chosen elements (ids are kept, so crop
    rotation and devices follow the beds).  ``layout="keep"`` uses next year's
    plan as already designed.  With ``activate`` next year's plan becomes the
    live garden and this year's is archived.
    """
    to_season = from_season + 1
    if data.layout_season is not None and to_season <= data.layout_season:
        raise ValueError(f"{from_season} is already closed")
    source = layout_for(data, from_season) or GardenLayout()
    if layout == "keep" and str(to_season) in data.layouts:
        target = data.layouts[str(to_season)]
    else:
        zones_wanted = set(zone_ids) if zone_ids is not None else {z.id for z in source.zones}
        features_wanted = set(feature_ids) if feature_ids is not None else {f.id for f in source.features}
        zones = [copy.deepcopy(z) for z in source.zones if z.id in zones_wanted]
        kept = {z.id for z in zones}
        target = GardenLayout(
            zones=zones,
            beds=[copy.deepcopy(b) for b in source.beds if b.zone_id in kept],
            features=[copy.deepcopy(f) for f in source.features if f.id in features_wanted],
            saved_at=now,
        )

    beds = {b.id for b in target.beds}
    carried, skipped = [], []
    wanted = set(planting_ids)
    for p in data.plantings:
        if p.id not in wanted:
            continue
        if not present_in(p, False, from_season) or p.bed_id not in beds:
            skipped.append(p.id)
            continue
        p.last_season = max(to_season, p.last_season or p.season)
        if p.removed_season is not None and p.removed_season <= to_season:
            p.removed_season = None
        carried.append(p.id)

    if activate and data.layout_season in (None, from_season):
        data.layouts[str(from_season)] = GardenLayout(
            zones=data.zones, beds=data.beds, features=data.features, saved_at=now
        )
        data.zones, data.beds, data.features = target.zones, target.beds, target.features
        data.layouts.pop(str(to_season), None)
        data.layout_season = to_season
    else:
        target.saved_at = target.saved_at or now
        data.layouts[str(to_season)] = target
        activate = False
    return TransitionResult(to_season, carried, skipped, activate)


def planting_bed_ok(planting: Planting, data: GardenData) -> bool:
    return planting.bed_id in all_bed_ids(data)


# --------------------------------------------------------------------------- #
# Start a new plan / set a plan aside
# --------------------------------------------------------------------------- #
NewPlanStart = Literal["empty", "zones", "zones_beds"]


def _set_aside(data: GardenData, season: int, name: str, plan_id: str, now: datetime | None) -> ArchivedPlan:
    """Move ``season``'s plan and its crops into an archived plan.

    Crops of this season leave the plan (kept in the archive); crops carried in
    from earlier years end the year before, so their history stays intact.
    """
    layout = layout_for(data, season) or GardenLayout()
    beds = {b.id for b in layout.beds}
    taken: list[Planting] = []
    keep: list[Planting] = []
    for p in data.plantings:
        if p.bed_id in beds and present_in(p, False, season):
            taken.append(copy.deepcopy(p))
            if p.season < season:
                p.last_season = season - 1
                keep.append(p)
            continue
        keep.append(p)
    data.plantings = keep
    plan = ArchivedPlan(
        id=plan_id,
        name=name,
        season=season,
        archived_at=now,
        zones=copy.deepcopy(layout.zones),
        beds=copy.deepcopy(layout.beds),
        features=copy.deepcopy(layout.features),
        plantings=taken,
    )
    data.archived_plans.append(plan)
    return plan


def start_new_plan(
    data: GardenData,
    season: int,
    *,
    start: NewPlanStart = "empty",
    old_name: str,
    plan_id: str,
    now: datetime | None = None,
) -> ArchivedPlan:
    """Set the current plan of ``season`` aside and begin a fresh one.

    ``empty`` starts from scratch; ``zones`` keeps the zones and the garden
    elements (house, paths ...) but no beds or crops; ``zones_beds`` keeps zones,
    beds and elements and only clears the crops.
    """
    layout = layout_for(data, season) or GardenLayout()
    zones = copy.deepcopy(layout.zones) if start != "empty" else []
    beds = copy.deepcopy(layout.beds) if start == "zones_beds" else []
    features = copy.deepcopy(layout.features) if start != "empty" else []
    plan = _set_aside(data, season, old_name, plan_id, now)
    store_layout(data, season, zones, beds, features, now=now)
    return plan


def activate_plan(
    data: GardenData, plan_id: str, *, old_name: str, new_id: str, now: datetime | None = None
) -> ArchivedPlan:
    """Make an archived plan active again; the plan it replaces is set aside."""
    plan = next((p for p in data.archived_plans if p.id == plan_id), None)
    if plan is None:
        raise KeyError(plan_id)
    replaced = _set_aside(data, plan.season, old_name, new_id, now)
    data.archived_plans = [p for p in data.archived_plans if p.id != plan_id]
    store_layout(data, plan.season, plan.zones, plan.beds, plan.features, now=now)
    by_id = {p.id: i for i, p in enumerate(data.plantings)}
    for p in plan.plantings:
        if p.id in by_id:
            data.plantings[by_id[p.id]] = p
        else:
            data.plantings.append(p)
    return replaced


def delete_plan(data: GardenData, plan_id: str) -> bool:
    before = len(data.archived_plans)
    data.archived_plans = [p for p in data.archived_plans if p.id != plan_id]
    return len(data.archived_plans) != before
