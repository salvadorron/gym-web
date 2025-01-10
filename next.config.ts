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
