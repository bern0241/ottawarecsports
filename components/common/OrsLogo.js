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
		<header className="flex flex-row gap-2 sm:justify-between items-center">
			<Image
				src="/Logo.svg"
				alt="ORS Logo"
				width={105}
				height={105}
				priority
				className="self-center"
			/>
			<h1 className="text-xl sm:text-3xl font-semibold text-center">
				Ottawa Rec Sports League App
			</h1>
		</header>
	);
};

export default OrsLogo;
