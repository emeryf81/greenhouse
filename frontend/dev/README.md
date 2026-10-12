# Panel dev harness

Run the Hortulus panel in a browser **without Home Assistant**: `index.html` creates
`<hortulus-panel>` with a mock `hass` object whose websocket connection answers from a
JSON snapshot produced by the *real* Python engine.

```bash
# from the repository root
python frontend/dev/make_snapshot.py en frontend/dev/data-en.json
python frontend/dev/make_snapshot.py nl frontend/dev/data-nl.json
(cd frontend && npm run watch)          # rebuilds the bundle on change
python -m http.server 8765              # serve the repository root
# open http://localhost:8765/frontend/dev/index.html?tab=planner&lang=nl&dark=1
```

Query parameters: `tab` (`planner`, `library`, `calendar`, `settings`), `lang` (`en`/`nl`),
`dark=1`, `narrow=1`. Mock icons: drop an `icons.json` (`{"mdi:sprout": "<svg path>"}`)
next to `index.html`, otherwise icons render empty. The `ha-icon` stub renders into a
shadow root – rendering into light DOM would corrupt Lit's template parts.
