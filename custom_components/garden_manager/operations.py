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
    GardenBed,
    GardenSettings,
    Plant,
    Planting,
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
) -> int:
    repo = runtime.repo
    if base_revision is not None and base_revision != repo.data.revision:
        raise RevisionConflict(f"revision {base_revision} != {repo.data.revision}")
    try:
        new_zones = [from_dict(Zone, z) for z in zones]
        new_beds = [from_dict(GardenBed, b) for b in beds]
        new_plantings = [from_dict(Planting, p) for p in plantings]
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
    repo.data.zones, repo.data.beds, repo.data.plantings = new_zones, new_beds, new_plantings
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
    try:
        repo.data.settings = from_dict(GardenSettings, merged)
    except (TypeError, ValueError, KeyError) as err:
        raise _err("invalid_settings", reason=str(err)) from err
    repo.async_changed("settings")
    return repo.data.settings
