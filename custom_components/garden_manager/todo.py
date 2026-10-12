"""To-do list of open garden tasks (due within a week, plus overdue)."""

from __future__ import annotations

from datetime import timedelta

from homeassistant.components.todo import (
    TodoItem,
    TodoItemStatus,
    TodoListEntity,
    TodoListEntityFeature,
)
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.util import dt as dt_util

from . import GardenConfigEntry
from .coordinator import GardenCoordinator
from .engine.models import TaskStatus
from .entity import GardenEntity
from .operations import op_add_task, op_complete_task, op_delete_task, op_postpone_task, op_update_task

PARALLEL_UPDATES = 0
HORIZON = timedelta(days=7)


async def async_setup_entry(
    hass: HomeAssistant, entry: GardenConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    async_add_entities([GardenTodoList(entry.runtime_data.coordinator, entry)])


class GardenTodoList(GardenEntity, TodoListEntity):
    """``todo.hortulus_this_week``"""

    _attr_supported_features = (
        TodoListEntityFeature.CREATE_TODO_ITEM
        | TodoListEntityFeature.UPDATE_TODO_ITEM
        | TodoListEntityFeature.DELETE_TODO_ITEM
        | TodoListEntityFeature.SET_DUE_DATE_ON_ITEM
        | TodoListEntityFeature.SET_DESCRIPTION_ON_ITEM
    )

    def __init__(self, coordinator: GardenCoordinator, entry: GardenConfigEntry) -> None:
        super().__init__(coordinator, "this_week")
        self._runtime = entry.runtime_data

    @property
    def todo_items(self) -> list[TodoItem]:
        today = dt_util.now().date()
        limit = today + HORIZON
        recent = today - timedelta(days=2)
        tasks = [
            t
            for t in self.coordinator.repo.data.tasks
            if (t.is_open and t.due <= limit)
            or (t.status is TaskStatus.DONE and t.completed_at and t.completed_at.date() >= recent)
        ]
        tasks.sort(key=lambda t: (not t.is_open, t.due, -t.priority.rank))
        return [
            TodoItem(
                summary=t.title,
                uid=t.id,
                status=TodoItemStatus.NEEDS_ACTION if t.is_open else TodoItemStatus.COMPLETED,
                due=t.due,
                description=t.description or None,
            )
            for t in tasks
        ]

    async def async_create_todo_item(self, item: TodoItem) -> None:
        due = item.due if item.due is None or not hasattr(item.due, "date") else item.due.date()  # type: ignore[union-attr]
        op_add_task(self._runtime, title=item.summary or "?", due=due, description=item.description or "")

    async def async_update_todo_item(self, item: TodoItem) -> None:
        task = self.coordinator.repo.data.task(item.uid or "")
        if task is None:
            return
        if item.status is TodoItemStatus.COMPLETED and task.is_open:
            op_complete_task(self.hass, self._runtime, task.id)
            return
        if item.status is TodoItemStatus.NEEDS_ACTION and not task.is_open:
            op_update_task(self._runtime, task.id, {"reopen": True})
        if item.due is not None:
            due = item.due.date() if hasattr(item.due, "date") else item.due  # type: ignore[union-attr]
            if due != task.due:
                op_postpone_task(self._runtime, task.id, to=due, reason="todo")
        changes = {}
        if item.summary and item.summary != task.title:
            changes["title"] = item.summary
        if item.description is not None and item.description != task.description:
            changes["description"] = item.description
        if changes:
            op_update_task(self._runtime, task.id, changes)

    async def async_delete_todo_items(self, uids: list[str]) -> None:
        for uid in uids:
            op_delete_task(self._runtime, uid)
