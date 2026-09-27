import type { Metadata } from "next";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { WhoWeAre } from "@/components/sections/WhoWeAre";

export const metadata: Metadata = {
  title: "About Us — Vefa Tourism & Travels Ltd.",
  description: "IATA certified travel agency in Nigeria, trusted by travellers since 2006.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="About Us"
        label="Our Story"
        description="Nigeria's trusted travel partner. IATA certified travel agency since 2006."
        image="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=2400&q=80&auto=format"
        imageAlt="Traveller on a boat looking out over a mountain lake"
      />
      <WhoWeAre />
      <Services />
      <Team />
      <Faq />
      <CtaBanner />
    </main>
  );
}
