import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the dev server to serve HMR / internal assets when opened from the
  // local network (e.g. testing on a phone). Dev-only; ignored in production.
  // `*` matches one segment, so this covers the whole 192.168.0.x subnet.
  allowedDevOrigins: ["192.168.0.*"],
};

export default nextConfig;
