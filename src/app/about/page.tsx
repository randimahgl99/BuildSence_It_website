import type { Metadata } from "next";
import { AboutBeliefs } from "@/components/about/AboutBeliefs";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutNetwork } from "@/components/about/AboutNetwork";
import { AboutBlog, AboutCareers } from "@/components/about/AboutCareersBlog";
import { AboutFounders } from "@/components/about/AboutPhotoSections";
import { AboutStory } from "@/components/about/AboutStory";
import { AboutReveal } from "@/components/motion/AboutReveal";
import { AboutRevealFallback } from "@/components/motion/AboutRevealFallback";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "We create thoughtful digital solutions that simplify complex business challenges, designed around the people who use them.",
  path: "/about",
});

// About: all eight sections (3.10 Part A). The belief energy runner is Part B.
export default function AboutPage() {
  return (
    <div className="bs-about" id="bs-about">
      <AboutHero />
      <AboutStory />
      <AboutFounders />
      <AboutBeliefs />
      <AboutNetwork />
      <AboutCareers />
      <AboutBlog />
      <AboutReveal />
      <AboutRevealFallback />
    </div>
  );
}
