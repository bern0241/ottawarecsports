/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import { IconEye } from '@tabler/icons-react';
import { IconEyeOff } from '@tabler/icons-react';

export default function PasswordField({
	state,
	setState,
	showPassword,
	setShowPassword
}) {
	const showPasswordToggle = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<div>
				<input
					value={state}
					onChange={(e) => setState(e.target.value)}
					type={showPassword ? 'text' : 'password'}
					name="password"
					id="password"
					className="w-96 border-2 border-black rounded-md "
					placeholder="Password "
					required
				/>
		</div>
	);
}
