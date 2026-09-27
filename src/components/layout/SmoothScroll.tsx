"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

// Room for the fixed navbar when jumping to a section.
const OFFSET = "top 80px";

/**
 * GSAP ScrollSmoother around the page content. Fixed-position UI (navbar, popups)
 * must render OUTSIDE this wrapper (or via a portal), because the content is transformed.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const smoother = reduceMotion
        ? null
        : ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: 1.2,
            smoothTouch: 0.1,
          });

      // Scroll reveal: text fades and slides up as it enters the viewport (once).
      if (!reduceMotion) {
        const text = gsap.utils
          .toArray<HTMLElement>(
            "#smooth-content :is(main, footer) :is(h1, h2, h3, p, dl, label, blockquote)",
          )
          .filter((el) => !el.closest("[aria-hidden], article, form, [data-no-reveal]"));
        gsap.set(text, { autoAlpha: 0, y: 32 });
        ScrollTrigger.batch(text, {
          start: "top 92%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }),
        });
      }

      const scrollToEl = (el: Element, animate: boolean) => {
        if (smoother) smoother.scrollTo(el, animate, OFFSET);
        else el.scrollIntoView({ behavior: animate ? "smooth" : "auto" });
      };

      // URLs never keep a #hash: /#book scrolls to the section, then the address bar is cleaned to "/".
      const cleanUrl = () => history.replaceState(history.state, "", window.location.pathname + window.location.search);

      // Arriving on a page with a hash (e.g. "Book a Flight" from the About page).
      const target = window.location.hash && document.querySelector(window.location.hash);
      if (target) scrollToEl(target, false);
      if (window.location.hash) cleanUrl();

      // Same-page anchor links scroll smoothly without adding a hash to the URL.
      const onClick = (e: MouseEvent) => {
        const link = (e.target as HTMLElement).closest("a");
        if (!link || !link.hash) return;
        const url = new URL(link.href);
        if (url.pathname !== window.location.pathname) return;
        const el = document.querySelector(link.hash);
        if (!el) return;
        e.preventDefault();
        scrollToEl(el, true);
      };
      document.addEventListener("click", onClick);

      return () => {
        document.removeEventListener("click", onClick);
        smoother?.kill();
      };
    },
    { dependencies: [pathname], revertOnUpdate: true },
  );

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
