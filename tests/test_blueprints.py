"""The blueprints in blueprints/automation/hortulus are valid Home Assistant blueprints."""

from __future__ import annotations

from pathlib import Path

from homeassistant.components.automation.config import AUTOMATION_BLUEPRINT_SCHEMA
from homeassistant.components.blueprint.models import Blueprint
from homeassistant.util.yaml import load_yaml_dict
import pytest

BLUEPRINTS = sorted((Path(__file__).parent.parent / "blueprints" / "automation" / "hortulus").glob("*.yaml"))


def test_there_are_blueprints():
    assert len(BLUEPRINTS) >= 4


@pytest.mark.parametrize("path", BLUEPRINTS, ids=lambda p: p.stem)
def test_blueprint_is_valid(path: Path):
    blueprint = Blueprint(load_yaml_dict(str(path)), expected_domain="automation", schema=AUTOMATION_BLUEPRINT_SCHEMA)
    assert blueprint.name.startswith("Hortulus")
    assert blueprint.metadata["source_url"].endswith(f"/{path.name}")
    used = path.read_text().count("!input ")
    assert used >= len(blueprint.inputs)  # every input is used somewhere


SAMPLE_INPUTS = {
    "button_log_harvest": [
        {"plant": "tomato", "tag": "kitchen-door"},
        {"plant": "tomato", "button": ["input_button.harvest"]},
    ],
    "frost_flash_light": [{"lamp": ["light.porch", "light.shed"]}],
    "urgent_task_announce": [{"speaker": "media_player.kitchen", "tts": "tts.google_translate_nl_be"}],
    "water_when_dry": [
        {
            "needs_water": "binary_sensor.bed_1_needs_water",
            "bed": "Bed 1",
            "lockout": "binary_sensor.irrigation_lockout",
            "running": "binary_sensor.irrigation_running",
        }
    ],
}


@pytest.mark.parametrize("path", BLUEPRINTS, ids=lambda p: p.stem)
async def test_blueprint_makes_a_valid_automation(hass, path: Path):
    """Filled in, every blueprint gives an automation Home Assistant accepts (triggers, conditions, actions)."""
    from homeassistant.components.automation.config import async_validate_config_item
    from homeassistant.components.blueprint.models import BlueprintInputs

    blueprint = Blueprint(load_yaml_dict(str(path)), expected_domain="automation", schema=AUTOMATION_BLUEPRINT_SCHEMA)
    for inputs in SAMPLE_INPUTS[path.stem]:
        config = BlueprintInputs(blueprint, {"use_blueprint": {"path": path.name, "input": inputs}}).async_substitute()
        validated = await async_validate_config_item(hass, "test", {"id": "t", "alias": "t", **config})
        assert validated is not None and validated.validation_error is None, validated.validation_error


async def test_frost_lamp_returns_to_how_it_was(hass, monkeypatch):
    """Flash on a frost warning, then the scene snapshot puts the lamp back (on, its own brightness)."""
    import asyncio

    from homeassistant.core import ServiceCall
    from homeassistant.helpers import script
    from homeassistant.setup import async_setup_component

    real_sleep = asyncio.sleep
    monkeypatch.setattr(script.asyncio, "sleep", lambda *_a, **_k: real_sleep(0))  # no real 1 s delays
    calls: list[tuple[str, dict]] = []

    async def light_service(call: ServiceCall) -> None:
        calls.append((call.service, dict(call.data)))
        ids = call.data["entity_id"]
        for entity_id in [ids] if isinstance(ids, str) else ids:
            on = call.service == "turn_on"
            attrs = {"brightness": call.data.get("brightness", 255)} if on else {}
            hass.states.async_set(entity_id, "on" if on else "off", attrs)

    hass.services.async_register("light", "turn_on", light_service)
    hass.services.async_register("light", "turn_off", light_service)
    hass.states.async_set("light.porch", "on", {"brightness": 77})
    hass.states.async_set("light.shed", "on", {"brightness": 200})
    path = next(p for p in BLUEPRINTS if p.stem == "frost_flash_light")
    blueprints = hass.config.path("blueprints", "automation", "hortulus")
    await hass.async_add_executor_job(lambda: Path(blueprints).mkdir(parents=True, exist_ok=True))
    await hass.async_add_executor_job(lambda: Path(blueprints, path.name).write_text(path.read_text()))
    assert await async_setup_component(hass, "scene", {})
    assert await async_setup_component(
        hass,
        "automation",
        {
            "automation": [  # two frost lamps fire together: each puts back its own light
                {"use_blueprint": {"path": f"hortulus/{path.name}", "input": {"lamp": ["light.porch"], "flashes": 1}}},
                {"use_blueprint": {"path": f"hortulus/{path.name}", "input": {"lamp": ["light.shed"], "flashes": 1}}},
            ]
        },
    )
    hass.bus.async_fire("garden_manager_frost_warning", {"temp": -1})
    await hass.async_block_till_done()
    flashed_off = {
        e
        for service, data in calls
        if service == "turn_off"
        for e in ([data["entity_id"]] if isinstance(data["entity_id"], str) else data["entity_id"])
    }
    assert flashed_off == {"light.porch", "light.shed"}  # both lamps flashed
    state = hass.states.get("light.porch")
    assert state.state == "on" and state.attributes["brightness"] == 77  # and back as it was
    assert hass.states.get("light.shed").attributes["brightness"] == 200
