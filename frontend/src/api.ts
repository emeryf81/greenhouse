// Thin, typed wrapper around the garden_manager websocket commands.
import type {
  AdviceResult,
  HarvestEntry,
  JournalEntry,
  RecordsOverview,
  SeedPacket,
  SoilTest,
  QaAnswer,
  QaOptions,
  Supplies,
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
  SyslogPage,
  AnalysisIssue,
  AnalysisResult,
  PlanComparison,
  PlanRef,
  ValveTest,
  ExplainResult,
  TransitionPreview,
  TransitionResult,
  UndoResult,
} from "./types";
import type { CropRow } from "./views/crops-view";

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

  savePlan(doc: PlanDoc, baseRevision: number | null, season?: number): Promise<{ revision: number }> {
    return this.call("plan/save", { ...doc, base_revision: baseRevision, ...(season != null ? { season } : {}) });
  }

  yearPreview(fromSeason?: number): Promise<TransitionPreview> {
    return this.call("year/preview", fromSeason != null ? { from_season: fromSeason } : {});
  }

  yearApply(opts: {
    from_season: number; layout: "copy" | "keep"; zone_ids?: string[] | null; feature_ids?: string[] | null;
    planting_ids: string[]; activate: boolean;
  }): Promise<TransitionResult> {
    return this.call("year/apply", opts);
  }

  deleteLayout(season: number): Promise<void> {
    return this.call("layout/delete", { season });
  }

  syslog(opts: { limit?: number; before?: string | null; include_system?: boolean } = {}): Promise<SyslogPage> {
    return this.call("syslog/list", opts);
  }

  undo(entryId: string, force = false): Promise<UndoResult> {
    return this.call("syslog/undo", { entry_id: entryId, force });
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

  autofillApply(plantings: Planting[], replaceBeds: string[], baseRevision: number | null, planFrom?: number | null): Promise<{ revision: number }> {
    return this.call("plan/autofill/apply", { plantings, replace_beds: replaceBeds, base_revision: baseRevision, ...(planFrom != null ? { plan_from: planFrom } : {}) });
  }

  newPlan(season: number, start: "empty" | "zones" | "zones_beds", oldName?: string): Promise<{ archived: string; name: string; plantings: number; revision: number }> {
    return this.call("plan/new", { season, start, ...(oldName ? { old_name: oldName } : {}) });
  }

  activatePlan(planId: string, oldName?: string): Promise<{ season: number; archived: string; revision: number }> {
    return this.call("plan/activate", { plan_id: planId, ...(oldName ? { old_name: oldName } : {}) });
  }

  deletePlan(planId: string): Promise<void> {
    return this.call("plan/delete", { plan_id: planId });
  }

  plantingsSeason(season: number): Promise<{ season: number; rows: CropRow[] }> {
    return this.call("plantings/season", { season });
  }

  updatePlanting(plantingId: string, changes: Partial<Planting>): Promise<{ planting: Planting; row: CropRow | null; revision: number }> {
    return this.call("planting/update", { planting_id: plantingId, changes });
  }

  updatePlantings(plantingIds: string[], changes: Partial<Planting>): Promise<{ updated: number; revision: number }> {
    return this.call("plantings/update_many", { planting_ids: plantingIds, changes });
  }

  fixIssue(issue: AnalysisIssue): Promise<Record<string, unknown>> {
    return this.call("analysis/fix", { code: issue.code, params: issue.params, refs: issue.refs });
  }

  comparePlans(a: PlanRef, b: PlanRef): Promise<PlanComparison> {
    return this.call("plan/compare", { a, b });
  }

  seasonReport(season: number): Promise<unknown> {
    return this.call("report/season", { season });
  }

  /** Seeds to buy, what can follow a crop, expected harvest per week. */
  planning(season: number): Promise<unknown> {
    return this.call("planning", { season });
  }

  stillPossible(season: number): Promise<{ season: number; plants: { plant_id: string; beds: string[] }[] }> {
    return this.call("analysis/still_possible", { season });
  }

  analysis(): Promise<AnalysisResult> {
    return this.call("analysis");
  }

  explain(plantId: string, season?: number, matchZone = true): Promise<ExplainResult> {
    return this.call("analysis/explain", { plant_id: plantId, season: season ?? null, match_zone: matchZone });
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

  /** Open a valve for a few seconds and check it reports open and closed. */
  irrigationTest(entityId: string, seconds = 5, withPump = true): Promise<ValveTest> {
    return this.call("irrigation/test", { entity_id: entityId, seconds, with_pump: withPump });
  }

  irrigationClose(entityId: string): Promise<{ state: string | null }> {
    return this.call("irrigation/close", { entity_id: entityId });
  }

  /** Home Assistant's recorder: states of a few entities over a period (minimal form). */
  async history(entityIds: string[], start: Date, end = new Date()): Promise<Record<string, { s: string; lu: number }[]>> {
    if (!entityIds.length) return {};
    return this.hass.connection.sendMessagePromise({
      type: "history/history_during_period",
      start_time: start.toISOString(),
      end_time: end.toISOString(),
      entity_ids: entityIds,
      minimal_response: true,
      no_attributes: true,
      significant_changes_only: false,
    });
  }

  // -- advice, Q&A, supplies ------------------------------------------------ //
  advice(): Promise<AdviceResult> {
    return this.call("advice");
  }

  qaOptions(): Promise<QaOptions> {
    return this.call("qa/options");
  }

  qaAsk(subject: string, problem: string, target: string | null): Promise<QaAnswer> {
    return this.call("qa/ask", { subject, problem, target });
  }

  supplies(): Promise<Supplies> {
    return this.call("supplies");
  }

  // -- records ------------------------------------------------------------- //
  records(): Promise<RecordsOverview> {
    return this.call("records/overview");
  }

  logHarvest(entry: {
    planting_id?: string | null; plant_id?: string | null; kg?: number; count?: number | null; quality?: number | null; day?: string; note?: string;
  }): Promise<{ harvest: HarvestEntry }> {
    return this.call("records/harvest/add", entry as Record<string, unknown>);
  }

  deleteRecord(kind: "harvest" | "journal" | "seed", recordId: string): Promise<void> {
    return this.call("records/delete", { kind, record_id: recordId });
  }

  saveJournal(entry: Partial<JournalEntry>): Promise<{ entry: JournalEntry }> {
    return this.call("records/journal/save", { entry });
  }

  saveSeed(packet: Partial<SeedPacket>): Promise<{ packet: SeedPacket }> {
    return this.call("records/seeds/save", { packet });
  }

  saveSoilTest(bedId: string, test: Partial<SoilTest>): Promise<{ test: SoilTest }> {
    return this.call("records/soil/save", { bed_id: bedId, test });
  }

  deleteSoilTest(bedId: string, date: string): Promise<void> {
    return this.call("records/soil/delete", { bed_id: bedId, date });
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
