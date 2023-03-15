/**
 * Last updated: 2023-03-13
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import '@/styles/globals.css';
import { Barlow } from 'next/font/google';
import { Amplify } from 'aws-amplify';
import awsconfig from '../src/aws-exports';

const barlow = Barlow({
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

Amplify.configure(awsconfig);

export default function App({ Component, pageProps }) {
	return (
		<>
			<style jsx global>{`
				html {
					font-family: ${barlow.style.fontFamily};
				}
			`}</style>
			<Component {...pageProps} />
		</>
	);
}
