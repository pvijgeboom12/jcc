import contact from '../content/site.json';

/**
 * Vaste bedrijfsgegevens.
 * E-mail, telefoon, LinkedIn en KvK staan in src/content/site.json
 * (bewerkbaar in Pages CMS onder "Bedrijfsgegevens"). De rest is techniek.
 */
const phoneHref = `tel:${contact.phone.replace(/\(0\)/, '').replace(/[^+\d]/g, '')}`;

export const site = {
  url: 'https://jcc-congressen.nl',
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
  formEndpoint: '',
};
