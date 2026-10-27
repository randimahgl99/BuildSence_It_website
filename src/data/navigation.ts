// Source: mockup/index.html — navbar (L13719), mobile panel (L13735), megaData
// (L16146) and footer (L16060). Copy is verbatim.

export const SITE = {
  name: "BuildSense IT",
  tagline: "Technology that makes sense.",
  phone: { display: "+94 74 412 8283", href: "tel:+94744128283", callLabel: "Tel: +94744128283" },
  email: "buildsenseit@gmail.com",
} as const;

export type NavLink = { label: string; href: string };

/** Desktop links after the "Solutions" mega-menu trigger. */
export const NAV_LINKS: readonly NavLink[] = [
  { label: "Industries", href: "/industries" },
  { label: "BuildSense POS", href: "/pos" },
  { label: "About", href: "/about" },
];

export const DEMO_CTA: NavLink = { label: "Get Demo", href: "/contact" };

/** Mobile panel (<= 980px). "Solutions" intentionally opens /pos, as in the mockup. */
export const MOBILE_LINKS: readonly NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/pos" },
  { label: "Industries", href: "/industries" },
  { label: "BuildSense POS", href: "/pos" },
  { label: "About", href: "/about" },
];

export type MegaItem = {
  label: string;
  /** Only "POS & Retail" is live today (it gets the "Available Now" badge); the rest are muted and inert. */
  href?: string;
};
export type MegaColumn = { heading: string; items: readonly MegaItem[] };

export const SOLUTIONS_MEGA: readonly MegaColumn[] = [
  {
    heading: "Business Solutions",
    items: [{ label: "Custom Software" }, { label: "POS & Retail", href: "/pos" }],
  },
  {
    heading: "Digital Products",
    items: [{ label: "Web Development" }, { label: "Mobile Applications" }],
  },
  {
    heading: "Intelligent Systems",
    items: [{ label: "AI & Automation" }, { label: "Data & Analytics" }],
  },
  {
    heading: "Infrastructure",
    items: [{ label: "Cloud & DevOps" }, { label: "Cybersecurity" }],
  },
];

/**
 * Routes whose first section is a full-bleed hero that the navbar floats over.
 * Used only for the server-rendered initial state; the live check is the
 * `[data-header-hero]` marker on the hero section itself.
 */
export const HERO_ROUTES: readonly string[] = ["/", "/pos", "/industries"];

export type FooterLink = {
  label: string;
  href?: string; // no href => inert text (mockup: "bsf-pending")
  pendingNote?: string;
};
export type FooterColumn = { heading: string; links: readonly FooterLink[] };

export const FOOTER_COLUMNS: readonly FooterColumn[] = [
  {
    heading: "Site Map",
    links: [
      { label: "Home", href: "/" },
      { label: "Solutions", href: "/pos" },
      { label: "Industries", href: "/industries" },
      { label: "About Us", href: "/about" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "About Us", href: "/about" },
      // Section ids are added with the About / Home sections in Phase 3.
      { label: "Our Team", href: "/humans" },
      { label: "FAQs", href: "/#faq" },
    ],
  },
  {
    heading: "Utilities",
    links: [
      { label: "BuildSense POS", href: "/pos" },
      // "Case Studies" is omitted: the mockup page is an unlinked wireframe
      // placeholder (AUDIT Q4 default: remove the link).
      { label: "Documentation", pendingNote: "Documentation page has not been published" },
      { label: "Privacy Policy", pendingNote: "Privacy Policy page has not been published" },
    ],
  },
];

export type SocialLink = {
  platform: "facebook" | "instagram" | "linkedin" | "tiktok";
  label: string;
  icon: string;
  /** Intrinsic pixel size of the PNG (shown at <= 19px). */
  size: readonly [number, number];
  /** Profile URL (opens in a new tab); null renders the icon inert. */
  url: string | null;
};

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { platform: "facebook", label: "Facebook", icon: "/media/social/facebook-v1.png", size: [103, 120], url: "https://web.facebook.com/?_rdc=1&_rdr#" },
  { platform: "instagram", label: "Instagram", icon: "/media/social/instagram-v1.png", size: [120, 110], url: "https://www.instagram.com/buildsenseit?vrfl=emJvbjJmd3pmNjlo" },
  { platform: "linkedin", label: "LinkedIn", icon: "/media/social/linkedin-v1.png", size: [115, 120], url: "https://www.linkedin.com/company/buildsense-it-solutions/" },
  { platform: "tiktok", label: "TikTok", icon: "/media/social/tiktok-v2.png", size: [104, 120], url: "https://www.tiktok.com/@buildsense.it.sol?_r=1&_t=ZS-9Ai973K5vCz" },
];
