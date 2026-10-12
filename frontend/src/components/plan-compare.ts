// Compare two garden plans: a season's plan or one that was set aside with
// "start a new plan". Lists the zones, beds, elements and crops that changed.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { shared } from "../styles/tokens";
import type { CropDiff, DiffPart, FamilyInfo, Plant, PlanComparison, PlanRef, Snapshot } from "../types";
import { familyColor } from "../util/garden";

/** ``s:2026`` = a season's plan, ``p:<id>`` = a plan set aside. */
function parseRef(key: string): PlanRef {
  return key.startsWith("p:") ? { plan_id: key.slice(2) } : { season: Number(key.slice(2)) };
}

@customElement("hl-plan-compare")
export class PlanCompare extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property({ attribute: false }) plants: Map<string, Plant> = new Map();
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property() lang = "en";
  /** Preselected plans (``s:<season>`` / ``p:<id>``). */
  @property() left = "";
  @property() right = "";
  @state() private result: PlanComparison | null = null;
  @state() private error = "";

  static styles = [
    shared,
    css`
      :host { display: block; }
      .pick { display: flex; flex-wrap: wrap; gap: var(--hl-s2); align-items: end; }
      .pick select { width: auto; min-width: 180px; }
      .parts { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: var(--hl-s3); margin-top: var(--hl-s3); }
      .part h4 { margin: 0 0 4px; }
      ul { margin: 0; padding-left: 0; list-style: none; font-size: var(--hl-fs-sm); display: flex; flex-direction: column; gap: 3px; }
      li { display: flex; gap: 6px; align-items: center; }
      .sign { width: 18px; text-align: center; font-weight: 700; flex: none; }
      .add .sign { color: var(--hl-leaf-700); }
      .del .sign { color: var(--hl-tomato-500); }
      .chg .sign { color: var(--hl-sun-700, #a66b00); }
    `,
  ];

  private options(): [string, string][] {
    const seasons = new Set<number>(Object.keys(this.snapshot.layouts ?? {}).map(Number));
    if (this.snapshot.layout_season != null) seasons.add(this.snapshot.layout_season);
    const out: [string, string][] = [...seasons].sort().map((s) => [`s:${s}`, this.t("compare.season_plan", { season: s })]);
    for (const p of this.snapshot.archived_plans ?? []) out.push([`p:${p.id}`, this.t("compare.inactive_plan", { name: p.name, season: p.season })]);
    return out;
  }

  protected willUpdate(): void {
    const opts = this.options();
    if (!this.left && opts.length) this.left = opts.find(([k]) => k.startsWith("p:"))?.[0] ?? opts[0][0];
    if (!this.right && opts.length) this.right = `s:${this.snapshot.layout_season ?? ""}`;
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has("left") || changed.has("right")) void this.run();
  }

  private async run(): Promise<void> {
    if (!this.left || !this.right) return;
    const left = this.left;
    const right = this.right;
    this.error = "";
    try {
      const res = await this.api.comparePlans(parseRef(left), parseRef(right));
      // a slower answer for an earlier choice must not overwrite the current one
      if (left === this.left && right === this.right) this.result = res;
    } catch (err) {
      if (left !== this.left || right !== this.right) return; // a failure for an earlier choice
      this.result = null;
      this.error = (err as Error).message ?? String(err);
    }
  }

  private what(list: string[]): string {
    return list.map((w) => this.t(`compare.what.${w}`)).join(", ");
  }

  private renderPart(title: string, part: DiffPart): TemplateResult | typeof nothing {
    if (!part.added.length && !part.removed.length && !part.changed.length) return nothing;
    return html`<div class="part"><h4>${title}</h4><ul>
      ${part.added.map((i) => html`<li class="add"><span class="sign">+</span>${i.name}</li>`)}
      ${part.removed.map((i) => html`<li class="del"><span class="sign">−</span>${i.name}</li>`)}
      ${part.changed.map((i) => html`<li class="chg"><span class="sign">~</span>${i.was && i.was !== i.name ? `${i.was} → ${i.name}` : i.name}
        <span class="xs muted">(${this.what(i.what)})</span></li>`)}
    </ul></div>`;
  }

  private crop(c: CropDiff, sign: string, cls: string, extra: TemplateResult | string = ""): TemplateResult {
    const plant = this.plants.get(c.plant_id);
    return html`<li class=${cls}><span class="sign">${sign}</span>
      ${plant ? glyphIcon(glyphFor(plant), plant.color || familyColor(this.families, plant.family), 16) : nothing}${c.name}
      <span class="xs muted">${c.bed}</span>${extra}</li>`;
  }

  render(): TemplateResult {
    const opts = this.options();
    const r = this.result;
    const select = (value: string, set: (v: string) => void, label: string) => html`<label class="field">${label}
      <select @change=${(e: Event) => set((e.target as HTMLSelectElement).value)}>
        ${opts.map(([k, l]) => html`<option value=${k} ?selected=${k === value}>${l}</option>`)}</select></label>`;
    return html`
      <div class="pick">
        ${select(this.left, (v) => (this.left = v), this.t("compare.from"))}
        <span>→</span>
        ${select(this.right, (v) => (this.right = v), this.t("compare.to"))}
      </div>
      ${this.error ? html`<p class="small">${this.error}</p>` : nothing}
      ${!r ? nothing : r.identical ? html`<div class="finding info"><span>${this.t("compare.identical")}</span></div>` : html`<div class="parts">
        ${this.renderPart(this.t("compare.zones"), r.zones)}
        ${this.renderPart(this.t("compare.beds"), r.beds)}
        ${this.renderPart(this.t("compare.features"), r.features)}
        ${r.plantings.added.length || r.plantings.removed.length || r.plantings.changed.length ? html`<div class="part"><h4>${this.t("compare.crops")}</h4><ul>
          ${r.plantings.added.map((c) => this.crop(c, "+", "add"))}
          ${r.plantings.removed.map((c) => this.crop(c, "−", "del"))}
          ${r.plantings.changed.map((c) => this.crop(c, "~", "chg",
            html`<span class="xs muted">(${c.was_bed && c.was_bed !== c.bed ? `${c.was_bed} → ${c.bed}` : this.what(c.what)})</span>`))}
        </ul></div>` : nothing}
      </div>`}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-plan-compare": PlanCompare;
  }
}
