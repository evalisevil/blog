import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  allowedDevOrigins: ['10.60.100.144'],
}

export default nextConfig
