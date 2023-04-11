/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Label, Select } from 'flowbite-react';
import React from 'react';

export default function GenderDropDown({ state, setState }) {
	return (
		<div>
			<Label htmlFor="gender" value="Gender" className="sr-only" />
			<Select
				onChange={(e) => setState(e.target.value)}
				id="gender"
				placeholder="Gender"
				required={true}
				className="w-80 sm:w-96 placeholder-gray-300"
			>
				<option
					color="red"
					className="placeholder-gray-900 border"
					selected
					disabled
				>
					Gender *
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
					Prefer not to set
				</option>
			</Select>
		</div>
	);
}
