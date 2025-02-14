import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'media.revistagq.com',
        port: '',
        pathname: '/**',
      }
    ]
  } //comment
};

export default nextConfig;
