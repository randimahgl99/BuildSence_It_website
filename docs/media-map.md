# Media map

Files under `public/media/`, named for what they show. Every file name carries a version suffix (`-v1`; `social/tiktok-v2.png` was already versioned), because `next.config.ts` serves the whole `/media/:path*` tree with `Cache-Control: public, max-age=31536000, immutable`. **When a file's content changes, give it a new version in its name (`-v2`) and update every reference; never overwrite a file under the same name.**

Reference from code as `/media/<path>` (e.g. `/media/videos/home-hero-v2.mp4`). The "Original" column is the file name in `mockup/media/` the artwork came from; originals in `mockup/` are untouched. The six videos have been re-encoded since the first copy (MP4 only, no WebM), so they no longer match the mockup's files. Sizes are the real file sizes on disk (MB = 1,048,576 bytes).

| Public path | Original | Size | Used for |
|---|---|---|---|
| `videos/home-hero-v2.mp4` | `home_hero_video.mp4` (replaced with a higher-quality export) | 39.53 MB | Home hero background |
| `videos/pos-hero-v1.mp4` | `pos_hero_video.mp4` | 2.86 MB | POS hero background |
| `videos/pos-speed-card-v2.mp4` | `pos_speed_card.mp4` (replaced with a higher-quality export) | 42.06 MB | POS showcase card: Built for speed |
| `videos/pos-flexibility-card-v1.mp4` | `pos_flexibility_card.mp4` | 1.29 MB | POS showcase card: Built for flexibility |
| `videos/pos-growth-card-v1.mp4` | `pos_growth_card.mp4` | 889 KB | POS showcase card: Built for growth |
| `videos/industries-hero-v1.mp4` | `industries_hero_video.mp4` | 1.98 MB | Industries hero background |
| `brand/favicon-v1.png` | `image_001_2562f48edc.png` | 115 KB | Favicon / Apple icon source (rendered by src/app/icon.tsx) |
| `brand/logo-v1.png` | `image_002_45092dd4b7.png` | 251 KB | Navbar logo (shown <= 258x76) |
| `posters/home-hero-v2.jpg` | frame 0 of `videos/home-hero-v1.mp4` (1280x720) | 99 KB | Home hero video poster. v1 (`image_003`) was a different moment than frame 0, so the poster->video swap was a visible jump |
| `posters/pos-hero-v2.jpg` | frame 0 of `videos/pos-hero-v1.mp4` (1280x720) | 56 KB | POS hero video poster. v1 (`image_007`) did not match frame 0 |
| `posters/pos-speed-card-v1.jpg` | `image_009_75f217beab.jpg` | 111 KB | POS speed card video poster |
| `posters/pos-flexibility-card-v1.jpg` | `image_011_bc39909974.jpg` | 46 KB | POS flexibility card video poster |
| `posters/pos-growth-card-v1.jpg` | `image_013_ea4972eae4.jpg` | 41 KB | POS growth card video poster |
| `posters/industries-hero-v2.jpg` | frame 0 of `videos/industries-hero-v1.mp4` (1280x720) | 42 KB | Industries hero video poster. v1 (`image_023`) did not match frame 0 |
| `home/capabilities/pos-retail-v1.jpg` | `image_005_5c9a040b82.jpg` | 52 KB | Capability stage: POS & Retail; ALSO the Restaurants industry photo |
| `home/capabilities/mobile-applications-v1.jpg` | `image_058_6e66eba5fb.jpg` | 42 KB | Capability stage: Mobile Applications |
| `home/capabilities/custom-software-v1.jpg` | `image_059_03b000e190.jpg` | 65 KB | Capability stage: Custom Software |
| `home/capabilities/ai-automation-v1.jpg` | `image_060_d7c421e6f8.jpg` | 75 KB | Capability stage: AI & Automation |
| `home/capabilities/data-analytics-v1.jpg` | `image_061_734d256d5c.jpg` | 47 KB | Capability stage: Data & Analytics |
| `home/capabilities/cloud-devops-v1.jpg` | `image_062_f85f33324e.jpg` | 34 KB | Capability stage: Cloud & DevOps |
| `home/capabilities/cybersecurity-v1.jpg` | `image_063_0688bef50d.jpg` | 92 KB | Capability stage: Cybersecurity |
| `home/capabilities/web-development-v1.jpg` | `image_057_ebb648d2a2.jpg` | 62 KB | Capability stage: Web Development |
| `home/why/engineering-led-v1.jpg` | `image_006_39b6db70d4.jpg` | 75 KB | Why #1: Engineering-led |
| `home/why/built-to-scale-v1.jpg` | `image_064_5d82190698.jpg` | 68 KB | Why #2: Built to scale |
| `home/why/security-by-design-v1.jpg` | `image_065_847c30a766.jpg` | 69 KB | Why #3: Security by design |
| `home/why/long-term-partner-v1.jpg` | `image_066_dae1312924.jpg` | 74 KB | Why #4: Long-term partner |
| `industries/retail-v1.jpg` | `image_051_5b5ad6bc1e.jpg` | 43 KB | Industry photo: Retail |
| `industries/healthcare-v1.jpg` | `image_052_29ab96bb9b.jpg` | 55 KB | Industry photo: Healthcare |
| `industries/education-v1.jpg` | `image_053_6d80a7aa6b.jpg` | 73 KB | Industry photo: Education |
| `industries/logistics-v1.jpg` | `image_054_3297de02d9.jpg` | 81 KB | Industry photo: Logistics |
| `industries/hospitality-v1.jpg` | `image_055_2b80e8c182.jpg` | 45 KB | Industry photo: Hospitality |
| `industries/real-operations-cafe-v1.jpg` | `image_025_e79657500b.jpg` | 301 KB | Industries: real-operations cafe photo |
| `pos/dashboard-1-v1.png` | `image_015_3629423731.png` | 1.44 MB | POS dashboards marquee card 1 |
| `pos/dashboard-2-v1.png` | `image_016_2279f8acd3.png` | 138 KB | POS dashboards marquee card 2 |
| `pos/dashboard-3-v1.png` | `image_017_69c7da9b98.png` | 1.46 MB | POS dashboards marquee card 3 |
| `pos/dashboard-4-v1.png` | `image_018_ece8e0bd98.png` | 195 KB | POS dashboards marquee card 4 |
| `pos/dashboard-5-v1.png` | `image_019_0c8ca1f803.png` | 175 KB | POS dashboards marquee card 5 |
| `pos/dashboard-6-v1.png` | `image_020_8c3e46b172.png` | 1.67 MB | POS dashboards marquee card 6 |
| `pos/dashboard-7-v1.png` | `image_021_91ecf11117.png` | 129 KB | POS dashboards marquee card 7 |
| `pos/dashboard-8-v1.png` | `image_022_800378866c.png` | 145 KB | POS dashboards marquee card 8 |
| `about/hero-emblem-v1.png` | `image_026_703ce444ac.png` | 1.44 MB | About hero 3D emblem |
| `about/founders-v1.png` | `image_027_3e533c3f58.png` | 867 KB | About founders team photo |
| `about/belief-author-uditha-v1.webp` | `image_028_1da4e9d05d.webp` | 18 KB | About belief card author: Uditha Nuwan |
| `about/belief-author-athila-v1.webp` | `image_029_3cefd432b7.webp` | 21 KB | About belief card author: Athila Ravindu |
| `about/belief-author-janith-v1.webp` | `image_030_a2878b707f.webp` | 17 KB | About belief card author: Janith Malinda |
| `about/belief-author-sangeeth-v1.webp` | `image_031_2de72b360f.webp` | 20 KB | About belief card author: Sangeeth Madushan |
| `about/blog-workflows-v1.jpg` | `image_036_2ba9227fa2.jpg` | 270 KB | About blog cover 1 (warehouse dashboard) |
| `about/blog-digital-experiences-v1.jpg` | `image_037_aee3c2d767.jpg` | 353 KB | About blog cover 2 (team / operations software) |
| `about/blog-modern-technology-v1.jpg` | `image_038_2b9088e136.jpg` | 346 KB | About blog cover 3 (storefront on devices) |
| `humans/portrait-1-v1.jpg` | `image_039_0face33a9c.jpg` | 18 KB | Humans card 1 (mockup alt: 'Uditha portrait') |
| `humans/portrait-2-v1.jpg` | `image_040_6e296e395a.jpg` | 73 KB | Humans card 2 (mockup alt: 'Janith portrait') |
| `humans/portrait-3-v1.jpg` | `image_041_349eb14ab6.jpg` | 88 KB | Humans card 3 (mockup alt: 'Athila portrait') |
| `humans/portrait-4-v1.jpg` | `image_042_cfb5cc3a2d.jpg` | 49 KB | Humans card 4 (mockup alt: 'Randima portrait') |
| `humans/portrait-5-v1.jpg` | `image_043_9bffaf1741.jpg` | 52 KB | Humans card 5 (mockup alt: 'Sangeeth portrait') |
| `humans/portrait-6-v1.jpg` | `image_044_33ccd29c9a.jpg` | 98 KB | Humans card 6 (mockup alt: 'Sahan portrait') |
| `humans/portrait-7-v1.jpg` | `image_045_50b0bc2b7c.jpg` | 76 KB | Humans card 7 (mockup alt: 'Lahiru portrait') |
| `clients/kbugz-logo-v1.png` | `image_033_f06cc67683.png` | 578 KB | Kbugz logo (hero marquee, stories, About) |
| `clients/road-lanka-motors-logo-v1.png` | `image_034_08d9c5eec1.png` | 707 KB | Road Lanka Motors logo (hero marquee, stories, About) |
| `clients/hunger-food-hub-logo-v1.png` | `image_035_4f75f3b005.png` | 557 KB | The Hunger Food Hub logo (stories, About) |
| `clients/hunger-food-hub-logo-marquee-v1.png` | `image_056_5bf714505f.png` | 1.37 MB | The Hunger Food Hub logo (hero marquee only) |
| `social/facebook-v1.png` | `image_046_fdeb33655f.png` | 3 KB | Footer social icon: Facebook |
| `social/instagram-v1.png` | `image_047_d5dbfb9056.png` | 6 KB | Footer social icon: Instagram |
| `social/linkedin-v1.png` | `image_048_0f520e1468.png` | 4 KB | Footer social icon: LinkedIn |
| `social/tiktok-v2.png` | (added after the mockup copy) | 4 KB | Footer social icon: TikTok |

Totals: 65 files, 31.93 MB; videos 17.30 MB (each under 8 MB).

Notes:
- The favicon / Apple icon are generated at build time from `brand/favicon-v1.png` by `src/app/icon.tsx` and `apple-icon.tsx` (via `src/lib/brandIcon.tsx`); the Open Graph / Twitter card uses `brand/logo-v1.png`. There is no `src/app/icon.png`.
- The Restaurants industry photo and the POS & Retail capability image are the same file (`home/capabilities/pos-retail-v1.jpg`).
- `clients/hunger-food-hub-logo-marquee-v1.png` vs `clients/hunger-food-hub-logo-v1.png` are two different artworks of the same brand in the mockup (AUDIT Q-e: which is canonical is still open).
- Humans portraits are numbered, not named: the mockup's name <-> photo mapping is inconsistent (AUDIT Q6).
- Footer social icons are served unoptimized (`unoptimized` on the `<Image>`); every other image goes through `next/image`.
