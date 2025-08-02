import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/happy-zeezee",
  assetPrefix: "/happy-zeezee/",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;



