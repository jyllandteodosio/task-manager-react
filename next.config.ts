import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Solve compiling problem via Vagrant or Docker
    config.watchOptions = {
      poll: 1000, // Check for changes every second
      aggregateTimeout: 300, // Delay before rebuilding
    };
    return config;
  },
  /* config options here */
  // output: 'standalone'
};

export default nextConfig;
