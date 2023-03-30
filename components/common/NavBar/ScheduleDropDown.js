/**
 * Last updated: 2023-03-26
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 */

import React, { useState } from 'react';
import Link from 'next/link';
import {
	IconCalendarEvent,
	IconChevronDown,
	IconChevronRight,
} from '@tabler/icons-react';

const ScheduleDropDown = ({openDropdown, toggle, dropdownMenuNames}) => {

	return (
		<div className="text-white/70 hover:text-white focus:text-white">
			<button
				onClick={() => toggle("schedule")}
				className="p-2 flex ml-2 flex-row justify-between w-full"
			>
				<div className="flex flex-row align-middle">
					<div className="pt-1 ">
						<IconCalendarEvent size={'1.2em'} />
					</div>
					<h1 className=" font-medium text-md pl-2">Schedule</h1>
				</div>
				<div className="pt-1 mr-2">
					<IconChevronRight style={{transition: '320ms', transform: openDropdown === "schedule" ? 'rotate(90deg)' : 'rotate(0deg)'}} size={'1.2em'} />
				</div>
			</button>
			<div
				// style={{
				// 	display: showMe ? 'block' : 'none',
				// }}
			>
				<div className={`border-x-[1px] border-black flex flex-col font-regular text-sm pl-12 bg-blue-100 text-black/70 transition-all duration-[320ms] overflow-hidden ${openDropdown === "schedule" ? 'h-[7.3rem]' : 'h-0'}`}>
					<Link href="/schedule/soccer" className="my-1 hover:font-bold focus:font-bold">
						Soccer
					</Link>
					<Link href="/schedule/volleyball" className="my-1 hover:font-bold focus:font-bold">
						Volleyball
					</Link>
					<Link href="/schedule/multi-sport" className="my-1 hover:font-bold focus:font-bold">
						Multi-Sport
					</Link>
					<Link href="/schedule/pickup-sport" className="my-1 hover:font-bold focus:font-bold">
						Pick-up Sport
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ScheduleDropDown;
