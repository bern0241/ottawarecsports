/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import AdminIdentifier from '@/components/admin-portal/AdminIdentifier';
import SignOutButton from '@/components/common/SignOutButton';
import ACPUserRow from '@/components/admin-portal/ACPUserRow';
import { IconCirclePlus } from '@tabler/icons-react';
import AWS from 'aws-sdk';

export default function AdminPortal() {
	const usersList = [
		{
			id: 1,
			firstName: 'Steven',
			lastName: 'Spielberg',
			role: 'User',
			leagues: 'League A',
		},
		{
			id: 2,
			firstName: 'Michelle',
			lastName: 'Yeoh',
			role: 'Administrator',
			leagues: 'League C',
		},
		{
			id: 3,
			firstName: 'Brendan',
			lastName: 'Fraser',
			role: 'User',
			leagues: '',
		},
		{
			id: 4,
			firstName: 'Michael',
			lastName: 'Fassbender',
			role: 'Administrator',
			leagues: 'League A',
		},
		{
			id: 5,
			firstName: 'Charlize',
			lastName: 'Theron',
			role: 'User',
			leagues: 'League B',
		},
	];

	const [users, setUsers] = useState();
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(); //Required for fetching in AWS Cognito

	const handleSave = (index, userRole, userLeague) => {
		const updatedUsers = [...users]; // Make a copy of the array.
		updatedUsers[index].role = userRole;
		updatedUsers[index].leagues = userLeague;
		// setUsers(updatedUsers);
		console.log(users);
	};

	useEffect(() => {
		fetchUsers();
	}, [])

	const fetchUsers = async () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t', /* required */
		  };
		cognitoidentityserviceprovider.listUsers(params, function(err, data) {
		if (err) {
			console.log(err, err.stack);
		}
		else {
			console.log(data.Users);
			setUsers(data.Users);
		}
		});
	}

	return (
		<>
			<main className="p-[4rem]">
				<section className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h1 className="text-xl self-center">Users</h1>
						<button className="flex items-center justify-between py-2 px-6 text-white font-medium text-sm rounded-3xl bg-blue-900 hover:bg-blue-800">
							<IconCirclePlus className="mr-2 h-5 w-5" />
							Add a User
						</button>
					</div>

					<table className="mb-32 table-auto">
						<thead className="bg-brand-neutral-100">
							<tr className="text-left">
								<th className="py-3 px-5 text-sm font-light w-2/6">
									<div className="flex">Name</div>
								</th>
								<th className="py-3 px-5 text-sm font-light w-2/6">
									<div className="flex">Role</div>
								</th>
								<th className="py-3 px-5 text-sm font-light w-2/6">
									<div className="flex">Leagues</div>
								</th>
								<th className="py-3 px-5 text-sm font-light">Action</th>
							</tr>
						</thead>
						<tbody>
							{users && users.map((user, index) => (
								<ACPUserRow
									key={user.id}
									user={user}
									index={index}
									handleSave={handleSave}
								/>
							))}
						</tbody>
					</table>
				</section>
			</main>
		</>
	);
}
