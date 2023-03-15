import React, { useEffect, useState } from 'react';
import NavbarMenu from '@/components/NavBar';
import SearchInput from '@/components/players/SearchInput';

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
				<main className="p-8">
					{/* Search Bar */}
					<SearchInput
						id={'player-search'}
						placeholder={'Search for a player...'}
						searchFunction={handleSearch}
					/>
					{/* Content */}
					This is some text.
				</main>
			</div>
		</>
	);
}

export default Players;
