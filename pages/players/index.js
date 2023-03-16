/**
 * Last updated: 2023-03-15
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useState } from 'react';
import SearchInput from '@/components/players/SearchInput';
import { IconCirclePlus } from '@tabler/icons-react';
import PlayerRow from '@/components/players/PlayerRow';
import Layout from '@/components/common/Layout';

export default function Players() {
	const playersList = [
		{
			id: 1,
			avatar: 'https://api.lorem.space/image/face?w=60&h=60&hash=7F5AE56A',
			firstName: 'Patrick',
			lastName: 'King',
			age: 33,
			gender: 'Male',
			location: 'North Gatineau',
			teams: [
				{
					id: 'a',
					name: 'The Juggernauts',
					sport: 'Pick-up Sport',
					role: 'Captain',
				},
			],
		},
		{
			id: 2,
			avatar: 'https://api.lorem.space/image/face?w=60&h=60&hash=8B7BCDC2',
			firstName: 'Jessie',
			lastName: 'Summers',
			age: 30,
			gender: 'Female',
			location: 'Westboro',
			teams: [
				{
					id: 'b',
					name: 'Lady Spikers',
					sport: 'Volleyball',
					role: 'Player',
				},
			],
		},
		{
			id: 3,
			avatar: 'https://api.lorem.space/image/face?w=60&h=60&hash=500B67FB',
			firstName: 'Laura',
			lastName: 'Banks',
			age: 28,
			gender: 'Female',
			location: 'Kanata',
			teams: [
				{
					id: '123',
					name: 'Goody2Shoes',
					sport: 'Soccer',
					role: 'Player',
				},
				{
					id: '456',
					name: 'Lady Spikers',
					sport: 'Volleyball',
					role: 'Captain',
				},
				{
					id: '789',
					name: 'The Benchwarmers',
					sport: 'Soccer',
					role: 'Player',
				},
			],
		},
	];

	const [players, setPlayers] = useState(playersList);

	/**
	 * Filter users by first and last name using the search input value.
	 * @param {[Object]} ev Click event
	 */
	function handleSearch(ev) {
		ev.preventDefault();
		let searchValue = document
			.getElementById('player-search')
			.value.toLowerCase();

		let filteredPlayers = playersList.filter((player) => {
			// Reference: Stack Overflow/zb22 <https://stackoverflow.com/questions/66089303/how-to-filter-full-name-string-properly-in-javascript>
			const arr = searchValue.split(' ');
			return arr.some(
				(el) =>
					player.firstName.toLowerCase().includes(el) ||
					player.lastName.toLowerCase().includes(el)
			);
		});

		setPlayers(filteredPlayers);
	}

	return (
		<>
			{/* Content */}
			<main className="w-full flex flex-col gap-6 p-8">
				{/* Search Bar */}
				<SearchInput
					id={'player-search'}
					placeholder={'Search'}
					searchFunction={handleSearch}
				/>
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h1 className="text-lg self-center">All Players</h1>
						<button className="flex items-center justify-between py-2 px-6 text-white font-medium text-sm rounded-3xl bg-blue-900 hover:bg-blue-800">
							<IconCirclePlus className="mr-2 h-5 w-5" />
							Add a Player
						</button>
					</div>

					<table className="table-auto">
						<thead className="bg-brand-neutral-100">
							<tr className="text-left">
								<th className="py-3 px-5 text-sm font-light w-4/12">Name</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">
									Location
								</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">Sports</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">Teams</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">Role</th>
								<th className="py-3 px-5 text-sm font-light">Action</th>
							</tr>
						</thead>
						<tbody>
							{players.map((player, index) => (
								<PlayerRow key={player.id} player={player} index={index} />
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
