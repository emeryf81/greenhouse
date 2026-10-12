"""Hortulus domain model.

Everything in :mod:`custom_components.garden_manager.engine` is *pure Python*:
no Home Assistant imports, no I/O.  That keeps the horticultural logic fast to
unit-test and lets the same rules run inside the coordinator, the services and
the websocket API.

Conventions
-----------
* Lengths are centimetres, temperatures degrees Celsius, rain millimetres.
* Canvas coordinates: origin top-left, x to the east, y to the south (cm).
* Planting coordinates are *relative to their bed*.
* Calendar dates are local (``date``), timestamps are tz-aware (``datetime``).
* A *season* is identified by the year in which its spring (last frost) falls,
  so on the southern hemisphere season 2026 runs from July 2026 to June 2027.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import date, datetime
from enum import StrEnum
from typing import Any, Literal


# --------------------------------------------------------------------------- #
# Enumerations
# --------------------------------------------------------------------------- #
class Hemisphere(StrEnum):
    NORTH = "north"
    SOUTH = "south"


class ZoneType(StrEnum):
    OUTDOOR = "outdoor"
    GREENHOUSE = "greenhouse"
    COLD_FRAME = "cold_frame"


class BedKind(StrEnum):
    IN_GROUND = "in_ground"
    RAISED = "raised"
    CONTAINER = "container"


class SoilType(StrEnum):
    SANDY = "sandy"
    LOAM = "loam"
    CLAY = "clay"
    SILT = "silt"
    PEAT = "peat"
    CHALK = "chalk"
    POTTING_MIX = "potting_mix"


class WindExposure(StrEnum):
    SHELTERED = "sheltered"
    MODERATE = "moderate"
    EXPOSED = "exposed"


class GrowthHabit(StrEnum):
    BUSH = "bush"
    VINE = "vine"
    CLIMBING = "climbing"
    UPRIGHT = "upright"
    ROSETTE = "rosette"
    ROOT = "root"
    BULB = "bulb"


class Suitability(StrEnum):
    YES = "yes"
    NO = "no"
    CONDITIONAL = "conditional"


class FrostTolerance(StrEnum):
    TENDER = "tender"  # damaged at/just above 0 °C
    HALF_HARDY = "half_hardy"  # light frost OK (to about -2 °C)
    HARDY = "hardy"  # to about -7 °C
    VERY_HARDY = "very_hardy"  # below -10 °C


class Level(StrEnum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class Relation(StrEnum):
    FRIEND = "friend"
    ENEMY = "enemy"
    NEUTRAL = "neutral"


class SowMethod(StrEnum):
    INDOOR_SOW = "indoor_sow"  # sow in trays, transplant later
    DIRECT_SOW = "direct_sow"  # sow in place
    TRANSPLANT = "transplant"  # bought seedling / sets / cloves


class PlantingStatus(StrEnum):
    PLANNED = "planned"
    SOWN_INDOORS = "sown_indoors"
    SOWN = "sown"
    TRANSPLANTED = "transplanted"
    HARVESTING = "harvesting"
    FINISHED = "finished"
    FAILED = "failed"


class LayoutMode(StrEnum):
    SINGLE = "single"
    BLOCK = "block"
    ROW = "row"


class TaskType(StrEnum):
    SOW_INDOOR = "sow_indoor"
    SOW_DIRECT = "sow_direct"
    HARDEN_OFF = "harden_off"
    TRANSPLANT = "transplant"
    THIN = "thin"
    STAKE = "stake"
    PRUNE = "prune"
    PINCH = "pinch"
    EARTH_UP = "earth_up"
    FEED = "feed"
    WATER = "water"
    WEED = "weed"
    PEST_CHECK = "pest_check"
    HARVEST = "harvest"
    VENTILATE = "ventilate"
    SHADE = "shade"
    FROST_PROTECT = "frost_protect"
    CUSTOM = "custom"


class TaskStatus(StrEnum):
    OPEN = "open"
    DONE = "done"
    SKIPPED = "skipped"


class TaskPriority(StrEnum):
    LOW = "low"
    NORMAL = "normal"
    HIGH = "high"
    URGENT = "urgent"

    @property
    def rank(self) -> int:
        return _PRIORITY_RANK[self]


_PRIORITY_RANK = {
    TaskPriority.LOW: 0,
    TaskPriority.NORMAL: 1,
    TaskPriority.HIGH: 2,
    TaskPriority.URGENT: 3,
}


class TaskSource(StrEnum):
    GENERATED = "generated"  # derived from the plan + plant database
    SENSOR = "sensor"  # derived from live sensor readings
    WEATHER = "weather"  # derived from the forecast
    USER = "user"  # created by a person or an automation


class RiskLevel(StrEnum):
    NONE = "none"
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    UNKNOWN = "unknown"


class MoistureStatus(StrEnum):
    DRY = "dry"
    SLIGHTLY_DRY = "slightly_dry"
    OPTIMAL = "optimal"
    WET = "wet"
    UNKNOWN = "unknown"


class IrrigationAction(StrEnum):
    NONE = "none"
    WATER = "water"
    SKIP_RAIN_EXPECTED = "skip_rain_expected"
    CHECK_MANUALLY = "check_manually"


class GreenhouseAction(StrEnum):
    NONE = "none"
    VENTILATE = "ventilate"
    SHADE = "shade"
    CLOSE_UP = "close_up"
    HEAT = "heat"


WindowAnchor = Literal["last_frost", "first_frost"]
CareAnchor = Literal["planting", "sow", "transplant", "harvest_start"]


# --------------------------------------------------------------------------- #
# Plant database
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class Window:
    """A sowing/planting window in *weeks* relative to a frost anchor.

    ``start_week=-8, end_week=-6, anchor="last_frost"`` means "between 8 and 6
    weeks before the average last spring frost".  Anchoring on frost dates makes
    the database hemisphere- and climate-independent.
    """

    start_week: int
    end_week: int
    anchor: WindowAnchor = "last_frost"


@dataclass(slots=True)
class SowingCalendar:
    indoor_sow: list[Window] = field(default_factory=list)
    direct_sow: list[Window] = field(default_factory=list)
    transplant: list[Window] = field(default_factory=list)


@dataclass(slots=True)
class GreenhouseProfile:
    suitability: Suitability = Suitability.NO
    min_night_c: float = 5.0
    max_day_c: float = 30.0
    # How many weeks earlier sowing/transplanting may start under glass.
    season_extension_weeks: int = 0
    notes: dict[str, str] = field(default_factory=dict)


@dataclass(slots=True)
class CompanionLink:
    plant: str
    relation: Relation
    reason: dict[str, str] = field(default_factory=dict)
    strength: int = 2  # 1 = folklore / weak … 3 = well documented


@dataclass(slots=True)
class CareRule:
    """Data-driven care task, e.g. "prune side shoots weekly from day 14"."""

    task: TaskType
    start_day: int = 0
    interval_days: int | None = None
    end_day: int | None = None
    anchor: CareAnchor = "planting"
    minutes: int = 10
    notes: dict[str, str] = field(default_factory=dict)


@dataclass(slots=True)
class Plant:
    id: str
    names: dict[str, str]
    scientific_name: str
    family: str
    variety: str | None = None
    habit: GrowthHabit = GrowthHabit.BUSH
    perennial: bool = False
    spacing_cm: float = 30.0
    row_spacing_cm: float = 30.0
    sowing_depth_cm: float = 1.0
    germination_days: list[int] = field(default_factory=lambda: [7, 14])
    min_soil_temp_c: float = 7.0
    optimal_soil_temp_c: float = 18.0
    max_soil_temp_c: float | None = None
    days_to_maturity: list[int] = field(default_factory=lambda: [60, 80])
    maturity_from: Literal["sow", "transplant"] = "sow"
    harvest_duration_days: int = 14
    # False for companion flowers / green manures: no harvest tasks.
    harvestable: bool = True
    continuous_harvest: bool = False
    harvest_interval_days: int | None = None
    transplant_age_days: list[int] = field(default_factory=lambda: [35, 49])
    sowing: SowingCalendar = field(default_factory=SowingCalendar)
    greenhouse: GreenhouseProfile = field(default_factory=GreenhouseProfile)
    frost_tolerance: FrostTolerance = FrostTolerance.HALF_HARDY
    min_temp_c: float = 0.0
    max_temp_c: float = 32.0
    companions: list[CompanionLink] = field(default_factory=list)
    rotation_years: int = 3
    pests: list[str] = field(default_factory=list)
    diseases: list[str] = field(default_factory=list)
    water_needs: Level = Level.MEDIUM
    nutrient_needs: Level = Level.MEDIUM
    feeding_interval_days: int | None = None
    care: list[CareRule] = field(default_factory=list)
    pruning_notes: dict[str, str] = field(default_factory=dict)
    thinning: bool = False
    succession_interval_days: int | None = None
    gdd_base_c: float = 10.0
    gdd_to_maturity: int | None = None
    tags: list[str] = field(default_factory=list)
    source: Literal["builtin", "custom", "override"] = "builtin"

    def name(self, lang: str = "en") -> str:
        return self.names.get(lang) or self.names.get("en") or self.id


# --------------------------------------------------------------------------- #
# Garden layout
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class SensorMapping:
    """Entity ids feeding a bed or zone.  ``None`` means "not available"."""

    soil_moisture: str | None = None
    soil_temperature: str | None = None
    air_temperature: str | None = None
    air_humidity: str | None = None
    light: str | None = None
    rain: str | None = None

    def merged_with(self, fallback: SensorMapping) -> SensorMapping:
        """Bed sensors fall back to the sensors of their zone."""
        return SensorMapping(
            soil_moisture=self.soil_moisture or fallback.soil_moisture,
            soil_temperature=self.soil_temperature or fallback.soil_temperature,
            air_temperature=self.air_temperature or fallback.air_temperature,
            air_humidity=self.air_humidity or fallback.air_humidity,
            light=self.light or fallback.light,
            rain=self.rain or fallback.rain,
        )

    def entity_ids(self) -> list[str]:
        return [
            e
            for e in (
                self.soil_moisture,
                self.soil_temperature,
                self.air_temperature,
                self.air_humidity,
                self.light,
                self.rain,
            )
            if e
        ]


@dataclass(slots=True)
class Microclimate:
    shade_pct: int = 0
    wind: WindExposure = WindExposure.MODERATE
    heated: bool = False
    min_heating_temp_c: float | None = None
    # Night-time buffering of an enclosure versus outside (°C).  ``None`` means
    # "use the default for the zone type" (greenhouse +3, cold frame +2).
    night_offset_c: float | None = None
    # Extra daytime warming in full sun (°C).  ``None`` = default for type.
    solar_gain_c: float | None = None


@dataclass(slots=True)
class Zone:
    id: str
    name: str
    type: ZoneType = ZoneType.OUTDOOR
    x_cm: float = 0
    y_cm: float = 0
    width_cm: float = 400
    length_cm: float = 300
    microclimate: Microclimate = field(default_factory=Microclimate)
    sensors: SensorMapping = field(default_factory=SensorMapping)
    vent_entity: str | None = None

    @property
    def is_enclosed(self) -> bool:
        return self.type in (ZoneType.GREENHOUSE, ZoneType.COLD_FRAME)


@dataclass(slots=True)
class GardenBed:
    id: str
    name: str
    zone_id: str
    kind: BedKind = BedKind.RAISED
    x_cm: float = 0
    y_cm: float = 0
    width_cm: float = 200
    length_cm: float = 100
    # Compass bearing of the rows (0 = rows run north-south).
    orientation_deg: int = 0
    soil: SoilType = SoilType.LOAM
    shade_pct: int | None = None  # overrides zone microclimate when set
    sensors: SensorMapping = field(default_factory=SensorMapping)
    irrigation_entity: str | None = None
    irrigation_flow_lpm: float | None = None
    notes: str = ""

    @property
    def area_m2(self) -> float:
        return (self.width_cm * self.length_cm) / 10_000


@dataclass(slots=True)
class Planting:
    id: str
    plant_id: str
    bed_id: str
    season: int
    layout: LayoutMode = LayoutMode.SINGLE
    x_cm: float = 0
    y_cm: float = 0
    width_cm: float = 30
    length_cm: float = 30
    count: int | None = None  # ``None`` = derive from spacing
    method: SowMethod = SowMethod.DIRECT_SOW
    status: PlantingStatus = PlantingStatus.PLANNED
    # User overrides for the planned dates (otherwise the scheduler decides).
    sow_date: date | None = None
    transplant_date: date | None = None
    # What actually happened.
    sown_on: date | None = None
    transplanted_on: date | None = None
    harvest_started_on: date | None = None
    finished_on: date | None = None
    succession_group: str | None = None
    succession_index: int = 0
    notes: str = ""


# --------------------------------------------------------------------------- #
# Tasks
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class TaskNote:
    at: datetime
    text: str
    author: str | None = None


@dataclass(slots=True)
class Recurrence:
    interval_days: int
    until: date | None = None


@dataclass(slots=True)
class Task:
    id: str
    type: TaskType
    title: str
    due: date
    # Stable key for generated tasks so regeneration is idempotent.
    key: str | None = None
    title_key: str | None = None
    title_params: dict[str, Any] = field(default_factory=dict)
    description: str = ""
    window_start: date | None = None
    window_end: date | None = None
    priority: TaskPriority = TaskPriority.NORMAL
    estimated_minutes: int = 10
    status: TaskStatus = TaskStatus.OPEN
    source: TaskSource = TaskSource.USER
    planting_id: str | None = None
    bed_id: str | None = None
    zone_id: str | None = None
    recurrence: Recurrence | None = None
    depends_on: list[str] = field(default_factory=list)
    completed_at: datetime | None = None
    notes: list[TaskNote] = field(default_factory=list)
    photos: list[str] = field(default_factory=list)
    postponed_count: int = 0
    original_due: date | None = None
    user_modified: bool = False
    created_at: datetime | None = None
    updated_at: datetime | None = None

    @property
    def is_open(self) -> bool:
        return self.status is TaskStatus.OPEN


# --------------------------------------------------------------------------- #
# Settings, history and the stored root document
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class RegionProfile:
    hemisphere: Hemisphere = Hemisphere.NORTH
    mode: Literal["usda", "preset", "custom"] = "preset"
    hardiness_zone: str | None = None
    preset: str | None = "nl_be"
    last_frost: str = "04-20"  # MM-DD, average last spring frost
    first_frost: str = "10-25"  # MM-DD, average first autumn frost
    frost_free: bool = False
    latitude: float | None = None
    time_zone: str | None = None


@dataclass(slots=True)
class NotificationSettings:
    persistent: bool = True
    notify_services: list[str] = field(default_factory=list)
    tts_entity: str | None = None
    tts_media_players: list[str] = field(default_factory=list)
    digest_time: str = "07:30"
    frost_alerts: bool = True
    heat_alerts: bool = True
    tts_frost_announcement: bool = False


@dataclass(slots=True)
class GardenSettings:
    region: RegionProfile = field(default_factory=RegionProfile)
    weather_entity: str | None = None
    outdoor_sensors: SensorMapping = field(default_factory=SensorMapping)
    language: str | None = None  # None = follow Home Assistant
    notifications: NotificationSettings = field(default_factory=NotificationSettings)
    sensor_stale_minutes: int = 360
    companion_radius_cm: float = 60.0
    root_zone_depth_mm: float = 200.0
    max_irrigation_mm: float = 20.0
    gdd_base_c: float = 10.0
    snap_cm: int = 10


@dataclass(slots=True)
class RotationRecord:
    bed_id: str
    season: int
    family: str
    plant_id: str | None = None
    source: Literal["planting", "manual"] = "manual"


@dataclass(slots=True)
class ClimateDay:
    day: date
    tmin: float | None = None
    tmax: float | None = None
    rain_mm: float | None = None


@dataclass(slots=True)
class GardenData:
    """Root document persisted with ``homeassistant.helpers.storage.Store``."""

    revision: int = 0
    settings: GardenSettings = field(default_factory=GardenSettings)
    zones: list[Zone] = field(default_factory=list)
    beds: list[GardenBed] = field(default_factory=list)
    plantings: list[Planting] = field(default_factory=list)
    tasks: list[Task] = field(default_factory=list)
    custom_plants: list[Plant] = field(default_factory=list)
    plant_overrides: dict[str, dict[str, Any]] = field(default_factory=dict)
    rotation_history: list[RotationRecord] = field(default_factory=list)
    climate_log: list[ClimateDay] = field(default_factory=list)
    # Dedupe keys of notifications already sent -> ISO date sent.
    notified: dict[str, str] = field(default_factory=dict)

    # -- lookups ---------------------------------------------------------- #
    def zone(self, zone_id: str | None) -> Zone | None:
        return next((z for z in self.zones if z.id == zone_id), None)

    def bed(self, bed_id: str | None) -> GardenBed | None:
        return next((b for b in self.beds if b.id == bed_id), None)

    def planting(self, planting_id: str | None) -> Planting | None:
        return next((p for p in self.plantings if p.id == planting_id), None)

    def task(self, task_id: str) -> Task | None:
        return next((t for t in self.tasks if t.id == task_id), None)

    def zone_of_bed(self, bed: GardenBed) -> Zone | None:
        return self.zone(bed.zone_id)

    def bed_sensors(self, bed: GardenBed) -> SensorMapping:
        zone = self.zone_of_bed(bed)
        merged = bed.sensors.merged_with(zone.sensors) if zone else bed.sensors
        if zone is None or zone.type is ZoneType.OUTDOOR:
            merged = merged.merged_with(self.settings.outdoor_sensors)
        return merged


# --------------------------------------------------------------------------- #
# Runtime snapshots (not persisted)
# --------------------------------------------------------------------------- #
@dataclass(slots=True)
class ForecastPoint:
    at: datetime
    temperature: float | None = None
    templow: float | None = None
    precipitation: float | None = None
    precipitation_probability: float | None = None
    humidity: float | None = None
    wind_speed: float | None = None  # km/h, HA default for metric
    cloud_coverage: float | None = None
    condition: str | None = None


@dataclass(slots=True)
class WeatherSnapshot:
    available: bool = False
    fetched_at: datetime | None = None
    temperature: float | None = None
    humidity: float | None = None
    condition: str | None = None
    hourly: list[ForecastPoint] = field(default_factory=list)
    daily: list[ForecastPoint] = field(default_factory=list)
    error: str | None = None


@dataclass(slots=True)
class SensorReading:
    entity_id: str
    value: float | None
    last_updated: datetime | None = None
    stale: bool = False

    @property
    def usable(self) -> float | None:
        return None if self.stale else self.value


@dataclass(slots=True)
class SensorSnapshot:
    """Resolved sensor values for a bed (zone fallbacks already applied)."""

    soil_moisture: SensorReading | None = None
    soil_temperature: SensorReading | None = None
    air_temperature: SensorReading | None = None
    air_humidity: SensorReading | None = None
    light: SensorReading | None = None
    rain: SensorReading | None = None

    @staticmethod
    def value(reading: SensorReading | None) -> float | None:
        return reading.usable if reading else None
