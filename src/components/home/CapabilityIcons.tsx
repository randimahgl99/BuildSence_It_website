import type { ComponentType } from "react";
import type { CapabilityIconName } from "@/data/capabilities";

// Line icons for the "Coming soon" capability cards. 24px grid, stroke colour
// and width come from CSS (.bs-cap-icon svg in styles/home-capabilities.css).

function Mobile() {
  return (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  );
}

function Code() {
  return <path d="m8.5 7.5-4.5 4.5 4.5 4.5M15.5 7.5l4.5 4.5-4.5 4.5M13.5 5.5l-3 13" />;
}

function Ai() {
  return (
    <>
      <rect x="4.5" y="7.5" width="15" height="11" rx="3" />
      <path d="M12 7.5v-3M10.5 4.5h3M2.5 12v3M21.5 12v3" />
      <circle cx="9.5" cy="13" r="1" />
      <circle cx="14.5" cy="13" r="1" />
    </>
  );
}

function Chart() {
  return <path d="M4 4.5v15h16M8.5 16v-4M12.5 16V8M16.5 16v-6" />;
}

function Cloud() {
  return <path d="M7.5 18.5h9.5a4 4 0 0 0 .6-7.96A5.5 5.5 0 0 0 6.9 9.6 4.5 4.5 0 0 0 7.5 18.5Z" />;
}

function Shield() {
  return (
    <>
      <path d="M12 3 5 5.8v5.4c0 4.4 2.9 8.1 7 9.8 4.1-1.7 7-5.4 7-9.8V5.8L12 3Z" />
      <path d="m9.2 12.2 2 2 3.8-4" />
    </>
  );
}

function Globe() {
  return (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5s1.2-6.1 3.5-8.5Z" />
    </>
  );
}

const ICONS: Record<CapabilityIconName, ComponentType> = {
  mobile: Mobile,
  code: Code,
  ai: Ai,
  chart: Chart,
  cloud: Cloud,
  shield: Shield,
  globe: Globe,
};

export function CapabilityIcon({ name }: { name: CapabilityIconName }) {
  const Icon = ICONS[name];
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
      <Icon />
    </svg>
  );
}

export function LockIcon() {
  return (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <rect x="3" y="7" width="10" height="7" rx="1.6" />
      <path d="M5.5 7V5.2a2.5 2.5 0 0 1 5 0V7" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" aria-hidden="true">
      <path d="M4 10h11.5M10.5 5l5 5-5 5" />
    </svg>
  );
}
