"""Constants for the Hortulus (garden_manager) integration."""

from __future__ import annotations

from datetime import timedelta
from typing import Final

from homeassistant.const import Platform

DOMAIN: Final = "garden_manager"
BRAND: Final = "Hortulus"
MANUFACTURER: Final = "Hortulus"

PLATFORMS: Final = [
    Platform.BINARY_SENSOR,
    Platform.BUTTON,
    Platform.CALENDAR,
    Platform.NUMBER,
    Platform.SELECT,
    Platform.SENSOR,
    Platform.SWITCH,
    Platform.TODO,
]

STORAGE_KEY: Final = f"{DOMAIN}.garden"

# Polling is only used for the forecast (sensors are event driven).
FORECAST_REFRESH: Final = timedelta(minutes=30)
FORECAST_MIN_INTERVAL: Final = timedelta(minutes=10)
SENSOR_DEBOUNCE_SECONDS: Final = 10.0
SAVE_DELAY_SECONDS: Final = 5

# Panel / frontend
PANEL_URL_PATH: Final = "hortulus"
PANEL_COMPONENT: Final = "hortulus-panel"
PANEL_ICON: Final = "mdi:sprout"
STATIC_URL: Final = f"/{DOMAIN}_static"
FRONTEND_FILE: Final = "hortulus-panel.js"

# Config entry data keys
CONF_REGION: Final = "region"
CONF_HEMISPHERE: Final = "hemisphere"
CONF_REGION_MODE: Final = "region_mode"
CONF_HARDINESS_ZONE: Final = "hardiness_zone"
CONF_PRESET: Final = "preset"
CONF_LAST_FROST: Final = "last_frost"
CONF_FIRST_FROST: Final = "first_frost"
CONF_WEATHER_ENTITY: Final = "weather_entity"
CONF_OUTDOOR_TEMP: Final = "outdoor_temperature"
CONF_RAIN_SENSOR: Final = "rain_sensor"
CONF_AREAS: Final = "areas"
CONF_AREA_NAME: Final = "name"
CONF_AREA_TYPE: Final = "type"
CONF_WIDTH_M: Final = "width_m"
CONF_LENGTH_M: Final = "length_m"
CONF_SOIL: Final = "soil"
CONF_SHADE: Final = "shade_pct"
CONF_WIND: Final = "wind"
CONF_MOISTURE: Final = "soil_moisture"
CONF_SOIL_TEMP: Final = "soil_temperature"
CONF_AIR_TEMP: Final = "air_temperature"
CONF_HUMIDITY: Final = "air_humidity"
CONF_LIGHT: Final = "light"
CONF_IRRIGATION: Final = "irrigation"
CONF_FLOW_LPM: Final = "flow_lpm"
CONF_NOTIFY_SERVICES: Final = "notify_services"
CONF_PERSISTENT: Final = "persistent_notifications"
CONF_TTS_ENTITY: Final = "tts_entity"
CONF_TTS_PLAYERS: Final = "tts_media_players"
CONF_DIGEST_TIME: Final = "digest_time"
CONF_IMPORT_EXAMPLE: Final = "import_example_plan"

AREA_OUTDOOR: Final = "outdoor"
AREA_GREENHOUSE: Final = "greenhouse"
AREA_CONTAINER: Final = "container"

# Events fired on the HA bus (automation friendly)
EVENT_TASK_DUE: Final = f"{DOMAIN}_task_due"
EVENT_TASK_COMPLETED: Final = f"{DOMAIN}_task_completed"
EVENT_FROST_WARNING: Final = f"{DOMAIN}_frost_warning"
EVENT_HEAT_WARNING: Final = f"{DOMAIN}_heat_warning"
EVENT_PLAN_UPDATED: Final = f"{DOMAIN}_plan_updated"
EVENT_IRRIGATION_RECOMMENDED: Final = f"{DOMAIN}_irrigation_recommended"
EVENT_IRRIGATION_RUN: Final = f"{DOMAIN}_irrigation_run"
EVENT_DISEASE_WARNING: Final = f"{DOMAIN}_disease_warning"

# Dispatcher signal: beds/zones added or removed -> platforms add entities
SIGNAL_LAYOUT_CHANGED: Final = f"{DOMAIN}_layout_changed"

# Services
SERVICE_ADD_TASK: Final = "add_task"
SERVICE_COMPLETE_TASK: Final = "complete_task"
SERVICE_POSTPONE_TASK: Final = "postpone_task"
SERVICE_DELETE_TASK: Final = "delete_task"
SERVICE_GENERATE_TASKS: Final = "generate_tasks"
SERVICE_RECALCULATE_PLAN: Final = "recalculate_plan"
SERVICE_EXPORT_PLAN: Final = "export_plan"
SERVICE_IMPORT_PLAN: Final = "import_plan"
SERVICE_ADD_PLANTING: Final = "add_planting"
SERVICE_UPDATE_PLANTING: Final = "update_planting"
SERVICE_REMOVE_PLANTING: Final = "remove_planting"
SERVICE_RUN_IRRIGATION: Final = "run_irrigation_plan"
SERVICE_STOP_IRRIGATION: Final = "stop_irrigation"
SERVICE_SET_SHADING: Final = "set_shading_mode"
SERVICE_AUTOFILL: Final = "autofill_plan"
SERVICE_EXPORT_PDF: Final = "export_pdf"

# Printouts written by ``export_pdf`` (served via /local/hortulus/...)
PRINT_DIR: Final = "www/hortulus"
PRINT_URL: Final = f"/api/{DOMAIN}/print"
