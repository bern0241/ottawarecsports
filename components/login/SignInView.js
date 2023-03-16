/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/router';
// Components
import TextField from '../common/TextField';
import PasswordField from '../common/PasswordField';

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

	return (
		<main className="flex">
			<div className="h-[100vh] flex justify-center items-center px-[1rem]">
				<div className="max-w-[33rem] py-[4rem] px-[3rem] mx-auto translate-y-[-20px]">
					<div className="text-center">
						<Image
							onClick={() => router.push('/')}
							className="m-auto cursor-pointer"
							width={94}
							height={94}
							src="/../public/images/ORS-Logo.png"
							alt="ORS Logo"
						/>
						<h1 className="text-[1rem]">
							<i>Welcome to </i>
							<br />
							<p className="text-[2rem] font-semibold">Ottawa Rec Sports!</p>
						</h1>
						<p className="text-[1rem] mt-2 mb-12">
							Sign in below or{' '}
							<Link
								href="/signup"
								className="text-green-700 cursor-pointer font-bold underline italic"
							>
								Sign Up
							</Link>
						</p>
					</div>
					<form>
						<TextField
							label="Email *"
							id="email"
							type="email"
							state={email}
							setState={setEmail}
						/>
						<PasswordField
							state={password}
							setState={setPassword}
							showPassword={showPassword}
							setShowPassword={setShowPassword}
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
							onClick={handleSubmit}
							class="p-[10px] w-full bg-black text-white rounded-sm"
						>
							Sign In
						</button>

						{/* Forgot Password button */}
						<p
							onClick={() => setUiState('forgotPassword')}
							class="text-[0.9rem] py-3 text-right cursor-pointer"
						>
							Forgot your password?
						</p>
					</form>
				</div>
			</div>
		</main>
	);
}
