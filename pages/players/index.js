import React from 'react';
import NavbarMenu from '@/components/NavBar';
import SearchInput from '@/components/players/SearchInput';

function Players() {
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
