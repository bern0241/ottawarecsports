/**
 * Last updated: 2023-03-22
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com> (resolved console errors/warnings)
 */

 import { Modal, TextInput, Label } from 'flowbite-react';
 import React, { useState } from 'react';
 import EmailVerification from './EmailVerification';
 import {
	 changeUserAttributes,
	 verifyUserAttributes,
 } from '@/utils/graphql.services';
 import { useRouter } from 'next/router';

export default function EmailModal({ emailModal, setEmailModal }) {

	const router = useRouter();
	const [currentEmail, setCurrentEmail] = useState('');
	const [confirmEmail, setConfirmEmail] = useState('');
	const [verificationModal, setVerificationModal] = useState(false);

	const updateUserEmail = async () => {
		const resp = changeUserAttributes({
			email: confirmEmail,
		});
	};
	const confirmNewEmail = async (confirmationCode) => {
		const resp = await verifyUserAttributes(confirmationCode);
		if (resp === 'SUCCESS') {
			setVerificationModal(false);
			router.reload();
		}
	};
	return (
		<>
			{/* // <!-- Main modal --> */}
			<div
				id="defaultModal"
				tabIndex="-1"
				aria-hidden="true"
				className="fixed top-[10rem] left-0 right-0 z-[150] max-w-[33rem] mx-auto w-full h-[20rem]"
			>
				<div className="relative w-full h-full p-5">
					{/* <!-- Modal content --> */}
					<div className="relative bg-white shadow dark:bg-gray-700 sm:pb-[0rem] rounded-md">
						{/* <!-- Modal header --> */}
						<div className="flex items-start justify-between p-4 pb-0 border-b dark:border-gray-600">
							<h3 className="text-md mb-3 font-semibold text-gray-900 dark:text-white">
								Change Email
							</h3>
						</div>
						{/* <!-- Modal body --> */}
						<div className="p-6 space-y-6">
							<div className="flex flex-col gap-5">
								<div>
									<div className="mb-2 block">
										<Label htmlFor="email" value="Current Email" />
									</div>
									<TextInput
										id="email"
										type="email"
										placeholder="Current Email"
										required={true}
										className="h-[40px] w-full"
										value={currentEmail}
										onChange={(e) => setCurrentEmail(e.target.value)}
									/>
								</div>
								<div>
									<div className="mb-2 block">
										<Label htmlFor="email" value="New Email" />
									</div>
									<TextInput
										id="confirmEmail"
										type="email"
										placeholder="Confirm Email"
										required={true}
										className="h-[40px] w-full"
										value={confirmEmail}
										onChange={(e) => setConfirmEmail(e.target.value)}
									/>
								</div>
							</div>
						</div>
						{/* <!-- Modal footer --> */}
						<div className="flex justify-center gap-3 pb-2">
							<div>
								<button
									className="bg-white h-[30px] w-[90px] rounded-[50px] text-brand-blue-800 font-regular my-4"
									type="button"
									onClick={() => setEmailModal(false)}
								>
									Cancel
								</button>
							</div>
							<div>
								<button
									className="bg-brand-blue-800 h-[30px] w-[90px] rounded-[50px] text-white font-regular my-4"
									type="button"
									onClick={() => {
										updateUserEmail();
										setVerificationModal(true);
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
				onClick={(e) => setEmailModal(false)}
				className="z-[125] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
			/>

			{verificationModal && (
				<EmailVerification
					setVerificationModal={setVerificationModal}
					confirmNewEmail={confirmNewEmail}
				/>
			)}
		</>
	);
}