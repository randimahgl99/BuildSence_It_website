import Link from "next/link";
import { ONBOARDING } from "@/data/onboarding";
import { OnboardingStepIcon } from "./OnboardingIcons";
import { OnboardingReveal } from "./OnboardingReveal";

/**
 * Home "POS onboarding" (mockup `#selected-work`). Server Component; the only
 * client piece is the `OnboardingReveal` section shell that marks the section
 * ready for the line fill / header fade / number pop. `data-reveal*`
 * attributes are for the shared reveal controller (AUDIT §4.8): pill, heading,
 * intro, steps, chips, CTA copy and CTA, in the mockup's order.
 */
export function OnboardingSection() {
  return (
    <OnboardingReveal id="selected-work" className="bs-onboard" data-reveal-group="selected-work">
      <div className="container-site bs-onboard-shell">
        <div className="bs-onboard-header" data-ready-trigger="">
          <p className="bs-onboard-pill" data-reveal="eyebrow">
            {ONBOARDING.pill}
          </p>
          <h2 className="bs-section-title bs-onboard-title" data-reveal="heading">
            {ONBOARDING.title}
          </h2>
          <p className="bs-onboard-intro" data-reveal="description">
            {ONBOARDING.intro}
          </p>
        </div>

        <div className="bs-onboard-track">
          <div className="bs-onboard-line" aria-hidden="true">
            <span className="bs-onboard-line-fill" />
          </div>

          <ol className="bs-onboard-grid" aria-label={ONBOARDING.trackLabel}>
            {ONBOARDING.steps.map((step, index) => (
              <li key={step.number} className="bs-onboard-step" data-step={index + 1} data-reveal="card">
                <div className="bs-onboard-number" aria-hidden="true">
                  {step.number}
                </div>
                <div className="bs-onboard-icon" aria-hidden="true">
                  <OnboardingStepIcon name={step.icon} />
                </div>
                <h3 className="bs-onboard-step-title">{step.title}</h3>
                <p className="bs-onboard-step-copy">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>

        <ul className="bs-onboard-benefits" aria-label={ONBOARDING.benefitsLabel}>
          {ONBOARDING.benefits.map((benefit) => (
            <li key={benefit} data-reveal="card">
              {benefit}
            </li>
          ))}
        </ul>

        <div className="bs-onboard-cta-row">
          <p data-reveal="description">{ONBOARDING.cta.prompt}</p>
          <Link href={ONBOARDING.cta.href} className="cta-ref bs-onboard-cta" data-reveal="cta">
            {ONBOARDING.cta.label}
          </Link>
        </div>
      </div>
    </OnboardingReveal>
  );
}
