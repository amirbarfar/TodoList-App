import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "build", 
  trailingSlash: true,
  images: {
    unoptimized: true, 
    domains: ["todo.amirbarfar.ir"], 
  },
};

export default nextConfig;
