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
  // Focus point for cropping the photo (CSS object-position), e.g. "center 25%". Defaults to center.
  imagePosition?: string;
  // Bento grid tile size: feature = 2×2, wide = 2×1, tile = 1×1.
  bento: "feature" | "wide" | "tile";
};

export const services: Service[] = [
  {
    title: "International Flights",
    description: "Compare all international airlines and get your tickets confirmed within minutes.",
    image: "/images/service-international-flights.jpg",
    imagePosition: "center 22%",
    icon: Globe,
    bento: "wide",
  },
  {
    title: "Domestic Flights",
    description: "Compare all domestic airlines with fast, cheap, and reliable service.",
    image: "/images/service-domestic-flights.jpg",
    icon: PlaneTakeoff,
    bento: "tile",
  },
  {
    title: "Hotel Booking",
    description: "Global hotel booking at the best rates, with free hotel reservations and no hidden charges.",
    image: "/images/service-hotel.jpg",
    icon: Hotel,
    bento: "tile",
  },
  {
    title: "Travel Insurance",
    description: "Comprehensive travel protection. Travel with peace of mind.",
    image: "/images/service-insurance.jpg",
    icon: ShieldCheck,
    bento: "tile",
  },
  {
    title: "Visa Services",
    description:
      "Professional visa assistance for the UK, USA, Canada, Schengen, Egypt, China, Uganda, South Africa, Saudi Arabia and more.",
    image: "/images/service-visa.jpg",
    icon: FileCheck,
    bento: "feature",
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
    bento: "tile",
  },
  {
    title: "Umrah Packages",
    // TODO: owner to supply Umrah package details.
    description: "Contact us for our current Umrah packages.",
    image: "/images/service-umrah.jpg",
    imagePosition: "center 85%",
    icon: MoonStar,
    bento: "wide",
  },
];
