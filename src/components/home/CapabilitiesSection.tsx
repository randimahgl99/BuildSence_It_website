import { CAPABILITIES, CAPABILITIES_SECTION } from "@/data/capabilities";
import { CapabilityExplorer } from "./CapabilityExplorer";

/**
 * Home "Capabilities explorer" (mockup `#home-services`). Server Component: the
 * heading and copy are static; only the explorer needs the client.
 * `data-reveal*` attributes are for the shared reveal controller.
 */
export function CapabilitiesSection() {
  return (
    <section id="home-services" className="bs-cap" data-reveal-group="home-services">
      <div className="container-site">
        <h2 className="bs-section-title" data-reveal="heading">
          {CAPABILITIES_SECTION.title}
        </h2>
        <p className="bs-section-sub" data-reveal="description">
          {CAPABILITIES_SECTION.intro}
        </p>
        <CapabilityExplorer items={CAPABILITIES} />
      </div>
    </section>
  );
}
