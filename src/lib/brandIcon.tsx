import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Satori needs explicit pixel sizes (no width:auto), so the source ratio is fixed here.
const MARK_SIZE = { width: 363, height: 410 };

/**
 * Square renders of the brand mark. The source favicon (public/media/brand/
 * favicon-v1.png) is 363x410, and browsers squash or crop non-square icons, so
 * `app/icon.tsx` and `app/apple-icon.tsx` letterbox the same artwork into a
 * 1:1 canvas at build time.
 */
export async function renderBrandIcon(side: number, background?: string) {
  const mark = await readFile(join(process.cwd(), "public/media/brand/favicon-v1.png"));
  const src = `data:image/png;base64,${mark.toString("base64")}`;
  const markHeight = Math.round(side * (background ? 0.64 : 0.92));
  const markWidth = Math.round((markHeight * MARK_SIZE.width) / MARK_SIZE.height);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: background ?? "transparent",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders to PNG, next/image does not apply */}
        <img src={src} alt="" width={markWidth} height={markHeight} />
      </div>
    ),
    { width: side, height: side },
  );
}
