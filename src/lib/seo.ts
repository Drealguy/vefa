import type { Metadata } from "next";

/**
 * Per-page metadata. Page-level openGraph/twitter objects REPLACE the root ones,
 * so this fills in every field (including the share image) for each page.
 */
export function pageMetadata(title: string, description: string, path: string): Metadata {
  const fullTitle = `${title} | Vefa Tourism & Travels`;
  const image = { url: "/opengraph-image.jpg", width: 1200, height: 630, alt: "Vefa Tourism & Travels Ltd." };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName: "Vefa Tourism & Travels Ltd.",
      url: path,
      title: fullTitle,
      description,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.url] },
  };
}
