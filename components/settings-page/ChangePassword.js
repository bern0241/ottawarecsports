/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import SettingPasswordField from './SettingPasswordField';

export default function ChangePasswordSetup({ setPasswordModal }) {
	return (
		<>
			{/* // <!-- Main modal --> */}
			<div
				id="defaultModal"
				tabindex="-1"
				aria-hidden="true"
				class="fixed top-0 bottom-0 left-0 right-0 z-[30] p-4 max-w-[42rem] mx-auto w-full h-[40rem] sm:overflow-visible overflow-auto"
			>
				<div class="relative w-full h-full">
					{/* <!-- Modal content --> */}
					<div class="relative bg-white shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem] ">
						{/* <!-- Modal header --> */}
						<div class="flex items-start justify-between p-4 pb-0 border-b dark:border-gray-600">
							<h3 class="text-lg sm:text-2xl my-5 font-semibold text-gray-900 dark:text-white">
								Change Password
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<div class="p-6 space-y-6">
							<div className="flex flex-col gap-5">
								<SettingPasswordField
									id="newPassword"
									placeholder="New Password"
									className="h-[40px] w-full"
								/>
								<SettingPasswordField
									id="confirmPassword"
									placeholder="Confirm Password"
									className="h-[40px] w-full"
								/>
							</div>
						</div>
						{/* <!-- Modal footer --> */}
						<div className="flex justify-center gap-3">
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
				class="z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
