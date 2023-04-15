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
		<>
			<Label htmlFor="gender" value="Gender" className="sr-only" />
			<Select
				onChange={(e) => setState(e.target.value)}
				value={state}
				id="gender"
				placeholder="Gender"
				required={true}
				className="w-full placeholder-gray-300"
			>
				<option
					className="placeholder-gray-900 border"
					selected
					value=""
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
		</>
	);
}
