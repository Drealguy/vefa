"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container, Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";

// Team photos live in /public/team. Add more members here as the owner sends them.
type Member = { name: string; role?: string; photo?: string };

const team: Member[] = [
  // TODO: photo /team/feranmi-ojediji.jpg once the file is received; role to confirm.
  { name: "Feranmi Ojediji" },
];

export function Team() {
  const [active, setActive] = useState(0);
  const current = team[active];

  return (
    <Section id="team">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <p className="inline-flex items-center gap-2 self-start text-sm text-muted lg:col-start-1 lg:row-start-1">
          <span aria-hidden className="size-1.5 bg-brand" />
          IATA certified since 2006
        </p>
        <h2 className="text-3xl leading-tight font-bold tracking-tight text-balance text-ink sm:text-4xl lg:col-start-2 lg:row-start-1 lg:text-5xl">
          Meet the team behind Vefa Tourism &amp; Travels
        </h2>

        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-brand/5 lg:col-start-1 lg:row-start-2">
          {current.photo ? (
            <Image src={current.photo} alt={current.name} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-muted">
              <ImageIcon size={28} />
              <span className="text-sm">{current.name}</span>
            </div>
          )}
        </div>

        <div className="lg:col-start-2 lg:row-start-2">
          <ul>
            {team.map((member, i) => (
              <li key={i}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={i === active}
                  className={cn(
                    "grid w-full grid-cols-2 gap-4 border-b py-5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    i === active ? "border-ink text-ink" : "border-black/10 text-muted/70 hover:text-ink",
                  )}
                >
                  <span className="font-heading text-lg font-semibold">{member.name}</span>
                  {member.role && <span className="text-[15px]">{member.role}</span>}
                </button>
              </li>
            ))}
          </ul>

          <Button href="/contact" size="lg" className="mt-10" icon={<ArrowRight size={18} />}>
            Connect With Our Team
          </Button>
        </div>
      </Container>
    </Section>
  );
}
