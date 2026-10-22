import { aboutReveal } from "@/components/motion/revealAttrs";
import { ABOUT_STORY } from "@/data/about";

/** "Our story" (mockup `.bsa-story`, L15575): heading and three paragraphs, each its own reveal. */
export function AboutStory() {
  return (
    <section className="bs-about-section bs-about-story" aria-labelledby="bsaStoryHeading">
      <div className="bs-about-prose">
        <h2 className="bs-about-heading" id="bsaStoryHeading" {...aboutReveal}>
          {ABOUT_STORY.heading}
        </h2>
        {ABOUT_STORY.paragraphs.map((paragraph) => (
          <p key={paragraph} {...aboutReveal}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
