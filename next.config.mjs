// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 👇 Required for Capacitor (static HTML export)
  output: 'export',

  // 👇 Disable Next.js image optimization (not supported in static export)
  images: {
    unoptimized: true,
  },

  // 👇 Prevent build from failing due to ESLint or TypeScript errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

