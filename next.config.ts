import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: false,
  devIndicators: false,
  output: `export`,
  distDir: `dist`,
  basePath: `/virginengine`,
}

export default nextConfig
