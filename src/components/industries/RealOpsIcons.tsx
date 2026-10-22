import type { ReactNode } from "react";
import type { RealOpsCardIcon, RealOpsIconName } from "@/data/industries";

// Inline SVG icons of "Real operations" (mockup L15084-15195), paths verbatim.
// Size, stroke and colour come from the CSS (styles/industries-realops.css).

const FLOAT_ICONS: Record<RealOpsIconName, ReactNode> = {
  storefront: <path d="M4 10h16M6 10V7l2-3h8l2 3v3M6 10v9h12v-9M9 19v-5h6v5" />,
  chart: <path d="M5 19V9m7 10V5m7 14v-7M3 19h18" />,
  pin: (
    <>
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </>
  ),
};

const CARD_ICONS: Record<RealOpsCardIcon, ReactNode> = {
  records: (
    <>
      <ellipse cx="8" cy="6" rx="4" ry="2" />
      <path d="M4 6v5c0 1.1 1.8 2 4 2s4-.9 4-2V6M4 11v5c0 1.1 1.8 2 4 2 1.3 0 2.4-.3 3.1-.8" />
      <path d="M15 8h5M15 12h5M15 16h5" />
    </>
  ),
  document: (
    <>
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h5M9 12h6M9 16h6" />
    </>
  ),
  bars: <path d="M5 19V9m5 10V5m5 14v-7m4 7V8M3 19h18" />,
  growth: (
    <>
      <path d="M5 18 10 13l3 3 6-8" />
      <path d="M15 8h4v4" />
    </>
  ),
};

export function RealOpsFloatIcon({ name }: { name: RealOpsIconName }) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {FLOAT_ICONS[name]}
    </svg>
  );
}

export function RealOpsCardIconSvg({ name }: { name: RealOpsCardIcon }) {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      {CARD_ICONS[name]}
    </svg>
  );
}
