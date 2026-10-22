import { HOME_INDUSTRIES_SECTION, INDUSTRIES } from "@/data/industries";
import { IndustryAccordion } from "./IndustryAccordion";

/**
 * Home "Industries accordion" (mockup `.home-industries-accordion`). Server
 * Component; the interactive list is the client `IndustryAccordion`. `data-reveal*`
 * attributes are for the shared reveal controller (none exists yet).
 */
export function IndustriesSection() {
  return (
    <section className="section-pad bs-ind" data-reveal-group="home-industries">
      <div className="container-site">
        <h2 className="bs-section-title" data-reveal="heading">
          {HOME_INDUSTRIES_SECTION.title}
        </h2>
        <IndustryAccordion industries={INDUSTRIES} exploreHref={HOME_INDUSTRIES_SECTION.exploreHref} />
      </div>
    </section>
  );
}
