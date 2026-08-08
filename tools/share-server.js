/**
 * Share server — stores generated images temporarily and serves OG meta for X link previews.
 * Run: node tools/share-server.js
 */
import express from 'express';
import multer from 'multer';
import { randomUUID } from 'crypto';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SHARE_DIR = join(ROOT, '.tmp', 'shares');
const DIST_DIR = join(ROOT, 'dist');
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

if (!existsSync(SHARE_DIR)) mkdirSync(SHARE_DIR, { recursive: true });

const upload = multer({
  storage: multer.diskStorage({
    destination: SHARE_DIR,
    filename: (_req, file, cb) => {
      const ext = file.mimetype === 'image/jpeg' ? 'jpg' : 'png';
      cb(null, `${randomUUID()}.${ext}`);
    },
  }),
  limits: { fileSize: 12 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Images only'));
  },
});

const app = express();

app.post('/api/share', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No image provided' });

  const id = req.file.filename.replace(/\.(png|jpg)$/, '');
  const imageUrl = `${BASE_URL}/api/image/${id}`;
  const pageUrl = `${BASE_URL}/share/${id}`;

  res.json({ id, url: pageUrl, imageUrl });
});

app.get('/api/image/:id', (req, res) => {
  const png = join(SHARE_DIR, `${req.params.id}.png`);
  const jpg = join(SHARE_DIR, `${req.params.id}.jpg`);
  if (existsSync(png)) return res.sendFile(png);
  if (existsSync(jpg)) return res.sendFile(jpg);
  res.status(404).send('Not found');
});

app.get('/share/:id', (req, res) => {
  const { id } = req.params;
  const imageUrl = `${BASE_URL}/api/image/${id}`;
  const pageUrl = `${BASE_URL}/share/${id}`;

  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Frame in Goa 2026 — HH Goa Graphic</title>
  <meta name="description" content="I'm framing in Goa! HH Goa 2026 #FrameInGoa" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Frame in Goa 2026" />
  <meta property="og:description" content="I'm framing in Goa! 🌴 HH Goa 2026 — come build with us. #FrameInGoa" />
  <meta property="og:image" content="${imageUrl}" />
  <meta property="og:image:width" content="1080" />
  <meta property="og:image:height" content="1080" />
  <meta property="og:url" content="${pageUrl}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Frame in Goa 2026" />
  <meta name="twitter:description" content="I'm framing in Goa! 🌴 #FrameInGoa" />
  <meta name="twitter:image" content="${imageUrl}" />
  <meta http-equiv="refresh" content="0;url=https://twitter.com/intent/tweet?text=${encodeURIComponent("I'm framing in Goa! 🌴 Just made my HH Goa 2026 graphic. #FrameInGoa")}&url=${encodeURIComponent(pageUrl)}" />
</head>
<body style="background:#062F30;color:#FFF8F0;font-family:system-ui;text-align:center;padding:2rem">
  <p>Redirecting to share on X…</p>
  <p><a href="${imageUrl}" style="color:#FFB347">View your graphic</a></p>
</body>
</html>`);
});

if (existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (_req, res) => {
    res.sendFile(join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Frame in Goa server → ${BASE_URL}`);
});
