/**
 * Next.js Configuration - Handles image domains, output settings,
 * and other framework-level configuration.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This enables static image optimization for external domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  // This ensures the build output is compatible with Vercel
  output: undefined,
};

export default nextConfig;
