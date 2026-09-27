import { PromoPopup } from "@/components/layout/PromoPopup";
import { AirlinePartners } from "@/components/sections/AirlinePartners";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ServicesMarquee } from "@/components/sections/ServicesMarquee";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <AirlinePartners />
      <Services />
      <WhyChooseUs />
      <ServicesMarquee />
      <Faq />
      <CtaBanner />
      <PromoPopup />
    </main>
  );
}
