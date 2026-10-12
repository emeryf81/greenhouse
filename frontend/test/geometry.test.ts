import { test } from "node:test";
import assert from "node:assert/strict";
import { bedAt, clampInto, defaultFootprint, findFreeSpot, plantPositions, snap } from "../src/planner/geometry";
import type { Bed, Plant, Planting } from "../src/types";

const bed = { id: "b", x_cm: 100, y_cm: 50, width_cm: 200, length_cm: 100 } as Bed;
const tomato = { spacing_cm: 50, row_spacing_cm: 75 } as Plant;
const planting = (p: Partial<Planting>) => ({ x_cm: 0, y_cm: 0, width_cm: 50, length_cm: 50, layout: "block", count: null, ...p }) as Planting;

test("snap rounds to the grid", () => {
  assert.equal(snap(14, 10), 10);
  assert.equal(snap(15, 10), 20);
  assert.equal(snap(7.3, 0), 7.3);
});

test("plant positions match the backend algorithm", () => {
  assert.equal(plantPositions(planting({ layout: "single" }), tomato).length, 1);
  assert.equal(plantPositions(planting({ layout: "row", width_cm: 200, length_cm: 50 }), tomato).length, 4);
  assert.equal(plantPositions(planting({ layout: "block", width_cm: 100, length_cm: 100 }), tomato).length, 4);
});

test("bed hit testing and clamping", () => {
  assert.equal(bedAt([bed], 150, 60)?.id, "b");
  assert.equal(bedAt([bed], 10, 10), undefined);
  assert.deepEqual(clampInto({ x: 180, y: 90, w: 50, h: 50 }, { x: 0, y: 0, w: 200, h: 100 }), { x: 150, y: 50, w: 50, h: 50 });
});

test("row footprint spans the long side of the bed", () => {
  assert.deepEqual(defaultFootprint(tomato, "row", bed), { w: 200, h: 40 });
});

test("free spot search skips occupied space", () => {
  const spot = findFreeSpot(bed, { w: 50, h: 50 }, [{ x: 0, y: 0, w: 60, h: 100 }], 10);
  assert.deepEqual(spot, { x: 60, y: 0 });
  assert.equal(findFreeSpot(bed, { w: 300, h: 50 }, [], 10), null);
});
