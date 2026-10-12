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
    SERVICE_ADD_TASK,
    SERVICE_COMPLETE_TASK,
    SERVICE_DELETE_TASK,
    SERVICE_EXPORT_PLAN,
    SERVICE_GENERATE_TASKS,
    SERVICE_IMPORT_PLAN,
    SERVICE_POSTPONE_TASK,
    SERVICE_RECALCULATE_PLAN,
)
from .engine.models import TaskPriority, TaskType
from .engine.planio import PlanImportError, export_plan, import_plan
from .operations import (
    op_add_task,
    op_complete_task,
    op_delete_task,
    op_postpone_task,
)

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
            counts = import_plan(runtime.repo.data, call.data["plan"], call.data["mode"])
        except PlanImportError as err:
            raise ServiceValidationError(
                translation_domain=DOMAIN,
                translation_key="invalid_plan",
                translation_placeholders={"reason": str(err)},
            ) from err
        runtime.repo.async_changed("import", bump_revision=False)
        return dict(counts)

    reg: list[tuple[str, Any, vol.Schema, SupportsResponse]] = [
        (SERVICE_ADD_TASK, add_task, ADD_TASK_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_COMPLETE_TASK, complete, COMPLETE_TASK_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_POSTPONE_TASK, postpone, POSTPONE_TASK_SCHEMA, SupportsResponse.OPTIONAL),
        (SERVICE_DELETE_TASK, delete, DELETE_TASK_SCHEMA, SupportsResponse.NONE),
        (SERVICE_GENERATE_TASKS, generate, vol.Schema({}), SupportsResponse.OPTIONAL),
        (SERVICE_RECALCULATE_PLAN, recalculate, vol.Schema({}), SupportsResponse.OPTIONAL),
        (SERVICE_EXPORT_PLAN, export, EXPORT_SCHEMA, SupportsResponse.ONLY),
        (SERVICE_IMPORT_PLAN, import_, IMPORT_SCHEMA, SupportsResponse.OPTIONAL),
    ]
    for name, handler, schema, supports in reg:
        hass.services.async_register(DOMAIN, name, handler, schema=schema, supports_response=supports)
