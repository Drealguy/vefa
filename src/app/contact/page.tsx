import type { Metadata } from "next";
import { ContactDetails } from "@/components/sections/ContactDetails";
import { ContactForm } from "@/components/sections/ContactForm";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Faq } from "@/components/sections/Faq";
import { PageHero } from "@/components/sections/PageHero";

export const metadata: Metadata = {
  title: "Contact Us — Vefa Tourism & Travels Ltd.",
  description:
    "Contact Vefa Tourism & Travels Ltd. Suite 219, Nawa Complex, Abuja. +234 803 214 2987, vefatravel22@gmail.com.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <PageHero
        title="Contact Us"
        label="24/7 Support"
        description="Round-the-clock customer service to assist you before, during, and after your travel."
        image="https://images.unsplash.com/photo-1483450388369-9ed95738483c?w=2400&q=80&auto=format"
        imageAlt="Passengers seated inside an airplane cabin"
      />
      <ContactForm />
      <ContactDetails />
      <Faq />
      <CtaBanner />
    </main>
  );
}
