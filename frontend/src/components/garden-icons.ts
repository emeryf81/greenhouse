// Hortulus' own line icons: one hand, 24 px grid, 1.7 px rounded strokes in
// currentColor, so the menu and every task type speak the same visual language.
// Unknown names fall back to Home Assistant's mdi icons.
import { html, nothing, svg, type SVGTemplateResult, type TemplateResult } from "lit";

const P = (d: string) => svg`<path d=${d}/>`;

export const GARDEN_ICONS: Record<string, SVGTemplateResult> = {
  // -- places -------------------------------------------------------------- //
  home: svg`${P("M4 11.5 12 5l8 6.5")}${P("M6.5 10v9h11v-9")}${P("M12 19v-4.5")}${P("M12 14.5c-2.2 0-3.2-1.6-3.2-3.3 1.8 0 3.2 1 3.2 3.3zM12 13.2c0-2.2 1.3-3.6 3.4-3.7 0 2.1-1.3 3.7-3.4 3.7z")}`,
  garden: svg`${P("M12 20v-8")}${P("M12 14c-3.5 0-5.5-2.3-5.5-5 3 0 5.5 1.7 5.5 5zM12 12c0-3.5 2.2-6 5.5-6 0 3.3-2.3 6-5.5 6z")}${P("M4 20h16")}`,
  calendar: svg`<rect x="4" y="5.5" width="16" height="14" rx="2.5"/>${P("M4 10h16M8.5 3.5v4M15.5 3.5v4")}${P("M12 17.5v-3M12 15.6c-1.3 0-2-.8-2-1.9 1.1 0 2 .6 2 1.9zM12 14.8c0-1.3.8-2.1 2-2.1 0 1.2-.8 2.1-2 2.1z")}`,
  weather: svg`<circle cx="9" cy="9" r="3.2"/>${P("M9 3v1.4M3 9h1.4M4.8 4.8l1 1M13.2 4.8l-1 1")}${P("M9.5 19h8a3 3 0 0 0 0-6 4.5 4.5 0 0 0-8.4-1.3A3.6 3.6 0 0 0 9.5 19z")}`,
  journal: svg`<rect x="5" y="3.5" width="13.5" height="17" rx="2"/>${P("M8.5 3.5v17M11.5 8h4M11.5 11.5h4")}${P("M14.5 17.2c-1.6 0-2.4-1-2.4-2.3 1.4 0 2.4.8 2.4 2.3z")}`,
  knowledge: svg`${P("M12 6.5C10 5 7 4.6 4 5v13c3-.4 6 0 8 1.5 2-1.5 5-1.9 8-1.5V5c-3-.4-6 0-8 1.5z")}${P("M12 6.5v13")}`,
  manage: svg`${P("M5 7h9M18 7h1M5 12h3M12 12h7M5 17h8M17 17h2")}<circle cx="16" cy="7" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="15" cy="17" r="2"/>`,
  planner: svg`<rect x="3.5" y="3.5" width="17" height="17" rx="2.5"/>${P("M3.5 12h17M12 3.5v17")}${P("M7.8 9.5V7.3M7.8 8c-1 0-1.6-.6-1.6-1.5.9 0 1.6.5 1.6 1.5zM16.2 17.5v-2.2M16.2 16c-1 0-1.6-.6-1.6-1.5.9 0 1.6.5 1.6 1.5z")}`,
  layout: svg`${P("M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2z")}${P("M9 4.5v13M15 6.5v13")}`,
  crops: svg`${P("M9 6.5h11M9 12h11M9 17.5h11")}${P("M5 8V5.2M5 6c-1 0-1.6-.7-1.6-1.6 1 0 1.6.6 1.6 1.6zM5 13.5v-2.8M5 11.5c-1 0-1.6-.7-1.6-1.6 1 0 1.6.6 1.6 1.6zM5 19v-2.8M5 17c-1 0-1.6-.7-1.6-1.6 1 0 1.6.6 1.6 1.6z")}`,
  library: svg`${P("M5 19C5 10 10 5 19 5c0 9-5 14-14 14z")}${P("M5 19 13 11")}`,
  advice: svg`${P("M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5h-7L7.5 20v-3.5H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z")}${P("M12 13.5V10M12 11c-1.2 0-1.9-.8-1.9-1.9 1.1 0 1.9.7 1.9 1.9zM12 10.2c0-1.3.8-2.1 2-2.1 0 1.2-.8 2.1-2 2.1z")}`,
  handbook: svg`${P("M6 4h11.5v16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z")}${P("M4 17.5a2 2 0 0 1 2-2h11.5")}${P("M11 12.5V8.8M11 10.3c-1.3 0-2-.9-2-2 1.2 0 2 .7 2 2zM11 9.6c0-1.3.8-2.2 2.1-2.2 0 1.3-.8 2.2-2.1 2.2z")}`,
  analysis: svg`<circle cx="10.5" cy="10.5" r="6"/>${P("M15 15l5 5")}${P("M10.5 13.5V10M10.5 11c-1.2 0-1.8-.8-1.8-1.8 1 0 1.8.6 1.8 1.8zM10.5 10.3c0-1.2.8-2 1.9-2 0 1.2-.8 2-1.9 2z")}`,
  print: svg`${P("M7 9V4h10v5")}<rect x="4" y="9" width="16" height="7.5" rx="2"/>${P("M7 14h10v6H7z")}`,
  settings: svg`<circle cx="12" cy="12" r="3"/>${P("M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M6 6l1.6 1.6M16.4 16.4 18 18M6 18l1.6-1.6M16.4 7.6 18 6")}`,
  wall: svg`<rect x="3.5" y="5" width="17" height="12" rx="2"/>${P("M9 20h6M12 17v3")}${P("M7 13.5h4M7 10.5h6")}`,
  // -- task types ------------------------------------------------------------ //
  sow_indoor: svg`${P("M5 14h14l-1.5 6h-11z")}${P("M12 14v-4M12 11.5c-1.5 0-2.4-1-2.4-2.4 1.4 0 2.4.9 2.4 2.4zM12 10.5c0-1.6 1-2.6 2.6-2.6 0 1.5-1 2.6-2.6 2.6z")}${P("M7 4.5l1 1.5M17 4.5l-1 1.5")}`,
  sow_direct: svg`${P("M3.5 16.5h17")}<ellipse cx="9" cy="12.5" rx="1.3" ry="1.8"/><ellipse cx="15" cy="9.5" rx="1.3" ry="1.8"/>${P("M6 20h3M14 20h3")}`,
  harden_off: svg`<circle cx="16.5" cy="7" r="2.6"/>${P("M16.5 2.8v1M20.7 7h-1M19.5 4l-.7.7")}${P("M5 15h9l-1.2 5H6.2z")}${P("M9.5 15v-3.5M9.5 12.5c-1.4 0-2.2-.9-2.2-2.1 1.3 0 2.2.8 2.2 2.1z")}`,
  transplant: svg`${P("M4 8.5h6l-1 4.5H5z")}${P("M7 8.5V6.3M7 7c-1 0-1.6-.6-1.6-1.5.9 0 1.6.5 1.6 1.5z")}${P("M11.5 11h5.5M15 9l2 2-2 2")}${P("M3.5 19h17M18.5 19v-3M18.5 16.8c-1 0-1.6-.7-1.6-1.6 1 0 1.6.6 1.6 1.6z")}`,
  thin: svg`${P("M4 19h16")}${P("M7 19v-5M12 19v-3.5M17 19v-5")}<circle cx="9.5" cy="7" r="2"/><circle cx="14.5" cy="7" r="2"/>${P("M11 8.5 16 13M13 8.5 8 13")}`,
  stake: svg`${P("M12 3.5v17")}${P("M12 9c-2.6 0-4-1.6-4-3.6 2.3 0 4 1.3 4 3.6zM12 14c2.6 0 4-1.6 4-3.6-2.3 0-4 1.3-4 3.6z")}${P("M9.5 12.5h5")}`,
  prune: svg`<circle cx="7" cy="17" r="2.3"/><circle cx="17" cy="17" r="2.3"/>${P("M8.6 15.4 16 5M15.4 15.4 8 5")}`,
  pinch: svg`${P("M12 20v-9")}${P("M12 14c-2.8 0-4.3-1.8-4.3-4 2.5 0 4.3 1.5 4.3 4z")}${P("M15 5.5l2.5 2.5M17.5 5.5 15 8")}`,
  earth_up: svg`${P("M3 19c3-5 6-7 9-7s6 2 9 7z")}${P("M12 12V6M12 8.5c-1.6 0-2.6-1-2.6-2.4 1.5 0 2.6.9 2.6 2.4z")}`,
  feed: svg`${P("M7 6h10l1.5 14h-13z")}${P("M9.5 6V4h5v2")}${P("M12 16.5c-1.5 0-2.5-1-2.5-2.3 0-1.4 2.5-3.7 2.5-3.7s2.5 2.3 2.5 3.7c0 1.3-1 2.3-2.5 2.3z")}`,
  water: svg`${P("M5 11h9v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z")}${P("M14 13l5-4")}${P("M19.5 9.5l.6 1.8M21 8l1 1.2")}${P("M7.5 11V8.5a2 2 0 0 1 4 0V11")}`,
  weed: svg`${P("M12 9V4M12 6c-1.4 0-2.2-.8-2.2-2 1.3 0 2.2.7 2.2 2zM12 5.3c0-1.3.8-2.1 2.1-2.1 0 1.2-.8 2.1-2.1 2.1z")}${P("M12 9v4M12 13l-3 4M12 13l3 5M12 15.5v5")}${P("M3.5 11h17")}`,
  pest_check: svg`<ellipse cx="12" cy="13.5" rx="4" ry="5"/>${P("M12 8.5v10M8 11 4.5 9.5M8 15H4M8.5 18l-3 2M16 11l3.5-1.5M16 15h4M15.5 18l3 2M10 8.5 8.5 5.5M14 8.5l1.5-3")}`,
  harvest: svg`${P("M3.5 10.5h17l-2 8.5a1.5 1.5 0 0 1-1.5 1H7a1.5 1.5 0 0 1-1.5-1z")}${P("M8 10.5 10.5 5M16 10.5 13.5 5")}${P("M8 14.5v2.5M12 14.5v2.5M16 14.5v2.5")}`,
  ventilate: svg`<rect x="4" y="4" width="16" height="16" rx="2"/>${P("M12 4v16M4 12h8")}${P("M14.5 9c2 .5 3 1.5 3 3s-1 2.5-3 3")}`,
  shade: svg`${P("M3.5 9 12 5l8.5 4")}${P("M3.5 9h17M6 9v11M18 9v11")}${P("M9 13h6M9 16h6")}`,
  frost_protect: svg`${P("M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9")}${P("M10 4.5 12 6l2-1.5M10 19.5 12 18l2 1.5")}`,
  soil_prep: svg`${P("M12 3.5v11")}${P("M9 3.5h6")}${P("M8.5 14.5h7l-1 4.5a2.5 2.5 0 0 1-5 0z")}`,
  compost: svg`${P("M5 8h14l-1.5 12h-11z")}${P("M4 8h16M9.5 8V5.5h5V8")}${P("M9 12.5l2 2 4-4")}`,
  green_manure: svg`<circle cx="9" cy="9" r="2.6"/><circle cx="15" cy="9" r="2.6"/><circle cx="12" cy="13.5" r="2.6"/>${P("M12 16v4.5")}`,
  mulch: svg`${P("M3.5 18h17M3.5 14.5c3 0 3-1.5 5.7-1.5s2.7 1.5 5.6 1.5 2.7-1.5 5.7-1.5")}${P("M12 11.5V6M12 8c-1.4 0-2.2-.8-2.2-2 1.3 0 2.2.7 2.2 2z")}`,
  clean_greenhouse: svg`${P("M4 20V10l8-6 8 6v10")}${P("M4 20h16M12 4v16")}${P("M15.5 12.5l1.5 1.5M17 12.5l-1.5 1.5")}`,
  winter_prep: svg`${P("M4 20V11l8-6 8 6v9z")}${P("M12 10v7M9 11.8l6 3.5M9 15.3l6-3.5")}`,
  plan_season: svg`<rect x="5" y="4.5" width="14" height="16" rx="2"/>${P("M9 4.5V3h6v1.5")}${P("M8.5 10h7M8.5 13.5h7M8.5 17h4")}`,
  tool_care: svg`${P("M14.5 4.5a4 4 0 0 0-4.6 5.3L4 15.7 6.3 18l5.9-5.9a4 4 0 0 0 5.3-4.6l-2.4 2.4-2.2-.3-.3-2.2z")}`,
  soil_test: svg`${P("M9.5 3.5h5M10.5 3.5v11a1.5 1.5 0 0 0 3 0v-11")}${P("M10.5 10h3")}${P("M5 20h14")}`,
  cut_back: svg`${P("M4 20h16")}${P("M8 20v-6M12 20v-4M16 20v-6")}${P("M5 10l14-4M7 6.5l2 2.5")}`,
  divide: svg`${P("M12 20v-6M12 14l-5-5M12 14l5-5")}<circle cx="7" cy="7" r="2.3"/><circle cx="17" cy="7" r="2.3"/>${P("M3.5 20h17")}`,
  protect: svg`${P("M12 3.5 19 6v6c0 4.2-3 7.2-7 8.5-4-1.3-7-4.3-7-8.5V6z")}${P("M12 15.5v-4M12 12.6c-1.3 0-2-.8-2-1.9 1.2 0 2 .7 2 1.9z")}`,
  clean: svg`${P("M15 4 9 14")}${P("M6 14h7l1.5 6.5h-10z")}`,
  tie_in: svg`${P("M8 3.5v17")}${P("M8 9c3 0 6 1 8 3M8 15c2.5 0 5 .5 7 2")}<circle cx="8" cy="9" r="1.2"/><circle cx="8" cy="15" r="1.2"/>`,
  thin_fruit: svg`<circle cx="8.5" cy="15.5" r="3.2"/><circle cx="16" cy="15.5" r="3.2"/>${P("M8.5 12.3C9 8 11 5.5 13 4.5M16 12.3c-.5-3-1.5-5.5-3-7.8")}`,
  pollinate: svg`<ellipse cx="12" cy="13" rx="3.5" ry="4.5"/>${P("M8.5 13h7M9 16h6")}${P("M8.8 10.5C6 8 4 8.5 4 10.5s3 2 4.8.5zM15.2 10.5C18 8 20 8.5 20 10.5s-3 2-4.8.5z")}${P("M10.5 8.5 9 5.5M13.5 8.5 15 5.5")}`,
  check: svg`<rect x="5" y="4.5" width="14" height="16" rx="2"/>${P("M9 12.5l2 2 4-4")}`,
  make_feed: svg`${P("M9 3.5h6M10 3.5v6l-5 9a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2l-5-9v-6")}${P("M7.5 15h9")}`,
  custom: svg`<circle cx="12" cy="12" r="8"/>${P("M8.5 12.3l2.4 2.4 4.6-4.6")}`,
};

/** A Hortulus icon (or the mdi fallback when the name is an ``mdi:`` id). */
export function gicon(name: string, size = 20): TemplateResult | typeof nothing {
  if (name.startsWith("mdi:")) return html`<ha-icon icon=${name} style=${`--mdc-icon-size:${size}px`}></ha-icon>`;
  const body = GARDEN_ICONS[name];
  if (!body) return nothing;
  return html`<svg class="gicon" width=${size} height=${size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}
