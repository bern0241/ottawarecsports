/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import { Amplify } from 'aws-amplify';
import config from '../src/aws-exports.js';
import { UserContextProvider } from '@/context/userContext.js';
import '@/styles/globals.css';
import { Barlow } from 'next/font/google';
const barlow = Barlow({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

// Amplify.configure({ ...config, ssr: false });
Amplify.configure(config);

var AWS = require('aws-sdk');
AWS.config.update({
	region: 'us-east-1',
	apiVersion: 'latest',
	credentials: {
		accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
		secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	},
});

export default function App({ Component, pageProps }) {
	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${barlow.style.fontFamily};
				}
			`}</style>
			<UserContextProvider>
				<Component {...pageProps} />
			</UserContextProvider>
		</>
	);
}
