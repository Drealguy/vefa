"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Plus } from "lucide-react";
import type { Service } from "@/lib/services";
import { cn } from "@/lib/cn";

/**
 * Photo card that reveals the service description (and prices, if any)
 * on hover (pointer devices) or tap/click (touch, keyboard).
 */
// The icon arrives already rendered: component functions can't cross the server → client boundary.
type ServiceCardProps = Omit<Service, "icon"> & { icon: ReactNode };

export function ServiceCard({ title, description, image, icon, prices, pricesTitle, featured }: ServiceCardProps) {
  const [open, setOpen] = useState(false);
  const lowest = prices?.map((p) => p.price).sort()[0];

  return (
    <article
      data-open={open}
      className={cn(
        "group relative isolate aspect-[4/5] overflow-hidden rounded-3xl bg-ink",
        featured && "sm:col-span-2 sm:aspect-[8/5] lg:aspect-auto",
      )}
    >
      <Image
        src={image}
        alt=""
        fill
        sizes={featured ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
        className="-z-20 object-cover transition-transform duration-500 group-hover:scale-105 group-data-[open=true]:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent transition-colors duration-300 group-hover:bg-ink/60 group-data-[open=true]:bg-ink/60"
      />

      <span
        aria-hidden
        className="absolute top-4 left-4 flex size-11 items-center justify-center rounded-full bg-white text-brand"
      >
        {icon}
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="absolute inset-0 z-10 rounded-3xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
      >
        <span className="sr-only">{open ? `Hide details for ${title}` : `Show details for ${title}`}</span>
      </button>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold sm:text-xl">{title}</h3>
            {lowest && <p className="mt-1 text-sm text-white/80">From {lowest}</p>}
          </div>
          <span
            aria-hidden
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-ink transition-all duration-300 group-hover:rotate-45 group-hover:bg-brand group-hover:text-white group-data-[open=true]:rotate-45 group-data-[open=true]:bg-brand group-data-[open=true]:text-white"
          >
            <Plus size={18} />
          </span>
        </div>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr] group-data-[open=true]:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p className="pt-3 text-[15px] leading-relaxed text-white/90">{description}</p>

            {prices && (
              <div className="mt-4 border-t border-white/20 pt-4">
                <p className="text-xs font-semibold tracking-[0.15em] text-white/70 uppercase">{pricesTitle}</p>
                <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3">
                  {prices.map((p) => (
                    <div key={p.label} className="flex items-baseline justify-between gap-2">
                      <dt className="text-[15px] text-white/90">{p.label}</dt>
                      <dd className="font-heading font-semibold">{p.price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
