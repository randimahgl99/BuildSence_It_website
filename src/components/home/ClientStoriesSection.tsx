import { TestimonialMarquee } from "@/components/ui/TestimonialMarquee";
import {
  CLIENT_STORIES_FALLBACK,
  CLIENT_STORIES_SECTION,
  getDisplayTestimonials,
  getStoryRepetitions,
} from "@/data/testimonials";

/**
 * Home "Client stories" (mockup `#client-stories`). Server Component: heading
 * plus the CSS-only testimonial marquee. `data-reveal*` attributes are for the
 * shared reveal controller (none exists yet).
 *
 * Production renders approved testimonials only (src/data/testimonials.ts); with
 * none approved it renders a static fallback card, never the draft copy.
 */
export function ClientStoriesSection() {
  const stories = getDisplayTestimonials();

  if (stories.length === 0) {
    return (
      <section
        id="client-stories"
        className="bs-stories"
        aria-labelledby="clientStoriesTitle"
        data-reveal-group="client-stories"
      >
        <div className="bs-stories-heading">
          <h2 id="clientStoriesTitle" data-reveal="heading">
            {CLIENT_STORIES_FALLBACK.title}
          </h2>
          <p data-reveal="description">{CLIENT_STORIES_FALLBACK.intro}</p>
        </div>

        <div className="bs-stories-empty" data-reveal="media">
          <article className="bs-story-card">
            <blockquote>
              <strong>{CLIENT_STORIES_FALLBACK.cardTitle}</strong>
              {CLIENT_STORIES_FALLBACK.cardText}
            </blockquote>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section
      id="client-stories"
      className="bs-stories"
      aria-labelledby="clientStoriesTitle"
      data-reveal-group="client-stories"
    >
      <div className="bs-stories-heading">
        <h2 id="clientStoriesTitle" data-reveal="heading">
          {CLIENT_STORIES_SECTION.title}
        </h2>
        <p data-reveal="description">{CLIENT_STORIES_SECTION.intro}</p>
      </div>

      <TestimonialMarquee
        stories={stories}
        repetitions={getStoryRepetitions(stories.length)}
        label={CLIENT_STORIES_SECTION.marqueeLabel}
      />
    </section>
  );
}
