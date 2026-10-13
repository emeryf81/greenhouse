// End of season report: what was grown, harvested and lost, and what the journal said.
// Shown in the journal and offered in the year-end transition; downloadable as Markdown.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant, Snapshot } from "../types";
import { download, familyColor, formatDate, plantName } from "../util/garden";

interface ReportCrop {
  plant_id: string; plantings: number; area_m2: number; failed: number; expected_kg: number;
  kg?: number; kg_m2?: number | null; book_kg_m2: number | null; first?: string | null; last?: string | null;
  verdict: "failed" | "no_record" | "above" | "below" | "as_expected" | "ok" | "growing";
}
export interface SeasonReport {
  season: number;
  running?: boolean;
  crops: ReportCrop[];
  failed: { planting_id: string; plant_id: string; bed_id: string; notes: string }[];
  problems: { at: string; text: string; plant_id: string | null; bed_id: string | null }[];
  milestones: { at: string; text: string }[];
  totals: { crops: number; plantings: number; kg: number; expected_kg: number; failed: number; water_l: number; water_runs: number; journal: number };
}

@customElement("hl-season-report")
export class SeasonReportView extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property({ attribute: false }) plants = new Map<string, Plant>();
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property() lang = "en";
  @property({ type: Number }) season = 0;
  @property({ type: Boolean }) pick = true;
  @state() private report: SeasonReport | null = null;
  @state() private error = "";
  @state() private bookBusy = false;
  private loadedFor = 0;

  static styles = [
    shared,
    css`
      :host { display: block; }
      .tiles { display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: var(--hl-s2); }
      .tile { padding: 10px; border-radius: var(--hl-r-md); background: var(--hl-surface-2); font-size: var(--hl-fs-sm); }
      .tile b { display: block; font-size: var(--hl-fs-xl); }
      table { width: 100%; border-collapse: collapse; font-size: var(--hl-fs-sm); }
      th, td { text-align: left; padding: 5px 6px; border-bottom: 1px solid var(--hl-border); }
      .plant { display: inline-flex; gap: 6px; align-items: center; }
      ul { margin: 4px 0 0; padding-left: 1.2em; font-size: var(--hl-fs-sm); }
    `,
  ];

  protected willUpdate(): void {
    if (!this.season && this.snapshot) this.season = (this.snapshot.analysis?.season ?? new Date().getFullYear());
    if (this.season && this.api && this.season !== this.loadedFor) {
      this.loadedFor = this.season;
      this.report = null;
      this.error = "";
      this.api.seasonReport(this.season).then((r) => (this.report = r as SeasonReport)).catch((err) => (this.error = (err as Error).message));
    }
  }

  /** The whole season as a printable book (A5 PDF). */
  private async book(): Promise<void> {
    this.bookBusy = true;
    try {
      const { blob, filename } = await this.api.printPdf({ document: "book", page: "a5", season: this.season });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 2000);
    } catch (err) {
      // a failed download must not replace the report that is on screen
      this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message: this.t("common.error", { message: (err as Error).message }) }, bubbles: true, composed: true }));
    } finally {
      this.bookBusy = false;
    }
  }

  private name(id: string): string {
    return plantName(this.plants.get(id), this.lang) || id;
  }

  private bed(id: string): string {
    for (const layout of [{ beds: this.snapshot.beds }, ...Object.values(this.snapshot.layouts ?? {})]) {
      const b = layout.beds.find((x) => x.id === id);
      if (b) return b.name;
    }
    return id;
  }

  private markdown(r: SeasonReport): string {
    const t = this.t;
    const lines = [`# ${t("report.title", { season: r.season })}`, "",
      `- ${t("report.crops")}: ${r.totals.crops} (${r.totals.plantings} ${t("report.plantings")})`,
      `- ${t("report.harvest")}: ${r.totals.kg} kg (${t("report.expected")} ${r.totals.expected_kg} kg)`,
      `- ${t("report.failed")}: ${r.totals.failed}`,
      `- ${t("report.water")}: ${r.totals.water_l} L (${r.totals.water_runs} ${t("report.runs")})`, "",
      `## ${t("report.per_crop")}`, "", `| ${t("lib.plant")} | m² | kg | ${t("report.expected")} | |`, "|---|---|---|---|---|",
      ...r.crops.map((c) => `| ${this.name(c.plant_id)} | ${c.area_m2} | ${c.kg ?? "–"} | ${c.expected_kg || "–"} | ${t(`report.verdict.${c.verdict}`)} |`)];
    if (r.failed.length) lines.push("", `## ${t("report.failed")}`, "", ...r.failed.map((f) => `- ${this.name(f.plant_id)} (${this.bed(f.bed_id)})${f.notes ? `: ${f.notes}` : ""}`));
    if (r.problems.length) lines.push("", `## ${t("report.problems")}`, "", ...r.problems.map((p) => `- ${p.at.slice(0, 10)}: ${p.text}`));
    if (r.milestones.length) lines.push("", `## ${t("report.milestones")}`, "", ...r.milestones.map((p) => `- ${p.at.slice(0, 10)}: ${p.text}`));
    return lines.join("\n") + "\n";
  }

  render(): TemplateResult {
    const r = this.report;
    const current = this.snapshot.analysis?.season ?? new Date().getFullYear();
    // the last four seasons plus every archived one
    const seasons = [...new Set([...Array.from({ length: 4 }, (_, i) => current - i), ...(this.snapshot.archived_seasons ?? [])])].sort((a, b) => b - a);
    return html`<div class="stack">
      <div class="row wrap">
        ${this.pick ? html`<select style="width:auto" aria-label=${this.t("planner.season")} @change=${(e: Event) => (this.season = Number((e.target as HTMLSelectElement).value))}>
          ${seasons.map((s) => html`<option value=${s} ?selected=${s === this.season}>${this.t("common.season", { year: s })}</option>`)}</select>` : nothing}
        <span class="spacer"></span>
        <button class="btn small ghost" ?disabled=${this.bookBusy} @click=${() => this.book()} title=${this.t("report.book_hint")}>
          <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.bookBusy ? this.t("common.loading") : this.t("report.book")}</button>
        ${r ? html`<button class="btn small ghost" @click=${() => download(`hortulus-${r.season}.md`, this.markdown(r), "text/markdown")}>
          <ha-icon icon="mdi:download"></ha-icon>${this.t("report.download")}</button>` : nothing}
      </div>
      ${this.error ? html`<p class="small">${this.error}</p>` : !r ? html`<p class="muted">${this.t("common.loading")}</p>` : html`
        ${r.running ? html`<p class="small muted">${this.t("report.running")}</p>` : nothing}
        <div class="tiles">
          <div class="tile">${this.t("report.crops")}<b>${r.totals.crops}</b></div>
          <div class="tile">${this.t("report.harvest")}<b>${r.totals.kg} kg</b><span class="xs muted">${this.t("report.expected")} ${r.totals.expected_kg} kg</span></div>
          <div class="tile">${this.t("report.failed")}<b>${r.totals.failed}</b></div>
          <div class="tile">${this.t("report.water")}<b>${r.totals.water_l} L</b><span class="xs muted">${r.totals.water_runs} ${this.t("report.runs")}</span></div>
          <div class="tile">${this.t("report.notes")}<b>${r.totals.journal}</b></div>
        </div>
        ${r.crops.length ? html`<h3>${this.t("report.per_crop")}</h3><table>
          <thead><tr><th>${this.t("lib.plant")}</th><th>m²</th><th>kg</th><th>${this.t("report.expected")}</th><th></th></tr></thead>
          <tbody>${r.crops.map((c) => {
            const p = this.plants.get(c.plant_id);
            return html`<tr><td><span class="plant">${p ? glyphIcon(glyphFor(p), p.color || familyColor(this.families, p.family), 18) : nothing}${this.name(c.plant_id)}</span></td>
              <td>${c.area_m2}</td><td>${c.kg ?? "–"}</td><td>${c.expected_kg || "–"}</td>
              <td><span class="chip ${c.verdict === "above" ? "ok" : c.verdict === "failed" || c.verdict === "below" ? "bad" : ""}">${this.t(`report.verdict.${c.verdict}`)}</span></td></tr>`;
          })}</tbody></table>` : html`<p class="muted">${this.t("report.empty")}</p>`}
        ${r.failed.length ? html`<h3>${this.t("report.failed")}</h3><ul>${r.failed.map((f) => html`<li>${this.name(f.plant_id)} (${this.bed(f.bed_id)})${f.notes ? ` – ${f.notes}` : ""}</li>`)}</ul>` : nothing}
        ${r.problems.length ? html`<h3>${this.t("report.problems")}</h3><ul>${r.problems.map((p) => html`<li>${formatDate(p.at.slice(0, 10), this.lang)}: ${p.text}</li>`)}</ul>` : nothing}
        ${r.milestones.length ? html`<h3>${this.t("report.milestones")}</h3><ul>${r.milestones.map((p) => html`<li>${formatDate(p.at.slice(0, 10), this.lang)}: ${p.text}</li>`)}</ul>` : nothing}
        <p class="xs muted">${this.t("report.hint")}</p>`}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-season-report": SeasonReportView;
  }
}
