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
