// Picture of a plant: always an illustration (the crop's sticker on a tile in its
// family colour, works offline), optionally covered by a photo from Wikipedia,
// looked up by scientific name when the tile scrolls into view.
import { LitElement, css, html, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { glyphFor, glyphIcon } from "../planner/plant-glyphs";
import { photoQueries, photosEnabled, plantPhoto, type Photo, type PlantLike } from "../util/photos";

export { photosEnabled, setPhotosEnabled } from "../util/photos";

/** Background tint for a plant tile, from its own or its family colour. */
export function tileColor(color: string): string {
  return `color-mix(in srgb, ${color} 22%, var(--hl-surface, #fff))`;
}

@customElement("hl-plant-image")
export class PlantImage extends LitElement {
  @property({ attribute: false }) plant?: PlantLike;
  /** Family or crop colour; tints the illustration tile. */
  @property() color = "#6aa648";
  @property() lang = "en";
  /** ``card`` (library tile), ``hero`` (detail), ``thumb`` (round, in lists). */
  @property({ reflect: true }) size: "card" | "hero" | "thumb" = "card";
  @property({ type: Boolean }) credit = false;

  @state() private photo: Photo | null = null;
  @state() private loaded = false;
  private observer?: IntersectionObserver;
  private wantPhoto = false;
  private onPref = () => this.reset();

  static styles = css`
    :host { display: block; position: relative; overflow: hidden; border-radius: var(--hl-r-md, 10px); flex: none; }
    :host([size="card"]) { height: 112px; }
    :host([size="hero"]) { height: 220px; }
    :host([size="thumb"]) { width: 44px; height: 44px; border-radius: 50%; flex: none; }
    .art { position: absolute; inset: 0; display: grid; place-items: center; }
    .art::before { content: ""; position: absolute; inset: 0;
      background: radial-gradient(circle at 30% 25%, rgba(255,255,255,.55), transparent 55%),
        repeating-linear-gradient(135deg, rgba(255,255,255,.12) 0 6px, transparent 6px 14px); }
    .art svg { position: relative; filter: drop-shadow(0 2px 3px rgba(0,0,0,.18)); }
    img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .3s; }
    img.on { opacity: 1; }
    .credit { position: absolute; right: 6px; bottom: 4px; max-width: calc(100% - 12px); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      font-size: 10px; color: #fff; background: rgba(0,0,0,.45);
      padding: 1px 6px; border-radius: 8px; text-decoration: none; }
    .credit:hover { background: rgba(0,0,0,.65); }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener("hortulus-photos-changed", this.onPref);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.removeEventListener("hortulus-photos-changed", this.onPref);
    this.observer?.disconnect();
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has("plant") || changed.has("lang") || changed.has("size")) this.reset();
  }

  private reset(): void {
    this.photo = null;
    this.loaded = false;
    this.observer?.disconnect();
    // Tiny round thumbnails have no room for the credit a photo's licence requires: illustration only.
    this.wantPhoto = this.size !== "thumb" && !!this.plant && photosEnabled() && photoQueries(this.plant.scientific_name).length > 0;
    if (!this.wantPhoto) return;
    if (typeof IntersectionObserver === "undefined") {
      void this.load();
      return;
    }
    this.observer = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        this.observer?.disconnect();
        void this.load();
      }
    }, { rootMargin: "200px" });
    this.observer.observe(this);
  }

  private async load(): Promise<void> {
    const plant = this.plant;
    if (!plant) return;
    const photo = await plantPhoto(plant, this.lang);
    if (plant === this.plant && this.wantPhoto) this.photo = photo;
  }

  /** Creator and licence, as the photo's licence requires (tooltip only on tiny thumbnails). */
  private renderCredit(photo: Photo): TemplateResult | typeof nothing {
    const text = `© ${photo.artist} · ${photo.license}`;
    if (this.size === "thumb") return nothing;
    return html`<a class="credit" href=${photo.filePage || photo.page} target="_blank" rel="noopener noreferrer"
      title=${`${photo.title} – ${text} (Wikimedia Commons)`}>${this.credit ? text : `© ${photo.license}`}</a>`;
  }

  render(): TemplateResult {
    const p = this.plant;
    const px = this.size === "hero" ? 150 : this.size === "card" ? 84 : 32;
    const name = p ? (p.names?.[this.lang] ?? p.names?.en ?? p.id) : "";
    return html`
      <div class="art" style=${`background:${tileColor(this.color)}`} role="img" aria-label=${name}>
        ${glyphIcon(glyphFor(p), p?.color || this.color, px)}
      </div>
      ${this.photo ? html`<img class=${this.loaded ? "on" : ""} src=${this.photo.src} alt=${name} loading="lazy" referrerpolicy="no-referrer"
        @load=${() => (this.loaded = true)} @error=${() => (this.photo = null)} />` : nothing}
      ${this.photo && this.loaded ? this.renderCredit(this.photo) : nothing}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-plant-image": PlantImage;
  }
}
