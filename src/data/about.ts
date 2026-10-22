// Source: mockup/index.html `#page-about` (L15555-15712). Copy is verbatim. Media paths are
// the real files under public/media/about + public/media/clients (docs/media-map.md);
// width/height are each file's natural size (next/image needs them for the aspect ratio).

export const ABOUT_HERO = {
  emblem: {
    src: "/media/about/hero-emblem-v1.png",
    width: 1254,
    height: 1254,
    alt: "BuildSense IT three-dimensional brand emblem",
  },
  kicker: "THE BUILDSENSE IT STORY",
  /** Two lines in the mockup (`<br>`) */
  title: ["Building technology", "that makes sense."],
  description:
    "We create thoughtful digital solutions that simplify complex business challenges. From everyday operations to ambitious digital transformation, we build technology designed around the people who use it.",
} as const;

export const ABOUT_STORY = {
  heading: "Our story",
  paragraphs: [
    "BuildSense IT began with a simple belief: technology should make business easier, not more complicated. We saw how many organizations struggled with disconnected systems, repetitive processes, and software that didn't fit how they actually worked.",
    "We set out to build practical, reliable, and beautifully designed digital solutions. What started as a shared passion for software engineering has grown into a team focused on creating websites, custom applications, business management systems, and intelligent digital experiences.",
    "Today, we continue to approach every project with curiosity, care, and a commitment to meaningful results. We believe the best technology is not always the most complicated. It's the technology that makes sense.",
  ],
} as const;

export const ABOUT_FOUNDERS = {
  heading: "The people who started it",
  intro:
    "A team of builders who care about thoughtful engineering, beautiful design, and creating technology that solves real problems.",
  cta: { label: "Meet the team", href: "/humans" },
  photo: {
    src: "/media/about/founders-v1.png",
    width: 714,
    height: 900,
    alt: "BuildSense IT Solutions team photograph",
  },
  caption: "BuildSense IT Solutions team photograph.",
} as const;

export type AboutBelief = {
  id: string;
  title: string;
  copy: string;
  /** Fixed string shown in the card's browser bar (hidden <= 720px) */
  date: string;
  author: { name: string; avatar: string };
};

// Author name <-> avatar pairing is the mockup's own (approved as-is, 2026-10-21). It differs
// from the Humans page's names (AUDIT 8.3 / Q6); changing it is a data-only edit here.
export const ABOUT_BELIEFS = {
  heading: "What we believe",
  intro: "Principles that shape how we think, build, collaborate, and make decisions.",
  cards: [
    {
      id: "solve-what-matters",
      title: "Solve what matters",
      copy: "We believe great technology begins with understanding real problems. Before writing code, we listen, question assumptions, and focus on what creates meaningful value for the people and businesses we serve.",
      date: "Aug 18th, 2026",
      author: { name: "Uditha Nuwan", avatar: "/media/about/belief-author-uditha-v1.webp" },
    },
    {
      id: "details-make-the-difference",
      title: "Details make the difference",
      copy: "Thoughtful design and careful engineering go hand in hand. From the smallest interaction to the overall system architecture, we believe quality comes from paying attention to every detail.",
      date: "Aug 24th, 2026",
      author: { name: "Athila Ravindu", avatar: "/media/about/belief-author-athila-v1.webp" },
    },
    {
      id: "build-learn-improve",
      title: "Build, learn, improve",
      copy: "We move with purpose, test ideas early, and continuously improve. Every project is an opportunity to learn, refine our thinking, and create something better than before.",
      date: "Sep 2nd, 2026",
      author: { name: "Janith Malinda", avatar: "/media/about/belief-author-janith-v1.webp" },
    },
    {
      id: "grow-together",
      title: "Grow together",
      copy: "We believe strong teams create stronger products. We share knowledge, respect different perspectives, communicate openly, and take ownership of the work we do.",
      date: "Sep 14th, 2026",
      author: { name: "Sangeeth Madushan", avatar: "/media/about/belief-author-sangeeth-v1.webp" },
    },
  ],
} as const satisfies { heading: string; intro: string; cards: readonly AboutBelief[] };

export const ABOUT_TEAM = {
  heading: "The team behind it",
  intro:
    "Developers, designers, and problem-solvers working together to create technology that makes sense.",
  cta: { label: "Meet our team", href: "/humans" },
  photo: {
    src: "/media/about/team-collage-v1.jpg",
    width: 2048,
    height: 1012,
    alt: "BuildSense IT team collage featuring all seven software developers",
  },
  caption: "Meet the BuildSense IT Solutions team.",
} as const;

export type AboutClient = {
  id: "kbugz" | "motors" | "hunger";
  name: string;
  kind: string;
  logo: { src: string; width: number; height: number; alt: string };
};

export type ExpertiseIconName =
  | "pos"
  | "mobile"
  | "software"
  | "ai"
  | "data"
  | "cloud"
  | "security"
  | "web";

export type AboutExpertise = { icon: ExpertiseIconName; title: string; copy: string };

export const ABOUT_NETWORK = {
  heading: "Our network",
  intro: "We grow through trusted client partnerships, practical solutions, and focused technical expertise.",
  clientsHeading: "Trusted clients",
  clients: [
    {
      id: "kbugz",
      name: "Kbugz",
      kind: "Restaurant brand",
      logo: { src: "/media/clients/kbugz-logo-v1.png", width: 2048, height: 682, alt: "Kbugz logo" },
    },
    {
      id: "motors",
      name: "Road Lanka Motors",
      kind: "Hardware business",
      logo: {
        src: "/media/clients/road-lanka-motors-logo-v1.png",
        width: 1536,
        height: 1024,
        alt: "Road Lanka Motors logo",
      },
    },
    {
      id: "hunger",
      name: "The Hunger Food Hub",
      kind: "Restaurant brand",
      logo: {
        src: "/media/clients/hunger-food-hub-logo-v1.png",
        width: 1254,
        height: 1254,
        alt: "The Hunger Food Hub logo",
      },
    },
  ],
  expertiseHeading: "Our expertise",
  expertiseIntro: "A complete range of technology solutions to help businesses grow and operate smarter.",
  expertise: [
    {
      icon: "pos",
      title: "POS & Retail",
      copy: "Smart point-of-sale, inventory, and retail management solutions for modern businesses.",
    },
    {
      icon: "mobile",
      title: "Mobile Applications",
      copy: "Custom Android and iOS applications designed around your business needs.",
    },
    {
      icon: "software",
      title: "Custom Software",
      copy: "Tailored software solutions that simplify workflows and solve real business challenges.",
    },
    {
      icon: "ai",
      title: "AI & Automation",
      copy: "Intelligent solutions that automate processes, reduce manual work, and improve efficiency.",
    },
    {
      icon: "data",
      title: "Data & Analytics",
      copy: "Turn business data into meaningful insights for smarter decision-making.",
    },
    {
      icon: "cloud",
      title: "Cloud & DevOps",
      copy: "Scalable cloud infrastructure, streamlined deployments, and reliable operations.",
    },
    {
      icon: "security",
      title: "Cybersecurity",
      copy: "Modern security solutions to protect systems, applications, and business data.",
    },
    {
      icon: "web",
      title: "Web Development",
      copy: "Modern, responsive, and high-performance websites and web applications.",
    },
  ],
} as const satisfies {
  heading: string;
  intro: string;
  clientsHeading: string;
  clients: readonly AboutClient[];
  expertiseHeading: string;
  expertiseIntro: string;
  expertise: readonly AboutExpertise[];
};

// The "Explore opportunities" button has no action in the mockup (inert); kept as is.
export const ABOUT_CAREERS = {
  heading: "Build what's next with us.",
  intro:
    "We're always interested in connecting with people who love solving meaningful problems, building great software, and learning together.",
  cta: "Explore opportunities",
  note: "No open roles are currently listed.",
} as const;

// Blog cards are not linked in the mockup.
export const ABOUT_BLOG = {
  heading: "From our blog",
  posts: [
    {
      title: "Why we build software around real business workflows",
      category: "Engineering & Product",
      cover: {
        src: "/media/about/blog-workflows-v1.jpg",
        width: 2048,
        height: 1143,
        alt: "Warehouse inventory management dashboard on a laptop",
      },
    },
    {
      title: "Designing better digital experiences for growing businesses",
      category: "Design & Innovation",
      cover: {
        src: "/media/about/blog-digital-experiences-v1.jpg",
        width: 2048,
        height: 1143,
        alt: "Business team working with digital operations software",
      },
    },
    {
      title: "Building smarter business solutions with modern technology",
      category: "Inside BuildSense IT",
      cover: {
        src: "/media/about/blog-modern-technology-v1.jpg",
        width: 2048,
        height: 1143,
        alt: "Online shopping storefront on desktop tablet and mobile devices",
      },
    },
  ],
} as const;
