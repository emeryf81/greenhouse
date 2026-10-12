"""Hortulus - vegetable garden planning and care for Home Assistant."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime
import logging

from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import config_validation as cv
from homeassistant.helpers.event import async_track_time_change
from homeassistant.helpers.storage import Store
from homeassistant.helpers.typing import ConfigType
from homeassistant.util import dt as dt_util

from .const import DOMAIN, PLATFORMS, STORAGE_KEY
from .coordinator import GardenCoordinator
from .engine.i18n import normalize_lang
from .engine.plantdb import PlantDatabase, load_builtin_json
from .notifications import GardenNotifier
from .options import apply_options
from .panel import async_register_panel, async_unregister_panel
from .seed import build_initial_data
from .services import async_setup_services
from .storage import GardenRepository
from .websocket_api import async_setup_websocket

_LOGGER = logging.getLogger(__name__)

CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN)


@dataclass(slots=True)
class GardenRuntime:
    repo: GardenRepository
    coordinator: GardenCoordinator
    notifier: GardenNotifier


type GardenConfigEntry = ConfigEntry[GardenRuntime]


async def async_setup(hass: HomeAssistant, config: ConfigType) -> bool:
    """Register services and websocket commands once (HA best practice)."""
    async_setup_services(hass)
    async_setup_websocket(hass)
    return True


async def async_setup_entry(hass: HomeAssistant, entry: GardenConfigEntry) -> bool:
    builtin = await hass.async_add_executor_job(load_builtin_json)
    repo = GardenRepository(hass, builtin)
    if await repo.async_load():
        _LOGGER.info("Creating initial Hortulus garden from setup answers")
        repo.data = build_initial_data(
            {**entry.data, **entry.options},
            latitude=hass.config.latitude,
            time_zone=hass.config.time_zone,
            language=normalize_lang(hass.config.language),
            today=dt_util.now().date(),
            db=PlantDatabase(builtin),
        )
        await repo.async_flush()

    coordinator = GardenCoordinator(hass, entry, repo)
    notifier = GardenNotifier(hass, repo)
    entry.runtime_data = GardenRuntime(repo, coordinator, notifier)
    entry.async_on_unload(coordinator.async_add_post_compute_hook(notifier.async_process))

    await coordinator.async_config_entry_first_refresh()
    await hass.config_entries.async_forward_entry_setups(entry, PLATFORMS)
    await async_register_panel(hass)

    @callback
    def _midnight(now: datetime) -> None:
        """New day: expire yesterday's sensor tasks, roll windows forward."""
        hass.async_create_task(coordinator.async_request_refresh())

    entry.async_on_unload(async_track_time_change(hass, _midnight, hour=0, minute=5, second=0))
    _schedule_digest(hass, entry)
    entry.async_on_unload(entry.add_update_listener(_async_update_listener))
    return True


def _schedule_digest(hass: HomeAssistant, entry: GardenConfigEntry) -> None:
    runtime = entry.runtime_data
    hh, _, mm = runtime.repo.data.settings.notifications.digest_time.partition(":")
    try:
        hour, minute = int(hh), int(mm or 0)
    except ValueError:
        hour, minute = 7, 30

    async def _digest(now: datetime) -> None:
        if runtime.coordinator.data is not None:
            await runtime.notifier.async_send_digest(runtime.coordinator.data)

    entry.async_on_unload(async_track_time_change(hass, _digest, hour=hour, minute=minute, second=0))


async def _async_update_listener(hass: HomeAssistant, entry: GardenConfigEntry) -> None:
    """Options flow saved: copy into the store and reload."""
    apply_options(entry.runtime_data.repo, dict(entry.options))
    await entry.runtime_data.repo.async_flush()
    await hass.config_entries.async_reload(entry.entry_id)


async def async_unload_entry(hass: HomeAssistant, entry: GardenConfigEntry) -> bool:
    unloaded = await hass.config_entries.async_unload_platforms(entry, PLATFORMS)
    if unloaded:
        await entry.runtime_data.repo.async_flush()
        async_unregister_panel(hass)
    return unloaded


async def async_remove_entry(hass: HomeAssistant, entry: GardenConfigEntry) -> None:
    """Remove stored garden data, keeping one backup copy for recovery."""
    store: Store[dict] = Store(hass, 1, STORAGE_KEY)
    raw = await store.async_load()
    if raw is not None:
        await Store[dict](hass, 1, f"{STORAGE_KEY}.backup").async_save(raw)
    await store.async_remove()
