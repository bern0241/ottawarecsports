/**
 * Last updated: 2023-03-23
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import Link from 'next/link';
import React, {useState} from 'react';
import SportsDropDown from './SportsDropDown';
import { IconHome, IconShieldChevron, IconSettings } from '@tabler/icons-react';
import ScheduleDropDown from './ScheduleDropDown';
import RostersDropDown from './RostersDropDown';
import AdminPortalDropDown from './AdminPortalDropDown';
import { useUser } from '@/context/userContext';

const NavbarSetup = () => {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [openDropdown, setOpenDropdown] = useState(null);

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

	const dropdownMenuNames = {
		sports: "sports",
		schedule: "schedule",
		rosters: "rosters",
		acp: "acp"
	};

	return (
		<div className="flex flex-col font-medium text-md">
			<div>
			<Link
				href="/"
				className="flex flex-row p-2 ml-2 text-white/70 hover:text-white focus:text-white"
			>
				<div className="pt-1 ">
					<IconHome size={'1.2em'} />
				</div>
				<p className="pl-2">Home</p>
			</Link>
			<SportsDropDown openDropdown={openDropdown} toggle={toggle} dropdownMenuNames={dropdownMenuNames} />
			<ScheduleDropDown openDropdown={openDropdown} toggle={toggle} dropdownMenuNames={dropdownMenuNames} />
			<RostersDropDown openDropdown={openDropdown} toggle={toggle} dropdownMenuNames={dropdownMenuNames} />
			<AdminPortalDropDown openDropdown={openDropdown} toggle={toggle} dropdownMenuNames={dropdownMenuNames} />
			{user ? (
				<Link
					href="/settings"
					className="flex flex-row p-2 ml-2 text-white/70 hover:text-white focus:text-white"
				>
					<div className="pt-1 ">
						<IconSettings size={'1.2em'} />
					</div>
					<p className="pl-2">Settings</p>
				</Link>
			) : (
				''
			)}
			</div>
		</div>
	);
};

export default NavbarSetup;
