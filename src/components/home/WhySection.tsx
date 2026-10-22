import { WHY_ITEMS, WHY_SECTION } from "@/data/why";
import { WhyScroller } from "./WhyScroller";

/**
 * Home "Why" section (mockup `#why-home`). Server Component; only the scroller
 * needs the client. `data-reveal*` attributes are for the shared reveal
 * controller. No ancestor of the sticky card sets `overflow` (AUDIT R5).
 */
export function WhySection() {
  return (
    <section id="why-home" className="bs-why" data-reveal-group="why-home">
      <div className="container-site">
        <h2 className="bs-section-title" data-reveal="heading">
          {WHY_SECTION.title}
        </h2>
        <WhyScroller items={WHY_ITEMS} visualLabel={WHY_SECTION.visualLabel} />
      </div>
    </section>
  );
}
