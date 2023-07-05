/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    domains: [
      "live.staticflickr.com",
      "trello-attachments.s3.amazonaws.com",
      "cdn.discordapp.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
