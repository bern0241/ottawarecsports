/**
 * Last updated: 2023-03-14
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import Header from '../Header';
import NavbarMenu from '../NavBar';

const Layout = () => {
	const [menuOpen, setMenuOpen] = useState(true);

	function showMenu() {
		setMenuOpen(!menuOpen);
	}

	return (
		<>
			{menuOpen ? (
				<div className="h-screen relative z-0 flex bg-gray-500 sm:bg-transparent">
					<div className="w-full">
						<Header showMenu={menuOpen} showMenu={showMenu} />
					</div>
					<div className="absolute inset-y-0 left-0 z-10">
						<NavbarMenu showMenu={menuOpen} showMenu={showMenu} />
					</div>
				</div>
			) : (
				<div>
					<div>
						<Header showMenu={menuOpen} showMenu={showMenu} />
					</div>
					<div className="absolute inset-y-0 left-0 z-10 hidden sm:block">
						<NavbarMenu showMenu={menuOpen} showMenu={showMenu} />
					</div>
				</div>
			)}
		</>
	);
};

export default Layout;
