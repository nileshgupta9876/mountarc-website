/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed 'output: export' to enable API routes
  // Vercel handles serverless deployment automatically
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
