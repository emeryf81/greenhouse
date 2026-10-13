/**
 * What covers what on the site plan.
 *
 * A house, a path, a hedge or a growing zone put on the lawn takes that piece
 * away from the lawn: the lawn is what is left.  The same goes for every
 * ground cover (lawn, flower border, terrace, decking, driveway, parking,
 * street) - a smaller one on a bigger one (a terrace in the lawn) takes its
 * piece too.  A tree or shrub stands over the ground without replacing it:
 * a tree on the terrace leaves the terrace whole.  Zones lose what buildings,
 * paths and other solid elements cover; the planner and the print show the
 * net area everywhere.
 */
import type { Feature, Zone } from "../types";

export interface Box { x: number; y: number; w: number; h: number }

/** Ground covers: they give way to whatever is placed on them. */
export const GROUND_COVER = new Set(["lawn", "flowerbed", "terrace", "decking", "driveway", "parking", "street"]);
/** Canopy: stands over the ground, takes nothing away. */
export const CANOPY = new Set(["tree", "shrub"]);

const boxOf = (i: { x_cm: number; y_cm: number; width_cm: number; length_cm: number }): Box =>
  ({ x: i.x_cm, y: i.y_cm, w: i.width_cm, h: i.length_cm });

function overlap(a: Box, b: Box): Box | null {
  const x = Math.max(a.x, b.x);
  const y = Math.max(a.y, b.y);
  const x2 = Math.min(a.x + a.w, b.x + b.w);
  const y2 = Math.min(a.y + a.h, b.y + b.h);
  return x2 > x && y2 > y ? { x, y, w: x2 - x, h: y2 - y } : null;
}

/** Area (cm²) of the union of rectangles (coordinate compression; plans have tens of items). */
export function unionArea(boxes: Box[]): number {
  if (!boxes.length) return 0;
  const xs = [...new Set(boxes.flatMap((b) => [b.x, b.x + b.w]))].sort((a, b) => a - b);
  let total = 0;
  for (let i = 0; i < xs.length - 1; i++) {
    const x0 = xs[i];
    const x1 = xs[i + 1];
    const spans = boxes.filter((b) => b.x <= x0 && b.x + b.w >= x1).map((b) => [b.y, b.y + b.h]).sort((a, b) => a[0] - b[0]);
    let covered = 0;
    let end = -Infinity;
    for (const [s, e] of spans) {
      if (e <= end) continue;
      covered += e - Math.max(s, end);
      end = e;
    }
    total += covered * (x1 - x0);
  }
  return total;
}

/** The items lying on top of a garden element (the parts of them inside it). */
export function coversOfFeature(f: Feature, features: Feature[], zones: Zone[]): Box[] {
  if (!GROUND_COVER.has(f.type)) return [];
  const me = boxOf(f);
  const area = me.w * me.h;
  const out: Box[] = [];
  for (const z of zones) {
    const o = overlap(me, boxOf(z));
    if (o) out.push(o);
  }
  for (const g of features) {
    if (g.id === f.id || CANOPY.has(g.type)) continue;
    const gb = boxOf(g);
    if (GROUND_COVER.has(g.type) && gb.w * gb.h >= area) continue; // only a smaller ground cover lies on top
    const o = overlap(me, gb);
    if (o) out.push(o);
  }
  return out;
}

/** The solid elements (buildings, paths, hedges ...) inside a growing zone. */
export function coversOfZone(z: Zone, features: Feature[]): Box[] {
  const me = boxOf(z);
  return features
    .filter((g) => !CANOPY.has(g.type) && !GROUND_COVER.has(g.type))
    .map((g) => overlap(me, boxOf(g)))
    .filter((o): o is Box => o !== null);
}

/** Net area in m² and how much is covered. */
export function netArea(box: Box, covers: Box[]): { net: number; gross: number; covered: number } {
  const gross = (box.w * box.h) / 10_000;
  const covered = unionArea(covers) / 10_000;
  return { net: Math.max(0, gross - covered), gross, covered };
}

export function featureArea(f: Feature, features: Feature[], zones: Zone[]) {
  return netArea(boxOf(f), coversOfFeature(f, features, zones));
}

export function zoneArea(z: Zone, features: Feature[]) {
  return netArea(boxOf(z), coversOfZone(z, features));
}

/** Drawing order of elements: ground covers first (big under small), then the rest. */
export function featureLayers(features: Feature[]): { ground: Feature[]; above: Feature[] } {
  const ground = features.filter((f) => GROUND_COVER.has(f.type)).sort((a, b) => b.width_cm * b.length_cm - a.width_cm * a.length_cm);
  return { ground, above: features.filter((f) => !GROUND_COVER.has(f.type)) };
}

/** Site totals for the terrain step: green, paved, built, growing. */
export function siteSummary(features: Feature[], zones: Zone[]) {
  const sum = (types: string[]) => features.filter((f) => types.includes(f.type)).reduce((s, f) => s + featureArea(f, features, zones).net, 0);
  return {
    lawn: sum(["lawn"]),
    borders: sum(["flowerbed"]),
    paved: sum(["terrace", "decking", "driveway", "parking", "street", "path", "stone_path", "wood_path", "stepping_stones", "bark_path"]),
    built: sum(["house", "carport", "shed"]),
    growing: zones.reduce((s, z) => s + zoneArea(z, features).net, 0),
  };
}
