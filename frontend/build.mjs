// Bundles the panel into a single ES module served by the integration.
import { build, context } from "esbuild";
import { rmSync } from "node:fs";

const watch = process.argv.includes("--watch");
const test = process.argv.includes("--test");

if (test) {
  // Compile pure modules + node:test specs for `node --test`.
  rmSync(".test-dist", { recursive: true, force: true });
  await build({
    entryPoints: ["test/geometry.test.ts", "test/history.test.ts", "test/i18n.test.ts", "test/planner.test.ts"],
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
  entryPoints: ["src/hortulus-panel.ts"],
  outfile: "../custom_components/garden_manager/frontend/hortulus-panel.js",
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
