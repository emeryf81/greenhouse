# Hortulus design system

*How the product looks, feels and behaves – and why.* This document is the shared
contract between UX engineering (structure, interaction, accessibility) and graphic
design (brand, colour, type, illustration). Every token below exists in code:
[`frontend/src/styles/tokens.ts`](../frontend/src/styles/tokens.ts).

<p align="center"><img src="../assets/brand/logo.png" alt="Hortulus logo" width="520"></p>

---

## 1. Product principles

| Principle | What it means in the UI |
|---|---|
| **The garden is the interface** | The planner canvas is a to‑scale drawing in centimetres, not a spreadsheet. Beds look like soil, greenhouses like glass. |
| **Explain, don't just warn** | Every warning carries its reason (“Alliums inhibit nitrogen‑fixing bacteria of legumes”), every task its window and why it moved. |
| **Today first** | The landing view answers *what do I do in the garden today, and how long will it take?* |
| **Calm technology** | Sensors and forecasts refine advice quietly; alerts are reserved for frost, heat and dry beds. |
| **Native to Home Assistant** | Lit web components, HA font stack, `ha-icon`, light/dark theme follow, sidebar panel, entities/calendar/to‑do for everything. |
| **Bilingual by design** | English and Dutch side by side, from config flow to plant names, task titles and pests. Placeholders are identical across languages (unit‑tested). |

## 2. Users & jobs to be done

| Persona | Context | Top jobs |
|---|---|---|
| **The planner** (primary) – hobby gardener, 2–6 beds + small greenhouse, HA enthusiast | Winter evenings on a laptop | Draw the garden, decide what goes where, avoid bad neighbours & rotation mistakes, see the season at a glance |
| **The doer** – same person or a family member, phone in the garden | Mornings, dirty hands | See today's tasks, tick them off, snap a photo, postpone when it rains |
| **The automator** – HA power user | YAML / automation editor | Valves on `needs_water`, vent on `greenhouse_advice`, actionable notifications |

Key journeys we designed and tested in the browser harness:

1. *Setup → first plan in under 5 minutes*: wizard with sensible defaults (Bed 1 2×1 m, Greenhouse Zone A 3×2 m) → optional example plan → planner.
2. *Drag tomato next to kale*: ghost turns into a live verdict (“⚠ 1”) **before** dropping; inspector explains the conflict; companion overlay draws a red dashed line.
3. *Morning check on a phone*: bottom navigation, task rows with 40 px tap targets, one‑tap complete, dialog with +1/+3/+7 days.
4. *Frost night*: alert banner + push + optional TTS; tender plants listed by name.

## 3. Information architecture

```
Hortulus (sidebar panel, /hortulus)
├── Today      – alerts · today's tasks · beds (moisture, soil temp, irrigation) · 48 h weather · greenhouse · coming up
├── Planner    – toolbar (layers, align) · plant palette · canvas · inspector · dialogs (autofill, succession, import, shortcuts)
├── Plants     – search & filters (category, family) · plant cards with sowing calendar · detail drawer · editor
├── Calendar   – month / week / list / timeline · task dialog (live context) · new task
├── Handbook   – contents · chapter reader · search · glossary          ← also reached from every ⓘ tooltip
├── Print      – document · paper (incl. reMarkable) · colours · live preview · download / save
└── Settings   – region · weather · zones & beds sensor mapping · irrigation hardware · resources · notifications · general
```

Desktop uses a top tab bar; on narrow screens (HA's `narrow` flag) navigation moves to a
bottom bar (Print is desktop‑only there – printing is a desk activity), the planner puts the
canvas first and turns the palette into a horizontal strip, and the handbook folds its
contents away while reading.

## 4. Colour

Palette concept: *kitchen garden at golden hour* – leaf greens for action, soil browns for
structure, marigold for highlights, tomato red for problems, frost blue for cold.

| Token | Light | Dark | Use |
|---|---|---|---|
| `--hl-primary` | `#3B7334` leaf‑600 | `#78B866` | primary buttons, active nav, checks |
| `--hl-bg` | `#FAF7F0` parchment | `#131811` | page |
| `--hl-surface` / `-2` / `-3` | `#FFFFFF` / `#F3EFE6` / `#E9E3D6` | `#1C2219` / `#242B20` / `#2E3629` | cards, inputs, hover |
| `--hl-text` / `--hl-text-muted` | `#22281F` / `#5E6658` | `#E8EDE4` / `#A3AD9C` | text |
| `--hl-border` | `#E2DCCD` | `#343C30` | hairlines |
| `--hl-accent` | `#E8A33D` marigold | same | harvest, highlights, the sun in the logo |
| `--hl-danger` | `#C8432F` tomato | `#E2705C` | errors, enemies, urgent |
| `--hl-warning` | `#B26B00` | `#F0B450` | warnings, high priority |
| `--hl-info` | `#2F6690` frost | `#8DB7DC` | cold, greenhouse, info |
| `--hl-focus` | `#2F7DD1` | `#7FB6FF` | focus rings only |

**Plant families** (categorical, tuned to stay distinguishable for the common colour
vision deficiencies and *never used alone* – every planting also carries a two‑letter
monogram, every chip a label):

| Family | Colour | | Family | Colour |
|---|---|---|---|---|
| Solanaceae – nightshades | `#C8432F` | | Apiaceae – umbellifers | `#E07A2E` |
| Cucurbitaceae – cucurbits | `#E0A526` | | Amaryllidaceae – alliums | `#8E5BA8` |
| Fabaceae – legumes | `#6A9F3A` | | Amaranthaceae – beets & spinach | `#A23E6B` |
| Brassicaceae – brassicas | `#3E7C8C` | | Asteraceae – daisy family | `#4FA38A` |
| Lamiaceae – herbs | `#4F6FB0` | | Poaceae – grasses | `#B79F2E` |

Contrast: all body text/background pairs ≥ 4.5:1 (AA) in both themes; muted text ≥ 4.5:1
on surfaces; status chips use tinted backgrounds with dark text.

Moisture overlay on beds: dry `#C8432F`, slightly dry `#E8A33D`, optimal `#4C8C3F`,
wet `#3A7CA5` – as outline (3 px) + 12 % fill + the value in text.

## 5. Typography

* Family: Home Assistant's body font (`--ha-font-family-body`, Roboto by default) for UI –
  the panel must feel native. The **wordmark** uses a classic book serif (Fraunces,
  falling back to Charter/Georgia) to evoke old herbals; it is only used in the logo.
* Scale (≈ 1.2 ratio): 12 · 13 · 14 · 16 · 20 · 24 · 32 px. Body 14/1.45.
* Weights: 400 body, 500 buttons/task titles, 600 headings, 700 numbers & hero.
* Numbers that matter (moisture %, temperatures, GDD) are set larger and bold, with the
  unit lighter.

## 6. Space, layout & shape

* 4 px base grid: `--hl-s1` 4 · `s2` 8 · `s3` 12 · `s4` 16 · `s5` 24 · `s6` 32 · `s8` 48.
* Dashboard: 12‑column grid, 16 px gutters; 8/4 split ≥ 1100 px, single column below.
* Planner: 260 px palette · fluid canvas · 320 px inspector; palette collapsible.
* Radii: 6 (inputs) · 10 (cards inside cards, rows) · 16 (cards, canvas) · pill (buttons, chips).
* Elevation: 3 shadow levels in warm brown, never pure black.
* Motion: 160 ms, `cubic-bezier(.2,.8,.2,1)`; only transform/background – no layout shift.

## 7. Components & states

| Component | Default | Hover | Active | Focus‑visible | Disabled | Error |
|---|---|---|---|---|---|---|
| Button (primary) | leaf‑600 fill | leaf‑700 | scale .97 | 2 px focus ring, 2 px offset | 45 % opacity, `not-allowed` | – |
| Button (secondary/ghost/danger) | surface / transparent / tomato text | surface‑2 / tomato‑100 | scale .97 | ring | 45 % | – |
| Icon button | transparent | surface‑2 | – | ring | 45 % | – |
| Toggle (aria‑pressed) | – | – | leaf‑100 bg, leaf border | ring | – | – |
| Chip | surface‑2 | border | pressed = leaf | ring | – | `.bad` tomato‑100 |
| Input/select | border | soil‑300 border | – | ring | 55 % | tomato border + message (`aria-invalid`) |
| Task row | – | surface‑2 | – | ring | done = strikethrough | overdue chip + priority edge (urgent red, high amber) |
| Info tooltip (ⓘ) | muted icon | primary | popover with term, text and “read more” | ring | – | – |
| Task row (touch) | – | – | swipe → leaf‑100 (complete) / ← sun‑100 (postpone) | ring | – | – |
| Planting (canvas) | family colour 22 % fill + habit glyphs + monogram | – | dashed focus outline + resize handle | – | faded 32 % + dashed when not in the ground on *view date* | red/amber “!” badge |

## 8. Iconography & illustration

* UI icons: Material Design Icons through `ha-icon` (consistent with HA). Each task type
  has a fixed icon (`mdi:seed`, `mdi:shovel`, `mdi:scissors-cutting`, `mdi:basket-outline`, …).
* Canvas drawing language: soil beds with a subtle grain pattern, greenhouses with
  diagonal glass hatching, outdoor zones as dashed lawn outlines, plants as symbols at
  real spacing so density is legible at a glance. The symbol shape follows the growth
  habit – disc (bush), triangle (climber), diamond (upright), ring (vine), four petals
  (rosette), ▼ (root crop), drop (bulb) – so the plan reads without colour.
* Companion lines: solid green friend, dotted green pest deterrence, dashed red enemy,
  dashed purple allelopathy, short‑dashed amber competition/overlap, dotted grey shade.
* Garden elements: path (sand, dotted), compost (brown cross‑hatch), water butt (blue
  circle), shed (grey), tree (green circle), hedge (green grid), trellis (dashed).

### Print language

Print reuses the canvas language on paper. Family colours become **soft tints** (38 % in
colour, 24 % on e‑ink) with a full‑colour outline; on e‑ink and grayscale every family
also gets a **hatch pattern** (diagonal, back‑diagonal, horizontal, vertical, cross, dots,
grid) so beds stay distinguishable on a monochrome screen or printer and pen strokes
drawn on top remain visible. Every map has a legend, a scale bar with ratio, and a north
arrow; crops whose names don't fit get numbered circles explained in the legend. Notes
areas use a 5 mm dot grid – the reMarkable's own rhythm for handwriting. The
reMarkable Paper Pro format keeps a 13 mm left margin free for the device toolbar.

## 9. Brand

**Name.** *Hortulus* – Latin for “little garden”, the title of Walahfrid Strabo's
9th‑century poem about his monastery vegetable plot. It reads naturally in English and
Dutch (cf. *hortus botanicus*), is short, ownable and says “kitchen garden” without
saying “app”.

**Emblem** (`assets/brand/icon.svg`): a rounded tile in a leaf gradient containing
* an **arch** – the hortus gate and the greenhouse,
* a **two‑leaf seedling** – growth,
* **two planted rows** in soil tones – the plan,
* a **marigold sun** – the season (and a nod to *Tagetes*, the companion flower).

Construction: 64‑unit grid, 15‑unit corner radius, 3.4‑unit strokes with round caps so it
survives 16 px; one accent colour only.

| Asset | File | Use |
|---|---|---|
| Icon | `assets/brand/icon.svg`, `icon.png` (256), `icon@2x.png` (512) | HA brands, HACS, favicon |
| Logo (light bg) | `logo.svg`, `logo.png`, `logo@2x.png` | README, docs |
| Logo (dark bg) | `logo-dark.svg`, `dark_logo.png` | dark docs, HA brands `dark_logo` |
| GitHub banner | `banner.svg`, `banner.png` (1280×640) | README header, social preview |

Do: keep clear space of ¼ tile around the emblem; use on parchment, white or very dark
green. Don't: recolour the seedling, add outlines, stretch, or put the emblem on busy photos.

## 10. Accessibility

* Full keyboard path for drag‑and‑drop: *Enter* on a palette plant adds it to the selected
  bed; arrows move (Shift ×10), Alt+arrows resize, `[`/`]` cycle selection, Delete, Ctrl+Z/Y.
* Canvas is `role="application"` with labelled items; actions are announced in a polite
  live region (“Basil placed in Bed 2”).
* Native `<dialog>` modals (focus trap, Esc); visible focus rings everywhere.
* Colour never alone: monograms, badges with symbols, labelled chips, text values on overlays.
* Touch: pointer events with capture for drag, 40 px tap targets on task rows, bottom nav.
* Respect HA dark mode; tokens re‑theme the whole tree from one `dark` attribute.

## 11. UX ⇄ graphic design decision log

| # | Question | Decision | Why |
|---|---|---|---|
| 1 | React or Lit? | Lit | Same runtime and theming as HA, no second framework, ~55 kB gz bundle. |
| 2 | HTML5 drag‑and‑drop or pointer events? | Pointer events + keyboard alternative | HTML5 DnD has no touch support and poor accessibility. |
| 3 | Show plants as icons or dots? | Dots at true spacing + monogram | Density and spacing errors become visible; icons lie about scale. |
| 4 | Family colours | 10 hues, tested in pairs for adjacency on soil brown | Families sit next to each other in beds; brown background shifts perception. |
| 5 | Where do warnings live? | Badge on the item + explanation in the inspector + overlay lines | Spatial problem → spatial cue; reasons in words. |
| 6 | Save button? | Autosave with revision guard + status indicator | Gardeners expect drawing tools to remember; conflicts are rare and recoverable. |
| 7 | Overdue tasks in the calendar | Shown on *today* | Nothing silently rots in last week's cell. |
| 8 | Dutch terms | *Uitplanten, afharden, dieven, aanaarden, IJsheiligen* | Use the words Dutch gardeners use, not literal translations. |
| 9 | Dark theme | Tokens declared once at the panel root | Child shadow roots inherit; no per‑component dark rules. |
| 10 | Wordmark typeface | Book serif for the logo only | Heritage of herbals vs. a native UI font for everything else. |
| 11 | Theory in the UI | ⓘ tooltips with one‑paragraph explanations + handbook link | Explain at the moment of doubt; the full chapter is one click away, never forced. |
| 12 | Autofill: magic or proposal? | A proposal with numbers, warnings and reasons; nothing changes until *Apply* | Gardeners must trust and adjust the plan; an opaque fill would be undone by hand. |
| 13 | Plant glyph shapes | Shape = growth habit | Colour = family is already taken; shape adds a second, colour‑blind‑safe channel. |
| 14 | Print colours for e‑ink | Light tints + patterns, no solid fills | E‑ink renders colour muted; pen strokes must stay visible on top. |
| 15 | Multi‑select gesture | Shift/Ctrl‑click, drag moves the group | Matches every drawing tool; a click without drag narrows back to one item. |
| 16 | Swipe on tasks | Touch/pen only; right = done, left = +1 day | Mouse users keep normal clicks; the two most common actions become one gesture. |
