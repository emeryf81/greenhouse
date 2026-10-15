"""Versioned migrations for the stored garden document.

Home Assistant's ``Store`` tracks ``(version, minor_version)``.  Hortulus keeps
``version`` at 1 and uses *minor* versions for additive changes; a major
bump would be needed only for a breaking re-structure (HA then refuses to
downgrade).  Every step is a pure function ``dict -> dict`` so it can be
unit-tested and reused by the plan importer for files from older releases.

History
-------
1.1  initial release layout
1.2  ``plantings[].succession_group/succession_index`` (succession planting)
     and ``beds[].shape`` dropped in favour of ``kind``
1.3  ``tasks[].photos``, ``tasks[].notes`` as objects (were plain strings),
     ``settings.notifications`` block (was ``settings.notify_service``)
1.4  ``climate_log`` + ``notified`` (GDD and notification dedupe)
1.5  ``features`` (paths, compost ...), ``water_balance``, ``irrigation_log``,
     ``settings.irrigation`` / ``settings.resources``
1.6  garden plans per season (``layout_season``, ``layouts``) and explicit
     carry-over (``plantings[].last_season``); the season-dependent part
     (which year the plan is, which perennials stay this year) needs today's
     date and is done by :func:`.seasons.adopt` after loading
1.7  ``archived_plans`` (plans set aside with "start a new plan")
1.8  ``sensor_log``, ``climate_months``, ``frost_years`` (climate history and statistics)
"""

from __future__ import annotations

from collections.abc import Callable
import copy
from typing import Any

STORAGE_VERSION = 1
STORAGE_MINOR_VERSION = 8

Doc = dict[str, Any]


def _v1_1_to_1_2(doc: Doc) -> Doc:
    for planting in doc.get("plantings", []):
        planting.setdefault("succession_group", None)
        planting.setdefault("succession_index", 0)
    for bed in doc.get("beds", []):
        shape = bed.pop("shape", None)
        if "kind" not in bed:
            bed["kind"] = "container" if shape == "circle" else "raised"
    return doc


def _v1_2_to_1_3(doc: Doc) -> Doc:
    for task in doc.get("tasks", []):
        task.setdefault("photos", [])
        notes = task.get("notes", [])
        if notes and isinstance(notes[0], str):
            stamp = task.get("updated_at") or task.get("created_at") or "1970-01-01T00:00:00+00:00"
            task["notes"] = [{"at": stamp, "text": text, "author": None} for text in notes]
    settings = doc.setdefault("settings", {})
    legacy = settings.pop("notify_service", None)
    notifications = settings.setdefault("notifications", {})
    if legacy and not notifications.get("notify_services"):
        notifications["notify_services"] = [legacy]
    return doc


def _v1_3_to_1_4(doc: Doc) -> Doc:
    doc.setdefault("climate_log", [])
    doc.setdefault("notified", {})
    return doc


def _v1_4_to_1_5(doc: Doc) -> Doc:
    doc.setdefault("features", [])
    doc.setdefault("water_balance", {})
    doc.setdefault("irrigation_log", [])
    settings = doc.setdefault("settings", {})
    irrigation = settings.setdefault("irrigation", {})
    # 1.4 kept a per-bed valve only; derive the global mode from it.
    if "mode" not in irrigation:
        has_valves = any(b.get("irrigation_entity") for b in doc.get("beds", []))
        irrigation["mode"] = "advise" if has_valves else "off"
    settings.setdefault("resources", {})
    return doc


def _v1_5_to_1_6(doc: Doc) -> Doc:
    doc.setdefault("layout_season", None)
    doc.setdefault("layouts", {})
    for planting in doc.get("plantings", []):
        planting.setdefault("last_season", None)
    return doc


def _v1_6_to_1_7(doc: Doc) -> Doc:
    doc.setdefault("archived_plans", [])
    return doc


def _v1_7_to_1_8(doc: Doc) -> Doc:
    doc.setdefault("sensor_log", [])
    doc.setdefault("climate_months", [])
    doc.setdefault("frost_years", {})
    return doc


MIGRATIONS: dict[int, Callable[[Doc], Doc]] = {
    1: _v1_1_to_1_2,
    2: _v1_2_to_1_3,
    3: _v1_3_to_1_4,
    4: _v1_4_to_1_5,
    5: _v1_5_to_1_6,
    6: _v1_6_to_1_7,
    7: _v1_7_to_1_8,
}


class MigrationError(ValueError):
    """Stored data is from an unsupported (future major) version."""


def migrate(doc: Doc, major: int, minor: int) -> Doc:
    """Bring ``doc`` from ``major.minor`` to the current version."""
    if major > STORAGE_VERSION:
        raise MigrationError(f"Data version {major}.{minor} is newer than supported")
    out = copy.deepcopy(doc)
    current = max(minor, 1)
    while current < STORAGE_MINOR_VERSION:
        out = MIGRATIONS[current](out)
        current += 1
    return out
