"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ArrowUpRight,
  BadgePercent,
  Globe,
  Headphones,
  ShieldCheck,
  Ticket,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type Reason = { title: string; description: string; icon: LucideIcon };

const reasons: Reason[] = [
  {
    title: "Fast Service",
    icon: Zap,
    description:
      "Lightning-fast booking process with 24/7 customer support. Get your tickets confirmed within minutes.",
  },
  {
    title: "Best Prices",
    icon: BadgePercent,
    description: "Compare all airlines and get the affordable flights.",
  },
  {
    title: "Reliable & Trusted",
    icon: ShieldCheck,
    description:
      "IATA certified and trusted travel agency in Nigeria since 2006. Your journey is our priority.",
  },
  {
    title: "Free Reservations",
    icon: Ticket,
    description:
      "Enjoy free ticket and hotel reservations with no hidden charges. What you see is what you pay.",
  },
  {
    title: "Global Coverage",
    icon: Globe,
    description:
      "Access to international and domestic flights worldwide with major airlines and local carriers.",
  },
  {
    title: "24/7 Support",
    icon: Headphones,
    description: "Round-the-clock customer service to assist you before, during, and after your travel.",
  },
];

export function WhyChooseUs() {
  const [active, setActive] = useState(0);

  return (
    <Section id="why-us">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading title="Experience the difference with our premium travel services" />

          <ul className="mt-12 flex flex-col gap-3 sm:mt-16">
            {reasons.map(({ title, description, icon: Icon }, i) => {
              const isActive = i === active;
              return (
                <li key={title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-expanded={isActive}
                    className={cn(
                      "w-full rounded-2xl px-5 py-5 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-7",
                      isActive ? "bg-brand text-white" : "bg-ink/[0.04] text-ink hover:bg-ink/[0.07]",
                    )}
                  >
                    <span className="flex items-center gap-4">
                      <Icon size={22} className={cn("shrink-0", !isActive && "text-brand")} />
                      <span className="flex-1 font-heading text-lg font-semibold sm:text-xl">{title}</span>
                      <ArrowUpRight size={20} className={cn("shrink-0", !isActive && "text-muted")} />
                    </span>
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300",
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-3 pl-[38px] text-[15px] leading-relaxed text-white/90 sm:text-base">
                          {description}
                        </span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-[2rem] bg-brand/5 p-4 sm:p-6 lg:p-8">
          <div className="relative aspect-[4/5] h-full overflow-hidden rounded-3xl sm:aspect-[4/3] lg:aspect-auto lg:min-h-[560px]">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2400&q=80&auto=format"
              alt="Traveller planning a trip with a map and camera"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
