import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  tone?: "color" | "white";
  className?: string;
};

export function Logo({ tone = "color", className = "h-9 sm:h-10" }: LogoProps) {
  return (
    <Link href="/" aria-label="Vefa Tourism & Travels Ltd. — home" className="inline-flex shrink-0">
      <Image
        src={tone === "white" ? "/brand/vefa-logo-white.png" : "/brand/vefa-logo.png"}
        alt="Vefa Tourism & Travels Ltd."
        width={412}
        height={85}
        preload
        className={cn("w-auto", className)}
      />
    </Link>
  );
}
