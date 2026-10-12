"""Hardware actuation: irrigation valves + pump, greenhouse vents and shading.

Safety first - every rule from ``engine/irrigation.py`` is re-checked right
before a run, and the controller adds the runtime guarantees:

* **One run at a time** (``asyncio.Lock``); a second request is refused.
* **Pump interlock** - valve open → wait → pump on … pump off → wait →
  valve closed.  The pump never runs against closed valves.
* **Max runtime** - clamped again here, independent of the plan.
* **Always clean up** - a ``finally`` block closes every valve that was
  touched and switches the pump off, also on errors and on cancellation
  (``stop`` service, Home Assistant shutdown).
* Every run is written to ``irrigation_log`` (feeds the water balance) and
  fired as ``garden_manager_irrigation_run``.
"""

from __future__ import annotations

import asyncio
from dataclasses import dataclass, field
from datetime import datetime, timedelta
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.const import ATTR_ENTITY_ID
from homeassistant.core import HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.util import dt as dt_util

from .const import EVENT_IRRIGATION_RUN
from .engine.irrigation import IrrigationPlan, plan_irrigation
from .engine.models import GreenhouseAction, IrrigationEvent
from .engine.waterbalance import trim_irrigation_log

if TYPE_CHECKING:
    from .coordinator import GardenCoordinator

_LOGGER = logging.getLogger(__name__)

VALVE_SETTLE_S = 1.0
# How long a valve may take to report its new state.
STATE_TIMEOUT_S = 5.0
# A valve open this much longer than the longest allowed run (without Hortulus
# watering) is reported as stuck.
STUCK_MARGIN_MIN = 10
TEST_MAX_S = 60

# Only settled states count; "opening" / "closing" are still on their way.
_OPEN = {"on", "open"}
_CLOSED = {"off", "closed"}


def _is_open(state: str | None) -> bool | None:
    """``True``/``False`` for a settled valve/switch state, ``None`` when moving, unknown or unavailable."""
    if state in _OPEN:
        return True
    if state in _CLOSED:
        return False
    return None


def _on_service(entity_id: str, on: bool) -> tuple[str, str]:
    domain = entity_id.split(".", 1)[0]
    if domain == "valve":
        return "valve", "open_valve" if on else "close_valve"
    if domain == "cover":
        return "cover", "open_cover" if on else "close_cover"
    if domain in ("switch", "input_boolean", "fan", "light"):
        return domain, "turn_on" if on else "turn_off"
    return "homeassistant", "turn_on" if on else "turn_off"


async def _switch(hass: HomeAssistant, entity_id: str, on: bool) -> None:
    domain, service = _on_service(entity_id, on)
    await hass.services.async_call(domain, service, {ATTR_ENTITY_ID: entity_id}, blocking=True)


@dataclass(slots=True)
class RunStatus:
    running: bool = False
    bed_id: str | None = None
    started_at: datetime | None = None
    ends_at: datetime | None = None
    last_plan: dict[str, Any] = field(default_factory=dict)
    last_error: str | None = None


class IrrigationController:
    def __init__(self, hass: HomeAssistant, coordinator: GardenCoordinator) -> None:
        self.hass = hass
        self.coordinator = coordinator
        self._lock = asyncio.Lock()
        self._task: asyncio.Task[None] | None = None
        self.status = RunStatus()
        self.notifier: Any = None  # set by __init__ (GardenNotifier)
        # entity_id -> since when it is open while Hortulus is not watering
        self._open_since: dict[str, datetime] = {}
        self.stuck: dict[str, datetime] = {}
        self._reported: set[str] = set()

    @property
    def running(self) -> bool:
        # A run that is scheduled but has not taken the lock yet counts as running,
        # otherwise two quick requests would water the beds twice.
        return self._lock.locked() or (self._task is not None and not self._task.done())

    def build_plan(
        self,
        *,
        force: bool = False,
        bed_ids: set[str] | None = None,
        override_mm: float | None = None,
    ) -> IrrigationPlan:
        analysis = self.coordinator.data
        data = self.coordinator.repo.data
        recs = {k: b.irrigation for k, b in analysis.beds.items()} if analysis else {}
        outdoor_temp = None
        if data.settings.outdoor_sensors.air_temperature:
            state = self.hass.states.get(data.settings.outdoor_sensors.air_temperature)
            outdoor_temp = _float(state.state) if state else None
        if outdoor_temp is None:
            outdoor_temp = self.coordinator.weather.temperature
        return plan_irrigation(
            data,
            recs,
            now=dt_util.now(),
            frost_by_zone={k: z.frost for k, z in analysis.zones.items()} if analysis else {},
            outdoor_frost=analysis.frost if analysis else None,
            outdoor_temp=outdoor_temp,
            zone_air={k: z.air_temperature for k, z in analysis.zones.items()} if analysis else {},
            force=force,
            bed_ids=bed_ids,
            override_mm=override_mm,
        )

    @callback
    def async_start(self, plan: IrrigationPlan, *, source: str = "auto") -> bool:
        """Run ``plan`` in the background; False when a run is already active."""
        if self.running or not plan.runs:
            return False
        self._task = self.hass.async_create_background_task(self._run(plan, source), "hortulus_irrigation")
        return True

    @callback
    def async_stop_on_unload(self) -> None:
        if self._task and not self._task.done():
            self._task.cancel()  # the run's finally block closes everything

    async def async_stop(self) -> None:
        if self._task and not self._task.done():
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass

    async def _run(self, plan: IrrigationPlan, source: str) -> None:
        settings = self.coordinator.repo.data.settings.irrigation
        pump = settings.pump_entity
        touched: set[str] = set()
        async with self._lock:
            self.status = RunStatus(running=True, last_plan=plan.to_dict())
            try:
                for run in plan.runs:
                    minutes = min(run.minutes, settings.max_runtime_min)
                    if minutes <= 0:
                        continue
                    self.status.bed_id = run.bed_id
                    self.status.started_at = dt_util.now()
                    self.status.ends_at = dt_util.now() + timedelta(minutes=minutes)
                    self.coordinator.async_update_listeners()
                    touched.add(run.entity_id)
                    await _switch(self.hass, run.entity_id, True)
                    if pump:
                        await asyncio.sleep(VALVE_SETTLE_S)
                        await _switch(self.hass, pump, True)
                    started = dt_util.now()
                    completed = False
                    try:
                        await asyncio.sleep(minutes * 60)
                        completed = True
                    finally:
                        if pump:
                            await _switch(self.hass, pump, False)
                            await asyncio.sleep(settings.pump_lead_s)
                        await _switch(self.hass, run.entity_id, False)
                        touched.discard(run.entity_id)
                        self.hass.async_create_background_task(
                            self._verify_closed(run.entity_id, run.bed_id), "hortulus_verify_valve"
                        )
                        # Interrupted runs book the time that really passed.
                        ran_min = minutes if completed else (dt_util.now() - started).total_seconds() / 60
                        self._log(run.bed_id, min(ran_min, minutes), run, source)
            except asyncio.CancelledError:
                _LOGGER.info("Irrigation run cancelled")
                raise
            except HomeAssistantError as err:
                _LOGGER.error("Irrigation run aborted: %s", err)
                self.status.last_error = str(err)
            finally:
                # Belt and braces: everything off, whatever happened.
                for entity_id in touched:
                    try:
                        await _switch(self.hass, entity_id, False)
                    except HomeAssistantError:
                        _LOGGER.exception("Could not close %s", entity_id)
                if pump:
                    try:
                        await _switch(self.hass, pump, False)
                    except HomeAssistantError:
                        _LOGGER.exception("Could not stop pump %s", pump)
                self.status.running = False
                self.status.bed_id = None
                self.status.ends_at = None
                self.coordinator.repo.async_changed("tasks", source="system")

    # ------------------------------------------------------------------ #
    # Checking the hardware
    # ------------------------------------------------------------------ #
    def valve_entities(self) -> dict[str, str]:
        """Every valve/pump Hortulus drives -> what it is (bed name or ``pump``)."""
        data = self.coordinator.repo.data
        out = {b.irrigation_entity: b.name for b in data.beds if b.irrigation_entity}
        if data.settings.irrigation.pump_entity:
            out[data.settings.irrigation.pump_entity] = "pump"
        return out

    def _state(self, entity_id: str) -> str | None:
        state = self.hass.states.get(entity_id)
        return state.state if state else None

    async def _wait_for(self, entity_id: str, want_open: bool) -> str | None:
        """Wait until the entity reports the wanted state; returns the last state seen."""
        for _ in range(max(1, int(STATE_TIMEOUT_S / 0.25))):
            state = self._state(entity_id)
            if _is_open(state) is want_open:
                return state
            await asyncio.sleep(0.25)
        return self._state(entity_id)

    async def _verify_closed(self, entity_id: str, bed_id: str | None) -> None:
        state = await self._wait_for(entity_id, False)
        if _is_open(state) is not False:  # still open, stuck closing, or not reporting
            self._problem(entity_id, "valve_not_closed", state, bed_id=bed_id)

    def _problem(self, entity_id: str, code: str, state: str | None, *, bed_id: str | None = None) -> None:
        """Log a hardware problem and notify (once per valve until it is fine again)."""
        what = self.valve_entities().get(entity_id, entity_id)
        message = f"{entity_id} ({what}): {code}, state {state!r}"
        _LOGGER.warning("Irrigation hardware: %s", message)
        self.coordinator.repo.record_error(
            "irrigation", code, message, {"entity_id": entity_id, "bed_id": bed_id, "state": state}
        )
        if entity_id in self._reported:
            return
        self._reported.add(entity_id)
        if self.notifier is not None:
            from .engine.i18n import t

            lang = self.coordinator.lang
            self.hass.async_create_task(
                self.notifier.async_send(
                    t("notify.valve_title", lang),
                    t(f"notify.{code}", lang, entity=entity_id, what=what),
                    notification_id=f"hortulus_valve_{entity_id}",
                    tts=False,
                )
            )

    async def async_test(self, entity_id: str, *, seconds: float = 5, with_pump: bool = True) -> dict[str, Any]:
        """Open a valve briefly (with the pump, in the safe order) and check it reports open and closed."""
        if self.running:
            raise HomeAssistantError("irrigation is running")
        seconds = max(1.0, min(float(seconds), TEST_MAX_S))
        pump = self.coordinator.repo.data.settings.irrigation.pump_entity if with_pump else None
        if pump == entity_id:
            pump = None
        result: dict[str, Any] = {"entity_id": entity_id, "seconds": seconds, "before": self._state(entity_id)}
        async with self._lock:
            try:
                await _switch(self.hass, entity_id, True)
                result["open_state"] = await self._wait_for(entity_id, True)
                result["opened"] = _is_open(result["open_state"])
                if result["opened"]:
                    # the pump only ever runs against a valve that reported open
                    if pump:
                        await asyncio.sleep(VALVE_SETTLE_S)
                        await _switch(self.hass, pump, True)
                    await asyncio.sleep(seconds)
                else:
                    pump = None
            finally:
                try:
                    if pump:
                        await _switch(self.hass, pump, False)
                        await asyncio.sleep(self.coordinator.repo.data.settings.irrigation.pump_lead_s)
                finally:
                    await _switch(self.hass, entity_id, False)
            result["closed_state"] = await self._wait_for(entity_id, False)
            result["closed"] = _is_open(result["closed_state"]) is False
            result["pump"] = pump
        ok = bool(result.get("opened")) and result["closed"]
        result["ok"] = ok
        if not result.get("opened"):
            self._problem(entity_id, "valve_did_not_open", result.get("open_state"))
        elif not result["closed"]:
            self._problem(entity_id, "valve_not_closed", result["closed_state"])
        return result

    async def async_close(self, entity_id: str) -> str | None:
        """Close a valve that stayed open (button in the panel)."""
        await _switch(self.hass, entity_id, False)
        state = await self._wait_for(entity_id, False)
        if _is_open(state) is False:  # only a valve that reports closed is cleared
            self.stuck.pop(entity_id, None)
            self._open_since.pop(entity_id, None)
            self._reported.discard(entity_id)
        return state

    @callback
    def async_watch(self, now: datetime | None = None) -> None:
        """Every minute: a valve or pump open long after any run could last is reported."""
        now = now or dt_util.now()
        limit = timedelta(minutes=self.coordinator.repo.data.settings.irrigation.max_runtime_min + STUCK_MARGIN_MIN)
        changed = False
        for entity_id in self.valve_entities():
            is_open = _is_open(self._state(entity_id))
            if self.running or is_open is None:
                # watering, moving, or not reporting: keep what we know until it settles
                continue
            if is_open is False:
                if entity_id in self.stuck:
                    changed = True
                self._open_since.pop(entity_id, None)
                self.stuck.pop(entity_id, None)
                self._reported.discard(entity_id)
                continue
            since = self._open_since.setdefault(entity_id, now)
            if now - since >= limit and entity_id not in self.stuck:
                self.stuck[entity_id] = since
                changed = True
                self._problem(entity_id, "valve_stuck", self._state(entity_id))
        if changed:
            self.coordinator.async_update_listeners()

    def _log(self, bed_id: str, minutes: float, run: Any, source: str) -> None:
        data = self.coordinator.repo.data
        bed = data.bed(bed_id)
        if bed is None or minutes <= 0:
            return
        liters = round(minutes * (bed.irrigation_flow_lpm or 0), 1)
        mm = round(liters / bed.area_m2, 1) if bed.area_m2 else 0.0
        now = dt_util.now()
        data.irrigation_log.append(IrrigationEvent(bed_id, now, mm, liters, round(minutes, 1), source))  # type: ignore[arg-type]
        trim_irrigation_log(data, now)
        self.hass.bus.async_fire(
            EVENT_IRRIGATION_RUN,
            {
                "bed_id": bed_id,
                "bed": bed.name,
                "minutes": round(minutes, 1),
                "liters": liters,
                "mm": mm,
                "source": source,
            },
        )


class ClimateController:
    """Drives vent and shade entities of enclosed zones in ``auto`` mode.

    Acts only when the wanted state changes (no flapping, no fighting with a
    manual override).  The shade select (``auto`` / ``on`` / ``off``) wins
    over the advice.
    """

    def __init__(self, hass: HomeAssistant, coordinator: GardenCoordinator) -> None:
        self.hass = hass
        self.coordinator = coordinator
        self._last: dict[str, bool] = {}

    @callback
    def async_apply(self, *_: Any) -> None:
        analysis = self.coordinator.data
        if analysis is None:
            return
        for zone in self.coordinator.repo.data.zones:
            if not zone.is_enclosed:
                continue
            za = analysis.zones.get(zone.id)
            advice = za.greenhouse if za else None
            action = advice.action if advice else GreenhouseAction.NONE
            if zone.shade_entity:
                if zone.shading_mode == "on":
                    wanted: bool | None = True
                elif zone.shading_mode == "off":
                    wanted = False
                elif zone.climate_control == "auto":
                    wanted = action is GreenhouseAction.SHADE
                else:
                    wanted = None
                self._set(f"shade:{zone.id}", zone.shade_entity, wanted, shade=True)
            if zone.vent_entity and zone.climate_control == "auto":
                vent = action in (GreenhouseAction.VENTILATE, GreenhouseAction.SHADE)
                if action in (GreenhouseAction.CLOSE_UP, GreenhouseAction.HEAT):
                    vent = False
                humid = (
                    za is not None
                    and za.humidity is not None
                    and za.humidity >= 90
                    and za.air_temperature is not None
                    and za.air_temperature > 12
                )
                self._set(f"vent:{zone.id}", zone.vent_entity, vent or humid, shade=False)

    def _set(self, key: str, entity_id: str, wanted: bool | None, *, shade: bool) -> None:
        if wanted is None or self._last.get(key) == wanted:
            return
        self._last[key] = wanted
        # A shade *cover* is deployed by closing it; switches are simply on.
        on = (not wanted) if shade and entity_id.startswith("cover.") else wanted
        self.hass.async_create_task(self._safe_switch(entity_id, on))

    async def _safe_switch(self, entity_id: str, on: bool) -> None:
        try:
            await _switch(self.hass, entity_id, on)
        except HomeAssistantError as err:
            _LOGGER.warning("Could not switch %s: %s", entity_id, err)


def _float(value: Any) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None
