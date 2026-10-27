import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MotionGate } from "@/components/motion/MotionGate";
import { SITE } from "@/data/navigation";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Static weights only, matching the mockup's Google Fonts request. The mockup
// asks for weights it never loaded (650/690/750/800 on Inter) and the browser
// snaps them; a variable-font setup would render those differently.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

// Headings. 500 is the display weight; 600/700/800 cover the bolder small headings.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-poppins",
});

// Every route sets its own title/description/canonical/openGraph via pageMetadata()
// (no canonical here, so a new route can never inherit another page's).
// The Open Graph / Twitter image is the file-based opengraph-image / twitter-image.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s | ${SITE.name}` },
  description: SITE_DESCRIPTION,
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: { card: "summary_large_image", title: SITE_TITLE, description: SITE_DESCRIPTION },
};

// The effective site is dark (--color-page), so the browser chrome matches it.
export const viewport: Viewport = {
  themeColor: "#080b0d",
  colorScheme: "dark",
};

// Organization structured data. `<` is escaped so no string can close the tag.
const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE_URL,
  logo: `${SITE_URL}/media/brand/logo-v1.png`,
  description: SITE_DESCRIPTION,
  email: SITE.email,
  telephone: "+94744128283",
}).replace(/</g, "\u003c");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body>
        <a className="bs-skip-link" href="#main-content">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <FloatingContact />
        <MotionGate />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />
      </body>
    </html>
  );
}
