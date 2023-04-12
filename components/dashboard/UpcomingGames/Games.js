/**
 * Last updated: 2023-04-11
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
	const [games, setGames] = useState([]);
	const [gameSchedule, setGameSchedule] = useState([
		{ day: 'Sunday', games: [] },
		{ day: 'Monday', games: [] },
		{ day: 'Tuesday', games: [] },
		{ day: 'Wednesday', games: [] },
		{ day: 'Thursday', games: [] },
		{ day: 'Friday', games: [] },
		{ day: 'Saturday', games: [] },
	]);

	useEffect(() => {
		if (!user) return;
		setUserId(user.username);
	}, [user]);

	useEffect(() => {
		if (!userId) return;
		fetchPlayer();
	}, [userId]);

	useEffect(() => {
		if (!playerData) return;
		getGames(playerData);
	}, [playerData]);

	useEffect(() => {
		if (!games) return;
		sortGamesByDate(games);
	}, [games]);

	// Fetch all player records belonging to the currently logged-in user:
	const fetchPlayer = async () => {
		const data = await getPlayersByUsername(userId);
		if (data) {
			setPlayerData(data);
		}
	};

	// Get a list of all teams where the user is a player on either the home or away team:
	const getGames = async (data) => {
		let arr = [];
		for (let i of data) {
			const apiData = await API.graphql({
				query: getGamesByTeam,
				variables: { teamId: i.teamID },
			});
			arr = arr.concat(apiData.data.listGames.items);
		}
		setGames(arr);
	};

	// Sort games by day of the week:
	const sortGamesByDate = (games) => {
		const arr = [...gameSchedule];

		games.forEach((game) => {
			const date = new Date(game.date);
			const dayOfWeek = date.getDay();
			arr[dayOfWeek].games.push(game);
		});

		setGameSchedule(arr);
	};

	return (
		<div className="flex flex-row lg:flex-col gap-8 md:gap-4 xl:gap-1">
			{games && games.length > 0 ? (
				gameSchedule &&
				gameSchedule.map(
					(game, index) =>
						game.games.length > 0 && (
							<div
								key={index}
								className="flex flex-col xl:flex-row justify-between xl:gap-3"
							>
								<div className="font-light text-sm">{game.day}</div>
								<div className="font-medium">{game.games.length} Matches</div>
							</div>
						)
				)
			) : (
				<span className="font-light text-sm">No matches.</span>
			)}
		</div>
	);
}
