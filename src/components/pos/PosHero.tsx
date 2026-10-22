import Link from "next/link";
import { aboutRevealAboveFold } from "@/components/motion/revealAttrs";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { POS_HERO } from "@/data/posPage";
import { PosFeatureJump } from "./PosFeatureJump";

/**
 * POS hero (mockup `.page-hero.pos-video-hero`, L14551). Server Component; the
 * client pieces are LoopVideo and the "Explore POS Features" jump button.
 * `data-header-hero` makes the navbar float transparent over it and removes the
 * page's top padding. The copy enters with the About-style reveal (rendered
 * hidden on the server, see `revealAttrs.ts`).
 */
export function PosHero() {
  return (
    <section className="bs-pos-hero" data-header-hero="">
      <LoopVideo src={POS_HERO.video} poster={POS_HERO.poster} priority className="bs-pos-hero-video" />
      <div className="bs-pos-hero-overlay" aria-hidden="true" />

      <div className="bs-pos-hero-content">
        <div className="bs-pos-hero-copy">
          <p className="bs-pos-hero-eyebrow" {...aboutRevealAboveFold}>
            {POS_HERO.eyebrow}
          </p>
          <h1 className="bs-pos-hero-title" {...aboutRevealAboveFold}>
            {POS_HERO.title}
          </h1>
          <p className="bs-pos-hero-subtitle" {...aboutRevealAboveFold}>
            {POS_HERO.subtitle}
          </p>
          <div className="bs-pos-hero-actions" {...aboutRevealAboveFold}>
            <PosFeatureJump
              targetId={POS_HERO.primaryCta.targetId}
              label={POS_HERO.primaryCta.label}
              className="cta-ref bs-pos-cta"
            />
            <Link href={POS_HERO.secondaryCta.href} className="cta-ref bs-pos-cta bs-pos-hero-secondary">
              {POS_HERO.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
