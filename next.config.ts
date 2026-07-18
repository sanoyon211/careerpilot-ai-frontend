import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none", // Required for Firebase signInWithPopup in Next.js 15
          },
        ],
      },
    ];
  },
};

export default nextConfig;
