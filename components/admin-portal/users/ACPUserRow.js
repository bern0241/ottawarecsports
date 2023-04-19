/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

// REFERENCES: https://stackoverflow.com/questions/6975693/amazon-s3-access-image-by-url
// https://www.youtube.com/watch?v=GsObT64SRhA&t=477s
// https://tabler.io/icons
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminListGroupsForUser.html
// https://flowbite.com/docs/components/tables/

import React, { useEffect, useState } from 'react';
import ACPEditUserModal from './ACPEditUserModal';
import ACPDeleteUserModal from './ACPDeleteUserModal';
import ACPDEnableDisableUserSwitcher from './ACPEnableDisableUserSwitcher';
import AWS from 'aws-sdk';
import { IconEdit } from '@tabler/icons-react';

export default function ACPUserRow({ user, index }) {
	const [userGroups, setUserGroups] = useState([]);
	const [deleteUserModal, setDeleteUserModal] = useState(false);
	const [editUserModal, setEditUserModal] = useState(false);
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		getGroupsForUser();
	}, []);

	const getGroupsForUser = () => {
		var params = {
			Username: user.Username,
			UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID,
		};
		cognitoidentityserviceprovider.adminListGroupsForUser(
			params,
			function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else {
					// successful response
					setUserGroups(data.Groups);
				}
			}
		);
	};

	return (
		<>
			<tr>
				<td>
					{editUserModal && (
						<ACPEditUserModal
							user1={user}
							openModal={editUserModal}
							setOpenModal={setEditUserModal}
						/>
					)}
					{deleteUserModal && (
						<ACPDeleteUserModal
							user={user}
							openModal={deleteUserModal}
							setOpenModal={setDeleteUserModal}
						/>
					)}
				</td>
			</tr>
			<tr key={user.id} className="border-b border-brand-neutral-300">
				<td className="p-5 font-medium">
					{user.Attributes.find((o) => o.Name === 'name')['Value'].charAt(0)}.{' '}
					{user.Attributes.find((o) => o.Name === 'family_name')['Value']}
				</td>
				<td className="p-5 flex flex-col">
					{userGroups &&
						userGroups.map((group, index) => (
							<React.Fragment key={index}>
								<p key={index}>{group.GroupName}</p>
							</React.Fragment>
						))}
				</td>
				<td className="p-5">
					{user.Attributes.find((o) => o.Name === 'email')['Value']}
				</td>
				<td className="p-5">
					<div className="flex">
            <button>
						<IconEdit
							className="text-brand-blue-900 mr-3 cursor-pointer"
							onClick={(e) => {
								e.stopPropagation();
								setEditUserModal(true);
							}}
						/>
            </button>
						<ACPDEnableDisableUserSwitcher user={user} />
					</div>
				</td>
			</tr>
		</>
	);
}
