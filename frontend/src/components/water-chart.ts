// Watering history of one bed over the last days: soil moisture (line, from
// Home Assistant's recorder), water Hortulus gave (bars, from its own log) and
// rain (bars, daily maximum of the rain sensor, when there is one).
import { LitElement, css, html, nothing, svg, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import type { Bed, Snapshot } from "../types";
import { addDays, formatDate } from "../util/garden";

/** ``YYYY-MM-DD`` of a moment in the browser's (garden's) time zone. */
function localDay(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

interface Day { day: string; liters: number; mm: number; rain: number | null }

@customElement("hl-water-chart")
export class WaterChart extends LitElement {
  @property({ attribute: false }) bed!: Bed;
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property({ type: Number }) days = 14;
  @state() private moisture: { t: number; v: number }[] = [];
  @state() private rainByDay: Record<string, number> = {};
  @state() private loaded = false;
  private loadedFor = "";

  static styles = css`
    :host { display: block; }
    svg { width: 100%; max-width: 820px; height: auto; display: block; }
    .legend { display: flex; gap: 12px; flex-wrap: wrap; font-size: 11px; color: var(--hl-text-muted, #666); margin-top: 4px; }
    .legend span::before { content: ""; display: inline-block; width: 12px; height: 8px; border-radius: 2px; margin-right: 4px; background: var(--c); vertical-align: middle; }
    .empty { font-size: 12px; color: var(--hl-text-muted, #666); }
  `;

  private get today(): string {
    return this.snapshot.analysis?.today ?? new Date().toISOString().slice(0, 10);
  }

  private rainEntity(): string | null {
    const zone = this.snapshot.zones.find((z) => z.id === this.bed.zone_id);
    return zone?.sensors?.rain ?? this.snapshot.settings.outdoor_sensors?.rain ?? null;
  }

  protected willUpdate(): void {
    const key = `${this.bed?.id}:${this.days}`;
    if (this.bed && this.api && key !== this.loadedFor) {
      this.loadedFor = key;
      void this.load();
    }
  }

  private generation = 0;

  private async load(): Promise<void> {
    const gen = ++this.generation;
    const bedId = this.bed.id;
    this.loaded = false;
    const moistureId = this.bed.sensors?.soil_moisture ?? null;
    const rainId = this.rainEntity();
    const start = new Date(`${addDays(this.today, -(this.days - 1))}T00:00:00`);
    try {
      const hist = await this.api.history([moistureId, rainId].filter((x): x is string => !!x), start);
      if (gen !== this.generation || bedId !== this.bed.id) return; // an answer for an earlier bed or period
      this.moisture = (moistureId ? hist[moistureId] ?? [] : [])
        .map((p) => ({ t: p.lu * 1000, v: Number(p.s) }))
        .filter((p) => Number.isFinite(p.v));
      const rain: Record<string, number> = {};
      for (const p of rainId ? hist[rainId] ?? [] : []) {
        const v = Number(p.s);
        if (!Number.isFinite(v)) continue;
        const day = localDay(new Date(p.lu * 1000)); // same calendar day as the bars, not UTC
        rain[day] = Math.max(rain[day] ?? 0, v);
      }
      this.rainByDay = rain;
    } catch {
      if (gen !== this.generation) return;
      this.moisture = [];
      this.rainByDay = {};
    } finally {
      if (gen === this.generation) this.loaded = true;
    }
  }

  private daysData(): Day[] {
    const out: Day[] = [];
    for (let i = this.days - 1; i >= 0; i--) {
      const day = addDays(this.today, -i);
      const events = (this.snapshot.irrigation_log ?? []).filter((e) => e.bed_id === this.bed.id && e.at.slice(0, 10) === day);
      out.push({
        day,
        liters: events.reduce((a, e) => a + e.liters, 0),
        mm: events.reduce((a, e) => a + e.mm, 0),
        rain: this.rainByDay[day] ?? null,
      });
    }
    return out;
  }

  render(): TemplateResult {
    const data = this.daysData();
    const W = 700, H = 170, L = 34, R = 34, T = 10, B = 26;
    const cw = (W - L - R) / data.length;
    const maxMm = Math.max(5, ...data.map((d) => Math.max(d.mm, d.rain ?? 0)));
    const y = (mm: number) => H - B - (mm / maxMm) * (H - T - B);
    const t0 = new Date(`${data[0].day}T00:00:00`).getTime();
    const span = this.days * 86_400_000;
    const x = (t: number) => L + ((t - t0) / span) * (W - L - R);
    const ym = (v: number) => H - B - (Math.max(0, Math.min(100, v)) / 100) * (H - T - B);
    const line = this.moisture.filter((p) => p.t >= t0 && p.t <= t0 + span).map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${ym(p.v).toFixed(1)}`).join(" ");
    const hasAny = data.some((d) => d.liters || d.rain) || this.moisture.length;
    return html`
      ${!hasAny && this.loaded ? html`<p class="empty">${this.t("water.chart_empty")}</p>` : nothing}
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label=${this.t("water.chart_title", { bed: this.bed.name })}>
        <line x1=${L} x2=${W - R} y1=${H - B} y2=${H - B} stroke="var(--hl-border, #ccc)" />
        ${data.map((d, i) => svg`
          ${d.rain ? svg`<rect x=${L + i * cw + cw * 0.12} width=${cw * 0.36} y=${y(d.rain)} height=${H - B - y(d.rain)} rx="2" fill="var(--hl-frost-300, #9cc7ec)"><title>${formatDate(d.day, this.lang)} · ${this.t("water.rain")}: ${d.rain} mm</title></rect>` : nothing}
          ${d.mm ? svg`<rect x=${L + i * cw + cw * 0.52} width=${cw * 0.36} y=${y(d.mm)} height=${H - B - y(d.mm)} rx="2" fill="var(--hl-leaf-600, #3f7d2f)"><title>${formatDate(d.day, this.lang)} · ${this.t("water.given")}: ${Math.round(d.liters)} L (${d.mm.toFixed(1)} mm)</title></rect>` : nothing}
          ${i % 2 === 0 || this.days <= 10 ? svg`<text x=${L + i * cw + cw / 2} y=${H - 8} font-size="10" text-anchor="middle" fill="var(--hl-text-muted, #777)">${formatDate(d.day, this.lang, { day: "numeric", month: "numeric" })}</text>` : nothing}`)}
        ${line ? svg`<path d=${line} fill="none" stroke="var(--hl-soil-700, #7a4e2d)" stroke-width="2" />
          <text x=${W - R + 4} y=${ym(100) + 4} font-size="10" fill="var(--hl-text-muted, #777)">100%</text>
          <text x=${W - R + 4} y=${ym(0)} font-size="10" fill="var(--hl-text-muted, #777)">0%</text>` : nothing}
        <text x="2" y=${T + 8} font-size="10" fill="var(--hl-text-muted, #777)">${Math.round(maxMm)} mm</text>
      </svg>
      <div class="legend">
        <span style="--c: var(--hl-leaf-600, #3f7d2f)">${this.t("water.given")}</span>
        ${this.rainEntity() ? html`<span style="--c: var(--hl-frost-300, #9cc7ec)">${this.t("water.rain")}</span>` : nothing}
        ${this.bed.sensors?.soil_moisture ? html`<span style="--c: var(--hl-soil-700, #7a4e2d)">${this.t("water.moisture")}</span>` : html`<span>${this.t("water.no_moisture")}</span>`}
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-water-chart": WaterChart;
  }
}
