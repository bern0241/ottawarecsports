/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import NavbarSetup from './Links';
import { IconX } from '@tabler/icons-react';
import SignOutButton from '../SignOutButton';

const NavbarMenu = (props) => {
	function handleClick() {
		props.showMenu(false);
	}
	return (
		<div
			className={`fixed inset-y-0 left-0 bg-brand-blue-900 h-screen py-3 w-80 flex flex-col justify-between text-neutral-500 ${
				props.showMenu ? 'z-[10]' : 'z-[-5]'
			}`}
		>
			<div>
				<button
					className="visible center mt-1 mr-2 sm:hidden"
					onClick={handleClick}
				>
					<IconX color="white" size={'2em'} />
				</button>
			</div>
			<div className="flex flex-col self-center">
				<Image
					src="/Logo.svg"
					alt="ORS Logo"
					width={80}
					height={80}
					priority
					className="py-3 self-center w-auto h-auto"
				/>
				<Link
					href="./"
					className="pb-5 self-center text-xs text-white/70 hover:text-white focus:text-white"
				>
					Visit Ottawa Rec Sports
				</Link>
			</div>

			<NavbarSetup />

			<div className="mt-auto px-5 flex flex-col">
				<Image
					src="/TrophyIcon.svg"
					alt="Trophy"
					width={158}
					height={158}
					priority
					className="py-3 self-center mb-5 w-auto h-auto"
				/>

				<SignOutButton />
			</div>
		</div>
	);
};

export default NavbarMenu;
