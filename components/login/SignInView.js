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

	return(
		<div className="flex flex-col w-96 ">
			<div className="mx-1.5 content-center mt-10 ">
				<div className="">
					<OrsLogo/>
				</div>
				<div className="">
					<p className="text-lg sm:text-2xl font-semibold my-5">Sign In</p>
					<form className="flex flex-col w-96 gap-3">
						<TextInput
							id="email"
							type="email"
							placeholder="Email"
							required={true}
							className="w-96 border-2 border-black rounded-md "
						/>
						<PasswordField
											label="Password"
											state={password}
											setState={setPassword}
											showPassword={showPassword}
											setShowPassword={setShowPassword}
										/>
						<div>
							<button
								className="bg-brand-blue-800 h-10 w-full rounded-3xl text-white font-regular mt-3"
								type="button"
							>
								Sign In
							</button>
						</div>
						<div>
							<button
								className="text-brand-blue-800 border-2 border-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular mb-3"
								type="button"
							>
								Enter as a Guest
							</button>
						</div>
					</form>
					<p
								onClick={() => setUiState('forgotPassword')}
								class="font-normal text-base text-right cursor-pointer"
							>
								Forgot your password?
					</p>
					<p class="font-normal text-base cursor-pointer">
						Need an account?
						<Link
						href="/signup"
						className="font-bold">
							Sign Up
						</Link>
					</p>
				</div>
			</div>
		</div>
	)
}
