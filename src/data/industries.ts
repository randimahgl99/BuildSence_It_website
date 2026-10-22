// Source: mockup/index.html `industries` / `industryImages` (L16119) and
// `industryDescriptions` (L16443). Copy is verbatim. Used by the Home
// "Industries accordion" (3.5); the /industries cards (3.8) will reuse the names
// and photos but have their own copy.

export const HOME_INDUSTRIES_SECTION = {
  title: "Technology shaped around how the business actually works.",
  /** Every row's "Explore" goes to the Industries page (mockup: showPage('industries')). */
  exploreHref: "/industries",
} as const;

export type Industry = {
  id: string;
  name: string;
  description: string;
  /** Natural size of the file so next/image can reserve the right aspect ratio. */
  image: { src: string; width: number; height: number };
};

export const INDUSTRIES: readonly Industry[] = [
  {
    id: "retail",
    name: "Retail",
    description:
      "Digital solutions that simplify sales, inventory management, and everyday retail operations.",
    image: { src: "/media/industries/retail-v1.jpg", width: 602, height: 449 },
  },
  {
    id: "restaurants",
    name: "Restaurants",
    description:
      "Smart systems that streamline ordering, service management, and restaurant operations.",
    // Same file as the "POS & Retail" capability image (mockup image_005).
    image: { src: "/media/home/capabilities/pos-retail-v1.jpg", width: 736, height: 736 },
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description:
      "Reliable digital solutions that support healthcare workflows and operational efficiency.",
    image: { src: "/media/industries/healthcare-v1.jpg", width: 736, height: 736 },
  },
  {
    id: "education",
    name: "Education",
    description:
      "Modern technology that simplifies educational administration, communication, and learning workflows.",
    image: { src: "/media/industries/education-v1.jpg", width: 736, height: 736 },
  },
  {
    id: "logistics",
    name: "Logistics",
    description:
      "Connected digital tools that improve coordination, visibility, and operational management.",
    image: { src: "/media/industries/logistics-v1.jpg", width: 736, height: 736 },
  },
  {
    id: "hospitality",
    name: "Hospitality",
    description:
      "Technology that helps hospitality businesses streamline operations and deliver better guest experiences.",
    image: { src: "/media/industries/hospitality-v1.jpg", width: 735, height: 470 },
  },
];

// ---------------------------------------------------------------------------
// /industries (sub-phase 3.8). Source: mockup/index.html `#page-industries`,
// sections 01-03 (L15019-15200) and `industryCardV2Copy` (L16668). Copy is
// verbatim; media paths are the real files under public/media.
// ---------------------------------------------------------------------------

export const INDUSTRIES_HERO = {
  video: "/media/videos/industries-hero-v1.mp4",
  poster: "/media/posters/industries-hero-v2.jpg",
  /** Three block lines, as in the mockup */
  titleLines: ["Technology built", "around real operating", "environments."],
  /** Line break after the comma is hidden at <= 620px (mockup L13564) */
  subtitle: ["From restaurants to retail, BuildSense POS & Retail", "adapts to the way your business works."],
  /** Smooth-scrolls to the cards section (mockup `[data-industry-scroll]`, L16831) */
  primaryCta: { label: "Explore Industries", targetId: "industries-v2-cards" },
  secondaryCta: { label: "Explore POS & Retail", href: "/pos" },
} as const;

export const INDUSTRY_CARDS_SECTION = {
  id: "industries-v2-cards",
  title: "POS & Retail, shaped around the way each business operates.",
  intro:
    "Each environment below uses the same currently available BuildSense POS & Retail foundation, adapted around relevant transaction and operational workflows.",
  /** Every card's button goes to the POS page (mockup `data-solution="POS & Retail"`) */
  cta: { label: "Explore POS & Retail", href: "/pos" },
} as const;

/** Card copy by industry id (the names and photos come from INDUSTRIES). */
export const INDUSTRY_CARD_COPY: Record<string, string> = {
  retail:
    "Connect checkout, inventory, customers, sales and everyday store operations through one POS environment.",
  restaurants:
    "Support ordering, billing, menu transactions, payments and day-to-day restaurant sales through a connected POS environment.",
  healthcare:
    "Support billing, payments, products, services and front-desk transaction workflows from one connected system.",
  education:
    "Manage payments, billing, products, services and everyday transaction records through a structured POS environment.",
  logistics:
    "Support service billing, payments, transaction records and related operational sales workflows from one system.",
  hospitality:
    "Support billing, payments, customer transactions and product or service sales across hospitality operations.",
};

export type RealOpsIconName = "storefront" | "chart" | "pin" | "database";
export type RealOpsCardIcon = "records" | "document" | "bars" | "growth";
/** Cards 1 and 3 share the default three-bar graphic (the mockup's `-bars` class has no rules) */
export type RealOpsGraphic = "bars" | "doc" | "growth";

export const REAL_OPERATIONS = {
  id: "real-operations",
  /** The second line is accent blue and its own block */
  title: ["We design around the work happening", "behind the counter."],
  intro:
    "Different businesses may look different from the outside, but many face the same operational challenge: keeping transactions, products, customers and business information connected.",
  photo: {
    src: "/media/industries/real-operations-cafe-v1.jpg",
    width: 1600,
    height: 1066,
    alt: "Café employee operating a black iMin point-of-sale terminal",
  },
  /** Order = float-1..4 (positions and timings live in the CSS) */
  floatIcons: ["storefront", "chart", "pin", "database"] as readonly RealOpsIconName[],
  cardsLabel: "Common operational challenges",
  cards: [
    {
      number: "01",
      icon: "records",
      graphic: "bars",
      title: "Disconnected information",
      copy: "When sales, inventory and business records live in separate places, everyday work becomes slower and harder to manage.",
    },
    {
      number: "02",
      icon: "document",
      graphic: "doc",
      title: "Manual processes",
      copy: "Repeated data entry and disconnected workflows create unnecessary work for staff and increase the chance of mistakes.",
    },
    {
      number: "03",
      icon: "bars",
      graphic: "bars",
      title: "Limited visibility",
      copy: "Businesses need clear information about sales and operations without searching through multiple systems.",
    },
    {
      number: "04",
      icon: "growth",
      graphic: "growth",
      title: "Growth without rebuilding",
      copy: "A good operational system should support new products, users or locations without forcing the business to start again.",
    },
  ] as const satisfies readonly {
    number: string;
    icon: RealOpsCardIcon;
    graphic: RealOpsGraphic;
    title: string;
    copy: string;
  }[],
} as const;

// ---------------------------------------------------------------------------
// /industries sub-phase 3.9. Source: mockup/index.html `#industry-ecosystem`
// (L15203), the slideshow controller (L17011) and `#connected-operations`
// (L15323). Copy is verbatim. Slide photos are the same six files as INDUSTRIES.
// ---------------------------------------------------------------------------

export type EcosystemBenefitIcon = "foundation" | "workflows" | "management" | "growth";

export type EcosystemSlide = {
  id: string;
  name: string;
  headline: string;
  description: string;
  /** `d` of each <path> of the 24x24 stroke icon (the mockup injected the markup as a string) */
  iconPaths: readonly string[];
  /** Natural size of the file so next/image can reserve the right aspect ratio */
  image: { src: string; width: number; height: number };
  alt: string;
};

/** Slide copy by industry id; the photos come from INDUSTRIES (same ids, same order). */
const ECOSYSTEM_SLIDE_COPY = [
  {
    id: "retail",
    headline: "Connect checkout, inventory, customers and store operations.",
    description: "One connected workflow for day-to-day selling, stock control and growing store teams.",
    iconPaths: ["M6 8h12l1 13H5L6 8Z", "M9 9V6a3 3 0 0 1 6 0v3"],
  },
  {
    id: "restaurants",
    headline: "Support ordering, billing, menu transactions and daily operations.",
    description: "Bring sales, orders and counter operations into a more coordinated working environment.",
    iconPaths: ["M7 3v7M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 10v11M15 3v8c0 2 1.2 3 3 3V3M18 14v7"],
  },
  {
    id: "healthcare",
    headline: "Manage billing, payments, products and front-desk workflows.",
    description: "Help front-desk teams handle transactions while keeping essential operational records organized.",
    iconPaths: ["M9 3h6v6h6v6h-6v6H9v-6H3V9h6V3Z"],
  },
  {
    id: "education",
    headline: "Handle payments, services and everyday transactions efficiently.",
    description: "Support everyday payments and service transactions through a more consistent workflow.",
    iconPaths: ["m3 9 9-5 9 5-9 5-9-5Z", "M7 12v5c3 2 7 2 10 0v-5M21 9v6"],
  },
  {
    id: "logistics",
    headline: "Support service billing, inventory and operational sales workflows.",
    description: "Keep transaction details and stock-related activities easier to follow across your operation.",
    iconPaths: ["m4 7 8-4 8 4-8 4-8-4Z", "M4 7v10l8 4 8-4V7M12 11v10"],
  },
  {
    id: "hospitality",
    headline: "Manage reservations, payments, services and front-desk transactions.",
    description: "Connect front-desk payments and service transactions for clearer daily management.",
    iconPaths: ["M4 12h16v7H4zM4 19v2M20 19v2M6 12V7h6v5M12 12V8h5a3 3 0 0 1 3 3v1"],
  },
] as const;

const ecosystemSlides: readonly EcosystemSlide[] = ECOSYSTEM_SLIDE_COPY.map((copy) => {
  const industry = INDUSTRIES.find((entry) => entry.id === copy.id);
  if (!industry) throw new Error(`Unknown industry id: ${copy.id}`);
  return {
    ...copy,
    name: industry.name,
    image: industry.image,
    // Same alt text the mockup assigns (`<name> environment using BuildSense POS`)
    alt: `${industry.name} environment using BuildSense POS`,
  };
});

export const INDUSTRY_ECOSYSTEM = {
  id: "industry-ecosystem",
  /** Three block lines; the third is light blue */
  title: ["One POS foundation.", "Adapted around", "the business."],
  benefitsLabel: "BuildSense platform benefits",
  benefits: [
    { icon: "foundation", title: "Same reliable foundation", copy: "A consistent platform across all environments." },
    { icon: "workflows", title: "Adapted workflows", copy: "Configured for the way each business operates." },
    { icon: "management", title: "Easier management", copy: "Less complexity across multiple locations or business types." },
    { icon: "growth", title: "Ready for what's next", copy: "Supports growth without changing systems." },
  ] as const satisfies readonly { icon: EcosystemBenefitIcon; title: string; copy: string }[],
  slideshow: {
    carouselLabel: "Industries using BuildSense POS",
    statusLabel: "Slide position",
    /** Auto-advance interval (mockup `interval`) */
    intervalMs: 5000,
    /** "Learn More" goes to the POS page (mockup `data-page="pos"`) */
    cta: { label: "Learn More", href: "/pos" },
    slides: ecosystemSlides,
  },
} as const;

export type ConnectedOpsArt = "checkout" | "sales" | "inventory" | "customer" | "reporting" | "visibility";

export const CONNECTED_OPERATIONS = {
  id: "connected-operations",
  /** Three block lines (all rendered in the accent blue in the mockup) */
  title: ["Keep the important parts", "of everyday business", "connected."],
  intro:
    "BuildSense POS brings core transaction and operational information into one working environment so teams can spend less time moving between disconnected tools.",
  workflowLabel: "BuildSense connected operations workflow",
  cards: [
    { number: "01", art: "checkout", title: "Checkout" },
    { number: "02", art: "sales", title: "Sales Record" },
    { number: "03", art: "inventory", title: "Inventory" },
    { number: "04", art: "customer", title: "Customer Information" },
    { number: "05", art: "reporting", title: "Reporting" },
    { number: "06", art: "visibility", title: "Business Visibility" },
  ] as const satisfies readonly { number: string; art: ConnectedOpsArt; title: string }[],
} as const;
