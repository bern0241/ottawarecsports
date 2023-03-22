/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Son Tran <tran0460@algonquinlive.com>
 */

import { useState, useEffect } from 'react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { getImageFromS3 } from '@/utils/graphql.services';

export default function TeamRow({ team, setCurrentTeam }) {
	const [profileImage, setProfileImage] = useState('');
	const currentSeason = team.team_history[0];
	const getPicture = async () => {
		if (!team.team_picture)
			return setProfileImage('http://via.placeholder.com/60x60');
		const url = await getImageFromS3(team.team_picture);
		setProfileImage(url);
	};
	useEffect(() => {
		getPicture();
	}, []);
	return (
		<tr key={team.id} className="border-b border-brand-neutral-300">
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 font-medium">
				<div className="flex items-center">
					<img
						src={profileImage}
						className="rounded-full mr-5 w-[3.75rem] h-[3.75rem]"
					></img>
					{team.name}
				</div>
			</td>
			<td className="p-5">
				{currentSeason.captains[0].charAt(0) || 'J'}.{' '}
				{currentSeason.captains[0].split(' ')[1] || 'Doe'}
			</td>
			<td className="p-5">{team.sports || 'Soccer'}</td>
			<td className="p-5">{currentSeason.roster.length || 0}/15</td>
			<td className="p-5">{team.notes}</td>
			<td className="p-5">
				<div className="flex">
					<IconEdit
						className="text-brand-blue-900 mr-3"
						onClick={() => setCurrentTeam(team)}
					/>
					<IconTrash className="text-brand-orange-800 hover:bg-blue-400" />
				</div>
			</td>
		</tr>
	);
}
