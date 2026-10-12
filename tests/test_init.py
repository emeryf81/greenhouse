"""End-to-end: setup with sensor + weather fixtures, entities, services, websocket."""

from __future__ import annotations

from typing import Any

from freezegun.api import FrozenDateTimeFactory
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant, ServiceCall, SupportsResponse
from homeassistant.helpers import entity_registry as er
import pytest
from pytest_homeassistant_custom_component.common import MockConfigEntry, async_fire_time_changed

from custom_components.garden_manager.const import DOMAIN

from .conftest import load_fixture

ENTRY_DATA: dict[str, Any] = {
    "region": {"region_mode": "preset", "hemisphere": "north", "preset": "nl_be"},
    "weather_entity": "weather.home",
    "outdoor_temperature": "sensor.outdoor_temp",
    "areas": [
        {
            "name": "Bed 1",
            "type": "outdoor",
            "width_m": 2.0,
            "length_m": 1.0,
            "soil": "loam",
            "shade_pct": 0,
            "wind": "moderate",
            "soil_moisture": "sensor.soil_moisture_bed_1",
            "soil_temperature": "sensor.soil_temp_bed_1",
        },
        {
            "name": "Greenhouse Zone A",
            "type": "greenhouse",
            "width_m": 3.0,
            "length_m": 2.0,
            "soil": "loam",
            "shade_pct": 0,
            "wind": "sheltered",
            "air_temperature": "sensor.greenhouse_temp",
            "air_humidity": "sensor.greenhouse_humidity",
        },
    ],
    "notifications": {
        "persistent_notifications": True,
        "notify_services": ["notify.mobile_app_phone"],
        "digest_time": "07:30:00",
    },
    "import_example_plan": True,
}


@pytest.fixture
async def setup_garden(
    hass: HomeAssistant, freezer: FrozenDateTimeFactory
) -> tuple[MockConfigEntry, list[ServiceCall]]:
    """Frost night across the DST switch, sensors from fixtures."""
    await hass.config.async_set_time_zone("Europe/Amsterdam")
    freezer.move_to("2026-03-28T12:00:00+00:00")
    for entity_id, state in load_fixture("sensors.json").items():
        hass.states.async_set(entity_id, state["state"], state["attributes"])

    hourly = load_fixture("forecast_hourly_dst_frost.json")
    daily = load_fixture("forecast_daily.json")

    async def get_forecasts(call: ServiceCall) -> dict[str, Any]:
        return hourly if call.data["type"] == "hourly" else daily

    hass.services.async_register("weather", "get_forecasts", get_forecasts, supports_response=SupportsResponse.ONLY)
    pushes: list[ServiceCall] = []

    async def mobile(call: ServiceCall) -> None:
        pushes.append(call)

    hass.services.async_register("notify", "mobile_app_phone", mobile)

    entry = MockConfigEntry(domain=DOMAIN, data=ENTRY_DATA, title="Hortulus")
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry, pushes


async def test_setup_creates_entities_and_frost_warning(hass: HomeAssistant, setup_garden) -> None:
    entry, pushes = setup_garden
    assert entry.state is ConfigEntryState.LOADED

    frost = hass.states.get("sensor.hortulus_frost_risk_next_48h")
    assert frost.state == "high"
    assert frost.attributes["min_temperature"] == -2.0
    assert frost.attributes["source"] == "hourly"
    assert hass.states.get("binary_sensor.hortulus_frost_warning").state == "on"

    moisture = hass.states.get("sensor.bed_1_moisture_status")
    assert moisture.state in ("optimal", "slightly_dry", "dry")
    assert moisture.attributes["moisture"] == 22.5
    assert hass.states.get("sensor.bed_1_irrigation_recommendation") is not None
    assert hass.states.get("binary_sensor.bed_1_needs_water") is not None
    assert hass.states.get("sensor.greenhouse_zone_a_greenhouse_advice") is not None
    assert hass.states.get("calendar.hortulus_garden_tasks") is not None
    assert hass.states.get("todo.hortulus_this_week") is not None
    assert int(hass.states.get("sensor.hortulus_tasks_due_today").state) >= 1

    # Fahrenheit outdoor sensor converted to °C for the climate log (GDD).
    repo = entry.runtime_data.repo
    assert repo.data.climate_log[-1].tmax == 12.5
    # Example plan was seeded: tomatoes/basil/marigold under glass, carrots+onions+lettuce outside.
    assert {p.plant_id for p in repo.data.plantings} >= {"tomato", "basil", "marigold", "carrot", "onion", "lettuce"}
    # Persistent notification + push for frost (onions are planted out and frost-hardy,
    # so the alert is the general "high" risk alert).
    assert any(c.data["title"].startswith("Hortulus") for c in pushes)
    registry = er.async_get(hass)
    assert registry.async_get("sensor.bed_1_companion_score").disabled_by is not None


async def test_services(hass: HomeAssistant, setup_garden) -> None:
    entry, _ = setup_garden
    response = await hass.services.async_call(
        DOMAIN,
        "add_task",
        {"title": "Check slug traps", "bed": "bed 1", "priority": "high", "recurrence_days": 3},
        blocking=True,
        return_response=True,
    )
    task_id = response["task_id"]
    task = entry.runtime_data.repo.data.task(task_id)
    assert task.bed_id == entry.runtime_data.repo.data.beds[0].id and task.recurrence.interval_days == 3

    done = await hass.services.async_call(
        DOMAIN, "complete_task", {"task_id": task_id, "note": "12 slugs"}, blocking=True, return_response=True
    )
    assert done["status"] == "done" and done["next_due"] == "2026-03-31"

    postponed = await hass.services.async_call(
        DOMAIN, "postpone_task", {"task_id": done["next_task_id"], "days": 2}, blocking=True, return_response=True
    )
    assert postponed["due"] == "2026-04-02"

    counts = await hass.services.async_call(DOMAIN, "generate_tasks", {}, blocking=True, return_response=True)
    assert counts["open_tasks"] > 5

    plan = await hass.services.async_call(DOMAIN, "export_plan", {}, blocking=True, return_response=True)
    assert plan["format"] == "hortulus-plan" and len(plan["beds"]) == 2

    imported = await hass.services.async_call(
        DOMAIN, "import_plan", {"plan": plan, "mode": "replace"}, blocking=True, return_response=True
    )
    assert imported["beds"] == 2

    events = await hass.services.async_call(
        "calendar",
        "get_events",
        {
            "entity_id": "calendar.hortulus_garden_tasks",
            "start_date_time": "2026-03-01T00:00:00",
            "duration": {"days": 120},
        },
        blocking=True,
        return_response=True,
    )
    summaries = [e["summary"] for e in events["calendar.hortulus_garden_tasks"]["events"]]
    assert any("Tomato" in s or "Tomaat" in s for s in summaries)


async def _result(client) -> dict[str, Any]:
    """Next command result, skipping subscription pushes in between."""
    while True:
        msg = await client.receive_json()
        if msg["type"] == "result":
            return msg


async def test_websocket_api(hass: HomeAssistant, setup_garden, hass_ws_client) -> None:
    entry, _ = setup_garden
    client = await hass_ws_client(hass)

    await client.send_json_auto_id({"type": f"{DOMAIN}/subscribe"})
    assert (await client.receive_json())["success"]
    snapshot = (await client.receive_json())["event"]
    assert snapshot["analysis"]["frost"]["level"] == "high"
    assert len(snapshot["beds"]) == 2 and snapshot["tasks"]
    revision = snapshot["revision"]

    await client.send_json_auto_id({"type": f"{DOMAIN}/plants"})
    plants = (await _result(client))["result"]
    assert len(plants["plants"]) == 20 and "Solanaceae" in plants["families"]

    bed = snapshot["beds"][0]
    draft = [
        {
            "id": "x1",
            "plant_id": "tomato",
            "bed_id": bed["id"],
            "season": 2026,
            "x_cm": 0,
            "y_cm": 0,
            "width_cm": 50,
            "length_cm": 50,
        },
        {
            "id": "x2",
            "plant_id": "kale",
            "bed_id": bed["id"],
            "season": 2026,
            "x_cm": 55,
            "y_cm": 0,
            "width_cm": 45,
            "length_cm": 45,
        },
    ]
    await client.send_json_auto_id({"type": f"{DOMAIN}/plan/check", "bed": bed, "plantings": draft})
    check = (await _result(client))["result"]
    assert check["pairs"][0]["kind"] == "enemy"

    # Save a plan: stale revision is rejected, fresh one accepted.
    plantings = snapshot["plantings"] + [draft[0]]
    msg = {"type": f"{DOMAIN}/plan/save", "zones": snapshot["zones"], "beds": snapshot["beds"], "plantings": plantings}
    await client.send_json_auto_id({**msg, "base_revision": revision - 1})
    assert (await _result(client))["error"]["code"] == "revision_conflict"
    await client.send_json_auto_id({**msg, "base_revision": revision})
    saved = await _result(client)
    assert saved["success"] and saved["result"]["revision"] == revision + 1
    assert entry.runtime_data.repo.data.planting("x1") is not None

    await client.send_json_auto_id({"type": f"{DOMAIN}/plan/export", "format": "yaml"})
    export = (await _result(client))["result"]
    assert export["filename"].endswith(".yaml") and "hortulus-plan" in export["content"]

    task = next(t for t in snapshot["tasks"] if t["status"] == "open")
    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/tasks/action", "task_id": task["id"], "action": "complete", "note": "ok"}
    )
    assert (await _result(client))["success"]


async def test_unload(hass: HomeAssistant, setup_garden) -> None:
    entry, _ = setup_garden
    assert await hass.config_entries.async_unload(entry.entry_id)
    assert entry.state is ConfigEntryState.NOT_LOADED


async def test_options_flow_updates_store(hass: HomeAssistant, setup_garden) -> None:
    entry, _ = setup_garden
    result = await hass.config_entries.options.async_init(entry.entry_id)
    assert result["type"] == "menu"
    result = await hass.config_entries.options.async_configure(result["flow_id"], {"next_step_id": "advanced"})
    assert result["step_id"] == "advanced"
    result = await hass.config_entries.options.async_configure(
        result["flow_id"],
        {
            "language": "nl",
            "companion_radius_cm": 80,
            "sensor_stale_minutes": 120,
            "root_zone_depth_mm": 250,
            "max_irrigation_mm": 15,
        },
    )
    assert result["type"] == "create_entry"
    await hass.async_block_till_done()
    settings = entry.runtime_data.repo.data.settings
    assert settings.language == "nl" and settings.companion_radius_cm == 80 and settings.max_irrigation_mm == 15
    # Generated task titles follow the new language after the reload.
    assert any(
        t.title.startswith("Tomaat") or "zaaien" in t.title for t in entry.runtime_data.repo.data.tasks if t.is_open
    )


async def test_digest_follows_settings_changed_in_panel(
    hass: HomeAssistant, setup_garden, hass_ws_client, freezer: FrozenDateTimeFactory
) -> None:
    _entry, pushes = setup_garden
    client = await hass_ws_client(hass)
    await client.send_json_auto_id(
        {"type": f"{DOMAIN}/settings/save", "settings": {"notifications": {"digest_time": "13:15"}}}
    )
    assert (await _result(client))["success"]
    await hass.async_block_till_done()
    pushes.clear()
    # 28 March 2026 is still winter time in Amsterdam: 13:15 local == 12:15 UTC.
    freezer.move_to("2026-03-28T12:15:00+00:00")
    async_fire_time_changed(hass)
    await hass.async_block_till_done()
    digest = [c for c in pushes if c.data["title"] == "Garden today"]
    assert len(digest) == 1 and "tasks today" in digest[0].data["message"]
