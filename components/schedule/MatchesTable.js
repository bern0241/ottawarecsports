import React from 'react';
import { Button } from 'flowbite-react';

const MatchesTable = () => {
	const CircleArrowDown = () => (
		<svg width={16} height={17} fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M8 .5a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 1.6a6.4 6.4 0 1 1 0 12.8A6.4 6.4 0 0 1 8 2.1ZM4 6.9l4 4 4-4H4Z"
				fill="#000"
				fillOpacity={0.7}
			/>
		</svg>
	);
	return (
		<>
			<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
				<table className="table-auto">
					<thead className="">
						<tr className="flex justify-between py-[15px] px-[20px] border-b border-brand-neutral-300 items-center">
							<th>
								<h1 className="text-base self-center font-medium">
									Scheduled matches
								</h1>
							</th>
							<th>
								<button
									className="flex items-center justify-between py-[6.5px] px-3 gap-7 font-medium text-sm rounded-3xl border border-brand-blue-900"
									// onClick={() => setModalVisible(true)}
								>
									March 10, 2023
									<span>
										<CircleArrowDown />
									</span>
								</button>
							</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</>
	);
};

export default MatchesTable;
