/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['live.staticflickr.com', 'trello-attachments.s3.amazonaws.com', 'cdn.discordapp.com/attachments'],
	},
};

module.exports = nextConfig;
