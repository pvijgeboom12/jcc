// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

// Congressen met `draft: true` krijgen wel een pagina (om te bekijken),
// maar komen niet in de sitemap en krijgen noindex.
const draftSlugs = ['nl', 'en'].flatMap((lang) => {
  const dir = new URL(`./src/content/congresses/${lang}/`, import.meta.url);
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readFileSync(new URL(f, dir), 'utf8'))
    .filter((src) => /^draft:\s*true\s*$/m.test(src))
    .map((src) => src.match(/^slug:\s*["']?([\w-]+)/m)?.[1])
    .filter(Boolean);
});

export default defineConfig({
  site: 'https://jcc-congress.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'nl',
    locales: ['nl', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: { defaultLocale: 'nl', locales: { nl: 'nl-NL', en: 'en-GB' } },
      filter: (page) =>
        !draftSlugs.some((slug) => page.includes(`/${slug}/`)) &&
        !/\/(privacyverklaring|privacy)\/$/.test(page), // TODO: weghalen zodra de privacytekst er staat
    }),
  ],
});
