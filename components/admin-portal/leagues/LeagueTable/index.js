/**
 * Last updated: 2023-04-01
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES: https://flowbite.com/docs/components/dropdowns/
// https://flowbite.com/docs/components/modal/
// https://flowbite.com/docs/components/buttons/
// https://flowbite.com/docs/components/tables/
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s

import React, { useState, useEffect } from 'react';
import CreateButton from '../../../common/CreateButton';
import LeagueCard from './LeagueCard';
import CreateLeagueModal from '../../../common/sports/Leagues/CreateLeagueModal';
import { API } from '@aws-amplify/api';
import { listLeaguesLong } from '@/src/graphql/custom-queries';
import { getLeague } from '@/src/graphql/queries';
import SportDropdown from './SportDropdown';

export default function ACPLeagueTable({
	selectedLeague,
	setSelectedLeague,
	leagues,
	setLeagues,
}) {
	const [newLeagueModal, setNewLeagueModal] = useState(false);
	// const [leagues, setLeagues] = useState([]);
	const [sport, setSport] = useState('Soccer');

	useEffect(() => {
		listLeaguesFunc();
	}, []);

	useEffect(() => {
		if (sport) {
			listLeaguesFuncShort(sport);
		}
	}, [sport]);

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
				// query: listLeaguesLong
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

	const listLeaguesFuncShort = async (_sport) => {
		const variables = {
			filter: {
				sport: {
					eq: _sport,
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
	};

	useEffect(() => {
		if (selectedLeague) {
			localStorage.setItem('lastSelectedLeague', selectedLeague.id);
		}
	}, [selectedLeague]);

	return (
		<>
			<div className="relative mx-auto w-full my-[1rem]">
				<SportDropdown sport={sport} setSport={setSport} />
				<table className="w-full text-sm text-left border border-gray-400">
					<thead className="text-md text-black bg-white">
						<tr>
							<th
								scope="col"
								className="overflow-auto text-[1rem] font-medium px-6 py-5"
							>
								League
							</th>
							<th scope="col" className="font-medium px-6 py-4"></th>
							<th scope="col" className="font-medium"></th>
							<th className="absolute right-5 top-2">
								<CreateButton
									label="Create New League"
									state={newLeagueModal}
									setState={setNewLeagueModal}
									autoFocus={true}
								/>
							</th>
						</tr>
					</thead>
					<thead className="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="font-light px-6 py-2 border-l-[1px] border-gray-400"
							>
								Name
							</th>
							<th
								scope="col"
								className="w-[15rem] text-center font-light px-6 py-2"
							>
								Coordinator (s)
							</th>
							<th
								scope="col"
								className="w-[15rem] text-center font-light px-6 py-2"
							>
								Sport
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
						{leagues && leagues.length === 0 && (
							<tr>
								<td className="absolute left-[50%] translate-x-[-50%] mt-3">
									<p>There are currently no leagues for this sport.</p>
								</td>
							</tr>
						)}

						<tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
							<th
								scope="row"
								className="px-6 py-6 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer"
							>
								{/* All Leagues
                            <ion-icon style={{fontSize: '20px', color: 'blue'}} name="chevron-forward-outline"></ion-icon> */}
							</th>
							<td className="px-6 py-4"></td>
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
