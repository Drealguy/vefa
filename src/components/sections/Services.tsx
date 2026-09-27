import { ArrowRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/lib/services";
import { bookHref } from "@/lib/site";

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
              <Button href={bookHref} icon={<Plane size={18} />}>
                Book Your Flight
              </Button>
              <Button href="/services" variant="white" icon={<ArrowRight size={18} />}>
                Explore Services
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map(({ icon: Icon, ...service }) => (
            <ServiceCard key={service.title} {...service} icon={<Icon size={20} />} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
