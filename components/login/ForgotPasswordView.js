/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */


import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { TextInput } from 'flowbite-react';
// Components
import OrsLogo from '../common/OrsLogo';

export default function ForgotPasswordView({ email, setEmail, setUiState }) {
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	const forgotPassword = async (e) => {
		e.preventDefault();
		try {
			await Auth.forgotPassword(email);
			setUiState('forgotPasswordSubmit');
		} catch (error) {
			setMessage({ status: 'error', message: error.message });
			console.error(error);
		}
	};

	return(
		<div className="w-full sm:w-96 m-4 flex flex-col gap-5">
			<OrsLogo/>
			<form className="flex flex-col gap-2">
				<p className="font-semibold text-2xl">Forgot Your Password?</p>
				<p>Don’t worry, just enter your registered email address and we’ll send you an OTP to reset your password.</p>
				<div>
					<TextInput
								id="email"
								type="email"
								placeholder="Email"
								required={true}
								className="border-2 border-black rounded-md "
							/>
				</div>
				<div>
					<button
						className="bg-brand-blue-800 h-10 w-full rounded-3xl text-white font-regular mt-3"
						type="button"
						onClick={(e) => forgotPassword(e)}
					>
						Send
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