import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { CHAPTER_SCENES } from "../src/components/chapter-art";
import { photoQueries, plantPhoto } from "../src/util/photos";

test("photo queries: full scientific name, then genus + species", () => {
  assert.deepEqual(photoQueries("Tagetes patula"), ["Tagetes patula"]);
  assert.deepEqual(photoQueries("Cynara cardunculus var. scolymus"), ["Cynara cardunculus var. scolymus", "Cynara cardunculus"]);
  assert.deepEqual(photoQueries("Fragaria × ananassa"), ["Fragaria × ananassa"]);
  assert.deepEqual(photoQueries(""), []);
  assert.deepEqual(photoQueries(undefined), []);
});

test("plant photo falls back to English Wikipedia and skips pages without a picture", async () => {
  const asked: string[] = [];
  const pages: Record<string, unknown> = {
    "https://nl.wikipedia.org/api/rest_v1/page/summary/Ocimum_basilicum": { type: "standard", title: "Basilicum" },
    "https://en.wikipedia.org/api/rest_v1/page/summary/Ocimum_basilicum": {
      type: "standard", title: "Basil", thumbnail: { source: "https://upload.wikimedia.org/basil.jpg" },
      content_urls: { desktop: { page: "https://en.wikipedia.org/wiki/Basil" } },
    },
  };
  globalThis.fetch = (async (url: string) => {
    asked.push(url);
    const body = pages[url];
    return { ok: !!body, json: async () => body } as Response;
  }) as typeof fetch;
  const photo = await plantPhoto({ id: "basil", scientific_name: "Ocimum basilicum" }, "nl");
  assert.equal(photo?.src, "https://upload.wikimedia.org/basil.jpg");
  assert.equal(photo?.page, "https://en.wikipedia.org/wiki/Basil");
  assert.equal(asked.length, 2);
  // offline: no photo, and nothing remembered
  globalThis.fetch = (async () => { throw new TypeError("offline"); }) as typeof fetch;
  assert.equal(await plantPhoto({ id: "x", scientific_name: "Allium cepa" }, "en"), null);
});

test("every handbook chapter has an illustration", () => {
  const ids = readdirSync("../custom_components/garden_manager/data/handbook/en")
    .filter((f) => f.endsWith(".md")).map((f) => f.replace(/^\d+-/, "").replace(/\.md$/, ""));
  assert.ok(ids.length > 10);
  for (const id of ids) assert.ok(CHAPTER_SCENES.includes(id), id);
});
