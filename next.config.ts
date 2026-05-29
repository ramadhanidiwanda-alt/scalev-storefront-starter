import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['uninjured-sly-pacific.ngrok-free.dev'],
  env: {
    NEXT_PUBLIC_SCALEV_API_BASE: process.env.NEXT_PUBLIC_SCALEV_API_BASE,
    NEXT_PUBLIC_SCALEV_STORE_ID: process.env.NEXT_PUBLIC_SCALEV_STORE_ID,
    NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY: process.env.NEXT_PUBLIC_SCALEV_STOREFRONT_API_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.scalev.id',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
