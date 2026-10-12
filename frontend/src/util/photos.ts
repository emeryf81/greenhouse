// Plant photos from Wikipedia, looked up by scientific name and cached per browser.
// Pure module (no custom elements) so it can be unit-tested in Node.
export interface PlantLike {
  id: string;
  scientific_name?: string;
  names?: Record<string, string>;
  family?: string;
  color?: string | null;
  icon?: string;
  habit?: string;
  category?: string;
}

/** A photo plus what its licence requires us to show: creator, licence and the file page. */
export interface Photo { src: string; page: string; title: string; artist: string; license: string; licenseUrl: string; filePage: string }

const PREF_KEY = "hortulus-photos";
const CACHE_PREFIX = "hortulus-photo:";
const CACHE_DAYS = 30;
const memory = new Map<string, Promise<Photo | null>>();

/** Viewer preference (per browser): show photos from Wikipedia. On by default. */
let prefFallback: boolean | null = null; // when browser storage is blocked

export function photosEnabled(): boolean {
  if (prefFallback !== null) return prefFallback;
  try {
    return localStorage.getItem(PREF_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setPhotosEnabled(on: boolean): void {
  try {
    localStorage.setItem(PREF_KEY, on ? "on" : "off");
    prefFallback = null;
  } catch {
    prefFallback = on; // private mode: keep the choice for this page
  }
  globalThis.dispatchEvent?.(new CustomEvent("hortulus-photos-changed"));
}

/** Licences whose terms a credit line (creator, licence, link) satisfies. */
export function freeLicense(name: string): boolean {
  const n = name.trim().toLowerCase();
  return /^(cc[ -]?by(-sa)?([ -][\d.]+)?|cc0|public domain|pd\b|attribution)/.test(n) && !/\b(nc|nd)\b/.test(n);
}

const stripHtml = (html: string): string => html.replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();

/** HTTP answers worth retrying later (rate limit, server trouble) - never cached as "no photo". */
class TransientError extends Error {}

/** Names to try on Wikipedia: the full scientific name, then genus + species. */
export function photoQueries(scientific: string | undefined): string[] {
  const name = (scientific ?? "").replace(/\s+/g, " ").trim();
  if (!name || /^(onbekend|unknown)$/i.test(name)) return [];
  const out = [name];
  const words = name.split(" ");
  const base = words[1] === "×" ? words.slice(0, 3).join(" ") : words.slice(0, 2).join(" ");
  if (base && base !== name) out.push(base);
  return out;
}

function readCache(key: string): Photo | null | undefined {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return undefined;
    const { at, photo } = JSON.parse(raw) as { at: number; photo: Photo | null };
    return Date.now() - at < CACHE_DAYS * 86_400_000 ? photo : undefined;
  } catch {
    return undefined;
  }
}

function writeCache(key: string, photo: Photo | null): void {
  try {
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ at: Date.now(), photo }));
  } catch {
    /* storage full or blocked: memory cache still works */
  }
}

async function getJson<T>(url: string): Promise<T | null> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (res.status === 429 || res.status >= 500) throw new TransientError(String(res.status));
  if (!res.ok) return null;
  return (await res.json()) as T;
}

/** Creator and licence of a file (Commons metadata, served by every Wikipedia). */
async function fileInfo(lang: string, file: string): Promise<Pick<Photo, "artist" | "license" | "licenseUrl" | "filePage"> | null> {
  const url = `https://${lang}.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=imageinfo&iiprop=extmetadata%7Curl`
    + `&titles=${encodeURIComponent(`File:${file}`)}`;
  type Meta = Record<string, { value?: string } | undefined>;
  const data = await getJson<{ query?: { pages?: Record<string, { imageinfo?: { extmetadata?: Meta; descriptionurl?: string }[] }> } }>(url);
  const info = Object.values(data?.query?.pages ?? {})[0]?.imageinfo?.[0];
  const meta = info?.extmetadata ?? {};
  const license = stripHtml(meta.LicenseShortName?.value ?? "");
  if (!license || !freeLicense(license)) return null;
  return {
    artist: stripHtml(meta.Artist?.value ?? "") || stripHtml(meta.Credit?.value ?? "") || "Wikimedia Commons",
    license,
    licenseUrl: meta.LicenseUrl?.value ?? "",
    filePage: info?.descriptionurl ?? "",
  };
}

/** File name from an upload.wikimedia.org URL (thumbnail or original). */
export function fileFromUrl(url: string): string {
  let path = url;
  try {
    path = new URL(url).pathname; // summaries add ?utm_... parameters
  } catch {
    path = url.split(/[?#]/)[0];
  }
  const parts = path.split("/");
  const thumb = parts.indexOf("thumb");
  const name = thumb >= 0 ? parts[thumb + 3] : parts[parts.length - 1];
  return decodeURIComponent(name ?? "");
}

async function summary(lang: string, title: string): Promise<Photo | null> {
  const data = await getJson<{
    type?: string; title?: string; thumbnail?: { source: string }; originalimage?: { source: string };
    content_urls?: { desktop?: { page?: string } };
  }>(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`);
  if (!data || data.type === "disambiguation" || !data.thumbnail?.source) return null;
  // Only show a photo when we can credit it as its licence requires.
  const credit = await fileInfo(lang, fileFromUrl(data.originalimage?.source ?? data.thumbnail.source));
  if (!credit) return null;
  return { src: data.thumbnail.source, page: data.content_urls?.desktop?.page ?? "", title: data.title ?? title, ...credit };
}

/** Wikipedia photo for a plant (cached per browser); ``null`` when there is none. */
export function plantPhoto(plant: PlantLike, lang: string): Promise<Photo | null> {
  const queries = photoQueries(plant.scientific_name);
  if (!queries.length) return Promise.resolve(null);
  const key = `${lang}:${queries[0]}`;
  const cached = readCache(key);
  if (cached !== undefined) return Promise.resolve(cached);
  let pending = memory.get(key);
  if (!pending) {
    pending = (async () => {
      const langs = lang === "en" ? ["en"] : [lang, "en"];
      for (const q of queries) {
        for (const l of langs) {
          let photo: Photo | null;
          try {
            photo = await summary(l, q);
          } catch {
            memory.delete(key); // offline or blocked: no answer to remember, try again later
            return null;
          }
          if (photo) {
            writeCache(key, photo);
            return photo;
          }
        }
      }
      writeCache(key, null); // Wikipedia has no picture: do not ask again for a while
      return null;
    })();
    memory.set(key, pending);
  }
  return pending;
}

