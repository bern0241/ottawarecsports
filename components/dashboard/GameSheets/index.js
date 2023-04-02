/**
 * Last updated: 2023-04-2
 *
 * Author(s):
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react'
import Game from './Game'

export default function GameSheets() {
  return (
    <section id="game-sheets" className="col-span-4">
        <div className="bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex items-center justify-start border-b border-brand-neutral-300 px-3 py-2">
					<h1 className="text-md font-medium">Update Game Scores</h1>
				</div>
				<div className="">
                    <Game />
				</div>
			</div>
    </section>
  )
}
