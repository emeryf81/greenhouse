import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { Snapshot, Task } from "../types";
import { TASK_COLORS, TASK_ICONS, addDays, formatDate, parseDate, sortTasks, toIso } from "../util/garden";
import { renderTaskRow, taskRowStyles, type TaskCtx } from "../components/task-ui";

type Mode = "month" | "week" | "list";

@customElement("hl-calendar-view")
export class CalendarView extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @state() private mode: Mode = "month";
  @state() private cursor = "";
  @state() private showDone = false;
  @state() private bedFilter = "";

  static styles = [
    shared,
    taskRowStyles,
    css`
      .bar { display: flex; flex-wrap: wrap; align-items: center; gap: var(--hl-s2); margin-bottom: var(--hl-s3); }
      .bar h2 { min-width: 200px; text-transform: capitalize; }
      .month { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 1px; background: var(--hl-border); border: 1px solid var(--hl-border); border-radius: var(--hl-r-lg); overflow: hidden; }
      .dow { background: var(--hl-surface-2); padding: 6px; font-size: var(--hl-fs-xs); font-weight: 600; color: var(--hl-text-muted); text-transform: uppercase; text-align: center; }
      .cell { background: var(--hl-surface); min-height: 108px; padding: 4px; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
      .cell.other { background: var(--hl-surface-2); }
      .cell.other .num { opacity: 0.5; }
      .cell.today { box-shadow: inset 0 0 0 2px var(--hl-primary); }
      .num { font-size: var(--hl-fs-xs); font-weight: 600; color: var(--hl-text-muted); padding: 2px 4px; }
      .ev { display: flex; align-items: center; gap: 4px; border: 0; border-left: 3px solid; background: var(--hl-surface-2); border-radius: 4px;
        padding: 2px 4px; font-size: 11px; text-align: left; cursor: pointer; color: var(--hl-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; width: 100%; --mdc-icon-size: 12px; }
      .ev:hover { background: var(--hl-surface-3); }
      .ev.done { opacity: 0.55; text-decoration: line-through; }
      .ev.overdue { background: var(--hl-tomato-100); }
      .more { font-size: 11px; color: var(--hl-text-muted); border: 0; background: transparent; cursor: pointer; text-align: left; padding: 0 4px; }
      .week { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: var(--hl-s2); }
      .week .col { background: var(--hl-surface); border: 1px solid var(--hl-border); border-radius: var(--hl-r-md); padding: var(--hl-s2); min-height: 260px; display: flex; flex-direction: column; gap: 4px; }
      .week .col.today { border-color: var(--hl-primary); }
      .week .ev { white-space: normal; }
      @media (max-width: 900px) {
        .week { grid-template-columns: 1fr; }
        .cell { min-height: 64px; }
        .ev span { display: none; }
      }
      .group h3 { margin: var(--hl-s3) 0 var(--hl-s1); font-size: var(--hl-fs-md); }
    `,
  ];

  protected willUpdate(): void {
    // Start on the garden's "today" (server time zone), not the browser's.
    if (!this.cursor) this.cursor = this.today;
  }

  private emit(name: string, detail: unknown): void {
    this.dispatchEvent(new CustomEvent(name, { detail, bubbles: true, composed: true }));
  }

  private get today(): string {
    return this.snapshot.analysis?.today ?? toIso(new Date());
  }

  private get tasks(): Task[] {
    return this.snapshot.tasks.filter(
      (t) => (this.showDone || t.status === "open") && t.status !== "skipped" && (!this.bedFilter || t.bed_id === this.bedFilter),
    );
  }

  private byDay(): Map<string, Task[]> {
    const map = new Map<string, Task[]>();
    for (const task of sortTasks(this.tasks)) {
      // Overdue open tasks are shown on today so nothing gets lost in the past.
      const day = task.status === "open" && task.due < this.today ? this.today : task.due;
      map.set(day, [...(map.get(day) ?? []), task]);
    }
    return map;
  }

  private move(dir: -1 | 1): void {
    const d = parseDate(this.cursor);
    if (this.mode === "month") d.setMonth(d.getMonth() + dir, 1);
    else d.setDate(d.getDate() + dir * (this.mode === "week" ? 7 : 30));
    this.cursor = toIso(d);
  }

  private weekStart(iso: string): string {
    const d = parseDate(iso);
    const offset = (d.getDay() + 6) % 7; // Monday first (ISO 8601)
    return addDays(iso, -offset);
  }

  private renderEvent(task: Task): TemplateResult {
    const overdue = task.status === "open" && task.due < this.today;
    return html`<button class="ev ${task.status !== "open" ? "done" : ""} ${overdue ? "overdue" : ""}" style=${`border-left-color:${TASK_COLORS[task.type] ?? "var(--hl-soil-500)"}`}
      title=${task.title} @click=${() => this.emit("open-task", task)}>
      <ha-icon icon=${TASK_ICONS[task.type]}></ha-icon><span>${task.title}</span></button>`;
  }

  private renderMonth(): TemplateResult {
    const first = parseDate(this.cursor);
    first.setDate(1);
    const start = this.weekStart(toIso(first));
    const month = first.getMonth();
    const days = Array.from({ length: 42 }, (_, i) => addDays(start, i));
    const map = this.byDay();
    const dows = Array.from({ length: 7 }, (_, i) => formatDate(addDays(start, i), this.lang, { weekday: "short" }));
    return html`<div class="month" role="grid">
      ${dows.map((d) => html`<div class="dow" role="columnheader">${d}</div>`)}
      ${days.map((day) => {
        const list = map.get(day) ?? [];
        return html`<div class="cell ${parseDate(day).getMonth() !== month ? "other" : ""} ${day === this.today ? "today" : ""}" role="gridcell" aria-label=${formatDate(day, this.lang, { day: "numeric", month: "long" })}>
          <span class="num">${parseDate(day).getDate()}</span>
          ${list.slice(0, 4).map((task) => this.renderEvent(task))}
          ${list.length > 4 ? html`<button class="more" @click=${() => { this.cursor = day; this.mode = "week"; }}>+${list.length - 4}</button>` : nothing}
        </div>`;
      })}
    </div>`;
  }

  private renderWeek(): TemplateResult {
    const start = this.weekStart(this.cursor);
    const map = this.byDay();
    return html`<div class="week">
      ${Array.from({ length: 7 }, (_, i) => addDays(start, i)).map((day) => html`
        <div class="col ${day === this.today ? "today" : ""}">
          <b class="small">${formatDate(day, this.lang, { weekday: "long", day: "numeric", month: "short" })}</b>
          ${(map.get(day) ?? []).map((task) => this.renderEvent(task))}
        </div>`)}
    </div>`;
  }

  private renderList(): TemplateResult {
    const ctx: TaskCtx = {
      t: this.t, lang: this.lang, today: this.today,
      onOpen: (task) => this.emit("open-task", task),
      onComplete: (task) => this.emit("complete-task", task),
    };
    const map = this.byDay();
    const days = [...map.keys()].filter((d) => d >= this.cursor).sort().slice(0, 30);
    if (!days.length) return html`<p class="empty">–</p>`;
    return html`${days.map((day) => html`<div class="group">
      <h3>${day === this.today ? this.t("common.today") : formatDate(day, this.lang, { weekday: "long", day: "numeric", month: "long" })}</h3>
      <ul class="tasks">${map.get(day)!.map((task) => renderTaskRow(task, ctx))}</ul></div>`)}`;
  }

  render(): TemplateResult {
    const title =
      this.mode === "month"
        ? formatDate(this.cursor, this.lang, { month: "long", year: "numeric" })
        : `${formatDate(this.weekStart(this.cursor), this.lang)} – ${formatDate(addDays(this.weekStart(this.cursor), 6), this.lang)}`;
    return html`
      <div class="bar">
        <button class="icon-btn" aria-label=${this.t("cal.prev")} @click=${() => this.move(-1)}><ha-icon icon="mdi:chevron-left"></ha-icon></button>
        <button class="btn small" @click=${() => (this.cursor = this.today)}>${this.t("common.today")}</button>
        <button class="icon-btn" aria-label=${this.t("cal.next")} @click=${() => this.move(1)}><ha-icon icon="mdi:chevron-right"></ha-icon></button>
        <h2 aria-live="polite">${title}</h2>
        <span class="spacer"></span>
        <div class="row" role="group">
          ${(["month", "week", "list"] as Mode[]).map((m) => html`<button class="chip" aria-pressed=${String(this.mode === m)} @click=${() => (this.mode = m)}>${this.t(`cal.${m}`)}</button>`)}
        </div>
        <select style="width:auto" aria-label=${this.t("task.bed")} @change=${(e: Event) => (this.bedFilter = (e.target as HTMLSelectElement).value)}>
          <option value="">${this.t("cal.all_beds")}</option>
          ${this.snapshot.beds.map((b) => html`<option value=${b.id}>${b.name}</option>`)}
        </select>
        <label class="row small"><input type="checkbox" .checked=${this.showDone} @change=${(e: Event) => (this.showDone = (e.target as HTMLInputElement).checked)} />${this.t("cal.show_done")}</label>
        <button class="btn primary small" @click=${() => this.emit("new-task", null)}><ha-icon icon="mdi:plus"></ha-icon>${this.t("cal.add_task")}</button>
      </div>
      ${this.mode === "month" ? this.renderMonth() : this.mode === "week" ? this.renderWeek() : this.renderList()}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-calendar-view": CalendarView;
  }
}
