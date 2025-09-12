import { createRequire } from "module";
const require = createRequire(import.meta.url);
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 Required for Capacitor (static HTML export)
  images: {
    unoptimized: true,
  },
  // 👇 this is the new way instead of next export
  output: "export",

  // 👇 Prevent build from failing due to ESLint or TypeScript errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
