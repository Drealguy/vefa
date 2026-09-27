// Single source for site-wide links and labels used by the navbar, footer and CTAs.
import { services } from "@/lib/services";

// Public site URL for SEO/share previews. Set NEXT_PUBLIC_SITE_URL once the custom domain is live;
// on Vercel the production URL is picked up automatically.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const bookHref = "/#book";

export const contact = {
  phone: "+234 803 214 2987",
  phoneHref: "tel:+2348032142987",
  email: "vefatravel22@gmail.com",
  emailHref: "mailto:vefatravel22@gmail.com",
  address: "Suite 219, Nawa Complex, Abuja",
  mapEmbed: "https://maps.google.com/maps?q=Suite%20219%2C%20Nawa%20Complex%2C%20Abuja&z=16&output=embed",
  mapLink: "https://www.google.com/maps/search/?api=1&query=Suite%20219%2C%20Nawa%20Complex%2C%20Abuja",
};

export const serviceLinks = services.map((s) => ({ label: s.title, href: "/services" }));
