/** Vaste bedrijfsgegevens. Eén plek om ze aan te passen. */
export const site = {
  url: 'https://jcc-congressen.nl',
  email: 'info@jcc-congressen.nl',
  phone: '+31 (0)6 1667 1881',
  phoneHref: 'tel:+31616671881',
  // TODO: echte LinkedIn-bedrijfspagina van JCC invullen. Het ontwerp linkt naar linkedin.com.
  linkedin: 'https://www.linkedin.com/',
  kvk: '62440756',
  /**
   * Contactformulier. De site is statisch en heeft geen eigen backend.
   * Leeg = het formulier opent het mailprogramma van de bezoeker met alles
   * ingevuld (geen externe dienst, geen trackers).
   * Vul hier later een endpoint in (bijv. een Cloudflare Pages Function)
   * om berichten direct te laten versturen.
   */
  formEndpoint: '',
};
