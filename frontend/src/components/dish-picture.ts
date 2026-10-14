// The picture of a dish: a plate (or a bowl for soup, a dish for the oven) with
// the side as a bed underneath, the garden produce as the crop glyphs on top,
// the meat or fish in the middle and herbs scattered over.  Built as one SVG
// string so it can be an <img> in the panel and be turned into a JPEG for the PDF.
import { GLYPHS } from "../planner/plant-glyphs";

export interface DishPicture {
  produce: { plant_id: string; kind: string; color: string; icon?: string; emoji?: string }[];
  side: string;
  protein: string;
  extras: string[];
  technique: string;
}

const KIND_GLYPH: Record<string, string> = {
  leafy: "leafy", brassica: "cabbage", root: "root", allium: "onion", fruiting: "tomato", squash: "pumpkin",
  legume: "bean", potato: "potato", corn: "corn", asparagus: "asparagus", herb: "herb", fruit: "berry",
};

/** A small deterministic random generator so a dish always looks the same. */
function rng(seed: string): () => number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const f = (n: number): string => n.toFixed(1);

function glyph(icon: string, cx: number, cy: number, size: number, color: string, rot: number): string {
  const body = GLYPHS[icon] ?? GLYPHS.leafy;
  const s = size / 24;
  return `<g transform="translate(${f(cx)} ${f(cy)}) rotate(${f(rot)}) scale(${s.toFixed(3)}) translate(-12 -12)" style="color:${color}" filter="url(#sh)">${body}</g>`;
}

/** The side as a bed on the plate. */
function sideLayer(side: string, r: () => number, cx: number, cy: number, rad: number): string {
  const out: string[] = [];
  const spot = (): [number, number] => {
    const a = r() * Math.PI * 2;
    const d = Math.sqrt(r()) * rad;
    return [cx + Math.cos(a) * d, cy + Math.sin(a) * d];
  };
  switch (side) {
    case "pasta":
    case "noodles": {
      const col = side === "pasta" ? "#f1cf6b" : "#efd9a0";
      for (let i = 0; i < 26; i++) {
        const [x, y] = spot();
        const a = r() * 360;
        out.push(`<path d="M${f(x - 16)} ${f(y)}q8 -10 16 0t16 0" transform="rotate(${f(a)} ${f(x)} ${f(y)})" stroke="${col}" stroke-width="${side === "pasta" ? 5 : 3.2}" fill="none" stroke-linecap="round"/>`);
      }
      break;
    }
    case "rice":
      for (let i = 0; i < 160; i++) {
        const [x, y] = spot();
        out.push(`<ellipse cx="${f(x)}" cy="${f(y)}" rx="3.4" ry="1.5" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})" fill="#fbf8ef" stroke="#e6dfcc" stroke-width=".4"/>`);
      }
      break;
    case "bulgur":
    case "couscous":
      for (let i = 0; i < 260; i++) {
        const [x, y] = spot();
        out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="${f(1.2 + r())}" fill="${side === "bulgur" ? "#d4a85c" : "#ecd08a"}"/>`);
      }
      break;
    case "pearl_couscous":
      for (let i = 0; i < 110; i++) {
        const [x, y] = spot();
        out.push(`<circle cx="${f(x)}" cy="${f(y)}" r="3.4" fill="#f3e3b5" stroke="#dcc68e" stroke-width=".5"/>`);
      }
      break;
    case "gnocchi":
      for (let i = 0; i < 22; i++) {
        const [x, y] = spot();
        out.push(`<g transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})"><ellipse cx="${f(x)}" cy="${f(y)}" rx="9" ry="6" fill="#f0d79a" stroke="#d6b66c" stroke-width=".8"/><path d="M${f(x - 5)} ${f(y - 3)}v6M${f(x)} ${f(y - 4)}v8M${f(x + 5)} ${f(y - 3)}v6" stroke="#d6b66c" stroke-width=".9"/></g>`);
      }
      break;
    case "potatoes":
      for (let i = 0; i < 12; i++) {
        const [x, y] = spot();
        out.push(`<ellipse cx="${f(x)}" cy="${f(y)}" rx="${f(11 + r() * 4)}" ry="${f(9 + r() * 3)}" fill="#e7c372" stroke="#c99a45" stroke-width="1"/><ellipse cx="${f(x - 3)}" cy="${f(y - 3)}" rx="3.5" ry="2" fill="#fff" opacity=".3"/>`);
      }
      break;
    case "fries":
      for (let i = 0; i < 28; i++) {
        const [x, y] = spot();
        out.push(`<rect x="${f(x - 3)}" y="${f(y - 15)}" width="6" height="30" rx="2" transform="rotate(${f(r() * 180)} ${f(x)} ${f(y)})" fill="#f4c64e" stroke="#d9a12c" stroke-width=".8"/>`);
      }
      break;
    default:
      break;
  }
  return out.join("");
}

/** The meat, fish or vegetarian protein in the middle. */
function proteinLayer(protein: string, cx: number, cy: number): string {
  switch (protein) {
    case "chicken":
    case "pork":
    case "pork_tenderloin":
    case "sweetbread": {
      const col = protein === "pork_tenderloin" ? "#e9b9a0" : protein === "sweetbread" ? "#efd6b8" : "#e8c49a";
      return [-26, 0, 26].map((dx, i) => `<ellipse cx="${cx + dx}" cy="${cy + (i === 1 ? -4 : 4)}" rx="15" ry="11" fill="${col}" stroke="#b8865a" stroke-width="2" filter="url(#sh)"/><ellipse cx="${cx + dx}" cy="${cy + (i === 1 ? -4 : 4)}" rx="7" ry="4.5" fill="#fff" opacity=".35"/>`).join("");
    }
    case "beef":
    case "steak":
    case "stew_beef":
      return `<g filter="url(#sh)"><path d="M${cx - 34} ${cy - 8}c6-18 50-20 62-6 10 12-2 30-26 30-26 0-42-10-36-24z" fill="#8a3b2c"/><path d="M${cx - 22} ${cy - 12}l30 22M${cx - 8} ${cy - 18}l30 22M${cx - 32} ${cy}l26 18" stroke="#4a1d14" stroke-width="3" stroke-linecap="round" opacity=".7"/></g>`;
    case "mince":
    case "chicken_mince":
    case "burger": {
      const col = protein === "chicken_mince" ? "#c99d74" : "#7b4630";
      return `<g filter="url(#sh)"><circle cx="${cx}" cy="${cy}" r="${protein === "burger" ? 30 : 24}" fill="${col}"/>${[...Array(14)].map((_, i) => `<circle cx="${f(cx + Math.cos(i * 2.4) * (i % 4) * 6)}" cy="${f(cy + Math.sin(i * 2.4) * (i % 4) * 6)}" r="2.2" fill="#000" opacity=".18"/>`).join("")}</g>`;
    }
    case "sausage":
      return `<g filter="url(#sh)"><path d="M${cx - 38} ${cy + 6}q38 -36 76 0" stroke="#9c4a2c" stroke-width="18" fill="none" stroke-linecap="round"/><path d="M${cx - 30} ${cy - 2}q30 -24 60 0" stroke="#fff" stroke-opacity=".25" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
    case "bacon":
    case "ham":
      return [...Array(7)].map((_, i) => `<rect x="${cx - 34 + (i % 4) * 18}" y="${cy - 12 + Math.floor(i / 4) * 18}" width="12" height="9" rx="2" fill="${protein === "ham" ? "#eaa3a0" : "#c4554a"}" stroke="#fff" stroke-width="1.5" filter="url(#sh)"/>`).join("");
    case "salmon":
    case "white_fish": {
      const col = protein === "salmon" ? "#f08c62" : "#f4ede0";
      return `<g filter="url(#sh)"><path d="M${cx - 40} ${cy}c10-20 64-22 80-4-14 22-66 24-80 4z" fill="${col}" stroke="#d07850" stroke-width="1.2"/>${[-20, -6, 8, 22].map((d) => `<path d="M${cx + d} ${cy - 14}q6 14 0 28" stroke="#fff" stroke-opacity=".55" stroke-width="2" fill="none"/>`).join("")}</g>`;
    }
    case "shrimp":
      return [...Array(5)].map((_, i) => {
        const a = (i / 5) * Math.PI * 2;
        const x = cx + Math.cos(a) * 22;
        const y = cy + Math.sin(a) * 22;
        return `<path d="M${f(x - 9)} ${f(y)}a9 9 0 1 1 9 9" stroke="#f07a4c" stroke-width="7" fill="none" stroke-linecap="round" filter="url(#sh)"/>`;
      }).join("");
    case "tofu":
    case "halloumi":
    case "goat_cheese":
    case "feta": {
      const col = protein === "tofu" ? "#f3ecd8" : protein === "halloumi" ? "#f3dfae" : "#fbfaf4";
      return [...Array(6)].map((_, i) => `<rect x="${cx - 30 + (i % 3) * 22}" y="${cy - 16 + Math.floor(i / 3) * 22}" width="16" height="16" rx="3" fill="${col}" stroke="#d9cfb0" stroke-width="1.2" filter="url(#sh)"/>`).join("");
    }
    case "egg":
      return `<g filter="url(#sh)"><path d="M${cx - 30} ${cy}c-4-20 18-30 34-24 20-6 34 12 26 28-6 16-56 20-60-4z" fill="#fff"/><circle cx="${cx}" cy="${cy}" r="11" fill="#f5b52e"/><circle cx="${cx - 3}" cy="${cy - 3}" r="3" fill="#fff" opacity=".5"/></g>`;
    case "chickpeas":
    case "lentils":
      return [...Array(protein === "lentils" ? 40 : 18)].map((_, i) => {
        const a = i * 2.39996;
        const d = Math.sqrt(i) * (protein === "lentils" ? 4.4 : 7.5);
        return `<circle cx="${f(cx + Math.cos(a) * d)}" cy="${f(cy + Math.sin(a) * d)}" r="${protein === "lentils" ? 3 : 5.5}" fill="${protein === "lentils" ? "#a5743c" : "#e2b56a"}" stroke="#b98a40" stroke-width=".6"/>`;
      }).join("");
    default:
      return "";
  }
}

/** The dish as an SVG document (square, ``size`` px). */
export function dishSvg(pic: DishPicture, size = 320, seed = ""): string {
  const r = rng(seed || JSON.stringify(pic));
  const W = 320;
  const cx = 160;
  const cy = 168;
  const tech = pic.technique;
  const soup = tech === "soup" || tech === "cold_soup" || tech === "compote"; // served in a bowl
  const oven = tech === "gratin" || tech === "roast" || tech === "stuffed" || tech === "dessert";
  const produce = pic.produce.filter((p) => p.kind !== "herb");
  const herbs = pic.produce.filter((p) => p.kind === "herb");
  const parts: string[] = [];
  // table
  parts.push(`<rect width="${W}" height="${W}" fill="url(#table)"/>`);
  for (let i = 0; i < 9; i++) parts.push(`<path d="M0 ${f(18 + i * 36 + r() * 6)}h${W}" stroke="#000" stroke-opacity=".05" stroke-width="2"/>`);
  // napkin and cutlery
  parts.push(`<rect x="232" y="196" width="78" height="110" rx="6" fill="#f4efe4" transform="rotate(8 270 250)" opacity=".95"/>`);
  parts.push(`<path d="M282 214v86M276 214v22c0 6 12 6 12 0v-22" stroke="#c7c2b6" stroke-width="3.2" fill="none" stroke-linecap="round" transform="rotate(8 270 250)"/>`);
  if (pic.side === "bread") {
    parts.push(`<g filter="url(#sh)" transform="rotate(-18 52 70)"><path d="M18 74c0-26 70-26 70 0v26H18z" fill="#c98a45"/><path d="M24 76c0-18 58-18 58 0v20H24z" fill="#f2dcae"/></g>`);
  }
  if (oven) {
    // an oven dish
    parts.push(`<rect x="38" y="62" width="244" height="214" rx="34" fill="#b4472e" filter="url(#sh2)"/>`);
    parts.push(`<rect x="52" y="76" width="216" height="186" rx="24" fill="${tech === "gratin" ? "#f0cf7c" : tech === "dessert" ? "#d9a35c" : "#7a4a2c"}"/>`);
    if (tech === "gratin" || tech === "dessert") {
      for (let i = 0; i < 70; i++) {
        parts.push(`<circle cx="${f(64 + r() * 192)}" cy="${f(88 + r() * 162)}" r="${f(2 + r() * 4)}" fill="${tech === "gratin" ? "#c98a2c" : "#f1d79c"}" opacity=".8"/>`);
      }
    }
  } else if (soup) {
    parts.push(`<circle cx="${cx}" cy="${cy}" r="128" fill="#ffffff" filter="url(#sh2)"/>`);
    parts.push(`<circle cx="${cx}" cy="${cy}" r="112" fill="#efe9de"/>`);
    const col = produce[0]?.color || "#e9922b";
    parts.push(`<circle cx="${cx}" cy="${cy}" r="96" fill="${col}"/><circle cx="${cx}" cy="${cy}" r="96" fill="url(#soup)"/>`);
    parts.push(`<path d="M${cx - 40} ${cy - 8}c20 14 60 14 80 -6" stroke="#fff" stroke-opacity=".8" stroke-width="5" fill="none" stroke-linecap="round"/>`);
  } else {
    parts.push(`<circle cx="${cx}" cy="${cy}" r="132" fill="#ffffff" filter="url(#sh2)"/>`);
    parts.push(`<circle cx="${cx}" cy="${cy}" r="104" fill="none" stroke="#ece6da" stroke-width="2"/>`);
  }
  // the side underneath (not in the soup or the oven)
  if (!soup && !oven) parts.push(sideLayer(pic.side, r, cx, cy, 70));
  // garden produce in a ring, larger and fewer when there are few
  const n = Math.max(1, produce.length);
  const ring = soup ? 54 : oven ? 62 : 66;
  const perCrop = soup ? 2 : oven ? 3 : n <= 2 ? 4 : 3;
  const count = n * perCrop;
  for (let i = 0; i < count; i++) {
    const p = produce[i % n];
    if (!p) break;
    const a = (i / count) * Math.PI * 2 + r() * 0.4 - Math.PI / 2;
    const d = ring + (r() - 0.5) * 18;
    const icon = p.icon && GLYPHS[p.icon] ? p.icon : KIND_GLYPH[p.kind] ?? "leafy";
    parts.push(glyph(icon, cx + Math.cos(a) * d, cy + Math.sin(a) * d, soup ? 30 : 42 + r() * 8, p.color || "#5a9a3c", r() * 50 - 25));
  }
  // the protein in the middle
  parts.push(proteinLayer(pic.protein, cx, cy));
  // cheese and nuts from the fridge
  if (pic.extras.includes("parmesan") || pic.extras.includes("grated_cheese")) {
    for (let i = 0; i < 40; i++) parts.push(`<rect x="${f(cx - 60 + r() * 120)}" y="${f(cy - 60 + r() * 120)}" width="5" height="1.6" rx=".8" fill="#f7e7a6" transform="rotate(${f(r() * 180)} ${cx} ${cy})"/>`);
  }
  if (pic.extras.includes("feta") && pic.protein !== "feta") parts.push(proteinLayer("feta", cx + 38, cy + 46).replace(/width="16" height="16"/g, 'width="10" height="10"'));
  if (pic.extras.includes("nuts")) for (let i = 0; i < 10; i++) parts.push(`<ellipse cx="${f(cx - 50 + r() * 100)}" cy="${f(cy - 50 + r() * 100)}" rx="4" ry="2.6" fill="#b07a3c"/>`);
  if (pic.extras.includes("lemon")) parts.push(`<g filter="url(#sh)"><circle cx="${cx + 70}" cy="${cy - 64}" r="16" fill="#f7dc3c" stroke="#e7c21c" stroke-width="2"/><path d="M${cx + 70} ${cy - 80}v32M${cx + 54} ${cy - 64}h32M${cx + 59} ${cy - 75}l22 22M${cx + 81} ${cy - 75}l-22 22" stroke="#fff6b0" stroke-width="1.4"/></g>`);
  if (pic.extras.includes("cream") || pic.extras.includes("yoghurt")) parts.push(`<path d="M${cx - 24} ${cy + 8}c10-14 38-14 48 0-10 12-38 12-48 0z" fill="#fffdf6" opacity=".92"/>`);
  // herbs scattered over
  for (const h of herbs) {
    for (let i = 0; i < 5; i++) {
      const a = r() * Math.PI * 2;
      const d = r() * 60;
      parts.push(glyph(h.icon && GLYPHS[h.icon] ? h.icon : "herb", cx + Math.cos(a) * d, cy + Math.sin(a) * d, 20, h.color || "#3f8a3a", r() * 360));
    }
  }
  if (!herbs.length) {
    for (let i = 0; i < 14; i++) {
      const a = r() * Math.PI * 2;
      const d = r() * 74;
      parts.push(`<ellipse cx="${f(cx + Math.cos(a) * d)}" cy="${f(cy + Math.sin(a) * d)}" rx="2.6" ry="1.4" fill="#3f8a3a" transform="rotate(${f(r() * 180)} ${f(cx + Math.cos(a) * d)} ${f(cy + Math.sin(a) * d)})"/>`);
    }
  }
  const defs = `<defs>
    <linearGradient id="table" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c79a6b"/><stop offset="1" stop-color="#9c6f45"/></linearGradient>
    <radialGradient id="soup" cx=".4" cy=".35" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".7" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".15"/></radialGradient>
    <filter id="sh" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="1" dy="2" stdDeviation="1.4" flood-opacity=".28"/></filter>
    <filter id="sh2" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="7" flood-opacity=".32"/></filter>
  </defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${W}" width="${size}" height="${size}">${defs}${parts.join("")}</svg>`;
}

export const dishDataUrl = (pic: DishPicture, seed = ""): string =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(dishSvg(pic, 320, seed))}`;

/** The dish as a JPEG (base64, no prefix) for the PDF. */
export async function dishJpeg(pic: DishPicture, seed = "", px = 640): Promise<string | null> {
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = dishDataUrl(pic, seed);
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = px;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, px, px);
    return canvas.toDataURL("image/jpeg", 0.86).split(",")[1] ?? null;
  } catch {
    return null;
  }
}
