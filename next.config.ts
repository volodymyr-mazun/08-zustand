import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {protocol: 'http', hostname: 'picsum.photos'}
    ]
  }
};

export default nextConfig;