import type { Metadata } from "next";
import { SITE } from "@/data/navigation";

/**
 * Canonical origin for metadata, sitemap, robots and JSON-LD. There is no
 * production domain yet (AUDIT §10), so set `SITE_URL` (e.g. https://example.com,
 * no trailing slash needed) in the hosting environment before launch. Until then
 * every absolute URL points at the local dev server. On Vercel, when `SITE_URL`
 * is unset, the project's production domain (`VERCEL_PROJECT_PRODUCTION_URL`,
 * which has no protocol) is used instead.
 */
const VERCEL_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const SITE_URL = (process.env.SITE_URL || VERCEL_PRODUCTION_URL || "http://localhost:3000").replace(/\/+$/, "");

export const SITE_TITLE = `${SITE.name} — POS, Custom Software & AI Solutions`;

export const SITE_DESCRIPTION =
  "From point-of-sale systems to custom software, mobile apps and AI technology designed for the way business works.";

/** Public routes, in sitemap order. Single source for sitemap.ts. */
export const ROUTES = ["/", "/pos", "/industries", "/about", "/humans", "/contact"] as const;

// Must match the literal size/alt exported by app/opengraph-image.tsx.
const SOCIAL_IMAGE = { width: 1200, height: 630, alt: `${SITE.name} — Technology that makes sense.` };

type PageMetadataInput = {
  /** Page title; the root layout's template appends " | BuildSense IT". Omit for Home. */
  title?: string;
  description: string;
  path: (typeof ROUTES)[number];
};

/**
 * Per-route metadata. A route's `openGraph` / `twitter` replace the layout's
 * wholesale (Next merges metadata shallowly), so the shared fields are repeated
 * here, images included: a route that sets `openGraph` loses the file-based
 * `opengraph-image` / `twitter-image` it would otherwise inherit.
 */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const shownTitle = title ? `${title} | ${SITE.name}` : SITE_TITLE;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: "en_US",
      title: shownTitle,
      description,
      url: path,
      images: [{ url: "/opengraph-image", ...SOCIAL_IMAGE }],
    },
    twitter: {
      card: "summary_large_image",
      title: shownTitle,
      description,
      images: [{ url: "/twitter-image", alt: SOCIAL_IMAGE.alt }],
    },
  };
}
