# FAQ & troubleshooting

Questions are grouped: [General](#general) · [Planning](#planning) · [Cooking](#cooking) ·
[Records](#records) · [Entities, voice and dashboards](#entities-voice-and-dashboards) ·
[Print, handbook, autofill](#print-handbook-autofill) · [Irrigation safety](#irrigation-safety) ·
[Troubleshooting](#troubleshooting)

## General

**Do I need sensors?**
No. Without sensors Hortulus still plans, schedules and reminds. Soil sensors add
moisture status and precise irrigation; soil temperature makes direct‑sowing advice
wait for warm soil; a greenhouse thermometer enables live ventilation advice.

**Do I need a weather forecast?**
Recommended. Without it frost risk becomes `unknown` (or *low/moderate* from the
current outdoor temperature when it is already cold), irrigation falls back to sensor
only, and transplant timing cannot wait for frost‑free nights. Choose the weather entity
under **Settings › Weather & outdoor sensors**.

**Why `garden_manager.*` and not `garden.*`?**
Home Assistant requires actions to use the integration's domain. The integration's
folder and domain is `garden_manager`; the product is called Hortulus.

**Is anything sent to the internet?**
Home Assistant itself only connects out if you switch on **Open‑Meteo** (Settings → Weather):
then it fetches a forecast from api.open‑meteo.com – and once a day the observed weather of the
last month for the climate history – sending the garden's coordinates rounded to two decimals
(~1 km). The plant database, the handbook, all illustrations and
the cookbook ship with the integration; photos you add go through Home Assistant's own
`image_upload` and stay in your config directory. Two things are loaded by *your browser*,
not by Home Assistant: plant photos from Wikipedia (on by default, switch off under
**Settings → Display**) and, in the Weather tab, Buienradar's public radar map when you
have no radar camera in Home Assistant (see below).

**Southern hemisphere?**
Fully supported: pick a southern preset, a USDA zone with *southern* hemisphere, or your
own dates. Seasons run July → June and are named after the spring year. The seasonal
colour theme follows the hemisphere too.

**Is Hortulus available in French?**
Yes. Dutch, English and French are complete: panel, tasks and notifications, handbook and
glossary, plant names and tips, season book, cookbook, Assist sentences and the Home
Assistant screens. Pick **Français** under **Settings › General › Language**, or leave it on
*Follow Home Assistant*. Dates and numbers use Belgian formats (fr‑BE, nl‑BE). The language of
generated tasks can be set separately in the integration options (Advanced).

**Where did Plants, Advice and Settings go? How is the menu organised?**
The menu has eight places: **Today**, **Garden** (Planner, Garden plan, Crops), **Calendar**,
**Weather**, **Journal**, **Cooking**, **Knowledge** (Plants, Advice, Handbook) and **Manage**
(Analysis, Print, Settings). The tabs of a place sit in a row above the page; a place
reopens on the tab you used last. On a phone the places move to a bottom bar and Settings
to the top bar.

**Can I change the look? What are the themes?**
Yes, under **Settings → Display**. *Colour theme*: **Classic green** (leaf green and
marigold), **Earth** (terracotta and clay), **Night** (always dark, moonlit mint) or
**Season**, which follows the year (spring, summer, autumn, winter, hemisphere aware).
*Light or dark*: **Automatic** (follows Home Assistant or the device), always light, or always
dark. In Home Assistant the colour choice is stored with your user and follows you to every
device; the Wikipedia photo switch is per browser. Animations (the burst of leaves when you
tick a task, fading views, skeletons) stop when your device is set to *reduce motion*.

**What is the wall screen?**
A calm, large kiosk view for a tablet in the kitchen or shed: the clock, the weather now,
today's tasks with big tick‑boxes, a three‑day outlook, the moisture of your beds and any
alert (frost, leak, a valve left open). No menus; it dims between 22:00 and 06:00. Open it
with **Wall screen** on the Today tab, or go to `/hortulus/wall`. *Close* (top right) takes
you back.

**Can I manage several gardens?**
Yes. Add Hortulus again (Settings › Devices & services › Add integration) for an allotment or
a second plot, and rename the entry (e.g. "Allotment"). Each garden has its own plan, tasks,
journal, harvest and cookbook. Pick the garden at the top of the panel; your
browser remembers it. Every action takes `garden: Allotment` (title or entry id), the dashboard
card `garden: Allotment`. Without one, everything goes to the first garden, which stays exactly
as it was. For a few beds out front, extra zones in the same plan work too.

**Is there a website version?**
The panel is written so the same code and engine can run in a browser outside Home Assistant
("Hortulus Web"). What this repository shows of it: the panel can be started with a restricted
list of tabs (`panel.config.tabs`) so that visitors get a read‑only **Look at a garden** view of
a plan its owner shares – click a zone, bed, crop or element for details, pick the year – and
shared recipes; the cookbook can *mail a recipe to the cook* instead of sending it to a phone;
and a plan exported there imports into Home Assistant (zones, beds, elements, season layouts
and crops all come along). In Home Assistant none of this changes. Hosting, accounts and
availability of the website are not part of this repository and not described here.

**Does the website keep a climate history?**
Yes. The website only computes while someone has the garden open, so it fills the climate
history afterwards: from Open‑Meteo's observed weather for every garden, and – for a garden
linked to Home Assistant – from that Home Assistant's recorder through the garden's token. The
same engine merges both, so growth, water and disease follow the logged weather there too.
Visitors of a shared garden do not see the climate history.

## Planning

**Why is my sowing task “overdue”?**
Either the sowing window has started and you set an explicit date in the past, or the
task was created from a succession series with fixed dates. Complete it, postpone it, or
change the planned date in the planner inspector. Tasks that *depend* on an overdue
prerequisite (thinning after sowing) automatically move back until the prerequisite is
done.

**The sow task says “wait”.**
For direct sowing the soil sensor is colder than the plant's minimum germination
temperature (e.g. beans need 12 °C), or – for planting out – frost is forecast below the
plant's minimum temperature. The task moves to tomorrow and the reason is in the
description.

**Does the schedule take the weather into account?**
Yes. With **Weather‑aware scheduling** (on by default) sowing, planting out, hardening off,
pruning, soil preparation and similar jobs move inside their window to the nearest suitable
day (no rain, frost, heat or storm). If none exists the task gets a weather warning. Hortulus
also creates tasks for heat, dry spells, storms and heavy rain, with ecological tips – and
after‑care for weather that already happened: a check after a storm (gusts of 60 km/h or more),
the slug patrol after a downpour (≥ 15 mm logged; the same task the forecast would have made,
never twice) and deep watering after a dry week. When it froze and tender crops were outside
you get an alert to check them.

**Why don't I get harvest tasks for marigolds?**
Companion flowers are marked `harvestable: false`. Set it to true in a custom/override
plant if you grow them for cutting.

**Succession sowings were skipped.**
Sowings that would fall after the last sowing window are dropped on purpose; the planner
tells you how many.

**Two plantings overlap but no warning appears.**
They are not in the ground at the same time (e.g. radishes harvested before beans go
in). Overlap and companion checks only consider plantings whose occupancy windows
overlap. Use *Show garden on* to see what is in the bed on a given date.

**How is “companion radius” used?**
Two plantings interact when their footprints are within
`max(radius, (spacing_a + spacing_b) / 2)`; influence fades linearly with distance.

**How do the garden plan per year and the year‑end transition work?**
In **Garden plan** you shape the garden without plants: zones (open ground, greenhouse, cold
frame, planters & pots, orchard, food forest …), beds and elements such as driveway, house,
water butt, hedge, lawn, shed or a path in the greenhouse. That plan holds for one season. In
the **Planner** you plant that season on its plan; zones and beds are fixed there. The planner
works in five steps – site, growing zones, beds, perennials, annuals – and each item can only
be edited in its own step.

Nothing moves into a new year by itself, perennials included. At the end of the year open the
**Year‑end transition** (button in Garden plan and Planner; in January Advice reminds you).
Keep everything, or tick which zones, elements and perennials go along (or use the plan you
already drew for next year), which overwintering crops (garlic, winter leeks …) move over, and
whether the new year becomes your active garden right away. The old plan is archived;
everything is in the system log and can be undone.

**My apple tree is in the plan every year – how do I remove it?**
Perennials (fruit trees, berries, asparagus, perennial herbs) move to a following season only
when you include them in the **Year‑end transition**. To remove one from the current season,
select the plant in the planner and choose **Remove**. You get two options: **Gone from this
season** (earlier years keep it for rotation and history) or **Delete completely**.

**Can I start over with a new garden plan?**
Yes. In **Garden plan → Plans** choose **Start a new plan**: completely empty (from scratch),
with the same zones but no beds or crops, or with zones and beds but no crops. The current plan
becomes **inactive**: it is kept with its name, beds and crops, and **Activate** brings it back
later (the plan active at that moment becomes inactive in turn). An inactive plan you no
longer need can be deleted (the deletion can be undone from the system log). Plans set aside
are included in an export and an import.

**Can I compare two plans?**
Yes, in **Analysis → Compare** or in **Garden plan → Plans** (*Compare* next to an inactive plan).
You see which zones, beds, elements and crops were added, removed or changed.

**Can I change my crops' dates without dragging?**
Yes, the **Crops** tab lists every crop of a season (by bed, by crop or by date). Change method,
status, count, planned and actual sowing, planting‑out, harvest and end dates and notes right
there. Leave a planned date empty and Hortulus computes it (in grey below). Click a plant for
all details. The **Timeline** view shows the year per bed as bars; drag a planned crop sideways
to move its sowing and planting out.

**Can I change several crops at once?**
Yes. Tick the crops in **Crops**; a bar appears to set the status and/or a date (e.g. *Sown on*
= today) for all of them. That is one entry in the system log and can be undone in one go.
**Show on map** jumps to the crop in the planner; **In Crops** in the planner popup takes you
back.

**What should I sow this week, and which seeds do I need?**
**Crops** has four views next to the list: **Sowing plan** (week by week what to sow indoors or
outdoors, plant out and start harvesting; **Done** fills in the real date), **Seeds** (seed the
plan needs against your stock), **Succession** (beds that free up this season and what still fits
there) and **Harvest forecast** (kg per week; it gets more accurate with your own harvests). On a
phone the list shows one card per crop.

**Why does a plant not fit where I put it?**
Click the crop in the planner and choose **Why (not) here?**: you see each reason the bed does
not suit it (too late, wrong zone type, not under glass, frost before harvest, crop rotation,
bad neighbour, no room) and which beds would. Drop a plant on a bed where it does not belong and
that explanation appears above the map right away. Click a bed to see which plant families grew
there over the last five years.

**Can I get reminders for tasks I forgot?**
Yes. Under **Settings › Notifications › Reminders** set a time for the daily overdue reminder
(for each task it says whether it is still possible, or too late and better skipped) and a
**weekly look‑ahead** on a day of your choice. They use the same channels as other notifications.

**Can several people share the work?**
Yes. Every task can be assigned to a person (`person.*` entity). Under **Settings › Household &
voice** choose who gets new tasks by default and per task type, and a notify service per person:
everyone then gets their own daily digest and overdue reminders. The dashboard card can show only
your tasks (`assignee: me`).

**Can I act on a notification from my phone?**
Yes, with the Home Assistant app: the morning digest and reminders carry **Done** (for one task),
**Tomorrow** and – when beds need water – **Water now**. A valve left open carries **Close valve**.

**Where do I find the weather and the rain radar?**
In the **Weather** tab: the weather now, a chart of the next 24 hours (temperature over rain),
the coming ten days with a temperature bar and frost and heat tags, and what it means for the
garden (frost nights, hot days, rain so watering can wait, a dry spell, beds that need water).
The **rain radar** shows a radar camera from Home Assistant when there is one (a `camera.*`
entity whose id contains *buienradar*, *radar*, *regen* or *rain*, e.g. from the Buienradar
integration). Without one, Hortulus shows Buienradar's public map when Home Assistant's country
is the Netherlands or Belgium, refreshed every 5 minutes; elsewhere there is no radar. The
forecast comes from the weather entity chosen in Settings.

**Does Hortulus take the weather into account for growth?**
Yes – the weather that actually happened, not only the forecast. Degree days since planting
move the expected harvest; greenhouse crops count the degree days of their own air sensor (or
the outdoor day with greenhouse buffering). Hot days (logged last month and forecast) and a run
of dull days hold back fruiting crops; crops without a degree‑day model are held back by logged
cold days below their minimum. The crop popup shows the delay and why. The water balance books
every past day with the Penman‑Monteith evaporation of that day (humidity, wind, sunshine or
radiation), so windy, sunny days dry beds faster; humid, warm days behind us raise the disease
risk; and sowing waits until the soil has been warm for a few days, not just this afternoon.

**Where is the climate history, and the temperature statistics?**
**Weather → Climate history**, below the forecast: a daily chart (30 days, 90 days or a year),
the last 7 days, the last 30 days and the season so far with the same period last year next to
it (mean, lowest, highest, rain, frost nights, hot days, sunshine, wind, degree days,
evaporation, water balance), records, a table with **every temperature sensor** you linked
(outdoor, greenhouse, soil, air at a bed: now, today, 7‑day mean, 30‑day range, record low and
high), month by month against last year, and the measured frost dates. In Home Assistant the
sensors `sensor.hortulus_rain_7_days`, `sensor.hortulus_mean_temperature_7_days`,
`sensor.hortulus_sunshine_7_days` and `sensor.hortulus_frost_nights_this_season` carry last
year's value as an attribute.

**What if Home Assistant (or Hortulus) was off for a while?**
At start‑up and once a day Hortulus fills the days of the last month it did not see. First from
Home Assistant's **recorder** – the same sensors, as the recorder kept them – and then, with
**Open‑Meteo** on (Settings → Weather), from Open‑Meteo's observed daily weather for your
location. Own measurements always win; the recorder's extremes are combined with them, and
Open‑Meteo only fills what was not measured well. Without a recorder and without Open‑Meteo the
missing days simply stay empty. Daily figures are kept for two seasons (temperature sensors 400
days); older days live on as monthly figures, kept for good.

**Which weather station sensors help?**
All optional, under **Settings → Weather**: outdoor **temperature** (minimum, maximum, mean,
frost dates), **humidity** (evaporation and the measured blight criteria), a **rain** gauge
(otherwise the forecast rain is booked and corrected later from the recorder or Open‑Meteo),
**wind speed** and **wind gusts** (evaporation, the *check after a storm* task), **solar
radiation** in W/m² (sunshine hours, evaporation, dull days) or, failing that, an **outdoor
light** sensor in lux. Without them Hortulus uses what the weather entity offers. Every linked
temperature sensor – greenhouse, soil, air at a bed – also gets its own daily statistics.

**How are frost dates measured?**
From the outdoor minimum temperature: per year the last night below 0 °C in spring (January–June)
and the first in autumn (July–December; the other way round on the southern hemisphere). A
half‑year counts once it is over and at least 80 % of its days were logged. The Climate history
shows each year and the average against the regional preset (*x days earlier / later*). The
sowing calendar keeps using the frost dates under **Settings → Region**; change them there if
your measured dates say your garden is earlier or later. Once ≥ 2 complete years put a date ≥ 7
days off the preset, the Climate history offers **Use my frost dates** (admin) to do it in one click.

**How do I switch off the sayings, or any other extra?**
**Settings → Extras**: one switch per extra (garden sayings, estimated soil temperature, water
forecast, silent‑sensor warning, weather summary, own frost dates, station import, solar‑aware
watering, climate line on the card). All are on by default. On a single dashboard card you can
also hide just the saying or the climate line with `slogan: false` or `climate: false`.

**How do I import my Netatmo / Ecowitt history?**
Export the data as CSV from the station's app or website (Davis or a spreadsheet works too), then
**Weather → Climate history → Import weather station data** (admin). Separator, header, time
(also unix seconds) and the temperature, humidity, rain, wind and gust columns are recognised in
English, Dutch and French; °F, inches, mph, m/s and knots are converted. Days Hortulus measured
itself are kept; the imported days count as *history*.

**When should I put insect mesh on?**
Hortulus follows a **pest calendar**: for carrot fly, cabbage root fly, cabbage white, onion fly,
leek moth, aphids, flea beetle, Colorado beetle and others it works out from this season's
degree‑days when they fly. While the climate log is still short, it uses the usual months. Slugs
follow the weather: rain with mild nights. You get a task to put mesh on a few days before a
flight, a weekly check or an evening slug round, and a **Pests in the garden** card on the
dashboard. Only for crops that are (or soon will be) in the ground. With **Ecological tips** on
(recommended, never required) every pest warning also comes with an organic answer.

**Which sensors should I buy?**
See the handbook chapter **Choosing and buying sensors**: start with a greenhouse thermometer and
one soil moisture sensor in your main bed.

**Does Hortulus use my soil analysis?**
Yes. Select a bed in the planner and add a **soil analysis** (pH, organic matter, P, K, Mg and
lime from a lab report or a home kit). The bed's fertiliser plan, lime advice and the shopping
list follow the latest analysis: less phosphate when P is high, lime only when the pH is too low
for the crops, more compost when organic matter is low.

## Cooking

**What does the Cooking tab do?**
It is a seasonal cookbook built from what the garden gives *right now*. Hortulus looks at the
crops that are ready to pick (plus anything you add yourself, such as stored pumpkins or frozen
beans) and proposes dishes for them, each with quantities per person, what comes from the garden
and what to buy. The garden always comes first: a dish is only proposed when the garden supplies
its main ingredient. Recipes are written in Dutch, English and French. The tab has three
sections: **Ideas from the garden**, **My cookbook** and **Shopping list**.

**What kind of dishes are there?**
More than 60 techniques: soups (including roasted velouté, minestrone, green soup, chowder and a
chilled gazpacho‑style soup), starters (fritters, carpaccio, remoulade, tabbouleh, caprese,
caponata, crostini …), main courses (oven trays, stir‑fries, pasta, risotto, gratin, stews and
curries, frittata, stoemp, stuffed vegetables, ratatouille, tian, shakshuka, waterzooi, tarts,
gnudi …), desserts (crumble, clafoutis, panna cotta, sorbet, vegetable cakes, baked fruit …) and
a chapter **Preserving & pickles** for the surplus (quick pickles, chutney, passata, pesto cubes,
jam, blanching and freezing, sauerkraut – amounts there are a batch, not one plate). Lettuce,
cucumber and radish only go into raw dishes.

**What are the chapters and menus?**
Ideas, your cookbook and the cookbook PDF are split into **Soups, Starters, Main courses,
Desserts** and **Preserving & pickles** (a chapter page each in the PDF, a chapter filter in the
cookbook). **Menus** combine a soup or starter, a main course and a dessert that belong
together, built from what is ready to pick: themed ones of the season (a Provençal garden dinner,
Levantine mezze, a courgette glut, a Flemish spring menu, a winter comfort menu …) and menus
around a main course. One click puts all three dishes on the shopping list or in your cookbook.

**How do I use up what is in the fridge, and what is “always in the house”?**
Under *More choices* tick **Use up from the fridge** (yoghurt, feta, parmesan, eggs, mustard,
onion, breadcrumbs …). Each item gets its own preparation per kind of dish – yoghurt becomes a
tzatziki‑style sauce, a raita or a lemon‑garlic bed under roast vegetables; feta is baked among
the vegetables or crumbled into a frittata; eggs are baked in hollows on the oven tray – and only
where it fits. A dish takes at most three things from the fridge, one sauce, one dressing and one
crunchy topping, never two cheeses or two creams. Fridge items count as "at home". Tick
**Always in the house** for things that should never land on a shopping list (salt, pepper and
olive oil are always assumed). **Remember these choices** keeps all of this for next time.

**How do I choose the side, the meat or fish, and the number of people?**
Under *More choices*: **Servings**; **Side** (what suits the dish, none, or pasta, rice, bulgur,
couscous, pearl couscous, gnocchi, potatoes, fries, bread or noodles); and **Meat, fish or …**
(chicken, mince, beef, steak, stewing beef, pork, sausage, bacon, ham, sweetbreads, salmon, white
fish, prawns – or the vegetarian tofu, chickpeas, lentils, egg, halloumi, goat's cheese). Pick
none for vegetarian dishes, or several to vary. Each dish only gets the protein and side that
suit it (a risotto keeps its rice, a waterzooi poaches the chicken). Every recipe can change its
side, protein and servings again. Elderberries and beans (also chickpeas and edamame) are never
offered raw or half‑cooked.

**Can I change a recipe or write my own version?**
Yes. **Edit** in a recipe lets you add, remove or change ingredients (name, amount, unit, from the
garden / at home / to buy) and add, rewrite, remove or reorder the steps. Your version goes into
your cookbook, and the shopping list and PDFs follow it. **Back to the original** restores the
generated recipe. A recipe needs at least one ingredient and one step, and holds at most 40
ingredients and 30 steps.

**How does my cookbook work?**
**Keep in my cookbook** saves a dish. There you can mark favourites, add a note, note when you
cooked it, search by recipe or ingredient and filter by favourites or chapter. Saved recipes are
stored as a small recipe description and rendered in the current language, so they read well in
Dutch, English or French.

**How does the shopping list work?**
Put dishes on the list from their recipe (the cart button), or a whole menu at once. There is
**one list** for everything you picked: what to buy, grouped (meat, fish, vegetarian protein,
dairy, sides, store cupboard, other), and separately what you can pick in the garden. Things you
have at home or are using up from the fridge are not on it. You can print it, save it as a PDF
(optionally with all recipes and their dish pictures), send it to your phone or put it on a Home
Assistant to‑do list.

**Every dish has a picture – where does it come from?**
Hortulus draws it: the crops of the dish on a plate (a bowl for soups and preserves, an oven dish
for bakes), the side as a bed underneath, the meat or fish in the middle and herbs scattered over.
It is generated from the recipe, so it works offline and a dish always looks the same.

**How do I get a recipe out of Hortulus: PDF, print, phone, to‑do list?**
- **PDF**: one recipe, your whole cookbook (a chapter page each; up to 200 recipes, a long recipe
  continues on another page), all current ideas as a cookbook, or the shopping list with the
  recipes, all with the dish pictures. **Print** opens the print dialog.
- **To my phone** sends the recipe or the shopping list as a notification through the notify
  service you pick (default: the garden's notification settings under Settings › Notifications).
- **To‑do list** (shopping list view) adds the items to a Home Assistant to‑do list of your
  choice, e.g. the shopping list; items already open on it are skipped, and it follows your own
  Home Assistant rights for that list.

**Does Assist or voice work with cooking?**
No: the Assist sentences Hortulus installs cover six garden questions (tasks today, overdue,
harvest, greenhouse, water, frost), none about recipes. The to‑do export is a normal Home
Assistant to‑do list, so whatever you do with that list elsewhere (dashboards, automations) works
with it. The cooking functions are available in the panel only.

**Nothing is “ready to pick” – can I still cook?**
Yes. Use **Also from the garden or the cellar** to add vegetables, herbs or fruit you still have;
the dishes follow. What counts as ready comes from your plan and the harvest windows of its crops.

## Records

**Can I keep a harvest log and a garden diary?**
Yes, in the **Journal** tab: a **diary** with photos per bed, crop or the whole garden; a
**harvest log** in kg and pieces (also from the task dialog when you tick off a harvest, or from
the planner) with totals per crop; the **seed box** with use‑by years per crop family and the
crops in your plan that still need seed; **water** use from a garden water meter and the rain
butt level; and **Kitchen** (see below). After a season, Autofill uses your own kg/m² instead of
the database average. **Harvest over the years** shows the total per season with the best year
highlighted and a row of bars per crop.

**How do I record a harvest quickly?**
**Today** has **Quick harvest**: tap a crop that is ready, add up the weight with the big buttons
and save. For an NFC tag or a button: the action `garden_manager.log_harvest` with `plant: Tomato`
and `kg: 0.5` finds the crop in your garden (add `bed:` when the plant grows in several beds).

**Can I quickly add a note or photo to a crop?**
Yes, in a crop's or bed's popup (planner or Crops) under **Note or photo**. On a phone *Photo*
opens the camera. The note goes into the journal with that crop; the latest notes are shown below.
A crop's or bed's photos also form a **timeline** from the first picture to the last.

**Can I see what changed, and undo it?**
Yes. **Journal → System log** lists every change: what you or someone in your household did in
the panel, what an automation or action changed, and what Hortulus did itself (creating or closing
tasks, clean‑up). Each entry shows when, who and what (e.g. *Removed – Crop: Tomato (Greenhouse
bed, season 2027)*). **Undo** restores the state from before that action. If an item was changed
again since, Hortulus asks before discarding that later change; an undo that would leave a crop
without its bed is refused. The undo is logged as well, so it can be reverted too. The last 500
entries are kept (the deletion of a plan, expenses and cookbook entries are in the log too).

**Is there a season overview?**
**Journal → Season report** (and the **year‑end transition**) shows per crop what you planted and
harvested against the expectation, what failed, problems from the journal and the water given.
Download it as Markdown.

**Can I print my garden year as a book?**
Yes: **Print → Season book** (or *Season book (PDF)* in the season report). You get a fully
written book: cover, contents, introduction, one chapter per month with what was sown, planted
and done, your journal with your own photos, the harvest, water and weather, then the year in
numbers, a glossary, colophon and back cover. Choose A5 and print double‑sided (flip on the long
edge); the page count is always a multiple of four, so it folds into signatures for binding.
Photos come from your journal (Home Assistant images), turned upright and scaled down. It is
available in Dutch, English and French.

**How much does my kitchen garden save?**
*Journal → Kitchen* shows the harvest at shop prices next to your expenses (seeds, plants,
compost, tools …) and the water from the meter. Adjust prices per crop and the water price under
*Settings → Costs*. The same tab shows what is ready to pick, with tips to keep it, and a warning
when you pick more than you eat.

**Can I see whether watering helps?**
Yes: **Journal → Water → Watering per bed** shows soil moisture (from Home Assistant's history),
the water Hortulus gave and the rain (rain sensor) per bed over 7, 14 or 30 days. The same chart
is in a bed's planner popup.

**Can missing seed go on my shopping list?**
**Crops → Seeds** shows per crop how many seeds to buy. **Add … to the list** puts what is missing
on a Home Assistant to‑do list (e.g. the shopping list); items already on it are not added twice,
and it follows your own Home Assistant rights for that list.

**Where are my old seasons?**
Seasons older than the current one and the two before it move to a separate archive file so
Hortulus stays fast after years of use. Nothing is lost: crop rotation still takes them into
account, and the season report and season book can still open them (pick the year). A season
leaves the garden file only after the archive holding it has been read back from disk.

**Can I export or import my whole garden?**
Yes, the plan travels as one file. **Settings › General › Import & export** downloads JSON or YAML;
**Import plan** in the Planner reads such a file, either **merged** with the current plan or
**replacing** it (the actions `garden_manager.export_plan` and `import_plan` do the same). The
file holds zones, beds, garden elements, the garden plans of every season, crops, your own plants
and plant changes, crop‑rotation history, plans set aside and, if you tick it, tasks. It does *not*
hold the journal, harvest log, photos, expenses or cookbook. A file Hortulus refuses (wrong
format or invalid values) changes nothing. For a full copy of everything, use a Home Assistant
backup. A file made by another Hortulus (another Home Assistant or the website) imports the same
way.

**Where do the plant photos come from?**
Every plant, suggestion and handbook chapter has an illustration drawn by Hortulus itself (works
offline). On top of that your browser shows a photo from Wikipedia, looked up by scientific name,
under a licence Hortulus can honour (CC BY, CC BY‑SA, CC0, public domain), credited with creator
and licence and linked to the source. Your browser fetches it directly from Wikipedia; Home
Assistant itself makes no connection. To switch it off, use **Settings → Display** (per browser).

## Entities, voice and dashboards

**Entities for a new bed don't appear.**
They are added as soon as the plan is saved (watch the *Saved* indicator in the planner
toolbar). Reload the integration if you edited `.storage` by hand (don't).

**Entity ids are Dutch / English.**
Ids are generated in the HA system language at creation time. Rename them in
Settings → Entities; unique ids are stable.

**Frost sensor shows `unknown`.**
The weather entity is unavailable or provides no forecast. Check
Settings → Devices & services → Hortulus → *Download diagnostics* → `weather.error`.

**How do I use voice commands?**
Run **Settings › Household & voice › Install voice sentences** once (or the action
`garden_manager.install_voice_sentences`). Then ask Assist, for example, “what do I need to do in
the garden today?”, “what can I harvest?”, “how warm is it in the greenhouse?” or “is there frost
tonight?”. Sentences exist in English, Dutch and French. See the
[entity reference](ENTITY_REFERENCE.md#voice-assist).

**Is there a dashboard card?**
Yes: `type: custom:hortulus-tasks-card` is loaded automatically. It shows today's and overdue
tasks with a tick box, watering today, a run in progress, a valve left open (with *Close*) and
leaks, plus a garden saying and a climate line; `days`, `assignee`, `max`, `garden`, `climate` and
`slogan` are optional. See the
[entity reference](ENTITY_REFERENCE.md#lovelace-card).

**Can I automate Hortulus?**
Yes: the README links ready‑made blueprints (frost warning on a lamp, log a harvest with a button
or NFC tag, water a dry bed at a good moment, announce urgent garden jobs). `run_irrigation_plan`
accepts `only_if_needed` so your automation chooses the moment while Hortulus still decides
whether the bed needs water.

**My moisture sensor is sometimes offline – is the advice still right?**
Yes. A sensor that has not reported for longer than *sensor stale minutes* (default 360, set under
the integration's Advanced options) is treated as missing, not as its last value, and an alert
tells you which sensor it is. Every day Hortulus also sets the water balance of a bed with a
sensor from the reading and learns how fast that bed really dries out (e.g. "15% faster than
modelled", on the dashboard). When the sensor drops out it carries on with what it learned.

## Print, handbook, autofill

**How do I get a plan onto my reMarkable Paper Pro?**
Print tab → paper *reMarkable Paper Pro*, colours *E‑ink* → *Download PDF*, then drag
the file into the reMarkable app (or use *Send to reMarkable* by email). The page is
exactly the size of the screen; the dot‑grid notes area and the light tints leave room
to draw. For a weekly checklist, automate `garden_manager.export_pdf` with
`document: tasks` and pick the file up from the signed link in the service response.
PDFs are private: they are written to `/config/hortulus/exports/` and served through an
authenticated link valid for 7 days.

**Why do the beds have patterns on the printout?**
In e‑ink and grayscale mode every plant family also gets a hatch pattern, so the map
stays readable without colour and on a monochrome printer.

**What can I print?**
Garden map, greenhouse or zone map, bed sheets, task checklist, season chart, year plan, blank
planning sheet, plant cards and the season book, on A4, A3, A5, Letter or reMarkable Paper Pro,
in colour, e‑ink or grayscale. The cookbook and shopping list have their own PDFs in the Cooking
tab.

**Autofill put my tomatoes outside although I have a greenhouse.**
Tomatoes grew in that greenhouse bed last season, so the bed is excluded for nightshades
by the rotation rule. Add another greenhouse bed, or move them anyway – the planner will
show the rotation warning.

**Autofill places almost nothing. Why?**
Usually it is simply too late in the season: in October the sowing or planting window of nearly
every crop has passed for this year. The Autofill dialog says per plant why it was not placed
(too late, wrong zone type, not under glass, frost before harvest, crop rotation, bad neighbour,
no room left, a bed too narrow for its margins) and offers to fill the **next season** instead. If
that season has no garden plan yet, Hortulus fills in on the latest plan and copies it when you
apply. For a single plant, **Analysis → Why not?** shows per bed whether it fits and, if not, why –
with the same rules as dragging and autofill.

**Autofill skipped crops.**
Reasons are listed under *Not placed*: no suitable bed (rotation, frost season too short
outdoors, not suited under glass), no space, or the weekly time/water budget was used
up. Raise the budget, select more beds or tick *replace*.

**Why did the expected harvest date move?**
With a temperature sensor (or the weather entity) Hortulus logs daily minimum and
maximum temperatures and sums degree days since planting (greenhouse crops: the greenhouse
air sensor); a warm spell brings the harvest forward, a cold one delays it (at most three
weeks either way). Heat days and dull days delay fruiting crops, and cold days below the
crop's minimum hold back crops without a degree‑day model. The crop popup says how many days
the weather added and why.

## Irrigation safety

**Can automatic watering flood my garden?**
Every valve has a maximum runtime, only one valve runs at a time, and the pump only runs
while a valve that reported open is open. When a run ends, fails or is stopped (button,
service, Home Assistant restart), all valves that were opened and the pump are switched off –
the pump first, then the valve.

**What if a valve or the pump stops reporting?**
- A valve that never reports open ends the run and books no water; with a pump the pump is never
  started against it.
- If a pumped valve reports nothing at all (unknown or unavailable) for **60 seconds**, the run
  ends at once and the pump stops, because Hortulus can no longer tell that the pump has an open
  outlet. The problem is reported in the system log and as a notification.
- A valve that shuts by itself in the middle of a run ends the run, books the real time and is
  reported.
- A valve or the pump that stays open far longer than any run can last (max runtime + 10 minutes)
  while Hortulus is not watering is reported with a notification and a red banner on **Today** with
  **Close valve**. After every run Hortulus also checks that the valve reports closed.

**How do I test my valve or pump?**
In **Settings → Irrigation hardware** every bed valve has **Test (5 s)**. Hortulus opens the valve
for 5 seconds (with the pump, in the safe order; the pump is tested this way, never on its own),
closes it again and tells you whether the valve reported open and closed. Save the settings first:
only linked valves are tested. *Stop* or *Close* ends a test that is running.

**My pump is a smart tap (valve) – does that work?**
Yes. In **Settings → Irrigation hardware** the pump and bed valve pickers also list `valve.*` and
`input_boolean.*` entities. Hortulus opens and closes a `valve` with `valve.open_valve` /
`valve.close_valve`, in the same safe order (valve open → pump on … pump off → valve closed).
Smart taps with their own timer (such as a *Watering Duration* setting) close by themselves after
that time: enter it under **Settings › Beds › Valve timer** and longer runs are split into openings
that stay inside it. Otherwise set it longer than Hortulus' max runtime, or the tap stops earlier
than planned.

**Can Hortulus report a leak?**
With a water meter (Settings › Water): when the meter counts water (at least 5 litres) for 15
minutes while every Hortulus valve is closed and nothing is running, you get a notification and a
red banner on Today (and the wall screen); it clears itself when the water stops. You can switch
leak alerts off in the same place. During a run Hortulus also reads the meter: the log shows the
real litres and each bed learns its real flow, which is used when you enter no flow rate yourself.

**Why didn't it water this morning?**
Look at `binary_sensor.hortulus_irrigation_frost_lockout` and run
`garden_manager.run_irrigation_plan` with `dry_run: true`: the response lists every
skipped bed with its reason (frost lockout, rain expected, no valve, no flow rate, not
needed, mode not *auto*). The frost lockout looks at the next 12 hours, so a colder night later
in the forecast does not hide tonight's frost.

**Why does automatic watering start later than the start time?**
Because a solar surplus sensor is set under **Settings → Irrigation hardware** (extra *Energy‑aware
watering*): the run waits until the surplus reaches *start from surplus* (default 500 W), but never
past *wait at most until* (default 11:00) – then it waters anyway. Meanwhile **Today** shows
*Waiting for solar surplus*. No sensor, or no usable reading, means no waiting; clear the sensor or
switch the extra off to start on time again.

## Troubleshooting

**Where do I find errors and unexpected things?**
In the **Analysis** tab (Manage):

- **Check** compares garden plans, crops and seasons and reports what does not add up: a year with
  crops but no garden plan, crops whose bed is not on the plan (invisible in the planner), beds
  outside their zone, crops on top of each other or planned too late, a missed year‑end transition …,
  with a button to the right place. The number on the tab shows how many problems there are right
  now; it is recomputed after every change.
- **Why not?** explains why a plant does not fit somewhere.
- **Errors** lists every action Hortulus refused, with the reason.
- **Compare** shows the difference between two plans.
- **System log** is the same log as **Journal → System log**.

**Can Hortulus fix problems itself?**
Several findings in **Analysis → Check** have a button: copy a missing garden plan, put crops that
are off the plan or outside their bed back, move a bed into its zone, or carry a forgotten perennial
into this year. Every fix is in the system log and can be undone. **Export diagnosis** gives one file
(check, errors, recent log) to attach when you report a problem.

| Symptom | Check |
|---|---|
| Panel shows “Hortulus is not set up” | The integration isn't loaded; see *Settings → System → Logs* for `garden_manager`. |
| Panel is blank after an update | Hard refresh (the module URL is content‑hashed, but some proxies cache aggressively). |
| “Changed elsewhere – reloaded” | Someone (or an import/service) changed the plan while you edited; your last unsaved second of edits was discarded. |
| Settings are greyed out | Changing the plan, plants or hardware needs a Home Assistant administrator. |
| Irrigation duration missing | Set a flow rate (L/min) for the bed in Settings → Beds & sensors (or link a water meter so Hortulus learns it). |
| Sensor stale alert | The sensor has not reported for longer than *sensor stale minutes* (options → advanced). |
| Tasks in the wrong language | Options → Advanced → *Language of generated tasks*. |
| Nothing under “Ready in the garden” | No crop is ready to pick yet; add what you have under *Also from the garden or the cellar*. |
| No rain radar | No radar camera in Home Assistant and the country is not NL/BE, or the weather entity is not set. |
| Colours or theme look wrong on iPhone | Update the integration (1.7.1 sets themes as inline colours that every browser applies at once) and reload the app. |
| Leak or “valve left open” banner | Check the valve, then *Close valve* on the banner; see Irrigation safety. |

Enable debug logging:

```yaml
logger:
  logs:
    custom_components.garden_manager: debug
```

Please attach the **diagnostics** download (it redacts notify services, speakers,
latitude and photos) when opening an issue.
