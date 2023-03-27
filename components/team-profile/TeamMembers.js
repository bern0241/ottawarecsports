/**
 * Last updated: 2023-03-23
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Verity Stevens <stev0298@algonquinlive.com>
 */

import React from 'react';
import { IconSearch } from '@tabler/icons-react';

export default function TeamMembers({ members }) {
	return (
		<div className=" w-full border border-brand-blue-900/25 rounded overflow-hidden">
			<table className="table-auto w-full ">
				<thead className="bg-brand-neutral-100">
					<tr className="text-left w-full relative">
						{/* <div className="w-full relative"> */}
							{/* <input
								type="text"
								className="form-control bg-brand-neutral-100 border-none w-full text-center outline-brand-neutral-100"
								placeholder="Search"
								defaultValue=""
							/>
							<span className="absolute right-2 top-1/2 -translate-y-1/2">
								<IconSearch />
							</span> */}
						{/* </div> */}
					</tr>
				</thead>
				<tbody>
					{members &&
						members.map((item, index) => (
							<tr key={index}
								className='relative border-t border-brand-blue-900/25 px-5 py-2' >
									{item.name} {item.lastName}
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
}
