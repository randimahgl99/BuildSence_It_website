import type { ReactNode } from "react";
import type { ExpertiseIconName } from "@/data/about";

// The eight expertise icons from mockup/index.html L15640-15690 as JSX. All share
// the same 24x24 stroke setup; only the geometry differs. Server Component.
const GEOMETRY: Record<ExpertiseIconName, ReactNode> = {
  pos: (
    <>
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1.5 3h2.8l2.4 12.4a2 2 0 0 0 2 1.6h10.8a2 2 0 0 0 2-1.6L23 7H5" />
    </>
  ),
  mobile: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  software: <path d="m8 5-7 7 7 7M16 5l7 7-7 7M14 3l-4 18" />,
  ai: (
    <>
      <path d="M12 18V5.5a3.5 3.5 0 0 0-6.6-1.6A4 4 0 0 0 4 11a4.5 4.5 0 0 0 2 7.8A4 4 0 0 0 12 20M12 18V5.5a3.5 3.5 0 0 1 6.6-1.6A4 4 0 0 1 20 11a4.5 4.5 0 0 1-2 7.8A4 4 0 0 1 12 20" />
      <path d="M8 8c1 .8 1.2 1.9.6 3M16 8c-1 .8-1.2 1.9-.6 3M6 15c1.5-.3 2.5.2 3 1.5M18 15c-1.5-.3-2.5.2-3 1.5" />
    </>
  ),
  data: (
    <>
      <path d="M3 3v18h18" />
      <rect x="6" y="12" width="3" height="6" rx=".6" />
      <rect x="11" y="8" width="3" height="10" rx=".6" />
      <rect x="16" y="4" width="3" height="14" rx=".6" />
    </>
  ),
  cloud: <path d="M20 18a4 4 0 0 0 .4-8 7.3 7.3 0 0 0-14.1-1.5A4.8 4.8 0 0 0 7 18Z" />,
  security: (
    <>
      <path d="m12 22 0 0C7 19.5 4 15.8 4 11V5l8-3 8 3v6c0 4.8-3 8.5-8 11Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  web: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.4 2.5 3.5 5.5 3.5 9s-1.1 6.5-3.5 9c-2.4-2.5-3.5-5.5-3.5-9S9.6 5.5 12 3Z" />
    </>
  ),
};

export function AboutExpertiseIcon({ name }: { name: ExpertiseIconName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      focusable="false"
    >
      {GEOMETRY[name]}
    </svg>
  );
}
