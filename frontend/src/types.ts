// Mirrors custom_components/garden_manager/engine/models.py (serde.to_dict output).
// Keep both sides in sync - the websocket API sends these shapes verbatim.

export type ISODate = string; // "2026-04-20"
export type ISODateTime = string;

export type ZoneType = "outdoor" | "greenhouse" | "cold_frame";
export type BedKind = "in_ground" | "raised" | "container";
export type SoilType = "sandy" | "loam" | "clay" | "silt" | "peat" | "chalk" | "potting_mix";
export type Wind = "sheltered" | "moderate" | "exposed";
export type LayoutMode = "single" | "block" | "row";
export type SowMethod = "indoor_sow" | "direct_sow" | "transplant";
export type PlantingStatus =
  | "planned" | "sown_indoors" | "sown" | "transplanted" | "harvesting" | "finished" | "failed";
export type TaskType =
  | "sow_indoor" | "sow_direct" | "harden_off" | "transplant" | "thin" | "stake" | "prune" | "pinch"
  | "earth_up" | "feed" | "water" | "weed" | "pest_check" | "harvest" | "ventilate" | "shade"
  | "frost_protect" | "custom";
export type TaskStatus = "open" | "done" | "skipped";
export type Priority = "low" | "normal" | "high" | "urgent";
export type RiskLevel = "none" | "low" | "moderate" | "high" | "unknown";
export type MoistureStatus = "dry" | "slightly_dry" | "optimal" | "wet" | "unknown";
export type Level = "low" | "medium" | "high";

export interface SensorMapping {
  soil_moisture: string | null;
  soil_temperature: string | null;
  air_temperature: string | null;
  air_humidity: string | null;
  light: string | null;
  rain: string | null;
}

export interface Microclimate {
  shade_pct: number;
  wind: Wind;
  heated: boolean;
  min_heating_temp_c: number | null;
  night_offset_c: number | null;
  solar_gain_c: number | null;
}

export interface Zone {
  id: string;
  name: string;
  type: ZoneType;
  x_cm: number;
  y_cm: number;
  width_cm: number;
  length_cm: number;
  microclimate: Microclimate;
  sensors: SensorMapping;
  vent_entity: string | null;
}

export interface Bed {
  id: string;
  name: string;
  zone_id: string;
  kind: BedKind;
  x_cm: number;
  y_cm: number;
  width_cm: number;
  length_cm: number;
  orientation_deg: number;
  soil: SoilType;
  shade_pct: number | null;
  sensors: SensorMapping;
  irrigation_entity: string | null;
  irrigation_flow_lpm: number | null;
  notes: string;
}

export interface Planting {
  id: string;
  plant_id: string;
  bed_id: string;
  season: number;
  layout: LayoutMode;
  x_cm: number;
  y_cm: number;
  width_cm: number;
  length_cm: number;
  count: number | null;
  method: SowMethod;
  status: PlantingStatus;
  sow_date: ISODate | null;
  transplant_date: ISODate | null;
  sown_on: ISODate | null;
  transplanted_on: ISODate | null;
  harvest_started_on: ISODate | null;
  finished_on: ISODate | null;
  succession_group: string | null;
  succession_index: number;
  notes: string;
}

export interface TaskNote { at: ISODateTime; text: string; author: string | null }

export interface Task {
  id: string;
  type: TaskType;
  title: string;
  due: ISODate;
  key: string | null;
  title_key: string | null;
  title_params: Record<string, unknown>;
  description: string;
  window_start: ISODate | null;
  window_end: ISODate | null;
  priority: Priority;
  estimated_minutes: number;
  status: TaskStatus;
  source: "generated" | "sensor" | "weather" | "user";
  planting_id: string | null;
  bed_id: string | null;
  zone_id: string | null;
  recurrence: { interval_days: number; until: ISODate | null } | null;
  depends_on: string[];
  completed_at: ISODateTime | null;
  notes: TaskNote[];
  photos: string[];
  postponed_count: number;
  original_due: ISODate | null;
  user_modified: boolean;
}

export interface Window { start_week: number; end_week: number; anchor: "last_frost" | "first_frost" }

export interface CompanionLink {
  plant: string;
  relation: "friend" | "enemy" | "neutral";
  reason: Record<string, string>;
  strength: number;
}

export interface CareRule {
  task: TaskType;
  start_day: number;
  interval_days: number | null;
  end_day: number | null;
  anchor: "planting" | "sow" | "transplant" | "harvest_start";
  minutes: number;
  notes: Record<string, string>;
}

export interface Plant {
  id: string;
  names: Record<string, string>;
  scientific_name: string;
  family: string;
  variety: string | null;
  habit: string;
  perennial: boolean;
  spacing_cm: number;
  row_spacing_cm: number;
  sowing_depth_cm: number;
  germination_days: [number, number];
  min_soil_temp_c: number;
  optimal_soil_temp_c: number;
  max_soil_temp_c: number | null;
  days_to_maturity: [number, number];
  maturity_from: "sow" | "transplant";
  harvest_duration_days: number;
  harvestable: boolean;
  continuous_harvest: boolean;
  harvest_interval_days: number | null;
  transplant_age_days: [number, number];
  sowing: { indoor_sow: Window[]; direct_sow: Window[]; transplant: Window[] };
  greenhouse: {
    suitability: "yes" | "no" | "conditional";
    min_night_c: number;
    max_day_c: number;
    season_extension_weeks: number;
    notes: Record<string, string>;
  };
  frost_tolerance: "tender" | "half_hardy" | "hardy" | "very_hardy";
  min_temp_c: number;
  max_temp_c: number;
  companions: CompanionLink[];
  rotation_years: number;
  pests: string[];
  diseases: string[];
  water_needs: Level;
  nutrient_needs: Level;
  feeding_interval_days: number | null;
  care: CareRule[];
  pruning_notes: Record<string, string>;
  thinning: boolean;
  succession_interval_days: number | null;
  gdd_base_c: number;
  gdd_to_maturity: number | null;
  tags: string[];
  source: "builtin" | "custom" | "override";
}

export interface FamilyInfo { en: string; nl: string; color: string }

export interface PairFinding {
  a: string;
  b: string;
  kind: "friend" | "enemy" | "overlap" | "same_family";
  severity: "info" | "warning" | "error";
  score: number;
  distance_cm: number;
  key: string;
  params: Record<string, unknown>;
}

export interface RotationFinding {
  planting: string;
  bed_id: string;
  family: string;
  conflicting_season: number;
  years_required: number;
  severity: "warning" | "error";
  key: string;
  params: Record<string, unknown>;
}

export interface CompatibilityReport {
  score: number;
  pairs: PairFinding[];
  rotation: RotationFinding[];
  out_of_bounds: string[];
  placement?: { planting: string; severity: string; key: string; params: Record<string, unknown> }[];
  timelines?: Record<string, Timeline>;
}

export interface Timeline {
  method: SowMethod;
  sow_window: { start: ISODate; end: ISODate } | null;
  sow_date: ISODate | null;
  transplant_window: { start: ISODate; end: ISODate } | null;
  transplant_date: ISODate | null;
  harden_off_date: ISODate | null;
  in_ground: ISODate;
  harvest_start: ISODate;
  harvest_end: ISODate;
  late: boolean;
}

export interface Irrigation {
  bed_id: string;
  action: "none" | "water" | "skip_rain_expected" | "check_manually";
  status: MoistureStatus;
  amount_mm: number;
  liters: number;
  duration_min: number | null;
  moisture: number | null;
  target_low: number | null;
  target_high: number | null;
  water_need: Level | null;
  etc_24h_mm: number | null;
  rain_24h_mm: number;
  rain_48h_mm: number;
  confidence: "high" | "medium" | "low";
  priority: Priority;
  reasons: string[];
}

export interface Reading { entity_id: string; value: number | null; last_updated: ISODateTime | null; stale: boolean }

export interface Frost {
  level: RiskLevel;
  min_temp_c: number | null;
  plant_level_min_c: number | null;
  min_at: ISODateTime | null;
  first_below_zero_at: ISODateTime | null;
  hours_below_zero: number;
  source: string;
}

export interface Alert {
  key: string;
  kind: "frost" | "heat" | "dry" | "sensor_stale" | "forecast";
  severity: "info" | "warning" | "critical";
  message_key: string;
  params: Record<string, unknown>;
  zone_id: string | null;
  bed_id: string | null;
}

export interface Analysis {
  computed_at: ISODateTime;
  today: ISODate;
  season: number;
  anchors: { last_frost: ISODate; first_frost: ISODate; frost_free: boolean };
  frost: Frost;
  beds: Record<
    string,
    {
      sensors: Record<string, Reading | null>;
      moisture_status: MoistureStatus;
      irrigation: Irrigation;
      active_plantings: string[];
      compatibility: CompatibilityReport;
      rotation: RotationFinding[];
    }
  >;
  zones: Record<
    string,
    {
      frost: Frost;
      greenhouse: {
        action: "none" | "ventilate" | "shade" | "close_up" | "heat";
        inside_now_c: number | null;
        forecast_max_c: number | null;
        forecast_min_c: number | null;
        limit_max_c: number | null;
        limit_min_c: number | null;
        limiting_plants: string[];
        reasons: string[];
      } | null;
      air_temperature: number | null;
    }
  >;
  timelines: Record<string, Timeline>;
  advice: Record<string, { action: string; status: string; reasons: { key: string; params: Record<string, unknown> }[] }>;
  outlook: { day: ISODate; tmin: number | null; tmax: number | null; rain_mm: number; et0_mm: number | null }[];
  gdd: { season_total: number; base_c: number; days_counted: number; since: ISODate };
  alerts: Alert[];
  weather_available: boolean;
}

export interface Settings {
  region: {
    hemisphere: "north" | "south";
    mode: "usda" | "preset" | "custom";
    hardiness_zone: string | null;
    preset: string | null;
    last_frost: string;
    first_frost: string;
    frost_free: boolean;
    latitude: number | null;
    time_zone: string | null;
  };
  weather_entity: string | null;
  outdoor_sensors: SensorMapping;
  language: string | null;
  notifications: {
    persistent: boolean;
    notify_services: string[];
    tts_entity: string | null;
    tts_media_players: string[];
    digest_time: string;
    frost_alerts: boolean;
    heat_alerts: boolean;
    tts_frost_announcement: boolean;
  };
  sensor_stale_minutes: number;
  companion_radius_cm: number;
  root_zone_depth_mm: number;
  max_irrigation_mm: number;
  gdd_base_c: number;
  snap_cm: number;
}

export interface ForecastPoint {
  at: ISODateTime;
  temperature: number | null;
  templow: number | null;
  precipitation: number | null;
  precipitation_probability: number | null;
  condition: string | null;
}

export interface Snapshot {
  revision: number;
  lang: string;
  settings: Settings;
  zones: Zone[];
  beds: Bed[];
  plantings: Planting[];
  tasks: Task[];
  analysis: Analysis | null;
  weather: {
    available: boolean;
    temperature: number | null;
    condition: string | null;
    fetched_at: ISODateTime | null;
    daily: ForecastPoint[];
    hourly: ForecastPoint[];
    error: string | null;
  };
}

export interface PlanDoc { zones: Zone[]; beds: Bed[]; plantings: Planting[] }

// Minimal subset of the Home Assistant frontend `hass` object we use.
export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  services: Record<string, Record<string, unknown>>;
  language: string;
  locale?: { language: string };
  themes?: { darkMode?: boolean };
  user?: { id: string; is_admin: boolean; name: string };
  connection: {
    sendMessagePromise<T>(msg: Record<string, unknown>): Promise<T>;
    subscribeMessage<T>(cb: (msg: T) => void, msg: Record<string, unknown>): Promise<() => Promise<void>>;
  };
  fetchWithAuth(path: string, init?: RequestInit): Promise<Response>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<unknown>;
}
