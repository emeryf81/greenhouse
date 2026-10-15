"""Fill the climate history from Home Assistant's recorder (Home Assistant only).

When Hortulus was not running (a restart, an update) the recorder still kept what
the garden's sensors measured.  This turns those states into daily minimum, maximum
and time-weighted mean per entity, in Celsius and km/h, for
:func:`.engine.climate.merge_sensor_history` and :func:`.engine.climate.merge_history`.
"""

from __future__ import annotations

from datetime import datetime
from typing import Any

from homeassistant.const import ATTR_UNIT_OF_MEASUREMENT, UnitOfSpeed, UnitOfTemperature
from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util
from homeassistant.util.unit_conversion import SpeedConverter, TemperatureConverter

from .engine.climate import daily_from_samples

TEMPERATURE_UNITS = {u.value for u in UnitOfTemperature}
SPEED_UNITS = {u.value for u in UnitOfSpeed}


def _converter(unit: str | None) -> Any:
    if unit in TEMPERATURE_UNITS and unit != UnitOfTemperature.CELSIUS:
        return lambda v: TemperatureConverter.convert(v, unit, UnitOfTemperature.CELSIUS)
    if unit in SPEED_UNITS and unit != UnitOfSpeed.KILOMETERS_PER_HOUR:
        return lambda v: SpeedConverter.convert(v, unit, UnitOfSpeed.KILOMETERS_PER_HOUR)
    return lambda v: v


async def async_daily_history(
    hass: HomeAssistant, entity_ids: list[str], start: datetime, end: datetime
) -> dict[str, list[dict[str, Any]]]:
    """``{entity_id: [{day, tmin, tmax, tmean, n}]}`` from the recorder (empty without it)."""
    from homeassistant.components.recorder import get_instance, history

    convert = {
        e: _converter(state.attributes.get(ATTR_UNIT_OF_MEASUREMENT) if (state := hass.states.get(e)) else None)
        for e in entity_ids
    }
    tz = dt_util.get_default_time_zone()

    def fetch() -> dict[str, list[dict[str, Any]]]:
        states = history.get_significant_states(
            hass, start, end, entity_ids, significant_changes_only=False, minimal_response=False, no_attributes=True
        )
        out: dict[str, list[dict[str, Any]]] = {}
        for entity_id, rows in states.items():
            samples = []
            for row in rows:
                try:
                    value = float(row.state)
                except (TypeError, ValueError, AttributeError):
                    continue
                samples.append((row.last_updated, convert.get(entity_id, lambda v: v)(value)))
            out[entity_id] = daily_from_samples(samples, tz)
        return out

    return await get_instance(hass).async_add_executor_job(fetch)
