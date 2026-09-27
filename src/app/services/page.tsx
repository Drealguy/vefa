import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export const metadata: Metadata = pageMetadata(
  "Our Services",
  "International and domestic flights, hotel booking, travel insurance, visa services (Dubai, Qatar, Egypt, Morocco, Tanzania from $150), tour packages and Umrah packages.",
  "/services",
);

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Our Services"
        label="Our Premium Services"
        description="Complete travel solutions for all your needs."
        image="/images/services-hero-plane.jpg"
        imageAlt="White airplane in flight"
      />
      <Services />
      <WhyChooseUs />
      <Faq />
      <CtaBanner />
    </main>
  );
}
