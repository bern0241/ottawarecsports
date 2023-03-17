/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import { Auth } from 'aws-amplify';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/router';

export default function SignOutButton() {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const router = useRouter();

	const signOut = async (e) => {
		e.preventDefault();
		await Auth.signOut();
		setUser(null);
		setAuthRoles(null);
		router.push('/login');
	};

	const signIn = async (e) => {
		e.preventDefault();
		router.push('/login');
	};

	return (
		<>
			{user ? (
				<button
					onClick={(e) => signOut(e)}
					type="button"
					className="bg-brand-blue-800 h-9 w-full rounded text-white font-regular mb-3"
				>
					Sign Out
				</button>
			) : (
				<button
					onClick={(e) => signIn(e)}
					type="button"
					className="bg-brand-blue-800 h-9 w-full rounded text-white font-regular mb-3"
				>
					Sign In
				</button>
			)}
		</>
	);
}
