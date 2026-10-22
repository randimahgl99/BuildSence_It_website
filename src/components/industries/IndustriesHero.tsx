import Link from "next/link";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { INDUSTRIES_HERO } from "@/data/industries";
import { IndustryScrollButton } from "./IndustryScrollButton";

/**
 * Industries hero (mockup `.page-hero.industries-v2-hero`, L15022). Server
 * Component; the client pieces are LoopVideo and the "Explore Industries"
 * scroll button. `data-header-hero` makes the navbar float transparent over it
 * and removes the page's top padding.
 */
export function IndustriesHero() {
  const [subLine1, subLine2] = INDUSTRIES_HERO.subtitle;

  return (
    <section className="bs-ind-hero" data-header-hero="">
      <LoopVideo src={INDUSTRIES_HERO.video} poster={INDUSTRIES_HERO.poster} priority className="bs-ind-hero-video" />
      <div className="bs-ind-hero-overlay" aria-hidden="true" />

      <div className="bs-ind-container bs-ind-hero-inner">
        <h1 className="bs-ind-hero-title">
          {INDUSTRIES_HERO.titleLines.map((line) => (
            <span key={line} className="bs-ind-hero-line">
              {line}
            </span>
          ))}
        </h1>
        <p className="bs-ind-hero-sub">
          {subLine1}
          <br className="bs-ind-hero-sub-break" /> {subLine2}
        </p>
        <div className="bs-ind-hero-actions">
          <IndustryScrollButton
            targetId={INDUSTRIES_HERO.primaryCta.targetId}
            label={INDUSTRIES_HERO.primaryCta.label}
            className="bs-ind-hero-secondary"
          />
          <Link href={INDUSTRIES_HERO.secondaryCta.href} className="cta-ref bs-ind-hero-cta">
            {INDUSTRIES_HERO.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
