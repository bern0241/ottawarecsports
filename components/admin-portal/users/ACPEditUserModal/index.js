/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES: https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/Welcome.html
// https://github.com/OMikkel/tailwind-datepicker-react
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';
import makeid from '@/utils/makeId';
import { useUser } from '@/context/userContext';
import { Auth, API } from 'aws-amplify';
// Components (Coming from 'components/signup' folder)
import DobDatePicker from '../ACPNewUserModal/DatePicker';
import GenderDropDown from '../ACPNewUserModal/GenderDropDown';
import LocationDropDown from '../ACPNewUserModal/LocationDropDown';
import UserGroupsDropDown from '../ACPNewUserModal/UserGroupsDropDown';
import UserProfilePictureEdit from './UserProfilePictureEdit';
// import UserProfilePicture from '../ACPNewUserModal/UserProfilePicture';
import TempPasswordField from '../ACPNewUserModal/TempPasswordField';
import ChangePasswordModal from './ChangePasswordModal';
import { listLeagues } from '@/src/graphql/queries';
import { updateLeague } from '@/src/graphql/mutations';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import ValidatePhoneNumber from 'validate-phone-number-node-js';

const s3 = new AWS.S3({
	accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
	secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
	signatureVersion: 'v4',
	region: 'us-east-1',
});

export default function ACPEditUserModal({
	user1, // The user being edited
	openModal,
	setOpenModal,
	setSuccessMessage,
}) {
	// New User Variables
	const [uiState, setUiState] = useState('main');
	const [newPassword, setNewPassword] = useState('');

	const [profilePic, setProfilePic] = useState(null);

	const [firstName, setFirstName] = useState(
		user1.Attributes.find((o) => o.Name === 'name')['Value'] // Name of user being edited
	);
	const [lastName, setLastName] = useState(
		user1.Attributes.find((o) => o.Name === 'family_name')['Value'] // Last name of user being edited
	);
	const [birthDate, setBirthDate] = useState(
		user1.Attributes.find((o) => o.Name === 'birthdate')['Value'].replaceAll( 
			'-',
			'/'
		) // Birthdate of user being edited
	);
	const [gender, setGender] = useState(
		user1.Attributes.find((o) => o.Name === 'gender')['Value'] // Gender of user being edited
	);
	const [phoneNumber, setPhoneNumber] = useState('');
	const [email, setEmail] = useState(
		user1.Attributes.find((o) => o.Name === 'email')['Value'] // Email of user being edited
	);
	const [location, setLocation] = useState(
		user1.Attributes.find((o) => o.Name === 'custom:location')['Value'] // Location of user being edited
	);

	const [userGroups, setUserGroups] = useState([]); // The groups that the user is part of
	
	const [isAdmin, setIsAdmin] = useState(false); // Checks if admin chip exists when modal opens
	const [isCoordinator, setIsCoordinator] = useState(false); // Checks if coordinator chip exists when modal opens
	const [isReferee, setIsReferee] = useState(false); // Checks if referee chip exists when modal opens
	
	const [yesLogout, setYesLogout] = useState(false); // Checks if user accepts to remove themselves as Admin
	const [user, setUser, authRoles, setAuthRoles] = useUser();
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

	// Nullifies the message on startup. Sets the new password to empty
	// Checks if user is Admin when opening modal (meant for logging our user if they remove their Admin priviledge)
	useEffect(() => {
		setMessage(null);
		setNewPassword('');
		if (user1.Username === user.username && userGroups.includes('Admin')) {
			setIsAdmin(true);
		}
	}, [userGroups]);


	useEffect(() => {
		// Set phone number IF phone number attribute exists on user (in Cognito)
		if (user1.Attributes.find((o) => o.Name === 'phone_number')) {
			setPhoneNumber(
				user1.Attributes.find((o) => o.Name === 'phone_number')['Value']
			);
		}
		// Gets all the groups of user from backend
		const getGroupsForUser = () => {
			var params = {
				Username: user1.Username,
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
						// SEE IF USER COORDINATOR EXISTS
						if (result.includes('Coordinator')) {
							setIsCoordinator(true);
						}
						if (result.includes('Referee')) {
							setIsReferee(true);
						}
					}
				}
			);
		};
		getGroupsForUser();
	}, []);

	/**
	 * 
	 * @returns Checks if user being edited has Coordinator role that exists in every league!
	 *  TODO: Referees! (Phase 2) 
	 */
	const checkIfCoordinatorsOrRefereesExist = async () => {
		let coordOrRefLive = [];
		try {
			const variables = {
				filter: {
					coordinators: {
						size: {
							ne: 0
						}
					}
				}
			}
			const leagues = await API.graphql({
				query: listLeagues,
				variables: variables
			})
			// loop through and filter username 
			let coordinatorAliveLeague = false;
			leagues.data.listLeagues.items.forEach((league) => {
				league.coordinators.forEach((coordinator) => {
					if (coordinator === user1.Username) {
						coordinatorAliveLeague = true;
					}
				})
			})
			if (coordinatorAliveLeague) {
				coordOrRefLive.push('coordinator');
			}
			// CHECK FOR REF
			return coordOrRefLive;
			
		} catch (error) {
			alert('Error checking for Coordinators or Referees')
			console.log(error);
		}
	}

	// Removes user as Coordinator in ALL leagues (if user removes their Coordinator role)
	const removeAllCoordinatorRolesInLeagues = async () => {
		const variables = {
            filter: {
                coordinators: {
                    size: {
						ne: 0
					}
                }
            }
        }
        const leagues = await API.graphql({
            query: listLeagues,
            variables: variables
        })
		// loop through and filter username 
		try {
			leagues.data.listLeagues.items.forEach(async (league) => {
				league.coordinators.forEach(async (coordinator) => {
					if (coordinator === user1.Username) {
						let newCoordinators = league.coordinators.filter(coordinator2 => coordinator2 !== user1.Username);
						const data = {
							id: league.id,
							coordinators: newCoordinators,
						}
						const apiData = await API.graphql({
							query: updateLeague,
							variables: { input: data},
						});
					}
				})
			})
			return;
		} catch (error) {
			alert('Error trying to delete all coordinators from user');
			console.log(error);
		}
	}

	// If phone number is empty (null), return empty string
	const returnEmptyStringPhoneNumber = async () => {
		if (phoneNumber === undefined) {
			return '';
		} else {
			return phoneNumber
		}
	}


	/**
	 *
	 * @returns New user created!
	 */
	const editUser = async (e, userStatus) => {
		try {
			// deletePhoneNumberAttribute();
			// DO CHECK FIRST
			if (isAdmin && userStatus === 'meOther') {
				if (!userGroups.includes('Admin')) {
					setUiState('adminRemoved')
					return;
				}
			}
			const check = await checkIfCoordinatorsOrRefereesExist();
			if (check.includes('coordinator') && isCoordinator && userStatus !== 'meCoordinator') {
				if (!userGroups.includes('Coordinator')) { //removed authrole
					setUiState('coordinatorRemoved');
					return;
				}
			}
			if (userStatus === 'meCoordinator') {
				await removeAllCoordinatorRolesInLeagues(); //We have detected that this user has existing Coordinator and Referee roles. They will all be removed. Are you sure you want to continue?
			}
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
			if (phoneNumber !== undefined && phoneNumber !== '') {
				if (!ValidatePhoneNumber.validate(phoneNumber)) {
					setMessage({status: 'error', message: 'Please use a valid phone number.'})
					return;
				}
			}
			
			let uniqueId = makeid(15); //Meant for making random imageURI
			let profile_pic_id = 'none';

			// If picture exists, use that one!
			if (user1.Attributes.find((o) => o.Name === 'picture')['Value'] !== 'none') {
				profile_pic_id = user1.Attributes.find((o) => o.Name === 'picture')['Value'];
			}

			// If profile picture is NOT null, set the ID to it's newly generated id
			if (profilePic !== null) {
				profile_pic_id = 'user_' + uniqueId;
			}
			const phoneNumberConverted = await returnEmptyStringPhoneNumber();

			var params = {
				UserPoolId: 'us-east-1_70GCK7G6t',
				Username: user1.Username,
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
						Name: 'birthdate',
						Value: birthDate.toString(),
					},
					{
						Name: 'phone_number',
						Value: phoneNumberConverted,
					},
				],
				// KEEP JUST IN CASE - Meant for delivering message to email or sms
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

						await deleteUserGroups(profile_pic_id, userStatus);
					}
				}
			);
		} catch (error) {
			setMessage({ status: 'error', message: error.message });
			console.error(error);
		}
	};

	// Deletes selected user groups (from Cognito - backend)
	const deleteUserGroups = async (profile_pic_id, userStatus) => {
		try {
			const removeTheseGroups = [
				'User',
				'Captain',
				'Referee',
				'Coordinator',
				'Admin',
				// 'Owner',
			];
			await removeTheseGroups.forEach((group) => {
				// if (group !== 'User') 
				{
					var params = {
						UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
						GroupName: group,
						Username: user1.Username,
					};
					cognitoidentityserviceprovider.adminRemoveUserFromGroup(
						params,
						async function (err, data) {
							if (err) {
								console.log(err, err.stack);
							} else {
								await addUserToGroups(profile_pic_id, userStatus);
								// console.log({ status: 'success remove from group', data: data });
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
	
	// Adds new user groups to user! (using Cognito)
	const addUserToGroups = async (profile_pic_id, userStatus) => {
		try {
			await userGroups.forEach((group) => {
				// if (group !== 'User') 
				{
					var params = {
						UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
						GroupName: group,
						Username: user1.Username,
					};
					cognitoidentityserviceprovider.adminAddUserToGroup(
						params,
						function (err, data) {
							if (err) {
								console.log(err, err.stack);
							} else {
								deleteCurrentProfileImageS3(profile_pic_id, userStatus);
								// console.log({ status: 'success', data: data });
							}
						}
						);
					}
				});

				deleteCurrentProfileImageS3(profile_pic_id, userStatus);
			} catch (error) {
				setMessage({status: 'error', message: error.message});
				console.error(error);
		}
	};

	// Deletes current profile image in backend (S3 Bucket)
	const deleteCurrentProfileImageS3 = async (profile_pic_id, userStatus) => {
		const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';

		try {
			if (profilePic === null) {
				setMessage({ status: 'success', message: 'User updated!' });
				resetPage(userStatus);
				return;
			}

			const params = {
				Bucket: bucketName,
				Key: user1.Attributes.find((o) => o.Name === 'picture')['Value'],
			};
			s3.deleteObject(params, function (err, data) {
				if (err) {
					console.log('Error deleting object: ', err);
				} else {
					uploadNewProfileImageToS3(profile_pic_id, userStatus);
					// console.log('Object deleted successfully');
				}
			});
		} catch (error) {
			setMessage({ status: 'error', message: error });
			console.error(error);
		}
	};

	// Uploads new profile image to backend (S3 Bucket)
	const uploadNewProfileImageToS3 = async (profile_pic_id, userStatus) => {
		const bucketName = 'orsappe5c5a5b29e5b44099d2857189b62061b154029-dev';
		const signedUrlExpireSeconds = 60 * 1;

		try {
			if (profilePic === null) {
				setMessage({ status: 'success', message: 'User updated!' });
				resetPage(userStatus);
				return;
			}

			const params = {
				Bucket: bucketName,
				Key: profile_pic_id,
				Body: profilePic,
				ContentType: profilePic.type,
			};
			// Upload the image to S3
			s3.upload(params, (err, data) => {
				if (err) {
				} else {
					console.log('Image uploaded successfully!');
					setMessage({ status: 'success', message: 'User updated!' });
					resetPage(userStatus);
				}
			});
		} catch (error) {
			console.error(error);
		}
	};

	// Sets new password to edited user (using Cognito)
	const setPassword = (e) => {
		e.preventDefault();
		if (newPassword === '') {
			setMessage({ status: 'error', message: 'Password must not be empty.' });
			return;
		}
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t',
			Username: user1.Username,
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
				} // successful response
			}
		);
	};

	/**
	 * Page resets - If current user edits himself and removes Admin role, this function will logout the user
	 */
	const resetPage = async (userStatus) => {
		if (userStatus === 'meOther' || userStatus === 'meCoordinator' || userStatus === 'meReferee' || userStatus === 'meRefCoord') {
			router.reload();
		} else if (userStatus === 'meAdmin') {
			await Auth.signOut();
			setUser(null);
			setAuthRoles(null);
			router.push('/login');
		}
	}

	return (
		<>
		{uiState === 'adminRemoved' && (
				
                <div tabIndex="-1" class="z-[400] w-[32rem] fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 p-4 overflow-x-hidden overflow-y-auto ">
            	<div class="relative h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={(e) => {
                            e.stopPropagation();
                            setOpenModal(false);
                        }}
                        type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You are about to remove yourself as Admin! You will be <b>logged out immediately.</b></h3>
                        <button onClick={(e) => {
                            e.stopPropagation();
							// setUiState('main');
							setOpenModal(false);
                        }} data-modal-hide="popup-modal" type="button" class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 border">
                            No thanks
                        </button>
                        <button 
						onClick={async (e) => {
                            e.stopPropagation();
							editUser(e, 'meAdmin')
                        }}
						 data-modal-hide="popup-modal" type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Yes, I understand
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
		)}

			{uiState === 'coordinatorRemoved' && (
				
                <div tabIndex="-1" class="z-[400] w-[32rem] fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 p-4 overflow-x-hidden overflow-y-auto ">
            	<div class="relative h-full md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <button onClick={(e) => {
                            e.stopPropagation();
                            setOpenModal(false);
                        }}
                        type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <div class="p-6 text-center">
                        <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">This user is an <b>existing coordinator</b> on a league. <br/>Are you sure you want to REMOVE them <br/>as coordinators?</h3>
                        <button onClick={(e) => {
                            e.stopPropagation();
							// setUiState('main');
							setOpenModal(false);
                        }} data-modal-hide="popup-modal" type="button" class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 border">
                            No thanks
                        </button>
                        <button 
						onClick={async (e) => {
                            e.stopPropagation();
							editUser(e, 'meCoordinator')
                        }}
						 data-modal-hide="popup-modal" type="button" class="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            Yes, I understand
                        </button>
                        
                    </div>
                </div>
            </div>
        </div>
		)}

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
									user={user1}
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
										<ChangePasswordModal setUiState={setUiState} />
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
										onClick={(e) => editUser(e, 'meOther')}
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
						class="fixed top-[10rem] left-0 right-0 z-[150] p-4 max-w-[32rem] mx-auto w-full h-[18rem] sm:overflow-visible overflow-auto"
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
