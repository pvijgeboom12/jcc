/**
 * Contactformulier jcc-congress.com
 * Ontvangt het formulier van de website en mailt het naar info@jcc-congress.com.
 *
 * Installeren (één keer, ingelogd met een account in Annicks Workspace):
 * 1. Ga naar https://script.google.com en kies "Nieuw project".
 * 2. Plak deze code, geef het project de naam "Contactformulier jcc-congress.com" en sla op.
 * 3. Implementeren > Nieuwe implementatie > type "Web-app".
 *    Uitvoeren als: ik. Wie heeft toegang: iedereen.
 * 4. Geef toestemming als Google erom vraagt (versturen van mail namens jou).
 * 5. Kopieer de URL die eindigt op /exec en geef die aan Pieter.
 *
 * Er wordt niets opgeslagen: het script stuurt alleen een mail door.
 */

var ONTVANGER = 'info@jcc-congress.com';
var MAX_LENGTE = 5000;

function doPost(e) {
  var p = (e && e.parameter) || {};

  // Spamval: dit veld is onzichtbaar voor mensen. Is het ingevuld, dan doen we alsof het gelukt is.
  if (p.website) return antwoord(true);

  var naam = schoon(p.naam, 200);
  var email = schoon(p.email, 200);
  var organisatie = schoon(p.organisatie, 200);
  var bericht = schoon(p.bericht, MAX_LENGTE);
  var pagina = schoon(p.pagina, 300);

  if (!naam || !bericht || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return antwoord(false);

  // Eenvoudige rem: maximaal 20 berichten per uur
  var cache = CacheService.getScriptCache();
  var teller = Number(cache.get('teller') || 0);
  if (teller >= 20) return antwoord(false);
  cache.put('teller', String(teller + 1), 3600);

  var tekst =
    'Naam: ' + naam + '\n' +
    'E-mail: ' + email + '\n' +
    'Organisatie: ' + (organisatie || '-') + '\n' +
    'Verstuurd vanaf: ' + (pagina || '-') + '\n\n' +
    bericht;

  MailApp.sendEmail({
    to: ONTVANGER,
    replyTo: email,
    name: 'Website jcc-congress.com',
    subject: 'Bericht via jcc-congress.com van ' + naam,
    body: tekst,
  });
  return antwoord(true);
}

function schoon(waarde, max) {
  return String(waarde || '').trim().slice(0, max);
}

function antwoord(ok) {
  return ContentService.createTextOutput(JSON.stringify({ ok: ok })).setMimeType(ContentService.MimeType.JSON);
}
