/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PPX_API_KEY: process.env.PPX_API_KEY,
  },
}

module.exports = nextConfig
