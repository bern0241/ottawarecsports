/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { Label, Select } from 'flowbite-react';
import React from 'react';

export default function LocationDropDown({ state, setState }) {
	return (
		<div>
			<Label htmlFor="location" value="Location" className="sr-only" />
			<Select
				onChange={(e) => setState(e.target.value)}
				value={state}
				id="location"
				placeholder="Location"
				required={true}
				className="w-80 sm:w-96"
			>
				<option value="" selected defaultValue>
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
