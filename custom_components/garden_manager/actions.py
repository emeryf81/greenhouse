"""Buttons in phone notifications (Home Assistant companion app).

The digest and the reminders carry "Done" (one task), "Tomorrow" and, when
beds need water, "Water now"; a valve that stayed open carries "Close".
Pressing one fires ``mobile_app_notification_action``; the action names
point at a short token so a notification never carries a long id list.
"""

from __future__ import annotations

from collections.abc import Sequence
import logging
import secrets
from typing import TYPE_CHECKING, Any

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError

from .engine.i18n import t
from .engine.models import Task

if TYPE_CHECKING:
    from . import GardenRuntime

_LOGGER = logging.getLogger(__name__)

ACTION_EVENT = "mobile_app_notification_action"
PREFIX = "HORTULUS_"
MAX_TOKENS = 60  # older notifications simply stop working after a while


class NotificationActions:
    def __init__(self, hass: HomeAssistant) -> None:
        self.hass = hass
        self.runtime: GardenRuntime | None = None
        self._tokens: dict[str, list[str]] = {}  # token -> task ids, or [entity_id] for CLOSE

    def _token(self, values: list[str]) -> str:
        token = secrets.token_hex(4)
        self._tokens[token] = values
        while len(self._tokens) > MAX_TOKENS:
            self._tokens.pop(next(iter(self._tokens)))
        return token

    def for_tasks(self, tasks: Sequence[Task], lang: str) -> list[dict[str, str]]:
        """Buttons for a notification that lists ``tasks``."""
        open_tasks = [task for task in tasks if task.is_open]
        out: list[dict[str, str]] = []
        if open_tasks:
            token = self._token([task.id for task in open_tasks])
            if len(open_tasks) == 1:
                out.append({"action": f"{PREFIX}DONE_{token}", "title": t("action.done", lang)})
            out.append({"action": f"{PREFIX}LATER_{token}", "title": t("action.tomorrow", lang)})
        if self.water_offer():
            out.append({"action": f"{PREFIX}WATER", "title": t("action.water_now", lang)})
        return out[:3]

    def for_valve(self, entity_id: str, lang: str) -> list[dict[str, str]]:
        return [{"action": f"{PREFIX}CLOSE_{self._token([entity_id])}", "title": t("action.close_valve", lang)}]

    def water_offer(self) -> bool:
        """Offer "Water now" when a bed with a valve needs water and nothing runs."""
        runtime = self.runtime
        if runtime is None or runtime.irrigation.running or runtime.coordinator.data is None:
            return False
        data = runtime.repo.data
        for bed_id, state in runtime.coordinator.data.beds.items():
            bed = data.bed(bed_id)
            rec = getattr(state, "irrigation", None)
            if bed and bed.irrigation_entity and rec is not None and str(getattr(rec, "action", "")) == "water":
                return True
        return False

    @callback
    def handle(self, event: Event) -> None:
        action = str(event.data.get("action") or "")
        if not action.startswith(PREFIX) or self.runtime is None:
            return
        kind, _, token = action.removeprefix(PREFIX).partition("_")
        self.hass.async_create_task(self._run(kind, token), f"hortulus_action_{kind.lower()}")

    async def _run(self, kind: str, token: str) -> None:
        from .operations import op_complete_task, op_postpone_task

        runtime = self.runtime
        if runtime is None:
            return
        try:
            if kind == "WATER":
                plan = runtime.irrigation.build_plan()
                if not runtime.irrigation.async_start(plan, source="manual"):
                    _LOGGER.info("Water now: nothing to water or already running")
                return
            values = self._tokens.pop(token, None)
            if values is None:
                _LOGGER.info("Notification action %s is no longer valid", kind)
                return
            if kind == "DONE":
                for task_id in values:
                    op_complete_task(self.hass, runtime, task_id)
            elif kind == "LATER":
                for task_id in values:
                    op_postpone_task(runtime, task_id, days=1, reason="notification")
            elif kind == "CLOSE" and values[0] in runtime.irrigation.valve_entities():
                await runtime.irrigation.async_close(values[0])
        except (HomeAssistantError, ValueError) as err:
            _LOGGER.warning("Notification action %s failed: %s", kind, err)


def with_actions(data: dict[str, Any] | None, actions: list[dict[str, str]]) -> dict[str, Any]:
    out = dict(data or {})
    if actions:
        out["actions"] = actions
    return out
