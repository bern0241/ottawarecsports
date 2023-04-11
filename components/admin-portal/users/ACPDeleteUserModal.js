/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';
// Need S3 for deleting profile image when user gets deleted
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function ACPDeleteUserModal({ user, openModal, setOpenModal }) {
	// Retrieve name of user to display in modal
	const [fullName, setFullName] = useState(
		`${user.Attributes.find((o) => o.Name === 'name')['Value']} ${
			user.Attributes.find((o) => o.Name === 'family_name')['Value']
		}`
	);
	// Restart page after user gets deleted
	const router = useRouter();
	// Variable used for deleting Cognito User
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev'; // For deleting image in S3 Bucket when user gets deleted

	const deleteUserFunc = () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t',
			Username: user.Username,
		};
		cognitoidentityserviceprovider.adminDeleteUser(
			params,
			async function (err, data) {
				if (err) {
					console.log(err, err.stack);
				} else {
					setOpenModal(false);
					await deleteProfilePic();
					router.reload();
				}
			}
		);
	};

	const deletePlayersOfUser = () => {

	}

	const coordinatorsOfUser = () => {
		
	}

	const deleteProfilePic = async () => {
		const pictureAttribute = user.Attributes.find((o) => o.Name === 'picture')[
			'Value'
		];
		if (pictureAttribute === 'none') return;
		const params = {
			Bucket: bucketName,
			Key: pictureAttribute,
		};
		// Delete the image from the S3 bucket
		s3.deleteObject(params, function (err, data) {
			if (err) {
				console.log('Error deleting image: ', err);
			} else {
				// console.log('Image deleted successfully.');
			}
		});
	};

	return (
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
								Are you sure you want to delete user <b>{fullName}</b>?
							</h3>
							<button
								onClick={() => deleteUserFunc()}
								data-modal-hide="popup-modal"
								type="button"
								class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
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
	);
}
