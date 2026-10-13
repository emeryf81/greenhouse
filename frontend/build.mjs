// Bundles the panel into a single ES module served by the integration.
import { build, context } from "esbuild";
import { rmSync } from "node:fs";

const watch = process.argv.includes("--watch");
const test = process.argv.includes("--test");

if (test) {
  // Compile pure modules + node:test specs for `node --test`.
  rmSync(".test-dist", { recursive: true, force: true });
  await build({
    entryPoints: ["test/geometry.test.ts", "test/history.test.ts", "test/i18n.test.ts", "test/planner.test.ts", "test/card.test.ts", "test/photos.test.ts", "test/dates.test.ts", "test/theme.test.ts"],
    outdir: ".test-dist",
    bundle: true,
    platform: "node",
    format: "esm",
    outExtension: { ".js": ".mjs" },
    logLevel: "info",
  });
  process.exit(0);
}

const options = {
  // The panel, plus the Lovelace card (a separate small file dashboards load).
  entryPoints: { "hortulus-panel": "src/hortulus-panel.ts", "hortulus-card": "src/card/hortulus-tasks-card.ts" },
  outdir: "../custom_components/garden_manager/frontend",
  bundle: true,
  format: "esm",
  target: "es2022",
  minify: !watch && !process.env.NOMINIFY,
  sourcemap: watch ? "inline" : false,
  legalComments: "none",
  logLevel: "info",
  tsconfig: "tsconfig.json",
};

if (watch) {
  const ctx = await context(options);
  await ctx.watch();
} else {
  await build(options);
}
