import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Every content section on the site uses this wrapper so vertical spacing and
 * page width stay identical everywhere. Don't add custom py-* / max-w-* to sections.
 */
export function Section({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section {...props} className={cn("scroll-mt-24 py-20 sm:py-28", className)}>
      {children}
    </section>
  );
}

export function Container({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div {...props} className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6", className)}>
      {children}
    </div>
  );
}
