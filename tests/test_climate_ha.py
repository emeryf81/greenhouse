# ruff: noqa: F811  (the setup_garden fixture is imported from test_init)
"""Climate history in Home Assistant: recording, recorder backfill, statistics over websocket, sensors."""

from __future__ import annotations

from datetime import timedelta
from typing import Any

from homeassistant.core import HomeAssistant
from homeassistant.util import dt as dt_util

from custom_components.garden_manager import climate_history
from custom_components.garden_manager.engine.models import ClimateDay

from .test_init import _result, setup_garden  # noqa: F401


async def test_every_temperature_sensor_and_the_weather_are_recorded(hass: HomeAssistant, setup_garden) -> None:
    entry, _ = setup_garden
    data = entry.runtime_data.repo.data
    day = data.climate_log[-1]
    assert day.tmax == 12.5  # the Fahrenheit outdoor sensor, in °C
    assert day.rh_max == 60  # humidity from the weather entity (no outdoor humidity sensor)
    assert day.source == "sensor"
    logged = {s.entity_id: s for s in data.sensor_log}
    assert logged["sensor.greenhouse_temp"].tmax == 31.2
    assert logged["sensor.soil_temp_bed_1"].tmin == 9.5
    assert logged["sensor.outdoor_temp"].tmax == 12.5


async def test_wind_from_the_weather_entity_in_kmh(hass: HomeAssistant, setup_garden) -> None:
    entry, _ = setup_garden
    coordinator = entry.runtime_data.coordinator
    hass.states.async_set(
        "weather.home", "windy", {"temperature": 11.0, "temperature_unit": "°C", "humidity": 70, "wind_speed": 10.0,
                                  "wind_gust_speed": 20.0, "wind_speed_unit": "m/s", "supported_features": 3},
    )  # fmt: skip
    await coordinator.async_recompute()
    day = entry.runtime_data.repo.data.climate_log[-1]
    assert day.wind_max == 36.0 and day.gust_max == 72.0


async def test_recorder_backfill_fills_the_days_home_assistant_missed(
    hass: HomeAssistant, setup_garden, monkeypatch
) -> None:
    entry, _ = setup_garden
    coordinator = entry.runtime_data.coordinator
    data = entry.runtime_data.repo.data
    today = data.climate_log[-1].day
    missed = (today - timedelta(days=3)).isoformat()
    asked: list[list[str]] = []

    async def fake(hass_: Any, entity_ids: list[str], start: Any, end: Any) -> dict[str, list[dict[str, Any]]]:
        asked.append(entity_ids)
        return {
            "sensor.outdoor_temp": [{"day": missed, "tmin": -1.5, "tmax": 9.0, "tmean": 3.1, "n": 140}],
            "sensor.greenhouse_temp": [{"day": missed, "tmin": 4.0, "tmax": 24.0, "tmean": 12.0, "n": 140}],
        }

    monkeypatch.setattr(climate_history, "async_daily_history", fake)
    hass.config.components.add("recorder")
    coordinator._backfilled_on = None
    await coordinator.async_refresh()
    assert asked and "sensor.greenhouse_temp" in asked[0] and "sensor.outdoor_temp" in asked[0]
    by_day = {d.day.isoformat(): d for d in data.climate_log}
    assert by_day[missed].tmin == -1.5 and by_day[missed].source == "history"
    assert any(
        s.entity_id == "sensor.greenhouse_temp" and s.day.isoformat() == missed and s.tmax == 24.0
        for s in data.sensor_log
    )
    # once a day only
    await coordinator.async_refresh()
    assert len(asked) == 1


async def test_climate_statistics_over_websocket_and_as_sensors(
    hass: HomeAssistant, setup_garden, hass_ws_client
) -> None:
    entry, _ = setup_garden
    data = entry.runtime_data.repo.data
    today = data.climate_log[-1].day
    data.climate_log[:0] = [
        ClimateDay(today - timedelta(days=i), 2.0 - i % 3, 12.0, rain_mm=3.0, sun_h=4.0, rain_src="model")
        for i in range(6, 0, -1)
    ]
    await entry.runtime_data.coordinator.async_recompute()
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "garden_manager/climate/stats", "days": 30})
    msg = await _result(client)
    assert msg["success"], msg
    stats = msg["result"]
    assert stats["periods"]["d7"]["days"] == 7 and stats["periods"]["d7"]["rain_mm"] >= 18.0
    kinds = {s["entity_id"]: s["kind"] for s in stats["sensors"]}
    assert kinds == {
        "sensor.outdoor_temp": "outdoor",
        "sensor.greenhouse_temp": "zone_air",
        "sensor.soil_temp_bed_1": "soil",
    }
    assert next(s for s in stats["sensors"] if s["entity_id"] == "sensor.greenhouse_temp")["now"] == 31.2

    rain = hass.states.get("sensor.hortulus_rain_7_days")
    assert rain is not None and float(rain.state) >= 18.0
    assert rain.attributes["days_logged"] == 7
    assert hass.states.get("sensor.hortulus_frost_nights_this_season") is not None
    assert hass.states.get("sensor.hortulus_sunshine_7_days").state == "24.0"
    assert hass.states.get("sensor.hortulus_mean_temperature_7_days") is not None


async def test_daily_history_converts_recorded_states(hass: HomeAssistant, monkeypatch) -> None:
    """The recorder query and unit conversion (the recorder itself is faked: it needs its own database)."""
    from datetime import datetime
    from types import SimpleNamespace

    from homeassistant.components.recorder import history

    hass.states.async_set("sensor.t", "68.0", {"unit_of_measurement": "°F"})
    hass.states.async_set("sensor.wind", "5", {"unit_of_measurement": "m/s"})
    start = datetime(2026, 6, 1, 0, 0, tzinfo=dt_util.UTC)
    rows = {
        "sensor.t": [SimpleNamespace(state="50.0", last_updated=start + timedelta(hours=3)),
                     SimpleNamespace(state="68.0", last_updated=start + timedelta(hours=15)),
                     SimpleNamespace(state="unavailable", last_updated=start + timedelta(hours=16))],
        "sensor.wind": [SimpleNamespace(state="10", last_updated=start + timedelta(hours=12))],
    }  # fmt: skip
    seen: dict[str, Any] = {}

    def fake_states(hass_: Any, start_: Any, end_: Any, entity_ids: list[str], **kwargs: Any) -> Any:
        seen.update(entity_ids=entity_ids, **kwargs)
        return rows

    class Instance:
        async def async_add_executor_job(self, func: Any) -> Any:
            return func()

    monkeypatch.setattr(history, "get_significant_states", fake_states)
    monkeypatch.setattr("homeassistant.components.recorder.get_instance", lambda hass_: Instance())
    await hass.config.async_set_time_zone("UTC")
    series = await climate_history.async_daily_history(
        hass, ["sensor.t", "sensor.wind"], start, start + timedelta(days=1)
    )
    assert seen["significant_changes_only"] is False and seen["no_attributes"] is True
    t = series["sensor.t"][0]
    assert (t["day"], t["tmin"], t["tmax"], t["n"]) == ("2026-06-01", 10.0, 20.0, 2)  # °F -> °C, "unavailable" skipped
    assert series["sensor.wind"][0]["tmax"] == 36.0  # m/s -> km/h


async def test_open_meteo_history_fills_unmeasured_days(hass: HomeAssistant, setup_garden, monkeypatch) -> None:
    from custom_components.garden_manager import api

    entry, _ = setup_garden
    coordinator = entry.runtime_data.coordinator
    data = entry.runtime_data.repo.data
    today = data.climate_log[-1].day
    day = (today - timedelta(days=5)).isoformat()

    async def fake(hass_: Any, lat: float, lon: float, *, days: int = 31) -> dict[str, Any]:
        return {"daily": {"time": [day], "temperature_2m_min": [3.0], "temperature_2m_max": [14.0], "precipitation_sum": [7.5],
                          "sunshine_duration": [18000], "wind_gusts_10m_max": [61.0]}}  # fmt: skip

    async def no_forecast(*args: Any, **kwargs: Any) -> list[dict[str, Any]]:
        return []

    monkeypatch.setattr(api, "async_fetch_open_meteo_history", fake)
    monkeypatch.setattr("custom_components.garden_manager.coordinator.async_fetch_open_meteo", no_forecast)
    data.settings.open_meteo = True
    coordinator._backfilled_on = None
    await coordinator.async_refresh()
    filled = next(d for d in data.climate_log if d.day.isoformat() == day)
    assert (filled.tmin, filled.tmax, filled.rain_mm, filled.sun_h, filled.gust_max) == (3.0, 14.0, 7.5, 5.0, 61.0)
    assert filled.source == "model" and filled.rain_src == "model"


ECOWITT = """Time,Outdoor Temperature(℉),Outdoor Humidity(%),Daily Rain(in)
2025-06-01 00:00,50.0,90,0.00
2025-06-01 12:00,77.0,50,0.10
2025-06-01 23:55,59.0,80,0.20
"""


async def test_station_csv_import_over_websocket(hass: HomeAssistant, setup_garden, hass_ws_client) -> None:
    entry, _ = setup_garden
    data = entry.runtime_data.repo.data
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "garden_manager/climate/import_csv", "text": ECOWITT})
    msg = await _result(client)
    assert msg["success"], msg
    assert msg["result"]["days"] == 1 and msg["result"]["changed"]
    day = next(d for d in data.climate_log if d.day.isoformat() == "2025-06-01")
    assert day.tmax == 25.0 and day.source == "history"

    await client.send_json({"id": 2, "type": "garden_manager/climate/import_csv", "text": "nothing,here\n1,2\n"})
    msg = await _result(client)
    assert not msg["success"] and msg["error"]["code"] == "invalid_csv"

    data.settings.station_import = False
    await client.send_json({"id": 3, "type": "garden_manager/climate/import_csv", "text": ECOWITT})
    msg = await _result(client)
    assert not msg["success"] and msg["error"]["code"] == "disabled"


async def test_measured_frost_dates_are_applied_only_on_request(
    hass: HomeAssistant, setup_garden, hass_ws_client
) -> None:
    from datetime import date

    from custom_components.garden_manager.engine.models import FrostYear

    entry, _ = setup_garden
    data = entry.runtime_data.repo.data
    client = await hass_ws_client(hass)
    await client.send_json({"id": 1, "type": "garden_manager/climate/apply_local_frost"})
    msg = await _result(client)
    assert not msg["success"] and msg["error"]["code"] == "no_suggestion"

    for year in (2024, 2025):
        data.frost_years[str(year)] = FrostYear(
            last_spring=date(year, 5, 8), first_autumn=date(year, 10, 1), spring_complete=True, autumn_complete=True
        )
    await client.send_json({"id": 2, "type": "garden_manager/climate/stats", "days": 30})
    msg = await _result(client)
    suggestion = msg["result"]["local_frost_suggestion"]
    assert suggestion and suggestion["last_frost"] in {
        "05-08",
        "05-09",
    }  # the mean day of the year (2024 is a leap year)
    assert data.settings.region.mode != "custom"  # nothing changes by itself
    await client.send_json({"id": 3, "type": "garden_manager/climate/apply_local_frost"})
    msg = await _result(client)
    assert msg["success"], msg
    assert data.settings.region.mode == "custom" and data.settings.region.last_frost == suggestion["last_frost"]


async def test_scheduled_watering_waits_for_solar_surplus(hass: HomeAssistant, setup_garden) -> None:
    entry, _ = setup_garden
    irrigation = entry.runtime_data.irrigation
    settings = entry.runtime_data.repo.data.settings
    settings.irrigation.mode = "auto"
    settings.irrigation.surplus_entity = "sensor.solar_surplus"
    settings.irrigation.surplus_min_w = 800
    settings.irrigation.surplus_latest = "11:00"
    morning = dt_util.now().replace(hour=6, minute=0, second=0, microsecond=0)

    hass.states.async_set("sensor.solar_surplus", "0.3", {"unit_of_measurement": "kW"})
    assert irrigation.solar_ready(morning) == (False, 300)
    await irrigation.async_start_scheduled(morning)
    assert irrigation.waiting_for_sun and irrigation.waiting_for_sun["needed"] == 800

    hass.states.async_set("sensor.solar_surplus", "1.2", {"unit_of_measurement": "kW"})
    assert irrigation.solar_ready(morning) == (True, 1200)
    hass.states.async_set("sensor.solar_surplus", "100", {"unit_of_measurement": "W"})
    assert irrigation.solar_ready(morning.replace(hour=11))[0]  # never past the latest time
    hass.states.async_set("sensor.solar_surplus", "unavailable", {})
    assert irrigation.solar_ready(morning)[0]  # no reading: never waits
    settings.solar_irrigation = False
    hass.states.async_set("sensor.solar_surplus", "0", {"unit_of_measurement": "W"})
    assert irrigation.solar_ready(morning) == (True, None)


async def test_stop_ends_the_solar_wait_and_a_restart_picks_it_up(hass: HomeAssistant, setup_garden) -> None:
    from custom_components.garden_manager.engine.models import IrrigationEvent

    entry, _ = setup_garden
    irrigation = entry.runtime_data.irrigation
    data = entry.runtime_data.repo.data
    settings = data.settings
    settings.irrigation.mode = "auto"
    settings.irrigation.start_time = "06:00"
    settings.irrigation.surplus_entity = "sensor.solar_surplus"
    settings.irrigation.surplus_min_w = 800
    settings.irrigation.surplus_latest = "11:00"
    hass.states.async_set("sensor.solar_surplus", "100", {"unit_of_measurement": "W"})
    morning = dt_util.now().replace(hour=7, minute=0, second=0, microsecond=0)

    await irrigation.async_start_scheduled(morning)
    assert irrigation.waiting_for_sun
    await irrigation.async_stop()
    assert irrigation.waiting_for_sun is None  # Stop also ends the wait
    irrigation.async_watch(morning.replace(minute=1))
    assert irrigation.waiting_for_sun is None  # and the watcher does not start it again today

    # a fresh controller (a restart) inside the window picks today's wait up again ...
    irrigation._scheduled_on = None
    irrigation.async_watch(morning.replace(hour=8))
    await hass.async_block_till_done()
    assert irrigation.waiting_for_sun and irrigation.waiting_for_sun["needed"] == 800
    # ... but not when an automatic run already went today, nor outside the window
    irrigation._set_waiting(None)
    irrigation._scheduled_on = None
    data.irrigation_log.append(IrrigationEvent("bed_1", morning, 3.0, 6.0, 4.0, "auto"))
    irrigation.async_watch(morning.replace(hour=8, minute=5))
    await hass.async_block_till_done()
    assert irrigation.waiting_for_sun is None
    data.irrigation_log.pop()
    irrigation.async_watch(morning.replace(hour=12))
    await hass.async_block_till_done()
    assert irrigation.waiting_for_sun is None
