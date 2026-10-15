# ruff: noqa: F811  (the setup_garden fixture is imported from test_init)
"""Last review round: units of rain gauges and water meters, reloads, options, greenhouse zones."""

from __future__ import annotations

from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er

from custom_components.garden_manager.const import DOMAIN
from custom_components.garden_manager.engine.serde import to_dict

from .test_init import _result, setup_garden  # noqa: F401


async def test_rain_gauge_in_inches_books_millimetres(hass: HomeAssistant, setup_garden) -> None:
    entry, _ = setup_garden
    rt = entry.runtime_data
    rt.repo.data.settings.outdoor_sensors.rain = "sensor.rain_today"
    hass.states.async_set("sensor.rain_today", "1.0", {"unit_of_measurement": "in", "device_class": "precipitation"})
    rt.coordinator.async_track_entities()
    await rt.coordinator.async_recompute()
    day = rt.repo.data.climate_log[-1]
    assert (day.rain_mm, day.rain_src) == (25.4, "gauge")


async def test_water_meter_in_gallons(hass: HomeAssistant, setup_garden) -> None:
    entry, _ = setup_garden
    rt = entry.runtime_data
    rt.repo.data.settings.water.meter_entity = "sensor.garden_water"
    hass.states.async_set("sensor.garden_water", "1000", {"unit_of_measurement": "gal", "device_class": "water"})
    await rt.coordinator.async_recompute()
    assert round(rt.repo.data.water_log[-1].meter_m3, 3) == 3.785
    assert round(rt.irrigation.meter_liters()) == 3785


async def test_panel_subscription_follows_a_reload(hass: HomeAssistant, setup_garden, hass_ws_client) -> None:
    entry, _ = setup_garden
    client = await hass_ws_client(hass)
    await client.send_json_auto_id({"type": f"{DOMAIN}/subscribe"})
    assert (await client.receive_json())["success"]
    await client.receive_json()  # first snapshot
    assert await hass.config_entries.async_reload(entry.entry_id)
    await hass.async_block_till_done()
    assert (await client.receive_json())["type"] == "event"  # the new runtime's snapshot
    await entry.runtime_data.coordinator.async_recompute()
    await hass.async_block_till_done()
    assert (await client.receive_json())["type"] == "event"  # and its updates


async def test_saving_the_same_options_again_still_applies(hass: HomeAssistant, setup_garden, hass_ws_client) -> None:
    entry, _ = setup_garden

    def digest() -> str:
        return entry.runtime_data.repo.data.settings.notifications.digest_time

    async def options_set(time: str) -> None:
        r = await hass.config_entries.options.async_init(entry.entry_id)
        r = await hass.config_entries.options.async_configure(r["flow_id"], {"next_step_id": "notifications"})
        await hass.config_entries.options.async_configure(r["flow_id"], {"digest_time": time})
        await hass.async_block_till_done()

    await options_set("07:00:00")
    assert digest() == "07:00"
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/settings/save", "settings": {"notifications": {"digest_time": "08:00"}}}
    )
    assert (await _result(client))["success"]
    assert digest() == "08:00"
    await options_set("07:00:00")
    assert digest() == "07:00"


async def test_a_zone_that_becomes_a_greenhouse_gets_its_entities(
    hass: HomeAssistant, setup_garden, hass_ws_client
) -> None:
    entry, _ = setup_garden
    repo = entry.runtime_data.repo
    client = await hass_ws_client(hass)

    async def save_zone_type(zone_id: str, kind: str) -> None:
        zones = [to_dict(z) for z in repo.data.zones]
        next(z for z in zones if z["id"] == zone_id)["type"] = kind
        await client.send_json_auto_id(
            {"type": f"{DOMAIN}/plan/save", "base_revision": repo.data.revision, "zones": zones,
             "beds": [to_dict(b) for b in repo.data.beds], "plantings": [to_dict(p) for p in repo.data.plantings]}
        )  # fmt: skip
        assert (await _result(client))["success"]
        await hass.async_block_till_done()

    def zone_entities(zone_id: str) -> list[str]:
        prefix = f"{entry.entry_id}_{zone_id}_"
        return [e.unique_id for e in er.async_get(hass).entities.values() if e.unique_id.startswith(prefix)]

    outdoor = next(z for z in repo.data.zones if not z.is_enclosed)
    kind = outdoor.type.value if hasattr(outdoor.type, "value") else outdoor.type
    await save_zone_type(outdoor.id, "greenhouse")
    assert any(i.endswith("greenhouse_advice") for i in zone_entities(outdoor.id))
    await save_zone_type(outdoor.id, kind)
    assert not any(i.endswith("greenhouse_advice") for i in zone_entities(outdoor.id))
