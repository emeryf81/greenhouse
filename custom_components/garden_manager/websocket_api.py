"""Websocket API consumed by the Hortulus panel.

All commands live under ``garden_manager/``.  Reads are available to every
authenticated user; layout, plant database and settings writes require an
admin.  Task actions are allowed for everyone - family members tick off
chores too.
"""

from __future__ import annotations

from datetime import date
import json
from typing import TYPE_CHECKING, Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util, yaml as yaml_util
import voluptuous as vol

from .const import DOMAIN
from .engine import handbook
from .engine.advisor import advise, harvest_coverage
from .engine.autoplan import AutoplanOptions, autoplan
from .engine.compatibility import check_bed, check_rotation, rotation_history, suggest_companions
from .engine.i18n import t
from .engine.models import GardenBed, GardenResources, Planting
from .engine.planio import PlanImportError, export_plan, import_plan
from .engine.plantdb import FAMILIES
from .engine.printout import PrintOptions
from .engine.qa import answer as qa_answer, options as qa_options
from .engine.region import resolve_profile, season_anchors, season_for_date
from .engine.schedule import plant_windows, planting_timeline
from .engine.serde import from_dict, to_dict
from .engine.succession import expand_succession
from .engine.supplies import catalog as supplies_catalog, shopping_list
from .operations import (
    RevisionConflict,
    op_add_task,
    op_apply_autoplan,
    op_complete_task,
    op_delete_plant,
    op_delete_task,
    op_postpone_task,
    op_save_plan,
    op_save_plant,
    op_save_settings,
    op_update_task,
)
from .printing import async_render_svg

if TYPE_CHECKING:
    from . import GardenRuntime

DONE_TASK_WINDOW_DAYS = 60


@callback
def async_setup_websocket(hass: HomeAssistant) -> None:
    for command in (
        ws_subscribe,
        ws_plants,
        ws_plant_save,
        ws_plant_delete,
        ws_plant_windows,
        ws_plan_save,
        ws_plan_check,
        ws_plan_succession,
        ws_plan_export,
        ws_plan_import,
        ws_task_add,
        ws_task_action,
        ws_settings_save,
        ws_autofill,
        ws_autofill_apply,
        ws_print_render,
        ws_handbook_index,
        ws_handbook_chapter,
        ws_handbook_search,
        ws_irrigation_plan,
        ws_irrigation_run,
        ws_irrigation_stop,
        ws_advice,
        ws_qa_options,
        ws_qa_ask,
        ws_supplies,
    ):
        websocket_api.async_register_command(hass, command)


def _runtime(hass: HomeAssistant) -> GardenRuntime | None:
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    return entries[0].runtime_data if entries else None


def _require_runtime(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> GardenRuntime | None:
    runtime = _runtime(hass)
    if runtime is None:
        connection.send_error(msg["id"], "not_loaded", "Hortulus is not set up")
    return runtime


def build_snapshot(runtime: GardenRuntime) -> dict[str, Any]:
    """Everything the panel renders, in one JSON document."""
    data = runtime.repo.data
    coordinator = runtime.coordinator
    cutoff = dt_util.now().date().toordinal() - DONE_TASK_WINDOW_DAYS
    tasks = [t for t in data.tasks if t.is_open or t.due.toordinal() >= cutoff]
    weather = coordinator.weather
    return {
        "revision": data.revision,
        "lang": coordinator.lang,
        "settings": to_dict(data.settings),
        "zones": [to_dict(z) for z in data.zones],
        "beds": [to_dict(b) for b in data.beds],
        "plantings": [to_dict(p) for p in data.plantings],
        "tasks": [to_dict(t) for t in tasks],
        "rotation_history": [to_dict(r) for r in data.rotation_history],
        "features": [to_dict(f) for f in data.features],
        "irrigation_log": [to_dict(e) for e in data.irrigation_log[-50:]],
        "irrigation_status": {
            "running": runtime.irrigation.running,
            "bed_id": runtime.irrigation.status.bed_id,
            "ends_at": runtime.irrigation.status.ends_at.isoformat() if runtime.irrigation.status.ends_at else None,
            "last_error": runtime.irrigation.status.last_error,
        },
        "analysis": coordinator.data.to_dict() if coordinator.data else None,
        "weather": {
            "available": weather.available,
            "temperature": weather.temperature,
            "condition": weather.condition,
            "fetched_at": weather.fetched_at.isoformat() if weather.fetched_at else None,
            "daily": [to_dict(p) for p in weather.daily[:7]],
            "hourly": [to_dict(p) for p in weather.hourly[:48]],
            "error": weather.error,
        },
    }


# --------------------------------------------------------------------------- #
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe"})
@callback
def ws_subscribe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Push a full snapshot now and after every coordinator update."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return

    @callback
    def push() -> None:
        connection.send_message(websocket_api.event_message(msg["id"], build_snapshot(runtime)))

    unsub = runtime.coordinator.async_add_listener(push)
    connection.subscriptions[msg["id"]] = unsub
    connection.send_result(msg["id"])
    push()


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/plants"})
@callback
def ws_plants(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    db = runtime.repo.db
    connection.send_result(
        msg["id"],
        {
            "plants": db.as_dicts(),
            "families": FAMILIES,
            "overrides": runtime.repo.data.plant_overrides,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plants/save",
        vol.Required("plant"): dict,
        vol.Optional("mode", default="custom"): vol.In(["custom", "override"]),
    }
)
@websocket_api.require_admin
@callback
def ws_plant_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    try:
        plant = op_save_plant(runtime, msg["plant"], msg["mode"])
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "invalid_plant", str(err))
        return
    connection.send_result(msg["id"], {"plant": to_dict(plant)})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/plants/delete", vol.Required("plant_id"): str})
@websocket_api.require_admin
@callback
def ws_plant_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    try:
        op_delete_plant(runtime, msg["plant_id"])
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "plant_in_use", str(err))
        return
    connection.send_result(msg["id"])


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plants/windows",
        vol.Required("plant_id"): str,
        vol.Optional("zone_id"): vol.Any(str, None),
        vol.Optional("season"): vol.Any(int, None),
    }
)
@callback
def ws_plant_windows(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Absolute sowing windows of a plant (library + planner tooltips)."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    db = runtime.repo.db
    plant = db.get(msg["plant_id"])
    if plant is None:
        connection.send_error(msg["id"], "unknown_plant", msg["plant_id"])
        return
    region = data.settings.region
    season = msg.get("season") or season_for_date(region, dt_util.now().date())
    anchors = season_anchors(region, season)
    windows = plant_windows(plant, anchors, data.zone(msg.get("zone_id")))
    connection.send_result(
        msg["id"],
        {
            "season": season,
            "windows": windows.to_dict(),
            "companions": [{"plant_id": pid, "strength": s} for pid, s in suggest_companions(plant.id, db)],
            "enemies": db.enemies_of(plant.id),
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/save",
        vol.Optional("base_revision"): vol.Any(int, None),
        vol.Required("zones"): list,
        vol.Required("beds"): list,
        vol.Required("plantings"): list,
        vol.Optional("features"): list,
    }
)
@websocket_api.require_admin
@callback
def ws_plan_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    try:
        revision = op_save_plan(
            hass,
            runtime,
            base_revision=msg.get("base_revision"),
            zones=msg["zones"],
            beds=msg["beds"],
            plantings=msg["plantings"],
            features=msg.get("features"),
        )
    except RevisionConflict as err:
        connection.send_error(msg["id"], "revision_conflict", str(err))
        return
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    connection.send_result(msg["id"], {"revision": revision})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/check",
        vol.Required("bed"): dict,
        vol.Required("plantings"): list,
    }
)
@callback
def ws_plan_check(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Live feedback for a *draft* bed while dragging (nothing is saved)."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    db = runtime.repo.db
    lang = runtime.coordinator.lang
    try:
        bed = from_dict(GardenBed, msg["bed"])
        plantings = [from_dict(Planting, p) for p in msg["plantings"]]
    except (TypeError, ValueError, KeyError) as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    today = dt_util.now().date()
    zone = data.zone(bed.zone_id)
    timelines = {}
    for p in plantings:
        plant = db.get(p.plant_id)
        if plant is not None:
            timelines[p.id] = planting_timeline(p, plant, season_anchors(data.settings.region, p.season), zone, today)
    report = check_bed(
        bed,
        plantings,
        db,
        timelines={k: v.occupancy for k, v in timelines.items()},
        radius_cm=data.settings.companion_radius_cm,
        lang=lang,
        hemisphere=resolve_profile(data.settings.region).hemisphere,
    )
    others = [p for p in data.plantings if p.id not in {d.id for d in plantings}]
    history = rotation_history(data.rotation_history, others, db)
    rotation = [f.to_dict() for p in plantings for f in check_rotation(p, bed, history, db, lang=lang)]
    connection.send_result(
        msg["id"],
        {
            **report.to_dict(),
            "rotation": rotation,
            "timelines": {k: v.to_dict() for k, v in timelines.items()},
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/succession",
        vol.Required("planting"): dict,
        vol.Required("count"): vol.All(int, vol.Range(min=1, max=20)),
        vol.Optional("interval_days"): vol.Any(None, vol.All(int, vol.Range(min=1, max=120))),
        vol.Optional("placement", default="split"): vol.In(["split", "stack"]),
    }
)
@callback
def ws_plan_succession(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    try:
        base = from_dict(Planting, msg["planting"])
    except (TypeError, ValueError, KeyError) as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    plant = runtime.repo.db.get(base.plant_id)
    bed = data.bed(base.bed_id)
    if plant is None:
        connection.send_error(msg["id"], "unknown_plant", base.plant_id)
        return
    zone = data.zone(bed.zone_id) if bed else None
    plantings, dropped = expand_succession(
        base,
        plant,
        season_anchors(data.settings.region, base.season),
        zone,
        count=msg["count"],
        interval_days=msg.get("interval_days"),
        placement=msg["placement"],
    )
    connection.send_result(msg["id"], {"plantings": [to_dict(p) for p in plantings], "dropped": dropped})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/export",
        vol.Optional("format", default="json"): vol.In(["json", "yaml"]),
        vol.Optional("include_tasks", default=False): bool,
    }
)
@callback
def ws_plan_export(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    doc = export_plan(runtime.repo.data, now=dt_util.now(), include_tasks=msg["include_tasks"])
    stamp = date.today().isoformat()
    if msg["format"] == "yaml":
        content = yaml_util.dump(doc)
        filename = f"hortulus-plan-{stamp}.yaml"
    else:
        content = json.dumps(doc, indent=2, ensure_ascii=False)
        filename = f"hortulus-plan-{stamp}.json"
    connection.send_result(msg["id"], {"filename": filename, "content": content})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/import",
        vol.Required("content"): str,
        vol.Optional("mode", default="merge"): vol.In(["merge", "replace"]),
    }
)
@websocket_api.require_admin
@callback
def ws_plan_import(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    text = msg["content"].strip()
    try:
        doc = json.loads(text) if text.startswith("{") else yaml_util.parse_yaml(text)
        if not isinstance(doc, dict):
            raise PlanImportError("Plan must be a mapping")
        counts = import_plan(runtime.repo.data, doc, msg["mode"])
    except (PlanImportError, ValueError, HomeAssistantError) as err:
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    runtime.repo.async_changed("import", bump_revision=False)
    connection.send_result(msg["id"], {"counts": counts, "revision": runtime.repo.data.revision})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/tasks/add",
        vol.Required("title"): str,
        vol.Optional("due"): vol.Any(str, None),
        vol.Optional("task_type", default="custom"): str,
        vol.Optional("description", default=""): str,
        vol.Optional("priority", default="normal"): vol.In(["low", "normal", "high", "urgent"]),
        vol.Optional("estimated_minutes"): vol.Any(int, None),
        vol.Optional("bed_id"): vol.Any(str, None),
        vol.Optional("planting_id"): vol.Any(str, None),
        vol.Optional("recurrence_days"): vol.Any(int, None),
        vol.Optional("until"): vol.Any(str, None),
    }
)
@callback
def ws_task_add(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    try:
        task_id = op_add_task(
            runtime,
            title=msg["title"],
            due=date.fromisoformat(msg["due"]) if msg.get("due") else None,
            task_type=msg["task_type"],
            description=msg["description"],
            priority=msg["priority"],
            minutes=msg.get("estimated_minutes"),
            bed=msg.get("bed_id"),
            planting_id=msg.get("planting_id"),
            recurrence_days=msg.get("recurrence_days"),
            until=date.fromisoformat(msg["until"]) if msg.get("until") else None,
        )
    except (HomeAssistantError, ValueError) as err:
        connection.send_error(msg["id"], "invalid_task", str(err))
        return
    connection.send_result(msg["id"], {"task_id": task_id})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/tasks/action",
        vol.Required("task_id"): str,
        vol.Required("action"): vol.In(["complete", "skip", "postpone", "update", "delete", "reopen"]),
        vol.Optional("note"): vol.Any(str, None),
        vol.Optional("photos"): [str],
        vol.Optional("days"): vol.Any(int, None),
        vol.Optional("to"): vol.Any(str, None),
        vol.Optional("cascade", default=True): bool,
        vol.Optional("changes"): dict,
    }
)
@callback
def ws_task_action(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    task_id, action = msg["task_id"], msg["action"]
    result: dict[str, Any] = {}
    try:
        if action in ("complete", "skip"):
            res = op_complete_task(
                hass,
                runtime,
                task_id,
                note=msg.get("note"),
                photos=msg.get("photos", []),
                skipped=action == "skip",
                user_id=connection.user.id,
            )
            result = {"next_task_id": res.next_task.id if res.next_task else None}
        elif action == "postpone":
            res_p = op_postpone_task(
                runtime,
                task_id,
                days=msg.get("days"),
                to=date.fromisoformat(msg["to"]) if msg.get("to") else None,
                reason=msg.get("note"),
                cascade=msg["cascade"],
            )
            result = {"shifted": [t.id for t in res_p.shifted], "warnings": res_p.warnings}
        elif action == "delete":
            op_delete_task(runtime, task_id)
        else:
            changes = dict(msg.get("changes") or {})
            if action == "reopen":
                changes["reopen"] = True
            if msg.get("note"):
                changes["note"] = msg["note"]
            if "photos" in msg:
                changes["photos"] = msg["photos"]
            op_update_task(runtime, task_id, changes)
    except (HomeAssistantError, ValueError) as err:
        connection.send_error(msg["id"], "task_error", str(err))
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/settings/save", vol.Required("settings"): dict})
@websocket_api.require_admin
@callback
def ws_settings_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    try:
        settings = op_save_settings(runtime, msg["settings"])
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "invalid_settings", str(err))
        return
    connection.send_result(msg["id"], {"settings": to_dict(settings)})


# --------------------------------------------------------------------------- #
# Autofill
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/autofill",
        vol.Optional("season"): int,
        vol.Optional("bed_ids"): [str],
        vol.Optional("replace", default=False): bool,
        vol.Optional("resources"): dict,
        vol.Optional("max_crops", default=16): vol.All(int, vol.Range(min=1, max=60)),
        vol.Optional("remember", default=True): bool,
    }
)
@websocket_api.async_response
async def ws_autofill(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Propose a plan; nothing is stored except (optionally) the resources."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    resources = data.settings.resources
    if msg.get("resources"):
        try:
            resources = from_dict(GardenResources, {**to_dict(resources), **msg["resources"]})
        except (TypeError, ValueError, KeyError) as err:
            connection.send_error(msg["id"], "invalid_format", str(err))
            return
        if msg["remember"] and connection.user.is_admin:
            op_save_settings(runtime, {"resources": to_dict(resources)})
    today = dt_util.now().date()
    season = msg.get("season") or season_for_date(data.settings.region, today)
    opts = AutoplanOptions(
        season=season,
        bed_ids=msg.get("bed_ids"),
        replace=msg["replace"],
        max_crops=msg["max_crops"],
        lang=runtime.coordinator.lang,
    )
    result = await hass.async_add_executor_job(
        lambda: autoplan(data, runtime.repo.db, opts, today=today, resources=resources)
    )
    connection.send_result(msg["id"], {**result.to_dict(), "season": season, "revision": data.revision})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/autofill/apply",
        vol.Optional("base_revision"): vol.Any(int, None),
        vol.Required("plantings"): list,
        vol.Optional("replace_beds", default=[]): [str],
    }
)
@websocket_api.require_admin
@callback
def ws_autofill_apply(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    try:
        revision = op_apply_autoplan(
            runtime,
            base_revision=msg.get("base_revision"),
            plantings=msg["plantings"],
            replace_beds=msg["replace_beds"],
        )
    except RevisionConflict as err:
        connection.send_error(msg["id"], "revision_conflict", str(err))
        return
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    connection.send_result(msg["id"], {"revision": revision})


# --------------------------------------------------------------------------- #
# Print preview (the PDF itself comes from the authenticated HTTP view)
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/print/render", vol.Required("options"): dict})
@websocket_api.async_response
async def ws_print_render(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    try:
        opts = PrintOptions.from_dict({"lang": runtime.coordinator.lang, **msg["options"]})
    except (ValueError, TypeError) as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    pages = await async_render_svg(hass, runtime, opts)
    connection.send_result(msg["id"], {"pages": pages})


# --------------------------------------------------------------------------- #
# Handbook
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/handbook/index", vol.Optional("lang"): str})
@websocket_api.async_response
async def ws_handbook_index(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    runtime = _runtime(hass)
    lang = msg.get("lang") or (runtime.coordinator.lang if runtime else "en")
    chapters = await hass.async_add_executor_job(handbook.chapters, lang)
    glossary = await hass.async_add_executor_job(handbook.glossary, lang)
    connection.send_result(msg["id"], {"chapters": [c.meta() for c in chapters], "glossary": glossary})


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/handbook/chapter", vol.Required("chapter_id"): str, vol.Optional("lang"): str}
)
@websocket_api.async_response
async def ws_handbook_chapter(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    runtime = _runtime(hass)
    lang = msg.get("lang") or (runtime.coordinator.lang if runtime else "en")
    chapter = await hass.async_add_executor_job(handbook.chapter, msg["chapter_id"], lang)
    if chapter is None:
        connection.send_error(msg["id"], "not_found", f"no chapter {msg['chapter_id']}")
        return
    connection.send_result(msg["id"], {**chapter.meta(), "body": chapter.body})


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/handbook/search", vol.Required("query"): str, vol.Optional("lang"): str}
)
@websocket_api.async_response
async def ws_handbook_search(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    runtime = _runtime(hass)
    lang = msg.get("lang") or (runtime.coordinator.lang if runtime else "en")
    hits = await hass.async_add_executor_job(handbook.search, msg["query"], lang)
    connection.send_result(msg["id"], {"results": hits})


# --------------------------------------------------------------------------- #
# Irrigation
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/irrigation/plan"})
@callback
def ws_irrigation_plan(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    plan = runtime.irrigation.build_plan(force=True)
    lang = runtime.coordinator.lang
    connection.send_result(
        msg["id"],
        {
            **plan.to_dict(),
            "reasons": {k: t(key, lang, **params) for k, (key, params) in plan.skipped.items()},
            "running": runtime.irrigation.running,
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/irrigation/run",
        vol.Optional("bed_ids"): [str],
        vol.Optional("amount_mm"): vol.Coerce(float),
    }
)
@websocket_api.require_admin
@callback
def ws_irrigation_run(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    bed_ids = set(msg["bed_ids"]) if msg.get("bed_ids") else None
    plan = runtime.irrigation.build_plan(force=True, bed_ids=bed_ids, override_mm=msg.get("amount_mm"))
    started = runtime.irrigation.async_start(plan, source="manual")
    connection.send_result(msg["id"], {"started": started, **plan.to_dict()})


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/irrigation/stop"})
@websocket_api.require_admin
@websocket_api.async_response
async def ws_irrigation_stop(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    await runtime.irrigation.async_stop()
    connection.send_result(msg["id"])


# --------------------------------------------------------------------------- #
# Advice, Q&A and supplies
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/advice"})
@websocket_api.async_response
async def ws_advice(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Suggestions for the current plan plus the month-by-month harvest coverage."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None or runtime.coordinator.data is None:
        if runtime is not None:
            connection.send_error(msg["id"], "not_ready", "Analysis not ready yet")
        return
    data, db, analysis, lang = runtime.repo.data, runtime.repo.db, runtime.coordinator.data, runtime.coordinator.lang

    def build() -> dict[str, Any]:
        return {
            "suggestions": [s.to_dict() for s in advise(data, db, analysis, lang)],
            "coverage": harvest_coverage(data, db, analysis).to_dict(),
        }

    connection.send_result(msg["id"], await hass.async_add_executor_job(build))


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/qa/options"})
@callback
def ws_qa_options(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    season = season_for_date(data.settings.region, dt_util.now().date())
    connection.send_result(msg["id"], qa_options(data, runtime.repo.db, season, runtime.coordinator.lang))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/qa/ask",
        vol.Required("subject"): str,
        vol.Required("problem"): str,
        vol.Optional("target"): vol.Any(str, None),
    }
)
@callback
def ws_qa_ask(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    analysis = runtime.coordinator.data
    if analysis is None:
        connection.send_error(msg["id"], "not_ready", "Analysis not ready yet")
        return
    try:
        result = qa_answer(msg["subject"], msg["problem"], msg.get("target"), runtime.repo.data, runtime.repo.db,
                           analysis, runtime.coordinator.lang)  # fmt: skip
    except ValueError as err:
        connection.send_error(msg["id"], "invalid_format", str(err))
        return
    connection.send_result(msg["id"], result.to_dict())


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/supplies"})
@callback
def ws_supplies(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Tool catalogue, tools per task type and the season's shopping list."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    lang = runtime.coordinator.lang
    analysis = runtime.coordinator.data
    items = shopping_list(runtime.repo.data, runtime.repo.db, analysis, lang) if analysis else []
    connection.send_result(msg["id"], {**supplies_catalog(lang), "shopping": [i.to_dict() for i in items]})
