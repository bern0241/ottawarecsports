/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Link from 'next/link';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/router';
import { TextInput } from 'flowbite-react';
// Components
import PasswordField from '../common/PasswordField';
import OrsLogo from '../common/OrsLogo';

export default function SignInView({ setUiState }) {
	const [user, setUser] = useUser();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [message, setMessage] = useState(null);
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await Auth.signIn({
				username: email,
				password: password,
			});
			// Succession
			router.push('/');
		} catch (error) {
			console.error(error);
			setMessage({ status: 'error', message: error.message });
		}
	};

	const handleEnterAsGuest = async (e) => {
		router.push('/');
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between align-middle bg-white h-screen">
			<div>
				<div className="w-80 h-screen bg-brand-blue-900 top-0 left-0 hidden sm:block"></div>
				<div className="w-full h-20 bg-brand-blue-900 top-0 right-0 sm:hidden"></div>
			</div>
			<div className="flex flex-col pb-5 place-items-center w-full h-full">
				<div className="mx-1.5 content-center mt-10 w-96 sm:mt-40">
					<div className="">
						<OrsLogo />
					</div>
					<div className="">
						<p className="text-lg sm:text-2xl font-semibold my-5">Sign In</p>
						<form className="flex flex-col w-96 gap-3">
							<TextInput
								id="email"
								type="email"
								placeholder="Email"
								onChange={(e) => setEmail(e.target.value)}
								required={true}
								className="w-96 border border-black rounded-md "
							/>
							<PasswordField
								label="Password"
								state={password}
								setState={setPassword}
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
									onClick={handleSubmit}
								>
									Sign In
								</button>
							</div>
							<div>
								<button
									className="text-brand-blue-800 border border-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular mb-3"
									type="button"
									onClick={() => handleEnterAsGuest()}
								>
									Enter as a Guest
								</button>
							</div>
						</form>
						<p
							onClick={() => setUiState('forgotPassword')}
							className="font-normal text-base text-right cursor-pointer"
						>
							Forgot your password?
						</p>
						<p className="font-normal text-base cursor-pointer">
							Need an account?{" "}
							<Link href="/signup" className="font-bold">
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
