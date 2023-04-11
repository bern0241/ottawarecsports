import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { listTeams } from '@/src/graphql/queries';
import { API } from 'aws-amplify';
import { listTeamDivisions } from '@/src/graphql/queries';
import { listTeamDivisionsShort } from '@/src/graphql/custom-queries';

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

	// useEffect(() => {
	// 	if (!divisionID) return;
	// 	const callMeAsync = async () => {
	// 		await fetchTeamsDivisions();
	// 	};
	// 	callMeAsync();
	// }, [divisionID]);

	// const fetchTeamsDivisions = async () => {
	// 	const variables = {
	// 		filter: {
	// 			divisionId: {
	// 				eq: divisionID,
	// 			},
	// 		},
	// 	};
	// 	const teamDivisions = await API.graphql({
	// 		query: listTeamDivisionsShort,
	// 		variables: variables,
	// 	});
	// 	// console.log('My Teams from Divisions', teamDivisions.data.listTeamDivisions);
	// 	setTeams(
	// 		teamDivisions.data.listTeamDivisions.items.map((team) => team.team)
	// 	);
	// };
	// console.log(selectedTeams);
	return (
		<>
			<button
				id="dropdownCheckboxButton"
				onClick={() => setShowTeams(!showTeams)}
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
				Dropdown checkbox{' '}
				<svg
					class="w-4 h-4 ml-2"
					aria-hidden="true"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
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
							class="p-3 space-y-3 p-3 border-2 text-sm overflow-scroll absolute z-20 bg-white max-h-96 text-gray-700 dark:text-gray-200"
							aria-labelledby="dropdownCheckboxButton"
						>
							{/* Map through team an generate list items  */}
							{teams &&
								teams.map((team, index) => (
									<>
										<li className="mt-2">
											<div class="flex items-center">
												<input
													checked={selectedTeams.find(
														(e) => e.name == team.name
													)}
													onChange={(e) => {
														// console.log(e.target.checked);
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
													class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
												/>
												<label
													for="checkbox-item-2"
													class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
												>
													{team.name}
												</label>
											</div>
										</li>
									</>
								))}
						</ul>
					</div>
				</>
			)}
		</>
	);
}
