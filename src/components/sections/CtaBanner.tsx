import Image from "next/image";
import { ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { bookHref } from "@/lib/site";

export function CtaBanner() {
  return (
    <Section className="relative isolate overflow-hidden">
      <Image
        src="/images/hero-plane-wing.jpg"
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover object-bottom"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/85 to-background/40" />

      <Container className="flex max-w-4xl flex-col items-center text-center">
        <p className="rounded-full bg-surface px-4 py-1.5 text-xs font-semibold tracking-[0.15em] text-brand uppercase ring-1 ring-line sm:text-sm">
          Trusted travel agency in Nigeria
        </p>
        <h2 className="mt-6 text-4xl leading-tight font-bold tracking-tight text-balance text-fg sm:text-5xl lg:text-6xl">
          Book Your Flight With Nigeria&apos;s Trusted Travel Partner
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg/75 sm:text-lg">
          Compare all international and domestic airlines with fast, cheap, and reliable service.
        </p>
        <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          <Button href={bookHref} size="lg" icon={<Plane size={18} />}>
            Book Your Flight
          </Button>
          <Button href="/services" size="lg" variant="white" icon={<ArrowRight size={18} />}>
            Explore Services
          </Button>
        </div>
      </Container>
    </Section>
  );
}
