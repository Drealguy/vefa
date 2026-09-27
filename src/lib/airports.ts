// Airports customers can search by city name or IATA code. Add more as needed.
export type Airport = { code: string; city: string; country: string };

export const airports: Airport[] = [
  // Nigeria
  { code: "LOS", city: "Lagos", country: "Nigeria" },
  { code: "ABV", city: "Abuja", country: "Nigeria" },
  { code: "PHC", city: "Port Harcourt", country: "Nigeria" },
  { code: "KAN", city: "Kano", country: "Nigeria" },
  { code: "ENU", city: "Enugu", country: "Nigeria" },
  { code: "QOW", city: "Owerri", country: "Nigeria" },
  { code: "BNI", city: "Benin City", country: "Nigeria" },
  { code: "QUO", city: "Uyo", country: "Nigeria" },
  { code: "CBQ", city: "Calabar", country: "Nigeria" },
  { code: "ILR", city: "Ilorin", country: "Nigeria" },
  { code: "KAD", city: "Kaduna", country: "Nigeria" },
  { code: "SKO", city: "Sokoto", country: "Nigeria" },
  // Africa
  { code: "ACC", city: "Accra", country: "Ghana" },
  { code: "NBO", city: "Nairobi", country: "Kenya" },
  { code: "ADD", city: "Addis Ababa", country: "Ethiopia" },
  { code: "JNB", city: "Johannesburg", country: "South Africa" },
  { code: "CPT", city: "Cape Town", country: "South Africa" },
  { code: "CAI", city: "Cairo", country: "Egypt" },
  { code: "CMN", city: "Casablanca", country: "Morocco" },
  { code: "DAR", city: "Dar es Salaam", country: "Tanzania" },
  { code: "ZNZ", city: "Zanzibar", country: "Tanzania" },
  { code: "EBB", city: "Entebbe", country: "Uganda" },
  // Middle East
  { code: "DXB", city: "Dubai", country: "United Arab Emirates" },
  { code: "DOH", city: "Doha", country: "Qatar" },
  { code: "JED", city: "Jeddah", country: "Saudi Arabia" },
  { code: "MED", city: "Medina", country: "Saudi Arabia" },
  { code: "RUH", city: "Riyadh", country: "Saudi Arabia" },
  { code: "IST", city: "Istanbul", country: "Türkiye" },
  // Europe
  { code: "LHR", city: "London", country: "United Kingdom" },
  { code: "MAN", city: "Manchester", country: "United Kingdom" },
  { code: "CDG", city: "Paris", country: "France" },
  { code: "AMS", city: "Amsterdam", country: "Netherlands" },
  { code: "FRA", city: "Frankfurt", country: "Germany" },
  { code: "MAD", city: "Madrid", country: "Spain" },
  { code: "FCO", city: "Rome", country: "Italy" },
  // Americas & Asia
  { code: "JFK", city: "New York", country: "United States" },
  { code: "IAD", city: "Washington DC", country: "United States" },
  { code: "IAH", city: "Houston", country: "United States" },
  { code: "ATL", city: "Atlanta", country: "United States" },
  { code: "YYZ", city: "Toronto", country: "Canada" },
  { code: "PEK", city: "Beijing", country: "China" },
  { code: "CAN", city: "Guangzhou", country: "China" },
];

export const nigerianCodes = new Set(airports.filter((a) => a.country === "Nigeria").map((a) => a.code));

export function airportLabel(a: Airport) {
  return `${a.city} (${a.code})`;
}

/** Resolve "Lagos", "lagos (LOS)", "LOS" or "los" to an airport. */
export function resolveAirport(input: string): Airport | undefined {
  const q = input.trim().toLowerCase();
  if (!q) return undefined;
  const code = q.match(/\(([a-z]{3})\)/)?.[1] ?? (q.length === 3 ? q : undefined);
  if (code) {
    const byCode = airports.find((a) => a.code.toLowerCase() === code);
    if (byCode) return byCode;
  }
  return airports.find((a) => a.city.toLowerCase() === q) ?? airports.find((a) => a.city.toLowerCase().startsWith(q));
}

/** Suggestions for the autocomplete list. */
export function searchAirports(input: string, limit = 6): Airport[] {
  const q = input.trim().toLowerCase();
  if (!q) return airports.slice(0, limit);
  return airports
    .filter(
      (a) =>
        a.city.toLowerCase().includes(q) || a.code.toLowerCase().startsWith(q) || a.country.toLowerCase().includes(q),
    )
    .slice(0, limit);
}
