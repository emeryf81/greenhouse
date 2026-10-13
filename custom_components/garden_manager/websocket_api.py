"""Websocket API consumed by the Hortulus panel.

All commands live under ``garden_manager/``.  Reads are available to every
authenticated user; layout, plant database and settings writes require an
admin.  Task actions are allowed for everyone - family members tick off
chores too.
"""

from __future__ import annotations

from dataclasses import astuple
from datetime import date
import json
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components import websocket_api
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError, ServiceValidationError
from homeassistant.util import dt as dt_util, yaml as yaml_util
import voluptuous as vol

from .const import DOMAIN
from .engine import diagnose, handbook, planning, seasons, syslog
from .engine.advisor import advise, harvest_coverage
from .engine.autoplan import AutoplanOptions, autoplan
from .engine.compatibility import check_bed, check_rotation, rotation_history, suggest_companions
from .engine.i18n import t
from .engine.models import GardenBed, GardenResources, Planting
from .engine.planio import PlanImportError, export_plan
from .engine.plantdb import FAMILIES
from .engine.printout import PrintOptions
from .engine.qa import answer as qa_answer, options as qa_options
from .engine.records import harvest_by_year, harvest_summary, learned_yields, seed_report, water_stats, year_overview
from .engine.region import resolve_profile, season_anchors, season_bounds, season_for_date
from .engine.schedule import plant_windows, planting_timeline, season_timeline
from .engine.serde import from_dict, to_dict
from .engine.succession import expand_succession
from .engine.supplies import catalog as supplies_catalog, shopping_list
from .gardens import listing, pick
from .operations import (
    RevisionConflict,
    op_activate_plan,
    op_add_task,
    op_apply_autoplan,
    op_complete_task,
    op_delete_layout,
    op_delete_plan,
    op_delete_plant,
    op_delete_record,
    op_delete_soil_test,
    op_delete_task,
    op_fix_issue,
    op_import_plan,
    op_log_harvest,
    op_new_plan,
    op_postpone_task,
    op_save_journal,
    op_save_plan,
    op_save_plant,
    op_save_seed,
    op_save_settings,
    op_save_soil_test,
    op_undo,
    op_update_planting,
    op_update_plantings,
    op_update_task,
    op_year_transition,
)
from .printing import async_render_svg
from .storage import current_user

_LOGGER = logging.getLogger(__name__)

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
        ws_records_overview,
        ws_harvest_add,
        ws_record_delete,
        ws_journal_save,
        ws_seed_save,
        ws_soil_save,
        ws_soil_delete,
        ws_syslog_list,
        ws_syslog_entry,
        ws_syslog_undo,
        ws_layout_delete,
        ws_year_preview,
        ws_year_apply,
        ws_plan_new,
        ws_plan_activate,
        ws_plan_delete,
        ws_analysis,
        ws_analysis_explain,
        ws_plantings_season,
        ws_planting_update,
        ws_plantings_update_many,
        ws_analysis_fix,
        ws_plan_compare,
        ws_still_possible,
        ws_irrigation_test,
        ws_irrigation_close,
        ws_planning,
        ws_seeds_to_todo,
        ws_season_report,
    ):
        websocket_api.async_register_command(hass, command)


def _runtime(hass: HomeAssistant, msg: dict[str, Any] | None = None) -> GardenRuntime | None:
    """The garden the panel asked for (``garden_id``, a config entry id), else the first."""
    return pick(hass, (msg or {}).get("garden_id"))


def _require_runtime(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict
) -> GardenRuntime | None:
    runtime = _runtime(hass, msg)
    if runtime is None:
        connection.send_error(msg["id"], "not_loaded", "Hortulus is not set up")
    # Attribute whatever this command changes to the user in the system log.
    current_user.set(connection.user.name if connection.user else None)
    return runtime


# (runtime id) -> ((revision, day, region, plant database), summary): the check only reruns
# when the plan, the day, the region or the plant data changed, not on every snapshot push.
_DIAGNOSIS_CACHE: dict[int, tuple[tuple[Any, ...], dict[str, int] | None]] = {}


def clear_diagnosis_cache(runtime: GardenRuntime) -> None:
    """Forget the cached check of a runtime that is being unloaded."""
    _DIAGNOSIS_CACHE.pop(id(runtime), None)


def _diagnosis_summary(runtime: GardenRuntime) -> dict[str, int] | None:
    """Issue counts for the badge on the Analysis tab (re-checked when the plan changes)."""
    data = runtime.repo.data
    today = dt_util.now().date()
    key = (data.revision, data.layout_season, today, astuple(data.settings.region), id(runtime.repo.db))
    cached = _DIAGNOSIS_CACHE.get(id(runtime))
    if cached is not None and cached[0] == key:
        return cached[1]
    try:
        issues = diagnose.check_garden(
            data, runtime.repo.db, today=today, current_season=season_for_date(data.settings.region, today)
        )
    except Exception:  # a broken check must never break the panel
        _LOGGER.exception("Garden check failed")
        return None
    summary = diagnose.summary(issues)
    _DIAGNOSIS_CACHE[id(runtime)] = (key, summary)
    return summary


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
        "layout_season": data.layout_season,
        "layouts": {k: to_dict(v) for k, v in data.layouts.items()},
        "archived_plans": [
            {
                "id": p.id,
                "name": p.name,
                "season": p.season,
                "archived_at": p.archived_at.isoformat() if p.archived_at else None,
                "zones": len(p.zones),
                "beds": len(p.beds),
                "features": len(p.features),
                "plantings": len(p.plantings),
            }
            for p in data.archived_plans
        ],
        "diagnosis": _diagnosis_summary(runtime),
        "transition_due": seasons.pending_transition(
            data, coordinator.data.season if coordinator.data else data.layout_season or 0
        ),
        "irrigation_log": [to_dict(e) for e in data.irrigation_log[-300:]],
        "harvest_log": [to_dict(e) for e in data.harvest_log[-300:]],
        "journal": [to_dict(e) for e in data.journal[-200:]],
        "seed_stock": [to_dict(e) for e in data.seed_stock],
        "irrigation_status": {
            "running": runtime.irrigation.running,
            "bed_id": runtime.irrigation.status.bed_id,
            "ends_at": runtime.irrigation.status.ends_at.isoformat() if runtime.irrigation.status.ends_at else None,
            "last_error": runtime.irrigation.status.last_error,
            "stuck": [
                {"entity_id": e, "since": since.isoformat(), "what": runtime.irrigation.valve_entities().get(e, e)}
                for e, since in runtime.irrigation.stuck.items()
            ],
            "leak": runtime.irrigation.leak,
        },
        "entry_id": coordinator.config_entry.entry_id,
        "gardens": listing(coordinator.hass),
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
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/subscribe", vol.Optional("garden_id"): str})
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


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/plants", vol.Optional("garden_id"): str})
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
        vol.Optional("garden_id"): str,
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


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/plants/delete", vol.Optional("garden_id"): str, vol.Required("plant_id"): str}
)
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
        vol.Optional("garden_id"): str,
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
        vol.Optional("garden_id"): str,
        vol.Optional("base_revision"): vol.Any(int, None),
        vol.Required("zones"): list,
        vol.Required("beds"): list,
        vol.Required("plantings"): list,
        vol.Optional("features"): list,
        vol.Optional("season"): vol.Any(int, None),
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
            season=msg.get("season"),
        )
    except RevisionConflict as err:
        _log_error(hass, msg, "revision_conflict", err)
        connection.send_error(msg["id"], "revision_conflict", str(err))
        return
    except HomeAssistantError as err:
        _log_error(hass, msg, "invalid_plan", err)
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    connection.send_result(msg["id"], {"revision": revision})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/check",
        vol.Optional("garden_id"): str,
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
    planned = {}
    for p in plantings:
        plant = db.get(p.plant_id)
        if plant is not None:
            anchors = season_anchors(data.settings.region, p.season)
            timelines[p.id] = planting_timeline(p, plant, anchors, zone, today)
            planned[p.id] = planting_timeline(p, plant, anchors, zone, None).occupancy
    report = check_bed(
        bed,
        plantings,
        db,
        timelines={k: v.occupancy for k, v in timelines.items()},
        planned=planned,
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
        vol.Optional("garden_id"): str,
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
        vol.Optional("garden_id"): str,
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
        vol.Optional("garden_id"): str,
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
        counts = op_import_plan(hass, runtime, doc, msg["mode"])
    except (PlanImportError, ValueError, HomeAssistantError) as err:
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    connection.send_result(msg["id"], {"counts": counts, "revision": runtime.repo.data.revision})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/tasks/add",
        vol.Optional("garden_id"): str,
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
        vol.Optional("garden_id"): str,
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


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/settings/save", vol.Optional("garden_id"): str, vol.Required("settings"): dict}
)
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
        vol.Optional("garden_id"): str,
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
        vol.Optional("garden_id"): str,
        vol.Optional("base_revision"): vol.Any(int, None),
        vol.Required("plantings"): list,
        vol.Optional("replace_beds", default=[]): [str],
        vol.Optional("plan_from"): vol.Any(int, None),
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
            plan_from=msg.get("plan_from"),
        )
    except RevisionConflict as err:
        _log_error(hass, msg, "revision_conflict", err)
        connection.send_error(msg["id"], "revision_conflict", str(err))
        return
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "invalid_plan", str(err))
        return
    connection.send_result(msg["id"], {"revision": revision})


# --------------------------------------------------------------------------- #
# Print preview (the PDF itself comes from the authenticated HTTP view)
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/print/render", vol.Optional("garden_id"): str, vol.Required("options"): dict}
)
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
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/handbook/index", vol.Optional("garden_id"): str, vol.Optional("lang"): str}
)
@websocket_api.async_response
async def ws_handbook_index(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    runtime = _runtime(hass, msg)
    lang = msg.get("lang") or (runtime.coordinator.lang if runtime else "en")
    chapters = await hass.async_add_executor_job(handbook.chapters, lang)
    glossary = await hass.async_add_executor_job(handbook.glossary, lang)
    connection.send_result(msg["id"], {"chapters": [c.meta() for c in chapters], "glossary": glossary})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/handbook/chapter",
        vol.Optional("garden_id"): str,
        vol.Required("chapter_id"): str,
        vol.Optional("lang"): str,
    }
)
@websocket_api.async_response
async def ws_handbook_chapter(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    runtime = _runtime(hass, msg)
    lang = msg.get("lang") or (runtime.coordinator.lang if runtime else "en")
    chapter = await hass.async_add_executor_job(handbook.chapter, msg["chapter_id"], lang)
    if chapter is None:
        connection.send_error(msg["id"], "not_found", f"no chapter {msg['chapter_id']}")
        return
    connection.send_result(msg["id"], {**chapter.meta(), "body": chapter.body})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/handbook/search",
        vol.Optional("garden_id"): str,
        vol.Required("query"): str,
        vol.Optional("lang"): str,
    }
)
@websocket_api.async_response
async def ws_handbook_search(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    runtime = _runtime(hass, msg)
    lang = msg.get("lang") or (runtime.coordinator.lang if runtime else "en")
    hits = await hass.async_add_executor_job(handbook.search, msg["query"], lang)
    connection.send_result(msg["id"], {"results": hits})


# --------------------------------------------------------------------------- #
# Irrigation
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/irrigation/plan", vol.Optional("garden_id"): str})
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
        vol.Optional("garden_id"): str,
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


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/irrigation/stop", vol.Optional("garden_id"): str})
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
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/advice", vol.Optional("garden_id"): str})
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


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/qa/options", vol.Optional("garden_id"): str})
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
        vol.Optional("garden_id"): str,
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


@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/supplies", vol.Optional("garden_id"): str})
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


# --------------------------------------------------------------------------- #
# Records: harvest, diary, seeds, soil tests, water, year overview
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/records/overview", vol.Optional("garden_id"): str})
@callback
def ws_records_overview(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data, db, analysis = runtime.repo.data, runtime.repo.db, runtime.coordinator.data
    today = analysis.today if analysis else dt_util.now().date()
    season = analysis.season if analysis else today.year
    connection.send_result(
        msg["id"],
        {
            "season": season,
            "harvest_season": {k: v.to_dict() for k, v in harvest_summary(data, season).items()},
            "harvest_all": {k: v.to_dict() for k, v in harvest_summary(data).items()},
            "harvest_years": harvest_by_year(data),
            "learned_yields": learned_yields(data),
            "seeds": seed_report(data, db, season),
            "water": water_stats(data, today).to_dict(),
            "year": year_overview(data, db, analysis) if analysis else None,
        },
    )


def _log_error(hass: HomeAssistant | None, msg: dict[str, Any], code: str, err: BaseException) -> None:
    """Keep failed panel actions in the system log for the analysis view."""
    runtime = _runtime(hass, msg) if hass is not None else None
    if runtime is None:
        return
    context = {
        k: v for k, v in msg.items() if k not in ("id", "type") and isinstance(v, (str, int, float, bool, type(None)))
    }
    runtime.repo.record_error(str(msg.get("type", "")).split("/", 1)[-1], code, str(err) or type(err).__name__, context)


def _ws_op(connection: websocket_api.ActiveConnection, msg: dict[str, Any], fn: Any) -> None:
    """Run an operation and translate validation errors into websocket errors (and log them)."""
    hass = getattr(connection, "hass", None)
    try:
        result = fn()
    except ServiceValidationError as err:
        _log_error(hass, msg, err.translation_key or "invalid_format", err)
        connection.send_error(msg["id"], err.translation_key or "invalid_format", str(err))
        return
    except Exception as err:
        _log_error(hass, msg, "unexpected", err)
        raise
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/records/harvest/add",
        vol.Optional("garden_id"): str,
        vol.Optional("planting_id"): vol.Any(str, None),
        vol.Optional("plant_id"): vol.Any(str, None),
        vol.Optional("kg"): vol.Coerce(float),
        vol.Optional("count"): vol.Any(vol.Coerce(int), None),
        vol.Optional("quality"): vol.Any(vol.Coerce(int), None),
        vol.Optional("day"): str,
        vol.Optional("note"): str,
    }
)
@callback
def ws_harvest_add(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        raw = {k: v for k, v in msg.items() if k not in ("id", "type")}
        _ws_op(connection, msg, lambda: {"harvest": to_dict(op_log_harvest(runtime, raw))})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/records/delete",
        vol.Optional("garden_id"): str,
        vol.Required("kind"): vol.In(["harvest", "journal", "seed"]),
        vol.Required("record_id"): str,
    }
)
@callback
def ws_record_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(connection, msg, lambda: op_delete_record(runtime, msg["kind"], msg["record_id"]) or {})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/records/journal/save",
        vol.Optional("garden_id"): str,
        vol.Required("entry"): dict,
    }
)
@callback
def ws_journal_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        raw = {
            **msg["entry"],
            "author": msg["entry"].get("author") or (connection.user.name if connection.user else None),
        }
        _ws_op(connection, msg, lambda: {"entry": to_dict(op_save_journal(runtime, raw))})


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/records/seeds/save", vol.Optional("garden_id"): str, vol.Required("packet"): dict}
)
@callback
def ws_seed_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(connection, msg, lambda: {"packet": to_dict(op_save_seed(runtime, msg["packet"]))})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/records/soil/save",
        vol.Optional("garden_id"): str,
        vol.Required("bed_id"): str,
        vol.Required("test"): dict,
    }
)
@callback
def ws_soil_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(connection, msg, lambda: {"test": to_dict(op_save_soil_test(runtime, msg["bed_id"], msg["test"]))})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/records/soil/delete",
        vol.Optional("garden_id"): str,
        vol.Required("bed_id"): str,
        vol.Required("date"): str,
    }
)
@callback
def ws_soil_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(
            connection, msg, lambda: op_delete_soil_test(runtime, msg["bed_id"], date.fromisoformat(msg["date"])) or {}
        )


# --------------------------------------------------------------------------- #
# System log
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/syslog/list",
        vol.Optional("garden_id"): str,
        vol.Optional("limit", default=100): vol.All(int, vol.Range(min=1, max=syslog.MAX_ENTRIES)),
        vol.Optional("before"): vol.Any(str, None),
        vol.Optional("include_system", default=True): bool,
    }
)
@callback
def ws_syslog_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Newest first; page with ``before`` = id of the last entry received."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    entries = list(reversed(runtime.repo.syslog))
    if msg.get("before"):
        ids = [e["id"] for e in entries]
        entries = entries[ids.index(msg["before"]) + 1 :] if msg["before"] in ids else []
    if not msg["include_system"]:
        entries = [e for e in entries if e.get("source") != "system"]
    page = entries[: msg["limit"]]
    connection.send_result(
        msg["id"],
        {
            "entries": [syslog.public(e) for e in page],
            "more": len(entries) > len(page),
            "total": len(runtime.repo.syslog),
        },
    )


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/syslog/entry", vol.Optional("garden_id"): str, vol.Required("entry_id"): str}
)
@websocket_api.require_admin
@callback
def ws_syslog_entry(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """One entry including the before/after of every changed item."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    entry = runtime.repo.syslog_entry(msg["entry_id"])
    if entry is None:
        connection.send_error(msg["id"], "unknown_log_entry", msg["entry_id"])
        return
    connection.send_result(msg["id"], {"entry": entry})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/syslog/undo",
        vol.Optional("garden_id"): str,
        vol.Required("entry_id"): str,
        vol.Optional("force", default=False): bool,
    }
)
@websocket_api.require_admin
@callback
def ws_syslog_undo(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(connection, msg, lambda: op_undo(hass, runtime, msg["entry_id"], force=msg["force"]))


# --------------------------------------------------------------------------- #
# Garden plans per season & the year-end transition
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/layout/delete", vol.Optional("garden_id"): str, vol.Required("season"): int}
)
@websocket_api.require_admin
@callback
def ws_layout_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(connection, msg, lambda: op_delete_layout(runtime, msg["season"]) or {})


def _occupancy(runtime: GardenRuntime) -> dict[str, Any]:
    """Planned occupancy of every planting (to spot crops that overwinter)."""
    data = runtime.repo.data
    db = runtime.repo.db
    zones = {z.id: z for z in data.zones}
    beds = {b.id: b for b in data.beds}
    for layout in data.layouts.values():
        zones.update({z.id: z for z in layout.zones if z.id not in zones})
        beds.update({b.id: b for b in layout.beds if b.id not in beds})
    out = {}
    for p in data.plantings:
        plant = db.get(p.plant_id)
        bed = beds.get(p.bed_id)
        if plant is None:
            continue
        zone = zones.get(bed.zone_id) if bed else None
        anchors = season_anchors(data.settings.region, p.season)
        out[p.id] = planting_timeline(p, plant, anchors, zone, None).occupancy
    return out


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/year/preview", vol.Optional("garden_id"): str, vol.Optional("from_season"): int}
)
@callback
def ws_year_preview(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """What the year-end transition would carry into next year (nothing is changed)."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    today = dt_util.now().date()
    from_season = msg.get("from_season") or data.layout_season or season_for_date(data.settings.region, today)
    _start, end = season_bounds(data.settings.region, from_season)
    result = seasons.preview(data, runtime.repo.db, from_season, season_end=end, timelines=_occupancy(runtime))
    connection.send_result(msg["id"], result.to_dict())


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/year/apply",
        vol.Optional("garden_id"): str,
        vol.Required("from_season"): int,
        vol.Optional("layout", default="copy"): vol.In(["copy", "keep"]),
        vol.Optional("zone_ids"): vol.Any([str], None),
        vol.Optional("feature_ids"): vol.Any([str], None),
        vol.Optional("planting_ids", default=[]): [str],
        vol.Optional("activate", default=True): bool,
    }
)
@websocket_api.require_admin
@callback
def ws_year_apply(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(
            connection,
            msg,
            lambda: op_year_transition(
                hass,
                runtime,
                msg["from_season"],
                layout=msg["layout"],
                zone_ids=msg.get("zone_ids"),
                feature_ids=msg.get("feature_ids"),
                planting_ids=msg["planting_ids"],
                activate=msg["activate"],
            ),
        )


# --------------------------------------------------------------------------- #
# Several plans per season
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/new",
        vol.Optional("garden_id"): str,
        vol.Required("season"): int,
        vol.Optional("start", default="empty"): vol.In(["empty", "zones", "zones_beds"]),
        vol.Optional("old_name"): vol.Any(str, None),
    }
)
@websocket_api.require_admin
@callback
def ws_plan_new(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(
            connection,
            msg,
            lambda: op_new_plan(hass, runtime, msg["season"], start=msg["start"], old_name=msg.get("old_name")),
        )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/activate",
        vol.Optional("garden_id"): str,
        vol.Required("plan_id"): str,
        vol.Optional("old_name"): vol.Any(str, None),
    }
)
@websocket_api.require_admin
@callback
def ws_plan_activate(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(connection, msg, lambda: op_activate_plan(hass, runtime, msg["plan_id"], old_name=msg.get("old_name")))


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/plan/delete", vol.Optional("garden_id"): str, vol.Required("plan_id"): str}
)
@websocket_api.require_admin
@callback
def ws_plan_delete(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(connection, msg, lambda: op_delete_plan(runtime, msg["plan_id"]) or {})


# --------------------------------------------------------------------------- #
# Analysis
# --------------------------------------------------------------------------- #
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/analysis", vol.Optional("garden_id"): str})
@callback
def ws_analysis(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Consistency check of the plan plus the most recent errors."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    today = dt_util.now().date()
    current = season_for_date(data.settings.region, today)
    issues = diagnose.check_garden(
        data, runtime.repo.db, today=today, current_season=current, lang=runtime.coordinator.lang
    )
    errors = [syslog.public(e) for e in reversed(runtime.repo.syslog) if e.get("source") == "error"][:50]
    connection.send_result(
        msg["id"],
        {
            "season": current,
            "layout_season": data.layout_season,
            "issues": [i.to_dict() for i in issues],
            "errors": errors,
            "counts": {
                "zones": len(data.zones),
                "beds": len(data.beds),
                "features": len(data.features),
                "plantings": len(data.plantings),
                "plans": len(seasons.plan_seasons(data)),
                "archived_plans": len(data.archived_plans),
                "log_entries": len(runtime.repo.syslog),
            },
        },
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/analysis/explain",
        vol.Optional("garden_id"): str,
        vol.Required("plant_id"): str,
        vol.Optional("season"): vol.Any(int, None),
        vol.Optional("match_zone", default=True): bool,
    }
)
@callback
def ws_analysis_explain(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Why can (or can't) a plant go into each bed of a season's plan?"""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    db = runtime.repo.db
    plant = db.get(msg["plant_id"])
    if plant is None:
        connection.send_error(msg["id"], "unknown_plant", msg["plant_id"])
        return
    data = runtime.repo.data
    today = dt_util.now().date()
    season = msg.get("season") or data.layout_season or season_for_date(data.settings.region, today)
    verdicts = diagnose.explain_plant(plant, data, db, season, today=today, match_zone=msg["match_zone"])
    connection.send_result(
        msg["id"],
        {
            "plant_id": plant.id,
            "season": season,
            "has_plan": seasons.has_layout(data, season),
            "beds": [v.to_dict() for v in verdicts],
        },
    )


# --------------------------------------------------------------------------- #
# Crops of a season (list view with all dates, no dragging)
# --------------------------------------------------------------------------- #
def _crop_timeline(data: Any, p: Planting, plant: Any, season: int, zone: Any, today: Any) -> Any:
    """A crop's timeline as it matters for ``season`` (perennials carried over re-anchor on that year)."""
    region = data.settings.region
    start, end = season_bounds(region, season)
    return season_timeline(p, plant, season, lambda s: season_anchors(region, s), zone, today, start, end)


def _season_rows(runtime: GardenRuntime, season: int) -> list[dict[str, Any]]:
    data = runtime.repo.data
    db = runtime.repo.db
    layout = seasons.layout_for(data, season)
    # a crop whose year has no plan (or whose bed is gone) still shows the bed it knew
    beds = {b.id: b for b in data.beds}
    zones = {z.id: z for z in data.zones}
    if layout is not None:
        beds |= {b.id: b for b in layout.beds}
        zones |= {z.id: z for z in layout.zones}
    today = dt_util.now().date()
    rows = []
    for p in data.plantings:
        if not seasons.present_in(p, False, season):
            continue
        plant = db.get(p.plant_id)
        bed = beds.get(p.bed_id)
        timeline = None
        if plant is not None:
            zone = zones.get(bed.zone_id) if bed else None
            timeline = _crop_timeline(data, p, plant, season, zone, today).to_dict()
        rows.append(
            {
                "planting": to_dict(p),
                "bed": bed.name if bed else None,
                "zone": zones[bed.zone_id].name if bed and bed.zone_id in zones else None,
                "timeline": timeline,
            }
        )
    return rows


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/plantings/season", vol.Optional("garden_id"): str, vol.Required("season"): int}
)
@callback
def ws_plantings_season(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Every crop of a season with its bed and computed dates."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        connection.send_result(msg["id"], {"season": msg["season"], "rows": _season_rows(runtime, msg["season"])})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/planting/update",
        vol.Optional("garden_id"): str,
        vol.Required("planting_id"): str,
        vol.Required("changes"): dict,
    }
)
@websocket_api.require_admin
@callback
def ws_planting_update(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Change dates, status, count or notes of one crop (no geometry needed)."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return

    def run() -> dict[str, Any]:
        updated = op_update_planting(runtime, msg["planting_id"], msg["changes"])
        row = next((r for r in _season_rows(runtime, updated.season) if r["planting"]["id"] == updated.id), None)
        return {"planting": to_dict(updated), "row": row, "revision": runtime.repo.data.revision}

    _ws_op(connection, msg, run)


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plantings/update_many",
        vol.Optional("garden_id"): str,
        vol.Required("planting_ids"): [str],
        vol.Required("changes"): dict,
    }
)
@websocket_api.require_admin
@callback
def ws_plantings_update_many(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """The same change (status, a date ...) for several crops at once."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(
            connection,
            msg,
            lambda: {
                "updated": len(op_update_plantings(runtime, msg["planting_ids"], msg["changes"])),
                "revision": runtime.repo.data.revision,
            },
        )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/analysis/fix",
        vol.Optional("garden_id"): str,
        vol.Required("code"): str,
        vol.Optional("params", default={}): dict,
        vol.Optional("refs", default={}): dict,
    }
)
@websocket_api.require_admin
@callback
def ws_analysis_fix(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Repair a problem the garden check reported."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        _ws_op(connection, msg, lambda: op_fix_issue(hass, runtime, msg["code"], msg["params"], msg["refs"]))


_PLAN_REF = vol.Schema({vol.Optional("season"): vol.Any(int, None), vol.Optional("plan_id"): vol.Any(str, None)})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/plan/compare",
        vol.Optional("garden_id"): str,
        vol.Required("a"): _PLAN_REF,
        vol.Required("b"): _PLAN_REF,
    }
)
@callback
def ws_plan_compare(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Differences between two plans (a season's or one that was set aside)."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    views = [
        diagnose.plan_view(data, season=ref.get("season"), plan_id=ref.get("plan_id")) for ref in (msg["a"], msg["b"])
    ]
    if views[0] is None or views[1] is None:
        connection.send_error(msg["id"], "unknown_record", "plan not found")
        return
    connection.send_result(
        msg["id"], diagnose.compare_plans(views[0], views[1], runtime.repo.db, runtime.coordinator.lang)
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/analysis/still_possible",
        vol.Optional("garden_id"): str,
        vol.Required("season"): int,
    }
)
@callback
def ws_still_possible(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Plants that can still be sown or planted in a season, and where."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        today = dt_util.now().date()
        rows = diagnose.still_possible(
            runtime.repo.data, runtime.repo.db, msg["season"], today=today, lang=runtime.coordinator.lang
        )
        connection.send_result(msg["id"], {"season": msg["season"], "plants": rows})


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/irrigation/test",
        vol.Optional("garden_id"): str,
        vol.Required("entity_id"): str,
        vol.Optional("seconds", default=5): vol.All(vol.Coerce(float), vol.Range(min=1, max=60)),
        vol.Optional("with_pump", default=True): bool,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_irrigation_test(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Open a valve for a few seconds and check it reports open and closed again."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    valves = runtime.irrigation.valve_entities()
    if msg["entity_id"] not in valves or valves[msg["entity_id"]] == "pump":
        connection.send_error(msg["id"], "unknown_entity", msg["entity_id"])
        return
    try:
        result = await runtime.irrigation.async_test(
            msg["entity_id"], seconds=msg["seconds"], with_pump=msg["with_pump"]
        )
    except HomeAssistantError as err:
        _log_error(hass, msg, "irrigation_test", err)
        connection.send_error(msg["id"], "irrigation_test", str(err))
        return
    connection.send_result(msg["id"], result)


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/irrigation/close", vol.Optional("garden_id"): str, vol.Required("entity_id"): str}
)
@websocket_api.require_admin
@websocket_api.async_response
async def ws_irrigation_close(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Close a valve (or stop the pump) that stayed open."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    if msg["entity_id"] not in runtime.irrigation.valve_entities():
        connection.send_error(msg["id"], "unknown_entity", msg["entity_id"])
        return
    try:
        state = await runtime.irrigation.async_close(msg["entity_id"])
    except HomeAssistantError as err:
        connection.send_error(msg["id"], "irrigation_close", str(err))
        return
    runtime.coordinator.async_update_listeners()
    connection.send_result(msg["id"], {"state": state})


def _season_timelines(runtime: GardenRuntime, season: int) -> dict[str, Any]:
    """Timeline of every crop present in ``season`` (zone of that season's plan)."""
    data = runtime.repo.data
    db = runtime.repo.db
    layout = seasons.layout_for(data, season)
    beds = {b.id: b for b in data.beds} | ({b.id: b for b in layout.beds} if layout else {})
    zones = {z.id: z for z in data.zones} | ({z.id: z for z in layout.zones} if layout else {})
    today = dt_util.now().date()
    out = {}
    for p in data.plantings:
        plant = db.get(p.plant_id)
        if plant is None or not seasons.present_in(p, False, season):
            continue
        bed = beds.get(p.bed_id)
        zone = zones.get(bed.zone_id) if bed else None
        out[p.id] = _crop_timeline(data, p, plant, season, zone, today)
    return out


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/planning", vol.Optional("garden_id"): str, vol.Required("season"): int}
)
@websocket_api.async_response
async def ws_planning(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """Seeds to buy, what can follow a crop, and the expected harvest per week."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    data = runtime.repo.data
    db = runtime.repo.db
    season = msg["season"]
    lang = runtime.coordinator.lang
    today = dt_util.now().date()

    def build() -> dict[str, Any]:
        # successions try every plant on every bed that frees up: keep it off the event loop
        timelines = _season_timelines(runtime, season)
        anchors = season_anchors(data.settings.region, season)
        return {
            "season": season,
            "seeds": [n.to_dict() for n in planning.seed_needs(data, db, season)],
            "successions": [
                b.to_dict()
                for b in planning.successions(
                    data, db, season, timelines, today=today, first_frost=anchors.first_frost, lang=lang
                )
            ],
            "harvest": planning.harvest_forecast(data, db, season, timelines),
        }

    connection.send_result(msg["id"], await hass.async_add_executor_job(build))


@websocket_api.websocket_command(
    {
        vol.Required("type"): f"{DOMAIN}/seeds/to_todo",
        vol.Optional("garden_id"): str,
        vol.Required("season"): int,
        vol.Required("entity_id"): str,
    }
)
@websocket_api.async_response
async def ws_seeds_to_todo(
    hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]
) -> None:
    """Put the seeds the plan still lacks on a Home Assistant to-do list (skipping items already on it)."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is None:
        return
    entity_id = msg["entity_id"]
    if not entity_id.startswith("todo.") or hass.states.get(entity_id) is None:
        connection.send_error(msg["id"], "invalid_format", f"{entity_id} is not a to-do list")
        return
    needs = planning.seed_needs(runtime.repo.data, runtime.repo.db, msg["season"])
    items = planning.seed_todo_items(needs, runtime.repo.db, msg["season"], runtime.coordinator.lang)
    try:
        current = await hass.services.async_call(
            "todo", "get_items", {"status": ["needs_action"]}, target={"entity_id": entity_id},
            blocking=True, return_response=True,
        )  # fmt: skip
        open_items = {i.get("summary") for i in (current or {}).get(entity_id, {}).get("items", [])}
        added = 0
        for item in items:
            if item["summary"] in open_items:
                continue
            await hass.services.async_call(
                "todo", "add_item", {"item": item["summary"], "description": item["description"]},
                target={"entity_id": entity_id}, blocking=True,
            )  # fmt: skip
            added += 1
    except (HomeAssistantError, ValueError) as err:
        connection.send_error(msg["id"], "home_assistant_error", str(err))
        return
    connection.send_result(msg["id"], {"added": added, "skipped": len(items) - added, "items": items})


@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/report/season", vol.Optional("garden_id"): str, vol.Required("season"): int}
)
@callback
def ws_season_report(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict[str, Any]) -> None:
    """End of season report: grown, harvested, lost, and what the journal said."""
    runtime = _require_runtime(hass, connection, msg)
    if runtime is not None:
        connection.send_result(
            msg["id"],
            planning.season_report(runtime.repo.data, runtime.repo.db, msg["season"], today=dt_util.now().date()),
        )
