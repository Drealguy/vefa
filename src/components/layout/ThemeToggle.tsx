"use client";

import { Moon, Sun } from "lucide-react";
import { THEME_KEY } from "@/lib/theme";

/**
 * Light/dark switch. The theme lives as a `dark` class on <html> (set before paint by the
 * inline script in layout.tsx) and is remembered in localStorage. Icons swap via CSS,
 * so there's no hydration mismatch.
 */
export function ThemeToggle() {
  function toggle() {
    const dark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem(THEME_KEY, dark ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Light / dark mode"
      className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-colors hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <Moon size={20} className="dark:hidden" />
      <Sun size={20} className="hidden dark:block" />
    </button>
  );
}
