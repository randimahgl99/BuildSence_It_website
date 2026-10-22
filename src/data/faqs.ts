// Source: mockup/index.html `faqs` (L16128). Copy is verbatim.
// The Industries FAQ (3.9) is at the bottom.

export type FaqItem = {
  question: string;
  answer: string;
};

export const HOME_FAQ_TITLE = "Frequently Asked Questions";

export const HOME_FAQS: readonly FaqItem[] = [
  {
    question: "What kinds of projects does BuildSense IT take on?",
    answer:
      "Web, mobile, AI, cloud, cybersecurity, POS and custom software projects can all fit the portfolio.",
  },
  {
    question: "Do you only work with POS systems?",
    answer:
      "No. POS is one product line. The company is positioned as a broader IT solutions and software engineering partner.",
  },
  {
    question: "Can you work with an existing system?",
    // Placeholder-grade copy kept as in the mockup (AUDIT 8.3): it is written about
    // the site, not to customers. Needs a content decision before launch.
    answer:
      "Yes. The final site can present integration, modernization and extension work as engagement options.",
  },
  {
    question: "How is pricing handled?",
    answer:
      "POS can have fixed packages. Custom projects should use scoped estimates based on requirements and complexity.",
  },
];

// POS FAQ (mockup `faqs.pos`, L16133): five long answers, same title as Home.
export const POS_FAQ_TITLE = "Frequently Asked Questions";

export const POS_FAQS: readonly FaqItem[] = [
  {
    question: "What is a POS (Point of Sale) system?",
    answer:
      "A Point of Sale (POS) system is the technology a business uses to process sales, accept payments, manage orders, and support everyday store operations. BuildSense POS goes beyond basic checkout by bringing sales, products, inventory, customer information, and transaction records into one connected system. This helps businesses simplify daily operations, keep important information organized, and provide customers with a faster and smoother checkout experience.",
  },
  {
    question: "How do I choose the right POS system for my business?",
    answer:
      "The right POS system depends on how your business operates, what you sell, how many products or services you manage, and how you plan to grow. A good POS system should make everyday tasks such as processing sales, managing products, tracking inventory, handling different payment methods, and viewing reports simple and efficient. BuildSense POS is designed to be flexible, allowing businesses to use the features they need today while supporting additional requirements as their operations grow.",
  },
  {
    question: "Do I need an internet connection to use BuildSense POS?",
    answer:
      "BuildSense POS works best with a stable internet connection, especially for features that depend on real-time synchronization, cloud reporting, remote access, and certain online services. However, supported offline functionality can allow essential operations to continue during temporary internet interruptions. Once the connection is restored, relevant data can be synchronized with the main system so your business records remain updated and consistent.",
  },
  {
    question: "What is the difference between BuildSense IT and BuildSense POS?",
    answer:
      "BuildSense IT is the technology company behind a range of digital solutions for businesses, including web development, mobile applications, custom software, AI and automation, cloud solutions, cybersecurity, and business systems. BuildSense POS is one of the solutions developed specifically for managing in-person sales and everyday business operations. It focuses on areas such as checkout, products, inventory, transactions, customers, and reporting, while BuildSense IT represents the wider range of technology services and solutions offered by the company.",
  },
  {
    question: "What types of businesses can use BuildSense POS?",
    answer:
      "BuildSense POS is designed to support a wide range of small, medium, and growing businesses, including retail stores, restaurants, cafés, supermarkets, clothing stores, electronics shops, mobile accessory stores, salons, hardware stores, and other service or product-based businesses. The system can be adapted to different business workflows and requirements, making it suitable for both single-location businesses and companies operating across multiple branches. Its goal is to make sales, inventory, reporting, and everyday business management simpler and more organized.",
  },
];

// Industries FAQ (mockup `#industriesV2Faq`, L15497): five items, single-open.
// Same title as Home and POS.
export const INDUSTRIES_FAQ_TITLE = "Frequently Asked Questions";

export const INDUSTRIES_FAQS: readonly FaqItem[] = [
  {
    question: "Which industries can use BuildSense POS?",
    answer:
      "BuildSense POS & Retail can support businesses across Retail, Restaurants, Healthcare, Education, Logistics and Hospitality where billing, payments, products, services or transaction management are part of everyday operations.",
  },
  {
    question: "Is BuildSense POS a different product for every industry?",
    answer:
      "No. BuildSense POS & Retail is the core available solution. It can be configured around different business environments and workflows rather than requiring a completely separate product for every industry.",
  },
  {
    question: "Which BuildSense services are available now?",
    answer:
      "BuildSense POS & Retail is currently available. The wider BuildSense service portfolio, including Mobile Applications, Custom Software, AI & Automation, Data & Analytics, Cloud & DevOps, Cybersecurity and Web Development, is currently marked Coming Soon.",
  },
  {
    question: "What if my business does not fit one of these six industries?",
    answer:
      "The six industries shown represent our current focus areas. If your business has similar transaction, billing, inventory or operational requirements, you can contact BuildSense IT to discuss whether the current POS solution is suitable.",
  },
  {
    question: "Will more BuildSense technology services become available?",
    answer:
      "Yes. BuildSense IT is expanding toward a broader technology portfolio. Until those services are officially available, they remain clearly marked Coming Soon.",
  },
];
