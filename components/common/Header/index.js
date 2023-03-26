/**
 * Last updated: 2023-03-20
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import Profile from './Profile';
import HeaderTitle from './Title';
import Image from 'next/image';
import { IconMenu2 } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';

const Header = ({ openMenu, setOpenMenu, laptopSize }) => {
	return (
		<>
		<div className='z-[50]'>
			{!laptopSize && (
				<div className="fixed z-[200] top-[.1rem] left-3">
					<button onClick={(e) => setOpenMenu(!openMenu)} className="visible center mt-4 mr-2">
						{openMenu ? (
							<IconX color="white" size={'2.7rem'} />
						) : (
							<IconMenu2 color="white" size={'2.7rem'} />
						)}
					</button>
				</div>
			)}

			<div className="bg-white">
				<div className="fixed right-0 left-0 h-20 flex flex-row items-center bg-brand-blue-900 top-0 pl-2 pr-12 sm:hidden">
					<div className="w-[3.5em]">
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
				<div className="fixed top-[5rem] sm:top-[0rem] w-full grow px-5 py-2 sm:pl-80 flex flex-row justify-between items-strech border-b border-brand-blue-900/25 top-0 right-0 bg-white">
					<HeaderTitle/>
					<div className="flex-grow"></div>
					<Profile />
				</div>
			</div>
		</div>
		</>
	);
};

export default Header;
