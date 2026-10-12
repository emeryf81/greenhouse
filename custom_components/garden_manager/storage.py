"""Persistence: a versioned ``Store`` wrapped in a small repository."""

from __future__ import annotations

from collections.abc import Callable
from datetime import timedelta
import logging
from typing import Any

from homeassistant.core import CALLBACK_TYPE, HomeAssistant, callback
from homeassistant.helpers.storage import Store
from homeassistant.util import dt as dt_util

from .const import SAVE_DELAY_SECONDS, STORAGE_KEY
from .engine.migrations import STORAGE_MINOR_VERSION, STORAGE_VERSION, migrate
from .engine.models import GardenData
from .engine.plantdb import PlantDatabase
from .engine.serde import from_dict, to_dict

_LOGGER = logging.getLogger(__name__)

DONE_TASK_RETENTION = timedelta(days=400)


class GardenStore(Store[dict[str, Any]]):
    """Store with Hortulus migrations."""

    async def _async_migrate_func(
        self, old_major_version: int, old_minor_version: int, old_data: dict[str, Any]
    ) -> dict[str, Any]:
        _LOGGER.info(
            "Migrating Hortulus data from %s.%s to %s.%s",
            old_major_version,
            old_minor_version,
            STORAGE_VERSION,
            STORAGE_MINOR_VERSION,
        )
        return migrate(old_data, old_major_version, old_minor_version)


class GardenRepository:
    """Owns the in-memory :class:`GardenData` and persists it lazily.

    All mutations happen on the event loop; ``async_changed`` bumps the
    revision (used for optimistic concurrency by the planner UI), schedules a
    debounced save and notifies listeners (the coordinator).
    """

    def __init__(self, hass: HomeAssistant, builtin_plants: list[dict[str, Any]]) -> None:
        self.hass = hass
        self.store = GardenStore(hass, STORAGE_VERSION, STORAGE_KEY, minor_version=STORAGE_MINOR_VERSION)
        self.data = GardenData()
        self._builtin = builtin_plants
        self._db: PlantDatabase | None = None
        self._listeners: list[Callable[[str], None]] = []

    async def async_load(self) -> bool:
        """Load from disk.  Returns ``True`` when no data existed yet."""
        raw = await self.store.async_load()
        if raw is None:
            self.data = GardenData()
            return True
        try:
            self.data = from_dict(GardenData, raw)
        except (TypeError, ValueError, KeyError):
            _LOGGER.exception("Stored Hortulus data is corrupt; keeping a backup and starting fresh")
            backup = Store[dict[str, Any]](self.hass, 1, f"{STORAGE_KEY}.corrupt")
            await backup.async_save(raw)
            self.data = GardenData()
            return True
        return False

    # ------------------------------------------------------------------ #
    @property
    def db(self) -> PlantDatabase:
        if self._db is None:
            self._db = PlantDatabase(self._builtin, self.data.custom_plants, self.data.plant_overrides)
        return self._db

    def invalidate_db(self) -> None:
        self._db = None

    @callback
    def async_add_listener(self, listener: Callable[[str], None]) -> CALLBACK_TYPE:
        self._listeners.append(listener)

        @callback
        def remove() -> None:
            self._listeners.remove(listener)

        return remove

    @callback
    def async_changed(self, reason: str, *, bump_revision: bool = True) -> None:
        """Persist and notify.  ``reason`` is e.g. ``plan``, ``tasks``, ``settings``."""
        if bump_revision:
            self.data.revision += 1
        if reason in ("plants", "plan", "import"):
            self.invalidate_db()
        self.async_schedule_save()
        for listener in list(self._listeners):
            listener(reason)

    @callback
    def async_schedule_save(self) -> None:
        self.store.async_delay_save(self._serialize, SAVE_DELAY_SECONDS)

    async def async_flush(self) -> None:
        await self.store.async_save(self._serialize())

    def _serialize(self) -> dict[str, Any]:
        self._prune()
        return to_dict(self.data)

    def _prune(self) -> None:
        """Drop old finished tasks so the store stays small."""
        cutoff = dt_util.now() - DONE_TASK_RETENTION
        self.data.tasks = [
            t for t in self.data.tasks if t.is_open or t.completed_at is None or t.completed_at >= cutoff
        ]
        keep_from = (dt_util.now() - timedelta(days=14)).date().isoformat()
        self.data.notified = {k: v for k, v in self.data.notified.items() if v >= keep_from}
