/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { IconCirclePlus } from '@tabler/icons-react';
import TeamRow from '@/components/teams/TeamRow';
import SearchBarInput from '@/components/common/SearchBarInput';
import {
	getAllTeams,
	createTeam,
	getAllPlayers,
} from '@/utils/graphql.services';
import NewTeamModal from '@/components/teams/NewTeamModal';
import CurrentTeamView from '@/components/teams/CurrentTeamView';

export default function Teams() {
	const [teams, setTeams] = useState([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [currentTeam, setCurrentTeam] = useState(null);
	const [players, setPlayers] = useState([]);

	const getPlayersData = async () => {
		const response = await getAllPlayers();
		setPlayers(response);
	};
	const getTeamsData = async () => {
		const response = await getAllTeams();
		setTeams(response);
	};
	useEffect(() => {
		getTeamsData();
		getPlayersData();
	}, []);
	/**
	 * Filter teams by name using the search input value.
	 * @param {[Object]} ev Click event
	 */
	function handleSearch(ev) {
		ev.preventDefault();
		let searchValue = document
			.getElementById('team-search')
			.value.toLowerCase();

		let filteredTeams = teams.filter((team) => {
			// Reference: Stack Overflow/zb22 <https://stackoverflow.com/questions/66089303/how-to-filter-full-name-string-properly-in-javascript>
			const arr = searchValue.split(' ');
			return arr.some((el) => team.name.toLowerCase().includes(el));
		});

		setTeams(filteredTeams);
	}

	const addNewTeam = async () => {
		const resp = await createTeam({
			name: 'test team',
			founded: Date.now(),
			home_colour: 'Red',
			away_colour: 'Green',
			team_history: [],
			team_picture: '',
		});
		console.log(resp);
	};
	if (currentTeam)
		return (
			<CurrentTeamView teamData={currentTeam} setCurrentTeam={setCurrentTeam} />
		);

	return (
		<>
			<main className="w-full flex flex-col gap-6 p-8">
				<NewTeamModal
					isVisible={modalVisible}
					setIsVisible={setModalVisible}
					players={players}
				/>
				{/* Search Bar */}
				<SearchBarInput
					id={'team-search'}
					placeholder={'Search'}
					searchFunction={handleSearch}
				/>
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h1 className="text-xl self-center">Teams</h1>
						<Button
							pill={true}
							className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
							onClick={() => setModalVisible(true)}
						>
							<IconCirclePlus className="mr-2 h-5 w-5" />
							Add A Team
						</Button>
					</div>

					<table className="table-auto">
						<thead className="bg-brand-neutral-100">
							<tr className="text-left">
								<th className="py-3 px-5 text-sm font-light w-4/12">Name</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">Captain</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">Sports</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">
									Team Members
								</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">Notes</th>
								{/* <th className="py-3 px-5 text-sm font-light">Action</th> */}
							</tr>
						</thead>
						<tbody>
							{teams.map((team, index) => (
								<TeamRow
									key={team.id}
									team={team}
									setCurrentTeam={setCurrentTeam}
								/>
							))}

							<tr>
								<td
									colSpan={6}
									className="pt-8 pb-4 text-center text-sm text-brand-neutral-800"
								>
									End
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
}
