/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    domains: ["res.cloudinary.com", "cdn.hugeicons.com"],
  },
};

module.exports = nextConfig;
