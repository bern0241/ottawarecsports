/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import Header from '../Header';
import NavbarMenu from '../NavBar';

const Layout = ({ children }) => {
	const [menuOpen, setMenuOpen] = useState(false);

	function showMenu() {
		setMenuOpen(!menuOpen);
	}

	return (
		<div className="">
			{menuOpen ? (
				<div className="h-[118.3vh] relative z-0 flex bg-transparent sm:bg-transparent">
					<div className="w-full flex flex-col">
						<div className=" z-10 bg-white">
							<Header showMenu={menuOpen} showMenu={showMenu} />
						</div>
						<div className="h-screen items-center absolute inset-x-0 bottom-0 sm:grid sm:ml-80 pb-0 bg-[#E7F4FF] ">
							{children}
						</div>
					</div>
					<NavbarMenu showMenu={menuOpen} showMenu={showMenu} />
				</div>
			) : (
				<div>
					<div className="flex flex-col">
						<div className="z-[10] bg-white">
							<Header showMenu={menuOpen} showMenu={showMenu} />
						</div>
						<div className="flex items-center absolute inset-x-0 sm:grid sm:ml-80 mt-[10rem] sm:mt-[5rem] bg-[#E7F4FF]">
							{children}
						</div>
					</div>
					<div className="hidden sm:block z-10">
						<NavbarMenu showMenu={menuOpen} showMenu={showMenu} />
					</div>
				</div>
			)}
		</div>
	);
};

export default Layout;
