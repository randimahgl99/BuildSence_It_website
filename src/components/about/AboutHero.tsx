import Image from "next/image";
import { aboutRevealAboveFold } from "@/components/motion/revealAttrs";
import { ABOUT_HERO } from "@/data/about";

/**
 * About hero (mockup `.bsa-hero`, L15562). The emblem is the page's LCP image
 * (the mockup sets `fetchpriority=high`), so it is preloaded. Unlike the other
 * hero pages it carries no `data-header-hero`: the navbar stays solid and `main`
 * keeps its top padding, as in the mockup. The four copy elements are
 * server-rendered hidden for the About-style entrance (see `revealAttrs.ts`).
 */
export function AboutHero() {
  const [firstLine, secondLine] = ABOUT_HERO.title;

  return (
    <section className="bs-about-section bs-about-hero" aria-labelledby="bsaHeroHeading">
      <div className="bs-about-dotfield" aria-hidden="true" />
      <div className="bs-about-hero-inner">
        <Image
          className="bs-about-hero-logo"
          src={ABOUT_HERO.emblem.src}
          width={ABOUT_HERO.emblem.width}
          height={ABOUT_HERO.emblem.height}
          // clamp(175px, 18vw, 255px); up to 265px on phones
          sizes="(max-width: 720px) 265px, 255px"
          alt={ABOUT_HERO.emblem.alt}
          preload
          {...aboutRevealAboveFold}
        />
        <p className="bs-about-kicker" {...aboutRevealAboveFold}>
          {ABOUT_HERO.kicker}
        </p>
        <h1 className="bs-about-display" id="bsaHeroHeading" {...aboutRevealAboveFold}>
          {firstLine}
          <br />
          {secondLine}
        </h1>
        <p className="bs-about-hero-description" {...aboutRevealAboveFold}>
          {ABOUT_HERO.description}
        </p>
      </div>
    </section>
  );
}
