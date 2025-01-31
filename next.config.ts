import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: "build", // تغییر مسیر خروجی به "build"
  images: {
    domains: ['todo.amirbarfar.ir'], // دامنه‌های معتبر برای بارگذاری تصاویر
  },
};

export default nextConfig;
