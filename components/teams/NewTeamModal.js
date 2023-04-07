/**
 * Last updated: 2023-03-23
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com> (resolved console errors/warnings)
 */
import { useState, useEffect } from 'react';
import DropdownInput from '../common/DropdownInput';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/router';
import {
	createTeam,
	uploadNewImageToS3,
	updatePlayerSoccer,
} from '@/utils/graphql.services';
import makeid from '@/utils/makeId';
import TeamsImage from './TeamsImage';
import { createCaptainOnTeam } from '@/utils/graphql.services';
const { v4: uuidv4 } = require('uuid');

const NewTeamModal = ({ isVisible, setIsVisible, players, getTeamsData }) => {
	const [user] = useUser();
	const [maxMembers, setMaxMembers] = useState(0);
	const [teamName, setTeamName] = useState('');
	const [teamCaptain, setTeamCaptain] = useState();
	const [homeColour, setHomeColour] = useState('Red');
	const [awayColour, setAwayColour] = useState('Blue');
	const [selectedOption, setSelectedOption] = useState('');
	const [teamLogoUpload, setTeamLogoUpload] = useState('');
	const [teamRoster, setTeamRoster] = useState([]);
	const router = useRouter();
	const [message, setMessage] = useState(null);

	useEffect(() => {
		setTeamCaptain(user);
	}, [user])

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	const addNewTeam = async () => {
		try {
			if (teamName === '') {
				setMessage({status: 'error', message: 'Please fillout all required fields'});
				return;
			}
			const randomId = uuidv4();
			let uniqueId = `${teamName}_${makeid(15)}`;
			await uploadNewImageToS3(uniqueId, teamLogoUpload);
			const teamData = {
				// id: randomId,
				name: teamName,
				founded: new Date(Date.now()),
				home_colour: homeColour,
				away_colour: awayColour,
				team_picture: uniqueId,
				captains: [teamCaptain.username],
				team_history: [{
					captains: [teamCaptain.username],
					teamid: randomId,
					division: '',
					roster: teamRoster,
					goals: 0,
					assists: 0,
					yellow_cards: 0,
					red_cards: 0,
					games_played: 0,
				}],
			};
			const resp = await createTeam(teamData); // Creates team
			await createCaptainOnTeam(teamCaptain.username, resp.data.createTeam.id); // Creates initial captain for team!

			if (resp) {
				setMessage({status: 'success', message: 'Team successfully created!'});
				getTeamsData();
				const timer = setTimeout(() => {
					// router.reload();
					router.push(`/teams/${resp.data.createTeam.id}`)
					// getTeamsData();
				}, 500);
				return () => clearTimeout(timer);
			}
		} catch (error) {
			console.error(error);
			setMessage({status: 'error', message: error.message});
		}
	};

	const resetData = () => {
		setMaxMembers(0);
		setTeamName('');
		// setTeamCaptain('');
		setHomeColour('');
		setAwayColour('');
		setSelectedOption('');
		setTeamLogoUpload('');
		setTeamRoster([]);
	};

	if (!isVisible) return;
	return (
		<>
			<div
				id="defaultModal"
				tabIndex="-1"
				aria-hidden="true"
				className="fixed top-0 bottom-0 left-0 right-0 z-[2000] p-4 max-w-[42rem] mx-auto w-full h-[35rem] sm:overflow-visible overflow-y-hidden my-auto"
			>
				<div className="relative w-full h-full">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white rounded-lg shadow dark:bg-gray-700 ">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
							<h3 className="text-md font-semibold text-gray-900 dark:text-white">
								Create A Team
							</h3>
							<button
								onClick={() => {
									resetData();
									setIsVisible(false);
								}}
								type="button"
								className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="defaultModal"
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
						</div>

						{/* <!-- Modal body --> */}
						<TeamsImage teamLogoUpload={teamLogoUpload} setTeamLogoUpload={setTeamLogoUpload} />
						{/* <UserProfilePictureEdit
							profilePic={profilePic}
							setProfilePic={setProfilePic}
						/> */}

						<div className="p-5 grid grid-cols-1 sm:grid-cols-2 items-center gap-[1.1rem]">
							<div className="w-full ">
								<label
									htmlFor="firstName"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Team Name
								</label>
								<input
									value={teamName}
									onChange={(e) => setTeamName(e.target.value)}
									type="text"
									id="firstName"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							<div className="w-full">
								<label
									htmlFor="lastName"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Captain
								</label>
								<input disabled
									value={teamCaptain && (teamCaptain.attributes.name + " " + teamCaptain.attributes.family_name)}
									onChange={(e) => setTeamCaptain(e.target.value)}
									type="text"
									id="lastName"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							<div className="w-full">
								<label
									htmlFor="birthdate"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Sport
								</label>
								<DropdownInput options={['Soccer']} />
							</div>

							<div className="w-full flex flex-row gap-2">
								<div className="w-1/2">
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Home colour
									</label>
									<DropdownInput
										options={[
											'Red',
											'Green',
											'Blue',
											'Yellow',
											'Black',
											'White',
										]}
										value={homeColour}
										setValue={setHomeColour}
									/>
								</div>
								<div className="w-1/2">
									<label
										htmlFor="email"
										className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Away colour
									</label>
									<DropdownInput
										options={[
											'Red',
											'Green',
											'Blue',
											'Yellow',
											'Black',
											'White',
										]}
										value={awayColour}
										setValue={setAwayColour}
									/>
								</div>
							</div>

							{/* <div className="w-full col-span-2">
								<label
									htmlFor="location"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Add Members
								</label>
								<PlayersTable
									data={teamRoster}
									selectPlayer={selectPlayer}
									setTeamRoster={setTeamRoster}
								/>
							</div> */}
						</div>

						{/* {message && (
							<p
								id="standard_error_help"
								className={`my-4 text-center text-sm ${
									message.status === 'success'
										? 'text-green-600 dark:text-green-400'
										: 'text-red-600 dark:text-red-400'
								}`}
							>
								<span className="font-medium">{message.message}</span>
							</p>
						)} */}

						{message && (<p id="standard_error_help" className={`my-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}

						{/* <!-- Modal footer --> */}
						<div className="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={() => {
									setIsVisible(false);
									resetData();
								}}
								data-modal-hide="defaultModal"
								type="button"
								className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							>
								Cancel
							</button>
							<button
								onClick={(e) => {
									addNewTeam();
								}}
								data-modal-hide="defaultModal"
								type="button"
								className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => setIsVisible(false)}
				className="z-[125] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
};

export default NewTeamModal;
