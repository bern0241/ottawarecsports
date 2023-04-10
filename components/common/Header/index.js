/**
 * Last updated: 2023-03-27
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React from 'react';
import Profile from './Profile';
import HeaderTitle from './Title';
import Image from 'next/image';
import { IconMenu2 } from '@tabler/icons-react';
import { IconX } from '@tabler/icons-react';
import { useRouter } from 'next/router';

const Header = ({ openMenu, setOpenMenu, laptopSize }) => {
	const router = useRouter();

	return (
		<>
			<div className="">
				{!laptopSize && (
					<div className="fixed z-[200] top-[.1rem] left-3">
						<button
							onClick={(e) => setOpenMenu(!openMenu)}
							className="visible center mt-4 mr-2"
						>
							{openMenu ? (
								<IconX color="white" size={'2.7rem'} aria-label="Close Menu Button" />
							) : (
								<IconMenu2
									color="white"
									size={'2.7rem'}
									aria-label="Open Menu Button"
								/>
							)}
						</button>
					</div>
				)}

				<div className="bg-white">
					<div className="fixed right-0 left-0 h-20 flex flex-row items-center bg-brand-blue-900 top-0 pl-2 pr-12 lg:hidden z-[50]">
						<div className="w-[3.5em]"></div>
						<Image
							src="/Logo.svg"
							alt="ORS Logo"
							width={66}
							height={66}
							priority
							className="mx-auto cursor-pointer"
							onClick={(e) => {
								e.preventDefault();
								router.push('/');
							}}
						/>
					</div>
					<div className="fixed top-[5rem] lg:top-[0rem] w-full grow px-5 py-2 lg:pl-80 flex flex-row justify-between items-stretch border-b border-brand-blue-900/25 right-0 bg-white z-[50]">
						<HeaderTitle />
						<div className="flex-grow"></div>
						<Profile />
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
