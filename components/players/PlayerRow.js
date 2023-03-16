/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import { useRouter } from 'next/router';
import { IconEdit, IconTrash } from '@tabler/icons-react';

export default function PlayerRow({ player, index }) {
	const router = useRouter();

	// You cannot wrap a <Link> around a table row, so you need to use router.push instead:
	const handleClick = () => {
		router.push(`/players/${player.id}`);
	};

	return (
		<tr key={player.id} className="border-b border-brand-neutral-300 hover:cursor-pointer" onClick={handleClick}>
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 text-md">
				<div className="flex items-center">
					<img src={player.avatar} className="rounded-full mr-5"></img>
					<div className="flex flex-col gap-1">
						<h1 className="font-medium">
							{player.firstName} {player.lastName}
						</h1>
						<div className="flex text-sm font-light">
							<span className="mr-5">{player.age}</span>
							<span>{player.gender}</span>
						</div>
					</div>
				</div>
			</td>
			<td className="p-5 font-light">{player.location}</td>
			<td className="p-5 font-light">
				<div className="flex flex-col gap-1">
					{player.teams.slice(0, 2).map((team) => (
						<div key={team.id}>{team.sport}</div>
					))}
				</div>
			</td>
			<td className="p-5 font-light">
				<div className="flex flex-col gap-1">
					{player.teams.slice(0, 2).map((team) => (
						<div key={team.id}>{team.name}</div>
					))}
				</div>
			</td>
			<td className="p-5 font-light">
				<div className="flex flex-col gap-1">
					{player.teams.slice(0, 2).map((team) => (
						<div key={team.id}>{team.role}</div>
					))}
				</div>
			</td>
			<td className="p-5 font-light">
				<div className="flex">
					<IconEdit className="text-brand-blue-900 mr-3 hover:cursor-pointer" />
					<IconTrash className="text-brand-orange-800 hover:cursor-pointer" />
				</div>
			</td>
		</tr>
	);
}
