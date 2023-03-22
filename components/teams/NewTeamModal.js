/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */
import { useState } from 'react';
import DropdownInput from '../common/DropdownInput';
import CustomRadioButton from './CustomRadioButton';
import MaxMembersStepper from './MaxMembersStepper';
import PlayersTable from './PlayersTable';
import UserProfilePicture from '../admin-portal/ACPNewUserModal/UserProfilePicture';

const NewTeamModal = ({ isVisible, setIsVisible }) => {
	const [maxMembers, setMaxMembers] = useState(0);
	const [teamName, setTeamName] = useState('');
	const [teamCaptain, setTeamCaptain] = useState('');
	const [teamColour, setTeamColour] = useState('');
	const [selectedOption, setSelectedOption] = useState('');
	const [profilePic, setProfilePic] = useState('');
	if (!isVisible) return;
	return (
		<>
			<div
				id="defaultModal"
				tabindex="-1"
				aria-hidden="true"
				class="fixed top-0 bottom-0 left-0 right-0 z-[30] p-4 max-w-[42rem] mx-auto w-full h-[40rem] sm:overflow-visible overflow-auto"
			>
				<div class="relative w-full h-full">
					{/* <!-- Modal content --> */}
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
						{/* <!-- Modal header --> */}
						<div class="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
							<h3 class="text-md font-semibold text-gray-900 dark:text-white">
								Add A Team
							</h3>
							<button
								onClick={() => setIsVisible(false)}
								type="button"
								class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
								data-modal-hide="defaultModal"
							>
								<svg
									aria-hidden="true"
									class="w-5 h-5"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
										clip-rule="evenodd"
									></path>
								</svg>
								<span class="sr-only">Close modal</span>
							</button>
						</div>

						{/* <!-- Modal body --> */}
						<UserProfilePicture
							profilePic={profilePic}
							setProfilePic={setProfilePic}
						/>

						<div class="p-5 grid grid-cols-1 sm:grid-cols-2 items-center gap-[1.1rem]">
							<div class="w-full ">
								<label
									for="firstName"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Team Name
								</label>
								<input
									value={teamName}
									onChange={(e) => setTeamName(e.target.value)}
									type="text"
									id="firstName"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							<div class="w-full">
								<label
									for="lastName"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Captain
								</label>
								<input
									value={teamCaptain}
									onChange={(e) => setTeamCaptain(e.target.value)}
									type="text"
									id="lastName"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/>
							</div>

							<div className="w-full">
								<label
									for="birthdate"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Sport
								</label>
								<DropdownInput options={['Soccer']} />
							</div>
							<div className="w-full">
								<label
									for="gender"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Max members
								</label>
								<MaxMembersStepper
									state={maxMembers}
									setState={setMaxMembers}
								/>
							</div>

							<div class="w-full">
								<label
									for="email"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Team colours
								</label>
								<DropdownInput
									options={['Red', 'Green', 'Blue', 'Yellow', 'Black', 'White']}
									value={teamColour}
									setValue={setTeamColour}
								/>
							</div>

							<div class="w-full">
								<label
									for="phoneNumber"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Who can join
								</label>
								<div className="flex flex-row gap-10">
									<CustomRadioButton
										setSelected={setSelectedOption}
										selected={selectedOption}
										content={'Men'}
									/>
									<CustomRadioButton
										setSelected={setSelectedOption}
										selected={selectedOption}
										content={'Women'}
									/>
									<CustomRadioButton
										setSelected={setSelectedOption}
										selected={selectedOption}
										content={'Anyone'}
									/>
								</div>
							</div>

							<div class="w-full col-span-2">
								<label
									for="location"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Add Members
								</label>
								<PlayersTable />
							</div>
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

						{/* <!-- Modal footer --> */}
						<div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
							<button
								onClick={() => setIsVisible(false)}
								data-modal-hide="defaultModal"
								type="button"
								class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
							>
								Cancel
							</button>
							<button
								// onClick={(e) => createUser(e)}
								data-modal-hide="defaultModal"
								type="button"
								class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => setIsVisible(false)}
				class="z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
};

export default NewTeamModal;
