/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React, { useState } from 'react';
import Link from 'next/link';
import {
	IconUsers,
	IconChevronDown,
	IconChevronRight,
} from '@tabler/icons-react';
const RostersDropDown = ({openDropdown, toggle, dropdownMenuNames}) => {

	return (
		<div className="text-white/70 hover:text-white focus:text-white">
			<button
				onClick={() => toggle("rosters")}
				className="px-5 py-2 flex ml-2 flex-row justify-between w-full"
			>
				<div className="flex flex-row align-middle">
					<div className="pt-1 ">
						<IconUsers size={'1.2em'} />
					</div>
					<h1 className=" font-medium text-md pl-2">Rosters</h1>
				</div>
				<div className="pt-1 mr-2">
					<IconChevronRight
						style={{
							transition: '320ms',
							transform:
								openDropdown === "rosters"
									? 'rotate(90deg)'
									: 'rotate(0deg)',
						}}
						size={'1.2em'}
					/>
				</div>
			</button>
			<div>
				<div
					className={`border-x-[1px] border-black flex flex-col font-regular text-sm pl-12 bg-blue-100 text-black/70 transition-all duration-[320ms] overflow-hidden ${
						openDropdown === "rosters" ? 'h-[3.65rem]' : 'h-0'
					}`}
				>
					<Link
						href="/players"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Players
					</Link>
					<Link href="/teams" className="my-1 hover:font-bold focus:font-bold">
						Teams
					</Link>
				</div>
			</div>
		</div>
	);
};
export default RostersDropDown;
