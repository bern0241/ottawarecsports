/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 */

import React from 'react';

const DropdownInput = ({ options, value, setValue }) => {
	return (
		<select
			value={value}
			onChange={(e) => {
				setValue(e.target.value);
			}}
			className="w-3/4 rounded border border-brand-neutral-300 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
		>
			{options.map((option) => (
				<option value={option}>{option}</option>
			))}
		</select>
	);
};

export default DropdownInput;
