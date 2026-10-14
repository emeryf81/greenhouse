import { test } from "node:test";
import assert from "node:assert/strict";
import { seasonOf, themeAttribute } from "../src/util/theme";
import { paletteFor } from "../src/styles/palettes";

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

test("light or dark can be forced, night stays dark", () => {
  assert.deepEqual(themeAttribute("earth", "2026-10-12", false, "dark"), { theme: "earth", dark: true });
  assert.deepEqual(themeAttribute("season", "2026-10-12", false, "light"), { theme: "season-autumn", dark: false });
  assert.deepEqual(themeAttribute("night", "2026-10-12", false, "light"), { theme: "night", dark: true });
});

test("every theme has a palette, dark ones start from the dark base", () => {
  for (const theme of ["earth", "night", "season-spring", "season-summer", "season-autumn", "season-winter"]) {
    const dark = paletteFor(theme, true);
    assert.equal(dark["color-scheme"], "dark");
    assert.ok(dark["--hl-bg"] && dark["--hl-primary"], theme);
  }
  assert.deepEqual(paletteFor("classic", false), {});
  assert.ok(paletteFor("earth", false)["--hl-primary"]);
  assert.notEqual(paletteFor("season-summer", true)["--hl-primary"], paletteFor("season-winter", true)["--hl-primary"]);
});
