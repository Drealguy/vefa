import Image from "next/image";
import { ArrowRight, Plane } from "lucide-react";
import { FlightSearch } from "@/components/booking/FlightSearch";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <div className="relative">
      <section className="relative isolate flex min-h-[88svh] items-center justify-center overflow-hidden bg-ink pb-28 sm:pb-24 lg:min-h-[92svh]">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=2400&q=80&auto=format"
          alt="View of the sky from an airplane window"
          fill
          preload
          sizes="100vw"
          className="-z-20 object-cover"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-ink/60" />

        <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 pt-32 text-center sm:px-6 sm:pt-40">
          <p className="text-sm font-medium tracking-[0.15em] text-white/85 uppercase sm:text-base">
            Trusted travel agency in Nigeria
          </p>

          <h1 className="mt-4 text-4xl leading-[1.05] font-bold tracking-tight text-balance text-white sm:mt-6 sm:text-6xl lg:text-7xl">
            Explore The World With Vefa Travel Agency
          </h1>

          <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Button href="#book" size="lg" icon={<Plane size={18} />}>
              Book Your Flight
            </Button>
            <Button href="/services" size="lg" variant="white" icon={<ArrowRight size={18} />}>
              View Our Services
            </Button>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-20 max-w-6xl px-4 sm:px-6">
        <FlightSearch />
      </div>
    </div>
  );
}
