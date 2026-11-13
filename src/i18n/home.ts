import type { Lang } from './routes';
import nl from '../content/home/nl.json';
import en from '../content/home/en.json';

/**
 * Homepage-teksten (v2, november 2026).
 *
 * De inhoud staat in src/content/home/nl.json en en.json en is te bewerken in
 * Pages CMS (zie .pages.yml). Hier staan alleen de vaste labels voor
 * schermlezers en het contactformulier; die horen bij de werking van de site.
 * NL op B1-niveau: korte zinnen, vaktermen kort uitgelegd.
 */
const ui = {
  nl: {
    "hero": {
      "carouselLabel": "Foto’s van congressen van JCC",
      "carouselRole": "diavoorstelling",
      "slideRole": "foto",
      "prev": "Vorige foto",
      "next": "Volgende foto",
      "pause": "Diavoorstelling pauzeren",
      "play": "Diavoorstelling afspelen"
    },
    "contact": {
      "name": "Naam",
      "email": "E-mailadres",
      "org": "Organisatie",
      "orgHint": "Bijvoorbeeld je vereniging of instituut",
      "message": "Waarmee kunnen we je helpen?",
      "messageHint": "Bijvoorbeeld het soort congres, het aantal deelnemers of de periode",
      "required": "verplicht",
      "optional": "optioneel",
      "submit": "Verstuur mijn bericht",
      "mailSubject": "Bericht via jcc-congressen.nl",
      "errors": {
        "summary": "Controleer de velden hieronder.",
        "name": "Vul je naam in.",
        "email": "Vul je e-mailadres in.",
        "emailFormat": "Vul een geldig e-mailadres in, zoals naam@voorbeeld.nl.",
        "message": "Vertel kort waarmee we je kunnen helpen."
      },
      "sentTitle": "Bijna klaar",
      "sentMailto": "Je mailprogramma opent nu met je bericht. Klik daar op verzenden. Opent er niets? Mail dan naar",
      "sentEndpoint": "Dank je wel. We hebben je bericht ontvangen en nemen contact met je op.",
      "privacy": "We gebruiken je gegevens alleen om te reageren.",
      "privacyLink": "Lees onze privacyverklaring"
    }
  },
  en: {
    "hero": {
      "carouselLabel": "Photos of congresses organised by JCC",
      "carouselRole": "slideshow",
      "slideRole": "photo",
      "prev": "Previous photo",
      "next": "Next photo",
      "pause": "Pause slideshow",
      "play": "Play slideshow"
    },
    "contact": {
      "name": "Name",
      "email": "Email address",
      "org": "Organisation",
      "orgHint": "For example your association or institute",
      "message": "How can we help?",
      "messageHint": "For example the type of congress, number of participants or timing",
      "required": "required",
      "optional": "optional",
      "submit": "Send my message",
      "mailSubject": "Message via jcc-congressen.nl",
      "errors": {
        "summary": "Please check the fields below.",
        "name": "Please enter your name.",
        "email": "Please enter your email address.",
        "emailFormat": "Please enter a valid email address, like name@example.com.",
        "message": "Please tell us briefly how we can help."
      },
      "sentTitle": "Almost done",
      "sentMailto": "Your email program is opening with your message. Click send there. Nothing opens? Email us at",
      "sentEndpoint": "Thank you. We’ve received your message and will get back to you.",
      "privacy": "We only use your details to reply.",
      "privacyLink": "Read our privacy statement"
    }
  },
} satisfies Record<Lang, unknown>;

type Content = typeof nl;
const content: Record<Lang, Content> = { nl, en };

function build(lang: Lang) {
  const c = content[lang];
  return {
    ...c,
    hero: { ...c.hero, ...ui[lang].hero },
    contact: { ...c.contact, ...ui[lang].contact },
  };
}

export const home = { nl: build('nl'), en: build('en') } satisfies Record<Lang, unknown>;
