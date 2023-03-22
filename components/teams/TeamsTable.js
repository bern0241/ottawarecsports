/**
 * Last updated: 2023-03-21
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 */

import React from 'react';

const TeamsTable = ({ data = Array(5) }) => {
	return (
		<div className=" w-full border rounded">
			<table className="table-auto w-full ">
				<thead className="bg-brand-neutral-100">
					<tr className="text-left">
						<input
							type="text"
							className="form-control bg-brand-neutral-100 border-none w-full text-center outline-brand-neutral-100"
							placeholder="Search"
						/>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) => (
						<tr
							className={
								// Make every odd row dark
								index % 2 === 0 ? `` : `bg-brand-neutral-100`
							}
						>
							<p className="px-5 py-2">{item}</p>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TeamsTable;
