import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'humble-waffle-75pj97prw5xhvv6.github.dev/'
      ]
    }
  },
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
  },
  async redirects() {

    return [
      {
        source: "/",
        destination: "/entrenamiento",
        permanent: true
      }
    ]
  }
};

export default nextConfig;
