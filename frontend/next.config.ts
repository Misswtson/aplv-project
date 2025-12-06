import type { NextConfig } from 'next'
import type webpack from 'webpack'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config: webpack.Configuration) => {
    return config
  },
}

export default nextConfig