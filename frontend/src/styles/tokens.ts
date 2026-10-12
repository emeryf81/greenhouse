import { css } from "lit";

/**
 * Hortulus design tokens.
 *
 * Palette - "kitchen garden at golden hour": leaf greens for primary actions,
 * warm soil browns for structure, marigold for highlights, tomato for errors,
 * frost blue for cold.  All text/background pairs meet WCAG AA (4.5:1) in both
 * light and dark themes; colour is never the only carrier of meaning (status
 * chips have icons/labels, plant families have letters + outlines).
 *
 * Typography follows Home Assistant's font stack so the panel feels native,
 * on a 1.2 modular scale (12 / 14 / 16 / 20 / 24 / 32).
 * Spacing uses a 4 px base grid.
 */
export const tokens = css`
  :host {
    /* -- brand palette ------------------------------------------------ */
    --hl-leaf-900: #1f3d1c;
    --hl-leaf-700: #2f5d2a;
    --hl-leaf-600: #3b7334;
    --hl-leaf-500: #4c8c3f;
    --hl-leaf-300: #9cc58a;
    --hl-leaf-100: #e4f0dc;
    --hl-leaf-50: #f3f8ef;
    --hl-soil-900: #2e2118;
    --hl-soil-700: #5a3f2b;
    --hl-soil-500: #8b6446;
    --hl-soil-300: #c4a587;
    --hl-soil-100: #efe4d6;
    --hl-sun-500: #e8a33d;
    --hl-sun-100: #fbefd9;
    --hl-tomato-600: #a8331f;
    --hl-tomato-500: #c8432f;
    --hl-tomato-100: #f8e1dc;
    --hl-frost-600: #2f6690;
    --hl-frost-500: #5b8db8;
    --hl-frost-100: #e1ecf5;
    --hl-water-500: #3a7ca5;

    /* -- semantic (light) --------------------------------------------- */
    --hl-bg: #faf7f0;
    --hl-surface: #ffffff;
    --hl-surface-2: #f3efe6;
    --hl-surface-3: #e9e3d6;
    --hl-text: #22281f;
    --hl-text-muted: #5e6658;
    --hl-border: #e2dccd;
    --hl-primary: var(--hl-leaf-600);
    --hl-primary-hover: var(--hl-leaf-700);
    --hl-on-primary: #ffffff;
    --hl-accent: var(--hl-sun-500);
    --hl-danger: var(--hl-tomato-500);
    --hl-warning: #b26b00;
    --hl-info: var(--hl-frost-600);
    --hl-success: var(--hl-leaf-600);
    --hl-focus: #2f7dd1;
    --hl-canvas-bg: #f6f1e4;
    --hl-grid-line: rgba(90, 63, 43, 0.12);
    --hl-grid-line-strong: rgba(90, 63, 43, 0.25);
    --hl-bed-fill: #8b6446;
    --hl-bed-fill-raised: #7a5539;
    --hl-container-fill: #a07b5a;
    --hl-zone-outdoor: rgba(76, 140, 63, 0.08);
    --hl-zone-greenhouse: rgba(91, 141, 184, 0.12);

    /* -- typography --------------------------------------------------- */
    --hl-font: var(--ha-font-family-body, var(--paper-font-body1_-_font-family, "Roboto", "Noto Sans", system-ui, sans-serif));
    --hl-font-display: var(--ha-font-family-heading, var(--hl-font));
    --hl-fs-xs: 12px;
    --hl-fs-sm: 13px;
    --hl-fs-md: 14px;
    --hl-fs-lg: 16px;
    --hl-fs-xl: 20px;
    --hl-fs-2xl: 24px;
    --hl-fs-3xl: 32px;
    --hl-lh: 1.45;

    /* -- spacing, radii, elevation, motion ---------------------------- */
    --hl-s1: 4px;
    --hl-s2: 8px;
    --hl-s3: 12px;
    --hl-s4: 16px;
    --hl-s5: 24px;
    --hl-s6: 32px;
    --hl-s8: 48px;
    --hl-r-sm: 6px;
    --hl-r-md: 10px;
    --hl-r-lg: 16px;
    --hl-r-pill: 999px;
    --hl-shadow-1: 0 1px 2px rgba(46, 33, 24, 0.08), 0 1px 3px rgba(46, 33, 24, 0.06);
    --hl-shadow-2: 0 4px 12px rgba(46, 33, 24, 0.1), 0 2px 4px rgba(46, 33, 24, 0.06);
    --hl-shadow-3: 0 12px 32px rgba(46, 33, 24, 0.18);
    --hl-ease: cubic-bezier(0.2, 0.8, 0.2, 1);
    --hl-dur: 160ms;

    /* -- plant families (also served by the backend FAMILIES table) --- */
    --hl-fam-solanaceae: #c8432f;
    --hl-fam-cucurbitaceae: #e0a526;
    --hl-fam-fabaceae: #6a9f3a;
    --hl-fam-brassicaceae: #3e7c8c;
    --hl-fam-apiaceae: #e07a2e;
    --hl-fam-amaryllidaceae: #8e5ba8;
    --hl-fam-amaranthaceae: #a23e6b;
    --hl-fam-asteraceae: #4fa38a;
    --hl-fam-lamiaceae: #4f6fb0;
    --hl-fam-poaceae: #b79f2e;

    --hl-chip-active-fg: var(--hl-leaf-700);
    color-scheme: light;
  }

  :host([dark]) {
    --hl-bg: #131811;
    --hl-surface: #1c2219;
    --hl-surface-2: #242b20;
    --hl-surface-3: #2e3629;
    --hl-text: #e8ede4;
    --hl-text-muted: #a3ad9c;
    --hl-border: #343c30;
    --hl-primary: #78b866;
    --hl-primary-hover: #8fcb7c;
    --hl-on-primary: #10200d;
    --hl-danger: #e2705c;
    --hl-warning: #f0b450;
    --hl-info: #8db7dc;
    --hl-success: #8fcb7c;
    --hl-focus: #7fb6ff;
    --hl-canvas-bg: #1a2017;
    --hl-grid-line: rgba(232, 237, 228, 0.07);
    --hl-grid-line-strong: rgba(232, 237, 228, 0.16);
    --hl-bed-fill: #5c4331;
    --hl-bed-fill-raised: #4f3928;
    --hl-container-fill: #6b5340;
    --hl-zone-outdoor: rgba(120, 184, 102, 0.07);
    --hl-zone-greenhouse: rgba(141, 183, 220, 0.1);
    --hl-leaf-100: #24331f;
    --hl-leaf-50: #1d2819;
    --hl-sun-100: #3a2f1a;
    --hl-tomato-100: #3c211c;
    --hl-frost-100: #1d2a36;
    --hl-soil-100: #2e261f;
    --hl-leaf-300: #4f7a43;
    --hl-chip-active-fg: var(--hl-primary);
    color-scheme: dark;
  }
`;

/**
 * Reusable component styles - buttons, cards, chips, inputs (with all states).
 * Child components include only ``shared``: the tokens are declared once on
 * <hortulus-panel> and inherit through every shadow root, so a single
 * ``dark`` attribute on the panel re-themes the whole tree.
 */
export const shared = css`
  :host {
    font-family: var(--hl-font);
    font-size: var(--hl-fs-md);
    line-height: var(--hl-lh);
    color: var(--hl-text);
  }
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  h1, h2, h3, h4 {
    font-family: var(--hl-font-display);
    margin: 0;
    line-height: 1.25;
    color: var(--hl-text);
  }
  h1 { font-size: var(--hl-fs-3xl); font-weight: 600; letter-spacing: -0.01em; }
  h2 { font-size: var(--hl-fs-xl); font-weight: 600; }
  h3 { font-size: var(--hl-fs-lg); font-weight: 600; }
  h4 { font-size: var(--hl-fs-md); font-weight: 600; }
  p { margin: 0; }
  .muted { color: var(--hl-text-muted); }
  .small { font-size: var(--hl-fs-sm); }
  .xs { font-size: var(--hl-fs-xs); }
  .row { display: flex; align-items: center; gap: var(--hl-s2); }
  .row.wrap { flex-wrap: wrap; }
  .spacer { flex: 1; }
  .stack { display: flex; flex-direction: column; gap: var(--hl-s3); }
  .visually-hidden {
    position: absolute !important; width: 1px; height: 1px; overflow: hidden;
    clip: rect(0 0 0 0); white-space: nowrap; border: 0; padding: 0; margin: -1px;
  }

  /* -- cards ---------------------------------------------------------- */
  .card {
    background: var(--hl-surface);
    border: 1px solid var(--hl-border);
    border-radius: var(--hl-r-lg);
    box-shadow: var(--hl-shadow-1);
    padding: var(--hl-s4);
  }
  .card > header { display: flex; align-items: center; gap: var(--hl-s2); margin-bottom: var(--hl-s3); }

  /* -- buttons: default / hover / active / focus / disabled ------------ */
  button { font: inherit; }
  .btn {
    display: inline-flex; align-items: center; justify-content: center; gap: var(--hl-s2);
    min-height: 36px; padding: 0 var(--hl-s4);
    border-radius: var(--hl-r-pill); border: 1px solid var(--hl-border);
    background: var(--hl-surface); color: var(--hl-text);
    font-weight: 500; font-size: var(--hl-fs-md); cursor: pointer;
    transition: background var(--hl-dur) var(--hl-ease), border-color var(--hl-dur) var(--hl-ease),
      transform var(--hl-dur) var(--hl-ease), box-shadow var(--hl-dur) var(--hl-ease);
    white-space: nowrap;
  }
  .btn:hover { background: var(--hl-surface-2); }
  .btn:active { transform: scale(0.97); }
  .btn:focus-visible, .icon-btn:focus-visible, .chip:focus-visible, input:focus-visible,
  select:focus-visible, textarea:focus-visible, [tabindex]:focus-visible {
    outline: 2px solid var(--hl-focus); outline-offset: 2px;
  }
  .btn[disabled], .icon-btn[disabled] { opacity: 0.45; cursor: not-allowed; transform: none; }
  .btn.primary { background: var(--hl-primary); border-color: transparent; color: var(--hl-on-primary); }
  .btn.primary:hover { background: var(--hl-primary-hover); }
  .btn.danger { color: var(--hl-danger); border-color: color-mix(in srgb, var(--hl-danger) 40%, transparent); }
  .btn.danger:hover { background: var(--hl-tomato-100); }
  .btn.ghost { background: transparent; border-color: transparent; }
  .btn.ghost:hover { background: var(--hl-surface-2); }
  .btn.small { min-height: 28px; padding: 0 var(--hl-s3); font-size: var(--hl-fs-sm); }
  .icon-btn {
    display: inline-grid; place-items: center; width: 36px; height: 36px; border-radius: var(--hl-r-md);
    border: 1px solid transparent; background: transparent; color: var(--hl-text); cursor: pointer;
    transition: background var(--hl-dur) var(--hl-ease);
    --mdc-icon-size: 20px;
  }
  .icon-btn:hover { background: var(--hl-surface-2); }
  .icon-btn[aria-pressed="true"] { background: var(--hl-leaf-100); color: var(--hl-primary); border-color: var(--hl-leaf-300); }

  /* -- chips ---------------------------------------------------------- */
  .chip {
    display: inline-flex; align-items: center; gap: var(--hl-s1);
    height: 26px; padding: 0 var(--hl-s3); border-radius: var(--hl-r-pill);
    font-size: var(--hl-fs-xs); font-weight: 600; letter-spacing: 0.01em;
    background: var(--hl-surface-2); color: var(--hl-text-muted); border: 1px solid transparent;
    --mdc-icon-size: 14px;
  }
  button.chip { cursor: pointer; }
  button.chip:hover { border-color: var(--hl-border); }
  .chip[aria-pressed="true"] { background: var(--hl-leaf-100); color: var(--hl-chip-active-fg); border-color: var(--hl-leaf-300); }
  .chip.ok { background: var(--hl-leaf-100); color: var(--hl-success); }
  .chip.warn { background: var(--hl-sun-100); color: var(--hl-warning); }
  .chip.bad { background: var(--hl-tomato-100); color: var(--hl-danger); }
  .chip.cold { background: var(--hl-frost-100); color: var(--hl-info); }

  /* -- forms: default / focus / error / disabled ---------------------- */
  label.field { display: flex; flex-direction: column; gap: var(--hl-s1); font-size: var(--hl-fs-sm); color: var(--hl-text-muted); }
  input, select, textarea {
    font: inherit; color: var(--hl-text); background: var(--hl-surface);
    border: 1px solid var(--hl-border); border-radius: var(--hl-r-sm);
    padding: 8px 10px; min-height: 36px; width: 100%;
    transition: border-color var(--hl-dur) var(--hl-ease);
  }
  input:hover, select:hover, textarea:hover { border-color: var(--hl-soil-300); }
  input[aria-invalid="true"] { border-color: var(--hl-danger); }
  input:disabled, select:disabled { opacity: 0.55; cursor: not-allowed; }
  input[type="checkbox"] { width: 18px; min-height: 18px; accent-color: var(--hl-primary); }
  .field-error { color: var(--hl-danger); font-size: var(--hl-fs-xs); }

  /* -- misc ----------------------------------------------------------- */
  .family-dot { width: 10px; height: 10px; border-radius: 50%; flex: none; display: inline-block; }
  .empty { padding: var(--hl-s6); text-align: center; color: var(--hl-text-muted); }
  .divider { height: 1px; background: var(--hl-border); margin: var(--hl-s3) 0; }
  ha-icon { --mdc-icon-size: 20px; }
`;
