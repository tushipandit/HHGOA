import { defineConfig } from 'vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  publicDir: resolve(__dirname, 'public'),
  build: {
    // Merged both build blocks into one to prevent overwriting
    outDir: resolve(__dirname, '../dist'),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600, 
  },
  server: {
    port: 5173,
    strictPort: true, // Recommended: prevents Vite from switching ports if 5173 is busy
    proxy: {
      // Routes frontend /api requests to http://localhost:3000/api
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      // Routes frontend /share requests to http://localhost:3000/share
      '/share': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
