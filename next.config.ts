import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to serve HMR / internal assets when opened from the
  // local network or a tunnel (e.g. testing on a phone via ngrok). Dev-only;
  // ignored in production. `*` matches one host segment.
  allowedDevOrigins: [
    "192.168.0.*",
    "*.ngrok-free.app",
    "*.ngrok.app",
    "*.ngrok.io",
  ],
  images: {
    // Product photos are served from the original store's CloudFront CDN.
    remotePatterns: [
      { protocol: "https", hostname: "d22fxaf9t8d39k.cloudfront.net" },
    ],
    // CDN filenames are content-hashed (a new image = a new URL), so the
    // optimized variants are safe to cache for a long time.
    minimumCacheTTL: 31536000, // 1 year
  },
};

export default nextConfig;
