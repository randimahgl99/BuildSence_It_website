// Source: mockup/index.html `#why-home` (L13873) and `whyImages` (L16589).
// Copy is verbatim. `name` is the sticky card's title (the mockup's
// `data-why`). The mockup's `data-visual` strings ("Architecture first", ...)
// are never read by any script, so they are not carried over.

export const WHY_SECTION = {
  title: "Software should fit the business — and survive growth.",
  /** Small caption above the sticky card's title */
  visualLabel: "BuildSense IT approach",
} as const;

export type WhyItem = {
  id: string;
  name: string;
  eyebrow: string;
  title: string;
  copy: string;
  /** Natural size of the file, so next/image can reserve the right aspect ratio. */
  image: { src: string; width: number; height: number };
};

export const WHY_ITEMS: readonly WhyItem[] = [
  {
    id: "engineering-led",
    name: "Engineering-led",
    eyebrow: "01 · ENGINEERING",
    title: "We don't just make screens.",
    copy: "Architecture, maintainability and integration are considered from the beginning.",
    image: { src: "/media/home/why/engineering-led-v1.jpg", width: 736, height: 1104 },
  },
  {
    id: "built-to-scale",
    name: "Built to scale",
    eyebrow: "02 · SCALE",
    title: "Designed for the next stage.",
    copy: "Products are structured so more users, more locations and more workflows do not force a complete rebuild.",
    image: { src: "/media/home/why/built-to-scale-v1.jpg", width: 736, height: 736 },
  },
  {
    id: "security-by-design",
    name: "Security by design",
    eyebrow: "03 · SECURITY",
    title: "Security isn't an afterthought.",
    copy: "Access, data handling, deployment and operational risks are considered as part of the system design.",
    image: { src: "/media/home/why/security-by-design-v1.jpg", width: 736, height: 736 },
  },
  {
    id: "long-term-partner",
    name: "Long-term partner",
    eyebrow: "04 · SUPPORT",
    title: "We stay after launch.",
    copy: "Monitoring, improvements, support and new capabilities can continue as the business evolves.",
    image: { src: "/media/home/why/long-term-partner-v1.jpg", width: 736, height: 1051 },
  },
];
