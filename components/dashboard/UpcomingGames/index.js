/**
 * Last updated: 2023-04-3
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 *
 * * Summary:
 * This component displays the number of upcoming matches a user has and what days they're on (Sun-Sat).
 */

import React from 'react';
import Games from './Games';

export default function UpcomingGames() {
	return (
		<section autoFocus
			tabIndex='0'
			id="upcoming-games"
			className="col-span-4 lg:col-span-2 row-span-2"
		>
			<div className="bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex items-center justify-between border-b border-brand-neutral-300 px-3 py-2">
					<h2 className="text-md font-medium">Upcoming Games</h2>
					<span className="font-light text-sm">View All</span>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 min-h-[300px]">
					<div tabIndex='0' className="flex items-center gap-8 col-span-2 lg:col-span-1 p-8 lg:border-r border-b border-brand-neutral-300">
						<img src="/images/volleyball.png" alt="volleyball" />
						<div className="flex flex-col xl:flex-row justify-between xl:gap-3">
							<span className="font-light text-sm">No matches.</span>
						</div>
					</div>
					<div tabIndex='0' className="flex items-center gap-8 col-span-2 lg:col-span-1 p-8 border-b border-brand-neutral-300">
						<img src="/images/soccerball.png" alt="soccer" />
						<Games />
					</div>
					<div tabIndex='0' className="flex items-center gap-8 col-span-2 lg:col-span-1 p-8 border-b lg:border-b-0 lg:border-r border-brand-neutral-300">
						<img src="/images/pick-up_sport.png" alt="pick-up-sports" />
						<div className="flex flex-col xl:flex-row justify-between xl:gap-3">
							<span className="font-light text-sm">No matches.</span>
						</div>
					</div>
					<div tabIndex='0' className="flex items-center gap-8 col-span-2 lg:col-span-1 p-8">
						<img src="/images/handball.png" alt="multi-sports" />
						<div className="flex flex-col xl:flex-row justify-between xl:gap-3">
							<span className="font-light text-sm">No matches.</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
