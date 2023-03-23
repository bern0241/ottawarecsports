/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import Head from 'next/head';
import Layout from '@/components/common/Layout';
import styles from '@/styles/Home.module.css';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/router';

// Components
import UserIdentifier from '@/components/common/UserIdentifier';
import SignOutButton from '@/components/common/SignOutButton';
import ViewUserGroups from '@/components/common/ViewUserGroups';

import { useEffect } from 'react';
import { updateUserInfo } from '../utils/graphql.services';
export default function Home() {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const router = useRouter();
	useEffect(() => {
		updateUserInfo('38447de6-cafd-4932-9860-988fdefdf92b', {
			first_name: 'John',
			last_name: 'Doe',
		});
	}, []);
	return (
		<>
			<Head>
				<title>Ottawa Rec Sports</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/ORS-Logo.png" />
			</Head>

			<main className={styles.main}>
				<div className="flex flex-col">
					<UserIdentifier />
					<h1>Home Page</h1>
					<button onClick={() => console.log(user)}>Click Me</button>
					<ViewUserGroups />
					<SignOutButton />
					<button
						className="text-blue-600"
						onClick={() => router.push('/admin-portal')}
					>
						Go To Admin Portal Page
					</button>
				</div>
			</main>
		</>
	);
}
