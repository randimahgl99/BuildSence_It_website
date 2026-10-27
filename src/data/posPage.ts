// Source: mockup/index.html `#page-pos`: section 01 video hero (L14551-14568) and
// section 03 product showcase (L14608-14659). Copy is verbatim. Media paths are
// the real files under public/media (see docs/media-map.md): MP4 only, JPG posters.

export const POS_HERO = {
  video: "/media/videos/pos-hero-v1.mp4",
  poster: "/media/posters/pos-hero-v2.jpg",
  eyebrow: "BuildSense Point of Sale",
  title: "Every order. Every sale. One flow.",
  subtitle:
    "From the first tap to checkout and pickup, BuildSense POS keeps orders, payments and service moving together.",
  /** Smooth-scrolls to the power explorer (`#posPowerSection`, sub-phase 3.7) */
  primaryCta: { label: "Explore POS Features", targetId: "posPowerSection" },
  secondaryCta: { label: "Get a Demo", href: "/contact" },
} as const;

export type PosShowcaseCard = {
  id: string;
  title: string;
  copy: string;
  video: string;
  poster: string;
};

export const POS_SHOWCASE = {
  /** Heading is two lines in the mockup (`<br>`) */
  heading: ["Your busiest day?", "Bring it on."],
  intro:
    "From checkout to reporting, BuildSense POS is designed to keep the essential parts of retail connected, responsive and easy for teams to operate.",
  /** First card is the large "main" card, the other two sit side by side below it */
  cards: [
    {
      id: "speed",
      title: "Built for speed",
      copy: "Keep checkout workflows focused and responsive when the counter gets busy.",
      video: "/media/videos/pos-speed-card-v2.mp4",
      poster: "/media/posters/pos-speed-card-v1.jpg",
    },
    {
      id: "flexibility",
      title: "Built for flexibility",
      copy: "See the POS device and interface clearly from end to end without cropping the original video frame.",
      video: "/media/videos/pos-flexibility-card-v1.mp4",
      poster: "/media/posters/pos-flexibility-card-v1.jpg",
    },
    {
      id: "growth",
      title: "Built for growth",
      copy: "Preview a practical billing and order workflow while keeping the full video visible at all times.",
      video: "/media/videos/pos-growth-card-v1.mp4",
      poster: "/media/posters/pos-growth-card-v1.jpg",
    },
  ],
  demoBar: {
    text: "Get an inside look at BuildSense POS.",
    cta: { label: "Get Demo", href: "/contact" },
  },
} as const satisfies {
  heading: readonly string[];
  intro: string;
  cards: readonly PosShowcaseCard[];
  demoBar: { text: string; cta: { label: string; href: string } };
};
