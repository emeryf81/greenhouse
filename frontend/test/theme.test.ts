import { test } from "node:test";
import assert from "node:assert/strict";
import { seasonOf, themeAttribute } from "../src/util/theme";

test("season follows the month and the hemisphere", () => {
  assert.equal(seasonOf("2026-04-10"), "spring");
  assert.equal(seasonOf("2026-07-01"), "summer");
  assert.equal(seasonOf("2026-10-12"), "autumn");
  assert.equal(seasonOf("2026-01-05"), "winter");
  assert.equal(seasonOf("2026-01-05", true), "summer");
});

test("theme attribute", () => {
  assert.deepEqual(themeAttribute("night", "2026-05-01"), { theme: "night", dark: true });
  assert.deepEqual(themeAttribute("season", "2026-10-12"), { theme: "season-autumn", dark: null });
  assert.deepEqual(themeAttribute("earth", "2026-10-12"), { theme: "earth", dark: null });
});
