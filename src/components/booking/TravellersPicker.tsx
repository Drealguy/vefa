"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Minus, Plus, Users } from "lucide-react";
import { cn } from "@/lib/cn";

export type Counts = { adults: number; children: number; infants: number };

const rows: { key: keyof Counts; label: string; hint: string; min: number }[] = [
  { key: "adults", label: "Adults", hint: "12+ years", min: 1 },
  { key: "children", label: "Children", hint: "2–11 years", min: 0 },
  { key: "infants", label: "Infants", hint: "Under 2", min: 0 },
];

const MAX_TOTAL = 9;

export function summary({ adults, children, infants }: Counts) {
  const parts = [`${adults} Adult${adults > 1 ? "s" : ""}`];
  if (children) parts.push(`${children} Child${children > 1 ? "ren" : ""}`);
  if (infants) parts.push(`${infants} Infant${infants > 1 ? "s" : ""}`);
  return parts.join(", ");
}

function StepButton({ label, disabled, onClick, children }: { label: string; disabled: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full border border-black/10 bg-white text-ink transition-colors hover:border-brand hover:text-brand disabled:pointer-events-none disabled:opacity-30"
    >
      {children}
    </button>
  );
}

/** Custom travellers dropdown for the flight search (replaces the native <select>). */
export function TravellersPicker({
  value: counts,
  onChange,
  className,
}: {
  value: Counts;
  onChange: (next: Counts) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const total = counts.adults + counts.children + counts.infants;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const change = (key: keyof Counts, delta: number) => {
    const next = { ...counts, [key]: counts[key] + delta };
    // Airlines allow at most one infant per adult.
    if (next.infants > next.adults) next.infants = next.adults;
    onChange(next);
  };

  return (
    <div ref={ref} className={cn("relative min-w-0 flex-1", className)}>
      {rows.map((r) => (
        <input key={r.key} type="hidden" name={r.key} value={counts[r.key]} />
      ))}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-ink/[0.03] focus-visible:bg-ink/[0.03] focus-visible:outline-none"
      >
        <span className="text-brand">
          <Users size={20} />
        </span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-xs font-medium text-muted">Travellers</span>
          <span className="truncate text-[15px] font-medium text-ink">{summary(counts)}</span>
        </span>
        <ChevronDown size={18} className={cn("shrink-0 text-muted transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Choose travellers"
          className="absolute top-full right-0 left-0 z-30 mt-2 rounded-3xl border border-black/10 bg-white p-2 shadow-2xl shadow-ink/10 sm:left-auto sm:w-80"
        >
          {rows.map((r) => {
            const value = counts[r.key];
            const maxed = total >= MAX_TOTAL || (r.key === "infants" && value >= counts.adults);
            return (
              <div key={r.key} className="flex items-center justify-between gap-4 rounded-2xl px-4 py-3">
                <div>
                  <p className="font-heading font-semibold text-ink">{r.label}</p>
                  <p className="text-sm text-muted">{r.hint}</p>
                </div>
                <div className="flex items-center gap-3">
                  <StepButton label={`Remove one ${r.label.toLowerCase()}`} disabled={value <= r.min} onClick={() => change(r.key, -1)}>
                    <Minus size={16} />
                  </StepButton>
                  <span className="w-5 text-center font-heading font-semibold text-ink" aria-live="polite">
                    {value}
                  </span>
                  <StepButton label={`Add one ${r.label.toLowerCase()}`} disabled={maxed} onClick={() => change(r.key, 1)}>
                    <Plus size={16} />
                  </StepButton>
                </div>
              </div>
            );
          })}
          <div className="mt-1 border-t border-black/5 p-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-11 w-full rounded-full bg-brand font-heading text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
