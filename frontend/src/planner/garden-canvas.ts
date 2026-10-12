import { LitElement, css, html, svg, nothing, type PropertyValues, type SVGTemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { Analysis, Bed, CompatibilityReport, FamilyInfo, Plant, Planting, Timeline, Zone } from "../types";
import { familyColor, isActiveOn, plantMonogram, plantName } from "../util/garden";
import { bedRect, clampInto, extents, plantPositions, plantingRect, snap, zoneRect, type Rect } from "./geometry";
import type { Translate } from "../i18n";

export type ItemKind = "zone" | "bed" | "planting";
export interface Selection { kind: ItemKind; id: string }
export interface Ghost { rect: Rect; valid: boolean; color: string; label: string }

export interface ItemChangeDetail { kind: ItemKind; id: string; rect: Rect; targetBedId?: string }

interface DragState {
  mode: "move" | "resize" | "pan";
  kind?: ItemKind;
  id?: string;
  pointerId: number;
  startX: number; // canvas cm
  startY: number;
  origin: Rect;
  startTx: number;
  startTy: number;
  clientX: number;
  clientY: number;
  moved: boolean;
}

const MOISTURE_COLORS: Record<string, string> = {
  dry: "#c8432f",
  slightly_dry: "#e8a33d",
  optimal: "#4c8c3f",
  wet: "#3a7ca5",
  unknown: "transparent",
};

/**
 * SVG garden canvas.
 *
 * Coordinates are centimetres; the content group is transformed with
 * ``translate(tx, ty) scale(k)`` where ``k`` is pixels per cm.  Pointer
 * events (mouse, touch, pen) drive move / resize / pan with pointer capture,
 * so the same code path serves desktop and tablets.  Committed changes are
 * emitted as ``item-change`` events; the planner owns the data and history.
 */
@customElement("hl-garden-canvas")
export class GardenCanvas extends LitElement {
  @property({ attribute: false }) zones: Zone[] = [];
  @property({ attribute: false }) beds: Bed[] = [];
  @property({ attribute: false }) plantings: Planting[] = [];
  @property({ attribute: false }) plants: Map<string, Plant> = new Map();
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property({ attribute: false }) selection: Selection | null = null;
  @property({ attribute: false }) ghost: Ghost | null = null;
  @property({ attribute: false }) reports: Record<string, CompatibilityReport> = {};
  @property({ attribute: false }) timelines: Record<string, Timeline> = {};
  @property({ attribute: false }) analysis: Analysis | null = null;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property({ type: Number }) snapStep = 10;
  @property({ type: Boolean }) snapOn = true;
  @property({ type: Boolean }) showCompanions = true;
  @property({ type: Boolean }) showMoisture = true;
  @property({ type: Boolean }) showTemperature = false;
  @property() viewDate = "";
  @property({ type: Boolean }) readonly = false;

  @state() private k = 1; // px per cm
  @state() private tx = 20;
  @state() private ty = 20;
  @state() private preview: { kind: ItemKind; id: string; rect: Rect } | null = null;
  @query("svg") private svgEl!: SVGSVGElement;

  private drag: DragState | null = null;
  private fitted = false;
  private resizeObserver?: ResizeObserver;

  static styles = [
    css`
      :host { display: block; position: relative; height: 100%; min-height: 360px; touch-action: none; }
      svg { width: 100%; height: 100%; display: block; background: var(--hl-canvas-bg); border-radius: var(--hl-r-lg); outline: none; cursor: default; user-select: none; }
      svg:focus-visible { box-shadow: inset 0 0 0 2px var(--hl-focus); }
      svg.panning { cursor: grabbing; }
      .zone-rect { stroke-width: 1.5; vector-effect: non-scaling-stroke; }
      .bed-rect { vector-effect: non-scaling-stroke; cursor: move; }
      .planting { cursor: move; }
      .planting-rect { vector-effect: non-scaling-stroke; }
      .faded { opacity: 0.32; }
      .label { font-family: var(--hl-font); fill: var(--hl-text); pointer-events: none; }
      .label.on-soil { fill: #fff7ec; paint-order: stroke; stroke: rgba(46, 33, 24, 0.55); stroke-width: 3px; }
      .mono { font-family: var(--hl-font); font-weight: 700; fill: #fff; pointer-events: none; paint-order: stroke; stroke: rgba(0, 0, 0, 0.35); stroke-width: 2px; }
      .selected-outline { fill: none; stroke: var(--hl-focus); stroke-width: 2; vector-effect: non-scaling-stroke; stroke-dasharray: 6 3; pointer-events: none; }
      .handle { fill: var(--hl-surface); stroke: var(--hl-focus); stroke-width: 2; vector-effect: non-scaling-stroke; cursor: nwse-resize; }
      .link { vector-effect: non-scaling-stroke; pointer-events: none; }
      .badge-text { font-family: var(--hl-font); font-weight: 700; fill: #fff; pointer-events: none; }
      .zoom-indicator { position: absolute; right: 12px; bottom: 12px; background: var(--hl-surface); border: 1px solid var(--hl-border);
        border-radius: var(--hl-r-pill); padding: 2px 10px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); pointer-events: none; }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    this.resizeObserver = new ResizeObserver(() => {
      if (!this.fitted) this.fit();
    });
    this.resizeObserver.observe(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
  }

  protected updated(changed: PropertyValues): void {
    if (!this.fitted && (changed.has("zones") || changed.has("beds")) && (this.zones.length || this.beds.length)) this.fit();
  }

  // ---------------------------------------------------------------------- //
  // Public API used by the planner
  // ---------------------------------------------------------------------- //
  fit(): void {
    const box = this.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const ext = extents(this.zones, this.beds);
    const pad = 32;
    this.k = Math.max(0.2, Math.min((box.width - pad * 2) / ext.w, (box.height - pad * 2) / ext.h, 6));
    this.tx = pad - ext.x * this.k + (box.width - pad * 2 - ext.w * this.k) / 2;
    this.ty = pad - ext.y * this.k + (box.height - pad * 2 - ext.h * this.k) / 2;
    this.fitted = true;
  }

  zoom(factor: number, cx?: number, cy?: number): void {
    const box = this.getBoundingClientRect();
    const px = cx ?? box.width / 2;
    const py = cy ?? box.height / 2;
    const k2 = Math.max(0.15, Math.min(this.k * factor, 12));
    this.tx = px - ((px - this.tx) * k2) / this.k;
    this.ty = py - ((py - this.ty) * k2) / this.k;
    this.k = k2;
  }

  /** Client (screen) coordinates -> canvas cm, or null when outside the canvas. */
  clientToCanvas(clientX: number, clientY: number): { x: number; y: number } | null {
    const box = this.getBoundingClientRect();
    if (clientX < box.left || clientX > box.right || clientY < box.top || clientY > box.bottom) return null;
    return { x: (clientX - box.left - this.tx) / this.k, y: (clientY - box.top - this.ty) / this.k };
  }

  focusCanvas(): void {
    this.svgEl?.focus();
  }

  // ---------------------------------------------------------------------- //
  // Pointer interaction
  // ---------------------------------------------------------------------- //
  private rectOf(kind: ItemKind, id: string): Rect | null {
    if (kind === "zone") {
      const z = this.zones.find((i) => i.id === id);
      return z ? zoneRect(z) : null;
    }
    if (kind === "bed") {
      const b = this.beds.find((i) => i.id === id);
      return b ? bedRect(b) : null;
    }
    const p = this.plantings.find((i) => i.id === id);
    const bed = p && this.beds.find((b) => b.id === p.bed_id);
    return p && bed ? plantingRect(p, bed) : null;
  }

  private onPointerDown(ev: PointerEvent, kind?: ItemKind, id?: string, resize = false): void {
    if (ev.button !== 0 && ev.pointerType === "mouse") return;
    ev.stopPropagation();
    const pt = this.clientToCanvas(ev.clientX, ev.clientY);
    if (!pt) return;
    this.svgEl.setPointerCapture(ev.pointerId);
    if (kind && id) {
      this.dispatchEvent(new CustomEvent<Selection>("select", { detail: { kind, id } }));
      const origin = this.rectOf(kind, id);
      if (!origin || this.readonly) {
        this.drag = { mode: "pan", pointerId: ev.pointerId, startX: pt.x, startY: pt.y, origin: { x: 0, y: 0, w: 0, h: 0 },
          startTx: this.tx, startTy: this.ty, clientX: ev.clientX, clientY: ev.clientY, moved: false };
        return;
      }
      this.drag = { mode: resize ? "resize" : "move", kind, id, pointerId: ev.pointerId, startX: pt.x, startY: pt.y, origin,
        startTx: this.tx, startTy: this.ty, clientX: ev.clientX, clientY: ev.clientY, moved: false };
    } else {
      this.dispatchEvent(new CustomEvent<Selection | null>("select", { detail: null }));
      this.drag = { mode: "pan", pointerId: ev.pointerId, startX: pt.x, startY: pt.y, origin: { x: 0, y: 0, w: 0, h: 0 },
        startTx: this.tx, startTy: this.ty, clientX: ev.clientX, clientY: ev.clientY, moved: false };
    }
  }

  private onPointerMove(ev: PointerEvent): void {
    const d = this.drag;
    if (!d || d.pointerId !== ev.pointerId) return;
    if (Math.hypot(ev.clientX - d.clientX, ev.clientY - d.clientY) > 3) d.moved = true;
    if (d.mode === "pan") {
      this.tx = d.startTx + (ev.clientX - d.clientX);
      this.ty = d.startTy + (ev.clientY - d.clientY);
      return;
    }
    const pt = this.clientToCanvas(ev.clientX, ev.clientY);
    if (!pt || !d.kind || !d.id) return;
    const dx = pt.x - d.startX;
    const dy = pt.y - d.startY;
    const step = this.snapOn ? this.snapStep : 1;
    let rect: Rect;
    if (d.mode === "move") {
      rect = { ...d.origin, x: d.origin.x + dx, y: d.origin.y + dy };
      if (d.kind === "planting") {
        // snap relative to the bed so rows line up with bed edges
        const bed = this.beds.find((b) => b.id === this.plantings.find((p) => p.id === d.id)?.bed_id);
        if (bed) {
          rect.x = bed.x_cm + snap(rect.x - bed.x_cm, step);
          rect.y = bed.y_cm + snap(rect.y - bed.y_cm, step);
        }
      } else {
        rect.x = snap(rect.x, step);
        rect.y = snap(rect.y, step);
      }
    } else {
      rect = { ...d.origin, w: Math.max(step, snap(d.origin.w + dx, step)), h: Math.max(step, snap(d.origin.h + dy, step)) };
      if (d.kind === "planting") {
        const bed = this.beds.find((b) => b.id === this.plantings.find((p) => p.id === d.id)?.bed_id);
        if (bed) rect = clampInto(rect, bedRect(bed));
      }
    }
    this.preview = { kind: d.kind, id: d.id, rect };
  }

  private onPointerUp(ev: PointerEvent): void {
    const d = this.drag;
    if (!d || d.pointerId !== ev.pointerId) return;
    this.drag = null;
    if (this.svgEl.hasPointerCapture(ev.pointerId)) this.svgEl.releasePointerCapture(ev.pointerId);
    const preview = this.preview;
    this.preview = null;
    if (!preview || !d.moved || d.mode === "pan") return;
    let targetBedId: string | undefined;
    if (preview.kind === "planting") {
      const cx = preview.rect.x + preview.rect.w / 2;
      const cy = preview.rect.y + preview.rect.h / 2;
      const target = [...this.beds].reverse().find((b) => cx >= b.x_cm && cx <= b.x_cm + b.width_cm && cy >= b.y_cm && cy <= b.y_cm + b.length_cm);
      targetBedId = target?.id;
    }
    this.dispatchEvent(
      new CustomEvent<ItemChangeDetail>("item-change", { detail: { kind: preview.kind, id: preview.id, rect: preview.rect, targetBedId } }),
    );
  }

  private onWheel(ev: WheelEvent): void {
    ev.preventDefault();
    const box = this.getBoundingClientRect();
    this.zoom(ev.deltaY < 0 ? 1.12 : 1 / 1.12, ev.clientX - box.left, ev.clientY - box.top);
  }

  // ---------------------------------------------------------------------- //
  // Rendering
  // ---------------------------------------------------------------------- //
  private effectiveRect(kind: ItemKind, id: string, base: Rect): Rect {
    if (this.preview && this.preview.kind === kind && this.preview.id === id) return this.preview.rect;
    return base;
  }

  /** Offset applied to beds while their zone is being dragged. */
  private zoneDelta(zoneId: string): { dx: number; dy: number } {
    if (this.preview?.kind !== "zone" || this.preview.id !== zoneId || this.drag?.mode !== "move") return { dx: 0, dy: 0 };
    const z = this.zones.find((i) => i.id === zoneId);
    return z ? { dx: this.preview.rect.x - z.x_cm, dy: this.preview.rect.y - z.y_cm } : { dx: 0, dy: 0 };
  }

  private bedAbs(bed: Bed): Rect {
    const { dx, dy } = this.zoneDelta(bed.zone_id);
    const base = { ...bedRect(bed), x: bed.x_cm + dx, y: bed.y_cm + dy };
    return this.effectiveRect("bed", bed.id, base);
  }

  private renderGrid(): SVGTemplateResult {
    const minor = Math.max(this.snapStep, 5);
    return svg`
      <defs>
        <pattern id="minor" width=${minor} height=${minor} patternUnits="userSpaceOnUse">
          <path d="M ${minor} 0 L 0 0 0 ${minor}" fill="none" stroke="var(--hl-grid-line)" stroke-width=${0.6 / this.k}></path>
        </pattern>
        <pattern id="major" width="100" height="100" patternUnits="userSpaceOnUse">
          <rect width="100" height="100" fill="url(#minor)"></rect>
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--hl-grid-line-strong)" stroke-width=${1 / this.k}></path>
        </pattern>
        <pattern id="soil" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="0.9" fill="rgba(255,255,255,0.10)"></circle>
          <circle cx="9" cy="9" r="0.7" fill="rgba(0,0,0,0.12)"></circle>
        </pattern>
        <pattern id="glass" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(91,141,184,0.18)" stroke-width="3"></line>
        </pattern>
      </defs>
      <rect x="-5000" y="-5000" width="10000" height="10000" fill="url(#major)"></rect>
    `;
  }

  private renderZone(zone: Zone): SVGTemplateResult {
    const r = this.effectiveRect("zone", zone.id, zoneRect(zone));
    const enclosed = zone.type !== "outdoor";
    const fs = 12 / this.k;
    const label = `${zone.name} · ${this.t(`settings.zone_type.${zone.type}`)}`;
    return svg`
      <g role="button" aria-label=${label} @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, "zone", zone.id)}>
        <rect class="zone-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${8 / this.k}
          fill=${enclosed ? "var(--hl-zone-greenhouse)" : "var(--hl-zone-outdoor)"}
          stroke=${enclosed ? "var(--hl-frost-500)" : "var(--hl-leaf-300)"} stroke-dasharray=${enclosed ? "none" : "8 4"}></rect>
        ${enclosed ? svg`<rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} fill="url(#glass)" pointer-events="none"></rect>` : nothing}
        <text class="label" x=${r.x + 2 / this.k} y=${r.y - fs * 0.5} font-size=${fs} font-weight="600">${label}</text>
      </g>`;
  }

  private renderBed(bed: Bed): SVGTemplateResult {
    const r = this.bedAbs(bed);
    const fs = 12 / this.k;
    const ba = this.analysis?.beds[bed.id];
    const status = ba?.moisture_status ?? "unknown";
    const moistureStroke = this.showMoisture && status !== "unknown" ? MOISTURE_COLORS[status] : "rgba(46,33,24,0.45)";
    const fill = bed.kind === "container" ? "var(--hl-container-fill)" : bed.kind === "raised" ? "var(--hl-bed-fill-raised)" : "var(--hl-bed-fill)";
    const radius = bed.kind === "container" ? Math.min(r.w, r.h) / 4 : 4 / this.k;
    const moisture = ba?.irrigation.moisture;
    const soilT = ba?.sensors?.soil_temperature?.value;
    const report = this.reports[bed.id] ?? ba?.compatibility;
    const issues = (report?.pairs.filter((p) => p.severity !== "info").length ?? 0) + (report?.rotation?.length ?? 0);
    return svg`
      <g role="button" aria-label=${`${bed.name}, ${this.t(`kind.${bed.kind}`)}, ${Math.round(bed.width_cm)} × ${Math.round(bed.length_cm)} cm`}
        @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, "bed", bed.id)}>
        <rect class="bed-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${radius} fill=${fill}
          stroke=${moistureStroke} stroke-width=${this.showMoisture && status !== "unknown" ? 3 : 1.5}></rect>
        <rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${radius} fill="url(#soil)" pointer-events="none"></rect>
        ${this.showMoisture && status !== "unknown"
          ? svg`<rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${radius} fill=${MOISTURE_COLORS[status]} opacity="0.12" pointer-events="none"></rect>`
          : nothing}
        <text class="label on-soil" x=${r.x + 6 / this.k} y=${r.y + r.h - 6 / this.k} font-size=${fs} font-weight="600">${bed.name}</text>
        ${this.showMoisture && moisture != null
          ? svg`<text class="label on-soil" x=${r.x + r.w - 6 / this.k} y=${r.y + r.h - 6 / this.k} font-size=${fs * 0.95} text-anchor="end">💧 ${Math.round(moisture)}%</text>`
          : nothing}
        ${this.showTemperature && soilT != null
          ? svg`<text class="label on-soil" x=${r.x + r.w - 6 / this.k} y=${r.y + fs * 1.3} font-size=${fs * 0.95} text-anchor="end">🌡 ${soilT.toFixed(1)} °C</text>`
          : nothing}
        ${issues ? this.renderBadge(r.x + r.w, r.y, String(issues), "var(--hl-tomato-500)") : nothing}
      </g>`;
  }

  private renderBadge(cx: number, cy: number, text: string, color: string): SVGTemplateResult {
    const rad = 9 / this.k;
    return svg`<g pointer-events="none"><circle cx=${cx} cy=${cy} r=${rad} fill=${color} stroke="#fff" stroke-width=${1.5 / this.k}></circle>
      <text class="badge-text" x=${cx} y=${cy + rad * 0.38} font-size=${rad * 1.1} text-anchor="middle">${text}</text></g>`;
  }

  private renderPlanting(p: Planting): SVGTemplateResult | typeof nothing {
    const bed = this.beds.find((b) => b.id === p.bed_id);
    const plant = this.plants.get(p.plant_id);
    if (!bed || !plant) return nothing;
    const bedR = this.bedAbs(bed);
    const base = { x: bedR.x + p.x_cm, y: bedR.y + p.y_cm, w: p.width_cm, h: p.length_cm };
    const r = this.effectiveRect("planting", p.id, base);
    const color = familyColor(this.families, plant.family);
    const name = plantName(plant, this.lang);
    const active = !this.viewDate || isActiveOn(p, this.timelines[p.id], this.viewDate);
    const local = { ...p, x_cm: r.x - bedR.x, y_cm: r.y - bedR.y, width_cm: r.w, length_cm: r.h };
    const dots = plantPositions(local, plant);
    const dotR = Math.max(Math.min(plant.spacing_cm / 2.4, 18), 1.6);
    const report = this.reports[bed.id] ?? this.analysis?.beds[bed.id]?.compatibility;
    const mine = report?.pairs.filter((f) => (f.a === p.id || f.b === p.id) && f.severity !== "info") ?? [];
    const outOfBounds = report?.out_of_bounds?.includes(p.id);
    const fs = Math.min(11 / this.k, r.h * 0.45);
    const label = `${name} – ${this.t(`planner.layout.${p.layout}`)}, ${this.t("planner.count", { n: dots.length })}` +
      (mine.length ? ` – ${mine.length} ⚠` : "");
    return svg`
      <g class="planting ${active ? "" : "faded"}" role="button" aria-label=${label}
        @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, "planting", p.id)}>
        <title>${label}</title>
        <rect class="planting-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${3 / this.k}
          fill=${color} fill-opacity="0.22" stroke=${color} stroke-width="1.5" stroke-dasharray=${active ? "none" : "4 3"}></rect>
        ${dots.slice(0, 400).map(([x, y]) => svg`<circle cx=${bedR.x + x} cy=${bedR.y + y} r=${dotR} fill=${color} fill-opacity="0.85"></circle>`)}
        ${r.w * this.k > 26 && r.h * this.k > 14
          ? svg`<text class="mono" x=${r.x + r.w / 2} y=${r.y + r.h / 2 + fs * 0.35} font-size=${fs} text-anchor="middle">${plantMonogram(name)}</text>`
          : nothing}
        ${p.succession_group ? this.renderBadge(r.x, r.y, String(p.succession_index + 1), "var(--hl-soil-700)") : nothing}
        ${mine.length || outOfBounds ? this.renderBadge(r.x + r.w, r.y, "!", mine.some((m) => m.severity === "error") ? "var(--hl-tomato-500)" : "var(--hl-sun-500)") : nothing}
      </g>`;
  }

  private renderLinks(): SVGTemplateResult[] {
    if (!this.showCompanions) return [];
    const out: SVGTemplateResult[] = [];
    const center = (id: string): [number, number] | null => {
      const p = this.plantings.find((i) => i.id === id);
      const bed = p && this.beds.find((b) => b.id === p.bed_id);
      if (!p || !bed) return null;
      const br = this.bedAbs(bed);
      const r = this.effectiveRect("planting", p.id, { x: br.x + p.x_cm, y: br.y + p.y_cm, w: p.width_cm, h: p.length_cm });
      return [r.x + r.w / 2, r.y + r.h / 2];
    };
    const visible = new Set(this.plantings.map((p) => p.id));
    for (const bed of this.beds) {
      const report = this.reports[bed.id] ?? this.analysis?.beds[bed.id]?.compatibility;
      for (const f of report?.pairs ?? []) {
        if (f.kind === "same_family" || !visible.has(f.a) || !visible.has(f.b)) continue;
        const a = center(f.a);
        const b = center(f.b);
        if (!a || !b) continue;
        const color = f.kind === "friend" ? "var(--hl-leaf-500)" : f.kind === "enemy" ? "var(--hl-tomato-500)" : "var(--hl-sun-500)";
        out.push(svg`<line class="link" x1=${a[0]} y1=${a[1]} x2=${b[0]} y2=${b[1]} stroke=${color}
          stroke-width=${f.kind === "friend" ? 2 : 2.5} stroke-dasharray=${f.kind === "friend" ? "none" : "6 4"} stroke-linecap="round" opacity="0.9"></line>`);
      }
    }
    return out;
  }

  private renderSelection(): SVGTemplateResult | typeof nothing {
    const sel = this.selection;
    if (!sel) return nothing;
    let r: Rect | null = null;
    if (sel.kind === "bed") {
      const b = this.beds.find((i) => i.id === sel.id);
      r = b ? this.bedAbs(b) : null;
    } else if (sel.kind === "zone") {
      const z = this.zones.find((i) => i.id === sel.id);
      r = z ? this.effectiveRect("zone", z.id, zoneRect(z)) : null;
    } else {
      const p = this.plantings.find((i) => i.id === sel.id);
      const bed = p && this.beds.find((b) => b.id === p.bed_id);
      if (p && bed) {
        const br = this.bedAbs(bed);
        r = this.effectiveRect("planting", p.id, { x: br.x + p.x_cm, y: br.y + p.y_cm, w: p.width_cm, h: p.length_cm });
      }
    }
    if (!r) return nothing;
    const hs = 10 / this.k;
    const pad = 3 / this.k;
    return svg`
      <rect class="selected-outline" x=${r.x - pad} y=${r.y - pad} width=${r.w + pad * 2} height=${r.h + pad * 2}></rect>
      ${this.readonly ? nothing : svg`<rect class="handle" x=${r.x + r.w - hs / 2} y=${r.y + r.h - hs / 2} width=${hs} height=${hs} rx=${2 / this.k}
        @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, sel.kind, sel.id, true)}></rect>`}`;
  }

  private renderGhost(): SVGTemplateResult | typeof nothing {
    const g = this.ghost;
    if (!g) return nothing;
    const fs = 12 / this.k;
    return svg`<g pointer-events="none">
      <rect x=${g.rect.x} y=${g.rect.y} width=${g.rect.w} height=${g.rect.h} rx=${3 / this.k}
        fill=${g.color} fill-opacity=${g.valid ? 0.35 : 0.12} stroke=${g.valid ? g.color : "var(--hl-tomato-500)"}
        stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      <text class="label" x=${g.rect.x} y=${g.rect.y - fs * 0.5} font-size=${fs} font-weight="600">${g.label}</text></g>`;
  }

  render() {
    return html`
      <svg
        tabindex="0"
        role="application"
        aria-roledescription="garden plan"
        aria-label=${this.t?.("nav.planner") ?? "Planner"}
        class=${this.drag?.mode === "pan" ? "panning" : ""}
        @pointerdown=${(e: PointerEvent) => this.onPointerDown(e)}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @wheel=${this.onWheel}
      >
        <g transform=${`translate(${this.tx} ${this.ty}) scale(${this.k})`}>
          ${this.renderGrid()} ${this.zones.map((z) => this.renderZone(z))} ${this.beds.map((b) => this.renderBed(b))}
          ${this.plantings.map((p) => this.renderPlanting(p))} ${this.renderLinks()} ${this.renderSelection()} ${this.renderGhost()}
        </g>
      </svg>
      <div class="zoom-indicator" aria-hidden="true">${Math.round(this.k * 100)} px/m</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-garden-canvas": GardenCanvas;
  }
}
