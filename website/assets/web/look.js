/* Hortulus web – colour theme and light/dark, shared by the site pages and the garden app
   (same keys as the app panel). Loaded in <head> without defer so a page never flashes. */
(function () {
  var THEMES = ["classic", "earth", "night", "season"];
  var MODES = ["auto", "light", "dark"];
  function get(key, list, dflt) {
    try { var v = localStorage.getItem(key); return list.indexOf(v) >= 0 ? v : dflt; } catch (e) { return dflt; }
  }
  function season() {
    var m = new Date().getMonth();
    return m < 2 || m === 11 ? "winter" : m < 5 ? "spring" : m < 8 ? "summer" : "autumn";
  }
  function apply() {
    var theme = get("hortulus-theme", THEMES, "classic");
    var mode = get("hortulus-appearance", MODES, "auto");
    var root = document.documentElement;
    root.setAttribute("data-theme", theme === "season" ? "season-" + season() : theme);
    root.setAttribute("data-mode", theme === "night" ? "dark" : mode);
    var on = document.querySelectorAll("[data-look-theme],[data-look-mode]");
    for (var i = 0; i < on.length; i++) {
      var el = on[i];
      var pressed = el.getAttribute("data-look-theme") === theme || el.getAttribute("data-look-mode") === mode;
      el.setAttribute("aria-pressed", pressed ? "true" : "false");
      if (el.hasAttribute("data-look-mode")) el.disabled = theme === "night";
    }
  }
  function set(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode: this page only */ }
    apply();
    window.dispatchEvent(new CustomEvent("hortulus-theme-changed")); // the garden app follows at once
  }
  apply();
  document.addEventListener("DOMContentLoaded", apply);
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-look-theme]");
    if (t) set("hortulus-theme", t.getAttribute("data-look-theme"));
    var m = e.target.closest && e.target.closest("[data-look-mode]");
    if (m && !m.disabled) set("hortulus-appearance", m.getAttribute("data-look-mode"));
  });
  window.addEventListener("storage", apply);
})();
