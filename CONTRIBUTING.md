# Contributing

Thanks for helping Hortulus grow! 🌱

## Development setup

```bash
python3.13 -m venv .venv && . .venv/bin/activate
pip install -r requirements_test.txt
pytest -q
ruff check custom_components tests && ruff format --check custom_components tests

cd frontend && npm ci
npm run typecheck && npm test && npm run build
```

The built panel (`custom_components/garden_manager/frontend/hortulus-panel.js`) is
committed so HACS users need no Node.js; CI fails when it is out of date – run
`npm run build` before committing frontend changes. For UI work without Home Assistant
see [`frontend/dev/README.md`](frontend/dev/README.md).

## Ground rules

* **Engine stays pure.** Nothing in `custom_components/garden_manager/engine/` may import
  Home Assistant or do I/O. Add a unit test for every rule you change.
* **Both languages.** Every user-facing string exists in English *and* Dutch:
  `strings.json` + `translations/{en,nl}.json`, `engine/i18n.py`, `frontend/src/i18n/{en,nl}.ts`
  (a unit test checks the frontend catalogs have identical keys and placeholders).
* **Plant data** (`data/plants.json`): windows are weeks relative to the average last
  spring frost / first autumn frost; give `names.en` and `names.nl`, companion reasons in
  both languages, and prefer well-documented relationships (strength 2–3) over folklore.
* **Storage changes** need a migration step in `engine/migrations.py` (bump the minor
  version) and a test.
* **Docs**: `docs/BLUEPRINT.md` and `docs/blueprint/*.md` are generated – edit `docs/_blueprint.template.md` and run
  `python scripts/render_blueprint.py`.
