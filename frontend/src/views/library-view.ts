import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant, Snapshot, Window } from "../types";
import { familyColor, plantName, familyName } from "../util/garden";
import "../components/info";
import "../components/plant-image";
import "../components/modal";
import { plantCalendarStyles, renderPlantCalendar } from "../components/plant-detail";

type Filter = "" | "greenhouse" | "quick" | "custom";

const BLANK: Plant = {
  id: "", names: { en: "", nl: "" }, scientific_name: "", family: "Asteraceae", variety: null, habit: "bush", perennial: false,
  spacing_cm: 30, row_spacing_cm: 30, sowing_depth_cm: 1, germination_days: [7, 14], min_soil_temp_c: 8, optimal_soil_temp_c: 18,
  max_soil_temp_c: null, days_to_maturity: [60, 80], maturity_from: "sow", harvest_duration_days: 14, harvestable: true, continuous_harvest: false,
  harvest_interval_days: null, transplant_age_days: [35, 49], sowing: { indoor_sow: [], direct_sow: [{ start_week: -2, end_week: 8, anchor: "last_frost" }], transplant: [] },
  greenhouse: { suitability: "conditional", min_night_c: 5, max_day_c: 30, season_extension_weeks: 2, notes: {} },
  frost_tolerance: "half_hardy", min_temp_c: 0, max_temp_c: 30, companions: [], rotation_years: 3, pests: [], diseases: [],
  water_needs: "medium", nutrient_needs: "medium", feeding_interval_days: null, care: [], pruning_notes: {}, thinning: false,
  succession_interval_days: null, gdd_base_c: 10, gdd_to_maturity: null, tags: [], source: "custom",
};

@customElement("hl-library-view")
export class LibraryView extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) plants: Plant[] = [];
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property({ type: Boolean }) admin = true;
  @state() private query = "";
  @state() private family = "";
  @state() private category = "";
  @state() private filter: Filter = "";
  @state() private selected: Plant | null = null;
  @state() private editing: { plant: Plant; mode: "custom" | "override" } | null = null;
  @state() private error = "";

  static styles = [
    shared,
    plantCalendarStyles,
    css`
      .top { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: center; margin-bottom: var(--hl-s3); }
      .top input[type="search"] { max-width: 360px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--hl-s3); }
      .pcard { text-align: left; border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); background: var(--hl-surface); padding: 0; cursor: pointer;
        overflow: hidden; display: flex; flex-direction: column; color: var(--hl-text); transition: box-shadow var(--hl-dur) var(--hl-ease), transform var(--hl-dur) var(--hl-ease); }
      .pcard:hover { box-shadow: var(--hl-shadow-2); transform: translateY(-1px); }
      .pcard .stripe { height: 6px; }
      .pcard hl-plant-image { border-radius: 0; }
      .pcard .inner { padding: var(--hl-s3) var(--hl-s4); display: flex; flex-direction: column; gap: var(--hl-s2); }
      .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      .facts b { display: block; color: var(--hl-text); font-size: var(--hl-fs-sm); }
      .kv { display: grid; grid-template-columns: 1fr 1fr; gap: 6px var(--hl-s4); font-size: var(--hl-fs-sm); }
      .kv span:nth-child(odd) { color: var(--hl-text-muted); }
      .rel { display: flex; gap: var(--hl-s2); align-items: flex-start; font-size: var(--hl-fs-sm); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      fieldset { border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s3); margin: 0; }
      legend { font-weight: 600; font-size: var(--hl-fs-sm); padding: 0 4px; }
      .legend-row { display: flex; gap: var(--hl-s3); font-size: var(--hl-fs-xs); color: var(--hl-text-muted); flex-wrap: wrap; }
      .legend-row span::before { content: ""; display: inline-block; width: 14px; height: 5px; border-radius: 3px; margin-right: 4px; vertical-align: middle; background: var(--c); }
    `,
  ];

  private filtered(): Plant[] {
    const q = this.query.trim().toLowerCase();
    return this.plants
      .filter((p) => !this.family || p.family === this.family)
      .filter((p) => !this.category || (p.category ?? "vegetable") === this.category)
      .filter((p) => this.filter !== "greenhouse" || p.greenhouse.suitability === "yes")
      .filter((p) => this.filter !== "quick" || p.days_to_maturity[0] <= 50)
      .filter((p) => this.filter !== "custom" || p.source !== "builtin")
      .filter((p) => !q || [p.id, p.scientific_name, p.family, familyName(this.families, p.family, this.lang) ?? "", ...Object.values(p.names)].some((s) => s.toLowerCase().includes(q)))
      .sort((a, b) => plantName(a, this.lang).localeCompare(plantName(b, this.lang)));
  }

  render(): TemplateResult {
    const families = [...new Set(this.plants.map((p) => p.family))].sort();
    return html`
      <div class="top">
        <input type="search" placeholder=${this.t("lib.search")} aria-label=${this.t("lib.search")} .value=${this.query}
          @input=${(e: Event) => (this.query = (e.target as HTMLInputElement).value)} />
        <label class="row small"><span class="visually-hidden">${this.t("lib.family")}</span>
          <select style="width:auto" @change=${(e: Event) => (this.family = (e.target as HTMLSelectElement).value)}>
            ${["", ...families].map((f) => html`<option value=${f} ?selected=${f === this.family}>${f ? (familyName(this.families, f, this.lang) ?? f) : `${this.t("lib.family")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <label class="row small"><span class="visually-hidden">${this.t("lib.category")}</span>
          <select style="width:auto" @change=${(e: Event) => (this.category = (e.target as HTMLSelectElement).value)}>
            ${["", "vegetable", "herb", "fruit", "flower"].map((c) => html`<option value=${c} ?selected=${c === this.category}>${c ? this.t(`category.${c}`) : `${this.t("lib.category")}: ${this.t("common.all")}`}</option>`)}
          </select>
        </label>
        <span class="small muted">${this.t("lib.count", { n: this.filtered().length })}</span>
        ${(["greenhouse", "quick", "custom"] as Filter[]).map((f) => html`
          <button class="chip" aria-pressed=${String(this.filter === f)} @click=${() => (this.filter = this.filter === f ? "" : f)}>${this.t(`lib.filter_${f}`)}</button>`)}
        <span class="spacer"></span>
        ${this.admin ? html`<button class="btn primary small" @click=${() => (this.editing = { plant: structuredClone(BLANK), mode: "custom" })}>
          <ha-icon icon="mdi:plus"></ha-icon>${this.t("lib.add_custom")}</button>` : nothing}
      </div>
      <div class="legend-row" aria-hidden="true">
        <span style="--c:var(--hl-leaf-300)">${this.t("lib.indoor_sow")}</span><span style="--c:var(--hl-leaf-500)">${this.t("lib.direct_sow")}</span>
        <span style="--c:var(--hl-leaf-700)">${this.t("lib.transplant")}</span><span style="--c:var(--hl-sun-500)">${this.t("lib.harvest")}</span>
      </div>
      <div class="grid" style="margin-top:12px">
        ${this.filtered().map((p) => html`
          <button class="pcard" @click=${() => (this.selected = p)} aria-label=${plantName(p, this.lang)}>
            <div class="stripe" style=${`background:${familyColor(this.families, p.family)}`}></div>
            <hl-plant-image .plant=${p} color=${familyColor(this.families, p.family)} lang=${this.lang} size="card"></hl-plant-image>
            <div class="inner">
              <div class="row"><h3>${plantName(p, this.lang)}</h3><span class="spacer"></span>
                ${p.source !== "builtin" ? html`<span class="chip warn">${this.t(`lib.source.${p.source}`)}</span>` : nothing}</div>
              <span class="xs muted"><i>${p.scientific_name}</i>${p.variety ? ` · ${p.variety}` : ""}</span>
              <div class="facts">
                <span><b>${p.spacing_cm} cm</b>${this.t("lib.spacing")}</span>
                <span><b>${p.days_to_maturity[0]}–${p.days_to_maturity[1]}</b>${this.t("lib.maturity")}</span>
                <span><b>${this.t(`level.${p.water_needs}`)}</b>${this.t("lib.water")}</span>
              </div>
              ${renderPlantCalendar(p, this.snapshot, this.lang, this.t)}
            </div>
          </button>`)}
      </div>
      ${this.selected ? this.renderDetail(this.selected) : nothing}
      ${this.editing ? this.renderEditor() : nothing}
    `;
  }

  private renderDetail(p: Plant): TemplateResult {
    const list = this.filtered();
    const i = list.findIndex((x) => x.id === p.id);
    return html`
      <hl-modal heading=${plantName(p, this.lang)} accent=${familyColor(this.families, p.family)} nav ?has-prev=${i > 0} ?has-next=${i >= 0 && i < list.length - 1}
        closeLabel=${this.t("common.close")} prevLabel=${this.t("common.previous")} nextLabel=${this.t("common.next")}
        @prev=${() => (this.selected = list[i - 1])} @next=${() => (this.selected = list[i + 1])}
        @closed=${() => (this.selected = null)} @select-plant=${(e: CustomEvent<Plant>) => this.showPlant(e.detail)}>
        <span slot="subheading" class="small muted"><i>${p.scientific_name}</i> · ${familyName(this.families, p.family, this.lang) ?? p.family}</span>
        <hl-plant-detail .plant=${p} .plants=${this.plants} .families=${this.families} .snapshot=${this.snapshot} .t=${this.t} lang=${this.lang}></hl-plant-detail>
        ${this.admin ? html`<div slot="actions" class="row">
          <button class="btn" @click=${() => (this.editing = { plant: structuredClone(p), mode: p.source === "custom" ? "custom" : "override" })}>
            <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
          ${p.source !== "builtin" ? html`<button class="btn danger" @click=${() => this.removePlant(p)}>${p.source === "override" ? this.t("lib.reset") : this.t("common.delete")}</button>` : nothing}
        </div>` : nothing}
      </hl-modal>`;
  }

  private showPlant(plant: Plant): void {
    this.selected = plant;
    void this.updateComplete.then(() => this.renderRoot.querySelector("hl-modal")?.toTop());
  }

  private async removePlant(p: Plant): Promise<void> {
    try {
      await this.api.deletePlant(p.id);
      this.selected = null;
      this.dispatchEvent(new CustomEvent("plants-changed", { bubbles: true, composed: true }));
    } catch (err) {
      this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message: (err as Error).message }, bubbles: true, composed: true }));
    }
  }

  private async save(ev: Event): Promise<void> {
    ev.preventDefault();
    const { plant: original, mode } = this.editing!;
    const f = ev.target as HTMLFormElement;
    const v = (n: string) => (f.elements.namedItem(n) as HTMLInputElement).value;
    const num = (n: string) => Number(v(n));
    // The form edits the first window of each calendar; further windows (garlic in autumn and
    // spring, lettuce in several sowings) and each window's anchor stay as they were.
    const win = (prefix: string, existing: Window[]): Window[] => {
      if (!(f.elements.namedItem(`${prefix}_on`) as HTMLInputElement).checked) return [];
      const first = existing[0];
      const start = num(`${prefix}_start`);
      const end = num(`${prefix}_end`);
      if (first && first.start_week === start && first.end_week === end) return existing;
      return [{ ...(first ?? { anchor: "last_frost" }), start_week: start, end_week: end } as Window, ...existing.slice(1)];
    };
    const nameEn = v("name_en").trim();
    const plant: Plant = {
      ...original,
      id: mode === "custom" && !original.id ? nameEn.toLowerCase().normalize("NFKD").replace(/[^\w]+/g, "_").replace(/^_|_$/g, "") || "plant" : original.id,
      names: { ...original.names, en: nameEn, nl: v("name_nl").trim() || nameEn },
      scientific_name: v("scientific"), variety: v("variety") || null, family: v("family"), habit: v("habit"),
      spacing_cm: num("spacing"), row_spacing_cm: num("row_spacing"), sowing_depth_cm: num("depth"),
      germination_days: [num("germ_min"), num("germ_max")], min_soil_temp_c: num("soil_temp"),
      days_to_maturity: [num("dtm_min"), num("dtm_max")], maturity_from: v("maturity_from") as Plant["maturity_from"],
      frost_tolerance: v("frost") as Plant["frost_tolerance"], min_temp_c: num("min_temp"), max_temp_c: num("max_temp"),
      water_needs: v("water") as Plant["water_needs"], nutrient_needs: v("nutrients") as Plant["nutrient_needs"],
      rotation_years: num("rotation"),
      greenhouse: { ...original.greenhouse, suitability: v("gh") as Plant["greenhouse"]["suitability"] },
      sowing: {
        ...original.sowing,
        indoor_sow: win("indoor", original.sowing.indoor_sow ?? []),
        direct_sow: win("direct", original.sowing.direct_sow ?? []),
        transplant: win("transplant", original.sowing.transplant ?? []),
      },
      pests: v("pests").split(",").map((s) => s.trim().replace(/\s+/g, "_")).filter(Boolean),
      diseases: v("diseases").split(",").map((s) => s.trim().replace(/\s+/g, "_")).filter(Boolean),
    };
    let payload: Partial<Plant> & { id: string } = plant;
    if (mode === "override") {
      // Only send what changed - the rest keeps following the built-in data.
      payload = { id: plant.id };
      for (const key of Object.keys(plant) as (keyof Plant)[]) {
        if (key !== "source" && JSON.stringify(plant[key]) !== JSON.stringify(original[key])) (payload as Record<string, unknown>)[key] = plant[key];
      }
    }
    try {
      const res = await this.api.savePlant(payload, mode);
      this.editing = null;
      this.selected = res.plant;
      this.error = "";
      this.dispatchEvent(new CustomEvent("plants-changed", { bubbles: true, composed: true }));
      this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message: this.t("lib.saved", { plant: plantName(res.plant, this.lang) }) }, bubbles: true, composed: true }));
    } catch (err) {
      this.error = (err as Error).message ?? String(err);
    }
  }

  protected updated(): void {
    const dialog = this.renderRoot.querySelector("dialog");
    if (dialog && !dialog.open) dialog.showModal();
  }

  private renderEditor(): TemplateResult {
    const { plant: p, mode } = this.editing!;
    const sel = (name: string, value: string, options: string[], prefix: string) => html`
      <select name=${name}>${options.map((o) => html`<option value=${o} ?selected=${o === value}>${prefix ? this.t(`${prefix}.${o}`) : (familyName(this.families, o, this.lang) ?? o)}</option>`)}</select>`;
    const win = (prefix: string, label: string, w: Window | undefined) => html`
      <label class="row small"><input type="checkbox" name=${`${prefix}_on`} ?checked=${!!w} />${label}</label>
      <label class="field">${this.t("lib.from")} (${this.t("lib.weeks")})<input name=${`${prefix}_start`} type="number" min="-30" max="30" .value=${String(w?.start_week ?? -4)} /></label>
      <label class="field">${this.t("lib.to")} (${this.t("lib.weeks")})<input name=${`${prefix}_end`} type="number" min="-30" max="40" .value=${String(w?.end_week ?? 2)} /></label>`;
    return html`<dialog @close=${() => (this.editing = null)} style="border:none;border-radius:16px;padding:0;width:min(640px,calc(100vw - 32px));background:var(--hl-surface);color:var(--hl-text)">
      <form class="stack" style="padding:24px;max-height:85vh;overflow:auto" @submit=${this.save}>
        <h2>${mode === "custom" && !p.id ? this.t("lib.add_custom") : `${this.t("lib.customize")}: ${plantName(p, this.lang)}`}</h2>
        <div class="form-grid">
          <label class="field">${this.t("lib.name_en")}<input name="name_en" required .value=${p.names.en ?? ""} /></label>
          <label class="field">${this.t("lib.name_nl")}<input name="name_nl" .value=${p.names.nl ?? ""} /></label>
          <label class="field">${this.t("lib.scientific")}<input name="scientific" .value=${p.scientific_name} /></label>
          <label class="field">${this.t("lib.variety")}<input name="variety" .value=${p.variety ?? ""} /></label>
          <label class="field">${this.t("lib.family")}${sel("family", p.family, Object.keys(this.families), "")}</label>
          <label class="field">${this.t("lib.habit")}${sel("habit", p.habit, ["bush", "vine", "climbing", "upright", "rosette", "root", "bulb"], "habit")}</label>
          <label class="field">${this.t("lib.spacing")} (cm)<input name="spacing" type="number" min="1" step="1" .value=${String(p.spacing_cm)} /></label>
          <label class="field">${this.t("lib.row_spacing")} (cm)<input name="row_spacing" type="number" min="1" .value=${String(p.row_spacing_cm)} /></label>
          <label class="field">${this.t("lib.depth")} (cm)<input name="depth" type="number" min="0" step="0.5" .value=${String(p.sowing_depth_cm)} /></label>
          <label class="field">${this.t("lib.soil_temp")} (°C)<input name="soil_temp" type="number" step="1" .value=${String(p.min_soil_temp_c)} /></label>
          <label class="field">${this.t("lib.germination")} min<input name="germ_min" type="number" min="1" .value=${String(p.germination_days[0])} /></label>
          <label class="field">${this.t("lib.germination")} max<input name="germ_max" type="number" min="1" .value=${String(p.germination_days[1])} /></label>
          <label class="field">${this.t("lib.maturity")} min<input name="dtm_min" type="number" min="1" .value=${String(p.days_to_maturity[0])} /></label>
          <label class="field">${this.t("lib.maturity")} max<input name="dtm_max" type="number" min="1" .value=${String(p.days_to_maturity[1])} /></label>
          <label class="field">${this.t("planner.method")}<select name="maturity_from">
            <option value="sow" ?selected=${p.maturity_from === "sow"}>${this.t("lib.direct_sow")}</option>
            <option value="transplant" ?selected=${p.maturity_from === "transplant"}>${this.t("lib.transplant")}</option></select></label>
          <label class="field">${this.t("lib.frost")}${sel("frost", p.frost_tolerance, ["tender", "half_hardy", "hardy", "very_hardy"], "frost")}</label>
          <label class="field">${this.t("lib.min_temp")} (°C)<input name="min_temp" type="number" step="0.5" .value=${String(p.min_temp_c)} /></label>
          <label class="field">Max (°C)<input name="max_temp" type="number" step="0.5" .value=${String(p.max_temp_c)} /></label>
          <label class="field">${this.t("lib.water")}${sel("water", p.water_needs, ["low", "medium", "high"], "level")}</label>
          <label class="field">${this.t("lib.nutrients")}${sel("nutrients", p.nutrient_needs, ["low", "medium", "high"], "level")}</label>
          <label class="field">${this.t("lib.greenhouse")}${sel("gh", p.greenhouse.suitability, ["yes", "conditional", "no"], "suit")}</label>
          <label class="field">${this.t("lib.rotation")}<input name="rotation" type="number" min="1" max="8" .value=${String(p.rotation_years)} /></label>
        </div>
        <fieldset><legend>${this.t("lib.calendar")}</legend>
          <p class="xs muted">${this.t("lib.windows_hint")}</p>
          <div class="form-grid" style="grid-template-columns: 1.2fr 1fr 1fr; align-items:end">
            ${win("indoor", this.t("lib.indoor_sow"), p.sowing.indoor_sow[0])}
            ${win("direct", this.t("lib.direct_sow"), p.sowing.direct_sow[0])}
            ${win("transplant", this.t("lib.transplant"), p.sowing.transplant[0])}
          </div>
        </fieldset>
        <label class="field">${this.t("lib.pests")}<input name="pests" .value=${p.pests.join(", ")} /></label>
        <label class="field">${this.t("lib.diseases")}<input name="diseases" .value=${p.diseases.join(", ")} /></label>
        ${this.error ? html`<p class="field-error" role="alert">${this.error}</p>` : nothing}
        <div class="row" style="justify-content:flex-end">
          <button type="button" class="btn ghost" @click=${() => (this.editing = null)}>${this.t("common.cancel")}</button>
          <button class="btn primary" type="submit">${this.t("common.save")}</button>
        </div>
      </form>
    </dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-library-view": LibraryView;
  }
}
