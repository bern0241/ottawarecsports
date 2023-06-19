/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 *
 * Summary:
 * This component displays a random team and player.
 */

import React from 'react';
import TeamSpotlight from './TeamSpotlight';
import PlayerSpotlight from './PlayerSpotlight';

export default function Spotlight() {
	return (
		<section tabIndex='0' id="spotlight" className="col-span-4 lg:col-span-2">
			<div className="bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex items-center justify-between border-b border-brand-neutral-300 px-3 py-2">
					<h2 className="text-md font-medium">Team and Player Spotlight</h2>
					<span className="font-light text-sm">View Rosters</span>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px]">
					<TeamSpotlight />
					<PlayerSpotlight />
				</div>
			</div>
		</section>
	);
}
