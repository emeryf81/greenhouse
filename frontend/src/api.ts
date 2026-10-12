// Thin, typed wrapper around the garden_manager websocket commands.
import type {
  AutofillResult,
  CompatibilityReport,
  GlossaryEntry,
  HandbookChapterMeta,
  IrrigationPlan,
  PrintOptions,
  Resources,
  FamilyInfo,
  HomeAssistant,
  Plant,
  PlanDoc,
  Planting,
  Bed,
  Settings,
  Snapshot,
} from "./types";

const D = "garden_manager";

export class GardenApi {
  constructor(private hass: HomeAssistant) {}

  setHass(hass: HomeAssistant): void {
    this.hass = hass;
  }

  private call<T>(type: string, payload: Record<string, unknown> = {}): Promise<T> {
    return this.hass.connection.sendMessagePromise<T>({ type: `${D}/${type}`, ...payload });
  }

  subscribe(cb: (snapshot: Snapshot) => void): Promise<() => Promise<void>> {
    return this.hass.connection.subscribeMessage<Snapshot>(cb, { type: `${D}/subscribe` });
  }

  plants(): Promise<{ plants: Plant[]; families: Record<string, FamilyInfo>; overrides: Record<string, unknown> }> {
    return this.call("plants");
  }

  savePlant(plant: Partial<Plant> & { id: string }, mode: "custom" | "override"): Promise<{ plant: Plant }> {
    return this.call("plants/save", { plant, mode });
  }

  deletePlant(plantId: string): Promise<void> {
    return this.call("plants/delete", { plant_id: plantId });
  }

  plantWindows(plantId: string, zoneId?: string | null, season?: number) {
    return this.call<{
      season: number;
      windows: Record<"indoor_sow" | "direct_sow" | "transplant", { start: string; end: string }[]> & {
        extension_weeks: number;
        greenhouse_ok: boolean;
      };
      companions: { plant_id: string; strength: number }[];
      enemies: string[];
    }>("plants/windows", { plant_id: plantId, zone_id: zoneId ?? null, season: season ?? null });
  }

  savePlan(doc: PlanDoc, baseRevision: number | null): Promise<{ revision: number }> {
    return this.call("plan/save", { ...doc, base_revision: baseRevision });
  }

  checkBed(bed: Bed, plantings: Planting[]): Promise<CompatibilityReport> {
    return this.call("plan/check", { bed, plantings });
  }

  succession(planting: Planting, count: number, intervalDays: number | null, placement: "split" | "stack") {
    return this.call<{ plantings: Planting[]; dropped: number }>("plan/succession", {
      planting,
      count,
      interval_days: intervalDays,
      placement,
    });
  }

  exportPlan(format: "json" | "yaml", includeTasks = false): Promise<{ filename: string; content: string }> {
    return this.call("plan/export", { format, include_tasks: includeTasks });
  }

  importPlan(content: string, mode: "merge" | "replace") {
    return this.call<{ counts: Record<string, number>; revision: number }>("plan/import", { content, mode });
  }

  addTask(task: {
    title: string;
    due?: string | null;
    task_type?: string;
    description?: string;
    priority?: string;
    estimated_minutes?: number | null;
    bed_id?: string | null;
    recurrence_days?: number | null;
  }): Promise<{ task_id: string }> {
    return this.call("tasks/add", task);
  }

  taskAction(
    taskId: string,
    action: "complete" | "skip" | "postpone" | "update" | "delete" | "reopen",
    extra: { note?: string; photos?: string[]; days?: number; to?: string; cascade?: boolean; changes?: Record<string, unknown> } = {},
  ): Promise<{ next_task_id?: string | null; shifted?: string[]; warnings?: string[] }> {
    return this.call("tasks/action", { task_id: taskId, action, ...extra });
  }

  saveSettings(settings: Partial<Settings> | Record<string, unknown>): Promise<{ settings: Settings }> {
    return this.call("settings/save", { settings });
  }

  // -- autofill ----------------------------------------------------------- //
  autofill(opts: { season?: number; bed_ids?: string[]; replace?: boolean; resources?: Partial<Resources>; max_crops?: number }): Promise<AutofillResult> {
    return this.call("plan/autofill", opts);
  }

  autofillApply(plantings: Planting[], replaceBeds: string[], baseRevision: number | null): Promise<{ revision: number }> {
    return this.call("plan/autofill/apply", { plantings, replace_beds: replaceBeds, base_revision: baseRevision });
  }

  // -- print --------------------------------------------------------------- //
  printPreview(options: Partial<PrintOptions>): Promise<{ pages: string[] }> {
    return this.call("print/render", { options });
  }

  /** Download the PDF through the authenticated HTTP view. */
  async printPdf(options: Partial<PrintOptions>): Promise<{ blob: Blob; filename: string }> {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(options)) {
      if (value === null || value === undefined || value === "") continue;
      query.set(key, Array.isArray(value) ? value.join(",") : String(value));
    }
    const resp = await this.hass.fetchWithAuth(`/api/${D}/print?${query.toString()}`);
    if (!resp.ok) throw new Error(`${resp.status} ${await resp.text()}`);
    const disposition = resp.headers.get("Content-Disposition") ?? "";
    const filename = /filename="([^"]+)"/.exec(disposition)?.[1] ?? "hortulus.pdf";
    return { blob: await resp.blob(), filename };
  }

  exportPdfToConfig(options: Partial<PrintOptions>): Promise<unknown> {
    return this.hass.callService(D, "export_pdf", options as Record<string, unknown>);
  }

  // -- handbook ------------------------------------------------------------ //
  handbookIndex(lang?: string): Promise<{ chapters: HandbookChapterMeta[]; glossary: Record<string, GlossaryEntry> }> {
    return this.call("handbook/index", lang ? { lang } : {});
  }

  handbookChapter(chapterId: string, lang?: string): Promise<HandbookChapterMeta & { body: string }> {
    return this.call("handbook/chapter", { chapter_id: chapterId, ...(lang ? { lang } : {}) });
  }

  handbookSearch(query: string, lang?: string): Promise<{ results: { id: string; title: string; snippet: string; score: number }[] }> {
    return this.call("handbook/search", { query, ...(lang ? { lang } : {}) });
  }

  // -- irrigation ---------------------------------------------------------- //
  irrigationPlan(): Promise<IrrigationPlan> {
    return this.call("irrigation/plan");
  }

  irrigationRun(bedIds?: string[], amountMm?: number): Promise<IrrigationPlan & { started: boolean }> {
    return this.call("irrigation/run", { ...(bedIds ? { bed_ids: bedIds } : {}), ...(amountMm ? { amount_mm: amountMm } : {}) });
  }

  irrigationStop(): Promise<void> {
    return this.call("irrigation/stop");
  }

  /** Upload a photo through HA's image_upload integration; returns the image id. */
  async uploadPhoto(file: File): Promise<string> {
    const body = new FormData();
    body.append("file", file);
    const resp = await this.hass.fetchWithAuth("/api/image/upload", { method: "POST", body });
    if (!resp.ok) throw new Error(`Upload failed (${resp.status})`);
    const json = (await resp.json()) as { id: string };
    return json.id;
  }
}

export const photoUrl = (id: string, size = "256x256"): string =>
  id.startsWith("http") || id.startsWith("/") ? id : `/api/image/serve/${id}/${size}`;
