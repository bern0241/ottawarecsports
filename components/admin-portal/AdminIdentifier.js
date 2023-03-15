/**
 * Last updated: 2023-03-12
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react';
import { useUser } from '@/context/userContext';

export default function AdminIdentifier() {
	const [user, setUser, authRoles, setAuthRoles] = useUser();

	return (
		<>
			{user && (authRoles.includes('Admin') || authRoles.includes('Owner')) ? (
				<div>
					<h2>
						Welcome Admin {user.attributes.name} {user.attributes.family_name}!
					</h2>
				</div>
			) : (
				<div>
					<h2>You do not have access for this page</h2>
				</div>
			)}
		</>
	);
}
