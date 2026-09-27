import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

// Only two button styles exist on this site: solid red and solid white. No transparent buttons.
type Variant = "primary" | "white";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-semibold whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark hover:-translate-y-0.5",
  white:
    "border border-black/10 bg-white text-ink hover:text-brand hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-base",
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type ButtonProps = BaseProps &
  (
    | ({ href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">)
  );

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({ variant = "primary", size = "md", icon, className, children, ...props }: ButtonProps) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {children}
      {icon}
    </>
  );

  if (props.href !== undefined) {
    return (
      <Link {...(props as ComponentProps<typeof Link>)} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button {...(props as ComponentProps<"button">)} className={classes}>
      {content}
    </button>
  );
}
