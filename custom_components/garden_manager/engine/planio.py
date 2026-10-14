"""Import / export of garden plans (JSON- and YAML-friendly documents)."""

from __future__ import annotations

from collections.abc import Mapping
from datetime import datetime
from typing import Any, Literal

from .migrations import STORAGE_MINOR_VERSION, STORAGE_VERSION, migrate
from .models import (
    ArchivedPlan,
    Feature,
    GardenBed,
    GardenData,
    GardenLayout,
    Plant,
    Planting,
    RotationRecord,
    Task,
    Zone,
)
from .serde import from_dict, to_dict

FORMAT = "hortulus-plan"

ImportMode = Literal["replace", "merge"]


def export_plan(
    data: GardenData,
    *,
    now: datetime,
    include_tasks: bool = False,
    seasons: list[int] | None = None,
) -> dict[str, Any]:
    plantings = [p for p in data.plantings if seasons is None or p.season in seasons]
    doc: dict[str, Any] = {
        "format": FORMAT,
        "version": f"{STORAGE_VERSION}.{STORAGE_MINOR_VERSION}",
        "exported_at": now.isoformat(),
        "zones": [to_dict(z) for z in data.zones],
        "beds": [to_dict(b) for b in data.beds],
        "features": [to_dict(f) for f in data.features],
        "layouts": {season: to_dict(layout) for season, layout in data.layouts.items()},
        "layout_season": data.layout_season,
        "archived_plans": [to_dict(a) for a in data.archived_plans if seasons is None or a.season in seasons],
        "plantings": [to_dict(p) for p in plantings],
        "custom_plants": [to_dict(p) for p in data.custom_plants],
        "plant_overrides": to_dict(data.plant_overrides),
        "rotation_history": [to_dict(r) for r in data.rotation_history],
    }
    if include_tasks:
        # only tasks of the plantings in the file (and the garden-wide ones)
        kept = {p.id for p in plantings}
        doc["tasks"] = [to_dict(t) for t in data.tasks if not t.planting_id or t.planting_id in kept]
    return doc


class PlanImportError(ValueError):
    pass


def import_plan(data: GardenData, doc: Mapping[str, Any], mode: ImportMode = "merge") -> dict[str, int]:
    """Validate and apply an exported plan.  Returns counts per collection.

    * ``replace``: layout + plantings are replaced (tasks of removed plantings
      are dropped on the next generation run).
    * ``merge``: items are upserted by id; nothing is deleted.

    Zones, beds, garden elements and the per-season plans (``layouts``) all
    come along, so an export from one Hortulus (the website, another Home
    Assistant) rebuilds the whole garden map.
    """
    if doc.get("format") != FORMAT:
        raise PlanImportError("Not a Hortulus plan file (missing format: hortulus-plan)")
    try:
        major_s, _, minor_s = str(doc.get("version", "1.1")).partition(".")
        upgraded = migrate(dict(doc), int(major_s), int(minor_s or 1))
        zones = [from_dict(Zone, z) for z in upgraded.get("zones", [])]
        beds = [from_dict(GardenBed, b) for b in upgraded.get("beds", [])]
        features = [from_dict(Feature, f) for f in upgraded.get("features", [])]
        layouts = {str(k): from_dict(GardenLayout, v) for k, v in (upgraded.get("layouts") or {}).items()}
        plantings = [from_dict(Planting, p) for p in upgraded.get("plantings", [])]
        if "archived_plans" in upgraded and not isinstance(upgraded["archived_plans"], list):
            raise ValueError("archived_plans must be a list")
        archived = (
            [from_dict(ArchivedPlan, a) for a in upgraded["archived_plans"]] if "archived_plans" in upgraded else None
        )  # plans set aside travel too (a file without them leaves the ones already stored)
        plants = [from_dict(Plant, p) for p in upgraded.get("custom_plants", [])]
        history = [from_dict(RotationRecord, r) for r in upgraded.get("rotation_history", [])]
        tasks = [from_dict(Task, t) for t in upgraded["tasks"]] if isinstance(upgraded.get("tasks"), list) else None
    except (TypeError, ValueError, KeyError) as err:
        raise PlanImportError(f"Invalid plan: {err}") from err

    # Each plan's beds must sit in that plan's zones; plantings of other seasons may refer to
    # the beds of that season's plan.
    def check_beds(plan_beds: list[GardenBed], plan_zone_ids: set[str]) -> None:
        for bed in plan_beds:
            if bed.zone_id not in plan_zone_ids:
                raise PlanImportError(f"Bed {bed.name!r} references unknown zone {bed.zone_id!r}")

    check_beds(beds, {z.id for z in zones} | ({z.id for z in data.zones} if mode == "merge" else set()))
    for season, lay in layouts.items():
        kept = data.layouts.get(season) if mode == "merge" else None
        check_beds(lay.beds, {z.id for z in lay.zones} | ({z.id for z in kept.zones} if kept else set()))
    for plan in archived or []:
        check_beds(plan.beds, {z.id for z in plan.zones})
        for planting in plan.plantings:
            if planting.bed_id not in {b.id for b in plan.beds}:
                raise PlanImportError(
                    f"Plan {plan.name!r}: planting {planting.id!r} references unknown bed {planting.bed_id!r}"
                )
    all_layouts = [*layouts.values(), *(data.layouts.values() if mode == "merge" else [])]
    bed_ids = {b.id for b in beds} | ({b.id for b in data.beds} if mode == "merge" else set())
    bed_ids |= {b.id for lay in all_layouts for b in lay.beds}
    for planting in plantings:
        if planting.bed_id not in bed_ids:
            raise PlanImportError(f"Planting {planting.id!r} references unknown bed {planting.bed_id!r}")

    # Everything is checked before the first change: a refused file leaves the garden as it was.
    overrides = upgraded.get("plant_overrides", {})
    if overrides is None:
        overrides = {}
    if not isinstance(overrides, Mapping):
        raise PlanImportError("Invalid plan: plant_overrides must be a mapping")

    def upsert(current: list[Any], incoming: list[Any]) -> list[Any]:
        if mode == "replace":
            return list(incoming)
        by_id = {item.id: item for item in current}
        for item in incoming:
            by_id[item.id] = item
        return list(by_id.values())

    # Soil tests are records: a plan file without them keeps the ones already stored.
    stored_tests = {b.id: b.soil_tests for b in data.beds}
    for raw, bed in zip(upgraded.get("beds", []), beds, strict=True):
        if "soil_tests" not in raw and bed.id in stored_tests:
            bed.soil_tests = stored_tests[bed.id]
    data.zones = upsert(data.zones, zones)
    data.beds = upsert(data.beds, beds)
    # Garden elements (paths, sheds, trees ...) and the per-season plans travel with the zones.
    # An older file without them leaves the elements already in the garden alone.
    if "features" in upgraded or mode == "replace":
        data.features = upsert(data.features, features)
    if mode == "replace":
        data.layouts = layouts
        data.layout_season = upgraded.get("layout_season")
    else:
        # Merge never deletes: a season in both files keeps its stored items, the file's win by id
        # (as for the active map). The active season stays: the merged zones join the current map.
        for season, incoming in layouts.items():
            stored = data.layouts.get(season)
            data.layouts[season] = (
                incoming
                if stored is None
                else GardenLayout(
                    zones=upsert(stored.zones, incoming.zones),
                    beds=upsert(stored.beds, incoming.beds),
                    features=upsert(stored.features, incoming.features),
                    saved_at=incoming.saved_at or stored.saved_at,
                )
            )
        if data.layout_season is None:
            data.layout_season = upgraded.get("layout_season")
    data.plantings = upsert(data.plantings, plantings)
    if archived is not None:
        data.archived_plans = upsert(data.archived_plans, archived)
    if tasks is not None:  # the file was exported with its tasks
        data.tasks = upsert(data.tasks, tasks)
    data.custom_plants = upsert(data.custom_plants, plants)
    data.plant_overrides = dict(overrides) if mode == "replace" else {**data.plant_overrides, **overrides}
    if mode == "replace":
        data.rotation_history = history
    else:
        known = {(r.bed_id, r.season, r.family) for r in data.rotation_history}
        data.rotation_history += [r for r in history if (r.bed_id, r.season, r.family) not in known]
    data.revision += 1
    return {
        "zones": len(zones),
        "beds": len(beds),
        "features": len(features),
        "layouts": len(layouts),
        "plantings": len(plantings),
        "custom_plants": len(plants),
        "rotation_history": len(history),
        "tasks": len(tasks or []),
        "archived_plans": len(archived or []),
    }
