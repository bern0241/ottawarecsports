/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';
import makeid from '@/utils/makeId';
import { useUser } from '@/context/userContext';
// Components (Coming from 'components/signup' folder)
import DobDatePicker from '../ACPNewUserModal/DatePicker';
import GenderDropDown from '../ACPNewUserModal/GenderDropDown';
import LocationDropDown from '../ACPNewUserModal/LocationDropDown';
import UserGroupsDropDown from '../ACPNewUserModal/UserGroupsDropDown';
import UserProfilePictureEdit from './UserProfilePictureEdit';
// import UserProfilePicture from '../ACPNewUserModal/UserProfilePicture';
import TempPasswordField from '../ACPNewUserModal/TempPasswordField';
import ChangePasswordModal from './ChangePasswordModal';
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function ACPEditUserModal({
	user,
	setOpenModal,
	setSuccessMessage,
}) {
	// New User Variables
	// const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [uiState, setUiState] = useState('main');
	const [newPassword, setNewPassword] = useState('');

	const [profilePic, setProfilePic] = useState(null);
	const [profilePicId, setProfilePicId] = useState('none');

	const [firstName, setFirstName] = useState(
		user.Attributes.find((o) => o.Name === 'name')['Value']
	);
	const [lastName, setLastName] = useState(
		user.Attributes.find((o) => o.Name === 'family_name')['Value']
	);
	// const [birthDate, setBirthDate] = useState(new Date().toISOString().split('T')[0]);
	const [birthDate, setBirthDate] = useState(
		user.Attributes.find((o) => o.Name === 'birthdate')['Value'].replaceAll(
			'-',
			'/'
		)
	);
	const [gender, setGender] = useState(
		user.Attributes.find((o) => o.Name === 'gender')['Value']
	);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState(
		user.Attributes.find((o) => o.Name === 'email')['Value']
	);
	const [location, setLocation] = useState(
		user.Attributes.find((o) => o.Name === 'custom:location')['Value']
	);

	const [userGroups, setUserGroups] = useState([]);
	const router = useRouter();
	const [message, setMessage] = useState(null);

	const [openNewUserModal, setOpenNewUserModal] = useState(false);
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	/**
	 * Sets timer for message to disappear
	 */
	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	/**
	 * If UI State changes, nullify the 'message' state
	 */
	useEffect(() => {
		if (uiState) {
			setMessage(null);
			setNewPassword('');
		}
	}, [uiState]);

	useEffect(() => {
		if (user.Attributes.find((o) => o.Name === 'phone_number')) {
			setPhoneNumber(
				user.Attributes.find((o) => o.Name === 'phone_number')['Value']
			);
		}
		const getGroupsForUser = () => {
			var params = {
				Username: user.Username,
				UserPoolId: 'us-east-1_70GCK7G6t',
			};
			cognitoidentityserviceprovider.adminListGroupsForUser(
				params,
				function (err, data) {
					if (err) console.log(err, err.stack); // an error occurred
					else {
						// successful response
						let result = data.Groups.map((a) => a.GroupName);
						result = result.filter((item) => item !== 'User');
						result.unshift('User');
						setUserGroups(result);
					}
				}
			);
		};
		getGroupsForUser();
	}, []);

	/**
	 *
	 * @returns New user created!
	 */
	const editUser = async () => {
		console.log('Pic', user.Username);
		// return;
		if (
			firstName === '' ||
			lastName === '' ||
			birthDate === '' ||
			email === '' ||
			location === ''
		) {
			setMessage({
				status: 'error',
				message: 'Please fillout required fields.',
			});
			return;
		}
		try {
			let uniqueId = makeid(15); //Meant for making random imageURI
			let profile_pic_id;

			// If picture exists, use that one!
			if (
				user.Attributes.find((o) => o.Name === 'picture')['Value'] !== 'none'
			) {
				profile_pic_id = user.Attributes.find((o) => o.Name === 'picture')[
					'Value'
				];
			} else {
				//Else set picture to default 'none'
				profile_pic_id = 'none';
			}

			// If profile picture is NOT null, set the ID to it's newly generated id
			if (profilePic !== null) {
				profile_pic_id = 'user_' + uniqueId;
			}

			var params = {
				UserPoolId: 'us-east-1_70GCK7G6t',
				Username: user.Username,
				UserAttributes: [
					{
						Name: 'picture',
						Value: profile_pic_id,
					},
					{
						Name: 'name',
						Value: firstName,
					},
					{
						Name: 'family_name',
						Value: lastName,
					},
					{
						Name: 'email',
						Value: email,
					},
					{
						Name: 'email_verified',
						Value: 'true',
					},
					{
						Name: 'gender',
						Value: gender,
					},
					{
						Name: 'custom:location',
						Value: location,
					},
					{
						// Name: 'custom:birthdate',
						Name: 'birthdate',
						Value: birthDate.toString(),
					},
					{
						Name: 'phone_number',
						Value: phoneNumber,
					},
					// {
					//     Name: "phone_number_verified",
					//     Value: "true"
					// },
				],
				// DesiredDeliveryMediums: [
				//     SMS | EMAIL,
				// ]
			};
			cognitoidentityserviceprovider.adminUpdateUserAttributes(
				params,
				async function (err, data) {
					if (err) {
						console.log(err, err.stack);
						setMessage({ status: 'error', message: err.message });
					} else {

						setProfilePicId(profile_pic_id);
						// Works its way down - reloads page when finished
						await deleteUserGroups(user.Username);
						// await addUserToGroups(user.Username);
						// await deleteCurrentProfileImageS3();
						// await uploadNewProfileImageToS3(profile_pic_id);
						// setMessage({ status: 'success', message: 'User updated!' });
					}
				}
			);
		} catch (error) {
			setMessage({ status: 'error', message: error.message });
			console.error(error);
		}
	};

	const deleteUserGroups = async (username) => {
		try {
			const removeTheseGroups = [
				'User',
				'Captain',
				'Referee',
				'Coordinator',
				'Admin',
			];
			await removeTheseGroups.forEach((group) => {
				if (group !== 'User') {
					var params = {
						UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
						GroupName: group,
						Username: user.Username,
					};
					cognitoidentityserviceprovider.adminRemoveUserFromGroup(
						params,
						async function (err, data) {
							if (err) {
								console.log(err, err.stack);
							} else {
								await addUserToGroups(user.Username);
								console.log({ status: 'success remove from group', data: data });
							}
						}
					);
				}
			});
		} catch (error) {
			setMessage({status: 'error', message: error.message});
			console.error(error);
		}
	}
	
	const addUserToGroups = async (username) => {
		// console.log('Groups',userGroups);
		// return;
		try {
			await userGroups.forEach((group) => {
				if (group !== 'User') {
					var params = {
						UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
						GroupName: group,
						Username: username,
					};
					cognitoidentityserviceprovider.adminAddUserToGroup(
						params,
						function (err, data) {
							if (err) {
								console.log(err, err.stack);
							} else {
								deleteCurrentProfileImageS3();
								console.log({ status: 'success', data: data });
							}
						}
						);
					}
				});
				deleteCurrentProfileImageS3();
			} catch (error) {
				console.log('AAAA')
			setMessage({status: 'error', message: error.message});
			console.error(error);
		}
		
		// router.reload();
	};

	const deleteCurrentProfileImageS3 = async () => {
		const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';

		try {
			if (profilePic === null) {
				setMessage({ status: 'success', message: 'User updated!' });
				router.reload();
				return;
			}

			const params = {
				Bucket: bucketName,
				Key: user.Attributes.find((o) => o.Name === 'picture')['Value'],
			};
			s3.deleteObject(params, function (err, data) {
				if (err) {
					console.log('Error deleting object: ', err);
				} else {
					uploadNewProfileImageToS3();
					console.log('Object deleted successfully');
				}
			});
		} catch (error) {
			setMessage({ status: 'error', message: error });
			console.error(error);
		}
	};

	const uploadNewProfileImageToS3 = async (newProfilePicId) => {
		const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';
		const signedUrlExpireSeconds = 60 * 1;

		try {
			if (profilePic === null) {
				setMessage({ status: 'success', message: 'User updated!' });
				router.reload();
				return;
			}

			const params = {
				Bucket: bucketName,
				Key: profilePicId,
				Body: profilePic,
				ContentType: profilePic.type,
			};
			// Upload the image to S3
			s3.upload(params, (err, data) => {
				if (err) {
				} else {
					console.log('Image uploaded successfully!');
					setMessage({ status: 'success', message: 'User updated!' });
					router.reload();
				}
			});
		} catch (error) {
			console.error(error);
		}
	};


	// const confirmTempUserPassword = async (username) =>


	const setPassword = (e) => {
		e.preventDefault();
		if (newPassword === '') {
			setMessage({ status: 'error', message: 'Password must not be empty.' });
			return;
		}
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t',
			Username: user.Username,
			Password: newPassword,
			Permanent: true,
		};
		cognitoidentityserviceprovider.adminSetUserPassword(
			params,
			function (err, data) {
				if (err) {
					setMessage({ status: 'error', message: err.message });
					console.log(err, err.stack);
				} // an error occurred
				else {
					setMessage({
						status: 'success',
						message: 'Password set successfully.',
					});
					console.log(data);
				} // successful response
			}
		);
	};

	const resetPassword = (e) => {
		e.preventDefault();
		var params = {
			Username: user.Username,
			UserPoolId: 'us-east-1_70GCK7G6t',
		};
		cognitoidentityserviceprovider.adminResetUserPassword(
			params,
			function (err, data) {
				if (err) {
					setMessage({ status: 'error', message: err.message });
					console.log(err, err.stack);
				} // an error occurred
				else {
					setMessage({ status: 'success', message: 'Password reset.' });
					console.log(data);
				} // successful response
			}
		);
	};

	return (
		<>
			{uiState === 'main' && (
				<>
					{/* // <!-- Main modal --> */}
					<div
						id="defaultModal"
						tabindex="-1"
						aria-hidden="true"
						class="fixed top-0 bottom-0 left-0 right-0 z-[150] p-4 max-w-[42rem] mx-auto w-full h-[40rem] sm:overflow-visible overflow-auto"
					>
						<div class="relative w-full h-full">
							{/* <!-- Modal content --> */}
							<div class="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
								{/* <!-- Modal header --> */}
								<div class="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
									<h3 class="text-md font-semibold text-gray-900 dark:text-white">
										Edit A User
									</h3>
									<button
										onClick={() => setOpenModal(false)}
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
								{/* <button className='absolute left-0 right-0' onClick={(e) => console.log(user)}>On Click</button> */}
								<UserProfilePictureEdit
									user={user}
									profilePic={profilePic}
									setProfilePic={setProfilePic}
								/>

								<div class="p-5 grid grid-cols-1 sm:grid-cols-2 items-center gap-[1.1rem]">
									<div class="w-full ">
										<label
											for="firstName"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											First Name *
										</label>
										<input
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
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
											Last Name *
										</label>
										<input
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
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
											Birthdate *
										</label>
										<DobDatePicker state={birthDate} setState={setBirthDate} />
									</div>
									<div className="w-full">
										<label
											for="gender"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Gender *
										</label>
										<GenderDropDown state={gender} setState={setGender} />
									</div>

									<div class="w-full">
										<label
											for="email"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Email *
										</label>
										<input
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											type="email"
											id="email"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>
									</div>

									<div class="w-full text-right relative top-4">
										{/* <label for="tempPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password *</label> */}
										<ChangePasswordModal setUiState={setUiState} />
									</div>

									<div class="w-full">
										<label
											for="phoneNumber"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Phone Number
										</label>
										<input
											value={phoneNumber}
											onChange={(e) => setPhoneNumber(e.target.value)}
											type="text"
											id="phoneNumber"
											class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
										/>
									</div>

									<div class="w-full">
										<label
											for="location"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Location *
										</label>
										<LocationDropDown state={location} setState={setLocation} />
									</div>
								</div>

								<div class="px-5">
									<label
										for="email"
										class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
									>
										Auth Roles (+)
									</label>
									<UserGroupsDropDown
										userGroups={userGroups}
										setUserGroups={setUserGroups}
									/>
								</div>

								{message && (
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
								)}

								{/* <!-- Modal footer --> */}
								<div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
									<button
										onClick={() => setOpenModal(false)}
										data-modal-hide="defaultModal"
										type="button"
										class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
									>
										Cancel
									</button>
									<button
										onClick={(e) => editUser(e)}
										data-modal-hide="defaultModal"
										type="button"
										class="text-white bg-yellow-900 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-yellow-800 dark:hover:bg-yellow-900 dark:focus:ring-yellow-800"
									>
										Save
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

			{uiState === 'changePassword' && (
				<>
					<div
						id="defaultModal"
						tabindex="-1"
						aria-hidden="true"
						class="fixed top-[10rem] left-0 right-0 z-[30] p-4 max-w-[32rem] mx-auto w-full h-[18rem] sm:overflow-visible overflow-auto"
					>
						<div class="relative w-full h-full">
							{/* <!-- Modal content --> */}
							<div class="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
								{/* <!-- Modal header --> */}
								<div class="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
									<h3 class="text-md font-semibold text-gray-900 dark:text-white">
										Edit A User
									</h3>
									<button
										onClick={() => setUiState('main')}
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

								<div class="p-5 grid grid-cols-1 items-center gap-[1.1rem]">
									<div class="w-full">
										<label
											for="tempPassword"
											class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
										>
											Enter New Password
										</label>
										<TempPasswordField
											state={newPassword}
											setState={setNewPassword}
										/>
									</div>
								</div>

								{message && (
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
								)}

								{/* <!-- Modal footer --> */}
								<div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
									{/* <button onClick={() => setOpenModal(false)} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button> */}
									<button
										onClick={(e) => setPassword(e)}
										data-modal-hide="defaultModal"
										type="button"
										class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
									>
										Set Password
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			<div
				onClick={(e) => setOpenModal(false)}
				class="opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%] z-[125]"
			/>
		</>
	);
}
