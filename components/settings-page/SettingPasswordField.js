/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import { IconEye } from '@tabler/icons-react';
import { IconEyeOff } from '@tabler/icons-react';
import { Label, TextInput } from 'flowbite-react';

export default function SettingPasswordField({
	id,
	placeholder,
	className,
	state = '',
	autoFocus=false,
	setState = () => {},
}) {
	const [showPassword, setShowPassword] = useState(false);

	const showPasswordToggle = (e) => {
		e.preventDefault();
		setShowPassword(!showPassword);
	};

	return (
		<div className="relative border-no">
			<div className="mb-2 block">
				<Label htmlFor={id} value={placeholder} />
			</div>
			<TextInput
				autoFocus={autoFocus}
				type={showPassword ? 'text' : 'password'}
				name="password"
				id={id}
				className={className}
				placeholder={placeholder}
				required={true}
				value={state}
				onChange={(e) => setState(e.target.value)}
			/>
			<button
				onClick={(e) => showPasswordToggle(e)}
				className="absolute right-[.5rem] top-[2.2rem] cursor-pointer"
			>
				{showPassword ? <IconEye size="32px" /> : <IconEyeOff size="32px" />}
			</button>
		</div>
	);
}
