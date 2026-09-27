import Image from "next/image";
import type { ReactNode } from "react";
import { CountUp } from "@/components/ui/CountUp";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Facts only, taken from Vefa's existing copy. Years of experience stays correct as time passes (2026 → 20).
const FOUNDED = 2006;
const years = new Date().getFullYear() - FOUNDED;

const facts: { value: ReactNode; label: string }[] = [
  { value: <CountUp to={years} suffix="+" />, label: "Years of experience" },
  { value: <CountUp from={1990} to={FOUNDED} />, label: "Trusted since" },
  { value: "IATA", label: "Certified agency" },
  { value: <CountUp to={24} suffix="/7" duration={1.5} />, label: "Customer support" },
];

export function WhoWeAre() {
  return (
    <Section id="who-we-are">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="rounded-[2rem] bg-brand/5 p-4 sm:p-6 lg:p-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[4/5]">
            <Image
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=80&auto=format"
              alt="Tropical beach with clear blue water"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <SectionHeading title="Who We Are" />
          <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Vefa Tourism &amp; Travels Ltd. is an IATA certified travel agency in Nigeria, trusted by travellers
              since 2006.
            </p>
            <p>
              We compare all international and domestic airlines with fast, cheap, and reliable service, and offer
              free ticket and hotel reservations with no hidden charges. What you see is what you pay.
            </p>
            <p>
              From flight booking and hotel reservation to travel insurance, visa services, tour packages and Umrah
              packages, we assist you before, during, and after your travel.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 border-t border-black/5 pt-8 sm:grid-cols-4">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-heading text-3xl font-bold text-brand sm:text-4xl">{fact.value}</dd>
                <dd className="mt-1 text-sm text-muted sm:text-base">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
