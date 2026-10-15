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

from datetime import date, datetime, timedelta
import logging
import math
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

from .api import OpenMeteoError, async_fetch_open_meteo
from .const import (
    DOMAIN,
    EVENT_PLAN_UPDATED,
    FORECAST_MIN_INTERVAL,
    FORECAST_REFRESH,
    SENSOR_DEBOUNCE_SECONDS,
)
from .engine import climate
from .engine.analysis import GardenAnalysis, analyze
from .engine.i18n import normalize_lang
from .engine.models import SensorReading, WeatherSnapshot
from .engine.records import record_water, water_stats
from .engine.region import resolve_profile
from .engine.tasks import MergeResult, auto_assign, generate_specs, merge_tasks
from .engine.waterbalance import advance_water_balance
from .engine.weather import merge_forecasts, parse_forecast
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
        self._archived_for: int | None = None  # season for which old seasons were archived
        self._unsub_tracking: CALLBACK_TYPE | None = None
        self._tracked: set[str] = set()
        self._post_compute_hooks: list[Any] = []
        self._climate = climate.ClimateRecorder()
        self._backfilled_on: date | None = None  # last day the climate history was filled in
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
        ids.update(e for e in (data.settings.water.meter_entity, data.settings.water.butt_level_entity) if e)
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
        await self._async_archive_old_seasons()
        await self._async_backfill_climate()
        return self._compute()

    async def _async_backfill_climate(self) -> None:
        """Once a day (and at start-up): fill the days nobody watched.

        The recorder holds what the garden's own sensors measured while Hortulus was
        not running; Open-Meteo (when switched on) gives the observed weather for days
        without any sensor.  Both only fill gaps - own samples stay.
        """
        today = dt_util.now().date()
        if self._backfilled_on == today:
            return
        self._backfilled_on = today
        data = self.repo.data
        changed = False
        try:
            changed |= await self._async_backfill_recorder(today)
        except Exception:  # history is a bonus: never stop the garden from updating
            _LOGGER.debug("Filling climate history from the recorder failed", exc_info=True)
        if data.settings.open_meteo:
            from .api import async_fetch_open_meteo_history

            try:
                payload = await async_fetch_open_meteo_history(self.hass, *self._location())
            except Exception as err:  # history is a bonus, never a reason to stop
                _LOGGER.debug("Open-Meteo history unavailable: %s", err)
            else:
                changed |= climate.merge_history(data, climate.open_meteo_daily(payload), "model", today)
        if changed:
            self.repo.async_schedule_save()

    async def _async_backfill_recorder(self, today: date) -> bool:
        if "recorder" not in getattr(self.hass.config, "components", set()):
            return False
        try:
            from .climate_history import async_daily_history
        except ImportError:  # not available on this host (the website)
            return False
        data = self.repo.data
        temps, extra = climate.history_entities(data)
        missing = climate.history_days_needed(data, today)
        logged = {(s.entity_id, s.day) for s in data.sensor_log}
        sensor_gaps = any((e, today - timedelta(days=i)) not in logged for e in temps for i in range(1, 31))
        if not (temps or extra) or not (missing or sensor_gaps):
            return False
        start = dt_util.start_of_local_day(today - timedelta(days=30))
        end = dt_util.start_of_local_day(today)
        series = await async_daily_history(self.hass, [*temps, *extra], start, end)
        changed = climate.merge_sensor_history(data, {e: series.get(e, []) for e in temps}, today)
        records = climate.outdoor_records(data, series)
        if records:
            changed |= climate.merge_history(data, records, "history", today)
        return changed

    def merge_climate_history(self, records: Any, source: str) -> bool:
        """Outdoor days from elsewhere (the website: Open-Meteo, a linked Home Assistant)."""
        changed = climate.merge_history(self.repo.data, records, source, dt_util.now().date())
        if changed:
            self.repo.async_schedule_save()
        return changed

    def merge_sensor_history(self, series: Any) -> bool:
        changed = climate.merge_sensor_history(self.repo.data, series, dt_util.now().date())
        if changed:
            self.repo.async_schedule_save()
        return changed

    async def _async_archive_old_seasons(self) -> None:
        """Once per season (and at start-up): move old seasons to the archive document."""
        from .engine.region import season_for_date

        season = season_for_date(self.repo.data.settings.region, dt_util.now().date())
        if season != self._archived_for:
            try:
                await self.repo.async_archive_old(season)
            except Exception:  # housekeeping must never stop the garden from updating
                _LOGGER.exception("Archiving old seasons failed")  # tried again at the next update
            else:
                self._archived_for = season

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
        await self._async_fetch_entity_forecast()
        if self.repo.data.settings.open_meteo:
            await self._async_enrich_open_meteo()

    def _location(self) -> tuple[float, float]:
        """Where to ask Open-Meteo: Home Assistant's home, latitude and longitude together
        (the region's latitude is copied once and may be older than a corrected home)."""
        return self.hass.config.latitude, self.hass.config.longitude

    async def _async_enrich_open_meteo(self) -> None:
        """Opt-in: fill humidity/wind/radiation gaps (or the whole forecast)."""
        lat, lon = self._location()
        try:
            raw = await async_fetch_open_meteo(self.hass, lat, lon)
        except OpenMeteoError as err:
            _LOGGER.warning("Open-Meteo unavailable: %s", err)
            return
        extra = parse_forecast(raw)
        if not extra:
            return
        if self.weather.available:
            self.weather.hourly = merge_forecasts(self.weather.hourly, extra)
        else:
            self.weather = WeatherSnapshot(
                available=True,
                fetched_at=dt_util.utcnow(),
                temperature=extra[0].temperature,
                humidity=extra[0].humidity,
                hourly=extra,
                error=None,
            )

    async def _async_fetch_entity_forecast(self) -> None:
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
            elif value is not None and unit in RAIN_MM and entity_id == self.repo.data.settings.outdoor_sensors.rain:
                # a rain gauge in inches books millimetres (a water butt level in cm stays as it is)
                value = round(value * RAIN_MM[unit], 2)
            reported = getattr(state, "last_reported", None) or state.last_updated
            readings[entity_id] = SensorReading(entity_id, value, reported, stale=(now - reported) > stale_after)
        return readings

    def _state_float(self, entity_id: str | None, *, m3: bool = False) -> float | None:
        """Numeric state; with ``m3`` litres are converted to m³ (meters report either)."""
        if not entity_id or (state := self.hass.states.get(entity_id)) is None:
            return None
        try:
            value = float(state.state)
        except (TypeError, ValueError):
            return None
        if m3:
            liters = volume_liters(value, state.attributes.get("unit_of_measurement"))
            value = liters / 1000 if liters is not None else value
        return value

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
        changed |= self._record_climate(data, readings, analysis, now)
        changed |= advance_water_balance(
            data,
            repo.db,
            analysis.timelines,
            analysis.today,
            latitude=data.settings.region.latitude or self.hass.config.latitude,
            tz=dt_util.get_default_time_zone(),
            moisture={bed_id: b.irrigation.moisture for bed_id, b in analysis.beds.items()},
        )

        # Garden water: one meter / water-butt reading per day.
        water = data.settings.water
        changed |= record_water(
            data,
            analysis.today,
            self._state_float(water.meter_entity, m3=True),
            self._state_float(water.butt_level_entity),
        )
        ctx = analysis.task_context(data, repo.db)
        ctx.rain_water_l = water_stats(data, analysis.today).rain_available_l
        merge = merge_tasks(data.tasks, generate_specs(ctx), today=analysis.today, now=now, lang=self.lang)
        if auto_assign(merge.created, data.settings.assignment):
            changed = True
        self.last_merge = merge
        if merge.changed:
            data.tasks = merge.tasks
            changed = True
        if changed:
            repo.async_schedule_save()
        for hook in self._post_compute_hooks:
            hook(analysis, merge)
        return analysis

    def _record_climate(
        self, data: Any, readings: dict[str, SensorReading], analysis: GardenAnalysis, now: datetime
    ) -> bool:
        """Fold this round of readings into the climate history (outdoor day + every temperature sensor)."""
        outdoor = data.settings.outdoor_sensors

        def usable(entity_id: str | None) -> float | None:
            reading = readings.get(entity_id) if entity_id else None
            return reading.usable if reading else None

        attrs = {}
        if data.settings.weather_entity and (state := self.hass.states.get(data.settings.weather_entity)) is not None:
            attrs = dict(state.attributes)
        temp = usable(outdoor.air_temperature)
        if temp is None:
            temp = self.weather.temperature
        humidity = usable(outdoor.air_humidity)
        if humidity is None:
            humidity = self.weather.humidity
        wind = self._speed(outdoor.wind_speed, usable(outdoor.wind_speed))
        if wind is None:
            wind = _speed_kmh(attrs.get("wind_speed"), attrs.get("wind_speed_unit"))
        gust = self._speed(outdoor.wind_gust, usable(outdoor.wind_gust))
        if gust is None:
            gust = _speed_kmh(attrs.get("wind_gust_speed"), attrs.get("wind_speed_unit"))
        radiation = usable(outdoor.radiation)
        if radiation is None and (lux := usable(outdoor.light)) is not None:
            radiation = lux * climate.LUX_TO_WM2
        rain = usable(outdoor.rain)
        rain_src = "gauge"
        if not (outdoor.rain and rain is not None and not outdoor.rain.startswith("binary_sensor.")):
            # No rain gauge: book the forecast for today (never lowering it as
            # the day passes and fewer hours remain in the forecast).
            logged = next((d.rain_mm for d in data.climate_log if d.day == analysis.today), None)
            forecast = analysis.outlook[0].rain_mm if analysis.outlook else None
            rain = max(v for v in (logged, forecast, 0.0) if v is not None) if forecast is not None else None
            rain_src = "forecast"
        temperatures = {e: usable(e) for e in climate.temperature_sensors(data)}
        return self._climate.sample(
            data,
            now,
            analysis.today,
            climate.ClimateSample(temp=temp, humidity=humidity, wind_kmh=wind, gust_kmh=gust, radiation_wm2=radiation),
            temperatures,
            rain_mm=rain,
            rain_src=rain_src,
            hemisphere=resolve_profile(data.settings.region).hemisphere,
        )

    def _speed(self, entity_id: str | None, value: float | None) -> float | None:
        if entity_id is None or value is None or (state := self.hass.states.get(entity_id)) is None:
            return value
        return _speed_kmh(value, state.attributes.get(ATTR_UNIT_OF_MEASUREMENT))

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


def _speed_kmh(value: Any, unit: str | None) -> float | None:
    number = _float(value)
    if number is None or not unit or unit == UnitOfSpeed.KILOMETERS_PER_HOUR:
        return number
    try:
        return round(SpeedConverter.convert(number, unit, UnitOfSpeed.KILOMETERS_PER_HOUR), 1)
    except (ValueError, KeyError):
        return number


RAIN_MM = {"mm": 1.0, "cm": 10.0, "in": 25.4}
# water meters report in m³ (the default), litres, US gallons or cubic feet
VOLUME_LITERS = {
    "l": 1.0, "liter": 1.0, "litre": 1.0, "liters": 1.0, "litres": 1.0, "m³": 1000.0, "m3": 1000.0,
    "gal": 3.785411784, "ft³": 28.316846592, "ft3": 28.316846592, "ccf": 2831.6846592,
}  # fmt: skip


def volume_liters(value: float, unit: Any) -> float | None:
    """A meter reading in litres (no unit: m³)."""
    if not math.isfinite(value):
        return None
    factor = VOLUME_LITERS.get(str(unit or "m³").strip().lower())
    return value * (factor if factor is not None else 1000.0)


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
