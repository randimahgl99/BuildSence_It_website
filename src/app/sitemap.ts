import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/site";

// No lastModified: there is no CMS or git-derived date, and a build timestamp
// would claim every page changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({ url: `${SITE_URL}${path === "/" ? "" : path}` }));
}
