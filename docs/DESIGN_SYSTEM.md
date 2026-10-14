# Hortulus design system

*How the product looks, feels and behaves – and why.* This document is the shared
contract between UX engineering (structure, interaction, accessibility) and graphic
design (brand, colour, type, illustration). Every token below exists in code:
[`frontend/src/styles/tokens.ts`](../frontend/src/styles/tokens.ts) (base, light) and
[`frontend/src/styles/palettes.ts`](../frontend/src/styles/palettes.ts) (dark and themes).

<p align="center"><img src="../assets/brand/logo.png" alt="Hortulus logo" width="520"></p>

---

## 1. Product principles

| Principle | What it means in the UI |
|---|---|
| **The garden is the interface** | The planner canvas is a to‑scale drawing in centimetres, not a spreadsheet. Beds look like soil, greenhouses like glass, crops like little plants. |
| **Explain, don't just warn** | Every warning carries its reason (“Alliums inhibit nitrogen‑fixing bacteria of legumes”), every task its window and why it moved. |
| **Today first** | The landing view answers *what do I do in the garden today, and how long will it take?* The wall screen answers it from across the room. |
| **Calm technology** | Sensors and forecasts refine advice quietly; alerts are reserved for frost, heat, dry beds, leaks and valves. Motion is small and stops on request. |
| **Native to Home Assistant** | Lit web components, HA font stack for the UI, `ha-icon` as fallback, light/dark follow, sidebar panel, entities/calendar/to‑do for everything. |
| **Multilingual by design** | English, Dutch and French side by side, from config flow to plant names, task titles, recipes and pests. Placeholders are identical across languages (unit‑tested). |
| **One voice, screen and paper** | The panel, the PDFs and the season book share a vocabulary: a book serif for display type, family colours, the same line art. |

## 2. Users & jobs to be done

| Persona | Context | Top jobs |
|---|---|---|
| **The planner** (primary) – hobby gardener, 2–6 beds + small greenhouse, HA enthusiast | Winter evenings on a laptop | Draw the garden, decide what goes where, avoid bad neighbours & rotation mistakes, see the season at a glance |
| **The doer** – same person or a family member, phone in the garden | Mornings, dirty hands | See today's tasks, tick them off, snap a photo, postpone when it rains, log a harvest |
| **The cook** – same household, tablet in the kitchen | Before dinner | See what is ready to pick, choose a dish, make one shopping list, send it to the phone |
| **The automator** – HA power user | YAML / automation editor | Valves on `needs_water`, vent on `greenhouse_advice`, actionable notifications, blueprints |

Key journeys we designed and tested in the browser harness:

1. *Setup → first plan in under 5 minutes*: wizard with sensible defaults, or the starter garden on the empty welcome screen (2–4 raised beds, herb pot, optional greenhouse, with a first plan) → planner.
2. *Drag tomato next to kale*: ghost turns into a live verdict (“⚠ 1”) **before** dropping; the popup explains the conflict (“Why (not) here?”); companion overlay draws a red dashed line.
3. *Morning check on a phone*: bottom navigation, task rows with 40 px tap targets, one‑tap complete (with a small burst of leaves), dialog with +1/+3/+7 days, Quick harvest with big buttons.
4. *Frost night*: alert banner + push + optional TTS; tender plants listed by name.
5. *What's for dinner?*: Cooking → pick what is ready, fridge items, side and meat → dish with a picture → shopping list → phone or to‑do list.

## 3. Information architecture

```
Hortulus (sidebar panel, /hortulus)
├── Today      – hero · alerts · today's tasks · beds (moisture, soil temp, irrigation) · weather · greenhouse · pests · quick harvest · coming up   → Wall screen (/hortulus/wall)
├── Garden     – Planner (five steps) · Garden plan (per year, plans, year‑end transition) · Crops (list, sowing plan, seeds, succession, forecast, timeline)
├── Calendar   – month / week / list / timeline / year · task dialog (live context) · new task
├── Weather    – now · 24 h chart · ten days · what it means for the garden · rain radar
├── Journal    – diary · harvest (and over the years) · kitchen economy · seeds · water · season report · system log
├── Cooking    – ideas & menus · my cookbook · shopping list
├── Knowledge  – Plants (library) · Advice · Handbook (contents, reader, search, glossary ← also reached from every ⓘ tooltip)
└── Manage     – Analysis (check, why not, errors, compare) · Print (incl. season book) · Settings
```

Eight places instead of a long row of tabs; the tabs of a place sit in a rounded row under the
app bar, and a place reopens on the tab you used last. Desktop uses a top bar with the
places; on narrow screens (HA's `narrow` flag) navigation moves to a bottom bar with icon
over label, Settings moves into the app bar, the planner puts the canvas first and turns
the palette into a horizontal strip, and the handbook folds its contents away while
reading. A garden switcher appears in the app bar when more than one garden exists. The
wall screen has no chrome at all (one *Close* button). The same panel can be given a list of
allowed tabs (`panel.config.tabs`); a place without an allowed tab disappears, and with one
place left the menu is hidden (the read‑only “Look at a garden” view).

## 4. Colour

Palette concept: *kitchen garden at golden hour* – leaf greens for action, soil browns for
structure, marigold for highlights, tomato red for problems, frost blue for cold.

Tokens are declared once on `<hortulus-panel>` and inherit through every shadow root. The
base palette (light, “classic”) is in `tokens.ts`; the dark palette and the theme
overrides in `palettes.ts` are applied as **inline custom properties** on the panel, which
always win and re‑render at once in every browser (including Safari and the HA iOS app,
where re‑evaluating `:host([attr])` rules is unreliable).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--hl-primary` | `#3B7334` leaf‑600 | `#78B866` | primary buttons, active nav, checks |
| `--hl-primary-hover` / `--hl-on-primary` | `#2F5D2A` / `#FFFFFF` | `#8FCB7C` / `#10200D` | hover, text on primary |
| `--hl-bg` | `#FAF7F0` parchment | `#131811` | page |
| `--hl-surface` / `-2` / `-3` | `#FFFFFF` / `#F3EFE6` / `#E9E3D6` | `#1C2219` / `#242B20` / `#2E3629` | cards, inputs, hover |
| `--hl-text` / `--hl-text-muted` | `#22281F` / `#5E6658` | `#E8EDE4` / `#A3AD9C` | text |
| `--hl-border` | `#E2DCCD` | `#343C30` | hairlines |
| `--hl-accent` | `#E8A33D` marigold | same | harvest, highlights, the sun in the logo |
| `--hl-danger` | `#C8432F` tomato | `#E2705C` | errors, enemies, urgent |
| `--hl-warning` | `#B26B00` | `#F0B450` | warnings, high priority |
| `--hl-info` | `#2F6690` frost | `#8DB7DC` | cold, greenhouse, info |
| `--hl-success` | = primary | `#8FCB7C` | ok chips |
| `--hl-focus` | `#2F7DD1` | `#7FB6FF` | focus rings only |

Raw ramps sit underneath and are reused by chips and washes: `--hl-leaf-900…50`,
`--hl-soil-900…100`, `--hl-sun-500/100`, `--hl-tomato-600/500/100`, `--hl-frost-600/500/100`,
`--hl-water-500`. The washes (`-100`) are re‑mapped to dark equivalents in the dark palette.
Canvas tokens (`--hl-canvas-bg`, `--hl-grid-line(-strong)`, `--hl-bed-fill(-raised)`,
`--hl-container-fill`, `--hl-zone-outdoor`, `--hl-zone-greenhouse`) re‑theme the garden map.

### Themes and appearance

Two independent choices in *Settings → Display*:

* **Colour theme** – **Classic** (leaf green + marigold, the base), **Earth** (terracotta
  primary, warm clay surfaces), **Night** (always dark; mint primary `#8FD0B0`, lilac accent,
  blue‑black surfaces) and **Season**, which switches between four palettes by the date
  (hemisphere aware): spring (fresh green, blossom‑pink accent), summer (leaf green, bright
  marigold), autumn (russet primary), winter (frost blue primary).
* **Light or dark** – *Automatic* (Home Assistant's dark mode, else the device), *Light*,
  *Dark*. Night ignores it and is always dark.

Each theme overrides only a handful of tokens (primary, hover, accent, background, a surface
or two, the leaf washes, the primary shadow and the four seasonal gradients) on the light
or the dark palette; everything else is inherited. In Home Assistant the choice is stored
as user data (`hortulus_look`) and follows the user to every device; on the web it stays in
the browser.

**Seasonal light.** `--hl-grad-spring/summer/autumn/winter` colour the dashboard hero, the
season book cover and the chapter art. Dark palettes darken them; Earth and Night remap
them to their own hues (in Earth‑dark all four are the same warm gradient).

**Plant families** (categorical, tuned to stay distinguishable for the common colour
vision deficiencies and *never used alone* – every planting also carries its glyph and a
label or monogram, every chip a label):

| Family | Colour | | Family | Colour |
|---|---|---|---|---|
| Solanaceae – nightshades | `#C8432F` | | Apiaceae – umbellifers | `#E07A2E` |
| Cucurbitaceae – cucurbits | `#E0A526` | | Amaryllidaceae – alliums | `#8E5BA8` |
| Fabaceae – legumes | `#6A9F3A` | | Amaranthaceae – beets & spinach | `#A23E6B` |
| Brassicaceae – brassicas | `#3E7C8C` | | Asteraceae – daisy family | `#4FA38A` |
| Lamiaceae – herbs | `#4F6FB0` | | Poaceae – grasses | `#B79F2E` |

Each plant also has its own colour (`color` in the plant database) used for its glyph; the
family colour is the outline and the print hatch.

**Contrast** (WCAG 2.x, measured from the tokens): body text on the page is 14.1:1 (light)
and 15.1:1 (dark); muted text is ≥ 5.2:1 on every surface in light and ≥ 6.2:1 in dark; white
on the primary button is 5.7:1 and the dark primary button text 7.2:1; the focus ring is
≥ 3:1 against the page. **Known gaps**, to be tuned: `--hl-warning` text on white is
4.2:1; the warning and danger chips (coloured text on their tinted wash) are 3.7:1 and 3.9:1;
the light *Season → spring* primary is 4.3:1. These are bold 12–13 px labels that always
carry an icon or a word, so colour is never the only signal, but they do not yet meet AA.

Moisture overlay on beds: dry `#C8432F`, slightly dry `#E8A33D`, optimal `#4C8C3F`,
wet `#3A7CA5` – as outline (3 px) + 12 % fill + the value in text.

## 5. Typography

* **UI**: Home Assistant's body font (`--ha-font-family-body`, Roboto by default) – the panel
  must feel native. Numbers use tabular figures.
* **Display**: a book serif stack (`--hl-font-serif`: Iowan Old Style, Palatino, Book
  Antiqua, Georgia) for page titles (`h1`, `h2`), the app‑bar name, the dashboard hero and
  stats, empty states (italic), the wall screen's clock and temperatures, and chapter
  headings – the same voice as the printed season book. `h3`/`h4` stay in the UI font.
  Section labels are small caps‑style eyebrows (11 px, 700, +0.12 em).
* **Wordmark** (logo files): Fraunces, falling back to Charter/Georgia, with a small sans
  caption (“GARDEN MANAGER · MOESTUINPLANNER”). It is outlined in the brand assets, not loaded
  by the panel.
* **PDF and season book**: Times (the dependency‑free writer's serif), justified text,
  embedded JPEG photos.
* Scale (≈ 1.2 ratio): 12 · 13 · 14 · 16 · 20 · 24 · 32 px (`--hl-fs-xs…3xl`). Body 14/1.45.
  The hero title and the wall clock use `clamp()` to scale with the screen.
* Weights: 400 body, 500 buttons/task titles, 600 headings, 700 numbers & hero.
* Numbers that matter (moisture %, temperatures, GDD) are set larger and bold, with the
  unit lighter.

## 6. Space, layout & shape

* 4 px base grid: `--hl-s1` 4 · `s2` 8 · `s3` 12 · `s4` 16 · `s5` 24 · `s6` 32 · `s8` 48.
* Page: content up to 1680 px wide, 16 px side padding (12 px and room for the bottom bar on
  phones). The app bar is 60 px, sticky, translucent glass (`backdrop-filter` blur).
* Dashboard: a hero band, then a 12‑column grid with 16 px gutters; 8/4 split above
  1100 px, single column below. Stat tiles are 4 across, 2 across under 720 px.
* Planner: 260 px palette · fluid map at a fixed height (`max(640px, 78vh)`); the palette
  collapses. Details of a bed, crop or element open in a popup, not a side column.
* Cooking: a 260–340 px choices column next to a card grid (≥ 230 px cards); one column
  under 900 px, where the choices fold away.
* Radii: 6 (inputs) · 10 (rows, icon buttons) · 16 (cards, popups, canvas) · 22 (hero) ·
  24 (wall panels) · pill (buttons, chips, the tab bars).
* Elevation: three layered shadow levels (ambient + key light) in warm brown, never pure
  black, plus a coloured `--hl-shadow-primary` for primary buttons and a 1 px inner
  highlight (`--hl-highlight`). Dark palettes use black shadows and a fainter highlight.
* Depth on the map: beds cast a soft shadow, raised beds have timber edges, the ground has a
  faint grain, crops are drawn small after planting and grow to full size by harvest.

## 7. Components & states

Shared styles live in `tokens.ts` (`shared`); a component imports only that.

| Component | Default | Hover | Active | Focus‑visible | Disabled | Error |
|---|---|---|---|---|---|---|
| Button (primary) | leaf gradient, coloured shadow | darker, lifts 1 px | scale .98 | 2 px focus ring, 2 px offset | 45 % opacity, `not-allowed` | – |
| Button (secondary/ghost/danger) | surface / transparent / tomato text | surface‑2 / tomato‑100 | scale .97 | ring | 45 % | – |
| Icon button | transparent | surface‑2 | – | ring | 45 % | – |
| Toggle (aria‑pressed) | – | – | leaf‑100 bg, leaf border | ring | – | – |
| Chip | surface‑2 | border | pressed = leaf | ring | – | `.ok` `.warn` `.bad` `.cold` tints |
| Input/select | border | soil‑300 border | – | ring + 3 px primary halo | 55 % | tomato border + message (`aria-invalid`) |
| Task row | – | surface‑2 | – | ring | done = strikethrough | overdue chip + priority edge (urgent red, high amber) |
| Task row (touch) | – | – | swipe → leaf‑100 (complete) / ← sun‑100 (postpone) | ring | – | – |
| Info tooltip (ⓘ) | muted icon | primary | popover with term, text and “read more” | ring | – | – |
| Planting (canvas) | family outline + 13 % wash + crop glyph(s) + name pill | – | dashed focus outline + resize handle | – | faded + dashed when not in the ground on *view date* | red/amber “!” badge |
| Recipe card | picture on top, title, meta | lifts 2 px | – | lifts (same as hover) | – | – |

Reusable building blocks (`frontend/src/components`):

| Component | Purpose |
|---|---|
| `hl-modal` | The one popup: same header, close button, backdrop click, Escape; optional previous/next with the arrow keys; sizes narrow / normal / wide; accent band (plant family, zone) |
| `hl-info` | ⓘ glossary popover with a link to the handbook chapter |
| `hl-date-input` | Day‑month‑year fields in the panel's language, calendar button opens the browser's picker |
| `task-ui` (task rows, `hl-task-dialog`) | Task rows with plant icon, priority edge, swipe actions; dialog with live sensor context |
| `hl-quick-harvest`, `hl-quick-note` | Big‑button harvest entry; note + photo (camera on a phone) |
| `hl-photo-timeline` | “Day 1 … day 40” strip with viewer, per crop and bed |
| `hl-plant-image`, `hl-plant-detail`, `chapter-art` | Plant illustration (+ licensed Wikipedia photo), plant popup, handbook scene |
| `dish-picture` | The picture of a dish, see §8 |
| `hl-crop-gantt`, `hl-plan-compare`, `hl-year-transition`, `hl-season-report` | Timeline bars (raising / growing / harvest, today line), plan diff, year‑end wizard, report |
| `hl-water-chart`, `hl-harvest-years`, `hl-kitchen-economy` | Moisture / water / rain per bed, best year in gold, harvest at shop prices |
| `hl-wall-view`, `hl-weather-view`, garden viewer | Kiosk view, weather tab with its own glyph set and radar, read‑only plan view |
| `hortulus-tasks-card` | Lovelace card (own bundle, `custom:hortulus-tasks-card`) |
| Skeleton, toast, banner | Shimmering placeholders, a polite `role="status"` toast, red/amber banners for leaks, stuck valves and frost |

## 8. Iconography & illustration

* **Hortulus icon set** (`garden-icons.ts`): one hand‑drawn line set on a 24 px grid with
  1.7 px rounded strokes in `currentColor` for the places in the menu (home, garden,
  calendar, weather, journal, cooking, knowledge, manage, planner, layout, crops, library,
  advice, handbook, analysis, print, settings, wall) and for **every task type** (sow, harden
  off, transplant, thin, stake, prune, feed, water, harvest, ventilate, shade, frost
  protect, compost, mulch, soil test, divide, pollinate …). Leaves in the icons repeat the
  two‑leaf seedling of the emblem. `gicon(name)` falls back to Home Assistant's `mdi:` icons
  for anything not drawn yet (and for `mdi:` names).
* **Plant glyphs** (`plant-glyphs.ts`): 48 vector “stickers” in a 24 px box – vegetables,
  herbs, berries, fruit trees (apple, pear, plum, cherry, fig, nut), flowers, grains. A glyph
  uses `currentColor` for the crop's own colour (a carrot orange, a plum purple) and fixed
  greens for foliage, so one shape serves many varieties. The canvas defines them once as
  `<symbol>`s and places hundreds of `<use>` references. They appear on the map (one per
  plant at true spacing, with a soft ground shadow; dense crops are drawn as rows of seedlings
  with one large glyph and a name pill), in the palette, on dashboard tasks, the crops list,
  the calendar, the library and in dish pictures. Tiny plantings fall back to a two‑letter
  monogram. The older *habit shapes* (disc bush, triangle climber, diamond upright, ring
  vine, four petals rosette, ▼ root crop, drop bulb) remain available as a colour‑blind‑safe
  second channel.
* **Garden elements** on the map have fills and tile patterns of their own: gravel path,
  flagstones, planks, bark, stepping stones, pavers, asphalt, roof, brick, hedge, grass,
  flowers, water, pool; each with a small emoji badge.
* **Companion lines**: solid green friend, dotted green pest deterrence, dashed red enemy,
  dashed purple allelopathy, short‑dashed amber competition/overlap, dotted grey shade.
* **Pictures**: every plant, advice suggestion and handbook chapter has an illustration
  built from the plant glyphs (`chapter-art.ts`: a small garden scene per chapter with sun,
  rain, greenhouse, basket …), so everything works offline. A Wikipedia photo (CC BY, CC BY‑SA,
  CC0, public domain; credited) may be shown on top – in large sizes only; small round
  thumbnails always use the illustration.
* **Dish pictures** (`dish-picture.ts`): each recipe is drawn as one SVG – a plate (a bowl for
  soups, desserts and preserves, an oven dish for bakes) with the **side** as a bed underneath
  (pasta strands, rice grains, bulgur, couscous, gnocchi, potatoes, fries, bread), the **garden
  produce** as crop glyphs on top, the **meat or fish** in the middle and herbs scattered over.
  A seeded random generator keeps a dish looking the same every time; the same SVG is turned
  into a JPEG for the PDFs.
* **Weather glyphs** (`weatherGlyph`): sun, moon, clouds, rain, snow, fog, wind, lightning in
  one consistent hand; used in the weather tab and on the wall screen (day or night variant).
* **Brand art on the dashboard**: botanical line art in the hero band, tinted by the season
  gradient.

### Print language

Print reuses the canvas language on paper. Family colours become **soft tints** (38 % in
colour, 24 % on e‑ink, 22 % in grayscale) with a full‑colour outline; on e‑ink and grayscale every
family also gets a **hatch pattern** (diagonal, back‑diagonal, horizontal, vertical, cross, dots,
grid) so beds stay distinguishable on a monochrome screen or printer and pen strokes drawn on
top remain visible. Grayscale converts every colour to luminance grey; patterns carry the
meaning. Garden elements print with their own hatch too. Every map has a legend, a scale bar
with ratio, and a north arrow; crops whose names don't fit get numbered circles explained in the
legend. Notes areas use a 5 mm dot grid – the reMarkable's own rhythm for handwriting. The
reMarkable Paper Pro format (179.6 × 239.5 mm, 4:3) keeps a 13 mm left margin free for the device
toolbar in portrait (8 mm in landscape). Paper: A4, A3, A5, Letter, reMarkable. The season book
adds serif typography, A5 default, chapters on right‑hand pages and a page count that is a
multiple of four. Cookbook and shopping‑list PDFs reuse the dish pictures and a green/ink
colour scheme, a chapter page per course.

## 9. Brand

**Name.** *Hortulus* – Latin for “little garden”, the title of Walahfrid Strabo's
9th‑century poem about his monastery vegetable plot. It reads naturally in English, Dutch and
French (cf. *hortus botanicus*, *hortillonnage*), is short, ownable and says “kitchen garden”
without saying “app”.

**Emblem** (`assets/brand/icon.svg`, also drawn in `frontend/src/brand.ts` with identical
geometry): a rounded tile in a leaf gradient (`#5A9C4B` → `#2F5D2A`) containing
* an **arch** – the hortus gate and the greenhouse,
* a **two‑leaf seedling** – growth,
* **two planted rows** in soil tones – the plan,
* a **marigold sun** – the season (and a nod to *Tagetes*, the companion flower).

Construction: 64‑unit grid, 15‑unit corner radius, 3.4‑unit strokes with round caps so it
survives 16 px; one accent colour only. In the panel it sits in the app bar (30 px, with a soft
green drop shadow), and on the error card (56 px).

| Asset | File | Use |
|---|---|---|
| Icon | `assets/brand/icon.svg`, `icon.png` (256), `icon@2x.png` (512) | HA brands, HACS, favicon |
| Logo (light bg) | `logo.svg`, `logo.png` (780×200), `logo@2x.png` (1560×400) | README, docs |
| Logo (dark bg) | `logo-dark.svg`, `dark_logo.png` (780×200) | dark docs, HA brands `dark_logo` |
| GitHub banner | `banner.svg`, `banner.png` (1280×640) | README header, social preview |

Do: keep clear space of ¼ tile around the emblem; use on parchment, white or very dark
green. Don't: recolour the seedling, add outlines, stretch, or put the emblem on busy photos.

**On the web.** The site's own stylesheet lives outside this repository. What the repo shows is
that the same panel runs there with the same tokens (`panel.config.web`, a URL prefix for
photos, a read‑only viewer with a restricted tab list), so the themes, the icon set and the dish
pictures look the same; only the colour choice is kept in the browser instead of the Home
Assistant user.

## 10. Accessibility

* Full keyboard path for drag‑and‑drop: *Enter* on a palette plant adds it to the selected
  bed; arrows move (Shift ×10), Alt+arrows resize, `[`/`]` cycle selection, Delete, Ctrl+Z/Y.
* The canvas is `role="application"` with a focusable SVG and labelled items
  (`role="button"` plus `aria-label`); actions are announced in a polite live region
  (“Basil placed in Bed 2”). Toasts are `role="status"`, the calendar title `aria-live`.
* Native `<dialog>` modals (focus trap, Esc) for every popup; visible focus rings everywhere
  (2 px `--hl-focus`, offset 2 px; 3 px halo on inputs). Toggle buttons use `aria-pressed`,
  radio groups (theme, light/dark) `role="radio"` with `aria-checked`, invalid inputs
  `aria-invalid`.
* Colour never alone: glyphs and monograms, badges with symbols, labelled chips, text values on
  overlays, hatch patterns in print. Decorative SVGs are `aria-hidden`.
* **Touch targets**: tick boxes on task rows are 40 px, wall‑screen tick boxes 48 px, buttons and
  inputs 36 px high, small buttons 28 px, icon buttons 36 px, bottom bar items fill a full
  column. Small ones (28 px buttons, 26 px chips) are for desktop density and sit in clusters
  with spacing; they are below the 44 px recommendation and are a known compromise.
* Pointer events with capture for drag; swipe on task rows for touch/pen only (right = done,
  left = +1 day), mouse users keep normal clicks.
* **Reduced motion**: `prefers-reduced-motion: reduce` turns off all animations and
  transitions and skips the leaf burst. There is no separate in‑app switch.
* **Dark and theme**: follows Home Assistant's dark mode or the device (or the user's explicit
  choice); tokens re‑theme the whole tree from the panel root. Contrast figures and known gaps are
  in §4.
* **Language and numbers**: dates read day‑month‑year in the panel's language whatever the
  browser's locale; units are metric.

## 11. Motion

Motion is small, quick and purposeful; it never moves layout.

| What | Value |
|---|---|
| Base transition | 160 ms `cubic-bezier(.2,.8,.2,1)` (`--hl-dur`, `--hl-ease`) on background, border, transform, shadow |
| Slow transition | 320 ms (`--hl-dur-slow`): card shadow, views |
| Spring curve | `--hl-ease-spring` for small pops |
| Views | `hl-rise`: fade in + 6 px up when a tab opens; re‑keyed on every tab change |
| Skeleton | `hl-shimmer` 1.4 s linear gradient sweep while the first snapshot loads |
| Buttons | primary lifts 1 px on hover; all press to scale .97–.98 |
| Cards and recipe cards | shadow grows on hover; recipe cards lift 2 px |
| Leaf burst | 12 small leaves fly out from a ticked task or saved harvest, 900 ms, removed after 1.1 s |
| Wall screen | no motion except the clock; dims (brightness .78) from 22:00 to 06:00 |
| Reduced motion | all animation and transition off, burst skipped |

## 12. UX ⇄ graphic design decision log

| # | Question | Decision | Why |
|---|---|---|---|
| 1 | React or Lit? | Lit | Same runtime and theming as HA, no second framework, small bundle. |
| 2 | HTML5 drag‑and‑drop or pointer events? | Pointer events + keyboard alternative | HTML5 DnD has no touch support and poor accessibility. |
| 3 | Show plants as icons or dots? | **Icons** (stickers) at true spacing, with a shadow, name pill and monogram when small | Dots made density visible but were abstract; real plant shapes at true spacing keep both and are instantly recognisable. Decided against the earlier “dots + monogram”. |
| 4 | Family colours | 10 hues, tested in pairs for adjacency on soil brown | Families sit next to each other in beds; brown background shifts perception. |
| 5 | Where do warnings live? | Badge on the item + explanation in the popup + overlay lines | Spatial problem → spatial cue; reasons in words. |
| 6 | Save button? | Autosave with revision guard + status indicator | Gardeners expect drawing tools to remember; conflicts are rare and recoverable. |
| 7 | Overdue tasks in the calendar | Shown on *today* | Nothing silently rots in last week's cell. |
| 8 | Dutch terms | *Uitplanten, afharden, dieven, aanaarden, IJsheiligen* | Use the words Dutch gardeners use, not literal translations. |
| 9 | Dark theme and colour themes | Tokens declared once at the panel root, themes applied as inline custom properties | Child shadow roots inherit; no per‑component dark rules; inline properties work in Safari and the HA iOS app. |
| 10 | Wordmark and display typeface | Book serif for the wordmark and for display type; the HA font for everything you read or click | Heritage of herbals and the printed book, while the UI stays native. |
| 11 | Theory in the UI | ⓘ tooltips with one‑paragraph explanations + handbook link | Explain at the moment of doubt; the full chapter is one click away, never forced. |
| 12 | Autofill: magic or proposal? | A proposal with numbers, warnings and reasons; nothing changes until *Apply* | Gardeners must trust and adjust the plan; an opaque fill would be undone by hand. |
| 13 | Plant glyph shapes | Plant stickers for recognition; shape = growth habit kept as a second, colour‑blind‑safe channel | Colour = family is already taken. |
| 14 | Print colours for e‑ink | Light tints + patterns, no solid fills | E‑ink renders colour muted; pen strokes must stay visible on top. |
| 15 | Multi‑select gesture | Shift/Ctrl‑click, drag moves the group | Matches every drawing tool; a click without drag narrows back to one item. |
| 16 | Swipe on tasks | Touch/pen only; right = done, left = +1 day | Mouse users keep normal clicks; the two most common actions become one gesture. |
| 17 | Thirteen tabs or a calmer menu? | Eight places with tabs underneath, last tab remembered | Fewer choices at the top, related tabs one click apart, URLs stay stable. |
| 18 | Own icon set or Material icons? | A hand‑drawn line set for the menu and task types; mdi as fallback | One visual language that matches the emblem and the stickers, with no gaps in coverage. |
| 19 | Themes: how many? | Classic, Earth, Night, Season; light/dark chosen separately | A seasonal theme gives the year a mood; Night is the one dark‑only choice; the rest respects the device. |
| 20 | Pictures of dishes | Generated SVG from the recipe, not stock photos | Works offline, matches the garden's own produce, deterministic, also usable in PDFs. |
| 21 | Delight vs. calm | A leaf burst on completion, off with reduced motion | A small reward for doing the chore; never blocks and never required. |
| 22 | Wall screen | Separate full‑screen route with big targets and no menu | A tablet in the shed is read at arm's length with wet hands; it needs one job, large. |
| 23 | Printing on narrow screens | Allowed (Print sits under Manage in the bottom bar) | The earlier “desktop only” rule was dropped once Print became a normal tab in the Manage place. |
