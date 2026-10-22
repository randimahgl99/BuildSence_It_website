import Image from "next/image";
import type { Testimonial } from "@/data/testimonials";

// Mockup `storyCard` (L16957). Drafts (development only) keep the mockup's
// five-star visual placeholder, tagged data-rating-status="unverified". Approved
// stories show stars only from a `verifiedRating`, and none without one.
const STARS_TITLE = "Visual placeholder — verify the client's actual rating before publishing";
const STARS_LABEL = "Five-star visual placeholder; customer rating not yet verified";
const STAR_SLOTS = [1, 2, 3, 4, 5] as const;

function StoryStars({ story }: { story: Testimonial }) {
  if (story.status !== "approved") {
    return (
      <div
        className="bs-story-stars"
        role="img"
        data-rating-status="unverified"
        title={STARS_TITLE}
        aria-label={STARS_LABEL}
      >
        {STAR_SLOTS.map((slot) => (
          <span key={slot} aria-hidden="true">★</span>
        ))}
      </div>
    );
  }
  const rating = story.verifiedRating;
  if (!rating) return null;
  return (
    <div
      className="bs-story-stars"
      role="img"
      data-rating-status="verified"
      aria-label={`Rated ${rating} out of 5`}
    >
      {STAR_SLOTS.map((slot) => (
        <span key={slot} aria-hidden="true" data-empty={slot > rating ? "" : undefined}>
          ★
        </span>
      ))}
    </div>
  );
}

function StoryCard({
  story,
  hidden,
  exposeLogoAlt,
}: {
  story: Testimonial;
  hidden: boolean;
  exposeLogoAlt: boolean;
}) {
  return (
    <article
      className="bs-story-card"
      data-story={story.id}
      data-story-status={story.status}
      aria-hidden={hidden ? "true" : undefined}
    >
      <StoryStars story={story} />

      <blockquote>{`“${story.quote}”`}</blockquote>

      <div className="bs-story-client">
        <div className="bs-story-logo">
          <Image
            src={story.logo.src}
            alt={exposeLogoAlt ? story.logo.alt : ""}
            width={story.logo.width}
            height={story.logo.height}
            sizes="106px"
            draggable={false}
          />
        </div>
        <div className="bs-story-client-copy">
          <strong>{story.name}</strong>
          <span>{story.industry}</span>
        </div>
      </div>
    </article>
  );
}

function StoryGroup({
  stories,
  repetitions,
  duplicate,
}: {
  stories: readonly Testimonial[];
  repetitions: number;
  duplicate: boolean;
}) {
  const cards = [];
  for (let cycle = 0; cycle < repetitions; cycle++) {
    for (const story of stories) {
      // Only the first copy of each story is exposed to assistive tech; the
      // other copies exist purely to fill the loop (the mockup repeats the full
      // card text for every copy and only blanks the logo alt).
      const hidden = duplicate || cycle > 0;
      cards.push(
        <StoryCard key={`${cycle}-${story.id}`} story={story} hidden={hidden} exposeLogoAlt={!hidden} />,
      );
    }
  }
  return (
    <div className="bs-story-group" aria-hidden={duplicate ? "true" : undefined}>
      {cards}
    </div>
  );
}

/**
 * Client-stories marquee (mockup `#clientStoriesMarqueeTrack`). Pure CSS motion,
 * so it is a Server Component: the track is two identical groups of
 * `repetitions` x stories and the keyframes slide it by exactly one group
 * (-50% -> 0, i.e. to the right) for a seamless loop. The second group is
 * aria-hidden. Pausing is CSS/MotionGate: hover and focus-within here
 * (styles/home-stories.css), off-screen and hidden-tab via MotionGate.
 */
export function TestimonialMarquee({
  stories,
  repetitions,
  label,
}: {
  stories: readonly Testimonial[];
  repetitions: number;
  label: string;
}) {
  return (
    // tabIndex: the only way for keyboard users to reach the hover/focus pause
    // (WCAG 2.2.2) and, under reduced motion, to scroll the strip.
    <div className="bs-stories-marquee" role="group" aria-label={label} tabIndex={0} data-reveal="media">
      <div className="bs-stories-track">
        <StoryGroup stories={stories} repetitions={repetitions} duplicate={false} />
        <StoryGroup stories={stories} repetitions={repetitions} duplicate />
      </div>
    </div>
  );
}
