/**
 * Last updated: 2023-03-12
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState } from 'react';
import Link from 'next/link';
import {
	IconUsers,
	IconChevronDown,
	IconChevronRight,
} from '@tabler/icons-react';
const RostersDropDown = () => {
	const [showMe, setShowMe] = useState(false);
	function toggle() {
		setShowMe(!showMe);
	}
	return (
		<div className="text-white/70 hover:text-white focus:text-white">
			<button
				onClick={toggle}
				className="p-2 flex flex-row justify-between w-full"
			>
				<div className="flex flex-row align-middle">
					<div className="pt-1 ">
						<IconUsers size={'1.2em'} />
					</div>
					<h1 className=" font-medium text-md pl-2">Rosters</h1>
				</div>
				<div className="pt-1">
					{showMe ? (
						<IconChevronDown size={'1.2em'} />
					) : (
						<IconChevronRight size={'1.2em'} />
					)}
				</div>
			</button>
			<div
				style={{
					display: showMe ? 'block' : 'none',
				}}
			>
				<div className="flex flex-col font-regular text-sm pl-10 bg-blue-100 text-black/70">
					<Link href="./" className="my-1 hover:font-bold focus:font-bold">
						Players
					</Link>
					<Link href="./" className="my-1 hover:font-bold focus:font-bold">
						Teams
					</Link>
				</div>
			</div>
		</div>
	);
};
export default RostersDropDown;