import MatchesTable from '@/components/schedule/MatchesTable';
import React from 'react';
import { Button } from 'flowbite-react';
import { IconCirclePlus } from '@tabler/icons-react';

export default function DivisionMatches() {
	return (
		<>
			<main className="w-full flex flex-col gap-6 p-8 pt-0">
				{/* Results */}
				<Button
					pill={true}
					className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800 ml-auto"
					// onClick={() => setModalVisible(true)}
				>
					<IconCirclePlus className="mr-2 h-5 w-5" />
					Create New Match
				</Button>
				<MatchesTable />
				<MatchesTable title={'Recent matches'} />
			</main>
		</>
	);
}
