/**
 * Scroll-animaties met GSAP + ScrollTrigger.
 *
 * Gebruik in de markup, geen extra JS nodig:
 *   data-reveal                 → blok schuift zacht omhoog en vervaagt in beeld
 *   data-reveal-stagger         → de directe kinderen komen één voor één binnen
 *   data-parallax="40"          → beeld beweegt trager/sneller dan de scroll (px, mag negatief)
 *
 * Beweging loopt via de CSS-variabelen --reveal-y en --parallax-y op `translate` (zie global.css),
 * zodat bestaande hover-effecten op `transform` gewoon blijven werken.
 *
 * Een blok start zodra de bovenkant op 70% van het scherm staat,
 * dus als het 30% het beeld in is gescrold (REVEAL_START).
 * Reveals spelen één keer. Parallax alleen vanaf tablet, en nooit bij "minder beweging".
 * De hero valt hier bewust buiten, zodat de LCP niet verandert.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REVEAL_START = 'top 70%';
const REVEAL = { y: 40, duration: 0.9, ease: 'power3.out' };
const STAGGER = 0.12;

/** <picture> heeft display:contents en kan zelf niet bewegen; animeer dan de <img>. */
const boxOf = (el: Element) => (el.matches('picture') ? el.querySelector('img') : el) as HTMLElement | null;

function revealTargets() {
  const singles = gsap.utils.toArray<HTMLElement>('[data-reveal]');
  const groups = gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').map((g) =>
    [...g.children]
      .filter((c) => !c.matches('script, style, template'))
      .map(boxOf)
      .filter((x): x is HTMLElement => Boolean(x)),
  );
  return { singles, groups };
}

const show = (els: HTMLElement[], stagger = 0) =>
  gsap.to(els, {
    opacity: 1,
    '--reveal-y': '0px',
    duration: REVEAL.duration,
    ease: REVEAL.ease,
    stagger,
    overwrite: 'auto',
  });

const mm = gsap.matchMedia();

mm.add(
  {
    // Let op: GSAP voert dit alleen uit als minstens één voorwaarde klopt.
    // `motion` + `reduce` dekken samen elk apparaat af (ook mobiel).
    motion: '(prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
    tablet: '(min-width: 768px)',
  },
  (ctx) => {
    const { reduce, tablet } = ctx.conditions as { reduce: boolean; tablet: boolean };
    const { singles, groups } = revealTargets();
    const all = [...singles, ...groups.flat()];

    if (reduce) {
      gsap.set(all, { opacity: 1, '--reveal-y': '0px' });
      return;
    }

    const y = tablet ? REVEAL.y : 24;
    gsap.set(all, { opacity: 0, '--reveal-y': `${y}px` });

    singles.forEach((el) =>
      ScrollTrigger.create({ trigger: el, start: REVEAL_START, once: true, onEnter: () => show([el]) }),
    );

    groups.forEach((items) => {
      if (!items.length) return;
      // Per rij binnenhalen: wat tegelijk in beeld komt, krijgt een kleine vertraging
      ScrollTrigger.batch(items, {
        start: REVEAL_START,
        once: true,
        onEnter: (batch) => show(batch as HTMLElement[], STAGGER),
      });
    });

    // Vangnet: onderaan de pagina alles tonen wat nog verborgen is
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'bottom bottom+=2',
      once: true,
      onEnter: () => show(all.filter((el) => Number(gsap.getProperty(el, 'opacity')) < 1), 0.06),
    });

    if (tablet) {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const amount = Number(el.dataset.parallax) || 40;
        gsap.fromTo(
          el,
          { '--parallax-y': `${amount}px` },
          {
            '--parallax-y': `${-amount}px`,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          },
        );
      });
    }
  },
);

// Fonts en lazy beelden veranderen de hoogtes; daarna opnieuw meten
window.addEventListener('load', () => ScrollTrigger.refresh());
(window as unknown as { __motionReady: boolean }).__motionReady = true;
