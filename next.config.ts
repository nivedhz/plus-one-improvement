import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // YouTube thumbnails for the click-to-play video facades.
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
