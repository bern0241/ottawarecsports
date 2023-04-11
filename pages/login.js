/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES: https://amplify.aws/learn/
// https://www.youtube.com/watch?v=4P2jJRbtTck&t=454s

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useUser } from '@/context/userContext';
// Components
import SignInView from '@/components/login/SignInView';
import ForgotPasswordView from '@/components/login/ForgotPasswordView';
import ForgetPasswordConfirmView from '@/components/login/ForgetPasswordConfirmView';
import ForgotPasswordSubmitView from '@/components/login/ForgotPasswordSubmitView';

export default function Login() {
	const [uiState, setUiState] = useState(null);
	const [email, setEmail] = useState('');
	const [confirmationCode, setConfirmationCode] = useState('');
	const [user, authRoles, setAuthRoles] = useUser();

	useEffect(() => {
		setUiState('signIn');
	}, []);

	return (
		<>
			<Head>
				<title>Ottawa Rec Sports : Login</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/ORS-Logo.png" />
			</Head>

			{uiState === 'signIn' && <SignInView setUiState={setUiState} />}

			{uiState === 'forgotPassword' && (
				<ForgotPasswordView
					email={email}
					setEmail={setEmail}
					setUiState={setUiState}
				/>
			)}
			{uiState === 'emailConfirmation' && (
				<ForgetPasswordConfirmView
					setUiState={setUiState}
					confirmationCode={confirmationCode}
					setConfirmationCode={setConfirmationCode}
				/>
			)}
			{uiState === 'forgotPasswordSubmit' && (
				<ForgotPasswordSubmitView
					email={email}
					uiState={uiState}
					setUiState={setUiState}
					confirmationCode={confirmationCode}
					// setConfirmationCode={setConfirmationCode}
				/>
			)}
		</>
	);
}
