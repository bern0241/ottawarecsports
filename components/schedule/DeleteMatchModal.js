/**
 * Last updated: 2023-04-05
 *
 * Author(s):
 * Greg Coghill (cogh0020@algonquinlive.com)
 */

import React from 'react';
import { API } from 'aws-amplify';
// import { deleteGame } from '@/src/graphql/mutations';
import { deleteGameShort } from '@/src/graphql/custom-queries';
import { useRouter } from 'next/router';

export default function DeleteMatchModal({ match, openModal, setOpenModal, matches, setMatches }) {
	const router = useRouter();

	const deleteMatchFunc = async () => {
		try {
			const deletedGame = await API.graphql({
				query: deleteGameShort,
				variables: {
					input: { id: match.id },
				},
			});
			const array = matches.filter(
				(item) => item.id !== match.id
			);
			setMatches(array);
			setOpenModal(false);
			// router.reload();
		} catch (error) {
			console.error(error);
		}
	};
	if (!openModal) {
		return;
	}

	return (
		<>
			<div
				tabIndex="-1"
				className="z-[400] fixed left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] my-auto  overflow-x-hidden overflow-y-auto "
			>
				<div className="relative w-full h-full max-w-md md:h-auto">
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
						<button
							onClick={(e) => setOpenModal(false)}
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
						<div className="p-6 pr-[3.6rem] text-center min-w-[30rem]">
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
							<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
								Are you sure you want to delete this match?
							</h3>
							<button
								onClick={() => deleteMatchFunc()}
								data-modal-hide="popup-modal"
								type="button"
								className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
							>
								Yes, I'm sure
							</button>
							<button
								onClick={() => setOpenModal(false)}
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
			<div
				onClick={(e) => setOpenModal(false)}
				className="z-[320] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
