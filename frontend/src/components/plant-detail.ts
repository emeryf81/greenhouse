// Everything about one plant: picture, calendar, needs, neighbours, pests and care.
// Used in the plant library and in the plant popup that opens from anywhere.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { tagLabel, type Translate } from "../i18n";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant, Snapshot, Window } from "../types";
import { addDays, daysBetween, familyColor, formatDate, plantName, windowDates } from "../util/garden";
import "./info";
import "./plant-image";

export const plantCalendarStyles = css`
  .cal { display: grid; grid-template-columns: repeat(12, 1fr); gap: 1px; position: relative; height: 34px; }
  .cal .m { background: var(--hl-surface-2); font-size: 9px; color: var(--hl-text-muted); text-align: center; padding-top: 22px; }
  .cal .b { position: absolute; height: 5px; border-radius: 3px; }
`;

export function renderPlantCalendar(plant: Plant, snapshot: Snapshot, lang: string, t: Translate): TemplateResult {
  const anchors = snapshot.analysis?.anchors ?? { last_frost: `${new Date().getFullYear()}-04-20`, first_frost: `${new Date().getFullYear()}-10-25` };
  const lf = anchors.last_frost;
  const start = snapshot.settings.region.hemisphere === "south" ? `${lf.slice(0, 4)}-07-01` : `${lf.slice(0, 4)}-01-01`;
  const pos = (iso: string) => Math.max(0, Math.min(100, (daysBetween(start, iso) / 365) * 100));
  const bars: TemplateResult[] = [];
  const add = (wins: Window[], top: number, color: string) => {
    for (const w of wins) {
      const [a, b] = windowDates(w, anchors);
      bars.push(html`<div class="b" style=${`left:${pos(a)}%;width:${Math.max(pos(b) - pos(a), 1)}%;top:${top}px;background:${color}`}></div>`);
    }
  };
  add(plant.sowing.indoor_sow, 2, "var(--hl-leaf-300)");
  add(plant.sowing.direct_sow, 8, "var(--hl-leaf-500)");
  add(plant.sowing.transplant, 14, "var(--hl-leaf-700)");
  const ground = [...plant.sowing.direct_sow, ...plant.sowing.transplant][0];
  if (ground && plant.harvestable) {
    const [a, b] = windowDates(ground, anchors);
    const offset = plant.maturity_from === "transplant" && !plant.sowing.transplant.length ? plant.germination_days[1] + 14 : 0;
    bars.push(html`<div class="b" style=${`left:${pos(addDays(a, plant.days_to_maturity[0] + offset))}%;width:${Math.max(
      pos(addDays(b, plant.days_to_maturity[1] + offset + plant.harvest_duration_days)) - pos(addDays(a, plant.days_to_maturity[0] + offset)), 1)}%;top:20px;background:var(--hl-sun-500)`}></div>`);
  }
  const months = Array.from({ length: 12 }, (_, i) => formatDate(addDays(start, Math.round(i * 30.5 + 10)), lang, { month: "narrow" }));
  return html`<div class="cal" role="img" aria-label=${t("lib.calendar")}>${months.map((m) => html`<div class="m">${m}</div>`)}${bars}</div>`;
}

import "./photo-timeline";

@customElement("hl-plant-detail")
export class PlantDetail extends LitElement {
  @property({ attribute: false }) plant!: Plant;
  @property({ attribute: false }) plants: Plant[] = [];
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";

  static styles = [
    shared,
    plantCalendarStyles,
    css`
      :host { display: flex; flex-direction: column; gap: var(--hl-s4); }
      .kv { display: grid; grid-template-columns: 1fr 1fr; gap: 6px var(--hl-s4); font-size: var(--hl-fs-sm); }
      .kv span:nth-child(odd) { color: var(--hl-text-muted); }
      .rel { display: flex; gap: var(--hl-s2); align-items: flex-start; font-size: var(--hl-fs-sm); }
      .rel .chip { display: inline-flex; align-items: center; gap: 4px; cursor: pointer; border: 0; font: inherit; }
      .grow { flex: 1; }
      .mine { display: flex; flex-wrap: wrap; gap: 6px; }
    `,
  ];

  /** A neighbour was clicked: show that plant instead. */
  private pick(plant: Plant): void {
    this.dispatchEvent(new CustomEvent("select-plant", { detail: plant, bubbles: true, composed: true }));
  }

  /** Where this plant grows in the garden (any season). */
  private renderMine(p: Plant): TemplateResult | typeof nothing {
    const mine = (this.snapshot?.plantings ?? []).filter((x) => x.plant_id === p.id);
    if (!mine.length) return nothing;
    const beds = new Map<string, string>();
    for (const layout of [{ beds: this.snapshot.beds }, ...Object.values(this.snapshot.layouts ?? {})]) for (const b of layout.beds) beds.set(b.id, b.name);
    return html`<section class="stack"><h3>${this.t("lib.in_garden")}</h3><div class="mine">
      ${mine.sort((a, b) => b.season - a.season).map((x) => html`<button class="chip" @click=${() => this.dispatchEvent(new CustomEvent("focus-planting",
        { detail: { planting_id: x.id, season: x.season }, bubbles: true, composed: true }))}>${x.season} · ${beds.get(x.bed_id) ?? x.bed_id}</button>`)}
    </div></section>`;
  }

  render(): TemplateResult {
    const p = this.plant;
    const lang = this.lang as "en" | "nl";
    const rel = (kind: "friend" | "enemy") => {
      const out = new Map<string, string>();
      for (const link of p.companions) if (link.relation === kind) out.set(link.plant, link.reason[lang] ?? link.reason.en ?? "");
      for (const other of this.plants) for (const link of other.companions)
        if (link.plant === p.id && link.relation === kind && !out.has(other.id)) out.set(other.id, link.reason[lang] ?? link.reason.en ?? "");
      return [...out.entries()];
    };
    const name = (id: string) => plantName(this.plants.find((x) => x.id === id), this.lang);
    const chip = (id: string, kind: string) => {
      const other = this.plants.find((x) => x.id === id);
      return html`<button class="chip ${kind}" title=${this.t("lib.open_plant")} ?disabled=${!other} @click=${() => other && this.pick(other)}>
        ${other ? glyphIcon(glyphFor(other), other.color || familyColor(this.families, other.family), 16) : nothing}${name(id)}</button>`;
    };
    return html`
          <hl-plant-image .plant=${p} color=${familyColor(this.families, p.family)} lang=${this.lang} size="hero" credit></hl-plant-image>
          ${renderPlantCalendar(p, this.snapshot, this.lang, this.t)}
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
            ${rel("friend").length ? rel("friend").map(([id, why]) => html`<div class="rel">${chip(id, "ok")}<span class="muted">${why}</span></div>`) : html`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.enemies")}</h3>
            ${rel("enemy").length ? rel("enemy").map(([id, why]) => html`<div class="rel">${chip(id, "bad")}<span class="muted">${why}</span></div>`) : html`<p class="small muted">${this.t("common.none")}</p>`}</section>
          <section class="stack"><h3>${this.t("lib.pests")} & ${this.t("lib.diseases")}</h3>
            <div class="row wrap">${p.pests.map((x) => html`<span class="chip warn">${tagLabel(x, this.lang)}</span>`)}${p.diseases.map((x) => html`<span class="chip bad">${tagLabel(x, this.lang)}</span>`)}</div></section>
          ${p.care.length || p.pruning_notes[lang] ? html`<section class="stack"><h3>${this.t("lib.care")}</h3>
            ${p.care.map((c) => html`<p class="small"><b>${this.t(`type.${c.task}`)}</b>${c.interval_days ? ` · ↻ ${c.interval_days} d` : ""} – ${c.notes[lang] ?? c.notes.en ?? ""}</p>`)}
            ${p.pruning_notes[lang] ? html`<p class="small">${p.pruning_notes[lang]}</p>` : nothing}</section>` : nothing}
      ${this.renderMine(p)}
      ${this.renderPhotos(p)}`;
  }

  private renderPhotos(p: Plant): TemplateResult | typeof nothing {
    const journal = this.snapshot?.journal ?? [];
    const ids = (this.snapshot?.plantings ?? []).filter((x) => x.plant_id === p.id).map((x) => x.id);
    if (!journal.some((e) => e.photos?.length && (e.plant_id === p.id || (e.planting_id && ids.includes(e.planting_id))))) return nothing;
    return html`<section class="stack"><h3>${this.t("photos.yours")}</h3>
      <hl-photo-timeline .journal=${journal} .t=${this.t} lang=${this.lang} plantId=${p.id} .plantingIds=${ids}></hl-photo-timeline></section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-plant-detail": PlantDetail;
  }
}
