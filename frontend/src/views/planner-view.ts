import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type {
  Bed, BedKind, CompatibilityReport, FamilyInfo, LayoutMode, PlanDoc, Plant, Planting, PlantingStatus,
  Snapshot, SoilType, SowMethod, Timeline, Wind, Zone, ZoneType,
} from "../types";
import { addDays, daysBetween, download, familyColor, formatDate, plantName, uid } from "../util/garden";
import "../planner/garden-canvas";
import type { GardenCanvas, ItemChangeDetail, Selection } from "../planner/garden-canvas";
import { bedAt, clampInto, defaultFootprint, extents, findFreeSpot, plantCount, snap, type Rect } from "../planner/geometry";
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

  @state() private draft: PlanDoc = { zones: [], beds: [], plantings: [] };
  @state() private selection: Selection | null = null;
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
  @state() private dialog: "shortcuts" | "succession" | "import" | null = null;
  @state() private announcement = "";
  @state() private paletteOpen = true;

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
      .layout.narrow hl-garden-canvas { height: 60vh; }
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
      .plant-card .swatch { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; color: #fff; font-weight: 700; font-size: 12px; flex: none; }
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
    }
    const unchangedLocally = this.saveState === "saved";
    if (!this.history || (unchangedLocally && snap.revision !== this.baseRevision)) {
      const doc = { zones: clone(snap.zones), beds: clone(snap.beds), plantings: clone(snap.plantings) };
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

  private get seasonPlantings(): Planting[] {
    return this.draft.plantings.filter((p) => p.season === this.season);
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
    return doc.plantings.filter((p) => p.bed_id === bedId && Math.abs(p.season - this.season) <= 1);
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
  private findItem(sel: Selection): Zone | Bed | Planting | undefined {
    const list = sel.kind === "zone" ? this.draft.zones : sel.kind === "bed" ? this.draft.beds : this.draft.plantings;
    return (list as { id: string }[]).find((i) => i.id === sel.id) as Zone | Bed | Planting | undefined;
  }

  private onItemChange(ev: CustomEvent<ItemChangeDetail>): void {
    const { kind, id, rect, targetBedId } = ev.detail;
    const doc = clone(this.draft);
    const step = this.snapOn ? this.snapshot.settings.snap_cm : 1;
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

  private updateSelected(patch: Record<string, unknown>, nested?: "microclimate"): void {
    if (!this.selection) return;
    const doc = clone(this.draft);
    const list = (this.selection.kind === "zone" ? doc.zones : this.selection.kind === "bed" ? doc.beds : doc.plantings) as unknown as Record<string, unknown>[];
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
    if (sel.kind === "planting") {
      const p = doc.plantings.find((i) => i.id === sel.id);
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
      case "Escape": this.selection = null; this.paletteDrag = null; this.dialog = null; return handled();
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
      ${this.renderToolbar()}
      <div class="layout ${this.narrow ? "narrow" : ""} ${this.paletteOpen || this.narrow ? "" : "palette-closed"}" @keydown=${this.onKeyDown}>
        ${this.paletteOpen || this.narrow ? this.renderPalette() : html`<div></div>`}
        <div class="center">
          <hl-garden-canvas
            .zones=${this.draft.zones}
            .beds=${this.draft.beds}
            .plantings=${this.seasonPlantings}
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
            @select=${(e: CustomEvent<Selection | null>) => (this.selection = e.detail)}
            @item-change=${this.onItemChange}
          ></hl-garden-canvas>
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
          <button class="btn small" @click=${() => this.addBed()}><ha-icon icon="mdi:plus"></ha-icon>${this.t("planner.add_bed")}</button>
          <button class="btn small ghost" @click=${() => this.addZone()}>${this.t("planner.add_zone")}</button>` : nothing}
        ${btn("mdi:file-export-outline", this.t("planner.export_json"), () => this.exportPlan("json"))}
        ${btn("mdi:code-braces", this.t("planner.export_yaml"), () => this.exportPlan("yaml"))}
        ${this.admin ? btn("mdi:file-import-outline", this.t("planner.import"), () => (this.dialog = "import")) : nothing}
        ${btn("mdi:keyboard-outline", `${this.t("planner.shortcuts")} (?)`, () => (this.dialog = "shortcuts"))}
      </div>
      ${this.admin ? nothing : html`<p class="readonly-note">${this.t("common.admin_only")}</p>`}
    `;
  }

  private renderPalette(): TemplateResult {
    const q = this.search.trim().toLowerCase();
    const list = this.plants.filter((p) => {
      if (this.familyFilter && p.family !== this.familyFilter) return false;
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
          <div class="row wrap">
            <button class="chip" aria-pressed=${String(!this.familyFilter)} @click=${() => (this.familyFilter = "")}>${this.t("common.all")}</button>
            ${families.map((f) => html`
              <button class="chip" aria-pressed=${String(this.familyFilter === f)} @click=${() => (this.familyFilter = this.familyFilter === f ? "" : f)}
                title=${this.families[f]?.[this.lang as "en" | "nl"] ?? f}>
                <span class="family-dot" style=${`background:${familyColor(this.families, f)}`}></span>${(this.families[f]?.[this.lang as "en" | "nl"] ?? f).split(" ")[0]}
              </button>`)}
          </div>
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
                  <span class="swatch" style=${`background:${familyColor(this.families, p.family)}`}>${name.slice(0, 2)}</span>
                  <span class="meta"><span>${name}</span><span class="xs muted">${p.spacing_cm} cm · ${p.days_to_maturity[0]}–${p.days_to_maturity[1]} d</span></span>
                </button>`;
            })}
          </div>
          <div class="divider"></div>
          <h4>${this.t("planner.legend")}</h4>
          <div class="legend">
            ${families.map((f) => html`<span><span class="family-dot" style=${`background:${familyColor(this.families, f)}`}></span>${this.families[f]?.[this.lang as "en" | "nl"] ?? f}</span>`)}
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
      ${rot.map((r) => html`<div class="finding ${r.severity}"><ha-icon icon="mdi:rotate-3d-variant"></ha-icon><span>${this.t(r.key, r.params)}</span></div>`)}
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

  private renderInspector(): TemplateResult {
    const sel = this.selection;
    const item = sel ? this.findItem(sel) : undefined;
    const ro = !this.admin;
    let body: TemplateResult;
    if (!sel || !item) {
      body = html`<p class="small muted">${this.t("planner.nothing_selected")}</p>`;
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
        <h4>${this.t("planner.timeline")}</h4>
        ${this.renderTimeline(this.timelines[p.id])}
        <h4>${this.t("planner.warnings")}</h4>
        ${this.renderFindings(p.bed_id, p.id)}
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
              ${(["outdoor", "greenhouse", "cold_frame"] as ZoneType[]).map((k) => html`<option value=${k} ?selected=${z.type === k}>${this.t(`settings.zone_type.${k}`)}</option>`)}
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
        </div>
        ${ro ? nothing : html`<div class="row"><button class="btn small danger" @click=${() => this.removeSelected()}>${this.t("planner.remove")}</button></div>`}
      `;
    }
    return html`<aside class="pane" aria-label=${this.t("planner.inspector")}>
      <header><h3>${this.t("planner.inspector")}</h3></header>
      <div class="pane-body stack">${body}</div>
    </aside>`;
  }

  private renderDialog(): TemplateResult | typeof nothing {
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
    return html`<dialog @close=${close}>${content}</dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-planner-view": PlannerView;
  }
}
