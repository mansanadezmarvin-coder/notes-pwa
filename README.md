Mobile web app version

Files created in `mobile/`:
- `index.html` — mobile-first builder + preview page (reuses `../css/style.css` and `../js/script.js`).
- `style.css` — small mobile overrides.
- `app.js` — mobile UI helpers (view toggles, export button wiring).
- `manifest.json` — PWA manifest (icons are placeholders).

How to try:
1. Open `mobile/index.html` in a mobile browser or responsive emulator.
2. Fill the form and tap "Preview" to see the resume preview.
3. Tap "Export" to open the print dialog and save as PDF. The recommended jobs will print onto a separate page.

Notes:
PWA / Installable notes
 - This mobile folder is set up as a Progressive Web App (PWA). It includes `manifest.json`, `service-worker.js`, and two SVG icons.
 - To install the app on your phone you must serve the files over HTTPS (or use `http://localhost` during development). Opening the `file://` path will not allow service worker registration or PWA install.
 - The site will show an "Install" button when the browser emits the install prompt; you can also install from the browser menu when available.
 - The service worker caches core assets and provides an `offline.html` fallback when navigation fails.

How to test locally (recommended)
1. Serve the project locally, e.g. using Python's simple server from the project root:

```bash
# Python 3
python -m http.server 8000
```

2. Open `http://localhost:8000/mobile/index.html` in Chrome or Edge (or Safari for limited support).
3. Use devtools > Application > Manifest to inspect the manifest and icons.
4. Use devtools > Application > Service Workers to check registration and cached files.

If you'd like, I can add a small npm script and instructions to run a local HTTPS server for better parity with production.

