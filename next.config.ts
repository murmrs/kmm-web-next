import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "imagedelivery.net",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "kmm-test-images.s3.us-west-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
