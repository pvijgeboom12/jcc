import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/routes';

export type Congress = CollectionEntry<'congresses'>;

/**
 * Een congres is afgelopen als de status 'afgelopen' is, óf als de laatste dag
 * vóór de builddatum ligt. De site is statisch: een dagelijkse rebuild
 * (Cloudflare deploy hook) houdt dit actueel. Zie README.
 */
export function isPast(c: Congress, now = new Date()) {
  if (c.data.status === 'afgelopen') return true;
  const last = c.data.endDate ?? c.data.startDate;
  const endOfDay = new Date(+last + 86400000);
  return endOfDay < now;
}

/** Heeft dit congres een eigen pagina die we vanuit lijsten linken? */
export function isLinkable(c: Congress) {
  return !c.data.draft && c.data.status !== 'save-the-date';
}

export async function getCongresses(lang: Lang) {
  const all = await getCollection('congresses', (c) => c.id.startsWith(`${lang}/`)) // taal = map (nl/ of en/);
  return all.sort((a, b) => +a.data.startDate - +b.data.startDate);
}

export async function getUpcoming(lang: Lang) {
  return (await getCongresses(lang)).filter((c) => !isPast(c));
}

export async function getPast(lang: Lang) {
  return (await getCongresses(lang)).filter((c) => isPast(c)).reverse();
}

export function formatPrice(price: number | null, lang: Lang) {
  if (price === null) return lang === 'nl' ? 'Volgt' : 'To follow';
  const n = price.toLocaleString(lang === 'nl' ? 'nl-NL' : 'en-GB', {
    minimumFractionDigits: Number.isInteger(price) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return lang === 'nl' && Number.isInteger(price) ? `€ ${n},-` : `€ ${n}`;
}
