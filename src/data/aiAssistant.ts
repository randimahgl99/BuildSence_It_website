// Source: mockup/index.html `#home-ai-assistant` markup (L13890-14070). Copy is
// verbatim. The demo's per-run texts that Part B swaps in ("Analyzing...",
// "Analysis complete", "Preparing plan...", the typed question) live next to
// the controller, not here.

export const AI_ASSISTANT = {
  /** Plain-text heading. The component splits it into per-letter spans on the server. */
  title: "Smarter answers and actions built into your business workflow.",

  tabs: [
    { id: "sales", label: "Sales" },
    { id: "inventory", label: "Inventory" },
    { id: "customers", label: "Customers" },
  ] as const,
  tabsLabel: "Assistant context",
  /** The demo ends on the Inventory tab (mockup `showReducedMotionState`). */
  finalTab: "inventory",

  insights: [
    { icon: "forecast", label: "FORECAST INSIGHT", text: "Sales for selected products are trending above last week." },
    { icon: "sales", label: "SALES INSIGHT", text: "A small group of products is driving a larger share of recent sales." },
    { icon: "inventory", label: "INVENTORY INSIGHT", text: "Some fast-moving items may require restocking soon." },
  ] as const,

  question: "Which products should I restock this week?",

  analysis: {
    title: "Analyzing your business data",
    subtitle: "Reviewing relevant sales and inventory signals",
    lines: [
      "Reviewing recent sales trends",
      "Checking current stock levels",
      "Identifying fast-moving products",
      "Comparing stock with expected demand",
    ],
  },

  results: {
    label: "RESTOCK RECOMMENDATIONS",
    title: "Suggested priorities for this week",
    tableLabel: "Restock recommendations",
    columns: ["Product", "Stock", "Suggested"],
    rows: [
      ["Chicken Burger", "8", "50"],
      ["French Fries", "12", "50"],
      ["Cola 500ml", "6", "40"],
      ["Chicken Wrap", "10", "40"],
    ],
    recommendation: {
      label: "RECOMMENDED NEXT STEP",
      text: "Prepare a reorder list for the fastest-moving low-stock items.",
      /** Button label at rest; the demo ends on `actionDoneLabel`. */
      actionLabel: "Create Restock Plan",
      actionDoneLabel: "Restock Plan Ready",
    },
    confirmation: "Restock plan prepared",
  },

  input: {
    placeholder: "Ask anything about your sales, inventory or customers...",
    attachLabel: "Attach context",
    sendLabel: "Send question",
  },

  right: {
    /** Two lines; the break is part of the design. */
    titleLines: ["Ask. Analyze.", "Recommend. Act."],
    steps: [
      "Ask a question",
      "Let the assistant analyze",
      "Receive clear recommendations",
      "Take the next action",
    ],
    cta: {
      label: "Explore Our Work",
      /** Same target as the hero's "Explore Our Work" (sub-phase 3.7 adds the anchor). */
      href: "/pos#pos-dashboards",
    },
  },
} as const;
