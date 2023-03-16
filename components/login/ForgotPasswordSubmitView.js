/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
// Components
import PasswordField from '../common/PasswordField';
import OrsLogo from '../common/OrsLogo';
import { useRouter } from 'next/router';

export default function ForgotPasswordSubmitView({
	email,
	uiState,
	setUiState,
	confirmationCode
}) {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	// Everytime the UI change to this view, reset these fields.
	useEffect(() => {
		setNewPassword('');
	}, [uiState]);

	const forgotPasswordSubmit = async (e) => {
		e.preventDefault();
		if (newPassword === '' || confirmPassword === '') {
			setMessage({status: 'error', message: 'Please fill the required fields.'})
			return;
		}
		if (newPassword !== confirmPassword) {
			setMessage({status: 'error', message: 'Passwords should be the same.'})
			return;
		}
		if (newPassword)
		try {
			await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
			router.push('/');
			// setUiState('signIn');
		} catch (error) {
			setMessage({ status: 'error', message: error.message });
			console.log(error);
		}
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between align-middle bg-white h-screen">
			<div>
				<div className="w-80 h-screen bg-brand-blue-900 top-0 left-0 hidden sm:block"></div>
				<div className="w-full h-20 bg-brand-blue-900 top-0 right-0 sm:hidden"></div>
			</div>
			<div className="flex flex-col pb-5 place-items-center w-full h-full">
				<div className="flex flex-col gap-5  mt-10 w-96 sm:mt-40">
					<OrsLogo />
					<form className="flex flex-col gap-2">
						<p className="font-semibold text-2xl">Enter Your New Password</p>
						<PasswordField
							label="New Password"
							state={newPassword}
							setState={setNewPassword}
							showPassword={showPassword}
							setShowPassword={setShowPassword}
						/>
						<PasswordField
							label="Confirm new Password"
							state={confirmPassword}
							setState={setConfirmPassword}
							showPassword={showPassword}
							setShowPassword={setShowPassword}
						/>
						{message && (
							<div>
								<p className={`${message.status === 'error' ? 'text-red-500' : 'text-green-500'} text-center`}>
									{message.message}</p>
							</div>
						)}
						<div>
							<button
								className="bg-brand-blue-800 h-10 w-full rounded-3xl text-white font-regular mt-3"
								type="button"
								onClick={(e) => forgotPasswordSubmit(e)}
							>
								Submit
							</button>
						</div>
						<div>
							<button
								className="text-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular mt-3"
								type="button"
								onClick={() => setUiState('signIn')}
							>
								Cancel
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
