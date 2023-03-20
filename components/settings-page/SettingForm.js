/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Label, Modal, TextInput } from 'flowbite-react';
import React, { useState, useEffect } from 'react';
import ChangeEmailSetup from './ChangeEmail';
import ChangePasswordSetup from './ChangePassword';
import SettingDatePicker from './SettingDatePicker';
import SettingGenderDropDown from './SettingGenderDropDown';
import SettingLocationDropDown from './SettingLocationDropDown';
import SettingPasswordField from './SettingPasswordField';
import { getCurrentUser } from '@/utils/graphql.services';

export default function SettingsForm({ setUiState }) {
	const [emailModal, setEmailModal] = useState(false);
	const [passwordModal, setPasswordModal] = useState(false);
	const [firstName, setFirstName] = useState('');
	const getUserAttributes = async () => {
		const { attributes } = await getCurrentUser();
		console.log(attributes);
	};
	useEffect(() => {
		getUserAttributes();
	}, []);
	return (
		<div>
			<form className="grid lg:grid-cols-2 gap-4">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="firstName" value="First Name" />
					</div>
					<TextInput
						id="firstName"
						type="text"
						placeholder="First Name"
						required={true}
						className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="lastName" value="Last Name" />
					</div>
					<TextInput
						id="lastName"
						type="text"
						placeholder="Last Name"
						required={true}
						className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="" value="Birthdate" />
					</div>
					<SettingDatePicker />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="gender" value="Gender" />
					</div>
					<SettingGenderDropDown />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="phoneNumber" value="Phone Number" />
					</div>
					<TextInput
						id="phoneNumber"
						type="text"
						placeholder="Phone Number"
						required={true}
						className="h-[40px] xl:w--[300px]"
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="location" value="Location" />
					</div>
					<SettingLocationDropDown />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="email" value="Email" />
					</div>
					<TextInput
						id="email"
						type="email"
						placeholder="Email"
						required={true}
						className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="password" value="Password" />
					</div>
					<SettingPasswordField
						placeholder="Password"
						id="password"
						className="h-[40px] xl:w--[300px]"
					/>
				</div>
				<div>
					<button
						className="bg-brand-blue-800 h-[30px] w-full xl:w--[300px] rounded-[50px] text-white font-regular my-4"
						type="button"
						onClick={() => setEmailModal(true)}
					>
						Change Email
					</button>
				</div>
				<div>
					<button
						className="bg-brand-blue-800 h-[30px] w-full xl:w--[300px] rounded-[50px] text-white font-regular my-4"
						type="button"
						onClick={() => setPasswordModal(true)}
					>
						Change Password
					</button>
				</div>
			</form>
			<Modal show={emailModal} popup={true} position="bottom-center">
				<Modal.Body>
					<ChangeEmailSetup setEmailModal={setEmailModal} />
				</Modal.Body>
			</Modal>
			<Modal show={passwordModal} popup={true}>
				<Modal.Body>
					<ChangePasswordSetup setPasswordModal={setPasswordModal} />
				</Modal.Body>
			</Modal>
		</div>
	);
}
