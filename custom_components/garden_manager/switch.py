"""Switch: automatic irrigation on/off (shortcut for the irrigation mode)."""

from __future__ import annotations

from typing import Any

from homeassistant.components.switch import SwitchEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import GardenConfigEntry
from .coordinator import GardenCoordinator
from .entity import GardenEntity
from .operations import op_save_settings

PARALLEL_UPDATES = 1


async def async_setup_entry(
    hass: HomeAssistant, entry: GardenConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    async_add_entities([AutoIrrigationSwitch(entry.runtime_data.coordinator)])


class AutoIrrigationSwitch(GardenEntity, SwitchEntity):
    """On = ``auto`` (valves open at the start time), off = ``advise`` (tasks only)."""

    _attr_icon = "mdi:sprinkler"

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "auto_irrigation")

    @property
    def is_on(self) -> bool:
        return self.coordinator.repo.data.settings.irrigation.mode == "auto"

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        cfg = self.coordinator.repo.data.settings.irrigation
        valves = [b.irrigation_entity for b in self.coordinator.repo.data.beds if b.irrigation_entity]
        return {"start_time": cfg.start_time, "pump": cfg.pump_entity, "valves": valves}

    async def async_turn_on(self, **kwargs: Any) -> None:
        op_save_settings(self.coordinator.config_entry.runtime_data, {"irrigation": {"mode": "auto"}})
        self.coordinator.async_update_listeners()

    async def async_turn_off(self, **kwargs: Any) -> None:
        await self.coordinator.config_entry.runtime_data.irrigation.async_stop()
        op_save_settings(self.coordinator.config_entry.runtime_data, {"irrigation": {"mode": "advise"}})
        self.coordinator.async_update_listeners()
