import Image from "next/image";
import { Info, Loader2, Plane } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Airport } from "@/lib/airports";
import type { FlightOffer } from "@/lib/flights";
import { contact } from "@/lib/site";

type FlightResultsProps = {
  status: "loading" | "done" | "error";
  offers: FlightOffer[];
  sample: boolean;
  test?: boolean;
  error?: string;
  from: Airport;
  to: Airport;
  dateLabel: string;
  travellersLabel: string;
};

function formatPrice(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat("en-NG", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency} ${amount.toLocaleString()}`;
  }
}

function bookingMail(o: FlightOffer, p: Pick<FlightResultsProps, "from" | "to" | "dateLabel" | "travellersLabel">) {
  const subject = `Flight booking: ${p.from.city} to ${p.to.city}, ${p.dateLabel}`;
  const body = [
    "Hello Vefa Travels, I'd like to book this flight:",
    "",
    `${o.airline} ${o.flightNumber}`,
    `${p.from.city} (${p.from.code}) ${o.departTime} → ${p.to.city} (${p.to.code}) ${o.arriveTime}`,
    `${p.dateLabel} · ${p.travellersLabel}`,
    `Price shown: ${formatPrice(o.price, o.currency)}`,
    "",
    "My name and phone number:",
  ].join("\n");
  return `${contact.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function FlightResults(props: FlightResultsProps) {
  const { status, offers, sample, test, error, from, to, dateLabel, travellersLabel } = props;

  return (
    <div aria-live="polite" className="mt-4 rounded-3xl border border-black/10 bg-white p-4 sm:p-6">
      {status === "loading" && (
        <div className="flex items-center gap-3 py-6 text-muted">
          <Loader2 size={20} className="animate-spin text-brand" />
          Searching flights from {from.city} to {to.city}…
        </div>
      )}

      {status === "error" && <p className="py-4 font-medium text-brand">{error}</p>}

      {status === "done" && (
        <>
          <div className="flex flex-col gap-3 border-b border-black/5 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">
                {offers.length} {offers.length === 1 ? "flight" : "flights"} available
              </h2>
              <p className="mt-1 text-muted">
                {from.city} ({from.code}) → {to.city} ({to.code}) · {dateLabel} · {travellersLabel}
              </p>
            </div>
            {(sample || test) && (
              <p className="inline-flex items-center gap-2 self-start rounded-full bg-brand-light px-3 py-1.5 text-xs font-semibold text-brand-deep sm:self-auto">
                <Info size={14} />
                {test ? "Test mode: demo fares, not live prices." : "Sample fares. Our team confirms live prices."}
              </p>
            )}
          </div>

          {offers.length === 0 ? (
            <p className="pt-5 text-muted">
              No flights found for this date. Call us on{" "}
              <a href={contact.phoneHref} className="font-semibold text-ink hover:text-brand">
                {contact.phone}
              </a>{" "}
              and we&apos;ll find you options.
            </p>
          ) : (
            <ul className="divide-y divide-black/5">
              {offers.map((o) => (
                <li key={o.id} className="grid gap-4 py-5 sm:grid-cols-[230px_1fr_auto] sm:items-center sm:gap-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-20 shrink-0 items-center justify-center">
                      {o.logo ? (
                        <Image
                          src={o.logo}
                          alt=""
                          width={80}
                          height={48}
                          unoptimized
                          className="max-h-10 w-auto max-w-full object-contain"
                        />
                      ) : (
                        <Plane size={22} className="text-brand" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="line-clamp-2 block font-heading leading-snug font-semibold text-ink">{o.airline}</span>
                      <span className="block text-sm text-muted">{o.flightNumber}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-center">
                      <span className="block font-heading text-xl font-bold text-ink">{o.departTime}</span>
                      <span className="block text-sm text-muted">{from.code}</span>
                    </span>
                    <span className="flex flex-1 flex-col items-center gap-1 text-xs text-muted">
                      {o.duration}
                      <span className="relative h-px w-full bg-black/15">
                        <Plane size={14} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-brand" />
                      </span>
                      {o.stops === 0 ? "Direct" : `${o.stops} stop${o.stops > 1 ? "s" : ""} · ${o.via.join(", ")}`}
                    </span>
                    <span className="text-center">
                      <span className="block font-heading text-xl font-bold text-ink">
                        {o.arriveTime}
                        {o.arriveDayOffset > 0 && <sup className="ml-0.5 text-xs text-brand">+{o.arriveDayOffset}</sup>}
                      </span>
                      <span className="block text-sm text-muted">{to.code}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-2">
                    <span className="font-heading text-xl font-bold text-ink">{formatPrice(o.price, o.currency)}</span>
                    <Button href={bookingMail(o, props)}>Book this flight</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
