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
		<header className="flex flex-row justify-center items-center pr-6 pl-6 gap-0.5">
			<Image src="/Logo.svg" alt="ORS Logo" width={90} height={90} priority />
			<h1 className="text-2xl md:text-3xl font-semibold text-center">
				Ottawa Rec Sports League App
			</h1>
		</header>
	);
};

export default OrsLogo;
