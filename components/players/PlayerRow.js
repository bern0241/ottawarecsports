/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import { useRouter } from 'next/router';

export default function PlayerRow({ player, index }) {
	const router = useRouter();

	// Reference: Stack Overflow/Roy <https://stackoverflow.com/questions/73598303/calculate-age-in-js-given-the-birth-date-in-dd-mm-yyyy-format>
	function calculateAge(dob) {
		const birthDate = new Date(dob);
		const currentDate = Date.now();
		const difference = currentDate - birthDate;
		// 1000 * 60 * 60 * 24 * 365 is miliseconds in a year.
		const age = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
		return age;
	}

	const handleClick = () => {
		router.push(`/players/${player.Username}`);
	};

	return (
		<tr
			key={player.id}
			className="border-b border-brand-neutral-300 hover:cursor-pointer"
			onClick={handleClick}
		>
			{/* odd:bg-white even:bg-brand-neutral-100 */}
			<td className="p-5 text-md">
				<div className="flex items-center">
					<img
						src="https://api.lorem.space/image/face?w=60&h=60"
						className="rounded-full mr-5"
					></img>
					<div className="flex flex-col gap-1">
						<h1 className="font-medium">
							{player.Attributes.find((o) => o.Name === 'name')['Value']}{' '}
							{player.Attributes.find((o) => o.Name === 'family_name')['Value']}
						</h1>
						<div className="flex text-sm font-light">
							<span className="mr-5">
								{calculateAge(
									player.Attributes.find((o) => o.Name === 'birthdate')['Value']
								)}
							</span>
							<span>
								{player.Attributes.find((o) => o.Name === 'gender')['Value']}
							</span>
						</div>
					</div>
				</div>
			</td>
			<td className="p-5 font-light">
				{player.Attributes.find((o) => o.Name === 'custom:location')['Value']}
			</td>
			<td className="p-5 font-light">
				<div className="flex flex-col gap-1">
					{/* {player.teams.slice(0, 2).map((team) => (
						<div key={team.id}>{team.sport}</div>
					))} */}
					...sports
				</div>
			</td>
			<td className="p-5 font-light">
				<div className="flex flex-col gap-1">
					{/* {player.teams.slice(0, 2).map((team) => (
						<div key={team.id}>{team.name}</div>
					))} */}
					...teams
				</div>
			</td>
			<td className="p-5 font-light">
				<div className="flex flex-col gap-1">
					{/* {player.teams.slice(0, 2).map((team) => (
						<div key={team.id}>{team.role}</div>
					))} */}
					...roles
				</div>
			</td>
		</tr>
	);
}
