// Source: mockup/index.html Home hero (L13753-13775), `initVisibleHeroHeadline`
// (L16380) and `initHomeClientLogoMarquee` (L16270). Copy is verbatim.

export const HOME_HERO = {
  /** Existing files under public/media (see docs/media-map.md). No WebM exists, so MP4 only. */
  video: "/media/videos/home-hero-v1.mp4",
  poster: "/media/posters/home-hero-v2.jpg",
  /** First entry is what the server renders; the rotator cycles in order. */
  words: ["software", "POS systems", "mobile apps", "AI solutions"],
  subtitle:
    "From point-of-sale systems to custom software, mobile apps and AI technology designed for the way business works.",
  primaryCta: { label: "Get Demo", href: "/contact" },
  /**
   * The mockup switches to the POS page and smooth-scrolls to
   * `.pos-dashboard-section`, 22px below the header. The POS dashboards
   * section (sub-phase 3.7) must carry id="pos-dashboards" and
   * scroll-margin-top: calc(var(--bs-hero-header-height) + 22px).
   */
  secondaryCta: { label: "Explore Our Work", href: "/pos#pos-dashboards" },
} as const;
