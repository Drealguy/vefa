"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

// Answers are taken from Vefa's existing website copy. Owner to review.
const faqs = [
  {
    question: "Is Vefa Travel Agency IATA certified?",
    answer:
      "Yes. Vefa Tourism & Travels Ltd. is an IATA certified travel agency and has been trusted by travellers in Nigeria since 2006.",
  },
  {
    question: "What services do you offer?",
    answer:
      "International and domestic flight booking, hotel reservation, travel insurance, visa services, tour packages (solo trips and group tours) and Umrah packages.",
  },
  {
    question: "Do you charge for ticket or hotel reservations?",
    answer:
      "No. We offer free ticket and hotel reservations with no hidden charges. What you see is what you pay.",
  },
  {
    question: "Which airlines can I book with you?",
    answer:
      "We compare all international and domestic airlines, including Turkish Airlines, Qatar Airways, Emirates, Lufthansa, British Airways, Ethiopian Airlines, Air France, KLM, EgyptAir, Royal Air Maroc, Kenya Airways and South African Airways.",
  },
  {
    question: "How fast will my booking be confirmed?",
    answer: "Our booking process is fast. Get your tickets confirmed within minutes.",
  },
  {
    question: "Do you offer any discounts?",
    answer: "Yes. Get an exclusive 10% discount for special customers.",
  },
  {
    question: "How can I reach customer support?",
    answer:
      "Our customer service is available 24/7 to assist you before, during, and after your travel.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq">
      <Container className="max-w-5xl">
        <SectionHeading align="center" title="Frequently Asked Questions" />

        <ul className="mt-12 flex flex-col gap-3 sm:mt-16">
          {faqs.map(({ question, answer }, i) => {
            const isOpen = open === i;
            return (
              <li
                key={question}
                className={cn(
                  "rounded-3xl border transition-colors duration-300",
                  isOpen ? "border-black/10 bg-white" : "border-transparent bg-brand-light/60",
                )}
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-7 sm:py-5"
                  >
                    <span className="font-heading text-base font-semibold text-ink sm:text-lg">{question}</span>
                    <span
                      aria-hidden
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-full transition-colors",
                        isOpen ? "bg-brand text-white" : "bg-white text-ink",
                      )}
                    >
                      {isOpen ? <X size={18} /> : <Plus size={18} />}
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-300",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted sm:px-7 sm:pb-6 sm:text-base">
                      {answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
