import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { CHAPTER_SCENES } from "../src/components/chapter-art";
import { fileFromUrl, freeLicense, photoQueries, photosEnabled, plantPhoto, setPhotosEnabled } from "../src/util/photos";

test("photo queries: full scientific name, then genus + species", () => {
  assert.deepEqual(photoQueries("Tagetes patula"), ["Tagetes patula"]);
  assert.deepEqual(photoQueries("Cynara cardunculus var. scolymus"), ["Cynara cardunculus var. scolymus", "Cynara cardunculus"]);
  assert.deepEqual(photoQueries("Fragaria × ananassa"), ["Fragaria × ananassa"]);
  assert.deepEqual(photoQueries(""), []);
  assert.deepEqual(photoQueries(undefined), []);
});

const commons = (license: string) => ({
  query: { pages: { "1": { imageinfo: [{ descriptionurl: "https://commons.wikimedia.org/wiki/File:Basil.jpg",
    extmetadata: { Artist: { value: '<a href="x">Jane Doe</a>' }, LicenseShortName: { value: license }, LicenseUrl: { value: "https://cc/by-sa" } } }] } } },
});

function mockFetch(pages: Record<string, unknown>, asked: string[] = [], status: Record<string, number> = {}) {
  globalThis.fetch = (async (url: string) => {
    asked.push(url);
    const key = Object.keys(pages).find((k) => url.startsWith(k));
    const code = Object.entries(status).find(([k]) => url.startsWith(k))?.[1];
    if (code) return { ok: false, status: code, json: async () => ({}) } as Response;
    return { ok: !!key, status: key ? 200 : 404, json: async () => (key ? pages[key] : {}) } as Response;
  }) as typeof fetch;
}

const SUMMARY = {
  type: "standard", title: "Basil", thumbnail: { source: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Basil.jpg/320px-Basil.jpg" },
  originalimage: { source: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Basil.jpg" },
  content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Basil" } },
};

test("plant photo falls back to English Wikipedia and carries creator and licence", async () => {
  const asked: string[] = [];
  mockFetch({
    "https://nl.wikipedia.org/api/rest_v1/page/summary/Ocimum_basilicum": { type: "standard", title: "Basilicum" },
    "https://en.wikipedia.org/api/rest_v1/page/summary/Ocimum_basilicum": SUMMARY,
    "https://en.wikipedia.org/w/api.php": commons("CC BY-SA 4.0"),
  }, asked);
  const photo = await plantPhoto({ id: "basil", scientific_name: "Ocimum basilicum" }, "nl");
  assert.equal(photo?.src, SUMMARY.thumbnail.source);
  assert.equal(photo?.artist, "Jane Doe");
  assert.equal(photo?.license, "CC BY-SA 4.0");
  assert.equal(photo?.filePage, "https://commons.wikimedia.org/wiki/File:Basil.jpg");
  assert.ok(asked.some((u) => u.includes("titles=File%3ABasil.jpg")), asked.join("\n"));
});

test("no photo without a licence we can credit; transient errors are not remembered", async () => {
  mockFetch({
    "https://en.wikipedia.org/api/rest_v1/page/summary/Thymus_vulgaris": SUMMARY,
    "https://en.wikipedia.org/w/api.php": commons("CC BY-NC 2.0"),
  });
  assert.equal(await plantPhoto({ id: "thyme", scientific_name: "Thymus vulgaris" }, "en"), null);
  // 503 now, fine later: the second call asks again and gets the photo.
  mockFetch({}, [], { "https://en.wikipedia.org/api/rest_v1/page/summary/Salvia_officinalis": 503 });
  assert.equal(await plantPhoto({ id: "sage", scientific_name: "Salvia officinalis" }, "en"), null);
  mockFetch({
    "https://en.wikipedia.org/api/rest_v1/page/summary/Salvia_officinalis": SUMMARY,
    "https://en.wikipedia.org/w/api.php": commons("CC0"),
  });
  assert.equal((await plantPhoto({ id: "sage", scientific_name: "Salvia officinalis" }, "en"))?.license, "CC0");
  // offline: no photo, and nothing remembered
  globalThis.fetch = (async () => { throw new TypeError("offline"); }) as typeof fetch;
  assert.equal(await plantPhoto({ id: "x", scientific_name: "Allium cepa" }, "en"), null);
});

test("licences and file names", () => {
  for (const ok of ["CC BY-SA 3.0", "CC BY 2.5", "CC0", "Public domain", "cc-by-sa-4.0"]) assert.ok(freeLicense(ok), ok);
  for (const no of ["CC BY-NC-SA 2.0", "CC BY-ND 4.0", "GFDL", "All rights reserved", ""]) assert.ok(!freeLicense(no), no);
  assert.equal(fileFromUrl(SUMMARY.thumbnail.source), "Basil.jpg");
  assert.equal(fileFromUrl("https://upload.wikimedia.org/wikipedia/commons/a/ab/Tagetes%20patula.jpg"), "Tagetes patula.jpg");
});

test("the photo choice holds even when browser storage is blocked", () => {
  setPhotosEnabled(false); // no localStorage in Node: falls back to memory
  assert.equal(photosEnabled(), false);
  setPhotosEnabled(true);
  assert.equal(photosEnabled(), true);
});

test("every handbook chapter has an illustration", () => {
  const ids = readdirSync("../custom_components/garden_manager/data/handbook/en")
    .filter((f) => f.endsWith(".md")).map((f) => f.replace(/^\d+-/, "").replace(/\.md$/, ""));
  assert.ok(ids.length > 10);
  for (const id of ids) assert.ok(CHAPTER_SCENES.includes(id), id);
});
