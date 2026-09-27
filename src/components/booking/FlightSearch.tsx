"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CalendarDays, PlaneLanding, PlaneTakeoff, Search } from "lucide-react";
import { AirportField } from "@/components/booking/AirportField";
import { FlightResults } from "@/components/booking/FlightResults";
import { summary, TravellersPicker, type Counts } from "@/components/booking/TravellersPicker";
import { Button } from "@/components/ui/Button";
import { resolveAirport, type Airport } from "@/lib/airports";
import type { FlightOffer, FlightSearchResponse } from "@/lib/flights";

type Search = {
  from: Airport;
  to: Airport;
  dateLabel: string;
  travellersLabel: string;
  status: "loading" | "done" | "error";
  offers: FlightOffer[];
  sample: boolean;
  error?: string;
};

const today = () => new Date().toISOString().slice(0, 10);

export function FlightSearch() {
  const [from, setFrom] = useState("Lagos (LOS)");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [travellers, setTravellers] = useState<Counts>({ adults: 1, children: 0, infants: 0 });
  const [formError, setFormError] = useState("");
  const [search, setSearch] = useState<Search | null>(null);

  // Results change the page height; let ScrollSmoother/ScrollTrigger re-measure.
  useEffect(() => {
    if (search) ScrollTrigger.refresh();
  }, [search]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const origin = resolveAirport(from);
    const destination = resolveAirport(to);
    if (!origin) return setFormError("Choose where you're flying from.");
    if (!destination) return setFormError("Choose where you're flying to.");
    if (origin.code === destination.code) return setFormError("Choose two different airports.");
    if (!date) return setFormError("Choose your departure date.");
    setFormError("");

    const dateLabel = new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const base = { from: origin, to: destination, dateLabel, travellersLabel: summary(travellers), offers: [], sample: false };
    setSearch({ ...base, status: "loading" });

    try {
      const res = await fetch("/api/flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ from: origin.code, to: destination.code, date, ...travellers }),
      });
      const data: FlightSearchResponse = await res.json();
      if ("error" in data) setSearch({ ...base, status: "error", error: data.error });
      else setSearch({ ...base, status: "done", offers: data.offers, sample: data.sample });
    } catch {
      setSearch({ ...base, status: "error", error: "Something went wrong. Please try again." });
    }
  }

  return (
    <div id="book">
      <form
        onSubmit={onSubmit}
        noValidate
        aria-label="Search flights"
        className="rounded-3xl bg-white p-2 shadow-2xl shadow-ink/10 ring-1 ring-black/5"
      >
        <div className="grid grid-cols-2 gap-1 lg:flex lg:items-center lg:gap-0 lg:divide-x lg:divide-black/5">
          <AirportField
            label="From"
            placeholder="Lagos (LOS)"
            value={from}
            onChange={setFrom}
            className="col-span-2 sm:col-span-1"
            icon={<PlaneTakeoff size={20} />}
          />
          <AirportField
            label="To"
            placeholder="Where to?"
            value={to}
            onChange={setTo}
            className="col-span-2 sm:col-span-1"
            icon={<PlaneLanding size={20} />}
          />
          <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3 transition-colors focus-within:bg-ink/[0.03] hover:bg-ink/[0.03]">
            <span className="text-brand">
              <CalendarDays size={20} />
            </span>
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="text-xs font-medium text-muted">Departure</span>
              <input
                type="date"
                value={date}
                min={today()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full min-w-0 bg-transparent text-[15px] font-medium text-ink focus:outline-none"
              />
            </span>
          </label>
          <TravellersPicker value={travellers} onChange={setTravellers} />
          <div className="col-span-2 p-1 lg:pl-2">
            <Button
              type="submit"
              size="lg"
              className="w-full lg:w-auto"
              disabled={search?.status === "loading"}
              icon={<Search size={18} />}
            >
              Search Flights
            </Button>
          </div>
        </div>
        {formError && (
          <p role="alert" className="px-4 pt-2 pb-2 text-sm font-medium text-brand">
            {formError}
          </p>
        )}
      </form>

      {search && <FlightResults {...search} />}
    </div>
  );
}
