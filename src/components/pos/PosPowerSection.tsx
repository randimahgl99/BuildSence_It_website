import { aboutReveal } from "@/components/motion/revealAttrs";
import { PosPowerNav } from "@/components/pos/PosPowerNav";
import { POS_POWER } from "@/data/posFeatures";

/**
 * POS "More power. More ways to grow." (mockup `#posPowerSection`, L14672): a
 * sticky topic nav on the left and six topic cards (12/8/10/8/9/9 features) on
 * the right. Server Component; only the nav is client code (scroll-spy). The
 * heading, each topic title and each feature enter with the About-style reveal;
 * the sticky nav does not (mockup L17903).
 */
export function PosPowerSection() {
  return (
    <section className="bs-pos-power" id="posPowerSection">
      <div className="container-site">
        <div className="bs-pos-power-heading">
          <h2 {...aboutReveal}>{POS_POWER.heading}</h2>
        </div>

        <div className="bs-pos-power-layout">
          <PosPowerNav label={POS_POWER.navLabel} topics={POS_POWER.topics} />

          <div className="bs-pos-power-content">
            {POS_POWER.topics.map((topic) => (
              <section key={topic.id} className="bs-pos-power-topic" data-pos-section={topic.id}>
                <h3 {...aboutReveal}>{topic.title}</h3>
                <div className="bs-pos-power-grid">
                  {topic.features.map((feature) => (
                    <article key={feature.title} {...aboutReveal}>
                      <h4>{feature.title}</h4>
                      <p>{feature.copy}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
