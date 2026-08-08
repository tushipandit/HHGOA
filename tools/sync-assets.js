/**
 * Sync brand assets from assets/ to web/public/assets/
 * Run before dev/build when assets are updated.
 */
import { cpSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'assets');
const dest = join(root, 'web', 'public', 'assets');

if (!existsSync(src)) {
  console.warn('No assets/ folder found');
  process.exit(0);
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log('Synced assets → web/public/assets/');
