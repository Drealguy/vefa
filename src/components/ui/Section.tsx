import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const spacing = {
  // Standard content section.
  md: "py-20 sm:py-28",
  // Slim band (e.g. the airline logo strip) that sits between two full sections.
  sm: "py-12 sm:py-16",
};

/**
 * Every content section on the site uses this wrapper so vertical spacing and
 * page width stay identical everywhere. Don't add custom py-* / max-w-* to sections.
 */
export function Section({
  size = "md",
  className,
  children,
  ...props
}: ComponentProps<"section"> & { size?: keyof typeof spacing }) {
  return (
    <section {...props} className={cn("scroll-mt-24", spacing[size], className)}>
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
