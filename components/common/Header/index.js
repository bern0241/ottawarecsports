/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import Profile from './Profile';
import HeaderTitle from './Title';
import Image from 'next/image';
import { IconMenu2 } from '@tabler/icons-react';

const Header = (props) => {
	console.log(props.menuOpen);
	let menuState = props.menuOpen;
	function handleClick() {
		props.showMenu(true);
	}
	return (
		<div>
			<div className="bg-white">
				<div className="h-20 z-10 flex flex-row items-center bg-brand-blue-900 top-0 right-0 pl-2 pr-12 sm:hidden">
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
				<div className="sm:fixed w-full grow px-5 py-2 sm:pl-80 flex flex-row justify-between items-strech border-b border-brand-blue-900/25 top-0 right-0 ">
					<HeaderTitle className="ml-4" />
					<div className="flex-grow"></div>
					<Profile className="ml-auto" />
				</div>
			</div>
		</div>
	);
};

export default Header;
