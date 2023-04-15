/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useUser } from '@/context/userContext';
import AdminIdentifier from '@/components/admin-portal/AdminIdentifier';
import SignOutButton from '@/components/common/SignOutButton';
import { IconCirclePlus } from '@tabler/icons-react';
import AWS from 'aws-sdk';
//Components
import SearchBarInput from '@/components/common/SearchBarInput';
import SuccessMessage from '@/components/common/SuccessMessage';
import ACPUserRow from '@/components/admin-portal/users/ACPUserRow';
import ACPNewUserModal from '@/components/admin-portal/users/ACPNewUserModal';
import ACPSearchUserBar from '@/components/admin-portal/users/ACPSearchUserBar';

export default function AdminPortal() {
	const [users, setUsers] = useState();
	const [filteredUsers, filterUsers] = useState();
	const [addUserModal, setAddUserModal] = useState(false);
	const [searchResult, setSearchResult] = useState('');
	// When a user gets created successfully, a message pops up in the browser
	const [successMessage, setSuccessMessage] = useState(false);
	const [user, setUser, authRoles, setAuthRoles] = useUser();

	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider(); //Required for fetching in AWS Cognito

	// Saves user's role and leagues when pressed.
	const handleSave = (index, userRole, userLeague) => {
		const updatedUsers = [...users]; // Make a copy of the array.
		updatedUsers[index].role = userRole;
		updatedUsers[index].leagues = userLeague;
	};

	useEffect(() => {
		fetchUsers();
	}, []);
	// Fetches all users (from AWS Cognito)
	const fetchUsers = async () => {
		var params = {
			UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID /* required */,
		};
		cognitoidentityserviceprovider.listUsers(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				setUsers(data.Users);
				filterUsers(data.Users);
			}
		});
	};

	function handleSearch(ev) {
		ev.preventDefault();

		let searchValue = document
			.getElementById('user-search')
			.value.toLowerCase();

		let filteredUsers = users.filter((user) => {
			const firstName = user.Attributes.find((o) => o.Name === 'name')['Value'];
			const lastName = user.Attributes.find((o) => o.Name === 'family_name')[
				'Value'
			];

			// Reference: Stack Overflow/zb22 <https://stackoverflow.com/questions/66089303/how-to-filter-full-name-string-properly-in-javascript>
			const arr = searchValue.split(' ');
			return arr.some(
				(el) =>
					firstName.toLowerCase().includes(el) ||
					lastName.toLowerCase().includes(el)
			);
		});

		filterUsers(filteredUsers);
	}

	// Only Admins or Owner can access page
	if (!user || (!authRoles.includes('Admin') && !authRoles.includes('Owner'))) {
		return (
			<div className="flex items-center justify-center h-[50vh]">
				<h2>You do not have access for this page</h2>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>Ottawa Rec Sports - Users</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/ORS-Logo.png" />
			</Head>

			<main className="p-8">
				<div className="mb-5">
					<SearchBarInput
						id="user-search"
						setSearchResult={setSearchResult}
						placeholder="Search"
						searchFunction={handleSearch}
					/>
				</div>
				{/* <ACPSearchUserBar setSearchResult={setSearchResult} /> */}

				<section className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h2 className="text-xl self-center">Users</h2>
						<button
							className="flex items-center justify-between py-2 px-6 text-white font-medium text-sm rounded-3xl bg-blue-900 hover:bg-blue-800"
							onClick={() => setAddUserModal(true)}
						>
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
							{filteredUsers &&
								filteredUsers.map((user, index) => (
									<React.Fragment key={index}>
										<ACPUserRow
											key={user.Username}
											user={user}
											index={index}
											handleSave={handleSave}
										/>
									</React.Fragment>
								))}
							{/* {users &&
								users
									.filter((user) => {
										const searchItem = searchResult.toLocaleLowerCase();
										const v = `${user.Attributes.find((o) => o.Name === 'name')[
											'Value'
										].toLocaleLowerCase()} ${user.Attributes.find(
											(o) => o.Name === 'family_name'
										)['Value'].toLocaleLowerCase()}`;
										if (!searchItem) return true;
										return v.startsWith(searchItem);
									})
									.map((user, index) => (
										<ACPUserRow
											key={user.Username}
											user={user}
											index={index}
											handleSave={handleSave}
										/>
									))} */}
						</tbody>
					</table>
				</section>
			</main>
			{/* Add User modal */}
			{addUserModal && (
				<ACPNewUserModal
					setOpenModal={setAddUserModal}
					setSuccessMessage={setSuccessMessage}
				/>
			)}
			{/* Delete User modal */}
			{addUserModal && <ACPNewUserModal setOpenModal={setAddUserModal} />}
			{/* Success Message */}
			{successMessage && (
				<SuccessMessage
					title={'Success!'}
					message={'User has been successfully created!'}
					setDisplay={setDisplayNewUserSuccess}
				/>
			)}
		</>
	);
}
