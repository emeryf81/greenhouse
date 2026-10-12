"""Optional Open-Meteo client (opt-in, no API key).

Only used when *Use Open-Meteo* is switched on in the settings: it fills in
humidity, wind, cloud cover, dew point and solar radiation the configured
weather entity lacks (Penman-Monteith needs them), or replaces the forecast
when no weather entity is configured.  The request carries the garden's
coordinates rounded to two decimals (about 1 km).
"""

from __future__ import annotations

from datetime import datetime
import logging
from typing import Any
from zoneinfo import ZoneInfo

import aiohttp
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession

_LOGGER = logging.getLogger(__name__)

URL = "https://api.open-meteo.com/v1/forecast"
HOURLY = (
    "temperature_2m,relative_humidity_2m,dew_point_2m,precipitation,precipitation_probability,"
    "cloud_cover,wind_speed_10m,shortwave_radiation"
)
TIMEOUT = aiohttp.ClientTimeout(total=20)


class OpenMeteoError(Exception):
    """Open-Meteo could not be reached or returned garbage."""


async def async_fetch_open_meteo(
    hass: HomeAssistant, latitude: float, longitude: float, *, days: int = 3
) -> list[dict[str, Any]]:
    """Hourly forecast in the shape of ``weather.get_forecasts`` items."""
    params = {
        "latitude": round(latitude, 2),
        "longitude": round(longitude, 2),
        "hourly": HOURLY,
        "daily": "shortwave_radiation_sum",
        "forecast_days": days,
        "wind_speed_unit": "kmh",
        "timezone": hass.config.time_zone or "UTC",
    }
    session = async_get_clientsession(hass)
    try:
        async with session.get(URL, params=params, timeout=TIMEOUT) as resp:
            resp.raise_for_status()
            payload = await resp.json()
    except (aiohttp.ClientError, TimeoutError, ValueError) as err:
        raise OpenMeteoError(str(err)) from err
    return parse_open_meteo(payload, hass.config.time_zone or "UTC")


def parse_open_meteo(payload: dict[str, Any], time_zone: str) -> list[dict[str, Any]]:
    try:
        tz = ZoneInfo(payload.get("timezone") or time_zone)
        hourly = payload["hourly"]
        times = hourly["time"]
    except (KeyError, TypeError) as err:
        raise OpenMeteoError(f"unexpected response: {err}") from err
    daily = payload.get("daily") or {}
    radiation = dict(zip(daily.get("time", []), daily.get("shortwave_radiation_sum", []), strict=False))

    def col(name: str, idx: int) -> Any:
        values = hourly.get(name) or []
        return values[idx] if idx < len(values) else None

    out = []
    for idx, stamp in enumerate(times):
        at = datetime.fromisoformat(stamp).replace(tzinfo=tz)
        out.append(
            {
                "datetime": at.isoformat(),
                "temperature": col("temperature_2m", idx),
                "humidity": col("relative_humidity_2m", idx),
                "dew_point": col("dew_point_2m", idx),
                "precipitation": col("precipitation", idx),
                "precipitation_probability": col("precipitation_probability", idx),
                "cloud_coverage": col("cloud_cover", idx),
                "wind_speed": col("wind_speed_10m", idx),
                # Daily sum (MJ/m²) repeated on every hour of that day.
                "shortwave_radiation": radiation.get(stamp[:10]),
            }
        )
    return out
