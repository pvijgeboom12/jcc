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
- LinkedIn: echte bedrijfspagina invullen in `src/lib/site.ts`.
- Contactformulier: opent nu het mailprogramma van de bezoeker. Voor direct versturen een endpoint invullen in `src/lib/site.ts`.
- Redirects van oude Wix-URL's: toevoegen in `public/_redirects` zodra de oude URL's bekend zijn.
