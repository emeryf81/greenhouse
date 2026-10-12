// Plain-language explanations for machine-readable reasons (autofill, analysis, placement).
import type { Translate } from "../i18n";
import type { Plant, Reason } from "../types";
import { formatDate, plantName } from "./garden";

export function explainReason(r: Reason, t: Translate, lang: string, plants: Map<string, Plant>): string {
  const p = { ...r.params } as Record<string, unknown>;
  for (const key of ["until", "harvest", "frost"]) {
    if (typeof p[key] === "string") p[key] = formatDate(p[key] as string, lang, { day: "numeric", month: "long" });
  }
  if (typeof p.plant_id === "string") p.plant = plantName(plants.get(p.plant_id), lang) || p.plant_id;
  if (typeof p.category === "string") p.category = t(`category.${p.category}`);
  if (Array.isArray(p.allowed)) p.allowed = (p.allowed as string[]).map((c) => t(`category.${c}`)).join(", ");
  if (typeof p.zone_type === "string") p.zone_type = t(`settings.zone_type.${p.zone_type}`);
  if (p.until == null && r.code === "too_late") return t("reason.too_late_nodate", p);
  return t(`reason.${r.code}`, p);
}

/** The distinct explanations of a set of per-bed reasons, most frequent first. */
export function summarizeReasons(byBed: Record<string, Reason[]> | undefined, t: Translate, lang: string, plants: Map<string, Plant>): string[] {
  const count = new Map<string, number>();
  for (const reasons of Object.values(byBed ?? {})) {
    for (const text of new Set(reasons.map((r) => explainReason(r, t, lang, plants)))) count.set(text, (count.get(text) ?? 0) + 1);
  }
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([text]) => text);
}
