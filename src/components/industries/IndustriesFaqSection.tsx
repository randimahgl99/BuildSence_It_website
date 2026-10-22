import { Faq } from "@/components/ui/Faq";
import { INDUSTRIES_FAQS, INDUSTRIES_FAQ_TITLE } from "@/data/faqs";

/**
 * Industries FAQ (mockup `.industries-v2-faq-section`, L15494): five items,
 * single-open, through the shared accordion in its `singleOpen` mode. Same shell
 * as Home's FAQ (`bs-faq-section`) plus the Industries differences in
 * styles/industries-faq.css. Server Component; only the list is a client island.
 */
export function IndustriesFaqSection() {
  return (
    <section className="bs-faq-section bs-ind-faq" aria-labelledby="industriesFaqTitle" data-reveal-group="industries-faq">
      <div className="bs-faq-container">
        <h2 id="industriesFaqTitle" className="bs-faq-title" data-reveal="heading">
          {INDUSTRIES_FAQ_TITLE}
        </h2>
        <Faq items={INDUSTRIES_FAQS} singleOpen />
      </div>
    </section>
  );
}
