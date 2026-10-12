"""Service actions (registered once in ``async_setup``)."""

from __future__ import annotations

from typing import TYPE_CHECKING, Any

from homeassistant.core import (
    HomeAssistant,
    ServiceCall,
    ServiceResponse,
    SupportsResponse,
    callback,
)
from homeassistant.exceptions import ServiceValidationError
from homeassistant.helpers import config_validation as cv
from homeassistant.util import dt as dt_util
import voluptuous as vol

from .const import (
    DOMAIN,
    SERVICE_ADD_PLANTING,
    SERVICE_ADD_TASK,
    SERVICE_AUTOFILL,
    SERVICE_COMPLETE_TASK,
    SERVICE_DELETE_TASK,
    SERVICE_EXPORT_PDF,
    SERVICE_EXPORT_PLAN,
    SERVICE_GENERATE_TASKS,
    SERVICE_IMPORT_PLAN,
    SERVICE_POSTPONE_TASK,
    SERVICE_RECALCULATE_PLAN,
    SERVICE_REMOVE_PLANTING,
    SERVICE_RUN_IRRIGATION,
    SERVICE_SET_SHADING,
    SERVICE_STOP_IRRIGATION,
    SERVICE_UPDATE_PLANTING,
)
from .engine.autoplan import GOALS, AutoplanOptions, autoplan
from .engine.i18n import t
from .engine.models import GardenResources, LayoutMode, PlantingStatus, SowMethod, TaskPriority, TaskType
from .engine.planio import PlanImportError, export_plan
from .engine.printout import COLOR_MODES, DOCUMENTS, PAGE_SIZES, PrintOptions
from .engine.serde import from_dict, to_dict
from .operations import (
    op_add_planting,
    op_add_task,
    op_apply_autoplan,
    op_complete_task,
    op_delete_task,
    op_import_plan,
    op_postpone_task,
    op_remove_planting,
    op_set_shading_mode,
    op_update_planting,
)
from .printing import async_export_pdf

if TYPE_CHECKING:
    from . import GardenRuntime

ADD_TASK_SCHEMA = vol.Schema(
    {
        vol.Required("title"): cv.string,
        vol.Optional("due_date"): cv.date,
        vol.Optional("type", default="custom"): vol.In([t.value for t in TaskType]),
        vol.Optional("description", default=""): cv.string,
        vol.Optional("priority", default="normal"): vol.In([p.value for p in TaskPriority]),
        vol.Optional("estimated_minutes"): vol.All(vol.Coerce(int), vol.Range(min=1, max=1440)),
        vol.Optional("bed"): cv.string,
        vol.Optional("planting_id"): cv.string,
        vol.Optional("recurrence_days"): vol.All(vol.Coerce(int), vol.Range(min=1, max=365)),
        vol.Optional("until"): cv.date,
    }
)
COMPLETE_TASK_SCHEMA = vol.Schema(
    {
        vol.Required("task_id"): cv.string,
        vol.Optional("note"): cv.string,
        vol.Optional("photos", default=[]): vol.All(cv.ensure_list, [cv.string]),
        vol.Optional("skipped", default=False): cv.boolean,
    }
)
POSTPONE_TASK_SCHEMA = vol.All(
    vol.Schema(
        {
            vol.Required("task_id"): cv.string,
            vol.Exclusive("days", "target"): vol.All(vol.Coerce(int), vol.Range(min=-365, max=365)),
            vol.Exclusive("to_date", "target"): cv.date,
            vol.Optional("reason"): cv.string,
            vol.Optional("cascade", default=True): cv.boolean,
        }
    ),
    cv.has_at_least_one_key("days", "to_date"),
)
DELETE_TASK_SCHEMA = vol.Schema({vol.Required("task_id"): cv.string})
EXPORT_SCHEMA = vol.Schema(
    {
        vol.Optional("include_tasks", default=False): cv.boolean,
        vol.Optional("seasons"): vol.All(cv.ensure_list, [vol.Coerce(int)]),
    }
)
IMPORT_SCHEMA = vol.Schema(
    {
        vol.Required("plan"): dict,
        vol.Optional("mode", default="merge"): vol.In(["merge", "replace"]),
    }
)


PLANTING_SCHEMA = {
    vol.Optional("season"): vol.All(vol.Coerce(int), vol.Range(min=2000, max=2200)),
    vol.Optional("layout"): vol.In([m.value for m in LayoutMode]),
    vol.Optional("x_cm"): vol.Coerce(float),
    vol.Optional("y_cm"): vol.Coerce(float),
    vol.Optional("width_cm"): vol.All(vol.Coerce(float), vol.Range(min=1)),
    vol.Optional("length_cm"): vol.All(vol.Coerce(float), vol.Range(min=1)),
    vol.Optional("count"): vol.All(vol.Coerce(int), vol.Range(min=1)),
    vol.Optional("method"): vol.In([m.value for m in SowMethod]),
    vol.Optional("status"): vol.In([s.value for s in PlantingStatus]),
    vol.Optional("sow_date"): cv.date,
    vol.Optional("transplant_date"): cv.date,
    vol.Optional("sown_on"): cv.date,
    vol.Optional("transplanted_on"): cv.date,
    vol.Optional("notes"): cv.string,
}
ADD_PLANTING_SCHEMA = vol.Schema(
    {vol.Required("plant_id"): cv.string, vol.Required("bed"): cv.string, **PLANTING_SCHEMA}
)
UPDATE_PLANTING_SCHEMA = vol.Schema(
    {
        vol.Required("planting_id"): cv.string,
        vol.Optional("plant_id"): cv.string,
        vol.Optional("bed"): cv.string,
        **PLANTING_SCHEMA,
    }
)
REMOVE_PLANTING_SCHEMA = vol.Schema({vol.Required("planting_id"): cv.string})
RUN_IRRIGATION_SCHEMA = vol.Schema(
    {
        vol.Optional("dry_run", default=False): cv.boolean,
        vol.Optional("beds"): vol.All(cv.ensure_list, [cv.string]),
        vol.Optional("amount_mm"): vol.All(vol.Coerce(float), vol.Range(min=0.5, max=50)),
    }
)
SET_SHADING_SCHEMA = vol.Schema({vol.Required("zone"): cv.string, vol.Required("mode"): vol.In(["auto", "on", "off"])})
AUTOFILL_SCHEMA = vol.Schema(
    {
        vol.Optional("season"): vol.All(vol.Coerce(int), vol.Range(min=2000, max=2200)),
        vol.Optional("beds"): vol.All(cv.ensure_list, [cv.string]),
        vol.Optional("replace", default=False): cv.boolean,
        vol.Optional("apply", default=False): cv.boolean,
        vol.Optional("household_size"): vol.All(vol.Coerce(int), vol.Range(min=1, max=20)),
        vol.Optional("hours_per_week"): vol.All(vol.Coerce(float), vol.Range(min=0, max=80)),
        vol.Optional("water_liters_per_week"): vol.All(vol.Coerce(float), vol.Range(min=0)),
        vol.Optional("compost_kg"): vol.All(vol.Coerce(float), vol.Range(min=0)),
        vol.Optional("goals"): vol.All(cv.ensure_list, [vol.In(list(GOALS))]),
        vol.Optional("wanted"): vol.All(cv.ensure_list, [cv.string]),
        vol.Optional("excluded"): vol.All(cv.ensure_list, [cv.string]),
        vol.Optional("max_crops", default=16): vol.All(vol.Coerce(int), vol.Range(min=1, max=60)),
    }
)
EXPORT_PDF_SCHEMA = vol.Schema(
    {
        vol.Optional("document", default="garden"): vol.In(list(DOCUMENTS)),
        vol.Optional("page", default="a4"): vol.In(list(PAGE_SIZES)),
        vol.Optional("landscape", default=False): cv.boolean,
        vol.Optional("color_mode", default="color"): vol.In(list(COLOR_MODES)),
        vol.Optional("season"): vol.Coerce(int),
        vol.Optional("zone_id"): cv.string,
        vol.Optional("bed_ids"): vol.All(cv.ensure_list, [cv.string]),
        vol.Optional("days", default=28): vol.All(vol.Coerce(int), vol.Range(min=1, max=120)),
        vol.Optional("notes", default=True): cv.boolean,
        vol.Optional("grid", default=True): cv.boolean,
        vol.Optional("title"): cv.string,
    }
)


def _runtime(hass: HomeAssistant) -> GardenRuntime:
    entries = hass.config_entries.async_loaded_entries(DOMAIN)
    if not entries:
        raise ServiceValidationError(translation_domain=DOMAIN, translation_key="not_loaded")
    return entries[0].runtime_data


@callback
def async_setup_services(hass: HomeAssistant) -> None:
    async def add_task(call: ServiceCall) -> ServiceResponse:
        d = call.data
        task_id = op_add_task(
            _runtime(hass),
            title=d["title"],
            due=d.get("due_date"),
            task_type=d["type"],
            description=d["description"],
            priority=d["priority"],
            minutes=d.get("estimated_minutes"),
            bed=d.get("bed"),
            planting_id=d.get("planting_id"),
            recurrence_days=d.get("recurrence_days"),
            until=d.get("until"),
        )
        return {"task_id": task_id}

    async def complete(call: ServiceCall) -> ServiceResponse:
        result = op_complete_task(
            hass,
            _runtime(hass),
            call.data["task_id"],
            note=call.data.get("note"),
            photos=call.data["photos"],
            skipped=call.data["skipped"],
            user_id=call.context.user_id,
        )
        return {
            "task_id": result.task.id,
            "status": result.task.status.value,
            "next_task_id": result.next_task.id if result.next_task else None,
            "next_due": result.next_task.due.isoformat() if result.next_task else None,
        }

    async def postpone(call: ServiceCall) -> ServiceResponse:
        result = op_postpone_task(
            _runtime(hass),
            call.data["task_id"],
            days=call.data.get("days"),
            to=call.data.get("to_date"),
            reason=call.data.get("reason"),
            cascade=call.data["cascade"],
        )
        return {
            "task_id": result.task.id,
            "due": result.task.due.isoformat(),
            "shifted": [t.id for t in result.shifted],
            "warnings": result.warnings,
        }

    async def delete(call: ServiceCall) -> None:
        op_delete_task(_runtime(hass), call.data["task_id"])

    async def generate(call: ServiceCall) -> ServiceResponse:
        runtime = _runtime(hass)
        await runtime.coordinator.async_recompute()
        merge = runtime.coordinator.last_merge
        return {
            "created": len(merge.created) if merge else 0,
            "updated": len(merge.updated) if merge else 0,
            "removed": len(merge.removed) if merge else 0,
            "open_tasks": sum(1 for t in runtime.repo.data.tasks if t.is_open),
        }

    async def recalculate(call: ServiceCall) -> ServiceResponse:
        runtime = _runtime(hass)
        runtime.repo.invalidate_db()
        analysis = await runtime.coordinator.async_force_refresh()
        return {
            "frost_risk": analysis.frost.level.value,
            "weather_available": analysis.weather_available,
            "alerts": [a.key for a in analysis.alerts],
            "season": analysis.season,
        }

    async def export(call: ServiceCall) -> ServiceResponse:
        runtime = _runtime(hass)
        return export_plan(
            runtime.repo.data,
            now=dt_util.now(),
            include_tasks=call.data["include_tasks"],
            seasons=call.data.get("seasons"),
        )

    async def import_(call: ServiceCall) -> ServiceResponse:
        runtime = _runtime(hass)
        try:
            counts = op_import_plan(hass, runtime, call.data["plan"], call.data["mode"])
        except PlanImportError as err:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="invalid_plan",
                translation_placeholders={"reason": str(err)},
            ) from err
        return dict(counts)

    async def add_planting(call: ServiceCall) -> ServiceResponse:
        planting = op_add_planting(_runtime(hass), dict(call.data))
        return {"planting_id": planting.id, "planting": to_dict(planting)}

    async def update_planting(call: ServiceCall) -> ServiceResponse:
        changes = {k: v for k, v in call.data.items() if k != "planting_id"}
        planting = op_update_planting(_runtime(hass), call.data["planting_id"], changes)
        return {"planting": to_dict(planting)}

    async def remove_planting(call: ServiceCall) -> None:
        op_remove_planting(_runtime(hass), call.data["planting_id"])

    async def run_irrigation(call: ServiceCall) -> ServiceResponse:
        runtime = _runtime(hass)
        bed_ids = None
        if call.data.get("beds"):
            from .operations import resolve_bed

            bed_ids = set()
            for ref in call.data["beds"]:
                bed = resolve_bed(runtime, ref)
                if bed is None:
                    raise ServiceValidationError(
                        translation_domain=DOMAIN, translation_key="unknown_bed", translation_placeholders={"bed": ref}
                    )
                bed_ids.add(bed.id)
        await runtime.coordinator.async_recompute()
        plan = runtime.irrigation.build_plan(force=True, bed_ids=bed_ids, override_mm=call.data.get("amount_mm"))
        lang = runtime.coordinator.lang
        response = plan.to_dict()
        response["skipped_reasons"] = {k: t(key, lang, **params) for k, (key, params) in plan.skipped.items()}
        if call.data["dry_run"]:
            response["started"] = False
            return response
        if runtime.irrigation.running:
            raise ServiceValidationError(translation_domain=DOMAIN, translation_key="irrigation_running")
        response["started"] = runtime.irrigation.async_start(plan, source="service")
        return response

    async def stop_irrigation(call: ServiceCall) -> None:
        await _runtime(hass).irrigation.async_stop()

    async def set_shading(call: ServiceCall) -> ServiceResponse:
        runtime = _runtime(hass)
        zone = op_set_shading_mode(runtime, call.data["zone"], call.data["mode"])
        runtime.climate.async_apply()
        return {"zone_id": zone.id, "mode": zone.shading_mode}

    async def autofill(call: ServiceCall) -> ServiceResponse:
        runtime = _runtime(hass)
        data = runtime.repo.data
        res_raw = to_dict(data.settings.resources)
        for key in (
            "household_size",
            "hours_per_week",
            "water_liters_per_week",
            "compost_kg",
            "goals",
            "wanted",
            "excluded",
        ):
            if key in call.data:
                res_raw[key] = call.data[key]
        resources = from_dict(GardenResources, res_raw)
        bed_ids = None
        if call.data.get("beds"):
            from .operations import resolve_bed

            bed_ids = [b.id for b in (resolve_bed(runtime, r) for r in call.data["beds"]) if b]
        today = dt_util.now().date()
        season = call.data.get("season") or (
            runtime.coordinator.data.season if runtime.coordinator.data else today.year
        )
        result = await hass.async_add_executor_job(
            lambda: autoplan(
                data,
                runtime.repo.db,
                AutoplanOptions(season=season, bed_ids=bed_ids, replace=call.data["replace"],
                                max_crops=call.data["max_crops"], lang=runtime.coordinator.lang),
                today=today,
                resources=resources,
            )
        )  # fmt: skip
        response = result.to_dict()
        if call.data["apply"] and result.plantings:
            op_apply_autoplan(
                runtime,
                base_revision=None,
                plantings=response["plantings"],
                replace_beds=result.beds if call.data["replace"] else [],
            )
            response["applied"] = True
        return response

    async def export_pdf(call: ServiceCall) -> ServiceResponse:
        runtime = _runtime(hass)
        try:
            opts = PrintOptions.from_dict({**call.data, "lang": runtime.coordinator.lang})
        except ValueError as err:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="invalid_print",
                translation_placeholders={"reason": str(err)},
            ) from err
        return await async_export_pdf(hass, runtime, opts)

    reg: list[tuple[str, Any, vol.Schema, SupportsResponse]] = [
        (SERVICE_ADD_TASK, add_task, ADD_TASK_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_COMPLETE_TASK, complete, COMPLETE_TASK_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_POSTPONE_TASK, postpone, POSTPONE_TASK_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_DELETE_TASK, delete, DELETE_TASK_SCHEMA, SupportsResponse.NONE),
        (SERVICE_GENERATE_TASKS, generate, vol.Schema({}), SupportsResponse.OPTIONAL),
        (SERVICE_RECALCULATE_PLAN, recalculate, vol.Schema({}), SupportsResponse.OPTIONAL),
        (SERVICE_EXPORT_PLAN, export, EXPORT_SCHEMA, SupportsResponse.ONLY),
        (SERVICE_IMPORT_PLAN, import_, IMPORT_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_ADD_PLANTING, add_planting, ADD_PLANTING_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_UPDATE_PLANTING, update_planting, UPDATE_PLANTING_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_REMOVE_PLANTING, remove_planting, REMOVE_PLANTING_SCHEMA, SupportsResponse.NONE),
        (SERVICE_RUN_IRRIGATION, run_irrigation, RUN_IRRIGATION_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_STOP_IRRIGATION, stop_irrigation, vol.Schema({}), SupportsResponse.NONE),
        (SERVICE_SET_SHADING, set_shading, SET_SHADING_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_AUTOFILL, autofill, AUTOFILL_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_EXPORT_PDF, export_pdf, EXPORT_PDF_SCHEMA, SupportsResponse.OPTIONAL),
    ]
    for name, handler, schema, supports in reg:
        hass.services.async_register(DOMAIN, name, handler, schema=schema, supports_response=supports)
