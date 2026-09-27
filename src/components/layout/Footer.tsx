import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { bookHref, contact, navLinks, serviceLinks, whatsappHref } from "@/lib/site";

function LinkColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-[0.15em] text-fg uppercase">{title}</h3>
      <ul className="mt-5 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-[15px] text-muted transition-colors hover:text-brand">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24 border-t border-line bg-surface">
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-10">
          <div>
            <Logo className="h-10 sm:h-11" />
            <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted">
              Trusted travel agency in Nigeria. IATA certified since 2006.
            </p>
          </div>

          <LinkColumn title="Company" links={navLinks} />
          <LinkColumn title="Services" links={serviceLinks} />

          <div>
            <h3 className="text-sm font-semibold tracking-[0.15em] text-fg uppercase">Contact Us</h3>
            <ul className="mt-5 flex flex-col gap-3 text-[15px] text-muted">
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-colors hover:text-brand"
                >
                  <MessageCircle size={18} className="shrink-0 text-brand" />
                  WhatsApp {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="inline-flex items-center gap-3 transition-colors hover:text-brand">
                  <Phone size={18} className="shrink-0 text-brand" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a href={contact.emailHref} className="inline-flex items-center gap-3 break-all transition-colors hover:text-brand">
                  <Mail size={18} className="shrink-0 text-brand" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 transition-colors hover:text-brand"
                >
                  <MapPin size={18} className="shrink-0 text-brand" />
                  {contact.address}
                </a>
              </li>
            </ul>
            <Button href={bookHref} className="mt-6" icon={<Plane size={18} />}>
              Book Your Flight
            </Button>
          </div>
        </div>

        {/* data-no-reveal: sits at the very bottom, so it can never scroll far enough to trigger the reveal. */}
        <div data-no-reveal className="mt-16 border-t border-line pt-8 text-sm text-muted">
          <p>© {new Date().getFullYear()} Vefa Tourism &amp; Travels Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
