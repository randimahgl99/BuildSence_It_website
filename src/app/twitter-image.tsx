import { renderSocialImage } from "@/lib/socialImage";

// Literal values on purpose, see opengraph-image.tsx.
export const alt = "BuildSense IT — Technology that makes sense.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderSocialImage();
}
