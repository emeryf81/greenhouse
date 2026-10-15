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
from .engine.climate import compare_with_last_year, last_month, summary_lines
from .engine.i18n import t
from .engine.models import IrrigationAction, Task
from .engine.seasonbook import MONTHS
from .engine.slogans import enabled as slogans_enabled, slogan
from .engine.tasks import MergeResult, overdue_report, tasks_due, week_ahead
from .storage import GardenRepository

_LOGGER = logging.getLogger(__name__)


class GardenNotifier:
    def __init__(self, hass: HomeAssistant, repo: GardenRepository) -> None:
        self.hass = hass
        self.repo = repo
        from .actions import NotificationActions

        self.actions = NotificationActions(hass)  # buttons on phone notifications

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
            message += self._saying(analysis, ("rest", "outdoors"), "digest")
        else:
            minutes = sum(task.estimated_minutes for task in due)
            lines = [t("digest.count", lang, count=len(due), minutes=minutes)]
            lines += [f"- {task.title}" for task in due[:12]]
            if len(due) > 12:
                lines.append(f"- … +{len(due) - 12}")
            message = "\n".join(lines) + self._saying(analysis, ("garden", "veg", "outdoors", "harvest"), "digest")
        await self.async_send(
            t("digest.title", lang),
            message,
            notification_id=f"{DOMAIN}_digest",
            tts=False,
            data={"tag": f"{DOMAIN}_digest", "url": "/hortulus", **self._buttons(due, lang)},
        )
        await self._send_personal(due, lambda tasks: t("digest.title", lang), f"{DOMAIN}_digest", lang)
        if analysis.today.day == 1:
            await self.async_send_month_summary(analysis)

    def _saying(self, analysis: GardenAnalysis, topics: tuple[str, ...], salt: str) -> str:
        """A changing garden saying under a message (settings.slogans), or nothing."""
        data = self.repo.data
        if not slogans_enabled(data.settings):
            return ""
        south = data.settings.region.hemisphere.value == "south"
        line = slogan(analysis.lang, day=analysis.today, topics=topics, salt=salt, south=south)
        return f"\n\n🌱 {line}" if line else ""

    async def async_send_month_summary(self, analysis: GardenAnalysis) -> None:
        """On the 1st: last month's weather against the same month last year (settings.season_summary)."""
        data = self.repo.data
        if not data.settings.season_summary:
            return
        key = f"month:{analysis.today.isoformat()}"
        if self._seen(key):
            return
        self._mark(key, analysis.today)
        start, end = last_month(analysis.today)
        latitude = data.settings.region.latitude or self.hass.config.latitude
        cmp = compare_with_last_year(data, start, end, latitude=latitude, elevation_m=data.settings.elevation_m or 0.0)
        lines = summary_lines(cmp, analysis.lang)
        if not lines:
            return
        month = MONTHS.get(analysis.lang, MONTHS["en"])[start.month - 1]
        await self.async_send(
            t("notify.month_title", analysis.lang, month=month),
            "\n".join(lines) + self._saying(analysis, ("weather", "garden"), "month"),
            notification_id=f"{DOMAIN}_month",
            data={"tag": f"{DOMAIN}_month", "url": "/hortulus"},
        )

    async def async_send_overdue(self, analysis: GardenAnalysis) -> None:
        """Evening reminder for tasks left undone, with a verdict per task."""
        cfg = self.settings
        if not cfg.overdue_reminders:
            return
        key = f"overdue:{analysis.today.isoformat()}"
        if self._seen(key):
            return
        items = overdue_report(self.repo.data.tasks, analysis.today, cfg.overdue_after_days)
        self._mark(key, analysis.today)
        if not items:
            return
        lang = analysis.lang
        lines = []
        for item in items[:12]:
            if item.verdict == "still_ok" and item.task.window_end:
                note = t("overdue.still_ok", lang, date=item.task.window_end.strftime("%d/%m"))
            elif item.verdict == "window_closed":
                note = t("overdue.window_closed", lang)
            else:
                note = t("overdue.do_now", lang, days=item.days_late)
            lines.append(f"- {item.task.title} ({note})")
        if len(items) > 12:
            lines.append(f"- … +{len(items) - 12}")
        lines.append(t("overdue.footer", lang))
        await self.async_send(
            t("overdue.title", lang, count=len(items)),
            "\n".join(lines),
            notification_id=f"{DOMAIN}_overdue",
            data={"tag": f"{DOMAIN}_overdue", "url": "/hortulus", **self._buttons([i.task for i in items], lang)},
        )
        await self._send_personal(
            [i.task for i in items], lambda tasks: t("overdue.title", lang, count=len(tasks)), f"{DOMAIN}_overdue", lang
        )

    async def async_send_weekly(self, analysis: GardenAnalysis) -> None:
        """Weekly look-ahead: tasks and minutes per day for the coming seven days."""
        if not self.settings.weekly_plan:
            return
        key = f"weekly:{analysis.today.isoformat()}"
        if self._seen(key):
            return
        self._mark(key, analysis.today)
        lang = analysis.lang
        plan = week_ahead(self.repo.data.tasks, analysis.today)
        lines = [
            t("weekly.day", lang, day=day.strftime("%a %d/%m"), count=len(tasks),
              minutes=sum(task.estimated_minutes for task in tasks))
            for day, tasks in plan.items()
            if tasks
        ]  # fmt: skip
        await self.async_send(
            t("weekly.title", lang),
            ("\n".join(lines) or t("weekly.empty", lang))
            + self._saying(analysis, ("garden", "outdoors", "veg"), "weekly"),
            notification_id=f"{DOMAIN}_weekly",
            data={"tag": f"{DOMAIN}_weekly", "url": "/hortulus"},
        )

    def _buttons(self, tasks: list[Task], lang: str) -> dict[str, Any]:
        """``{"actions": [...]}`` for the companion app (Done / Tomorrow / Water now), or nothing."""
        actions = self.actions.for_tasks(tasks, lang)
        return {"actions": actions} if actions else {}

    async def _send_personal(self, tasks: list[Task], title: Any, tag: str, lang: str = "en") -> None:
        """Each household member with a notify service gets the tasks assigned to them."""
        mapping = self.repo.data.settings.person_notify
        for person, service in mapping.items():
            mine = [task for task in tasks if task.assignee == person]
            if not mine or not service:
                continue
            domain, _, name = service.partition(".")
            if not name:
                domain, name = "notify", domain
            if not self.hass.services.has_service(domain, name):
                continue
            message = "\n".join(f"- {task.title}" for task in mine[:12])
            try:
                await self.hass.services.async_call(
                    domain, name, {"title": title(mine), "message": message,
                                   "data": {"tag": f"{tag}_{person}", "url": "/hortulus", **self._buttons(mine, lang)}},
                    blocking=False,
                )  # fmt: skip
            except HomeAssistantError as err:
                _LOGGER.warning("Could not notify %s via %s: %s", person, service, err)

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
