/**
 * Last updated: 2023-03-19
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// NOTE: This location dropdown component is EXCLUSIVELY used for creating new Users in Admin Portal!

import { Select } from 'flowbite-react';
import React from 'react';

export default function LocationDropDown({ state, setState }) {
	return (
		<div>
			<Select
				value={state}
				onChange={(e) => setState(e.target.value)}
				id="location"
				required={true}
				className=""
			>
				<option color="red" selected disabled>
					
				</option>
				<option className="text-black" value="East/Orleans area">
					East/Orleans area
				</option>
				<option className="text-black" value="East/Vanier area">
					East/Vanier area
				</option>
				<option className="text-black" value="West/Westboro to Greenbank">
					West/Westboro to Greenbank
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
