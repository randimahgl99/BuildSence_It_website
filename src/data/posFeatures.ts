// Source: mockup/index.html `#page-pos` section 02 "Connected retail"
// (L14571-14605) and section 04 "Power explorer" (below). Copy is verbatim.

export type PosConnectedItem = {
  title: string;
  copy: string;
};

export const POS_CONNECTED = {
  /** Heading is two lines in the mockup (`<br>`) */
  heading: ["Connected retail.", "The way it should be."],
  intro:
    "Manage sales, stock, customers and day-to-day operations together, with one connected system built around how modern retail actually works.",
  items: [
    {
      title: "One back office",
      copy: "See sales, products, stock and performance in one place so your team can make faster operational decisions.",
    },
    {
      title: "Unified customer profiles",
      copy: "Keep customer details, purchase history and loyalty information connected across every interaction.",
    },
    {
      title: "Real-time inventory sync",
      copy: "Keep stock levels aligned as products are sold, returned or transferred across your retail operation.",
    },
    {
      title: "Multi-location control",
      copy: "Manage branches, staff permissions, products and reporting from one connected business view.",
    },
    {
      title: "Omnichannel selling",
      copy: "Connect in-store workflows with online, mobile and future digital sales channels without fragmented systems.",
    },
    {
      title: "Reliable daily operations",
      copy: "Keep billing, inventory and reporting workflows clear and consistent during busy trading periods.",
    },
  ],
} as const satisfies {
  heading: readonly string[];
  intro: string;
  items: readonly PosConnectedItem[];
};

// ---- Power explorer (3.7): mockup `#posPowerSection` (L14672-14785). Copy is verbatim.
// The nav label of each topic equals its heading, so one `title` serves both.

export type PosPowerFeature = {
  title: string;
  copy: string;
};

export type PosPowerTopic = {
  /** Matches `data-pos-section` in the mockup */
  id: string;
  title: string;
  features: readonly PosPowerFeature[];
};

export const POS_POWER = {
  heading: "More power. More ways to grow.",
  navLabel: "POS feature categories",
  topics: [
    {
      id: "checkout",
      title: "Checkout and payments",
      features: [
        { title: "Built-in payment processing", copy: "Keep checkout and payment reconciliation connected in one streamlined workflow." },
        { title: "Fast customer checkout", copy: "Reduce steps at the counter with a checkout experience designed for busy retail teams." },
        { title: "Transparent payment records", copy: "Keep transaction details easy to review without jumping between disconnected tools." },
        { title: "Custom payment types", copy: "Record external terminal, bank transfer, cheque, or other payment methods when needed." },
        { title: "Tap-to-pay ready workflows", copy: "Support contactless payment experiences as your hardware and payment setup evolves." },
        { title: "Multi-currency support", copy: "Handle customer payments in supported local currencies while maintaining clear reporting." },
        { title: "Cancel and void payments", copy: "Correct mistakes or customer changes while keeping an auditable transaction history." },
        { title: "QR-enabled experiences", copy: "Connect products, receipts, promotions, or payment journeys to scannable QR touchpoints." },
        { title: "Discounts and promotions", copy: "Apply manual discounts or create repeatable promotion rules for qualifying sales." },
        { title: "In-store pickup", copy: "Coordinate orders that are purchased digitally and collected from a physical location." },
        { title: "Offline checkout continuity", copy: "Design operational fallbacks so essential sales workflows can keep moving through connectivity issues." },
        { title: "Split and partial payments", copy: "Support flexible payment combinations for customers and more complex transactions." },
      ],
    },
    {
      id: "customers",
      title: "Customer management",
      features: [
        { title: "Email capture at checkout", copy: "Collect customer contact details naturally during the sale when permission is provided." },
        { title: "Customer attributes", copy: "Store useful profile details that help your team understand and serve customers better." },
        { title: "Marketing opt-ins", copy: "Capture communication preferences so future outreach stays organized and consent-aware." },
        { title: "Unified customer profiles", copy: "Bring purchase activity, contact information, notes, and preferences into one customer view." },
        { title: "Customer notes", copy: "Save useful context such as preferences, special requirements, and service history." },
        { title: "Customer segmentation", copy: "Group customers using purchase behavior and profile information for more relevant engagement." },
        { title: "Purchase history", copy: "Review previous purchases to support returns, service questions, and better recommendations." },
        { title: "Email and SMS marketing", copy: "Use connected customer data to support targeted follow-up campaigns and promotions." },
      ],
    },
    {
      id: "customization",
      title: "Customization",
      features: [
        { title: "Smart register layouts", copy: "Arrange the actions your staff uses most so daily checkout workflows stay fast and clear." },
        { title: "Custom apps and integrations", copy: "Extend BuildSense POS with business-specific workflows and connected systems." },
        { title: "Branded receipts", copy: "Keep printed and digital receipts aligned with your store identity and information needs." },
        { title: "POS extensions", copy: "Add focused tools and functions without making the core checkout interface unnecessarily complex." },
        { title: "Customer-facing display", copy: "Present order details, totals, and customer prompts on a dedicated secondary display." },
        { title: "Custom data fields", copy: "Store the additional business information your products, customers, or workflows require." },
        { title: "POS editor", copy: "Control layouts and actions by staff role, store, or operational context." },
        { title: "Workflow automation", copy: "Trigger repeatable actions around sales, inventory, customers, and internal operations." },
        { title: "Easy integration", copy: "Connect existing hardware and software where practical instead of rebuilding everything around the POS." },
        { title: "Multi-entity commerce", copy: "Support separate brands, branches, catalogs, and operating entities from a connected platform." },
      ],
    },
    {
      id: "inventory",
      title: "Inventory management",
      features: [
        { title: "Real-time inventory sync", copy: "Reflect stock movement as products are sold, returned, received, or adjusted." },
        { title: "Multi-location inventory", copy: "Track stock across stores and storage locations while keeping one connected view." },
        { title: "Variant barcode scanning", copy: "Scan product variants such as size, color, or configuration accurately at the counter." },
        { title: "Stock transfers", copy: "Move inventory between locations and keep transfer status visible to the team." },
        { title: "Stock adjustments and counts", copy: "Correct discrepancies and perform cycle counts without losing the adjustment history." },
        { title: "Purchase orders", copy: "Create, track, and receive supplier orders as part of the inventory workflow." },
        { title: "Low-stock alerts", copy: "Surface products that are approaching reorder thresholds before availability becomes a problem." },
        { title: "Inventory reports", copy: "Review stock levels, movement, and product-level activity across the operation." },
      ],
    },
    {
      id: "staff",
      title: "Staff management",
      features: [
        { title: "Staff logins and PINs", copy: "Give each team member a simple, accountable way to access the register." },
        { title: "Activity audit trail", copy: "Keep a clear record of important staff actions performed through the POS." },
        { title: "Scalable staff access", copy: "Add staff accounts as the team grows without losing role and access clarity." },
        { title: "Register accountability", copy: "Associate register and shift activity with the responsible team member." },
        { title: "Quick device switching", copy: "Make it easier for staff to continue work across shared POS devices." },
        { title: "Sales attribution", copy: "Connect sales activity to staff members for performance and incentive reporting." },
        { title: "Role-based permissions", copy: "Control access to sensitive functions based on responsibilities and authority levels." },
        { title: "Manager approvals", copy: "Require manager authorization for selected actions such as discounts, refunds, or configuration changes." },
        { title: "Commission reporting", copy: "Track staff-linked sales data that can support commission and incentive programs." },
      ],
    },
    {
      id: "reporting",
      title: "Reporting and analytics",
      features: [
        { title: "Daily sales reports", copy: "Review daily sales, products, transactions, and key store activity from one report." },
        { title: "Staff performance", copy: "Understand sales and operational activity by staff member to support coaching and planning." },
        { title: "Cash tracking", copy: "Monitor drawer activity and reconcile opening, closing, and cash movements more clearly." },
        { title: "Customer insights", copy: "Use purchase frequency, value, and history to better understand customer behavior." },
        { title: "Payment reports", copy: "Review payment methods, refunds, and transaction activity with cleaner financial visibility." },
        { title: "Profit margins", copy: "Compare selling price and product cost data to understand margin performance." },
        { title: "Tax and finance reports", copy: "Generate structured sales and payment information to support accounting workflows." },
        { title: "Customer report builder", copy: "Create focused views using the customer fields and segments that matter to your operation." },
        { title: "Product performance", copy: "Identify best sellers, slower products, and sales trends by store and time period." },
      ],
    },
  ],
} as const satisfies {
  heading: string;
  navLabel: string;
  topics: readonly PosPowerTopic[];
};
