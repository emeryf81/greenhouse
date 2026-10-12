// Date field that always reads day-month-year in the panel's language
// (13-04-2026 in Dutch, 13/04/2026 in English) whatever the browser's locale;
// the calendar button opens the browser's own date picker.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { displayDate, parseDate } from "../util/dates";

@customElement("hl-date-input")
export class DateInput extends LitElement {
  /** ISO date (``YYYY-MM-DD``) or empty. */
  @property() value = "";
  @property() lang = "en";
  @property() label = "";
  @property() pickLabel = "Calendar";
  @property({ type: Boolean }) disabled = false;
  @state() private invalid = false;
  @query("input[type=date]") private picker!: HTMLInputElement;

  static styles = css`
    :host { display: inline-flex; align-items: stretch; border: 1px solid var(--hl-border-strong, #c9c2b4); border-radius: var(--hl-r-sm, 6px);
      background: var(--hl-surface, #fff); position: relative; min-height: 30px; max-width: 150px; }
    :host([disabled]) { opacity: 0.6; }
    input.text { border: 0; background: transparent; font: inherit; font-size: var(--hl-fs-sm, 14px); color: var(--hl-text, #222);
      width: 100%; min-width: 0; padding: 2px 6px; outline: none; }
    input.text.invalid { color: var(--hl-danger, #b3261e); }
    :host(:focus-within) { outline: 2px solid var(--hl-focus, #4b8b3b); outline-offset: 1px; }
    button { border: 0; background: transparent; cursor: pointer; padding: 0 6px; color: var(--hl-text-muted, #666); font-size: 14px; }
    button:disabled { cursor: default; }
    input[type="date"] { position: absolute; right: 0; bottom: 0; width: 1px; height: 1px; opacity: 0; border: 0; padding: 0; pointer-events: none; }
  `;

  private emit(value: string | null): void {
    this.dispatchEvent(new CustomEvent("date-change", { detail: value, bubbles: true, composed: true }));
  }

  private onText(e: Event): void {
    const el = e.target as HTMLInputElement;
    const parsed = parseDate(el.value);
    this.invalid = parsed === undefined;
    if (parsed === undefined) return;
    el.value = displayDate(parsed, this.lang);
    if ((parsed ?? "") !== (this.value ?? "")) this.emit(parsed);
  }

  private openPicker(): void {
    const picker = this.picker as HTMLInputElement & { showPicker?: () => void };
    picker.value = this.value || "";
    try {
      picker.showPicker ? picker.showPicker() : picker.click();
    } catch {
      picker.click();
    }
  }

  render(): TemplateResult {
    const placeholder = this.lang === "nl" ? "dd-mm-jjjj" : "dd/mm/yyyy";
    return html`<input class="text ${this.invalid ? "invalid" : ""}" .value=${displayDate(this.value, this.lang)} placeholder=${placeholder}
        aria-label=${this.label} aria-invalid=${String(this.invalid)} ?disabled=${this.disabled} inputmode="numeric" @change=${this.onText} />
      ${this.disabled ? nothing : html`<button type="button" aria-label=${this.pickLabel} title=${this.pickLabel} @click=${this.openPicker}>📅</button>`}
      <input type="date" tabindex="-1" aria-hidden="true" @change=${(e: Event) => this.emit((e.target as HTMLInputElement).value || null)} />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-date-input": DateInput;
  }
}
