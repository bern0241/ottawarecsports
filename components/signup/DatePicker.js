/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';

export default function DobDatePicker({ state, setState }) {

	return (
		<div className="w-96 sm:w-44 border-2 border-black rounded-md ">
			<Datepicker
				placeholderText="Date of Birth *"
				useRange={false}
				asSingle={true}
				onChange={(e) => setState(e.target.value)}
			/>
		</div>
	);
}
