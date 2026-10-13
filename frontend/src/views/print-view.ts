/**
 * Print tab: choose a document, paper (incl. reMarkable Paper Pro) and colour
 * mode, preview the pages and download the PDF.
 */
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { PrintOptions, Snapshot } from "../types";
import "../components/info";

const DOCS: { id: PrintOptions["document"]; icon: string }[] = [
  { id: "garden", icon: "mdi:floor-plan" },
  { id: "zone", icon: "mdi:greenhouse" },
  { id: "beds", icon: "mdi:sprout-outline" },
  { id: "tasks", icon: "mdi:format-list-checks" },
  { id: "season", icon: "mdi:chart-gantt" },
  { id: "year", icon: "mdi:calendar-month" },
  { id: "blank", icon: "mdi:draw" },
  { id: "plants", icon: "mdi:card-text-outline" },
  { id: "book", icon: "mdi:book-open-page-variant-outline" },
];
const PAGES: PrintOptions["page"][] = ["remarkable", "a4", "a3", "a5", "letter"];
const STORAGE_KEY = "hortulus.print";

@customElement("hl-print-view")
export class PrintView extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property({ type: Boolean }) narrow = false;
  @property({ type: Boolean }) admin = true;

  @state() private opts: PrintOptions = {
    document: "garden", page: "remarkable", landscape: false, color_mode: "eink", days: 28, notes: true, grid: true, labels: true,
  };
  @state() private pages: string[] = [];
  @state() private busy = false;
  @state() private error = "";
  private timer?: number;

  static styles = [
    shared,
    css`
      .layout { display: grid; grid-template-columns: 340px 1fr; gap: var(--hl-s4); align-items: start; }
      .layout.narrow { grid-template-columns: 1fr; }
      .docs { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
      .doc { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px; border-radius: var(--hl-r-md); border: 1px solid var(--hl-border);
        background: var(--hl-surface); cursor: pointer; text-align: left; color: var(--hl-text); --mdc-icon-size: 20px; }
      .doc[aria-pressed="true"] { border-color: var(--hl-leaf-500); background: var(--hl-leaf-100); }
      .doc small { color: var(--hl-text-muted); font-size: var(--hl-fs-xs); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .full { grid-column: 1 / -1; }
      .check { flex-direction: row !important; align-items: center; gap: var(--hl-s2) !important; color: var(--hl-text) !important; }
      .preview { display: flex; flex-wrap: wrap; gap: var(--hl-s4); justify-content: center; padding: var(--hl-s4); background: var(--hl-surface-2);
        border-radius: var(--hl-r-lg); min-height: 400px; }
      .sheet { background: #fff; box-shadow: var(--hl-shadow-2); border-radius: 2px; width: min(520px, 100%); }
      .sheet svg { display: block; width: 100%; height: auto; }
      .sheet .num { text-align: center; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); padding: 4px; background: var(--hl-surface); }
      .rm { display: flex; gap: var(--hl-s2); align-items: flex-start; padding: var(--hl-s3); border-radius: var(--hl-r-md); background: var(--hl-frost-100); font-size: var(--hl-fs-sm); }
    `,
  ];

  connectedCallback(): void {
    super.connectedCallback();
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
      if (saved) this.opts = { ...this.opts, ...saved };
    } catch {
      /* private mode */
    }
  }

  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("api") && this.api && !this.pages.length) this.schedule(0);
  }

  private set<K extends keyof PrintOptions>(key: K, value: PrintOptions[K]): void {
    this.opts = { ...this.opts, [key]: value };
    if (key === "page" && value === "remarkable" && this.opts.color_mode === "color") this.opts = { ...this.opts, color_mode: "eink" };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...this.opts, bed_ids: null, zone_id: null, title: null }));
    } catch {
      /* ignore */
    }
    this.schedule();
  }

  private schedule(delay = 350): void {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.preview(), delay);
  }

  private async preview(): Promise<void> {
    this.busy = true;
    this.error = "";
    try {
      this.pages = (await this.api.printPreview(this.payload())).pages;
    } catch (err) {
      this.error = (err as Error).message ?? String(err);
    } finally {
      this.busy = false;
    }
  }

  private payload(): Partial<PrintOptions> {
    const o = { ...this.opts };
    if (o.document !== "zone") delete o.zone_id;
    if (o.document !== "beds") delete o.bed_ids;
    if (!o.title) delete o.title;
    return o;
  }

  private async download(): Promise<void> {
    this.busy = true;
    try {
      const { blob, filename } = await this.api.printPdf(this.payload());
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    } finally {
      this.busy = false;
    }
  }

  private async saveToConfig(): Promise<void> {
    try {
      await this.api.exportPdfToConfig(this.payload());
      this.toast(this.t("print.saved_to_config"));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    }
  }

  private toast(message: string): void {
    this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message }, bubbles: true, composed: true }));
  }

  private renderForm(): TemplateResult {
    const o = this.opts;
    const season = this.snapshot.analysis?.season ?? new Date().getFullYear();
    const enclosed = this.snapshot.zones;
    return html`<section class="card stack" aria-label=${this.t("print.options")}>
      <h2>${this.t("print.document")}</h2>
      <div class="docs" role="group">
        ${DOCS.map((d) => html`<button class="doc" aria-pressed=${String(o.document === d.id)} @click=${() => this.set("document", d.id)}>
          <ha-icon icon=${d.icon}></ha-icon><b>${this.t(`print.doc.${d.id}`)}</b><small>${this.t(`print.doc.${d.id}.hint`)}</small></button>`)}
      </div>
      <div class="form-grid">
        <label class="field">${this.t("print.page")}
          <select @change=${(e: Event) => this.set("page", (e.target as HTMLSelectElement).value as PrintOptions["page"])}>
            ${PAGES.map((p) => html`<option value=${p} ?selected=${o.page === p}>${this.t(`print.page.${p}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("print.orientation")}
          <select @change=${(e: Event) => this.set("landscape", (e.target as HTMLSelectElement).value === "landscape")}>
            <option value="portrait" ?selected=${!o.landscape}>${this.t("print.portrait")}</option>
            <option value="landscape" ?selected=${o.landscape}>${this.t("print.landscape")}</option>
          </select></label>
        <label class="field">${this.t("print.colors")}
          <select @change=${(e: Event) => this.set("color_mode", (e.target as HTMLSelectElement).value as PrintOptions["color_mode"])}>
            ${(["color", "eink", "grayscale"] as const).map((m) => html`<option value=${m} ?selected=${o.color_mode === m}>${this.t(`print.color.${m}`)}</option>`)}
          </select></label>
        <label class="field">${this.t("planner.season")}
          <select @change=${(e: Event) => this.set("season", Number((e.target as HTMLSelectElement).value))}>
            ${[season - 1, season, season + 1].map((s) => html`<option value=${s} ?selected=${(o.season ?? season) === s}>${s}</option>`)}
          </select></label>
        ${o.document === "zone" || o.document === "blank" ? html`<label class="field full">${this.t("planner.zone")}
          <select @change=${(e: Event) => this.set("zone_id", (e.target as HTMLSelectElement).value || null)}>
            <option value="">${this.t(o.document === "zone" ? "print.all_greenhouses" : "print.all_zones")}</option>
            ${enclosed.map((z) => html`<option value=${z.id} ?selected=${o.zone_id === z.id}>${z.name}</option>`)}
          </select></label>` : nothing}
        ${o.document === "beds" ? html`<fieldset class="full" style="border:0;padding:0;margin:0">
          <legend class="small muted">${this.t("print.beds")}</legend>
          <div class="row wrap">${this.snapshot.beds.map((b) => {
            const on = !o.bed_ids || o.bed_ids.includes(b.id);
            return html`<button class="chip" aria-pressed=${String(on)} @click=${() => {
              const all = this.snapshot.beds.map((x) => x.id);
              const cur = o.bed_ids ?? all;
              const next = on ? cur.filter((x) => x !== b.id) : [...cur, b.id];
              this.set("bed_ids", next.length === all.length ? null : next);
            }}>${b.name}</button>`;
          })}</div></fieldset>` : nothing}
        ${o.document === "tasks" ? html`<label class="field">${this.t("print.days")}<input type="number" min="1" max="120" .value=${String(o.days)}
          @change=${(e: Event) => this.set("days", Number((e.target as HTMLInputElement).value))} /></label>` : nothing}
        <label class="field full">${this.t("print.title")}<input .value=${o.title ?? ""} placeholder=${this.t(`print.doc.${o.document}`)}
          @change=${(e: Event) => this.set("title", (e.target as HTMLInputElement).value || null)} /></label>
        <label class="field check"><input type="checkbox" .checked=${o.notes} @change=${(e: Event) => this.set("notes", (e.target as HTMLInputElement).checked)} />${this.t("print.notes")}</label>
        <label class="field check"><input type="checkbox" .checked=${o.grid} @change=${(e: Event) => this.set("grid", (e.target as HTMLInputElement).checked)} />${this.t("print.grid")}</label>
        <label class="field check full"><input type="checkbox" .checked=${o.labels} @change=${(e: Event) => this.set("labels", (e.target as HTMLInputElement).checked)} />${this.t("print.labels")}</label>
      </div>
      ${o.page === "remarkable" ? html`<div class="rm"><ha-icon icon="mdi:tablet"></ha-icon><span>${this.t("print.remarkable_hint")}</span></div>` : nothing}
      ${o.document === "book" ? html`<div class="rm"><ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon><span>${this.t("print.book_tip")}</span></div>` : nothing}
      <div class="row wrap">
        <button class="btn primary" ?disabled=${this.busy} @click=${() => this.download()}><ha-icon icon="mdi:file-pdf-box"></ha-icon>${this.t("print.download")}</button>
        <button class="btn" ?disabled=${this.busy} @click=${() => this.preview()}><ha-icon icon="mdi:refresh"></ha-icon>${this.t("print.refresh")}</button>
        ${this.admin ? html`<button class="btn ghost" @click=${() => this.saveToConfig()}><ha-icon icon="mdi:folder-download-outline"></ha-icon>${this.t("print.save_config")}</button>` : nothing}
      </div>
    </section>`;
  }

  render(): TemplateResult {
    return html`<div class="layout ${this.narrow ? "narrow" : ""}">
      ${this.renderForm()}
      <section class="preview" aria-label=${this.t("print.preview")} aria-busy=${String(this.busy)}>
        ${this.error ? html`<p class="small" style="color:var(--hl-danger)">${this.error}</p>` : nothing}
        ${this.pages.length ? this.pages.map((svg, i) => html`<figure class="sheet" style="margin:0">${unsafeHTML(svg)}
            <figcaption class="num">${this.t("print.page_n", { n: i + 1, total: this.pages.length })}</figcaption></figure>`)
          : html`<p class="muted">${this.busy ? this.t("common.loading") : this.t("print.empty")}</p>`}
      </section>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-print-view": PrintView;
  }
}
