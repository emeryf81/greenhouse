import { test } from "node:test";
import assert from "node:assert/strict";
import { displayDate, parseDate } from "../src/util/dates";

test("dates read day-month-year in the panel language", () => {
  assert.equal(displayDate("2026-04-13", "nl"), "13-04-2026");
  assert.equal(displayDate("2026-04-13", "en"), "13/04/2026");
  assert.equal(displayDate(null, "nl"), "");
});

test("typed dates are understood with any separator", () => {
  assert.equal(parseDate("13-4-2026"), "2026-04-13");
  assert.equal(parseDate("13/04/26"), "2026-04-13");
  assert.equal(parseDate("1.2.2027"), "2027-02-01");
  assert.equal(parseDate("2026-04-13"), "2026-04-13");
  assert.equal(parseDate(""), null);
  assert.equal(parseDate("31-02-2026"), undefined);
  assert.equal(parseDate("april"), undefined);
});
