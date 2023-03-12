import Head from 'next/head';
import { Inter } from 'next/font/google';
import NavbarMenu from '@/components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	return (
		<>
			<Head>
				<title>ORS</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/Logo.svg" />
			</Head>
			<main>
				<NavbarMenu/>
			</main>
		</>
	);
}
