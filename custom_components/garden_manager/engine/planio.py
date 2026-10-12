"""Import / export of garden plans (JSON- and YAML-friendly documents)."""

from __future__ import annotations

from collections.abc import Mapping
from datetime import datetime
from typing import Any, Literal

from .migrations import STORAGE_MINOR_VERSION, STORAGE_VERSION, migrate
from .models import GardenBed, GardenData, Plant, Planting, RotationRecord, Zone
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
        "plantings": [to_dict(p) for p in plantings],
        "custom_plants": [to_dict(p) for p in data.custom_plants],
        "plant_overrides": to_dict(data.plant_overrides),
        "rotation_history": [to_dict(r) for r in data.rotation_history],
    }
    if include_tasks:
        doc["tasks"] = [to_dict(t) for t in data.tasks]
    return doc


class PlanImportError(ValueError):
    pass


def import_plan(data: GardenData, doc: Mapping[str, Any], mode: ImportMode = "merge") -> dict[str, int]:
    """Validate and apply an exported plan.  Returns counts per collection.

    * ``replace``: layout + plantings are replaced (tasks of removed plantings
      are dropped on the next generation run).
    * ``merge``: items are upserted by id; nothing is deleted.
    """
    if doc.get("format") != FORMAT:
        raise PlanImportError("Not a Hortulus plan file (missing format: hortulus-plan)")
    try:
        major_s, _, minor_s = str(doc.get("version", "1.1")).partition(".")
        upgraded = migrate(dict(doc), int(major_s), int(minor_s or 1))
        zones = [from_dict(Zone, z) for z in upgraded.get("zones", [])]
        beds = [from_dict(GardenBed, b) for b in upgraded.get("beds", [])]
        plantings = [from_dict(Planting, p) for p in upgraded.get("plantings", [])]
        plants = [from_dict(Plant, p) for p in upgraded.get("custom_plants", [])]
        history = [from_dict(RotationRecord, r) for r in upgraded.get("rotation_history", [])]
    except (TypeError, ValueError, KeyError) as err:
        raise PlanImportError(f"Invalid plan: {err}") from err

    zone_ids = {z.id for z in zones} | ({z.id for z in data.zones} if mode == "merge" else set())
    for bed in beds:
        if bed.zone_id not in zone_ids:
            raise PlanImportError(f"Bed {bed.name!r} references unknown zone {bed.zone_id!r}")
    bed_ids = {b.id for b in beds} | ({b.id for b in data.beds} if mode == "merge" else set())
    for planting in plantings:
        if planting.bed_id not in bed_ids:
            raise PlanImportError(f"Planting {planting.id!r} references unknown bed {planting.bed_id!r}")

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
    data.plantings = upsert(data.plantings, plantings)
    data.custom_plants = upsert(data.custom_plants, plants)
    overrides = upgraded.get("plant_overrides") or {}
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
        "plantings": len(plantings),
        "custom_plants": len(plants),
        "rotation_history": len(history),
    }
