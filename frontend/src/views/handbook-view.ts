/**
 * Handbook tab: table of contents, chapter reader, search and glossary.
 * Chapters are Markdown served by the integration (EN / NL).
 */
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { GardenApi } from "../api";
import { headings, inline, renderMarkdown, slug } from "../components/markdown";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { GlossaryEntry, HandbookChapterMeta } from "../types";
import { chapterArt, chapterBanner } from "../components/chapter-art";

const CHAPTER_ICONS: Record<string, string> = {
  planning: "mdi:clipboard-text-outline", soil: "mdi:shovel", sowing: "mdi:seed-outline", watering: "mdi:watering-can-outline",
  fertilizing: "mdi:bottle-tonic-plus-outline", rotation: "mdi:rotate-3d-variant", companions: "mdi:handshake-outline",
  greenhouse: "mdi:greenhouse", pests: "mdi:bug-outline", diseases: "mdi:mushroom-outline", seasons: "mdi:calendar-sync-outline",
  harvest: "mdi:basket-outline", seeds: "mdi:seed", nodig: "mdi:layers-outline", herbs: "mdi:leaf", perennials: "mdi:flower-outline",
};

@customElement("hl-handbook-view")
export class HandbookView extends LitElement {
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property() chapterId = "";
  @property({ type: Boolean }) narrow = false;

  @state() private chapters: HandbookChapterMeta[] = [];
  @state() private glossary: Record<string, GlossaryEntry> = {};
  @state() private body = "";
  @state() private loadedId = "";
  @state() private query = "";
  @state() private results: { id: string; title: string; snippet: string }[] = [];
  @state() private showGlossary = false;
  private searchTimer?: number;

  static styles = [
    shared,
    css`
      .layout { display: grid; grid-template-columns: 280px 1fr; gap: var(--hl-s4); align-items: start; }
      .layout.narrow { grid-template-columns: 1fr; }
      nav.toc { position: sticky; top: 72px; display: flex; flex-direction: column; gap: 2px; max-height: calc(100vh - 100px); overflow: auto; }
      nav.toc a { display: flex; gap: var(--hl-s2); align-items: center; padding: 8px 10px; border-radius: var(--hl-r-md); color: var(--hl-text); text-decoration: none; cursor: pointer; --mdc-icon-size: 18px; }
      nav.toc a:hover { background: var(--hl-surface-2); }
      nav.toc a[aria-current="page"] { background: var(--hl-leaf-100); color: var(--hl-chip-active-fg); font-weight: 600; }
      nav.toc .num { color: var(--hl-text-muted); font-variant-numeric: tabular-nums; width: 1.6em; }
      article { max-width: 820px; line-height: 1.6; scroll-margin-top: 72px; }
      a.chip { text-decoration: none; color: inherit; }
      .layout.narrow nav.toc { position: static; max-height: none; }
      details.toc-wrap > summary { cursor: pointer; font-weight: 600; padding: var(--hl-s2) var(--hl-s3); list-style: none; display: flex; gap: var(--hl-s2); align-items: center; }
      article h1 { font-size: var(--hl-fs-2xl); margin: 0 0 var(--hl-s2); }
      article h2 { margin: var(--hl-s5) 0 var(--hl-s2); font-size: var(--hl-fs-xl); scroll-margin-top: 72px; }
      article h3 { margin: var(--hl-s4) 0 var(--hl-s2); scroll-margin-top: 72px; }
      article p, article li { font-size: var(--hl-fs-md, 15px); }
      article ul, article ol { padding-left: 1.4em; }
      .table-wrap { overflow-x: auto; margin: var(--hl-s3) 0; }
      table { border-collapse: collapse; width: 100%; font-size: var(--hl-fs-sm); }
      th, td { text-align: left; padding: 6px 10px; border-bottom: 1px solid var(--hl-border); vertical-align: top; }
      th { background: var(--hl-surface-2); }
      code { background: var(--hl-surface-2); padding: 1px 5px; border-radius: 4px; }
      .sections { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: var(--hl-s3); }
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: var(--hl-s3); }
      .tile { cursor: pointer; text-align: left; display: flex; flex-direction: column; justify-content: flex-start; color: var(--hl-text); font: inherit; }
      .tile { padding: 0; overflow: hidden; }
      .tile .art { display: block; line-height: 0; }
      .tile .txt { padding: var(--hl-s3) var(--hl-s4); }
      .banner { display: block; line-height: 0; border-radius: var(--hl-r-md); overflow: hidden; margin: 0 0 var(--hl-s3); }
      .tile h3 { display: flex; gap: var(--hl-s2); align-items: center; margin: 0 0 6px; --mdc-icon-size: 20px; }
      .hit { padding: var(--hl-s2) 0; border-bottom: 1px solid var(--hl-border); cursor: pointer; }
      dl.gloss dt { font-weight: 700; margin-top: var(--hl-s3); }
      dl.gloss dd { margin: 2px 0 0; }
      .search { width: 100%; }
    `,
  ];

  protected willUpdate(changed: PropertyValues): void {
    if ((changed.has("api") || changed.has("lang")) && this.api) void this.loadIndex();
    if ((changed.has("chapterId") || changed.has("lang")) && this.api && this.chapterId && this.chapterId !== this.loadedId) {
      void this.loadChapter(this.chapterId);
    }
  }

  private async loadIndex(): Promise<void> {
    const res = await this.api.handbookIndex(this.lang);
    this.chapters = res.chapters;
    this.glossary = res.glossary;
  }

  private async loadChapter(id: string): Promise<void> {
    try {
      const res = await this.api.handbookChapter(id, this.lang);
      this.body = res.body;
      this.loadedId = id;
      this.updateComplete.then(() => this.renderRoot.querySelector("article")?.scrollIntoView({ block: "start" }));
    } catch {
      this.body = "";
      this.loadedId = "";
    }
  }

  private open(id: string): void {
    this.showGlossary = false;
    this.query = "";
    this.results = [];
    this.dispatchEvent(new CustomEvent("open-handbook", { detail: { chapter: id }, bubbles: true, composed: true }));
  }

  private onSearch(value: string): void {
    this.query = value;
    window.clearTimeout(this.searchTimer);
    if (!value.trim()) {
      this.results = [];
      return;
    }
    this.searchTimer = window.setTimeout(async () => {
      const results = (await this.api.handbookSearch(value, this.lang)).results;
      if (value === this.query) this.results = results; // drop answers to an older query
    }, 200);
  }

  private renderToc(): TemplateResult {
    return html`<nav class="toc card" aria-label=${this.t("handbook.contents")}>
      <input class="search" type="search" placeholder=${this.t("handbook.search")} .value=${this.query}
        @input=${(e: Event) => this.onSearch((e.target as HTMLInputElement).value)} aria-label=${this.t("handbook.search")} />
      <a aria-current=${!this.chapterId && !this.showGlossary ? "page" : "false"} @click=${() => this.open("")}>
        <ha-icon icon="mdi:book-open-page-variant-outline"></ha-icon>${this.t("handbook.overview")}</a>
      ${this.chapters.map((c) => html`<a aria-current=${c.id === this.chapterId && !this.showGlossary ? "page" : "false"} @click=${() => this.open(c.id)}>
        <span class="num">${c.order}</span>${c.title}</a>`)}
      <a aria-current=${this.showGlossary ? "page" : "false"} @click=${() => (this.showGlossary = true)}>
        <ha-icon icon="mdi:alphabetical-variant"></ha-icon>${this.t("handbook.glossary")}</a>
    </nav>`;
  }

  private renderBody(): TemplateResult {
    if (this.query.trim()) {
      return html`<article class="card"><h1>${this.t("handbook.results", { query: this.query })}</h1>
        ${this.results.length ? this.results.map((r) => html`<div class="hit" @click=${() => this.open(r.id)}><b>${r.title}</b><p class="small muted">…${r.snippet}…</p></div>`)
          : html`<p class="muted">${this.t("handbook.no_results")}</p>`}</article>`;
    }
    if (this.showGlossary) {
      const items = Object.entries(this.glossary).sort((a, b) => a[1].term.localeCompare(b[1].term, this.lang));
      return html`<article class="card"><h1>${this.t("handbook.glossary")}</h1>
        <dl class="gloss">${items.map(([, g]) => html`<dt>${g.term}</dt><dd>${g.text}
          ${g.chapter ? html` <a href="#" @click=${(e: Event) => { e.preventDefault(); this.open(g.chapter); }}>→ ${this.chapters.find((c) => c.id === g.chapter)?.title ?? g.chapter}</a>` : nothing}</dd>`)}</dl>
      </article>`;
    }
    if (!this.chapterId) {
      return html`<article style="max-width:none">
        <h1>${this.t("handbook.title")}</h1>
        <p class="muted">${this.t("handbook.intro")}</p>
        <div class="grid">${this.chapters.map((c) => html`<button class="card tile" @click=${() => this.open(c.id)}>
          <span class="art">${chapterArt(c.id, 96)}</span>
          <span class="txt"><h3><ha-icon icon=${CHAPTER_ICONS[c.id] ?? "mdi:book-outline"}></ha-icon>${c.title}</h3>
          <p class="small muted">${inline(c.summary)}</p></span></button>`)}</div>
      </article>`;
    }
    const meta = this.chapters.find((c) => c.id === this.chapterId);
    const idx = this.chapters.findIndex((c) => c.id === this.chapterId);
    const prev = idx > 0 ? this.chapters[idx - 1] : undefined;
    const next = idx >= 0 && idx < this.chapters.length - 1 ? this.chapters[idx + 1] : undefined;
    return html`<article class="card">
      <span class="banner">${chapterBanner(this.chapterId)}</span>
      <h1>${meta?.title ?? ""}</h1>
      <div class="sections">${headings(this.body).filter((h) => h.level === 2).map((h) => html`<a class="chip" href=${`#${h.id}`}
        @click=${(e: Event) => { e.preventDefault(); this.renderRoot.querySelector(`#${CSS.escape(slug(h.text))}`)?.scrollIntoView({ behavior: "smooth" }); }}>${h.text}</a>`)}</div>
      ${this.loadedId === this.chapterId ? renderMarkdown(this.body) : html`<p class="muted">${this.t("common.loading")}</p>`}
      <div class="row" style="margin-top:var(--hl-s5)">
        ${prev ? html`<button class="btn small ghost" @click=${() => this.open(prev.id)}>← ${prev.title}</button>` : nothing}
        <span class="spacer"></span>
        ${next ? html`<button class="btn small" @click=${() => this.open(next.id)}>${next.title} →</button>` : nothing}
      </div>
    </article>`;
  }

  render(): TemplateResult {
    // On phones the contents fold away once a chapter is open.
    const toc = this.narrow && (this.chapterId || this.showGlossary)
      ? html`<details class="toc-wrap card"><summary><ha-icon icon="mdi:format-list-bulleted"></ha-icon>${this.t("handbook.contents")}</summary>${this.renderToc()}</details>`
      : this.renderToc();
    return html`<div class="layout ${this.narrow ? "narrow" : ""}">${toc}${this.renderBody()}</div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-handbook-view": HandbookView;
  }
}
