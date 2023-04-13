/**
 * Last updated: 2023-04-12
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com> (resolved console errors/warnings)
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES:
// https://docs.amplify.aws/lib/auth/manageusers/q/platform/js/
// https://flowbite.com/docs/forms/input-field/

import React, { useState, useEffect } from 'react';
import SettingPasswordField from './SettingPasswordField';
import { Auth } from 'aws-amplify';

export default function PasswordModal({ passwordModal, setPasswordModal }) {
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [message, setMessage] = useState(null);
	
	const changePassword = async () => {
		Auth.currentAuthenticatedUser()
		.then((user) => {
			return Auth.changePassword(user, oldPassword, newPassword);
		})
		.then((data) => {
			setMessage({status: 'success', message: 'You password has been successfully changed.'});
			const timer = setTimeout(() => {
				setPasswordModal(false);
            }, 2500);
            return () => clearTimeout(timer);
		})
		.catch((err) => {
			setMessage({status: 'error', message: err.message});
			console.log(err);
		});
	};

	// Hides display message after 5 seconds
    useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
}, [message])

	return (
		<>
			{/* // <!-- Main modal --> */}
			<div
				id="defaultModal"
				tabIndex="-1"
				aria-hidden="true"
				className="fixed top-[10rem] bottom-0 left-0 right-0 z-[150] p-4 max-w-[33rem] mx-auto w-full h-[26rem]"
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
									id="oldPassword"
									placeholder="Old Password"
									className="h-[40px] w-full"
									state={oldPassword}
									setState={setOldPassword}
								/>
								<SettingPasswordField
									id="newPassword"
									placeholder="New Password"
									className="h-[40px] w-full"
									state={newPassword}
									setState={setNewPassword}
								/>
								{message && (<p id="standard_error_help" className={`mt-4 text-center text-sm ${message.status === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}><span className="font-medium">{message.message}</span></p>)}
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
									className="bg-brand-blue-800 px-4 py-2 rounded-[5px] text-white font-regular my-4"
									type="button"
									onClick={changePassword}
								>
									Update Password
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => setPasswordModal(false)}
				className="z-[125] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
