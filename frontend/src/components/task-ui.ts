import { toolsFor } from "../util/tools";
import { celebrateAt } from "../util/celebrate";
import { GARDEN_ICONS, gicon } from "./garden-icons";
import { personName, persons } from "../util/people";
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { photoUrl, type GardenApi } from "../api";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { Bed, FamilyInfo, Plant, Priority, Snapshot, Task, TaskType } from "../types";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import "./info";
import "./date-input";
import { TASK_COLORS, TASK_ICONS, addDays, familyColor, formatDate } from "../util/garden";

export interface TaskCtx {
  t: Translate;
  lang: string;
  today: string;
  onOpen: (task: Task) => void;
  onComplete: (task: Task) => void;
  /** Optional: enables swipe-left to postpone by a day on touch screens. */
  onPostpone?: (task: Task, days: number) => void;
  /** Optional: the crop a task is about, shown as its plant icon. */
  plantOf?: (task: Task) => { plant: Plant; color: string } | null;
}

/** ``plantOf`` for a task context: the task's planting, or the plant named in its title. */
export function taskPlantResolver(snapshot: Snapshot | undefined, plants: Map<string, Plant>, families: Record<string, FamilyInfo>) {
  return (task: Task): { plant: Plant; color: string } | null => {
    const planting = task.planting_id ? snapshot?.plantings.find((p) => p.id === task.planting_id) : undefined;
    const id = planting?.plant_id ?? (task.title_params?.plant_id as string | undefined);
    const plant = id ? plants.get(id) : undefined;
    return plant ? { plant, color: plant.color || familyColor(families, plant.family) } : null;
  };
}

// -- swipe actions (touch / pen only, mouse keeps normal clicks) -------------
const SWIPE_THRESHOLD = 80;
interface SwipeState { x: number; y: number; dx: number; active: boolean; id: number }
const swipes = new WeakMap<HTMLElement, SwipeState>();

function swipeDown(ev: PointerEvent): void {
  if (ev.pointerType === "mouse") return;
  swipes.set(ev.currentTarget as HTMLElement, { x: ev.clientX, y: ev.clientY, dx: 0, active: false, id: ev.pointerId });
}

function swipeMove(ev: PointerEvent): void {
  const el = ev.currentTarget as HTMLElement;
  const st = swipes.get(el);
  if (!st || st.id !== ev.pointerId) return;
  const dx = ev.clientX - st.x;
  const dy = ev.clientY - st.y;
  if (!st.active && Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.5) {
    st.active = true;
    el.setPointerCapture(ev.pointerId);
  }
  if (!st.active) return;
  st.dx = dx;
  el.style.transform = `translateX(${Math.max(-140, Math.min(140, dx))}px)`;
  el.dataset.swipe = dx > SWIPE_THRESHOLD ? "complete" : dx < -SWIPE_THRESHOLD ? "postpone" : "";
}

function swipeEnd(ev: PointerEvent, task: Task, ctx: TaskCtx): void {
  const el = ev.currentTarget as HTMLElement;
  const st = swipes.get(el);
  swipes.delete(el);
  el.style.transform = "";
  delete el.dataset.swipe;
  if (!st?.active) return;
  ev.preventDefault();
  if (st.dx > SWIPE_THRESHOLD && task.status === "open") {
    celebrateAt(el);
    ctx.onComplete(task);
  } else if (st.dx < -SWIPE_THRESHOLD && task.status === "open" && ctx.onPostpone) ctx.onPostpone(task, 1);
}

/** Compact, accessible task row used on the dashboard and in list views. */
export function renderTaskRow(task: Task, ctx: TaskCtx): TemplateResult {
  const overdue = task.status === "open" && task.due < ctx.today;
  const done = task.status !== "open";
  const color = TASK_COLORS[task.type] ?? "var(--hl-soil-500)";
  const crop = ctx.plantOf?.(task) ?? null;
  return html`
    <li class="task-row ${done ? "done" : ""} prio-${task.priority}" @pointerdown=${swipeDown} @pointermove=${swipeMove}
      @pointerup=${(e: PointerEvent) => swipeEnd(e, task, ctx)} @pointercancel=${(e: PointerEvent) => swipeEnd(e, task, ctx)}>
      <button class="check" role="checkbox" aria-checked=${String(done)} aria-label=${`${ctx.t("task.complete")}: ${task.title}`}
        ?disabled=${done} @click=${(e: Event) => { celebrateAt(e.currentTarget as Element); ctx.onComplete(task); }}>
        <ha-icon icon=${done ? "mdi:check-circle" : "mdi:checkbox-blank-circle-outline"}></ha-icon>
      </button>
      <button class="task-main" @click=${() => ctx.onOpen(task)}>
        ${crop ? html`<span class="type-icon crop" title=${ctx.t(`type.${task.type}`)}>${glyphIcon(glyphFor(crop.plant), crop.color, 24)}
          <span class="type-badge" style=${`background:${color}`}>${gicon(GARDEN_ICONS[task.type] ? task.type : TASK_ICONS[task.type], 11)}</span></span>`
          : html`<span class="type-icon" style=${`color:${color}`}>${gicon(GARDEN_ICONS[task.type] ? task.type : TASK_ICONS[task.type], 21)}</span>`}
        <span class="task-text">
          <span class="task-title">${task.title}</span>
          <span class="task-meta">
            ${overdue ? html`<span class="chip bad">${ctx.t("common.overdue")} · ${formatDate(task.due, ctx.lang)}</span>` : html`<span>${formatDate(task.due, ctx.lang, { weekday: "short", day: "numeric", month: "short" })}</span>`}
            <span>· ${ctx.t("common.minutes", { n: task.estimated_minutes })}</span>
            ${task.recurrence ? html`<span title=${ctx.t("task.repeat", { n: task.recurrence.interval_days })}>· ↻ ${task.recurrence.interval_days}d</span>` : nothing}
            ${task.priority === "urgent" || task.priority === "high" ? html`<span class="chip ${task.priority === "urgent" ? "bad" : "warn"}">${ctx.t(`priority.${task.priority}`)}</span>` : nothing}
            ${task.assignee ? html`<span class="chip" title=${ctx.t("task.assignee")}><ha-icon icon="mdi:account-outline" style="--mdc-icon-size:14px"></ha-icon>${personName(task.assignee)}</span>` : nothing}
          </span>
        </span>
      </button>
    </li>`;
}

export const taskRowStyles = css`
  ul.tasks { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  ul.tasks > li + li .task-row, ul.tasks > .task-row + .task-row { border-top: 1px solid color-mix(in srgb, var(--hl-border) 55%, transparent); }
  .task-row { position: relative; display: flex; align-items: center; gap: var(--hl-s1); border-radius: var(--hl-r-md); touch-action: pan-y;
    transition: transform 0.15s ease-out, background var(--hl-dur) var(--hl-ease); background: var(--hl-surface); padding-left: 6px; }
  .task-row[data-swipe="complete"] { background: var(--hl-leaf-100); }
  .task-row[data-swipe="postpone"] { background: var(--hl-sun-100); }
  .task-row:hover { background: var(--hl-surface-2); }
  .task-row.done .task-title { text-decoration: line-through; color: var(--hl-text-muted); }
  .task-row.prio-urgent::before, .task-row.prio-high::before { content: ""; position: absolute; left: 0; top: 12px; bottom: 12px; width: 3px; border-radius: 3px; }
  .task-row.prio-urgent::before { background: var(--hl-danger); }
  .task-row.prio-high::before { background: var(--hl-warning); }
  .check { border: 0; background: transparent; color: var(--hl-primary); cursor: pointer; width: 40px; height: 40px; display: grid; place-items: center; border-radius: 50%; --mdc-icon-size: 22px; }
  .check:hover:not([disabled]) { background: var(--hl-leaf-100); }
  .task-main { flex: 1; display: flex; align-items: center; gap: var(--hl-s2); border: 0; background: transparent; text-align: left; cursor: pointer; padding: 6px 4px; color: var(--hl-text); min-width: 0; }
  .type-icon { --mdc-icon-size: 20px; flex: none; }
  .type-icon.crop { position: relative; width: 28px; height: 28px; display: grid; place-items: center; }
  .type-badge { position: absolute; right: -4px; bottom: -4px; width: 15px; height: 15px; border-radius: 50%; display: grid; place-items: center;
    color: #fff; --mdc-icon-size: 10px; box-shadow: 0 0 0 2px var(--hl-surface); }
  .task-text { display: flex; flex-direction: column; min-width: 0; }
  .task-title { font-weight: 500; overflow: hidden; text-overflow: ellipsis; }
  .task-meta { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; font-size: var(--hl-fs-xs); color: var(--hl-text-muted); }
`;

/** Modal dialog to complete / postpone / annotate a task, or create a new one. */
@customElement("hl-task-dialog")
export class TaskDialog extends LitElement {
  @property({ attribute: false }) task: Task | null = null;
  @property({ attribute: false }) beds: Bed[] = [];
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property() today = "";
  @property({ type: Boolean }) create = false;
  @property({ attribute: false }) snapshot: Snapshot | null = null;
  @state() private note = "";
  @state() private harvestKg = 0;
  @state() private harvestCount = 0;
  @state() private photos: string[] = [];
  @state() private busy = false;
  @state() private error = "";

  static styles = [
    shared,
    css`
      dialog { border: none; border-radius: var(--hl-r-lg); padding: 0; width: min(560px, calc(100vw - 32px)); background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-3); }
      dialog::backdrop { background: rgba(20, 24, 18, 0.45); }
      .head { padding: var(--hl-s4) var(--hl-s5); border-bottom: 1px solid var(--hl-border); display: flex; gap: var(--hl-s3); align-items: flex-start; }
      .body { padding: var(--hl-s4) var(--hl-s5); display: flex; flex-direction: column; gap: var(--hl-s3); max-height: 60vh; overflow: auto; }
      .foot { padding: var(--hl-s3) var(--hl-s5); border-top: 1px solid var(--hl-border); display: flex; gap: var(--hl-s2); flex-wrap: wrap; justify-content: flex-end; }
      .photos { display: flex; gap: var(--hl-s2); flex-wrap: wrap; }
      .photos img { width: 72px; height: 72px; object-fit: cover; border-radius: var(--hl-r-sm); border: 1px solid var(--hl-border); }
      .note { font-size: var(--hl-fs-sm); padding: 6px 8px; background: var(--hl-surface-2); border-radius: var(--hl-r-sm); }
      .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--hl-s2) var(--hl-s3); }
      .form-grid .full { grid-column: 1 / -1; }
      .big-icon { --mdc-icon-size: 28px; }
      .context { display: grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 6px; }
      .ctx { background: var(--hl-surface-2); border-radius: var(--hl-r-sm); padding: 6px 8px; font-size: var(--hl-fs-xs); color: var(--hl-text-muted);
        display: flex; flex-direction: column; gap: 2px; }
      .ctx b { font-size: var(--hl-fs-sm); color: var(--hl-text); }
    `,
  ];

  protected updated(): void {
    const dialog = this.renderRoot.querySelector("dialog");
    if (dialog && !dialog.open && (this.task || this.create)) dialog.showModal();
  }

  private close(changed = false): void {
    this.note = "";
    this.photos = [];
    this.error = "";
    this.dispatchEvent(new CustomEvent("closed", { detail: { changed } }));
  }

  private async run(fn: () => Promise<unknown>, message?: string): Promise<void> {
    this.busy = true;
    try {
      await fn();
      if (message) this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message }, bubbles: true, composed: true }));
      this.close(true);
    } catch (err) {
      this.error = (err as Error).message ?? String(err);
    } finally {
      this.busy = false;
    }
  }

  private async onPhoto(ev: Event): Promise<void> {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.busy = true;
    try {
      this.photos = [...this.photos, await this.api.uploadPhoto(file)];
    } catch (err) {
      this.error = (err as Error).message;
    } finally {
      this.busy = false;
    }
  }

  private submitNew(ev: Event): void {
    ev.preventDefault();
    const f = ev.target as HTMLFormElement;
    const val = (name: string) => (f.elements.namedItem(name) as HTMLInputElement).value;
    this.run(
      () => this.api.addTask({
        title: val("title"),
        due: val("due") || null,
        task_type: val("type"),
        description: val("description"),
        priority: val("priority"),
        estimated_minutes: Number(val("minutes")) || null,
        bed_id: val("bed") || null,
        recurrence_days: Number(val("repeat")) || null,
      }),
    );
  }

  private renderCreate(): TemplateResult {
    const types: TaskType[] = ["custom", "water", "weed", "feed", "pest_check", "harvest", "prune", "stake", "sow_direct", "transplant", "ventilate", "frost_protect"];
    return html`<form @submit=${this.submitNew}>
      <div class="head"><ha-icon class="big-icon" icon="mdi:clipboard-plus-outline"></ha-icon><h2>${this.t("cal.add_task")}</h2></div>
      <div class="body">
        <div class="form-grid">
          <label class="field full">${this.t("task.title")}<input name="title" required autofocus /></label>
          <label class="field">${this.t("task.due")}<hl-date-input name="due" .value=${this.today} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}></hl-date-input></label>
          <label class="field">${this.t("task.type")}<select name="type">${types.map((ty) => html`<option value=${ty}>${this.t(`type.${ty}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.priority")}<select name="priority">${(["low", "normal", "high", "urgent"] as Priority[]).map((p) => html`<option value=${p} ?selected=${p === "normal"}>${this.t(`priority.${p}`)}</option>`)}</select></label>
          <label class="field">${this.t("task.duration")}<input name="minutes" type="number" min="1" value="15" /></label>
          <label class="field">${this.t("task.bed")}<select name="bed"><option value="">–</option>${this.beds.map((b) => html`<option value=${b.id}>${b.name}</option>`)}</select></label>
          <label class="field">${this.t("task.repeat_days")}<input name="repeat" type="number" min="1" max="365" /></label>
          <label class="field full">${this.t("task.description")}<textarea name="description" rows="3"></textarea></label>
        </div>
        ${this.error ? html`<p class="field-error">${this.error}</p>` : nothing}
      </div>
      <div class="foot">
        <button type="button" class="btn ghost" @click=${() => this.close()}>${this.t("common.cancel")}</button>
        <button class="btn primary" type="submit" ?disabled=${this.busy}>${this.t("common.add")}</button>
      </div>
    </form>`;
  }

  /** Live sensor / weather context so the gardener can judge the task on the spot. */
  private renderContext(task: Task): TemplateResult | typeof nothing {
    const a = this.snapshot?.analysis;
    if (!a) return nothing;
    const items: [string, string][] = [];
    const bed = task.bed_id ? a.beds[task.bed_id] : undefined;
    const zoneId = task.zone_id ?? this.snapshot?.beds.find((b) => b.id === task.bed_id)?.zone_id;
    const zone = zoneId ? a.zones[zoneId] : undefined;
    const num = (v: number | null | undefined, unit: string, digits = 0) => (v == null ? null : `${v.toFixed(digits)} ${unit}`);
    if (bed) {
      const m = num(bed.irrigation.moisture, "%");
      if (m) items.push([this.t("ctx.moisture"), m]);
      const st = bed.sensors?.soil_temperature?.value;
      if (st != null) items.push([this.t("ctx.soil_temp"), `${st.toFixed(1)} °C`]);
      if (bed.irrigation.action !== "none") items.push([this.t("ctx.irrigation"), this.t(`irrigation.${bed.irrigation.action}`, { mm: bed.irrigation.amount_mm, liters: Math.round(bed.irrigation.liters) })]);
      if (bed.depletion_mm != null && bed.taw_mm) items.push([this.t("ctx.water_balance"), `${bed.depletion_mm.toFixed(0)} / ${bed.taw_mm.toFixed(0)} mm`]);
      if (bed.nutrients?.index != null) items.push([this.t("ctx.nutrients"), `${bed.nutrients.index} / 100`]);
    }
    if (zone) {
      if (zone.air_temperature != null) items.push([this.t("ctx.air_temp"), `${zone.air_temperature.toFixed(1)} °C`]);
      if (zone.humidity != null) items.push([this.t("ctx.humidity"), `${Math.round(zone.humidity)} %`]);
      if (zone.disease && zone.disease.level !== "unknown") items.push([this.t("ctx.disease"), this.t(`risk.${zone.disease.level}`)]);
      if (zone.frost.level !== "unknown") items.push([this.t("ctx.frost"), `${this.t(`risk.${zone.frost.level}`)}${zone.frost.plant_level_min_c != null ? ` · ${zone.frost.plant_level_min_c.toFixed(1)} °C` : ""}`]);
    }
    const today = a.outlook[0];
    if (today) {
      if (today.tmin != null && today.tmax != null) items.push([this.t("ctx.today"), `${today.tmin.toFixed(0)}–${today.tmax.toFixed(0)} °C`]);
      items.push([this.t("ctx.rain"), `${today.rain_mm.toFixed(1)} mm`]);
      if (today.et0_mm != null) items.push([this.t("ctx.et0"), `${today.et0_mm.toFixed(1)} mm`]);
    }
    if (!items.length) return nothing;
    return html`<h4>${this.t("ctx.title")}</h4><div class="context">${items.map(([k, v]) => html`<div class="ctx">${k}<b>${v}</b></div>`)}</div>`;
  }

  private renderTask(task: Task): TemplateResult {
    const open = task.status === "open";
    const act = (action: "complete" | "skip" | "reopen" | "delete", message?: string) =>
      // complete/skip append to the task's photos server-side: send only the new uploads.
      this.run(async () => {
        if (action === "complete" && task.type === "harvest" && (this.harvestKg > 0 || this.harvestCount > 0)) {
          const planting = this.snapshot?.plantings.find((p) => p.id === task.planting_id);
          await this.api.logHarvest({ planting_id: task.planting_id, plant_id: planting ? null : task.title_params?.plant_id as string | undefined,
            kg: this.harvestKg, count: this.harvestCount || null, note: this.note || "" });
        }
        await this.api.taskAction(task.id, action, { note: this.note || undefined, photos: this.photos.length ? [...this.photos] : undefined });
      }, message);
    const postpone = (days?: number, to?: string) =>
      this.run(async () => {
        const res = await this.api.taskAction(task.id, "postpone", { days, to, note: this.note || undefined });
        const msgs = [];
        if (res.shifted?.length) msgs.push(this.t("task.shifted", { n: res.shifted.length }));
        if (res.warnings?.includes("beyond_window")) msgs.push(this.t("task.beyond_window"));
        if (msgs.length) this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message: msgs.join(" ") }, bubbles: true, composed: true }));
      });
    return html`
      <div class="head">
        <span class="big-icon" style=${`color:${TASK_COLORS[task.type] ?? "inherit"}`}>${gicon(GARDEN_ICONS[task.type] ? task.type : TASK_ICONS[task.type], 36)}</span>
        <div class="stack" style="gap:4px">
          <h2>${task.title}</h2>
          <div class="row wrap small muted">
            <span>${this.t("task.due")}: <b>${formatDate(task.due, this.lang, { weekday: "long", day: "numeric", month: "long" })}</b></span>
            <span class="chip">${this.t(`type.${task.type}`)}</span>
            <span class="chip">${this.t(`task.source.${task.source}`)}</span>
          </div>
        </div>
      </div>
      <div class="body">
        ${task.description ? html`<p>${task.description}</p>` : nothing}
        ${task.title_params?.handbook ? html`<a class="small" href="#" @click=${(e: Event) => { e.preventDefault();
          this.dispatchEvent(new CustomEvent("open-handbook", { detail: { chapter: task.title_params.handbook }, bubbles: true, composed: true }));
          this.close(); }}><ha-icon icon="mdi:book-open-page-variant-outline" style="--mdc-icon-size:16px"></ha-icon> ${this.t("handbook.read_more")}</a>` : nothing}
        ${this.renderContext(task)}
        ${toolsFor(task.type) ? html`<p class="small"><ha-icon icon="mdi:toolbox-outline" style="--mdc-icon-size:16px"></ha-icon>
          <b>${this.t("task.tools")}:</b> ${toolsFor(task.type)}</p>` : nothing}
        ${task.window_start && task.window_end && task.window_start !== task.window_end
          ? html`<p class="small muted">${this.t("task.window", { start: formatDate(task.window_start, this.lang), end: formatDate(task.window_end, this.lang) })}</p>` : nothing}
        ${task.recurrence ? html`<p class="small muted">↻ ${this.t("task.repeat", { n: task.recurrence.interval_days })}</p>` : nothing}
        ${persons().length ? html`<label class="row small">${this.t("task.assignee")}:
          <select @change=${(e: Event) => this.run(() => this.api.taskAction(task.id, "update", { changes: { assignee: (e.target as HTMLSelectElement).value || null } }))}>
            <option value="" ?selected=${!task.assignee}>${this.t("task.anyone")}</option>
            ${persons().map((p) => html`<option value=${p.id} ?selected=${task.assignee === p.id}>${p.name}</option>`)}
          </select></label>` : nothing}
        ${open && task.type === "harvest" ? html`<div class="row wrap small harvest-log">
          <ha-icon icon="mdi:scale" style="--mdc-icon-size:18px"></ha-icon>${this.t("task.harvested")}
          <input type="number" min="0" step="0.05" inputmode="decimal" style="width:90px" placeholder="kg"
            @input=${(e: Event) => (this.harvestKg = Number((e.target as HTMLInputElement).value) || 0)} /> kg
          <input type="number" min="0" step="1" inputmode="numeric" style="width:80px" placeholder="#"
            @input=${(e: Event) => (this.harvestCount = Number((e.target as HTMLInputElement).value) || 0)} /> ×</div>` : nothing}
        <div class="row wrap small">
          <span>${this.t("task.priority")}:</span>
          ${(["low", "normal", "high", "urgent"] as Priority[]).map((p) => html`
            <button class="chip" aria-pressed=${String(task.priority === p)}
              @click=${() => this.run(() => this.api.taskAction(task.id, "update", { changes: { priority: p } }))}>${this.t(`priority.${p}`)}</button>`)}
        </div>
        ${task.notes.length ? html`<h4>${this.t("task.notes")}</h4>${task.notes.map((n) => html`<p class="note"><span class="xs muted">${formatDate(n.at.slice(0, 10), this.lang)}</span> ${n.text}</p>`)}` : nothing}
        ${task.photos.length || this.photos.length ? html`<h4>${this.t("task.photos")}</h4>
          <div class="photos">${[...task.photos, ...this.photos].map((id) => html`<a href=${photoUrl(id, "original")} target="_blank" rel="noopener"><img src=${photoUrl(id)} alt=${this.t("task.photos")} loading="lazy" /></a>`)}</div>` : nothing}
        <label class="field">${this.t("task.note")}<textarea rows="2" .value=${this.note} @input=${(e: Event) => (this.note = (e.target as HTMLTextAreaElement).value)}></textarea></label>
        <label class="btn small" style="align-self:flex-start"><ha-icon icon="mdi:camera-plus-outline"></ha-icon>${this.t("task.add_photo")}
          <input type="file" accept="image/*" capture="environment" class="visually-hidden" @change=${this.onPhoto} /></label>
        ${open ? html`
          <div class="row wrap">
            <span class="small">${this.t("task.postpone")}:</span>
            <button class="btn small" ?disabled=${this.busy} @click=${() => postpone(1)}>${this.t("task.postpone_1")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${() => postpone(3)}>${this.t("task.postpone_3")}</button>
            <button class="btn small" ?disabled=${this.busy} @click=${() => postpone(7)}>${this.t("task.postpone_7")}</button>
            <hl-date-input label=${this.t("task.postpone_to")} min=${addDays(this.today, 1)} lang=${this.lang} pickLabel=${this.t("crops.pick_date")}
              @date-change=${(e: CustomEvent<string | null>) => e.detail && postpone(undefined, e.detail)}></hl-date-input>
          </div>` : nothing}
        ${this.error ? html`<p class="field-error" role="alert">${this.error}</p>` : nothing}
      </div>
      <div class="foot">
        ${task.source === "user" ? html`<button class="btn danger" ?disabled=${this.busy} @click=${() => act("delete")}>${this.t("common.delete")}</button>` : nothing}
        <span class="spacer"></span>
        <button class="btn ghost" @click=${() => this.close()}>${this.t("common.close")}</button>
        ${open
          ? html`<button class="btn" ?disabled=${this.busy} @click=${() => act("skip")}>${this.t("task.skip")}</button>
              <button class="btn primary" ?disabled=${this.busy} @click=${() => act("complete", this.t("task.completed", { title: task.title }))}>
                <ha-icon icon="mdi:check"></ha-icon>${this.t("task.complete")}</button>`
          : html`<button class="btn" ?disabled=${this.busy} @click=${() => act("reopen")}>${this.t("task.reopen")}</button>`}
      </div>`;
  }

  render() {
    if (!this.task && !this.create) return nothing;
    return html`<dialog @close=${() => this.close()}>${this.create ? this.renderCreate() : this.renderTask(this.task!)}</dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-task-dialog": TaskDialog;
  }
}
