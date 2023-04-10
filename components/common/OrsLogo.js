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
		<div className="flex flex-wrap gap-4 justify-center mx-auto items-center mb-1">
			<div className=" w-auto h-auto">
			<Image
				src="/Logo.svg"
				alt="ORS Logo"
				width={85}
				height={85}
				priority
				className="self-center"
			/>
			</div>
			<p className="text-[1.34rem] font-semibold text-center mr-[1.5rem]">
				Ottawa Rec Sports <br />
				League App
			</p>
		</div>
	);
};

export default OrsLogo;
