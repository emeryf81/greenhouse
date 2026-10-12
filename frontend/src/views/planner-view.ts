import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type {
  AutofillResult, Bed, BedKind, CompatibilityReport, FamilyInfo, Feature, FeatureType, LayoutMode, PlanDoc, Plant, Planting,
  PlantingStatus, Resources, Snapshot, SoilType, SowMethod, Timeline, Wind, Zone, ZoneType,
} from "../types";
import { ZONE_CATEGORIES, addDays, daysBetween, download, familyColor, formatDate, plantName, presentIn, uid } from "../util/garden";
import "../planner/garden-canvas";
import { FEATURE_STYLE, ZONE_STYLE, type DrawTool, type GardenCanvas, type ItemChangeDetail, type Selection } from "../planner/garden-canvas";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { alignRects, bedAt, clampInto, defaultFootprint, extents, findFreeSpot, plantCount, snap, type AlignMode, type Rect } from "../planner/geometry";
import "../components/info";
import { History } from "../planner/history";

type SaveState = "saved" | "dirty" | "saving" | "error";

interface PaletteDrag {
  plant: Plant;
  pointerId: number;
  bedId: string | null;
  rect: Rect | null;
}

const clone = <T,>(v: T): T => structuredClone(v);
const emptySensors = () => ({ soil_moisture: null, soil_temperature: null, air_temperature: null, air_humidity: null, light: null, rain: null });
const FEATURE_TYPES: FeatureType[] = [
  "house", "driveway", "street", "parking", "terrace", "path", "lawn", "flowerbed", "hedge", "fence", "tree", "pond",
  "shed", "compost", "water_butt", "trellis", "play", "beehive", "other",
];
const FEATURE_SIZE: Record<FeatureType, [number, number]> = {
  path: [300, 60], terrace: [400, 300], lawn: [500, 400], flowerbed: [200, 100], compost: [100, 100], water_butt: [60, 60],
  shed: [200, 150], tree: [400, 400], house: [1000, 800], driveway: [300, 800], street: [1500, 600], parking: [500, 500],
  play: [300, 300], beehive: [60, 60], hedge: [400, 80], fence: [500, 10], trellis: [200, 20], pond: [200, 150], other: [80, 80],
};
const ZONE_TYPES: ZoneType[] = ["outdoor", "greenhouse", "cold_frame", "orchard", "fruit", "herbs", "flowers"];
/** Zones whose plants live in one big "bed" (trees, bushes, herb & flower borders). */
const OPEN_ZONES: ZoneType[] = ["orchard", "fruit", "herbs", "flowers"];
const ZONE_SIZE: Record<ZoneType, [number, number]> = {
  outdoor: [600, 400], greenhouse: [300, 200], cold_frame: [150, 80], orchard: [1000, 800], fruit: [600, 300], herbs: [300, 200], flowers: [400, 150],
};
type Step = "site" | "zones" | "plant";
type Tool = { kind: "zone"; type: ZoneType } | { kind: "feature"; type: FeatureType } | { kind: "bed" };
const GOALS = ["fresh", "storage", "herbs", "pollinators", "winter", "perennials", "easy"];
const CATEGORIES = ["vegetable", "herb", "fruit", "flower"] as const;

export function defaultMethod(plant: Plant): SowMethod {
  const s = plant.sowing;
  if (s.direct_sow.length && (!s.indoor_sow.length || plant.habit === "root" || plant.tags.includes("root"))) return "direct_sow";
  if (s.indoor_sow.length && s.transplant.length) return "indoor_sow";
  if (s.transplant.length) return "transplant";
  return "direct_sow";
}

@customElement("hl-planner-view")
export class PlannerView extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) plants: Plant[] = [];
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property({ type: Boolean }) admin = true;
  @property({ type: Boolean }) narrow = false;

  @state() private draft: PlanDoc = { zones: [], beds: [], plantings: [], features: [] };
  @state() private selection: Selection | null = null;
  @state() private multi: Selection[] = [];
  @state() private showFeatures = true;
  @state() private showPlantings = true;
  @state() private showZones = true;
  @state() private categoryFilter = "";
  @state() private autofill: AutofillResult | null = null;
  @state() private autofillBusy = false;
  @state() private autofillReplace = false;
  @state() private autofillBeds: string[] = [];
  @state() private autofillResources: Resources | null = null;
  @state() private season = new Date().getFullYear();
  @state() private saveState: SaveState = "saved";
  @state() private reports: Record<string, CompatibilityReport> = {};
  @state() private extraTimelines: Record<string, Timeline> = {};
  @state() private snapOn = true;
  @state() private showCompanions = true;
  @state() private showMoisture = true;
  @state() private showTemperature = false;
  @state() private viewDate = "";
  @state() private layoutMode: LayoutMode = "block";
  @state() private search = "";
  @state() private familyFilter = "";
  @state() private paletteDrag: PaletteDrag | null = null;
  @state() private ghostReport: CompatibilityReport | null = null;
  @state() private dialog: "shortcuts" | "succession" | "import" | "autofill" | null = null;
  @state() private announcement = "";
  @state() private paletteOpen = true;
  @state() private step: Step = "plant";
  @state() private tool: Tool | null = null;
  @state() private focusZone = "";
  @state() private removing: Planting | null = null;

  @query("hl-garden-canvas") private canvas!: GardenCanvas;

  private history: History<PlanDoc> | null = null;
  private baseRevision: number | null = null;
  private saveTimer?: number;
  private checkTimers = new Map<string, number>();
  private ghostCheckAt = 0;
  private plantMap = new Map<string, Plant>();

  static styles = [
    shared,
    css`
      :host { display: block; height: 100%; }
      .layout { display: grid; grid-template-columns: 260px 1fr 320px; gap: var(--hl-s3); height: calc(100vh - 150px); min-height: 520px; }
      .layout.narrow { grid-template-columns: 1fr; height: auto; }
      .layout.narrow hl-garden-canvas { height: 58vh; }
      /* Mobile: canvas first, palette becomes a horizontal strip, inspector last. */
      .layout.narrow .center { order: -1; }
      .layout.narrow .palette-list { flex-direction: row; overflow-x: auto; padding-bottom: 4px; scroll-snap-type: x proximity; }
      .layout.narrow .plant-card { min-width: 168px; scroll-snap-align: start; }
      .layout.narrow .family-chips { flex-wrap: nowrap; overflow-x: auto; }
      .layout.narrow .legend-block { display: none; }
      .layout.palette-closed { grid-template-columns: 0 1fr 320px; }
      .pane { background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
      .pane > header { padding: var(--hl-s3) var(--hl-s4); border-bottom: 1px solid var(--hl-border); display: flex; align-items: center; gap: var(--hl-s2); }
      .pane-body { padding: var(--hl-s3) var(--hl-s4); overflow: auto; flex: 1; }
      .toolbar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--hl-s1); padding: var(--hl-s2); background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); margin-bottom: var(--hl-s3); }
      .toolbar .sep { width: 1px; height: 24px; background: var(--hl-border); margin: 0 var(--hl-s1); }
      .toolbar select, .toolbar input[type="date"] { width: auto; min-height: 32px; padding: 4px 8px; }
      .save-state { font-size: var(--hl-fs-xs); color: var(--hl-text-muted); display: inline-flex; align-items: center; gap: 4px; }
      .save-state.error { color: var(--hl-danger); }
      .center { position: relative; min-height: 0; }
      hl-garden-canvas { height: 100%; }
      .palette-list { display: flex; flex-direction: column; gap: var(--hl-s1); }
      .plant-card { display: flex; align-items: center; gap: var(--hl-s2); padding: 6px 8px; border-radius: var(--hl-r-md);
        border: 1px solid transparent; background: var(--hl-surface-2); cursor: grab; touch-action: none; user-select: none; text-align: left; width: 100%; color: var(--hl-text); }
      .plant-card:hover { border-color: var(--hl-border); background: var(--hl-surface-3); }
      .plant-card:active { cursor: grabbing; }
      .plant-card .swatch { width: 34px; height: 34px; border-radius: 10px; display: grid; place-items: center; flex: none;
        background: var(--hl-surface); border: 2px solid; }
      .plant-card .meta { display: flex; flex-direction: column; min-width: 0; }
      .plant-card .meta span:first-child { font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
      .segmented { display: inline-flex; background: var(--hl-surface-2); border-radius: var(--hl-r-pill); padding: 2px; }
      .segmented button { border: 0; background: transparent; padding: 4px 10px; border-radius: var(--hl-r-pill); cursor: pointer; font-size: var(--hl-fs-xs); font-weight: 600; color: var(--hl-text-muted); }
      .segmented button[aria-pressed="true"] { background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-1); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .finding { display: flex; gap: var(--hl-s2); align-items: flex-start; font-size: var(--hl-fs-sm); padding: 6px 8px; border-radius: var(--hl-r-sm); background: var(--hl-surface-2); }
      .finding.error { background: var(--hl-tomato-100); }
      .finding.warning { background: var(--hl-sun-100); }
      .finding.info { background: var(--hl-leaf-100); }
      .timeline { position: relative; height: 64px; border-radius: var(--hl-r-sm); background: var(--hl-surface-2); overflow: hidden; }
      .timeline .bar { position: absolute; height: 12px; border-radius: 6px; }
      .timeline .month { position: absolute; bottom: 2px; font-size: 10px; color: var(--hl-text-muted); transform: translateX(-50%); }
      .timeline .today { position: absolute; top: 0; bottom: 0; width: 2px; background: var(--hl-focus); }
      .legend { display: flex; flex-wrap: wrap; gap: var(--hl-s2); font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      .legend span { display: inline-flex; align-items: center; gap: 4px; }
      .score { font-size: var(--hl-fs-2xl); font-weight: 700; }
      .prefs { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: 8px 12px; display: grid;
        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px 12px; }
      .prefs legend { font-weight: 600; padding: 0 4px; }
      .more { position: relative; }
      .more > summary { list-style: none; cursor: pointer; }
      .more > summary::-webkit-details-marker { display: none; }
      .more .menu { position: absolute; right: 0; top: calc(100% + 4px); z-index: 5; min-width: 220px; display: flex; flex-direction: column;
        background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); box-shadow: var(--hl-shadow-2); padding: 4px; }
      .more .menu button { display: flex; gap: 8px; align-items: center; border: 0; background: none; padding: 8px 10px; border-radius: var(--hl-r-sm);
        cursor: pointer; color: var(--hl-text); font: inherit; text-align: left; }
      .more .menu button:hover { background: var(--hl-surface-2); }
      .stepper { display: flex; align-items: center; gap: var(--hl-s1); flex-wrap: wrap; margin-bottom: var(--hl-s2); }
      .step { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: var(--hl-r-pill);
        border: 1px solid var(--hl-border); background: var(--hl-surface); color: var(--hl-text); cursor: pointer; text-align: left; font: inherit; }
      .step .num { width: 24px; height: 24px; border-radius: 50%; display: grid; place-items: center; background: var(--hl-surface-3);
        font-weight: 700; font-size: var(--hl-fs-xs); }
      .step .txt { display: flex; flex-direction: column; line-height: 1.15; }
      .step.active { border-color: var(--hl-leaf-500); background: var(--hl-leaf-100); }
      .step.active .num { background: var(--hl-leaf-600); color: #fff; }
      .step-sep { color: var(--hl-text-muted); }
      .crumbs { display: inline-flex; gap: 6px; align-items: center; }
      .tool-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(74px, 1fr)); gap: 6px; }
      .tool { display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 8px 4px; border-radius: var(--hl-r-md);
        border: 1px solid var(--hl-border); background: var(--hl-surface-2); cursor: pointer; color: var(--hl-text); font: inherit; }
      .tool:hover { background: var(--hl-surface-3); }
      .tool.active { border-color: var(--hl-focus); box-shadow: 0 0 0 2px color-mix(in srgb, var(--hl-focus) 30%, transparent); background: var(--hl-surface); }
      .tool-icon { font-size: 22px; line-height: 1; }
      .tool-label { font-size: 11px; text-align: center; line-height: 1.15; }
      .zone-row { display: flex; gap: 8px; align-items: center; padding: 6px 8px; border-radius: var(--hl-r-md); background: var(--hl-surface-2);
        border: 0; width: 100%; text-align: left; color: var(--hl-text); font: inherit; }
      .zone-row.as-btn { cursor: pointer; }
      .zone-card { display: flex; gap: 10px; align-items: center; padding: 10px; border-radius: var(--hl-r-md); border: 1px solid var(--hl-border);
        border-left-width: 5px; background: var(--hl-surface); cursor: pointer; text-align: left; color: var(--hl-text); font: inherit; width: 100%; }
      .zone-card:hover { background: var(--hl-surface-2); }
      .zone-card .big { font-size: 26px; }
      .grow { flex: 1; min-width: 0; }
      .draw-hint { position: absolute; left: 50%; top: 12px; transform: translateX(-50%); display: flex; gap: 8px; align-items: center;
        background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-pill); padding: 4px 6px 4px 12px;
        box-shadow: var(--hl-shadow-2); font-size: var(--hl-fs-sm); z-index: 2; max-width: calc(100% - 24px); }
      .zone-filter { background: var(--hl-leaf-100); border-radius: var(--hl-r-sm); padding: 4px 8px; margin: 0; }
      .perennial-tag { display: inline-grid; place-items: center; width: 16px; height: 16px; border-radius: 50%; background: var(--hl-leaf-700);
        color: #fff; font-size: 11px; vertical-align: 1px; }
      .badge-demo { display: inline-grid; place-items: center; width: 16px; height: 16px; border-radius: 50%; color: #fff; font-size: 10px; font-weight: 700; }
      .row-demo { display: inline-block; width: 22px; height: 0; border-top: 4px dashed #5f9a3a; }
      .tips summary { cursor: pointer; font-weight: 600; }
      .tips ul { margin: 6px 0 0; padding-left: 18px; font-size: var(--hl-fs-sm); }
      .tips li { margin-bottom: 4px; }
      .plant-glyph { display: block; }
      .readonly-note { font-size: var(--hl-fs-xs); color: var(--hl-warning); }
      dialog { border: none; border-radius: var(--hl-r-lg); padding: var(--hl-s5); max-width: 520px; width: calc(100% - 32px); background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-3); }
      dialog::backdrop { background: rgba(20, 24, 18, 0.45); }
      kbd { font-family: ui-monospace, monospace; font-size: 12px; background: var(--hl-surface-2); border: 1px solid var(--hl-border); border-bottom-width: 2px; border-radius: 4px; padding: 1px 6px; }
      table.shortcuts td { padding: 4px 8px; }
      .drag-ghost-hint { position: absolute; left: 50%; top: 12px; transform: translateX(-50%); background: var(--hl-surface); border: 1px solid var(--hl-border);
        padding: 6px 12px; border-radius: var(--hl-r-pill); box-shadow: var(--hl-shadow-2); font-size: var(--hl-fs-sm); pointer-events: none; max-width: 90%; }
    `,
  ];

  // ---------------------------------------------------------------------- //
  // Data sync
  // ---------------------------------------------------------------------- //
  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("plants")) this.plantMap = new Map(this.plants.map((p) => [p.id, p]));
    if (changed.has("snapshot") && this.snapshot) this.syncFromSnapshot();
  }

  private syncFromSnapshot(): void {
    const snap = this.snapshot;
    if (!this.history) {
      this.season = snap.analysis?.season ?? new Date().getFullYear();
      this.viewDate = snap.analysis?.today ?? "";
      this.step = !snap.zones.length ? "site" : snap.plantings.length ? "plant" : "zones";
    }
    const unchangedLocally = this.saveState === "saved";
    if (!this.history || (unchangedLocally && snap.revision !== this.baseRevision)) {
      const doc = { zones: clone(snap.zones), beds: clone(snap.beds), plantings: clone(snap.plantings), features: clone(snap.features ?? []) };
      this.history ? this.history.reset(doc) : (this.history = new History(doc));
      this.draft = doc;
      this.baseRevision = snap.revision;
      this.reports = {};
      this.extraTimelines = {};
    }
  }

  private get timelines(): Record<string, Timeline> {
    return { ...(this.snapshot.analysis?.timelines ?? {}), ...this.extraTimelines };
  }

  /** Plantings in the ground this season: annuals of this season plus perennials carried over. */
  private get seasonPlantings(): Planting[] {
    return this.draft.plantings.filter((p) => presentIn(p, !!this.plantMap.get(p.plant_id)?.perennial, this.season));
  }

  private commit(next: PlanDoc, message?: string, touchedBeds: string[] = []): void {
    if (!this.admin || !this.history) return;
    this.draft = this.history.commit(next);
    this.saveState = "dirty";
    this.scheduleSave();
    for (const bedId of touchedBeds) this.scheduleCheck(bedId);
    if (message) this.announce(message);
  }

  private undo(): void {
    if (!this.history?.canUndo) return;
    this.draft = this.history.undo();
    this.afterHistoryJump();
  }

  private redo(): void {
    if (!this.history?.canRedo) return;
    this.draft = this.history.redo();
    this.afterHistoryJump();
  }

  private afterHistoryJump(): void {
    this.saveState = "dirty";
    this.scheduleSave();
    this.draft.beds.forEach((b) => this.scheduleCheck(b.id));
    if (this.selection && !this.findItem(this.selection)) this.selection = null;
  }

  private scheduleSave(): void {
    window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => this.save(), 1200);
  }

  private async save(): Promise<void> {
    if (this.saveState !== "dirty") return;
    const doc = this.draft;
    this.saveState = "saving";
    try {
      const res = await this.api.savePlan(doc, this.baseRevision);
      this.baseRevision = res.revision;
      this.saveState = this.draft === doc ? "saved" : "dirty";
      if (this.saveState === "dirty") this.scheduleSave();
    } catch (err) {
      const code = (err as { code?: string }).code;
      if (code === "revision_conflict") {
        this.saveState = "saved";
        this.history = null;
        this.syncFromSnapshot();
        this.toast(this.t("common.conflict"));
      } else {
        this.saveState = "error";
        this.toast(this.t("common.error", { message: (err as Error).message ?? String(err) }));
      }
    }
  }

  private scheduleCheck(bedId: string): void {
    window.clearTimeout(this.checkTimers.get(bedId));
    this.checkTimers.set(bedId, window.setTimeout(() => this.runCheck(bedId), 250));
  }

  private bedPlantings(bedId: string, doc = this.draft): Planting[] {
    return doc.plantings.filter((p) => p.bed_id === bedId && (this.plantMap.get(p.plant_id)?.perennial
      ? presentIn(p, true, this.season) : Math.abs(p.season - this.season) <= 1));
  }

  private async runCheck(bedId: string): Promise<void> {
    const bed = this.draft.beds.find((b) => b.id === bedId);
    if (!bed) {
      const { [bedId]: _drop, ...rest } = this.reports;
      this.reports = rest;
      return;
    }
    try {
      const report = await this.api.checkBed(bed, this.bedPlantings(bedId));
      this.reports = { ...this.reports, [bedId]: report };
      if (report.timelines) this.extraTimelines = { ...this.extraTimelines, ...report.timelines };
    } catch {
      /* transient - the next commit re-checks */
    }
  }

  // ---------------------------------------------------------------------- //
  // Mutations
  // ---------------------------------------------------------------------- //
  private findItem(sel: Selection): Zone | Bed | Planting | Feature | undefined {
    const list = sel.kind === "zone" ? this.draft.zones : sel.kind === "bed" ? this.draft.beds : sel.kind === "feature" ? this.draft.features : this.draft.plantings;
    return (list as { id: string }[]).find((i) => i.id === sel.id) as Zone | Bed | Planting | Feature | undefined;
  }

  private onSelect(sel: Selection | null): void {
    if (!sel) {
      this.selection = null;
      this.multi = [];
      return;
    }
    if (sel.additive) {
      const same = this.multi.filter((m) => m.kind === sel.kind);
      const exists = same.some((m) => m.id === sel.id);
      this.multi = exists ? same.filter((m) => m.id !== sel.id) : [...same, { kind: sel.kind, id: sel.id }];
      this.selection = this.multi[this.multi.length - 1] ?? null;
      this.announce(this.t("planner.selected_n", { n: this.multi.length }));
      return;
    }
    this.selection = { kind: sel.kind, id: sel.id };
    this.multi = [this.selection];
  }

  /** Align or distribute the selected beds / plantings / elements. */
  private align(mode: AlignMode): void {
    if (this.multi.length < 2 || !this.admin) return;
    const doc = clone(this.draft);
    const kind = this.multi[0].kind;
    const touched = new Set<string>();
    if (kind === "planting") {
      // Plantings align in canvas space but stay inside their own bed.
      const items = this.multi.map((m) => doc.plantings.find((p) => p.id === m.id)!).filter(Boolean);
      const beds = new Map(doc.beds.map((b) => [b.id, b]));
      const rects = items.map((p) => ({ x: beds.get(p.bed_id)!.x_cm + p.x_cm, y: beds.get(p.bed_id)!.y_cm + p.y_cm, w: p.width_cm, h: p.length_cm }));
      alignRects(rects, mode).forEach((r, i) => {
        const p = items[i];
        const bed = beds.get(p.bed_id)!;
        const c = clampInto({ ...r, x: r.x - bed.x_cm, y: r.y - bed.y_cm }, { x: 0, y: 0, w: bed.width_cm, h: bed.length_cm });
        Object.assign(p, { x_cm: c.x, y_cm: c.y });
        touched.add(bed.id);
      });
    } else {
      const list = (kind === "bed" ? doc.beds : kind === "zone" ? doc.zones : doc.features) as (Bed | Zone | Feature)[];
      const items = this.multi.map((m) => list.find((i) => i.id === m.id)!).filter(Boolean);
      alignRects(items.map((i) => ({ x: i.x_cm, y: i.y_cm, w: i.width_cm, h: i.length_cm })), mode).forEach((r, i) => {
        const item = items[i];
        const dx = r.x - item.x_cm;
        const dy = r.y - item.y_cm;
        item.x_cm = r.x;
        item.y_cm = r.y;
        if (kind === "zone") for (const b of doc.beds.filter((b) => b.zone_id === item.id)) { b.x_cm += dx; b.y_cm += dy; }
        if (kind === "bed") touched.add(item.id);
      });
    }
    this.commit(doc, this.t("planner.aligned", { n: this.multi.length }), [...touched]);
  }

  private onItemChange(ev: CustomEvent<ItemChangeDetail>): void {
    const { kind, id, rect, targetBedId, dx: gdx, dy: gdy, group } = ev.detail;
    const doc = clone(this.draft);
    const step = this.snapOn ? this.snapshot.settings.snap_cm : 1;
    if (group) {
      this.moveGroup(doc, kind, gdx, gdy);
      return;
    }
    if (kind === "feature") {
      const f = doc.features.find((i) => i.id === id)!;
      Object.assign(f, { x_cm: rect.x, y_cm: rect.y, width_cm: rect.w, length_cm: rect.h });
      this.commit(doc, this.t("planner.moved", { name: f.name }));
      return;
    }
    if (kind === "zone") {
      const z = doc.zones.find((i) => i.id === id)!;
      const dx = rect.x - z.x_cm;
      const dy = rect.y - z.y_cm;
      Object.assign(z, { x_cm: rect.x, y_cm: rect.y, width_cm: rect.w, length_cm: rect.h });
      if (dx || dy) for (const b of doc.beds.filter((b) => b.zone_id === id)) { b.x_cm += dx; b.y_cm += dy; }
      this.commit(doc, this.t("planner.moved", { name: z.name }));
    } else if (kind === "bed") {
      const b = doc.beds.find((i) => i.id === id)!;
      Object.assign(b, { x_cm: rect.x, y_cm: rect.y, width_cm: rect.w, length_cm: rect.h });
      const cx = rect.x + rect.w / 2;
      const cy = rect.y + rect.h / 2;
      const zone = [...doc.zones].reverse().find((z) => cx >= z.x_cm && cx <= z.x_cm + z.width_cm && cy >= z.y_cm && cy <= z.y_cm + z.length_cm);
      if (zone) b.zone_id = zone.id;
      this.commit(doc, this.t("planner.moved", { name: b.name }), [b.id]);
    } else {
      const p = doc.plantings.find((i) => i.id === id)!;
      const oldBed = p.bed_id;
      const target = doc.beds.find((b) => b.id === (targetBedId ?? oldBed)) ?? doc.beds.find((b) => b.id === oldBed)!;
      const local = clampInto({ ...rect, x: rect.x - target.x_cm, y: rect.y - target.y_cm }, { x: 0, y: 0, w: target.width_cm, h: target.length_cm });
      Object.assign(p, { bed_id: target.id, x_cm: snap(local.x, step), y_cm: snap(local.y, step), width_cm: local.w, length_cm: local.h });
      const plant = this.plantMap.get(p.plant_id);
      this.commit(doc, this.t("planner.moved", { name: plantName(plant, this.lang) }), [...new Set([oldBed, target.id])]);
    }
  }

  private moveGroup(doc: PlanDoc, kind: Selection["kind"], dx: number, dy: number): void {
    const ids = new Set(this.multi.filter((m) => m.kind === kind).map((m) => m.id));
    const touched = new Set<string>();
    if (kind === "planting") {
      for (const p of doc.plantings.filter((p) => ids.has(p.id))) {
        const bed = doc.beds.find((b) => b.id === p.bed_id)!;
        const c = clampInto({ x: p.x_cm + dx, y: p.y_cm + dy, w: p.width_cm, h: p.length_cm }, { x: 0, y: 0, w: bed.width_cm, h: bed.length_cm });
        Object.assign(p, { x_cm: c.x, y_cm: c.y });
        touched.add(bed.id);
      }
    } else {
      const list = (kind === "bed" ? doc.beds : kind === "zone" ? doc.zones : doc.features) as (Bed | Zone | Feature)[];
      for (const item of list.filter((i) => ids.has(i.id))) {
        item.x_cm = Math.round(item.x_cm + dx);
        item.y_cm = Math.round(item.y_cm + dy);
        if (kind === "zone") for (const b of doc.beds.filter((b) => b.zone_id === item.id)) { b.x_cm += dx; b.y_cm += dy; }
        if (kind === "bed") touched.add(item.id);
      }
    }
    this.commit(doc, this.t("planner.moved_n", { n: ids.size }), [...touched]);
  }

  private updateSelected(patch: Record<string, unknown>, nested?: "microclimate"): void {
    if (!this.selection) return;
    const doc = clone(this.draft);
    const list = (this.selection.kind === "zone" ? doc.zones : this.selection.kind === "bed" ? doc.beds
      : this.selection.kind === "feature" ? doc.features : doc.plantings) as unknown as Record<string, unknown>[];
    const item = list.find((i) => i.id === this.selection!.id);
    if (!item) return;
    if (nested) Object.assign(item[nested] as object, patch);
    else Object.assign(item, patch);
    const bedId = this.selection.kind === "planting" ? (item.bed_id as string) : this.selection.kind === "bed" ? (item.id as string) : undefined;
    this.commit(doc, undefined, bedId ? [bedId] : []);
  }

  private removeSelected(): void {
    const sel = this.selection;
    if (!sel || !this.admin) return;
    const doc = clone(this.draft);
    let name = "";
    if (this.multi.length > 1 && (sel.kind === "planting" || sel.kind === "feature")) {
      const ids = new Set(this.multi.map((m) => m.id));
      const beds = doc.plantings.filter((p) => ids.has(p.id)).map((p) => p.bed_id);
      doc.plantings = doc.plantings.filter((p) => !ids.has(p.id));
      doc.features = doc.features.filter((f) => !ids.has(f.id));
      this.commit(doc, this.t("planner.removed_n", { n: ids.size }), [...new Set(beds)]);
      this.selection = null;
      this.multi = [];
      return;
    }
    if (sel.kind === "feature") {
      const f = doc.features.find((i) => i.id === sel.id);
      doc.features = doc.features.filter((i) => i.id !== sel.id);
      this.commit(doc, this.t("planner.removed", { name: f?.name ?? "" }));
      this.selection = null;
      this.multi = [];
      return;
    }
    if (sel.kind === "planting") {
      const p = doc.plantings.find((i) => i.id === sel.id);
      if (p && this.plantMap.get(p.plant_id)?.perennial && p.season < this.season) {
        // A tree planted in an earlier year: ask whether it is gone from now on or never existed.
        this.removing = p;
        return;
      }
      name = plantName(this.plantMap.get(p?.plant_id ?? ""), this.lang);
      doc.plantings = doc.plantings.filter((i) => i.id !== sel.id);
      this.commit(doc, this.t("planner.removed", { name }), p ? [p.bed_id] : []);
    } else if (sel.kind === "bed") {
      const bed = doc.beds.find((b) => b.id === sel.id);
      const count = doc.plantings.filter((p) => p.bed_id === sel.id).length;
      if (count && !confirm(`${bed?.name}: ${this.t("planner.count", { n: count })} – ${this.t("common.delete")}?`)) return;
      doc.beds = doc.beds.filter((b) => b.id !== sel.id);
      doc.plantings = doc.plantings.filter((p) => p.bed_id !== sel.id);
      this.commit(doc, this.t("planner.removed", { name: bed?.name ?? "" }));
    } else {
      const zone = doc.zones.find((z) => z.id === sel.id);
      const beds = doc.beds.filter((b) => b.zone_id === sel.id).map((b) => b.id);
      if (beds.length && !confirm(`${zone?.name}: ${beds.length} × ${this.t("planner.bed_name")} – ${this.t("common.delete")}?`)) return;
      doc.zones = doc.zones.filter((z) => z.id !== sel.id);
      doc.beds = doc.beds.filter((b) => !beds.includes(b.id));
      doc.plantings = doc.plantings.filter((p) => !beds.includes(p.bed_id));
      this.commit(doc, this.t("planner.removed", { name: zone?.name ?? "" }));
    }
    this.selection = null;
    this.multi = [];
  }

  /** Perennial removal: "from this season" keeps history (rotation, harvest log); "delete" erases it. */
  private removePerennial(mode: "season" | "delete"): void {
    const p = this.removing;
    this.removing = null;
    if (!p) return;
    const doc = clone(this.draft);
    const name = plantName(this.plantMap.get(p.plant_id), this.lang);
    if (mode === "delete") doc.plantings = doc.plantings.filter((i) => i.id !== p.id);
    else Object.assign(doc.plantings.find((i) => i.id === p.id)!, { removed_season: this.season });
    this.selection = null;
    this.multi = [];
    this.commit(doc, this.t(mode === "delete" ? "planner.removed" : "planner.removed_from", { name, season: this.season }), [p.bed_id]);
  }

  // -- drawing zones / beds / elements ------------------------------------- //
  private toolInfo(tool: Tool): DrawTool {
    if (tool.kind === "zone") return { label: this.t(`settings.zone_type.${tool.type}`), color: ZONE_STYLE[tool.type].stroke.startsWith("var") ? "#6f9a45" : ZONE_STYLE[tool.type].stroke };
    if (tool.kind === "feature") return { label: this.t(`feature.${tool.type}`), color: FEATURE_STYLE[tool.type]?.stroke ?? "#888" };
    return { label: this.t("planner.bed_name"), color: "#8a6a45" };
  }

  private onDrawRect(ev: CustomEvent<Rect>): void {
    const tool = this.tool;
    if (!tool || !this.admin) return;
    let r = ev.detail;
    const doc = clone(this.draft);
    const at = (w: number, h: number): Rect => ({ x: snap(r.x - w / 2, 10), y: snap(r.y - h / 2, 10), w, h });
    if (tool.kind === "zone") {
      if (!r.w) r = at(...ZONE_SIZE[tool.type]);
      const n = doc.zones.filter((z) => z.type === tool.type).length + 1;
      const zone: Zone = {
        id: uid("zone"), name: `${this.t(`settings.zone_type.${tool.type}`)}${n > 1 ? ` ${n}` : ""}`, type: tool.type,
        x_cm: r.x, y_cm: r.y, width_cm: r.w, length_cm: r.h,
        microclimate: { shade_pct: 0, wind: "moderate", heated: false, min_heating_temp_c: null, night_offset_c: null, solar_gain_c: null },
        sensors: emptySensors(), vent_entity: null,
      };
      doc.zones.push(zone);
      if (OPEN_ZONES.includes(tool.type)) doc.beds.push(this.makeBed(zone, { x: zone.x_cm, y: zone.y_cm, w: zone.width_cm, h: zone.length_cm }, zone.name, "in_ground"));
      this.selection = { kind: "zone", id: zone.id };
      this.commit(doc, this.t("planner.placed", { plant: zone.name, bed: "" }));
    } else if (tool.kind === "feature") {
      if (!r.w) r = at(...FEATURE_SIZE[tool.type]);
      const feature: Feature = { id: uid("ft"), name: this.t(`feature.${tool.type}`), type: tool.type, x_cm: r.x, y_cm: r.y, width_cm: r.w, length_cm: r.h, notes: "" };
      doc.features.push(feature);
      this.selection = { kind: "feature", id: feature.id };
      this.commit(doc, this.t("planner.placed", { plant: feature.name, bed: "" }));
    } else {
      if (!r.w) r = at(120, 80);
      const cx = r.x + r.w / 2;
      const cy = r.y + r.h / 2;
      const zone = doc.zones.find((z) => z.id === this.focusZone) ??
        [...doc.zones].reverse().find((z) => cx >= z.x_cm && cx <= z.x_cm + z.width_cm && cy >= z.y_cm && cy <= z.y_cm + z.length_cm);
      if (!zone) {
        this.toast(this.t("planner.bed_needs_zone"));
        return;
      }
      const bed = this.makeBed(zone, clampInto(r, { x: zone.x_cm, y: zone.y_cm, w: zone.width_cm, h: zone.length_cm }),
        `${this.t("planner.new_bed")} ${doc.beds.length + 1}`, zone.type === "outdoor" ? "raised" : "in_ground");
      doc.beds.push(bed);
      this.selection = { kind: "bed", id: bed.id };
      this.commit(doc, this.t("planner.placed", { plant: bed.name, bed: zone.name }), [bed.id]);
    }
    this.multi = this.selection ? [this.selection] : [];
  }

  private makeBed(zone: Zone, r: Rect, name: string, kind: BedKind): Bed {
    return {
      id: uid("bed"), name, zone_id: zone.id, kind, x_cm: r.x, y_cm: r.y, width_cm: r.w, length_cm: r.h, orientation_deg: 0,
      soil: "loam", shade_pct: null, sensors: emptySensors(), irrigation_entity: null, irrigation_flow_lpm: null, notes: "",
    };
  }

  private openZone(zoneId: string): void {
    this.focusZone = zoneId;
    if (this.step === "site") this.step = "zones";
    const z = this.draft.zones.find((i) => i.id === zoneId);
    this.selection = z ? { kind: "zone", id: z.id } : null;
    this.multi = this.selection ? [this.selection] : [];
    requestAnimationFrame(() => (z ? this.canvas?.fitRect({ x: z.x_cm, y: z.y_cm, w: z.width_cm, h: z.length_cm }) : this.canvas?.fit()));
  }

  private closeZone(): void {
    this.focusZone = "";
    requestAnimationFrame(() => this.canvas?.fit());
  }

  /** Move a planting to another bed (rotation alternative), same spot if it fits. */
  private moveToBed(plantingId: string, bedId: string): void {
    const doc = clone(this.draft);
    const p = doc.plantings.find((i) => i.id === plantingId);
    const bed = doc.beds.find((b) => b.id === bedId);
    if (!p || !bed) return;
    const old = p.bed_id;
    const taken = this.bedPlantings(bed.id, doc).filter((o) => o.season === p.season).map((o) => ({ x: o.x_cm, y: o.y_cm, w: o.width_cm, h: o.length_cm }));
    const size = { w: Math.min(p.width_cm, bed.width_cm), h: Math.min(p.length_cm, bed.length_cm) };
    const spot = findFreeSpot(bed, size, taken, this.snapshot.settings.snap_cm) ?? { x: 0, y: 0 };
    Object.assign(p, { bed_id: bed.id, x_cm: spot.x, y_cm: spot.y, width_cm: size.w, length_cm: size.h });
    this.commit(doc, this.t("planner.moved", { name: plantName(this.plantMap.get(p.plant_id), this.lang) }), [old, bed.id]);
  }

  // -- autofill ------------------------------------------------------------ //
  private openAutofill(beds: string[] = []): void {
    const r = this.snapshot.settings.resources;
    this.autofillResources = r ? clone(r) : { household_size: 2, hours_per_week: 3, water_liters_per_week: null, compost_kg: null, irrigation: false, goals: ["fresh", "herbs"], wanted: [], excluded: [] };
    this.autofill = null;
    this.autofillBeds = beds;
    this.dialog = "autofill";
  }

  private async runAutofill(): Promise<void> {
    if (!this.autofillResources) return;
    this.autofillBusy = true;
    try {
      if (this.saveState !== "saved") await this.save();
      this.autofill = await this.api.autofill({
        season: this.season,
        bed_ids: this.autofillBeds.length ? this.autofillBeds : undefined,
        replace: this.autofillReplace,
        resources: this.autofillResources,
      });
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message ?? String(err) }));
    } finally {
      this.autofillBusy = false;
    }
  }

  private async applyAutofill(): Promise<void> {
    const res = this.autofill;
    if (!res) return;
    try {
      const out = await this.api.autofillApply(res.plantings, this.autofillReplace ? res.beds : [], this.baseRevision);
      this.baseRevision = out.revision;
      this.history = null;
      this.saveState = "saved";
      this.dialog = null;
      this.autofill = null;
      this.toast(this.t("autofill.applied", { n: res.summary.plantings }));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message ?? String(err) }));
    }
  }

  private duplicateSelected(): void {
    const sel = this.selection;
    if (!sel || sel.kind !== "planting") return;
    const doc = clone(this.draft);
    const p = doc.plantings.find((i) => i.id === sel.id);
    const bed = p && doc.beds.find((b) => b.id === p.bed_id);
    if (!p || !bed) return;
    const taken = this.bedPlantings(bed.id, doc).filter((o) => o.season === p.season).map((o) => ({ x: o.x_cm, y: o.y_cm, w: o.width_cm, h: o.length_cm }));
    const spot = findFreeSpot(bed, { w: p.width_cm, h: p.length_cm }, taken, this.snapshot.settings.snap_cm) ?? { x: p.x_cm, y: p.y_cm };
    const copy: Planting = { ...clone(p), id: uid("pl"), x_cm: spot.x, y_cm: spot.y, succession_group: null, succession_index: 0, status: "planned", sown_on: null, transplanted_on: null, harvest_started_on: null, finished_on: null };
    doc.plantings.push(copy);
    this.selection = { kind: "planting", id: copy.id };
    this.commit(doc, undefined, [bed.id]);
  }

  private nudge(dx: number, dy: number, resize = false): void {
    const sel = this.selection;
    if (!sel || !this.admin) return;
    const doc = clone(this.draft);
    const touched: string[] = [];
    if (sel.kind === "planting") {
      const p = doc.plantings.find((i) => i.id === sel.id)!;
      const bed = doc.beds.find((b) => b.id === p.bed_id)!;
      const r = resize
        ? { x: p.x_cm, y: p.y_cm, w: Math.max(5, p.width_cm + dx), h: Math.max(5, p.length_cm + dy) }
        : { x: p.x_cm + dx, y: p.y_cm + dy, w: p.width_cm, h: p.length_cm };
      const c = clampInto(r, { x: 0, y: 0, w: bed.width_cm, h: bed.length_cm });
      Object.assign(p, { x_cm: c.x, y_cm: c.y, width_cm: c.w, length_cm: c.h });
      touched.push(bed.id);
    } else {
      const item = (sel.kind === "bed" ? doc.beds : doc.zones).find((i) => i.id === sel.id)!;
      if (resize) {
        item.width_cm = Math.max(10, item.width_cm + dx);
        item.length_cm = Math.max(10, item.length_cm + dy);
      } else {
        item.x_cm += dx;
        item.y_cm += dy;
        if (sel.kind === "zone") for (const b of doc.beds.filter((b) => b.zone_id === sel.id)) { b.x_cm += dx; b.y_cm += dy; }
      }
      if (sel.kind === "bed") touched.push(sel.id);
    }
    this.commit(doc, undefined, touched);
  }

  private newPlanting(plant: Plant, bed: Bed, local: Rect): Planting {
    return {
      id: uid("pl"), plant_id: plant.id, bed_id: bed.id, season: this.season, layout: this.layoutMode,
      x_cm: local.x, y_cm: local.y, width_cm: local.w, length_cm: local.h, count: null,
      method: defaultMethod(plant), status: "planned", sow_date: null, transplant_date: null, sown_on: null,
      transplanted_on: null, harvest_started_on: null, finished_on: null, succession_group: null, succession_index: 0, notes: "",
    };
  }

  /** Keyboard alternative to drag & drop: add to the selected (or first) bed. */
  private addToSelectedBed(plant: Plant): void {
    if (!this.admin) return;
    const doc = clone(this.draft);
    const selBedId = this.selection?.kind === "bed" ? this.selection.id
      : this.selection?.kind === "planting" ? doc.plantings.find((p) => p.id === this.selection!.id)?.bed_id : undefined;
    const bed = doc.beds.find((b) => b.id === selBedId) ?? doc.beds[0];
    if (!bed) return;
    const size = defaultFootprint(plant, this.layoutMode, bed);
    const taken = this.bedPlantings(bed.id, doc).filter((p) => p.season === this.season).map((p) => ({ x: p.x_cm, y: p.y_cm, w: p.width_cm, h: p.length_cm }));
    const spot = findFreeSpot(bed, size, taken, this.snapshot.settings.snap_cm) ?? { x: 0, y: 0 };
    const planting = this.newPlanting(plant, bed, { ...spot, ...size });
    doc.plantings.push(planting);
    this.selection = { kind: "planting", id: planting.id };
    this.commit(doc, this.t("planner.placed", { plant: plantName(plant, this.lang), bed: bed.name }), [bed.id]);
    this.canvas?.focusCanvas();
  }

  private addBed(): void {
    const doc = clone(this.draft);
    const zone = (this.selection?.kind === "zone" && doc.zones.find((z) => z.id === this.selection!.id)) ||
      doc.zones.find((z) => z.type === "outdoor") || doc.zones[0];
    if (!zone) return this.addZone();
    const size = { w: 120, h: 80 };
    const taken = doc.beds.filter((b) => b.zone_id === zone.id).map((b) => ({ x: b.x_cm - zone.x_cm - 20, y: b.y_cm - zone.y_cm - 20, w: b.width_cm + 40, h: b.length_cm + 40 }));
    const spot = findFreeSpot({ ...doc.beds[0], width_cm: zone.width_cm, length_cm: zone.length_cm } as Bed, size, taken, 10) ?? { x: 20, y: 20 };
    const bed: Bed = {
      id: uid("bed"), name: `${this.t("planner.new_bed")} ${doc.beds.length + 1}`, zone_id: zone.id, kind: "raised",
      x_cm: zone.x_cm + spot.x, y_cm: zone.y_cm + spot.y, width_cm: size.w, length_cm: size.h, orientation_deg: 0,
      soil: "loam", shade_pct: null, sensors: emptySensors(), irrigation_entity: null, irrigation_flow_lpm: null, notes: "",
    };
    doc.beds.push(bed);
    this.selection = { kind: "bed", id: bed.id };
    this.commit(doc, this.t("planner.placed", { plant: bed.name, bed: zone.name }), [bed.id]);
  }

  private addZone(): void {
    const doc = clone(this.draft);
    const ext = extents(doc.zones, doc.beds);
    const zone: Zone = {
      id: uid("zone"), name: `${this.t("planner.new_zone")} ${doc.zones.length + 1}`, type: "outdoor",
      x_cm: doc.zones.length ? ext.x + ext.w + 100 : 0, y_cm: doc.zones.length ? ext.y : 0, width_cm: 400, length_cm: 300,
      microclimate: { shade_pct: 0, wind: "moderate", heated: false, min_heating_temp_c: null, night_offset_c: null, solar_gain_c: null },
      sensors: emptySensors(), vent_entity: null,
    };
    doc.zones.push(zone);
    this.selection = { kind: "zone", id: zone.id };
    this.commit(doc);
    requestAnimationFrame(() => this.canvas?.fit());
  }

  // ---------------------------------------------------------------------- //
  // Palette drag & drop (pointer events: mouse, touch and pen)
  // ---------------------------------------------------------------------- //
  private onPalettePointerDown(ev: PointerEvent, plant: Plant): void {
    if (!this.admin || (ev.pointerType === "mouse" && ev.button !== 0)) return;
    (ev.currentTarget as HTMLElement).setPointerCapture(ev.pointerId);
    this.paletteDrag = { plant, pointerId: ev.pointerId, bedId: null, rect: null };
    this.ghostReport = null;
  }

  private onPalettePointerMove(ev: PointerEvent): void {
    const drag = this.paletteDrag;
    if (!drag || drag.pointerId !== ev.pointerId) return;
    const pt = this.canvas.clientToCanvas(ev.clientX, ev.clientY);
    if (!pt) {
      this.paletteDrag = { ...drag, bedId: null, rect: null };
      return;
    }
    const bed = bedAt(this.draft.beds, pt.x, pt.y);
    if (!bed) {
      const size = { w: drag.plant.spacing_cm, h: drag.plant.spacing_cm };
      this.paletteDrag = { ...drag, bedId: null, rect: { x: pt.x - size.w / 2, y: pt.y - size.h / 2, ...size } };
      return;
    }
    const size = defaultFootprint(drag.plant, this.layoutMode, bed);
    const step = this.snapOn ? this.snapshot.settings.snap_cm : 1;
    let local = { x: snap(pt.x - bed.x_cm - size.w / 2, step), y: snap(pt.y - bed.y_cm - size.h / 2, step), ...size };
    if (this.layoutMode === "row") local = bed.width_cm >= bed.length_cm ? { ...local, x: 0 } : { ...local, y: 0 };
    local = clampInto(local, { x: 0, y: 0, w: bed.width_cm, h: bed.length_cm });
    this.paletteDrag = { ...drag, bedId: bed.id, rect: { ...local, x: local.x + bed.x_cm, y: local.y + bed.y_cm } };
    // Live companion feedback while hovering - throttled.
    const now = performance.now();
    if (now - this.ghostCheckAt > 220) {
      this.ghostCheckAt = now;
      const ghost = this.newPlanting(drag.plant, bed, local);
      ghost.id = "__ghost__";
      this.api.checkBed(bed, [...this.bedPlantings(bed.id), ghost]).then((r) => {
        if (this.paletteDrag) this.ghostReport = r;
      }).catch(() => undefined);
    }
  }

  private onPalettePointerUp(ev: PointerEvent): void {
    const drag = this.paletteDrag;
    if (!drag || drag.pointerId !== ev.pointerId) return;
    this.paletteDrag = null;
    this.ghostReport = null;
    if (!drag.bedId || !drag.rect) {
      if (drag.rect) this.announce(this.t("planner.no_bed_here"));
      return;
    }
    const doc = clone(this.draft);
    const bed = doc.beds.find((b) => b.id === drag.bedId)!;
    const planting = this.newPlanting(drag.plant, bed, { ...drag.rect, x: drag.rect.x - bed.x_cm, y: drag.rect.y - bed.y_cm });
    doc.plantings.push(planting);
    this.selection = { kind: "planting", id: planting.id };
    this.commit(doc, this.t("planner.placed", { plant: plantName(drag.plant, this.lang), bed: bed.name }), [bed.id]);
  }

  private ghostLabel(): string {
    const drag = this.paletteDrag!;
    const name = plantName(drag.plant, this.lang);
    if (!drag.bedId) return name;
    const mine = (this.ghostReport?.pairs ?? []).filter((p) => p.a === "__ghost__" || p.b === "__ghost__");
    const bad = mine.filter((p) => p.kind === "enemy" || p.kind === "overlap").length;
    const good = mine.filter((p) => p.kind === "friend").length;
    const rotation = (this.ghostReport?.rotation ?? []).some((r) => r.planting === "__ghost__");
    return `${name}${good ? ` · ♥ ${good}` : ""}${bad ? ` · ⚠ ${bad}` : ""}${rotation ? " · ⟲" : ""}`;
  }

  // ---------------------------------------------------------------------- //
  // Keyboard
  // ---------------------------------------------------------------------- //
  private onKeyDown(ev: KeyboardEvent): void {
    const target = ev.composedPath()[0] as HTMLElement;
    if (["INPUT", "SELECT", "TEXTAREA"].includes(target?.tagName)) return;
    const mod = ev.ctrlKey || ev.metaKey;
    const step = (this.snapOn ? this.snapshot.settings.snap_cm : 1) * (ev.shiftKey ? 10 : 1);
    const key = ev.key;
    const handled = (): void => { ev.preventDefault(); ev.stopPropagation(); };
    if (mod && key.toLowerCase() === "z" && !ev.shiftKey) { this.undo(); return handled(); }
    if ((mod && key.toLowerCase() === "y") || (mod && ev.shiftKey && key.toLowerCase() === "z")) { this.redo(); return handled(); }
    if (mod && key.toLowerCase() === "d") { this.duplicateSelected(); return handled(); }
    if (mod) return;
    const arrows: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (arrows[key] && this.selection) { this.nudge(...arrows[key], ev.altKey); return handled(); }
    switch (key) {
      case "Delete":
      case "Backspace": this.removeSelected(); return handled();
      case "Escape": this.selection = null; this.multi = []; this.paletteDrag = null; this.dialog = null; return handled();
      case "g": this.snapOn = !this.snapOn; return handled();
      case "c": this.showCompanions = !this.showCompanions; return handled();
      case "m": this.showMoisture = !this.showMoisture; return handled();
      case "t": this.showTemperature = !this.showTemperature; return handled();
      case "+": case "=": this.canvas.zoom(1.2); return handled();
      case "-": this.canvas.zoom(1 / 1.2); return handled();
      case "0": this.canvas.fit(); return handled();
      case "?": this.dialog = "shortcuts"; return handled();
      case "]": case "[": this.cycleSelection(key === "]" ? 1 : -1); return handled();
      default:
    }
  }

  private cycleSelection(dir: 1 | -1): void {
    const items: Selection[] = [
      ...this.draft.beds.map((b) => ({ kind: "bed" as const, id: b.id })),
      ...this.seasonPlantings.map((p) => ({ kind: "planting" as const, id: p.id })),
    ];
    if (!items.length) return;
    const idx = this.selection ? items.findIndex((i) => i.id === this.selection!.id) : -1;
    this.selection = items[(idx + dir + items.length) % items.length];
    const item = this.findItem(this.selection);
    const name = this.selection.kind === "planting" ? plantName(this.plantMap.get((item as Planting).plant_id), this.lang) : (item as Bed).name;
    this.announce(name);
  }

  private announce(text: string): void {
    this.announcement = "";
    requestAnimationFrame(() => (this.announcement = text));
  }

  private toast(message: string): void {
    this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message }, bubbles: true, composed: true }));
  }

  // ---------------------------------------------------------------------- //
  // Import / export / succession
  // ---------------------------------------------------------------------- //
  private async exportPlan(format: "json" | "yaml"): Promise<void> {
    const { filename, content } = await this.api.exportPlan(format);
    download(filename, content, format === "json" ? "application/json" : "application/yaml");
  }

  private async importPlan(ev: Event): Promise<void> {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement;
    const file = (form.elements.namedItem("file") as HTMLInputElement).files?.[0];
    const mode = (form.elements.namedItem("mode") as HTMLSelectElement).value as "merge" | "replace";
    if (!file) return;
    try {
      const res = await this.api.importPlan(await file.text(), mode);
      this.history = null;
      this.saveState = "saved";
      this.dialog = null;
      this.toast(this.t("planner.imported", { beds: res.counts.beds, plantings: res.counts.plantings }));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message ?? String(err) }));
    }
  }

  private async createSuccession(ev: Event): Promise<void> {
    ev.preventDefault();
    const sel = this.selection;
    const planting = sel?.kind === "planting" ? this.draft.plantings.find((p) => p.id === sel.id) : undefined;
    if (!planting) return;
    const form = ev.target as HTMLFormElement;
    const count = Number((form.elements.namedItem("count") as HTMLInputElement).value);
    const interval = Number((form.elements.namedItem("interval") as HTMLInputElement).value) || null;
    const placement = (form.elements.namedItem("placement") as HTMLSelectElement).value as "split" | "stack";
    const res = await this.api.succession(planting, count, interval, placement);
    const doc = clone(this.draft);
    doc.plantings = doc.plantings.filter((p) => p.id !== planting.id).concat(res.plantings);
    this.dialog = null;
    this.commit(doc, undefined, [planting.bed_id]);
    if (res.dropped) this.toast(this.t("planner.succession_dropped", { n: res.dropped }));
  }

  protected updated(): void {
    // Native modal dialog: focus trap, Esc to close, inert background.
    const dialog = this.renderRoot.querySelector("dialog");
    if (dialog && !dialog.open) dialog.showModal();
  }

  // ---------------------------------------------------------------------- //
  // Rendering
  // ---------------------------------------------------------------------- //
  render(): TemplateResult {
    if (!this.history) return html`<p class="empty">${this.t("common.loading")}</p>`;
    const drag = this.paletteDrag;
    const ghost = drag?.rect
      ? { rect: drag.rect, valid: !!drag.bedId, color: familyColor(this.families, drag.plant.family), label: this.ghostLabel() }
      : null;
    return html`
      ${this.renderStepper()}
      ${this.renderToolbar()}
      <div class="layout ${this.narrow ? "narrow" : ""} ${this.paletteOpen || this.narrow ? "" : "palette-closed"}" @keydown=${this.onKeyDown}>
        ${this.paletteOpen || this.narrow
          ? this.step === "site" ? this.renderSitePane() : this.step === "zones" ? this.renderZonesPane() : this.renderPalette()
          : html`<div></div>`}
        <div class="center">
          <hl-garden-canvas
            .zones=${this.draft.zones}
            .beds=${this.draft.beds}
            .plantings=${this.seasonPlantings}
            .features=${this.draft.features}
            .multi=${this.multi}
            .showFeatures=${this.showFeatures}
            .showPlantings=${this.showPlantings}
            .showZones=${this.showZones}
            .plants=${this.plantMap}
            .families=${this.families}
            .selection=${this.selection}
            .ghost=${ghost}
            .reports=${this.reports}
            .timelines=${this.timelines}
            .analysis=${this.snapshot.analysis}
            .t=${this.t}
            .lang=${this.lang}
            .snapStep=${this.snapshot.settings.snap_cm}
            .snapOn=${this.snapOn}
            .showCompanions=${this.showCompanions}
            .showMoisture=${this.showMoisture}
            .showTemperature=${this.showTemperature}
            .viewDate=${this.viewDate}
            .readonly=${!this.admin}
            .focusZone=${this.focusZone}
            .drawTool=${this.tool ? this.toolInfo(this.tool) : null}
            @select=${(e: CustomEvent<Selection | null>) => this.onSelect(e.detail)}
            @item-change=${this.onItemChange}
            @draw-rect=${this.onDrawRect}
            @zone-open=${(e: CustomEvent<string>) => this.openZone(e.detail)}
          ></hl-garden-canvas>
          ${this.tool ? html`<div class="draw-hint" role="status"><ha-icon icon="mdi:vector-rectangle"></ha-icon>
            ${this.t("planner.draw_hint", { what: this.toolInfo(this.tool).label })}
            <button class="btn small ghost" @click=${() => (this.tool = null)}>${this.t("common.done")}</button></div>` : nothing}
          ${drag ? html`<div class="drag-ghost-hint" role="status">${ghost ? ghost.label : plantName(drag.plant, this.lang)}</div>` : nothing}
        </div>
        ${this.renderInspector()}
      </div>
      <div class="visually-hidden" role="status" aria-live="polite">${this.announcement}</div>
      ${this.renderDialog()}
    `;
  }

  private renderToolbar(): TemplateResult {
    const seasons = [this.season - 1, this.season, this.season + 1];
    const stateLabel = { saved: "common.saved", dirty: "common.unsaved", saving: "common.saving", error: "common.unsaved" }[this.saveState];
    const btn = (icon: string, label: string, action: () => void, pressed?: boolean, disabled = false) => html`
      <button class="icon-btn" title=${label} aria-label=${label} aria-pressed=${pressed === undefined ? nothing : String(pressed)} ?disabled=${disabled} @click=${action}>
        <ha-icon icon=${icon}></ha-icon>
      </button>`;
    return html`
      <div class="toolbar" role="toolbar" aria-label=${this.t("nav.planner")}>
        ${btn("mdi:dock-left", this.t("planner.palette"), () => (this.paletteOpen = !this.paletteOpen), this.paletteOpen)}
        <label class="row small"><span class="visually-hidden">${this.t("planner.season")}</span>
          <select aria-label=${this.t("planner.season")} @change=${(e: Event) => (this.season = Number((e.target as HTMLSelectElement).value))}>
            ${seasons.map((s) => html`<option value=${s} ?selected=${s === this.season}>${this.t("common.season", { year: s })}</option>`)}
          </select>
        </label>
        <span class="sep"></span>
        ${btn("mdi:undo", `${this.t("planner.undo")} (Ctrl+Z)`, () => this.undo(), undefined, !this.history?.canUndo || !this.admin)}
        ${btn("mdi:redo", `${this.t("planner.redo")} (Ctrl+Y)`, () => this.redo(), undefined, !this.history?.canRedo || !this.admin)}
        <span class="sep"></span>
        ${btn("mdi:grid", `${this.t("planner.snap")} (G)`, () => (this.snapOn = !this.snapOn), this.snapOn)}
        ${btn("mdi:handshake-outline", `${this.t("planner.overlay_companions")} (C)`, () => (this.showCompanions = !this.showCompanions), this.showCompanions)}
        ${btn("mdi:water-percent", `${this.t("planner.overlay_moisture")} (M)`, () => (this.showMoisture = !this.showMoisture), this.showMoisture)}
        ${btn("mdi:thermometer", `${this.t("planner.overlay_temperature")} (T)`, () => (this.showTemperature = !this.showTemperature), this.showTemperature)}
        <span class="sep"></span>
        ${btn("mdi:texture-box", this.t("planner.layer_zones"), () => (this.showZones = !this.showZones), this.showZones)}
        ${btn("mdi:map-marker-path", this.t("planner.layer_features"), () => (this.showFeatures = !this.showFeatures), this.showFeatures)}
        ${btn("mdi:sprout", this.t("planner.layer_plantings"), () => (this.showPlantings = !this.showPlantings), this.showPlantings)}
        ${this.multi.length > 1 ? html`<span class="sep"></span>
          ${btn("mdi:align-horizontal-left", this.t("planner.align.left"), () => this.align("left"))}
          ${btn("mdi:align-horizontal-center", this.t("planner.align.hcenter"), () => this.align("hcenter"))}
          ${btn("mdi:align-horizontal-right", this.t("planner.align.right"), () => this.align("right"))}
          ${btn("mdi:align-vertical-top", this.t("planner.align.top"), () => this.align("top"))}
          ${btn("mdi:align-vertical-center", this.t("planner.align.vcenter"), () => this.align("vcenter"))}
          ${btn("mdi:align-vertical-bottom", this.t("planner.align.bottom"), () => this.align("bottom"))}
          ${btn("mdi:distribute-horizontal-center", this.t("planner.align.hdistribute"), () => this.align("hdistribute"), undefined, this.multi.length < 3)}
          ${btn("mdi:distribute-vertical-center", this.t("planner.align.vdistribute"), () => this.align("vdistribute"), undefined, this.multi.length < 3)}` : nothing}
        <span class="sep"></span>
        ${btn("mdi:magnify-plus-outline", this.t("planner.zoom_in"), () => this.canvas.zoom(1.2))}
        ${btn("mdi:magnify-minus-outline", this.t("planner.zoom_out"), () => this.canvas.zoom(1 / 1.2))}
        ${btn("mdi:fit-to-screen-outline", this.t("planner.fit"), () => this.canvas.fit())}
        <span class="sep"></span>
        <label class="row small">${this.t("planner.view_date")}
          <input type="date" .value=${this.viewDate} @change=${(e: Event) => (this.viewDate = (e.target as HTMLInputElement).value)} />
        </label>
        <span class="spacer"></span>
        <span class="save-state ${this.saveState === "error" ? "error" : ""}" role="status">
          <ha-icon icon=${this.saveState === "saved" ? "mdi:cloud-check-outline" : "mdi:cloud-upload-outline"}></ha-icon>${this.t(stateLabel)}
        </span>
        ${this.admin ? html`
          <button class="btn small primary" @click=${() => this.openAutofill()}><ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("autofill.title")}</button>
          <button class="btn small" @click=${() => this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>` : nothing}
        <details class="more">
          <summary class="icon-btn" title=${this.t("planner.more")} aria-label=${this.t("planner.more")}><ha-icon icon="mdi:dots-vertical"></ha-icon></summary>
          <div class="menu" role="menu">
            <button role="menuitem" @click=${() => this.exportPlan("json")}><ha-icon icon="mdi:file-export-outline"></ha-icon>${this.t("planner.export_json")}</button>
            <button role="menuitem" @click=${() => this.exportPlan("yaml")}><ha-icon icon="mdi:code-braces"></ha-icon>${this.t("planner.export_yaml")}</button>
            ${this.admin ? html`<button role="menuitem" @click=${() => (this.dialog = "import")}><ha-icon icon="mdi:file-import-outline"></ha-icon>${this.t("planner.import")}</button>` : nothing}
            <button role="menuitem" @click=${() => (this.dialog = "shortcuts")}><ha-icon icon="mdi:keyboard-outline"></ha-icon>${this.t("planner.shortcuts")} (?)</button>
          </div>
        </details>
      </div>
      ${this.admin ? nothing : html`<p class="readonly-note">${this.t("common.admin_only")}</p>`}
    `;
  }

  private renderStepper(): TemplateResult {
    const steps: [Step, string, string][] = [
      ["site", "mdi:vector-square", "planner.step.site"],
      ["zones", "mdi:texture-box", "planner.step.zones"],
      ["plant", "mdi:sprout", "planner.step.plant"],
    ];
    const zone = this.draft.zones.find((z) => z.id === this.focusZone);
    return html`<nav class="stepper" aria-label=${this.t("planner.steps")}>
      ${steps.map(([id, icon, key], i) => html`
        <button class="step ${this.step === id ? "active" : ""}" aria-current=${this.step === id ? "step" : nothing}
          @click=${() => { this.step = id; this.tool = null; }}>
          <span class="num">${i + 1}</span><ha-icon icon=${icon}></ha-icon>
          <span class="txt"><b>${this.t(key)}</b><span class="xs muted">${this.t(`${key}.hint`)}</span></span>
        </button>${i < steps.length - 1 ? html`<span class="step-sep" aria-hidden="true">›</span>` : nothing}`)}
      <span class="spacer"></span>
      <span class="crumbs" aria-label=${this.t("planner.zone_map")}>
        <button class="chip ${zone ? "" : "ok"}" @click=${() => this.closeZone()}><ha-icon icon="mdi:home-outline"></ha-icon>${this.t("planner.whole_garden")}</button>
        ${zone ? html`<span aria-hidden="true">›</span><span class="chip ok">${ZONE_STYLE[zone.type]?.icon ?? ""} ${zone.name}</span>` : nothing}
      </span>
    </nav>`;
  }

  private renderToolButton(tool: Tool, icon: TemplateResult | string, label: string, hint = ""): TemplateResult {
    const active = this.tool && this.tool.kind === tool.kind && ("type" in tool ? (this.tool as { type?: string }).type === tool.type : true);
    return html`<button class="tool ${active ? "active" : ""}" aria-pressed=${String(!!active)} title=${hint || label} ?disabled=${!this.admin}
      @click=${() => (this.tool = active ? null : tool)}>
      <span class="tool-icon">${icon}</span><span class="tool-label">${label}</span></button>`;
  }

  /** Step 1: draw the site - zones and garden elements on the 10 cm grid. */
  private renderSitePane(): TemplateResult {
    return html`<aside class="pane" aria-label=${this.t("planner.step.site")}>
      <header><h3>${this.t("planner.step.site")}</h3><hl-info term="zones" .t=${this.t}></hl-info></header>
      <div class="pane-body stack">
        <p class="small muted">${this.t("planner.site_intro")}</p>
        <h4>${this.t("planner.zones")}</h4>
        <div class="tool-grid">
          ${ZONE_TYPES.map((z) => this.renderToolButton({ kind: "zone", type: z }, ZONE_STYLE[z].icon, this.t(`settings.zone_type.${z}`), this.t(`zone_hint.${z}`)))}
        </div>
        <h4>${this.t("planner.elements")}</h4>
        <div class="tool-grid">
          ${FEATURE_TYPES.map((f) => this.renderToolButton({ kind: "feature", type: f }, FEATURE_STYLE[f]?.icon || "▭", this.t(`feature.${f}`)))}
        </div>
        <div class="divider"></div>
        <h4>${this.t("planner.your_zones")} (${this.draft.zones.length})</h4>
        ${this.draft.zones.length ? html`<div class="stack" style="gap:6px">${this.draft.zones.map((z) => html`
          <div class="zone-row"><span>${ZONE_STYLE[z.type]?.icon}</span>
            <span class="grow"><b>${z.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${z.type}`)} · ${(z.width_cm / 100).toFixed(1)} × ${(z.length_cm / 100).toFixed(1)} m</span></span>
            <button class="btn small ghost" @click=${() => this.openZone(z.id)}>${this.t("planner.open_zone")}</button></div>`)}</div>`
          : html`<p class="xs muted">${this.t("planner.no_zones")}</p>`}
        ${this.draft.zones.length ? html`<button class="btn primary" @click=${() => { this.step = "zones"; this.tool = null; }}>${this.t("planner.next")}: ${this.t("planner.step.zones")} ›</button>` : nothing}
      </div>
    </aside>`;
  }

  /** Step 2: name each zone and lay out its beds on its own map. */
  private renderZonesPane(): TemplateResult {
    const zone = this.draft.zones.find((z) => z.id === this.focusZone);
    if (!zone) {
      return html`<aside class="pane" aria-label=${this.t("planner.step.zones")}>
        <header><h3>${this.t("planner.step.zones")}</h3></header>
        <div class="pane-body stack">
          <p class="small muted">${this.t("planner.zones_intro")}</p>
          ${this.draft.zones.map((z) => {
            const beds = this.draft.beds.filter((b) => b.zone_id === z.id);
            const n = this.seasonPlantings.filter((p) => beds.some((b) => b.id === p.bed_id)).length;
            return html`<button class="zone-card" style=${`border-left-color:${ZONE_STYLE[z.type]?.stroke}`} @click=${() => this.openZone(z.id)}>
              <span class="big">${ZONE_STYLE[z.type]?.icon}</span>
              <span class="grow"><b>${z.name}</b><br /><span class="xs muted">${this.t(`settings.zone_type.${z.type}`)} ·
                ${this.t("planner.n_beds", { n: beds.length })} · ${this.t("planner.count", { n })}</span></span>
              <ha-icon icon="mdi:chevron-right"></ha-icon></button>`;
          })}
          ${!this.draft.zones.length ? html`<button class="btn" @click=${() => (this.step = "site")}>‹ ${this.t("planner.step.site")}</button>` : nothing}
        </div>
      </aside>`;
    }
    const beds = this.draft.beds.filter((b) => b.zone_id === zone.id);
    const ro = !this.admin;
    return html`<aside class="pane" aria-label=${zone.name}>
      <header><button class="icon-btn" aria-label=${this.t("planner.whole_garden")} @click=${() => this.closeZone()}><ha-icon icon="mdi:arrow-left"></ha-icon></button>
        <h3>${ZONE_STYLE[zone.type]?.icon} ${zone.name}</h3></header>
      <div class="pane-body stack">
        <label class="field">${this.t("planner.zone_name")}<input .value=${zone.name} ?disabled=${ro}
          @change=${(e: Event) => this.updateZone(zone.id, { name: (e.target as HTMLInputElement).value })} /></label>
        <label class="field">${this.t("planner.kind")}
          <select ?disabled=${ro} @change=${(e: Event) => this.updateZone(zone.id, { type: (e.target as HTMLSelectElement).value as ZoneType })}>
            ${ZONE_TYPES.map((k) => html`<option value=${k} ?selected=${zone.type === k}>${this.t(`settings.zone_type.${k}`)}</option>`)}
          </select></label>
        <p class="xs muted">${this.t(`zone_hint.${zone.type}`)}</p>
        <h4>${this.t("planner.beds_in_zone")} (${beds.length})</h4>
        <div class="tool-grid">
          ${this.renderToolButton({ kind: "bed" }, "▭", this.t("planner.draw_bed"))}
          ${FEATURE_TYPES.filter((f) => ["path", "tree", "trellis", "water_butt", "compost", "flowerbed"].includes(f))
            .map((f) => this.renderToolButton({ kind: "feature", type: f }, FEATURE_STYLE[f]?.icon || "▭", this.t(`feature.${f}`)))}
        </div>
        <div class="stack" style="gap:4px">${beds.map((b) => html`<button class="zone-row as-btn" @click=${() => this.onSelect({ kind: "bed", id: b.id })}>
          <span>▭</span><span class="grow"><b>${b.name}</b> <span class="xs muted">${(b.width_cm / 100).toFixed(1)} × ${(b.length_cm / 100).toFixed(1)} m · ${this.t(`kind.${b.kind}`)}</span></span></button>`)}</div>
        <div class="divider"></div>
        <div class="row wrap">
          <button class="btn primary" @click=${() => { this.step = "plant"; this.tool = null; }}><ha-icon icon="mdi:sprout"></ha-icon>${this.t("planner.fill_by_hand")}</button>
          ${ro ? nothing : html`<button class="btn" @click=${() => { this.autofillBeds = beds.map((b) => b.id); this.openAutofill(beds.map((b) => b.id)); }}>
            <ha-icon icon="mdi:auto-fix"></ha-icon>${this.t("planner.fill_by_system")}</button>`}
        </div>
      </div>
    </aside>`;
  }

  private updateZone(id: string, patch: Partial<Zone>): void {
    const doc = clone(this.draft);
    const z = doc.zones.find((i) => i.id === id);
    if (!z) return;
    Object.assign(z, patch);
    this.commit(doc);
  }

  private renderPalette(): TemplateResult {
    const q = this.search.trim().toLowerCase();
    const focus = this.draft.zones.find((z) => z.id === this.focusZone);
    const allowed = focus ? ZONE_CATEGORIES[focus.type] : null;
    const list = this.plants.filter((p) => {
      if (allowed && !this.categoryFilter && !allowed.includes(p.category ?? "vegetable")) return false;
      if (this.familyFilter && p.family !== this.familyFilter) return false;
      if (this.categoryFilter && (p.category ?? "vegetable") !== this.categoryFilter) return false;
      if (!q) return true;
      return [p.id, p.scientific_name, ...Object.values(p.names)].some((s) => s.toLowerCase().includes(q));
    }).sort((a, b) => plantName(a, this.lang).localeCompare(plantName(b, this.lang)));
    const families = [...new Set(this.plants.map((p) => p.family))].sort();
    return html`
      <aside class="pane" aria-label=${this.t("planner.palette")}>
        <header>
          <h3>${this.t("planner.palette")}</h3>
          <span class="spacer"></span>
          <div class="segmented" role="group" aria-label=${this.t("planner.layout")}>
            ${(["single", "block", "row"] as LayoutMode[]).map((m) => html`
              <button aria-pressed=${String(this.layoutMode === m)} @click=${() => (this.layoutMode = m)}>${this.t(`planner.layout.${m}`)}</button>`)}
          </div>
        </header>
        <div class="pane-body stack">
          <input type="search" placeholder=${this.t("common.search")} aria-label=${this.t("common.search")} .value=${this.search}
            @input=${(e: Event) => (this.search = (e.target as HTMLInputElement).value)} />
          <div class="row wrap family-chips" role="group" aria-label=${this.t("lib.category")}>
            ${CATEGORIES.map((c) => html`<button class="chip" aria-pressed=${String(this.categoryFilter === c)}
              @click=${() => (this.categoryFilter = this.categoryFilter === c ? "" : c)}>${this.t(`category.${c}`)}</button>`)}
          </div>
          <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
            <select @change=${(e: Event) => (this.familyFilter = (e.target as HTMLSelectElement).value)}>
              <option value="" ?selected=${!this.familyFilter}>${this.t("lib.family")}: ${this.t("common.all")}</option>
              ${families.map((f) => html`<option value=${f} ?selected=${this.familyFilter === f}>${this.families[f]?.[this.lang as "en" | "nl"] ?? f}</option>`)}
            </select></label>
          ${focus ? html`<p class="xs zone-filter">${ZONE_STYLE[focus.type]?.icon} ${this.t("planner.palette_for_zone", { zone: focus.name })}</p>` : nothing}
          <p class="xs muted">${this.t("planner.palette_hint")}</p>
          <div class="palette-list" role="list">
            ${list.map((p) => {
              const name = plantName(p, this.lang);
              return html`
                <button class="plant-card" role="listitem" aria-label=${`${name}, ${p.scientific_name}`}
                  @pointerdown=${(e: PointerEvent) => this.onPalettePointerDown(e, p)}
                  @pointermove=${this.onPalettePointerMove}
                  @pointerup=${this.onPalettePointerUp}
                  @pointercancel=${() => (this.paletteDrag = null)}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); this.addToSelectedBed(p); } }}>
                  <span class="swatch" style=${`border-color:${familyColor(this.families, p.family)}`}>${glyphIcon(glyphFor(p), p.color || familyColor(this.families, p.family), 26)}</span>
                  <span class="meta"><span>${name}${p.perennial ? html` <span class="perennial-tag" title=${this.t("planner.perennial")}>∞</span>` : nothing}</span>
                    <span class="xs muted">${p.spacing_cm} cm · ${p.perennial && p.years_to_bearing ? this.t("planner.bears_after", { n: p.years_to_bearing }) : `${p.days_to_maturity[0]}–${p.days_to_maturity[1]} d`}</span></span>
                </button>`;
            })}
          </div>
          <div class="legend-block stack" style="gap:8px">
          <div class="divider"></div>
          <h4>${this.t("planner.legend")}</h4>
          <div class="legend">
            <span><span class="badge-demo" style="background:var(--hl-leaf-700)">∞</span>${this.t("planner.legend.perennial")}</span>
            <span><span class="badge-demo" style="background:var(--hl-tomato-500)">!</span>${this.t("planner.legend.warning")}</span>
            <span><span class="badge-demo" style="background:var(--hl-soil-700)">2</span>${this.t("planner.legend.succession")}</span>
            <span><span class="row-demo"></span>${this.t("planner.legend.rows")}</span>
          </div>
          <p class="xs muted">${this.t("planner.legend.border")}</p>
          <div class="legend">
            ${families.map((f) => html`<span><span class="family-dot" style=${`background:${familyColor(this.families, f)}`}></span>${this.families[f]?.[this.lang as "en" | "nl"] ?? f}</span>`)}
          </div>
          </div>
        </div>
      </aside>
    `;
  }

  private renderFindings(bedId: string, plantingId?: string): TemplateResult {
    const report = this.reports[bedId] ?? this.snapshot.analysis?.beds[bedId]?.compatibility;
    const rotation = this.reports[bedId]?.rotation ?? this.snapshot.analysis?.beds[bedId]?.rotation ?? [];
    const pairs = (report?.pairs ?? []).filter((p) => !plantingId || p.a === plantingId || p.b === plantingId);
    const rot = rotation.filter((r) => !plantingId || r.planting === plantingId);
    const placement = (report?.placement ?? []).filter((p) => !plantingId || p.planting === plantingId);
    const oob = plantingId ? report?.out_of_bounds?.includes(plantingId) : (report?.out_of_bounds?.length ?? 0) > 0;
    const icon = { error: "mdi:alert-octagon-outline", warning: "mdi:alert-outline", info: "mdi:heart-outline" } as const;
    if (!pairs.length && !rot.length && !oob && !placement.length) return html`<p class="small muted">${this.t("planner.no_warnings")}</p>`;
    return html`<div class="stack" style="gap:6px">
      ${pairs.map((f) => html`<div class="finding ${f.severity}"><ha-icon icon=${icon[f.severity]}></ha-icon><span>${this.t(f.key, f.params)}</span></div>`)}
      ${rot.map((r) => html`<div class="finding ${r.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(r.key, r.params)}
        <hl-info term="rotation" .t=${this.t}></hl-info>
        ${r.alternatives?.length ? html`<br /><span class="xs">${this.t("planner.alternatives")}:
          ${r.alternatives.map((bid) => html`<button class="chip" ?disabled=${!this.admin} @click=${() => this.moveToBed(r.planting, bid)}>${this.draft.beds.find((b) => b.id === bid)?.name ?? bid}</button>`)}</span>` : nothing}</span></div>`)}
      ${plantingId && report?.suggestions?.[plantingId]?.length ? html`<div class="finding info"><ha-icon icon="mdi:lightbulb-on-outline"></ha-icon>
        <span>${this.t("planner.better_neighbours")}: ${report.suggestions[plantingId].map((pid) => plantName(this.plantMap.get(pid), this.lang)).join(", ")}</span></div>` : nothing}
      ${placement.map((p) => html`<div class="finding warning"><ha-icon icon="mdi:greenhouse"></ha-icon><span>${this.t(p.key, p.params)}</span></div>`)}
      ${oob ? html`<div class="finding warning"><ha-icon icon="mdi:border-outside"></ha-icon><span>${this.t("planner.out_of_bounds")}</span></div>` : nothing}
    </div>`;
  }

  private renderTimeline(tl: Timeline | undefined): TemplateResult {
    if (!tl) return html`<p class="small muted">–</p>`;
    const south = this.snapshot.settings.region.hemisphere === "south";
    const start = south ? `${this.season}-07-01` : `${this.season}-01-01`;
    const span = 365 + 120; // show a bit of the next season (overwintering crops)
    const pos = (iso: string | null | undefined) => (iso ? Math.max(0, Math.min(100, (daysBetween(start, iso) / span) * 100)) : null);
    const bar = (a: string | null | undefined, b: string | null | undefined, top: number, color: string, label: string) => {
      const x1 = pos(a);
      const x2 = pos(b);
      if (x1 === null || x2 === null) return nothing;
      return html`<div class="bar" title=${`${label}: ${formatDate(a, this.lang)} – ${formatDate(b, this.lang)}`}
        style=${`left:${x1}%;width:${Math.max(x2 - x1, 1)}%;top:${top}px;background:${color}`}></div>`;
    };
    const months = Array.from({ length: 16 }, (_, i) => addDays(start, Math.round(i * 30.4)));
    const today = this.snapshot.analysis?.today;
    return html`
      <div class="timeline" role="img" aria-label=${`${this.t("lib.harvest")} ${formatDate(tl.harvest_start, this.lang)} – ${formatDate(tl.harvest_end, this.lang)}`}>
        ${bar(tl.sow_window?.start, tl.sow_window?.end, 6, "var(--hl-leaf-300)", this.t(tl.method === "indoor_sow" ? "lib.indoor_sow" : "lib.direct_sow"))}
        ${bar(tl.transplant_window?.start, tl.transplant_window?.end, 20, "var(--hl-leaf-600)", this.t("lib.transplant"))}
        ${bar(tl.in_ground, tl.harvest_start, 34, "color-mix(in srgb, var(--hl-leaf-500) 35%, transparent)", this.t("dash.active_crops", { n: 1 }))}
        ${bar(tl.harvest_start, tl.harvest_end, 34, "var(--hl-sun-500)", this.t("lib.harvest"))}
        ${months.filter((_, i) => i % 2 === 0).map((m) => html`<span class="month" style=${`left:${pos(m)}%`}>${formatDate(m, this.lang, { month: "short" })}</span>`)}
        ${today && pos(today) !== null ? html`<div class="today" style=${`left:${pos(today)}%`}></div>` : nothing}
      </div>
      <div class="xs muted" style="margin-top:4px">
        ${tl.sow_date ? html`${this.t(tl.method === "indoor_sow" ? "lib.indoor_sow" : "lib.direct_sow")}: <b>${formatDate(tl.sow_date, this.lang)}</b> · ` : nothing}
        ${tl.transplant_date ? html`${this.t("lib.transplant")}: <b>${formatDate(tl.transplant_date, this.lang)}</b> · ` : nothing}
        ${this.t("lib.harvest")}: <b>${formatDate(tl.harvest_start, this.lang)} – ${formatDate(tl.harvest_end, this.lang)}</b>
      </div>`;
  }

  private renderPhenology(pid: string): TemplateResult | typeof nothing {
    const ph = this.snapshot.analysis?.phenology?.[pid];
    if (!ph || ph.stage === "not_planted") return nothing;
    return html`<div class="row wrap">
      <span class="chip ok"><ha-icon icon="mdi:sprout"></ha-icon>${this.t(`stage.${ph.stage}`)}</span>
      <span class="chip">Kc ${ph.kc.toFixed(2)} <hl-info term="kc" .t=${this.t}></hl-info></span>
      ${ph.gdd != null && ph.gdd_target ? html`<span class="chip">${Math.round(ph.gdd)} / ${ph.gdd_target} GDD <hl-info term="gdd" .t=${this.t}></hl-info></span>` : nothing}
      ${ph.harvest_estimate ? html`<span class="chip warn"><ha-icon icon="mdi:basket-outline"></ha-icon>${this.t("cal.harvest_estimate", { date: formatDate(ph.harvest_estimate, this.lang) })}</span>` : nothing}
      ${ph.heat_stress_days ? html`<span class="chip bad">${this.t("planner.heat_stress", { n: ph.heat_stress_days })}</span>` : nothing}
    </div>`;
  }

  private renderAutofill(): TemplateResult {
    const r = this.autofillResources!;
    const set = (patch: Partial<Resources>) => (this.autofillResources = { ...r, ...patch });
    const res = this.autofill;
    const plantList = [...this.plants].sort((a, b) => plantName(a, this.lang).localeCompare(plantName(b, this.lang)));
    const close = () => (this.dialog = null);
    const bedName = (id: string) => this.draft.beds.find((b) => b.id === id)?.name ?? id;
    return html`<div class="stack">
      <h2><ha-icon icon="mdi:auto-fix"></ha-icon> ${this.t("autofill.title")} <hl-info term="autofill" .t=${this.t}></hl-info></h2>
      <p class="small muted">${this.t("autofill.intro", { season: this.season })}</p>
      <div class="form-grid">
        <label class="field">${this.t("autofill.household")}<input type="number" min="1" max="20" .value=${String(r.household_size)}
          @change=${(e: Event) => set({ household_size: Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field">${this.t("autofill.hours")}<input type="number" min="0" step="0.5" .value=${String(r.hours_per_week)}
          @change=${(e: Event) => set({ hours_per_week: Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field">${this.t("autofill.water")}<input type="number" min="0" step="10" placeholder="∞" .value=${String(r.water_liters_per_week ?? "")}
          @change=${(e: Event) => set({ water_liters_per_week: (e.target as HTMLInputElement).value === "" ? null : Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field">${this.t("autofill.compost")}<input type="number" min="0" step="5" placeholder="∞" .value=${String(r.compost_kg ?? "")}
          @change=${(e: Event) => set({ compost_kg: (e.target as HTMLInputElement).value === "" ? null : Number((e.target as HTMLInputElement).value) })} /></label>
        <label class="field full row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${r.irrigation}
          @change=${(e: Event) => set({ irrigation: (e.target as HTMLInputElement).checked })} />${this.t("autofill.has_irrigation")}</label>
      </div>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.goals")}><span class="small">${this.t("autofill.goals")}:</span>
        ${GOALS.map((g) => html`<button class="chip" aria-pressed=${String(r.goals.includes(g))}
          @click=${() => set({ goals: r.goals.includes(g) ? r.goals.filter((x) => x !== g) : [...r.goals, g] })}>${this.t(`autofill.goal.${g}`)}</button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("autofill.wanted")}
          <select @change=${(e: Event) => { const el = e.target as HTMLSelectElement; if (el.value && !r.wanted.includes(el.value)) set({ wanted: [...r.wanted, el.value] }); el.value = ""; }}>
            <option value="">+</option>${plantList.map((p) => html`<option value=${p.id}>${plantName(p, this.lang)}</option>`)}</select></label>
        <label class="field">${this.t("autofill.excluded")}
          <select @change=${(e: Event) => { const el = e.target as HTMLSelectElement; if (el.value && !r.excluded.includes(el.value)) set({ excluded: [...r.excluded, el.value] }); el.value = ""; }}>
            <option value="">+</option>${plantList.map((p) => html`<option value=${p.id}>${plantName(p, this.lang)}</option>`)}</select></label>
      </div>
      <div class="row wrap">
        ${r.wanted.map((id) => html`<button class="chip ok" title=${this.t("common.delete")} @click=${() => set({ wanted: r.wanted.filter((x) => x !== id) })}>♥ ${plantName(this.plantMap.get(id), this.lang)} ✕</button>`)}
        ${r.excluded.map((id) => html`<button class="chip bad" title=${this.t("common.delete")} @click=${() => set({ excluded: r.excluded.filter((x) => x !== id) })}>⊘ ${plantName(this.plantMap.get(id), this.lang)} ✕</button>`)}
      </div>
      <fieldset class="prefs"><legend>${this.t("autofill.prefs")}</legend>
        <label class="field">${this.t("autofill.freedom")}
          <select @change=${(e: Event) => set({ freedom: (e.target as HTMLSelectElement).value as Resources["freedom"] })}>
            ${(["strict", "balanced", "free"] as const).map((f) => html`<option value=${f} ?selected=${(r.freedom ?? "balanced") === f}>${this.t(`autofill.freedom.${f}`)}</option>`)}
          </select></label>
        ${(["respect_companions", "add_pollinators", "year_round", "allow_perennials", "match_zone_type"] as const).map((k) => html`
          <label class="row small"><input type="checkbox" .checked=${r[k] ?? !["year_round"].includes(k)}
            @change=${(e: Event) => set({ [k]: (e.target as HTMLInputElement).checked } as Partial<Resources>)} />${this.t(`autofill.pref.${k}`)}</label>`)}
      </fieldset>
      <div class="row wrap" role="group" aria-label=${this.t("autofill.beds")}><span class="small">${this.t("autofill.beds")}:</span>
        ${this.draft.beds.map((b) => html`<button class="chip" aria-pressed=${String(this.autofillBeds.includes(b.id))}
          @click=${() => (this.autofillBeds = this.autofillBeds.includes(b.id) ? this.autofillBeds.filter((x) => x !== b.id) : [...this.autofillBeds, b.id])}>${b.name}</button>`)}
        <span class="xs muted">${this.autofillBeds.length ? "" : this.t("autofill.all_empty")}</span>
      </div>
      <label class="row small"><input type="checkbox" .checked=${this.autofillReplace} @change=${(e: Event) => (this.autofillReplace = (e.target as HTMLInputElement).checked)} />${this.t("autofill.replace")}</label>
      <div class="row"><button class="btn" ?disabled=${this.autofillBusy} @click=${() => this.runAutofill()}><ha-icon icon="mdi:creation"></ha-icon>${this.t("autofill.propose")}</button></div>
      ${res ? html`
        <div class="divider"></div>
        <div class="row wrap">
          <span class="chip ok">${this.t("autofill.sum_crops", { n: res.summary.crops })}</span>
          <span class="chip">${this.t("autofill.sum_yield", { kg: res.summary.yield_kg })}</span>
          <span class="chip">${this.t("autofill.sum_time", { min: res.summary.minutes_week })}</span>
          <span class="chip">${this.t("autofill.sum_water", { l: res.summary.water_l_week })}</span>
          <span class="chip">${this.t("autofill.sum_compost", { kg: res.summary.compost_kg })}</span>
        </div>
        ${res.warnings.map((w) => html`<div class="finding warning"><ha-icon icon="mdi:alert-outline"></ha-icon><span>${this.t(w.key, { ...w.params,
          plants: Array.isArray(w.params.plants) ? (w.params.plants as string[]).map((id) => plantName(this.plantMap.get(id), this.lang)).join(", ") : w.params.plants })}</span></div>`)}
        <div style="max-height:30vh;overflow:auto"><table class="shortcuts" style="width:100%">
          <tr><th align="left">${this.t("lib.plant")}</th><th align="left">${this.t("task.bed")}</th><th align="right">#</th><th align="right">m²</th><th align="right">kg</th></tr>
          ${res.placements.map((pl) => html`<tr><td><span class="family-dot" style=${`background:${familyColor(this.families, this.plantMap.get(pl.plant_id)?.family)}`}></span>
            ${plantName(this.plantMap.get(pl.plant_id), this.lang)}${pl.sowings > 1 ? html` <span class="xs muted">×${pl.sowings}</span>` : nothing}</td>
            <td>${bedName(pl.bed_id)}</td><td align="right">${pl.count}</td><td align="right">${pl.area_m2.toFixed(1)}</td><td align="right">${pl.yield_kg.toFixed(1)}</td></tr>`)}
        </table></div>
        ${res.skipped.length ? html`<p class="xs muted">${this.t("autofill.skipped")}: ${res.skipped.map((sk) => `${plantName(this.plantMap.get(sk.plant_id), this.lang)} (${this.t(`autofill.reason.${sk.reason}`)})`).join(", ")}</p>` : nothing}
      ` : nothing}
      <div class="row" style="justify-content:flex-end">
        <button class="btn ghost" @click=${close}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${!res?.plantings.length} @click=${() => this.applyAutofill()}>${this.t("autofill.apply")}</button>
      </div>
    </div>`;
  }

  private renderInspector(): TemplateResult {
    const sel = this.selection;
    const item = sel ? this.findItem(sel) : undefined;
    const ro = !this.admin;
    let body: TemplateResult;
    if (!sel || !item) {
      body = html`<p class="small muted">${this.t("planner.nothing_selected")}</p><p class="xs muted">${this.t("planner.multi_hint")}</p>`;
    } else if (this.multi.length > 1) {
      body = html`<h3>${this.t("planner.selected_n", { n: this.multi.length })}</h3>
        <p class="small muted">${this.t("planner.multi_hint")}</p>
        <div class="row wrap">
          ${(["left", "hcenter", "right", "top", "vcenter", "bottom", "hdistribute", "vdistribute"] as AlignMode[]).map((m) => html`
            <button class="btn small" ?disabled=${ro || (m.endsWith("distribute") && this.multi.length < 3)} @click=${() => this.align(m)}>${this.t(`planner.align.${m}`)}</button>`)}
        </div>
        ${!ro && (sel.kind === "planting" || sel.kind === "feature") ? html`<div class="row"><button class="btn small danger" @click=${() => this.removeSelected()}>${this.t("planner.remove")}</button></div>` : nothing}`;
    } else if (sel.kind === "feature") {
      const f = item as Feature;
      body = html`<h3>${f.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${f.name} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ name: (e.target as HTMLInputElement).value })} /></label>
          <label class="field full">${this.t("planner.kind")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ type: (e.target as HTMLSelectElement).value })}>
              ${FEATURE_TYPES.map((t) => html`<option value=${t} ?selected=${f.type === t}>${this.t(`feature.${t}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(f.width_cm)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ width_cm: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(f.length_cm)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ length_cm: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field full">${this.t("task.notes")}<textarea rows="2" .value=${f.notes} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ notes: (e.target as HTMLTextAreaElement).value })}></textarea></label>
        </div>
        ${ro ? nothing : html`<div class="row"><button class="btn small danger" @click=${() => this.removeSelected()}>${this.t("planner.remove")}</button></div>`}`;
    } else if (sel.kind === "planting") {
      const p = item as Planting;
      const plant = this.plantMap.get(p.plant_id);
      const bed = this.draft.beds.find((b) => b.id === p.bed_id);
      const advice = this.snapshot.analysis?.advice[p.id];
      body = html`
        <div class="row">
          <span class="family-dot" style=${`background:${familyColor(this.families, plant?.family)};width:14px;height:14px`}></span>
          <h3>${plantName(plant, this.lang)}</h3>
        </div>
        <p class="xs muted">${plant?.scientific_name} · ${this.families[plant?.family ?? ""]?.[this.lang as "en" | "nl"] ?? plant?.family} · ${bed?.name}</p>
        ${plant?.perennial ? html`<div class="finding info"><ha-icon icon="mdi:all-inclusive"></ha-icon><span>${this.t("planner.perennial_since", { season: p.season })}
          ${plant.years_to_bearing ? html`<br />${this.t("planner.bearing_from", { season: p.season + plant.years_to_bearing })}` : nothing}</span></div>` : nothing}
        ${plant?.pollination && plant.pollination !== "self" ? html`<p class="xs"><ha-icon icon="mdi:bee"></ha-icon> ${this.t(`pollination.${plant.pollination}`)}</p>` : nothing}
        <div class="form-grid">
          <label class="field">${this.t("planner.layout")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ layout: (e.target as HTMLSelectElement).value })}>
              ${(["single", "block", "row"] as LayoutMode[]).map((m) => html`<option value=${m} ?selected=${p.layout === m}>${this.t(`planner.layout.${m}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.status")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ status: (e.target as HTMLSelectElement).value as PlantingStatus })}>
              ${(["planned", "sown_indoors", "sown", "transplanted", "harvesting", "finished", "failed"] as PlantingStatus[]).map((s) => html`<option value=${s} ?selected=${p.status === s}>${this.t(`status.${s}`)}</option>`)}
            </select></label>
          <label class="field full">${this.t("planner.method")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ method: (e.target as HTMLSelectElement).value })}>
              ${(["indoor_sow", "direct_sow", "transplant"] as SowMethod[]).map((m) => html`<option value=${m} ?selected=${p.method === m}>${this.t(`planner.method.${m}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="5" step="5" .value=${String(Math.round(p.width_cm))} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ width_cm: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="5" step="5" .value=${String(Math.round(p.length_cm))} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ length_cm: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field full">${this.t(p.method === "transplant" ? "lib.transplant" : p.method === "indoor_sow" ? "lib.indoor_sow" : "lib.direct_sow")}
            <input type="date" ?disabled=${ro} .value=${(p.method === "transplant" ? p.transplant_date : p.sow_date) ?? ""}
              @change=${(e: Event) => this.updateSelected(p.method === "transplant" ? { transplant_date: (e.target as HTMLInputElement).value || null } : { sow_date: (e.target as HTMLInputElement).value || null })} /></label>
        </div>
        <p class="small">${plant ? this.t("planner.count", { n: plantCount(p, plant) }) : ""}</p>
        ${advice?.reasons.length ? html`<div class="stack" style="gap:4px">${advice.reasons.filter((r) => r.key !== "reason.window_open").map((r) => html`<p class="small">${this.t(r.key, r.params)}</p>`)}</div>` : nothing}
        ${this.renderPhenology(p.id)}
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[p.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(p.bed_id, p.id)}
        ${plant?.tips?.[this.lang]?.length || plant?.tips?.en?.length ? html`<details class="tips" open><summary>${this.t("planner.eco_tips")}</summary>
          <ul>${(plant.tips[this.lang] ?? plant.tips.en).map((tip) => html`<li>${tip}</li>`)}</ul></details>` : nothing}
        ${ro ? nothing : html`
          <div class="row wrap">
            <button class="btn small" @click=${() => (this.dialog = "succession")}><ha-icon icon="mdi:calendar-multiple"></ha-icon>${this.t("planner.succession")}</button>
            <button class="btn small ghost" @click=${() => this.duplicateSelected()}>${this.t("planner.duplicate")}</button>
            <button class="btn small danger" @click=${() => this.removeSelected()}>${this.t("planner.remove")}</button>
          </div>`}
      `;
    } else if (sel.kind === "bed") {
      const b = item as Bed;
      const ba = this.snapshot.analysis?.beds[b.id];
      const report = this.reports[b.id] ?? ba?.compatibility;
      body = html`
        <h3>${b.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${b.name} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ name: (e.target as HTMLInputElement).value })} /></label>
          <label class="field">${this.t("planner.zone")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ zone_id: (e.target as HTMLSelectElement).value })}>
              ${this.draft.zones.map((z) => html`<option value=${z.id} ?selected=${b.zone_id === z.id}>${z.name}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ kind: (e.target as HTMLSelectElement).value as BedKind })}>
              ${(["in_ground", "raised", "container"] as BedKind[]).map((k) => html`<option value=${k} ?selected=${b.kind === k}>${this.t(`kind.${k}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="10" step="10" .value=${String(b.width_cm)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ width_cm: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="10" step="10" .value=${String(b.length_cm)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ length_cm: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field">${this.t("planner.soil")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ soil: (e.target as HTMLSelectElement).value as SoilType })}>
              ${(["sandy", "loam", "clay", "silt", "peat", "chalk", "potting_mix"] as SoilType[]).map((s) => html`<option value=${s} ?selected=${b.soil === s}>${this.t(`soil.${s}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.orientation")}<input type="number" min="0" max="359" step="15" .value=${String(b.orientation_deg)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ orientation_deg: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(b.shade_pct ?? "")} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ shade_pct: (e.target as HTMLInputElement).value === "" ? null : Number((e.target as HTMLInputElement).value) })} /></label>
        </div>
        ${ba ? html`
          <div class="row wrap">
            <span class="chip ${ba.moisture_status === "optimal" ? "ok" : ba.moisture_status === "dry" ? "bad" : ba.moisture_status === "unknown" ? "" : "warn"}">
              <ha-icon icon="mdi:water-percent"></ha-icon>${this.t(`moisture.${ba.moisture_status}`)}${ba.irrigation.moisture != null ? ` · ${Math.round(ba.irrigation.moisture)}%` : ""}</span>
            <span class="chip">${this.t(`irrigation.${ba.irrigation.action}`, { mm: ba.irrigation.amount_mm, liters: Math.round(ba.irrigation.liters) })}</span>
          </div>` : nothing}
        <div class="row"><span class="score">${Math.round(report?.score ?? 50)}</span><span class="small muted">${this.t("planner.score")}</span></div>
        ${this.renderFindings(b.id)}
        ${ro ? nothing : html`<div class="row"><button class="btn small danger" @click=${() => this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `;
    } else {
      const z = item as Zone;
      body = html`
        <h3>${z.name}</h3>
        <div class="form-grid">
          <label class="field full">${this.t("planner.bed_name")}<input .value=${z.name} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ name: (e.target as HTMLInputElement).value })} /></label>
          <label class="field">${this.t("planner.kind")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ type: (e.target as HTMLSelectElement).value as ZoneType })}>
              ${ZONE_TYPES.map((k) => html`<option value=${k} ?selected=${z.type === k}>${this.t(`settings.zone_type.${k}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.wind")}
            <select ?disabled=${ro} @change=${(e: Event) => this.updateSelected({ wind: (e.target as HTMLSelectElement).value as Wind }, "microclimate")}>
              ${(["sheltered", "moderate", "exposed"] as Wind[]).map((w) => html`<option value=${w} ?selected=${z.microclimate.wind === w}>${this.t(`wind.${w}`)}</option>`)}
            </select></label>
          <label class="field">${this.t("planner.width")}<input type="number" min="50" step="10" .value=${String(z.width_cm)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ width_cm: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field">${this.t("planner.length")}<input type="number" min="50" step="10" .value=${String(z.length_cm)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ length_cm: Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field">${this.t("planner.shade")}<input type="number" min="0" max="100" step="5" .value=${String(z.microclimate.shade_pct)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ shade_pct: Number((e.target as HTMLInputElement).value) }, "microclimate")} /></label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${z.microclimate.heated} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ heated: (e.target as HTMLInputElement).checked }, "microclimate")} />${this.t("settings.heated")}</label>
          <label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${Boolean(z.microclimate.wall_heat)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ wall_heat: (e.target as HTMLInputElement).checked }, "microclimate")} />${this.t("settings.wall_heat")}
            <hl-info term="microclimate" .t=${this.t}></hl-info></label>
          ${z.type === "greenhouse" || z.type === "cold_frame" ? html`<label class="field row" style="flex-direction:row;align-items:center"><input type="checkbox" .checked=${Boolean(z.microclimate.thermal_mass)} ?disabled=${ro}
            @change=${(e: Event) => this.updateSelected({ thermal_mass: (e.target as HTMLInputElement).checked }, "microclimate")} />${this.t("settings.thermal_mass")}</label>` : nothing}
        </div>
        <div class="row wrap">
          <button class="btn small" @click=${() => this.openZone(z.id)}><ha-icon icon="mdi:map-search-outline"></ha-icon>${this.t("planner.open_zone")}</button>
          ${ro ? nothing : html`<button class="btn small danger" @click=${() => this.removeSelected()}>${this.t("planner.remove")}</button>`}
        </div>
      `;
    }
    return html`<aside class="pane" aria-label=${this.t("planner.inspector")}>
      <header><h3>${this.t("planner.inspector")}</h3></header>
      <div class="pane-body stack">${body}</div>
    </aside>`;
  }

  private renderDialog(): TemplateResult | typeof nothing {
    if (this.removing) {
      const p = this.removing;
      const name = plantName(this.plantMap.get(p.plant_id), this.lang);
      return html`<dialog @close=${() => (this.removing = null)}>
        <div class="stack">
          <h2><ha-icon icon="mdi:tree-outline"></ha-icon> ${this.t("planner.remove_perennial", { name })}</h2>
          <p class="small">${this.t("planner.remove_perennial_intro", { name, season: p.season })}</p>
          <button class="btn primary" @click=${() => this.removePerennial("season")}>${this.t("planner.remove_from_season", { season: this.season })}</button>
          <p class="xs muted">${this.t("planner.remove_from_season_hint")}</p>
          <button class="btn danger" @click=${() => this.removePerennial("delete")}>${this.t("planner.remove_everywhere")}</button>
          <p class="xs muted">${this.t("planner.remove_everywhere_hint")}</p>
          <div class="row" style="justify-content:flex-end"><button class="btn ghost" @click=${() => (this.removing = null)}>${this.t("common.cancel")}</button></div>
        </div></dialog>`;
    }
    if (!this.dialog) return nothing;
    const close = () => (this.dialog = null);
    let content: TemplateResult;
    if (this.dialog === "shortcuts") {
      const rows: [string, string][] = [
        ["← ↑ → ↓", "shortcut.move"], ["Alt + ← ↑ → ↓", "planner.width"], ["Ctrl + Z", "shortcut.undo"], ["Ctrl + Y", "shortcut.redo"],
        ["Delete", "shortcut.delete"], ["Ctrl + D", "shortcut.duplicate"], ["[ ]", "shortcut.cycle"], ["G", "shortcut.grid"],
        ["C", "shortcut.companions"], ["M", "shortcut.moisture"], ["+ / − / 0", "shortcut.zoom"], ["Esc", "shortcut.escape"], ["?", "shortcut.help"],
      ];
      content = html`<h2>${this.t("planner.shortcuts")}</h2>
        <table class="shortcuts">${rows.map(([k, l]) => html`<tr><td><kbd>${k}</kbd></td><td>${this.t(l)}</td></tr>`)}</table>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${close}>${this.t("common.close")}</button></div>`;
    } else if (this.dialog === "autofill") {
      content = this.renderAutofill();
    } else if (this.dialog === "succession") {
      const p = this.selection ? this.draft.plantings.find((i) => i.id === this.selection!.id) : undefined;
      const plant = p && this.plantMap.get(p.plant_id);
      content = html`<form class="stack" @submit=${this.createSuccession}>
        <h2>${this.t("planner.succession")} – ${plantName(plant, this.lang)}</h2>
        <label class="field">${this.t("planner.succession_count")}<input name="count" type="number" min="2" max="12" value="3" required /></label>
        <label class="field">${this.t("planner.succession_interval")}<input name="interval" type="number" min="3" max="90" .value=${String(plant?.succession_interval_days ?? 21)} /></label>
        <label class="field">${this.t("planner.succession_placement")}
          <select name="placement"><option value="split">${this.t("planner.succession.split")}</option><option value="stack">${this.t("planner.succession.stack")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${close}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.succession_create")}</button></div>
      </form>`;
    } else {
      content = html`<form class="stack" @submit=${this.importPlan}>
        <h2>${this.t("planner.import")}</h2>
        <input name="file" type="file" accept=".json,.yaml,.yml,application/json,application/yaml" required />
        <label class="field">${this.t("planner.import_mode")}
          <select name="mode"><option value="merge">${this.t("planner.import_merge")}</option><option value="replace">${this.t("planner.import_replace")}</option></select></label>
        <div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" @click=${close}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("planner.import")}</button></div>
      </form>`;
    }
    return html`<dialog @close=${close} style=${this.dialog === "autofill" ? "max-width:760px" : ""}>${content}</dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-planner-view": PlannerView;
  }
}
