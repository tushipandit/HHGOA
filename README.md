# Frame in Goa 2026

Upload a photo and instantly get a branded **HH Goa 2026** graphic — ready to download and share on X. No login, no signup, one pass from upload to result.

**Hashtag:** `#FrameInGoa`

---

## Features

### Format A — PFP Frame
A decorative frame wraps your uploaded photo, turning it into a ready-to-use X profile picture. Your photo stays front and center; the frame adds HH Goa branding (1080×1080 PNG).

### Format B — Builder ID Card
An event-style badge with your photo, name, stack/role, and an auto-generated **builder title** (e.g. "Sunset Architect", "Wave Coder"). Designed to post as an image on X (1080×1350 PNG).

### Core capabilities
- **Fast generation** — compositing runs in the browser via Canvas; results appear in seconds
- **Real photos** — smart crop handles portrait, landscape, and off-center images (no pre-cropping needed)
- **HEIC support** — iPhone photos converted client-side before processing
- **Download** — exports a real PNG file, not a screen-only preview
- **Share on X** — pre-filled caption with `#FrameInGoa`; mobile uses native share with image attached; desktop opens tweet intent with OG preview link
- **Mobile-first** — touch upload, responsive layout, safe-area aware

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | Vite, vanilla JS, Canvas API |
| HEIC conversion | [heic2any](https://www.npmjs.com/package/heic2any) |
| Share / OG previews | Express, Multer |
| Fonts | [Syne](https://fonts.google.com/specimen/Syne), [Outfit](https://fonts.google.com/specimen/Outfit) |

Generation is **client-side** for speed. A small Node server handles share-link uploads and Open Graph meta tags so X link previews show the actual graphic.

---

## Project structure

```
HHGOA/
├── assets/                 # Brand SVGs (logo, waves, palm) — source of truth
├── web/
│   ├── index.html
│   ├── vite.config.js
│   ├── public/assets/      # Synced from assets/ on build
│   └── src/
│       ├── main.js         # UI and app flow
│       ├── styles.css
│       ├── generators/
│       │   ├── pfp-frame.js
│       │   └── id-card.js
│       └── lib/            # Image loading, canvas utils, share helpers
├── tools/
│   ├── share-server.js     # Express server + OG share pages
│   └── sync-assets.js      # Copies assets/ → web/public/assets/
├── dist/                   # Production build output (after npm run build)
├── .tmp/shares/            # Temporary uploaded share images (gitignored)
└── package.json
```

This repo also follows the **WAT framework** (Workflows, Agents, Tools) described in [HHGOA.md](./HHGOA.md).

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+

---

## Getting started

### Install dependencies

```bash
npm install
```

### Development

Runs the Vite dev server and share API together:

```bash
npm run dev
```

| Service | URL |
|---------|-----|
| Web app | http://localhost:5173 |
| Share API | http://localhost:3000 |

Vite proxies `/api` and `/share` to the share server during development.

### Production build & run

```bash
npm run build
npm start
```

Open **http://localhost:3000**

Or use the combined command:

```bash
npm run preview
```

---

## Environment variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `3000` | Share server port |
| `BASE_URL` | `http://localhost:3000` | Public URL for OG image and share links |

For production, set `BASE_URL` to your deployed domain so X link previews resolve correctly:

```bash
BASE_URL=https://frame.goa.example.com npm start
```

---

## User flow

1. **Upload** — drag-and-drop or tap to select (JPG, PNG, WebP, GIF, HEIC)
2. **Choose format** — PFP Frame or Builder ID Card
3. **Fill fields** *(ID Card only)* — name and stack/role; builder title is generated automatically
4. **Preview** — graphic renders instantly in the browser
5. **Download** — save PNG to device
6. **Share on X** — pre-filled tweet with `#FrameInGoa`

### Share behavior

- **Mobile (Web Share API):** attaches the PNG directly when supported
- **Desktop / fallback:** uploads image to `/api/share`, opens Twitter intent with a share URL whose Open Graph tags point at the generated image

Share pages live at `/share/:id` with `og:image` and `twitter:card` meta for large-image previews.

---

## Branding & assets

Official brand files go in `assets/`. They are copied to `web/public/assets/` automatically on `npm run dev` and `npm run build`.

Included placeholders:
- `logo-mark.svg`
- `wave-divider.svg`
- `palm-accent.svg`

Replace or extend these with official HH Goa 2026 artwork; the generators pick them up on the next sync.

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Sync assets, start Vite + share server |
| `npm run dev:web` | Vite dev server only |
| `npm run dev:server` | Share server only |
| `npm run build` | Sync assets, build to `dist/` |
| `npm start` | Serve `dist/` + share API |
| `npm run preview` | Build then start |

---

## Deployment notes

1. Run `npm run build` to produce static files in `dist/`
2. Start the server with `npm start` (serves `dist/` and the share API)
3. Set `BASE_URL` to your production URL
4. Ensure `.tmp/shares/` is writable for temporary share uploads
5. Put a reverse proxy (nginx, Caddy, etc.) in front if needed for HTTPS

---

## License

UNLICENSED — internal HH Goa 2026 project.
