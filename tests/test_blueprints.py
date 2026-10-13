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
    "frost_flash_light": [{"lamp": {"entity_id": "light.porch"}}],
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
