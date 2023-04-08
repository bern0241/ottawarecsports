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
			setUiState('emailConfirmation');
		} catch (error) {
			setMessage({ status: 'error', message: error.message });
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between align-middle bg-white h-screen">
			<div>
				<div className="w-80 h-screen bg-brand-blue-900 top-0 left-0 hidden md:block"></div>
				<div className="hidden w-full h-20 bg-brand-blue-900 top-0 right-0 md:hidden"></div>
			</div>
			<div className="flex flex-col pb-5 place-items-center w-full h-full">
				<div className="mx-1.5 content-center w-96 mt-[13rem]">
					<div className="">
						<OrsLogo />
					</div>
					<form className="flex flex-col gap-2">
						<p className="text-lg sm:text-2xl font-semibold my-5">
							Forgot Your Password?
						</p>
						<p>
							Don’t worry, just enter your registered email address and we’ll
							send you an OTP to reset your password.
						</p>
						<div>
							<TextInput
								id="email"
								type="email"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
								required={true}
								className="border border-black rounded-md "
							/>
						</div>

						{message !== null && (
							<p
								id="message-notice"
								className={`ml-1 text-[.87rem] ${
									message.status === 'error' ? 'text-red-600' : 'text-green-500'
								} relative top-1`}
							>
								<span className="font-medium"></span> {message.message}
							</p>
						)}

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
			</div>
		</div>
	);
}
