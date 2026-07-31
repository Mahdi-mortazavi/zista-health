// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Change this once you own the domain. Everything (canonical, hreflang, OG,
// sitemap, JSON-LD) derives from it.
const SITE = process.env.SITE_URL || 'https://zista.health';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'ignore',
  build: { inlineStylesheets: 'always' },
  compressHTML: true,
  i18n: {
    defaultLocale: 'fa',
    locales: ['fa', 'en'],
    routing: { prefixDefaultLocale: false, redirectToDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'fa', locales: { fa: 'fa-IR', en: 'en' } },
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
