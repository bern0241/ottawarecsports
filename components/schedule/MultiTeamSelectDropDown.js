/**
 * Last updated: 2023-04-12
 *
 * Author(s):
 * Greg Coghill (cogh0020@algonquinlive.com)
 * Son Tran <tran0460@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function MultiTeamSelectDropDown({
	teams,
	selectedTeams,
	setSelectedTeams,
}) {
	//Functions
	//Get a list of teams in the current division (which should be passed)
	//Populate list with teams

	const router = useRouter();
	const [showTeams, setShowTeams] = useState(false);
	// const [selectedTeams, setSelectedTeams] = useState([]);
	const divisionID = router.query.id;
	return (
		<>
			<button
				id="dropdownCheckboxButton"
				onClick={() => setShowTeams(!showTeams)}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
				Dropdown checkbox{' '}
				<svg
					className="w-4 h-4 ml-2"
					aria-hidden="true"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</button>

			{/* <!-- Dropdown menu --> */}
			{showTeams && (
				<>
					<div
						id="dropdownDefaultCheckbox"
						className="z-10 w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
					>
						<ul
							className="p-3 space-y-3 p-3 border-2 text-sm overflow-scroll absolute z-20 bg-white max-h-96 text-gray-700 dark:text-gray-200"
							aria-labelledby="dropdownCheckboxButton"
						>
							{/* Map through team an generate list items  */}
							{teams &&
								teams.map((team, index) => (
									<React.Fragment key={index}>
										<li key={index} className="mt-2">
											<div className="flex items-center">
												<input
													checked={selectedTeams.find(
														(e) => e.name == team.name
													)}
													onChange={(e) => {
														if (e.target.checked == true) {
															//Toggle
															//Add team object to array
															console.log(team);
															let arr = selectedTeams;
															arr.push(team);
															// console.log(selectedTeams);
															setSelectedTeams(arr);
														} else {
															//Untoggle
															//Remove object from array
															let index = selectedTeams.indexOf(
																(e) => e.id === team.id
															);
															let arr = selectedTeams;
															arr.splice(index, 1);
															setSelectedTeams(arr);
														}
													}}
													id="checkbox-item-2"
													type="checkbox"
													value=""
													className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
												/>
												<label
													htmlFor="checkbox-item-2"
													className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
												>
													{team.name}
												</label>
											</div>
										</li>
									</React.Fragment>
								))}
						</ul>
					</div>
				</>
			)}
		</>
	);
}
