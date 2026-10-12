"""Diagnostics download (Settings → Devices & services → Hortulus → ⋮)."""

from __future__ import annotations

from typing import Any

from homeassistant.components.diagnostics import async_redact_data
from homeassistant.core import HomeAssistant

from . import GardenConfigEntry
from .engine.serde import to_dict

TO_REDACT = {"notify_services", "tts_media_players", "latitude", "photos"}


async def async_get_config_entry_diagnostics(hass: HomeAssistant, entry: GardenConfigEntry) -> dict[str, Any]:
    runtime = entry.runtime_data
    data = runtime.repo.data
    coordinator = runtime.coordinator
    return {
        "entry": async_redact_data(dict(entry.data), TO_REDACT),
        "options": async_redact_data(dict(entry.options), TO_REDACT),
        "revision": data.revision,
        "settings": async_redact_data(to_dict(data.settings), TO_REDACT),
        "counts": {
            "zones": len(data.zones),
            "beds": len(data.beds),
            "plantings": len(data.plantings),
            "tasks_open": sum(1 for t in data.tasks if t.is_open),
            "tasks_total": len(data.tasks),
            "custom_plants": len(data.custom_plants),
            "climate_days": len(data.climate_log),
        },
        "tracked_entities": sorted(coordinator.tracked_entities()),
        "weather": {
            "available": coordinator.weather.available,
            "error": coordinator.weather.error,
            "hourly_points": len(coordinator.weather.hourly),
            "daily_points": len(coordinator.weather.daily),
        },
        "analysis": async_redact_data(coordinator.data.to_dict(), TO_REDACT) if coordinator.data else None,
    }
