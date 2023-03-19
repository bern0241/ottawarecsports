/**
 * Last updated: 2023-03-18
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import { IconEyeOff } from '@tabler/icons-react';
import { TextInput } from 'flowbite-react';

export default function SettingPasswordField() {
	const [showPassword, setShowPassword] = useState(false);

	const showPasswordToggle = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<div className="relative w-[300px] border-no">
      <TextInput
        type={showPassword ? 'text' : 'password'}
        name="password"
        id="password"
        className="h-[40px] w-[300px]"
        placeholder="Password"
        required={true}
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
