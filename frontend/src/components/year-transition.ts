// Year-end transition: nothing moves into the new year by itself.  The gardener
// picks which part of the garden plan and which perennials / overwintering crops
// go along, then applies it in one step (logged and undoable in the system log).
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant, Snapshot, TransitionPreview } from "../types";
import { familyColor, plantName } from "../util/garden";
import { FEATURE_STYLE, ZONE_STYLE } from "../planner/garden-canvas";
import "./plant-image";
import "./season-report";

@customElement("hl-year-transition")
export class YearTransition extends LitElement {
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) plants: Plant[] = [];
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property() lang = "en";
  @property({ type: Boolean }) admin = true;
  /** Season to close; default: the live garden's season. */
  @property({ type: Number }) fromSeason: number | null = null;

  @state() private preview: TransitionPreview | null = null;
  @state() private layout: "copy" | "keep" = "copy";
  @state() private zones = new Set<string>();
  @state() private features = new Set<string>();
  @state() private carry = new Set<string>();
  @state() private activate = true;
  /** "all": the whole terrain, every zone with its beds and every perennial; "pick": tick what to keep. */
  @state() private keepMode: "all" | "pick" = "all";
  @state() private busy = false;
  @state() private error = "";

  static styles = [
    shared,
    css`
      :host { display: block; }
      h2 { margin: 0; }
      section { border-top: 1px solid var(--hl-border); padding-top: var(--hl-s3); margin-top: var(--hl-s3); }
      h3 { margin: 0 0 var(--hl-s2); display: flex; gap: 8px; align-items: center; }
      .list { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 6px; }
      label.item { display: flex; gap: 8px; align-items: center; padding: 6px 8px; border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); cursor: pointer; }
      label.item.off { opacity: 0.55; }
      label.item small { display: block; color: var(--hl-text-muted); }
      .warn { color: var(--hl-warning); }
      .row.end { justify-content: flex-end; }
      .choice { display: flex; flex-direction: column; gap: 6px; }
      .choice label { padding: 8px 10px; border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); cursor: pointer; }
      .choice label.on { border-color: var(--hl-leaf-500); background: var(--hl-leaf-100); }
      .group-head { display: flex; align-items: center; gap: 8px; margin: var(--hl-s2) 0 4px; }
      .group-head h4 { margin: 0; }
    `,
  ];

  protected willUpdate(changed: PropertyValues): void {
    if ((changed.has("api") || changed.has("fromSeason")) && this.api) void this.load();
  }

  private async load(): Promise<void> {
    this.error = "";
    try {
      const pre = await this.api.yearPreview(this.fromSeason ?? undefined);
      this.preview = pre;
      this.layout = pre.target_exists ? "keep" : "copy";
      this.zones = new Set(pre.zones.map((z) => z.id));
      this.features = new Set(pre.features.map((f) => f.id));
      this.carry = new Set(pre.candidates.filter((c) => c.selected).map((c) => c.planting_id));
      this.activate = pre.is_live;
      this.keepAll();
    } catch (err) {
      this.error = (err as Error).message ?? String(err);
    }
  }

  private toggle(set: Set<string>, id: string, on: boolean): Set<string> {
    const next = new Set(set);
    if (on) next.add(id);
    else next.delete(id);
    return next;
  }

  /** "Keep everything": all elements, all zones (with their beds) and every perennial. */
  private keepAll(): void {
    const pre = this.preview!;
    this.keepMode = "all";
    this.zones = new Set(pre.zones.map((z) => z.id));
    this.features = new Set(pre.features.map((f) => f.id));
    const perennials = pre.candidates.filter((c) => c.reason === "perennial").map((c) => c.planting_id);
    this.carry = new Set([...this.carry, ...perennials]);
  }

  /** "All / none" for one list of ticks. */
  private groupToggle(ids: string[], set: Set<string>, assign: (next: Set<string>) => void): TemplateResult {
    const all = ids.length > 0 && ids.every((id) => set.has(id));
    return html`<button class="btn small ghost" @click=${() => {
      const next = new Set(set);
      ids.forEach((id) => (all ? next.delete(id) : next.add(id)));
      assign(next);
    }}>${this.t(all ? "year.none_of_them" : "year.all_of_them")}</button>`;
  }

  /** Beds that will exist next year with the current choices. */
  private targetBeds(): Set<string> {
    const pre = this.preview!;
    if (this.layout === "keep") return new Set((this.snapshot.layouts?.[String(pre.to_season)]?.beds ?? []).map((b) => b.id));
    return new Set(pre.beds.filter((b) => this.zones.has(b.zone_id)).map((b) => b.id));
  }

  private async apply(): Promise<void> {
    const pre = this.preview!;
    this.busy = true;
    try {
      const res = await this.api.yearApply({
        from_season: pre.from_season,
        layout: this.layout,
        zone_ids: this.layout === "copy" ? [...this.zones] : null,
        feature_ids: this.layout === "copy" ? [...this.features] : null,
        planting_ids: [...this.carry],
        activate: this.activate,
      });
      this.dispatchEvent(new CustomEvent("transition-done", { detail: res, bubbles: true, composed: true }));
    } catch (err) {
      this.error = (err as Error).message ?? String(err);
    } finally {
      this.busy = false;
    }
  }

  private close(): void {
    this.dispatchEvent(new CustomEvent("close", { bubbles: true, composed: true }));
  }

  render(): TemplateResult {
    const pre = this.preview;
    if (!pre) {
      return html`<div class="stack"><h2>${this.t("year.title_short")}</h2>
        ${this.error ? html`<p class="warn">${this.error}</p>` : html`<p class="muted">${this.t("common.loading")}</p>`}
        <div class="row end"><button class="btn" @click=${this.close}>${this.t("common.close")}</button></div></div>`;
    }
    const { from_season: from, to_season: to } = pre;
    const beds = this.targetBeds();
    const bedName = (id: string) => pre.beds.find((b) => b.id === id)?.name ?? this.snapshot.layouts?.[String(to)]?.beds.find((b) => b.id === id)?.name ?? id;
    const perennials = pre.candidates.filter((c) => c.reason === "perennial");
    const overwinter = pre.candidates.filter((c) => c.reason === "overwinter");
    const crop = (c: (typeof pre.candidates)[number]) => {
      const plant = this.plants.find((p) => p.id === c.plant_id);
      const lost = !beds.has(c.bed_id);
      return html`<label class="item ${this.carry.has(c.planting_id) ? "" : "off"}">
        <input type="checkbox" .checked=${this.carry.has(c.planting_id)} ?disabled=${lost}
          @change=${(e: Event) => (this.carry = this.toggle(this.carry, c.planting_id, (e.target as HTMLInputElement).checked))} />
        ${plant ? html`<hl-plant-image .plant=${plant} color=${familyColor(this.families, plant.family)} lang=${this.lang} size="thumb"></hl-plant-image>` : nothing}
        <span>${plantName(plant, this.lang) || c.plant_id}<small>${bedName(c.bed_id)}${lost ? html` · <span class="warn">${this.t("year.bed_gone")}</span>` : nothing}</small></span>
      </label>`;
    };
    return html`<div class="stack">
      <h2>${this.t("year.title", { from, to })}</h2>
      <p class="small">${this.t("year.intro", { from, to })}</p>
      <details class="report"><summary><ha-icon icon="mdi:file-chart-outline"></ha-icon> ${this.t("report.title", { season: from })}</summary>
        <hl-season-report .snapshot=${this.snapshot} .api=${this.api} .t=${this.t} lang=${this.lang} season=${from} .pick=${false}
          .plants=${new Map(this.plants.map((x) => [x.id, x]))} .families=${this.families}></hl-season-report></details>

      <section>
        <h3><ha-icon icon="mdi:help-circle-outline"></ha-icon>${this.t("year.what_keep", { to })}</h3>
        <div class="choice">
          <label class="row ${this.keepMode === "all" ? "on" : ""}"><input type="radio" name="keep" .checked=${this.keepMode === "all"} @change=${() => this.keepAll()} />
            <span><b>${this.t("year.keep_all")}</b><br /><span class="xs muted">${this.t("year.keep_all_hint", {
              elements: pre.features.length, zones: pre.zones.length, beds: pre.beds.length, perennials: perennials.length })}</span></span></label>
          <label class="row ${this.keepMode === "pick" ? "on" : ""}"><input type="radio" name="keep" .checked=${this.keepMode === "pick"} @change=${() => (this.keepMode = "pick")} />
            <span><b>${this.t("year.keep_pick")}</b><br /><span class="xs muted">${this.t("year.keep_pick_hint")}</span></span></label>
        </div>
      </section>

      <section>
        <h3><ha-icon icon="mdi:floor-plan"></ha-icon>${this.t("year.plan")}</h3>
        ${pre.target_exists ? html`<div class="choice">
          <label class="row"><input type="radio" name="layout" .checked=${this.layout === "keep"} @change=${() => (this.layout = "keep")} />${this.t("year.keep", { to })}</label>
          <label class="row"><input type="radio" name="layout" .checked=${this.layout === "copy"} @change=${() => (this.layout = "copy")} />${this.t("year.copy", { from })}</label>
        </div>` : html`<p class="small muted">${this.t("year.copy_hint", { from, to })}</p>`}
        ${this.layout === "copy" && this.keepMode === "pick" ? html`
          ${pre.features.length ? html`<div class="group-head"><h4>${this.t("year.elements")}</h4>
            ${this.groupToggle(pre.features.map((f) => f.id), this.features, (n) => (this.features = n))}</div>
            <div class="list">${pre.features.map((f) => html`<label class="item ${this.features.has(f.id) ? "" : "off"}">
              <input type="checkbox" .checked=${this.features.has(f.id)} @change=${(e: Event) => (this.features = this.toggle(this.features, f.id, (e.target as HTMLInputElement).checked))} />
              <span>${FEATURE_STYLE[f.type]?.icon ?? ""} ${f.name}<small>${this.t(`feature.${f.type}`)}</small></span>
            </label>`)}</div>` : nothing}
          <div class="group-head"><h4>${this.t("year.zones_with_beds")}</h4>
            ${this.groupToggle(pre.zones.map((z) => z.id), this.zones, (n) => (this.zones = n))}</div>
          <div class="list">${pre.zones.map((z) => html`<label class="item ${this.zones.has(z.id) ? "" : "off"}">
            <input type="checkbox" .checked=${this.zones.has(z.id)} @change=${(e: Event) => (this.zones = this.toggle(this.zones, z.id, (e.target as HTMLInputElement).checked))} />
            <span>${ZONE_STYLE[z.type]?.icon ?? ""} ${z.name}<small>${this.t(`settings.zone_type.${z.type}`)} · ${this.t("planner.n_beds", { n: pre.beds.filter((b) => b.zone_id === z.id).length })}</small></span>
          </label>`)}</div>` : this.layout === "copy" ? html`<p class="small muted">${this.t("year.plan_all")}</p>` : nothing}
      </section>

      <section>
        <h3><ha-icon icon="mdi:tree-outline"></ha-icon>${this.t("year.perennials")}</h3>
        ${!perennials.length ? html`<p class="small muted">${this.t("year.none")}</p>`
          : this.keepMode === "all" ? html`<p class="small muted">${this.t("year.perennials_all", { n: perennials.filter((c) => beds.has(c.bed_id)).length })}</p>`
          : html`<div class="group-head">${this.groupToggle(perennials.map((c) => c.planting_id), this.carry, (n) => (this.carry = n))}</div>
            <div class="list">${perennials.map(crop)}</div>`}
        <h3 style="margin-top:var(--hl-s3)"><ha-icon icon="mdi:snowflake"></ha-icon>${this.t("year.overwinter")}</h3>
        ${overwinter.length ? html`<div class="list">${overwinter.map(crop)}</div>` : html`<p class="small muted">${this.t("year.none")}</p>`}
        <p class="xs muted">${this.t("year.not_chosen", { to })}</p>
      </section>

      <section>
        <label class="row"><input type="checkbox" .checked=${this.activate} ?disabled=${!pre.is_live}
          @change=${(e: Event) => (this.activate = (e.target as HTMLInputElement).checked)} />${this.t("year.activate", { to })}</label>
        <p class="xs muted">${this.t(this.activate ? "year.activate_hint" : "year.prepare_hint", { from, to })}</p>
      </section>

      ${this.error ? html`<p class="warn">${this.error}</p>` : nothing}
      <div class="row end">
        <button class="btn ghost" @click=${this.close}>${this.t("common.cancel")}</button>
        <button class="btn primary" ?disabled=${this.busy || !this.admin} @click=${() => this.apply()}>
          <ha-icon icon="mdi:calendar-arrow-right"></ha-icon>${this.t("year.apply", { to })}</button>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-year-transition": YearTransition;
  }
}
