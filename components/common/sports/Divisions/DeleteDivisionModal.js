/**
 * Last updated: 2023-04-04
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { deleteDivision } from '@/src/graphql/mutations';
import { listGames } from '@/src/graphql/queries';
import {
	listTeamDivisionsShort,
	deleteTeamDivisionShort,
	listGamesShort,
	deleteGameShort,
} from '@/src/graphql/custom-queries';
import { API } from '@aws-amplify/api';
import React, { useState, useEffect } from 'react';

export default function DeleteDivisionModal({
	seasonInfo,
	divisionInfo,
	setDeleteModal,
	listDivisionsFunc,
}) {
	// Deletes all teamDivisions corresponding with the deleted Division
	const deleteTeamDivisionsFunc = async () => {
		try {
			const variables = {
				filter: {
					divisionId: {
						eq: divisionInfo.id,
					},
				},
			};
			const teamDivisions = await API.graphql({
				query: listTeamDivisionsShort,
				variables: variables,
			});
			const deleteTheseTeamDivisions =
				teamDivisions.data.listTeamDivisions.items;
			if (deleteTheseTeamDivisions.length !== 0) {
				deleteTheseTeamDivisions.map(async (teamDivision) => {
					const deletedItem = await API.graphql({
						query: deleteTeamDivisionShort,
						// query: deleteTeamDivision,
						variables: {
							input: { id: teamDivision.id },
						},
					});
				});
			}
			deleteGamesFunc();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteGamesFunc = async () => {
		try {
			const variables = {
				filter: {
					division: {
						eq: divisionInfo.id,
					},
				},
			};
			const games = await API.graphql({
				query: listGamesShort,
				variables: variables,
			});
			const deleteTheseGames = games.data.listGames.items;
			if (deleteTheseGames.length !== 0) {
				deleteTheseGames.map(async (game) => {
					const deletedItem = await API.graphql({
						query: deleteGameShort,
						variables: {
							input: { id: game.id },
						},
					});
				});
			}
			deleteDivisionFunc();
		} catch (error) {
			console.log(error);
		}
	};

	const deleteDivisionFunc = async (e) => {
		try {
			const deletedDivision = await API.graphql({
				query: deleteDivision,
				variables: {
					input: { id: divisionInfo.id },
				},
			});
			setDeleteModal(false);
			// deleteTeamDivisionsFunc();
			listDivisionsFunc();
		} catch (error) {
			alert('Problem deleting Division');
			console.error(error);
		}
	};

	return (
		<>
			<div
				tabIndex="-1"
				className="fixed top-[50%] translate-y-[-50%] left-0 right-0 z-[2000] p-4 max-w-[42rem] overflow-y-visible mx-auto w-full sm:overflow-visible overflow-y-hidden my-auto"
			>
				<div className="relative w-full h-full max-w-md mx-auto w-[25rem]">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<button
							onClick={(e) => setDeleteModal(false)}
							type="button"
							className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
							data-modal-hide="popup-modal"
						>
							<svg
								aria-hidden="true"
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
							<span className="sr-only">Close modal</span>
						</button>
						<div className="flex flex-col justify-center items-center p-6">
							<svg
								aria-hidden="true"
								className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								></path>
							</svg>
							<h3 className="mb-5 text-lg font-normal text-center text-gray-500 dark:text-gray-400">
								Are you sure you want to delete <br />
								Division
								<b>
									<i> {divisionInfo.name}</i>
								</b>{' '}
								<br />
								from <b>{seasonInfo.name}?</b>
							</h3>
							<div className="flex">
								<button
									onClick={() => deleteTeamDivisionsFunc()}
									data-modal-hide="popup-modal"
									type="button"
									className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
								>
									Yes, I'm sure
								</button>
								<button
									autoFocus
									onClick={() => setDeleteModal(false)}
									data-modal-hide="popup-modal"
									type="button"
									className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
								>
									No, cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => setDeleteModal(false)}
				className="z-[150] bg-gray-500 opacity-50 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
