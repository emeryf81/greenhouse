"""Binary sensors: frost warning, bed needs water, greenhouse heat stress."""

from __future__ import annotations

from typing import Any

from homeassistant.components.binary_sensor import BinarySensorDeviceClass, BinarySensorEntity
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback

from . import GardenConfigEntry
from .coordinator import GardenCoordinator
from .engine.models import GardenBed, GreenhouseAction, IrrigationAction, RiskLevel, Zone
from .entity import BedEntity, GardenEntity, ZoneEntity, async_setup_dynamic

PARALLEL_UPDATES = 0


async def async_setup_entry(
    hass: HomeAssistant, entry: GardenConfigEntry, async_add_entities: AddConfigEntryEntitiesCallback
) -> None:
    coordinator = entry.runtime_data.coordinator
    async_add_entities([FrostWarningBinarySensor(coordinator)])
    async_setup_dynamic(
        entry,
        async_add_entities,
        bed_factory=lambda c, bed: [NeedsWaterBinarySensor(c, bed)],
        zone_factory=lambda c, zone: [HeatStressBinarySensor(c, zone)] if zone.is_enclosed else [],
    )


class FrostWarningBinarySensor(GardenEntity, BinarySensorEntity):
    """On when frost risk is moderate or high within 48 h."""

    _attr_device_class = BinarySensorDeviceClass.COLD

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "frost_warning")

    @property
    def is_on(self) -> bool | None:
        data = self.coordinator.data
        if not data or data.frost.level is RiskLevel.UNKNOWN:
            return None
        return data.frost.level in (RiskLevel.MODERATE, RiskLevel.HIGH)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        data = self.coordinator.data
        if not data:
            return {}
        frost_alerts = [a for a in data.alerts if a.kind == "frost"]
        return {
            "level": data.frost.level.value,
            "min_temperature": data.frost.plant_level_min_c,
            "plants_at_risk": sorted({p for a in frost_alerts for p in a.params.get("plants", [])}),
        }


class NeedsWaterBinarySensor(BedEntity, BinarySensorEntity):
    _attr_device_class = BinarySensorDeviceClass.PROBLEM
    _attr_icon = "mdi:water-alert"

    def __init__(self, coordinator: GardenCoordinator, bed: GardenBed) -> None:
        super().__init__(coordinator, bed, "needs_water")

    @property
    def is_on(self) -> bool | None:
        data = self.coordinator.data
        if not data or self.bed_id not in data.beds:
            return None
        return data.beds[self.bed_id].irrigation.action is IrrigationAction.WATER


class HeatStressBinarySensor(ZoneEntity, BinarySensorEntity):
    _attr_device_class = BinarySensorDeviceClass.HEAT

    def __init__(self, coordinator: GardenCoordinator, zone: Zone) -> None:
        super().__init__(coordinator, zone, "heat_stress")

    @property
    def is_on(self) -> bool | None:
        data = self.coordinator.data
        if not data or self.zone_id not in data.zones:
            return None
        advice = data.zones[self.zone_id].greenhouse
        return bool(advice and advice.action in (GreenhouseAction.SHADE, GreenhouseAction.VENTILATE))
