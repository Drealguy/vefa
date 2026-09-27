// Currency conversion for flight prices (server-only). Rates from open.er-api.com (free, no key,
// updated daily), cached for 12 hours. Returns null if the rate can't be fetched.
export async function rateToNaira(currency: string): Promise<number | null> {
  if (currency === "NGN") return 1;
  try {
    const res = await fetch(`https://open.er-api.com/v6/latest/${encodeURIComponent(currency)}`, {
      next: { revalidate: 43_200 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const rate = data?.rates?.NGN;
    return typeof rate === "number" && rate > 0 ? rate : null;
  } catch {
    return null;
  }
}

/** Convert and round to the nearest ₦100. */
export function toNaira(amount: number, rate: number) {
  return Math.round((amount * rate) / 100) * 100;
}
