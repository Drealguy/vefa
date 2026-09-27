import { Backpack, FileCheck, Hotel, MoonStar, Plane, ShieldCheck, type LucideIcon } from "lucide-react";
import { Marquee } from "@/components/ui/Marquee";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

type Tone = "brand" | "ink" | "deep" | "coral" | "light";

const tones: Record<Tone, { pill: string; icon: string }> = {
  brand: { pill: "bg-brand text-white", icon: "bg-white/20" },
  ink: { pill: "bg-ink text-white", icon: "bg-white/15" },
  deep: { pill: "bg-brand-deep text-white", icon: "bg-white/15" },
  coral: { pill: "bg-brand-coral text-white", icon: "bg-white/20" },
  light: { pill: "bg-brand-light text-brand-deep", icon: "bg-brand/10" },
};

type Item = { label: string; icon: LucideIcon; tone: Tone };

const rowOne: Item[] = [
  { label: "Flight Booking", icon: Plane, tone: "brand" },
  { label: "Hotel Reservation", icon: Hotel, tone: "light" },
  { label: "Travel Insurance", icon: ShieldCheck, tone: "ink" },
  { label: "Visa Services", icon: FileCheck, tone: "coral" },
  { label: "Tour Packages", icon: Backpack, tone: "deep" },
  { label: "Umrah Packages", icon: MoonStar, tone: "light" },
];

const rowTwo: Item[] = [
  { label: "Tour Packages", icon: Backpack, tone: "ink" },
  { label: "Umrah Packages", icon: MoonStar, tone: "brand" },
  { label: "Flight Booking", icon: Plane, tone: "light" },
  { label: "Hotel Reservation", icon: Hotel, tone: "deep" },
  { label: "Travel Insurance", icon: ShieldCheck, tone: "coral" },
  { label: "Visa Services", icon: FileCheck, tone: "ink" },
];

function Pill({ label, icon: Icon, tone }: Item) {
  const t = tones[tone];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-3 rounded-full py-2 pr-6 pl-2 font-heading text-base font-semibold whitespace-nowrap sm:gap-4 sm:py-3 sm:pr-8 sm:pl-3 sm:text-xl",
        t.pill,
      )}
    >
      <span className={cn("flex size-10 items-center justify-center rounded-full sm:size-12", t.icon)}>
        <Icon size={20} />
      </span>
      {label}
    </span>
  );
}

export function ServicesMarquee() {
  return (
    <Section className="overflow-hidden bg-brand-light/40">
      <Container>
        <SectionHeading
          align="center"
          title="Our Premium Services"
          description="Complete travel solutions for all your needs"
        />
      </Container>

      <div className="mt-12 flex flex-col gap-4 sm:mt-16 sm:gap-5">
        <Marquee items={rowOne} getKey={(i) => i.label} renderItem={(i) => <Pill {...i} />} />
        <Marquee items={rowTwo} getKey={(i) => i.label} renderItem={(i) => <Pill {...i} />} reverse />
      </div>
    </Section>
  );
}
