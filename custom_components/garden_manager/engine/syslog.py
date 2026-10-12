"""System log: every change to the garden document, reversible per entry.

The repository diffs the stored document after each mutation against the
previous state and records *what* changed as item-level ``before``/``after``
pairs.  Undoing an entry writes the ``before`` values back - but only for
items that still look exactly like the entry left them, so a later edit is
never silently overwritten (the caller may force it).  An undo is itself a
logged change, so it can be undone again (redo).

Sensor bookkeeping (climate log, water balance, meter readings, notification
dedupe keys) and the revision counter are not actions and are not tracked.

Pure module: no Home Assistant imports, works on ``to_dict`` output.
"""

from __future__ import annotations

from collections.abc import Callable, Iterable, Mapping
import copy
from dataclasses import dataclass, field
import json
from typing import Any, Literal

Doc = dict[str, Any]
Op = Literal["add", "remove", "change"]

# list collections keyed by ``id``
ID_LISTS = (
    "zones",
    "beds",
    "plantings",
    "tasks",
    "custom_plants",
    "features",
    "harvest_log",
    "journal",
    "seed_stock",
)
# list collections without an id: an item is identified by its full content
CONTENT_LISTS = ("rotation_history", "irrigation_log")
# dict collections keyed by their own keys
MAPS = ("plant_overrides", "layouts")
SETTINGS = "settings"
# top-level scalars, tracked together as one pseudo collection
META = "meta"
META_KEYS = ("layout_season",)

MAX_ENTRIES = 500
# Upper bound for the stored before/after payload of all entries together.
MAX_BYTES = 4_000_000


def _content_key(item: Any) -> str:
    return json.dumps(item, sort_keys=True, default=str)


def snapshot(doc: Mapping[str, Any]) -> dict[str, dict[str, Any]]:
    """The tracked part of a document as ``{collection: {key: value}}``.

    Values are deep copies, so later in-place edits of the document do not
    leak into an older snapshot.
    """
    snap: dict[str, dict[str, Any]] = {}
    for col in ID_LISTS:
        snap[col] = {str(i.get("id")): copy.deepcopy(i) for i in doc.get(col) or [] if isinstance(i, dict)}
    for col in CONTENT_LISTS:
        snap[col] = {_content_key(i): copy.deepcopy(i) for i in doc.get(col) or []}
    for col in MAPS:
        snap[col] = copy.deepcopy(dict(doc.get(col) or {}))
    snap[SETTINGS] = copy.deepcopy(dict(doc.get(SETTINGS) or {}))
    snap[META] = {k: doc.get(k) for k in META_KEYS if k in doc}
    return snap


def diff(before: Mapping[str, Mapping[str, Any]], after: Mapping[str, Mapping[str, Any]]) -> list[dict[str, Any]]:
    """Item-level changes between two snapshots, in document order."""
    changes: list[dict[str, Any]] = []
    for col in (*ID_LISTS, *CONTENT_LISTS, *MAPS, SETTINGS, META):
        old, new = before.get(col, {}), after.get(col, {})
        old_keys = list(old)
        for key in [*old_keys, *(k for k in new if k not in old)]:
            in_old, in_new = key in old, key in new
            if in_old and in_new:
                if old[key] == new[key]:
                    continue
                op: Op = "change"
            else:
                op = "remove" if in_old else "add"
            change: dict[str, Any] = {
                "col": col,
                "key": key,
                "op": op,
                "before": old.get(key),
                "after": new.get(key),
            }
            if op == "remove":
                change["pos"] = old_keys.index(key)
            changes.append(change)
    return changes


# --------------------------------------------------------------------------- #
# Undo
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class UndoResult:
    doc: Doc
    conflicts: list[dict[str, Any]] = field(default_factory=list)
    problems: list[str] = field(default_factory=list)

    @property
    def ok(self) -> bool:
        return not self.conflicts and not self.problems


def _find(items: list[Any], col: str, key: str) -> int:
    for idx, item in enumerate(items):
        if col in ID_LISTS:
            if isinstance(item, dict) and str(item.get("id")) == key:
                return idx
        elif _content_key(item) == key:
            return idx
    return -1


def _current(doc: Doc, change: Mapping[str, Any]) -> tuple[bool, Any]:
    """``(present, value)`` of the item a change refers to, in ``doc``."""
    col, key = change["col"], change["key"]
    if col == SETTINGS:
        settings = doc.get(SETTINGS) or {}
        return key in settings, settings.get(key)
    if col == META:
        return key in doc, doc.get(key)
    if col in MAPS:
        mapping = doc.get(col) or {}
        return key in mapping, mapping.get(key)
    items = doc.get(col) or []
    idx = _find(items, col, key)
    return (idx >= 0, items[idx] if idx >= 0 else None)


def _expected(change: Mapping[str, Any]) -> tuple[bool, Any]:
    """What the item looked like right after the logged change."""
    if change["op"] == "remove":
        return False, None
    return True, change["after"]


def _write(doc: Doc, change: Mapping[str, Any]) -> None:
    """Put the ``before`` state of one change back into ``doc``."""
    col, key = change["col"], change["key"]
    restore = change["op"] != "add"
    value = copy.deepcopy(change["before"])
    if col == SETTINGS:
        doc.setdefault(SETTINGS, {})[key] = value
        return
    if col == META:
        doc[key] = value
        return
    if col in MAPS:
        mapping = doc.setdefault(col, {})
        if restore:
            mapping[key] = value
        else:
            mapping.pop(key, None)
        return
    items = doc.setdefault(col, [])
    idx = _find(items, col, key)
    if not restore:
        if idx >= 0:
            items.pop(idx)
    elif idx >= 0:
        items[idx] = value
    else:
        items.insert(min(int(change.get("pos", len(items))), len(items)), value)


def integrity_problems(doc: Doc, known_plants: Iterable[str] | None = None) -> list[str]:
    """References an undo could break: beds without zone, plantings without bed/plant."""
    zone_ids = {z.get("id") for z in doc.get("zones") or []}
    bed_ids = {b.get("id") for b in doc.get("beds") or []}
    plants = set(known_plants) if known_plants is not None else None
    if plants is not None:
        plants |= {p.get("id") for p in doc.get("custom_plants") or []}
    out: list[str] = []
    for bed in doc.get("beds") or []:
        if bed.get("zone_id") not in zone_ids:
            out.append(f"bed:{bed.get('id')}:zone")
    for planting in doc.get("plantings") or []:
        if planting.get("bed_id") not in bed_ids:
            out.append(f"planting:{planting.get('id')}:bed")
        if plants is not None and planting.get("plant_id") not in plants:
            out.append(f"planting:{planting.get('id')}:plant")
    return out


def undo(
    doc: Mapping[str, Any],
    changes: Iterable[Mapping[str, Any]],
    *,
    force: bool = False,
    known_plants: Iterable[str] | None = None,
) -> UndoResult:
    """Revert ``changes`` on a copy of ``doc``.

    A change whose item no longer matches its logged ``after`` state is a
    conflict; with conflicts nothing is applied unless ``force`` is set.
    Broken references (a planting whose bed is gone, ...) always block.
    """
    work: Doc = copy.deepcopy(dict(doc))
    changes = list(changes)
    conflicts = []
    for change in changes:
        if _current(work, change) != _expected(change):
            conflicts.append({"col": change["col"], "key": change["key"], "op": change["op"]})
    if conflicts and not force:
        return UndoResult(dict(doc), conflicts)
    before_problems = set(integrity_problems(work, known_plants))
    for change in reversed(changes):
        _write(work, change)
    problems = [p for p in integrity_problems(work, known_plants) if p not in before_problems]
    if problems:
        return UndoResult(dict(doc), conflicts, problems)
    return UndoResult(work, conflicts)


# --------------------------------------------------------------------------- #
# Entries
# --------------------------------------------------------------------------- #
def describe(change: Mapping[str, Any], ref: Callable[[str, str, Any], dict[str, Any]]) -> dict[str, Any]:
    """Short, display-ready summary of a change (names are resolved *now*, while they exist)."""
    item = change["after"] if change["op"] != "remove" else change["before"]
    return {"col": change["col"], "op": change["op"], **ref(change["col"], change["key"], item)}


def reference(col: str, key: str, item: Any, *, bed_names: Mapping[str, str]) -> dict[str, Any]:
    """What a change is about, in a few language-neutral fields the UI can render."""
    if col in (SETTINGS, META):
        return {"key": key}
    if col == "layouts":
        return {"season": int(key) if str(key).isdigit() else key}
    if col in MAPS:
        return {"plant_id": key}
    if not isinstance(item, dict):
        return {}
    if col == "plantings":
        bed = item.get("bed_id")
        return {"plant_id": item.get("plant_id"), "bed": bed_names.get(bed, bed), "season": item.get("season")}
    if col in ("zones", "beds", "features"):
        return {"name": item.get("name")}
    if col == "tasks":
        return {"name": item.get("title"), "status": item.get("status")}
    if col == "custom_plants":
        return {"plant_id": item.get("id")}
    if col in ("harvest_log", "seed_stock"):
        return {"plant_id": item.get("plant_id")}
    if col == "journal":
        text = str(item.get("text") or "")
        return {"name": text[:80] + ("…" if len(text) > 80 else "")}
    if col == "irrigation_log":
        bed = item.get("bed_id")
        return {"bed": bed_names.get(bed, bed)}
    if col == "rotation_history":
        bed = item.get("bed_id")
        return {"name": item.get("family"), "bed": bed_names.get(bed, bed), "season": item.get("season")}
    return {}


def make_entry(
    entry_id: str,
    at: str,
    reason: str,
    source: str,
    changes: list[dict[str, Any]],
    ref: Callable[[str, str, Any], dict[str, Any]],
    *,
    user: str | None = None,
    undo_of: str | None = None,
) -> dict[str, Any]:
    return {
        "id": entry_id,
        "at": at,
        "reason": reason,
        "source": source,
        "user": user,
        "undo_of": undo_of,
        "undone_by": None,
        "summary": [describe(c, ref) for c in changes],
        "changes": changes,
        "size": len(json.dumps(changes, default=str)),
    }


def append(
    entries: list[dict[str, Any]],
    entry: dict[str, Any],
    *,
    limit: int = MAX_ENTRIES,
    max_bytes: int = MAX_BYTES,
) -> list[dict[str, Any]]:
    """Add an entry (newest last), mark what it undid, and cap the log by count and size."""
    if entry.get("undo_of"):
        for old in entries:
            if old["id"] == entry["undo_of"]:
                old["undone_by"] = entry["id"]
                break
    entries = [*entries, entry][-limit:]
    total = sum(int(e.get("size") or 0) for e in entries)
    while len(entries) > 1 and total > max_bytes:
        total -= int(entries.pop(0).get("size") or 0)
    return entries


def public(entry: Mapping[str, Any]) -> dict[str, Any]:
    """An entry without its (large) before/after payload, for list views."""
    return {k: v for k, v in entry.items() if k not in ("changes", "size")} | {"count": len(entry.get("changes") or [])}
