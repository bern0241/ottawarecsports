/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { useUser } from '@/context/userContext';
import { TextInput } from 'flowbite-react';
import OtpField from 'react-otp-field';
// Components
import OrsLogo from '../common/OrsLogo';

export default function ConfirmSignUpView({ setUiState, email, confirmationCode, setConfirmationCode }) {
	const [otp, setOtp] = useState('');
	const [message, setMessage] = useState(null);
	const [user, setUser] = useUser();
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	const confirmEmailCode = async () => {
		try {
			await Auth.confirmSignUp(email, confirmationCode);
			// const user = await Auth.currentAuthenticatedUser();
			// setUser(user);
			// console.log('USER!!', user);
			router.push('/login');
		} catch (error) {
			console.error(error);
			setMessage({ status: 'error', message: error.message });
		}
	};

	const resendConfirmationCode = async () => {
		try {
			await Auth.resendSignUp(email);
			setMessage({ status: 'success', message: `Code resent successfully!` });
			console.log('code resent successfully');
		} catch (err) {
			setMessage({ status: 'error', message: err.message });
			console.log('error resending code: ', err);
		}
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between align-middle bg-white">
			<div>
				<div className="w-80 h-screen bg-brand-blue-900 top-0 left-0 hidden sm:block"></div>
				<div className="w-full h-20 bg-brand-blue-900 top-0 right-0 sm:hidden"></div>
			</div>
			<div className="flex flex-col pb-5 place-items-center w-full h-full">
				<div className="w-full sm:w-96 flex flex-col gap-5 sm:mt-40">
					<OrsLogo />
					<form className="flex flex-col gap-2">
						<p className="font-semibold text-2xl">Enter Your Confirmation Code</p>
						<p>Enter the confirmation code that was sent to your email.</p>
						
						<OtpField
							value={confirmationCode}
							onChange={setConfirmationCode}
							numInputs={6}
							onChangeRegex={/^([0-9]{0,})$/}
							autoFocus
							separator={<span> </span>}
							inputProps={{ className: 'otp-field__input w-12 h-16 border border-black rounded-md', disabled: false }}
							classNames="flex flex-row gap-3"
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
								onClick={() => confirmEmailCode()}
							>
								Submit
							</button>
						</div>
						<div>
							<button
								className="text-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular mt-3"
								type="button"
								onClick={() => setUiState('signUp')}
							>
								Cancel
							</button>
						</div>
						<p
						className="text-center underline cursor-pointer text-[.92rem] text-brand-blue-900"
						onClick={resendConfirmationCode}
					>
						Resend Verification Code
					</p>
					</form>
				</div>
			</div>
		</div>
	);
}
