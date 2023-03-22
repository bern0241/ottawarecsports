/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com> (resolved console errors/warnings)
 */

import React, { useState } from 'react';
import OtpField from 'react-otp-field';

export default function EmailVerification({ setVerificationModal }) {
	const [confirmationCode, setConfirmationCode] = useState('');
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
					<div className="relative bg-white shadow dark:bg-gray-700 sm:pb-[0rem] pb-[7rem]">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 pb-0 border-b dark:border-gray-600">
							<h3 className="text-lg sm:text-2xl my-5 font-semibold text-gray-900 dark:text-white">
								Enter Your Confirmation Code
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-6 space-y-6 text-center">
							<p>Enter the confirmation code that was sent to your email.</p>

							<div className="flex justify-center">
								<OtpField
									value={confirmationCode}
									onChange={setConfirmationCode}
									numInputs={6}
									onChangeRegex={/^([0-9]{0,})$/}
									autoFocus
									separator={<span> </span>}
									inputProps={{
										className:
											'otp-field__input w-12 h-16 border border-black rounded-md pl-5',
										disabled: false,
									}}
									classNames="flex flex-row gap-3"
								/>
							</div>

							<p className="text-center underline cursor-pointer text-[.92rem] text-brand-blue-900">
								Resend Verification Code
							</p>
						</div>
						{/* <!-- Modal footer --> */}
						<div className="flex justify-center gap-3">
							<div>
								<button
									className="text-brand-blue-800 h-10 w-full rounded-3xl bg-white font-regular mt-3"
									type="button"
									onClick={() => setVerificationModal(false)}
								>
									Cancel
								</button>
							</div>
							<div>
								<button
									className="bg-brand-blue-800 h-10 w-[90px] rounded-3xl text-white font-regular mt-3"
									type="button"
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				onClick={(e) => setEmailModal(false)}
				className="z-[20] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>
		</>
	);
}
