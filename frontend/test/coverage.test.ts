import { test } from "node:test";
import assert from "node:assert/strict";
import { featureArea, featureLayers, siteSummary, unionArea, zoneArea } from "../src/planner/coverage";
import type { Feature, Zone } from "../src/types";

const f = (id: string, type: string, x: number, y: number, w: number, h: number): Feature =>
  ({ id, name: id, type, x_cm: x, y_cm: y, width_cm: w, length_cm: h, notes: "" }) as Feature;
const z = (id: string, x: number, y: number, w: number, h: number): Zone =>
  ({ id, name: id, type: "outdoor", x_cm: x, y_cm: y, width_cm: w, length_cm: h }) as unknown as Zone;

test("union of overlapping rectangles counts the overlap once", () => {
  assert.equal(unionArea([{ x: 0, y: 0, w: 100, h: 100 }, { x: 50, y: 50, w: 100, h: 100 }]), 17_500);
});

test("a house, path, zone or smaller terrace on the lawn takes its piece; a tree does not", () => {
  const lawn = f("lawn", "lawn", 0, 0, 1000, 1000); // 100 m²
  const house = f("house", "house", 0, 0, 400, 500); // 20 m²
  const path = f("path", "path", 400, 0, 100, 1000); // 10 m²
  const tree = f("tree", "tree", 600, 600, 300, 300);
  const terrace = f("terrace", "terrace", 600, 0, 200, 200); // 4 m²
  const garden = z("garden", 500, 400, 500, 200); // 10 m², 2 m² of it ... no overlap with the path
  const features = [lawn, house, path, tree, terrace];
  const a = featureArea(lawn, features, [garden]);
  assert.equal(a.gross, 100);
  assert.equal(Math.round(a.net * 10) / 10, 100 - 20 - 10 - 4 - 10);
  // the terrace keeps its area: the tree stands over it
  const tr = f("tree2", "tree", 650, 50, 100, 100);
  assert.equal(featureArea(terrace, [...features, tr], []).net, 4);
  // the bigger lawn does not take anything from the terrace
  assert.equal(featureArea(terrace, features, []).covered, 0);
});

test("a zone loses what buildings and paths cover, not the lawn under it", () => {
  const zone = z("veg", 0, 0, 1000, 500); // 50 m²
  const features = [f("lawn", "lawn", 0, 0, 2000, 2000), f("shed", "shed", 0, 0, 200, 150), f("path", "path", 0, 300, 1000, 60)];
  const a = zoneArea(zone, features);
  assert.equal(Math.round(a.net * 10) / 10, 50 - 3 - 6);
});

test("ground covers are drawn first, biggest at the bottom", () => {
  const { ground, above } = featureLayers([f("t", "terrace", 0, 0, 100, 100), f("h", "house", 0, 0, 10, 10), f("l", "lawn", 0, 0, 1000, 1000)]);
  assert.deepEqual(ground.map((g) => g.id), ["l", "t"]);
  assert.deepEqual(above.map((g) => g.id), ["h"]);
});

test("site summary counts what is left of each kind", () => {
  const s = siteSummary([f("lawn", "lawn", 0, 0, 1000, 1000), f("house", "house", 0, 0, 500, 500)], []);
  assert.equal(s.lawn, 75);
  assert.equal(s.built, 25);
});
