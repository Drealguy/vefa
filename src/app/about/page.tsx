import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { WhoWeAre } from "@/components/sections/WhoWeAre";

export const metadata: Metadata = pageMetadata(
  "About Us",
  "Vefa Tourism & Travels Ltd. is an IATA certified travel agency in Abuja, Nigeria, trusted by travellers since 2006 for flights, hotels, visas, insurance, tours and Umrah.",
  "/about",
);

export default function AboutPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="About Us"
        label="Our Story"
        description="Nigeria's trusted travel partner. IATA certified travel agency since 2006."
        image="/images/about-hero-lake.jpg"
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
