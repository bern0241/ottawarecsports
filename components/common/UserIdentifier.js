/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react';
import { useUser } from '@/context/userContext';

export default function UserIdentifier() {
	const [user, setUser] = useUser();

	return (
		<>
			{user && (
				<div>
					<h2>
						Welcome{' '}
						<b>
							{user.attributes.name} {user.attributes.family_name}
						</b>
					</h2>
				</div>
			)}
		</>
	);
}
