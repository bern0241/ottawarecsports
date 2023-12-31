/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Select } from 'flowbite-react';
import React from 'react';

export default function SettingLocationDropDown({ state, setState }) {
	return (
		<div>
			<Select
				onChange={(e) => setState(e.target.value)}
				value={state}
				id="location"
				required={true}
				className="h-[40px] w-full"
			>
				<option color="red" defaultValue disabled>
					Location *
				</option>
				<option className="text-black" value="East/Orleans area">
					East/Orleans area
				</option>
				<option className="text-black" value="East/Vanier area">
					East/Vanier area
				</option>
				<option className="text-black" value="Westboro">
					Westboro
				</option>
				<option className="text-black" value="Nepean/Barrhaven">
					Nepean/Barrhaven
				</option>
				<option className="text-black" value="West/Kanata">
					West/Kanata
				</option>
				<option className="text-black" value="Downtown/Central">
					Downtown/Central
				</option>
				<option className="text-black" value="Central/Hull">
					Central/Hull
				</option>
				<option className="text-black" value="South/Billings">
					South/Billings
				</option>
				<option className="text-black" value="South/South Keys">
					South/South Keys
				</option>
				<option className="text-black" value="North Gatineau">
					North Gatineau
				</option>
				<option className="text-black" value="Other">
					Other
				</option>
			</Select>
		</div>
	);
}
