"use client";

import type { FormEvent, ReactNode } from "react";
import { CalendarDays, PlaneLanding, PlaneTakeoff, Search } from "lucide-react";
import { TravellersPicker } from "@/components/booking/TravellersPicker";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
};

function Field({ label, icon, children, className }: FieldProps) {
  return (
    <label
      className={cn(
        "flex min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 py-3 transition-colors focus-within:bg-ink/[0.03] hover:bg-ink/[0.03]",
        className,
      )}
    >
      <span className="text-brand">{icon}</span>
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="text-xs font-medium text-muted">{label}</span>
        {children}
      </span>
    </label>
  );
}

const inputClass =
  "w-full min-w-0 bg-transparent text-[15px] font-medium text-ink placeholder:text-ink/40 focus:outline-none";

export function FlightSearch() {
  // TODO: wire to the real booking flow once the owner confirms the provider.
  const onSubmit = (e: FormEvent) => e.preventDefault();

  return (
    <form
      id="book"
      onSubmit={onSubmit}
      aria-label="Search flights"
      className="scroll-mt-28 rounded-3xl bg-white p-2 shadow-2xl shadow-ink/10 ring-1 ring-black/5"
    >
      <div className="grid grid-cols-2 gap-1 lg:flex lg:items-center lg:gap-0 lg:divide-x lg:divide-black/5">
        <Field label="From" className="col-span-2 sm:col-span-1" icon={<PlaneTakeoff size={20} />}>
          <input name="from" type="text" placeholder="Lagos (LOS)" className={inputClass} />
        </Field>
        <Field label="To" className="col-span-2 sm:col-span-1" icon={<PlaneLanding size={20} />}>
          <input name="to" type="text" placeholder="Where to?" className={inputClass} />
        </Field>
        <Field label="Departure" icon={<CalendarDays size={20} />}>
          <input name="date" type="date" className={inputClass} />
        </Field>
        <TravellersPicker />
        <div className="col-span-2 p-1 lg:pl-2">
          <Button type="submit" size="lg" className="w-full lg:w-auto" icon={<Search size={18} />}>
            Search Flights
          </Button>
        </div>
      </div>
    </form>
  );
}
