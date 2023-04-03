import MatchesTable from '@/components/schedule/MatchesTable';
import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { IconCirclePlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { getDivisionGames, getAllTeams } from '@/utils/graphql.services';
export default function DivisionMatches() {
	const [games, setGames] = useState([]);
	const [teams, setTeams] = useState([]);
	const router = useRouter();
	const getGames = async () => {
		if (!router.query.divisionID) return;
		const resp = await getDivisionGames(router.query.divisionID);
		setGames(resp);
	};
	const getTeams = async () => {
		const resp = await getAllTeams();
		setTeams(resp);
	};
	useEffect(() => {
		getGames();
		getTeams();
	}, [router]);
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
