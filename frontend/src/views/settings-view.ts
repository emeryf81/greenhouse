import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { Bed, HomeAssistant, PlanDoc, SensorMapping, Settings, Snapshot, Zone } from "../types";
import { download, formatDate } from "../util/garden";

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
};

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
  private entityOptions(key: SensorKey | "weather" | "irrigation" | "tts" | "media_player" | "vent"): string[] {
    const states = Object.values(this.hass?.states ?? {});
    const filter =
      key === "weather" ? { domains: ["weather"] }
      : key === "irrigation" ? { domains: ["switch", "valve"] }
      : key === "tts" ? { domains: ["tts"] }
      : key === "media_player" ? { domains: ["media_player"] }
      : key === "vent" ? { domains: ["cover", "switch", "fan"] }
      : SENSOR_FILTER[key];
    return states
      .filter((s) => filter.domains.includes(s.entity_id.split(".")[0]))
      .filter((s) => !("deviceClass" in filter) || !filter.deviceClass || s.attributes.device_class === filter.deviceClass)
      .map((s) => s.entity_id)
      .sort();
  }

  private entityInput(id: string, key: Parameters<SettingsView["entityOptions"]>[0], value: string | null, onChange: (v: string | null) => void, label: string): TemplateResult {
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
    const keys = ["soil_moisture", "soil_temperature", "air_temperature", "air_humidity", "light", "rain", "weather", "irrigation", "tts", "media_player", "vent"] as const;
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
    const doc: PlanDoc = structuredClone({ zones: this.snapshot.zones, beds: this.snapshot.beds, plantings: this.snapshot.plantings });
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
          ${z.type !== "outdoor" ? this.entityInput(`${z.id}-vent`, "vent", z.vent_entity, (v) => setZone(z.id, (zz) => (zz.vent_entity = v)), this.t("settings.vent")) : nothing}
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
          ${(["soil_moisture", "soil_temperature"] as SensorKey[]).map((k) =>
            this.entityInput(`${b.id}-${k}`, k, b.sensors[k], (v) => setBed(b.id, (bb) => (bb.sensors[k] = v)), this.t(`settings.sensor.${k}`)))}
          ${this.entityInput(`${b.id}-irr`, "irrigation", b.irrigation_entity, (v) => setBed(b.id, (bb) => (bb.irrigation_entity = v)), this.t("settings.irrigation"))}
          <label class="field">${this.t("settings.flow")}<input type="number" min="0" step="0.1" .value=${String(b.irrigation_flow_lpm ?? "")} ?disabled=${!this.admin}
            @change=${(e: Event) => setBed(b.id, (bb) => (bb.irrigation_flow_lpm = Number((e.target as HTMLInputElement).value) || null))} /></label>
        </div>
      </div>`)}
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
          ${this.renderRegion()} ${this.renderWeather()} ${this.renderZones()} ${this.renderBeds()} ${this.renderNotifications()} ${this.renderGeneral()}
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
