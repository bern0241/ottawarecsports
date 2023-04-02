/**
 * Last updated: 2023-04-2
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import Games from './Games';

export default function UpcomingGames() {
	return (
		<section id="upcoming-games" className="col-span-2 row-span-2">
			<div className="bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex items-center justify-between border-b border-brand-neutral-300 px-3 py-2">
					<h1 className="text-md font-medium">Upcoming Games</h1>
					<a href="#" className="text-sm text-right">
						View All
					</a>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2">
					<div className="flex col-span-1 p-8 lg:border-r border-b border-brand-neutral-300">
						<img src="/images/volleyball.png" alt="Soccer" />
            <Games />
					</div>
					<div className="flex col-span-1 p-8 border-b border-brand-neutral-300">
						<img src="/images/soccerball.png" alt="Handball" />
					</div>
					<div className="flex col-span-1 p-8 border-b lg:border-b-0 lg:border-r border-brand-neutral-300">
						<img src="/images/pick-up_sport.png" alt="Handball" />
					</div>
					<div className="flex col-span-1 p-8">
						<img src="/images/handball.png" alt="Handball" />
					</div>
				</div>
			</div>
		</section>
	);
}
