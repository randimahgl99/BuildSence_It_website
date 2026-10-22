import { aboutReveal } from "@/components/motion/revealAttrs";
import { Faq } from "@/components/ui/Faq";
import { POS_FAQS, POS_FAQ_TITLE } from "@/data/faqs";

/**
 * POS FAQ (mockup `.pos-faq-section`, L15009): five long answers, multi-open,
 * through the shared accordion. Same shell as Home's FAQ (`bs-faq-section`) plus
 * the POS differences in styles/pos-dashboards.css (overlaps the dashboards
 * section by 34px, 110px bottom padding). The title and the list enter with the
 * About-style reveal.
 */
export function PosFaqSection() {
  return (
    <section className="bs-faq-section bs-pos-faq">
      <div className="bs-faq-container">
        <h2 className="bs-faq-title" {...aboutReveal}>
          {POS_FAQ_TITLE}
        </h2>
        <Faq items={POS_FAQS} reveal />
      </div>
    </section>
  );
}
