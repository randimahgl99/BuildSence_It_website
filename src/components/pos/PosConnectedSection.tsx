import { aboutReveal } from "@/components/motion/revealAttrs";
import { POS_CONNECTED } from "@/data/posFeatures";

/**
 * POS "Connected retail" (mockup `.pos-connected-section`, L14571). Server
 * Component, no client JS. Heading, intro and each of the six articles enter
 * with the About-style reveal.
 */
export function PosConnectedSection() {
  const [firstLine, secondLine] = POS_CONNECTED.heading;

  return (
    <section className="bs-pos-connected">
      <div className="container-site">
        <div className="bs-pos-connected-head">
          <h2 {...aboutReveal}>
            {firstLine}
            <br />
            {secondLine}
          </h2>
          <p {...aboutReveal}>{POS_CONNECTED.intro}</p>
        </div>

        <div className="bs-pos-connected-grid">
          {POS_CONNECTED.items.map((item) => (
            <article key={item.title} {...aboutReveal}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
