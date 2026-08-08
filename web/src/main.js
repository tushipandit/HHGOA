import './styles.css';
import { generatePfpFrame } from './generators/pfp-frame.js';
import { generateIdCard } from './generators/id-card.js';
import { generateBuilderTitle } from './lib/builder-titles.js';
import { canvasToBlob, downloadBlob } from './lib/canvas-utils.js';
import { ACCEPTED_TYPES, loadAsset, loadImageFromFile } from './lib/image-loader.js';
import { prefetchShareLink, shareToX } from './lib/share.js';

const app = document.getElementById('app');

let state = {
  mode: 'pfp',
  photo: null,
  photoFile: null,
  name: '',
  stack: '',
  canvas: null,
  shareMeta: null,
  generating: false,
};

let assets = {};

app.innerHTML = `
  <div class="page">
    <header class="hero">
      <div class="hero-badge">HH GOA 2026</div>
      <h1>Frame in Goa</h1>
      <p class="hero-sub">Upload a photo → get a branded graphic in seconds. Download or share on X.</p>
    </header>

    <div class="mode-tabs" role="tablist">
      <button type="button" class="mode-tab active" data-mode="pfp" role="tab" aria-selected="true">
        <span class="tab-icon">◉</span>
        PFP Frame
      </button>
      <button type="button" class="mode-tab" data-mode="card" role="tab" aria-selected="false">
        <span class="tab-icon">▣</span>
        Builder ID Card
      </button>
    </div>

    <main class="workspace">
      <section class="panel upload-panel">
        <label class="dropzone" id="dropzone">
          <input type="file" id="file-input" accept="${ACCEPTED_TYPES}" hidden />
          <div class="dropzone-inner" id="dropzone-inner">
            <div class="drop-icon">📸</div>
            <p class="drop-title">Drop your photo here</p>
            <p class="drop-hint">JPG · PNG · HEIC · tap to browse</p>
          </div>
          <img id="upload-preview" class="upload-preview hidden" alt="Your photo preview" />
        </label>

        <div class="fields card-fields hidden" id="card-fields">
          <label class="field">
            <span>Your name</span>
            <input type="text" id="input-name" placeholder="Alex Rivera" maxlength="40" autocomplete="name" />
          </label>
          <label class="field">
            <span>Stack / role</span>
            <input type="text" id="input-stack" placeholder="React · Node · Design" maxlength="50" />
          </label>
          <p class="title-preview">Builder title: <strong id="title-preview">—</strong></p>
        </div>
      </section>

      <section class="panel result-panel">
        <div class="result-header">
          <h2>Your graphic</h2>
          <span class="result-status" id="result-status">Upload a photo to start</span>
        </div>

        <div class="canvas-wrap" id="canvas-wrap">
          <div class="canvas-placeholder" id="canvas-placeholder">
            <div class="placeholder-art"></div>
            <p>Preview appears here instantly</p>
          </div>
          <canvas id="preview-canvas" class="hidden"></canvas>
        </div>

        <div class="actions hidden" id="actions">
          <button type="button" class="btn btn-primary" id="btn-download">
            <span>↓</span> Download
          </button>
          <button type="button" class="btn btn-x" id="btn-share">
            <span>𝕏</span> Share on X
          </button>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>No login · No wait · <strong>#FrameInGoa</strong></p>
    </footer>
  </div>
`;

const els = {
  dropzone: document.getElementById('dropzone'),
  fileInput: document.getElementById('file-input'),
  uploadPreview: document.getElementById('upload-preview'),
  dropzoneInner: document.getElementById('dropzone-inner'),
  cardFields: document.getElementById('card-fields'),
  inputName: document.getElementById('input-name'),
  inputStack: document.getElementById('input-stack'),
  titlePreview: document.getElementById('title-preview'),
  canvasWrap: document.getElementById('canvas-wrap'),
  canvasPlaceholder: document.getElementById('canvas-placeholder'),
  previewCanvas: document.getElementById('preview-canvas'),
  resultStatus: document.getElementById('result-status'),
  actions: document.getElementById('actions'),
  btnDownload: document.getElementById('btn-download'),
  btnShare: document.getElementById('btn-share'),
  modeTabs: document.querySelectorAll('.mode-tab'),
};

async function init() {
  assets = await loadAssets();
  bindEvents();
}

async function loadAssets() {
  const [logo, wave, palm] = await Promise.all([
    loadAsset('/assets/logo-mark.svg').catch(() => null),
    loadAsset('/assets/wave-divider.svg').catch(() => null),
    loadAsset('/assets/palm-accent.svg').catch(() => null),
  ]);
  return { logo, wave, palm };
}

function bindEvents() {
  els.modeTabs.forEach((tab) => {
    tab.addEventListener('click', () => setMode(tab.dataset.mode));
  });

  els.fileInput.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  });

  els.dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    els.dropzone.classList.add('dragover');
  });
  els.dropzone.addEventListener('dragleave', () => els.dropzone.classList.remove('dragover'));
  els.dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    els.dropzone.classList.remove('dragover');
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  });

  for (const input of [els.inputName, els.inputStack]) {
    input.addEventListener('input', () => {
      state.name = els.inputName.value.trim();
      state.stack = els.inputStack.value.trim();
      updateTitlePreview();
      if (state.photo) scheduleGenerate();
    });
  }

  els.btnDownload.addEventListener('click', handleDownload);
  els.btnShare.addEventListener('click', handleShare);
}

function setMode(mode) {
  state.mode = mode;
  els.modeTabs.forEach((tab) => {
    const active = tab.dataset.mode === mode;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  els.cardFields.classList.toggle('hidden', mode !== 'card');
  if (state.photo) scheduleGenerate();
}

let generateTimer;
function scheduleGenerate() {
  clearTimeout(generateTimer);
  generateTimer = setTimeout(generate, 80);
}

function showUploadPreview(img) {
  const c = document.createElement('canvas');
  c.width = img.width;
  c.height = img.height;
  c.getContext('2d').drawImage(img, 0, 0);
  els.uploadPreview.src = c.toDataURL('image/jpeg', 0.85);
}

async function handleFile(file) {
  if (!file.type.startsWith('image/') && !file.name.match(/\.heic$/i) && !file.name.match(/\.heif$/i)) {
    els.resultStatus.textContent = 'Please upload an image file';
    return;
  }

  els.resultStatus.textContent = 'Loading photo…';
  try {
    state.photo = await loadImageFromFile(file);
    state.photoFile = file;
    state.shareMeta = null;

    showUploadPreview(state.photo);
    els.uploadPreview.classList.remove('hidden');
    els.dropzoneInner.classList.add('hidden');

    await generate();
  } catch (err) {
    console.error(err);
    els.resultStatus.textContent = 'Could not load that image. Try JPG or PNG.';
  }
}

async function generate() {
  if (!state.photo || state.generating) return;
  state.generating = true;
  els.resultStatus.textContent = 'Generating…';

  try {
    let canvas;
    if (state.mode === 'pfp') {
      canvas = await generatePfpFrame(state.photo, assets);
    } else {
      canvas = await generateIdCard(
        state.photo,
        { name: state.name, stack: state.stack },
        assets
      );
    }

    state.canvas = canvas;
    showPreview(canvas);
    els.resultStatus.textContent = 'Ready!';
    els.actions.classList.remove('hidden');

    const blob = await canvasToBlob(canvas);
    prefetchShareLink(blob).then((meta) => {
      state.shareMeta = meta;
    });
  } catch (err) {
    console.error(err);
    els.resultStatus.textContent = 'Generation failed — try another photo';
  } finally {
    state.generating = false;
  }
}

function showPreview(canvas) {
  const preview = els.previewCanvas;
  preview.width = canvas.width;
  preview.height = canvas.height;
  preview.classList.remove('hidden');
  els.canvasPlaceholder.classList.add('hidden');

  const ctx = preview.getContext('2d');
  ctx.clearRect(0, 0, preview.width, preview.height);
  ctx.drawImage(canvas, 0, 0);

  els.canvasWrap.dataset.aspect = canvas.width === canvas.height ? 'square' : 'portrait';
}

function updateTitlePreview() {
  if (state.mode !== 'card') return;
  const title = generateBuilderTitle(state.name || 'Builder', state.stack);
  els.titlePreview.textContent = title;
}

async function handleDownload() {
  if (!state.canvas) return;
  const blob = await canvasToBlob(state.canvas);
  const prefix = state.mode === 'pfp' ? 'hh-goa-pfp' : 'hh-goa-badge';
  downloadBlob(blob, `${prefix}-2026.png`);
}

async function handleShare() {
  if (!state.canvas) return;
  els.btnShare.disabled = true;
  els.resultStatus.textContent = 'Opening share…';

  try {
    const blob = await canvasToBlob(state.canvas);
    const result = await shareToX(blob, state.shareMeta);
    if (result.method === 'cancelled') {
      els.resultStatus.textContent = 'Ready!';
    } else if (result.method === 'native') {
      els.resultStatus.textContent = 'Shared!';
    } else {
      els.resultStatus.textContent = 'Tweet composer opened — your link has the preview image';
    }
  } catch (err) {
    console.error(err);
    els.resultStatus.textContent = 'Share failed — try downloading instead';
  } finally {
    els.btnShare.disabled = false;
  }
}

init();
