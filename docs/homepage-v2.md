# Homepage v2 — wijzigingsoverzicht

Proefversie voor Annick, 5 november 2026. Branch `homepage-v2`, niet live (live gaat alleen via `main`).

## Wat er veranderd is

**Hero.** Beeldvullende congresfoto met kop "Sterke congressen. Bijzondere ontmoetingen." en de ondersteunende zin. Slideshow met vijf beelden, congresnaam per beeld, fade na 7 seconden. Pauze-, vorige- en volgende-knop, pijltjestoetsen werken op de knoppen. Geen autoplay bij "beperk beweging" en op mobiel; daar staat één beeld met handmatige navigatie. Pauzeert bij toetsenbordfocus en als de muis op de bediening staat.

**Twee hero-varianten om te vergelijken.** Full-bleed is standaard. Editorial split zie je met `?hero=split` achter de URL. De keuze wordt vóór de eerste weergave gezet, dus geen verspringen.

**Fotografie.** Selectie uit de 300 SLAAP2025-foto's: volle zaal met gekleurd licht, keynote, netwerkborrel, feest, gang, postersessie, diner, band. Plus de bestaande Milaan-foto voor het internationale verhaal. Per beeld een aparte mobiele uitsnede (4:5).

**Performance.** Eerste hero-beeld laadt direct met hoge prioriteit. Vervolgbeelden staan in een template en laden pas na het laden van de pagina, één beeld vooruit. AVIF en WebP met JPEG-fallback, responsive srcset, vaste afmetingen.

**Agenda.** Kop "Komende congressen", grotere datum en naam, status (Registratie open of Save the date), locatie en actie per kaart. De hele kaart is klikbaar. Congressen zonder eigen pagina linken naar het overzicht.

**Over JCC.** Kop behouden, kortere B1-zinnen. Merkbelofte "Rust in de organisatie, ruimte voor ontmoeting." als statement. Bewijs alleen uit eigen data: de verenigingen van de congressen op de agenda.

**Diensten.** Vier stappen met één kernzin. Details uitklapbaar onder "Wat we regelen". Abstract en accreditatie kort uitgelegd.

**Community.** Grotere kop, eigen fotografie, vier concrete onderdelen.

**Maatwerk-band.** Kop typografisch veel groter.

**Sociaal programma.** Het zwarte vlak is vervangen door een fotomozaïek met tekst ernaast in plaats van eroverheen.

**Contact.** Labels met verplicht/optioneel, hulpteksten, eigen foutmeldingen per veld, foutoverzicht bovenaan met links naar de velden, eerlijke bevestiging ("je mailprogramma opent nu"), privacyregel.

## Oorzaak zwart vlak en roze placeholders in de PDF

Die beelden laden pas bij scrollen (lazy loading). In een PDF of schermafdruk van de hele pagina zijn ze nog niet geladen. Dan zie je de achtergrondkleur: zwart bij het feest, roze bij "Waar we thuis zijn". De beelden zelf waren er wel.

## Metingen

Lighthouse 12, lokale build, vijf runs per profiel. Labmetingen, geen velddata.

| | Mobiel (gesimuleerd 4G) | Desktop |
|---|---|---|
| Performance | 96–98 | 100 |
| LCP mediaan | 2,48 s (max 2,55 s) | 0,63 s |
| CLS max | 0,001 | 0,004 |
| Totale pagina | 272 KB | 401 KB |
| Waarvan beelden | 104 KB | 233 KB |
| Lighthouse toegankelijkheid | 100 | 100 |

LCP mobiel zit op de richtwaarde van 2,5 s, niet ruim eronder. De p75 van echte bezoekers is pas na livegang te meten.

Toegankelijkheid, getest: axe-core (WCAG 2.0–2.2 A/AA) op 1440, 390 en 320 px. Eén melding, op het bestaande logo: het aria-label "…, home" wijkt af van de zichtbare tekst. Contrast hero-tekst gemeten tegen de foto onder de tekst, alle vijf beelden: wit ≥ 6,6:1, roze accentkop ≥ 4,2:1 (grote tekst, eis 3:1). Tabvolgorde logisch, slideshow volledig met toetsenbord te bedienen, aankondiging alleen bij handmatig wisselen. Geen horizontaal scrollen op 320 px en bij 200% zoom. Formulierfouten getest.

Dit is geen WCAG-audit. Niet getest: schermlezers (NVDA, VoiceOver), 400% zoom en tekstafstand.

## Wat nog ontbreekt

1. Gebruiksrechten van de SLAAP2025-foto's en naam van de fotograaf.
2. Originelen in hoge resolutie. Het gedeelde album levert maximaal 2048 px.
3. Foto's van andere congressen (NVMKA, WEAcademy, SLRCH). Nu zijn vier van de vijf slides SLAAP2025.
4. Naam van het congres in Milaan, voor het bijschrift.
5. Goedgekeurde cases of quotes voor Over JCC.
6. Herkenbare personen: toestemming voor gebruik op de homepage, met name sprekers.
7. Formulier-endpoint, zodat berichten direct verstuurd worden in plaats van via het mailprogramma.
8. Engelse teksten zijn meevertaald maar niet door een native speaker gecontroleerd.
