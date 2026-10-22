import type { Metadata } from "next";
import { AboutReveal } from "@/components/motion/AboutReveal";
import { AboutRevealFallback } from "@/components/motion/AboutRevealFallback";
import { PosConnectedSection } from "@/components/pos/PosConnectedSection";
import { PosDashboardsSection } from "@/components/pos/PosDashboardsSection";
import { PosFaqSection } from "@/components/pos/PosFaqSection";
import { PosHero } from "@/components/pos/PosHero";
import { PosPowerSection } from "@/components/pos/PosPowerSection";
import { PosShowcaseSection } from "@/components/pos/PosShowcaseSection";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Point of Sale Software",
  description:
    "BuildSense POS keeps orders, payments and service moving together, from the first tap to checkout and pickup. Explore the features and see it live.",
  path: "/pos",
});

// POS: 3.6 hero, "Connected retail" and the video showcase; 3.7 Part A power
// explorer, Part B live dashboards marquee and FAQ.
export default function PosPage() {
  return (
    <>
      <PosHero />
      <PosConnectedSection />
      <PosShowcaseSection />
      <PosPowerSection />
      <PosDashboardsSection />
      <PosFaqSection />
      <AboutReveal />
      <AboutRevealFallback />
    </>
  );
}
