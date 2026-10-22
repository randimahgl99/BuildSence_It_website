import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** 1200x630 is what Open Graph and Twitter's summary_large_image both expect. */
const SOCIAL_IMAGE_SIZE = { width: 1200, height: 630 } as const;

/**
 * Shared card for `app/opengraph-image.tsx` and `app/twitter-image.tsx`:
 * the real logo plus the site's own tagline on the page background. Rendered
 * once at build time (static). Swap in a designed image by dropping an
 * `opengraph-image.png` in `app/` and deleting the .tsx.
 */
export async function renderSocialImage() {
  const logo = await readFile(join(process.cwd(), "public/media/brand/logo-v1.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 80px",
          background: "#080b0d",
          backgroundImage: "radial-gradient(circle at 85% 12%, rgba(13,101,255,0.28), rgba(8,11,13,0) 55%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders to PNG, next/image does not apply */}
        <img src={logoSrc} width={560} height={221} alt="" style={{ marginLeft: -24 }} />
        <div
          style={{
            marginTop: 24,
            fontSize: 70,
            lineHeight: 1.05,
            letterSpacing: -2,
            color: "#f7f9fc",
            fontWeight: 700,
          }}
        >
          Technology that makes sense.
        </div>
        <div style={{ marginTop: 28, fontSize: 32, color: "#a9b8cc" }}>
          POS systems · Custom software · Mobile apps · AI solutions
        </div>
      </div>
    ),
    SOCIAL_IMAGE_SIZE,
  );
}
