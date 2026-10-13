"""Old seasons out of the way: a lighter garden document, nothing lost.

Every planting stays in the garden document forever otherwise, and every
analysis run computes a timeline for each of them.  Seasons older than the
current one and the two before it move to a separate archive document: their
plantings and their garden plan (layout).  Crops still standing in the garden
(a perennial carried over into the current season) stay.

Crop rotation keeps working: for each archived planting the rotation history
gets a record (bed, season, family) unless it already has one.  The season
report and the season book can still show an archived season by merging it
back in for that one request (:func:`with_season`).
"""

from __future__ import annotations

import dataclasses
from typing import Any

from .models import GardenData, GardenLayout, Planting, PlantingStatus, RotationRecord, present_in
from .plantdb import PlantDatabase
from .serde import from_dict, to_dict

KEEP_SEASONS = 3  # the current season and the two before it stay in the garden document


def archive_old_seasons(
    data: GardenData, current_season: int, db: PlantDatabase, keep: int = KEEP_SEASONS
) -> dict[str, dict[str, Any]]:
    """Move old seasons out of ``data``; returns ``{season: {"plantings": [...], "layout": {...} | None}}``."""
    cutoff = current_season - keep + 1
    moved: dict[str, dict[str, Any]] = {}
    seen = {(r.bed_id, r.season, r.family) for r in data.rotation_history}
    kept: list[Planting] = []
    for p in data.plantings:
        if p.season >= cutoff or present_in(p, True, current_season):
            kept.append(p)
            continue
        moved.setdefault(str(p.season), {"plantings": [], "layout": None})["plantings"].append(to_dict(p))
        plant = db.get(p.plant_id)
        if plant is not None and p.status is not PlantingStatus.FAILED and p.bed_id:
            key = (p.bed_id, p.season, plant.family)
            if key not in seen:
                seen.add(key)
                data.rotation_history.append(RotationRecord(p.bed_id, p.season, plant.family, p.plant_id, "planting"))
    data.plantings = kept
    for key in list(data.layouts):
        if key.isdigit() and int(key) < cutoff:
            moved.setdefault(key, {"plantings": [], "layout": None})["layout"] = to_dict(data.layouts.pop(key))
    return moved


def merge_archive(archive: dict[str, dict[str, Any]], moved: dict[str, dict[str, Any]]) -> None:
    """Add freshly archived seasons to the archive document (idempotent per planting id)."""
    for season, part in moved.items():
        target = archive.setdefault(season, {"plantings": [], "layout": None})
        have = {p.get("id") for p in target["plantings"]}
        target["plantings"].extend(p for p in part["plantings"] if p.get("id") not in have)
        if part.get("layout") is not None:
            target["layout"] = part["layout"]


def with_season(data: GardenData, archive: dict[str, dict[str, Any]], season: int) -> GardenData:
    """``data`` with an archived season merged back in (a shallow copy; ``data`` is untouched)."""
    part = archive.get(str(season))
    if not part:
        return data
    have = {p.id for p in data.plantings}
    extra = [from_dict(Planting, p) for p in part["plantings"] if p.get("id") not in have]
    layouts = dict(data.layouts)
    if part.get("layout") is not None and str(season) not in layouts:
        layouts[str(season)] = from_dict(GardenLayout, part["layout"])
    return dataclasses.replace(data, plantings=[*data.plantings, *extra], layouts=layouts)
