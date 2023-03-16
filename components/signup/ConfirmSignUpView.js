/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useUser } from '@/context/userContext';
// Icons
import { IconX } from '@tabler/icons-react';
// Components
import TextField from '../common/TextField';

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
		<main className="flex">
			<div className="h-[100vh] flex justify-center items-center px-[1rem]">
				<div className="max-w-[33rem] py-[4rem] px-[3rem] mx-auto translate-y-[-20px]">
					{/* Close Button */}
					<div className="cursor-pointer absolute top-5 right-5">
						<IconX fontSize={'24px'} onClick={() => setUiState('signUp')} />
					</div>
					<div className="text-center">
						<Image
							className="m-auto"
							width={94}
							height={94}
							src="/../public/images/ORS-Logo.png"
							alt="ORS Logo"
						/>
					</div>
					<div className="mt-[1.5rem] w-[20rem]">
						<div className="mb-7">
							<TextField
								label="Confirmation Code"
								id="confirmationCode"
								type="text"
								state={confirmationCode}
								setState={setConfirmationCode}
							/>
						</div>

						{message !== null && (
							<p
								id="message-notice"
								className={`ml-1 text-[.87rem] ${
									message.status === 'error' ? 'text-red-600' : 'text-green-500'
								} relative bottom-2`}
							>
								<span class="font-medium"></span> {message.message}
							</p>
						)}

						<button
							onClick={() => confirmSignUp()}
							className="mt-5 p-[10px] w-full bg-[#007916] text-white rounded-sm"
						>
							Confirm Sign Up
						</button>
						<p className="py-3 text-right"></p>
					</div>

					<p
						className="text-center underline cursor-pointer text-[.92rem] text-[#00440c]"
						onClick={resendConfirmationCode}
					>
						Resend Verification Code
					</p>
				</div>
			</div>
		</main>
	);
}
