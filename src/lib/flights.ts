import { nigerianCodes } from "@/lib/airports";

export type FlightSearchParams = {
  from: string; // IATA code
  to: string; // IATA code
  date: string; // YYYY-MM-DD
  adults: number;
  children: number;
  infants: number;
};

export type FlightOffer = {
  id: string;
  airline: string;
  logo?: string;
  flightNumber: string;
  departTime: string; // HH:MM local
  arriveTime: string; // HH:MM local
  arriveDayOffset: number;
  duration: string; // "6h 30m"
  stops: number;
  via: string[];
  price: number; // total for all passengers
  currency: string;
};

// sample: generated fares (no API key). test: Duffel test mode (simulated, not bookable).
export type FlightSearchResponse = { sample: boolean; test?: boolean; offers: FlightOffer[] } | { error: string };

// Local logos for our airline partners (public/airlines).
export const airlineLogos: Record<string, string> = {
  "Turkish Airlines": "/airlines/turkish-airlines.svg",
  "Qatar Airways": "/airlines/qatar-airways.svg",
  Lufthansa: "/airlines/lufthansa.svg",
  Emirates: "/airlines/emirates.svg",
  "British Airways": "/airlines/british-airways.svg",
  "Ethiopian Airlines": "/airlines/ethiopian-airlines.svg",
  "Air France": "/airlines/air-france.svg",
  KLM: "/airlines/klm.svg",
  EgyptAir: "/airlines/egyptair.svg",
  "Royal Air Maroc": "/airlines/royal-air-maroc.svg",
  "Kenya Airways": "/airlines/kenya-airways.svg",
  "South African Airways": "/airlines/south-african-airways.svg",
};

export function formatDuration(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

/** "PT6H30M" / "P1DT2H" (ISO 8601) → "6h 30m" */
export function isoDurationToText(iso: string) {
  const d = Number(iso.match(/(\d+)D/)?.[1] ?? 0);
  const h = Number(iso.match(/(\d+)H/)?.[1] ?? 0);
  const m = Number(iso.match(/(\d+)M/)?.[1] ?? 0);
  return formatDuration(d * 1440 + h * 60 + m);
}

// ---------- Sample fares (used until a live flight API key is configured) ----------

function seededRandom(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const hubs: Record<string, string> = {
  "Turkish Airlines": "IST",
  "Qatar Airways": "DOH",
  Emirates: "DXB",
  "Ethiopian Airlines": "ADD",
  "Kenya Airways": "NBO",
  EgyptAir: "CAI",
  "Royal Air Maroc": "CMN",
  Lufthansa: "FRA",
  "Air France": "CDG",
  KLM: "AMS",
  "British Airways": "LHR",
  "South African Airways": "JNB",
};

const domesticCarriers = [
  { name: "Air Peace", code: "P4" },
  { name: "Ibom Air", code: "QI" },
  { name: "United Nigeria Airlines", code: "UN" },
  { name: "Overland Airways", code: "OJ" },
  { name: "ValueJet", code: "VK" },
];

const carrierCodes: Record<string, string> = {
  "Turkish Airlines": "TK",
  "Qatar Airways": "QR",
  Emirates: "EK",
  "Ethiopian Airlines": "ET",
  "Kenya Airways": "KQ",
  EgyptAir: "MS",
  "Royal Air Maroc": "AT",
  Lufthansa: "LH",
  "Air France": "AF",
  KLM: "KL",
  "British Airways": "BA",
  "South African Airways": "SA",
};

const pad = (n: number) => String(n).padStart(2, "0");

export function sampleOffers(p: FlightSearchParams): FlightOffer[] {
  const rand = seededRandom(`${p.from}-${p.to}-${p.date}`);
  const pick = <T,>(list: T[]) => list[Math.floor(rand() * list.length)];
  const domestic = nigerianCodes.has(p.from) && nigerianCodes.has(p.to);
  const payingSeats = p.adults + p.children + p.infants * 0.1;

  const count = 2 + Math.floor(rand() * 4); // 2–5 flights
  const offers: FlightOffer[] = [];

  const carriers = domestic
    ? [...domesticCarriers].sort(() => rand() - 0.5)
    : Object.keys(hubs)
        .sort(() => rand() - 0.5)
        .map((name) => ({ name, code: carrierCodes[name] }));

  for (let i = 0; i < Math.min(count, carriers.length); i++) {
    const carrier = carriers[i];
    const hub = hubs[carrier.name];
    const direct = domestic || hub === p.from || hub === p.to || rand() < 0.15;
    // Rough, realistic ranges: domestic ~1h–1h40, international direct ~5–8h, one stop ~9–15h. Rounded to 5 min.
    const raw = domestic ? 55 + rand() * 45 : direct ? 300 + rand() * 180 : 540 + rand() * 360;
    const minutes = Math.round(raw / 5) * 5;
    const departMinutes = (5 + Math.floor(rand() * 17)) * 60 + pick([0, 10, 25, 40, 55]);
    const arrive = departMinutes + minutes;
    const perSeat = domestic ? 95_000 + Math.floor(rand() * 130_000) : 1_150_000 + Math.floor(rand() * 2_400_000);

    offers.push({
      id: `${carrier.code}-${i}`,
      airline: carrier.name,
      logo: airlineLogos[carrier.name],
      flightNumber: `${carrier.code} ${100 + Math.floor(rand() * 800)}`,
      departTime: `${pad(Math.floor(departMinutes / 60))}:${pad(departMinutes % 60)}`,
      arriveTime: `${pad(Math.floor(arrive / 60) % 24)}:${pad(arrive % 60)}`,
      arriveDayOffset: Math.floor(arrive / 1440),
      duration: formatDuration(minutes),
      stops: direct ? 0 : 1,
      via: direct ? [] : [hub],
      price: Math.round((perSeat * payingSeats) / 1000) * 1000,
      currency: "NGN",
    });
  }

  return offers.sort((a, b) => a.price - b.price);
}
