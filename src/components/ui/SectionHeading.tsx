import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, align = "left", className }: SectionHeadingProps) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-brand uppercase sm:text-sm",
            align === "center" && "justify-center",
          )}
        >
          <span aria-hidden className="h-px w-6 bg-brand" />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl leading-tight font-bold tracking-tight text-balance text-fg sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </div>
  );
}
