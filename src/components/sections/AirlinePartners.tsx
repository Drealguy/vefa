import Image from "next/image";
import { Marquee } from "@/components/ui/Marquee";
import { Container, Section } from "@/components/ui/Section";

// Official airline logos (SVG, sourced from Wikimedia Commons), stored locally in /public/airlines.
type Airline = { name: string; logo: string; width: number; height: number };

const airlines: Airline[] = [
  { name: "Turkish Airlines", logo: "/airlines/turkish-airlines.svg", width: 211, height: 57 },
  { name: "Qatar Airways", logo: "/airlines/qatar-airways.svg", width: 296, height: 83 },
  { name: "Lufthansa", logo: "/airlines/lufthansa.svg", width: 512, height: 90 },
  { name: "Emirates", logo: "/airlines/emirates.svg", width: 254, height: 175 },
  { name: "British Airways", logo: "/airlines/british-airways.svg", width: 242, height: 38 },
  { name: "Ethiopian Airlines", logo: "/airlines/ethiopian-airlines.svg", width: 570, height: 240 },
  { name: "Air France", logo: "/airlines/air-france.svg", width: 189, height: 18 },
  { name: "KLM", logo: "/airlines/klm.svg", width: 350, height: 204 },
  { name: "EgyptAir", logo: "/airlines/egyptair.svg", width: 816, height: 122 },
  { name: "Royal Air Maroc", logo: "/airlines/royal-air-maroc.svg", width: 512, height: 352 },
  { name: "Kenya Airways", logo: "/airlines/kenya-airways.svg", width: 299, height: 68 },
  { name: "South African Airways", logo: "/airlines/south-african-airways.svg", width: 512, height: 202 },
];

function AirlineLogo({ name, logo, width, height }: Airline) {
  return (
    <div className="flex h-16 w-36 items-center justify-center px-4 sm:h-20 sm:w-44">
      <Image
        src={logo}
        alt={name}
        width={width}
        height={height}
        unoptimized
        loading="eager"
        className="h-auto max-h-9 w-auto max-w-full object-contain sm:max-h-11"
      />
    </div>
  );
}

export function AirlinePartners() {
  return (
    <Section size="sm" aria-label="Our airline partners" className="overflow-hidden">
      <Container>
        <p className="text-center text-base text-muted sm:text-lg">
          Compare and book with the world&apos;s leading airlines
        </p>
      </Container>

      <Marquee
        items={airlines}
        getKey={(a) => a.name}
        renderItem={(a) => <AirlineLogo {...a} />}
        className="mt-8 sm:mt-10"
      />
    </Section>
  );
}
