/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Select } from 'flowbite-react';
import React from 'react';

export default function GenderDropDown({ state, setState }) {
	return(
		<div>
			<Select
				onChange={(e) => setState(e.target.value)}
				id="gender"
				required={true}
				className="w-96 sm:w-44 border-2 border-black rounded-md "
				>
				<option color="red" className="text-slate-400" selected disabled>
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
					Prefer not to set
				</option>
			</Select>
		</div>
	)
}
