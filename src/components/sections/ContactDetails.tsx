import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { contact, whatsappHref } from "@/lib/site";

function Detail({ icon, label, href, children }: { icon: ReactNode; label: string; href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-5 rounded-3xl bg-tint p-5 transition-colors hover:bg-tint-strong sm:p-6"
    >
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand text-white">{icon}</span>
      <span className="min-w-0">
        <span className="block text-sm text-muted">{label}</span>
        <span className="block font-heading text-base font-semibold break-all text-fg sm:break-words group-hover:text-brand sm:text-xl">
          {children}
        </span>
      </span>
    </a>
  );
}

export function ContactDetails() {
  return (
    <Section>
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* min-w-0 lets the column shrink below the long email address on small phones. */}
        <div className="min-w-0">
          <SectionHeading title="Get In Touch" description="Contact us today." />
          <div className="mt-12 flex flex-col gap-4 sm:mt-16">
            <Detail icon={<MessageCircle size={22} />} label="Chat with us on WhatsApp" href={whatsappHref()}>
              {contact.phone}
            </Detail>
            <Detail icon={<Phone size={22} />} label="Call us" href={contact.phoneHref}>
              {contact.phone}
            </Detail>
            <Detail icon={<Mail size={22} />} label="Email us" href={contact.emailHref}>
              {contact.email}
            </Detail>
            <Detail icon={<MapPin size={22} />} label="Visit us" href={contact.mapLink}>
              {contact.address}
            </Detail>
          </div>
        </div>

        <div className="rounded-[2rem] bg-brand/5 p-4 sm:p-6 lg:p-8">
          <iframe
            src={contact.mapEmbed}
            title={`Map showing ${contact.address}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[360px] w-full rounded-3xl border-0 sm:h-[440px] lg:h-full lg:min-h-[480px]"
          />
        </div>
      </Container>
    </Section>
  );
}
