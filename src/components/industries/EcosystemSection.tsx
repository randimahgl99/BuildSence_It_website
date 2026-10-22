import { INDUSTRY_ECOSYSTEM } from "@/data/industries";
import { EcosystemBenefitIconSvg } from "./EcosystemIcons";
import { IndustrySlideshow } from "./IndustrySlideshow";

/**
 * Ecosystem (mockup `#industry-ecosystem`, L15203): heading, four benefit rows
 * and the crossfading featured-industry slideshow.
 *
 * Server Component. Only the slideshow is a client island (timers, observers,
 * preload gate). In the rendered mockup this section has no `.is-visible`-driven
 * entrance (its `.motion-ready` rules are dead); the copy only carries
 * `data-reveal*` attributes for the shared reveal controller (none exists yet).
 */
export function EcosystemSection() {
  const [lineOne, lineTwo, lineAccent] = INDUSTRY_ECOSYSTEM.title;

  return (
    <section
      id={INDUSTRY_ECOSYSTEM.id}
      className="bs-ind-eco"
      aria-labelledby="industryEcosystemTitle"
      data-reveal-group="industry-ecosystem"
    >
      <div className="bs-ind-container bs-ind-eco-inner">
        <div className="bs-ind-eco-main">
          <div className="bs-ind-eco-copy">
            <h2 id="industryEcosystemTitle" className="bs-ind-eco-title" data-reveal="heading">
              <span>{lineOne}</span>
              <span>{lineTwo}</span>
              <span className="bs-ind-eco-title-accent">{lineAccent}</span>
            </h2>

            <div className="bs-ind-eco-benefits" role="group" aria-label={INDUSTRY_ECOSYSTEM.benefitsLabel}>
              {INDUSTRY_ECOSYSTEM.benefits.map((benefit) => (
                <div key={benefit.title} className="bs-ind-eco-benefit" data-reveal="card">
                  <span className="bs-ind-eco-benefit-icon" aria-hidden="true">
                    <EcosystemBenefitIconSvg name={benefit.icon} />
                  </span>
                  <span className="bs-ind-eco-benefit-copy">
                    <strong>{benefit.title}</strong>
                    <span>{benefit.copy}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bs-ind-eco-visual">
            <IndustrySlideshow {...INDUSTRY_ECOSYSTEM.slideshow} />
          </div>
        </div>
      </div>
    </section>
  );
}
