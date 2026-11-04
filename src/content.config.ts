import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Congressen: één Markdown-bestand per congres per taal.
 *   src/content/congresses/nl/<slug>.md
 *   src/content/congresses/en/<slug>.md
 * Gebruik in beide talen dezelfde `slug`, dan werkt de taalwissel vanzelf.
 * De tekst onder de frontmatter (de "body") is de inleiding bij het programma.
 * Zie README.md voor een uitleg per veld.
 */
const congresses = defineCollection({
  // ID = pad (nl/weacademy-2027), zodat NL en EN dezelfde slug kunnen delen
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/congresses',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      lang: z.enum(['nl', 'en']),
      slug: z.string().regex(/^[a-z0-9-]+$/, 'Alleen kleine letters, cijfers en streepjes'),
      title: z.string(),
      heading: z
        .object({ text: z.string(), accent: z.string().optional() })
        .optional(),
      tile: z.object({ title: z.string(), subtitle: z.string().optional() }).optional(),
      organisation: z.string(),
      tagline: z.string().optional(),
      intro: z.string(),

      startDate: z.coerce.date(),
      endDate: z.coerce.date().optional(),
      time: z.string().optional(),

      location: z.string(),
      locationShort: z.string().optional(),
      venue: z.string().optional(),
      address: z.string().optional(),

      status: z.enum(['registratie-open', 'save-the-date', 'afgelopen']),
      draft: z.boolean().default(false),

      programme: z
        .object({
          heading: z.string().optional(),
          note: z.string().optional(),
          url: z.string().url().optional(),
          items: z
            .array(
              z.object({
                time: z.string(),
                title: z.string(),
                speaker: z.string().optional(),
                break: z.boolean().default(false),
              }),
            )
            .default([]),
        })
        .optional(),

      fees: z
        .array(
          z.object({
            category: z.string(),
            price: z.number().nullable(),
            note: z.string().optional(),
            url: z.string().optional(),
          }),
        )
        .default([]),
      feesIntro: z.string().optional(),
      feesFooter: z.string().optional(),

      accreditation: z
        .object({ title: z.string(), value: z.string(), note: z.string().optional() })
        .optional(),

      practical: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      practicalImage: image().optional(),
      practicalImageAlt: z.string().optional(),

      registrationUrl: z.string().optional(),
      contactEmail: z.string().email().default('info@jcc-congressen.nl'),
      contactHeading: z.string().optional(),
    }),
});

export const collections = { congresses };
