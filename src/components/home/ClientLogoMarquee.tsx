import Image from "next/image";
import { CLIENT_LOGO_REPETITIONS, type ClientLogo } from "@/data/clientLogos";

function LogoGroup({ logos, duplicate }: { logos: readonly ClientLogo[]; duplicate: boolean }) {
  const items = [];
  for (let cycle = 0; cycle < CLIENT_LOGO_REPETITIONS; cycle++) {
    for (const logo of logos) {
      // Only the very first copy of each logo is announced; every other copy is decoration.
      const alt = !duplicate && cycle === 0 ? logo.alt : "";
      items.push(
        <div key={`${cycle}-${logo.id}`} className={`client-logo-item client-logo-item--${logo.id}`}>
          <Image src={logo.src} alt={alt} width={logo.width} height={logo.height} sizes={logo.sizes} draggable={false} />
        </div>,
      );
    }
  }
  return (
    <div className="client-logo-group" aria-hidden={duplicate ? "true" : undefined}>
      {items}
    </div>
  );
}

/**
 * Client-logo marquee pinned to the bottom of the Home hero (mockup
 * `#logoMarquee`). Pure CSS motion, so it is a Server Component: the track is
 * two identical groups and the keyframes slide it by exactly one group (-50%)
 * for a seamless loop. The second group is aria-hidden. MotionGate pauses it
 * while the hero is off-screen or the tab is hidden; reduced motion pauses it.
 *
 * The marquee is the one reveal target inside the first viewport, so it is
 * server-rendered hidden (data-rise="wait") to avoid a visible-then-hidden flash
 * once PremiumReveal hydrates; the fail-visible fallbacks are in premium-reveal.css.
 */
export function ClientLogoMarquee({ logos }: { logos: readonly ClientLogo[] }) {
  return (
    <div
      className="bs-home-hero-logos"
      role="group"
      aria-label="BuildSense IT client logos"
      data-reveal-group="client-trust"
    >
      <div className="client-logo-marquee" data-reveal="media" data-rise="wait">
        <div className="client-logo-track">
          <LogoGroup logos={logos} duplicate={false} />
          <LogoGroup logos={logos} duplicate />
        </div>
      </div>
    </div>
  );
}
