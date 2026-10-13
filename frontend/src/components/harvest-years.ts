// Harvest over the years: the total per season (best year in gold) and, per
// crop, a row of small bars so good and bad years stand out at a glance.
import { LitElement, css, html, nothing, svg, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { Translate } from "../i18n";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { shared } from "../styles/tokens";
import type { FamilyInfo, Plant } from "../types";
import { familyColor, plantName } from "../util/garden";

@customElement("hl-harvest-years")
export class HarvestYears extends LitElement {
  @property({ attribute: false }) years: Record<string, Record<string, number>> = {};
  @property({ attribute: false }) plants = new Map<string, Plant>();
  @property({ attribute: false }) families: Record<string, FamilyInfo> = {};
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";

  static styles = [
    shared,
    css`
      :host { display: block; }
      svg.total { width: 100%; max-width: 760px; height: auto; display: block; margin: 0 auto; }
      .rows { display: flex; flex-direction: column; gap: 6px; margin-top: 14px; }
      .row { display: grid; grid-template-columns: 28px 140px 1fr 70px; gap: 10px; align-items: center; }
      .name { font-weight: 600; font-size: var(--hl-fs-sm); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .bars { display: grid; gap: 4px; align-items: end; height: 34px; }
      .bars span { display: block; border-radius: 4px 4px 1px 1px; background: color-mix(in srgb, var(--hl-primary) 55%, transparent); min-height: 2px; position: relative; }
      .bars span.best { background: var(--hl-accent); }
      .bars span.none { background: var(--hl-surface-3); }
      .sum { text-align: right; font-variant-numeric: tabular-nums; font-size: var(--hl-fs-sm); }
      .sum small { display: block; color: var(--hl-text-muted); font-size: 11px; }
      .legend { display: flex; gap: 14px; font-size: 11px; color: var(--hl-text-muted); margin-top: 8px; }
      .legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 4px; vertical-align: -1px; }
      @media (max-width: 600px) { .row { grid-template-columns: 24px 90px 1fr 56px; } }
    `,
  ];

  render(): TemplateResult | typeof nothing {
    const crops = Object.entries(this.years);
    const seasons = [...new Set(crops.flatMap(([, y]) => Object.keys(y)))].sort();
    if (seasons.length < 2) return html`<p class="small muted">${this.t("harvest.years_few")}</p>`;
    const totals = seasons.map((s) => crops.reduce((a, [, y]) => a + (y[s] ?? 0), 0));
    const best = totals.indexOf(Math.max(...totals));
    const W = 640, H = 170, L = 8, R = 8, T = 24, B = 26;
    const bw = (W - L - R) / seasons.length;
    const max = Math.max(...totals, 0.1);
    const rows = crops
      .map(([pid, y]) => ({ pid, y, total: Object.values(y).reduce((a, b) => a + b, 0) }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 10);
    return html`
      <svg class="total" viewBox="0 0 ${W} ${H}" role="img" aria-label=${this.t("harvest.years_title")}>
        ${seasons.map((s, i) => {
          const h = (totals[i] / max) * (H - T - B);
          const x = L + i * bw + bw * 0.18;
          return svg`<rect x=${x} y=${H - B - h} width=${bw * 0.64} height=${h} rx="6"
              fill=${i === best ? "var(--hl-accent)" : "color-mix(in srgb, var(--hl-primary) 70%, transparent)"}><title>${s}: ${totals[i].toFixed(1)} kg</title></rect>
            <text x=${x + bw * 0.32} y=${H - B - h - 7} text-anchor="middle" font-size="13" font-weight="700" fill="currentColor"
              font-family="var(--hl-font-serif)">${totals[i].toFixed(totals[i] < 10 ? 1 : 0)}</text>
            <text x=${x + bw * 0.32} y=${H - 8} text-anchor="middle" font-size="12" fill="var(--hl-text-muted)">${s}${i === best ? " ★" : ""}</text>`;
        })}
      </svg>
      <div class="rows">
        ${rows.map(({ pid, y, total }) => {
          const plant = this.plants.get(pid);
          const vals = seasons.map((s) => y[s] ?? 0);
          const top = Math.max(...vals, 0.01);
          const bestI = vals.indexOf(top);
          return html`<div class="row">
            <span>${plant ? glyphIcon(glyphFor(plant), plant.color || familyColor(this.families, plant.family), 22) : nothing}</span>
            <span class="name">${plantName(plant, this.lang) || pid}</span>
            <span class="bars" style=${`grid-template-columns: repeat(${seasons.length}, 1fr)`}>
              ${vals.map((v, i) => html`<span class=${v === 0 ? "none" : i === bestI ? "best" : ""} style=${`height:${Math.max(6, (v / top) * 100)}%`}
                title=${`${seasons[i]}: ${v.toFixed(1)} kg`}></span>`)}
            </span>
            <span class="sum"><b>${total.toFixed(1)} kg</b><small>${this.t("harvest.best_year", { year: seasons[bestI] })}</small></span>
          </div>`;
        })}
      </div>
      <div class="legend"><span><i style="background:var(--hl-accent)"></i>${this.t("harvest.legend_best")}</span>
        <span><i style="background:color-mix(in srgb, var(--hl-primary) 55%, transparent)"></i>${this.t("harvest.legend_other")}</span></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-harvest-years": HarvestYears;
  }
}
