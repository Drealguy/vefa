import Image from "next/image";
import { Container } from "@/components/ui/Section";

type PageHeroProps = {
  title: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
};

/** Compact hero for inner pages: photo, left-aligned title, labelled intro below a divider. */
export function PageHero({ title, label, description, image, imageAlt }: PageHeroProps) {
  return (
    <section className="relative isolate flex min-h-[420px] items-end overflow-hidden bg-ink sm:min-h-[480px] lg:min-h-[540px]">
      <Image src={image} alt={imageAlt} fill preload sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/60 to-ink/40" />

      <Container className="pt-32 pb-12 sm:pb-16">
        <h1 className="text-4xl leading-none font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">{title}</h1>

        <div className="mt-8 grid gap-3 border-t border-white/20 pt-6 sm:mt-10 sm:grid-cols-[200px_1fr] sm:gap-10 sm:pt-8 lg:grid-cols-[260px_1fr]">
          <p className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase sm:text-sm">{label}</p>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 sm:border-l sm:border-white/20 sm:pl-10 sm:text-lg">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
