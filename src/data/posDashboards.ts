// Source: mockup/index.html `#page-pos` section 05 "Live dashboard marquee"
// (L14788-14949). Copy is verbatim. Images are the real files under
// public/media/pos (docs/media-map.md); width/height are their natural pixel size
// (next/image needs them to reserve the aspect ratio and size the srcset).

export type PosDashboardImage = {
  /** 1-8, matches the mockup's `data-dashboard` */
  id: number;
  src: string;
  width: number;
  height: number;
  alt: string;
};

const image = (id: number, width: number, height: number, alt: string): PosDashboardImage => ({
  id,
  src: `/media/pos/dashboard-${id}-v1.png`,
  width,
  height,
  alt,
});

export const POS_DASHBOARDS = {
  badge: "LIVE SYSTEM PREVIEWS",
  heading: "Real dashboards. Real operational visibility.",
  intro:
    "Manage sales, stock, customers and day-to-day operations together, with one connected system built around how modern retail actually works.",
  /** Row 1 drifts left (74s), row 2 drifts right (78s) */
  rows: [
    {
      id: "row-1",
      direction: "left",
      cards: [
        image(1, 1919, 1199, "Kbugz point-of-sale screen: menu items on the left and the current order with a Place Order button on the right"),
        image(2, 1903, 1003, "Road Lanka Motors parts inventory list with search, stock level, make and brand filters"),
        image(3, 1919, 1199, "Kbugz point-of-sale screen with menu categories and an order of five items totalling Rs. 5,900"),
        image(4, 1912, 1018, "Kbugz menu management table listing each item with its category, price and availability"),
      ],
    },
    {
      id: "row-2",
      direction: "right",
      cards: [
        image(5, 1915, 997, "Road Lanka Motors restocks list showing supplier deliveries with parts, units and totals"),
        image(6, 1919, 1199, "The Hunger Food Hub point-of-sale screen with menu items and the current order"),
        image(7, 1908, 1012, "Kbugz sales overview dashboard with sales, orders, a branch breakdown and an hourly sales chart"),
        image(8, 1906, 976, "Road Lanka Motors reports dashboard with revenue, profit, a sales trend chart and top-selling parts"),
      ],
    },
  ],
} as const satisfies {
  badge: string;
  heading: string;
  intro: string;
  rows: readonly { id: string; direction: "left" | "right"; cards: readonly PosDashboardImage[] }[];
};
