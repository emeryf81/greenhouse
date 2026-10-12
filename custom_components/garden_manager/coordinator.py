"""DataUpdateCoordinator for Hortulus.

Update strategy ("no heavy polling"):

* The **forecast** is the only thing fetched on a timer (every 30 min) via the
  ``weather.get_forecasts`` action, plus immediately (rate limited to once per
  10 min) when the weather entity itself changes state.
* **Sensors** are never polled: a state-change listener on exactly the mapped
  entity ids triggers a debounced *recompute* from the state machine.
* **Plan edits** (websocket/services) trigger a recompute through the
  repository listener.

Every recompute runs the pure :func:`engine.analysis.analyze` and merges the
generated tasks, so entities, calendar and panel always agree.
"""

from __future__ import annotations

from datetime import datetime, timedelta
import logging
from typing import TYPE_CHECKING, Any

from homeassistant.components.weather import WeatherEntityFeature
from homeassistant.const import (
    ATTR_SUPPORTED_FEATURES,
    ATTR_UNIT_OF_MEASUREMENT,
    STATE_UNAVAILABLE,
    STATE_UNKNOWN,
    UnitOfLength,
    UnitOfSpeed,
    UnitOfTemperature,
)
from homeassistant.core import CALLBACK_TYPE, Event, EventStateChangedData, HomeAssistant, callback
from homeassistant.exceptions import HomeAssistantError
from homeassistant.helpers.debounce import Debouncer
from homeassistant.helpers.event import async_track_state_change_event
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator
from homeassistant.util import dt as dt_util
from homeassistant.util.unit_conversion import (
    DistanceConverter,
    SpeedConverter,
    TemperatureConverter,
)

from .const import (
    DOMAIN,
    EVENT_PLAN_UPDATED,
    FORECAST_MIN_INTERVAL,
    FORECAST_REFRESH,
    SENSOR_DEBOUNCE_SECONDS,
)
from .engine.analysis import GardenAnalysis, analyze
from .engine.i18n import normalize_lang
from .engine.models import SensorReading, WeatherSnapshot
from .engine.tasks import MergeResult, generate_specs, merge_tasks
from .engine.weather import parse_forecast, record_climate
from .storage import GardenRepository

if TYPE_CHECKING:
    from . import GardenConfigEntry

_LOGGER = logging.getLogger(__name__)

TEMPERATURE_UNITS = {u.value for u in UnitOfTemperature}


class GardenCoordinator(DataUpdateCoordinator[GardenAnalysis]):
    """Combines plan, plant DB, sensors and forecast into a GardenAnalysis."""

    config_entry: GardenConfigEntry

    def __init__(self, hass: HomeAssistant, entry: GardenConfigEntry, repo: GardenRepository) -> None:
        super().__init__(
            hass,
            _LOGGER,
            name=DOMAIN,
            config_entry=entry,
            update_interval=FORECAST_REFRESH,
        )
        self.repo = repo
        self.weather = WeatherSnapshot()
        self.last_merge: MergeResult | None = None
        self._forecast_fetched_at: datetime | None = None
        self._unsub_tracking: CALLBACK_TYPE | None = None
        self._tracked: set[str] = set()
        self._post_compute_hooks: list[Any] = []
        self._recompute_debouncer = Debouncer(
            hass,
            _LOGGER,
            cooldown=SENSOR_DEBOUNCE_SECONDS,
            immediate=False,
            function=self.async_recompute,
        )

    # ------------------------------------------------------------------ #
    # Lifecycle
    # ------------------------------------------------------------------ #
    async def _async_setup(self) -> None:
        self.async_track_entities()
        self.config_entry.async_on_unload(self.repo.async_add_listener(self._on_repo_changed))
        self.config_entry.async_on_unload(self._async_stop_tracking)
        self.config_entry.async_on_unload(self._recompute_debouncer.async_shutdown)

    @callback
    def _async_stop_tracking(self) -> None:
        if self._unsub_tracking:
            self._unsub_tracking()
            self._unsub_tracking = None

    @property
    def lang(self) -> str:
        return normalize_lang(self.repo.data.settings.language or self.hass.config.language)

    def tracked_entities(self) -> set[str]:
        data = self.repo.data
        ids: set[str] = set(data.settings.outdoor_sensors.entity_ids())
        if data.settings.weather_entity:
            ids.add(data.settings.weather_entity)
        for zone in data.zones:
            ids.update(zone.sensors.entity_ids())
        for bed in data.beds:
            ids.update(data.bed_sensors(bed).entity_ids())
        return ids

    @callback
    def async_track_entities(self) -> None:
        """(Re)subscribe to state changes of the mapped entities only."""
        wanted = self.tracked_entities()
        if wanted == self._tracked and self._unsub_tracking:
            return
        self._async_stop_tracking()
        self._tracked = wanted
        if wanted:
            self._unsub_tracking = async_track_state_change_event(self.hass, sorted(wanted), self._on_state_changed)

    @callback
    def _on_state_changed(self, event: Event[EventStateChangedData]) -> None:
        if event.data["entity_id"] == self.repo.data.settings.weather_entity:
            # New observation from the weather integration -> forecast may
            # have changed too.  Rate limited inside _forecast_due().
            self.hass.async_create_task(self.async_request_refresh())
            return
        self.hass.async_create_task(self._recompute_debouncer.async_call())

    @callback
    def _on_repo_changed(self, reason: str) -> None:
        if reason in ("plan", "settings", "import", "plants"):
            self.async_track_entities()
            self.hass.bus.async_fire(EVENT_PLAN_UPDATED, {"reason": reason, "revision": self.repo.data.revision})
        if reason == "settings":
            self._forecast_fetched_at = None  # weather entity may have changed
            self.hass.async_create_task(self.async_request_refresh())
        else:
            # User edits must be reflected immediately (no debounce).
            self.hass.async_create_task(self.async_recompute())

    # ------------------------------------------------------------------ #
    # Updates
    # ------------------------------------------------------------------ #
    async def _async_update_data(self) -> GardenAnalysis:
        if self._forecast_due():
            await self.async_fetch_forecast()
        return self._compute()

    async def async_recompute(self) -> None:
        """Recompute from current states without touching the forecast."""
        self.async_set_updated_data(self._compute())

    async def async_force_refresh(self) -> GardenAnalysis:
        self._forecast_fetched_at = None
        await self.async_refresh()
        return self.data

    def _forecast_due(self) -> bool:
        if self._forecast_fetched_at is None:
            return True
        return dt_util.utcnow() - self._forecast_fetched_at >= FORECAST_MIN_INTERVAL

    async def async_fetch_forecast(self) -> None:
        entity_id = self.repo.data.settings.weather_entity
        self._forecast_fetched_at = dt_util.utcnow()
        if not entity_id:
            self.weather = WeatherSnapshot(available=False, error="not_configured")
            return
        state = self.hass.states.get(entity_id)
        if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
            self.weather = WeatherSnapshot(available=False, error="entity_unavailable")
            return
        features = int(state.attributes.get(ATTR_SUPPORTED_FEATURES, 0))
        attrs = dict(state.attributes)
        hourly: list[dict[str, Any]] = []
        daily: list[dict[str, Any]] = []
        try:
            if features & WeatherEntityFeature.FORECAST_HOURLY:
                hourly = await self._get_forecast(entity_id, "hourly")
            if features & WeatherEntityFeature.FORECAST_DAILY:
                daily = await self._get_forecast(entity_id, "daily")
            elif features & WeatherEntityFeature.FORECAST_TWICE_DAILY:
                daily = await self._get_forecast(entity_id, "twice_daily")
        except (HomeAssistantError, KeyError, TypeError) as err:
            _LOGGER.warning("Could not fetch forecast from %s: %s", entity_id, err)
            self.weather = WeatherSnapshot(available=False, error=str(err))
            return
        temperature = _to_celsius(attrs.get("temperature"), attrs.get("temperature_unit"))
        self.weather = WeatherSnapshot(
            available=bool(hourly or daily),
            fetched_at=dt_util.utcnow(),
            temperature=temperature,
            humidity=_float(attrs.get("humidity")),
            condition=state.state,
            hourly=parse_forecast(_normalize_units(hourly, attrs)),
            daily=parse_forecast(_normalize_units(daily, attrs)),
            error=None if (hourly or daily) else "no_forecast_support",
        )

    async def _get_forecast(self, entity_id: str, kind: str) -> list[dict[str, Any]]:
        response = await self.hass.services.async_call(
            "weather",
            "get_forecasts",
            {"entity_id": entity_id, "type": kind},
            blocking=True,
            return_response=True,
        )
        result = (response or {}).get(entity_id, {})
        return list(result.get("forecast", [])) if isinstance(result, dict) else []

    def read_sensors(self) -> dict[str, SensorReading]:
        """Read mapped entities from the state machine (no I/O)."""
        now = dt_util.utcnow()
        stale_after = timedelta(minutes=self.repo.data.settings.sensor_stale_minutes)
        readings: dict[str, SensorReading] = {}
        for entity_id in self._tracked or self.tracked_entities():
            if entity_id.startswith("weather."):
                continue
            state = self.hass.states.get(entity_id)
            if state is None or state.state in (STATE_UNAVAILABLE, STATE_UNKNOWN):
                readings[entity_id] = SensorReading(entity_id, None, None, stale=False)
                continue
            value = _float(state.state)
            if state.domain == "binary_sensor":  # rain detectors
                value = 1.0 if state.state == "on" else 0.0
            unit = state.attributes.get(ATTR_UNIT_OF_MEASUREMENT)
            if value is not None and unit in TEMPERATURE_UNITS:
                value = _to_celsius(value, unit)
            reported = getattr(state, "last_reported", None) or state.last_updated
            readings[entity_id] = SensorReading(entity_id, value, reported, stale=(now - reported) > stale_after)
        return readings

    def _compute(self) -> GardenAnalysis:
        repo = self.repo
        data = repo.data
        now = dt_util.now()
        readings = self.read_sensors()
        analysis = analyze(
            data,
            repo.db,
            self.weather,
            readings,
            now=now,
            tz=dt_util.get_default_time_zone(),
            latitude=data.settings.region.latitude or self.hass.config.latitude,
            lang=self.lang,
        )
        changed = False
        # Climate log (GDD): outdoor sensor, otherwise current weather temp.
        outdoor = data.settings.outdoor_sensors
        temp = readings.get(outdoor.air_temperature).usable if outdoor.air_temperature in readings else None  # type: ignore[union-attr]
        if temp is None:
            temp = self.weather.temperature
        rain = readings.get(outdoor.rain).usable if outdoor.rain in readings else None  # type: ignore[union-attr]
        if outdoor.rain and rain is not None and not outdoor.rain.startswith("binary_sensor."):
            changed |= record_climate(data.climate_log, analysis.today, temp, rain)
        else:
            changed |= record_climate(data.climate_log, analysis.today, temp)

        merge = merge_tasks(
            data.tasks,
            generate_specs(analysis.task_context(data, repo.db)),
            today=analysis.today,
            now=now,
            lang=self.lang,
        )
        self.last_merge = merge
        if merge.changed:
            data.tasks = merge.tasks
            changed = True
        if changed:
            repo.async_schedule_save()
        for hook in self._post_compute_hooks:
            hook(analysis, merge)
        return analysis

    @callback
    def async_add_post_compute_hook(self, hook: Any) -> CALLBACK_TYPE:
        self._post_compute_hooks.append(hook)

        @callback
        def remove() -> None:
            self._post_compute_hooks.remove(hook)

        return remove


def _float(value: Any) -> float | None:
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _to_celsius(value: Any, unit: str | None) -> float | None:
    number = _float(value)
    if number is None or not unit or unit == UnitOfTemperature.CELSIUS:
        return number
    try:
        return round(TemperatureConverter.convert(number, unit, UnitOfTemperature.CELSIUS), 2)
    except (ValueError, KeyError):
        return number


def _normalize_units(items: list[dict[str, Any]], attrs: dict[str, Any]) -> list[dict[str, Any]]:
    """Forecasts arrive in the entity's display units; the engine wants metric."""
    t_unit = attrs.get("temperature_unit")
    p_unit = attrs.get("precipitation_unit")
    w_unit = attrs.get("wind_speed_unit")
    if (
        t_unit in (None, UnitOfTemperature.CELSIUS)
        and p_unit in (None, UnitOfLength.MILLIMETERS)
        and w_unit
        in (
            None,
            UnitOfSpeed.KILOMETERS_PER_HOUR,
        )
    ):
        return items
    out = []
    for item in items:
        item = dict(item)
        for key in ("temperature", "templow", "dew_point", "apparent_temperature"):
            if key in item:
                item[key] = _to_celsius(item[key], t_unit)
        if p_unit and p_unit != UnitOfLength.MILLIMETERS and _float(item.get("precipitation")) is not None:
            try:
                item["precipitation"] = DistanceConverter.convert(
                    float(item["precipitation"]), p_unit, UnitOfLength.MILLIMETERS
                )
            except (ValueError, KeyError):
                pass
        if w_unit and w_unit != UnitOfSpeed.KILOMETERS_PER_HOUR and _float(item.get("wind_speed")) is not None:
            try:
                item["wind_speed"] = SpeedConverter.convert(
                    float(item["wind_speed"]), w_unit, UnitOfSpeed.KILOMETERS_PER_HOUR
                )
            except (ValueError, KeyError):
                pass
        out.append(item)
    return out
