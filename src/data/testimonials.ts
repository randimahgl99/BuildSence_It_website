// Client stories: the ONE place testimonial content is managed.
//
// The three stories below (Kbugz, Road Lanka Motors, Hunger) come from
// mockup/index.html `initClientStoriesV4` (L16942). The client supplied and
// approved them (marked approved 2026-10-22), so they are `status: "approved"`.
//
// HOW PUBLISHING WORKS
//   - Only `status: "approved"` entries are ever rendered in production
//     (`next build` / `next start` / any deployment), so these three show in
//     production exactly as they do in `next dev`.
//   - `next dev` also renders drafts so a NEW story can be designed and tested
//     before it is approved. A new story added as "draft" stays hidden in
//     production until it is switched to "approved".
//   - Only if no story at all is approved does production render the fallback
//     card below (CLIENT_STORIES_FALLBACK) instead of the marquee.
//
// PRIVACY: this file ships to every visitor's browser. Never put customer
// emails, phone numbers, form-response IDs, Google Sheet links or any private
// feedback in here. Only the approved business name, industry, quote and logo.
//
// TO PUBLISH A REAL TESTIMONIAL: replace the draft entry (or add a new one)
// with `status: "approved"`, the client's verified wording, `approvedOn`, and,
// only if the client really gave one, `verifiedRating`.
//
// CSS NOTE: styles/home-stories.css tunes two logos by id (`road-lanka-motors`,
// `hunger`). Keep those ids if those clients are approved; other ids use the
// default logo sizing.

export const CLIENT_STORIES_SECTION = {
  title: "What Our Clients are Saying",
  intro:
    "Hear directly from our clients about their experiences and the results we've delivered. Explore Client Feedback",
  marqueeLabel: "Client feedback",
} as const;

/**
 * Shown in production while no testimonial is approved. Deliberately makes no
 * claim about any client (no quote, no rating, no logo).
 */
export const CLIENT_STORIES_FALLBACK = {
  title: "Client Stories",
  intro:
    "We're collecting feedback from the businesses we work with. Verified stories will appear here once our clients have approved them.",
  cardTitle: "Client stories coming soon",
  cardText:
    "Want to see BuildSense IT in action for your own business? Request a demo and we'll walk you through it.",
} as const;

/**
 * The marquee needs a group at least this many cards long to fill wide screens
 * (3 stories x 3 repetitions = 9: one group spans ~4000px on desktop).
 * Repetitions are derived from the story count, so 1 or 12 approved stories
 * still loop seamlessly.
 *
 * Keep this small: the track (two groups) is one wide moving layer.
 */
const MIN_CARDS_PER_GROUP = 9;

export function getStoryRepetitions(storyCount: number): number {
  return Math.max(1, Math.ceil(MIN_CARDS_PER_GROUP / Math.max(1, storyCount)));
}

export type TestimonialLogo = {
  src: string;
  alt: string;
  /** Natural size of the file so next/image can reserve the right aspect ratio. */
  width: number;
  height: number;
};

type TestimonialBase = {
  /** Stable kebab-case id. Used as the React key and the `data-story` hook. */
  id: string;
  /** Business name exactly as the client approved it. */
  name: string;
  industry: string;
  quote: string;
  logo: TestimonialLogo;
};

/** Not verified or not yet cleared by the client. Never rendered in production. */
export type DraftTestimonial = TestimonialBase & {
  status: "draft" | "pending";
  /** A draft cannot carry a rating: unverified ratings must not exist as data. */
  verifiedRating?: never;
};

/** Verified with the client and cleared for publication. */
export type ApprovedTestimonial = TestimonialBase & {
  status: "approved";
  /** ISO date (YYYY-MM-DD) the client approved this exact wording. */
  approvedOn: string;
  /**
   * Whole stars (1-5) the client actually gave. Leave it out if they did not:
   * the card then shows no stars at all.
   */
  verifiedRating?: 1 | 2 | 3 | 4 | 5;
};

export type Testimonial = DraftTestimonial | ApprovedTestimonial;

export const testimonials: readonly Testimonial[] = [
  {
    id: "kbugz",
    status: "approved",
    approvedOn: "2026-10-22",
    verifiedRating: 4,
    name: "Kbugz",
    industry: "Restaurant & Food Service",
    quote:
      "During dinner peaks, speed is everything. The system cut down customer wait times dramatically and made managing custom meal orders effortless for both our cashiers and kitchen crew.",
    logo: { src: "/media/clients/kbugz-logo-v1.png", alt: "Kbugz logo", width: 2048, height: 682 },
  },
  {
    id: "road-lanka-motors",
    status: "approved",
    approvedOn: "2026-10-22",
    verifiedRating: 5,
    name: "Road Lanka Motors",
    industry: "Hardware & Inventory",
    quote:
      "Hardware inventory is complex because one missing part stops work. This platform gave us exact, minute-by-minute visibility of our entire warehouse and made wholesale counter billing instant.",
    logo: {
      src: "/media/clients/road-lanka-motors-logo-v1.png",
      alt: "Road Lanka Motors logo",
      width: 1536,
      height: 1024,
    },
  },
  {
    // Names/logos are verbatim from the mockup and NOT yet unified (AUDIT Q-e):
    // "Hunger" here vs "The Hunger Food Hub" in About/hero. Set the approved
    // name when this entry is approved.
    id: "hunger",
    status: "approved",
    approvedOn: "2026-10-22",
    verifiedRating: 4,
    name: "Hunger",
    industry: "Food Service Operations",
    quote:
      "We went from chaotic receipt papers to a single, clean dashboard. Our staff learned it in an afternoon, and our end-of-day sales closing is completely automated now.",
    logo: {
      src: "/media/clients/hunger-food-hub-logo-v1.png",
      alt: "The Hunger Food Hub logo",
      width: 1254,
      height: 1254,
    },
  },
];

export function isApproved(story: Testimonial): story is ApprovedTestimonial {
  return story.status === "approved";
}

/**
 * What the Client Stories section renders. Approved stories always render, in
 * every environment. The only thing NODE_ENV decides is whether not-yet-approved
 * drafts are shown too: development shows them (so a new story can be designed),
 * production never does. `process.env.NODE_ENV` is inlined at build time.
 */
export function getDisplayTestimonials(): readonly Testimonial[] {
  if (process.env.NODE_ENV !== "production") return testimonials;
  return testimonials.filter(isApproved);
}
