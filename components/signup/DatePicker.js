/**
 * Last updated: 2023-03-11
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react';

const DatePicker = ({ birthdateDisplay, isOpen, setIsOpen }) => {
	return (
		<>
			<div className="flex flex-col">
				<div className="flex flex-row-reverse gap-3">
					<button
						onClick={() => setIsOpen(true)}
						type="button"
						class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
					>
						Date of Birth *
					</button>

					<div class="relative z-[-100]">
						{birthdateDisplay ? (
							<>
								<p
									type="text"
									id="birthdatedisplay"
									className="text-right block py-2.5 px-0 w-full text-[.82rem] text-gray-900 bg-transparent border-0 border-b-2 border-gray-100 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
								>
									{birthdateDisplay}
								</p>
							</>
						) : (
							<>
								<p
									type="text"
									id="birthdatedisplay"
									className="text-right block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
									placeholder=" "
								></p>
							</>
						)}
					</div>
				</div>
				<div>
					{false && (
						<p
							id="standard_error_help"
							className="text-center mt-2 text-xs text-red-600 dark:text-red-400"
						>
							<span className="font-medium">Please select a birth date.</span>
						</p>
					)}
				</div>
			</div>
			{/* CRAPY DATE PICKER */}
			{/* <DatePicker
    colorScheme='#008a19'
        onChange={(e) => setBirthdate(e)}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultValue={new Date(2022, 8, 8)}
        minDate={new Date(1932, 3, 20)}
        maxDate={currentDate ? ( new Date(currentDate.year, currentDate.month, currentDate.day)) : new Date(2022, 2, 13)}
        headerFormat='DD, MM dd'
    /> */}
		</>
	);
};

export default DatePicker;
