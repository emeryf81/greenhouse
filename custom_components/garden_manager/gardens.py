"""More than one garden in one Home Assistant: one config entry per garden.

The first garden keeps the original storage key (``garden_manager.garden``)
so existing installs are untouched; later gardens get their own key, stored
in the entry's data.  Panel calls name a garden with ``garden_id`` (its entry id); services
with ``garden`` (entry id or title).  Without either, the first garden is used.
"""

from __future__ import annotations

from contextvars import ContextVar
from typing import TYPE_CHECKING, Any

from homeassistant.core import HomeAssistant

from .const import DOMAIN, STORAGE_KEY

if TYPE_CHECKING:
    from homeassistant.config_entries import ConfigEntry

    from . import GardenRuntime

CONF_STORAGE_KEY = "storage_key"
# The garden a service call asked for (``garden: ...``), for the duration of that call.
service_garden: ContextVar[str | None] = ContextVar("hortulus_service_garden", default=None)


def storage_key(entry: ConfigEntry) -> str:
    return entry.data.get(CONF_STORAGE_KEY) or STORAGE_KEY


def loaded(hass: HomeAssistant) -> list[ConfigEntry]:
    return list(hass.config_entries.async_loaded_entries(DOMAIN))


def pick(hass: HomeAssistant, ref: str | None = None) -> GardenRuntime | None:
    """The garden ``ref`` names (entry id or title, any case); the first one without ``ref``."""
    entries = loaded(hass)
    if not entries:
        return None
    if not ref:
        return entries[0].runtime_data
    folded = ref.casefold()
    for entry in entries:
        if entry.entry_id == ref or (entry.title or "").casefold() == folded:
            return entry.runtime_data
    return None


def listing(hass: HomeAssistant) -> list[dict[str, Any]]:
    """The gardens for the panel's switcher."""
    return [{"entry_id": e.entry_id, "title": e.title or "Hortulus"} for e in loaded(hass)]
