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
import DatePicker from './DatePicker';
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
	const [birthdate, setBirthdate] = useState('');
	const [birthdateProp, setBirthdateProp] = useState('');
	const [birthdateDisplay, setBirthdateDisplay] = useState('');
	// Displays Password field
	const [showPassword, setShowPassword] = useState(false);
	// Router constant used for changing pages
	const router = useRouter();
	// Message state for errors/succession notices
	const [message, setMessage] = useState(null);
	//Important variable for using AWS SDK Cognitio services
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	// Initialize Fields
	useEffect(() => {
		function getCurrentDate() {
			let current = new Date().toISOString().split('T')[0];
			setBirthdate(current);
		}
		getCurrentDate();
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	const signUp = async () => {
		console.log('birthdate', birthdate);
		if (
			firstName === '' ||
			lastName === '' ||
			email === '' ||
			phoneNumber === '' ||
			location === '' ||
			gender === '' ||
			birthdate === ''
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
					birthdate: birthdate,
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

	return(
		<div className="flex flex-col w-96 ">
			<div className="mx-1.5 content-center mt-10 ">
				<div className="">
					<OrsLogo/>
				</div>
				<form className="">
					<p className="text-lg sm:text-2xl font-semibold my-5">Sign In</p>
					<div className="flex flex-col w-96 gap-3">
						<div className="flex sm:flex-row sm:justify-between flex-col w-96 gap-3">
							<TextInput
								id="firstname"
								type="firstname"
								placeholder="First Name *"
								required={true}
								className="w-96 sm:w-44 border-2 border-black rounded-md "
								state={firstName}
								setState={setFirstName}
							/>
							<TextInput
								id="lastname"
								type="lastname"
								placeholder="Last Name *"
								required={true}
								className="w-96 sm:w-44 border-2 border-black rounded-md "
								state={lastName}
								setState={setLastName}
							/>
						</div>
						<div className="flex sm:flex-row sm:justify-between flex-col w-96 gap-3">
							<GenderDropDown state={gender} setState={setGender} />
							<DatePicker birthdateDisplay={birthdateDisplay} />
						</div>
						<LocationDropDown state={location} setState={setLocation} />
						<TextInput
						id="email"
						type="text"
						placeholder="Phone Number (optional)"
						required={false}
						className="w-96 border-2 border-black rounded-md "
						state={phoneNumber}
						setState={setPhoneNumber}
						/>
						<TextInput
							id="email"
							type="email"
							placeholder="Email *"
							required={true}
							className="w-96 border-2 border-black rounded-md "
							state={email}
							setState={setEmail}
						/>
						<PasswordField
											label="Password *"
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
									<span class="font-medium"></span> {message.message}
								</p>
							)}
						<div>
							<button
								className="bg-brand-blue-800 h-10 w-full rounded-3xl text-white font-regular mt-3"
								type="button"
							>
								Sign In
							</button>
						</div>
						<div>
							<button
								className="text-brand-blue-800 border-2 border-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular mb-3"
								type="button"
							>
								Enter as a Guest
							</button>
						</div>
					</div>
					<p
								onClick={() => setUiState('forgotPassword')}
								class="font-normal text-base text-right cursor-pointer"
							>
								Forgot your password?
					</p>
					<p class="font-normal text-base cursor-pointer">
						Need an account?
						<Link
						href="/signup"
						className="font-bold">
							Sign Up
						</Link>
					</p>
				</form>
			</div>
		</div>
	)
}
