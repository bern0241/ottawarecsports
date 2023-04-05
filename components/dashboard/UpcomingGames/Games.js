/**
 * Last updated: 2023-04-3
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import { API } from '@aws-amplify/api';
import { getDivisionWithTeams } from '@/src/graphql/custom-queries';

export default function Games() {

	// const getGames = async () => {
    //     const apiData = await API.graphql(
    //         { query: getDivisionWithTeams, 
    //         variables: { teamID: id }
    //     });
    //     console.log('See here', apiData.data);
    // }

	const soccerGames = [
		{
			day: 'Tuesday',
			matches: ['Game 1', 'Game 2', 'Game 3'],
		},
		{
			day: 'Thursday',
			matches: ['Game 1', 'Game 2', 'Game 3'],
		},
		{
			day: 'Friday',
			matches: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'],
		},
	];

	return (
		<div className="flex flex-row lg:flex-col gap-8 md:gap-4 xl:gap-1">
			{soccerGames &&
				soccerGames.map((game, index) => (
					<div key={index} className="flex flex-col xl:flex-row justify-between xl:gap-3">
						<div className="font-light text-sm">{game.day}</div>
						<div className="font-medium">{game.matches.length} Matches</div>
					</div>
				))}
		</div>
	);
}
