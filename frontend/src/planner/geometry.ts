// Pure geometry for the planner canvas (centimetres). Mirrors engine/geometry.py.
import type { Bed, LayoutMode, Plant, Planting, Zone } from "../types";

export interface Rect { x: number; y: number; w: number; h: number }

export const snap = (value: number, step: number): number => (step > 0 ? Math.round(value / step) * step : value);

export const bedRect = (b: Bed): Rect => ({ x: b.x_cm, y: b.y_cm, w: b.width_cm, h: b.length_cm });
export const zoneRect = (z: Zone): Rect => ({ x: z.x_cm, y: z.y_cm, w: z.width_cm, h: z.length_cm });

/** Planting footprint in absolute canvas coordinates. */
export const plantingRect = (p: Planting, bed: Bed): Rect => ({
  x: bed.x_cm + p.x_cm,
  y: bed.y_cm + p.y_cm,
  w: p.width_cm,
  h: p.length_cm,
});

export const contains = (r: Rect, x: number, y: number): boolean => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;

export function clampInto(inner: Rect, outer: Rect): Rect {
  const w = Math.min(inner.w, outer.w);
  const h = Math.min(inner.h, outer.h);
  return {
    x: Math.min(Math.max(inner.x, outer.x), outer.x + outer.w - w),
    y: Math.min(Math.max(inner.y, outer.y), outer.y + outer.h - h),
    w,
    h,
  };
}

export function intersects(a: Rect, b: Rect): boolean {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

/** Top-most bed under a canvas point (beds drawn later win). */
export function bedAt(beds: Bed[], x: number, y: number): Bed | undefined {
  for (let i = beds.length - 1; i >= 0; i--) if (contains(bedRect(beds[i]), x, y)) return beds[i];
  return undefined;
}

export function zoneAt(zones: Zone[], x: number, y: number): Zone | undefined {
  for (let i = zones.length - 1; i >= 0; i--) if (contains(zoneRect(zones[i]), x, y)) return zones[i];
  return undefined;
}

/** Default footprint for a freshly dropped plant. */
export function defaultFootprint(plant: Plant, mode: LayoutMode, bed: Bed): { w: number; h: number } {
  const s = Math.max(plant.spacing_cm, 5);
  if (mode === "single") return { w: s, h: s };
  if (mode === "row") {
    const along = bed.width_cm >= bed.length_cm;
    const rowDepth = Math.max(Math.min(plant.row_spacing_cm, 40), 10);
    return along ? { w: bed.width_cm, h: rowDepth } : { w: rowDepth, h: bed.length_cm };
  }
  const side = Math.min(Math.max(s * 2, 30), Math.min(bed.width_cm, bed.length_cm));
  return { w: side, h: side };
}

/** Plant centres relative to the bed - same algorithm as the backend. */
export function plantPositions(p: Planting, plant: Plant): [number, number][] {
  const r = { x: p.x_cm, y: p.y_cm, w: p.width_cm, h: p.length_cm };
  if (p.layout === "single") return [[r.x + r.w / 2, r.y + r.h / 2]];
  const spacing = Math.max(plant.spacing_cm, 1);
  if (p.layout === "row") {
    const alongX = r.w >= r.h;
    const length = alongX ? r.w : r.h;
    const across = alongX ? r.h : r.w;
    const nAlong = Math.max(1, Math.floor(length / spacing));
    const nRows = Math.max(1, Math.floor(across / Math.max(plant.row_spacing_cm, 1)));
    const pts: [number, number][] = [];
    for (let row = 0; row < nRows; row++) {
      for (let i = 0; i < nAlong; i++) {
        const a = (length / nAlong) * (i + 0.5);
        const c = (across / nRows) * (row + 0.5);
        pts.push(alongX ? [r.x + a, r.y + c] : [r.x + c, r.y + a]);
      }
    }
    return pts;
  }
  const nx = Math.max(1, Math.floor(r.w / spacing));
  const ny = Math.max(1, Math.floor(r.h / spacing));
  const pts: [number, number][] = [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) pts.push([r.x + (r.w / nx) * (i + 0.5), r.y + (r.h / ny) * (j + 0.5)]);
  return pts;
}

export function plantCount(p: Planting, plant: Plant): number {
  return p.count && p.count > 0 ? p.count : plantPositions(p, plant).length;
}

/** First free spot for a footprint in a bed (scan in snap steps), or null. */
export function findFreeSpot(bed: Bed, size: { w: number; h: number }, taken: Rect[], step: number): { x: number; y: number } | null {
  const s = Math.max(step, 5);
  for (let y = 0; y + size.h <= bed.length_cm + 0.01; y += s) {
    for (let x = 0; x + size.w <= bed.width_cm + 0.01; x += s) {
      const candidate = { x, y, w: size.w, h: size.h };
      if (!taken.some((t) => intersects(candidate, t))) return { x, y };
    }
  }
  return null;
}

/** Bounding box of everything drawn (for "fit to screen"). */
export function extents(zones: Zone[], beds: Bed[]): Rect {
  const rects = [...zones.map(zoneRect), ...beds.map(bedRect)];
  if (!rects.length) return { x: 0, y: 0, w: 600, h: 400 };
  const x1 = Math.min(...rects.map((r) => r.x));
  const y1 = Math.min(...rects.map((r) => r.y));
  const x2 = Math.max(...rects.map((r) => r.x + r.w));
  const y2 = Math.max(...rects.map((r) => r.y + r.h));
  return { x: x1, y: y1, w: x2 - x1, h: y2 - y1 };
}
