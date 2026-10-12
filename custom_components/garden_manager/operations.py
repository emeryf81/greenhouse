"""Write operations shared by services and the websocket API.

Keeping them in one place guarantees an automation calling
``garden_manager.complete_task`` and a click in the panel behave identically.
"""

from __future__ import annotations

from collections.abc import Mapping, Sequence
from datetime import date
from typing import TYPE_CHECKING, Any

from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.helpers import device_registry as dr
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.util import dt as dt_util

from .const import DOMAIN, EVENT_TASK_COMPLETED, SIGNAL_LAYOUT_CHANGED
from .engine.models import (
    Feature,
    GardenBed,
    GardenSettings,
    HarvestEntry,
    IrrigationEvent,
    JournalEntry,
    Plant,
    Planting,
    PlantingStatus,
    SeedPacket,
    SoilTest,
    Task,
    TaskNote,
    TaskPriority,
    TaskStatus,
    TaskType,
    Zone,
)
from .engine.plantdb import validate_plant_dict
from .engine.serde import from_dict, to_dict
from .engine.tasks import (
    CompletionResult,
    PostponeResult,
    complete_task,
    make_user_task,
    postpone_task,
)

if TYPE_CHECKING:
    from . import GardenRuntime


class RevisionConflict(HomeAssistantError):
    """The plan was changed elsewhere since the client loaded it."""


def _err(key: str, **placeholders: Any) -> ServiceValidationError:
    return ServiceValidationError(
        translation_domain=DOMAIN,
        translation_key=key,
        translation_placeholders={k: str(v) for k, v in placeholders.items()},
    )


# --------------------------------------------------------------------------- #
# Tasks
# --------------------------------------------------------------------------- #
def resolve_bed(runtime: GardenRuntime, ref: str | None) -> GardenBed | None:
    """Accept a bed id or (case-insensitive) bed name - handy in YAML."""
    if not ref:
        return None
    data = runtime.repo.data
    bed = data.bed(ref) or next((b for b in data.beds if b.name.casefold() == ref.casefold()), None)
    if bed is None:
        raise _err("unknown_bed", bed=ref)
    return bed


@callback
def op_add_task(
    runtime: GardenRuntime,
    *,
    title: str,
    due: date | None = None,
    task_type: str = "custom",
    description: str = "",
    priority: str = "normal",
    minutes: int | None = None,
    bed: str | None = None,
    planting_id: str | None = None,
    recurrence_days: int | None = None,
    until: date | None = None,
) -> str:
    data = runtime.repo.data
    bed_obj = resolve_bed(runtime, bed)
    if planting_id and data.planting(planting_id) is None:
        raise _err("unknown_planting", planting=planting_id)
    task = make_user_task(
        title=title,
        due=due or dt_util.now().date(),
        now=dt_util.now(),
        task_type=TaskType(task_type),
        description=description,
        priority=TaskPriority(priority),
        minutes=minutes,
        bed_id=bed_obj.id if bed_obj else None,
        zone_id=bed_obj.zone_id if bed_obj else None,
        planting_id=planting_id,
        recurrence_days=recurrence_days,
        until=until,
    )
    data.tasks.append(task)
    runtime.repo.async_changed("tasks")
    return task.id


@callback
def op_complete_task(
    hass: HomeAssistant,
    runtime: GardenRuntime,
    task_id: str,
    *,
    note: str | None = None,
    photos: Sequence[str] = (),
    skipped: bool = False,
    user_id: str | None = None,
) -> CompletionResult:
    data = runtime.repo.data
    try:
        result = complete_task(
            data,
            task_id,
            now=dt_util.now(),
            today=dt_util.now().date(),
            note=note,
            photos=photos,
            author=user_id,
            skipped=skipped,
            lang=runtime.coordinator.lang,
        )
    except KeyError as err:
        raise _err("unknown_task", task=task_id) from err
    task = result.task
    bed = data.bed(task.bed_id) if task.bed_id else None
    if task.type is TaskType.WATER and not skipped and bed is not None and bed.area_m2 > 0:
        # A ticked-off watering task feeds the bed's water balance.
        liters = float(task.title_params.get("liters") or 0)
        if liters > 0:
            data.irrigation_log.append(
                IrrigationEvent(bed.id, dt_util.now(), round(liters / bed.area_m2, 1), liters, source="task")
            )
    runtime.repo.async_changed("plan" if result.planting_changed else "tasks")
    hass.bus.async_fire(
        EVENT_TASK_COMPLETED,
        {
            "task_id": result.task.id,
            "type": result.task.type.value,
            "title": result.task.title,
            "skipped": skipped,
            "planting_id": result.task.planting_id,
            "bed_id": result.task.bed_id,
            "next_task_id": result.next_task.id if result.next_task else None,
        },
    )
    return result


@callback
def op_postpone_task(
    runtime: GardenRuntime,
    task_id: str,
    *,
    days: int | None = None,
    to: date | None = None,
    reason: str | None = None,
    cascade: bool = True,
) -> PostponeResult:
    try:
        result = postpone_task(
            runtime.repo.data, task_id, now=dt_util.now(), days=days, to=to, reason=reason, cascade=cascade
        )
    except KeyError as err:
        raise _err("unknown_task", task=task_id) from err
    runtime.repo.async_changed("tasks")
    return result


@callback
def op_update_task(runtime: GardenRuntime, task_id: str, changes: Mapping[str, Any]) -> None:
    task = runtime.repo.data.task(task_id)
    if task is None:
        raise _err("unknown_task", task=task_id)
    if "title" in changes:
        task.title = str(changes["title"])
        task.title_key = None
    if "description" in changes:
        task.description = str(changes["description"])
    if "priority" in changes:
        task.priority = TaskPriority(changes["priority"])
    if "estimated_minutes" in changes:
        task.estimated_minutes = int(changes["estimated_minutes"])
    if changes.get("note"):
        task.notes.append(TaskNote(dt_util.now(), str(changes["note"])))
    if "photos" in changes:
        task.photos = [str(p) for p in changes["photos"]]
    if "assignee" in changes:
        task.assignee = str(changes["assignee"]) or None if changes["assignee"] else None
    if changes.get("reopen"):
        task.status = TaskStatus.OPEN
        task.completed_at = None
    task.user_modified = True
    task.updated_at = dt_util.now()
    runtime.repo.async_changed("tasks")


@callback
def op_delete_task(runtime: GardenRuntime, task_id: str) -> None:
    data = runtime.repo.data
    task = data.task(task_id)
    if task is None:
        raise _err("unknown_task", task=task_id)
    if task.key and task.source.value != "user":
        # Generated tasks would be re-created; mark skipped instead.
        task.status = TaskStatus.SKIPPED
        task.completed_at = dt_util.now()
    else:
        data.tasks.remove(task)
    runtime.repo.async_changed("tasks")


# --------------------------------------------------------------------------- #
# Plan
# --------------------------------------------------------------------------- #
def validate_layout(
    zones: list[Zone], beds: list[GardenBed], plantings: list[Planting], known_plants: set[str]
) -> None:
    zone_ids = {z.id for z in zones}
    bed_ids = set()
    for bed in beds:
        if bed.zone_id not in zone_ids:
            raise _err("invalid_plan", reason=f"bed {bed.name} has unknown zone")
        if bed.width_cm <= 0 or bed.length_cm <= 0:
            raise _err("invalid_plan", reason=f"bed {bed.name} has no size")
        bed_ids.add(bed.id)
    for planting in plantings:
        if planting.bed_id not in bed_ids:
            raise _err("invalid_plan", reason=f"planting {planting.id} has unknown bed")
        if planting.plant_id not in known_plants:
            raise _err("invalid_plan", reason=f"unknown plant {planting.plant_id}")
    if len({z.id for z in zones}) != len(zones) or len(bed_ids) != len(beds):
        raise _err("invalid_plan", reason="duplicate ids")


@callback
def op_save_plan(
    hass: HomeAssistant,
    runtime: GardenRuntime,
    *,
    base_revision: int | None,
    zones: list[dict[str, Any]],
    beds: list[dict[str, Any]],
    plantings: list[dict[str, Any]],
    features: list[dict[str, Any]] | None = None,
) -> int:
    repo = runtime.repo
    if base_revision is not None and base_revision != repo.data.revision:
        raise RevisionConflict(f"revision {base_revision} != {repo.data.revision}")
    try:
        new_zones = [from_dict(Zone, z) for z in zones]
        new_beds = [from_dict(GardenBed, b) for b in beds]
        new_plantings = [from_dict(Planting, p) for p in plantings]
        new_features = [from_dict(Feature, f) for f in features] if features is not None else None
    except (TypeError, ValueError, KeyError) as err:
        raise _err("invalid_plan", reason=str(err)) from err
    validate_layout(new_zones, new_beds, new_plantings, {p.id for p in repo.db.all()})

    removed_devices = ({z.id for z in repo.data.zones} - {z.id for z in new_zones}) | (
        {b.id for b in repo.data.beds} - {b.id for b in new_beds}
    )
    layout_changed = (
        [z.id for z in repo.data.zones] != [z.id for z in new_zones]
        or [b.id for b in repo.data.beds] != [b.id for b in new_beds]
        or [(z.name, z.type) for z in repo.data.zones] != [(z.name, z.type) for z in new_zones]
        or [b.name for b in repo.data.beds] != [b.name for b in new_beds]
    )
    # Soil tests are edited through their own commands; a planner draft that
    # was opened earlier must not drop the ones added since.
    old_tests = {b.id: b.soil_tests for b in repo.data.beds}
    for bed in new_beds:
        if bed.id in old_tests:
            bed.soil_tests = old_tests[bed.id]
    repo.data.zones, repo.data.beds, repo.data.plantings = new_zones, new_beds, new_plantings
    if new_features is not None:
        repo.data.features = new_features
    repo.async_changed("plan")
    if removed_devices:
        _remove_devices(hass, runtime, removed_devices)
    if layout_changed:
        async_dispatcher_send(hass, SIGNAL_LAYOUT_CHANGED)
    return repo.data.revision


def _remove_devices(hass: HomeAssistant, runtime: GardenRuntime, ids: set[str]) -> None:
    registry = dr.async_get(hass)
    entry_id = runtime.coordinator.config_entry.entry_id
    for item_id in ids:
        device = registry.async_get_device(identifiers={(DOMAIN, f"{entry_id}_{item_id}")})
        if device:
            registry.async_remove_device(device.id)


# --------------------------------------------------------------------------- #
# Plants & settings
# --------------------------------------------------------------------------- #
@callback
def op_import_plan(hass: HomeAssistant, runtime: GardenRuntime, doc: Mapping[str, Any], mode: str) -> dict[str, int]:
    """Import a plan and keep devices/entities in sync (like ``op_save_plan``).

    Raises ``PlanImportError`` on invalid input; the caller turns it into a user error.
    """
    from .engine.planio import import_plan

    repo = runtime.repo
    old_zones = [(z.id, z.name, z.type) for z in repo.data.zones]
    old_beds = [(b.id, b.name) for b in repo.data.beds]
    counts = import_plan(repo.data, dict(doc), mode)
    repo.async_changed("import", bump_revision=False)
    removed = ({z[0] for z in old_zones} - {z.id for z in repo.data.zones}) | (
        {b[0] for b in old_beds} - {b.id for b in repo.data.beds}
    )
    if removed:
        _remove_devices(hass, runtime, removed)
    if old_zones != [(z.id, z.name, z.type) for z in repo.data.zones] or old_beds != [
        (b.id, b.name) for b in repo.data.beds
    ]:
        async_dispatcher_send(hass, SIGNAL_LAYOUT_CHANGED)
    return dict(counts)


def op_save_plant(runtime: GardenRuntime, raw: Mapping[str, Any], mode: str) -> Plant:
    repo = runtime.repo
    if mode == "override":
        plant_id = str(raw.get("id", ""))
        base = repo.db.get(plant_id)
        if base is None or base.source == "custom":
            raise _err("unknown_plant", plant=plant_id)
        patch = {k: v for k, v in raw.items() if k not in ("id", "source")}
        validate_plant_dict({**to_dict(base), **patch})
        repo.data.plant_overrides[plant_id] = patch
    else:
        try:
            plant = validate_plant_dict(raw)
        except ValueError as err:
            raise _err("invalid_plant", reason=str(err)) from err
        builtin = repo.db.get(plant.id)
        if builtin is not None and builtin.source != "custom":
            raise _err("invalid_plant", reason=f"id {plant.id} is used by the built-in database")
        repo.data.custom_plants = [p for p in repo.data.custom_plants if p.id != plant.id] + [plant]
    repo.async_changed("plants")
    result = repo.db.get(str(raw["id"]))
    assert result is not None
    return result


@callback
def op_delete_plant(runtime: GardenRuntime, plant_id: str) -> None:
    repo = runtime.repo
    if plant_id in repo.data.plant_overrides:
        del repo.data.plant_overrides[plant_id]  # reset to built-in
    else:
        if any(p.plant_id == plant_id for p in repo.data.plantings):
            raise _err("plant_in_use", plant=plant_id)
        repo.data.custom_plants = [p for p in repo.data.custom_plants if p.id != plant_id]
    repo.async_changed("plants")


def _deep_merge(base: dict[str, Any], patch: Mapping[str, Any]) -> dict[str, Any]:
    out = dict(base)
    for key, value in patch.items():
        if isinstance(value, Mapping) and isinstance(out.get(key), dict):
            out[key] = _deep_merge(out[key], value)
        else:
            out[key] = value
    return out


@callback
def op_save_settings(runtime: GardenRuntime, patch: Mapping[str, Any]) -> GardenSettings:
    repo = runtime.repo
    merged = _deep_merge(to_dict(repo.data.settings), patch)
    # Mappings are edited key by key; an empty value removes the key.
    for key in ("assignment", "person_notify"):
        if isinstance(merged.get(key), dict):
            merged[key] = {k: v for k, v in merged[key].items() if v}
    try:
        repo.data.settings = from_dict(GardenSettings, merged)
    except (TypeError, ValueError, KeyError) as err:
        raise _err("invalid_settings", reason=str(err)) from err
    repo.async_changed("settings")
    return repo.data.settings


# --------------------------------------------------------------------------- #
# Plantings (services: add / update / remove) and autofill
# --------------------------------------------------------------------------- #
PLANTING_FIELDS = {
    "plant_id", "bed_id", "season", "layout", "x_cm", "y_cm", "width_cm", "length_cm", "count", "method",
    "status", "sow_date", "transplant_date", "sown_on", "transplanted_on", "harvest_started_on", "finished_on",
    "notes",
}  # fmt: skip


def _check_planting(runtime: GardenRuntime, planting: Planting) -> None:
    repo = runtime.repo
    bed = repo.data.bed(planting.bed_id)
    if bed is None:
        raise _err("unknown_bed", bed=planting.bed_id)
    if repo.db.get(planting.plant_id) is None:
        raise _err("unknown_plant", plant=planting.plant_id)
    if planting.width_cm <= 0 or planting.length_cm <= 0:
        raise _err("invalid_plan", reason="planting has no size")


@callback
def op_add_planting(runtime: GardenRuntime, raw: Mapping[str, Any]) -> Planting:
    from .engine.tasks import new_id

    repo = runtime.repo
    bed = resolve_bed(runtime, str(raw.get("bed_id") or raw.get("bed") or ""))
    if bed is None:
        raise _err("unknown_bed", bed=raw.get("bed_id") or raw.get("bed"))
    plant = repo.db.get(str(raw.get("plant_id", "")))
    if plant is None:
        raise _err("unknown_plant", plant=raw.get("plant_id"))
    fields = {k: v for k, v in raw.items() if k in PLANTING_FIELDS}
    fields["bed_id"] = bed.id
    fields.setdefault("season", dt_util.now().year)
    # Default footprint: one row across the bed at the crop's row spacing.
    fields.setdefault("width_cm", bed.width_cm)
    fields.setdefault("length_cm", max(plant.row_spacing_cm, plant.spacing_cm))
    fields.setdefault("layout", "row")
    try:
        planting = from_dict(Planting, {"id": new_id(), **_jsonable(fields)})
    except (TypeError, ValueError, KeyError) as err:
        raise _err("invalid_plan", reason=str(err)) from err
    _check_planting(runtime, planting)
    repo.data.plantings.append(planting)
    repo.async_changed("plan")
    return planting


@callback
def op_update_planting(runtime: GardenRuntime, planting_id: str, changes: Mapping[str, Any]) -> Planting:
    repo = runtime.repo
    current = repo.data.planting(planting_id)
    if current is None:
        raise _err("unknown_planting", planting=planting_id)
    patch = {k: v for k, v in changes.items() if k in PLANTING_FIELDS}
    if "bed" in changes and "bed_id" not in patch:
        bed = resolve_bed(runtime, str(changes["bed"]))
        if bed is None:
            raise _err("unknown_bed", bed=changes["bed"])
        patch["bed_id"] = bed.id
    try:
        updated = from_dict(Planting, {**to_dict(current), **_jsonable(patch)})
    except (TypeError, ValueError, KeyError) as err:
        raise _err("invalid_plan", reason=str(err)) from err
    _check_planting(runtime, updated)
    repo.data.plantings = [updated if p.id == planting_id else p for p in repo.data.plantings]
    repo.async_changed("plan")
    return updated


@callback
def op_remove_planting(runtime: GardenRuntime, planting_id: str) -> None:
    repo = runtime.repo
    if repo.data.planting(planting_id) is None:
        raise _err("unknown_planting", planting=planting_id)
    repo.data.plantings = [p for p in repo.data.plantings if p.id != planting_id]
    repo.async_changed("plan")


@callback
def op_apply_autoplan(
    runtime: GardenRuntime, *, base_revision: int | None, plantings: list[dict[str, Any]], replace_beds: list[str]
) -> int:
    """Store an autofill proposal; ``replace_beds`` drops that season's crops first."""
    repo = runtime.repo
    if base_revision is not None and base_revision != repo.data.revision:
        raise RevisionConflict(f"revision {base_revision} != {repo.data.revision}")
    try:
        new = [from_dict(Planting, p) for p in plantings]
    except (TypeError, ValueError, KeyError) as err:
        raise _err("invalid_plan", reason=str(err)) from err
    for planting in new:
        _check_planting(runtime, planting)
    seasons = {p.season for p in new}
    keep = [p for p in repo.data.plantings if not (p.bed_id in replace_beds and p.season in seasons)]
    repo.data.plantings = keep + new
    repo.async_changed("plan")
    return repo.data.revision


@callback
def op_set_shading_mode(runtime: GardenRuntime, zone_ref: str, mode: str) -> Zone:
    repo = runtime.repo
    zone = repo.data.zone(zone_ref) or next(
        (z for z in repo.data.zones if z.name.casefold() == zone_ref.casefold()), None
    )
    if zone is None:
        raise _err("unknown_zone", zone=zone_ref)
    if not zone.is_enclosed:
        raise _err("not_enclosed", zone=zone.name)
    zone.shading_mode = mode  # type: ignore[assignment]
    repo.async_changed("settings", bump_revision=False)
    return zone


def _jsonable(fields: Mapping[str, Any]) -> dict[str, Any]:
    return {k: v.isoformat() if isinstance(v, date) else v for k, v in fields.items()}


# --------------------------------------------------------------------------- #
# Records: harvest log, garden diary, seed stock, soil tests
# --------------------------------------------------------------------------- #
def _new_id(prefix: str) -> str:
    import uuid

    return f"{prefix}_{uuid.uuid4().hex[:10]}"


@callback
def op_log_harvest(runtime: GardenRuntime, raw: Mapping[str, Any]) -> HarvestEntry:
    """Record a harvest.  ``planting`` (id) or ``plant`` (id) identifies the crop."""
    data = runtime.repo.data
    planting = data.planting(raw.get("planting_id")) if raw.get("planting_id") else None
    if raw.get("planting_id") and planting is None:
        raise _err("unknown_planting", planting=raw["planting_id"])
    plant_id = planting.plant_id if planting else str(raw.get("plant_id") or "")
    if runtime.repo.db.get(plant_id) is None:
        raise _err("unknown_plant", plant=plant_id or "-")
    kg = float(raw.get("kg") or 0)
    count = int(raw["count"]) if raw.get("count") not in (None, "") else None
    if kg < 0 or (count is not None and count < 0) or (kg == 0 and not count):
        raise _err("invalid_harvest")
    day = raw.get("day") or dt_util.now().date()
    entry = HarvestEntry(
        id=_new_id("hv"), day=day if isinstance(day, date) else date.fromisoformat(str(day)), plant_id=plant_id,
        kg=round(kg, 3), count=count, planting_id=planting.id if planting else None,
        bed_id=planting.bed_id if planting else raw.get("bed_id"),
        quality=int(raw["quality"]) if raw.get("quality") else None, note=str(raw.get("note") or ""),
    )  # fmt: skip
    data.harvest_log.append(entry)
    if planting is not None and planting.harvest_started_on is None:
        planting.harvest_started_on = entry.day
        if planting.status in (PlantingStatus.PLANNED, PlantingStatus.SOWN, PlantingStatus.TRANSPLANTED):
            planting.status = PlantingStatus.HARVESTING
    runtime.repo.async_changed("records")
    return entry


@callback
def op_delete_record(runtime: GardenRuntime, kind: str, record_id: str) -> None:
    data = runtime.repo.data
    lists = {"harvest": data.harvest_log, "journal": data.journal, "seed": data.seed_stock}
    items = lists.get(kind)
    if items is None:
        raise _err("invalid_record", kind=kind)
    before = len(items)
    items[:] = [i for i in items if i.id != record_id]
    if len(items) == before:
        raise _err("unknown_record", record=record_id)
    runtime.repo.async_changed("records")


@callback
def op_save_journal(runtime: GardenRuntime, raw: Mapping[str, Any]) -> JournalEntry:
    data = runtime.repo.data
    existing = next((j for j in data.journal if j.id == raw.get("id")), None) if raw.get("id") else None
    planting = data.planting(raw.get("planting_id")) if raw.get("planting_id") else None
    if not str(raw.get("text") or "").strip() and not raw.get("photos"):
        raise _err("invalid_journal")
    fields = {
        "text": str(raw.get("text") or ""),
        "photos": [str(p) for p in raw.get("photos") or []],
        "kind": raw.get("kind") or "note",
        "planting_id": planting.id if planting else None,
        "bed_id": raw.get("bed_id") or (planting.bed_id if planting else None),
        "zone_id": raw.get("zone_id"),
        "plant_id": raw.get("plant_id") or (planting.plant_id if planting else None),
    }
    if fields["kind"] not in ("note", "observation", "problem", "milestone"):
        raise _err("invalid_journal")
    if existing is not None:
        for key, value in fields.items():
            setattr(existing, key, value)
        entry = existing
    else:
        entry = JournalEntry(id=_new_id("jn"), at=dt_util.now(), author=raw.get("author"), **fields)
        data.journal.append(entry)
    runtime.repo.async_changed("records")
    return entry


@callback
def op_save_seed(runtime: GardenRuntime, raw: Mapping[str, Any]) -> SeedPacket:
    data = runtime.repo.data
    if runtime.repo.db.get(str(raw.get("plant_id") or "")) is None:
        raise _err("unknown_plant", plant=raw.get("plant_id") or "-")
    try:
        packet = from_dict(
            SeedPacket, {"id": raw.get("id") or _new_id("sd"), **{k: v for k, v in raw.items() if k != "id"}}
        )
    except (TypeError, ValueError, KeyError) as err:
        raise _err("invalid_seed", reason=str(err)) from err
    if packet.quantity < 0 or (packet.year is not None and not 1990 <= packet.year <= 2100):
        raise _err("invalid_seed", reason="quantity / year")
    data.seed_stock = [s for s in data.seed_stock if s.id != packet.id] + [packet]
    runtime.repo.async_changed("records")
    return packet


@callback
def op_save_soil_test(runtime: GardenRuntime, bed_ref: str, raw: Mapping[str, Any]) -> SoilTest:
    bed = resolve_bed(runtime, bed_ref)
    if bed is None:
        raise _err("unknown_bed", bed=bed_ref)
    try:
        test = from_dict(SoilTest, dict(raw))
    except (TypeError, ValueError, KeyError) as err:
        raise _err("invalid_soil_test", reason=str(err)) from err
    if test.ph is not None and not 3.0 <= test.ph <= 10.0:
        raise _err("invalid_soil_test", reason="pH 3-10")
    bed.soil_tests = [s for s in bed.soil_tests if s.date != test.date] + [test]
    bed.soil_tests.sort(key=lambda s: s.date)
    # Soil tests are records, not layout: an open planner must not get a conflict.
    runtime.repo.async_changed("plan", bump_revision=False)
    return test


@callback
def op_delete_soil_test(runtime: GardenRuntime, bed_ref: str, day: date) -> None:
    bed = resolve_bed(runtime, bed_ref)
    if bed is None:
        raise _err("unknown_bed", bed=bed_ref)
    bed.soil_tests = [s for s in bed.soil_tests if s.date != day]
    runtime.repo.async_changed("plan", bump_revision=False)


@callback
def op_assign_task(runtime: GardenRuntime, task_id: str, assignee: str | None) -> Task:
    task = runtime.repo.data.task(task_id)
    if task is None:
        raise _err("unknown_task", task=task_id)
    task.assignee = assignee or None
    task.user_modified = True
    task.updated_at = dt_util.now()
    runtime.repo.async_changed("tasks")
    return task


# --------------------------------------------------------------------------- #
# System log
# --------------------------------------------------------------------------- #
@callback
def op_undo(hass: HomeAssistant, runtime: GardenRuntime, entry_id: str, *, force: bool = False) -> dict[str, Any]:
    """Revert one system-log entry; keeps devices in sync like ``op_save_plan``.

    Returns ``{"ok", "conflicts", "problems", "entry"}``: with conflicts (items
    changed again since) nothing happens unless ``force``; broken references
    (e.g. a planting whose bed was deleted later) always block.
    """
    repo = runtime.repo
    old_zones = [(z.id, z.name, z.type) for z in repo.data.zones]
    old_beds = [(b.id, b.name) for b in repo.data.beds]
    try:
        result = repo.async_undo(entry_id, force=force)
    except KeyError as err:
        raise _err("unknown_log_entry", entry=entry_id) from err
    applied = result.ok or (force and not result.problems)
    if applied:
        removed = ({z[0] for z in old_zones} - {z.id for z in repo.data.zones}) | (
            {b[0] for b in old_beds} - {b.id for b in repo.data.beds}
        )
        if removed:
            _remove_devices(hass, runtime, removed)
        if old_zones != [(z.id, z.name, z.type) for z in repo.data.zones] or old_beds != [
            (b.id, b.name) for b in repo.data.beds
        ]:
            async_dispatcher_send(hass, SIGNAL_LAYOUT_CHANGED)
    entry = repo.syslog_entry(entry_id)
    return {
        "ok": applied,
        "conflicts": result.conflicts,
        "problems": result.problems,
        "undone_by": entry.get("undone_by") if entry else None,
        "revision": repo.data.revision,
    }
