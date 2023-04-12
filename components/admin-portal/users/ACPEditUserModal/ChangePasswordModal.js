/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES:
// https://flowbite.com/docs/components/buttons/

import React from 'react';

export default function ChangePasswordModal({ setUiState }) {
	// Change Password Button used for switching the UI State to "changePassword"
	return (
		<button
			onClick={() => setUiState('changePassword')}
			type="button"
			className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 w-full text-center"
		>
			Change Password
		</button>
	);
}
