/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import Link from 'next/link';
import { IconCalendarEvent, IconChevronRight } from '@tabler/icons-react';

const ScheduleDropDown = ({ openDropdown, toggle, setMenu }) => {
	return (
		<div className="text-white/70 hover:text-white focus:text-white">
			<button
				onClick={() => toggle('schedule')}
				className="px-5 py-2 flex ml-2 flex-row justify-between w-full"
			>
				<div className="flex flex-row align-middle">
					<div className="pt-1 ">
						<IconCalendarEvent size={'1.2em'} />
					</div>
					<span className="font-medium text-md pl-2">Schedule</span>
				</div>
				<div className="pt-1 mr-2">
					<IconChevronRight
						style={{
							transition: '320ms',
							transform:
								openDropdown === 'schedule' ? 'rotate(90deg)' : 'rotate(0deg)',
						}}
						size={'1.2em'}
					/>
				</div>
			</button>
			<div>
				<div
					className={`border-x-[1px] border-black flex flex-col font-regular text-sm pl-12 bg-blue-100 text-black/70 transition-all duration-[320ms] overflow-hidden ${
						openDropdown === 'schedule' ? 'h-[7.3rem]' : 'h-0'
					}`}
				>
					<Link
						onFocus={(e) => setMenu('schedule')}
						href="/schedule/soccer"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Soccer
					</Link>
					<Link
						onFocus={(e) => setMenu('schedule')}
						href="/schedule/volleyball"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Volleyball
					</Link>
					<Link
						onFocus={(e) => setMenu('schedule')}
						href="/schedule/multi-sport"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Multi-Sport
					</Link>
					<Link
						onFocus={(e) => setMenu('schedule')}
						href="/schedule/pickup-sport"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Pick-up Sport
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ScheduleDropDown;
