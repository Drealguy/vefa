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

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=1600&q=80&auto=format`;

export const services: Service[] = [
  {
    title: "International Flights",
    description: "Compare all international airlines and get your tickets confirmed within minutes.",
    image: "https://i.pinimg.com/1200x/a5/83/5e/a5835ecbe20e00a5bbc8fe41176142e3.jpg",
    icon: Globe,
  },
  {
    title: "Domestic Flights",
    description: "Compare all domestic airlines with fast, cheap, and reliable service.",
    image: unsplash("photo-1524592714635-d77511a4834d"),
    icon: PlaneTakeoff,
  },
  {
    title: "Hotel Booking",
    description: "Global hotel booking at the best rates, with free hotel reservations and no hidden charges.",
    image: "https://i.pinimg.com/736x/3f/69/8b/3f698bc9766d1150b80be2779192778a.jpg",
    icon: Hotel,
  },
  {
    title: "Travel Insurance",
    description: "Comprehensive travel protection. Travel with peace of mind.",
    image: "https://i.pinimg.com/736x/bb/9e/0f/bb9e0f2c3ce9db7780ca496d0aecbcc3.jpg",
    icon: ShieldCheck,
  },
  {
    title: "Visa Services",
    description:
      "Professional visa assistance for the UK, USA, Canada, Schengen, Egypt, China, Uganda, South Africa, Saudi Arabia and more.",
    image: unsplash("photo-1581553673739-c4906b5d0de8"),
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
    image: "https://i.pinimg.com/1200x/ad/61/7f/ad617f87b1432f1f400209a6352bee90.jpg",
    icon: Backpack,
  },
  {
    title: "Umrah Packages",
    // TODO: owner to supply Umrah package details.
    description: "Contact us for our current Umrah packages.",
    image: unsplash("photo-1720549973451-018d3623b55a"),
    icon: MoonStar,
  },
];
