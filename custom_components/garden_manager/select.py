"""Selects: irrigation mode (garden) and shading mode (per greenhouse)."""

from __future__ import annotations

from homeassistant.components.select import SelectEntity
from homeassistant.const import EntityCategory
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import GardenConfigEntry
from .coordinator import GardenCoordinator
from .engine.models import Zone
from .entity import GardenEntity, ZoneEntity, async_setup_dynamic
from .operations import op_save_settings, op_set_shading_mode

PARALLEL_UPDATES = 1


async def async_setup_entry(
    hass: HomeAssistant, entry: GardenConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    coordinator = entry.runtime_data.coordinator
    async_add_entities([IrrigationModeSelect(coordinator)])
    async_setup_dynamic(
        entry,
        async_add_entities,
        zone_factory=lambda c, zone: [ShadingModeSelect(c, zone)] if zone.is_enclosed else [],
    )


class IrrigationModeSelect(GardenEntity, SelectEntity):
    """off = ignore valves, advise = tasks only, auto = open valves at the start time."""

    _attr_options = ["off", "advise", "auto"]
    _attr_icon = "mdi:sprinkler-variant"
    _attr_entity_category = EntityCategory.CONFIG

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "irrigation_mode")

    @property
    def current_option(self) -> str:
        return self.coordinator.repo.data.settings.irrigation.mode

    async def async_select_option(self, option: str) -> None:
        op_save_settings(self.coordinator.config_entry.runtime_data, {"irrigation": {"mode": option}})
        self.coordinator.async_update_listeners()


class ShadingModeSelect(ZoneEntity, SelectEntity):
    """auto = follow the greenhouse advice, on/off = manual override."""

    _attr_options = ["auto", "on", "off"]
    _attr_icon = "mdi:blinds-horizontal"

    def __init__(self, coordinator: GardenCoordinator, zone: Zone) -> None:
        super().__init__(coordinator, zone, "shading_mode")

    @property
    def current_option(self) -> str | None:
        zone = self.zone
        return zone.shading_mode if zone else None

    async def async_select_option(self, option: str) -> None:
        runtime = self.coordinator.config_entry.runtime_data
        op_set_shading_mode(runtime, self.zone_id, option)
        runtime.climate.async_apply()
        self.coordinator.async_update_listeners()
