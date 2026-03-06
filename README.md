# PBS for BBO - Chrome Extension

A lightweight Chrome extension for [Practice Bidding Scenarios](https://github.com/ADavidBailey/Practice-Bidding-Scenarios) on [Bridge Base Online](https://www.bridgebase.com).

Derived from [BBOalert](https://github.com/stanmaz/BBOalert) by Stanislaw Mazur, stripped down to only what PBS needs - no alerting system, no auto-alerts, just the script engine, shortcuts panel, and plugin support (BBA Compare, PBN Capture).

> **Status: Beta** - For testing by PBS contributors. Not yet on the Chrome Web Store.

## Install from GitHub

1. **Download** this repository:
   - Click the green **Code** button above, then **Download ZIP**
   - Or clone: `git clone https://github.com/Rick-Wilson/pbs-bbo-extension.git`

2. **Open** Chrome and go to `chrome://extensions/`

3. **Enable** Developer mode (toggle in the top right corner)

4. **Click** "Load unpacked" and select the `src/` folder inside the downloaded repository

5. **Go to** [bridgebase.com](https://www.bridgebase.com) and log in - you should see the **PBS** tab in the sidebar

## Updating

If you installed via ZIP:
- Download the latest ZIP, replace the `src/` folder, then click the reload icon on `chrome://extensions/`

If you cloned:
- `git pull` then click the reload icon on `chrome://extensions/`

## Notes

- If you also have BBOalert installed, **disable it** before using this extension to avoid conflicts
- PBS data URL defaults to the main `-PBS.txt` from the Practice-Bidding-Scenarios repo
- Plugin configuration (Enable Test Mode, Use Beta Layout) is accessed through the config selector in the Options tab

## License

See [THIRD-PARTY-LICENSES.md](THIRD-PARTY-LICENSES.md) for BBOalert license attribution.
