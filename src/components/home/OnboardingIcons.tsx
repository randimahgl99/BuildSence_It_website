import type { ComponentType } from "react";
import type { OnboardingIcon } from "@/data/onboarding";

// The three step icons from mockup/index.html L13809-13846 as JSX. Stroke
// colour/width/caps are set by CSS (`.bs-onboard-icon svg`), so the markup only
// carries geometry. Server Components: no interactivity, pure SVG.

function ConsultationIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" focusable="false">
      <circle cx="24" cy="22" r="9" />
      <path d="M10 48c0-9 6-15 14-15s14 6 14 15" />
      <path d="M40 17h12a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-5l-6 6v-6h-2" />
      <path d="M46 24h5" />
    </svg>
  );
}

function CustomizeIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" focusable="false">
      <rect x="11" y="10" width="42" height="44" rx="6" />
      <path d="M20 22h24" />
      <path d="M20 32h10" />
      <path d="M36 32h8" />
      <path d="M20 42h8" />
      <path d="M34 42h10" />
      <circle cx="33" cy="32" r="3" />
      <circle cx="31" cy="42" r="3" />
    </svg>
  );
}

function ApprovalIcon() {
  return (
    <svg viewBox="0 0 64 64" fill="none" focusable="false">
      <rect x="10" y="12" width="44" height="34" rx="5" />
      <path d="M24 54h16" />
      <path d="M32 46v8" />
      {/* Drawn on hover of step 03 (stroke-dashoffset, see home-onboarding.css) */}
      <path className="bs-onboard-check" d="M23 29l6 6 13-14" />
    </svg>
  );
}

const ICONS: Record<OnboardingIcon, ComponentType> = {
  consultation: ConsultationIcon,
  customize: CustomizeIcon,
  approval: ApprovalIcon,
};

export function OnboardingStepIcon({ name }: { name: OnboardingIcon }) {
  const Icon = ICONS[name];
  return <Icon />;
}
