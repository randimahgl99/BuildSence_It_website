import type { EcosystemBenefitIcon } from "@/data/industries";

/**
 * The four 24x24 benefit icons of the ecosystem section (mockup L15215-15250).
 * Stroke colour/width/caps come from `.bs-ind-eco-benefit-icon svg` in
 * styles/industries-ecosystem.css; the shapes are copied from the mockup.
 */
export function EcosystemBenefitIconSvg({ name }: { name: EcosystemBenefitIcon }) {
  switch (name) {
    case "foundation":
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="5" cy="17" r="2.4" />
          <circle cx="12" cy="7" r="2.4" />
          <circle cx="19" cy="17" r="2.4" />
          <path d="M7 15.4 10.4 9M13.6 9 17 15.4M7.4 17h9.2" />
        </svg>
      );
    case "workflows":
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 2v3M12 19v3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M2 12h3M19 12h3M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
        </svg>
      );
    case "management":
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M4 19V10M10 19V6M16 19v-5M3 19h18" />
          <path d="m4 8 5-4 5 5 6-6" />
        </svg>
      );
    case "growth":
      return (
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="8" cy="9" r="3" />
          <circle cx="16.5" cy="10" r="2.5" />
          <path d="M2.8 20c.7-4 2.8-6 5.2-6s4.5 2 5.2 6M13 19c.5-3 2-4.6 3.9-4.6 2 0 3.5 1.5 4.1 4.6" />
        </svg>
      );
  }
}
