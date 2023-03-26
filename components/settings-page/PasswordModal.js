/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com> (resolved console errors/warnings)
 */

import React, { useState } from 'react';
import ChangePasswordSetup from './ChangePassword';
import SettingPasswordField from './SettingPasswordField';
import { changeUserPassword } from '@/utils/graphql.services';

export default function PasswordModal({ passwordModal, setPasswordModal }) {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const changePassword = async () => {
		checkPasswords();
		if (errorMessage !== '') return;
		const resp = await changeUserPassword(oldPassword, newPassword);
		if (resp === 'SUCCESS') return setPasswordModal(false);
		setErrorMessage('Something went wrong');
	};
	const checkPasswords = () => {
		if (newPassword !== confirmPassword)
			return setErrorMessage('Passwords do not match');
		// reference for checking special characters
		// Answer by Magus
		// https://stackoverflow.com/a/32311200
		const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
		if (newPassword.length < 8 || !format.test(newPassword))
			return setErrorMessage(
				'Must be 8 or more characters and contain at least 1 number and 1 special character.'
			);
		setErrorMessage('');
	};
	return (
		<>
			{/* // <!-- Main modal --> */}
			<div
				id="defaultModal"
				tabIndex="-1"
				aria-hidden="true"
				className="fixed top-[10rem]  bottom-0 left-0 right-0 z-[30] p-4 max-w-[33rem] mx-auto w-full h-[26rem]"
			>
				<div className="relative w-full h-full">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white shadow dark:bg-gray-700 rounded-md">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 pb-0 border-b dark:border-gray-600">
							<h3 className="text-md mb-3 font-semibold text-gray-900 dark:text-white">
								Change Password
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-6 space-y-6">
							<div className="flex flex-col gap-5">
								<SettingPasswordField
									id="newPassword"
									placeholder="New Password"
									className="h-[40px] w-full"
									state={newPassword}
									setState={setNewPassword}
								/>
								<SettingPasswordField
									id="confirmPassword"
									placeholder="Confirm Password"
									className="h-[40px] w-full"
									state={confirmPassword}
									setState={setConfirmPassword}
								/>
								<p className="text-red-700 text-xs">{errorMessage}</p>
							</div>
						</div>
						{/* <!-- Modal footer --> */}
						<div className="flex justify-center gap-3 pb-2">
							<div>
								<button
									className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
									type="button"
									onClick={() => setPasswordModal(false)}
								>
									Cancel
								</button>
							</div>
							<div>
								<button
									className="bg-brand-blue-800 h-[30px] w-[90px] rounded-[50px] text-white font-regular my-4"
									type="button"
									onClick={changePassword}
								>
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => setPasswordModal(false)}
				className="z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
