import Link from "next/link";
import { aboutReveal } from "@/components/motion/revealAttrs";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { POS_SHOWCASE } from "@/data/posPage";

/**
 * POS showcase "Your busiest day? Bring it on." (mockup `.pos-showcase-section`,
 * L14608). Server Component; the three card videos are LoopVideo (lazy,
 * `preload="none"`, played only while in view). The main card, the two mini
 * cards (not their grid) and the demo bar enter with the About-style reveal.
 */
export function PosShowcaseSection() {
  const [firstLine, secondLine] = POS_SHOWCASE.heading;
  const [main, ...minis] = POS_SHOWCASE.cards;

  return (
    <section className="bs-pos-showcase">
      <div className="container-site">
        <div className="bs-pos-showcase-intro">
          <h2 {...aboutReveal}>
            {firstLine}
            <br />
            {secondLine}
          </h2>
          <p {...aboutReveal}>{POS_SHOWCASE.intro}</p>
        </div>

        <div className="bs-pos-showcase-layout">
          <article className="bs-pos-card bs-pos-card-main" {...aboutReveal}>
            <div className="bs-pos-card-media">
              <LoopVideo src={main.video} poster={main.poster} className="bs-pos-card-video" />
            </div>
            <div className="bs-pos-caption">
              <strong>{main.title}</strong>
              <span>{main.copy}</span>
            </div>
          </article>

          <div className="bs-pos-card-grid">
            {minis.map((card) => (
              <article key={card.id} className="bs-pos-card bs-pos-card-mini" {...aboutReveal}>
                <div className="bs-pos-card-media">
                  <LoopVideo src={card.video} poster={card.poster} className="bs-pos-card-video" />
                </div>
                <div className="bs-pos-caption">
                  <strong>{card.title}</strong>
                  <span>{card.copy}</span>
                </div>
              </article>
            ))}
          </div>

          <div className="bs-pos-demo-bar" {...aboutReveal}>
            <div>
              <strong>{POS_SHOWCASE.demoBar.text}</strong>
            </div>
            <Link href={POS_SHOWCASE.demoBar.cta.href} className="cta-ref bs-pos-cta bs-pos-demo-cta">
              {POS_SHOWCASE.demoBar.cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
