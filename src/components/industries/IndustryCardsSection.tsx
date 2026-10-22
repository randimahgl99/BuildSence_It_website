import Image from "next/image";
import Link from "next/link";
import { INDUSTRIES, INDUSTRY_CARDS_SECTION, INDUSTRY_CARD_COPY } from "@/data/industries";

/**
 * Six industry photo cards (mockup `#industries-v2-cards` / `#industryCards`,
 * L15038). The mockup built the cards with JS; here they are rendered on the
 * server from `data/industries.ts`. Server Component, no client JS: the hover
 * lift / photo zoom / button nudge are CSS. `data-reveal*` attributes are for
 * the shared reveal controller (none exists yet).
 */
export function IndustryCardsSection() {
  return (
    <section id={INDUSTRY_CARDS_SECTION.id} className="bs-ind-cards" data-reveal-group="industries-cards">
      <div className="bs-ind-container bs-ind-cards-inner">
        <div className="bs-ind-cards-head">
          <div>
            <h2 className="bs-ind-cards-title" data-reveal="heading">
              {INDUSTRY_CARDS_SECTION.title}
            </h2>
          </div>
          <p data-reveal="description">{INDUSTRY_CARDS_SECTION.intro}</p>
        </div>

        <div className="bs-ind-cards-grid">
          {INDUSTRIES.map((industry) => (
            <article key={industry.id} className="bs-ind-card" data-reveal="card">
              <Image
                className="bs-ind-card-image"
                src={industry.image.src}
                width={industry.image.width}
                height={industry.image.height}
                // object-fit: cover scales the photo to the 440px-tall card, so the rendered width can
                // exceed the card width (landscape photos: 440 x 1.56 = ~690px)
                sizes="700px"
                alt={`${industry.name} industry environment`}
              />
              <div className="bs-ind-card-overlay">
                <h3>{industry.name}</h3>
                <p>{INDUSTRY_CARD_COPY[industry.id]}</p>
                <Link href={INDUSTRY_CARDS_SECTION.cta.href} className="bs-ind-card-cta">
                  {INDUSTRY_CARDS_SECTION.cta.label} <i>↗</i>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
