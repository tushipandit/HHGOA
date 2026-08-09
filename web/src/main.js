import './styles.css';
import { generatePfpFrame } from './generators/pfp-frame.js';
import { generateIdCard } from './generators/id-card.js';
import { generateBuilderTitle } from './lib/builder-titles.js';
import { canvasToBlob, downloadBlob } from './lib/canvas-utils.js';
import { ACCEPTED_TYPES, loadAsset, loadImageFromFile } from './lib/image-loader.js';
import { prefetchShareLink, shareToX } from './lib/share.js';
import { applyPhotoEditor, createEditorState } from './lib/photo-editor.js';

const app = document.getElementById('app');

let state = {
  mode: 'pfp',
  photo: null,
  photoFile: null,
  editedPhoto: null,
  editorState: createEditorState(),
  mouseControl: 'brightness',
  mouseDragActive: false,
  mouseDragStartX: 0,
  mouseDragStartValue: 0,
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
      <p class="hero-sub">Create polished event graphics with a modern editor, smart framing, and instant exports.</p>
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

        <div class="editor-panel hidden" id="editor-panel">
          <div class="editor-head">
            <h3>Photo editor</h3>
            <div class="editor-actions">
              <button type="button" class="btn btn-link" id="btn-reset-editor">Reset</button>
              <span>Crop, rotate, and fine-tune</span>
            </div>
          </div>
          <div class="mouse-controls">
            <div class="mouse-controls-head">
              <span>Mouse drag</span>
              <small>Drag on the preview to change the selected control</small>
            </div>
            <div class="mouse-control-chips">
              <button type="button" class="mouse-control-chip active" data-mouse-control="brightness">Brightness</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="contrast">Contrast</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="saturation">Saturation</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="blur">Blur</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="grayscale">Grayscale</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="hue">Hue</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="rotation">Rotation</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="zoom">Zoom</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="offsetX">Shift X</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="offsetY">Shift Y</button>
            </div>
          </div>
          <div class="control-group">
            <label class="control-row">
              <span>Rotate</span>
              <input type="range" id="range-rotation" min="-180" max="180" value="0" />
            </label>
            <label class="control-row">
              <span>Zoom</span>
              <input type="range" id="range-zoom" min="0.8" max="2.2" step="0.01" value="1" />
            </label>
            <label class="control-row">
              <span>Brightness</span>
              <input type="range" id="range-brightness" min="50" max="150" value="100" />
            </label>
            <label class="control-row">
              <span>Contrast</span>
              <input type="range" id="range-contrast" min="50" max="150" value="100" />
            </label>
            <label class="control-row">
              <span>Saturation</span>
              <input type="range" id="range-saturation" min="0" max="200" value="100" />
            </label>
            <label class="control-row">
              <span>Blur</span>
              <input type="range" id="range-blur" min="0" max="8" step="0.1" value="0" />
            </label>
            <label class="control-row">
              <span>Grayscale</span>
              <input type="range" id="range-grayscale" min="0" max="100" value="0" />
            </label>
            <label class="control-row">
              <span>Hue</span>
              <input type="range" id="range-hue" min="-180" max="180" value="0" />
            </label>
            <label class="control-row">
              <span>Shift X</span>
              <input type="range" id="range-offsetx" min="-10" max="10" value="0" />
            </label>
            <label class="control-row">
              <span>Shift Y</span>
              <input type="range" id="range-offsety" min="-10" max="10" value="0" />
            </label>
          </div>
        </div>

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
            <p>Preview appears instantly as you style your image</p>
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
  editorPanel: document.getElementById('editor-panel'),
  canvasWrap: document.getElementById('canvas-wrap'),
  canvasPlaceholder: document.getElementById('canvas-placeholder'),
  previewCanvas: document.getElementById('preview-canvas'),
  resultStatus: document.getElementById('result-status'),
  actions: document.getElementById('actions'),
  mouseControlButtons: Array.from(document.querySelectorAll('.mouse-control-chip')),
  btnDownload: document.getElementById('btn-download'),
  btnShare: document.getElementById('btn-share'),
  btnResetEditor: document.getElementById('btn-reset-editor'),
  modeTabs: document.querySelectorAll('.mode-tab'),
  editorControls: {
    rotation: document.getElementById('range-rotation'),
    zoom: document.getElementById('range-zoom'),
    brightness: document.getElementById('range-brightness'),
    contrast: document.getElementById('range-contrast'),
    saturation: document.getElementById('range-saturation'),
    blur: document.getElementById('range-blur'),
    grayscale: document.getElementById('range-grayscale'),
    hue: document.getElementById('range-hue'),
    offsetX: document.getElementById('range-offsetx'),
    offsetY: document.getElementById('range-offsety'),
  },
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
  els.btnResetEditor.addEventListener('click', resetEditor);

  Object.entries(els.editorControls).forEach(([key, input]) => {
    input.addEventListener('input', () => {
      state.editorState[key] = parseFloat(input.value);
      if (state.photo) updateEditedPhotoAndGenerate();
    });
  });

  els.mouseControlButtons.forEach((button) => {
    button.addEventListener('click', () => setMouseControl(button.dataset.mouseControl));
  });

  els.canvasWrap.addEventListener('pointerdown', startMouseAdjust);
  els.canvasWrap.addEventListener('wheel', handleMouseWheel, { passive: false });
  document.addEventListener('pointermove', updateMouseAdjust);
  document.addEventListener('pointerup', endMouseAdjust);
  document.addEventListener('pointercancel', endMouseAdjust);
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

function setMouseControl(control) {
  state.mouseControl = control;
  els.mouseControlButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.mouseControl === control);
  });
}

function startMouseAdjust(event) {
  if (!state.photo || event.button !== 0) return;
  state.mouseDragActive = true;
  state.mouseDragStartX = event.clientX;
  state.mouseDragStartValue = getEditorValue(state.mouseControl);
  els.canvasWrap.classList.add('dragging');
  event.preventDefault();
}

function updateMouseAdjust(event) {
  if (!state.mouseDragActive || !state.photo) return;
  const deltaX = event.clientX - state.mouseDragStartX;
  const nextValue = calculateMouseValue(state.mouseDragStartValue, deltaX, state.mouseControl, event.shiftKey);
  applyEditorValue(state.mouseControl, nextValue);
  event.preventDefault();
}

function endMouseAdjust(event) {
  if (!state.mouseDragActive) return;
  state.mouseDragActive = false;
  els.canvasWrap.classList.remove('dragging');
  if (event.pointerId !== undefined) {
    els.canvasWrap.releasePointerCapture?.(event.pointerId);
  }
}

function handleMouseWheel(event) {
  if (!state.photo) return;
  const delta = event.deltaY > 0 ? -0.05 : 0.05;
  const currentZoom = getEditorValue('zoom');
  applyEditorValue('zoom', clamp(currentZoom + delta, 0.8, 2.2));
  event.preventDefault();
}

function getEditorValue(key) {
  return state.editorState[key];
}

function applyEditorValue(key, rawValue) {
  const input = els.editorControls[key];
  if (!input) return;

  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const step = input.step ? parseFloat(input.step) : 1;
  const clampedValue = clamp(rawValue, min, max);
  const snappedValue = step > 0 ? roundToStep(clampedValue, step) : clampedValue;

  state.editorState[key] = snappedValue;
  input.value = snappedValue;

  if (state.photo) {
    updateEditedPhotoAndGenerate();
  }
}

function calculateMouseValue(startValue, deltaX, controlKey, isFine) {
  const input = els.editorControls[controlKey];
  if (!input) return startValue;

  const min = parseFloat(input.min);
  const max = parseFloat(input.max);
  const span = max - min;
  const sensitivity = isFine ? 0.35 : 1;
  const delta = (deltaX / 320) * span * sensitivity;
  return clamp(startValue + delta, min, max);
}

function roundToStep(value, step) {
  const precision = String(step).split('.')[1]?.length || 0;
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

async function resetEditor() {
  state.editorState = createEditorState();
  Object.entries(els.editorControls).forEach(([key, input]) => {
    input.value = state.editorState[key];
  });
  if (state.photo) {
    state.editedPhoto = await applyPhotoEditor(state.photo, state.editorState);
    scheduleGenerate();
  }
}

async function updateEditedPhotoAndGenerate() {
  if (!state.photo) return;
  state.editedPhoto = await applyPhotoEditor(state.photo, state.editorState);
  scheduleGenerate();
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
    state.editorState = createEditorState();
    Object.entries(els.editorControls).forEach(([key, input]) => {
      input.value = state.editorState[key];
    });

    showUploadPreview(state.photo);
    els.uploadPreview.classList.remove('hidden');
    els.dropzoneInner.classList.add('hidden');
    els.editorPanel.classList.remove('hidden');

    state.editedPhoto = await applyPhotoEditor(state.photo, state.editorState);
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
    const sourcePhoto = state.editedPhoto || state.photo;
    let canvas;
    if (state.mode === 'pfp') {
      canvas = await generatePfpFrame(sourcePhoto, assets);
    } else {
      canvas = await generateIdCard(
        sourcePhoto,
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
