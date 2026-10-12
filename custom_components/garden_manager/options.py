"""Map options-flow answers onto the stored settings (Store is the source of truth)."""

from __future__ import annotations

from typing import Any

from .const import (
    CONF_DIGEST_TIME,
    CONF_NOTIFY_SERVICES,
    CONF_OUTDOOR_TEMP,
    CONF_PERSISTENT,
    CONF_RAIN_SENSOR,
    CONF_REGION,
    CONF_TTS_ENTITY,
    CONF_TTS_PLAYERS,
    CONF_WEATHER_ENTITY,
)
from .engine.models import GardenSettings
from .seed import region_from_conf
from .storage import GardenRepository


def settings_to_options(settings: GardenSettings) -> dict[str, Any]:
    """Pre-fill values for the options flow."""
    region = settings.region
    n = settings.notifications
    return {
        CONF_REGION: {
            "hemisphere": region.hemisphere.value,
            "region_mode": region.mode,
            "preset": region.preset,
            "hardiness_zone": region.hardiness_zone,
            "last_frost": region.last_frost,
            "first_frost": region.first_frost,
        },
        CONF_WEATHER_ENTITY: settings.weather_entity,
        CONF_OUTDOOR_TEMP: settings.outdoor_sensors.air_temperature,
        CONF_RAIN_SENSOR: settings.outdoor_sensors.rain,
        "notifications": {
            CONF_PERSISTENT: n.persistent,
            CONF_NOTIFY_SERVICES: n.notify_services,
            CONF_TTS_ENTITY: n.tts_entity,
            CONF_TTS_PLAYERS: n.tts_media_players,
            CONF_DIGEST_TIME: n.digest_time,
            "frost_alerts": n.frost_alerts,
            "heat_alerts": n.heat_alerts,
            "tts_frost_announcement": n.tts_frost_announcement,
        },
        "advanced": {
            "language": settings.language or "auto",
            "companion_radius_cm": settings.companion_radius_cm,
            "sensor_stale_minutes": settings.sensor_stale_minutes,
            "root_zone_depth_mm": settings.root_zone_depth_mm,
            "max_irrigation_mm": settings.max_irrigation_mm,
        },
    }


def apply_options(repo: GardenRepository, options: dict[str, Any]) -> None:
    s = repo.data.settings
    if CONF_REGION in options:
        s.region = region_from_conf(options[CONF_REGION], s.region.latitude, s.region.time_zone)
    if CONF_WEATHER_ENTITY in options:
        s.weather_entity = options[CONF_WEATHER_ENTITY] or None
    if CONF_OUTDOOR_TEMP in options:
        s.outdoor_sensors.air_temperature = options[CONF_OUTDOOR_TEMP] or None
    if CONF_RAIN_SENSOR in options:
        s.outdoor_sensors.rain = options[CONF_RAIN_SENSOR] or None
    if notif := options.get("notifications"):
        n = s.notifications
        n.persistent = notif.get(CONF_PERSISTENT, n.persistent)
        n.notify_services = list(notif.get(CONF_NOTIFY_SERVICES, n.notify_services) or [])
        n.tts_entity = notif.get(CONF_TTS_ENTITY) or None
        n.tts_media_players = list(notif.get(CONF_TTS_PLAYERS) or [])
        n.digest_time = (notif.get(CONF_DIGEST_TIME) or n.digest_time)[:5]
        n.frost_alerts = notif.get("frost_alerts", n.frost_alerts)
        n.heat_alerts = notif.get("heat_alerts", n.heat_alerts)
        n.tts_frost_announcement = notif.get("tts_frost_announcement", n.tts_frost_announcement)
    if adv := options.get("advanced"):
        lang = adv.get("language", "auto")
        s.language = None if lang == "auto" else lang
        s.companion_radius_cm = float(adv.get("companion_radius_cm", s.companion_radius_cm))
        s.sensor_stale_minutes = int(adv.get("sensor_stale_minutes", s.sensor_stale_minutes))
        s.root_zone_depth_mm = float(adv.get("root_zone_depth_mm", s.root_zone_depth_mm))
        s.max_irrigation_mm = float(adv.get("max_irrigation_mm", s.max_irrigation_mm))
    repo.data.revision += 1
