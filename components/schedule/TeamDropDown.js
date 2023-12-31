/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Greg Coghill (cogh0020@algonquinlive.com)
 * Justin Bernard <bern0241@algonquinlive.com>
 * Son Tran <tran0460@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import TeamCard from './TeamCard';
import { listTeamDivisionsShort } from '@/src/graphql/custom-queries';

export default function TeamDropDown({ state, setState, setOpenDropDown }) {
	const [search, setSearch] = useState('');
	const [teams, setTeams] = useState([]);

	const router = useRouter();
	const divisionID = router.query.id;
	useEffect(() => {
		if (!divisionID) return;
		const callMeAsync = async () => {
			await fetchTeamsDivisions();
		};
		callMeAsync();
	}, [divisionID]);

	const fetchTeamsDivisions = async () => {
		const variables = {
			filter: {
				divisionId: {
					eq: divisionID,
				},
			},
		};
		const teamDivisions = await API.graphql({
			query: listTeamDivisionsShort,
			variables: variables,
		});
		setTeams(
			teamDivisions.data.listTeamDivisions.items.map((team) => team.team)
		);
	};

	const setTeamFunc = (e, team) => {
		e.preventDefault();
		setState(team);
		setOpenDropDown(false);
	};

	return (
		<>
			{/* <!-- Dropdown menu --> */}
			<div
				id="dropdownSearch"
				className="z-[300] border border-gray-500 absolute bg-white rounded-lg shadow-md w-[18rem] dark:bg-gray-700"
			>
				<div className="p-3">
					<label htmlFor="input-group-search" className="sr-only">
						Search
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 flex items-center pointer-events-none w-full"></div>
						<input
							value={search}
							onChange={(e) => {
								e.stopPropagation();
								setSearch(e.target.value);
							}}
							type="text"
							id="input-group-search"
							className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search team"
						/>
					</div>
				</div>
				<ul
					className="h-[16rem] py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
					aria-labelledby="dropdownUsersButton"
				>
					{teams &&
						teams
							.filter((team) => {
								const searchItem = search.toLocaleLowerCase();
								const v = `${team.name.toLocaleLowerCase()}`;
								if (!searchItem) return true;
								return v.startsWith(searchItem);
							})
							.map((team, index) => (
								<React.Fragment key={index}>
									<button
										onClick={(e) => setTeamFunc(e, team)}
										className="cursor-pointer w-full"
									>
										<TeamCard search={search} team={team} />
									</button>
								</React.Fragment>
							))}
					{teams.length === 0 && (
						<div>
							<p className="p-5 py-0 text-sm">
								There are currently no teams for this division.
							</p>
						</div>
					)}
				</ul>
				<a
					href={`/sports/${divisionID}`}
					className="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline"
				>
					<svg
						className="w-5 h-5 mr-1"
						aria-hidden="true"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
					</svg>
					Add new teams to division
				</a>
			</div>
			<div
				onClick={(e) => setOpenDropDown(false)}
				className="z-[200] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
