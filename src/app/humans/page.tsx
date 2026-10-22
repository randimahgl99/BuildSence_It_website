import type { Metadata } from "next";
import { HumansDirectory } from "@/components/humans/HumansDirectory";
import { AboutReveal } from "@/components/motion/AboutReveal";
import { AboutRevealFallback } from "@/components/motion/AboutRevealFallback";
import { aboutRevealAboveFold } from "@/components/motion/revealAttrs";
import { HUMANS_PAGE } from "@/data/team";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Our Team",
  description:
    "Meet the seven software developers from across Sri Lanka building thoughtful technology that makes sense at BuildSense IT.",
  path: "/humans",
});

// Humans (3.11): Georgia hero, inert "Add yourself" button, live search and the
// 3-3-1 team grid. The interactive part (search state, "last alone") is the
// client `HumansDirectory`; the hero copy is passed in as server-rendered children.
export default function HumansPage() {
  const [firstLine, secondLine] = HUMANS_PAGE.title;

  return (
    <>
      <section className="bs-humans" aria-labelledby="bsHumansHeading">
        <div className="bs-humans-shell">
          <HumansDirectory>
            <h1 id="bsHumansHeading" {...aboutRevealAboveFold}>
              {firstLine}
              <br />
              <span>{secondLine}</span>
            </h1>
            <p {...aboutRevealAboveFold}>{HUMANS_PAGE.description}</p>
          </HumansDirectory>
        </div>
      </section>
      <AboutReveal />
      <AboutRevealFallback />
    </>
  );
}
