/** Vaste bedrijfsgegevens. Eén plek om ze aan te passen. */
export const site = {
  url: 'https://jcc-congressen.nl',
  email: 'info@jcc-congressen.nl',
  phone: '+31 (0)6 1667 1881',
  phoneHref: 'tel:+31616671881',
  linkedin: 'https://www.linkedin.com/company/jcc-congress-consultancy-events/',
  kvk: '62440756',
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
