/**
 * Last updated: 2023-03-27
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react';
import Link from 'next/link';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

export default function ProfileDropdown({
	openDropdown,
	setOpenDropdown,
	user,
	setUser,
	setProfileImage,
}) {
	const router = useRouter();

	const signIn = async () => {
		router.push('/login');
		setOpenDropdown(false);
	};

	const signOut = async () => {
		try {
			await Auth.signOut();
			setUser(null);
			setProfileImage(null);
			setOpenDropdown(false);
			router.push('/login');
		} catch (error) {
			console.log(error.message);
		}
	};

	return (
		<>
			{openDropdown && (
				<>
					<div
						onClick={(e) => setOpenDropdown(false)}
						className="opacity-50 fixed top-0 left-0 w-[100%] h-[100%]"
					/>

					<div
						id="dropdownAvatar"
						className="border-gray-300 border-[1px] z-20 fixed top-[4.5rem] right-0 bg-white divide-y text-left divide-gray-300 rounded-lg shadow-form dark:bg-gray-700 dark:divide-gray-600"
					>
						<div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
							{!user && <div>Please sign in</div>}
							{user && (
								<div className="font-medium truncate text-[.8rem]">
									{user.attributes.email}
								</div>
							)}
							{!user && <div className="font-medium truncate">Guest</div>}
						</div>

						{user && (
							<ul
								className="py-2 text-left text-sm text-gray-700 dark:text-gray-200"
								aria-labelledby="dropdownUserAvatarButton"
							>
								<li>
									<Link
										href="/"
										className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Dashboard
									</Link>
								</li>
								<li>
									<Link
										href="/settings"
										className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										Settings
									</Link>
								</li>
							</ul>
						)}

						{user ? (
							<div onClick={() => signOut()} className="py-2">
								<a
									href="#"
									className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Sign Out
								</a>
							</div>
						) : (
							<div onClick={() => signIn()} className="py-2">
								<a
									href="#"
									className="text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
								>
									Sign In
								</a>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}
