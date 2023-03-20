import React, { useState } from 'react';
import ACPRoleDropdownMenu from './ACPRoleDropdownMenu';
import ACPLeagueDropdownMenu from './ACPLeagueDropdownMenu';
// import { IconDeviceFloppy } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { IconEdit } from '@tabler/icons-react';

export default function ACPUserRow({ user, index, handleSave }) {
	const [userRole, setUserRole] = useState(user.role);
	const [userLeague, setUserLeague] = useState(user.leagues);

	function changeUserRole(role) {
		setUserRole(role);
	}

	function changeUserLeague(league) {
		setUserLeague(league);
	}

	function saveChanges(index) {
		handleSave(index, userRole, userLeague);
	}

	return (
		<tr key={user.id} className="border-b border-brand-neutral-300">
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 font-medium">
				{user.Attributes.find(o => o.Name === 'name')['Value'].charAt(0)}. {user.Attributes.find(o => o.Name === 'family_name')['Value']}
			</td>
			<td className="p-5">
				<ACPRoleDropdownMenu
					defaultRole={user.role}
					changeUserRole={changeUserRole}
				/>
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
						className="text-brand-blue-900 mr-3"
						onClick={() => {
							saveChanges(index);
						}}
					/>
					<IconTrash className="text-brand-orange-800 hover:bg-blue-400" />
				</div>
			</td>
		</tr>
	);
}
