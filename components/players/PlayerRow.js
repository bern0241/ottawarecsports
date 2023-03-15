import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';

function PlayerRow({player, index}) {
	return (
		<tr key={player.id} className="border-b border-brand-neutral-300">
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 font-medium text-md">
				<div className="flex items-center">
					<img
						src="http://via.placeholder.com/60x60"
						className="rounded-full mr-5"
					></img>
					<div className="flex flex-col gap-1">
						<h1 className="font-medium">
							{player.firstName} {player.lastName}
						</h1>
						<div className="flex text-sm font-normal">
							<span className="mr-5">{player.age}</span>
							<span>{player.gender}</span>
						</div>
					</div>
				</div>
			</td>
			<td className="p-5">{player.location}</td>
			<td className="p-5">
				<div className="flex flex-col gap-1">
					{player.teams.slice(0, 2).map((team) => (
						<div>{team.sport}</div>
					))}
				</div>
			</td>
			<td className="p-5">
				<div className="flex flex-col gap-1">
					{player.teams.slice(0, 2).map((team) => (
						<div>{team.name}</div>
					))}
				</div>
			</td>
			<td className="p-5">
				<div className="flex flex-col gap-1">
					{player.teams.slice(0, 2).map((team) => (
						<div>{team.role}</div>
					))}
				</div>
			</td>
			<td className="p-5">
				<div className="flex">
					<IconEdit className="text-brand-blue-900 mr-3" />
					<IconTrash className="text-brand-orange-800 hover:bg-blue-400" />
				</div>
			</td>
		</tr>
	);
}

export default PlayerRow;
