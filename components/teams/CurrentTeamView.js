import { useState } from 'react';
import { Button } from 'flowbite-react';
import { IconCirclePlus } from '@tabler/icons-react';
import UserProfilePicture from '../admin-portal/ACPNewUserModal/UserProfilePicture';
import DropdownInput from '../common/DropdownInput';
import CustomRadioButton from './CustomRadioButton';
import MaxMembersStepper from './MaxMembersStepper';
import TeamsTable from './TeamsTable';

const CurrentTeamView = ({ teamData, setCurrentTeam }) => {
	const [maxMembers, setMaxMembers] = useState(0);
	const [teamName, setTeamName] = useState('');
	const [teamCaptain, setTeamCaptain] = useState('');
	const [teamColour, setTeamColour] = useState('');
	const [selectedOption, setSelectedOption] = useState('');
	const [profilePic, setProfilePic] = useState('');
	return (
		<>
			<main className="w-full flex flex-col gap-6 p-8">
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h1 className="text-xl self-center">{teamData.name}</h1>
						<Button
							pill={true}
							className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
							onClick={() => setCurrentTeam(null)}
						>
							<IconCirclePlus className="mr-2 h-5 w-5" />
							Back To Teams
						</Button>
					</div>
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
							<MaxMembersStepper state={maxMembers} setState={setMaxMembers} />
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
							<TeamsTable />
							{/* <LocationDropDown state={location} setState={setLocation} /> */}
						</div>
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
			</main>
		</>
	);
};

export default CurrentTeamView;
