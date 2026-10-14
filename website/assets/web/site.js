/* Hortulus web – small helpers for the site pages (no inline scripts: strict CSP). */
document.addEventListener("click", (e) => {
  const ask = e.target.closest("[data-confirm]");
  if (ask && !confirm(ask.getAttribute("data-confirm"))) {
    e.preventDefault();
    e.stopPropagation();
  }
  const locate = e.target.closest("[data-locate]");
  if (locate && navigator.geolocation) {
    const form = locate.closest("form");
    locate.disabled = true;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        form.querySelector('[data-geo="lat"]').value = pos.coords.latitude.toFixed(4);
        form.querySelector('[data-geo="lon"]').value = pos.coords.longitude.toFixed(4);
        locate.disabled = false;
      },
      () => (locate.disabled = false),
      { timeout: 10000 },
    );
  }
});
document.addEventListener("submit", (e) => {
  const ask = e.target.getAttribute("data-confirm");
  if (ask && !confirm(ask)) e.preventDefault();
});
document.addEventListener("click", async (e) => {
  const copy = e.target.closest("[data-copy]");
  if (copy) {
    const input = document.querySelector(copy.getAttribute("data-copy"));
    input.select();
    try {
      await navigator.clipboard.writeText(input.value);
    } catch {
      document.execCommand("copy");
    }
    const label = copy.textContent;
    copy.textContent = "✓";
    setTimeout(() => (copy.textContent = label), 1500);
  }
  const sel = e.target.closest("[data-select]");
  if (sel) sel.select();
});
