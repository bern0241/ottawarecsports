/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 *
 * Summary:
 * This component displays a list of finished matches that require post-game scores.
 * Admin and owners can see ALL matches; Refereees can only see matches they are assigned to.
 */

import React, { useEffect, useState } from 'react';
import Game from './Game';
import { IconAlertCircleFilled } from '@tabler/icons-react';
import { getAllMatches } from '@/utils/graphql.services';
import { useUser } from '@/context/userContext';

export default function GameSheets() {
	const [games, setGames] = useState([]);
	const [user, setUser, authRoles] = useUser();

	useEffect(() => {
		fetchGames();
	}, []);

	// Fetch games that have ended but still require scores:
	const fetchGames = async () => {
		const response = await getAllMatches();
		if (response) {
			const finishedGames = response.filter(
				(object) => object.status === 'FINISHED'
			);
			setGames(finishedGames);
		}
	};

	return (
    <>
    {games && games.length > 0 ? (
		<>
			{user &&
				(authRoles.includes('Admin') ||
					authRoles.includes('Owner') ||
					authRoles.includes('Referee')) && (
					<section id="game-sheets" className="col-span-4">
						<div className="bg-white border border-brand-neutral-300 rounded-md">
							<div className="flex items-center justify-between border-b border-brand-neutral-300 px-3 py-2">
								<h1 className="text-md font-medium">Update Game Scores</h1>
								<div className="flex items-center bg-brand-orange-200 rounded-full">
									<IconAlertCircleFilled
										size={24}
										className="text-brand-orange-800"
									/>
									<span className="text-xs font-medium text-brand-orange-900 mx-2">
										These games need your attention!
									</span>
								</div>
							</div>
							<div className="">
								{games &&
									games.map((game) => <Game key={game.id} game={game} />)}
							</div>
						</div>
					</section>
				)}
		</>) : (
      <div></div>
    )}
    </>
	);
}
