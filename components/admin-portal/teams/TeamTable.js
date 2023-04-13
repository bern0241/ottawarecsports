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
			<div className="relative overflow-x-auto mx-auto px-4 w-full my-[1.3rem]">
				<table className="w-full text-sm text-left border border-gray-400 border-collapse">
					<thead className="text-md text-black bg-white">
						<tr>
							<th scope="col" className="text-lg font-medium px-6 py-7">
								<p className="absolute top-4">All Teams</p>
							</th>
							<th scope="col" className="font-medium px-6 py-4"></th>
							<th scope="col" className="font-medium px-6 py-4"></th>
							<th scope="col" className="font-medium">
								<div className="absolute top-2 right-1 pr-5 ">
									<CreateButton
										label="Create Team"
										state={createTeamModal}
										setState={setCreateTeamModal}
									/>
					</div>
          <table className="table-auto">
						<thead className="bg-brand-neutral-100">
							<tr className="text-left">
								<th className="py-3 px-1 px-5 text-sm font-light sm:w-4/12">Name</th>
								<th className="text-center py-3 px-10 text-sm font-light sm:w-2/12">Captain (s)</th>
								<th className="py-3 px-5 text-sm font-light sm:w-2/12 text-center">Sport</th>
                <th className="py-3 pr-2 text-center text-sm font-light w-2/12 ">
                  <div className="hidden sm:contents">Action</div>
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
			{createTeamModal && (
				<NewTeamModal
					isVisible={createTeamModal}
					setIsVisible={setCreateTeamModal}
				/>
			)}
		</>
	);
}