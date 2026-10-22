import { CONNECTED_OPERATIONS } from "@/data/industries";
import { ConnectedOpsArtSvg } from "./ConnectedOpsArt";
import { SectionReveal } from "./SectionReveal";

// The flow curve (viewBox 1200x250), drawn once as the base track and once as the animated stroke.
const FLOW_PATH =
  "M92 136 C148 84 218 84 282 126 C341 166 405 166 468 122 C530 80 597 82 658 127 C717 169 785 169 848 123 C910 80 984 85 1108 133";
const NODES = [
  [92, 136],
  [282, 126],
  [468, 122],
  [658, 127],
  [848, 123],
  [1108, 133],
] as const;

/**
 * Connected operations (mockup `#connected-operations`, L15323): 3-line heading,
 * the SVG flow path with a travelling dot through six nodes, and six cards with
 * animated illustrations.
 *
 * Server Component apart from the thin `SectionReveal` wrapper, which writes
 * `data-state` ("wait" -> "visible", the mockup's one-shot `.is-visible`) to
 * start the path draw, node pop-ins, card art and the dot. Everything else is CSS.
 *
 * The travelling dot is SMIL `<animateMotion>` (10s, indefinite), which CSS
 * `animation-play-state` cannot pause. The SVG carries `data-bs-smil`, and
 * `MotionGate` calls `pauseAnimations()` / `unpauseAnimations()` on it while the
 * section is off-screen or the tab is hidden (approved gap fix, AUDIT 4.13 #1).
 * Under reduced motion the dot is not displayed. `data-reveal*` attributes are
 * for the shared reveal controller (none exists yet).
 */
export function ConnectedOperationsSection() {
  const [lineOne, lineTwo, lineThree] = CONNECTED_OPERATIONS.title;

  return (
    <SectionReveal
      id={CONNECTED_OPERATIONS.id}
      className="bs-ind-co"
      aria-labelledby="connectedOpsTitle"
      data-reveal-group="connected-operations"
    >
      <div className="bs-ind-container bs-ind-co-inner">
        <div className="bs-ind-co-head">
          <div className="bs-ind-co-head-left">
            <h2 id="connectedOpsTitle" className="bs-ind-co-title" data-reveal="heading" data-ready-trigger="">
              <span>{lineOne}</span>
              <span>{lineTwo}</span>
              <span>{lineThree}</span>
            </h2>
          </div>
          <p className="bs-ind-co-intro" data-reveal="description">
            {CONNECTED_OPERATIONS.intro}
          </p>
        </div>

        <div className="bs-ind-co-workflow">
          {/* Horizontally scrollable below 1200px: focusable so keyboard users can scroll it */}
          <div
            className="bs-ind-co-scroller"
            role="group"
            aria-label={CONNECTED_OPERATIONS.workflowLabel}
            tabIndex={0}
          >
            <div className="bs-ind-co-stage">
              <svg
                className="bs-ind-co-connector"
                viewBox="0 0 1200 250"
                preserveAspectRatio="none"
                aria-hidden="true"
                data-bs-smil=""
              >
                <defs>
                  <filter id="connectedOpsGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path id="connectedOpsFlowPath" className="bs-ind-co-path-base" d={FLOW_PATH} />
                <path className="bs-ind-co-path-draw" d={FLOW_PATH} />
                <g className="bs-ind-co-nodes">
                  {NODES.map(([cx, cy]) => (
                    <circle key={cx} cx={cx} cy={cy} r="6" />
                  ))}
                </g>
                <circle className="bs-ind-co-data-dot" r="7" filter="url(#connectedOpsGlow)">
                  <animateMotion dur="10s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#connectedOpsFlowPath" />
                  </animateMotion>
                </circle>
              </svg>

              <div className="bs-ind-co-cards">
                {CONNECTED_OPERATIONS.cards.map((card) => (
                  <article
                    key={card.number}
                    className={`bs-ind-co-card bs-ind-co-card-${card.art}`}
                    data-reveal="card"
                  >
                    <span className="bs-ind-co-step">{card.number}</span>
                    <div className={`bs-ind-co-art bs-ind-co-art-${card.art}`} aria-hidden="true">
                      <ConnectedOpsArtSvg name={card.art} />
                    </div>
                    <h3>{card.title}</h3>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
