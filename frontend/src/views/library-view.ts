import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import { tagLabel, type Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant, Snapshot, Window } from "../types";
import { addDays, daysBetween, familyColor, formatDate, plantName, windowDates } from "../util/garden";
import "../components/info";
import "../components/plant-image";

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
    css`
      .top { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: center; margin-bottom: var(--hl-s3); }
      .top input[type="search"] { max-width: 360px; }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--hl-s3); }
      .pcard { text-align: left; border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); background: var(--hl-surface); padding: 0; cursor: pointer;
        overflow: hidden; display: flex; flex-direction: column; color: var(--hl-text); transition: box-shadow var(--hl-dur) var(--hl-ease), transform var(--hl-dur) var(--hl-ease); }
      .pcard:hover { box-shadow: var(--hl-shadow-2); transform: translateY(-1px); }
      .pcard .stripe { height: 6px; }
      .pcard hl-plant-image { border-radius: 0; }
      .drawer hl-plant-image { margin-bottom: var(--hl-s3); }
      .pcard .inner { padding: var(--hl-s3) var(--hl-s4); display: flex; flex-direction: column; gap: var(--hl-s2); }
      .facts { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
      .facts b { display: block; color: var(--hl-text); font-size: var(--hl-fs-sm); }
      .cal { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1px; position: relative; height: 34px; }
      .cal .m { background: var(--hl-surface-2); font-size: 9px; color: var(--hl-text-muted); text-align: center; padding-top: 22px; }
      .cal .b { position: absolute; height: 5px; border-radius: 3px; }
      .drawer { position: fixed; top: 0; right: 0; bottom: 0; width: min(520px, 100vw); background: var(--hl-surface); box-shadow: var(--hl-shadow-3);
        z-index: 5; display: flex; flex-direction: column; border-left: 1px solid var(--hl-border); }
      .drawer header { padding: var(--hl-s4) var(--hl-s5); border-bottom: 1px solid var(--hl-border); display: flex; gap: var(--hl-s2); align-items: center; }
      .drawer .content { padding: var(--hl-s4) var(--hl-s5); overflow: auto; display: flex; flex-direction: column; gap: var(--hl-s4); }
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

  private get anchors(): { last_frost: string; first_frost: string } {
    return this.snapshot.analysis?.anchors ?? { last_frost: `${new Date().getFullYear()}-04-20`, first_frost: `${new Date().getFullYear()}-10-25` };
  }

  private seasonStart(): string {
    const lf = this.anchors.last_frost;
    return this.snapshot.settings.region.hemisphere === "south" ? `${lf.slice(0, 4)}-07-01` : `${lf.slice(0, 4)}-01-01`;
  }

  private renderCalendar(plant: Plant): TemplateResult {
    const start = this.seasonStart();
    const pos = (iso: string) => Math.max(0, Math.min(100, (daysBetween(start, iso) / 365) * 100));
    const bars: TemplateResult[] = [];
    const add = (wins: Window[], top: number, color: string) => {
      for (const w of wins) {
        const [a, b] = windowDates(w, this.anchors);
        bars.push(html`<div class="b" style=${`left:${pos(a)}%;width:${Math.max(pos(b) - pos(a), 1)}%;top:${top}px;background:${color}`}></div>`);
      }
    };
    add(plant.sowing.indoor_sow, 2, "var(--hl-leaf-300)");
    add(plant.sowing.direct_sow, 8, "var(--hl-leaf-500)");
    add(plant.sowing.transplant, 14, "var(--hl-leaf-700)");
    const ground = [...plant.sowing.direct_sow, ...plant.sowing.transplant][0];
    if (ground && plant.harvestable) {
      const [a, b] = windowDates(ground, this.anchors);
      const offset = plant.maturity_from === "transplant" && !plant.sowing.transplant.length ? plant.germination_days[1] + 14 : 0;
      bars.push(html`<div class="b" style=${`left:${pos(addDays(a, plant.days_to_maturity[0] + offset))}%;width:${Math.max(
        pos(addDays(b, plant.days_to_maturity[1] + offset + plant.harvest_duration_days)) - pos(addDays(a, plant.days_to_maturity[0] + offset)), 1)}%;top:20px;background:var(--hl-sun-500)`}></div>`);
    }
    const months = Array.from({ length: 12 }, (_, i) => formatDate(addDays(start, Math.round(i * 30.5 + 10)), this.lang, { month: "narrow" }));
    return html`<div class="cal" role="img" aria-label=${this.t("lib.calendar")}>${months.map((m) => html`<div class="m">${m}</div>`)}${bars}</div>`;
  }

  private filtered(): Plant[] {
    const q = this.query.trim().toLowerCase();
    return this.plants
      .filter((p) => !this.family || p.family === this.family)
      .filter((p) => !this.category || (p.category ?? "vegetable") === this.category)
      .filter((p) => this.filter !== "greenhouse" || p.greenhouse.suitability === "yes")
      .filter((p) => this.filter !== "quick" || p.days_to_maturity[0] <= 50)
      .filter((p) => this.filter !== "custom" || p.source !== "builtin")
      .filter((p) => !q || [p.id, p.scientific_name, p.family, this.families[p.family]?.[this.lang as "en" | "nl"] ?? "", ...Object.values(p.names)].some((s) => s.toLowerCase().includes(q)))
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
            ${["", ...families].map((f) => html`<option value=${f} ?selected=${f === this.family}>${f ? (this.families[f]?.[this.lang as "en" | "nl"] ?? f) : `${this.t("lib.family")}: ${this.t("common.all")}`}</option>`)}
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
              ${this.renderCalendar(p)}
            </div>
          </button>`)}
      </div>
      ${this.selected ? this.renderDetail(this.selected) : nothing}
      ${this.editing ? this.renderEditor() : nothing}
    `;
  }

  private renderDetail(p: Plant): TemplateResult {
    const lang = this.lang as "en" | "nl";
    const rel = (kind: "friend" | "enemy") => {
      const out = new Map<string, string>();
      for (const link of p.companions) if (link.relation === kind) out.set(link.plant, link.reason[lang] ?? link.reason.en ?? "");
      for (const other of this.plants) for (const link of other.companions)
        if (link.plant === p.id && link.relation === kind && !out.has(other.id)) out.set(other.id, link.reason[lang] ?? link.reason.en ?? "");
      return [...out.entries()];
    };
    const name = (id: string) => plantName(this.plants.find((x) => x.id === id), this.lang);
    return html`
      <aside class="drawer" role="dialog" aria-modal="false" aria-label=${plantName(p, this.lang)} @keydown=${(e: KeyboardEvent) => e.key === "Escape" && (this.selected = null)}>
        <header style=${`border-top: 6px solid ${familyColor(this.families, p.family)}`}>
          <div class="stack" style="gap:2px"><h2>${plantName(p, this.lang)}</h2>
            <span class="small muted"><i>${p.scientific_name}</i> · ${this.families[p.family]?.[lang] ?? p.family}</span></div>
          <span class="spacer"></span>
          <button class="icon-btn" aria-label=${this.t("common.close")} @click=${() => (this.selected = null)}><ha-icon icon="mdi:close"></ha-icon></button>
        </header>
        <div class="content">
          <hl-plant-image .plant=${p} color=${familyColor(this.families, p.family)} lang=${this.lang} size="hero" credit></hl-plant-image>
          ${this.renderCalendar(p)}
          <div class="kv">
            <span>${this.t("lib.spacing")}</span><span>${p.spacing_cm} × ${p.row_spacing_cm} cm</span>
            <span>${this.t("lib.depth")}</span><span>${p.sowing_depth_cm} cm</span>
            <span>${this.t("lib.germination")}</span><span>${p.germination_days[0]}–${p.germination_days[1]} d · ≥ ${p.min_soil_temp_c} °C</span>
            <span>${this.t("lib.maturity")}</span><span>${p.days_to_maturity[0]}–${p.days_to_maturity[1]} d</span>
            <span>${this.t("lib.habit")}</span><span>${this.t(`habit.${p.habit}`)}</span>
            <span>${this.t("lib.frost")}</span><span>${this.t(`frost.${p.frost_tolerance}`)} (${p.min_temp_c} °C)</span>
            <span>${this.t("lib.greenhouse")}</span><span>${this.t(`suit.${p.greenhouse.suitability}`)} · ${p.greenhouse.min_night_c}–${p.greenhouse.max_day_c} °C</span>
            <span>${this.t("lib.water")} / ${this.t("lib.nutrients")}</span><span>${this.t(`level.${p.water_needs}`)} / ${this.t(`level.${p.nutrient_needs}`)}</span>
            <span>${this.t("lib.rotation")} <hl-info term="rotation" .t=${this.t}></hl-info></span><span>${this.t("lib.rotation_years", { n: p.rotation_years })}</span>
            ${p.category ? html`<span>${this.t("lib.category")}</span><span>${this.t(`category.${p.category}`)}${p.perennial ? ` · ${this.t("lib.perennial")}` : ""}</span>` : nothing}
            ${p.height_cm ? html`<span>${this.t("lib.height")}</span><span>${p.height_cm} cm · ${this.t("lib.roots")} ${p.root_depth_cm ?? "?"} cm</span>` : nothing}
            ${p.kc ? html`<span>Kc <hl-info term="kc" .t=${this.t}></hl-info></span><span>${p.kc.map((v) => v.toFixed(2)).join(" → ")}</span>` : nothing}
            ${p.npk ? html`<span>N · P · K <hl-info term="npk" .t=${this.t}></hl-info></span><span>${p.npk.join(" · ")} / 3</span>` : nothing}
            ${p.gdd_to_maturity ? html`<span>${this.t("lib.gdd")} <hl-info term="gdd" .t=${this.t}></hl-info></span><span>${p.gdd_to_maturity} °C·d (${this.t("lib.base")} ${p.gdd_base_c} °C)</span>` : nothing}
            ${p.plants_per_person ? html`<span>${this.t("lib.per_person")}</span><span>${p.plants_per_person} · ${p.yield_kg_m2 ?? "?"} kg/m²</span>` : nothing}
          </div>
          ${p.deters?.length || p.trap_for?.length || p.allelopathic || p.shade_tolerant ? html`<div class="row wrap">
            ${(p.deters ?? []).map((x) => html`<span class="chip ok" title=${this.t("lib.deters")}>🛡 ${tagLabel(x, this.lang)}</span>`)}
            ${(p.trap_for ?? []).map((x) => html`<span class="chip warn" title=${this.t("lib.trap_for")}>🪤 ${tagLabel(x, this.lang)} <hl-info term="trap_crop" .t=${this.t}></hl-info></span>`)}
            ${p.allelopathic ? html`<span class="chip bad">${this.t("lib.allelopathic")} <hl-info term="allelopathy" .t=${this.t}></hl-info></span>` : nothing}
            ${p.shade_tolerant ? html`<span class="chip cold">${this.t("lib.shade_tolerant")}</span>` : nothing}
          </div>` : nothing}
          ${p.greenhouse.notes[lang] ? html`<p class="small">${p.greenhouse.notes[lang]}</p>` : nothing}
          <section class="stack"><h3>${this.t("lib.friends")}</h3>
            ${rel("friend").map(([id, why]) => html`<div class="rel"><span class="chip ok">${name(id)}</span><span class="muted">${why}</span></div>`)}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${rel("enemy").length ? rel("enemy").map(([id, why]) => html`<div class="rel"><span class="chip bad">${name(id)}</span><span class="muted">${why}</span></div>`) : html`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${p.pests.map((x) => html`<span class="chip warn">${tagLabel(x, this.lang)}</span>`)}${p.diseases.map((x) => html`<span class="chip bad">${tagLabel(x, this.lang)}</span>`)}</div></section>
          ${p.care.length || p.pruning_notes[lang] ? html`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${p.care.map((c) => html`<p class="small"><b>${this.t(`type.${c.task}`)}</b>${c.interval_days ? ` · ↻ ${c.interval_days} d` : ""} – ${c.notes[lang] ?? c.notes.en ?? ""}</p>`)}
            ${p.pruning_notes[lang] ? html`<p class="small">${p.pruning_notes[lang]}</p>` : nothing}</section>` : nothing}
          ${this.admin ? html`<div class="row">
            <button class="btn" @click=${() => (this.editing = { plant: structuredClone(p), mode: p.source === "custom" ? "custom" : "override" })}>
              <ha-icon icon="mdi:pencil"></ha-icon>${this.t("lib.customize")}</button>
            ${p.source !== "builtin" ? html`<button class="btn danger" @click=${() => this.removePlant(p)}>${p.source === "override" ? this.t("lib.reset") : this.t("common.delete")}</button>` : nothing}
          </div>` : nothing}
        </div>
      </aside>`;
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
    const win = (prefix: string): Window[] => ((f.elements.namedItem(`${prefix}_on`) as HTMLInputElement).checked
      ? [{ start_week: num(`${prefix}_start`), end_week: num(`${prefix}_end`), anchor: "last_frost" }] : []);
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
      sowing: { indoor_sow: win("indoor"), direct_sow: win("direct"), transplant: win("transplant") },
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
      <select name=${name}>${options.map((o) => html`<option value=${o} ?selected=${o === value}>${prefix ? this.t(`${prefix}.${o}`) : (this.families[o]?.[this.lang as "en" | "nl"] ?? o)}</option>`)}</select>`;
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
