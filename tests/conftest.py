"""Shared fixtures for Hortulus tests."""

from __future__ import annotations

from collections.abc import Callable
from datetime import date
import json
from pathlib import Path
from typing import Any

import pytest

from custom_components.garden_manager.engine.models import (
    ForecastPoint,
    GardenBed,
    GardenData,
    Planting,
    RegionProfile,
    SensorMapping,
    WeatherSnapshot,
    Zone,
    ZoneType,
)
from custom_components.garden_manager.engine.plantdb import PlantDatabase, load_builtin_json
from custom_components.garden_manager.engine.weather import parse_forecast

pytest_plugins = "pytest_homeassistant_custom_component"

FIXTURES = Path(__file__).parent / "fixtures"


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations: Any) -> None:
    """Allow loading custom_components in every HA test."""
    return


def load_fixture(name: str) -> Any:
    return json.loads((FIXTURES / name).read_text(encoding="utf-8"))


def forecast_points(name: str) -> list[ForecastPoint]:
    return parse_forecast(load_fixture(name)["weather.home"]["forecast"])


@pytest.fixture(scope="session")
def db() -> PlantDatabase:
    return PlantDatabase(load_builtin_json())


@pytest.fixture
def garden() -> GardenData:
    """The example garden from the brief: Bed 1 (2x1 m) + Greenhouse Zone A (3x2 m)."""
    data = GardenData()
    data.settings.region = RegionProfile(mode="preset", preset="nl_be", latitude=52.1)
    data.settings.weather_entity = "weather.home"
    data.zones = [
        Zone(id="outdoor", name="Garden", width_cm=400, length_cm=300),
        Zone(
            id="gh_a",
            name="Greenhouse Zone A",
            type=ZoneType.GREENHOUSE,
            x_cm=500,
            width_cm=300,
            length_cm=200,
            sensors=SensorMapping(air_temperature="sensor.greenhouse_temp"),
        ),
    ]
    data.beds = [
        GardenBed(
            id="bed_1",
            name="Bed 1",
            zone_id="outdoor",
            x_cm=50,
            y_cm=50,
            width_cm=200,
            length_cm=100,
            sensors=SensorMapping(
                soil_moisture="sensor.soil_moisture_bed_1",
                soil_temperature="sensor.soil_temp_bed_1",
            ),
        ),
        GardenBed(
            id="gh_bed", name="Greenhouse Zone A", zone_id="gh_a", x_cm=520, y_cm=20, width_cm=260, length_cm=100
        ),
    ]
    return data


@pytest.fixture
def make_planting() -> Callable[..., Planting]:
    counter = iter(range(1, 10_000))

    def factory(plant_id: str, bed_id: str = "bed_1", season: int = 2026, **kw: Any) -> Planting:
        return Planting(id=kw.pop("id", f"p{next(counter)}"), plant_id=plant_id, bed_id=bed_id, season=season, **kw)

    return factory


@pytest.fixture
def ids() -> Callable[[], str]:
    counter = iter(range(1, 10_000))
    return lambda: f"t{next(counter)}"


def weather(hourly: str | None = None, daily: str | None = None, temperature: float | None = 10.0) -> WeatherSnapshot:
    return WeatherSnapshot(
        available=bool(hourly or daily),
        temperature=temperature,
        hourly=forecast_points(hourly) if hourly else [],
        daily=forecast_points(daily) if daily else [],
    )


SEASON_2026 = 2026
NL_LAST_FROST_2026 = date(2026, 4, 20)
