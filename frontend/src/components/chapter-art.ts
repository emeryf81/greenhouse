// Illustrated banners for the handbook: a small garden scene per chapter, built
// from the plant stickers so the handbook looks like the rest of Hortulus.
import { html, type TemplateResult } from "lit";
import { GLYPHS } from "../planner/plant-glyphs";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

/** Glyph, colour, x (0-100), size (relative). */
type Piece = [string, string, number, number];

interface Scene { sky: string; ground: string; pieces: Piece[]; extra?: string }

const GREEN = "#5a9a3c";
const RED = "#d9412b";
const ORANGE = "#ef8a1e";
const PURPLE = "#7a4aa0";
const YELLOW = "#f2c230";

// Extra drawings in a 200x80 box (sun, rain, greenhouse, bugs ...).
const SUN = `<circle cx="178" cy="16" r="9" fill="#f6cf4a"/><g stroke="#f6cf4a" stroke-width="2" stroke-linecap="round"><path d="M178 2v-2M178 32v2M164 16h-2M192 16h2M168 6l-1.5-1.5M188 6l1.5-1.5"/></g>`;
const RAIN = `<g stroke="#5b9fd4" stroke-width="2" stroke-linecap="round"><path d="M30 8l-3 7M44 12l-3 7M58 6l-3 7M72 11l-3 7"/></g>
  <path d="M22 8q6-8 14-3 6-6 13 0 8-2 9 5H22z" fill="#cfe1ef"/>`;
const GLASS = `<path d="M118 62V34l26-16 26 16v28z" fill="#e6f2fb" fill-opacity=".7" stroke="#7fa9c9" stroke-width="1.6"/>
  <path d="M144 18v44M131 26v36M157 26v36M118 46h52" stroke="#7fa9c9" stroke-width="1"/>`;
const CAN = `<g transform="translate(150 34)"><path d="M0 8h22l-2 20H2z" fill="#4c8fbf"/><path d="M22 12l14-8" stroke="#4c8fbf" stroke-width="3" stroke-linecap="round"/>
  <path d="M5 8q6-10 12 0" fill="none" stroke="#2d6a96" stroke-width="2"/><g fill="#7fb6d9"><circle cx="40" cy="8" r="1.4"/><circle cx="43" cy="13" r="1.2"/><circle cx="40" cy="17" r="1"/></g></g>`;
const COMPOST = `<path d="M140 64l10-22h28l10 22z" fill="#7a5a3a"/><path d="M146 52h36M143 58h42" stroke="#5c442a" stroke-width="1.4"/>
  <path d="M154 40q8-10 16 0" fill="none" stroke="#6aa648" stroke-width="2"/>`;
const BUG = `<g transform="translate(150 22)"><ellipse cx="10" cy="10" rx="9" ry="8" fill="${RED}"/><path d="M10 2v16" stroke="#222" stroke-width="1.2"/>
  <circle cx="10" cy="2.5" r="3.2" fill="#222"/><g fill="#222"><circle cx="6" cy="8" r="1.6"/><circle cx="14" cy="8" r="1.6"/><circle cx="6" cy="14" r="1.4"/><circle cx="14" cy="14" r="1.4"/></g></g>`;
const MUSHROOM = `<g transform="translate(150 30)"><path d="M2 14q12-20 24 0z" fill="#c8506a"/><rect x="11" y="13" width="6" height="12" rx="2" fill="#efe3cf"/>
  <g fill="#fff"><circle cx="9" cy="9" r="1.6"/><circle cx="17" cy="7" r="1.4"/><circle cx="21" cy="11" r="1.2"/></g></g>`;
const BASKET = `<g transform="translate(144 34)"><path d="M2 10h36l-5 20H7z" fill="#b5843a"/><path d="M6 10q14-18 28 0" fill="none" stroke="#8a6238" stroke-width="2.5"/>
  <path d="M6 17h28M8 23h24" stroke="#8a6238" stroke-width="1.2"/><circle cx="14" cy="9" r="4" fill="${RED}"/><circle cx="23" cy="8" r="4.4" fill="${ORANGE}"/><circle cx="30" cy="10" r="3.4" fill="${PURPLE}"/></g>`;
const SEEDS = `<g transform="translate(146 26)"><rect width="22" height="30" rx="2" fill="#efe3cf" stroke="#b3a283"/><circle cx="11" cy="12" r="6" fill="${YELLOW}"/>
  <g fill="#8a6a45"><ellipse cx="32" cy="24" rx="2" ry="1.2"/><ellipse cx="37" cy="28" rx="2" ry="1.2"/><ellipse cx="30" cy="30" rx="2" ry="1.2"/></g></g>`;
const SPADE = `<g transform="translate(160 14) rotate(20)"><rect x="3" width="3" height="30" fill="#8a6238"/><path d="M-2 30h13l-1 14q-5 4-11 0z" fill="#9aa3a0"/></g>`;
const ARROWS = `<g fill="none" stroke="#6a84c0" stroke-width="2.2" stroke-linecap="round"><path d="M150 26a16 16 0 0 1 28 6"/><path d="M178 44a16 16 0 0 1-28-6"/></g>
  <path d="M176 26l3 7 5-5zM152 44l-3-7-5 5z" fill="#6a84c0"/>`;
const HEART = `<path d="M100 22c-4-6-12-2-10 4 1 4 10 10 10 10s9-6 10-10c2-6-6-10-10-4z" fill="#e06aa0"/>`;
const SNOW = `<g stroke="#9cc1de" stroke-width="1.6" stroke-linecap="round"><path d="M178 8v16M170 16h16M172 10l12 12M184 10l-12 12"/></g>`;
const SENSOR = `<g transform="translate(150 20)"><rect width="16" height="24" rx="3" fill="#3a4a42"/><rect x="3" y="4" width="10" height="8" rx="1" fill="#9fe0a0"/>
  <rect x="6" y="24" width="4" height="18" fill="#8a8f8c"/><path d="M22 6a10 10 0 0 1 0 12M26 2a16 16 0 0 1 0 20" fill="none" stroke="#6a84c0" stroke-width="1.6" stroke-linecap="round"/></g>`;
const MULCH = `<path d="M0 66q50-6 100 0t100 0v14H0z" fill="#c9a86a"/><g stroke="#a8873f" stroke-width="1.2"><path d="M12 70l8-2M40 72l9 1M80 69l7 2M120 71l8-1M160 70l9 1"/></g>`;
const JAR = `<g transform="translate(150 26)"><rect x="2" y="6" width="22" height="30" rx="4" fill="#cfe7f6" fill-opacity=".8" stroke="#7fa9c9"/>
  <rect y="0" width="26" height="7" rx="2" fill="#c8506a"/><path d="M6 20h14M6 26h14" stroke="#5a9a3c" stroke-width="2"/></g>`;

const SCENES: Record<string, Scene> = {
  planning: { sky: "#eaf4e1", ground: "#8a6a45", pieces: [["carrot", ORANGE, 14, 1], ["lettuce", GREEN, 32, 0.9], ["tomato", RED, 50, 1], ["bean", GREEN, 68, 1.1]], extra: SUN },
  soil: { sky: "#f3ece0", ground: "#6b4f32", pieces: [["potato", "#c9a46a", 20, 0.9], ["clover", GREEN, 40, 0.9], ["leafy", GREEN, 58, 0.9]], extra: SPADE },
  sowing: { sky: "#eef6e8", ground: "#8a6a45", pieces: [["pea", GREEN, 16, 0.8], ["lettuce", GREEN, 34, 0.7], ["root", "#c84a6a", 52, 0.8]], extra: SEEDS },
  watering: { sky: "#e6f1fa", ground: "#7a5d3e", pieces: [["cucumber", GREEN, 20, 1], ["chard", RED, 40, 1], ["lettuce", GREEN, 60, 0.9]], extra: RAIN + CAN },
  fertilizing: { sky: "#f1efe2", ground: "#7a5a3a", pieces: [["cabbage", GREEN, 18, 1], ["pumpkin", ORANGE, 40, 1], ["leek", GREEN, 60, 1]], extra: COMPOST },
  rotation: { sky: "#eaf0f8", ground: "#8a6a45", pieces: [["potato", "#c9a46a", 14, 0.9], ["bean", GREEN, 32, 1], ["cabbage", GREEN, 50, 1], ["onion", "#b07a3a", 68, 0.9]], extra: ARROWS },
  companions: { sky: "#f6eef3", ground: "#8a6a45", pieces: [["tomato", RED, 30, 1.1], ["herb", GREEN, 60, 0.9], ["flower", ORANGE, 76, 0.8]], extra: HEART },
  greenhouse: { sky: "#e8f3f8", ground: "#7a5d3e", pieces: [["pepper", RED, 14, 1], ["eggplant", PURPLE, 34, 1], ["tomato", RED, 54, 0.9]], extra: GLASS },
  pests: { sky: "#eef5e6", ground: "#7a5d3e", pieces: [["cabbage", GREEN, 18, 1], ["lettuce", GREEN, 40, 0.9], ["flower", YELLOW, 60, 0.8]], extra: BUG },
  diseases: { sky: "#efeee8", ground: "#6b4f32", pieces: [["tomato", RED, 18, 1], ["potato", "#c9a46a", 40, 0.9], ["leafy", GREEN, 60, 0.9]], extra: MUSHROOM },
  seasons: { sky: "#eef2f7", ground: "#8a6a45", pieces: [["kale", GREEN, 16, 1], ["leek", GREEN, 34, 1], ["sprouts", GREEN, 52, 1]], extra: SNOW },
  harvest: { sky: "#fbf1df", ground: "#8a6a45", pieces: [["corn", YELLOW, 14, 1.1], ["pumpkin", ORANGE, 34, 1], ["tomato", RED, 54, 0.9]], extra: BASKET },
  seeds: { sky: "#f7f1e2", ground: "#8a6a45", pieces: [["sunflower", YELLOW, 18, 1.2], ["bean", GREEN, 40, 1], ["umbel", "#e8e2c8", 60, 0.9]], extra: SEEDS },
  nodig: { sky: "#f3efe4", ground: "#8a6a45", pieces: [["lettuce", GREEN, 20, 0.9], ["chard", RED, 40, 1], ["kale", GREEN, 60, 1]], extra: MULCH },
  herbs: { sky: "#eef4ec", ground: "#7a5d3e", pieces: [["herb", GREEN, 16, 1], ["lavender", PURPLE, 34, 1], ["umbel", "#e8e2c8", 52, 1], ["herb", "#4f8a34", 70, 0.8]], extra: SUN },
  perennials: { sky: "#eef4ec", ground: "#7a5d3e", pieces: [["rhubarb", RED, 18, 1.1], ["asparagus", GREEN, 40, 1], ["artichoke", "#6f8f6a", 60, 1]] },
  fruit: { sky: "#f4f0e8", ground: "#6f9a45", pieces: [["tree_apple", RED, 16, 1.4], ["berry_bush", PURPLE, 42, 1], ["strawberry", RED, 62, 0.8]], extra: SUN },
  tools: { sky: "#f0efea", ground: "#8a6a45", pieces: [["leafy", GREEN, 24, 0.9], ["carrot", ORANGE, 46, 0.9]], extra: SPADE + `<g transform="translate(-30 0)">${CAN}</g>` },
  home_remedies: { sky: "#f4eef4", ground: "#7a5d3e", pieces: [["herb", GREEN, 18, 1], ["flower", ORANGE, 38, 0.9], ["garlic", "#efe3cf", 58, 0.9]], extra: JAR },
  year_round: { sky: "#eef2f7", ground: "#8a6a45", pieces: [["leek", GREEN, 14, 1], ["kale", GREEN, 32, 1], ["tomato", RED, 50, 0.9], ["lettuce", GREEN, 68, 0.8]], extra: SUN + `<g transform="translate(-40 0)">${SNOW}</g>` },
  permaculture: { sky: "#eef4ea", ground: "#6b4f33", pieces: [["herb", GREEN, 14, 1], ["flower", PURPLE, 32, 0.9], ["bean", GREEN, 50, 1], ["flower", ORANGE, 68, 0.8]], extra: MULCH + BUG },
  food_forest: { sky: "#edf3e6", ground: "#5f7a3a", pieces: [["tree_apple", RED, 14, 1.5], ["berry_bush", PURPLE, 38, 1], ["herb", GREEN, 56, 0.9], ["strawberry", RED, 70, 0.7]], extra: SUN },
  sensors: { sky: "#e9f0f4", ground: "#7a5d3e", pieces: [["lettuce", GREEN, 20, 0.9], ["tomato", RED, 42, 1], ["pepper", RED, 62, 0.9]], extra: SENSOR },
};

const FALLBACK: Scene = { sky: "#eef4ec", ground: "#8a6a45", pieces: [["leafy", GREEN, 24, 1], ["carrot", ORANGE, 44, 1], ["flower", YELLOW, 64, 0.8]] };

function sceneMarkup(scene: Scene): string {
  const plants = scene.pieces.map(([glyph, color, x, scale]) => {
    const size = 34 * scale;
    const body = GLYPHS[glyph] ?? GLYPHS.leafy;
    return `<g transform="translate(${(x / 100) * 200 - size / 2} ${64 - size}) scale(${size / 24})" style="color:${color}">${body}</g>`;
  }).join("");
  return `<rect width="200" height="80" fill="${scene.sky}"/>${scene.extra ?? ""}
    <path d="M0 62q50-5 100 0t100 0v18H0z" fill="${scene.ground}"/>
    <path d="M0 64q50-5 100 0t100 0" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5"/>${plants}`;
}

/** A 200x80 garden scene for a handbook chapter (decorative). */
export function chapterArt(id: string, height = 120): TemplateResult {
  const scene = SCENES[id] ?? FALLBACK;
  const markup = sceneMarkup(scene);
  return html`<svg class="chapter-art" viewBox="0 0 200 80" preserveAspectRatio="xMidYMid slice" width="100%" height=${height}
    aria-hidden="true">${unsafeSVG(markup)}</svg>`;
}

export const CHAPTER_SCENES = Object.keys(SCENES);

/** Full-width chapter header: the scene at its own proportions, sky and ground continued to the sides. */
export function chapterBanner(id: string, maxHeight = 190): TemplateResult {
  const scene = SCENES[id] ?? FALLBACK;
  const style = `display:block;line-height:0;background:linear-gradient(to bottom, ${scene.sky} 78%, ${scene.ground} 78%)`;
  return html`<span class="chapter-banner" style=${style}>
    <svg viewBox="0 0 200 80" preserveAspectRatio="xMidYMax meet" width="100%" style=${`max-height:${maxHeight}px;aspect-ratio:5/2;display:block;margin:0 auto`}
      aria-hidden="true">${unsafeSVG(sceneMarkup(scene))}</svg></span>`;
}
