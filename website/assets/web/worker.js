/* Hortulus web – the garden engine in a web worker.
 *
 * Loads Pyodide (Python as WebAssembly) and the Hortulus app (app.zip: the
 * engine, the panel API and a small Home Assistant stand-in), then answers the
 * panel's messages.  Documents are saved through api.php into MariaDB.
 */
/* global loadPyodide, importScripts */
"use strict";

let cfg = null; // {base, garden, csrf, version}
let rt = null; // hortulus_web.runtime.RUNTIME
let boot = null; // api.php?a=boot answer
let revision = 0;
const docs = { main: null, syslog: null, archive: null };
const pendingSaves = new Map(); // key -> content
let saveTimer = null;
let saving = Promise.resolve();

const post = (m, transfer) => self.postMessage(m, transfer || []);
const progress = (pct, text) => post({ progress: pct, text });

async function api(action, { method = "GET", body, query = "", raw = false } = {}) {
  const headers = { Accept: "application/json" };
  if (method !== "GET") headers["X-CSRF-Token"] = cfg.csrf;
  if (body !== undefined && !(body instanceof ArrayBuffer) && !(body instanceof Uint8Array)) headers["Content-Type"] = "application/json";
  const resp = await fetch(`${cfg.base}/api.php?a=${action}&g=${cfg.garden}${query}`, {
    method, headers, credentials: "same-origin",
    body: body === undefined ? undefined : body instanceof ArrayBuffer || body instanceof Uint8Array ? body : JSON.stringify(body),
  });
  if (raw) return resp;
  const json = await resp.json().catch(() => ({ ok: false, error: `HTTP ${resp.status}` }));
  if (resp.status === 401 && boot && boot.user && boot.user.id) post({ signedOut: true });
  return { status: resp.status, ...json };
}

/* -- errors to Beheer → Logboek (at most 20 per page, each message once) -------- */
const reported = new Set();
function report(kind, message, detail, req) {
  const text = String(message || "").slice(0, 400);
  if (!text || reported.has(text) || reported.size >= 20 || !cfg) return;
  reported.add(text);
  fetch(`${cfg.base}/api.php?a=client_log&g=${cfg.garden}`, {
    method: "POST", credentials: "same-origin",
    headers: { "Content-Type": "application/json", "X-CSRF-Token": cfg.csrf },
    body: JSON.stringify({ kind, message: text, detail: String(detail || "").slice(0, 8000), url: self.location ? String(self.location.href) : "", req }),
  }).catch(() => undefined);
}

/** Error answers the engine gives the panel (what the user sees as a red message). */
function reportEngineErrors(msg, out) {
  for (const item of Array.isArray(out) ? out : [out]) {
    if (item && item.success === false && item.error) {
      report("engine", `${msg.type || "?"}: ${item.error.message || item.error.code || "error"}`, JSON.stringify({ request: msg, error: item.error }).slice(0, 4000));
    }
  }
}

function docKey(key) {
  if (key.endsWith(".syslog")) return "syslog";
  if (key.endsWith(".archive")) return "archive";
  return "main";
}

/* -- saving ------------------------------------------------------------- */
function queueSave(key, content) {
  pendingSaves.set(key, content);
  post({ save: "saving" });
  clearTimeout(saveTimer);
  saveTimer = setTimeout(flushSaves, 700);
}

function flushSaves() {
  saving = saving.then(async () => {
    const batch = [...pendingSaves.entries()];
    pendingSaves.clear();
    for (const [key, content] of batch) {
      let tries = 0;
      for (;;) {
        const res = await api("save", { method: "POST", body: { key, content, base_revision: key === "main" ? revision : undefined } }).catch((err) => ({ ok: false, error: String(err) }));
        if (res.ok) {
          if (key === "main") revision = res.revision;
          break;
        }
        if (res.error === "conflict") {
          post({ save: "conflict" });
          return;
        }
        if (res.status === 403) {
          post({ save: "readonly" });
          return;
        }
        tries += 1;
        if (tries === 3) report("warn", `opslaan lukt niet (${res.status || "netwerk"}): ${res.error || ""}`, `key=${key}`, res.req);
        post({ save: "offline" });
        await new Promise((r) => setTimeout(r, Math.min(30000, 2000 * tries)));
      }
    }
    if (!pendingSaves.size) post({ save: "saved" });
  });
  return saving;
}

/* -- the bridge Python talks to -------------------------------------------- */
const bridge = {
  load_document(key) {
    return docs[docKey(key)] ?? null;
  },
  save_document(key, content) {
    const k = docKey(key);
    docs[k] = content;
    if (boot.user.can_edit) queueSave(k, content);
  },
  has_service(domain, service) {
    return Boolean(boot.ha) && ["todo.get_items", "todo.add_item", "todo.update_item", "todo.remove_item", "calendar.get_events"].includes(`${domain}.${service}`);
  },
  async call_service(domain, service, dataJson, returnResponse) {
    const res = await api("ha_call", { method: "POST", body: { domain, service, data: JSON.parse(dataJson || "{}"), return_response: returnResponse } });
    if (!res.ok) throw new Error(res.error || "service call failed");
    const result = res.result ?? null;
    return JSON.stringify(returnResponse && result && result.service_response !== undefined ? result.service_response : result);
  },
};

function statesForPanel() {
  const states = { ...(boot.states || {}) };
  const weather = JSON.parse(rt.weather_state());
  if (weather) states["weather.hortulus"] = { entity_id: "weather.hortulus", ...weather, last_updated: new Date().toISOString(), last_changed: new Date().toISOString() };
  for (const [id, s] of Object.entries(states)) {
    s.entity_id = id;
    s.last_changed ??= s.last_updated;
    s.attributes ??= {};
  }
  return states;
}

async function start(message) {
  cfg = message.cfg;
  progress(5, "engine");
  importScripts(`${cfg.base}/assets/pyodide/pyodide.js`);
  const pyodide = await loadPyodide({ indexURL: `${cfg.base}/assets/pyodide/` });
  progress(45, "engine");
  const [zip, bootRes] = await Promise.all([
    fetch(`${cfg.base}/assets/web/app.zip?v=${cfg.version}`).then((r) => {
      if (!r.ok) throw new Error(`app.zip: HTTP ${r.status}`);
      return r.arrayBuffer();
    }),
    api("boot"),
  ]);
  if (!bootRes.ok) throw new Error(bootRes.error || "boot failed");
  boot = bootRes;
  revision = boot.revision || 0;
  Object.assign(docs, boot.documents);
  progress(65, "loading");
  pyodide.unpackArchive(zip, "zip", { extractDir: "/hortulus" });
  pyodide.runPython("import sys; sys.path.insert(0, '/hortulus')");
  const runtimeModule = pyodide.pyimport("hortulus_web.runtime");
  rt = runtimeModule.RUNTIME;
  const photos = pyodide.pyimport("hortulus_web.photos");
  rt.photo_loader = photos.make_loader(cfg.base, cfg.garden);
  progress(80, "loading");
  await rt.start(JSON.stringify({
    garden: boot.garden, gardens: boot.gardens, user: boot.user, language: boot.language,
    latitude: boot.latitude, longitude: boot.longitude, time_zone: boot.time_zone,
    states: boot.states, weather: boot.weather,
  }), bridge);
  progress(100, "loading");
  post({ ready: true, boot: { user: boot.user, gardens: boot.gardens, garden: boot.garden, language: boot.language, latitude: boot.latitude, longitude: boot.longitude, time_zone: boot.time_zone, ha: boot.ha }, states: statesForPanel(), services: boot.services || {} });
  setInterval(refreshOutside, 10 * 60 * 1000); // weather and sensors every 10 minutes
}

/** New weather and Home Assistant states -> recompute -> fresh snapshot. */
async function refreshOutside() {
  try {
    const [w, s] = await Promise.all([api("weather"), boot.ha ? api("ha_states") : Promise.resolve({ ok: true, states: {} })]);
    if (s.ok) {
      boot.states = s.states;
      boot.services = s.services || {};
    }
    rt.update_states(JSON.stringify(boot.states || {}), w.ok && w.weather ? JSON.stringify(w.weather) : null);
    const events = JSON.parse(await rt.refresh());
    post({ events, states: statesForPanel(), services: boot.services || {}, forecastChanged: true });
  } catch (err) {
    console.warn("Hortulus refresh failed", err);
    report("warn", `refresh: ${err && err.message ? err.message : err}`, err && err.stack ? err.stack : "");
  }
}

async function handle(m) {
  switch (m.type) {
    case "init":
      return start(m);
    case "msg": {
      const out = JSON.parse(await rt.handle(JSON.stringify(m.msg)));
      reportEngineErrors(m.msg, out);
      return { out };
    }
    case "unsub":
      rt.unsubscribe(m.id);
      return {};
    case "forecast":
      return { forecast: JSON.parse(rt.weather_forecast(m.kind || "daily")) };
    case "history": {
      const q = `&entity_ids=${encodeURIComponent(m.entity_ids.join(","))}&start=${encodeURIComponent(m.start)}&end=${encodeURIComponent(m.end)}`;
      const res = await api("ha_history", { query: q });
      const out = {};
      for (const series of res.result || []) {
        for (const point of series) {
          const id = point.entity_id || series[0]?.entity_id;
          (out[id] ||= []).push({ s: point.state, lu: Date.parse(point.last_changed || point.last_updated) / 1000 });
        }
      }
      return { history: out };
    }
    case "pdf": {
      const result = rt.render_pdf(JSON.stringify(m.query));
      const [filename, data] = result.toJs();
      result.destroy();
      const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
      api("file", { method: "POST", body: bytes, query: `&name=${encodeURIComponent(filename)}` }).catch(() => undefined); // keep a copy in the database
      return { filename, bytes };
    }
    case "flush":
      clearTimeout(saveTimer);
      await flushSaves();
      return {};
    default:
      throw new Error(`unknown worker message ${m.type}`);
  }
}

self.onmessage = async (e) => {
  const m = e.data;
  try {
    const result = await handle(m);
    if (m.rid !== undefined) post({ rid: m.rid, ok: true, result }, result?.bytes ? [result.bytes.buffer] : undefined);
  } catch (err) {
    console.error(err);
    report("worker", `${m.type}${m.msg && m.msg.type ? ` ${m.msg.type}` : ""}: ${err && err.message ? err.message : err}`, err && err.stack ? err.stack : "");
    if (m.rid !== undefined) post({ rid: m.rid, ok: false, error: String(err && err.message ? err.message : err) });
    else post({ fatal: String(err && err.message ? err.message : err) });
  }
};
