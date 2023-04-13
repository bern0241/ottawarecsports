import React from 'react';
import { IconX } from '@tabler/icons-react';

// REFERENCES: https://stackoverflow.com/questions/6975693/amazon-s3-access-image-by-url
// https://flowbite.com/docs/components/buttons/
// https://tabler.io/icons

export default function UserGroupChip({ name, userGroups, setUserGroups }) {
	const removeChip = (e) => {
		e.stopPropagation();
		if (name === 'User') return; //Can't delete user chip!
		if (name === 'Owner') return; //Can't delete owner chip!
		const arr2 = userGroups.filter((item) => item !== name);
		setUserGroups(arr2);
	};

	return (
		<div
			onClick={(e) => removeChip(e)}
			className="cursor-pointer gap-[.1rem] flex justify-between items-center text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-200 font-medium text-sm py-2 px-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ml-[.0rem] border border-gray-300 rounded-md hover:bg-gray-200"
		>
			<div>
				<p type="button">{name}</p>
			</div>
			<div>{(name !== 'User' && name !== 'Owner') && <IconX size={'12px'} />}</div>
		</div>
	);
}
