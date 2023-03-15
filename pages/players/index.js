import React, { useEffect, useState } from 'react';
import NavbarMenu from '@/components/NavBar';
import SearchInput from '@/components/players/SearchInput';
import { IconCirclePlus } from '@tabler/icons-react';

function Players() {
	const playersList = [
		{
			id: 1,
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

	function handleSearch(ev) {
		ev.preventDefault();
		let search = document.getElementById('player-search').value;
		console.log(search);
	}

	return (
		<>
			<div className="flex">
				<NavbarMenu />

				{/* Content */}
				<main className="w-full p-8 flex flex-col gap-6">
					{/* Search Bar */}
					<SearchInput
						id={'player-search'}
						placeholder={'Search for a player...'}
						searchFunction={handleSearch}
					/>
					{/* Results */}
					<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
						<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
							<h1 className="text-xl self-center">Players</h1>
							<button className="flex items-center justify-between py-2 px-6 text-white font-medium text-sm rounded-3xl bg-blue-900 hover:bg-blue-800">
								<IconCirclePlus className="mr-2 h-5 w-5" />
								Add a Player
							</button>
						</div>

						<table className="mb-32 table-auto">
							<thead className="bg-brand-neutral-100">
								<tr className="text-left">
									<th className="py-3 px-5 text-sm font-light w-4/12">Name</th>
									<th className="py-3 px-5 text-sm font-light w-2/12">
										Location
									</th>
									<th className="py-3 px-5 text-sm font-light w-2/12">
										Sports
									</th>
									<th className="py-3 px-5 text-sm font-light w-2/12">Teams</th>
									<th className="py-3 px-5 text-sm font-light w-2/12">Role</th>
									<th className="py-3 px-5 text-sm font-light">Action</th>
								</tr>
							</thead>
							<tbody>
								{players.map((player, index) => (
									<tr key={index}>{player.firstName}</tr>
								))}
							</tbody>
						</table>
					</div>
				</main>
			</div>
		</>
	);
}

export default Players;
