/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true
  },
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion']
  }
}

export default nextConfig
