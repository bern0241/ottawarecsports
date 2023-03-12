/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react';

export default function GenderDropDown({ state, setState }) {
	return (
		<div className="">
			<label for="underline_select" className="sr-only">
				Underline select
			</label>
			<select
				onChange={(e) => setState(e.target.value)}
				id="underline_select"
				className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
			>
				<option color="red" selected disabled>
					Please choose gender *
				</option>
				<option className="text-black" value="Non-Binary">
					Non-Binary
				</option>
				<option className="text-black" value="Male">
					Male
				</option>
				<option className="text-black" value="Female">
					Female
				</option>
				<option className="text-black" value="N/A">
					Prefer not to say
				</option>
			</select>
			{false && (
				<p
					id="standard_error_help"
					className="mt-2 text-xs text-red-600 dark:text-red-400"
				>
					<span className="font-medium">Please select a gender.</span>
				</p>
			)}
		</div>
	);
}
