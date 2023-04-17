/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import SportsDropDown from './SportsDropDown';
import { IconHome, IconSettings } from '@tabler/icons-react';
import ScheduleDropDown from './ScheduleDropDown';
import RostersDropDown from './RostersDropDown';
import AdminPortalDropDown from './AdminPortalDropDown';
import { useUser } from '@/context/userContext';
import { useRouter } from 'next/router';

const NavbarSetup = () => {
	const router = useRouter();
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [openDropdown, setOpenDropdown] = useState(null);

	useEffect(() => {
		// Close dropdown menu any time router path changes:
		setOpenDropdown(null);
	}, [router.asPath]);

	// Reference: Stack Overflow/Henry Woody <https://stackoverflow.com/questions/70489280/react-close-dropdown-when-other-dropdown-is-opened>
	function changeOpenMenu(menu) {
		setOpenDropdown(menu);
	}

	function toggle(menu) {
		if (openDropdown === menu) {
			changeOpenMenu(null);
		} else {
			changeOpenMenu(menu);
		}
	}
	function setMenu(menu) {
		changeOpenMenu(menu);
	}

	const dropdownMenuNames = {
		sports: 'sports',
		schedule: 'schedule',
		rosters: 'rosters',
		acp: 'acp',
	};

	return (
		<div className="flex flex-col font-medium text-md mt-8">
			<div>
				<Link
					href="/"
					className="flex flex-row px-5 py-2 ml-2 text-white/70 hover:text-white focus:text-white"
				>
					<div className="pt-1 ">
						<IconHome size={'1.2em'} />
					</div>
					<p className="pl-2">Home</p>
				</Link>
				<SportsDropDown openDropdown={openDropdown} toggle={toggle} setMenu={setMenu} />
				<ScheduleDropDown openDropdown={openDropdown} toggle={toggle} setMenu={setMenu} />
				<RostersDropDown openDropdown={openDropdown} toggle={toggle} setMenu={setMenu} />
				<AdminPortalDropDown openDropdown={openDropdown} toggle={toggle} setMenu={setMenu} />
				{user ? (
					<Link
						href="/settings"
						className="flex flex-row px-5 py-2 ml-2 text-white/70 hover:text-white focus:text-white"
					>
						<div className="pt-1 ">
							<IconSettings size={'1.2em'} />
						</div>
						<span className="pl-2">Settings</span>
					</Link>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default NavbarSetup;
