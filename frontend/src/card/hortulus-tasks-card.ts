// Lovelace card: today's garden tasks (and overdue ones), tick them off from any dashboard.
//
//   type: custom:hortulus-tasks-card
//   title: Garden today        # optional
//   days: 0                    # 0 = today + overdue, 7 = the coming week
//   assignee: me               # optional: me | person.xyz | unassigned
//   max: 8                     # optional: maximum rows
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { HomeAssistant, Task } from "../types";
import { TASK_ICONS } from "../util/garden";
import { cardTasks } from "./card-tasks";

const DOMAIN = "garden_manager";

export interface CardConfig {
  type: string;
  title?: string;
  days?: number;
  assignee?: string;
  max?: number;
}

const STRINGS = {
  en: { title: "Garden today", none: "Nothing to do - enjoy the garden.", overdue: "overdue", more: "+{n} more", open: "Open Hortulus", min: "min", error: "Hortulus is not available" },
  nl: { title: "Tuin vandaag", none: "Niets te doen - geniet van de tuin.", overdue: "achterstallig", more: "+{n} meer", open: "Open Hortulus", min: "min", error: "Hortulus is niet beschikbaar" },
};

interface SnapshotLite { tasks: Task[] }

@customElement("hortulus-tasks-card")
export class HortulusTasksCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config: CardConfig = { type: "custom:hortulus-tasks-card" };
  @state() private tasks: Task[] | null = null;
  @state() private error = false;
  @state() private busy = new Set<string>();
  private unsub?: Promise<() => Promise<void>>;

  static getStubConfig(): CardConfig {
    return { type: "custom:hortulus-tasks-card", days: 0 };
  }

  setConfig(config: CardConfig): void {
    if (!config) throw new Error("Invalid configuration");
    this.config = { days: 0, max: 8, ...config };
  }

  getCardSize(): number {
    return 1 + Math.min(this.tasks?.length ?? 3, this.config.max ?? 8);
  }

  private get s() {
    const lang = (this.hass?.locale?.language ?? this.hass?.language ?? "en").toLowerCase().startsWith("nl") ? "nl" : "en";
    return { ...STRINGS[lang], lang };
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && !this.unsub) this.subscribe();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    void this.unsub?.then((off) => off()).catch(() => undefined);
    this.unsub = undefined;
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass && !this.unsub && this.isConnected) this.subscribe();
  }

  private subscribe(): void {
    this.unsub = this.hass!.connection.subscribeMessage<SnapshotLite>((snap) => {
      this.tasks = snap.tasks;
      this.error = false;
    }, { type: `${DOMAIN}/subscribe` });
    this.unsub.catch(() => {
      this.error = true;
      this.unsub = undefined;
    });
  }

  private assigneeFilter(): string | null {
    const a = this.config.assignee;
    if (!a) return null;
    if (a === "unassigned") return "";
    if (a === "me") {
      const uid = this.hass?.user?.id;
      const me = Object.values(this.hass?.states ?? {}).find((s) => s.entity_id.startsWith("person.") && s.attributes.user_id === uid);
      return me?.entity_id ?? null;
    }
    return a;
  }

  private async complete(task: Task): Promise<void> {
    this.busy = new Set(this.busy).add(task.id);
    try {
      await this.hass!.connection.sendMessagePromise({ type: `${DOMAIN}/tasks/action`, task_id: task.id, action: "complete" });
    } finally {
      const next = new Set(this.busy);
      next.delete(task.id);
      this.busy = next;
    }
  }

  private open(): void {
    history.pushState(null, "", "/hortulus");
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
  }

  render(): TemplateResult {
    const s = this.s;
    const today = new Date().toLocaleDateString("sv-SE");
    const header = html`<div class="head"><h2>${this.config.title ?? s.title}</h2>
      <button class="link" @click=${() => this.open()} aria-label=${s.open}><ha-icon icon="mdi:sprout"></ha-icon></button></div>`;
    if (this.error) return html`<ha-card>${header}<p class="empty">${s.error}</p></ha-card>`;
    if (!this.tasks) return html`<ha-card>${header}<p class="empty">…</p></ha-card>`;
    const { shown, hidden } = cardTasks(this.tasks, today, this.config.days ?? 0, this.assigneeFilter(), this.config.max ?? 8);
    return html`<ha-card>
      ${header}
      ${shown.length === 0 ? html`<p class="empty">${s.none}</p>` : html`<ul>
        ${shown.map((t) => html`<li class=${t.due < today ? "late" : ""}>
          <button class="check" role="checkbox" aria-checked="false" aria-label=${t.title} ?disabled=${this.busy.has(t.id)} @click=${() => this.complete(t)}>
            <ha-icon icon=${this.busy.has(t.id) ? "mdi:progress-check" : "mdi:checkbox-blank-circle-outline"}></ha-icon></button>
          <ha-icon class="type" icon=${TASK_ICONS[t.type] ?? "mdi:sprout"}></ha-icon>
          <span class="text"><span class="title">${t.title}</span>
            <span class="meta">${t.due < today ? html`<b>${s.overdue}</b> · ` : t.due > today ? html`${new Date(`${t.due}T12:00`).toLocaleDateString(s.lang === "nl" ? "nl-BE" : "en-GB", { weekday: "short" })} · ` : nothing}${t.estimated_minutes} ${s.min}</span></span>
        </li>`)}
      </ul>`}
      ${hidden ? html`<p class="more"><button class="link" @click=${() => this.open()}>${s.more.replace("{n}", String(hidden))}</button></p>` : nothing}
    </ha-card>`;
  }

  static styles = css`
    ha-card { padding: 12px 16px 8px; }
    .head { display: flex; align-items: center; justify-content: space-between; }
    h2 { margin: 0 0 4px; font-size: 1.15rem; font-weight: 500; }
    ul { list-style: none; margin: 0; padding: 0; }
    li { display: flex; align-items: center; gap: 8px; padding: 6px 0; border-top: 1px solid var(--divider-color, #e0e0e0); }
    li:first-child { border-top: 0; }
    .check, .link { background: none; border: 0; padding: 4px; cursor: pointer; color: var(--primary-color); border-radius: 50%; min-width: 36px; min-height: 36px; }
    .check:focus-visible, .link:focus-visible { outline: 2px solid var(--primary-color); }
    .type { color: var(--secondary-text-color); --mdc-icon-size: 20px; }
    .text { display: flex; flex-direction: column; min-width: 0; }
    .title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .meta { font-size: 0.8rem; color: var(--secondary-text-color); }
    li.late .meta b { color: var(--error-color, #c62828); font-weight: 600; }
    .empty { color: var(--secondary-text-color); margin: 8px 0; }
    .more { margin: 4px 0 0; text-align: right; }
    .more .link { border-radius: 4px; font-size: 0.9rem; }
  `;
}

declare global {
  interface Window { customCards?: { type: string; name: string; description: string; preview?: boolean }[] }
  interface HTMLElementTagNameMap { "hortulus-tasks-card": HortulusTasksCard }
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((c) => c.type === "hortulus-tasks-card")) {
  window.customCards.push({ type: "hortulus-tasks-card", name: "Hortulus – garden tasks", description: "Today's garden tasks with a tick-box.", preview: true });
}
