/**
 * Last updated: 2023-04-2
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';

export default function PlayerSpotlight() {
	return (
		<div className="flex flex-col col-span-1 p-8 gap-2">
			<img
				width="100"
				height="100"
				className="rounded-full bg-red-500 self-center mb-3"
				alt="N/A"
			/>
			<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
				<span className="text-sm font-light col-span-1">Player Name</span>
				<span className="col-span-1 truncate">John Doe</span>
			</div>
			<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
				<span className="text-sm font-light col-span-1">Sport</span>
				<span className="truncate">Soccer</span>
			</div>
			<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
				<span className="text-sm font-light col-span-1">Team Name</span>
				<span className="truncate col-span-1">The Benchwarmers</span>
			</div>
			<div className="w-full grid grid-cols-2 gap-2 text-sm font-medium">
				<span className="text-sm font-light col-span-1">Position</span>
				<span className="truncate col-span-1">Forward</span>
			</div>
		</div>
	);
}
