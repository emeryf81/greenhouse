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
    async_add_entities(
        [
            GenerateTasksButton(coordinator),
            RefreshForecastButton(coordinator),
            RunIrrigationButton(coordinator),
            StopIrrigationButton(coordinator),
        ]
    )


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


class RunIrrigationButton(GardenEntity, ButtonEntity):
    """Water every bed that needs it now (all safety rules apply)."""

    _attr_icon = "mdi:sprinkler"

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "run_irrigation")

    async def async_press(self) -> None:
        runtime = self.coordinator.config_entry.runtime_data
        await self.coordinator.async_recompute()
        runtime.irrigation.async_start(runtime.irrigation.build_plan(force=True), source="manual")


class StopIrrigationButton(GardenEntity, ButtonEntity):
    _attr_icon = "mdi:stop-circle-outline"

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "stop_irrigation")

    async def async_press(self) -> None:
        await self.coordinator.config_entry.runtime_data.irrigation.async_stop()
