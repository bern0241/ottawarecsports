/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import Image from 'next/image';

const OrsLogo = () => {
	return (
		<header className="flex flex-row justify-center items-center gap-0.5 sm:px-px sm:gap-1">
			<Image
				src="/Logo.svg"
				alt="ORS Logo"
				width={90}
				height={90}
				priority
				className="sm:w-max"
			/>
			<h1 className="text-2xl sm:text-3xl font-semibold text-center">
				Ottawa Rec Sports League App
			</h1>
		</header>
	);
};

export default OrsLogo;
