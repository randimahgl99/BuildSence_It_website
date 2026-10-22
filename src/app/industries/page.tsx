import type { Metadata } from "next";
import { ConnectedOperationsSection } from "@/components/industries/ConnectedOperationsSection";
import { EcosystemSection } from "@/components/industries/EcosystemSection";
import { IndustriesFaqSection } from "@/components/industries/IndustriesFaqSection";
import { IndustriesHero } from "@/components/industries/IndustriesHero";
import { IndustryCardsSection } from "@/components/industries/IndustryCardsSection";
import { RealOperationsSection } from "@/components/industries/RealOperationsSection";
import { PremiumReveal } from "@/components/motion/PremiumReveal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "From restaurants to retail, BuildSense POS & Retail adapts to the way your business works. See how it fits each operating environment.",
  path: "/industries",
});

// Industries: hero, six industry cards, "Real operations" (3.8), then the
// ecosystem slideshow, connected operations and FAQ (3.9). PremiumReveal drives
// the scroll entrance of every data-reveal element in the sections above.
export default function IndustriesPage() {
  return (
    <>
      <IndustriesHero />
      <IndustryCardsSection />
      <RealOperationsSection />
      <EcosystemSection />
      <ConnectedOperationsSection />
      <IndustriesFaqSection />
      <PremiumReveal />
    </>
  );
}
