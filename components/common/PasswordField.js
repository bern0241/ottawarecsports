/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import { IconEyeOff } from '@tabler/icons-react';

export default function PasswordField({ label, state, setState }) {
	const [showPassword, setShowPassword] = useState(false);

	const showPasswordToggle = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<div className="relative">
			<input
				value={state}
				onChange={(e) => setState(e.target.value)}
				type={showPassword ? 'text' : 'password'}
				name="password"
				id="password"
				className="w-96 border border-black rounded-md "
				placeholder={label}
				required
			/>
			<div
				onClick={(e) => showPasswordToggle(e)}
				className="absolute right-[.5rem] top-[.4rem] cursor-pointer"
			>
				{showPassword ? <IconEyeOff size="32px" /> : <IconEye size="32px" />}
			</div>
		</div>
	);
}
