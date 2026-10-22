import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { AppToaster } from "@/components/ui/AppToaster";
import { CONTACT_PAGE } from "@/data/contact";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Get a Demo",
  description:
    "Tell us about your business and how you manage sales and everyday operations, and we will prepare a relevant BuildSense POS demo.",
  path: "/contact",
});

// Contact / Get Demo (3.12): static layout. The form is the only client component
// besides the toast host (AppToaster, outside the section: Sonner positions itself fixed).
// The entrance animations (contactV2Enter / contactV2Step) are plain CSS in
// styles/contact.css, so this page ships no animation JS.
export default function ContactPage() {
  const { title } = CONTACT_PAGE;

  return (
    <>
      <section className="bs-contact-hero" aria-labelledby="bsContactHeading">
        <div className="bs-contact-bg" aria-hidden="true" />

        <div className="bs-contact-container bs-contact-shell">
          <div className="bs-contact-left">
            <div className="bs-contact-intro">
              <div className="bs-contact-status">
                <span aria-hidden="true" />
                {CONTACT_PAGE.status}
              </div>

              <h1 className="bs-contact-title" id="bsContactHeading">
                {title.before}
                <strong>{title.highlight}</strong>
                {title.after}
              </h1>

              <p className="bs-contact-sub">{CONTACT_PAGE.description}</p>
            </div>

            {/* The kicker is deliberately a <div> like the mockup: the steps' stagger
              delays are keyed to :nth-of-type among the <div> siblings (kicker = 1st).
              role=heading level 2 keeps the outline h1 > h2 > h3 without changing the markup. */}
            <div className="bs-contact-next">
              <div className="bs-contact-next-kicker" role="heading" aria-level={2}>
                {CONTACT_PAGE.nextKicker}
              </div>
              {CONTACT_PAGE.steps.map((step) => (
                <div className="bs-contact-step" key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bs-contact-panel">
            <div className="bs-contact-panel-head">
              <div className="bs-contact-panel-kicker">{CONTACT_PAGE.formKicker}</div>
              <p>{CONTACT_PAGE.formIntro}</p>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
      <AppToaster />
    </>
  );
}
