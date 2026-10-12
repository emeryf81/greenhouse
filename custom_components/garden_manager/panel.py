"""Sidebar panel registration for the Hortulus frontend."""

from __future__ import annotations

import hashlib
from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import (
    BRAND,
    CARD_FILE,
    DOMAIN,
    FRONTEND_FILE,
    PANEL_COMPONENT,
    PANEL_ICON,
    PANEL_URL_PATH,
    STATIC_URL,
)

FRONTEND_DIR = Path(__file__).parent / "frontend"
_STATIC_KEY = f"{DOMAIN}_static_registered"
_CARD_KEY = f"{DOMAIN}_card_url"


def _file_hash(path: Path) -> str:
    try:
        return hashlib.sha256(path.read_bytes()).hexdigest()[:12]
    except OSError:
        return "dev"


async def async_register_panel(hass: HomeAssistant) -> None:
    # Static paths cannot be unregistered: register once per HA process.
    if not hass.data.get(_STATIC_KEY):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=True)]
        )
        hass.data[_STATIC_KEY] = True
    # Cache-busting query so updates via HACS are picked up immediately.
    version = await hass.async_add_executor_job(_file_hash, FRONTEND_DIR / FRONTEND_FILE)
    # The Lovelace card is loaded on every dashboard (no resource to add by hand).
    if not hass.data.get(_CARD_KEY):
        card_version = await hass.async_add_executor_job(_file_hash, FRONTEND_DIR / CARD_FILE)
        hass.data[_CARD_KEY] = f"{STATIC_URL}/{CARD_FILE}?v={card_version}"
        frontend.add_extra_js_url(hass, hass.data[_CARD_KEY])
    if PANEL_URL_PATH in hass.data.get(frontend.DATA_PANELS, {}):
        return
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_COMPONENT,
        sidebar_title=BRAND,
        sidebar_icon=PANEL_ICON,
        module_url=f"{STATIC_URL}/{FRONTEND_FILE}?v={version}",
        embed_iframe=False,
        require_admin=False,
        config={"domain": DOMAIN},
    )


def async_unregister_panel(hass: HomeAssistant) -> None:
    frontend.async_remove_panel(hass, PANEL_URL_PATH, warn_if_unknown=False)
    if card_url := hass.data.pop(_CARD_KEY, None):
        frontend.remove_extra_js_url(hass, card_url)
