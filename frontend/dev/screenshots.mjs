// Take the README screenshots of the real panel (dev harness + engine-generated data).
//
//   for l in en nl fr; do python frontend/dev/make_snapshot.py $l frontend/dev/data-$l.json; done
//   node frontend/dev/screenshots.mjs [lang ...]      (PW_CHROMIUM=/path/to/chromium for a local browser)
//
// Writes docs/images/<lang>/<name>.png.  Optional: frontend/dev/icons.json ({"mdi:sprout": "<svg path>"}).
import { createServer } from "node:http";
import { readFile, mkdir } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const ROOT = normalize(join(fileURLToPath(new URL(".", import.meta.url)), "..", ".."));
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml" };
const server = createServer(async (req, res) => {
  const path = normalize(join(ROOT, decodeURIComponent(new URL(req.url, "http://x").pathname)));
  if (path !== ROOT && !path.startsWith(ROOT.endsWith(sep) ? ROOT : ROOT + sep)) return res.writeHead(403).end();
  try {
    res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" }).end(await readFile(path));
  } catch {
    res.writeHead(404).end();
  }
});
await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
const base = `http://127.0.0.1:${server.address().port}/frontend/dev/index.html`;
const browser = await chromium.launch(process.env.PW_CHROMIUM ? { executablePath: process.env.PW_CHROMIUM } : {});

for (const lang of process.argv.slice(2).length ? process.argv.slice(2) : ["en", "nl", "fr"]) {
  try {
    await readFile(join(ROOT, "frontend", "dev", `data-${lang}.json`));
  } catch {
    console.error(`frontend/dev/data-${lang}.json is missing: run  python frontend/dev/make_snapshot.py ${lang} frontend/dev/data-${lang}.json`);
    process.exit(1);
  }
}
const failures = [];
const only = process.env.ONLY ? process.env.ONLY.split(",") : null;
// the panel is there and its tab has drawn something (not just the loading view)
const rendered = async (p) => {
  await p.locator("hortulus-panel").waitFor();
  await p.waitForFunction(() => {
    const root = document.querySelector("hortulus-panel")?.shadowRoot;
    const tab = root?.querySelector(".view")?.firstElementChild ?? root?.querySelector("hl-wall-view");
    return !!tab && (tab.shadowRoot?.childElementCount ?? 0) > 0;
  });
  await p.waitForTimeout(600);
};
const langs = process.argv.slice(2).length ? process.argv.slice(2) : ["en", "nl", "fr"];
for (const lang of langs) {
  const out = join(ROOT, "docs", "images", lang);
  await mkdir(out, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.route(/wikipedia|wikimedia/, (route) => route.abort());
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const open = async (tab, extra = "") => {
    await page.goto(`${base}?tab=${tab}&lang=${lang}${extra}`);
    await rendered(page);
  };
  const shot = (name, opts = {}) => page.screenshot({ path: join(out, `${name}.png`), ...opts });
  const view = (sel) => page.locator(sel);

  for (const tab of ["dashboard", "planner", "layout", "crops", "calendar", "weather", "journal", "cooking", "library", "advice", "handbook", "analysis", "print", "settings"]) {
    await open(tab);
    await shot(tab);
  }
  // states: a chip of a view, a popup, a filled form
  const attempt = async (name, fn) => {
    if (only && !only.includes(name)) return;
    try {
      await fn();
    } catch (e) {
      failures.push(`${lang}/${name}`);
      console.warn(lang, name, "failed:", String(e.message).split("\n")[0]);
    }
  };
  const chip = async (tab, host, n, name, extra = "") => attempt(name, async () => {
    await open(tab, extra);
    await view(`${host} button.chip`).nth(n).click();
    await page.waitForTimeout(900);
    await shot(name);
  });
  await chip("calendar", "hl-calendar-view", 3, "calendar-timeline");
  await chip("calendar", "hl-calendar-view", 4, "calendar-year");
  await chip("crops", "hl-crops-view", 1, "crops-timeline");
  await chip("crops", "hl-crops-view", 2, "crops-sowing-plan");
  await chip("crops", "hl-crops-view", 5, "crops-harvest-forecast");
  await chip("journal", "hl-journal-view", 1, "journal-harvest");
  await chip("journal", "hl-journal-view", 2, "journal-kitchen");
  await chip("journal", "hl-journal-view", 3, "journal-seeds");
  await chip("journal", "hl-journal-view", 4, "journal-water");
  await chip("journal", "hl-journal-view", 5, "journal-report");
  await attempt("library-plant", async () => {
    await open("library");
    await view("hl-library-view button.pcard").nth(4).click();
    await page.waitForTimeout(900);
    await shot("library-plant");
  });
  await attempt("cooking-dish", async () => {
    await open("cooking");
    await page.evaluate(() => localStorage.clear());
    await view("hl-cooking-view .chapter:not(.menus)").nth(1).locator("button.recipe").first().click();
    await view("hl-modal dialog[open]").first().waitFor();
    await page.waitForTimeout(1200);
    await shot("cooking-dish");
    await view("hl-modal dialog[open]").first().evaluate((d) => d.querySelector("h2")?.scrollIntoView?.());
  });
  await attempt("cooking-shopping", async () => {
    await open("cooking");
    await page.evaluate(() => localStorage.clear());
    const menu = view("hl-cooking-view section.menus article.menu").first();
    await menu.waitFor();
    await menu.locator("button").nth(-2).click();
    await view("hl-cooking-view button[role=tab]").nth(2).click();
    await page.waitForTimeout(900);
    await shot("cooking-shopping");
  });
  await attempt("cooking-menus", async () => {
    await open("cooking");
    await view("hl-cooking-view section.menus").first().scrollIntoViewIfNeeded();
    await page.mouse.wheel(0, 10);
    await shot("cooking-menus", { clip: { x: 0, y: 60, width: 1440, height: 840 } });
  });
  await attempt("advice-answer", async () => {
    await open("advice");
    await view("hl-advice-view button.primary").first().click();
    await page.waitForTimeout(1200);
    await shot("advice-answer");
  });
  await attempt("planner-crop", async () => {
    await open("planner");
    await page.mouse.click(587, 495); // picks a crop; its Details button opens the popup
    await view("hl-planner-view .step-tip button").first().click();
    await view("hl-modal dialog[open]").first().waitFor({ timeout: 8000 });
    await page.waitForTimeout(900);
    await shot("planner-crop");
  });
  await open("wall");
  await shot("wall");
  await open("dashboard", "&dark=1");
  await shot("dashboard-dark");
  const phone = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
  const mobile = await phone.newPage();
  await mobile.route(/wikipedia|wikimedia/, (route) => route.abort());
  for (const [tab, name] of [["dashboard", "mobile-dashboard"], ["planner", "mobile-planner"], ["cooking", "mobile-cooking"]]) {
    await mobile.goto(`${base}?tab=${tab}&lang=${lang}&narrow=1`);
    await rendered(mobile);
    await mobile.screenshot({ path: join(out, `${name}.png`) });
  }
  await phone.close();
  if (errors.length) console.warn(lang, "page errors:", errors.slice(0, 5));
  await ctx.close();
  console.log("done", lang);
}
await browser.close();
server.close();
if (failures.length) {
  console.error("screenshot failures:", failures.join(", "));
  process.exitCode = 1;
}
