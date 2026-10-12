"""Calendar of garden tasks (all-day events), editable from the HA calendar."""

from __future__ import annotations

from datetime import date, datetime, timedelta
from typing import Any

from homeassistant.components.calendar import (
    CalendarEntity,
    CalendarEntityFeature,
    CalendarEvent,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.util import dt as dt_util

from . import GardenConfigEntry
from .coordinator import GardenCoordinator
from .engine.models import Task, TaskStatus
from .entity import GardenEntity
from .operations import op_add_task, op_delete_task, op_postpone_task, op_update_task

PARALLEL_UPDATES = 0
PRIORITY_MARK = {"urgent": "‼ ", "high": "! ", "normal": "", "low": ""}


async def async_setup_entry(
    hass: HomeAssistant, entry: GardenConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    async_add_entities([GardenTaskCalendar(entry.runtime_data.coordinator, entry)])


def task_to_event(task: Task) -> CalendarEvent:
    done = "✓ " if task.status is TaskStatus.DONE else ""
    description = task.description
    if task.window_start and task.window_end and task.window_start != task.window_end:
        description = f"{description}\n\n[{task.window_start.isoformat()} → {task.window_end.isoformat()}]".strip()
    return CalendarEvent(
        start=task.due,
        end=task.due + timedelta(days=1),
        summary=f"{done}{PRIORITY_MARK[task.priority.value]}{task.title}",
        description=description or None,
        uid=task.id,
    )


class GardenTaskCalendar(GardenEntity, CalendarEntity):
    """``calendar.hortulus_tasks``"""

    _attr_supported_features = (
        CalendarEntityFeature.CREATE_EVENT | CalendarEntityFeature.DELETE_EVENT | CalendarEntityFeature.UPDATE_EVENT
    )

    def __init__(self, coordinator: GardenCoordinator, entry: GardenConfigEntry) -> None:
        super().__init__(coordinator, "tasks")
        self._runtime = entry.runtime_data

    @property
    def event(self) -> CalendarEvent | None:
        """Current/next open task (drives the entity state on/off)."""
        today = dt_util.now().date()
        upcoming = sorted(
            (t for t in self.coordinator.repo.data.tasks if t.is_open and t.due >= today),
            key=lambda t: (t.due, -t.priority.rank),
        )
        overdue = [t for t in self.coordinator.repo.data.tasks if t.is_open and t.due < today]
        if overdue:  # show overdue work as happening today
            task = max(overdue, key=lambda t: t.priority.rank)
            event = task_to_event(task)
            event.start, event.end = today, today + timedelta(days=1)
            return event
        return task_to_event(upcoming[0]) if upcoming else None

    async def async_get_events(
        self, hass: HomeAssistant, start_date: datetime, end_date: datetime
    ) -> list[CalendarEvent]:
        start, end = start_date.date(), end_date.date()
        return [
            task_to_event(t)
            for t in self.coordinator.repo.data.tasks
            if t.status is not TaskStatus.SKIPPED and start <= t.due <= end
        ]

    async def async_create_event(self, **kwargs: Any) -> None:
        start = kwargs["dtstart"]
        due = start if isinstance(start, date) and not isinstance(start, datetime) else start.date()
        op_add_task(
            self._runtime,
            title=kwargs["summary"],
            due=due,
            description=kwargs.get("description") or "",
        )

    async def async_delete_event(
        self, uid: str, recurrence_id: str | None = None, recurrence_range: str | None = None
    ) -> None:
        op_delete_task(self._runtime, uid)

    async def async_update_event(
        self,
        uid: str,
        event: dict[str, Any],
        recurrence_id: str | None = None,
        recurrence_range: str | None = None,
    ) -> None:
        task = self.coordinator.repo.data.task(uid)
        if task is None:
            return
        start = event.get("dtstart")
        if start is not None:
            due = start if not isinstance(start, datetime) else start.date()
            if due != task.due:
                op_postpone_task(self._runtime, uid, to=due, reason="calendar")
        changes: dict[str, Any] = {}
        if "summary" in event and event["summary"] and event["summary"].lstrip("✓‼! ") != task.title:
            changes["title"] = event["summary"]
        if "description" in event:
            changes["description"] = event.get("description") or ""
        if changes:
            op_update_task(self._runtime, uid, changes)
