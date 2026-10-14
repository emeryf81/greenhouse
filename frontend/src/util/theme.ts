// Colour themes (per browser): classic green, earth, night, or one that follows the season.
// Pure module so it can be unit-tested in Node.
export type ThemeChoice = "classic" | "earth" | "night" | "season";
export const THEMES: ThemeChoice[] = ["classic", "earth", "night", "season"];
export type Appearance = "auto" | "light" | "dark";
export const APPEARANCES: Appearance[] = ["auto", "light", "dark"];
const KEY = "hortulus-theme";
const KEY_LOOK = "hortulus-appearance";
let fallback: ThemeChoice | null = null;
let fallbackLook: Appearance | null = null;

export function themeChoice(): ThemeChoice {
  if (fallback) return fallback;
  try {
    const v = localStorage.getItem(KEY) as ThemeChoice | null;
    return v && THEMES.includes(v) ? v : "classic";
  } catch {
    return "classic";
  }
}

export function setThemeChoice(choice: ThemeChoice): void {
  try {
    localStorage.setItem(KEY, choice);
    fallback = null;
  } catch {
    fallback = choice;
  }
  globalThis.dispatchEvent?.(new CustomEvent("hortulus-theme-changed"));
}

/** Light, dark or "auto" (follow Home Assistant / the device). */
export function appearanceChoice(): Appearance {
  if (fallbackLook) return fallbackLook;
  try {
    const v = localStorage.getItem(KEY_LOOK) as Appearance | null;
    return v && APPEARANCES.includes(v) ? v : "auto";
  } catch {
    return "auto";
  }
}

export function setAppearanceChoice(choice: Appearance): void {
  try {
    localStorage.setItem(KEY_LOOK, choice);
    fallbackLook = null;
  } catch {
    fallbackLook = choice;
  }
  globalThis.dispatchEvent?.(new CustomEvent("hortulus-theme-changed"));
}

/** The season of a day (``YYYY-MM-DD``), hemisphere aware. */
export function seasonOf(day: string, south = false): "spring" | "summer" | "autumn" | "winter" {
  let m = Number(day.slice(5, 7)) - 1;
  if (south) m = (m + 6) % 12;
  return m < 2 || m === 11 ? "winter" : m < 5 ? "spring" : m < 8 ? "summer" : "autumn";
}

/** The ``theme`` attribute for the panel, and whether it forces the dark palette. */
export function themeAttribute(choice: ThemeChoice, today: string, south = false, look: Appearance = "auto"): { theme: string; dark: boolean | null } {
  const dark = look === "dark" ? true : look === "light" ? false : null;
  if (choice === "night") return { theme: "night", dark: true };
  if (choice === "season") return { theme: `season-${seasonOf(today, south)}`, dark };
  return { theme: choice, dark };
}
