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
	const [enterPasswordModal, setEnterPasswordModal] = useState(false);
	const [enterPasswordModal2, setEnterPasswordModal2] = useState(false);
	return (
		<div className="flex items-center">
			<SettingsForm
				setEnterPasswordModal={setEnterPasswordModal}
				setEnterPasswordModal2={setEnterPasswordModal2}
				setUserAttributes={setUserAttributes}
			/>
			{/* MODALS */}
			<div>
				{/* Email Change */}
				{enterPasswordModal && (
					<EmailModal
						setEnterPasswordModal={setEnterPasswordModal}
						saveAttributes={saveAttributes}
						setUserAttributes={setUserAttributes}
					/>
				)}
				{/* Password Change */}
				{enterPasswordModal2 && (
					<PasswordModal setEnterPasswordModal2={setEnterPasswordModal2} />
				)}
			</div>
		</div>
	);
}
