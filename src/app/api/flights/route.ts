import { rateToNaira, toNaira } from "@/lib/fx";
import { airlineLogos, isoDurationToText, sampleOffers, type FlightOffer, type FlightSearchParams } from "@/lib/flights";

/**
 * Flight search.
 * - With DUFFEL_ACCESS_TOKEN set (see .env.example): live offers from the Duffel API.
 * - Without it: clearly-flagged SAMPLE fares so the UI can be previewed.
 */
export async function POST(request: Request) {
  let params: FlightSearchParams;
  try {
    params = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const { from, to, date, adults, children, infants } = params;
  if (!/^[A-Z]{3}$/.test(from) || !/^[A-Z]{3}$/.test(to) || from === to) {
    return Response.json({ error: "Please choose two different airports." }, { status: 400 });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json({ error: "Please choose a departure date." }, { status: 400 });
  }
  if (adults < 1 || adults + children + infants > 9 || infants > adults) {
    return Response.json({ error: "Please check the number of travellers." }, { status: 400 });
  }

  const token = process.env.DUFFEL_ACCESS_TOKEN;
  if (!token) {
    // Small delay so the "searching" state is visible, like a real search.
    await new Promise((r) => setTimeout(r, 900));
    return Response.json({ sample: true, offers: sampleOffers(params) });
  }

  try {
    const passengers = [
      ...Array.from({ length: adults }, () => ({ type: "adult" })),
      ...Array.from({ length: children }, () => ({ age: 8 })),
      ...Array.from({ length: infants }, () => ({ type: "infant_without_seat" })),
    ];

    const res = await fetch("https://api.duffel.com/air/offer_requests?return_offers=true&supplier_timeout=20000", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Duffel-Version": "v2",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        data: {
          slices: [{ origin: from, destination: to, departure_date: date }],
          passengers,
          cabin_class: "economy",
        },
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Duffel error", res.status, await res.text());
      return Response.json({ error: "We couldn't reach the airlines right now. Please try again." }, { status: 502 });
    }

    const json = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const offers: FlightOffer[] = (json.data?.offers ?? []).slice(0, 10).map((o: any) => {
      const slice = o.slices[0];
      const segs = slice.segments;
      const first = segs[0];
      const last = segs[segs.length - 1];
      const departDay = first.departing_at.slice(0, 10);
      const arriveDay = last.arriving_at.slice(0, 10);
      return {
        id: o.id,
        airline: o.owner.name,
        logo: airlineLogos[o.owner.name] ?? o.owner.logo_symbol_url ?? undefined,
        flightNumber: `${first.marketing_carrier.iata_code} ${first.marketing_carrier_flight_number}`,
        departTime: first.departing_at.slice(11, 16),
        arriveTime: last.arriving_at.slice(11, 16),
        arriveDayOffset: Math.round((Date.parse(arriveDay) - Date.parse(departDay)) / 86_400_000),
        duration: isoDurationToText(slice.duration ?? ""),
        stops: segs.length - 1,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        via: segs.slice(0, -1).map((s: any) => s.destination.iata_code),
        price: Number(o.total_amount),
        currency: o.total_currency,
      } satisfies FlightOffer;
    });

    // Show every price in naira. Duffel returns the account currency (e.g. EUR); convert at the daily rate
    // and keep the original so the UI can show it. If the rate can't be fetched, prices stay as returned.
    const currencies = [...new Set(offers.map((o) => o.currency).filter((c) => c !== "NGN"))];
    const rates = Object.fromEntries(await Promise.all(currencies.map(async (c) => [c, await rateToNaira(c)] as const)));
    for (const o of offers) {
      const rate = rates[o.currency];
      if (rate) {
        o.originalPrice = o.price;
        o.originalCurrency = o.currency;
        o.price = toNaira(o.price, rate);
        o.currency = "NGN";
      }
    }

    offers.sort((a, b) => a.price - b.price);
    // Test tokens return simulated airline data; the UI labels it so nobody mistakes it for live fares.
    return Response.json({ sample: false, test: token.startsWith("duffel_test_"), offers });
  } catch (err) {
    console.error("Flight search failed", err);
    return Response.json({ error: "We couldn't reach the airlines right now. Please try again." }, { status: 502 });
  }
}
