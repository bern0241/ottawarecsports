/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Image from 'next/image';
// Icons
import { IconX } from '@tabler/icons-react';
// Components
import TextField from '../common/TextField';
import { Text } from '@aws-amplify/ui-react';

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

	return (
		<main className="flex">
			<div className="h-[100vh] flex justify-center items-center px-[1rem]">
				<div className="max-w-[33rem] py-[4rem] px-[3rem] mx-auto translate-y-[-20px]">
					{/* Close Button */}
					<div className="cursor-pointer absolute top-5 right-5">
						<IconX fontSize={'24px'} onClick={() => setUiState('signIn')} />
					</div>
					<div className="text-center">
						<Image
							className="m-auto"
							width={94}
							height={94}
							src="/../public/images/ORS-Logo.png"
							alt="ORS Logo"
						/>
						<h1 className="text-[1.7rem] font-semibold">
							Forgot Your Password? <br />
							Start Here.
						</h1>
					</div>
					<div className="mt-[1.5rem]">
						<TextField
							label="Enter Your Email"
							id="email"
							type="email"
							state={email}
							setState={setEmail}
							autoComplete={false}
						/>

						{/* Error Messaging */}
						{message !== null && (
							<p
								id="message-notice"
								className={`ml-1 text-[.87rem] ${
									message.status === 'error' ? 'text-red-600' : 'text-green-500'
								} relative top-1`}
							>
								<span class="font-medium"></span> {message.message}
							</p>
						)}

						{/* Signin button */}
						<button
							onClick={(e) => forgotPassword(e)}
							class="p-[10px] w-full bg-black text-white rounded-sm"
						>
							Reset Password
						</button>
					</div>
				</div>
			</div>
		</main>
	);
}
