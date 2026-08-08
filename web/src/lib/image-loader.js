/**
 * Load an image file (jpg, png, webp, gif, heic) into an HTMLImageElement.
 */
export async function loadImageFromFile(file) {
  let blob = file;

  if (isHeic(file)) {
    const heic2any = (await import('heic2any')).default;
    const converted = await heic2any({ blob: file, toType: 'image/jpeg', quality: 0.92 });
    blob = Array.isArray(converted) ? converted[0] : converted;
  }

  const url = URL.createObjectURL(blob);
  try {
    return await loadImageFromUrl(url);
  } finally {
    URL.revokeObjectURL(url);
  }
}

function isHeic(file) {
  const type = file.type?.toLowerCase() ?? '';
  const name = file.name?.toLowerCase() ?? '';
  return (
    type === 'image/heic' ||
    type === 'image/heif' ||
    name.endsWith('.heic') ||
    name.endsWith('.heif')
  );
}

export function loadImageFromUrl(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not load image'));
    img.src = url;
  });
}

export function loadAsset(path) {
  return loadImageFromUrl(path);
}

export const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif';
