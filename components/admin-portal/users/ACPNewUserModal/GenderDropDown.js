/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// NOTE: This gender dropdown component is EXCLUSIVELY used for creating new Users in Admin Portal!

import { Select } from 'flowbite-react';
import React from 'react';

export default function GenderDropDown({ state, setState }) {
	return (
		<div className="">
			<Select
				value={state}
				onChange={(e) => setState(e.target.value)}
				id="gender"
				required={true}
				className=""
			>
				<option
					color="red"
					className="text-slate-400"
					defaultValue
					disabled
				></option>
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
