import type { Metadata } from "next";
import { Rethink_Sans, DM_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { THEME_KEY } from "@/lib/theme";
import { services } from "@/lib/services";
import { contact, siteUrl } from "@/lib/site";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const description =
  "IATA certified travel agency in Nigeria since 2006. Book international and domestic flights, hotels, visas, travel insurance, tours and Umrah packages with Vefa Tourism & Travels, Abuja.";

// Share-preview images (WhatsApp, Facebook, X, LinkedIn) come from app/opengraph-image.jpg and twitter-image.jpg.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Vefa Tourism & Travels Ltd. | Trusted Travel Agency in Nigeria",
    template: "%s | Vefa Tourism & Travels",
  },
  description,
  applicationName: "Vefa Tourism & Travels",
  keywords: [
    "travel agency in Nigeria",
    "travel agency Abuja",
    "IATA travel agency",
    "flight booking Nigeria",
    "cheap flights from Lagos",
    "cheap flights from Abuja",
    "hotel booking",
    "visa assistance Nigeria",
    "Dubai visa",
    "travel insurance Nigeria",
    "Umrah packages Nigeria",
    "tour packages",
    "Vefa Travels",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "/",
    siteName: "Vefa Tourism & Travels Ltd.",
    title: "Vefa Tourism & Travels Ltd. | Trusted Travel Agency in Nigeria",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vefa Tourism & Travels Ltd. | Trusted Travel Agency in Nigeria",
    description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, email: true, address: true },
};

// Structured data so Google understands the business (name, contact, address, services).
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Vefa Tourism & Travels Ltd.",
  url: siteUrl,
  logo: `${siteUrl}/brand/vefa-logo.png`,
  image: `${siteUrl}/opengraph-image.jpg`,
  description,
  telephone: contact.phone,
  email: contact.email,
  foundingDate: "2006",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 219, Nawa Complex",
    addressLocality: "Abuja",
    addressCountry: "NG",
  },
  areaServed: "NG",
  openingHours: "Mo-Su 00:00-23:59",
  makesOffer: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
};

const themeScript = `try{if(localStorage.getItem(${JSON.stringify(THEME_KEY)})==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rethinkSans.variable} ${dmSans.variable} h-full antialiased`}
      // The theme script below may add `dark` before React hydrates.
      suppressHydrationWarning
    >
      <head>
        {/* Apply the saved light/dark choice before first paint (no flash). Light is the default. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <SmoothScroll>
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
