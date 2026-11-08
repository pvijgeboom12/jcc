# JCC Congress Consultancy & Events — website

Website voor [jcc-congressen.nl](https://jcc-congressen.nl). Vervangt de Wix-site.
Statische Astro-site, tweetalig (NL op `/`, EN op `/en/`), gehost op Cloudflare.
Huisstijl: bordeaux #8F2748, koppen in Poppins SemiBold, tekst in Inter. Fonts zijn self-hosted.

## Lokaal draaien

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # bouwt naar dist/
npm run preview  # bekijk de build
```

Node 22.23.4 of hoger (staat in `.nvmrc` en `.node-version`).

## Een congres toevoegen

Een congres is twee bestanden: één per taal, met dezelfde `slug`.

```
src/content/congresses/nl/<slug>.md
src/content/congresses/en/<slug>.md
```

Kopieer `weacademy-2027.md` (volledig ingevuld) of `slrch2027.md` (alleen save-the-date) en pas de velden aan.
Het congresoverzicht en het blok "Op de agenda" op de homepage vullen zich automatisch en sorteren op datum.
Een congres verdwijnt van de homepage zodra de laatste dag voorbij is.

### Velden

| Veld | Verplicht | Uitleg |
|---|---|---|
| `lang` | ja | `nl` of `en` |
| `slug` | ja | Deel van de URL, bijv. `weacademy-2027`. In beide talen gelijk. |
| `title` | ja | Naam in het overzicht, bijv. `NVMKA Voorjaarscongres` |
| `heading` | nee | Kop op de congrespagina: `text` + `accent` (accent = schuin, bordeaux) |
| `tile` | nee | Tekst op de homepage-tegel: `title` + `subtitle` |
| `organisation` | ja | Organiserende vereniging, boven de kop |
| `tagline` | nee | Ondertitel onder de kop |
| `intro` | ja | Korte intro, ook gebruikt als meta-description |
| `startDate` / `endDate` | ja / nee | `2027-05-27`. Datumweergave gaat automatisch. |
| `time` | nee | Tijden voor eendaagse congressen, bijv. `08.30–16.15` |
| `location` | ja | Locatieregel in het overzicht |
| `locationShort` | nee | Kortere versie voor de homepage-tegel |
| `venue` / `address` | nee | Naam en adres in het datumblok. Zonder `venue`: "Locatie volgt". |
| `status` | ja | `registratie-open`, `save-the-date` of `afgelopen` |
| `draft` | nee | `true` = pagina bestaat maar wordt niet gelinkt of geïndexeerd |
| `registrationUrl` | nee | Link naar het registratieplatform. Zonder link geen registratieknoppen per tarief. |
| `programme` | nee | `heading`, `note`, `url` (extern programma) en `items` (tijd, titel, spreker, `break: true` voor pauzes) |
| `fees` | nee | Lijst met `category`, `price` (getal, of `null` = "Volgt"), `note`, `url` |
| `feesIntro` / `feesFooter` | nee | Tekst naast en onder de tarieven. Footer mag een link (`<a>`) bevatten. |
| `accreditation` | nee | Extra kaart bij de tarieven: `title`, `value`, `note` |
| `practical` | nee | Kaarten met praktische info: `title` + `text` |
| `practicalImage` / `practicalImageAlt` | nee | Beeld naast de praktische info, uit `src/assets/images/` |
| `contactEmail` | nee | Standaard `info@jcc-congressen.nl` |
| `contactHeading` | nee | Tekst in de contactstrook, standaard "Vragen over …?" |

De tekst onder de frontmatter is de inleiding bij het programma.

### Wanneer krijgt een congres een eigen pagina?

- `registratie-open`: pagina, gelinkt vanuit overzicht en homepage.
- `save-the-date`: alleen in het overzicht en op de homepage, nog geen pagina.
- `draft: true`: pagina wordt gebouwd maar niet gelinkt, `noindex`, niet in de sitemap. Handig om te laten zien.

## Waar staat wat

| Wat | Bestand |
|---|---|
| Kleuren, fonts, ruimtes (design tokens, volgens JCC_huisstijl.pdf nov 2026) | `src/styles/global.css` |
| Homepage-teksten NL/EN | `src/i18n/home.ts` |
| Vaste interfaceteksten | `src/i18n/ui.ts` |
| URL's per taal | `src/i18n/routes.ts` |
| E-mail, telefoon, KvK, LinkedIn, formulier | `src/lib/site.ts` |
| Logo en favicons (uit het huisstijlpakket) | `src/components/Logo.astro`, `public/brand/`, `public/favicon.*` |
| Privacyverklaring | `src/components/PrivacyPage.astro` |

## Scroll-animaties

GSAP + ScrollTrigger, gebundeld in de build (geen externe CDN) en alleen geladen op pagina's die het gebruiken.
Werkt met data-attributen, zonder extra code per pagina:

- `data-reveal`: blok schuift zacht omhoog en vervaagt in beeld.
- `data-reveal-stagger`: de directe kinderen komen één voor één binnen.
- `data-parallax="40"`: beeld beweegt met de scroll mee, in px (mag negatief). Op `ArtPicture` via `parallax={40}`.

Een blok start zodra de bovenkant op 70% van het scherm staat (30% in beeld). Instellen in `src/scripts/motion.ts`.
Reveals spelen één keer. Parallax alleen vanaf 768 px breed. Bij "minder beweging" in de systeeminstellingen staat alles direct stil in beeld.
De hero animeert bewust niet mee, zodat de LCP gelijk blijft.

## Analytics en cookies

Cloudflare Web Analytics via de handmatige beacon, met `defer` geladen zodat het de LCP niet raakt.
Het token staat in `src/lib/site.ts` (`cfAnalyticsToken`); leeg maken zet analytics uit.
De beacon wordt alleen in productiebuilds geladen. Hij zet geen cookies, dus er is geen cookiebanner nodig.
Geen Google Analytics.

## Redirects

`public/_redirects` vangt oude Wix-URL's op (`/privacy-statement` en `/sitemap.xml`).
De redirect van www naar zonder www gaat via een Cloudflare Redirect Rule op domeinniveau.

## Deploy

Cloudflare Workers-project `jcc`, gekoppeld aan deze repo.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (leest `wrangler.jsonc`, serveert `dist/`)

Elke push naar `main` gaat live.

Omdat de site statisch is, wordt "afgelopen" bepaald op het moment van bouwen.
Zet een dagelijkse rebuild aan (deploy hook + scheduled trigger), dan verdwijnen afgelopen congressen vanzelf van de homepage.

## Open punten

- Privacyverklaring: tekst aanleveren (staat nu als TODO, met `noindex`).
- WEACADEMY: link naar het registratieplatform (`registrationUrl`).
- NVMKA Najaarscongres: prijzen, registratiedatum, locatie, diner- en annuleringsinfo.
- Contactformulier: opent nu het mailprogramma van de bezoeker. Voor direct versturen een endpoint invullen in `src/lib/site.ts`.
- Bij livegang: Cloudflare Redirect Rule `www.jcc-congressen.nl/*` → `https://jcc-congressen.nl/${1}` (301), en de nieuwe sitemap indienen in Search Console.
