import Image from "next/image";
import { aboutReveal } from "@/components/motion/revealAttrs";
import { ABOUT_NETWORK } from "@/data/about";
import { AboutExpertiseIcon } from "./AboutExpertiseIcon";

/**
 * "Our network" (mockup `.bsa-network`, L15613): three client cards and eight
 * expertise cards with inline SVG icons. Server Component. Hover is plain CSS.
 * The client logos use `object-fit: contain` inside a 150px frame, so they are
 * requested at the card width (about 330px), not their intrinsic size.
 */
export function AboutNetwork() {
  return (
    <section className="bs-about-section bs-about-network" aria-labelledby="bsaNetworkHeading">
      <div className="bs-about-wide">
        <header className="bs-about-network-heading" {...aboutReveal}>
          <div className="bs-about-network-intro">
            <h2 className="bs-about-heading" id="bsaNetworkHeading">
              {ABOUT_NETWORK.heading}
            </h2>
            <p>{ABOUT_NETWORK.intro}</p>
          </div>
        </header>

        <div className="bs-about-network-clients" role="group" aria-labelledby="bsaTrustedHeading">
          <div className="bs-about-group-heading" {...aboutReveal}>
            <h3 id="bsaTrustedHeading">{ABOUT_NETWORK.clientsHeading}</h3>
          </div>
          <div className="bs-about-client-grid">
            {ABOUT_NETWORK.clients.map((client) => (
              <article key={client.id} className="bs-about-client" data-client={client.id} {...aboutReveal}>
                <div className="bs-about-logo-frame">
                  <Image
                    src={client.logo.src}
                    width={client.logo.width}
                    height={client.logo.height}
                    sizes="(max-width: 720px) calc(100vw - 88px), 330px"
                    alt={client.logo.alt}
                  />
                </div>
                <span className="bs-about-client-rule" aria-hidden="true" />
                <h4>{client.name}</h4>
                <p>{client.kind}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="bs-about-expertise" role="group" aria-labelledby="bsaExpertiseHeading">
          <div className="bs-about-group-heading bs-about-expertise-heading" {...aboutReveal}>
            <div>
              <h3 id="bsaExpertiseHeading">{ABOUT_NETWORK.expertiseHeading}</h3>
              <p>{ABOUT_NETWORK.expertiseIntro}</p>
            </div>
          </div>
          <div className="bs-about-expertise-grid">
            {ABOUT_NETWORK.expertise.map((item) => (
              <article key={item.title} className="bs-about-expertise-card" {...aboutReveal}>
                <span className="bs-about-expertise-icon" aria-hidden="true">
                  <AboutExpertiseIcon name={item.icon} />
                </span>
                <div className="bs-about-expertise-copy">
                  <h4>{item.title}</h4>
                  <p>{item.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
