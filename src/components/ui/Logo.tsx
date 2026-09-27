import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  // auto = colour logo in light mode, white logo in dark mode.
  tone?: "color" | "white" | "auto";
  className?: string;
};

const src = { color: "/brand/vefa-logo.png", white: "/brand/vefa-logo-white.png" };

function LogoImage({ tone, className }: { tone: "color" | "white"; className?: string }) {
  return (
    <Image
      src={src[tone]}
      alt="Vefa Tourism & Travels Ltd."
      width={412}
      height={85}
      preload
      className={cn("w-auto", className)}
    />
  );
}

export function Logo({ tone = "auto", className = "h-9 sm:h-10" }: LogoProps) {
  return (
    <Link href="/" aria-label="Vefa Tourism & Travels Ltd. home" className="inline-flex shrink-0">
      {tone === "auto" ? (
        <>
          <LogoImage tone="color" className={cn(className, "dark:hidden")} />
          <LogoImage tone="white" className={cn(className, "hidden dark:block")} />
        </>
      ) : (
        <LogoImage tone={tone} className={className} />
      )}
    </Link>
  );
}
