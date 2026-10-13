"""Old seasons out of the way: a lighter garden document, nothing lost.

Every planting stays in the garden document forever otherwise, and every
analysis run computes a timeline for each of them.  Seasons older than the
current one and the two before it move to a separate archive document: their
plantings and their garden plan (layout).  Crops still standing in the garden
(a perennial carried over into the current season) stay.

The garden document only lets go of a season once the archive holding it has
been read back from disk (:func:`prune_archived` at the next start-up):
Home Assistant's store logs a failed write instead of raising, so "saved"
cannot be taken on trust.

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


def archive_candidates(data: GardenData, current_season: int, keep: int = KEEP_SEASONS) -> dict[str, dict[str, Any]]:
    """What would move to the archive: ``{season: {"plantings": [...], "layout": {...} | None}}``.

    ``data`` is not changed: the garden document keeps everything until the
    archive is safely on disk (see :func:`prune_archived`).
    """
    cutoff = current_season - keep + 1
    moved: dict[str, dict[str, Any]] = {}
    for p in data.plantings:
        if p.season < cutoff and not present_in(p, True, current_season):
            moved.setdefault(str(p.season), {"plantings": [], "layout": None})["plantings"].append(to_dict(p))
    for key, layout in data.layouts.items():
        if key.isdigit() and int(key) < cutoff:
            moved.setdefault(key, {"plantings": [], "layout": None})["layout"] = to_dict(layout)
    return moved


def archive_index(archive: dict[str, dict[str, Any]]) -> dict[str, tuple[frozenset[str], bool]]:
    """Per season: the archived planting ids and whether the layout is archived."""
    return {
        season: (frozenset(str(p.get("id")) for p in part.get("plantings") or []), part.get("layout") is not None)
        for season, part in archive.items()
    }


def prune_archived(
    data: GardenData,
    stored: dict[str, tuple[frozenset[str], bool]],
    current_season: int,
    db: PlantDatabase,
    keep: int = KEEP_SEASONS,
) -> int:
    """Remove old seasons from ``data`` that ``stored`` (an :func:`archive_index` of the archive
    as read from disk) already holds.  Crop rotation gets a record for each removed planting.
    Returns the number of plantings and layouts removed."""
    cutoff = current_season - keep + 1
    seen = {(r.bed_id, r.season, r.family) for r in data.rotation_history}
    kept: list[Planting] = []
    removed = 0
    for p in data.plantings:
        ids = stored.get(str(p.season), (frozenset(), False))[0]
        if p.season >= cutoff or present_in(p, True, current_season) or p.id not in ids:
            kept.append(p)
            continue
        removed += 1
        plant = db.get(p.plant_id)
        if plant is not None and p.status is not PlantingStatus.FAILED and p.bed_id:
            key = (p.bed_id, p.season, plant.family)
            if key not in seen:
                seen.add(key)
                data.rotation_history.append(RotationRecord(p.bed_id, p.season, plant.family, p.plant_id, "planting"))
    data.plantings = kept
    for key in list(data.layouts):
        if key.isdigit() and int(key) < cutoff and stored.get(key, (frozenset(), False))[1]:
            del data.layouts[key]
            removed += 1
    return removed


def archive_old_seasons(
    data: GardenData, current_season: int, db: PlantDatabase, keep: int = KEEP_SEASONS
) -> dict[str, dict[str, Any]]:
    """Move old seasons out of ``data`` in one go (no disk in between); returns what moved."""
    moved = archive_candidates(data, current_season, keep)
    prune_archived(data, archive_index(moved), current_season, db, keep)
    return moved


def merge_archive(archive: dict[str, dict[str, Any]], moved: dict[str, dict[str, Any]]) -> None:
    """Add archived seasons to the archive document (one copy per planting id, the newest wins)."""
    for season, part in moved.items():
        target = archive.setdefault(season, {"plantings": [], "layout": None})
        fresh = {p.get("id") for p in part["plantings"]}
        target["plantings"] = [p for p in target["plantings"] if p.get("id") not in fresh] + list(part["plantings"])
        if part.get("layout") is not None:
            target["layout"] = part["layout"]


def with_season(data: GardenData, archive: dict[str, dict[str, Any]], season: int) -> GardenData:
    """``data`` with an archived season merged back in (a shallow copy; ``data`` is untouched).

    Besides the plantings of ``season`` itself this brings back older ones that
    were carried over into it (a perennial from 2020 kept until 2023 is archived
    under 2020 but belongs to the 2022 report too).
    """
    have = {p.id for p in data.plantings}
    extra: list[Planting] = []
    for key, part in archive.items():
        if not key.isdigit() or int(key) > season:
            continue
        for raw in part.get("plantings") or []:
            if raw.get("id") in have:
                continue
            planting = from_dict(Planting, raw)
            if planting.season == season or present_in(planting, True, season):
                have.add(planting.id)
                extra.append(planting)
    part = archive.get(str(season)) or {}
    layouts = data.layouts
    if part.get("layout") is not None and str(season) not in layouts:
        layouts = {**layouts, str(season): from_dict(GardenLayout, part["layout"])}
    if not extra and layouts is data.layouts:
        return data
    return dataclasses.replace(data, plantings=[*data.plantings, *extra], layouts=dict(layouts))
