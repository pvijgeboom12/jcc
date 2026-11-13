import type { ImageMetadata } from 'astro';

/**
 * Beelden uit Pages CMS en de content-bestanden.
 *
 * Pages CMS slaat een beeld op als pad, bijvoorbeeld
 * "/src/assets/images/v2/slaap-feest.jpg". Hier zoeken we dat pad op tussen alle
 * beelden in src/assets/images, zodat Astro ze blijft optimaliseren
 * (AVIF/WebP, juiste maten). Oude relatieve paden zoals
 * "../../../assets/images/x.jpg" werken ook.
 */
const all = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}',
  { eager: true },
);

export function normalizeImagePath(path: string): string {
  const p = path.trim().replace(/\\/g, '/');
  const i = p.indexOf('assets/images/');
  return i === -1 ? p : `/src/${p.slice(i)}`;
}

export function img(path: string): ImageMetadata;
export function img(path: string | undefined | null): ImageMetadata | undefined;
export function img(path: string | undefined | null) {
  if (!path) return undefined;
  const key = normalizeImagePath(path);
  const found = all[key];
  if (!found) {
    throw new Error(
      `Beeld niet gevonden: "${path}". Zet het bestand in src/assets/images/ (via Pages CMS: Media) en kies het opnieuw.`,
    );
  }
  return found.default;
}

/** Eén beeldvak zoals het in de content staat. */
export interface ImageEntry {
  image: string;
  imageMobile?: string;
  alt: string;
  position?: string;
}

/** Zet een beeldvak om naar de props voor <ArtPicture>. */
export function pic(e: ImageEntry, fallbackPosition?: string) {
  return {
    desktop: img(e.image),
    mobile: img(e.imageMobile),
    alt: e.alt,
    position: e.position || fallbackPosition,
  };
}
