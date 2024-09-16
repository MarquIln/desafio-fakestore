/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
  },
  env: {
    API_URL: process.env.BASE_URI,
  },
}

export default nextConfig
