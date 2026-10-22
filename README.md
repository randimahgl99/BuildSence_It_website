<div align="center">

# BuildSense IT

**Technology that makes sense.**

The company website for BuildSense IT: point-of-sale systems, custom software, mobile apps and AI solutions for businesses.

![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Output](https://img.shields.io/badge/output-static--friendly-2ea44f)

</div>

---

## Overview

A fast, animation-rich marketing site built with the Next.js App Router. It has no backend, no database and no API routes, so it can be hosted on any static-friendly platform (Vercel is the target).

- **Pixel-faithful**: layout, typography, color and motion match the approved design prototype.
- **Performance-first motion**: every animation and video pauses when off-screen or when the tab is hidden, and every listener, observer and frame loop is cleaned up on unmount (safe under React Strict Mode).
- **Accessible by default**: respects `prefers-reduced-motion` (videos show their poster instead of playing), keyboard-friendly navigation, visible focus states.
- **SEO ready**: per-page metadata, canonical URLs, Open Graph / Twitter images, `sitemap.xml`, `robots.txt` and JSON-LD.
- **Light on JavaScript**: Server Components by default; `"use client"` only where a component needs animation, observers or interactivity. Heavy libraries are loaded with dynamic import.

## Pages

| Route | Page |
|---|---|
| `/` | Home: hero, capabilities, industries, AI assistant demo, why us, onboarding, client stories, FAQ |
| `/pos` | BuildSense POS product page: showcase, dashboards, features, FAQ |
| `/industries` | Industries we serve, with scroll-driven sections |
| `/about` | Story, beliefs, network, careers and blog teasers |
| `/humans` | Meet the team |
| `/contact` | Demo request form |
| `/sitemap.xml`, `/robots.txt` | Generated automatically |

## Tech stack

| Area | Choice |
|---|---|
| Framework | [Next.js](https://nextjs.org) 16 (App Router, Turbopack) |
| UI | React 19, TypeScript 5 |
| Styling | Tailwind CSS 4 plus per-section stylesheets in `src/styles/` |
| Fonts / images | `next/font`, `next/image` |
| Notifications | [`sonner`](https://sonner.emilkowal.ski) (form toasts) |
| Form delivery | [Web3Forms](https://web3forms.com), a client-side `fetch` |
| Linting | ESLint 9 with `eslint-config-next` |

## Getting started

**Requirements:** Node.js 20.9 or newer and npm.

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local      # Windows PowerShell: Copy-Item .env.example .env.local

# 3. Start the dev server
npm run dev                     # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build (run `npm run build` first) |
| `npm run lint` | ESLint |

Run `npm run lint` and `npm run build` before every push. Both must pass.

## Environment variables

Copy `.env.example` to `.env.local`. Never commit real values (`.env*` is git-ignored, except `.env.example`).

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | For the contact form | Web3Forms **public** access key from your Web3Forms dashboard. Public by design (it ships in the browser bundle). Restart `npm run dev` after changing it. |
| `SITE_URL` | Before launch | Canonical origin, e.g. `https://www.example.com`. Used for the sitemap, `robots.txt`, canonical and Open Graph URLs and JSON-LD. Empty locally; on Vercel it falls back to the project's production domain. |

## Project structure

```text
src/
  app/                  Routes (one folder per page), root layout, sitemap, robots,
                        and generated icon / Open Graph / Twitter images
  components/
    layout/             Navbar, mega menu, mobile menu, footer, floating contact
    home/ pos/ industries/ about/ humans/ contact/   Page sections
    motion/             Scroll-reveal system (PremiumReveal, MotionGate, AboutReveal)
    ui/                 Shared pieces: LoopVideo, Faq, TestimonialMarquee, toaster
  data/                 All page content as typed data (see "Editing content")
  hooks/                useInView, useRafScroll, useReducedMotion, useDocumentVisible, ...
  lib/                  Site config and metadata, video playback, form logic, scene code
  styles/               Per-section CSS, keyframes, accessibility and motion-gate styles
public/media/           Videos (MP4), posters, and all images, versioned by file name
docs/media-map.md       Which media file is used where, with sizes
```

## Editing content

Most copy lives in `src/data/` and needs no component changes:

| File | Content |
|---|---|
| `navigation.ts` | Company name, nav links, footer links |
| `capabilities.ts`, `industries.ts`, `why.ts`, `onboarding.ts` | Home and Industries sections |
| `posPage.ts`, `posFeatures.ts`, `posDashboards.ts` | POS page |
| `faqs.ts` | FAQ entries |
| `team.ts`, `about.ts` | Humans and About pages |
| `clientLogos.ts`, `testimonials.ts` | Client logos and stories |
| `contact.ts` | Contact page and form copy |

### Client testimonials

`src/data/testimonials.ts` is status-gated. Only entries with `status: "approved"` appear in production; `draft` entries show in `npm run dev` only. This file ships to every visitor's browser, so never put private customer details (emails, phone numbers, form IDs) in it.

## Media and caching

All media lives in `public/media/` and is served by the host's CDN.

- **Videos** are MP4 only, each under 8 MB, with a JPG poster in `public/media/posters/`.
- The hero video autoplays muted and looped. Every other video loads and plays only when scrolled into view, and pauses when off-screen or when the tab is hidden.
- `next.config.ts` serves `/media/**` with `Cache-Control: public, max-age=31536000, immutable`.
- **Because of that, never overwrite a media file under the same name.** When a file changes, give it a new version suffix (`hero-v1.mp4` → `hero-v2.mp4`) and update every reference.
- Do not commit any single file over 20 MB.

See [`docs/media-map.md`](docs/media-map.md) for the full file-by-file map.

## Performance and accessibility notes

- Animation is limited to `transform` and `opacity` where possible; scroll listeners are passive and rAF-batched.
- `IntersectionObserver` and `visibilitychange` pause off-screen and background work.
- Motion respects `prefers-reduced-motion`.
- Nothing reads `window`, `matchMedia` or `document.hidden` during render, so there are no hydration mismatches.

## Deployment

The project is built for [Vercel](https://vercel.com):

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repo and keep the detected Next.js defaults.
3. Add the environment variables above (`NEXT_PUBLIC_WEB3FORMS_KEY`, `SITE_URL`).
4. Deploy, then attach your custom domain and update `SITE_URL` to match.

Any Node.js host also works: `npm ci && npm run build && npm start`.

## Known placeholders before launch

- `SITE_URL` must be set to the real domain.
- The social sharing image (Open Graph / Twitter) is generated from a placeholder design.
- Review that the client stories in `src/data/testimonials.ts` are approved for publishing.

## License

© BuildSense IT. All rights reserved. This repository is proprietary and not licensed for reuse or redistribution.
