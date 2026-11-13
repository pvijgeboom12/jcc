export type Lang = 'nl' | 'en';

/** Paden per pagina en taal. Eén plek om URL's te wijzigen. */
export const routes = {
  home: { nl: '/', en: '/en/' },
  congresses: { nl: '/congressen/', en: '/en/congresses/' },
  privacy: { nl: '/privacyverklaring/', en: '/en/privacy/' },
  terms: { nl: '/algemene-voorwaarden/', en: '/en/terms-and-conditions/' },
} as const;

export type RouteKey = keyof typeof routes;

export function congressPath(lang: Lang, slug: string) {
  return `${routes.congresses[lang]}${slug}/`;
}

/** Pad naar dezelfde pagina in de andere taal. */
export type Alternate = { nl: string; en: string };

export function alternateFor(key: RouteKey): Alternate {
  return { nl: routes[key].nl, en: routes[key].en };
}

export function alternateForCongress(slug: string): Alternate {
  return { nl: congressPath('nl', slug), en: congressPath('en', slug) };
}
