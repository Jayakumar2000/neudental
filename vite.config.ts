import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// neudental v1 - Vite Configuration
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    // The manifest tells scripts/prerender.mjs which chunk holds each
    // lazily-loaded page, so prerendered pages can preload it. Deleted from
    // dist/ once the prerender has read it.
    build: { manifest: true },
    // Footer's copyright year in the prerendered HTML (see Footer.tsx).
    define: { __BUILD_YEAR__: JSON.stringify(new Date().getFullYear()) },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
