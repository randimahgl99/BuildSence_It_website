// Source: mockup/index.html `#selected-work` (L13792-13869). Copy is verbatim,
// including "Pay Only When Satisfied." with its trailing full stop.

export type OnboardingIcon = "consultation" | "customize" | "approval";

export type OnboardingStep = {
  number: string;
  icon: OnboardingIcon;
  title: string;
  copy: string;
};

export const ONBOARDING = {
  pill: "SIMPLE POS ONBOARDING",
  title: "Plug In. Power Up. Start Selling.",
  intro:
    "Start with a quick conversation, shape the system around how your business operates, then review everything before going live.",
  trackLabel: "BuildSense POS onboarding process",
  steps: [
    {
      number: "01",
      icon: "consultation",
      title: "Free Team Consultation",
      copy: "Tell us how your business works today—your sales process, billing, inventory and the challenges you want to solve. We use that conversation to understand what your POS setup really needs.",
    },
    {
      number: "02",
      icon: "customize",
      title: "Customize Your Setup",
      copy: "We work with you to confirm the screens, modules and operating flow that make sense for your business, then prepare the system around those requirements.",
    },
    {
      number: "03",
      icon: "approval",
      title: "Pay Only When Satisfied.",
      copy: "Review the completed setup, confirm that it matches the agreed workflow, then move forward with deployment and final payment with confidence in what has been delivered.",
    },
  ] satisfies readonly OnboardingStep[],
  benefitsLabel: "BuildSense POS onboarding benefits",
  benefits: ["FREE INITIAL CONSULTATION", "WORKFLOW CONFIRMATION", "PAY AFTER FINAL APPROVAL"],
  cta: {
    prompt: "Ready to see how BuildSense POS can fit your business?",
    label: "Get a POS Demo",
    href: "/contact",
  },
} as const;
