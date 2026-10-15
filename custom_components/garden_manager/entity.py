"""Base entities and dynamic per-bed / per-zone entity management."""

from __future__ import annotations

from collections.abc import Callable, Iterable
from typing import TYPE_CHECKING

from homeassistant.core import callback
from homeassistant.helpers.device_registry import DeviceEntryType, DeviceInfo
from homeassistant.helpers.dispatcher import async_dispatcher_connect
from homeassistant.helpers.entity import Entity
from homeassistant.helpers.entity_platform import AddConfigEntryEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from .const import BRAND, DOMAIN, MANUFACTURER, SIGNAL_LAYOUT_CHANGED
from .coordinator import GardenCoordinator
from .engine.models import GardenBed, Zone

if TYPE_CHECKING:
    from . import GardenConfigEntry


class GardenEntity(CoordinatorEntity[GardenCoordinator]):
    """Entity on the main "Hortulus" device."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: GardenCoordinator, key: str) -> None:
        super().__init__(coordinator)
        entry_id = coordinator.config_entry.entry_id
        self._attr_unique_id = f"{entry_id}_{key}"
        self._attr_translation_key = key
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, entry_id)},
            name=BRAND,
            manufacturer=MANUFACTURER,
            model="Garden manager",
            entry_type=DeviceEntryType.SERVICE,
            configuration_url="homeassistant://hortulus",
        )


class BedEntity(CoordinatorEntity[GardenCoordinator]):
    """Entity on a per-bed device (``Bed 1``)."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: GardenCoordinator, bed: GardenBed, key: str) -> None:
        super().__init__(coordinator)
        entry_id = coordinator.config_entry.entry_id
        self.bed_id = bed.id
        self._attr_unique_id = f"{entry_id}_{bed.id}_{key}"
        self._attr_translation_key = key
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, f"{entry_id}_{bed.id}")},
            name=bed.name,
            manufacturer=MANUFACTURER,
            model=f"Garden bed ({bed.kind.value})",
            via_device=(DOMAIN, entry_id),
            entry_type=DeviceEntryType.SERVICE,
            configuration_url="homeassistant://hortulus/planner",
        )

    @property
    def bed(self) -> GardenBed | None:
        return self.coordinator.repo.data.bed(self.bed_id)

    @property
    def available(self) -> bool:
        return (
            super().available
            and self.bed is not None
            and self.bed_id in (self.coordinator.data.beds if self.coordinator.data else {})
        )


class ZoneEntity(CoordinatorEntity[GardenCoordinator]):
    """Entity on a per-zone device (``Greenhouse Zone A``)."""

    _attr_has_entity_name = True

    def __init__(self, coordinator: GardenCoordinator, zone: Zone, key: str) -> None:
        super().__init__(coordinator)
        entry_id = coordinator.config_entry.entry_id
        self.zone_id = zone.id
        self._attr_unique_id = f"{entry_id}_{zone.id}_{key}"
        self._attr_translation_key = key
        self._attr_device_info = DeviceInfo(
            identifiers={(DOMAIN, f"{entry_id}_{zone.id}")},
            name=zone.name,
            manufacturer=MANUFACTURER,
            model=f"Garden zone ({zone.type.value})",
            via_device=(DOMAIN, entry_id),
            entry_type=DeviceEntryType.SERVICE,
            configuration_url="homeassistant://hortulus/settings",
        )

    @property
    def zone(self) -> Zone | None:
        return self.coordinator.repo.data.zone(self.zone_id)

    @property
    def available(self) -> bool:
        return (
            super().available
            and self.zone is not None
            and self.zone_id in (self.coordinator.data.zones if self.coordinator.data else {})
        )


@callback
def async_setup_dynamic(
    entry: GardenConfigEntry,
    async_add_entities: AddConfigEntryEntitiesCallback,
    *,
    bed_factory: Callable[[GardenCoordinator, GardenBed], Iterable[Entity]] | None = None,
    zone_factory: Callable[[GardenCoordinator, Zone], Iterable[Entity]] | None = None,
) -> None:
    """Add per-bed/zone entities now and whenever the layout gains items.

    Removed beds/zones are cleaned up by deleting their device (see
    ``operations._remove_devices``), which removes the entities too.
    """
    coordinator = entry.runtime_data.coordinator
    known_beds: set[str] = set()
    known_zones: dict[str, tuple[bool, set[str]]] = {}  # zone id -> (enclosed, unique ids of its entities)

    @callback
    def _sync() -> None:
        data = coordinator.repo.data
        new: list[Entity] = []
        if bed_factory:
            for bed in data.beds:
                if bed.id not in known_beds:
                    known_beds.add(bed.id)
                    new.extend(bed_factory(coordinator, bed))
        if zone_factory:
            for zone in data.zones:
                known = known_zones.get(zone.id)
                if known is not None and known[0] == zone.is_enclosed:
                    continue
                # new zone, or one that became (or stopped being) a greenhouse: its entities follow
                entities = list(zone_factory(coordinator, zone))
                ids = {e.unique_id for e in entities if e.unique_id}
                before = known[1] if known else set()
                new.extend(e for e in entities if e.unique_id not in before)
                _remove_entities(coordinator, before - ids)
                known_zones[zone.id] = (zone.is_enclosed, ids)
        known_beds.intersection_update({b.id for b in data.beds})
        for zone_id in set(known_zones) - {z.id for z in data.zones}:
            del known_zones[zone_id]
        if new:
            async_add_entities(new)

    _sync()
    entry.async_on_unload(async_dispatcher_connect(coordinator.hass, SIGNAL_LAYOUT_CHANGED, _sync))


@callback
def _remove_entities(coordinator: GardenCoordinator, unique_ids: set[str]) -> None:
    """Drop entities a zone no longer has (a greenhouse turned into an open zone)."""
    if not unique_ids:
        return
    from homeassistant.helpers import entity_registry as er

    registry = er.async_get(coordinator.hass)
    for entity in list(registry.entities.values()):
        if entity.platform == DOMAIN and entity.unique_id in unique_ids:
            registry.async_remove(entity.entity_id)
