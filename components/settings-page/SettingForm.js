/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Son Tran <tran0460@algonquinlive.com>
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
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import ValidatePhoneNumber from 'validate-phone-number-node-js';

export default function SettingsForm({
	setEmailModal,
	setPasswordModal,
	setUserAttributes,
}) {
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
		setPhone(attributes.phone_number);
		setLocation(attributes['custom:location']);
		setEmail(attributes.email);
	};
	// Converts date formats to yyyy-mm-dd
	const customSetBirthDate = (date) => {
		setBirthDate(date.toISOString().split('T')[0]);
		// let stringDate = new Date(date).toDateString();
		// setBirthDate(stringDate.substring(stringDate.indexOf(' ') + 1));
		return;
	};

	useEffect(() => {
		getUserAttributes();
	}, []);
	// Update attributes object in the parent component
	useEffect(() => {
		if (phone === undefined) {
			setPhone('');
		}
		setUserAttributes({
			name: firstName,
			family_name: lastName,
			birthdate: birthDate,
			gender,
			'custom:location': location,
			phone_number: phone,
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
						className="h-[40px] w-full"
						// className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
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
						className="h-[40px] w-full"
						// className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="date" value="Birthdate" />
					</div>
					{/* <SettingDatePicker state={birthDate} setState={setBirthDate} /> */}
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
					<PhoneInput
						id="phoneNumber"
						placeholder=""
						defaultCountry="CA"
						value={phone}
						onChange={setPhone}
						style={{
							paddingLeft: '10px',
							opacity: '100%',
							borderRadius: '9px',
							borderWidth: '1px',
						}}
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
						className="h-[40px] w-full"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						readOnly
						disabled
					/>
				</div>
				<div>
					{/* <SettingPasswordField
						placeholder="Password"
						id="password"
						className="h-[40px] w-full"
					/> */}
				</div>
				<div className="my-2 lg:my-3">
					<button
						className="bg-brand-blue-800 h-[36px] w-full rounded-[10px] text-white font-regular"
						type="button"
						onClick={() => setEmailModal(true)}
					>
						Change Email
					</button>
				</div>
				<div className="mb-1 lg:my-3">
					<button
						className="bg-brand-blue-800 h-[36px] w-full xl:w--[300px] rounded-[10px] text-white font-regular"
						type="button"
						onClick={() => setPasswordModal(true)}
					>
						Change Password
					</button>
				</div>
			</form>
		</>
	);
}
