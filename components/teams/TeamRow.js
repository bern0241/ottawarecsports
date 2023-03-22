/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';

export default function TeamRow({ team, setCurrentTeam }) {
	const currentSeason = team.team_history[0];
	return (
		<tr key={team.id} className="border-b border-brand-neutral-300">
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 font-medium">
				<div className="flex items-center">
					<img
						src="http://via.placeholder.com/60x60"
						className="rounded-full mr-5"
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
