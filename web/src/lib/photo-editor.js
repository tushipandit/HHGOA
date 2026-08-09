export const DEFAULT_EDITOR_STATE = {
  rotation: 0,
  zoom: 1,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  grayscale: 0,
  hue: 0,
  offsetX: 0,
  offsetY: 0,
};

export function createEditorState(overrides = {}) {
  return { ...DEFAULT_EDITOR_STATE, ...overrides };
}

export async function applyPhotoEditor(photo, state = DEFAULT_EDITOR_STATE) {
  const editorState = createEditorState(state);
  const outputSize = 2200;
  const canvas = document.createElement('canvas');
  canvas.width = outputSize;
  canvas.height = outputSize;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, outputSize, outputSize);

  const angle = (editorState.rotation * Math.PI) / 180;
  const scale = editorState.zoom;
  const baseWidth = photo.width;
  const baseHeight = photo.height;
  const drawWidth = baseWidth * scale;
  const drawHeight = baseHeight * scale;
  const offsetX = editorState.offsetX * 14;
  const offsetY = editorState.offsetY * 14;

  ctx.save();
  ctx.translate(outputSize / 2 + offsetX, outputSize / 2 + offsetY);
  ctx.rotate(angle);
  ctx.filter = buildFilterString(editorState);
  ctx.drawImage(photo, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
  ctx.restore();

  return canvas;
}

function buildFilterString(state) {
  return [
    `brightness(${state.brightness}%)`,
    `contrast(${state.contrast}%)`,
    `saturate(${state.saturation}%)`,
    `grayscale(${state.grayscale}%)`,
    `hue-rotate(${state.hue}deg)`,
    `blur(${state.blur}px)`,
  ].join(' ');
}
