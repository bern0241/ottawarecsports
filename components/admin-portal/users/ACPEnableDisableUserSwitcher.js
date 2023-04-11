/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES:
// https://flowbite.com/docs/components/buttons/
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminDisableUser.html
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminEnableUser.html

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';

export default function ACPDEnableDisableUserSwitcher({ user }) {
	// Retrieve name of user to display in modal
	const [fullName, setFullName] = useState(
		`${user.Attributes.find((o) => o.Name === 'name')['Value']} ${
			user.Attributes.find((o) => o.Name === 'family_name')['Value']
		}`
	);
	// Restart page after user gets deleted
	const router = useRouter();
	const [openModal, setOpenModal] = useState(false);
	const [toggleSwitcher, setToggleSwitcher] = useState(user.Enabled);
	// Variable used for deleting Cognito User
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	const enableUserFunc = () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t',
			Username: user.Username,
		};
		cognitoidentityserviceprovider.adminEnableUser(
			params,
			function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else {
					setToggleSwitcher(true);
					setOpenModal(false);
				}
			}
		);
	};
	const disableUserFunc = () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t',
			Username: user.Username,
		};
		cognitoidentityserviceprovider.adminDisableUser(
			params,
			function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else {
					setToggleSwitcher(false);
					setOpenModal(false);
				}
			}
		);
	};

	return (
		<>
			<label class="relative inline-flex items-center cursor-pointer">
				<input
					onClick={(e) => {
						e.stopPropagation();
						setOpenModal(!openModal);
					}}
					type="checkbox"
					value={toggleSwitcher}
					checked={toggleSwitcher}
					class="sr-only peer"
				/>
				<div class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-[.1rem] peer-focus:ring-blue-400 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-700"></div>
				<span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
			</label>

			{openModal && toggleSwitcher && (
				<>
					<div
						tabIndex="-1"
						class="z-[150] fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 overflow-x-hidden overflow-y-auto "
					>
						<div class="relative w-full h-full max-w-md md:h-auto">
							<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
								<button
									onClick={(e) => setOpenModal(false)}
									type="button"
									class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
									data-modal-hide="popup-modal"
								>
									<svg
										aria-hidden="true"
										class="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										></path>
									</svg>
									<span class="sr-only">Close modal</span>
								</button>
								<div class="p-6 pr-[3.6rem] text-center min-w-[30rem]">
									<svg
										aria-hidden="true"
										class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										></path>
									</svg>
									<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
										Are you sure you want to <b>DISABLE</b> user <br />
										<b>{fullName}</b>?
									</h3>
									<button
										onClick={() => disableUserFunc()}
										data-modal-hide="popup-modal"
										type="button"
										class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
									>
										Yes, I'm sure
									</button>
									<button
										onClick={() => setOpenModal(false)}
										data-modal-hide="popup-modal"
										type="button"
										class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
									>
										No, cancel
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						onClick={(e) => setOpenModal(false)}
						class="z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
					/>
				</>
			)}

			{openModal && !toggleSwitcher && (
				<>
					<div
						tabIndex="-1"
						class="z-[150] fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-4 overflow-x-hidden overflow-y-auto "
					>
						<div class="relative w-full h-full max-w-md md:h-auto">
							<div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
								<button
									onClick={(e) => setOpenModal(false)}
									type="button"
									class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
									data-modal-hide="popup-modal"
								>
									<svg
										aria-hidden="true"
										class="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clip-rule="evenodd"
										></path>
									</svg>
									<span class="sr-only">Close modal</span>
								</button>
								<div class="p-6 pr-[3.6rem] text-center min-w-[30rem]">
									<svg
										aria-hidden="true"
										class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										></path>
									</svg>
									<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
										Are you sure you want to <b>ENABLE</b> user <br />
										<b>{fullName}</b>?
									</h3>
									<button
										onClick={() => enableUserFunc()}
										data-modal-hide="popup-modal"
										type="button"
										class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
									>
										Yes, I'm sure
									</button>
									<button
										onClick={() => setOpenModal(false)}
										data-modal-hide="popup-modal"
										type="button"
										class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
									>
										No, cancel
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						onClick={(e) => setOpenModal(false)}
						class="z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
					/>
				</>
			)}
		</>
	);
}
