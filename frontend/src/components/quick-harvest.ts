// Quick harvest on the dashboard: the crops that can be picked now, tap one,
// add the weight with a few big buttons, save. Two taps from the garden path.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant, Planting, Snapshot } from "../types";
import { celebrateAt } from "../util/celebrate";
import { familyColor, plantName } from "../util/garden";

const STEPS = [0.1, 0.25, 0.5, 1];

@customElement("hl-quick-harvest")
export class QuickHarvest extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property({ attribute: false }) plants = new Map<string, Plant>();
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property() lang = "en";
  @state() private picked: Planting | null = null;
  @state() private kg = 0;
  @state() private busy = false;
  @state() private done = "";

  static styles = [
    shared,
    css`
      :host { display: block; }
      .crops { display: flex; flex-wrap: wrap; gap: 8px; }
      .crop { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px 6px 6px; border-radius: 999px; cursor: pointer;
        border: 1px solid var(--hl-border); background: var(--hl-surface); color: var(--hl-text); font: inherit;
        box-shadow: var(--hl-shadow-1); transition: transform var(--hl-dur) var(--hl-ease), box-shadow var(--hl-dur) var(--hl-ease); }
      .crop:hover { transform: translateY(-1px); box-shadow: var(--hl-shadow-2); }
      .crop[aria-pressed="true"] { border-color: var(--hl-primary); background: var(--hl-leaf-50);
        box-shadow: 0 0 0 3px color-mix(in srgb, var(--hl-primary) 18%, transparent); }
      .crop .ic { width: 30px; height: 30px; border-radius: 50%; display: grid; place-items: center; background: var(--hl-surface-2); }
      .crop small { color: var(--hl-text-muted); font-size: 11px; }
      .weigh { margin-top: 14px; padding: 14px; border-radius: 16px; background: var(--hl-surface-2); display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
      .kg { font-family: var(--hl-font-serif); font-size: 34px; font-weight: 700; min-width: 120px; font-variant-numeric: tabular-nums; }
      .kg small { font-family: var(--hl-font); font-size: 14px; font-weight: 600; opacity: 0.7; margin-left: 4px; }
      .step { min-width: 64px; }
      .ok { color: var(--hl-success); font-weight: 600; }
    `,
  ];

  /** Crops that are being harvested, or whose harvest window is open today. */
  private get ready(): Planting[] {
    const a = this.snapshot.analysis;
    if (!a) return [];
    const today = a.today;
    return this.snapshot.plantings
      .filter((p) => {
        if (p.status === "failed" || p.status === "finished") return false;
        if (p.status === "harvesting") return true;
        const tl = a.timelines[p.id];
        return !!tl && tl.harvest_start <= today && today <= tl.harvest_end;
      })
      .sort((x, y) => plantName(this.plants.get(x.plant_id), this.lang).localeCompare(plantName(this.plants.get(y.plant_id), this.lang)));
  }

  private bedName(id: string): string {
    return this.snapshot.beds.find((b) => b.id === id)?.name ?? "";
  }

  private async save(): Promise<void> {
    if (!this.picked || this.kg <= 0) return;
    this.busy = true;
    try {
      await this.api.logHarvest({ planting_id: this.picked.id, kg: Math.round(this.kg * 1000) / 1000 });
      celebrateAt(this.renderRoot.querySelector(".kg"));
      this.done = this.t("quick.saved", { kg: this.kg.toLocaleString(this.lang, { maximumFractionDigits: 2 }), plant: plantName(this.plants.get(this.picked.plant_id), this.lang) });
      this.picked = null;
      this.kg = 0;
    } catch (err) {
      this.done = (err as Error).message;
    } finally {
      this.busy = false;
    }
  }

  render(): TemplateResult | typeof nothing {
    const ready = this.ready;
    if (!ready.length) return html`<p class="small muted">${this.t("quick.none")}</p>`;
    return html`
      <div class="crops" role="group" aria-label=${this.t("quick.title")}>
        ${ready.map((p) => {
          const plant = this.plants.get(p.plant_id);
          return html`<button class="crop" aria-pressed=${String(this.picked?.id === p.id)}
              @click=${() => { this.picked = this.picked?.id === p.id ? null : p; this.kg = 0; this.done = ""; }}>
            <span class="ic">${plant ? glyphIcon(glyphFor(plant), plant.color || familyColor(this.families, plant.family), 20) : nothing}</span>
            <span>${plantName(plant, this.lang) || p.plant_id}<br /><small>${this.bedName(p.bed_id)}</small></span>
          </button>`;
        })}
      </div>
      ${this.picked ? html`<div class="weigh">
        <div class="kg" aria-live="polite">${this.kg.toLocaleString(this.lang, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}<small>kg</small></div>
        ${STEPS.map((s) => html`<button class="btn step" @click=${() => (this.kg = Math.round((this.kg + s) * 100) / 100)}>+${s.toLocaleString(this.lang)}</button>`)}
        <button class="btn ghost small" ?disabled=${!this.kg} @click=${() => (this.kg = 0)}>${this.t("quick.reset")}</button>
        <span class="spacer"></span>
        <button class="btn primary" ?disabled=${this.busy || this.kg <= 0} @click=${() => this.save()}>${this.t("quick.save")}</button>
      </div>` : nothing}
      ${this.done ? html`<p class="small ok" role="status">${this.done}</p>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-quick-harvest": QuickHarvest;
  }
}
