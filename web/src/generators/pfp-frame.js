import { BRAND, createLinearGradient, drawImageCover, roundRect } from '../lib/canvas-utils.js';

const SIZE = 1080;
const FRAME = 72;
const INNER = SIZE - FRAME * 2;

export async function generatePfpFrame(photo, assets = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');

  drawBackground(ctx);
  drawPhoto(ctx, photo);
  drawFrameOverlay(ctx, assets);
  drawBranding(ctx, assets);

  return canvas;
}

function drawBackground(ctx) {
  const g = createLinearGradient(ctx, 0, 0, SIZE, SIZE, [
    [0, BRAND.night],
    [0.35, BRAND.teal],
    [0.7, '#0E6364'],
    [1, BRAND.tealLight],
  ]);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, SIZE, SIZE);

  ctx.globalAlpha = 0.12;
  for (let i = 0; i < 8; i++) {
    ctx.fillStyle = i % 2 ? BRAND.coral : BRAND.gold;
    ctx.beginPath();
    ctx.arc(120 + i * 110, 80 + (i % 3) * 40, 60 + i * 8, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawPhoto(ctx, photo) {
  const cx = SIZE / 2;
  const cy = SIZE / 2 - 20;
  const radius = INNER / 2 - 8;

  ctx.save();
  roundRect(ctx, cx - radius, cy - radius, radius * 2, radius * 2, radius);
  ctx.clip();
  drawImageCover(ctx, photo, cx - radius, cy - radius, radius * 2, radius * 2);
  ctx.restore();

  ctx.strokeStyle = BRAND.cream;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.stroke();
}

function drawFrameOverlay(ctx, assets) {
  const ringGradient = createLinearGradient(ctx, 0, 0, SIZE, SIZE, [
    [0, BRAND.coral],
    [0.3, BRAND.gold],
    [0.6, BRAND.magenta],
    [1, BRAND.coral],
  ]);

  ctx.lineWidth = FRAME - 12;
  ctx.strokeStyle = ringGradient;
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2 - 20, INNER / 2 + (FRAME - 12) / 2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 8;
  ctx.setLineDash([18, 14]);
  ctx.strokeStyle = 'rgba(255,248,240,0.35)';
  ctx.beginPath();
  ctx.arc(SIZE / 2, SIZE / 2 - 20, INNER / 2 + FRAME / 2 - 4, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  if (assets.palm) {
    ctx.globalAlpha = 0.85;
    ctx.drawImage(assets.palm, 40, SIZE - 280, 100, 125);
    ctx.save();
    ctx.translate(SIZE - 40, SIZE - 280);
    ctx.scale(-1, 1);
    ctx.drawImage(assets.palm, 0, 0, 100, 125);
    ctx.restore();
    ctx.globalAlpha = 1;
  }

  drawCornerDots(ctx);
}

function drawCornerDots(ctx) {
  const corners = [
    [FRAME + 20, FRAME + 20],
    [SIZE - FRAME - 20, FRAME + 20],
    [FRAME + 20, SIZE - FRAME - 20],
    [SIZE - FRAME - 20, SIZE - FRAME - 20],
  ];
  for (const [x, y] of corners) {
    ctx.fillStyle = BRAND.gold;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = BRAND.coral;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawBranding(ctx, assets) {
  const bannerY = SIZE - 130;

  ctx.fillStyle = 'rgba(6,47,48,0.92)';
  roundRect(ctx, 48, bannerY, SIZE - 96, 100, 24);
  ctx.fill();

  ctx.strokeStyle = BRAND.coral;
  ctx.lineWidth = 3;
  roundRect(ctx, 48, bannerY, SIZE - 96, 100, 24);
  ctx.stroke();

  if (assets.logo) {
    ctx.drawImage(assets.logo, 72, bannerY + 18, 64, 64);
  }

  ctx.textAlign = 'left';
  ctx.fillStyle = BRAND.cream;
  ctx.font = '800 52px Syne, sans-serif';
  ctx.fillText('FRAME IN GOA', 160, bannerY + 52);

  ctx.font = '600 28px Outfit, sans-serif';
  ctx.fillStyle = BRAND.gold;
  ctx.fillText('HH GOA 2026', 160, bannerY + 88);

  ctx.textAlign = 'right';
  ctx.font = '800 22px Outfit, sans-serif';
  ctx.fillStyle = BRAND.magenta;
  ctx.fillText('#FrameInGoa', SIZE - 72, bannerY + 70);

  if (assets.wave) {
    ctx.globalAlpha = 0.9;
    ctx.drawImage(assets.wave, 48, bannerY - 28, SIZE - 96, 36);
    ctx.globalAlpha = 1;
  }
}

export const PFP_SIZE = SIZE;
