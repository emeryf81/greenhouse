/**
 * Hortulus panel - entry point registered by the integration as
 * <hortulus-panel> (see custom_components/garden_manager/panel.py).
 *
 * Why Lit: Home Assistant's own frontend is built with Lit web components,
 * so the panel shares the runtime model (the `hass` property is pushed on every
 * state change), theming via CSS custom properties, `ha-icon`, and a small
 * bundle (~55 kB gzipped incl. Lit) without a second framework runtime.
 */
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { GardenApi } from "./api";
import { emblem } from "./brand";
import { makeTranslator, normalizeLang, type Translate } from "./i18n";
import { shared, tokens } from "./styles/tokens";
import type { FamilyInfo, HomeAssistant, Plant, Snapshot, Task } from "./types";
import "./views/dashboard-view";
import "./views/planner-view";
import "./views/library-view";
import "./views/calendar-view";
import "./views/settings-view";
import "./views/handbook-view";
import "./views/print-view";
import "./views/advice-view";
import "./views/journal-view";
import { setPersons } from "./util/people";
import { setSupplies } from "./util/tools";
import "./components/task-ui";
import { setGlossary } from "./components/info";

type Tab = "dashboard" | "planner" | "library" | "calendar" | "journal" | "advice" | "handbook" | "print" | "settings";
const TABS: { id: Tab; icon: string; mobile: boolean }[] = [
  { id: "dashboard", icon: "mdi:home-variant-outline", mobile: true },
  { id: "planner", icon: "mdi:floor-plan", mobile: true },
  { id: "library", icon: "mdi:sprout-outline", mobile: true },
  { id: "calendar", icon: "mdi:calendar-month-outline", mobile: true },
  { id: "journal", icon: "mdi:notebook-outline", mobile: false },
  { id: "advice", icon: "mdi:chat-question-outline", mobile: true },
  { id: "handbook", icon: "mdi:book-open-page-variant-outline", mobile: true },
  { id: "print", icon: "mdi:printer-outline", mobile: false },
  { id: "settings", icon: "mdi:cog-outline", mobile: false },
];

@customElement("hortulus-panel")
export class HortulusPanel extends LitElement {
  @property({ attribute: false }) hass!: HomeAssistant;
  @property({ type: Boolean, reflect: true }) narrow = false;
  @property({ attribute: false }) route?: { prefix: string; path: string };
  @property({ attribute: false }) panel?: unknown;

  @state() private snapshot: Snapshot | null = null;
  @state() private plants: Plant[] = [];
  @state() private families: Record<string, FamilyInfo> = {};
  @state() private tab: Tab = "dashboard";
  @state() private toastMsg = "";
  @state() private openTask: Task | null = null;
  @state() private creatingTask = false;
  @state() private error = "";
  @state() private chapter = "";

  private api?: GardenApi;
  private unsubscribe?: () => Promise<void>;
  private toastTimer?: number;
  private t: Translate = makeTranslator("en");
  private uiLang = "en";

  static styles = [
    tokens,
    shared,
    css`
      :host { display: block; min-height: 100vh; background: var(--hl-bg); }
      .appbar { position: sticky; top: 0; z-index: 4; display: flex; align-items: center; gap: var(--hl-s3);
        padding: 0 var(--hl-s4); height: 56px; background: color-mix(in srgb, var(--hl-surface) 92%, transparent);
        backdrop-filter: blur(8px); border-bottom: 1px solid var(--hl-border); }
      .brand { display: flex; align-items: center; gap: var(--hl-s2); font-weight: 700; font-size: var(--hl-fs-lg); letter-spacing: 0.01em; }
      .brand small { font-weight: 400; color: var(--hl-text-muted); font-size: var(--hl-fs-xs); }
      nav { display: flex; gap: 2px; margin-left: var(--hl-s4); overflow-x: auto; }
      nav a { display: inline-flex; align-items: center; gap: 6px; padding: 0 14px; height: 40px; border-radius: var(--hl-r-pill);
        color: var(--hl-text-muted); text-decoration: none; font-weight: 500; white-space: nowrap; --mdc-icon-size: 18px; }
      nav a:hover { background: var(--hl-surface-2); color: var(--hl-text); }
      nav a[aria-current="page"] { background: var(--hl-leaf-100); color: var(--hl-chip-active-fg); }
      nav a:focus-visible { outline: 2px solid var(--hl-focus); outline-offset: 2px; }
      main { padding: var(--hl-s4); max-width: 1680px; margin: 0 auto; }
      .bottom-nav { display: none; }
      :host([narrow]) nav.top { display: none; }
      :host([narrow]) .bottom-nav { display: flex; position: fixed; bottom: 0; left: 0; right: 0; z-index: 4; background: var(--hl-surface);
        border-top: 1px solid var(--hl-border); justify-content: space-around; padding: 4px 0 calc(4px + env(safe-area-inset-bottom)); }
      :host([narrow]) .bottom-nav a { flex-direction: column; height: auto; padding: 4px 2px; font-size: 10.5px; gap: 2px; margin: 0;
        flex: 1 1 0; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      :host([narrow]) main { padding: var(--hl-s3) var(--hl-s3) 88px; }
      .toast { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 20; background: var(--hl-soil-900); color: #fff;
        padding: 10px 18px; border-radius: var(--hl-r-pill); box-shadow: var(--hl-shadow-3); font-size: var(--hl-fs-sm); max-width: calc(100vw - 32px); }
      :host([narrow]) .toast { bottom: 84px; }
      .error { margin: var(--hl-s6) auto; max-width: 560px; text-align: center; }
    `,
  ];

  // ---------------------------------------------------------------------- //
  protected willUpdate(changed: PropertyValues): void {
    if (changed.has("hass") && this.hass) {
      const lang = normalizeLang(this.snapshot?.lang ?? this.hass.locale?.language ?? this.hass.language);
      if (lang !== this.uiLang) {
        this.uiLang = lang;
        this.t = makeTranslator(lang);
      }
      this.toggleAttribute("dark", Boolean(this.hass.themes?.darkMode));
      setPersons(this.hass);
      if (!this.api) {
        this.api = new GardenApi(this.hass);
        void this.connect();
      } else {
        this.api.setHass(this.hass);
      }
    }
    if (changed.has("route") && this.route) {
      const [seg, sub] = this.route.path.replace(/^\//, "").split("/") as [Tab, string | undefined];
      this.tab = TABS.some((t) => t.id === seg) ? seg : "dashboard";
      if (this.tab === "handbook") this.chapter = sub ?? "";
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    void this.unsubscribe?.();
    this.unsubscribe = undefined;
    this.api = undefined;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.hass && !this.api) {
      this.api = new GardenApi(this.hass);
      void this.connect();
    }
  }

  private async connect(): Promise<void> {
    try {
      await this.loadPlants();
      void this.loadGlossary();
      this.unsubscribe = await this.api!.subscribe((snap) => {
        this.snapshot = snap;
        const lang = normalizeLang(snap.lang);
        if (lang !== this.uiLang) {
          this.uiLang = lang;
          this.t = makeTranslator(lang);
          void this.loadGlossary();
        }
        if (this.openTask) this.openTask = snap.tasks.find((t) => t.id === this.openTask!.id) ?? null;
      });
    } catch (err) {
      this.error = (err as { code?: string }).code === "not_loaded" ? this.t("common.not_loaded") : String((err as Error).message ?? err);
    }
  }

  private async loadGlossary(): Promise<void> {
    try {
      setGlossary((await this.api!.handbookIndex(this.uiLang)).glossary);
      setSupplies(await this.api!.supplies());
    } catch {
      /* older backend - tooltips stay empty */
    }
  }

  private openHandbook(chapter = ""): void {
    this.chapter = chapter;
    const base = `/${this.route?.prefix?.replace(/^\//, "") || "hortulus"}/handbook${chapter ? `/${chapter}` : ""}`;
    history.pushState(null, "", base);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
    this.tab = "handbook";
  }

  private async loadPlants(): Promise<void> {
    const res = await this.api!.plants();
    this.plants = res.plants;
    this.families = res.families;
  }

  private navigate(tab: Tab, ev?: Event): void {
    ev?.preventDefault();
    const path = `/${this.route?.prefix?.replace(/^\//, "") || "hortulus"}/${tab === "dashboard" ? "" : tab}`.replace(/\/$/, "");
    history.pushState(null, "", path);
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
    this.tab = tab;
  }

  private toast(message: string): void {
    this.toastMsg = message;
    window.clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => (this.toastMsg = ""), 4500);
  }

  private async completeTask(task: Task): Promise<void> {
    try {
      await this.api!.taskAction(task.id, "complete");
      this.toast(this.t("task.completed", { title: task.title }));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    }
  }

  private async irrigation(action: "run" | "stop"): Promise<void> {
    try {
      if (action === "stop") {
        await this.api!.irrigationStop();
        this.toast(this.t("dash.irrigation_stopped"));
        return;
      }
      const res = await this.api!.irrigationRun();
      const skipped = Object.values(res.reasons ?? {});
      this.toast(res.started ? this.t("dash.irrigation_started", { min: Math.round(res.total_minutes) }) : skipped[0] ?? this.t("dash.irrigation_nothing"));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    }
  }

  private async postponeTask(task: Task, days: number): Promise<void> {
    try {
      await this.api!.taskAction(task.id, "postpone", { days });
      this.toast(this.t("task.postponed", { title: task.title, n: days }));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    }
  }

  // ---------------------------------------------------------------------- //
  private renderTab(): TemplateResult {
    const snap = this.snapshot!;
    const admin = this.hass.user?.is_admin ?? true;
    const plantMap = new Map(this.plants.map((p) => [p.id, p]));
    switch (this.tab) {
      case "planner":
        return html`<hl-planner-view .snapshot=${snap} .plants=${this.plants} .families=${this.families} .api=${this.api!} .t=${this.t}
          .lang=${this.uiLang} .admin=${admin} .narrow=${this.narrow}></hl-planner-view>`;
      case "library":
        return html`<hl-library-view .snapshot=${snap} .plants=${this.plants} .families=${this.families} .api=${this.api!} .t=${this.t}
          .lang=${this.uiLang} .admin=${admin} @plants-changed=${() => this.loadPlants()}></hl-library-view>`;
      case "calendar":
        return html`<hl-calendar-view .snapshot=${snap} .api=${this.api!} .t=${this.t} .lang=${this.uiLang} .plants=${plantMap} .families=${this.families}></hl-calendar-view>`;
      case "journal":
        return html`<hl-journal-view .snapshot=${snap} .plants=${this.plants} .families=${this.families} .api=${this.api!} .t=${this.t}
          .lang=${this.uiLang} .admin=${admin}></hl-journal-view>`;
      case "advice":
        return html`<hl-advice-view .snapshot=${snap} .plants=${this.plants} .families=${this.families} .api=${this.api!} .t=${this.t}
          .lang=${this.uiLang} .admin=${admin}></hl-advice-view>`;
      case "handbook":
        return html`<hl-handbook-view .api=${this.api!} .t=${this.t} .lang=${this.uiLang} .chapterId=${this.chapter} .narrow=${this.narrow}></hl-handbook-view>`;
      case "print":
        return html`<hl-print-view .snapshot=${snap} .api=${this.api!} .t=${this.t} .lang=${this.uiLang} .narrow=${this.narrow} .admin=${admin}></hl-print-view>`;
      case "settings":
        return html`<hl-settings-view .snapshot=${snap} .hass=${this.hass} .api=${this.api!} .t=${this.t} .lang=${this.uiLang} .admin=${admin}></hl-settings-view>`;
      default:
        return html`<hl-dashboard-view .snapshot=${snap} .plants=${plantMap} .families=${this.families} .t=${this.t} .lang=${this.uiLang} .admin=${admin}></hl-dashboard-view>`;
    }
  }

  private renderNav(cls: string): TemplateResult {
    return html`<nav class=${cls} aria-label="Hortulus">
      ${TABS.filter((tab) => cls !== "bottom-nav" || tab.mobile).map((tab) => html`<a href="#" aria-current=${tab.id === this.tab ? "page" : "false"} @click=${(e: Event) => this.navigate(tab.id, e)}>
        <ha-icon icon=${tab.icon}></ha-icon>${this.t(`nav.${tab.id}`)}</a>`)}
    </nav>`;
  }

  render(): TemplateResult {
    return html`
      <header class="appbar">
        ${this.narrow ? html`<button class="icon-btn" aria-label="Menu" @click=${() => this.dispatchEvent(new Event("hass-toggle-menu", { bubbles: true, composed: true }))}>
          <ha-icon icon="mdi:menu"></ha-icon></button>` : nothing}
        <div class="brand">${emblem(30)}<span>Hortulus</span>${this.narrow ? nothing : html`<small>${this.t("app.tagline")}</small>`}</div>
        ${this.renderNav("top")}
        ${this.narrow ? html`<span style="flex:1"></span>
          <button class="icon-btn" aria-label=${this.t("nav.journal")} @click=${() => this.navigate("journal")}><ha-icon icon="mdi:notebook-outline"></ha-icon></button>
          <button class="icon-btn" aria-label=${this.t("nav.print")} @click=${() => this.navigate("print")}><ha-icon icon="mdi:printer-outline"></ha-icon></button>
          <button class="icon-btn" aria-label=${this.t("nav.settings")} aria-pressed=${String(this.tab === "settings")} @click=${() => this.navigate("settings")}>
            <ha-icon icon="mdi:cog-outline"></ha-icon></button>` : nothing}
      </header>
      <main @open-task=${(e: CustomEvent<Task>) => (this.openTask = e.detail)}
        @complete-task=${(e: CustomEvent<Task>) => this.completeTask(e.detail)}
        @postpone-task=${(e: CustomEvent<{ task: Task; days: number }>) => this.postponeTask(e.detail.task, e.detail.days)}
        @irrigation=${(e: CustomEvent<"run" | "stop">) => this.irrigation(e.detail)}
        @new-task=${() => (this.creatingTask = true)}
        @navigate=${(e: CustomEvent<Tab>) => this.navigate(e.detail)}
        @open-handbook=${(e: CustomEvent<{ chapter?: string }>) => this.openHandbook(e.detail?.chapter ?? "")}
        @hl-toast=${(e: CustomEvent<{ message: string }>) => this.toast(e.detail.message)}>
        ${this.error ? html`<div class="card error">${emblem(56)}<p>${this.error}</p></div>`
          : this.snapshot ? this.renderTab() : html`<p class="empty">${this.t("common.loading")}</p>`}
      </main>
      ${this.renderNav("bottom-nav")}
      ${this.snapshot && (this.openTask || this.creatingTask) ? html`<hl-task-dialog .task=${this.openTask} .create=${this.creatingTask} .snapshot=${this.snapshot}
        @open-handbook=${(e: CustomEvent<{ chapter?: string }>) => this.openHandbook(e.detail?.chapter ?? "")}
        .beds=${this.snapshot.beds} .api=${this.api!} .t=${this.t} .lang=${this.uiLang} .today=${this.snapshot.analysis?.today ?? ""}
        @hl-toast=${(e: CustomEvent<{ message: string }>) => this.toast(e.detail.message)}
        @closed=${() => { this.openTask = null; this.creatingTask = false; }}></hl-task-dialog>` : nothing}
      ${this.toastMsg ? html`<div class="toast" role="status" aria-live="polite">${this.toastMsg}</div>` : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hortulus-panel": HortulusPanel;
  }
}
