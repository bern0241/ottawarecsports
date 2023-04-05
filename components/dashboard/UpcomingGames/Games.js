/**
 * Last updated: 2023-04-3
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import { API } from '@aws-amplify/api';
import { getGamesByTeam } from '@/src/graphql/custom-queries';
import { getPlayersByUsername } from '@/utils/graphql.services';
import { useUser } from '@/context/userContext';

export default function Games() {
	// Get currently logged in user:
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [userId, setUserId] = useState();
	const [playerData, setPlayerData] = useState();
	const [teams, setTeams] = useState();

	useEffect(() => {
		if (!user) return;
		setUserId(user.username);
	}, [user]);

	useEffect(() => {
		if (!userId) return;
		fetchPlayer();
	}, [userId]);

	useEffect(() => {
		getGames(playerData.teamID);
	}, [playerData]);

	const fetchPlayer = async () => {
		const data = await getPlayersByUsername(userId);
		if (data) {
			setPlayerData(data[0]);
		}
	};

	const getGames = async (id) => {
		const apiData = await API.graphql({
			query: getGamesByTeam,
			variables: { teamId: id },
		});
		console.log('Games', apiData.data.listGames.items.length);
	};

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
					<div
						key={index}
						className="flex flex-col xl:flex-row justify-between xl:gap-3"
					>
						<div className="font-light text-sm">{game.day}</div>
						<div className="font-medium">{game.matches.length} Matches</div>
					</div>
				))}
		</div>
	);
}
