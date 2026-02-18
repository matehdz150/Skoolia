import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		// Allow common external image sources used across the app
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "www.googlewatchblog.de",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/**",
			},
		],
		// Also permit explicit domains if Next version prefers this format
		domains: [
			"images.unsplash.com",
			"www.googlewatchblog.de",
			"lh3.googleusercontent.com",
		],
	},
};

export default nextConfig;
