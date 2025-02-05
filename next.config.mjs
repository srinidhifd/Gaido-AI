/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This helps prevent hydration issues
  experimental: {
    // This defaults to true in newer versions of Next.js
    optimizeFonts: true,
  },
  webpack: (config, { isServer }) => {
    // Add handling for dynamic imports
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    
    return config;
  },
};

export default nextConfig;
