// A small burst of leaves where something good happened (a task done, a harvest saved).
// Lives in the panel's shadow root; skipped with "reduce motion".
const COLORS = ["#7fb069", "#4c8c3f", "#e8a33d", "#9cc58a", "#c8432f"];

export function celebrate(root: ShadowRoot | HTMLElement, x: number, y: number, count = 12): void {
  if (globalThis.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
  const layer = document.createElement("div");
  layer.className = "burst";
  layer.setAttribute("aria-hidden", "true");
  layer.style.left = `${x}px`;
  layer.style.top = `${y}px`;
  for (let i = 0; i < count; i++) {
    const leaf = document.createElement("span");
    const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
    const dist = 38 + Math.random() * 46;
    leaf.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    leaf.style.setProperty("--dy", `${Math.sin(angle) * dist - 18}px`);
    leaf.style.setProperty("--rot", `${Math.round(Math.random() * 540 - 270)}deg`);
    leaf.style.setProperty("--c", COLORS[i % COLORS.length]);
    leaf.style.animationDelay = `${Math.random() * 60}ms`;
    layer.appendChild(leaf);
  }
  root.appendChild(layer);
  setTimeout(() => layer.remove(), 1100);
}

/** Ask the panel for a burst at the centre of ``el`` (works through shadow roots). */
export function celebrateAt(el: Element | null | undefined): void {
  if (!el) return;
  const r = el.getBoundingClientRect();
  el.dispatchEvent(new CustomEvent("hl-celebrate", { detail: { x: r.left + r.width / 2, y: r.top + r.height / 2 }, bubbles: true, composed: true }));
}
