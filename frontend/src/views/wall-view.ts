/**
 * Wall screen (kiosk): one calm, large screen for a tablet in the kitchen or
 * the shed - the time, the weather, today's garden tasks with big tick-boxes,
 * the beds' moisture and anything that needs attention. No menus; it dims at
 * night. Open it from Today or at /hortulus/wall.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Translate } from "../i18n";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { shared } from "../styles/tokens";
import type { FamilyInfo, HomeAssistant, Plant, Snapshot, Task } from "../types";
import { celebrateAt } from "../util/celebrate";
import { familyColor, formatDate, sortTasks } from "../util/garden";
import { weatherGlyph } from "./weather-view";

@customElement("hl-wall-view")
export class WallView extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ attribute: false }) t!: Translate;
  @property({ attribute: false }) plants = new Map<string, Plant>();
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property() lang = "en";
  @state() private now = new Date();
  private timer?: number;

  static styles = [
    shared,
    css`
      :host { display: block; min-height: 100vh; padding: 28px 36px; box-sizing: border-box; color: var(--hl-text);
        background: radial-gradient(900px 500px at 0% 0%, color-mix(in srgb, var(--hl-leaf-100) 80%, transparent), transparent 70%), var(--hl-bg); }
      :host([night]) { filter: brightness(0.78) saturate(0.85); }
      .top { display: flex; align-items: center; gap: 32px; flex-wrap: wrap; }
      .clock { font-family: var(--hl-font-serif); font-size: clamp(64px, 9vw, 128px); font-weight: 700; line-height: 0.95; font-variant-numeric: tabular-nums; letter-spacing: -0.02em; }
      .date { font-family: var(--hl-font-serif); font-style: italic; font-size: clamp(18px, 2vw, 28px); color: var(--hl-text-muted); }
      .weather { display: flex; align-items: center; gap: 14px; margin-left: auto; }
      .weather .t { font-family: var(--hl-font-serif); font-size: clamp(44px, 5vw, 72px); font-weight: 700; line-height: 1; }
      .weather .c { font-size: 18px; color: var(--hl-text-muted); }
      .exit { position: fixed; top: 12px; right: 12px; opacity: 0.35; }
      .exit:hover { opacity: 1; }
      .grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; margin-top: 28px; }
      @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
      .panel { background: var(--hl-surface); border-radius: 24px; padding: 22px 26px; box-shadow: var(--hl-shadow-2), var(--hl-highlight); }
      .panel h2 { font-size: 26px; margin-bottom: 12px; }
      ul { list-style: none; margin: 0; padding: 0; }
      li { display: flex; align-items: center; gap: 16px; padding: 12px 0; border-top: 1px solid color-mix(in srgb, var(--hl-border) 60%, transparent); font-size: 20px; }
      li:first-child { border-top: 0; }
      .tick { width: 48px; height: 48px; border-radius: 50%; border: 2.5px solid var(--hl-primary); background: none; cursor: pointer; flex: none; }
      .tick:hover { background: var(--hl-leaf-100); }
      li small { display: block; font-size: 14px; color: var(--hl-text-muted); }
      .late small { color: var(--hl-danger); }
      .days { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
      .day { text-align: center; padding: 12px; border-radius: 16px; background: var(--hl-surface-2); }
      .day b { display: block; font-family: var(--hl-font-serif); font-size: 26px; }
      .beds { display: flex; flex-direction: column; gap: 12px; margin-top: 18px; }
      .bed { display: grid; grid-template-columns: 1fr 2fr 56px; gap: 12px; align-items: center; font-size: 17px; }
      .gauge { height: 12px; border-radius: 6px; background: var(--hl-surface-3); overflow: hidden; }
      .gauge span { display: block; height: 100%; border-radius: 6px; background: linear-gradient(90deg, #d98e57, #9cc58a, #4a90c8); }
      .alert { padding: 14px 18px; border-radius: 16px; font-size: 18px; font-weight: 600; margin-top: 14px;
        background: color-mix(in srgb, var(--hl-danger) 14%, var(--hl-surface)); color: var(--hl-danger); }
      .alert.frost { background: var(--hl-frost-100); color: var(--hl-info); }
      .empty { font-size: 20px; }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.timer = window.setInterval(() => (this.now = new Date()), 20_000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearInterval(this.timer);
  }

  protected updated(): void {
    const h = this.now.getHours();
    this.toggleAttribute("night", h >= 22 || h < 6);
  }

  private emit(name: string, detail?: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private plantIcon(task: Task): TemplateResult | typeof nothing {
    const planting = task.planting_id ? this.snapshot.plantings.find((p) => p.id === task.planting_id) : undefined;
    const plant = planting ? this.plants.get(planting.plant_id) : undefined;
    return plant ? glyphIcon(glyphFor(plant), plant.color || familyColor(this.families, plant.family), 34) : nothing;
  }

  render(): TemplateResult {
    const a = this.snapshot.analysis;
    const today = a?.today ?? "";
    const tasks = sortTasks(this.snapshot.tasks.filter((x) => x.status === "open" && x.due <= today)).slice(0, 8);
    const loc = this.lang === "nl" ? "nl-BE" : "en-GB";
    const wid = this.snapshot.settings.weather_entity;
    const w = wid ? this.hass.states[wid] : undefined;
    const beds = this.snapshot.beds.filter((b) => a?.beds[b.id]?.irrigation?.moisture != null);
    const st = this.snapshot.irrigation_status;
    return html`
      <button class="btn small ghost exit" @click=${() => this.emit("navigate", "dashboard")}>${this.t("wall.exit")}</button>
      <div class="top">
        <div>
          <div class="clock">${this.now.toLocaleTimeString(loc, { hour: "2-digit", minute: "2-digit" })}</div>
          <div class="date">${this.now.toLocaleDateString(loc, { weekday: "long", day: "numeric", month: "long" })} · ${this.snapshot.gardens?.find((g) => g.entry_id === this.snapshot.entry_id)?.title ?? "Hortulus"}</div>
        </div>
        ${w ? html`<div class="weather">${weatherGlyph(w.state, 96, this.now.getHours() >= 21 || this.now.getHours() < 6)}
          <div><div class="t">${w.attributes.temperature != null ? Math.round(Number(w.attributes.temperature)) : "–"}°</div>
            <div class="c">${this.t(`weather.cond.${w.state}`)}</div></div></div>` : nothing}
      </div>
      ${st?.leak ? html`<div class="alert">${this.t("valve.leak", { liters: st.leak.liters, minutes: st.leak.minutes })}</div>` : nothing}
      ${(st?.stuck ?? []).map((v) => html`<div class="alert">${this.t("valve.stuck", { what: v.what === "pump" ? this.t("valve.pump") : v.what, entity: v.entity_id })}</div>`)}
      ${a && (a.frost.level === "high" || a.frost.level === "moderate") ? html`<div class="alert frost">${this.t("dash.frost_risk")}: ${this.t(`risk.${a.frost.level}`)}</div>` : nothing}
      <div class="grid">
        <section class="panel">
          <h2>${this.t("dash.today_tasks")}</h2>
          ${tasks.length ? html`<ul>${tasks.map((task) => html`<li class=${task.due < today ? "late" : ""}>
            <button class="tick" aria-label=${this.t("task.complete")} @click=${(e: Event) => { celebrateAt(e.currentTarget as Element); this.emit("complete-task", task); }}></button>
            ${this.plantIcon(task)}
            <span>${task.title}<small>${task.due < today ? this.t("wall.late", { date: formatDate(task.due, this.lang) }) : `${task.estimated_minutes} min`}</small></span>
          </li>`)}</ul>` : html`<p class="empty muted">${this.t("dash.no_tasks")}</p>`}
        </section>
        <section class="panel">
          <h2>${this.t("dash.weather")}</h2>
          ${a?.outlook?.length ? html`<div class="days">${a.outlook.slice(0, 3).map((o) => html`<div class="day">
            <span class="small muted">${o.day === today ? this.t("common.today") : formatDate(o.day, this.lang, { weekday: "long" })}</span>
            <b>${o.tmax != null ? Math.round(o.tmax) : "–"}° <span class="muted" style="font-size:18px">${o.tmin != null ? Math.round(o.tmin) : "–"}°</span></b>
            <span class="small" style="color:var(--hl-water-500)">${o.rain_mm} mm</span></div>`)}</div>` : nothing}
          ${beds.length ? html`<div class="beds">${beds.map((b) => {
            const m = a!.beds[b.id].irrigation.moisture ?? 0;
            return html`<div class="bed"><span>${b.name}</span><span class="gauge"><span style=${`width:${Math.max(4, Math.min(100, m))}%`}></span></span><b>${Math.round(m)}%</b></div>`;
          })}</div>` : nothing}
          ${st?.running ? html`<p style="margin-top:14px;font-size:18px">💧 ${this.t("wall.watering", { bed: this.snapshot.beds.find((b) => b.id === st.bed_id)?.name ?? "" })}</p>` : nothing}
        </section>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-wall-view": WallView;
  }
}
