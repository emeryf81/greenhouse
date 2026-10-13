// The year per bed: every crop as a bar from sowing to the end of its harvest
// (nursery, growing, harvest), bed by bed. Drag a planned crop sideways to move
// its sowing (and planting-out) date; the rest follows from the scheduler.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Translate } from "../i18n";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant, Planting } from "../types";
import type { CropRow } from "../views/crops-view";
import { addDays, familyColor, formatDate, plantName } from "../util/garden";

const DAY = 86_400_000;
const toMs = (iso: string) => Date.parse(`${iso}T12:00:00`);

@customElement("hl-crop-gantt")
export class CropGantt extends LitElement {
  @property({ attribute: false }) rows: CropRow[] = [];
  @property({ attribute: false }) plants = new Map<string, Plant>();
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property({ type: Number }) season = 0;
  @property() today = "";
  @property({ type: Boolean }) south = false;
  @property({ type: Boolean }) admin = true;
  @state() private drag: { id: string; startX: number; days: number; width: number } | null = null;

  static styles = [
    shared,
    css`
      :host { display: block; }
      .wrap { overflow-x: auto; }
      .chart { position: relative; min-width: 760px; }
      .months { display: grid; grid-template-columns: 180px 1fr; position: sticky; top: 0; z-index: 1; background: var(--hl-surface); }
      .months .m { display: grid; grid-template-columns: repeat(12, 1fr); border-bottom: 1px solid var(--hl-border); }
      .months .m span { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--hl-text-muted); padding: 6px 4px;
        border-left: 1px solid color-mix(in srgb, var(--hl-border) 60%, transparent); }
      .bed { font-family: var(--hl-font-serif); font-weight: 700; font-size: 15px; padding: 14px 0 4px; }
      .row { display: grid; grid-template-columns: 180px 1fr; align-items: center; min-height: 34px; }
      .label { display: flex; align-items: center; gap: 8px; font-size: var(--hl-fs-sm); overflow: hidden; white-space: nowrap; text-overflow: ellipsis; padding-right: 8px; }
      .track { position: relative; height: 34px;
        background: repeating-linear-gradient(90deg, transparent 0, transparent calc(100% / 12 - 1px), color-mix(in srgb, var(--hl-border) 55%, transparent) calc(100% / 12 - 1px), color-mix(in srgb, var(--hl-border) 55%, transparent) calc(100% / 12)); }
      .bar { position: absolute; top: 7px; height: 20px; border-radius: 10px; display: flex; overflow: hidden; box-shadow: var(--hl-shadow-1);
        transition: box-shadow var(--hl-dur) var(--hl-ease); touch-action: none; }
      .bar.movable { cursor: grab; }
      .bar.movable:hover { box-shadow: var(--hl-shadow-2); }
      .bar.dragging { cursor: grabbing; box-shadow: var(--hl-shadow-3); opacity: 0.92; }
      .bar span { height: 100%; }
      .nursery { background: repeating-linear-gradient(135deg, color-mix(in srgb, var(--c) 30%, #fff) 0 4px, color-mix(in srgb, var(--c) 18%, #fff) 4px 8px); }
      .grow { background: color-mix(in srgb, var(--c) 70%, #fff); }
      .harvest { background: var(--c); }
      .today { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--hl-danger); opacity: 0.6; pointer-events: none; }
      .tip { position: absolute; top: -22px; left: 50%; transform: translateX(-50%); white-space: nowrap; font-size: 11px; font-weight: 700;
        background: var(--hl-text); color: var(--hl-surface); padding: 2px 8px; border-radius: 999px; }
      .legend { display: flex; gap: 16px; flex-wrap: wrap; font-size: 12px; color: var(--hl-text-muted); margin-top: 12px; }
      .legend i { display: inline-block; width: 22px; height: 10px; border-radius: 5px; margin-right: 6px; vertical-align: -1px; --c: var(--hl-primary); }
    `,
  ];

  private get start(): number {
    return toMs(this.south ? `${this.season}-07-01` : `${this.season}-01-01`);
  }

  private get span(): number {
    return toMs(this.south ? `${this.season + 1}-07-01` : `${this.season + 1}-01-01`) - this.start;
  }

  private pct(iso: string): number {
    return Math.max(0, Math.min(100, ((toMs(iso) - this.start) / this.span) * 100));
  }

  private movable(p: Planting): boolean {
    return this.admin && p.status === "planned";
  }

  private down(e: PointerEvent, row: CropRow): void {
    if (!this.movable(row.planting)) return;
    const track = (e.currentTarget as HTMLElement).parentElement!;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    this.drag = { id: row.planting.id, startX: e.clientX, days: 0, width: track.getBoundingClientRect().width };
  }

  private move(e: PointerEvent): void {
    if (!this.drag) return;
    const days = Math.round(((e.clientX - this.drag.startX) / this.drag.width) * (this.span / DAY));
    if (days !== this.drag.days) this.drag = { ...this.drag, days };
  }

  private up(row: CropRow): void {
    const drag = this.drag;
    this.drag = null;
    if (!drag || drag.id !== row.planting.id || !drag.days) return;
    const tl = row.timeline;
    const changes: Partial<Planting> = {};
    const sow = row.planting.sow_date ?? tl?.sow_date;
    const out = row.planting.transplant_date ?? tl?.transplant_date;
    if (sow) changes.sow_date = addDays(sow, drag.days);
    if (out) changes.transplant_date = addDays(out, drag.days);
    if (!sow && !out && tl) changes.sow_date = addDays(tl.in_ground, drag.days);
    this.dispatchEvent(new CustomEvent("move-planting", { detail: { row, changes, days: drag.days } }));
  }

  render(): TemplateResult {
    const months = Array.from({ length: 12 }, (_, i) => new Date(this.start + (i + 0.5) * (this.span / 12)).toLocaleDateString(this.lang === "nl" ? "nl-BE" : "en-GB", { month: "short" }));
    // grouped by bed id (two beds may share a name); crops without a bed together under "–"
    const byBed = new Map<string | null, { name: string; rows: CropRow[] }>();
    for (const r of this.rows.filter((x) => x.timeline)) {
      const key = r.bed === null ? null : r.planting.bed_id ?? r.bed;
      const group = byBed.get(key) ?? { name: r.bed || "–", rows: [] };
      group.rows.push(r);
      byBed.set(key, group);
    }
    const todayPct = this.today ? this.pct(this.today) : -1;
    return html`<div class="wrap"><div class="chart">
      <div class="months"><span></span><div class="m">${months.map((m) => html`<span>${m}</span>`)}</div></div>
      ${[...byBed.values()].map(({ name, rows }) => html`
        <div class="bed">${name}</div>
        ${rows.sort((a, b) => (a.timeline!.in_ground < b.timeline!.in_ground ? -1 : 1)).map((r) => {
          const tl = r.timeline!;
          const plant = this.plants.get(r.planting.plant_id);
          const color = plant?.color || familyColor(this.families, plant?.family);
          const shift = this.drag?.id === r.planting.id ? this.drag.days : 0;
          const d = (iso: string | null | undefined) => (iso ? addDays(iso, shift) : null);
          const s0 = d(tl.sow_date) ?? d(tl.in_ground)!;
          const s1 = d(tl.in_ground)!;
          const s2 = d(tl.harvest_start)!;
          const s3 = d(tl.harvest_end)!;
          const left = this.pct(s0), right = this.pct(s3);
          const w = Math.max(right - left, 0.6);
          const seg = (a: string, b: string) => `${(Math.max(this.pct(b) - this.pct(a), 0) / w) * 100}%`;
          return html`<div class="row">
            <span class="label">${plant ? glyphIcon(glyphFor(plant), color, 20) : nothing}${plantName(plant, this.lang) || r.planting.plant_id}</span>
            <div class="track">
              ${todayPct >= 0 ? html`<span class="today" style=${`left:${todayPct}%`}></span>` : nothing}
              <div class="bar ${this.movable(r.planting) ? "movable" : ""} ${shift ? "dragging" : ""}" style=${`left:${left}%;width:${w}%;--c:${color}`}
                title=${`${formatDate(s0, this.lang)} → ${formatDate(s3, this.lang)}${this.movable(r.planting) ? ` · ${this.t("gantt.drag")}` : ""}`}
                @pointerdown=${(e: PointerEvent) => this.down(e, r)} @pointermove=${(e: PointerEvent) => this.move(e)}
                @pointerup=${() => this.up(r)} @pointercancel=${() => (this.drag = null)}>
                <span class="nursery" style=${`width:${seg(s0, s1)}`}></span>
                <span class="grow" style=${`width:${seg(s1, s2)}`}></span>
                <span class="harvest" style=${`width:${seg(s2, s3)}`}></span>
                ${shift ? html`<span class="tip">${shift > 0 ? "+" : ""}${shift} d · ${formatDate(s0, this.lang)}</span>` : nothing}
              </div>
            </div>
          </div>`;
        })}`)}
    </div></div>
    <div class="legend">
      <span><i class="nursery"></i>${this.t("gantt.nursery")}</span><span><i class="grow"></i>${this.t("gantt.grow")}</span>
      <span><i class="harvest"></i>${this.t("gantt.harvest")}</span><span>${this.t("gantt.hint")}</span>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-crop-gantt": CropGantt;
  }
}
