/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import Image from 'next/image';
import { IconMenu2 } from '@tabler/icons-react';

const HeadLayout = (props) => {
	function handleClick() {
		props.showMenu(false);
	}
	return (
		<div className="w-full h-20 flex flex-row items-center bg-brand-blue-900 top-0 right-0 pl-2 pr-12 sm:hidden">
			<div className="self-start">
				<button className="visible center mt-4 mr-2" onClick={handleClick}>
					<IconMenu2 color="white" size={'3em'} />
				</button>
			</div>
			<Image
				src="/Logo.svg"
				alt="ORS Logo"
				width={66}
				height={66}
				priority
				className="mx-auto"
			/>
		</div>
	);
};

export default HeadLayout;
