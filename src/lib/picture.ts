import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

/**
 * Bouwt een art-directed <picture>: AVIF en WebP met JPEG-fallback,
 * aparte mobiele uitsnede (4:5) en desktopbeeld. Vaste afmetingen per bron,
 * zodat de browser vooraf ruimte reserveert (geen layout shift).
 */
export type PictureSet = {
  sources: { type: string; media?: string; srcset: string; sizes: string; width: number; height: number }[];
  fallback: { src: string; srcset: string; sizes: string; width: number; height: number };
};

const MOBILE_MEDIA = '(max-width: 699px)';
const FORMATS = [
  ['avif', 'image/avif'],
  ['webp', 'image/webp'],
] as const;

async function srcset(src: ImageMetadata, widths: number[], format: 'avif' | 'webp' | 'jpg', quality: number) {
  const usable = widths.filter((w) => w <= src.width);
  if (!usable.length || usable[usable.length - 1] < src.width) usable.push(src.width);
  const parts = await Promise.all(
    [...new Set(usable)].map(async (w) => {
      const img = await getImage({ src, width: w, format, quality });
      return { url: img.src, w };
    }),
  );
  return parts;
}

export async function buildPicture(opts: {
  desktop: ImageMetadata;
  mobile?: ImageMetadata;
  desktopWidths?: number[];
  mobileWidths?: number[];
  sizes?: string;
  mobileSizes?: string;
  quality?: number;
}): Promise<PictureSet> {
  const {
    desktop,
    mobile,
    desktopWidths = [640, 960, 1280, 1600, 2048],
    mobileWidths = [400, 600, 800, 1080],
    sizes = '100vw',
    mobileSizes = '100vw',
    quality = 62,
  } = opts;
  const sources: PictureSet['sources'] = [];
  for (const [fmt, type] of FORMATS) {
    if (mobile) {
      const m = await srcset(mobile, mobileWidths, fmt, quality);
      sources.push({
        type, media: MOBILE_MEDIA, sizes: mobileSizes,
        srcset: m.map((p) => `${p.url} ${p.w}w`).join(', '),
        width: mobile.width, height: mobile.height,
      });
    }
    const d = await srcset(desktop, desktopWidths, fmt, quality);
    sources.push({
      type, sizes, srcset: d.map((p) => `${p.url} ${p.w}w`).join(', '),
      width: desktop.width, height: desktop.height,
    });
  }
  if (mobile) {
    const mj = await srcset(mobile, mobileWidths, 'jpg', 72);
    sources.push({
      type: 'image/jpeg', media: MOBILE_MEDIA, sizes: mobileSizes,
      srcset: mj.map((p) => `${p.url} ${p.w}w`).join(', '),
      width: mobile.width, height: mobile.height,
    });
  }
  const dj = await srcset(desktop, desktopWidths, 'jpg', 72);
  const mid = dj.find((p) => p.w >= 1280) ?? dj[dj.length - 1];
  return {
    sources,
    fallback: {
      src: mid.url, srcset: dj.map((p) => `${p.url} ${p.w}w`).join(', '), sizes,
      width: desktop.width, height: desktop.height,
    },
  };
}
