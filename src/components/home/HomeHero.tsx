import Link from "next/link";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { heroClientLogos } from "@/data/clientLogos";
import { HOME_HERO } from "@/data/homeHero";
import { ClientLogoMarquee } from "./ClientLogoMarquee";
import { RotatingWord } from "./RotatingWord";

/**
 * Home hero (mockup `.home-hero.bs-home-video-hero`). Server Component; the only
 * client pieces are LoopVideo and the rotating word. `data-header-hero` makes
 * the navbar float transparent over it and removes the page's top padding.
 */
export function HomeHero() {
  return (
    <section className="bs-home-hero" data-header-hero="">
      <LoopVideo src={HOME_HERO.video} poster={HOME_HERO.poster} priority className="bs-home-hero-video" />
      <div className="bs-home-hero-overlay" aria-hidden="true" />

      <div className="bs-home-hero-grid">
        <div className="bs-home-hero-copy">
          <h1 className="bs-home-hero-title">
            We build <RotatingWord words={HOME_HERO.words} />
            <br />
            to move business forward.
          </h1>
          <p className="bs-home-hero-subtitle">{HOME_HERO.subtitle}</p>
          <div className="bs-home-hero-actions">
            <Link href={HOME_HERO.primaryCta.href} className="cta-ref">
              {HOME_HERO.primaryCta.label}
            </Link>
            <Link href={HOME_HERO.secondaryCta.href} className="bs-home-hero-secondary">
              {HOME_HERO.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>

      <ClientLogoMarquee logos={heroClientLogos} />
    </section>
  );
}
