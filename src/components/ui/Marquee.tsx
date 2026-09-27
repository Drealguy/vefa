import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type MarqueeProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string;
  reverse?: boolean;
  className?: string;
};

/** Infinite horizontal scroller. Pauses on hover; stops for reduced-motion users. */
export function Marquee<T>({ items, renderItem, getKey, reverse = false, className }: MarqueeProps<T>) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      {/* The list is rendered twice so the -50% translate loops seamlessly. */}
      <div
        className={cn(
          "flex w-max gap-4 pr-4 group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:gap-5 sm:pr-5",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[0, 1].map((copy) =>
          items.map((item) => (
            <div key={`${copy}-${getKey(item)}`} aria-hidden={copy === 1 || undefined} className="shrink-0">
              {renderItem(item)}
            </div>
          )),
        )}
      </div>
    </div>
  );
}
