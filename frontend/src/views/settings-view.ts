import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { Bed, HomeAssistant, PlanDoc, SensorMapping, Settings, Snapshot, Zone } from "../types";
import { download, formatDate } from "../util/garden";
import "../components/info";

const PRESETS = ["nl_be", "uk_south", "uk_north", "de_central", "fr_north", "scandinavia_south", "mediterranean", "au_melbourne", "nz_christchurch", "za_highveld"];
const PRESET_LABEL: Record<string, string> = {
  nl_be: "Nederland / Vlaanderen", uk_south: "UK (south)", uk_north: "UK (north)", de_central: "Deutschland (Mitte)",
  fr_north: "France (nord)", scandinavia_south: "Scandinavia (south)", mediterranean: "Mediterranean",
  au_melbourne: "Australia – Melbourne", nz_christchurch: "New Zealand – Christchurch", za_highveld: "South Africa – Highveld",
};
const ZONES_USDA = Array.from({ length: 13 }, (_, i) => [`${i + 1}a`, `${i + 1}b`]).flat();

type SensorKey = keyof SensorMapping;
const SENSOR_FILTER: Record<SensorKey, { domains: string[]; deviceClass?: string }> = {
  soil_moisture: { domains: ["sensor"], deviceClass: "moisture" },
  soil_temperature: { domains: ["sensor"], deviceClass: "temperature" },
  air_temperature: { domains: ["sensor"], deviceClass: "temperature" },
  air_humidity: { domains: ["sensor"], deviceClass: "humidity" },
  light: { domains: ["sensor"], deviceClass: "illuminance" },
  rain: { domains: ["sensor", "binary_sensor"] },
  par: { domains: ["sensor"] },
  ec: { domains: ["sensor"], deviceClass: "conductivity" },
  npk_n: { domains: ["sensor"] },
  npk_p: { domains: ["sensor"] },
  npk_k: { domains: ["sensor"] },
  leaf_wetness: { domains: ["sensor", "binary_sensor"] },
};
const GOALS = ["fresh", "storage", "herbs", "pollinators", "winter", "perennials", "easy"];

@customElement("hl-settings-view")
export class SettingsView extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property({ type: Boolean }) admin = true;
  @state() private busy = false;

  static styles = [
    shared,
    css`
      .sections { display: grid; grid-template-columns: repeat(auto-fit, minmax(380px, 1fr)); gap: var(--hl-s4); align-items: start; }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .item { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); display: flex; flex-direction: column; gap: var(--hl-s2); background: var(--hl-surface-2); }
      .item h4 { display: flex; align-items: center; gap: var(--hl-s2); }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
    `,
  ];

  // -- helpers ----------------------------------------------------------- //
  private entityOptions(key: SensorKey | "weather" | "irrigation" | "tts" | "media_player" | "vent" | "shade" | "pump"): string[] {
    const states = Object.values(this.hass?.states ?? {});
    const filter =
      key === "weather" ? { domains: ["weather"] }
      : key === "irrigation" ? { domains: ["switch", "valve"] }
      : key === "tts" ? { domains: ["tts"] }
      : key === "media_player" ? { domains: ["media_player"] }
      : key === "vent" ? { domains: ["cover", "switch", "fan"] }
      : key === "shade" ? { domains: ["cover", "switch"] }
      : key === "pump" ? { domains: ["switch"] }
      : SENSOR_FILTER[key];
    return states
      .filter((s) => filter.domains.includes(s.entity_id.split(".")[0]))
      .filter((s) => !("deviceClass" in filter) || !filter.deviceClass || s.attributes.device_class === filter.deviceClass)
      .map((s) => s.entity_id)
      .sort();
  }

  private entityInput(id: string, key: Parameters<SettingsView["entityOptions"]>[0], value: string | null | undefined, onChange: (v: string | null) => void, label: string): TemplateResult {
    const listId = `list-${key}`;
    const st = value ? this.hass?.states[value] : undefined;
    return html`<label class="field">${label}
      <input list=${listId} .value=${value ?? ""} placeholder=${`${({ weather: "weather", irrigation: "switch", tts: "tts", media_player: "media_player", vent: "cover" } as Record<string, string>)[key] ?? "sensor"}.…`} ?disabled=${!this.admin} id=${id}
        aria-invalid=${value && !st ? "true" : "false"}
        @change=${(e: Event) => onChange((e.target as HTMLInputElement).value.trim() || null)} />
      ${value ? html`<span class="state">${st ? `${st.state} ${(st.attributes.unit_of_measurement as string) ?? ""}` : "⚠ not found"}</span>` : nothing}
    </label>`;
  }

  private datalists(): TemplateResult {
    const keys = ["soil_moisture", "soil_temperature", "air_temperature", "air_humidity", "light", "rain", "par", "ec", "npk_n", "npk_p", "npk_k",
      "leaf_wetness", "weather", "irrigation", "tts", "media_player", "vent", "shade", "pump"] as const;
    return html`${keys.map((k) => html`<datalist id=${`list-${k}`}>${this.entityOptions(k).map((e) => html`<option value=${e}></option>`)}</datalist>`)}`;
  }

  private async saveSettings(patch: Partial<Settings> | Record<string, unknown>): Promise<void> {
    this.busy = true;
    try {
      await this.api.saveSettings(patch);
      this.toast(this.t("settings.saved"));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    } finally {
      this.busy = false;
    }
  }

  private async savePlan(mutate: (doc: PlanDoc) => void): Promise<void> {
    const doc: PlanDoc = structuredClone({ zones: this.snapshot.zones, beds: this.snapshot.beds, plantings: this.snapshot.plantings, features: this.snapshot.features ?? [] });
    mutate(doc);
    try {
      await this.api.savePlan(doc, this.snapshot.revision);
      this.toast(this.t("settings.saved"));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    }
  }

  private toast(message: string): void {
    this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message }, bubbles: true, composed: true }));
  }

  // -- sections ---------------------------------------------------------- //
  private renderRegion(): TemplateResult {
    const r = this.snapshot.settings.region;
    const a = this.snapshot.analysis?.anchors;
    const set = (patch: Partial<Settings["region"]>) => this.saveSettings({ region: patch });
    return html`<section class="card stack" aria-labelledby="s-region">
      <h2 id="s-region">${this.t("settings.region")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.hemisphere")}
          <select ?disabled=${!this.admin} @change=${(e: Event) => set({ hemisphere: (e.target as HTMLSelectElement).value as "north" | "south" })}>
            ${(["north", "south"] as const).map((h) => html`<option value=${h} ?selected=${r.hemisphere === h}>${this.t(`settings.hemisphere.${h}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("settings.mode")}
          <select ?disabled=${!this.admin} @change=${(e: Event) => set({ mode: (e.target as HTMLSelectElement).value as Settings["region"]["mode"] })}>
            ${(["preset", "usda", "custom"] as const).map((m) => html`<option value=${m} ?selected=${r.mode === m}>${this.t(`settings.mode.${m}`)}</option>`)}
          </select></label>
        ${r.mode === "preset" ? html`<label class="field full">${this.t("settings.preset")}
          <select ?disabled=${!this.admin} @change=${(e: Event) => set({ preset: (e.target as HTMLSelectElement).value })}>
            ${PRESETS.map((p) => html`<option value=${p} ?selected=${r.preset === p}>${PRESET_LABEL[p]}</option>`)}</select></label>` : nothing}
        ${r.mode === "usda" ? html`<label class="field full">${this.t("settings.zone")}
          <select ?disabled=${!this.admin} @change=${(e: Event) => set({ hardiness_zone: (e.target as HTMLSelectElement).value })}>
            ${ZONES_USDA.map((z) => html`<option value=${z} ?selected=${r.hardiness_zone === z}>${z}</option>`)}</select></label>` : nothing}
        ${r.mode === "custom" ? html`
          <label class="field">${this.t("settings.last_frost")}<input pattern="\\d{2}-\\d{2}" .value=${r.last_frost} ?disabled=${!this.admin}
            @change=${(e: Event) => (e.target as HTMLInputElement).checkValidity() && set({ last_frost: (e.target as HTMLInputElement).value })} /></label>
          <label class="field">${this.t("settings.first_frost")}<input pattern="\\d{2}-\\d{2}" .value=${r.first_frost} ?disabled=${!this.admin}
            @change=${(e: Event) => (e.target as HTMLInputElement).checkValidity() && set({ first_frost: (e.target as HTMLInputElement).value })} /></label>` : nothing}
      </div>
      ${a ? html`<p class="small muted">${this.t("settings.frost_dates_now", { last: formatDate(a.last_frost, this.lang, { day: "numeric", month: "long" }), first: formatDate(a.first_frost, this.lang, { day: "numeric", month: "long", year: "numeric" }) })}</p>` : nothing}
    </section>`;
  }

  private renderWeather(): TemplateResult {
    const s = this.snapshot.settings;
    return html`<section class="card stack" aria-labelledby="s-weather">
      <h2 id="s-weather">${this.t("settings.weather")}</h2>
      ${this.entityInput("w", "weather", s.weather_entity, (v) => this.saveSettings({ weather_entity: v }), this.t("settings.weather_entity"))}
      ${this.entityInput("ot", "air_temperature", s.outdoor_sensors.air_temperature, (v) => this.saveSettings({ outdoor_sensors: { air_temperature: v } }), this.t("settings.outdoor_temp"))}
      ${this.entityInput("rn", "rain", s.outdoor_sensors.rain, (v) => this.saveSettings({ outdoor_sensors: { rain: v } }), this.t("settings.rain"))}
      ${this.entityInput("oh", "air_humidity", s.outdoor_sensors.air_humidity, (v) => this.saveSettings({ outdoor_sensors: { air_humidity: v } }), this.t("settings.sensor.air_humidity"))}
      ${this.entityInput("lw", "leaf_wetness", s.outdoor_sensors.leaf_wetness, (v) => this.saveSettings({ outdoor_sensors: { leaf_wetness: v } }), this.t("settings.sensor.leaf_wetness"))}
      <label class="field check"><input type="checkbox" .checked=${Boolean(s.open_meteo)} ?disabled=${!this.admin}
        @change=${(e: Event) => this.saveSettings({ open_meteo: (e.target as HTMLInputElement).checked })} />${this.t("settings.open_meteo")}</label>
      <p class="xs muted">${this.t("settings.open_meteo_hint")}</p>
      <label class="field">${this.t("settings.elevation")}<input type="number" step="1" .value=${String(s.elevation_m ?? "")} ?disabled=${!this.admin}
        @change=${(e: Event) => this.saveSettings({ elevation_m: (e.target as HTMLInputElement).value === "" ? null : Number((e.target as HTMLInputElement).value) })} /></label>
      ${this.snapshot.weather.error ? html`<p class="small" style="color:var(--hl-warning)">⚠ ${this.snapshot.weather.error}</p>` : nothing}
    </section>`;
  }

  private renderZones(): TemplateResult {
    const setZone = (id: string, patch: (z: Zone) => void) => this.savePlan((doc) => patch(doc.zones.find((z) => z.id === id)!));
    return html`<section class="card stack" aria-labelledby="s-zones">
      <h2 id="s-zones">${this.t("settings.zones")}</h2>
      ${this.snapshot.zones.map((z) => html`<div class="item">
        <h4><ha-icon icon=${z.type === "outdoor" ? "mdi:tree-outline" : "mdi:greenhouse"}></ha-icon>${z.name}<span class="chip">${this.t(`settings.zone_type.${z.type}`)}</span></h4>
        <div class="form-grid">
          ${(["air_temperature", "air_humidity", "light"] as SensorKey[]).map((k) =>
            this.entityInput(`${z.id}-${k}`, k, z.sensors[k], (v) => setZone(z.id, (zz) => (zz.sensors[k] = v)), this.t(`settings.sensor.${k}`)))}
          ${this.entityInput(`${z.id}-lw`, "leaf_wetness", z.sensors.leaf_wetness, (v) => setZone(z.id, (zz) => (zz.sensors.leaf_wetness = v)), this.t("settings.sensor.leaf_wetness"))}
          ${this.entityInput(`${z.id}-par`, "par", z.sensors.par, (v) => setZone(z.id, (zz) => (zz.sensors.par = v)), this.t("settings.sensor.par"))}
          ${z.type !== "outdoor" ? html`
            ${this.entityInput(`${z.id}-vent`, "vent", z.vent_entity, (v) => setZone(z.id, (zz) => (zz.vent_entity = v)), this.t("settings.vent"))}
            ${this.entityInput(`${z.id}-shade`, "shade", z.shade_entity, (v) => setZone(z.id, (zz) => (zz.shade_entity = v)), this.t("settings.shade_entity"))}
            <label class="field">${this.t("settings.climate_control")}
              <select ?disabled=${!this.admin} @change=${(e: Event) => setZone(z.id, (zz) => (zz.climate_control = (e.target as HTMLSelectElement).value as Zone["climate_control"]))}>
                ${(["off", "advise", "auto"] as const).map((m) => html`<option value=${m} ?selected=${(z.climate_control ?? "advise") === m}>${this.t(`settings.climate_control.${m}`)}</option>`)}
              </select></label>
            <label class="field check"><input type="checkbox" .checked=${Boolean(z.microclimate.thermal_mass)} ?disabled=${!this.admin}
              @change=${(e: Event) => setZone(z.id, (zz) => (zz.microclimate.thermal_mass = (e.target as HTMLInputElement).checked))} />${this.t("settings.thermal_mass")}</label>` : nothing}
          <label class="field check"><input type="checkbox" .checked=${Boolean(z.microclimate.wall_heat)} ?disabled=${!this.admin}
            @change=${(e: Event) => setZone(z.id, (zz) => (zz.microclimate.wall_heat = (e.target as HTMLInputElement).checked))} />${this.t("settings.wall_heat")}</label>
          <label class="field check"><input type="checkbox" .checked=${z.microclimate.heated} ?disabled=${!this.admin}
            @change=${(e: Event) => setZone(z.id, (zz) => (zz.microclimate.heated = (e.target as HTMLInputElement).checked))} />${this.t("settings.heated")}</label>
          ${z.microclimate.heated ? html`<label class="field">${this.t("settings.min_heating")}<input type="number" step="0.5" .value=${String(z.microclimate.min_heating_temp_c ?? 5)}
            @change=${(e: Event) => setZone(z.id, (zz) => (zz.microclimate.min_heating_temp_c = Number((e.target as HTMLInputElement).value)))} /></label>` : nothing}
        </div>
      </div>`)}
    </section>`;
  }

  private renderBeds(): TemplateResult {
    const setBed = (id: string, patch: (b: Bed) => void) => this.savePlan((doc) => patch(doc.beds.find((b) => b.id === id)!));
    return html`<section class="card stack" aria-labelledby="s-beds">
      <h2 id="s-beds">${this.t("settings.beds")}</h2>
      ${this.snapshot.beds.map((b) => html`<div class="item">
        <h4><ha-icon icon="mdi:sprout-outline"></ha-icon>${b.name}<span class="chip">${Math.round(b.width_cm)} × ${Math.round(b.length_cm)} cm</span></h4>
        <div class="form-grid">
          ${(["soil_moisture", "soil_temperature", "ec", "npk_n", "npk_p", "npk_k"] as SensorKey[]).map((k) =>
            this.entityInput(`${b.id}-${k}`, k, b.sensors[k], (v) => setBed(b.id, (bb) => (bb.sensors[k] = v)), this.t(`settings.sensor.${k}`)))}
          ${this.entityInput(`${b.id}-irr`, "irrigation", b.irrigation_entity, (v) => setBed(b.id, (bb) => (bb.irrigation_entity = v)), this.t("settings.irrigation"))}
          <label class="field">${this.t("settings.flow")}<input type="number" min="0" step="0.1" .value=${String(b.irrigation_flow_lpm ?? "")} ?disabled=${!this.admin}
            @change=${(e: Event) => setBed(b.id, (bb) => (bb.irrigation_flow_lpm = Number((e.target as HTMLInputElement).value) || null))} /></label>
        </div>
      </div>`)}
    </section>`;
  }

  private renderIrrigation(): TemplateResult {
    const cfg = this.snapshot.settings.irrigation ?? {
      mode: "advise", pump_entity: null, start_time: "06:00", max_runtime_min: 30, frost_lockout_c: 2, rain_skip_mm: 3, pump_lead_s: 3,
    };
    const set = (patch: Record<string, unknown>) => this.saveSettings({ irrigation: patch });
    const num = (key: string, label: string, step = 1, min = 0, max = 999) => html`<label class="field">${label}
      <input type="number" step=${step} min=${min} max=${max} .value=${String((cfg as unknown as Record<string, number>)[key])}
        @change=${(e: Event) => set({ [key]: Number((e.target as HTMLInputElement).value) })} /></label>`;
    const valves = this.snapshot.beds.filter((b) => b.irrigation_entity).length;
    return html`<section class="card stack" aria-labelledby="s-irrigation">
      <h2 id="s-irrigation">${this.t("settings.irrigation_hw")} <hl-info term="frost_lockout" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field full">${this.t("settings.irrigation_mode")}
          <select @change=${(e: Event) => set({ mode: (e.target as HTMLSelectElement).value })}>
            ${(["off", "advise", "auto"] as const).map((m) => html`<option value=${m} ?selected=${cfg.mode === m}>${this.t(`settings.irrigation_mode.${m}`)}</option>`)}
          </select></label>
        ${this.entityInput("pump", "pump", cfg.pump_entity, (v) => set({ pump_entity: v }), this.t("settings.pump"))}
        <label class="field">${this.t("settings.start_time")}<input type="time" .value=${cfg.start_time}
          @change=${(e: Event) => set({ start_time: (e.target as HTMLInputElement).value })} /></label>
        ${num("max_runtime_min", this.t("settings.max_runtime"), 1, 1, 180)}
        ${num("frost_lockout_c", this.t("settings.frost_lockout"), 0.5, -5, 10)}
        ${num("rain_skip_mm", this.t("settings.rain_skip"), 0.5, 0, 30)}
        ${num("pump_lead_s", this.t("settings.pump_lead"), 0.5, 0, 30)}
      </div>
      <p class="xs muted">${this.t("settings.irrigation_hint", { n: valves })}</p>
    </section>`;
  }

  private renderResources(): TemplateResult {
    const s = this.snapshot.settings;
    const r = s.resources ?? { household_size: 2, hours_per_week: 3, water_liters_per_week: null, compost_kg: null, irrigation: false, goals: ["fresh", "herbs"], wanted: [], excluded: [] };
    const set = (patch: Record<string, unknown>) => this.saveSettings({ resources: patch });
    const toggleGoal = (g: string) => set({ goals: r.goals.includes(g) ? r.goals.filter((x) => x !== g) : [...r.goals, g] });
    return html`<section class="card stack" aria-labelledby="s-resources">
      <h2 id="s-resources">${this.t("settings.resources")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(r.household_size)}
          @change=${(e: Event) => set({ household_size: Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(r.hours_per_week)}
          @change=${(e: Event) => set({ hours_per_week: Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" .value=${String(r.water_liters_per_week ?? "")}
          @change=${(e: Event) => set({ water_liters_per_week: (e.target as HTMLInputElement).value === "" ? null : Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" .value=${String(r.compost_kg ?? "")}
          @change=${(e: Event) => set({ compost_kg: (e.target as HTMLInputElement).value === "" ? null : Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field check full"><input type="checkbox" .checked=${r.irrigation}
          @change=${(e: Event) => set({ irrigation: (e.target as HTMLInputElement).checked })} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}>
        ${GOALS.map((g) => html`<button class="chip ${r.goals.includes(g) ? "active" : ""}" aria-pressed=${String(r.goals.includes(g))} @click=${() => toggleGoal(g)}>${this.t(`autofill.goal.${g}`)}</button>`)}
      </div>
      <label class="field check"><input type="checkbox" .checked=${s.maintenance_tasks ?? true}
        @change=${(e: Event) => this.saveSettings({ maintenance_tasks: (e.target as HTMLInputElement).checked })} />${this.t("settings.maintenance_tasks")}</label>
    </section>`;
  }

  private renderNotifications(): TemplateResult {
    const n = this.snapshot.settings.notifications;
    const set = (patch: Partial<Settings["notifications"]>) => this.saveSettings({ notifications: patch });
    const list = (v: string) => v.split(",").map((s) => s.trim()).filter(Boolean);
    const notifyServices = Object.keys(this.hass?.services?.notify ?? {}).map((s) => `notify.${s}`);
    return html`<section class="card stack" aria-labelledby="s-notify">
      <h2 id="s-notify">${this.t("settings.notifications")}</h2>
      <label class="field check"><input type="checkbox" .checked=${n.persistent} @change=${(e: Event) => set({ persistent: (e.target as HTMLInputElement).checked })} />${this.t("settings.persistent")}</label>
      <label class="field">${this.t("settings.notify_services")}
        <input list="notify-services" .value=${n.notify_services.join(", ")} @change=${(e: Event) => set({ notify_services: list((e.target as HTMLInputElement).value) })} />
        <datalist id="notify-services">${notifyServices.map((s) => html`<option value=${s}></option>`)}</datalist></label>
      ${this.entityInput("tts", "tts", n.tts_entity, (v) => set({ tts_entity: v }), this.t("settings.tts"))}
      <label class="field">${this.t("settings.tts_players")}<input list="list-media_player" .value=${n.tts_media_players.join(", ")}
        @change=${(e: Event) => set({ tts_media_players: list((e.target as HTMLInputElement).value) })} /></label>
      <div class="form-grid">
        <label class="field">${this.t("settings.digest")}<input type="time" .value=${n.digest_time} @change=${(e: Event) => set({ digest_time: (e.target as HTMLInputElement).value })} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${n.frost_alerts} @change=${(e: Event) => set({ frost_alerts: (e.target as HTMLInputElement).checked })} />${this.t("settings.frost_alerts")}</label>
        <label class="field check"><input type="checkbox" .checked=${n.heat_alerts} @change=${(e: Event) => set({ heat_alerts: (e.target as HTMLInputElement).checked })} />${this.t("settings.heat_alerts")}</label>
        <label class="field check full"><input type="checkbox" .checked=${n.tts_frost_announcement} @change=${(e: Event) => set({ tts_frost_announcement: (e.target as HTMLInputElement).checked })} />${this.t("settings.tts_frost")}</label>
      </div>
      <h3>${this.t("settings.reminders")}</h3>
      <div class="form-grid">
        <label class="field check"><input type="checkbox" .checked=${n.overdue_reminders ?? true} @change=${(e: Event) => set({ overdue_reminders: (e.target as HTMLInputElement).checked })} />${this.t("settings.overdue_reminders")}</label>
        <label class="field">${this.t("settings.overdue_time")}<input type="time" .value=${n.overdue_time ?? "18:30"} @change=${(e: Event) => set({ overdue_time: (e.target as HTMLInputElement).value })} /></label>
        <label class="field">${this.t("settings.overdue_after")}<input type="number" min="0" max="14" .value=${String(n.overdue_after_days ?? 1)} @change=${(e: Event) => set({ overdue_after_days: Number((e.target as HTMLInputElement).value) })} /></label>
        <span></span>
        <label class="field check"><input type="checkbox" .checked=${n.weekly_plan ?? true} @change=${(e: Event) => set({ weekly_plan: (e.target as HTMLInputElement).checked })} />${this.t("settings.weekly_plan")}</label>
        <label class="field">${this.t("settings.weekly_day")}<select @change=${(e: Event) => set({ weekly_plan_weekday: Number((e.target as HTMLSelectElement).value) })}>
          ${[0, 1, 2, 3, 4, 5, 6].map((d) => html`<option value=${d} ?selected=${(n.weekly_plan_weekday ?? 6) === d}>${new Date(2024, 0, 1 + d).toLocaleDateString(this.lang === "nl" ? "nl-BE" : "en-GB", { weekday: "long" })}</option>`)}
        </select></label>
        <label class="field">${this.t("settings.weekly_time")}<input type="time" .value=${n.weekly_plan_time ?? "19:00"} @change=${(e: Event) => set({ weekly_plan_time: (e.target as HTMLInputElement).value })} /></label>
      </div>
      <label class="field check"><input type="checkbox" .checked=${this.snapshot.settings.weather_aware_scheduling ?? true}
        @change=${(e: Event) => this.saveSettings({ weather_aware_scheduling: (e.target as HTMLInputElement).checked })} />${this.t("settings.weather_aware")}</label>
      <p class="xs muted">${this.t("settings.weather_aware_hint")}</p>
    </section>`;
  }

  private renderGeneral(): TemplateResult {
    const s = this.snapshot.settings;
    return html`<section class="card stack" aria-labelledby="s-general">
      <h2 id="s-general">${this.t("settings.general")}</h2>
      <div class="form-grid">
        <label class="field">${this.t("settings.language")}
          <select @change=${(e: Event) => this.saveSettings({ language: (e.target as HTMLSelectElement).value || null })}>
            <option value="" ?selected=${!s.language}>${this.t("settings.language.auto")}</option>
            <option value="en" ?selected=${s.language === "en"}>English</option>
            <option value="nl" ?selected=${s.language === "nl"}>Nederlands</option>
          </select></label>
        <label class="field">${this.t("settings.units")}<input disabled .value=${this.t("settings.units_metric")} /></label>
        <label class="field">${this.t("settings.snap")}<input type="number" min="1" max="50" .value=${String(s.snap_cm)}
          @change=${(e: Event) => this.saveSettings({ snap_cm: Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field">${this.t("settings.radius")}<input type="number" min="10" max="300" step="5" .value=${String(s.companion_radius_cm)}
          @change=${(e: Event) => this.saveSettings({ companion_radius_cm: Number((e.target as HTMLInputElement).value) })} /></label>
      </div>
      <h3>${this.t("settings.data")}</h3>
      <div class="row wrap">
        <button class="btn small" @click=${() => this.export("json")}><ha-icon icon="mdi:code-json"></ha-icon>${this.t("planner.export_json")}</button>
        <button class="btn small" @click=${() => this.export("yaml")}><ha-icon icon="mdi:code-braces"></ha-icon>${this.t("planner.export_yaml")}</button>
      </div>
    </section>`;
  }

  private async export(format: "json" | "yaml"): Promise<void> {
    const res = await this.api.exportPlan(format, true);
    download(res.filename, res.content, format === "json" ? "application/json" : "application/yaml");
  }

  render(): TemplateResult {
    return html`
      ${this.admin ? nothing : html`<p class="small" style="color:var(--hl-warning);margin-bottom:12px">${this.t("common.admin_only")}</p>`}
      <fieldset ?disabled=${!this.admin || this.busy} style="border:0;padding:0;margin:0">
        <div class="sections">
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderIrrigation()}
          ${this.renderResources()} ${this.renderNotifications()} ${this.renderGeneral()}
        </div>
      </fieldset>
      ${this.datalists()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-settings-view": SettingsView;
  }
}
