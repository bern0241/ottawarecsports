/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import AWS from 'aws-sdk';
import makeid from '@/utils/makeId';
import { useUser } from '@/context/userContext';
// Components (Coming from 'components/signup' folder)
import DobDatePicker from '../ACPNewUserModal/DatePicker';
import GenderDropDown from '../ACPNewUserModal/GenderDropDown';
import LocationDropDown from '../ACPNewUserModal/LocationDropDown';
import UserGroupsDropDown from '../ACPNewUserModal/UserGroupsDropDown';
import UserProfilePicture from '../ACPNewUserModal/UserProfilePicture';
import TempPasswordField from '../ACPNewUserModal/TempPasswordField';
import ChangePasswordModal from './ChangePasswordModal';

export default function ACPEditUserModal({ user, setOpenModal, setSuccessMessage }) {
    // New User Variables
    // const [user, setUser, authRoles, setAuthRoles] = useUser();
    const [uiState, setUiState] = useState('main');
    const [newPassword, setNewPassword] = useState('');

    const [profilePic, setProfilePic] = useState(null);
    const [profilePicId, setProfilePicId] = useState('none');

    const [firstName, setFirstName] = useState(user.Attributes.find(o => o.Name === 'name')['Value']);
    const [lastName, setLastName] = useState(user.Attributes.find(o => o.Name === 'family_name')['Value']);
    // const [birthDate, setBirthDate] = useState(new Date().toISOString().split('T')[0]);
    const [birthDate, setBirthDate] = useState(user.Attributes.find(o => o.Name === 'birthdate')['Value'].replaceAll('-', '/'));
    const [gender, setGender] = useState(user.Attributes.find(o => o.Name === 'gender')['Value']);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState(user.Attributes.find(o => o.Name === 'email')['Value']);
    const [location, setLocation] = useState(user.Attributes.find(o => o.Name === 'custom:location')['Value']);
    
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
        }
    }, [uiState])

    useEffect(() => {
        if (user.Attributes.find(o => o.Name === 'phone_number')) {
            setPhoneNumber(user.Attributes.find(o => o.Name === 'phone_number')['Value'])
        }
        const getGroupsForUser = () => {
            var params = {
                Username: user.Username,
                UserPoolId: 'us-east-1_70GCK7G6t',
            };
            cognitoidentityserviceprovider.adminListGroupsForUser(params, function(err, data) {
                if (err) console.log(err, err.stack); // an error occurred
                else  { // successful response
                    let result = data.Groups.map(a => a.GroupName);
                    result = result.filter(item => item !== "User");
                    result.unshift("User");
                    setUserGroups(result)
                }
              });
            }
        getGroupsForUser();
    }, [])


    /**
     * 
     * @returns New user created!
     */
    const createUser = async () => {
        // console.log('Session',user.signInUserSession.refreshToken.token);
        // return;
        if (firstName === '' || lastName === '' || birthDate === '' || email === '' || location === '') {
            setMessage({status: 'error', message: 'Please fillout required fields.'});
            return;
        }
        try {
            let uniqueId = makeid(15); //Meant for making random imageURI
            let profile_pic_id = 'user_' + uniqueId;

            // If profile picture is NOT null, set the ID to it's newly generated id
            if (profilePic !== null) {
                setProfilePicId(profile_pic_id);
            } else {
                setProfilePicId('none');
            }
            var params = {
                UserPoolId: 'us-east-1_70GCK7G6t',
                // Username: uniqueId,
                Username: email,
                TemporaryPassword: tempPassword,
                UserAttributes: [
                    {
                        Name: 'name',
                        Value: firstName,
                    },
                    {
                        Name: 'family_name',
                        Value: lastName
                    },
                    {
                        Name: 'gender',
                        Value: gender
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
                        Value: phoneNumber 
                    },
                    {
                        Name: 'picture',
                        Value: profilePicId
                    },
                ],
                // DesiredDeliveryMediums: [
                //     SMS | EMAIL,
                // ]
            }
            cognitoidentityserviceprovider.adminCreateUser(params, async function(err, data) {
                if (err) {
                    console.log(err, err.stack);
                    setMessage({status: 'error', message: err.message});
                } 
                else { 
                    console.log('New User', data); // successful response
                    await addUserToGroups(data.User.Username);
                    if (profilePic !== null) {
                        await uploadNewProfileImageToS3(profilePicId)
                    }
                    await confirmTempUserPassword(data.User.Username);
                    setOpenModal(false);
                    // setSuccessMessage(true);
                    router.reload();
                }
              });
        } catch (error) {
            setMessage({status: 'error', message: error.message});
            console.error(error);
        }
    }

    const addUserToGroups = async (newUsername) => {
        userGroups.forEach((group) => {

            var params = {
                UserPoolId: 'us-east-1_70GCK7G6t', /* required */
                GroupName: group,
                Username: newUsername,
            };
            cognitoidentityserviceprovider.adminAddUserToGroup(params, function(err, data) {
            if (err) {
                console.log(err, err.stack);
            }
            else {
                console.log({status: 'success', data: data})
            }
            });
        })
    }

    const uploadNewProfileImageToS3 = async (newProfilePicId) => {
        if (!profilePic) return;

        try {
            const params = {
                Bucket: bucketName,
                Key: newProfilePicId,
                Body: newImage,
                ContentType: profilePic.type
              };
              // Upload the image to S3
            s3.upload(params, (err, data) => {
                if (err) {
                console.log('Error uploading image: ', err);
                } else {
                console.log('Image uploaded successfully!');
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    const confirmTempUserPassword = async (username) => 
    {
        // FIRST you must get auth (InitiateAuth) to retrieve the "Session"!
        // Set the authentication parameters for the user
        const authParams = {
            // AuthFlow: 'REFRESH_TOKEN',
            AuthFlow: 'USER_PASSWORD_AUTH',
            ClientId: '40c4imoa859dtlo5iveig35dr1',
            // AuthParameters: {
            //     REFRESH_TOKEN: user.signInUserSession.refreshToken.token
            // },
            AuthParameters: {
                USERNAME: username,
                PASSWORD: tempPassword
              }
        };        

        cognitoidentityserviceprovider.initiateAuth(authParams, function(err, authResult) {
            if (err) {
                console.log('Error authenticating user: ', err);
            } else {
                // console.log('DATA', authResult);
                // console.log('Session Auth Reached:', authResult.Session)

                // Second layer deep - uses Session provided from above
                var params = {
                    ChallengeName: 'NEW_PASSWORD_REQUIRED', 
                    ClientId: '40c4imoa859dtlo5iveig35dr1',
                    ChallengeResponses: {
                      USERNAME: username,
                      NEW_PASSWORD: tempPassword
                    },
                    Session: authResult.Session
                    // Session: 'xxxxxxxxxxZDMcRu-5u...sCvrmZb6tHY'
                };
                // console.log('Session Auth:', authResult.Session)
                  
                  cognitoidentityserviceprovider.respondToAuthChallenge(params, function(err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else   {
                        console.log(data);
                        // router.reload();
                    }           // successful response
                  });
            }
        })
    }

    const setPassword = (e) => {
        e.preventDefault();  
        if (newPassword === '') {
            setMessage({status: 'error', message: 'Password must not be empty.'});
            return;
        }
        var params = {
            UserPoolId: 'us-east-1_70GCK7G6t',
            Username: user.Username,
            Password: newPassword,
            Permanent: true,
        }
        cognitoidentityserviceprovider.adminSetUserPassword(params, function(err, data) {
            if (err) {
                setMessage({status: 'error', message: err.message});
                console.log(err, err.stack);
            } // an error occurred
            else {
                setMessage({status: 'success', message: 'Password set successfully.'});
                console.log(data);
            }           // successful response
        });
    }
    
    const resetPassword = (e) => {
        e.preventDefault();  
        var params = {
            Username: user.Username,
            UserPoolId: 'us-east-1_70GCK7G6t',
        }
        cognitoidentityserviceprovider.adminResetUserPassword(params, function(err, data) {
            if (err) {
                setMessage({status: 'error', message: err.message});
                console.log(err, err.stack);
            } // an error occurred
            else    {
                setMessage({status: 'success', message: 'Password reset.'});
                console.log(data);
            }           // successful response
          });

    }

  return (
    <>
    {uiState === 'main' && (
        <>
    {/* // <!-- Main modal --> */}
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-0 bottom-0 left-0 right-0 z-[30] p-4 max-w-[42rem] mx-auto w-full h-[40rem] sm:overflow-visible overflow-auto">
        <div class="relative w-full h-full">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
                {/* <!-- Modal header --> */}
                <div class="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-md font-semibold text-gray-900 dark:text-white">
                        Add A User
                    </h3>
                    <button onClick={() => setOpenModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
    
                {/* <!-- Modal body --> */}
                <button onClick={(e) => console.log(user)}>On Click</button>
                <UserProfilePicture profilePic={profilePic} setProfilePic={setProfilePic} />

                <div class="p-5 grid grid-cols-1 sm:grid-cols-2 items-center gap-[1.1rem]">

                    
                    <div class="w-full ">
                        <label for="firstName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name *</label>
                        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" id="firstName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div class="w-full">
                        <label for="lastName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name *</label>
                        <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" id="lastName" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                <div className='w-full'>
                    <label for="birthdate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthdate *</label>
                    <DobDatePicker
                        state={birthDate}
                        setState={setBirthDate}
                    />
                </div>
                <div className='w-full'>
                    <label for="gender" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender *</label>
                    <GenderDropDown state={gender} setState={setGender} />
                </div>

                    <div class="w-full">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email *</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div class="w-full text-right relative top-4">
                        {/* <label for="tempPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password *</label> */}
                        <ChangePasswordModal setUiState={setUiState} />
                    </div>

                    <div class="w-full">
                        <label for="phoneNumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                        <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="text" id="phoneNumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </div>

                    <div class="w-full">
                        <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location *</label>
                        <LocationDropDown state={location} setState={setLocation} />
                    </div>
                
                </div>

                    <div class="px-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Auth Roles (+)</label>
                        <UserGroupsDropDown userGroups={userGroups} setUserGroups={setUserGroups} />
                    </div>
    
                    {message && (<p id="standard_error_help" className={`my-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
                    
    
                {/* <!-- Modal footer --> */}
                <div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <button onClick={() => setOpenModal(false)} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button>
                    <button onClick={(e) => createUser(e)} data-modal-hide="defaultModal" type="button" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Save</button>
                </div>
            </div>
        </div>
    </div>
    <div onClick={(e) => setOpenModal(false)} class='z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
    </>
    )}

    {uiState === 'changePassword' && (
    <>
    <div id="defaultModal" tabindex="-1" aria-hidden="true" class="fixed top-[10rem] left-0 right-0 z-[30] p-4 max-w-[32rem] mx-auto w-full h-[18rem] sm:overflow-visible overflow-auto">
        <div class="relative w-full h-full">
            {/* <!-- Modal content --> */}
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
                {/* <!-- Modal header --> */}
                <div class="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
                    <h3 class="text-md font-semibold text-gray-900 dark:text-white">
                        Edit A User
                    </h3>
                    <button onClick={() => setUiState('main')} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>
    
                {/* <!-- Modal body --> */}

                <div class="p-5 grid grid-cols-1 items-center gap-[1.1rem]">
                <div class="w-full">
                        <label for="tempPassword" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter New Password</label>
                        <TempPasswordField state={newPassword} setState={setNewPassword} />
                    </div>
                </div>

                    {message && (<p id="standard_error_help" className={`my-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
                    
    
                {/* <!-- Modal footer --> */}
                <div class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                    {/* <button onClick={() => setOpenModal(false)} data-modal-hide="defaultModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cancel</button> */}
                    <button onClick={(e) => setPassword(e)} data-modal-hide="defaultModal" type="button" class="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800">Set Password</button>
                </div>
            </div>
        </div>
    </div>
    <div onClick={(e) => setOpenModal(false)} class='z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
    </>
    )}
    </>
    )
}