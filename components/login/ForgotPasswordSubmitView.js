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

export default function ForgotPasswordSubmitView({
	email,
	uiState,
	setUiState,
}) {
	const [confirmationCode, setConfirmationCode] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	// Everytime the UI change to this view, reset these fields.
	useEffect(() => {
		setConfirmationCode('');
		setNewPassword('');
	}, [uiState]);

	const forgotPasswordSubmit = async (e) => {
		e.preventDefault();
		try {
			await Auth.forgotPasswordSubmit(email, confirmationCode, newPassword);
			setUiState('signIn');
		} catch (error) {
			setMessage({ status: 'error', message: error.message });
			console.log(error);
		}
	};

	return(
		<div className="w-full sm:w-96 flex flex-col gap-5">
			<OrsLogo/>
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
						state={newPassword}
						setState={setNewPassword}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
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
	)
}
