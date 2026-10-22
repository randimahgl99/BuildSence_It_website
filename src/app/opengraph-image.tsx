import { renderSocialImage } from "@/lib/socialImage";

// Segment config must be literal values (Next reads it statically), so these
// repeat the card size used in lib/socialImage.
export const alt = "BuildSense IT — Technology that makes sense.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderSocialImage();
}
