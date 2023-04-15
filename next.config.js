/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	env: {
		NEXT_PUBLIC_ACCESS_KEY_ID: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
		NEXT_PUBLIC_SECRET_ACCESS_KEY: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
		NEXT_PUBLIC_USERPOOLID: process.env.NEXT_PUBLIC_USERPOOLID,
		NEXT_PUBLIC_CLIENTID: process.env.NEXT_PUBLIC_CLIENTID,
		NEXT_PUBLIC_STORAGEBUCKET: process.env.NEXT_PUBLIC_STORAGEBUCKET,
	},
};

module.exports = nextConfig;
