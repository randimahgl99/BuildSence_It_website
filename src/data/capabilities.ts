// Source: mockup/index.html `homeServiceVisuals` (L16322), `initHomeServices`
// (L16332) and the section markup (L13775). Copy is verbatim. Order is the
// mockup's `homeCapabilityOrder`; the stage counter reads "NN / 08".

export const CAPABILITIES_SECTION = {
  title: "Different problems. One engineering team.",
  intro: "Explore a capability to see how BuildSense IT turns it into a practical digital system.",
} as const;

export type CapabilityIconName = "mobile" | "code" | "ai" | "chart" | "cloud" | "shield" | "globe";

export type Capability = {
  id: string;
  name: string;
  /**
   * Stage tag ("Retail Technology"). The mockup renders it with the "NN / 08"
   * counter in `.stage-top`, but `#homeServiceStage .stage-top{display:none!important}`
   * hides both at every width, so the component does not render them. Kept here
   * so showing them again is a markup-only change.
   */
  tag: string;
  copy: string;
  /** Natural size of the file, so next/image can reserve the right aspect ratio. */
  image: { src: string; width: number; height: number };
  /** Only POS & Retail is live; the other cards are "Coming soon" and do not navigate. */
  href?: string;
  /** Call to action revealed on hover of a live card ("Explore BuildSense POS"). */
  cta?: string;
  /** Line icon on the "Coming soon" cards (the live card shows its photo instead). */
  icon?: CapabilityIconName;
};

export const CAPABILITIES: readonly Capability[] = [
  {
    id: "pos-retail",
    name: "POS & Retail",
    tag: "Retail Technology",
    copy: "Point-of-sale, inventory, billing and operational tools designed for modern retail businesses.",
    image: { src: "/media/home/capabilities/pos-retail-v1.jpg", width: 736, height: 736 },
    href: "/pos",
    cta: "Explore BuildSense POS",
  },
  {
    id: "mobile-applications",
    icon: "mobile",
    name: "Mobile Applications",
    tag: "Mobile Product",
    copy: "Cross-platform and native mobile experiences that connect customers, teams and operational workflows.",
    image: { src: "/media/home/capabilities/mobile-applications-v1.jpg", width: 736, height: 1104 },
  },
  {
    id: "custom-software",
    icon: "code",
    name: "Custom Software",
    tag: "Business Software",
    copy: "Purpose-built platforms shaped around the process your business actually needs to run.",
    image: { src: "/media/home/capabilities/custom-software-v1.jpg", width: 736, height: 736 },
  },
  {
    id: "ai-automation",
    icon: "ai",
    name: "AI & Automation",
    tag: "Applied AI",
    copy: "AI assistants, automation and intelligent features connected to practical, measurable workflows.",
    image: { src: "/media/home/capabilities/ai-automation-v1.jpg", width: 736, height: 1104 },
  },
  {
    id: "data-analytics",
    icon: "chart",
    name: "Data & Analytics",
    tag: "Data Systems",
    copy: "Dashboards, reporting pipelines and decision-support experiences that make business data useful.",
    image: { src: "/media/home/capabilities/data-analytics-v1.jpg", width: 736, height: 552 },
  },
  {
    id: "cloud-devops",
    icon: "cloud",
    name: "Cloud & DevOps",
    tag: "Cloud Platform",
    copy: "Reliable deployment, migration, infrastructure automation and observability for production systems.",
    image: { src: "/media/home/capabilities/cloud-devops-v1.jpg", width: 735, height: 413 },
  },
  {
    id: "cybersecurity",
    icon: "shield",
    name: "Cybersecurity",
    tag: "Secure Engineering",
    copy: "Security-aware architecture, access control, assessments and engineering hardening from design onward.",
    image: { src: "/media/home/capabilities/cybersecurity-v1.jpg", width: 736, height: 736 },
  },
  {
    id: "web-development",
    icon: "globe",
    name: "Web Development",
    tag: "Web Engineering",
    copy: "Customer-facing websites, web applications, portals and commerce experiences built for speed and scale.",
    image: { src: "/media/home/capabilities/web-development-v1.jpg", width: 736, height: 736 },
  },
];
