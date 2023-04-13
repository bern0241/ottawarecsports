/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
// Components
import OrsLogo from '../common/OrsLogo';
import OtpField from 'react-otp-field';

export default function ForgetPasswordConfirmView({
	setUiState,
	email,
	confirmationCode,
	setConfirmationCode,
}) {
	const [message, setMessage] = useState(null);

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

	return (
		<div className="flex flex-col lg:flex-row justify-between align-middle bg-white h-screen">
			<div>
				<div className="w-80 h-screen bg-brand-blue-900 top-0 left-0 hidden lg:block"></div>
				<div className="w-full h-20 bg-brand-blue-900 top-0 right-0 lg:hidden"></div>
			</div>
			<div className="flex justify-center items-center h-full w-full">
				<div className="flex flex-col gap-5 w-80 sm:w-96">
					<OrsLogo />
					<h2 className="text-xl font-semibold my-2 sm:text-2xl">
						Verification
					</h2>
					<p>Enter the OTP that was sent to your email.</p>
					<form className="flex flex-col gap-4">
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
										'otp-field__input w-11 h-14 sm:w-12 sm:h-16 border border-black rounded-md text-center',
									disabled: false,
								}}
								classNames="flex flex-row gap-3 items-center justify-center"
							/>
						</div>
						<button
							className="bg-brand-blue-800 h-10 w-full rounded-3xl text-white font-regular"
							type="button"
							onClick={() => confirmSignUp()}
						>
							Submit
						</button>
						<button
							className="text-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular"
							type="button"
							onClick={() => setUiState('signIn')}
						>
							Cancel
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
