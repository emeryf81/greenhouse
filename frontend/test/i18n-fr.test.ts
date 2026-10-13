import { test } from "node:test";
import assert from "node:assert/strict";
import { en } from "../src/i18n/en";
import { fr } from "../src/i18n/fr";
import { makeTranslator, normalizeLang, tagLabel } from "../src/i18n";
import { familyName, localeOf } from "../src/util/garden";

const ph = (s: string) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort().join(",");

test("French catalog has exactly the English keys", () => {
  assert.deepEqual(Object.keys(en).filter((k) => !(k in fr)), []);
  assert.deepEqual(Object.keys(fr).filter((k) => !(k in en)), []);
});

test("French placeholders match English", () => {
  for (const key of Object.keys(en)) assert.equal(ph(fr[key]), ph(en[key]), key);
});

test("French translator, tags and locale", () => {
  assert.equal(normalizeLang("fr-BE"), "fr");
  assert.equal(normalizeLang("fr"), "fr");
  const t = makeTranslator("fr-BE");
  assert.equal(t("alert.frost", { level: "high", temp: -2, when: "when.tonight" }), "Risque de gel élevé : -2 °C attendus cette nuit");
  assert.equal(tagLabel("aphids", "fr"), "pucerons");
  assert.equal(tagLabel("aphids", "nl"), "bladluis");
  assert.equal(tagLabel("aphids", "en"), "Aphids");
  assert.equal(localeOf("fr"), "fr-BE");
  assert.equal(localeOf("nl"), "nl-BE");
  assert.equal(localeOf("en"), "en-GB");
  const fams = { solanaceae: { en: "Nightshades", nl: "Nachtschadefamilie", color: "#f00" } };
  assert.equal(familyName(fams, "solanaceae", "fr"), "Nightshades");
  assert.equal(familyName(fams, "solanaceae", "nl"), "Nachtschadefamilie");
  assert.equal(familyName(fams, "unknown", "fr"), undefined);
});
