/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES:
// https://tabler.io/icons
// https://flowbite.com/docs/forms/input-field/

import React, { useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import { IconEyeOff } from '@tabler/icons-react';

export default function TempPasswordField({ label, state, setState }) {
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
				type={`${showPassword ? 'text' : 'password'}`}
				id="password"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
			/>
			<div
				onClick={(e) => showPasswordToggle(e)}
				className="absolute right-[.5rem] top-[.5rem] cursor-pointer"
			>
				{showPassword ? <IconEyeOff size="24px" /> : <IconEye size="24px" />}
			</div>
		</div>
	);
}
