"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/cn";
import { bookHref, navLinks as links } from "@/lib/site";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid ? "bg-surface shadow-md shadow-black/5" : "bg-transparent",
      )}
    >
      <nav aria-label="Main" className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4 px-4 sm:h-20 sm:px-6">
          <Logo tone={solid ? "auto" : "white"} className="h-8 sm:h-10" />

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={link.href === pathname ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                    solid ? "text-fg hover:text-brand" : "text-white/90 hover:text-white",
                    link.href === pathname && (solid ? "text-brand" : "text-white"),
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              href={bookHref}
              variant={solid ? "primary" : "white"}
              className="hidden sm:inline-flex"
              icon={<ArrowRight size={18} />}
            >
              Book a Flight
            </Button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className={`inline-flex size-11 items-center justify-center rounded-full transition-colors lg:hidden ${
                solid ? "bg-brand text-white hover:bg-brand-dark" : "bg-white text-ink hover:text-brand"
              }`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={`grid transition-[grid-template-rows] duration-300 lg:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="flex flex-col gap-1 border-t border-line px-4 py-4 sm:px-6">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    tabIndex={open ? 0 : -1}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-fg transition-colors hover:bg-brand/5 hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 sm:hidden">
                <Button
                  href={bookHref}
                  size="lg"
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="w-full"
                  icon={<ArrowRight size={18} />}
                >
                  Book a Flight
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
