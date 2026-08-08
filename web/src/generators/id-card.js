import { generateBuilderTitle } from '../lib/builder-titles.js';
import { BRAND, createLinearGradient, drawImageCover, roundRect, wrapText } from '../lib/canvas-utils.js';

const W = 1080;
const H = 1350;

export async function generateIdCard(photo, { name, stack, builderTitle }, assets = {}) {
  const title = builderTitle || generateBuilderTitle(name, stack);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');

  drawCardBackground(ctx);
  drawLanyard(ctx);
  drawPhotoSection(ctx, photo);
  drawInfoSection(ctx, { name, stack, title });
  drawBranding(ctx, assets);
  drawDecorations(ctx, assets);

  return canvas;
}

function drawCardBackground(ctx) {
  const g = createLinearGradient(ctx, 0, 0, W, H, [
    [0, '#FF6B4A'],
    [0.25, '#FFB347'],
    [0.5, '#E040FB'],
    [0.75, '#1B8A6B'],
    [1, '#0A4D4E'],
  ]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = 'rgba(255,248,240,0.08)';
  for (let row = 0; row < 12; row++) {
    for (let col = 0; col < 8; col++) {
      if ((row + col) % 2 === 0) {
        ctx.beginPath();
        ctx.arc(col * 140 + 70, row * 120 + 60, 40, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.fillStyle = BRAND.cream;
  roundRect(ctx, 40, 100, W - 80, H - 160, 48);
  ctx.fill();

  ctx.strokeStyle = BRAND.teal;
  ctx.lineWidth = 6;
  roundRect(ctx, 40, 100, W - 80, H - 160, 48);
  ctx.stroke();
}

function drawLanyard(ctx) {
  ctx.fillStyle = BRAND.teal;
  roundRect(ctx, W / 2 - 60, 0, 120, 130, 20);
  ctx.fill();

  ctx.fillStyle = BRAND.night;
  roundRect(ctx, W / 2 - 28, 108, 56, 36, 12);
  ctx.fill();

  ctx.strokeStyle = BRAND.gold;
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 80, 0);
  ctx.quadraticCurveTo(W / 2 - 120, 200, 80, 280);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(W / 2 + 80, 0);
  ctx.quadraticCurveTo(W / 2 + 120, 200, W - 80, 280);
  ctx.stroke();
}

function drawPhotoSection(ctx, photo) {
  const px = 120;
  const py = 200;
  const pw = W - 240;
  const ph = 520;

  ctx.save();
  roundRect(ctx, px, py, pw, ph, 32);
  ctx.clip();

  const g = createLinearGradient(ctx, px, py, px + pw, py + ph, [
    [0, BRAND.teal],
    [1, BRAND.tealLight],
  ]);
  ctx.fillStyle = g;
  ctx.fillRect(px, py, pw, ph);
  drawImageCover(ctx, photo, px, py, pw, ph);
  ctx.restore();

  ctx.strokeStyle = BRAND.coral;
  ctx.lineWidth = 8;
  roundRect(ctx, px, py, pw, ph, 32);
  ctx.stroke();

  ctx.fillStyle = BRAND.magenta;
  ctx.font = '800 20px Outfit, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('BUILDER', W / 2, py + ph + 36);
}

function drawInfoSection(ctx, { name, stack, title }) {
  const displayName = (name || 'Anonymous Builder').toUpperCase();
  const displayStack = stack || 'Full-Stack Dreamer';

  ctx.textAlign = 'center';

  ctx.fillStyle = BRAND.teal;
  ctx.font = '800 64px Syne, sans-serif';
  const nameY = 820;
  if (ctx.measureText(displayName).width > W - 160) {
    ctx.font = '800 48px Syne, sans-serif';
  }
  wrapText(ctx, displayName, W / 2, nameY, W - 160, 58);

  ctx.fillStyle = BRAND.coral;
  ctx.font = '600 32px Outfit, sans-serif';
  ctx.fillText(displayStack, W / 2, 920);

  const badgeW = Math.min(W - 120, ctx.measureText(title).width + 80);
  const badgeX = (W - badgeW) / 2;
  const badgeY = 960;

  ctx.fillStyle = createLinearGradient(ctx, badgeX, badgeY, badgeX + badgeW, badgeY + 70, [
    [0, BRAND.gold],
    [1, BRAND.coral],
  ]);
  roundRect(ctx, badgeX, badgeY, badgeW, 70, 35);
  ctx.fill();

  ctx.fillStyle = BRAND.night;
  ctx.font = '800 28px Outfit, sans-serif';
  ctx.fillText(title, W / 2, badgeY + 46);

  ctx.strokeStyle = 'rgba(10,77,78,0.2)';
  ctx.lineWidth = 2;
  ctx.setLineDash([12, 8]);
  ctx.beginPath();
  ctx.moveTo(100, 1060);
  ctx.lineTo(W - 100, 1060);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawBranding(ctx, assets) {
  if (assets.logo) {
    ctx.drawImage(assets.logo, W / 2 - 40, 1100, 80, 80);
  }

  ctx.textAlign = 'center';
  ctx.fillStyle = BRAND.teal;
  ctx.font = '800 36px Syne, sans-serif';
  ctx.fillText('HH GOA 2026', W / 2, 1220);

  ctx.font = '600 24px Outfit, sans-serif';
  ctx.fillStyle = BRAND.tealLight;
  ctx.fillText('Frame in Goa · Official Builder Badge', W / 2, 1260);
}

function drawDecorations(ctx, assets) {
  if (assets.palm) {
    ctx.globalAlpha = 0.35;
    ctx.drawImage(assets.palm, 50, H - 220, 70, 88);
    ctx.save();
    ctx.translate(W - 50, H - 220);
    ctx.scale(-1, 1);
    ctx.drawImage(assets.palm, 0, 0, 70, 88);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = BRAND.magenta;
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(80 + i * 230, 140 + (i % 2) * 20, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}

export const CARD_SIZE = { w: W, h: H };
