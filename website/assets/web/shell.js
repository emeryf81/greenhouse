/* Hortulus web – the shell around the Hortulus panel.
 *
 * The panel is the same one Home Assistant shows.  It expects a `hass` object;
 * this file builds one: messages go to the garden engine in a web worker,
 * photos and PDFs go to the site (MariaDB), the weather comes from Open-Meteo.
 */
import { ICONS } from "./icons.js";

const cfg = JSON.parse(document.getElementById("hortulus-config").textContent);
globalThis.HORTULUS_BASE = cfg.base; // photo URLs below /hortulus
const T = cfg.texts;

/* -- errors to Beheer → Logboek: what a user runs into, with enough to find it back -- */
const reported = new Set();
function report(kind, message, detail = "") {
  const text = String(message || "").slice(0, 400);
  if (!text || reported.has(text) || reported.size >= 20) return;
  reported.add(text);
  fetch(`${cfg.base}/api.php?a=client_log&g=${cfg.garden}`, {
    method: "POST", credentials: "same-origin", keepalive: true,
    headers: { "Content-Type": "application/json", "X-CSRF-Token": cfg.csrf },
    body: JSON.stringify({ kind, message: text, detail: String(detail).slice(0, 8000), url: location.href }),
  }).catch(() => undefined);
}
addEventListener("error", (e) => {
  if (e.message) report("js", e.message, `${e.filename || ""}:${e.lineno || ""}:${e.colno || ""}\n${e.error && e.error.stack ? e.error.stack : ""}`);
});
addEventListener("unhandledrejection", (e) => {
  const r = e.reason;
  report("promise", r && r.message ? r.message : String(r), r && r.stack ? r.stack : "");
});

/* -- <ha-icon> (Home Assistant's icon element, with the icons the panel uses) -- */
class HaIcon extends HTMLElement {
  static get observedAttributes() {
    return ["icon"];
  }
  set icon(v) {
    this.setAttribute("icon", v);
  }
  get icon() {
    return this.getAttribute("icon");
  }
  connectedCallback() {
    this.render();
  }
  attributeChangedCallback() {
    this.render();
  }
  render() {
    const path = ICONS[(this.getAttribute("icon") || "").replace(/^mdi:/, "")] || ICONS["help-circle-outline"] || "";
    if (!this.shadowRoot) this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<style>:host{display:inline-flex;vertical-align:middle;width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px);fill:currentColor}svg{width:100%;height:100%}</style><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${path}"></path></svg>`;
  }
}
if (!customElements.get("ha-icon")) customElements.define("ha-icon", HaIcon);
if (!customElements.get("ha-card")) customElements.define("ha-card", class extends HTMLElement {});

/* -- worker ------------------------------------------------------------------ */
const worker = new Worker(`${cfg.base}/assets/web/worker.js?v=${encodeURIComponent(cfg.version)}`);
let rid = 0;
const calls = new Map();
const subscriptions = new Map(); // message id -> callback
const forecastSubs = new Set();
let nextId = 1;
let boot = null;

function call(type, payload = {}) {
  const id = ++rid;
  return new Promise((resolve, reject) => {
    calls.set(id, { resolve, reject });
    worker.postMessage({ rid: id, type, ...payload });
  });
}

function deliver(events = []) {
  for (const { id, event } of events) subscriptions.get(id)?.(event);
}

const bootText = document.getElementById("boot-text");
const bootBar = document.getElementById("boot-bar");
const status = document.getElementById("save-status");

worker.onmessage = (e) => {
  const m = e.data;
  if (m.rid !== undefined) {
    const p = calls.get(m.rid);
    calls.delete(m.rid);
    if (p) (m.ok ? p.resolve(m.result) : p.reject(new Error(m.error)));
    return;
  }
  if (m.progress !== undefined) {
    bootText.textContent = m.text === "engine" ? T.engine : T.loading;
    bootBar.style.width = `${m.progress}%`;
  }
  if (m.events) deliver(m.events);
  if (m.states) setStates(m.states, m.services);
  if (m.forecastChanged) for (const sub of forecastSubs) sub.refresh();
  if (m.save) {
    status.textContent = { saving: T.saving, saved: T.saved, offline: T.offline, conflict: T.conflict, readonly: T.readonly }[m.save] ?? "";
    status.className = `status ${m.save}`;
    if (m.save === "saved") setTimeout(() => status.textContent === T.saved && (status.textContent = ""), 2500);
  }
  if (m.signedOut) location.href = `${cfg.base}/login.php`;
  if (m.fatal) fail(m.fatal);
};
worker.onerror = (e) => fail(e.message || "worker error");

function fail(message) {
  report("fatal", `de tuin kon niet laden: ${message}`);
  document.getElementById("boot").innerHTML = `<p class="err">${T.error}</p><pre>${String(message).replace(/[<&]/g, (c) => (c === "<" ? "&lt;" : "&amp;"))}</pre><p><a href="${cfg.base}/">${T.back}</a></p>`;
}

/* -- the hass object ---------------------------------------------------------- */
const panel = document.getElementById("panel");
const dark = matchMedia("(prefers-color-scheme: dark)");
let hass = null;

function setStates(states, services) {
  if (!hass) return;
  hass = { ...hass, states, services: services ?? hass.services };
  panel.hass = hass;
}

/** In a garden someone shows, only questions reach the engine: nothing changes. */
const READ_ONLY = new Set(["advice", "analysis", "analysis/explain", "analysis/still_possible", "handbook/chapter", "handbook/index", "handbook/search",
  "plan/check", "plan/compare", "plan/export", "plan/autofill", "planning", "plants", "plants/windows", "print/render", "qa/ask", "qa/options",
  "records/overview", "report/season", "subscribe", "supplies", "year/preview", "irrigation/plan",
  "cooking/suggest", "cooking/render", "cooking/pdf"]);
function isChange(type) {
  const [domain, ...rest] = String(type || "").split("/");
  return domain === "garden_manager" && !READ_ONLY.has(rest.join("/"));
}

async function sendMessagePromise(msg) {
  if (msg.type === "history/history_during_period") {
    if (!boot?.ha) return {};
    return (await call("history", { entity_ids: msg.entity_ids || [], start: msg.start_time, end: msg.end_time })).history;
  }
  if (msg.garden_id && msg.garden_id !== cfg.garden) return switchGarden(msg.garden_id);
  if (cfg.viewer && isChange(msg.type)) {
    const err = new Error(T.viewonly);
    err.code = "read_only";
    throw err;
  }
  const { out } = await call("msg", { msg: { ...msg, id: msg.id ?? nextId++ } });
  deliver(out.events);
  if (!out.success) {
    const err = new Error(out.error?.message || out.error?.code || "error");
    err.code = out.error?.code;
    throw err;
  }
  return out.result;
}

function switchGarden(id) {
  if (!boot.gardens.some((g) => g.id === id)) {
    const err = new Error("not_loaded");
    err.code = "not_loaded";
    return Promise.reject(err);
  }
  call("flush").finally(() => (location.href = `${cfg.base}/app.php?g=${encodeURIComponent(id)}`));
  return new Promise(() => {}); // the page reloads
}

async function subscribeMessage(cb, msg) {
  if (msg.type === "weather/subscribe_forecast") {
    const sub = { refresh: async () => cb({ type: msg.forecast_type, forecast: (await call("forecast", { kind: msg.forecast_type })).forecast }) };
    forecastSubs.add(sub);
    await sub.refresh();
    return async () => forecastSubs.delete(sub);
  }
  if (msg.garden_id && msg.garden_id !== cfg.garden) return switchGarden(msg.garden_id);
  const id = nextId++;
  subscriptions.set(id, cb);
  try {
    await sendMessagePromise({ ...msg, id });
  } catch (err) {
    subscriptions.delete(id);
    throw err;
  }
  return async () => {
    subscriptions.delete(id);
    await call("unsub", { id });
  };
}

async function fetchWithAuth(path, init = {}) {
  if (path.startsWith("/api/garden_manager/print")) {
    const query = Object.fromEntries(new URL(path, location.origin).searchParams.entries());
    const { filename, bytes } = await call("pdf", { query });
    return new Response(new Blob([bytes], { type: "application/pdf" }), {
      status: 200,
      headers: { "Content-Type": "application/pdf", "Content-Disposition": `attachment; filename="${filename}"` },
    });
  }
  if (path === "/api/image/upload") {
    const resp = await fetch(`${cfg.base}/api.php?a=photo&g=${cfg.garden}`, {
      method: "POST", body: init.body, credentials: "same-origin", headers: { "X-CSRF-Token": cfg.csrf, Accept: "application/json" },
    });
    const json = await resp.json().catch(() => ({}));
    return new Response(JSON.stringify({ id: json.id }), { status: json.ok ? 200 : resp.status || 500, headers: { "Content-Type": "application/json" } });
  }
  return fetch(path, init);
}

/* The cooking tab mails a recipe or a shopping list to the signed-in cook. */
window.hortulusWeb = {
  ...(window.hortulusWeb || {}),
  mailSelf: cfg.viewer ? undefined : async (subject, text) => {
    const resp = await fetch(`${cfg.base}/api.php?a=mail_self&g=${cfg.garden}`, {
      method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json", "X-CSRF-Token": cfg.csrf, Accept: "application/json" },
      body: JSON.stringify({ subject, text }),
    });
    const json = await resp.json().catch(() => ({}));
    if (!json.ok) report("mail", `mail_self ${resp.status}: ${json.error || ""}`);
    return { ok: !!json.ok, to: json.to, error: json.error ? (T[json.error] || json.error) : undefined };
  },
};

async function callService(domain, service, data = {}) {
  if (domain === "garden_manager" && service === "export_pdf") {
    const { garden, ...query } = data;
    await call("pdf", { query });
    return { response: { saved: true } };
  }
  throw new Error(`${domain}.${service} is not available on the website`);
}

function route() {
  const prefix = `${cfg.base}/app`;
  const path = location.pathname.startsWith(prefix) ? location.pathname.slice(prefix.length) || "/" : "/";
  return { prefix, path };
}

call("init", { cfg: { base: cfg.base, garden: cfg.garden, csrf: cfg.csrf, version: cfg.version } })
  .then(() => undefined)
  .catch((err) => fail(err.message));

worker.addEventListener("message", (e) => {
  if (!e.data.ready) return;
  boot = e.data.boot;
  const lang = boot.language;
  hass = {
    states: e.data.states,
    services: e.data.services || {},
    user: { id: String(boot.user.id), name: boot.user.name, is_admin: Boolean(boot.user.can_edit), is_owner: false },
    language: lang,
    locale: { language: lang, number_format: "language", time_format: "language", date_format: "language" },
    selectedLanguage: lang,
    config: { latitude: boot.latitude, longitude: boot.longitude, time_zone: boot.time_zone, unit_system: { temperature: "°C", length: "km", mass: "kg", volume: "L" }, version: "web", components: [] },
    themes: { darkMode: dark.matches, theme: "default", themes: {} },
    connection: { sendMessagePromise, subscribeMessage },
    callService,
    callWS: sendMessagePromise,
    fetchWithAuth,
    hassUrl: (p = "") => p,
    auth: { data: { hassUrl: location.origin } },
  };
  dark.addEventListener("change", () => {
    hass = { ...hass, themes: { ...hass.themes, darkMode: dark.matches } };
    panel.hass = hass;
  });
  // a garden someone shows: only the tabs they share, nothing to save
  panel.panel = { config: cfg.viewer ? { tabs: cfg.viewer.tabs, viewer: true, web: true } : { web: true } };
  panel.narrow = innerWidth < 870;
  panel.route = route();
  panel.hass = hass;
  addEventListener("resize", () => (panel.narrow = innerWidth < 870));
  addEventListener("popstate", () => (panel.route = route()));
  addEventListener("location-changed", () => (panel.route = route()));
  if (!boot.user.can_edit && !cfg.viewer) {
    status.textContent = T.readonly;
    status.className = "status readonly";
  }
  document.getElementById("boot").remove();
  panel.hidden = false;
});

addEventListener("beforeunload", () => worker.postMessage({ type: "flush" }));

const s = document.createElement("script");
s.type = "module";
s.src = `${cfg.base}/assets/panel/hortulus-panel.js?v=${encodeURIComponent(cfg.version)}`;
document.head.append(s);
