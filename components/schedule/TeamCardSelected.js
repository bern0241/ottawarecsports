/**
 * Last updated: 2023-04-08
 *
 * Author(s):
 * Greg Coghill (cogh0020@algonquinlive.com)
 * Justin Bernard <bern0241@algonquinlive.com>
 * Son Tran <tran0460@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { getImageFromS3 } from '@/utils/graphql.services';

export default function TeamCardSelected({ team }) {
	const [teamImage, setTeamImage] = useState(null);

	useEffect(() => {
		getTeamImage();
	}, [team]);

	async function getTeamImage() {
		if (team.team_picture === null || team.team_picture === '') {
			setTeamImage(null);
		} else {
			const url = await getImageFromS3(team.team_picture);
			setTeamImage(url);
		}
	}

	return (
		<div className="">
			<button
				type="text"
				id="homeTeam"
				className="block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer flex items-center p-0 gap-3"
			>
				<img
					style={{ objectFit: 'cover' }}
					width={132}
					height={132}
					className="w-[3rem] h-[3rem] rounded-md shadow-md border border-black"
					src={`${teamImage ? teamImage : '/Logo.svg'}`}
				/>
				{team && team.name}
			</button>
		</div>
	);
}
