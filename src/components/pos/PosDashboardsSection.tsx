import Image from "next/image";
import { aboutReveal } from "@/components/motion/revealAttrs";
import { PosDashboardsController } from "@/components/pos/PosDashboardsController";
import { POS_DASHBOARDS, type PosDashboardImage } from "@/data/posDashboards";

// Rendered card width (styles/pos-dashboards.css): clamp(340px, 28vw, 470px),
// clamp(320px, 48vw, 430px) up to 900px, 84vw up to 600px. The screenshots are
// ~1919px PNGs, so without this the browser would fetch/decode the full size.
const CARD_SIZES = "(max-width: 600px) 84vw, (max-width: 900px) clamp(320px, 48vw, 430px), clamp(340px, 28vw, 470px)";

function DashboardCard({ image, primary }: { image: PosDashboardImage; primary: boolean }) {
  return (
    <div
      className="bs-pos-dash-card"
      data-dash-card=""
      role="button"
      // The aria-hidden loop copy is clickable (it is what you see half the time)
      // but is not a second set of tab stops
      tabIndex={primary ? 0 : -1}
      aria-pressed="false"
    >
      <div className="bs-pos-dash-bar" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="bs-pos-dash-media">
        <Image
          src={image.src}
          alt={primary ? image.alt : ""}
          width={image.width}
          height={image.height}
          sizes={CARD_SIZES}
          draggable={false}
        />
      </div>
    </div>
  );
}

/**
 * POS "Live system previews" (mockup `.pos-dashboard-section`, L14788): two rows
 * of four screenshot cards drifting in opposite directions. Server Component:
 * the motion is pure CSS. Each track holds two identical groups and the keyframes
 * slide it by exactly one group (+ the track gap) for a seamless loop; the second
 * group is aria-hidden. Pausing: hover on a fine pointer, a selected card
 * (`data-paused` on the row), MotionGate when off-screen / tab hidden, and
 * reduced motion (static strip). `PosDashboardsController` owns the selection.
 *
 * `id="pos-dashboards"` is the target of Home's "Explore Our Work" link
 * (`/pos#pos-dashboards`).
 */
export function PosDashboardsSection() {
  const { badge, heading, intro, rows } = POS_DASHBOARDS;
  return (
    <section className="bs-pos-dash" id="pos-dashboards" aria-labelledby="pos-dashboards-title">
      <div className="bs-pos-dash-heading">
        <div className="bs-pos-dash-badge" {...aboutReveal}>
          {badge}
        </div>
        <h2 id="pos-dashboards-title" {...aboutReveal}>
          {heading}
        </h2>
        <p {...aboutReveal}>{intro}</p>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="bs-pos-dash-row" data-dash-row="" data-direction={row.direction}>
          <div className="bs-pos-dash-track">
            {[false, true].map((duplicate) => (
              <div key={String(duplicate)} className="bs-pos-dash-group" aria-hidden={duplicate ? "true" : undefined}>
                {row.cards.map((image) => (
                  <DashboardCard key={image.id} image={image} primary={!duplicate} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      <PosDashboardsController />
    </section>
  );
}
