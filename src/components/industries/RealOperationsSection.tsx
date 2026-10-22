import Image from "next/image";
import { REAL_OPERATIONS } from "@/data/industries";
import { RealOpsCardIconSvg, RealOpsFloatIcon } from "./RealOpsIcons";
import { SectionReveal } from "./SectionReveal";

/**
 * "Real operations" (mockup `#real-operations`, L15051): heading + intro, the
 * café photo with its glow, two outline frames and four floating icons, and
 * four challenge cards each with an icon and a mini graphic.
 *
 * Server Component apart from the thin `SectionReveal` section wrapper (outline
 * entrance). Everything else is CSS: the float animation is gated by MotionGate
 * (`data-bs-offscreen` on the section), the card hover is `:hover`.
 * `data-reveal*` attributes are for the shared reveal controller (none exists yet).
 */
export function RealOperationsSection() {
  const [titleLine, titleAccent] = REAL_OPERATIONS.title;

  return (
    <SectionReveal
      id={REAL_OPERATIONS.id}
      className="bs-ind-realops"
      aria-labelledby="realOpsTitle"
      data-reveal-group="real-operations"
    >
      <div className="bs-ind-container bs-ind-realops-inner">
        <div className="bs-ind-realops-head">
          <div className="bs-ind-realops-head-left">
            <h2 id="realOpsTitle" className="bs-ind-realops-title" data-reveal="heading" data-ready-trigger="">
              {titleLine} <span>{titleAccent}</span>
            </h2>
          </div>
          <p className="bs-ind-realops-intro" data-reveal="description">
            {REAL_OPERATIONS.intro}
          </p>
        </div>

        <div className="bs-ind-realops-layout">
          <div className="bs-ind-realops-visual" data-reveal="media">
            <div className="bs-ind-realops-glow" aria-hidden="true" />
            <div className="bs-ind-realops-outline bs-ind-realops-outline-a" aria-hidden="true" />
            <div className="bs-ind-realops-outline bs-ind-realops-outline-b" aria-hidden="true" />

            <div className="bs-ind-realops-photo-shell">
              <Image
                className="bs-ind-realops-photo"
                src={REAL_OPERATIONS.photo.src}
                width={REAL_OPERATIONS.photo.width}
                height={REAL_OPERATIONS.photo.height}
                // cover-scaled into a tall frame: ~885px wide on desktop, ~745px at <= 880px, ~630px on phones
                sizes="(max-width: 880px) 760px, 900px"
                alt={REAL_OPERATIONS.photo.alt}
              />
            </div>

            {REAL_OPERATIONS.floatIcons.map((name, index) => (
              <span
                key={name}
                className={`bs-ind-realops-float bs-ind-realops-float-${index + 1}`}
                aria-hidden="true"
              >
                <RealOpsFloatIcon name={name} />
              </span>
            ))}
          </div>

          <div className="bs-ind-realops-cards" role="group" aria-label={REAL_OPERATIONS.cardsLabel}>
            {REAL_OPERATIONS.cards.map((card) => (
              <article key={card.number} className="bs-ind-realops-card" data-reveal="card">
                <span className="bs-ind-realops-number">{card.number}</span>
                <span className="bs-ind-realops-icon" aria-hidden="true">
                  <RealOpsCardIconSvg name={card.icon} />
                </span>
                <span className="bs-ind-realops-copy">
                  <strong>{card.title}</strong>
                  <span>{card.copy}</span>
                </span>
                <span className={`bs-ind-realops-graphic bs-ind-realops-graphic-${card.graphic}`} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="bs-ind-realops-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
