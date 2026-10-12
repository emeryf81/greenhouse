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
    async_add_entities(
        [
            FrostWarningBinarySensor(coordinator),
            IrrigationLockoutBinarySensor(coordinator),
            IrrigationRunningBinarySensor(coordinator),
        ]
    )
    async_setup_dynamic(
        entry,
        async_add_entities,
        bed_factory=lambda c, bed: [NeedsWaterBinarySensor(c, bed)],
        zone_factory=lambda c, zone: (
            [ZoneFrostBinarySensor(c, zone)] + ([HeatStressBinarySensor(c, zone)] if zone.is_enclosed else [])
        ),
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


class ZoneFrostBinarySensor(ZoneEntity, BinarySensorEntity):
    """Per-zone frost risk in the next 48 h (greenhouses buffer frost)."""

    _attr_device_class = BinarySensorDeviceClass.COLD

    def __init__(self, coordinator: GardenCoordinator, zone: Zone) -> None:
        super().__init__(coordinator, zone, "frost_risk_48h")

    @property
    def is_on(self) -> bool | None:
        data = self.coordinator.data
        if not data or self.zone_id not in data.zones:
            return None
        level = data.zones[self.zone_id].frost.level
        return None if level is RiskLevel.UNKNOWN else level in (RiskLevel.MODERATE, RiskLevel.HIGH)

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        data = self.coordinator.data
        if not data or self.zone_id not in data.zones:
            return {}
        f = data.zones[self.zone_id].frost
        return {
            "level": f.level.value,
            "min_temperature": f.plant_level_min_c,
            "min_at": f.min_at.isoformat() if f.min_at else None,
        }


class IrrigationLockoutBinarySensor(GardenEntity, BinarySensorEntity):
    """On while outdoor valves are locked because of (forecast) frost."""

    _attr_device_class = BinarySensorDeviceClass.SAFETY
    _attr_icon = "mdi:snowflake-off"

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "irrigation_lockout")

    def _plan(self) -> Any:
        runtime = self.coordinator.config_entry.runtime_data
        return runtime.irrigation.build_plan(force=True)

    @property
    def is_on(self) -> bool | None:
        if not self.coordinator.data:
            return None
        return self._plan().lockout

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        if not self.coordinator.data:
            return {}
        plan = self._plan()
        return {
            "temperature": plan.lockout_temp,
            "limit": self.coordinator.repo.data.settings.irrigation.frost_lockout_c,
        }


class IrrigationRunningBinarySensor(GardenEntity, BinarySensorEntity):
    _attr_device_class = BinarySensorDeviceClass.RUNNING
    _attr_icon = "mdi:sprinkler-variant"

    def __init__(self, coordinator: GardenCoordinator) -> None:
        super().__init__(coordinator, "irrigation_running")

    @property
    def is_on(self) -> bool:
        return self.coordinator.config_entry.runtime_data.irrigation.running

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        status = self.coordinator.config_entry.runtime_data.irrigation.status
        return {
            "bed_id": status.bed_id,
            "ends_at": status.ends_at.isoformat() if status.ends_at else None,
            "last_error": status.last_error,
        }
