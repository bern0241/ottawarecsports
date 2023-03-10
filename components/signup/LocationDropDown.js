/**
 * Last updated: 2023-03-10
 * 
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react'

export default function LocationDropDown({ state, setState }) {
  return (
    <div>
        <div className="relative z-0 my-6">
        <label for="underline_select" className="sr-only">Underline select</label>
        <select onChange={(e) => setState(e.target.value)} id="underline_select" className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
            <option color='red' selected disabled>Which area of Ottawa/Gatineau do you live in?</option>
            <option className='text-black' value="East/Orleans area">East/Orleans area</option>
            <option className='text-black' value="East/Vanier area">East/Vanier area</option>
            <option className='text-black' value="West/Westboro to Greenbank">West/Westboro to Greenbank</option>
            <option className='text-black' value="West/Kanata">West/Kanata</option>
            <option className='text-black' value="Downtown/Central">Downtown/Central</option>
            <option className='text-black' value="Central/Hull">Central/Hull</option>
            <option className='text-black' value="South/Billings">South/Billings</option>
            <option className='text-black' value="South/South Keys">South/South Keys</option>
            <option className='text-black' value="North Gatineau">North Gatineau</option>
            <option className='text-black' value="Other">Other</option>
        </select>
        </div>
        {false && (<p id="standard_error_help" className="relative bottom-[1.1rem] text-xs text-red-600 dark:text-red-400"><span className="font-medium">Please select a location.</span></p>)}
    </div>
  )
}
