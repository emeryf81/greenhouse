import { test } from "node:test";
import assert from "node:assert/strict";
import { alignRects } from "../src/planner/geometry";
import { headings, inline, slug } from "../src/components/markdown";

const rects = [
  { x: 10, y: 0, w: 50, h: 20 },
  { x: 100, y: 40, w: 30, h: 30 },
  { x: 300, y: 10, w: 20, h: 10 },
];

test("align left / right / top / bottom", () => {
  assert.deepEqual(alignRects(rects, "left").map((r) => r.x), [10, 10, 10]);
  assert.deepEqual(alignRects(rects, "right").map((r) => r.x + r.w), [320, 320, 320]);
  assert.deepEqual(alignRects(rects, "top").map((r) => r.y), [0, 0, 0]);
  assert.deepEqual(alignRects(rects, "bottom").map((r) => r.y + r.h), [70, 70, 70]);
});

test("distribute keeps the outer items and equalises the gaps", () => {
  const out = alignRects(rects, "hdistribute");
  assert.equal(out[0].x, 10);
  assert.equal(out[2].x + out[2].w, 320);
  const gap1 = out[1].x - (out[0].x + out[0].w);
  const gap2 = out[2].x - (out[1].x + out[1].w);
  assert.ok(Math.abs(gap1 - gap2) <= 1);
  // order of the input is preserved
  assert.equal(out[1].w, 30);
});

test("align needs two items and never mutates the input", () => {
  const single = [{ x: 5, y: 5, w: 1, h: 1 }];
  assert.deepEqual(alignRects(single, "left"), single);
  alignRects(rects, "left");
  assert.equal(rects[1].x, 100);
});

test("markdown helpers", () => {
  assert.equal(slug("Water & Kc: stadia!"), "water-kc-stadia");
  assert.equal(slug("Bodem klaarmaken – één"), "bodem-klaarmaken-een");
  const hs = headings("# T\n## Eén\ntext\n### Sub\n## Twee");
  assert.deepEqual(hs.map((h) => [h.level, h.id]), [[2, "een"], [3, "sub"], [2, "twee"]]);
  const parts = inline("a **b** c *d* `e`");
  assert.equal(parts.filter((p) => typeof p === "string").join(""), "a  c  ");
  assert.equal(parts.length, 6);
});

import { layoutOf, presentIn, ZONE_CATEGORIES } from "../src/util/garden";

test("nothing carries over by itself: only seasons a planting was moved into", () => {
  const p = { season: 2024, removed_season: null, last_season: null } as unknown as Parameters<typeof presentIn>[0];
  assert.equal(presentIn(p, true, 2023), false);
  assert.equal(presentIn(p, true, 2024), true);
  assert.equal(presentIn(p, true, 2025), false); // perennial not moved over yet
  const carried = { ...p, last_season: 2027 };
  assert.equal(presentIn(carried, true, 2027), true);
  assert.equal(presentIn(carried, true, 2028), false);
  assert.equal(presentIn({ ...carried, removed_season: 2026 }, true, 2026), false);
  assert.equal(presentIn(p, false, 2025), false);
  assert.deepEqual(ZONE_CATEGORIES.orchard, ["fruit"]);
});

test("garden plan of a season: live, stored or none", () => {
  const snap = {
    zones: [{ id: "z" }], beds: [], features: [], layout_season: 2026,
    layouts: { "2027": { zones: [{ id: "z27" }], beds: [], features: [] } },
  } as unknown as Parameters<typeof layoutOf>[0];
  assert.equal(layoutOf(snap, 2026)?.zones[0].id, "z");
  assert.equal(layoutOf(snap, 2027)?.zones[0].id, "z27");
  assert.equal(layoutOf(snap, 2028), null);
});
