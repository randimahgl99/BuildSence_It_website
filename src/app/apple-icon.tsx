import { renderBrandIcon } from "@/lib/brandIcon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS fills transparent pixels with black, and the mark is dark navy, so the touch icon gets white.
export default function AppleIcon() {
  return renderBrandIcon(size.width, "#ffffff");
}
