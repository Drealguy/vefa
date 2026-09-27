import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Placeholder photos. Query allowed so Unsplash resizes before Next optimizes.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" },
      // Temporary: service card images supplied by the owner. Move into /public before launch.
      new URL("https://i.pinimg.com/**"),
    ],
  },
};

export default nextConfig;
