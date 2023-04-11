/**
 * Last updated: 2023-03-30
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import Link from 'next/link';
import React, { useState } from 'react';
import {
	IconBallFootball,
	IconChevronDown,
	IconChevronRight,
} from '@tabler/icons-react';

const SportsDropDown = ({ openDropdown, toggle, dropdownMenuNames }) => {
	return (
		<div className="text-white/70 hover:text-white focus:text-white">
			<button
				onClick={() => toggle('sports')}
				className="px-5 py-2 flex flex-row ml-2 justify-between w-full"
			>
				<div className="flex flex-row align-middle">
					<div className="pt-1 ">
						<IconBallFootball size={'1.2em'} />
					</div>
					<span className="font-medium text-md pl-2">Sports</span>
				</div>
				<div className="pt-1 mr-2">
					<IconChevronRight
						style={{
							transition: '320ms',
							transform:
								openDropdown === 'sports' ? 'rotate(90deg)' : 'rotate(0deg)',
						}}
						size={'1.2em'}
					/>
				</div>
			</button>
			<div>
				<div
					className={`border-x-[1px] border-black flex flex-col font-regular text-sm pl-12 bg-blue-100 text-black/70 transition-all duration-[320ms] overflow-hidden ${
						openDropdown === 'sports' ? 'h-[7.3rem]' : 'h-0'
					}`}
				>
					<Link
						href="/sports/soccer"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Soccer
					</Link>
					<Link
						href="/other-sports"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Volleyball
					</Link>
					<Link
						href="/other-sports"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Multi-Sport
					</Link>
					<Link
						href="/other-sports"
						className="my-1 hover:font-bold focus:font-bold"
					>
						Pick-up Sport
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SportsDropDown;
