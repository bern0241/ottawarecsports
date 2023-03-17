/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import Image from 'next/image';

const OrsLogo = () => {
	return (
		<div className="flex flex-wrap gap-5 sm:justify-between items-center">
			<Image
				src="/Logo.svg"
				alt="ORS Logo"
				width={90}
				height={90}
				priority
				className="self-center"
			/>
			<p className="text-xl sm:text-3xl font-semibold text-center ">
				Ottawa Rec Sports <br />
				League App
			</p>
		</div>
	);
};

export default OrsLogo;
