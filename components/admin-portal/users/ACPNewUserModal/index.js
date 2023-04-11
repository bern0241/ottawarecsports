/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES:
// https://flowbite.com/docs/components/modal/
// https://flowbite.com/docs/components/buttons/
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_Operations.html
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminSetUserPassword.html
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminAddUserToGroup.html
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminRemoveUserFromGroup.html
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminUpdateUserAttributes.html
// https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_AdminListGroupsForUser.html

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';
import makeid from '@/utils/makeId';
import { useUser } from '@/context/userContext';
// Components (Coming from 'components/signup' folder)
import DobDatePicker from './DatePicker';
import GenderDropDown from './GenderDropDown';
import LocationDropDown from './LocationDropDown';
import UserGroupsDropDown from './UserGroupsDropDown';
import UserProfilePicture from './UserProfilePicture';
import TempPasswordField from './TempPasswordField';
import { createPlayer } from '@/utils/graphql.services';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import ValidatePhoneNumber from 'validate-phone-number-node-js';
import { uploadNewImageToS3 } from '@/utils/graphql.services';
const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function ACPNewUserModal({ setOpenModal, setSuccessMessage }) {
	// New User Variables
	const [user, setUser, authRoles, setAuthRoles] = useUser();

	const [profilePic, setProfilePic] = useState(null);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthDate, setBirthDate] = useState(
		new Date().toISOString().split('T')[0].replaceAll('-', '/') // Converts today's date to ISO, and changes all '-' to '/' (for getting current date)
	);
	const [gender, setGender] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState('');
	const [tempPassword, setTempPassword] = useState('');
	const [location, setLocation] = useState('');

	const [userGroups, setUserGroups] = useState(['User']);
	const router = useRouter();
	const [message, setMessage] = useState(null);

	const [openNewUserModal, setOpenNewUserModal] = useState(false);
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	// After 5 seconds, hide display message
	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	/**
	 *
	 * @returns New user created!
	 */
	const createUser = async () => {
		try {
			if (
				firstName === '' ||
				lastName === '' ||
				birthDate === '' ||
				tempPassword === '' ||
				email === '' ||
				location === ''
			) {
				setMessage({
					status: 'error',
					message: 'Please fillout required fields.',
				});
				return;
			}
			if (phoneNumber !== undefined && phoneNumber !== '') {
				if (!ValidatePhoneNumber.validate(phoneNumber)) {
					setMessage({status: 'error', message: 'Please use a valid phone number.'})
					return;
				}
			}
			let uniqueId = makeid(15); //Meant for making random imageURI
			let profile_pic_id = 'none';

			// If profile picture is NOT null, set the ID to it's newly generated id
			if (profilePic !== null) {
				profile_pic_id = 'user_' + uniqueId;
			}

			var params = {
				UserPoolId: 'us-east-1_70GCK7G6t',
				Username: email,
				TemporaryPassword: tempPassword,
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
						Name: 'gender',
						Value: gender,
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
				],
				DesiredDeliveryMediums: ['EMAIL'],
			};
			cognitoidentityserviceprovider.adminCreateUser(
				params,
				async function (err, data) {
					if (err) {
						console.log(err, err.stack);
						setMessage({ status: 'error', message: err.message });
					} else {
						await addUserToGroups(data.User.Username, profile_pic_id);
						await createPlayer(data.User.Username);
						setOpenModal(false);
					}
				}
			);
		} catch (error) {
			setMessage({ status: 'error', message: error.message });
			console.error(error);
		}
	};

	// Adds user to all designated User Groups.
	const addUserToGroups = async (newUsername, profile_pic_id) => {
		userGroups.forEach((group) => {
			var params = {
				UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
				GroupName: group,
				Username: newUsername,
			};
			cognitoidentityserviceprovider.adminAddUserToGroup(
				params,
				async function (err, data) {
					if (err) {
						console.log(err, err.stack);
					} else {
						// console.log({ status: 'success', data: data });
						await confirmTempUserPassword(newUsername, profile_pic_id); // Calls upload S3 image
					}
				}
			);
		});
	};

	// Automatically sets new user to CONFIRMED 
	// REFERENCE: https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_RespondToAuthChallenge.html
	const confirmTempUserPassword = async (username, profile_pic_id) => {
		// FIRST you must get auth (InitiateAuth) to retrieve the "Session"!
		const authParams = {
			AuthFlow: 'USER_PASSWORD_AUTH',
			ClientId: '40c4imoa859dtlo5iveig35dr1',
			AuthParameters: {
				USERNAME: username,
				PASSWORD: tempPassword,
			},
		};
		cognitoidentityserviceprovider.initiateAuth(
			authParams,
			function (err, authResult) {
				if (err) {
					console.log('Error authenticating user: ', err);
				} else {
					// Second layer deep - uses Session provided from above
					var params = {
						ChallengeName: 'NEW_PASSWORD_REQUIRED',
						ClientId: '40c4imoa859dtlo5iveig35dr1',
						ChallengeResponses: {
							USERNAME: username,
							NEW_PASSWORD: tempPassword,
						},
						Session: authResult.Session,
					};
					cognitoidentityserviceprovider.respondToAuthChallenge(
						params,
						async function (err, data) {
							if (err) console.log(err, err.stack); // an error occurred
							else {
								await uploadNewProfileImageToS3(profile_pic_id);
								setMessage({
									status: 'success',
									message: 'New user has been created!',
								});
							} // successful response
						}
					);
				}
			}
		);
	};

	// Uploads new profile image to the backend (S3 Bucket)
	const uploadNewProfileImageToS3 = async (newProfilePicId) => {
		const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';
		try {
			if (profilePic === null) {
				router.reload();
				return;
			}

			const params = {
				Bucket: bucketName,
				Key: newProfilePicId,
				Body: profilePic,
				ContentType: profilePic.type,
			};
			// Upload the image to S3
			s3.upload(params, (err, data) => {
				if (err) {
					console.log('Error uploading image: ', err);
				} else {
					// console.log('Image uploaded successfully!');
					router.reload();
				}
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{/* // <!-- Main modal --> */}
			<div
				id="defaultModal"
				tabindex="-1"
				aria-hidden="true"
				class="fixed top-0 bottom-0 left-0 right-0 p-4 max-w-[42rem] mx-auto w-full h-[40rem] sm:overflow-visible overflow-aut z-[150]"
			>
				<div class="relative w-full h-full">
					{/* <!-- Modal content --> */}
					<div class="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
						{/* <!-- Modal header --> */}
						<div class="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
							<h3 class="text-md font-semibold text-gray-900 dark:text-white">
								Add A User
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

							<div class="w-full">
								<label
									for="tempPassword"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Password *
								</label>
								<TempPasswordField
									state={tempPassword}
									setState={setTempPassword}
								/>
							</div>

							<div class="w-full">
								<label
									for="phoneNumber"
									class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Phone Number
								</label>
								<PhoneInput 
									placeholder=""
									defaultCountry="CA"
									value={phoneNumber}
									onChange={setPhoneNumber}
									style={{paddingLeft: '10px', opacity: '100%', borderRadius: '9px', borderWidth: '1px'}}
								/>
								{/* <input
									value={phoneNumber}
									onChange={(e) => setPhoneNumber(e.target.value)}
									type="text"
									id="phoneNumber"
									class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								/> */}
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
								onClick={(e) => createUser(e)}
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
				onClick={(e) => setOpenModal(false)}
				class="z-[125] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
