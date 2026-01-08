import { defineConfig } from 'astro/config';
// import sitemap from '@astrojs/sitemap'; // Temporarily disabled due to hybrid output incompatibility
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://retirada-amianto.netlify.app', // Cambiar por tu dominio
  integrations: [],
  output: 'hybrid',
  adapter: netlify(),
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild'
    }
  }
});
