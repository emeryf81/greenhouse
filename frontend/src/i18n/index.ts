import { en } from "./en";
import { nl } from "./nl";

const CATALOGS: Record<string, Record<string, string>> = { en, nl };

export type Translate = (key: string, params?: Record<string, unknown>) => string;

export const normalizeLang = (lang?: string | null): "en" | "nl" => {
  const base = (lang ?? "en").toLowerCase().split(/[-_]/)[0];
  return base === "nl" ? "nl" : "en";
};

/** Build a translator. Unknown keys fall back to English, then to the key. */
export function makeTranslator(lang: string): Translate {
  const catalog = CATALOGS[normalizeLang(lang)];
  return (key, params = {}) => {
    const template = catalog[key] ?? en[key] ?? key;
    return template.replace(/\{(\w+)\}/g, (_m, name: string) => {
      const value = params[name];
      if (value === undefined || value === null) return `{${name}}`;
      if (key.startsWith("alert.") && name === "level") return catalog[`risk.${value}`] ?? String(value);
      if (key.startsWith("alert.") && name === "when") return catalog[String(value)] ?? String(value);
      return Array.isArray(value) ? value.join(", ") : String(value);
    });
  };
}

/** Humanise tags like "red_spider_mite" when no translation exists. */
export const humanize = (tag: string): string => tag.replace(/_/g, " ").replace(/^\w/, (c) => c.toUpperCase());

export const PEST_NL: Record<string, string> = {
  aphids: "bladluis", whitefly: "witte vlieg", red_spider_mite: "spint", thrips: "trips", slugs: "slakken",
  cabbage_white: "koolwitje", cabbage_root_fly: "koolvlieg", flea_beetle: "aardvlo", carrot_fly: "wortelvlieg",
  onion_fly: "uienvlieg", leek_moth: "preimot", pea_moth: "erwtenbladroller", birds: "vogels", pigeons: "duiven",
  black_bean_aphid: "zwarte bonenluis", bean_weevil: "bonenkever", leaf_miner: "bladmineerder",
  late_blight: "phytophthora", early_blight: "alternaria (vroeg)", blossom_end_rot: "neusrot", botrytis: "grauwe schimmel",
  powdery_mildew: "echte meeldauw", downy_mildew: "valse meeldauw", cucumber_mosaic_virus: "komkommermozaïekvirus",
  clubroot: "knolvoet", white_rot: "witrot", rust: "roest", alternaria: "alternaria", leaf_spot: "bladvlekken",
  root_rot: "wortelrot", anthracnose: "vlekkenziekte", halo_blight: "vetvlekkenziekte", chocolate_spot: "chocoladevlekken",
  damping_off: "kiemplantenziekte", ants: "mieren", asparagus_beetle: "aspergekever", canker: "kanker", celery_fly: "selderijvlieg",
  colorado_beetle: "coloradokever", nematodes: "aaltjes", scab: "schurft", smut: "builenbrand", verticillium_wilt: "verwelkingsziekte",
  wireworm: "ritnaald",
};

export const tagLabel = (tag: string, lang: string): string =>
  normalizeLang(lang) === "nl" && PEST_NL[tag] ? PEST_NL[tag] : humanize(tag);
