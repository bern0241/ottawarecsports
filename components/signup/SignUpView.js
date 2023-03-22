/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { TextInput } from 'flowbite-react';
import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';
// Components
import PasswordField from '../common/PasswordField';
import LocationDropDown from './LocationDropDown';
import GenderDropDown from './GenderDropDown';
import DobDatePicker from './DatePicker';
import OrsLogo from '../common/OrsLogo';

export default function SignUpView({ setUiState, email, setEmail }) {
	// Variable states for signing up
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [location, setLocation] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [gender, setGender] = useState('');
	// const [currentDate, setCurrentDate] = useState({}); //Delete if not used later
	// Birthdate variables/states
	const [birthDate, setBirthDate] = useState(
		new Date().toISOString().split('T')[0].replaceAll('-', '/')
	);
	// Displays Password field
	const [showPassword, setShowPassword] = useState(false);
	// Router constant used for changing pages
	const router = useRouter();
	// Message state for errors/succession notices
	const [message, setMessage] = useState(null);
	//Important variable for using AWS SDK Cognitio services
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	const signUp = async () => {
		console.log(birthDate);

		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			// phoneNumber === '' ||
			location === '' ||
			gender === '' ||
			birthDate === ''
		) {
			setMessage({
				status: 'error',
				message: 'Please fillout all required fields.',
			});
			return;
		}
		try {
			const newUser = await Auth.signUp({
				username: email,
				password: password,
				attributes: {
					name: firstName,
					family_name: lastName,
					'custom:location': location,
					phone_number: phoneNumber,
					gender: gender,
					picture: 'none',
					birthdate: birthDate,
				},
			});
			// console.log(newUser);
			addUserToGroup(newUser.userSub, 'User');
			setUiState('confirmSignUp');
		} catch (error) {
			console.error(error);
			setMessage({ status: 'error', message: error.message });
		}
	};

	const handleEnterAsGuest = async (e) => {
		router.push('/');
	};

	const addUserToGroup = (username, role) => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t',
			GroupName: role,
			Username: username,
		};
		cognitoidentityserviceprovider.adminAddUserToGroup(
			params,
			function (err, data) {
				if (err) {
					console.log(err, err.stack);
				} else {
					console.log({ status: 'success', data: data });
				}
			}
		);
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between align-middle bg-white h-screen">
			<div>
				<div className="w-80 h-screen bg-brand-blue-900 top-0 left-0 hidden sm:block"></div>
				<div className="w-full h-20 bg-brand-blue-900 top-0 right-0 sm:hidden"></div>
			</div>
			<div className="flex flex-col pb-5 place-items-center w-full h-full">
				<div className="mx-1.5 content-center mt-10 w-96 sm:mt-40">
					<div className="">
						<OrsLogo />
					</div>
					<form className="">
						<p className="text-lg sm:text-2xl font-semibold my-5">Sign Up</p>
						<div className="flex flex-col w-96 gap-3">
							<div className="flex sm:flex-row sm:justify-between flex-col w-96 gap-3">
								<TextInput
									id="firstname"
									type="firstname"
									placeholder="First Name *"
									onChange={(e) => setFirstName(e.target.value)}
									required={true}
									className="w-96 sm:w-44 border border-black rounded-md "
								/>
								<TextInput
									id="lastname"
									type="lastname"
									placeholder="Last Name *"
									onChange={(e) => setLastName(e.target.value)}
									required={true}
									className="w-96 sm:w-44 border border-black rounded-md "
									state={lastName}
									setState={setLastName}
								/>
							</div>
							<div className="flex sm:flex-row sm:justify-between flex-col w-96 gap-3">
								<GenderDropDown state={gender} setState={setGender} />
								<DobDatePicker state={birthDate} setState={setBirthDate} />
							</div>
							<LocationDropDown state={location} setState={setLocation} />
							<TextInput
								id="email"
								type="text"
								placeholder="Phone Number (optional)"
								onChange={(e) => setPhoneNumber(e.target.value)}
								required={false}
								className="w-96 border border-black rounded-md "
							/>
							<TextInput
								id="email"
								type="email"
								placeholder="Email *"
								onChange={(e) => setEmail(e.target.value)}
								required={true}
								className="w-96 border border-black rounded-md "
							/>
							<PasswordField
								label="Password *"
								// onChange={(e) => setPassword(e.target.value)}
								state={password}
								setState={setPassword}
								showPassword={showPassword}
								setShowPassword={setShowPassword}
							/>
							{message !== null && (
								<p
									id="message-notice"
									className={`ml-1 text-[.87rem] ${
										message.status === 'error'
											? 'text-red-600'
											: 'text-green-500'
									} relative top-1`}
								>
									<span className="font-medium"></span> {message.message}
								</p>
							)}
							<div>
								<button
									className="bg-brand-blue-800 h-10 w-full rounded-3xl text-white font-regular mt-3"
									type="button"
									onClick={() => signUp()}
								>
									Sign Up
								</button>
							</div>
							<div>
								<button
									className="text-brand-blue-800 border border-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular mb-3"
									type="button"
									onClick={() => handleEnterAsGuest()}
								>
									Enter as a Guest
								</button>
							</div>
						</div>
						<p className="font-normal text-base cursor-pointer">
							Have an account?{' '}
							<Link href="/login" className="font-bold">
								Sign In
							</Link>
						</p>
					</form>
				</div>
			</div>
		</div>
	);
}
