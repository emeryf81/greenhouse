// From the garden to the kitchen: what is ready now, what is piling up (with
// ideas to keep or share), and what the harvest is worth against what the
// garden cost this season.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { Expense, RecordsOverview } from "../types";
import { formatDate, localeOf } from "../util/garden";

const CATEGORIES = ["seeds", "plants", "soil", "fertilizer", "tools", "water", "protection", "other"] as const;

@customElement("hl-kitchen-economy")
export class KitchenEconomy extends LitElement {
  @property({ attribute: false }) overview: RecordsOverview | null = null;
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property() today = "";
  @property({ type: Boolean }) admin = true;
  @state() private busy = false;

  static styles = [
    shared,
    css`
      :host { display: block; }
      .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: var(--hl-s4); }
      ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 10px; }
      li { display: grid; gap: 2px; }
      .money { font-family: var(--hl-font-serif); font-size: 30px; font-weight: 700; line-height: 1.1; font-variant-numeric: tabular-nums; }
      .pos { color: var(--hl-primary); }
      .neg { color: var(--hl-danger); }
      .bars { display: grid; gap: 6px; margin-top: 8px; }
      .bar { height: 14px; border-radius: 7px; }
      .bar.value { background: var(--hl-primary); }
      .bar.cost { background: var(--hl-accent); }
      table { width: 100%; border-collapse: collapse; font-size: var(--hl-fs-sm); }
      td, th { padding: 6px 4px; border-bottom: 1px solid color-mix(in srgb, var(--hl-border) 60%, transparent); text-align: left; }
      .num { text-align: right; font-variant-numeric: tabular-nums; }
    `,
  ];

  private money(v: number): string {
    const cur = this.overview?.economics?.currency ?? "€";
    return `${cur} ${v.toLocaleString(localeOf(this.lang), { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  private async save(ev: Event): Promise<void> {
    ev.preventDefault();
    const form = ev.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const amount = Number(String(data.get("amount") ?? "").replace(",", "."));
    if (!(amount > 0)) return;
    this.busy = true;
    try {
      await this.api.saveExpense({ amount, category: String(data.get("category")), day: String(data.get("day") || this.today), note: String(data.get("note") ?? "") });
      form.reset();
      this.dispatchEvent(new CustomEvent("changed"));
    } finally {
      this.busy = false;
    }
  }

  private async removeExpense(e: Expense): Promise<void> {
    this.busy = true;
    try {
      await this.api.deleteRecord("expense", e.id);
      this.dispatchEvent(new CustomEvent("changed"));
    } finally {
      this.busy = false;
    }
  }

  render(): TemplateResult {
    const o = this.overview;
    const k = o?.kitchen;
    const eco = o?.economics;
    const top = Math.max(eco?.harvest_value ?? 0, eco?.total_cost ?? 0, 0.01);
    return html`<div class="grid">
      <section class="card stack" aria-labelledby="k-ready">
        <h2 id="k-ready"><ha-icon icon="mdi:basket-check-outline"></ha-icon> ${this.t("kitchen.ready")}</h2>
        ${k?.ready.length ? html`<ul>${k.ready.map((r) => html`<li><b>${r.name}</b>
          <span class="xs muted">${r.bed}${r.bed ? " · " : ""}${this.t("kitchen.until", { date: formatDate(r.until, this.lang) })}</span>
          <span class="small">${r.keep}</span></li>`)}</ul>` : html`<p class="small muted">${this.t("kitchen.none_ready")}</p>`}
      </section>
      <section class="card stack" aria-labelledby="k-surplus">
        <h2 id="k-surplus"><ha-icon icon="mdi:fridge-outline"></ha-icon> ${this.t("kitchen.surplus")}</h2>
        <p class="xs muted">${this.t("kitchen.surplus_hint", { kg: k?.picked_week_kg ?? 0, people: k?.people ?? 2 })}</p>
        ${k?.surplus.length ? html`<ul>${k.surplus.map((s) => html`<li><b>${s.name}</b>
          <span class="xs muted">${this.t("kitchen.surplus_amount", { kg: s.kg_week, need: s.need_week })}</span>
          <span class="small">${s.ideas}</span></li>`)}</ul>` : html`<p class="small muted">${this.t("kitchen.no_surplus")}</p>`}
      </section>
      <section class="card stack" aria-labelledby="k-eco">
        <h2 id="k-eco"><ha-icon icon="mdi:scale-balance"></ha-icon> ${this.t("kitchen.economics", { season: eco?.season ?? "" })}</h2>
        ${eco ? html`
          <div class="money ${eco.balance >= 0 ? "pos" : "neg"}">${eco.balance >= 0 ? "+" : "−"}${this.money(Math.abs(eco.balance))}</div>
          <span class="small muted">${this.t(eco.balance >= 0 ? "kitchen.saved" : "kitchen.cost_more")}</span>
          <div class="bars">
            <span class="xs">${this.t("kitchen.value", { kg: eco.harvest_kg })}: <b>${this.money(eco.harvest_value)}</b></span>
            <div class="bar value" style=${`width:${Math.max((eco.harvest_value / top) * 100, 1)}%`}></div>
            <span class="xs">${this.t("kitchen.costs")}: <b>${this.money(eco.total_cost)}</b></span>
            <div class="bar cost" style=${`width:${Math.max((eco.total_cost / top) * 100, 1)}%`}></div>
          </div>
          ${eco.crops.length ? html`<table><tr><th>${this.t("lib.plant")}</th><th class="num">kg</th><th class="num">${this.t("kitchen.price")}</th><th class="num">${this.t("kitchen.worth")}</th></tr>
            ${eco.crops.slice(0, 8).map((c) => html`<tr><td>${c.name}</td><td class="num">${c.kg.toFixed(1)}</td><td class="num">${this.money(c.price)}</td><td class="num">${this.money(c.value)}</td></tr>`)}</table>` : nothing}
          <p class="xs muted">${this.t("kitchen.prices_hint")}</p>` : nothing}
      </section>
      <section class="card stack" aria-labelledby="k-exp">
        <h2 id="k-exp"><ha-icon icon="mdi:receipt-text-outline"></ha-icon> ${this.t("kitchen.expenses")}</h2>
        ${this.admin ? html`<form class="form-grid" @submit=${this.save}>
          <label class="field">${this.t("kitchen.amount")}<input name="amount" type="number" min="0.01" step="0.01" inputmode="decimal" required /></label>
          <label class="field">${this.t("kitchen.category")}<select name="category">${CATEGORIES.map((c) => html`<option value=${c}>${this.t(`kitchen.cat.${c}`)}</option>`)}</select></label>
          <label class="field">${this.t("journal.day")}<input name="day" type="date" .value=${this.today} /></label>
          <label class="field">${this.t("task.notes")}<input name="note" maxlength="200" /></label>
          <div class="row"><button class="btn primary" type="submit" ?disabled=${this.busy}>${this.t("kitchen.add_expense")}</button></div>
        </form>` : nothing}
        ${eco && (Object.keys(eco.expenses).length || eco.water_cost) ? html`<table>
          ${Object.entries(eco.expenses).map(([cat, v]) => html`<tr><td>${this.t(`kitchen.cat.${cat}`)}</td><td class="num">${this.money(v)}</td></tr>`)}
          ${eco.water_cost ? html`<tr><td>${this.t("kitchen.water_meter", { m3: eco.water_m3 ?? 0 })}</td><td class="num">${this.money(eco.water_cost)}</td></tr>` : nothing}
        </table>` : nothing}
        ${o?.expenses?.length ? html`<table>${o.expenses.map((e) => html`<tr><td>${formatDate(e.day, this.lang)}</td><td>${this.t(`kitchen.cat.${e.category}`)}${e.note ? ` · ${e.note}` : ""}</td>
          <td class="num">${this.money(e.amount)}</td><td class="num">${this.admin ? html`<button class="icon-btn" aria-label=${this.t("common.delete")} ?disabled=${this.busy}
            @click=${() => this.removeExpense(e)}><ha-icon icon="mdi:delete-outline"></ha-icon></button>` : nothing}</td></tr>`)}</table>` : html`<p class="small muted">${this.t("kitchen.no_expenses")}</p>`}
      </section>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-kitchen-economy": KitchenEconomy;
  }
}
