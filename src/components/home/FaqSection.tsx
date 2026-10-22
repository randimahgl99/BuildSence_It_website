import { Faq } from "@/components/ui/Faq";
import { HOME_FAQS, HOME_FAQ_TITLE } from "@/data/faqs";

/**
 * Home FAQ (mockup `.home-faq-curve`). Server Component; only the accordion
 * list is a client component. `id="faq"` is the target of the footer's
 * "FAQs" link (`/#faq`); the mockup scrolls the section top to the top of the
 * viewport, so there is no scroll-margin.
 */
export function FaqSection() {
  return (
    <section id="faq" className="bs-faq-section" data-reveal-group="faq">
      <div className="bs-faq-container">
        <h2 className="bs-faq-title" data-reveal="heading">
          {HOME_FAQ_TITLE}
        </h2>
        <Faq items={HOME_FAQS} />
      </div>
    </section>
  );
}
