import '@/styles/globals.css';

import { Amplify } from 'aws-amplify';
import config from '../src/aws-exports.js';

// Amplify.configure({ ...config, ssr: false });
Amplify.configure(config);

var AWS = require('aws-sdk')
AWS.config.update({
  region: 'us-east-1',
  apiVersion: 'latest',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  },
})

export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
