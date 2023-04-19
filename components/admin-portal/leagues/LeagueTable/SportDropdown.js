/**
 * Last updated: 2023-04-08
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

// REFERENCES: https://flowbite.com/docs/components/dropdowns/
// https://flowbite.com/docs/components/modal/
// https://flowbite.com/docs/components/buttons/
// https://flowbite.com/docs/components/tables/

import React, { useState, useEffect } from 'react';

export default function SportDropdown({ sport, setSport, listLeaguesFunc }) {
	const [openModal, setOpenModal] = useState(false);

	const switchSport = async (e, _sport) => {
		e.preventDefault();
		setSport(_sport);
		setOpenModal(false);
	};

	return (
		<>
			<button
				onClick={(e) => setOpenModal(!openModal)}
				id="dropdownDefaultButton"
				data-dropdown-toggle="dropdown"
				className="absolute top-[10px] ml-[6rem] border-[1px] border-gray-600 text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:hover:bg-blue-700 dark:focus:ring-blue-800"
				type="button"
			>
				{sport}
				<svg
					className="w-4 h-4 ml-2"
					aria-hidden="true"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="M19 9l-7 7-7-7"
					></path>
				</svg>
			</button>

			{/* <!-- Dropdown menu --> */}
			{openModal && (
				<div
					id="dropdown"
					className="absolute mt-4 z-[250] ml-[3rem] border-gray-600 border bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
				>
					<ul
						className="py-2 text-sm text-gray-700 dark:text-gray-200"
						aria-labelledby="dropdownDefaultButton"
					>
						<li onClick={(e) => switchSport(e, 'Soccer')}>
							<p className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
								Soccer
							</p>
						</li>
						{/* <li onClick={(e) => switchSport(e, 'Volleyball')}>
							<p className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
								Volleyball
							</p>
						</li>
						<li onClick={(e) => switchSport(e, 'Multi-Sport')}>
							<p className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
								Multi-Sport
							</p>
						</li>
						<li onClick={(e) => switchSport(e, 'Pickup-Sport')}>
							<p className="cursor-pointer first-line:block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
								Pickup-Sport
							</p>
						</li> */}
					</ul>
				</div>
			)}
			{openModal && (
				<div
					onClick={(e) => setOpenModal(false)}
					className="z-[200] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
				/>
			)}
		</>
	);
}
