/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, {useState} from 'react';
import Datepicker from "react-tailwindcss-datepicker";

export default function DobDatePicker(birthdateDisplay) {
	const [value, setValue] = useState(null); 
	
	const handleValueChange = (newValue) => {
	console.log("newValue:", newValue); 
	setValue(newValue); 
	birthdateDisplay= value;
	} 

  return (
    <div 
		className="w-96 sm:w-44 border-2 border-black rounded-md ">
      <Datepicker 
			placeholderText="Date of Birth *"
			useRange={false} 
			asSingle={true} 
			value={value}
			onChange={handleValueChange} 
			/>
    </div>
  );
}