"""Buttons: regenerate tasks, refresh forecast."""

from __future__ import annotations

from homeassistant.components.button import ButtonEntity
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import GardenConfigEntry
from .coordinator import GardenCoordinator
from .entity import GardenEntity

PARALLEL_UPDATES = 1


async def async_setup_entry(
    hass: HomeAssistant, entry: GardenConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    coordinator = entry.runtime_data.coordinator
    async_add_entities([GenerateTasksButton(coordinator), RefreshForecastButton(coordinator)])


class GenerateTasksButton(GardenEntity, ButtonEntity):
    _attr_icon = "mdi:auto-fix"
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "generate_tasks")

    async def async_press(self) -> None:
        self.coordinator.repo.invalidate_db()
        await self.coordinator.async_recompute()


class RefreshForecastButton(GardenEntity, ButtonEntity):
    _attr_icon = "mdi:weather-cloudy-clock"
    _attr_entity_category = EntityCategory.DIAGNOSTIC

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "refresh_forecast")

    async def async_press(self) -> None:
        await self.coordinator.async_force_refresh()
