// "Look at this garden": the plan only, for someone the owner shows the garden to
// (the website's shared and public gardens). Click a zone, bed, crop or element for
// its details, pick another year; nothing can be changed and nothing else is shown.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { Bed, FamilyInfo, Plant, Planting, Snapshot } from "../types";
import { familyColor, familyName, formatDate, layoutOf, plantName, presentIn } from "../util/garden";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import "../planner/garden-canvas";

type Sel = { kind: string; id: string } | null;

@customElement("hl-garden-viewer")
export class GardenViewer extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) plants: Plant[] = [];
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @state() private season = 0;
  @state() private sel: Sel = null;

  static styles = [
    shared,
    css`
      :host { display: block; }
      .bar { display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-bottom: var(--hl-s3); }
      .bar h2 { margin: 0; font-size: var(--hl-fs-lg); }
      .wrap { display: grid; grid-template-columns: minmax(0, 1fr) 320px; gap: var(--hl-s4); align-items: start; }
      @media (max-width: 900px) { .wrap { grid-template-columns: 1fr; } }
      .map { height: min(70vh, 720px); min-height: 360px; border-radius: var(--hl-r-lg); overflow: hidden; border: 1px solid var(--hl-border); background: var(--hl-surface); }
      .map hl-garden-canvas { display: block; width: 100%; height: 100%; }
      dl { display: grid; grid-template-columns: auto 1fr; gap: 4px 12px; margin: 0; font-size: var(--hl-fs-sm); }
      dt { color: var(--hl-text-muted); }
      dd { margin: 0; }
      ul.crops { list-style: none; padding: 0; margin: 6px 0 0; }
      ul.crops li button { display: flex; gap: 8px; align-items: center; width: 100%; text-align: left; padding: 5px 4px; border: 0;
        background: none; font: inherit; color: inherit; cursor: pointer; border-bottom: 1px solid var(--hl-border); }
      ul.crops li button:hover { background: var(--hl-surface-2); }
      .head { display: flex; gap: 10px; align-items: center; }
      .head h3 { margin: 0; }
    `,
  ];

  private get plantMap(): Map<string, Plant> {
    return new Map(this.plants.map((p) => [p.id, p]));
  }

  private get seasons(): number[] {
    const snap = this.snapshot;
    const years = new Set<number>([snap.layout_season ?? snap.analysis?.season ?? new Date().getFullYear()]);
    for (const k of Object.keys(snap.layouts ?? {})) years.add(Number(k));
    for (const p of snap.plantings) years.add(p.season);
    return [...years].filter((y) => Number.isFinite(y) && layoutOf(snap, y)).sort((a, b) => b - a);
  }

  protected willUpdate(): void {
    if (!this.season && this.snapshot) {
      const today = new Date().getFullYear();
      this.season = layoutOf(this.snapshot, today) ? today : (this.snapshot.layout_season ?? this.seasons[0] ?? today);
    }
  }

  private plantingsIn(season: number): Planting[] {
    const pm = this.plantMap;
    return this.snapshot.plantings.filter((p) => presentIn(p, !!pm.get(p.plant_id)?.perennial, season));
  }

  render(): TemplateResult {
    const snap = this.snapshot;
    const layout = layoutOf(snap, this.season) ?? { zones: [], beds: [], features: [] };
    const plantings = this.plantingsIn(this.season);
    const current = this.season === (snap.analysis?.season ?? snap.layout_season);
    return html`
      <div class="bar">
        <h2>${this.t("viewer.title")}</h2>
        <span class="spacer"></span>
        <label class="small">${this.t("viewer.year")}
          <select @change=${(e: Event) => { this.season = Number((e.target as HTMLSelectElement).value); this.sel = null; }}>
            ${this.seasons.map((y) => html`<option value=${y} ?selected=${y === this.season}>${y}</option>`)}
          </select></label>
      </div>
      <div class="wrap">
        <div class="map">
          ${layout.zones.length || layout.beds.length ? html`<hl-garden-canvas
            .zones=${layout.zones} .beds=${layout.beds} .features=${layout.features} .plantings=${plantings}
            .plants=${this.plantMap} .families=${this.families} .selection=${this.sel} .multi=${[]}
            .timelines=${current ? snap.analysis?.timelines ?? {} : {}} .analysis=${null}
            .t=${this.t} .lang=${this.lang} .snapStep=${snap.settings.snap_cm} .readonly=${true} .lockLayout=${true}
            .showCompanions=${false} .showMoisture=${false} .showTemperature=${false}
            @select=${(e: CustomEvent<Sel>) => (this.sel = e.detail)}
            @item-click=${(e: CustomEvent<Sel>) => (this.sel = e.detail)}></hl-garden-canvas>`
            : html`<div class="empty">${this.t("viewer.no_plan")}</div>`}
        </div>
        <aside class="card stack">${this.renderDetails(layout.beds, plantings, current)}</aside>
      </div>`;
  }

  private renderDetails(beds: Bed[], plantings: Planting[], current: boolean): TemplateResult {
    const snap = this.snapshot;
    const layout = layoutOf(snap, this.season) ?? { zones: [], beds: [], features: [] };
    const sel = this.sel;
    const m2 = (w: number, l: number) => `${((w * l) / 10000).toLocaleString(this.lang, { maximumFractionDigits: 1 })} m²`;
    const cropList = (list: Planting[]) => html`<ul class="crops">${list.map((p) => {
      const plant = this.plantMap.get(p.plant_id);
      return html`<li><button @click=${() => (this.sel = { kind: "planting", id: p.id })}>
        ${glyphIcon(glyphFor(plant), plant?.color || familyColor(this.families, plant?.family ?? ""), 22)}
        <span>${plantName(plant, this.lang)}</span><span class="spacer"></span><span class="xs muted">${this.t(`status.${p.status}`)}</span></button></li>`;
    })}</ul>`;
    if (!sel) {
      return html`<p class="muted small">${this.t("viewer.hint")}</p>
        <dl><dt>${this.t("viewer.beds")}</dt><dd>${beds.length}</dd><dt>${this.t("viewer.crops")}</dt><dd>${new Set(plantings.map((p) => p.plant_id)).size}</dd></dl>`;
    }
    if (sel.kind === "planting") {
      const p = plantings.find((x) => x.id === sel.id);
      if (!p) return html`${nothing}`;
      const plant = this.plantMap.get(p.plant_id);
      const tl = current ? snap.analysis?.timelines?.[p.id] : undefined;
      const bed = beds.find((b) => b.id === p.bed_id);
      return html`<div class="head">${glyphIcon(glyphFor(plant), plant?.color || familyColor(this.families, plant?.family ?? ""), 34)}
          <h3>${plantName(plant, this.lang)}</h3></div>
        <dl>
          <dt>${this.t("viewer.bed")}</dt><dd>${bed?.name ?? "–"}</dd>
          <dt>${this.t("viewer.status")}</dt><dd>${this.t(`status.${p.status}`)}</dd>
          ${p.count ? html`<dt>${this.t("viewer.count")}</dt><dd>${p.count}</dd>` : nothing}
          ${p.sown_on || p.sow_date || tl?.sow_date ? html`<dt>${this.t("viewer.sown")}</dt>
            <dd>${formatDate(p.sown_on ?? p.sow_date ?? tl?.sow_date, this.lang)}</dd>` : nothing}
          ${p.transplanted_on || p.transplant_date || tl?.transplant_date ? html`<dt>${this.t("viewer.planted")}</dt>
            <dd>${formatDate(p.transplanted_on ?? p.transplant_date ?? tl?.transplant_date, this.lang)}</dd>` : nothing}
          ${tl ? html`<dt>${this.t("viewer.harvest")}</dt><dd>${formatDate(tl.harvest_start, this.lang)} – ${formatDate(tl.harvest_end, this.lang)}</dd>` : nothing}
          ${p.harvest_started_on ? html`<dt>${this.t("viewer.harvest_started")}</dt><dd>${formatDate(p.harvest_started_on, this.lang)}</dd>` : nothing}
          ${plant?.family ? html`<dt>${this.t("viewer.family")}</dt><dd>${familyName(this.families, plant.family, this.lang) ?? plant.family}</dd>` : nothing}
        </dl>
        ${bed ? html`<button class="btn small ghost" @click=${() => (this.sel = { kind: "bed", id: bed.id })}>← ${bed.name}</button>` : nothing}`;
    }
    if (sel.kind === "bed") {
      const b = beds.find((x) => x.id === sel.id);
      if (!b) return html`${nothing}`;
      const zone = layout.zones.find((z) => z.id === b.zone_id);
      return html`<h3>${b.name}</h3>
        <dl><dt>${this.t("viewer.size")}</dt><dd>${(b.width_cm / 100).toLocaleString(this.lang)} × ${(b.length_cm / 100).toLocaleString(this.lang)} m · ${m2(b.width_cm, b.length_cm)}</dd>
          ${zone ? html`<dt>${this.t("viewer.zone")}</dt><dd>${zone.name}</dd>` : nothing}</dl>
        <b class="small">${this.t("viewer.crops")}</b>
        ${cropList(plantings.filter((p) => p.bed_id === b.id))}`;
    }
    if (sel.kind === "zone") {
      const z = layout.zones.find((x) => x.id === sel.id);
      if (!z) return html`${nothing}`;
      const zb = beds.filter((b) => b.zone_id === z.id);
      return html`<h3>${z.name}</h3>
        <dl><dt>${this.t("viewer.kind")}</dt><dd>${this.t(`settings.zone_type.${z.type}`)}</dd>
          <dt>${this.t("viewer.size")}</dt><dd>${m2(z.width_cm, z.length_cm)}</dd>
          <dt>${this.t("viewer.beds")}</dt><dd>${zb.length}</dd></dl>
        <ul class="crops">${zb.map((b) => html`<li><button @click=${() => (this.sel = { kind: "bed", id: b.id })}>${b.name}
          <span class="spacer"></span><span class="xs muted">${plantings.filter((p) => p.bed_id === b.id).length}</span></button></li>`)}</ul>`;
    }
    const f = layout.features.find((x) => x.id === sel.id);
    return f ? html`<h3>${f.name || this.t(`feature.${f.type}`)}</h3><p class="small muted">${this.t(`feature.${f.type}`)}</p>` : html`${nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-garden-viewer": GardenViewer;
  }
}
