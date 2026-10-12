"""Numbers: irrigation safety limits (stored in the garden settings)."""

from __future__ import annotations

from dataclasses import dataclass

from homeassistant.components.number import NumberDeviceClass, NumberEntity, NumberMode
from homeassistant.const import EntityCategory, UnitOfLength, UnitOfTemperature, UnitOfTime
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import GardenConfigEntry
from .coordinator import GardenCoordinator
from .entity import GardenEntity
from .operations import op_save_settings

PARALLEL_UPDATES = 1


@dataclass(frozen=True, slots=True)
class IrrigationNumber:
    key: str
    field: str
    unit: str
    minimum: float
    maximum: float
    step: float
    icon: str
    device_class: NumberDeviceClass | None = None


NUMBERS = (
    IrrigationNumber("irrigation_max_runtime", "max_runtime_min", UnitOfTime.MINUTES, 1, 180, 1, "mdi:timer-sand"),
    IrrigationNumber(
        "irrigation_frost_lockout", "frost_lockout_c", UnitOfTemperature.CELSIUS, -5, 10, 0.5, "mdi:snowflake-thermometer",
        NumberDeviceClass.TEMPERATURE,
    ),
    IrrigationNumber(
        "irrigation_rain_skip", "rain_skip_mm", UnitOfLength.MILLIMETERS, 0, 30, 0.5, "mdi:weather-pouring",
        NumberDeviceClass.PRECIPITATION,
    ),
)  # fmt: skip


async def async_setup_entry(
    hass: HomeAssistant, entry: GardenConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    coordinator = entry.runtime_data.coordinator
    async_add_entities(IrrigationSettingNumber(coordinator, desc) for desc in NUMBERS)


class IrrigationSettingNumber(GardenEntity, NumberEntity):
    _attr_entity_category = EntityCategory.CONFIG
    _attr_mode = NumberMode.BOX

    def __init__(self, coordinator: GardenCoordinator, desc: IrrigationNumber) -> None:
        super().__init__(coordinator, desc.key)
        self._desc = desc
        self._attr_native_unit_of_measurement = desc.unit
        self._attr_native_min_value = desc.minimum
        self._attr_native_max_value = desc.maximum
        self._attr_native_step = desc.step
        self._attr_icon = desc.icon
        self._attr_device_class = desc.device_class

    @property
    def native_value(self) -> float:
        return float(getattr(self.coordinator.repo.data.settings.irrigation, self._desc.field))

    async def async_set_native_value(self, value: float) -> None:
        runtime = self.coordinator.config_entry.runtime_data
        op_save_settings(runtime, {"irrigation": {self._desc.field: value}})
        self.coordinator.async_update_listeners()
