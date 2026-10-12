// "Crops" tab: every crop of a season in one list - adjust every date, the status,
// the count and notes directly, without dragging anything on the map.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant, Planting, PlantingStatus, Snapshot, SowMethod, Timeline } from "../types";
import { familyColor, formatDate, plantName } from "../util/garden";
import "../components/plant-image";

export interface CropRow { planting: Planting; bed: string | null; zone: string | null; timeline: Timeline | null }

const STATUSES: PlantingStatus[] = ["planned", "sown_indoors", "sown", "transplanted", "harvesting", "finished", "failed"];
const METHODS: SowMethod[] = ["indoor_sow", "direct_sow", "transplant"];
const METHOD_LABEL: Record<SowMethod, string> = { indoor_sow: "lib.indoor_sow", direct_sow: "lib.direct_sow", transplant: "lib.transplant" };
/** Editable date fields: planned (empty = computed) and what actually happened. */
const DATE_FIELDS = ["sow_date", "sown_on", "transplant_date", "transplanted_on", "harvest_started_on", "finished_on"] as const;
type DateField = (typeof DATE_FIELDS)[number];

@customElement("hl-crops-view")
export class CropsView extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) plants: Plant[] = [];
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property({ type: Boolean }) admin = true;
  @property({ type: Number }) initialSeason: number | null = null;

  @state() private season = 0;
  @state() private rows: CropRow[] = [];
  @state() private filter = "";
  @state() private group: "bed" | "plant" | "date" = "bed";
  @state() private open: CropRow | null = null;
  @state() private saving = new Set<string>();
  private plantMap = new Map<string, Plant>();
  private reloadTimer?: number;

  static styles = [
    shared,
    css`
      :host { display: block; }
      .top { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: center; margin-bottom: var(--hl-s3); }
      .top input[type="search"] { flex: 1; min-width: 180px; }
      table { width: 100%; border-collapse: collapse; font-size: var(--hl-fs-sm); }
      th { text-align: left; font-weight: 600; color: var(--hl-text-muted); padding: 6px; border-bottom: 2px solid var(--hl-border); white-space: nowrap; }
      td { padding: 4px 6px; border-bottom: 1px solid var(--hl-border); vertical-align: middle; }
      tr.group td { background: var(--hl-surface-2); font-weight: 700; padding-top: 10px; }
      td.plant { display: flex; gap: 8px; align-items: center; min-width: 160px; }
      td.plant button { all: unset; cursor: pointer; font-weight: 600; }
      td.plant button:hover { text-decoration: underline; }
      td input[type="date"] { width: 132px; min-height: 30px; padding: 2px 4px; font-size: var(--hl-fs-sm); }
      td input[type="number"] { width: 64px; min-height: 30px; }
      td select { min-height: 30px; padding: 2px 4px; font-size: var(--hl-fs-sm); width: auto; }
      .computed { font-size: 10px; color: var(--hl-text-muted); display: block; }
      .late { color: var(--hl-warning); }
      .wrap { overflow-x: auto; }
      tr.saving { opacity: 0.6; }
      dialog .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      dialog .full { grid-column: 1 / -1; }
      dialog hl-plant-image { margin-bottom: var(--hl-s2); }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.season) this.season = this.initialSeason ?? this.snapshot?.layout_season ?? this.snapshot?.analysis?.season ?? new Date().getFullYear();
    void this.load();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.reloadTimer);
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("plants")) this.plantMap = new Map(this.plants.map((p) => [p.id, p]));
    if (changed.has("snapshot") && changed.get("snapshot") !== undefined && !this.saving.size) {
      window.clearTimeout(this.reloadTimer);
      this.reloadTimer = window.setTimeout(() => void this.load(), 600);
    }
  }

  protected updated(): void {
    const dialog = this.renderRoot.querySelector("dialog");
    if (dialog && !dialog.open) dialog.showModal();
  }

  private async load(): Promise<void> {
    try {
      this.rows = (await this.api.plantingsSeason(this.season)).rows;
      if (this.open) this.open = this.rows.find((r) => r.planting.id === this.open!.planting.id) ?? null;
    } catch {
      /* older backend */
    }
  }

  private toast(message: string): void {
    this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message }, bubbles: true, composed: true }));
  }

  private async saveRow(row: CropRow, changes: Partial<Planting>): Promise<void> {
    const id = row.planting.id;
    this.saving = new Set([...this.saving, id]);
    try {
      const res = await this.api.updatePlanting(id, changes);
      if (res.row) {
        this.rows = this.rows.map((r) => (r.planting.id === id ? res.row! : r));
        if (this.open?.planting.id === id) this.open = res.row;
      }
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message ?? String(err) }));
      await this.load();
    } finally {
      const next = new Set(this.saving);
      next.delete(id);
      this.saving = next;
    }
  }

  /** The date the plan uses when a field is left empty. */
  private computed(row: CropRow, field: DateField): string | null {
    const tl = row.timeline;
    if (!tl) return null;
    if (field === "sow_date") return tl.sow_date;
    if (field === "transplant_date") return tl.transplant_date;
    if (field === "harvest_started_on") return tl.harvest_start;
    if (field === "finished_on") return tl.harvest_end;
    return null;
  }

  private dateInput(row: CropRow, field: DateField): TemplateResult {
    const value = (row.planting[field] as string | null | undefined) ?? "";
    const computed = this.computed(row, field);
    return html`<input type="date" .value=${value} ?disabled=${!this.admin} aria-label=${this.t(`crops.field.${field}`)}
      @change=${(e: Event) => this.saveRow(row, { [field]: (e.target as HTMLInputElement).value || null } as Partial<Planting>)} />
      ${!value && computed ? html`<span class="computed">${this.t("crops.computed")}: ${formatDate(computed, this.lang)}</span>` : nothing}`;
  }

  private icon(row: CropRow, size: "thumb" = "thumb"): TemplateResult | typeof nothing {
    const plant = this.plantMap.get(row.planting.plant_id);
    return plant ? html`<hl-plant-image .plant=${plant} color=${familyColor(this.families, plant.family)} lang=${this.lang} size=${size}
      style="width:32px;height:32px"></hl-plant-image>` : nothing;
  }

  private visibleRows(): CropRow[] {
    const q = this.filter.trim().toLowerCase();
    const rows = this.rows.filter((r) => !q || [plantName(this.plantMap.get(r.planting.plant_id), this.lang), r.bed ?? "", r.zone ?? ""]
      .some((s) => s.toLowerCase().includes(q)));
    const key = (r: CropRow) => this.group === "bed" ? `${r.zone ?? ""} ${r.bed ?? ""}` : this.group === "plant"
      ? plantName(this.plantMap.get(r.planting.plant_id), this.lang) : (r.timeline?.in_ground ?? "");
    return rows.sort((a, b) => key(a).localeCompare(key(b)) || plantName(this.plantMap.get(a.planting.plant_id), this.lang)
      .localeCompare(plantName(this.plantMap.get(b.planting.plant_id), this.lang)));
  }

  render(): TemplateResult {
    const seasons = [this.season - 1, this.season, this.season + 1];
    const rows = this.visibleRows();
    let lastGroup = "";
    return html`
      <div class="top">
        <select style="width:auto" aria-label=${this.t("planner.season")} @change=${(e: Event) => { this.season = Number((e.target as HTMLSelectElement).value); void this.load();
          this.dispatchEvent(new CustomEvent("season-changed", { detail: this.season, bubbles: true, composed: true })); }}>
          ${seasons.map((s) => html`<option value=${s} ?selected=${s === this.season}>${this.t("common.season", { year: s })}</option>`)}
        </select>
        <input type="search" placeholder=${this.t("crops.search")} .value=${this.filter} @input=${(e: Event) => (this.filter = (e.target as HTMLInputElement).value)} />
        <span class="small">${this.t("crops.group")}:</span>
        ${(["bed", "plant", "date"] as const).map((g) => html`<button class="chip" aria-pressed=${String(this.group === g)} @click=${() => (this.group = g)}>${this.t(`crops.group.${g}`)}</button>`)}
        <span class="small muted">${this.t("planner.count", { n: rows.length })}</span>
      </div>
      <p class="small muted">${this.t("crops.intro")}</p>
      ${rows.length ? html`<div class="card wrap"><table>
        <thead><tr><th>${this.t("lib.plant")}</th><th>${this.t("task.bed")}</th><th>${this.t("crops.method")}</th><th>${this.t("crops.status")}</th>
          ${DATE_FIELDS.map((f) => html`<th>${this.t(`crops.field.${f}`)}</th>`)}<th>#</th></tr></thead>
        <tbody>${rows.map((r) => {
          const g = this.group === "bed" ? `${r.zone ?? "?"} · ${r.bed ?? this.t("crops.no_bed")}` : "";
          const header = g && g !== lastGroup ? html`<tr class="group"><td colspan=${5 + DATE_FIELDS.length}>${g}</td></tr>` : nothing;
          lastGroup = g || lastGroup;
          const p = r.planting;
          return html`${header}<tr class=${this.saving.has(p.id) ? "saving" : ""}>
            <td class="plant">${this.icon(r)}<button @click=${() => (this.open = r)}>${plantName(this.plantMap.get(p.plant_id), this.lang) || p.plant_id}</button>
              ${r.timeline?.late ? html`<ha-icon class="late" icon="mdi:clock-alert-outline" title=${this.t("crops.late")}></ha-icon>` : nothing}</td>
            <td>${r.bed ?? html`<span class="late">${this.t("crops.no_bed")}</span>`}</td>
            <td><select ?disabled=${!this.admin} @change=${(e: Event) => this.saveRow(r, { method: (e.target as HTMLSelectElement).value as SowMethod })}>
              ${METHODS.map((m) => html`<option value=${m} ?selected=${p.method === m}>${this.t(METHOD_LABEL[m])}</option>`)}</select></td>
            <td><select ?disabled=${!this.admin} @change=${(e: Event) => this.saveRow(r, { status: (e.target as HTMLSelectElement).value as PlantingStatus })}>
              ${STATUSES.map((s) => html`<option value=${s} ?selected=${p.status === s}>${this.t(`status.${s}`)}</option>`)}</select></td>
            ${DATE_FIELDS.map((f) => html`<td>${this.dateInput(r, f)}</td>`)}
            <td><input type="number" min="0" .value=${p.count == null ? "" : String(p.count)} placeholder="auto" ?disabled=${!this.admin}
              @change=${(e: Event) => this.saveRow(r, { count: (e.target as HTMLInputElement).value === "" ? null : Number((e.target as HTMLInputElement).value) })} /></td>
          </tr>`;
        })}</tbody></table></div>` : html`<p class="muted">${this.t("crops.none", { season: this.season })}</p>`}
      ${this.open ? this.renderDetail(this.open) : nothing}`;
  }

  /** Popup with everything about one crop. */
  private renderDetail(r: CropRow): TemplateResult {
    const p = r.planting;
    const plant = this.plantMap.get(p.plant_id);
    const tl = r.timeline;
    const close = () => (this.open = null);
    const line = (label: string, a?: string | null, b?: string | null) => (a ? html`<span>${label}</span><span>${formatDate(a, this.lang)}${b ? ` – ${formatDate(b, this.lang)}` : ""}</span>` : nothing);
    return html`<dialog @close=${close} style="max-width:640px">
      <div class="stack">
        ${plant ? html`<hl-plant-image .plant=${plant} color=${familyColor(this.families, plant.family)} lang=${this.lang} size="card" credit></hl-plant-image>` : nothing}
        <h2>${plantName(plant, this.lang)} <span class="small muted">${r.zone ?? ""} · ${r.bed ?? ""} · ${this.t("common.season", { year: p.season })}</span></h2>
        ${tl ? html`<div class="kv" style="display:grid;grid-template-columns:auto 1fr;gap:4px 12px;font-size:var(--hl-fs-sm)">
          ${line(this.t("crops.window.sow"), tl.sow_window?.start, tl.sow_window?.end)}
          ${line(this.t("crops.window.transplant"), tl.transplant_window?.start, tl.transplant_window?.end)}
          ${line(this.t("crops.in_ground"), tl.in_ground)}
          ${line(this.t("crops.harvest"), tl.harvest_start, tl.harvest_end)}
        </div>${tl.late ? html`<div class="finding warning"><ha-icon icon="mdi:clock-alert-outline"></ha-icon><span>${this.t("crops.late")}</span></div>` : nothing}` : nothing}
        <div class="form-grid">
          <label class="field">${this.t("crops.method")}<select ?disabled=${!this.admin} @change=${(e: Event) => this.saveRow(r, { method: (e.target as HTMLSelectElement).value as SowMethod })}>
            ${METHODS.map((m) => html`<option value=${m} ?selected=${p.method === m}>${this.t(METHOD_LABEL[m])}</option>`)}</select></label>
          <label class="field">${this.t("crops.status")}<select ?disabled=${!this.admin} @change=${(e: Event) => this.saveRow(r, { status: (e.target as HTMLSelectElement).value as PlantingStatus })}>
            ${STATUSES.map((s) => html`<option value=${s} ?selected=${p.status === s}>${this.t(`status.${s}`)}</option>`)}</select></label>
          ${DATE_FIELDS.map((f) => html`<label class="field">${this.t(`crops.field.${f}`)}${this.dateInput(r, f)}</label>`)}
          <label class="field">${this.t("crops.count")}<input type="number" min="0" .value=${p.count == null ? "" : String(p.count)} placeholder="auto" ?disabled=${!this.admin}
            @change=${(e: Event) => this.saveRow(r, { count: (e.target as HTMLInputElement).value === "" ? null : Number((e.target as HTMLInputElement).value) })} /></label>
          <label class="field full">${this.t("crops.notes")}<textarea .value=${p.notes ?? ""} ?disabled=${!this.admin}
            @change=${(e: Event) => this.saveRow(r, { notes: (e.target as HTMLTextAreaElement).value })}></textarea></label>
        </div>
        <p class="xs muted">${this.t("crops.detail_hint")}</p>
        <div class="row" style="justify-content:flex-end"><button class="btn" @click=${close}>${this.t("common.close")}</button></div>
      </div>
    </dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-crops-view": CropsView;
  }
}
