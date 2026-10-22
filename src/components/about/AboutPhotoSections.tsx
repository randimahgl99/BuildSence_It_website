import Image from "next/image";
import Link from "next/link";
import { aboutReveal } from "@/components/motion/revealAttrs";
import { ABOUT_FOUNDERS, ABOUT_TEAM } from "@/data/about";

// The two photo sections share one shape: centred intro with a "Meet the team"
// link to /humans, then a figure. The mockup's links are `<button data-page>`
// elements that switch pages; here they are real links. Their "↗" arrow is
// display:none in the rendered mockup, so it is not rendered.

type PhotoSectionData = {
  heading: string;
  intro: string;
  cta: { label: string; href: string };
  photo: { src: string; width: number; height: number; alt: string };
  caption: string;
};

function PhotoSection({
  data,
  headingId,
  className,
  sizes,
  id,
}: {
  data: PhotoSectionData;
  headingId: string;
  className: string;
  sizes: string;
  id?: string;
}) {
  return (
    <section id={id} className={`bs-about-section bs-about-people ${className}`} aria-labelledby={headingId}>
      <div className="bs-about-intro" {...aboutReveal}>
        <h2 className="bs-about-heading" id={headingId}>
          {data.heading}
        </h2>
        <p>{data.intro}</p>
        <Link className="bs-about-minibutton bs-about-cta" href={data.cta.href}>
          {data.cta.label}
        </Link>
      </div>
      <figure className="bs-about-photo-figure" {...aboutReveal}>
        <div className="bs-about-photo-surface">
          <Image src={data.photo.src} width={data.photo.width} height={data.photo.height} sizes={sizes} alt={data.photo.alt} />
        </div>
        <figcaption>{data.caption}</figcaption>
      </figure>
    </section>
  );
}

/** Founders (mockup `.bsa-founders`, L15584): 714x900 team photo, shown at <= 560px wide. */
export function AboutFounders() {
  return (
    <PhotoSection
      data={ABOUT_FOUNDERS}
      headingId="bsaFoundersHeading"
      className="bs-about-founders"
      sizes="(max-width: 600px) calc(100vw - 12px), 560px"
    />
  );
}

/**
 * Team collage (mockup `.bsa-team`, L15613). `id="team"` is the footer's
 * "Our Team" target (`/about#team`); the mockup scrolls the section's top to the
 * viewport top, so there is no scroll-margin.
 */
export function AboutTeam() {
  return (
    <PhotoSection
      id="team"
      data={ABOUT_TEAM}
      headingId="bsaTeamHeading"
      className="bs-about-team"
      sizes="(max-width: 900px) calc(100vw - 36px), 850px"
    />
  );
}
