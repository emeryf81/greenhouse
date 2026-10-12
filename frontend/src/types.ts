// Mirrors custom_components/garden_manager/engine/models.py (serde.to_dict output).
// Keep both sides in sync - the websocket API sends these shapes verbatim.

export type ISODate = string; // "2026-04-20"
export type ISODateTime = string;

export type ZoneType = "outdoor" | "greenhouse" | "cold_frame" | "orchard" | "fruit" | "herbs" | "flowers";
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
  | "frost_protect" | "soil_prep" | "compost" | "green_manure" | "mulch" | "clean_greenhouse"
  | "winter_prep" | "plan_season" | "tool_care" | "soil_test" | "cut_back" | "divide"
  | "protect" | "clean" | "tie_in" | "thin_fruit" | "pollinate" | "check" | "make_feed" | "custom";
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
  par?: string | null;
  ec?: string | null;
  npk_n?: string | null;
  npk_p?: string | null;
  npk_k?: string | null;
  leaf_wetness?: string | null;
}

export interface Microclimate {
  shade_pct: number;
  wind: Wind;
  heated: boolean;
  min_heating_temp_c: number | null;
  night_offset_c: number | null;
  solar_gain_c: number | null;
  wall_heat?: boolean;
  thermal_mass?: boolean;
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
  shade_entity?: string | null;
  climate_control?: "off" | "advise" | "auto";
  shading_mode?: "auto" | "on" | "off";
}

export type FeatureType =
  | "path" | "compost" | "water_butt" | "shed" | "tree" | "hedge" | "trellis"
  | "terrace" | "lawn" | "flowerbed" | "fence" | "pond"
  | "house" | "driveway" | "street" | "parking" | "play" | "beehive" | "other";

export interface Feature {
  id: string;
  name: string;
  type: FeatureType;
  x_cm: number;
  y_cm: number;
  width_cm: number;
  length_cm: number;
  notes: string;
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
  /** Perennials: first season it is no longer in the ground (explicit removal). */
  removed_season?: number | null;
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
  category?: "vegetable" | "herb" | "flower" | "fruit";
  kc?: [number, number, number];
  npk?: [number, number, number];
  height_cm?: number;
  root_depth_cm?: number;
  plants_per_person?: number;
  yield_kg_m2?: number;
  deters?: string[];
  trap_for?: string[];
  allelopathic?: boolean;
  shade_tolerant?: boolean;
  harvest_windows?: Window[];
  years_to_bearing?: number;
  emoji?: string;
  icon?: string;
  color?: string;
  tips?: Record<string, string[]>;
  pollination?: "self" | "insects" | "wind" | "partner" | "none";
  source: "builtin" | "custom" | "override";
}

export interface FamilyInfo { en: string; nl: string; color: string }

export interface PairFinding {
  a: string;
  b: string;
  kind: "friend" | "enemy" | "overlap" | "same_family" | "pest_synergy" | "allelopathy" | "competition" | "shading";
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
  alternatives?: string[];
}

export interface CompatibilityReport {
  score: number;
  pairs: PairFinding[];
  rotation: RotationFinding[];
  out_of_bounds: string[];
  placement?: { planting: string; severity: string; key: string; params: Record<string, unknown> }[];
  timelines?: Record<string, Timeline>;
  suggestions?: Record<string, string[]>;
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
  kind: "frost" | "heat" | "dry" | "sensor_stale" | "forecast" | "disease" | "nutrients";
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
      kc?: number;
      nutrients?: NutrientBalance;
      taw_mm?: number | null;
      depletion_mm?: number | null;
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
      humidity?: number | null;
      disease?: DiseaseRisk;
      gdd_season?: number | null;
    }
  >;
  timelines: Record<string, Timeline>;
  advice: Record<string, { action: string; status: string; reasons: { key: string; params: Record<string, unknown> }[] }>;
  outlook: { day: ISODate; tmin: number | null; tmax: number | null; rain_mm: number; et0_mm: number | null; et0_method?: string | null }[];
  gdd: { season_total: number; base_c: number; days_counted: number; since: ISODate };
  alerts: Alert[];
  weather_available: boolean;
  phenology?: Record<string, Phenology>;
  et0_today?: number | null;
  et0_method?: string | null;
  gdd_today?: number | null;
}

export interface NutrientBalance {
  index: number | null;
  status: "unknown" | "deficient" | "balanced" | "excess";
  deficits: string[];
  excess: string[];
  source: "npk" | "ec" | "none";
}

export interface DiseaseRisk {
  level: RiskLevel;
  wet_hours: number;
  hutton_period: boolean;
  humidity_now: number | null;
  leaf_wet_now: boolean | null;
  reasons: string[];
}

export interface Phenology {
  planting_id: string;
  stage: "not_planted" | "establishing" | "vegetative" | "flowering" | "ripening" | "harvest" | "finished";
  progress: number;
  kc: number;
  gdd: number | null;
  gdd_target: number | null;
  harvest_estimate: ISODate | null;
  heat_stress_days: number;
  cold_stress_days: number;
}

export interface IrrigationSettings {
  mode: "off" | "advise" | "auto";
  pump_entity: string | null;
  start_time: string;
  max_runtime_min: number;
  frost_lockout_c: number;
  rain_skip_mm: number;
  pump_lead_s: number;
}

export interface Resources {
  household_size: number;
  hours_per_week: number;
  water_liters_per_week: number | null;
  compost_kg: number | null;
  irrigation: boolean;
  goals: string[];
  wanted: string[];
  excluded: string[];
  freedom?: "strict" | "balanced" | "free";
  respect_companions?: boolean;
  add_pollinators?: boolean;
  year_round?: boolean;
  allow_perennials?: boolean;
  match_zone_type?: boolean;
}

export interface IrrigationRun { bed_id: string; entity_id: string; minutes: number; mm: number; liters: number; capped: boolean }

export interface IrrigationPlan {
  runs: IrrigationRun[];
  skipped: Record<string, { key: string; params: Record<string, unknown> }>;
  reasons?: Record<string, string>;
  lockout: boolean;
  lockout_temp: number | null;
  total_minutes: number;
  running?: boolean;
}

export interface AutofillResult {
  plantings: Planting[];
  placements: { plant_id: string; bed_id: string; count: number; area_m2: number; reason: string; yield_kg: number;
    minutes_week: number; water_l_week: number; sowings: number }[];
  skipped: { plant_id: string; reason: string }[];
  warnings: { key: string; params: Record<string, unknown> }[];
  beds: string[];
  summary: { crops: number; plantings: number; yield_kg: number; minutes_week: number; water_l_week: number; compost_kg: number; fertilizer_g: number };
  season: number;
  revision: number;
}

export interface HandbookChapterMeta { id: string; order: number; title: string; summary: string; sections: string[] }
export interface GlossaryEntry { term: string; text: string; chapter: string }

export interface PrintOptions {
  document: "garden" | "zone" | "beds" | "tasks" | "season" | "blank" | "plants";
  page: "a4" | "a3" | "a5" | "letter" | "remarkable";
  landscape: boolean;
  color_mode: "color" | "eink" | "grayscale";
  season?: number | null;
  zone_id?: string | null;
  bed_ids?: string[] | null;
  days: number;
  notes: boolean;
  grid: boolean;
  labels: boolean;
  title?: string | null;
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
    overdue_reminders?: boolean;
    overdue_time?: string;
    overdue_after_days?: number;
    weekly_plan?: boolean;
    weekly_plan_weekday?: number;
    weekly_plan_time?: string;
  };
  weather_aware_scheduling?: boolean;
  sensor_stale_minutes: number;
  companion_radius_cm: number;
  root_zone_depth_mm: number;
  max_irrigation_mm: number;
  gdd_base_c: number;
  snap_cm: number;
  irrigation?: IrrigationSettings;
  resources?: Resources;
  open_meteo?: boolean;
  elevation_m?: number | null;
  maintenance_tasks?: boolean;
}

export interface ForecastPoint {
  at: ISODateTime;
  temperature: number | null;
  templow: number | null;
  precipitation: number | null;
  precipitation_probability: number | null;
  condition: string | null;
  humidity?: number | null;
  wind_speed?: number | null;
  cloud_coverage?: number | null;
}

export interface Snapshot {
  revision: number;
  lang: string;
  settings: Settings;
  zones: Zone[];
  beds: Bed[];
  plantings: Planting[];
  tasks: Task[];
  features?: Feature[];
  irrigation_log?: { bed_id: string; at: ISODateTime; mm: number; liters: number; minutes: number; source: string }[];
  irrigation_status?: { running: boolean; bed_id: string | null; ends_at: ISODateTime | null; last_error: string | null };
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

export interface PlanDoc { zones: Zone[]; beds: Bed[]; plantings: Planting[]; features: Feature[] }

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

// -- advice, Q&A and supplies (phase 3) ---------------------------------- //
export interface Suggestion {
  id: string;
  kind: string;
  severity: "warning" | "tip" | "info";
  title: string;
  text: string;
  plants: string[];
  zone_id: string | null;
  bed_id: string | null;
  planting_id: string | null;
  action: { type: string; plant_id?: string; bed_id?: string; planting_id?: string; feature?: string } | null;
  handbook: string | null;
}
export interface AdviceResult { suggestions: Suggestion[]; coverage: { months: string[][]; gaps: number[] } }
export interface QaTarget { id: string; name: string; planted?: boolean; category?: string }
export interface QaOptions { subjects: Record<string, string[]>; targets: Record<string, QaTarget[]> }
export interface QaAnswer {
  subject: string;
  problem: string;
  target: string | null;
  title: string;
  status: string[];
  facts: string[];
  causes: string[];
  actions: string[];
  remedies: string[];
  prevention: string[];
  tasks: { id: string; title: string; due: string }[];
  plants: string[];
  handbook: string | null;
}
export interface ShoppingItem { id: string; name: string; emoji: string; quantity: number; unit: string; reason: string; category: string }
export interface Supplies {
  tools: Record<string, { name: string; emoji: string; kind: string }>;
  task_tools: Record<string, string[]>;
  shopping: ShoppingItem[];
}
