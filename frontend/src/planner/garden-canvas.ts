import { LitElement, css, html, svg, nothing, type PropertyValues, type SVGTemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { Analysis, Bed, CompatibilityReport, FamilyInfo, Feature, Plant, Planting, Timeline, Zone } from "../types";
import { familyColor, isActiveOn, plantMonogram, plantName, localeOf } from "../util/garden";
import { glyphFor, glyphSymbols, glyphUse } from "./plant-glyphs";
import { bedRect, clampInto, extents, plantPositions, plantingRect, snap, zoneRect, type Rect } from "./geometry";
import type { Translate } from "../i18n";

export type ItemKind = "zone" | "bed" | "planting" | "feature";
export interface Selection { kind: ItemKind; id: string; additive?: boolean }
export interface Ghost { rect: Rect; valid: boolean; color: string; label: string }

export interface DrawTool { label: string; color: string }

export interface ItemChangeDetail { kind: ItemKind; id: string; rect: Rect; targetBedId?: string; dx: number; dy: number; group: boolean }

export const FEATURE_STYLE: Record<string, { fill: string; stroke: string; icon: string; pattern?: string; opacity?: number }> = {
  path: { fill: "#e3d6bd", stroke: "#b3a283", icon: "🚶", pattern: "gravel", opacity: 0.95 },
  terrace: { fill: "#cfc6b8", stroke: "#8f8577", icon: "☕", pattern: "tiles", opacity: 0.95 },
  lawn: { fill: "#9cc46a", stroke: "#6f9a45", icon: "🌱", pattern: "grass", opacity: 0.7 },
  flowerbed: { fill: "#d7e8b8", stroke: "#8fae6a", icon: "🌸", pattern: "flowers", opacity: 0.85 },
  compost: { fill: "#8a6a45", stroke: "#5c442a", icon: "♻", opacity: 0.7 },
  water_butt: { fill: "#4c8fbf", stroke: "#2d6a96", icon: "💧", opacity: 0.7 },
  pond: { fill: "#7fb6d9", stroke: "#3f7fa8", icon: "🐸", pattern: "water", opacity: 0.85 },
  shed: { fill: "#9aa3a0", stroke: "#6b7370", icon: "🏠", pattern: "roof", opacity: 0.85 },
  tree: { fill: "#4e7d3a", stroke: "#2f5222", icon: "🌳", opacity: 0.5 },
  hedge: { fill: "#5f8f45", stroke: "#3d6b2a", icon: "🌿", pattern: "hedge", opacity: 0.8 },
  fence: { fill: "#8a6a45", stroke: "#5c442a", icon: "🪵", opacity: 0.9 },
  trellis: { fill: "#7a5c3e", stroke: "#5a3f25", icon: "╫", opacity: 0.6 },
  house: { fill: "#c9b8a8", stroke: "#7d6a5a", icon: "🏠", pattern: "house", opacity: 0.95 },
  driveway: { fill: "#d2ccc2", stroke: "#9a9285", icon: "🚗", pattern: "pavers", opacity: 0.95 },
  parking: { fill: "#d2ccc2", stroke: "#9a9285", icon: "🅿️", pattern: "pavers", opacity: 0.95 },
  street: { fill: "#8f9294", stroke: "#5f6264", icon: "🛣️", pattern: "asphalt", opacity: 0.95 },
  play: { fill: "#efe0a0", stroke: "#c2a84a", icon: "🛝", opacity: 0.7 },
  beehive: { fill: "#f2c230", stroke: "#b5841a", icon: "🐝", opacity: 0.85 },
  stone_path: { fill: "#cfc8bd", stroke: "#958d80", icon: "🪨", pattern: "flagstones", opacity: 0.95 },
  wood_path: { fill: "#c39463", stroke: "#8a6238", icon: "🪵", pattern: "planks", opacity: 0.95 },
  stepping_stones: { fill: "#a6cc72", stroke: "#8f887c", icon: "👣", pattern: "stepping", opacity: 0.9 },
  bark_path: { fill: "#a07a52", stroke: "#7d5a38", icon: "🟫", pattern: "bark", opacity: 0.9 },
  decking: { fill: "#c39463", stroke: "#8a6238", icon: "🪑", pattern: "planks", opacity: 0.95 },
  wall: { fill: "#b07a5c", stroke: "#7d4f36", icon: "🧱", pattern: "bricks", opacity: 0.95 },
  carport: { fill: "#a4aca9", stroke: "#6b7370", icon: "🚙", pattern: "roof", opacity: 0.85 },
  shrub: { fill: "#5f8f45", stroke: "#3d6b2a", icon: "🌳", pattern: "hedge", opacity: 0.75 },
  pool: { fill: "#5fb0e0", stroke: "#2d7fb0", icon: "🏊", pattern: "pool", opacity: 0.95 },
  seating: { fill: "#d9c7a3", stroke: "#9c8460", icon: "🪑", pattern: "tiles", opacity: 0.85 },
  other: { fill: "#b4b4b4", stroke: "#888", icon: "•", opacity: 0.55 },
};

/** Zone fills per type: one glance tells orchard from vegetable garden. */
export const ZONE_STYLE: Record<string, { fill: string; stroke: string; dash: string; icon: string }> = {
  outdoor: { fill: "var(--hl-zone-outdoor)", stroke: "var(--hl-leaf-300)", dash: "8 4", icon: "🥕" },
  greenhouse: { fill: "var(--hl-zone-greenhouse)", stroke: "var(--hl-frost-500)", dash: "none", icon: "🏡" },
  cold_frame: { fill: "var(--hl-zone-greenhouse)", stroke: "var(--hl-frost-500)", dash: "3 3", icon: "🪟" },
  orchard: { fill: "rgba(120, 170, 80, 0.16)", stroke: "#6f9a45", dash: "10 4", icon: "🍎" },
  fruit: { fill: "rgba(200, 60, 90, 0.08)", stroke: "#c8506a", dash: "10 4", icon: "🫐" },
  herbs: { fill: "rgba(80, 110, 176, 0.09)", stroke: "#6a84c0", dash: "10 4", icon: "🌿" },
  flowers: { fill: "rgba(224, 106, 160, 0.09)", stroke: "#d27aa8", dash: "10 4", icon: "🌸" },
  garden: { fill: "rgba(110, 150, 90, 0.10)", stroke: "#7a9a5a", dash: "10 4", icon: "🏡" },
  containers: { fill: "rgba(176, 122, 92, 0.10)", stroke: "#b07a5c", dash: "4 3", icon: "🪴" },
};

const LINK_STYLE: Record<string, { color: string; dash: string; width: number }> = {
  friend: { color: "var(--hl-leaf-500)", dash: "none", width: 2 },
  pest_synergy: { color: "var(--hl-leaf-600)", dash: "2 3", width: 2 },
  enemy: { color: "var(--hl-tomato-500)", dash: "6 4", width: 2.5 },
  allelopathy: { color: "#8e5ba8", dash: "6 4", width: 2.5 },
  competition: { color: "var(--hl-sun-500)", dash: "3 3", width: 2 },
  shading: { color: "#6b7370", dash: "1 4", width: 2.5 },
  overlap: { color: "var(--hl-sun-500)", dash: "6 4", width: 2.5 },
};

/** Plant symbol by growth habit: shape carries meaning beyond colour. */
export function glyph(habit: string, cx: number, cy: number, r: number, color: string): SVGTemplateResult {
  switch (habit) {
    case "climbing": // a pole with a triangle: climbs a support
      return svg`<path d=${`M${cx} ${cy - r} L${cx + r * 0.9} ${cy + r * 0.8} L${cx - r * 0.9} ${cy + r * 0.8} Z`} fill=${color} fill-opacity="0.85"></path>`;
    case "vine": // sprawling: ring
      return svg`<circle cx=${cx} cy=${cy} r=${r * 0.8} fill="none" stroke=${color} stroke-width=${r * 0.45} stroke-opacity="0.85"></circle>`;
    case "upright": // tall and narrow: diamond
      return svg`<path d=${`M${cx} ${cy - r} L${cx + r * 0.6} ${cy} L${cx} ${cy + r} L${cx - r * 0.6} ${cy} Z`} fill=${color} fill-opacity="0.85"></path>`;
    case "rosette": { // leafy rosette: four petals
      const p = r * 0.55;
      return svg`<g fill=${color} fill-opacity="0.85"><circle cx=${cx - p} cy=${cy} r=${p}></circle><circle cx=${cx + p} cy=${cy} r=${p}></circle>
        <circle cx=${cx} cy=${cy - p} r=${p}></circle><circle cx=${cx} cy=${cy + p} r=${p}></circle></g>`;
    }
    case "root": // taproot: downward triangle
      return svg`<path d=${`M${cx - r * 0.9} ${cy - r * 0.7} L${cx + r * 0.9} ${cy - r * 0.7} L${cx} ${cy + r} Z`} fill=${color} fill-opacity="0.85"></path>`;
    case "bulb": // bulb: teardrop
      return svg`<path d=${`M${cx} ${cy - r} Q${cx + r} ${cy + r * 0.2} ${cx} ${cy + r} Q${cx - r} ${cy + r * 0.2} ${cx} ${cy - r} Z`} fill=${color} fill-opacity="0.85"></path>`;
    default: // bush: disc
      return svg`<circle cx=${cx} cy=${cy} r=${r} fill=${color} fill-opacity="0.85"></circle>`;
  }
}

interface DragState {
  mode: "move" | "resize" | "pan" | "draw";
  /** The item under the pointer: a click without moving opens it ("item-click"). */
  clicked?: { kind: ItemKind; id: string };
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
  @property({ attribute: false }) features: Feature[] = [];
  @property({ attribute: false }) multi: Selection[] = [];
  @property({ type: Boolean }) showFeatures = true;
  @property({ type: Boolean }) showPlantings = true;
  @property({ type: Boolean }) showZones = true;
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
  /** Planting mode: zones, beds and elements can be selected but not moved or resized. */
  @property({ type: Boolean }) lockLayout = false;
  /** Zone being edited in "zone map" mode (others are dimmed and locked). */
  @property() focusZone = "";
  /** While set, dragging on the canvas draws a new rectangle (zone, bed, element). */
  @property({ attribute: false }) drawTool: DrawTool | null = null;
  @state() private drawRect: Rect | null = null;

  @state() private k = 1; // px per cm
  @state() private tx = 20;
  @state() private ty = 20;
  @state() private preview: { kind: ItemKind; id: string; rect: Rect } | null = null;
  @query("svg") private svgEl!: SVGSVGElement;

  private drag: DragState | null = null;
  private pendingSelect: Selection | null = null;
  private fitted = false;
  private resizeObserver?: ResizeObserver;

  static styles = [
    css`
      :host { display: block; position: relative; height: 100%; min-height: 360px; touch-action: none; }
      svg { width: 100%; height: 100%; display: block; background: var(--hl-canvas-bg); border-radius: var(--hl-r-lg); outline: none; cursor: default; user-select: none; }
      svg:focus-visible { box-shadow: inset 0 0 0 2px var(--hl-focus); }
      svg.panning { cursor: grabbing; }
      svg.drawing, svg.drawing * { cursor: crosshair !important; }
      .dimmed { opacity: 0.22; pointer-events: none; filter: grayscale(0.6); }
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
      .pill-text { font-family: var(--hl-font); font-weight: 650; fill: #2e2118; pointer-events: none; }
      .zone-label { paint-order: stroke; stroke: var(--hl-canvas-bg); stroke-width: 3px; }
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
    const ext = extents(this.zones, this.beds, this.features.map((f) => ({ x: f.x_cm, y: f.y_cm, w: f.width_cm, h: f.length_cm })));
    const pad = 32;
    this.k = Math.max(0.2, Math.min((box.width - pad * 2) / ext.w, (box.height - pad * 2) / ext.h, 6));
    this.tx = pad - ext.x * this.k + (box.width - pad * 2 - ext.w * this.k) / 2;
    this.ty = pad - ext.y * this.k + (box.height - pad * 2 - ext.h * this.k) / 2;
    this.fitted = true;
  }

  /** Zoom to a rectangle (zone map). */
  fitRect(r: Rect, pad = 40): void {
    const box = this.getBoundingClientRect();
    if (!box.width || !box.height || !r.w || !r.h) return;
    this.k = Math.max(0.2, Math.min((box.width - pad * 2) / r.w, (box.height - pad * 2) / r.h, 8));
    this.tx = pad - r.x * this.k + (box.width - pad * 2 - r.w * this.k) / 2;
    this.ty = pad - r.y * this.k + (box.height - pad * 2 - r.h * this.k) / 2;
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
    if (kind === "feature") {
      const f = this.features.find((i) => i.id === id);
      return f ? { x: f.x_cm, y: f.y_cm, w: f.width_cm, h: f.length_cm } : null;
    }
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
    if (this.drawTool && !resize) {
      const step = this.snapOn ? this.snapStep : 1;
      const x = snap(pt.x, step);
      const y = snap(pt.y, step);
      this.drag = { mode: "draw", pointerId: ev.pointerId, startX: x, startY: y, origin: { x, y, w: 0, h: 0 },
        startTx: this.tx, startTy: this.ty, clientX: ev.clientX, clientY: ev.clientY, moved: false };
      this.drawRect = { x, y, w: 0, h: 0 };
      return;
    }
    if (kind && id) {
      const additive = ev.shiftKey || ev.ctrlKey || ev.metaKey;
      const inGroup = this.multi.some((m) => m.kind === kind && m.id === id);
      if (!(inGroup && !additive && !resize)) {
        this.dispatchEvent(new CustomEvent<Selection>("select", { detail: { kind, id, additive } }));
      } else {
        this.pendingSelect = { kind, id }; // a click without dragging narrows the group
      }
      if (additive) return;
      const origin = this.rectOf(kind, id);
      if (!origin || this.readonly || (this.lockLayout && kind !== "planting")) {
        this.drag = { mode: "pan", pointerId: ev.pointerId, startX: pt.x, startY: pt.y, origin: { x: 0, y: 0, w: 0, h: 0 },
          startTx: this.tx, startTy: this.ty, clientX: ev.clientX, clientY: ev.clientY, moved: false, clicked: { kind, id } };
        return;
      }
      this.drag = { mode: resize ? "resize" : "move", kind, id, pointerId: ev.pointerId, startX: pt.x, startY: pt.y, origin,
        startTx: this.tx, startTy: this.ty, clientX: ev.clientX, clientY: ev.clientY, moved: false, clicked: resize ? undefined : { kind, id } };
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
    if (d.mode === "draw") {
      if (!pt) return;
      const step = this.snapOn ? this.snapStep : 1;
      const x2 = snap(pt.x, step);
      const y2 = snap(pt.y, step);
      this.drawRect = { x: Math.min(d.startX, x2), y: Math.min(d.startY, y2), w: Math.abs(x2 - d.startX), h: Math.abs(y2 - d.startY) };
      return;
    }
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
    if (d.mode === "draw") {
      const rect = this.drawRect ?? d.origin;
      this.drawRect = null;
      // A click (no drag) places the default size at that point.
      const detail = d.moved && rect.w > 0 && rect.h > 0 ? rect : { x: d.startX, y: d.startY, w: 0, h: 0 };
      this.dispatchEvent(new CustomEvent<Rect>("draw-rect", { detail }));
      return;
    }
    const preview = this.preview;
    this.preview = null;
    const pending = this.pendingSelect;
    this.pendingSelect = null;
    if (pending && !d.moved) this.dispatchEvent(new CustomEvent<Selection>("select", { detail: pending }));
    if (d.clicked && !d.moved && !(ev.shiftKey || ev.ctrlKey || ev.metaKey)) {
      this.dispatchEvent(new CustomEvent<Selection>("item-click", { detail: { kind: d.clicked.kind, id: d.clicked.id } }));
    }
    if (!preview || !d.moved || d.mode === "pan") return;
    let targetBedId: string | undefined;
    if (preview.kind === "planting") {
      const cx = preview.rect.x + preview.rect.w / 2;
      const cy = preview.rect.y + preview.rect.h / 2;
      const target = [...this.beds].reverse().find((b) => cx >= b.x_cm && cx <= b.x_cm + b.width_cm && cy >= b.y_cm && cy <= b.y_cm + b.length_cm);
      targetBedId = target?.id;
    }
    const group = d.mode === "move" && this.multi.length > 1 && this.multi.some((m) => m.kind === preview.kind && m.id === preview.id);
    this.dispatchEvent(
      new CustomEvent<ItemChangeDetail>("item-change", {
        detail: { kind: preview.kind, id: preview.id, rect: preview.rect, targetBedId, dx: preview.rect.x - d.origin.x, dy: preview.rect.y - d.origin.y, group },
      }),
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
    // Group move: every selected item of the dragged kind follows the pointer.
    const p = this.preview;
    if (p && p.kind === kind && this.drag?.mode === "move" && this.multi.length > 1 && this.multi.some((m) => m.kind === kind && m.id === id)
      && this.multi.some((m) => m.kind === p.kind && m.id === p.id)) {
      const origin = this.drag.origin;
      return { ...base, x: base.x + (p.rect.x - origin.x), y: base.y + (p.rect.y - origin.y) };
    }
    return base;
  }

  private renderFeature(f: Feature): SVGTemplateResult {
    const r = this.effectiveRect("feature", f.id, { x: f.x_cm, y: f.y_cm, w: f.width_cm, h: f.length_cm });
    const st = FEATURE_STYLE[f.type] ?? FEATURE_STYLE.other;
    const fs = 11 / this.k;
    const cx = r.x + r.w / 2;
    const cy = r.y + r.h / 2;
    const round = f.type === "tree" || f.type === "water_butt" || f.type === "pond" || f.type === "shrub";
    let shape: SVGTemplateResult;
    if (f.type === "tree") {
      const size = Math.min(r.w, r.h);
      shape = svg`<ellipse cx=${cx} cy=${cy} rx=${r.w / 2} ry=${r.h / 2} fill="#2f5222" fill-opacity="0.12" stroke=${st.stroke} stroke-width="1.2"
          stroke-dasharray="4 3" vector-effect="non-scaling-stroke"></ellipse>
        ${glyphUse("tree", cx, cy, size * 0.95, "#4e7d3a")}`;
    } else if (f.type === "fence") {
      // A line with posts every metre - the long side is the fence.
      const alongX = r.w >= r.h;
      const len = alongX ? r.w : r.h;
      const n = Math.max(1, Math.round(len / 100));
      const posts = Array.from({ length: n + 1 }, (_, i) => (len / n) * i);
      shape = svg`<rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} fill="transparent"></rect>
        <line x1=${alongX ? r.x : cx} y1=${alongX ? cy : r.y} x2=${alongX ? r.x + r.w : cx} y2=${alongX ? cy : r.y + r.h}
          stroke=${st.stroke} stroke-width="3" vector-effect="non-scaling-stroke" stroke-linecap="round"></line>
        ${posts.map((d) => svg`<rect x=${(alongX ? r.x + d : cx) - 4} y=${(alongX ? cy : r.y + d) - 4} width="8" height="8" fill=${st.fill} stroke=${st.stroke}
          stroke-width="1" vector-effect="non-scaling-stroke"></rect>`)}`;
    } else if (round) {
      shape = svg`<ellipse cx=${cx} cy=${cy} rx=${r.w / 2} ry=${r.h / 2} fill=${st.pattern ? `url(#feat-${st.pattern})` : st.fill}
        fill-opacity=${st.opacity ?? 0.6} stroke=${st.stroke} stroke-width="1.5" vector-effect="non-scaling-stroke"></ellipse>`;
    } else {
      shape = svg`<rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${f.type === "path" ? 2 / this.k : 4 / this.k}
        fill=${st.pattern ? `url(#feat-${st.pattern})` : st.fill} fill-opacity=${st.opacity ?? 0.6} stroke=${st.stroke} stroke-width="1.2"
        vector-effect="non-scaling-stroke" stroke-dasharray=${f.type === "trellis" ? "6 3" : "none"}></rect>`;
    }
    const showLabel = f.type !== "fence" && r.w * this.k > 44 && r.h * this.k > 16;
    return svg`<g role="button" aria-label=${`${f.name} (${this.t(`feature.${f.type}`)})`} @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, "feature", f.id)} style="cursor:move">
      <title>${f.name} · ${this.t(`feature.${f.type}`)}</title>
      ${shape}
      ${showLabel ? this.renderPill(cx, f.type === "tree" ? r.y + r.h - fs : cy, `${st.icon} ${f.name}`.trim(), fs) : nothing}
    </g>`;
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
        <pattern id="major-only" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="var(--hl-grid-line-strong)" stroke-width=${1 / this.k}></path>
        </pattern>
        <pattern id="soil" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="4" r="0.9" fill="rgba(255,255,255,0.12)"></circle>
          <circle cx="9" cy="9" r="0.7" fill="rgba(0,0,0,0.14)"></circle>
          <circle cx="14" cy="3" r="0.6" fill="rgba(0,0,0,0.10)"></circle>
          <circle cx="6" cy="14" r="1.1" fill="rgba(255,255,255,0.07)"></circle>
          <circle cx="15" cy="13" r="0.5" fill="rgba(255,255,255,0.14)"></circle>
          <path d="M1 10 q2 -1 4 0" stroke="rgba(0,0,0,0.10)" stroke-width="0.5" fill="none"></path>
        </pattern>
        <!-- depth: beds cast a soft shadow, the ground has a faint grain -->
        <filter id="bed-shadow" x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy=${3 / this.k} stdDeviation=${3 / this.k} flood-color="#2e2118" flood-opacity="0.28"></feDropShadow>
        </filter>
        <filter id="ground-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"></feTurbulence>
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.25  0 0 0 0 0.15  0 0 0 0.06 0"></feColorMatrix>
        </filter>
        <pattern id="glass" width="20" height="20" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="20" stroke="rgba(91,141,184,0.18)" stroke-width="3"></line>
        </pattern>
        <pattern id="feat-gravel" width="14" height="14" patternUnits="userSpaceOnUse">
          <rect width="14" height="14" fill="#e3d6bd"></rect>
          <circle cx="3" cy="3" r="1.4" fill="#cbbb9c"></circle><circle cx="10" cy="6" r="1.1" fill="#d4c4a6"></circle>
          <circle cx="6" cy="11" r="1.3" fill="#c2b192"></circle><circle cx="12" cy="12" r="0.8" fill="#bfae8f"></circle>
        </pattern>
        <pattern id="bark-mulch" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="#a07a52"></rect>
          <path d="M2 4l5 1M10 2l4 3M4 11l6-1M12 9l4 2M3 16l4-1M11 15l5 1" stroke="#7d5a38" stroke-width="1.4" stroke-linecap="round"></path>
        </pattern>
        <pattern id="feat-house" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill="#c9b8a8"></rect><path d="M0 0L30 30M30 0L0 30" stroke="#b3a191" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-flagstones" width="48" height="36" patternUnits="userSpaceOnUse">
          <rect width="48" height="36" fill="#9a9285"></rect>
          <path d="M2 2h18l2 13H3zM24 2h21l-1 10H25zM25 15h20v19H27zM3 18h20l-1 16H2z" fill="#d2ccc2" stroke="#b3ab9e" stroke-width="0.8"></path>
        </pattern>
        <pattern id="feat-planks" width="40" height="12" patternUnits="userSpaceOnUse">
          <rect width="40" height="12" fill="#c39463"></rect>
          <path d="M0 0.5H40M0 6.5H40M14 0V6M32 6V12" stroke="#8a6238" stroke-width="0.9"></path>
          <path d="M3 3.5h6M20 9.5h8" stroke="#a87a4c" stroke-width="0.6"></path>
        </pattern>
        <pattern id="feat-stepping" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#a6cc72"></rect>
          <ellipse cx="11" cy="11" rx="8" ry="7" fill="#cfc8bd" stroke="#958d80" stroke-width="0.8"></ellipse>
          <ellipse cx="30" cy="30" rx="8" ry="7" fill="#cfc8bd" stroke="#958d80" stroke-width="0.8"></ellipse>
        </pattern>
        <pattern id="feat-bark" width="18" height="18" patternUnits="userSpaceOnUse">
          <rect width="18" height="18" fill="#a07a52"></rect>
          <path d="M2 4l5 1M10 2l4 3M4 11l6-1M12 9l4 2M3 16l4-1M11 15l5 1" stroke="#7d5a38" stroke-width="1.4" stroke-linecap="round"></path>
        </pattern>
        <pattern id="feat-bricks" width="24" height="12" patternUnits="userSpaceOnUse">
          <rect width="24" height="12" fill="#b07a5c"></rect><path d="M0 0.5H24M0 6.5H24M12 0V6M0 6V12M24 6V12" stroke="#e6d5c8" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-pool" width="40" height="20" patternUnits="userSpaceOnUse">
          <rect width="40" height="20" fill="#62b6e6"></rect>
          <path d="M2 10q5-4 10 0t10 0 10 0 10 0" fill="none" stroke="#d8f0fb" stroke-width="1.4"></path>
        </pattern>
        <pattern id="feat-pavers" width="24" height="12" patternUnits="userSpaceOnUse">
          <rect width="24" height="12" fill="#d2ccc2"></rect><path d="M0 0.5H24M0 6.5H24M6 0V6M18 6V12" stroke="#b3ab9e" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-asphalt" width="200" height="40" patternUnits="userSpaceOnUse">
          <rect width="200" height="40" fill="#8f9294"></rect><path d="M0 20H80M120 20H200" stroke="#f1f1f1" stroke-width="3" stroke-dasharray="40 40"></path>
          <circle cx="30" cy="8" r="1" fill="#7f8284"></circle><circle cx="140" cy="32" r="1.2" fill="#a0a3a5"></circle>
        </pattern>
        <pattern id="feat-tiles" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#d6cdbf"></rect>
          <path d="M0 0H40V40H0z M20 0V20 M0 20H40 M10 20V40 M30 20V40" fill="none" stroke="#a89e8f" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-grass" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#a6cc72"></rect>
          <path d="M3 12l1-4M5 12l-1-5M11 6l1-4M13 6l-1-4M8 15l.5-3" stroke="#7fae4f" stroke-width="1" stroke-linecap="round"></path>
        </pattern>
        <pattern id="feat-flowers" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#d7e8b8"></rect>
          <circle cx="5" cy="6" r="2.4" fill="#e06aa0"></circle><circle cx="17" cy="9" r="2.2" fill="#f2c230"></circle>
          <circle cx="10" cy="18" r="2.4" fill="#8a6ac8"></circle><circle cx="21" cy="20" r="1.8" fill="#f07a1a"></circle>
          <circle cx="5" cy="6" r="0.8" fill="#fff6c0"></circle><circle cx="10" cy="18" r="0.8" fill="#fff6c0"></circle>
        </pattern>
        <pattern id="feat-water" width="30" height="16" patternUnits="userSpaceOnUse">
          <rect width="30" height="16" fill="#86bde0"></rect>
          <path d="M2 8q4-3 8 0t8 0 8 0" fill="none" stroke="#cfe7f6" stroke-width="1.2"></path>
        </pattern>
        <pattern id="feat-roof" width="20" height="10" patternUnits="userSpaceOnUse">
          <rect width="20" height="10" fill="#a4aca9"></rect><path d="M0 9.5H20M10 0V10" stroke="#7d8682" stroke-width="1"></path>
        </pattern>
        <pattern id="feat-hedge" width="20" height="20" patternUnits="userSpaceOnUse">
          <rect width="20" height="20" fill="#5f8f45"></rect>
          <circle cx="5" cy="5" r="4" fill="#6f9f52"></circle><circle cx="15" cy="12" r="5" fill="#527f3a"></circle><circle cx="6" cy="16" r="3.5" fill="#6a9a4d"></circle>
        </pattern>
        ${glyphSymbols()}
      </defs>
      <rect x="-5000" y="-5000" width="10000" height="10000" filter="url(#ground-grain)" pointer-events="none"></rect>
      <rect x="-5000" y="-5000" width="10000" height="10000" fill=${minor * this.k >= 5 ? "url(#major)" : "url(#major-only)"}></rect>
    `;
  }

  private renderZone(zone: Zone): SVGTemplateResult {
    const r = this.effectiveRect("zone", zone.id, zoneRect(zone));
    const enclosed = zone.type === "greenhouse" || zone.type === "cold_frame";
    const st = ZONE_STYLE[zone.type] ?? ZONE_STYLE.outdoor;
    const fs = 12 / this.k;
    const typeLabel = this.t(`settings.zone_type.${zone.type}`);
    const label = zone.name.toLowerCase() === typeLabel.toLowerCase() ? `${st.icon} ${zone.name}` : `${st.icon} ${zone.name} · ${typeLabel}`;
    const focused = this.focusZone === zone.id;
    return svg`
      <g role="button" aria-label=${label} @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, "zone", zone.id)}
        @dblclick=${() => this.dispatchEvent(new CustomEvent("zone-open", { detail: zone.id }))}>
        <rect class="zone-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${8 / this.k}
          fill=${st.fill} stroke=${st.stroke} stroke-dasharray=${st.dash} stroke-width=${focused ? 2.5 : 1.5}></rect>
        ${enclosed ? svg`<rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} fill="url(#glass)" pointer-events="none"></rect>` : nothing}
        <text class="label zone-label" x=${r.x + 2 / this.k} y=${r.y - fs * 0.5} font-size=${fs} font-weight="700">${label}</text>
      </g>`;
  }

  private renderBed(bed: Bed): SVGTemplateResult {
    const r = this.bedAbs(bed);
    const fs = 12 / this.k;
    const ba = this.analysis?.beds[bed.id];
    const status = ba?.moisture_status ?? "unknown";
    const moistureStroke = this.showMoisture && status !== "unknown" ? MOISTURE_COLORS[status] : "rgba(46,33,24,0.45)";
    const zoneType = this.zones.find((z) => z.id === bed.zone_id)?.type ?? "outdoor";
    // Orchards sit in grass, fruit corners in mulch; herb & flower borders keep soil.
    const open = zoneType === "orchard" || zoneType === "fruit";
    const fill = zoneType === "orchard" ? "url(#feat-grass)" : zoneType === "fruit" ? "url(#bark-mulch)"
      : bed.kind === "container" ? "var(--hl-container-fill)" : bed.kind === "raised" ? "var(--hl-bed-fill-raised)" : "var(--hl-bed-fill)";
    const radius = bed.kind === "container" ? Math.min(r.w, r.h) / 4 : 4 / this.k;
    const moisture = ba?.irrigation.moisture;
    const soilT = ba?.sensors?.soil_temperature?.value;
    const report = this.reports[bed.id] ?? ba?.compatibility;
    const issues = (report?.pairs.filter((p) => p.severity !== "info").length ?? 0) + (report?.rotation?.length ?? 0);
    return svg`
      <g role="button" aria-label=${`${bed.name}, ${this.t(`kind.${bed.kind}`)}, ${Math.round(bed.width_cm)} × ${Math.round(bed.length_cm)} cm`}
        @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, "bed", bed.id)}>
        <rect class="bed-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${radius} fill=${fill} filter=${open ? nothing : "url(#bed-shadow)"}
          stroke=${moistureStroke} stroke-width=${this.showMoisture && status !== "unknown" ? 3 : 1.5}></rect>
        ${open ? nothing : svg`<rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${radius} fill="url(#soil)" pointer-events="none"></rect>`}
        ${bed.kind === "raised" && !open && r.w * this.k > 24
          ? svg`<rect x=${r.x + 2.5 / this.k} y=${r.y + 2.5 / this.k} width=${Math.max(r.w - 5 / this.k, 0)} height=${Math.max(r.h - 5 / this.k, 0)} rx=${radius}
              fill="none" stroke="#a0754e" stroke-width=${3.5 / this.k} opacity="0.85" pointer-events="none"></rect>
            <rect x=${r.x + 4.5 / this.k} y=${r.y + 4.5 / this.k} width=${Math.max(r.w - 9 / this.k, 0)} height=${Math.max(r.h - 9 / this.k, 0)} rx=${radius}
              fill="none" stroke="rgba(255,255,255,0.16)" stroke-width=${1 / this.k} pointer-events="none"></rect>`
          : nothing}
        ${this.showMoisture && status !== "unknown"
          ? svg`<rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${radius} fill=${MOISTURE_COLORS[status]} opacity="0.12" pointer-events="none"></rect>`
          : nothing}
        ${open || r.w * this.k < 50 ? nothing : svg`<text class="label on-soil" x=${r.x + 6 / this.k} y=${r.y + r.h - 6 / this.k} font-size=${fs} font-weight="600">${bed.name}</text>`}
        ${this.showMoisture && moisture != null
          ? svg`<text class="label on-soil" x=${r.x + r.w - 6 / this.k} y=${r.y + r.h - 6 / this.k} font-size=${fs * 0.95} text-anchor="end">💧 ${Math.round(moisture)}%</text>`
          : nothing}
        ${this.showTemperature && soilT != null
          ? svg`<text class="label on-soil" x=${r.x + r.w - 6 / this.k} y=${r.y + fs * 1.3} font-size=${fs * 0.95} text-anchor="end">🌡 ${soilT.toFixed(1)} °C</text>`
          : nothing}
        ${issues ? this.renderBadge(r.x + r.w, r.y, String(issues), "var(--hl-tomato-500)") : nothing}
      </g>`;
  }

  private renderBadge(cx: number, cy: number, text: string, color: string, px = 9): SVGTemplateResult {
    const rad = px / this.k;
    return svg`<g pointer-events="none"><circle cx=${cx} cy=${cy} r=${rad} fill=${color} stroke="#fff" stroke-width=${1.5 / this.k}></circle>
      <text class="badge-text" x=${cx} y=${cy + rad * 0.38} font-size=${rad * 1.1} text-anchor="middle">${text}</text></g>`;
  }

  /** White rounded label with dark text - readable on any soil or crop. */
  private renderPill(cx: number, cy: number, text: string, fs: number): SVGTemplateResult {
    const w = text.length * fs * 0.56 + fs * 1.1;
    const h = fs * 1.55;
    return svg`<g pointer-events="none">
      <rect x=${cx - w / 2} y=${cy - h / 2} width=${w} height=${h} rx=${h / 2} fill="var(--hl-pill-bg, rgba(255,255,255,0.9))"
        stroke="rgba(0,0,0,0.12)" stroke-width="1" vector-effect="non-scaling-stroke"></rect>
      <text class="pill-text" x=${cx} y=${cy + fs * 0.36} font-size=${fs} text-anchor="middle">${text}</text></g>`;
  }

  /** How grown a crop looks on the day shown: seedlings when planted, full size at harvest. */
  private growth(p: Planting, plant: Plant): number {
    const tl = this.timelines[p.id];
    const day = this.viewDate || this.analysis?.today;
    if (!tl || !day || plant.perennial) return 1;
    const t = Date.parse(day), a = Date.parse(tl.in_ground), b = Date.parse(tl.harvest_start), e = Date.parse(tl.harvest_end);
    if (t < a) return 0.4;
    if (t >= e) return 0.85;
    if (t >= b || b <= a) return 1;
    return 0.45 + (0.55 * (t - a)) / (b - a);
  }

  private renderPlanting(p: Planting): SVGTemplateResult | typeof nothing {
    const bed = this.beds.find((b) => b.id === p.bed_id);
    const plant = this.plants.get(p.plant_id);
    if (!bed || !plant) return nothing;
    const bedR = this.bedAbs(bed);
    const base = { x: bedR.x + p.x_cm, y: bedR.y + p.y_cm, w: p.width_cm, h: p.length_cm };
    const r = this.effectiveRect("planting", p.id, base);
    const famColor = familyColor(this.families, plant.family);
    const color = plant.color || famColor;
    const icon = glyphFor(plant);
    const name = plantName(plant, this.lang);
    const active = !this.viewDate || isActiveOn(p, this.timelines[p.id], this.viewDate);
    const local = { ...p, x_cm: r.x - bedR.x, y_cm: r.y - bedR.y, width_cm: r.w, length_cm: r.h };
    const dots = plantPositions(local, plant);
    const report = this.reports[bed.id] ?? this.analysis?.beds[bed.id]?.compatibility;
    const mine = report?.pairs.filter((f) => (f.a === p.id || f.b === p.id) && f.severity !== "info") ?? [];
    const outOfBounds = report?.out_of_bounds?.includes(p.id);
    const k = this.k;
    const perPlantPx = Math.min(plant.spacing_cm, r.w, r.h) * k;
    // Dense crops (carrots, radish, onions ...) read as rows of seedlings with one big icon;
    // larger plants get an icon each.
    const dense = perPlantPx < 18 || dots.length > 90;
    const label = `${name} – ${this.t(`planner.layout.${p.layout}`)}, ${this.t("planner.count", { n: dots.length })}` +
      (mine.length ? ` – ${mine.length} ⚠` : "") + (plant.perennial ? ` – ${this.t("planner.perennial")}` : "");
    const fs = 11 / k;
    let body: unknown;
    if (dense) {
      const alongX = r.w >= r.h;
      const across = alongX ? r.h : r.w;
      const length = alongX ? r.w : r.h;
      const gap = Math.max(p.layout === "row" ? plant.row_spacing_cm : Math.max(plant.row_spacing_cm / 2, plant.spacing_cm), 4);
      const nRows = Math.max(1, Math.floor(across / gap));
      const margin = Math.min(plant.spacing_cm / 2, length / 4);
      const strokeW = Math.max(Math.min(plant.spacing_cm * 0.9, gap * 0.45) * this.growth(p, plant), 1.5);
      const leaf = plant.category === "flower" ? color : "#5f9a3a";
      const rows = Array.from({ length: nRows }, (_, i) => (across / nRows) * (i + 0.5));
      const dash = `${Math.max(plant.spacing_cm * 0.6, 1.5)} ${Math.max(plant.spacing_cm * 0.4, 1)}`;
      const big = Math.max(Math.min(Math.min(r.w, r.h) * 0.72, 46 / k), 16 / k);
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      body = svg`
        ${rows.map((o) => alongX
          ? svg`<line x1=${r.x + margin} y1=${r.y + o} x2=${r.x + r.w - margin} y2=${r.y + o} stroke=${leaf} stroke-width=${strokeW}
              stroke-linecap="round" stroke-dasharray=${dash} opacity="0.75"></line>`
          : svg`<line x1=${r.x + o} y1=${r.y + margin} x2=${r.x + o} y2=${r.y + r.h - margin} stroke=${leaf} stroke-width=${strokeW}
              stroke-linecap="round" stroke-dasharray=${dash} opacity="0.75"></line>`)}
        <circle cx=${cx} cy=${cy} r=${big * 0.62} fill="var(--hl-pill-bg, rgba(255,255,255,0.92))" stroke=${famColor} stroke-width="2"
          vector-effect="non-scaling-stroke"></circle>
        ${glyphUse(icon, cx, cy, big * 0.92, color)}`;
    } else {
      const size = Math.max(Math.min(plant.spacing_cm * 0.92, Math.min(r.w, r.h) * 1.05) * this.growth(p, plant), 6 / k);
      body = svg`
        ${dots.slice(0, 300).map(([x, y]) => svg`<ellipse cx=${bedR.x + x} cy=${bedR.y + y + size * 0.42} rx=${size * 0.36} ry=${size * 0.09}
          fill="rgba(0,0,0,0.18)"></ellipse>`)}
        ${dots.slice(0, 300).map(([x, y]) => glyphUse(icon, bedR.x + x, bedR.y + y, size, color))}`;
    }
    const nameW = (name.length * 0.56 + 1.1) * fs;
    const roomForName = r.w * k >= Math.min(name.length * 7 + 16, 140) && r.h * k >= (dense ? 64 : 34);
    // Thin rows: the label sits next to the big icon instead of under it.
    const besideIcon = dense && !roomForName && r.w >= r.h && r.w * k >= nameW * k + 70 && r.h * k >= 16;
    const pillY = dense ? r.y + r.h - Math.max(fs * 1.1, Math.min(r.h * 0.12, 14 / k)) : r.y + r.h - fs * 0.95;
    const bigR = Math.max(Math.min(Math.min(r.w, r.h) * 0.72, 46 / k), 16 / k) * 0.62;
    return svg`
      <g class="planting ${active ? "" : "faded"}" role="button" aria-label=${label}
        @pointerdown=${(e: PointerEvent) => this.onPointerDown(e, "planting", p.id)}>
        <title>${label}</title>
        <rect class="planting-rect" x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${4 / k}
          fill=${color} fill-opacity="0.13" stroke=${famColor} stroke-width="1.6" stroke-dasharray=${active ? "none" : "4 3"}></rect>
        ${body}
        ${besideIcon
          ? this.renderPill(r.x + r.w / 2 + bigR + 6 / k + nameW / 2, r.y + r.h / 2, name, fs)
          : roomForName
          ? this.renderPill(r.x + r.w / 2, pillY, name, fs)
          : !dense && perPlantPx < 10 && r.w * k > 22 && r.h * k > 22
            ? svg`<text class="mono" x=${r.x + r.w / 2} y=${r.y + r.h / 2 + fs * 0.35} font-size=${fs} text-anchor="middle">${plantMonogram(name)}</text>`
            : nothing}
        ${plant.perennial && r.w * k >= 36 && r.h * k >= 36 ? this.renderBadge(r.x + r.w - 9 / k, r.y + r.h - 9 / k, "∞", "var(--hl-leaf-700)", 7) : nothing}
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
        const st = LINK_STYLE[f.kind] ?? LINK_STYLE.overlap;
        out.push(svg`<line class="link" x1=${a[0]} y1=${a[1]} x2=${b[0]} y2=${b[1]} stroke=${st.color}
          stroke-width=${st.width} stroke-dasharray=${st.dash} stroke-linecap="round" opacity="0.9"><title>${this.t(f.key, f.params)}</title></line>`);
      }
    }
    return out;
  }

  private selectionRect(sel: Selection): Rect | null {
    if (sel.kind === "feature") {
      const f = this.features.find((i) => i.id === sel.id);
      return f ? this.effectiveRect("feature", f.id, { x: f.x_cm, y: f.y_cm, w: f.width_cm, h: f.length_cm }) : null;
    }
    if (sel.kind === "bed") {
      const b = this.beds.find((i) => i.id === sel.id);
      return b ? this.bedAbs(b) : null;
    }
    if (sel.kind === "zone") {
      const z = this.zones.find((i) => i.id === sel.id);
      return z ? this.effectiveRect("zone", z.id, zoneRect(z)) : null;
    }
    const p = this.plantings.find((i) => i.id === sel.id);
    const bed = p && this.beds.find((b) => b.id === p.bed_id);
    if (!p || !bed) return null;
    const br = this.bedAbs(bed);
    return this.effectiveRect("planting", p.id, { x: br.x + p.x_cm, y: br.y + p.y_cm, w: p.width_cm, h: p.length_cm });
  }

  private renderMulti(): SVGTemplateResult[] {
    if (this.multi.length < 2) return [];
    const pad = 3 / this.k;
    return this.multi
      .filter((m) => !(this.selection && m.kind === this.selection.kind && m.id === this.selection.id))
      .map((m) => this.selectionRect(m))
      .filter((r): r is Rect => !!r)
      .map((r) => svg`<rect class="selected-outline" x=${r.x - pad} y=${r.y - pad} width=${r.w + pad * 2} height=${r.h + pad * 2} opacity="0.7"></rect>`);
  }

  private renderSelection(): SVGTemplateResult | typeof nothing {
    const sel = this.selection;
    if (!sel) return nothing;
    let r: Rect | null = null;
    if (sel.kind === "feature") {
      r = this.selectionRect(sel);
    } else if (sel.kind === "bed") {
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
      ${this.readonly || (this.lockLayout && sel.kind !== "planting") ? nothing : svg`<rect class="handle" x=${r.x + r.w - hs / 2} y=${r.y + r.h - hs / 2} width=${hs} height=${hs} rx=${2 / this.k}
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

  private renderDrawRect(): SVGTemplateResult | typeof nothing {
    const r = this.drawRect;
    const tool = this.drawTool;
    if (!r || !tool || (!r.w && !r.h)) return nothing;
    const fs = 12 / this.k;
    const m = (cm: number) => (cm / 100).toLocaleString(localeOf(this.lang), { maximumFractionDigits: 1 });
    return svg`<g pointer-events="none">
      <rect x=${r.x} y=${r.y} width=${r.w} height=${r.h} rx=${4 / this.k} fill=${tool.color} fill-opacity="0.22"
        stroke=${tool.color} stroke-width="2" stroke-dasharray="6 3" vector-effect="non-scaling-stroke"></rect>
      ${this.renderPill(r.x + r.w / 2, r.y + r.h / 2, `${tool.label} · ${m(r.w)} × ${m(r.h)} m`, fs)}
    </g>`;
  }

  /** Dim everything outside the zone being edited. */
  private outside(rect: Rect): boolean {
    if (!this.focusZone) return false;
    const z = this.zones.find((i) => i.id === this.focusZone);
    if (!z) return false;
    const cx = rect.x + rect.w / 2;
    const cy = rect.y + rect.h / 2;
    return !(cx >= z.x_cm && cx <= z.x_cm + z.width_cm && cy >= z.y_cm && cy <= z.y_cm + z.length_cm);
  }

  render() {
    const focus = this.focusZone;
    const dim = (out: boolean, content: unknown) => (out ? svg`<g class="dimmed">${content}</g>` : content);
    return html`
      <svg
        tabindex="0"
        role="application"
        aria-roledescription="garden plan"
        aria-label=${this.t?.("nav.planner") ?? "Planner"}
        class=${this.drag?.mode === "pan" ? "panning" : this.drawTool ? "drawing" : ""}
        @pointerdown=${(e: PointerEvent) => this.onPointerDown(e)}
        @pointermove=${this.onPointerMove}
        @pointerup=${this.onPointerUp}
        @pointercancel=${this.onPointerUp}
        @wheel=${this.onWheel}
      >
        <g transform=${`translate(${this.tx} ${this.ty}) scale(${this.k})`}>
          ${this.renderGrid()} ${this.showZones ? this.zones.map((z) => dim(!!focus && z.id !== focus, this.renderZone(z))) : nothing}
          ${this.showFeatures ? this.features.map((f) => dim(this.outside({ x: f.x_cm, y: f.y_cm, w: f.width_cm, h: f.length_cm }), this.renderFeature(f))) : nothing}
          ${this.beds.map((b) => dim(!!focus && b.zone_id !== focus, this.renderBed(b)))}
          ${this.showPlantings ? this.plantings.map((p) => {
            const bed = this.beds.find((b) => b.id === p.bed_id);
            return dim(!!focus && bed?.zone_id !== focus, this.renderPlanting(p));
          }) : nothing} ${this.showPlantings ? this.renderLinks() : nothing}
          ${this.renderMulti()} ${this.renderSelection()} ${this.renderGhost()} ${this.renderDrawRect()}
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
