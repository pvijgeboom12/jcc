import type { Lang } from '../i18n/routes';

const monthsShort = {
  nl: ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
};
const monthsLong = {
  nl: ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};
const weekdays = {
  nl: ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
};

// Datums uit de frontmatter zijn kalenderdagen; altijd in UTC lezen.
const d = (date: Date) => ({ day: date.getUTCDate(), month: date.getUTCMonth(), year: date.getUTCFullYear(), dow: date.getUTCDay() });

function sameMonth(a: Date, b?: Date) {
  return !b || (a.getUTCMonth() === b.getUTCMonth() && a.getUTCFullYear() === b.getUTCFullYear());
}

/** "16", "27–28" (zelfde maand) of "30 jun–2 jul" */
export function dayRange(start: Date, end: Date | undefined, lang: Lang) {
  const s = d(start);
  if (!end || +end === +start) return `${s.day}`;
  const e = d(end);
  if (sameMonth(start, end)) return `${s.day}–${e.day}`;
  return `${s.day} ${monthsShort[lang][s.month]}–${e.day} ${monthsShort[lang][e.month]}`;
}

/** "jan 2027" (tegel en overzicht) */
export function monthYearShort(start: Date, end: Date | undefined, lang: Lang) {
  const e = d(end ?? start);
  return `${monthsShort[lang][e.month]} ${e.year}`;
}

/** "Januari 2027" (label in het datumblok op de congrespagina) */
export function monthYearLong(start: Date, lang: Lang) {
  const s = d(start);
  const m = monthsLong[lang][s.month];
  return `${m.charAt(0).toUpperCase()}${m.slice(1)} ${s.year}`;
}

/**
 * Volledige datumregel:
 *  1 dag  → "zaterdag 16 januari 2027" / "Saturday 16 January 2027"
 *  2 dagen → "27 & 28 mei 2027"
 *  3+ dagen → "15–17 juni 2027"
 */
export function fullDate(start: Date, end: Date | undefined, lang: Lang) {
  const s = d(start);
  if (!end || +end === +start) {
    return `${weekdays[lang][s.dow]} ${s.day} ${monthsLong[lang][s.month]} ${s.year}`;
  }
  const e = d(end);
  const days = Math.round((+end - +start) / 86400000);
  if (sameMonth(start, end)) {
    const joiner = days === 1 ? ' & ' : '–';
    return `${s.day}${joiner}${e.day} ${monthsLong[lang][e.month]} ${e.year}`;
  }
  return `${s.day} ${monthsLong[lang][s.month]} – ${e.day} ${monthsLong[lang][e.month]} ${e.year}`;
}

/** Losse dagen voor het datumblok: [{ day: 4, weekday: 'donderdag' }, ...] */
export function dayList(start: Date, end: Date | undefined, lang: Lang) {
  const out: { day: number; weekday: string }[] = [];
  const last = end ?? start;
  for (let t = +start; t <= +last; t += 86400000) {
    const x = d(new Date(t));
    out.push({ day: x.day, weekday: weekdays[lang][x.dow] });
  }
  return out;
}

export function weekday(date: Date, lang: Lang) {
  return weekdays[lang][d(date).dow];
}
