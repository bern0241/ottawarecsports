/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Select } from 'flowbite-react';
import React from 'react';

export default function SettingGenderDropDown({ state, setState }) {
	return (
		<div>
			<Select
				onChange={(e) => setState(e.target.value)}
				id="gender"
				required={true}
				className="h-[40px] w-[300px] sm:w-[230px] xl:w-[300px]"
			>
				<option color="red" className="text-slate-400" selected disabled>
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