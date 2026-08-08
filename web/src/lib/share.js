const SHARE_TEXT =
  "I'm framing in Goa! 🌴 Just made my HH Goa 2026 graphic — come build with us. #FrameInGoa";

export function getShareCaption() {
  return SHARE_TEXT;
}

export async function uploadForShare(blob) {
  const form = new FormData();
  form.append('image', blob, 'frame-in-goa.png');

  const res = await fetch('/api/share', { method: 'POST', body: form });
  if (!res.ok) throw new Error('Share upload failed');
  return res.json();
}

export function openTwitterIntent(shareUrl) {
  const params = new URLSearchParams({
    text: SHARE_TEXT,
    url: shareUrl,
  });
  window.open(`https://twitter.com/intent/tweet?${params}`, '_blank', 'noopener,noreferrer');
}

export async function shareToX(blob, shareMeta) {
  const caption = getShareCaption();

  if (navigator.share && navigator.canShare) {
    const file = new File([blob], 'frame-in-goa.png', { type: 'image/png' });
    const payload = { files: [file], text: caption };
    if (navigator.canShare(payload)) {
      try {
        await navigator.share(payload);
        return { method: 'native' };
      } catch (err) {
        if (err.name === 'AbortError') return { method: 'cancelled' };
      }
    }
  }

  let shareUrl = shareMeta?.url;
  if (!shareUrl) {
    const data = await uploadForShare(blob);
    shareUrl = data.url;
  }

  openTwitterIntent(shareUrl);
  return { method: 'twitter-intent', url: shareUrl };
}

export async function prefetchShareLink(blob) {
  try {
    return await uploadForShare(blob);
  } catch {
    return null;
  }
}
