/**
 * <hl-info term="et0"> - a small "i" button that explains a term from the
 * handbook glossary in a popover, with a link to the full chapter.
 *
 * The glossary is loaded once by the panel (``setGlossary``); every
 * <hl-info> re-renders when it arrives, so views don't pass it around.
 */
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import type { Translate } from "../i18n";
import type { GlossaryEntry } from "../types";

let entries: Record<string, GlossaryEntry> = {};
const listeners = new Set<() => void>();

export function setGlossary(next: Record<string, GlossaryEntry>): void {
  entries = next;
  listeners.forEach((fn) => fn());
}

export function glossaryEntry(term: string): GlossaryEntry | undefined {
  return entries[term];
}

/** Ask the panel to open the handbook (optionally at a chapter). */
export function openHandbook(el: HTMLElement, chapter?: string): void {
  el.dispatchEvent(new CustomEvent("open-handbook", { detail: { chapter }, bubbles: true, composed: true }));
}

let openInstance: HlInfo | null = null;

@customElement("hl-info")
export class HlInfo extends LitElement {
  @property() term = "";
  @property({ attribute: false }) t?: Translate;
  @state() private open = false;
  private readonly refresh = () => this.requestUpdate();

  static styles = css`
    :host { display: inline-flex; position: relative; vertical-align: middle; }
    button.i { border: 0; background: transparent; color: var(--hl-text-muted); cursor: help; padding: 0 2px; line-height: 1;
      --mdc-icon-size: 16px; display: inline-flex; border-radius: 50%; }
    button.i:hover, button.i[aria-expanded="true"] { color: var(--hl-primary); }
    button.i:focus-visible { outline: 2px solid var(--hl-focus); outline-offset: 1px; }
    .pop { position: absolute; z-index: 30; top: calc(100% + 6px); left: 50%; transform: translateX(-50%); width: min(300px, 80vw);
      background: var(--hl-surface); color: var(--hl-text); border: 1px solid var(--hl-border); border-radius: var(--hl-r-md, 10px);
      box-shadow: var(--hl-shadow-3); padding: 10px 12px; font-size: var(--hl-fs-sm, 13px); font-weight: 400; line-height: 1.45;
      text-align: left; white-space: normal; letter-spacing: normal; text-transform: none; }
    .pop b { display: block; margin-bottom: 4px; font-size: var(--hl-fs-sm, 13px); }
    .pop a { display: inline-block; margin-top: 6px; color: var(--hl-primary); cursor: pointer; font-weight: 600; text-decoration: none; }
    .pop a:hover { text-decoration: underline; }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    listeners.add(this.refresh);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    listeners.delete(this.refresh);
    if (openInstance === this) openInstance = null;
  }

  private toggle(ev: Event): void {
    ev.stopPropagation();
    ev.preventDefault();
    if (!this.open && openInstance && openInstance !== this) openInstance.close();
    this.open = !this.open;
    openInstance = this.open ? this : null;
    if (this.open) window.addEventListener("pointerdown", this.outside, { once: true, capture: true });
  }

  close(): void {
    this.open = false;
  }

  private readonly outside = (ev: Event) => {
    if (!ev.composedPath().includes(this)) this.close();
    else if (this.open) window.addEventListener("pointerdown", this.outside, { once: true, capture: true });
  };

  private onKey(ev: KeyboardEvent): void {
    if (ev.key === "Escape") this.close();
  }

  render(): TemplateResult {
    const entry = entries[this.term];
    const label = entry?.term ?? this.term;
    return html`<button class="i" aria-label=${label} aria-expanded=${String(this.open)} @click=${this.toggle} @keydown=${this.onKey}>
        <ha-icon icon="mdi:information-outline"></ha-icon></button>
      ${this.open && entry
        ? html`<div class="pop" role="tooltip"><b>${entry.term}</b>${entry.text}
            ${entry.chapter ? html`<br /><a @click=${() => { this.close(); openHandbook(this, entry.chapter); }}>${this.t?.("handbook.read_more") ?? "Read more"} →</a>` : nothing}
          </div>`
        : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-info": HlInfo;
  }
}
