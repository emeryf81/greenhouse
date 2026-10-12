// One popup for the whole panel: same header, close button, backdrop click,
// Escape, and (in lists) previous / next with the arrow keys.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { shared } from "../styles/tokens";

@customElement("hl-modal")
export class Modal extends LitElement {
  @property() heading = "";
  @property() subheading = "";
  /** Colour of the band on top (a plant's family, a zone ...). */
  @property() accent = "";
  @property() closeLabel = "Close";
  @property() prevLabel = "Previous";
  @property() nextLabel = "Next";
  /** Show previous / next buttons (and listen to the arrow keys). */
  @property({ type: Boolean }) nav = false;
  @property({ type: Boolean, attribute: "has-prev" }) hasPrev = false;
  @property({ type: Boolean, attribute: "has-next" }) hasNext = false;
  /** ``wide`` for tables and forms. */
  @property({ reflect: true }) size: "normal" | "wide" | "narrow" = "normal";
  @query("dialog") private dialog!: HTMLDialogElement;
  @query(".content") private content?: HTMLElement;

  static styles = [
    shared,
    css`
      dialog { border: none; border-radius: 16px; padding: 0; width: min(760px, calc(100vw - 32px)); max-height: calc(100vh - 48px);
        background: var(--hl-surface); color: var(--hl-text); box-shadow: var(--hl-shadow-3); overflow: hidden; }
      :host([size="wide"]) dialog { width: min(980px, calc(100vw - 32px)); }
      :host([size="narrow"]) dialog { width: min(520px, calc(100vw - 32px)); }
      dialog[open] { display: flex; flex-direction: column; }
      dialog::backdrop { background: rgba(20, 30, 20, 0.45); }
      header { padding: var(--hl-s4) var(--hl-s5); border-bottom: 1px solid var(--hl-border); display: flex; gap: var(--hl-s2); align-items: center; }
      header h2 { margin: 0; }
      .titles { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
      .content { padding: var(--hl-s4) var(--hl-s5); overflow: auto; display: flex; flex-direction: column; gap: var(--hl-s4); }
      footer { padding: var(--hl-s3) var(--hl-s5); border-top: 1px solid var(--hl-border); display: flex; gap: var(--hl-s2); flex-wrap: wrap; align-items: center; }
      footer:not(.has) { display: none; }
      .x { font-size: 20px; line-height: 1; }
    `,
  ];

  firstUpdated(): void {
    if (!this.dialog.open) this.dialog.showModal();
  }

  /** Start at the top again when the content changes (e.g. next item). */
  toTop(): void {
    if (this.content) this.content.scrollTop = 0;
  }

  close(): void {
    this.dialog.close();
  }

  private onKey(e: KeyboardEvent): void {
    if (!this.nav) return;
    const target = e.composedPath()[0] as HTMLElement | undefined;
    if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
    if (e.key === "ArrowLeft" && this.hasPrev) { e.preventDefault(); this.step("prev"); }
    if (e.key === "ArrowRight" && this.hasNext) { e.preventDefault(); this.step("next"); }
  }

  private step(dir: "prev" | "next"): void {
    this.dispatchEvent(new CustomEvent(dir));
    this.toTop();
  }

  private onFooterSlot(e: Event): void {
    const slot = e.target as HTMLSlotElement;
    slot.parentElement?.classList.toggle("has", slot.assignedNodes({ flatten: true }).some((n) => n.nodeType === 1));
  }

  render(): TemplateResult {
    return html`<dialog aria-label=${this.heading} @keydown=${this.onKey}
      @close=${() => this.dispatchEvent(new CustomEvent("closed", { bubbles: true, composed: true }))}
      @click=${(e: MouseEvent) => { if (e.target === this.dialog) this.close(); }}>
      <header style=${this.accent ? `border-top: 6px solid ${this.accent}` : ""}>
        <slot name="media"></slot>
        <div class="titles"><h2>${this.heading}</h2>${this.subheading ? html`<span class="small muted">${this.subheading}</span>` : nothing}
          <slot name="subheading"></slot></div>
        ${this.nav ? html`
          <button class="icon-btn" aria-label=${this.prevLabel} title=${this.prevLabel} ?disabled=${!this.hasPrev} @click=${() => this.step("prev")}><span class="x">‹</span></button>
          <button class="icon-btn" aria-label=${this.nextLabel} title=${this.nextLabel} ?disabled=${!this.hasNext} @click=${() => this.step("next")}><span class="x">›</span></button>` : nothing}
        <button class="icon-btn" aria-label=${this.closeLabel} title=${this.closeLabel} @click=${() => this.close()}><span class="x">×</span></button>
      </header>
      <div class="content"><slot></slot></div>
      <footer><slot name="actions" @slotchange=${this.onFooterSlot}></slot></footer>
    </dialog>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-modal": Modal;
  }
}
