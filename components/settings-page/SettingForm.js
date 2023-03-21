/**
 * Last updated: 2023-03-20
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

export default function SettingsForm({
	setEnterPasswordModal,
	setEnterPasswordModal2,
	setUserAttributes,
}) {
	const [emailModal, setEmailModal] = useState(false);
	const [passwordModal, setPasswordModal] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [gender, setGender] = useState('');
	const [phone, setPhone] = useState('');
	const [location, setLocation] = useState('');
	const [email, setEmail] = useState('');
	const getUserAttributes = async () => {
		const { attributes } = await getCurrentUser();
		setFirstName(attributes.name);
		setLastName(attributes.family_name);
		setBirthDate(attributes.birthdate);
		setGender(attributes.gender);
		setLocation(attributes['custom:location']);
		setEmail(attributes.email);
	};
	// Converts date formats to yyyy-mm-dd
	const customSetBirthDate = (date) => {
		let localeDate = date.toLocaleDateString();
		let dateToArr = localeDate.split('/');
		let year = dateToArr.splice(-1, 1);
		dateToArr.unshift(...year);
		setBirthDate(dateToArr.join('-'));
	};
	useEffect(() => {
		getUserAttributes();
	}, []);
	// Update attributes object in the parent component
	useEffect(() => {
		setUserAttributes({
			name: firstName,
			family_name: lastName,
			birthdate: birthDate,
			email,
			gender,
			'custom:location': location,
		});
	}, [firstName, lastName, birthDate, email, gender, phone, location]);
	return (
		<>
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
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
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
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="" value="Birthdate" />
					</div>
					<SettingDatePicker state={birthDate} setState={customSetBirthDate} />
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="gender" value="Gender" />
					</div>
					<SettingGenderDropDown state={gender} setState={setGender} />
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
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="location" value="Location" />
					</div>
					<SettingLocationDropDown state={location} setState={setLocation} />
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
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
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
						onClick={() => setEnterPasswordModal(true)}
					>
						Change Email
					</button>
				</div>
				<div>
					<button
						className="bg-brand-blue-800 h-[30px] w-full xl:w--[300px] rounded-[50px] text-white font-regular my-4"
						type="button"
						onClick={() => setEnterPasswordModal2(true)}
					>
						Change Password
					</button>
				</div>
			</form>
		</>
	);
}
