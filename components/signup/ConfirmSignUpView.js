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
// Components
import OrsLogo from '../common/OrsLogo';

export default function ConfirmSignUpView({ setUiState, email }) {
	const [confirmationCode, setConfirmationCode] = useState('');
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
			await Auth.confirmSignUp(email, confirmationCode);
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
						<p className="font-semibold text-2xl">Enter Your New Password</p>
						<p>Enter the OTP that was sent to your email.</p>
						<div>
							<div className="flex gap-3 self-center">
								<TextInput
									id="digit1"
									type="text"
									sizing="lg"
									placeholder=""
									required={true}
									className="w-12 h-16 border-1 border-black rounded-md "
								/>
								<TextInput
									id="digit2"
									type="text"
									sizing="lg"
									placeholder=""
									required={true}
									className="w-12 h-16 border-1 border-black rounded-md "
								/>
								<TextInput
									id="digit3"
									type="text"
									sizing="lg"
									placeholder=""
									required={true}
									className="w-12 h-16 border-1 border-black rounded-md "
								/>
								<TextInput
									id="digit4"
									type="text"
									sizing="lg"
									placeholder=""
									required={true}
									className="w-12 h-16 border-1 border-black rounded-md "
								/>
								<TextInput
									id="digit5"
									type="text"
									sizing="lg"
									placeholder=""
									required={true}
									className="w-12 h-16 border-1 border-black rounded-md "
								/>
								<TextInput
									id="digit6"
									type="text"
									sizing="lg"
									placeholder=""
									required={true}
									className="w-12 h-16 border-1 border-black rounded-md "
								/>
							</div>
							<button
								className="bg-brand-blue-800 h-10 w-full rounded-3xl text-white font-regular mt-3"
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
