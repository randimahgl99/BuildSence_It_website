import Image from "next/image";
import { aboutReveal } from "@/components/motion/revealAttrs";
import { ABOUT_BELIEFS } from "@/data/about";
import { BeliefRunnerController } from "./BeliefRunnerController";

/**
 * "What we believe" (mockup `.bsa-beliefs`, L15591): four overlapping
 * browser-window cards. Server Component, no client JS.
 *
 * The energy runner (single glowing dash orbiting each card in turn, AUDIT 4.6;
 * 3.10 Part B) is driven by `BeliefRunnerController` (lib/aboutBeliefs/runner.ts)
 * through these server-rendered hooks: `[data-about="beliefs"]` is the section,
 * each card is `[data-about-belief]`, and `[data-about-runner]` is the
 * zero-geometry `<rect>` inside its `svg` (opacity 0, `preserveAspectRatio="none"`).
 * The controller sizes the rects from the card box, drives `stroke-dashoffset`,
 * and on cleanup removes everything it set so the shipped state (invisible rect)
 * is restored. Under reduced motion the rect is `display:none` (CSS) and the
 * controller starts nothing, as in the mockup.
 */
export function AboutBeliefs() {
  return (
    <section className="bs-about-section bs-about-beliefs" aria-labelledby="bsaBelieveHeading" data-about="beliefs">
      <div className="bs-about-intro" {...aboutReveal}>
        <h2 className="bs-about-heading" id="bsaBelieveHeading">
          {ABOUT_BELIEFS.heading}
        </h2>
        <p>{ABOUT_BELIEFS.intro}</p>
      </div>
      <div className="bs-about-belief-stack">
        {ABOUT_BELIEFS.cards.map((card) => (
          <article key={card.id} className="bs-about-belief" aria-label={card.title} data-about-belief="" {...aboutReveal}>
            <div className="bs-about-belief-energy" aria-hidden="true">
              <svg focusable="false" aria-hidden="true" preserveAspectRatio="none">
                <rect className="bs-about-energy-runner" data-about-runner="" />
              </svg>
            </div>
            <div className="bs-about-browserbar" aria-hidden="true">
              <span className="bs-about-browserdots">
                <i />
                <i />
                <i />
              </span>
              <span>{card.date}</span>
            </div>
            <div className="bs-about-belief-content">
              <div className="bs-about-author">
                <Image
                  className="bs-about-author-photo"
                  src={card.author.avatar}
                  width={40}
                  height={40}
                  sizes="40px"
                  alt={`Portrait of ${card.author.name}`}
                />
                <span>{card.author.name}</span>
              </div>
              <h3>{card.title}</h3>
              <p>{card.copy}</p>
            </div>
          </article>
        ))}
      </div>
      <BeliefRunnerController />
    </section>
  );
}
