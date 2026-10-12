"""Notifications: persistent notifications, mobile push, TTS and bus events.

All notifications are de-duplicated with keys stored in ``GardenData.notified``
so a restart or a recompute never repeats the same frost warning.
"""

from __future__ import annotations

from datetime import date
import logging
from typing import Any

from homeassistant.components import persistent_notification
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util

from .const import (
    BRAND,
    DOMAIN,
    EVENT_FROST_WARNING,
    EVENT_HEAT_WARNING,
    EVENT_IRRIGATION_RECOMMENDED,
    EVENT_TASK_DUE,
)
from .engine.analysis import Alert, GardenAnalysis
from .engine.i18n import t
from .engine.models import IrrigationAction, Task
from .engine.tasks import MergeResult, tasks_due
from .storage import GardenRepository

_LOGGER = logging.getLogger(__name__)


class GardenNotifier:
    def __init__(self, hass: HomeAssistant, repo: GardenRepository) -> None:
        self.hass = hass
        self.repo = repo

    @property
    def settings(self):
        return self.repo.data.settings.notifications

    def _seen(self, key: str) -> bool:
        return key in self.repo.data.notified

    def _mark(self, key: str, day: date) -> None:
        self.repo.data.notified[key] = day.isoformat()
        self.repo.async_schedule_save()

    # ------------------------------------------------------------------ #
    @callback
    def async_process(self, analysis: GardenAnalysis, merge: MergeResult) -> None:
        """Called after every coordinator compute."""
        lang = analysis.lang
        for alert in analysis.alerts:
            if self._seen(alert.key):
                continue
            if alert.kind == "frost":
                self._mark(alert.key, analysis.today)
                self._fire_alert(EVENT_FROST_WARNING, alert)
                if self.settings.frost_alerts:
                    self.hass.async_create_task(self._send_alert(alert, lang, tts=self.settings.tts_frost_announcement))
            elif alert.kind == "heat":
                self._mark(alert.key, analysis.today)
                self._fire_alert(EVENT_HEAT_WARNING, alert)
                if self.settings.heat_alerts:
                    self.hass.async_create_task(self._send_alert(alert, lang, tts=False))

        for bed_id, bed in analysis.beds.items():
            rec = bed.irrigation
            key = f"irrigation:{bed_id}:{analysis.today.isoformat()}"
            if rec.action is IrrigationAction.WATER and not self._seen(key):
                self._mark(key, analysis.today)
                self.hass.bus.async_fire(
                    EVENT_IRRIGATION_RECOMMENDED,
                    {"bed_id": bed_id, **rec.to_dict()},
                )

        # New tasks due today (sensor/weather driven ones appear during the day)
        for task in merge.created:
            if task.due <= analysis.today:
                self._fire_task_due(task)

    def _fire_alert(self, event: str, alert: Alert) -> None:
        self.hass.bus.async_fire(
            event,
            {"key": alert.key, "severity": alert.severity, "zone_id": alert.zone_id, **alert.params},
        )

    def _fire_task_due(self, task: Task) -> None:
        self.hass.bus.async_fire(
            EVENT_TASK_DUE,
            {
                "task_id": task.id,
                "type": task.type.value,
                "title": task.title,
                "priority": task.priority.value,
                "due": task.due.isoformat(),
                "bed_id": task.bed_id,
                "zone_id": task.zone_id,
                "planting_id": task.planting_id,
            },
        )

    def render_alert(self, alert: Alert, lang: str) -> str:
        params = dict(alert.params)
        if "level" in params:
            params["level"] = t(f"risk.{params['level']}", lang)
        if "when" in params:
            params["when"] = t(params["when"], lang)
        message = t(alert.message_key, lang, **params)
        plants = alert.params.get("plants")
        if plants:
            message += " - " + ", ".join(plants)
        return message

    async def _send_alert(self, alert: Alert, lang: str, *, tts: bool) -> None:
        message = self.render_alert(alert, lang)
        title = (
            f"{BRAND}: {t('risk.' + alert.params.get('level', 'unknown'), lang)}" if alert.kind == "frost" else BRAND
        )
        await self.async_send(
            title,
            message,
            notification_id=f"{DOMAIN}_{alert.kind}",
            tts=tts,
            data={"tag": f"{DOMAIN}_{alert.kind}", "url": "/hortulus"},
        )

    # ------------------------------------------------------------------ #
    async def async_send_digest(self, analysis: GardenAnalysis) -> None:
        """Morning digest: today's tasks, ordered by priority."""
        key = f"digest:{analysis.today.isoformat()}"
        if self._seen(key):
            return
        self._mark(key, analysis.today)
        lang = analysis.lang
        due = tasks_due(self.repo.data.tasks, analysis.today)
        for task in due:
            self._fire_task_due(task)
        if not due:
            message = t("digest.none", lang)
        else:
            minutes = sum(task.estimated_minutes for task in due)
            lines = [t("digest.count", lang, count=len(due), minutes=minutes)]
            lines += [f"- {task.title}" for task in due[:12]]
            if len(due) > 12:
                lines.append(f"- … +{len(due) - 12}")
            message = "\n".join(lines)
        await self.async_send(
            t("digest.title", lang),
            message,
            notification_id=f"{DOMAIN}_digest",
            tts=False,
            data={"tag": f"{DOMAIN}_digest", "url": "/hortulus"},
        )

    async def async_send(
        self,
        title: str,
        message: str,
        *,
        notification_id: str,
        tts: bool = False,
        data: dict[str, Any] | None = None,
    ) -> None:
        cfg = self.settings
        if cfg.persistent:
            persistent_notification.async_create(self.hass, message, title=title, notification_id=notification_id)
        for service in cfg.notify_services:
            domain, _, name = service.partition(".")
            if not name:
                domain, name = "notify", domain
            if not self.hass.services.has_service(domain, name):
                _LOGGER.debug("Notify service %s not available", service)
                continue
            try:
                await self.hass.services.async_call(
                    domain, name, {"title": title, "message": message, "data": data or {}}, blocking=False
                )
            except HomeAssistantError as err:
                _LOGGER.warning("Could not send push notification via %s: %s", service, err)
        if tts and cfg.tts_entity and cfg.tts_media_players:
            try:
                await self.hass.services.async_call(
                    "tts",
                    "speak",
                    {
                        "entity_id": cfg.tts_entity,
                        "media_player_entity_id": cfg.tts_media_players,
                        "message": message,
                        "cache": True,
                    },
                    blocking=False,
                )
            except HomeAssistantError as err:
                _LOGGER.warning("TTS announcement failed: %s", err)
        _LOGGER.debug("Notification sent at %s: %s", dt_util.now(), title)
