// The photos of one crop, bed or plant over time: a strip from the first
// picture to the last ("day 12", "day 40" ...), with a viewer to page through them.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { photoUrl } from "../api";
import type { Translate } from "../i18n";
import type { JournalEntry } from "../types";
import { formatDate } from "../util/garden";
import "./modal";

interface Shot { id: string; at: string; text: string; kind: JournalEntry["kind"] }

@customElement("hl-photo-timeline")
export class PhotoTimeline extends LitElement {
  @property({ attribute: false }) journal: JournalEntry[] = [];
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property() plantingId = "";
  @property() bedId = "";
  @property() plantId = "";
  /** With ``plantId``: the plant's crops, so notes on a crop count too. */
  @property({ attribute: false }) plantingIds: string[] = [];
  @state() private open = -1;

  static styles = css`
    :host { display: block; }
    .strip { display: flex; gap: 10px; overflow-x: auto; padding: 4px 2px 10px; scroll-snap-type: x proximity; }
    .shot { flex: none; width: 108px; border: 0; padding: 0; background: none; cursor: zoom-in; text-align: left; scroll-snap-align: start;
      font: inherit; color: inherit; }
    .shot img { width: 108px; height: 108px; object-fit: cover; border-radius: 12px; display: block;
      box-shadow: var(--hl-shadow-1); transition: transform var(--hl-dur) var(--hl-ease), box-shadow var(--hl-dur) var(--hl-ease); }
    .shot:hover img { transform: translateY(-2px); box-shadow: var(--hl-shadow-2); }
    .shot:focus-visible img { outline: 2px solid var(--hl-focus); outline-offset: 2px; }
    .day { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--hl-primary); margin-top: 6px; }
    .date { font-size: 11px; color: var(--hl-text-muted); }
    .rail { position: relative; height: 2px; margin: 0 2px 2px; background: linear-gradient(90deg, var(--hl-leaf-300), var(--hl-sun-500)); border-radius: 2px; opacity: 0.6; }
    .viewer { display: flex; flex-direction: column; gap: 10px; }
    .viewer img { width: 100%; max-height: 70vh; object-fit: contain; border-radius: 12px; background: var(--hl-surface-2); }
    .small { font-size: var(--hl-fs-sm); } .muted { color: var(--hl-text-muted); }
    .caption { font-family: var(--hl-font-serif); font-style: italic; color: var(--hl-text-muted); }
  `;

  private get shots(): Shot[] {
    const match = (e: JournalEntry) =>
      (this.plantingId && e.planting_id === this.plantingId) ||
      (!this.plantingId && this.bedId && e.bed_id === this.bedId) ||
      (!this.plantingId && !this.bedId && this.plantId &&
        (e.plant_id === this.plantId || (!!e.planting_id && this.plantingIds.includes(e.planting_id))));
    return this.journal
      .filter((e) => e.photos?.length && match(e))
      .sort((a, b) => (a.at < b.at ? -1 : 1))
      .flatMap((e) => e.photos.map((id) => ({ id, at: e.at, text: e.text, kind: e.kind })));
  }

  private dayOf(first: string, at: string): number {
    return Math.round((Date.parse(at.slice(0, 10)) - Date.parse(first.slice(0, 10))) / 86_400_000) + 1;
  }

  render(): TemplateResult | typeof nothing {
    const shots = this.shots;
    if (!shots.length) return nothing;
    const first = shots[0].at;
    const cur = shots[this.open];
    return html`
      <div class="rail" aria-hidden="true"></div>
      <div class="strip" role="list" aria-label=${this.t("photos.timeline")}>
        ${shots.map((s, i) => html`<button class="shot" role="listitem" @click=${() => (this.open = i)}
            aria-label=${`${this.t("photos.day", { n: this.dayOf(first, s.at) })} · ${formatDate(s.at.slice(0, 10), this.lang)}`}>
          <img src=${photoUrl(s.id, "256x256")} alt="" loading="lazy" />
          <div class="day">${this.t("photos.day", { n: this.dayOf(first, s.at) })}</div>
          <div class="date">${formatDate(s.at.slice(0, 10), this.lang)}</div>
        </button>`)}
      </div>
      ${cur ? html`<hl-modal heading=${this.t("photos.day", { n: this.dayOf(first, cur.at) })} subheading=${formatDate(cur.at.slice(0, 10), this.lang)}
          nav ?has-prev=${this.open > 0} ?has-next=${this.open < shots.length - 1} size="wide"
          closeLabel=${this.t("common.close")} prevLabel=${this.t("common.previous")} nextLabel=${this.t("common.next")}
          @prev=${() => (this.open -= 1)} @next=${() => (this.open += 1)} @closed=${(e: Event) => { e.stopPropagation(); this.open = -1; }}>
        <div class="viewer">
          <img src=${photoUrl(cur.id, "1024x1024")} alt=${cur.text} />
          ${cur.text ? html`<p class="caption">${cur.text}</p>` : nothing}
          <span class="small muted">${this.open + 1} / ${shots.length}</span>
        </div>
      </hl-modal>` : nothing}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-photo-timeline": PhotoTimeline;
  }
}
