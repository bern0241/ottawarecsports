/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect, use } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { TextInput } from 'flowbite-react';
// Components
import OrsLogo from '../common/OrsLogo';
import OtpField from 'react-otp-field';

export default function ForgetPasswordConfirmView({
	setUiState,
	email,
	confirmationCode,
	setConfirmationCode,
}) {
	const [otp, setOtp] = useState('');
	const [message, setMessage] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	const confirmSignUp = async () => {
		try {
			setUiState('forgotPasswordSubmit');
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
		<div className="flex flex-col md:flex-row justify-between align-middle bg-white h-screen">
			<div>
				<div className="w-80 h-screen bg-brand-blue-900 top-0 left-0 hidden md:block"></div>
				<div className="hidden w-full h-20 bg-brand-blue-900 top-0 right-0"></div>
			</div>
			<div className="flex flex-col pb-5 place-items-center w-full h-full">
				<div className="w-full w-96 flex flex-col gap-5 mt-[13rem] justify-center mx-auto text-center">
					<OrsLogo />
					<form className="flex flex-col gap-2">
						<p className="font-semibold text-2xl">Verification</p>
						<p>Enter the OTP that was sent to your email.</p>
						<div>
							<OtpField
								value={confirmationCode}
								onChange={setConfirmationCode}
								numInputs={6}
								onChangeRegex={/^([0-9]{0,})$/}
								autoFocus
								separator={<span> </span>}
								inputProps={{
									className:
										'otp-field__input w-12 h-16 border border-black rounded-md',
									disabled: false,
								}}
								classNames="flex flex-row gap-3 justify-center"
							/>
							<button
								className="bg-brand-blue-800 h-10 w-full max-w-[23rem] rounded-md text-white font-regular mt-3"
								type="button"
								onClick={() => confirmSignUp()}
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
