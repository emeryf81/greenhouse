// A quick journal note with photos for one crop or bed, right where you look at it
// (planner popup, crops popup), plus the last notes about it.
import { LitElement, css, html, nothing, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { photoUrl, type GardenApi } from "../api";
import "./photo-timeline";
import type { Translate } from "../i18n";
import { shared } from "../styles/tokens";
import type { JournalEntry, Snapshot } from "../types";
import { formatDate } from "../util/garden";

const KINDS = ["observation", "problem", "note", "milestone"] as const;

@customElement("hl-quick-note")
export class QuickNote extends LitElement {
  @property({ attribute: false }) snapshot!: Snapshot;
  @property({ attribute: false }) api!: GardenApi;
  @property({ attribute: false }) t!: Translate;
  @property() lang = "en";
  @property() plantingId = "";
  @property() bedId = "";
  @property({ type: Boolean }) admin = true;
  @state() private text = "";
  @state() private kind: JournalEntry["kind"] = "observation";
  @state() private photos: string[] = [];
  @state() private busy = false;

  static styles = [
    shared,
    css`
      :host { display: block; }
      textarea { min-height: 54px; }
      .photos { display: flex; gap: 6px; flex-wrap: wrap; }
      .photos img { width: 56px; height: 56px; object-fit: cover; border-radius: 8px; }
      .entry { display: flex; gap: 8px; padding: 6px 0; border-top: 1px solid var(--hl-border); font-size: var(--hl-fs-sm); }
      .entry img { width: 48px; height: 48px; object-fit: cover; border-radius: 6px; flex: none; }
      .file { position: relative; overflow: hidden; }
      .file input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
    `,
  ];

  private get entries(): JournalEntry[] {
    return (this.snapshot.journal ?? [])
      .filter((e) => (this.plantingId && e.planting_id === this.plantingId) || (!this.plantingId && this.bedId && e.bed_id === this.bedId))
      .sort((a, b) => (a.at < b.at ? 1 : -1))
      .slice(0, 3);
  }

  private toast(message: string): void {
    this.dispatchEvent(new CustomEvent("hl-toast", { detail: { message }, bubbles: true, composed: true }));
  }

  private async addPhotos(ev: Event): Promise<void> {
    const input = ev.target as HTMLInputElement;
    this.busy = true;
    try {
      for (const file of [...(input.files ?? [])]) this.photos = [...this.photos, await this.api.uploadPhoto(file)];
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    } finally {
      this.busy = false;
      input.value = "";
    }
  }

  private async save(): Promise<void> {
    if (!this.text.trim() && !this.photos.length) return;
    this.busy = true;
    try {
      await this.api.saveJournal({
        text: this.text.trim(), kind: this.kind, photos: this.photos,
        planting_id: this.plantingId || null, bed_id: this.plantingId ? null : this.bedId || null,
      });
      this.text = "";
      this.photos = [];
      this.toast(this.t("journal.saved"));
    } catch (err) {
      this.toast(this.t("common.error", { message: (err as Error).message }));
    } finally {
      this.busy = false;
    }
  }

  render(): TemplateResult {
    return html`<div class="stack" style="gap:6px">
      ${this.admin ? html`
        <textarea .value=${this.text} placeholder=${this.t("note.placeholder")} aria-label=${this.t("journal.text")}
          @input=${(e: Event) => (this.text = (e.target as HTMLTextAreaElement).value)}></textarea>
        ${this.photos.length ? html`<div class="photos">${this.photos.map((id) => html`<img src=${photoUrl(id, "128x128")} alt="" />`)}</div>` : nothing}
        <div class="row wrap" style="gap:6px">
          <select style="width:auto" aria-label=${this.t("journal.kind")} @change=${(e: Event) => (this.kind = (e.target as HTMLSelectElement).value as JournalEntry["kind"])}>
            ${KINDS.map((k) => html`<option value=${k} ?selected=${this.kind === k}>${this.t(`journal.kind.${k}`)}</option>`)}</select>
          <span class="btn small ghost file"><ha-icon icon="mdi:camera-outline"></ha-icon>${this.t("note.photo")}
            <input type="file" accept="image/*" capture="environment" multiple ?disabled=${this.busy} @change=${this.addPhotos} /></span>
          <span class="spacer"></span>
          <button class="btn small primary" ?disabled=${this.busy || (!this.text.trim() && !this.photos.length)} @click=${() => this.save()}>${this.t("note.save")}</button>
        </div>` : nothing}
      <hl-photo-timeline .journal=${this.snapshot.journal ?? []} .t=${this.t} lang=${this.lang} plantingId=${this.plantingId ?? ""} bedId=${this.bedId ?? ""}></hl-photo-timeline>
      ${this.entries.map((e) => html`<div class="entry">
        ${e.photos[0] ? html`<img src=${photoUrl(e.photos[0], "128x128")} alt="" />` : nothing}
        <div><span class="xs muted">${formatDate(e.at.slice(0, 10), this.lang)} · ${this.t(`journal.kind.${e.kind}`)}</span><br />${e.text}</div>
      </div>`)}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "hl-quick-note": QuickNote;
  }
}
