import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.cs.unc.edu',
        port: '',
        pathname: '/~cpk/data/thumbnails/**',
      },
    ],
  },
};

export default nextConfig;
