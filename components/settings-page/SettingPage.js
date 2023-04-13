/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import EmailModal from './EmailModal';
import PasswordModal from './PasswordModal';
import SettingsForm from './SettingForm';

export default function SettingsPage({ setUserAttributes, saveAttributes }) {
	const [emailModal, setEmailModal] = useState(false);
	const [passwordModal, setPasswordModal] = useState(false);
	return (
		<div className="flex items-center w-full">
			<SettingsForm
				setEmailModal={setEmailModal}
				setPasswordModal={setPasswordModal}
				setUserAttributes={setUserAttributes}
			/>
			{/* MODALS */}
			<div>
				{/* Email Change */}
				{emailModal && (
					<EmailModal emailModal={emailModal} setEmailModal={setEmailModal} />
				)}
				{/* Password Change */}
				{passwordModal && (
					<PasswordModal
						passwordModal={passwordModal}
						setPasswordModal={setPasswordModal}
					/>
				)}
			</div>
		</div>
	);
}
