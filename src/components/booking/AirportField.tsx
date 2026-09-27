"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { airportLabel, searchAirports, type Airport } from "@/lib/airports";
import { cn } from "@/lib/cn";

type AirportFieldProps = {
  label: string;
  icon: ReactNode;
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  className?: string;
};

/** Text field with a custom airport suggestion list (city, code or country). */
export function AirportField({ label, icon, placeholder, value, onChange, className }: AirportFieldProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const suggestions = searchAirports(value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function choose(a: Airport) {
    onChange(airportLabel(a));
    setOpen(false);
  }

  function onKeyDown(e: KeyboardEvent) {
    if (!open || !suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(suggestions[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={ref} className={cn("relative min-w-0 flex-1", className)}>
      <label className="flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors focus-within:bg-ink/[0.03] hover:bg-ink/[0.03]">
        <span className="text-brand">{icon}</span>
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-xs font-medium text-muted">{label}</span>
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            autoComplete="off"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            onFocus={() => setOpen(true)}
            onChange={(e) => {
              onChange(e.target.value);
              setActive(0);
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className="w-full min-w-0 bg-transparent text-[15px] font-medium text-ink placeholder:text-ink/40 focus:outline-none"
          />
        </span>
      </label>

      {open && suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute top-full right-0 left-0 z-30 mt-2 min-w-[260px] overflow-hidden rounded-3xl border border-black/10 bg-white p-2 shadow-2xl shadow-ink/10"
        >
          {suggestions.map((a, i) => (
            <li
              key={a.code}
              role="option"
              aria-selected={i === active}
              onPointerDown={(e) => e.preventDefault()}
              onClick={() => choose(a)}
              onMouseEnter={() => setActive(i)}
              className={cn(
                "flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-4 py-3",
                i === active && "bg-brand-light/60",
              )}
            >
              <span className="min-w-0">
                <span className="block font-heading font-semibold text-ink">{a.city}</span>
                <span className="block truncate text-sm text-muted">{a.country}</span>
              </span>
              <span className="font-heading text-sm font-semibold text-brand">{a.code}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
