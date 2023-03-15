/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React from 'react';
import HeadLayout from './HeadLayout';
import Profile from './Profile';
import HeaderTitle from './Title';

const Header = (props) => {
	return (
		<div>
			<div>
				<HeadLayout showMenu={props.menuOpen} showMenu={props.showMenu}/>
				<div className="sm:fixed w-full grow px-5 py-2 sm:pl-80 flex flex-row justify-between items-strech border-b-2 border-brand-blue-900/25 top-0 right-0 ">
					<HeaderTitle className="ml-4" />
					<div className="flex-grow"></div>
					<Profile className="ml-auto" />
				</div>
			</div>
		</div>
	);
};

export default Header;
