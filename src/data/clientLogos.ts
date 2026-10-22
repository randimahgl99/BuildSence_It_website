// Source: mockup `initHomeClientLogoMarquee` (L16270). Order, alt text and the
// per-logo class names are verbatim.

export type ClientLogo = {
  /** Also the CSS modifier: .client-logo-item--<id> (widths/heights differ per logo). */
  id: "foodhub" | "road-motors" | "kbugz";
  src: string;
  alt: string;
  /** Pixel size of the file (next/image derives the aspect ratio from it). */
  width: number;
  height: number;
  /** Largest size the logo is displayed at (see home-hero.css), for the srcset pick. */
  sizes: string;
};

export const heroClientLogos: readonly ClientLogo[] = [
  {
    id: "foodhub",
    // image_056: the chrome-finish artwork the hero uses. The stories/About
    // sections use a different (flat white) file, image_035, which is
    // `hunger-food-hub-logo-v1.png`; the two are not interchangeable.
    src: "/media/clients/hunger-food-hub-logo-marquee-v1.png",
    alt: "The Hunger Food Hub logo",
    width: 1254,
    height: 1254,
    sizes: "92px",
  },
  {
    id: "road-motors",
    src: "/media/clients/road-lanka-motors-logo-v1.png",
    // Mockup alt text; the stories section says "Road Lanka Motors" (AUDIT 7.2).
    alt: "Road Lanka Motors logo",
    width: 1536,
    height: 1024,
    sizes: "118px",
  },
  {
    id: "kbugz",
    src: "/media/clients/kbugz-logo-v1.png",
    alt: "Kbugz logo",
    width: 2048,
    height: 682,
    sizes: "229px",
  },
];

/** Six repetitions make each half comfortably wider than common desktop viewports. */
export const CLIENT_LOGO_REPETITIONS = 6;
