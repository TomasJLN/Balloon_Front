import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function criticalCssPlugin() {
  return {
    name: 'critical-css',
    apply: 'build',
    async closeBundle() {
      const { default: Critters } = await import('critters');
      const critters = new Critters({
        path: resolve('build'),
        pruneSource: false,
        preload: 'media',
        fonts: false,
      });
      const htmlPath = resolve('build/index.html');
      const html = readFileSync(htmlPath, 'utf-8');
      const processed = await critters.process(html);
      writeFileSync(htmlPath, processed);
    },
  };
}

export default defineConfig({
  plugins: [react(), criticalCssPlugin()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
    },
  },
});
