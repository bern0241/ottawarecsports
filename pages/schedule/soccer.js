import React from 'react';
import { Button } from 'flowbite-react';
import { IconCirclePlus } from '@tabler/icons-react';

const soccer = () => {
	return (
		<>
			<main className="w-full flex flex-col gap-6 p-8">
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h1 className="text-xl self-center">Spring Season Divisions</h1>
						<Button
							pill={true}
							className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
							// onClick={() => setModalVisible(true)}
						>
							<IconCirclePlus className="mr-2 h-5 w-5" />
							Add A Team
						</Button>
					</div>

					<table className="table-auto">
						<thead className="bg-brand-neutral-100">
							<tr className="text-left">
								<th className="py-3 px-5 text-sm font-light w-4/12">Name</th>
								<th className="py-3 px-5 text-sm font-light w-4/12">Level</th>
								<th className="py-3 px-5 text-sm font-light w-3/12">
									Description
								</th>
								<th className="py-3 px-5 text-sm font-light w-2/12">Action </th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td
									colSpan={6}
									className="pt-8 pb-4 text-center text-sm text-brand-neutral-800"
								>
									End
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
};

export default soccer;
