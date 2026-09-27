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
2. Who We Are (`WhoWeAre.tsx`): photo panel + 3 paragraphs + facts row (2006 / IATA / 24/7), all from existing copy.
3. Services (same component as home).
4. Team (`Team.tsx`): Athenisec-style list + photo. Currently one member: Feranmi Ojediji (spelling to confirm; owner typed "ojedji"). Photo was sent mid-turn and never saved. Put it at `public/team/feranmi-ojediji.jpg` and set `photo`. Role to confirm.
5. FAQ.
6. CTA banner.

## Services page (`src/app/services/page.tsx`), in order
1. PageHero: "Our Services".
2. Services grid: 7 `ServiceCard`s (`components/ui/ServiceCard.tsx`). Photo + icon + title; hover (desktop) or tap (mobile) reveals the description. Visa Services is a wide card showing "From $150" plus the visa price list on reveal.
3. Why choose us. 4. FAQ. 5. CTA.
- Service data (titles, descriptions, images, prices) lives in `src/lib/services.ts`. Footer service links are generated from it.
- Umrah description is a placeholder ("Contact us for our current Umrah packages"). Owner to supply details.

## Contact page (`src/app/contact/page.tsx`), in order
1. PageHero: "Contact Us".
2. ContactForm (`ContactForm.tsx`, `#enquiry`): conversational form, one question at a time (7 steps, progress bar, Enter to continue, Back). No backend: "Send" opens the visitor's email app to vefatravel22@gmail.com with the answers filled in. TODO: real form service / API route.
3. ContactDetails: phone, email, address cards + Google Maps embed (no API key; uses maps.google.com `output=embed`).
4. FAQ. 5. CTA.
- Contact info lives in `lib/site.ts` (`contact`): +234 803 214 2987, vefatravel22@gmail.com, Suite 219, Nawa Complex, Abuja. The footer shows all three.

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
- Favicon: `src/app/icon.png` + `apple-icon.png` (cropped from the logo mark).
- Still hot-linked: Unsplash photos, Pinterest service images. Move into `/public` before launch (downloading needs the owner's OK).
- Unsplash URLs must keep `?w=2400&q=80&auto=format`.

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
