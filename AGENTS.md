<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Vega — project rules (for any AI or developer)

Vega is a travel website redesign. Before doing anything, read:
1. `project-docs/progress.md` — where the project is and what's next
2. `project-docs/prompts.md` — every instruction the owner has given, in order

## Every session
- Append each new owner prompt, word for word, to `project-docs/prompts.md` before acting on it.
- Update `project-docs/progress.md` (current state, next up, decisions) before finishing.

## Brand
- Brand colour: `#E81120` — use `brand` in Tailwind (`bg-brand`, `text-brand`) or `var(--brand)`. Never hardcode the hex.
- Headings: Rethink Sans (`font-heading`, applied to h1–h6 automatically). Body: DM Sans (`font-sans`, the default).
- Add any new colours, radii, shadows, or spacing as tokens in `src/app/globals.css`, never as one-off values.

## Consistency (strict)
- Everything must look and behave the same across the whole site: buttons, cards, inputs, badges, sections, spacing.
- Shared UI lives in `src/components/ui/` (Button, Card, etc.). Every page uses these, never restyled copies.
- If a design needs a new look, add a variant to the shared component instead of styling it inline on the page.
- Buttons are solid red (`primary`) or solid white (`white`) only. No transparent, outline or ghost buttons, including icon buttons.
- Icons: use `lucide-react` only. Never use emojis as icons, and never hand-draw SVG icons.
- Use the owner's copy exactly as given. Don't invent taglines, stats, labels or decorative extras.
- Every section must be responsive (mobile first). Check phone and desktop before calling it done.
- Merge class names with `cn()` from `src/lib/cn.ts` so overrides passed into components win.

## Design system (strict)
- **Spacing:** every content section is wrapped in `<Section>` + `<Container>` from `src/components/ui/Section.tsx` (default py-20 / sm:py-28; `size="sm"` = py-12 / sm:py-16 for slim bands like the logo strip; max-w-7xl; px-4 / sm:px-6). Never add custom section padding or widths, and never add extra py inside a section.
- **Heading → content gap:** `mt-12 sm:mt-16` between a SectionHeading and the section body.
- **Headings:** use `SectionHeading` (h2: text-3xl / sm:text-4xl / lg:text-5xl, bold, text-ink). Body text: text-base / sm:text-lg, text-muted.
- **Radius:** cards and images `rounded-3xl`; image panels `rounded-[2rem] bg-brand/5` with padding; buttons, pills and chips `rounded-full`.
- **Dark mode:** never hard-code `bg-white`/`text-ink`/`border-black` for page surfaces or text. Use the theme tokens `bg-surface`, `text-fg`, `border-line`, `bg-tint`. `ink` and `white` are only for things that look the same in both themes (photo overlays, white buttons).
- **Colour:** brand red, ink (black), white, plus the red-family tokens. Nothing else. Tinted surfaces (closed accordion items, info cards) use `bg-brand-light/60`; image panels and placeholders use `bg-brand/5`. No greys for surfaces.
- **Button sizes:** `size="lg"` for section-level calls to action (hero, section intros, CTA banner); `md` inside cards, dropdowns and the footer. Always use `<Button>`, never a hand-styled button.
- **Images:** store every image in `/public` (photos in `public/images/`). No hot-linked images.
- **Logos and partner strips:** plain logos, no cards, borders or shadows.
- **No decorative shadows** on cards, accordions or list items. Separate them with fills or a thin `border-black/10`. Shadows are only for elements floating over other content (flight search bar, popup).
- **Width:** full sections use the standard Container. Text-heavy blocks like the FAQ use `max-w-5xl` (about 80% of the page), not narrow columns.
- **References:** when the owner sends a design reference, copy its layout and structure, but always build it with OUR tokens, components, fonts, colours and spacing. Never copy the reference's own styling.
- **Page order:** FAQ is always the last section before the CTA banner. Navbar and Footer live in the root layout.
