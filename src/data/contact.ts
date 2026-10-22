/**
 * Contact / "Get Demo" page copy and form definition (mockup `#page-contact`,
 * index.html L15794-15940; AUDIT 1.8 and 7.1). Text is verbatim, including the
 * typographic apostrophes and the "—" in the first interest option.
 *
 * Validation rules, error messages and the Web3Forms submission live in
 * `@/lib/contactForm` (Phase 6).
 */

export const CONTACT_PAGE = {
  status: "AVAILABLE NOW · BUILDSENSE POS",
  title: {
    before: "See how ",
    highlight: "BuildSense POS",
    after: " can fit your business.",
  },
  description:
    "Tell us a little about your business and how you currently manage sales and everyday operations. We’ll use that information to understand your needs and prepare a more relevant BuildSense POS demo.",
  nextKicker: "WHAT HAPPENS NEXT",
  steps: [
    {
      number: "01",
      title: "We review your business",
      text: "Tell us how your current sales and operational workflow works.",
    },
    {
      number: "02",
      title: "We arrange the demo",
      text: "We’ll contact you to arrange a suitable time for a BuildSense POS walkthrough.",
    },
    {
      number: "03",
      title: "We show what fits",
      text: "We’ll focus the demo on the parts of the system that are most relevant to your business.",
    },
  ],
  formKicker: "BUILDSENSE POS DEMO",
  formIntro: "Tell us about your business so we can make the conversation relevant.",
  reassurance:
    "No commitment. We’ll first understand your requirements and arrange the most relevant next step.",
} as const;

export const CONTACT_INDUSTRIES = [
  "Retail",
  "Restaurants",
  "Healthcare",
  "Education",
  "Logistics",
  "Hospitality",
  "Other",
] as const;

export const CONTACT_INTERESTS = [
  { value: "pos-demo", label: "BuildSense POS Demo — Available Now" },
  { value: "pos-pricing", label: "POS Pricing" },
  { value: "pos-setup", label: "POS Setup / Implementation" },
  { value: "pos-multi", label: "POS for Multiple Locations" },
  { value: "general", label: "General BuildSense Enquiry" },
  { value: "future", label: "Future BuildSense Services" },
] as const;

export const CONTACT_FUTURE_NOTE =
  "Our wider technology services are currently being developed. You can still tell us which capability you’re interested in and we’ll keep your enquiry on record.";

export const CONTACT_FUTURE_CAPABILITIES = [
  "Mobile Applications",
  "Custom Software",
  "AI & Automation",
  "Data & Analytics",
  "Cloud & DevOps",
  "Cybersecurity",
  "Web Development",
] as const;

export const CONTACT_MESSAGE_PLACEHOLDER =
  "Tell us how you currently manage sales, inventory, billing or daily operations, and what you would like BuildSense POS to help with.";

/** Submit-button label by interest (mockup `updateInterestState`, L15986-15992). */
export function contactSubmitLabel(interest: string): string {
  if (interest === "general" || interest === "future") return "Send Enquiry";
  if (interest === "pos-pricing") return "Request POS Pricing";
  return "Request My Demo";
}
