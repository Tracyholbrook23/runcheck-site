import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fonts and images the link preview pictures read from disk.
  outputFileTracingIncludes: {
    "/run/[runId]/og": ["./assets/og/**"],
  },
  images: {
    // Keep resized images cached for a week. Give a replaced photo a new file name so it shows right away.
    minimumCacheTTL: 604800,
  },
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [
          { key: "Content-Type", value: "application/json" },
          { key: "Cache-Control", value: "no-cache" },
        ],
      },
    ];
  },
};

export default nextConfig;
