/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import SearchBarInput from '@/components/common/SearchBarInput';
import PlayerRow from '@/components/players/PlayerRow';
import AWS from 'aws-sdk';
import { getAllPlayers } from '@/utils/graphql.services';

export default function Players() {
	const [players, setPlayers] = useState([]);
	const [filteredPlayers, filterPlayers] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	// Fetch users in AWS Cognito user pool:
	// var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		const data = await getAllPlayers();
		setPlayers(data);
		filterPlayers(data);
	};

	/**
	 * Filter users by first and last name using the search input value.
	 * @param {[Object]} ev Click event
	 */
	function handleSearch(ev) {
		ev.preventDefault();
		// let searchValue = document
		setSearchValue(document
			.getElementById('player-search')
			.value.toLowerCase());

		let filteredPlayers = players.filter((player) => {
			// const user = player.Attributes.find((o) => o.Name === 'name')[
			// 	'Value'
			// ];
			// const lastName = player.Attributes.find((o) => o.Name === 'family_name')[
			// 	'Value'
			// ];

			// Reference: Stack Overflow/zb22 <https://stackoverflow.com/questions/66089303/how-to-filter-full-name-string-properly-in-javascript>
			// const arr = searchValue;
			// return arr.some(
			// 	(el) =>
			// 	player.user.toLowerCase().includes(el)
			// 		// lastName.toLowerCase().includes(el)
			// );
		});

		filterPlayers(filteredPlayers);
	}

	return (
		<>
			{/* Content */}
			<main className="w-full h-screen flex flex-col gap-6 p-8">
				{/* Search Bar */}
				<SearchBarInput
					id={'player-search'}
					placeholder={'Search'}
					searchFunction={handleSearch}
				/>
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h1 className="text-lg self-center">All Players</h1>
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
							</tr>
						</thead>
						<tbody>
							{players && players.filter((player) => {
								const searchItem = searchValue.toLocaleLowerCase();
								const v = `${player.user.toLocaleLowerCase()}`
								if(!searchItem) return true;
								return v.startsWith(searchItem);
							}).map((player, index) => (
								<PlayerRow
									key={player.id}
									player={player}
									index={index}
								/>
							))
							}

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
