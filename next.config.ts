import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optimized, self-contained build output for Docker/containerized deploys
  output: 'standalone',
  // Auto-memoization for the functional React architecture (Next.js 16 top-level)
  reactCompiler: true,
  // SSR optimization only — no business logic in server layer
  experimental: {
    typedRoutes: true,
  },
  // Placeholder: configure external API rewrites here
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/v1/:path*',
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
