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

export interface Photo { src: string; page: string; title: string }

const PREF_KEY = "hortulus-photos";
const CACHE_PREFIX = "hortulus-photo:";
const CACHE_DAYS = 30;
const memory = new Map<string, Promise<Photo | null>>();

/** Viewer preference (per browser): show photos from Wikipedia. On by default. */
export function photosEnabled(): boolean {
  try {
    return localStorage.getItem(PREF_KEY) !== "off";
  } catch {
    return true;
  }
}

export function setPhotosEnabled(on: boolean): void {
  try {
    localStorage.setItem(PREF_KEY, on ? "on" : "off");
  } catch {
    /* private mode: the default (on) stays */
  }
  window.dispatchEvent(new CustomEvent("hortulus-photos-changed"));
}

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

async function summary(lang: string, title: string): Promise<Photo | null> {
  const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g, "_"))}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const data = (await res.json()) as {
    type?: string; title?: string; thumbnail?: { source: string }; content_urls?: { desktop?: { page?: string } };
  };
  if (data.type === "disambiguation" || !data.thumbnail?.source) return null;
  return { src: data.thumbnail.source, page: data.content_urls?.desktop?.page ?? "", title: data.title ?? title };
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

