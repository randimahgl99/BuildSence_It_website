import type { Metadata } from "next";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ClientStoriesSection } from "@/components/home/ClientStoriesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HomeHero } from "@/components/home/HomeHero";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { WhySection } from "@/components/home/WhySection";
import { PremiumReveal } from "@/components/motion/PremiumReveal";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  description:
    "From point-of-sale systems to custom software, mobile apps and AI technology designed for the way business works.",
  path: "/",
});

// Home: 3.1 hero, 3.2 capabilities, 3.3 Why,
// 3.5 industries accordion + client stories + FAQ. PremiumReveal drives the
// scroll entrance of every data-reveal element in the sections above.
export default function Home() {
  return (
    <>
      <HomeHero />
      <CapabilitiesSection />
      <WhySection />
      <IndustriesSection />
      <ClientStoriesSection />
      <FaqSection />
      <PremiumReveal />
    </>
  );
}
