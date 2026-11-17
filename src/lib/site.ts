import contact from '../content/site.json';

/**
 * Vaste bedrijfsgegevens.
 * E-mail, telefoon, LinkedIn en KvK staan in src/content/site.json
 * (bewerkbaar in Pages CMS onder "Bedrijfsgegevens"). De rest is techniek.
 */
const phoneHref = `tel:${contact.phone.replace(/\(0\)/, '').replace(/[^+\d]/g, '')}`;

export const site = {
  url: 'https://jcc-congress.com',
  ...contact,
  phoneHref,
  /**
   * Cloudflare Web Analytics (handmatige beacon). Cookieloos, dus geen cookiebanner nodig.
   * Leeg = geen analytics. Wordt alleen in productiebuilds geladen, niet in `npm run dev`.
   */
  cfAnalyticsToken: '592e906b74214ed788e5dd64cfb41790',
  /**
   * Contactformulier. De site is statisch en heeft geen eigen backend.
   * Leeg = het formulier opent het mailprogramma van de bezoeker met alles
   * ingevuld (geen externe dienst, geen trackers).
   * Vul hier later een endpoint in (bijv. een Cloudflare Pages Function)
   * om berichten direct te laten versturen.
   */
  formEndpoint: 'https://script.google.com/macros/s/AKfycbxHPX9CGkNyJsLtyRHjXKPcUZv14lb6T3La4QI1jpUmKJrlv1bhc673GKokjzfTWksbnw/exec',
};

/**
 * Structured data (schema.org) voor de organisatie. Staat op elke pagina, in beide talen.
 * Adres en KvK zoals in de algemene voorwaarden (nov 2026).
 */
export function organizationSchema(lang: 'nl' | 'en') {
  return {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: 'JCC Congress Consultancy & Events',
    alternateName: 'JCC',
    url: lang === 'nl' ? `${site.url}/` : `${site.url}/en/`,
    logo: `${site.url}/JCC_icoon_512.png`,
    email: contact.email,
    telephone: contact.phone.replace(/\s|\(0\)/g, ''),
    sameAs: [contact.linkedin],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Sallandstraat 16-2',
      postalCode: '1079 PP',
      addressLocality: 'Amsterdam',
      addressCountry: 'NL',
    },
    identifier: { '@type': 'PropertyValue', propertyID: 'KvK', value: contact.kvk },
    description:
      lang === 'nl'
        ? 'Congresbureau voor medische en wetenschappelijke congressen, van eerste idee tot uitvoering.'
        : 'Congress bureau for medical and scientific congresses, from first idea to delivery.',
  };
}
