# Progress & Handoff

Read this, `AGENTS.md` (includes the strict design system), and `prompts.md` before continuing work. Update this file at the end of each work session.

## Client
Vefa Tourism & Travels Ltd. — IATA-certified travel agency in Nigeria (since 2006). (The project folder is named "vega"; the brand is **Vefa**.) Phone on their flyer: 08032142987.

## Site-wide (`src/app/layout.tsx`)
- **Navbar**: transparent over the page hero with the white logo; full-width white bar with the colour logo on scroll. Current page highlighted. Mobile: hamburger dropdown.
- **Footer** (`#contact`): white; logo + tagline, Company links, Services links, "Book With Us" column, © bar.
- Links and labels live in `src/lib/site.ts`.

## Home page (`src/app/page.tsx`), in order
1. Hero: centred copy + flight search bar overlapping the bottom.
2. Airline partners strip: small muted caption + marquee of 12 plain, full-colour airline logos. No cards, shadows or button.
3. Services: old-site copy + grid of all 7 services (shared `Services` section, also used on About and Services pages).
4. Why choose us (`#why-us`): accordion of 6 reasons + photo.
5. Our Premium Services: two-row pill marquee.
6. FAQ (`#faq`).
7. CTA banner.
- **Promo popup** (`components/layout/PromoPopup.tsx`): "Jummah Mubarak / Friday Promo" flyer (`public/promos/friday-promo.webp`) opens 1.5 s after load on the home page. Close via ×, clicking outside, or Esc; stays closed for the rest of the visit (sessionStorage). Rendered through a portal to <body> and pauses ScrollSmoother while open. Old Doha flyer archived in references/.

## About page (`src/app/about/page.tsx`), in order
1. PageHero (compact): "About Us", "Our Story" label + one-line intro.
2. Who We Are (`WhoWeAre.tsx`): photo panel + 3 paragraphs + facts row: "20+ Years of experience" (computed from 2006, so it updates yearly), 2006, IATA, 24/7. Numbers count up on scroll (`ui/CountUp.tsx`).
3. Services (same component as home).
4. Team (`Team.tsx`): Athenisec-style list + photo. Currently one member: Feranmi Ojediji (spelling to confirm; owner typed "ojedji"). Photo was sent mid-turn and never saved. Put it at `public/team/feranmi-ojediji.jpg` and set `photo`. Role to confirm.
5. FAQ.
6. CTA banner.

## Services page (`src/app/services/page.tsx`), in order
1. PageHero: "Our Services".
2. Services bento grid (desktop 4×3: Visa 2×2, International 2×1, Domestic, Hotel, Insurance, Tours, Umrah 2×1; tile size = `bento` in `lib/services.ts`; per-photo crop = `imagePosition`): 7 `ServiceCard`s (`components/ui/ServiceCard.tsx`). Photo + icon + title; hover (desktop) or tap (mobile) reveals the description. Visa Services is a wide card showing "From $150" plus the visa price list on reveal.
3. Why choose us. 4. FAQ. 5. CTA.
- Service data (titles, descriptions, images, prices) lives in `src/lib/services.ts`. Footer service links are generated from it.
- Umrah description is a placeholder ("Contact us for our current Umrah packages"). Owner to supply details.

## Contact page (`src/app/contact/page.tsx`), in order
1. PageHero: "Contact Us".
2. ContactForm (`ContactForm.tsx`, `#enquiry`): conversational form, one question at a time (7 steps, progress bar, Enter to continue, Back). No backend: "Send" opens the visitor's email app to vefatravel22@gmail.com with the answers filled in. TODO: real form service / API route.
3. ContactDetails: phone, email, address cards + Google Maps embed (no API key; uses maps.google.com `output=embed`).
4. FAQ. 5. CTA.
- Contact info lives in `lib/site.ts` (`contact`): +234 803 214 2987, vefatravel22@gmail.com, Suite 219, Nawa Complex, Abuja. The footer shows all three.

## Flight search (home hero)
- `components/booking/FlightSearch.tsx`: From/To use `AirportField` (custom autocomplete over `lib/airports.ts`: type a city, code or country), date, `TravellersPicker`. Submitting POSTs to `/api/flights` and shows `FlightResults` under the bar: "N flights available", route/date/travellers, and one row per flight (logo, flight no., times, duration, stops, price, "Book this flight", which emails vefatravel22@gmail.com with the flight details).
- `src/app/api/flights/route.ts`: with `DUFFEL_ACCESS_TOKEN` in `.env.local` it returns **live** offers from the Duffel API. Without it, it returns **sample fares** (`lib/flights.ts` `sampleOffers`, generated from the route and date), and the UI shows a "Sample fares. Our team confirms live prices." badge. Never remove that badge while results are samples.
- **Duffel test mode is connected (2026-09-27):** a `duffel_test_…` token is in `.env.local` (git-ignored, never commit it). With a test token the API returns Duffel's simulated airline data (`test: true`) and the results show a "Test mode: demo fares, not live prices." badge. Test prices come back in EUR (the Duffel account's currency).
- **Deploying:** add `DUFFEL_ACCESS_TOKEN` to the hosting env vars (e.g. Vercel → Settings → Environment Variables); `.env.local` is not deployed.
- **Prices are always shown in naira:** `/api/flights` converts non-NGN prices with the daily rate from open.er-api.com (`lib/fx.ts`, cached 12 h), rounds to ₦100, and returns `originalPrice/originalCurrency`; the UI shows "≈ €228 at today's rate" underneath. If the rate can't be fetched, prices stay in the original currency.
- **Going live:** swap in a `duffel_live_…` token; the badge disappears automatically.

## Dark mode
- Toggle: `components/layout/ThemeToggle.tsx` (white round button after "Book a Flight" in the navbar). Adds/removes `.dark` on <html>, saved in localStorage `vefa-theme` (key in `lib/theme.ts`). An inline script in `layout.tsx` applies it before first paint. Default is light.
- Theme tokens in `globals.css` (flip under `.dark`): `bg-background`, `bg-surface` (cards/panels/dropdowns/footer), `text-fg` (headings/strong text), `border-line`/`ring-line`/`divide-line`, `bg-tint` / `hover:bg-tint-strong` (pink surfaces), `text-muted`.
- `ink` is ALWAYS dark (photo overlays, dark pills). Use `text-fg` for text on page surfaces. White buttons / round icon buttons stay `bg-white text-ink` in both themes.
- `Logo tone="auto"`: colour logo in light, white logo in dark (navbar when scrolled, footer). Airline strip logos turn white in dark; result-row logos sit on a white chip.

## WhatsApp = the way customers submit
- `lib/site.ts`: `contact.whatsapp` ("2348032142987") + `whatsappHref(message)`.
- Contact form "Send on WhatsApp" opens a chat with every answer prefilled; the thank-you screen has an "Open WhatsApp" fallback button.
- Flight results: "Book on WhatsApp" with the flight, route, date, travellers and price prefilled.
- Contact page: WhatsApp card first; footer lists WhatsApp too.

## SEO & share previews
- Root `layout.tsx`: `metadataBase` from `siteUrl` (`lib/site.ts`: `NEXT_PUBLIC_SITE_URL`, else Vercel's production URL, else localhost), title template "%s | Vefa Tourism & Travels", description, keywords, canonical, Open Graph + Twitter card, robots, and TravelAgency JSON-LD (name, phone, email, address, services).
- Per-page metadata via `pageMetadata()` in `lib/seo.ts` (fills OG/Twitter fully, because page-level objects replace the root ones).
- Share image: `src/app/opengraph-image.jpg` + `twitter-image.jpg` = a real screenshot of the home hero (owner asked for this), 1200×630 JPEG. Regenerate after hero changes by screenshotting a production build (`next start`) at 1440×756 @2x and resizing to 1200×630. WhatsApp/Facebook cache previews, so a link shared before this change may keep its old (empty) preview for a while.
- `sitemap.ts` + `robots.ts` (API routes disallowed).
- **When the custom domain is live, set `NEXT_PUBLIC_SITE_URL=https://yourdomain` in the hosting env vars.**

## URLs
- URLs never keep a `#`. Nav = Home, About Us, Services, Contact (real pages). "Book a Flight" (`/#book`) scrolls to the flight search and SmoothScroll strips the hash from the address bar.

## Smooth scrolling
- GSAP ScrollSmoother (`components/layout/SmoothScroll.tsx`) wraps page content + footer in the root layout. The Navbar sits outside it.
- **Any `position: fixed` UI must render outside `#smooth-content`** (in the layout or via `createPortal`), because the content is transformed.
- Same-page `#hash` links are intercepted and smooth-scrolled with an 80px navbar offset; arriving at `/page#hash` also scrolls. Disabled for reduced-motion users.
- `html { scroll-behavior: smooth }` was removed; don't re-add it (it conflicts).
- **Scroll reveal:** SmoothScroll also fades and slides up every h1/h2/h3/p/dl/label/blockquote in main + footer as it enters view (GSAP ScrollTrigger.batch, once). Skips anything inside `[aria-hidden]`, `article`, `form`, or `[data-no-reveal]`. Add `data-no-reveal` to text that sits at the very bottom of the page.

## Shared components
- `ui/Section.tsx` (`Section`, `Container`): standard spacing and width for every section.
- `ui/Button.tsx`: `primary` (red) and `white` only.
- `ui/ImageCard.tsx`, `ui/SectionHeading.tsx`, `ui/Logo.tsx`, `ui/Marquee.tsx`.
- `booking/FlightSearch.tsx`: UI only. `booking/TravellersPicker.tsx`: custom travellers dropdown (adults/children/infants steppers, max 9 total, infants ≤ adults).
- `lib/cn.ts`.

## Assets
- Logos: `public/brand/`. Promo flyers: `public/promos/`.
- Airline logos: stored locally in `public/airlines/*.svg`.
- Favicon: `src/app/icon.png` + `apple-icon.png`: logo mark on a white rounded square so it shows on light and dark browser themes.
- **All photos are local** in `public/images/` (13 files: page heroes, why-us, who-we-are, 7 service cards). No remote image hosts remain (`next.config.ts` has no remotePatterns). Remote Unsplash/Pinterest images used to time out in the Next image optimizer.

## Open items / next up
- Team: real names, roles, photos.
- Still need: WhatsApp confirmation and social links.
- Prompt 5 was cut off ("ofc the card section should have like").
- CTA heading assembled from existing copy. Owner to confirm.
- Flight search needs a real booking provider/backend.
- Repo: https://github.com/Drealguy/VEFA (branch `main`).

## Decisions log
- 2026-09-27: Stack: Next.js 16 + Tailwind v4. Headings Rethink Sans, body DM Sans, brand `#E81120`.
- 2026-09-27: Buttons are solid red or solid white only.
- 2026-09-27: Red-family tokens: `brand-deep` #8A0912, `brand-coral` #FF5A64, `brand-light` #FFE4E6.
- 2026-09-27: Icons: `lucide-react` only; no emojis.
- 2026-09-27: Use the owner's copy exactly; no invented extras.
- 2026-09-27: Strict spacing system via `Section`/`Container`; FAQ always right before the CTA; partner logos are plain (no cards/shadows).
