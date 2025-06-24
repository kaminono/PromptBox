/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
  images: {
    domains: [],
  },
  // Enable strict mode for better development experience
  reactStrictMode: true,
  // Configure trailing slash behavior
  trailingSlash: false,
  // Disable x-powered-by header
  poweredByHeader: false,
  // Optimize builds
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig 