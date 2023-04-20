import React, { useState, useEffect } from 'react';
import { getTeam } from '@/src/graphql/queries';
import { updatePlayer, updateTeam } from '@/src/graphql/mutations';
import { updateTeamShort, getTeamShort } from '@/src/graphql/custom-queries';
import { API } from 'aws-amplify';
import { useRouter } from 'next/router';

export default function ChangeRoleModal({
	setOpenModal,
	newRole,
	member,
	userName,
	setCurrentRole,
	fetchCaptains,
}) {
	const [captains, setCaptains] = useState([]);
	const [uiState, setUiState] = useState('change-role-state');
	const router = useRouter();
	const id = router.query.teamId;

	useEffect(() => {
		if (!id) return;
		const callMeAsync = async () => {
			await getTeamCaptains();
		};
		callMeAsync();
	}, [id]);

	const getTeamCaptains = async () => {
		try {
			const apiData = await API.graphql({
				query: getTeamShort,
				variables: { id: id },
			});
			const data = await apiData.data.getTeam;
			setCaptains(data.captains);
		} catch (error) {
			console.error(error);
		}
	};

	const acceptNewRole = async () => {
		try {
			const data = {
				id: member.id,
				role: newRole,
			};

			if (newRole === 'Player') {
				if (captains.length === 1) {
					setUiState('role-denied-state');
					return;
				} else {
					const playerUpdated = await API.graphql({
						query: updatePlayer,
						variables: { input: data },
					});
					let filterCaptains = await captains.filter(
						(captain) => captain !== playerUpdated.data.updatePlayer.user_id
					);
					setCurrentRole(newRole);
					setCaptains(filterCaptains);
					updateTeamFunc(filterCaptains);
					return;
				}
			}
			if (newRole === 'Captain') {
				const playerUpdated = await API.graphql({
					query: updatePlayer,
					variables: { input: data },
				});
				setCaptains(captains.push(playerUpdated.data.updatePlayer.user_id));
				setCurrentRole(newRole);
				updateTeamFunc(captains);
				return;
			}
		} catch (error) {
			console.log(error);
		}
	};

	const updateTeamFunc = async (newCaptains) => {
		try {
			const data = {
				id: id,
				captains: newCaptains,
			};
			const teamUpdated = await API.graphql({
				query: updateTeamShort,
				variables: { input: data },
			});
			setOpenModal(false);

			const timer = setTimeout(() => {
				fetchCaptains(newCaptains);
			}, 560);
			return () => clearTimeout(timer);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{uiState === 'change-role-state' && (
				<div
					tabIndex="-1"
					className="z-[200] w-[32rem] fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 p-4 overflow-x-hidden overflow-y-auto "
				>
					<div className="relative h-full md:h-auto">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<button
								onClick={(e) => {
									e.stopPropagation();
									setOpenModal(false);
								}}
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
							<div className="p-6 text-center">
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
									Are you sure you want to change{' '}
									<b>
										<br />
										{userName}
									</b>{' '}
									to <b>{newRole}</b>?
								</h3>
								<button
									autoFocus
									onClick={() => acceptNewRole()}
									data-modal-hide="popup-modal"
									type="button"
									className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
								>
									Yes, I'm sure
								</button>
								<button
									onClick={(e) => {
										e.stopPropagation();
										setOpenModal(false);
									}}
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
			)}

			{uiState === 'role-denied-state' && (
				<div
					tabIndex="-1"
					className="z-[200] w-[32rem] fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 p-4 overflow-x-hidden overflow-y-auto "
				>
					<div className="relative h-full md:h-auto">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<button
								onClick={(e) => {
									e.stopPropagation();
									setOpenModal(false);
								}}
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
							<div className="p-6 text-center">
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
									There must be at least <br />
									<b>1 Captain</b> per team!
								</h3>
								<button
									onClick={(e) => {
										e.stopPropagation();
										setOpenModal(false);
									}}
									data-modal-hide="popup-modal"
									type="button"
									className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
								>
									I understand
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			<div
				onClick={(e) => setOpenModal(false)}
				className="z-[150] opacity-50 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
