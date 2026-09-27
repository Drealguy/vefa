import {
  Backpack,
  FileCheck,
  Globe,
  Hotel,
  MoonStar,
  PlaneTakeoff,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

// All of Vefa's services. Descriptions are taken from Vefa's website copy and flyers.
export type Service = {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  prices?: { label: string; price: string }[];
  pricesTitle?: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    title: "International Flights",
    description: "Compare all international airlines and get your tickets confirmed within minutes.",
    image: "/images/service-international-flights.jpg",
    icon: Globe,
  },
  {
    title: "Domestic Flights",
    description: "Compare all domestic airlines with fast, cheap, and reliable service.",
    image: "/images/service-domestic-flights.jpg",
    icon: PlaneTakeoff,
  },
  {
    title: "Hotel Booking",
    description: "Global hotel booking at the best rates, with free hotel reservations and no hidden charges.",
    image: "/images/service-hotel.jpg",
    icon: Hotel,
  },
  {
    title: "Travel Insurance",
    description: "Comprehensive travel protection. Travel with peace of mind.",
    image: "/images/service-insurance.jpg",
    icon: ShieldCheck,
  },
  {
    title: "Visa Services",
    description:
      "Professional visa assistance for the UK, USA, Canada, Schengen, Egypt, China, Uganda, South Africa, Saudi Arabia and more.",
    image: "/images/service-visa.jpg",
    icon: FileCheck,
    featured: true,
    pricesTitle: "Visa charges starting from",
    prices: [
      { label: "Dubai", price: "$150" },
      { label: "Qatar", price: "$150" },
      { label: "Egypt", price: "$250" },
      { label: "Morocco", price: "$200" },
      { label: "Tanzania", price: "$150" },
    ],
  },
  {
    title: "Tour Packages",
    description: "Solo trips & group tours.",
    image: "/images/service-tours.jpg",
    icon: Backpack,
  },
  {
    title: "Umrah Packages",
    // TODO: owner to supply Umrah package details.
    description: "Contact us for our current Umrah packages.",
    image: "/images/service-umrah.jpg",
    icon: MoonStar,
  },
];
