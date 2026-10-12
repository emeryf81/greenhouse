"""System log: diffing the document and reverting single entries."""

from __future__ import annotations

import copy

from custom_components.garden_manager.engine import syslog


def doc(**over):
    base = {
        "revision": 3,
        "settings": {"companion_radius_cm": 60, "snap_cm": 10},
        "zones": [{"id": "z1", "name": "Kas"}],
        "beds": [{"id": "b1", "name": "Bed 1", "zone_id": "z1"}],
        "plantings": [{"id": "p1", "plant_id": "tomato", "bed_id": "b1", "season": 2027}],
        "tasks": [],
        "plant_overrides": {},
        "rotation_history": [],
        "climate_log": [{"day": "2026-10-01", "tmin": 3}],
        "notified": {},
    }
    base.update(over)
    return base


def changes_between(a, b):
    return syslog.diff(syslog.snapshot(a), syslog.snapshot(b))


def test_diff_finds_added_removed_and_changed_items():
    old = doc()
    new = copy.deepcopy(old)
    new["plantings"].append({"id": "p2", "plant_id": "chili_pepper", "bed_id": "b1", "season": 2026})
    new["beds"][0]["name"] = "Kasbed"
    new["settings"]["snap_cm"] = 5
    new["zones"] = []
    changes = changes_between(old, new)
    got = {(c["col"], c["key"], c["op"]) for c in changes}
    assert got == {
        ("plantings", "p2", "add"),
        ("beds", "b1", "change"),
        ("settings", "snap_cm", "change"),
        ("zones", "z1", "remove"),
    }


def test_sensor_bookkeeping_is_not_an_action():
    old = doc()
    new = copy.deepcopy(old)
    new["climate_log"].append({"day": "2026-10-02", "tmin": 1})
    new["notified"]["frost"] = "2026-10-02"
    new["revision"] = 4
    assert changes_between(old, new) == []


def test_undo_reverts_one_entry_and_keeps_later_unrelated_changes():
    v0 = doc()
    v1 = copy.deepcopy(v0)
    v1["plantings"].append({"id": "p2", "plant_id": "chili_pepper", "bed_id": "b1", "season": 2026})
    first = changes_between(v0, v1)
    v2 = copy.deepcopy(v1)
    v2["settings"]["snap_cm"] = 5  # later, unrelated
    result = syslog.undo(v2, first)
    assert result.ok
    assert [p["id"] for p in result.doc["plantings"]] == ["p1"]
    assert result.doc["settings"]["snap_cm"] == 5


def test_undo_restores_a_deleted_item_at_its_place():
    v0 = doc(plantings=[{"id": f"p{i}", "plant_id": "tomato", "bed_id": "b1", "season": 2027} for i in range(3)])
    v1 = copy.deepcopy(v0)
    del v1["plantings"][1]
    result = syslog.undo(v1, changes_between(v0, v1))
    assert result.ok and [p["id"] for p in result.doc["plantings"]] == ["p0", "p1", "p2"]


def test_conflict_when_the_item_changed_again_unless_forced():
    v0 = doc()
    v1 = copy.deepcopy(v0)
    v1["beds"][0]["name"] = "Kasbed"
    entry = changes_between(v0, v1)
    v2 = copy.deepcopy(v1)
    v2["beds"][0]["name"] = "Serre"
    result = syslog.undo(v2, entry)
    assert not result.ok and result.conflicts == [{"col": "beds", "key": "b1", "op": "change"}]
    assert result.doc["beds"][0]["name"] == "Serre"  # untouched
    forced = syslog.undo(v2, entry, force=True)
    assert forced.doc["beds"][0]["name"] == "Bed 1"


def test_undo_never_leaves_a_planting_without_its_bed():
    v0 = doc(plantings=[])
    v1 = copy.deepcopy(v0)
    v1["plantings"].append({"id": "p9", "plant_id": "tomato", "bed_id": "b1", "season": 2027})
    v2 = copy.deepcopy(v1)
    v2["beds"], v2["plantings"] = [], []  # bed (and its plantings) deleted later
    removal = changes_between(v1, v2)
    # Undoing only the planting removal would orphan it -> blocked, even when forced.
    planting_only = [c for c in removal if c["col"] == "plantings"]
    blocked = syslog.undo(v2, planting_only, force=True)
    assert blocked.problems == ["planting:p9:bed"] and blocked.doc["plantings"] == []
    # Undoing the whole deletion brings both back.
    assert syslog.undo(v2, removal).ok


def test_undo_of_an_undo_is_a_redo():
    v0 = doc()
    v1 = copy.deepcopy(v0)
    v1["settings"]["companion_radius_cm"] = 90
    entry = changes_between(v0, v1)
    v2 = syslog.undo(v1, entry).doc
    redo = changes_between(v1, v2)
    assert syslog.undo(v2, redo).doc["settings"]["companion_radius_cm"] == 90


def test_entries_are_capped_and_mark_what_they_undid():
    ref = lambda col, key, item: syslog.reference(col, key, item, bed_names={"b1": "Bed 1"})  # noqa: E731
    change = {"col": "plantings", "key": "p1", "op": "add", "before": None,
              "after": {"id": "p1", "plant_id": "tomato", "bed_id": "b1", "season": 2027}}  # fmt: skip
    first = syslog.make_entry("e1", "2026-10-12T10:00:00", "plan", "user", [change], ref, user="Emery")
    assert first["summary"] == [{"col": "plantings", "op": "add", "plant_id": "tomato", "bed": "Bed 1", "season": 2027}]
    entries = syslog.append([], first)
    entries = syslog.append(entries, syslog.make_entry("e2", "t", "undo", "user", [], ref, undo_of="e1"))
    assert entries[0]["undone_by"] == "e2"
    for i in range(10):
        entries = syslog.append(entries, syslog.make_entry(f"x{i}", "t", "plan", "user", [], ref), limit=5)
    assert len(entries) == 5 and entries[-1]["id"] == "x9"
    big = syslog.make_entry("big", "t", "plan", "system", [{**change, "after": {"id": "p1", "x": "y" * 500}}], ref)
    assert [e["id"] for e in syslog.append(entries, big, max_bytes=400)] == ["big"]
    assert "changes" not in syslog.public(first) and syslog.public(first)["count"] == 1
