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

export default function PasswordModal({ setEnterPasswordModal2 }) {
	const [passwordModal, setPasswordModal] = useState(false);
	const [password, setPassword] = useState('');

	return (
		<>
			{/* // <!-- Main modal --> */}
			<div
				id="defaultModal"
				tabIndex="-1"
				aria-hidden="true"
				className="fixed top-0 bottom-0 left-0 right-0 z-[30] p-4 max-w-[42rem] mx-auto w-full h-[40rem] sm:overflow-visible overflow-auto"
			>
				<div className="relative w-full h-full">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 pb-0 border-b dark:border-gray-600">
							<h3 className="text-lg sm:text-2xl my-5 font-semibold text-gray-900 dark:text-white">
								Enter You Password
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-6 space-y-6">
							<SettingPasswordField
								id="currentPassword2"
								placeholder="Password"
								className="h-[40px] w-full"
								state={password}
								setState={setPassword}
							/>
						</div>
						{/* <!-- Modal footer --> */}
						<div className="flex justify-center gap-3">
							<div>
								<button
									className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
									type="button"
									onClick={() => setEnterPasswordModal2(false)}
								>
									Cancel
								</button>
							</div>
							<div>
								<button
									className="bg-brand-blue-800 h-[30px] w-[90px] rounded-[50px] text-white font-regular my-4"
									type="button"
									onClick={() => {
										// setEnterPasswordModal2(false)
										setPasswordModal(true);
									}}
								>
									Ok
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => setEnterPasswordModal2(false)}
				className="z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>

			{passwordModal && (
				<ChangePasswordSetup
					oldPassword={password}
					setPasswordModal={setPasswordModal}
				/>
			)}
		</>
	);
}
