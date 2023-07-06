/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
