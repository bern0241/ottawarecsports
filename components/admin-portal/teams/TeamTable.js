/**
 * Last updated: 2023-04-04
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES:
// https://flowbite.com/docs/components/modal/
// https://flowbite.com/docs/components/tables/

import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import CreateButton from '@/components/common/CreateButton';
import NewTeamModal from './NewTeamModal';

export default function TeamTable({ filterTeams, fetchTeams }) {
	const [createTeamModal, setCreateTeamModal] = useState(false);

	// Displays table, team cards, and create team button
	return (
		<>
			<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
          <div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300 pr-2">
						<h1 className="text-xl self-center">Teams</h1>
            <CreateButton
										label="Create Team"
										state={createTeamModal}
										setState={setCreateTeamModal}
									/>
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
							<th scope="col" className="text-center font-light px-6 py-2">
								Captain (s)
							</th>
							<th scope="col" className="text-center font-light px-6 py-2">
								Sport
							</th>
							<th
								scope="col"
								className="font-light py-2 border-r-[1px] text-center border-gray-400"
							>
								Action
							</th>
						</tr>
					</thead>
					<tbody>
						{filterTeams &&
							filterTeams.map((team, index) => (
								<React.Fragment key={index}>
									<TeamCard
										team={team}
										fetchTeams={fetchTeams}
										filterTeams={filterTeams}
									/>
								</React.Fragment>
							))}

						<tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
							{/* <th
								scope="row"
								className="px-6 py-4 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer"
							>
								<ion-icon
									style={{ fontSize: '20px', color: 'blue' }}
									name="chevron-forward-outline"
								></ion-icon>
							</th> */}
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
			{createTeamModal && (
				<NewTeamModal
					isVisible={createTeamModal}
					setIsVisible={setCreateTeamModal}
				/>
			)}
		</>
	);
}