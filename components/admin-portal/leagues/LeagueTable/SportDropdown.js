/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react'

export default function SportDropdown({ sport, setSport }) {
    const [openModal, setOpenModal] = useState(false);

    // Designed for switching sports, thus changes the leagues shown.
    const switchSport = async (e, _sport) => {
        e.preventDefault();
        setSport(_sport);
        setOpenModal(false);
    }

  return (
    <>
    <button onClick={(e) => setOpenModal(!openModal)} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="absolute top-[10px] ml-[6rem] border-[1px] border-gray-600 text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">{sport}<svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
    
    {/* <!-- Dropdown menu --> */}
    {openModal && (
        <div id="dropdown" className="absolute mt-4 z-[250] ml-[3rem] border-gray-600 border bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li onClick={(e) => switchSport(e, 'Soccer')} >
                <p class="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Soccer</p>
            </li>
            <li onClick={(e) => switchSport(e, 'Volleyball')} >
                <p class="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Volleyball</p>
            </li>
            <li onClick={(e) => switchSport(e, 'Multi-Sport')} >
                <p class="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Multi-Sport</p>
            </li>
            <li onClick={(e) => switchSport(e, 'Pickup-Sport')} >
                <p class="cursor-pointer first-line:block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Pickup-Sport</p>
            </li>
            </ul>
        </div>
    )}
    {/* Background of modal - Hides modal when clicked */}
    {openModal && (
        <div onClick={(e) => setOpenModal(false)} class='z-[200] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]' />
    )}
</>
  )
}
