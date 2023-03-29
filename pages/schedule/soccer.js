import { useState } from 'react';
import { Button } from 'flowbite-react';
import { IconRepeat } from '@tabler/icons-react';
import DivisionRow from '@/components/schedule/DivisionRow';
import ChangeSeasonModal from '@/components/schedule/ChangeSeasonModal';

const soccer = () => {
	const [currentLeague, setCurrentLeague] = useState('');
	const [currentSeason, setCurrentSeason] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	return (
		<>
			<main className="w-full flex flex-col gap-6 p-8">
				{modalVisible && (
					<ChangeSeasonModal
						setModalVisible={setModalVisible}
						currentSeason={currentSeason}
						setCurrentSeason={setCurrentSeason}
						currentLeague={currentLeague}
						setCurrentLeague={setCurrentLeague}
					/>
				)}
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300 items-center">
						<h1 className="text-xl self-center">Spring Season Divisions</h1>
						<Button
							pill={true}
							className="px-[1.75rem] bg-blue-900 hover:bg-blue-800 px-4"
							onClick={() => setModalVisible(true)}
						>
							<IconRepeat className="mr-2 h-5 w-5" />
							Change
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
							<DivisionRow />
							<DivisionRow />
							<DivisionRow />
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
};

export default soccer;
