/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
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
					className="bg-brand-blue-800 w-full rounded text-white font-regular mb-6 mt-5 py-3 drop-shadow-md"
					aria-label="Sign Out Button"
				>
					Sign Out
				</button>
			) : (
				<button
					onClick={(e) => signIn(e)}
					type="button"
					className="bg-brand-blue-800 w-full rounded text-white font-regular mb-6 mt-5 py-3 drop-shadow-md"
					aria-label="Sign In Button"
				>
					Sign In
				</button>
			)}
		</>
	);
}
