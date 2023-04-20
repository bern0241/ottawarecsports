/**
 * Last updated: 2023-04-01
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import CreateButton from '@/components/common/CreateButton';
import LeagueCard from './LeagueCard';
import CreateLeagueModal from '@/components/common/sports/Leagues/CreateLeagueModal';
import { API } from '@aws-amplify/api';
import { listLeaguesLong } from '@/src/graphql/custom-queries';
import { getLeague } from '@/src/graphql/queries';
import { useUser } from '@/context/userContext';

export default function LeagueTable({
	sport,
	selectedLeague,
	setSelectedLeague,
}) {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [leagues, setLeagues] = useState([]);
	const [newLeagueModal, setNewLeagueModal] = useState(false);
	//
	useEffect(() => {
		listLeaguesFunc();
	}, []);

	const listLeaguesFunc = async () => {
		const timer = setTimeout(async () => {
			const variables = {
				filter: {
					sport: {
						eq: sport,
					},
				},
			};
			const leagues = await API.graphql({
				query: listLeaguesLong,
				variables: variables,
			});

			setLeagues(leagues.data.listLeagues.items);

			if (leagues.data.listLeagues.items.length === 0) {
				setSelectedLeague(null);
			}

			if (localStorage.getItem('lastSelectedLeague') !== null) {
				const league = await API.graphql({
					query: getLeague,
					variables: { id: localStorage.getItem('lastSelectedLeague') },
				});
				if (league.data.getLeague !== null) {
					setSelectedLeague(league.data.getLeague);
				} else {
					setSelectedLeague(leagues.data.listLeagues.items[0]);
				}
			}
		}, 500);
		return () => clearTimeout(timer);
	};

	useEffect(() => {
		if (selectedLeague) {
			localStorage.setItem('lastSelectedLeague', selectedLeague.id);
		}
	}, [selectedLeague]);

	return (
		<>
			<div className="relative overflow-x-auto mx-auto w-full my-[1rem]">
				<div className="flex justify-between items-center py-3 px-5 border-l border-t border-r border-gray-400 pr-2 bg-white">
					<h2 className="text-xl">League</h2>
					{((authRoles && authRoles.includes('Admin')) ||
						(authRoles && authRoles.includes('Owner'))) && (
						<CreateButton
							autoFocus={true}
							label="Create New League"
							state={newLeagueModal}
							setState={setNewLeagueModal}
						/>
					)}
				</div>
				<table className="w-full text-sm text-left border border-gray-400">
					<thead className="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="font-light px-6 py-2 border-l-[1px] border-gray-400"
							>
								Name
							</th>
							<th scope="col" className="font-light py-2 text-center">
								<p className="hidden sm:contents">Coordinator (s)</p>
							</th>
							<th
								scope="col"
								className="font-light py-2 border-r-[1px] text-right pr-10 border-gray-400"
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{leagues &&
							leagues.map((league, index) => (
								<LeagueCard
									key={index}
									league={league}
									selectedLeague={selectedLeague}
									setSelectedLeague={setSelectedLeague}
									sport={sport}
									setLeagues={setLeagues}
									listLeaguesFunc={listLeaguesFunc}
								/>
							))}

						<tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
							<th
								scope="row"
								className="px-6 py-6 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer"
							>
								<p className="sr-only">All Leagues</p>

								{/* All Leagues
                            <ion-icon style={{fontSize: '20px', color: 'blue'}} name="chevron-forward-outline"></ion-icon> */}
							</th>
							<td className="px-6 py-4"></td>
							<td className="flex gap-4 px-6 py-4 text-center"></td>
						</tr>
					</tbody>
				</table>
			</div>
			{newLeagueModal && (
				<>
					<CreateLeagueModal
						sport={sport}
						openModal={newLeagueModal}
						setOpenModal={setNewLeagueModal}
						setLeagues={setLeagues}
						setSelectedLeague={setSelectedLeague}
					/>
				</>
			)}
		</>
	);
}
