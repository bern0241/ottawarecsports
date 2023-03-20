/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import SearchBarInput from '@/components/common/SearchBarInput';
import PlayerRow from '@/components/players/PlayerRow';
import AWS from 'aws-sdk';

export default function Players() {
	const [players, setPlayers] = useState([]);

	// Fetch users in AWS Cognito user pool:
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		fetchUsers();
	}, []);

	const fetchUsers = async () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
		};
		cognitoidentityserviceprovider.listUsers(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				console.log(data.Users);
				setPlayers(data.Users);
			}
		});
	};

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
							{players.map((player, index) => (
								<PlayerRow
									key={player.Username}
									player={player}
									index={index}
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
