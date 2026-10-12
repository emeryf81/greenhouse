"""Config flow: region -> weather -> areas + sensors -> notifications -> summary."""

from __future__ import annotations

from unittest.mock import patch

from homeassistant import config_entries
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowResultType

from custom_components.garden_manager.const import DOMAIN


async def test_full_flow_creates_entry(hass: HomeAssistant) -> None:
    hass.states.async_set("weather.home", "sunny", {"supported_features": 3})
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.FORM and result["step_id"] == "user"

    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"region_mode": "custom"})
    assert result["step_id"] == "region"
    # invalid frost date is rejected with a field error
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"hemisphere": "north", "last_frost": "4/20", "first_frost": "10-25"}
    )
    assert result["errors"] == {"last_frost": "invalid_frost_date"}
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"hemisphere": "north", "last_frost": "04-20", "first_frost": "10-25"}
    )
    assert result["step_id"] == "weather"
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"weather_entity": "weather.home"})
    assert result["step_id"] == "area"

    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            "name": "Bed 1",
            "type": "outdoor",
            "width_m": 2.0,
            "length_m": 1.0,
            "soil": "loam",
            "shade_pct": 0,
            "wind": "moderate",
        },
    )
    assert result["step_id"] == "area_sensors"
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"soil_moisture": "sensor.soil_moisture_bed_1", "soil_temperature": "sensor.soil_temp_bed_1"}
    )
    assert result["type"] is FlowResultType.MENU
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "area"})
    # duplicate names are refused
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            "name": "bed 1",
            "type": "greenhouse",
            "width_m": 3.0,
            "length_m": 2.0,
            "soil": "loam",
            "shade_pct": 0,
            "wind": "moderate",
        },
    )
    assert result["errors"] == {"name": "duplicate_name"}
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {
            "name": "Greenhouse Zone A",
            "type": "greenhouse",
            "width_m": 3.0,
            "length_m": 2.0,
            "soil": "loam",
            "shade_pct": 20,
            "wind": "sheltered",
        },
    )
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"], {"air_temperature": "sensor.greenhouse_temp"}
    )
    result = await hass.config_entries.flow.async_configure(result["flow_id"], {"next_step_id": "notifications"})
    assert result["step_id"] == "notifications"
    result = await hass.config_entries.flow.async_configure(
        result["flow_id"],
        {"persistent_notifications": True, "notify_services": [], "tts_media_players": [], "digest_time": "07:30:00"},
    )
    assert result["step_id"] == "summary"
    assert "Bed 1" in result["description_placeholders"]["areas"]
    assert result["description_placeholders"]["last_frost"] == "04-20"

    with patch("custom_components.garden_manager.async_setup_entry", return_value=True):
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {"import_example_plan": True})
    assert result["type"] is FlowResultType.CREATE_ENTRY
    data = result["data"]
    assert data["region"] == {
        "region_mode": "custom",
        "hemisphere": "north",
        "last_frost": "04-20",
        "first_frost": "10-25",
    }
    assert [a["name"] for a in data["areas"]] == ["Bed 1", "Greenhouse Zone A"]
    assert data["areas"][0]["soil_moisture"] == "sensor.soil_moisture_bed_1"
    assert data["areas"][1]["air_temperature"] == "sensor.greenhouse_temp"
    assert data["import_example_plan"] is True


async def test_single_instance(hass: HomeAssistant) -> None:
    from pytest_homeassistant_custom_component.common import MockConfigEntry

    MockConfigEntry(domain=DOMAIN, data={}).add_to_hass(hass)
    result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": config_entries.SOURCE_USER})
    assert result["type"] is FlowResultType.ABORT and result["reason"] == "single_instance_allowed"
