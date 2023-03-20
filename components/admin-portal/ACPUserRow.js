/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
// import ACPRoleDropdownMenu from './ACPRoleDropdownMenu';
// import ACPLeagueDropdownMenu from './ACPLeagueDropdownMenu';
// import { IconDeviceFloppy } from '@tabler/icons-react';
import ACPEditUserModal from './ACPEditUserModal';
import ACPDeleteUserModal from './ACPDeleteUserModal';
import ACPDEnableDisableUserSwitcher from './ACPEnableDisableUserSwitcher';
import AWS from 'aws-sdk';
import { IconTrash } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';

export default function ACPUserRow({ user, index }) {
	const [userGroups, setUserGroups] = useState([]);
	const [deleteUserModal, setDeleteUserModal] = useState(false);
	const [editUserModal, setEditUserModal] = useState(false);
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		getGroupsForUser();
	}, [])

	const getGroupsForUser = () => {
	var params = {
		Username: user.Username,
		UserPoolId: 'us-east-1_70GCK7G6t',
	};
	cognitoidentityserviceprovider.adminListGroupsForUser(params, function(err, data) {
		if (err) console.log(err, err.stack); // an error occurred
		else  { // successful response
			setUserGroups(data.Groups)
		}
	  });
	}

	return (
		<>
		<tr key={user.id} className="border-b border-brand-neutral-300">
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 font-medium">
				{user.Attributes.find(o => o.Name === 'name')['Value'].charAt(0)}. {user.Attributes.find(o => o.Name === 'family_name')['Value']}
			</td>
			<td className="p-5 flex flex-col">
				{userGroups && userGroups.map((group) => (
					<>
					<p>{group.GroupName}</p>
					</>
				))}
			</td>
			<td className="p-5">
				{/* <ACPLeagueDropdownMenu
					defaultLeague={user.leagues}
					changeUserLeague={changeUserLeague}
				/> */}
				{user.Attributes.find(o => o.Name === 'email')['Value']}
			</td>
			<td className="p-5">
				<div className="flex">
					<IconEdit
						className="text-brand-blue-900 hover:bg-blue-400 mr-3 cursor-pointer"
						onClick={(e) => {
							e.stopPropagation();
							setEditUserModal(true);
						}}
					/>
					{/* <IconTrash 
						className="text-brand-orange-800 hover:bg-blue-400 cursor-pointer" 
						onClick={(e) => {
							e.stopPropagation(); //Prevents pressing through the item (under UI) 
							setDeleteUserModal(true);
						}}/> */}
						<ACPDEnableDisableUserSwitcher user={user} />
				</div>
			</td>
		</tr>
		{editUserModal && (
			<ACPEditUserModal user={user} openModal={editUserModal} setOpenModal={setEditUserModal} />
		)}
		{deleteUserModal && (
			<ACPDeleteUserModal user={user} openModal={deleteUserModal} setOpenModal={setDeleteUserModal} />
		)}
		</>
	);
}
