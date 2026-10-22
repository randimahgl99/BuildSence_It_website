import Image from "next/image";
import { aboutReveal } from "@/components/motion/revealAttrs";
import { ABOUT_BLOG, ABOUT_CAREERS } from "@/data/about";

/**
 * Careers (mockup `.bsa-careers`, L15692). The mockup's "Explore opportunities"
 * button has no action and there are no open roles, so it stays an inert button.
 */
export function AboutCareers() {
  return (
    <section className="bs-about-section bs-about-careers" aria-labelledby="bsaCareersHeading">
      <div className="bs-about-intro" {...aboutReveal}>
        <h2 className="bs-about-heading" id="bsaCareersHeading">
          {ABOUT_CAREERS.heading}
        </h2>
        <p>{ABOUT_CAREERS.intro}</p>
        <button type="button" className="bs-about-minibutton">
          {ABOUT_CAREERS.cta} <span aria-hidden="true">↗</span>
        </button>
        <small>{ABOUT_CAREERS.note}</small>
      </div>
    </section>
  );
}

/** "From our blog" (mockup `.bsa-blog`, L15697): three cards, not linked in the mockup. */
export function AboutBlog() {
  return (
    <section className="bs-about-section bs-about-blog" aria-labelledby="bsaBlogHeading">
      <div className="bs-about-wide">
        <h2 className="bs-about-heading" id="bsaBlogHeading" {...aboutReveal}>
          {ABOUT_BLOG.heading}
        </h2>
        <div className="bs-about-blog-grid">
          {ABOUT_BLOG.posts.map((post) => (
            <article key={post.title} className="bs-about-blog-card" {...aboutReveal}>
              <div className="bs-about-blog-cover">
                <Image
                  src={post.cover.src}
                  width={post.cover.width}
                  height={post.cover.height}
                  sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1188px) calc((100vw - 100px) / 3), 363px"
                  alt={post.cover.alt}
                />
              </div>
              <h3>{post.title}</h3>
              <p>{post.category}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
