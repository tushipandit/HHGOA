import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, '../dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
      '/share': 'http://localhost:3000',
    },
  },
});
