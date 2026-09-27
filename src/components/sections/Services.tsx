import { ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/services";
import { bookHref } from "@/lib/site";

// Visual order for the bento grid (the big Visa tile leads). Other lists keep the order in lib/services.ts.
const order = ["Visa Services", "International Flights", "Domestic Flights", "Hotel Booking", "Travel Insurance", "Tour Packages", "Umrah Packages"];
const bentoOrder = [...services].sort((a, b) => order.indexOf(a.title) - order.indexOf(b.title));

export function Services() {
  return (
    <Section id="services">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <SectionHeading
            title="Plan Your Dream Trips With Nigeria's Trusted Travel Partner"
            className="lg:max-w-2xl"
          />
          <div className="flex max-w-md flex-col gap-6">
            <p className="text-base leading-relaxed text-muted sm:text-lg">
              IATA certified travel agency since 2006. Compare all international and domestic airlines with fast,
              cheap, and reliable service. Get exclusive 10% discount for special customers!
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href={bookHref} size="lg" icon={<Plane size={18} />}>
                Book Your Flight
              </Button>
              <Button href="/services" size="lg" variant="white" icon={<ArrowRight size={18} />}>
                Explore Services
              </Button>
            </div>
          </div>
        </div>

        {/*
          Bento grid (4 × 3 on desktop):
          [ Visa 2×2 ][ International 2×1 ]
          [ Visa     ][ Domestic ][ Hotel ]
          [ Insurance][ Tours ][ Umrah 2×1 ]
          Row heights are fixed per breakpoint; tile sizes come from `bento` in lib/services.ts.
        */}
        <div className="mt-12 grid auto-rows-[280px] grid-cols-1 gap-5 sm:mt-16 sm:auto-rows-[260px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {bentoOrder.map(({ icon: Icon, ...service }) => (
            <ServiceCard key={service.title} {...service} icon={<Icon size={20} />} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
