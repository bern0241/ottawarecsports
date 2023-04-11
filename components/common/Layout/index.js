/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import Header from '../Header';
import NavbarMenu from '../NavBar';
import useWindowSize from '@/utils/useWindowSize';

const Layout = ({ children }) => {
	const [openMenu, setOpenMenu] = useState(false);
	const [laptopSize, setLaptopSize] = useState(false);
	const [laptopHeight, setLaptopHeight] = useState(false);
	const size = useWindowSize(); // Determines size of browser window

	// Checks size of window screen and sets laptopSize state
	useEffect(() => {
		if (size.width >= 1024) {
			setLaptopSize(true);
		} else {
			setLaptopSize(false);
		}
	}, [size.width]);

	useEffect(() => {
		if (size.height >= 640) {
			setLaptopHeight(true);
		} else {
			setLaptopHeight(false);
		}
	}, [size.height]);

	useEffect(() => {
		if (laptopSize) {
			setOpenMenu(true);
		}
		if (!laptopSize) {
			setOpenMenu(false);
		}
	}, [laptopSize]);

	return (
		<div className="mt-7">
			<div>
				<div className="flex flex-col">
					<div className=" bg-white">
						<Header
							openMenu={openMenu}
							setOpenMenu={setOpenMenu}
							laptopSize={laptopSize}
						/>
					</div>
					<div className="flex items-center absolute inset-x-0 sm:grid lg:ml-80 mt-[10rem] lg:mt-[5rem] bg-[#E7F4FF]">
						{children}
					</div>
				</div>
				<div className="sm:block">
					<NavbarMenu
						openMenu={openMenu}
						setOpenMenu={setOpenMenu}
						laptopSize={laptopSize}
						laptopHeight={laptopHeight}
					/>
				</div>
			</div>
		</div>
	);
};

export default Layout;
