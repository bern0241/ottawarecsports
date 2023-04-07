import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Button } from 'flowbite-react';
import { IconRepeat } from '@tabler/icons-react';
import DivisionRow from '@/components/schedule/DivisionRow';
import ChangeSeasonModal from '@/components/schedule/ChangeSeasonModal';
import { getLeagues } from '@/utils/graphql.services';
import { getSeasonShort } from '@/src/graphql/custom-queries';
import { getLeague, getSeason } from '@/src/graphql/queries';

const soccer = () => {
	const [leagues, setLeagues] = useState([]);
	const [divisions, setDivisions] = useState([]);
	const [currentLeague, setCurrentLeague] = useState({});
	const [currentSeason, setCurrentSeason] = useState({});
	const [modalVisible, setModalVisible] = useState(false);
	const [selectedDivision, setSelectedDivision] = useState();
	
	const getAllLeagues = async () => {
		const listOfLeagues = await getLeagues();
		setLeagues(listOfLeagues);
		setDefaultLeaguesAndSeasons(listOfLeagues);
	};
	// set default league and season to the first one
	const setDefaultLeaguesAndSeasons = (listOfLeagues) => {
		setCurrentLeague(listOfLeagues[0]);
		setCurrentSeason(listOfLeagues[0].Seasons.items[0]);
	};
	
	const getLeagueSeasonLocalStorage = async () => {
		const storedIds = JSON.parse(localStorage.getItem('schedule-season-id'));
		console.log('MY STORED IDS',storedIds);
		if (storedIds !== null) {
			const apiDataLeague = await API.graphql({ query: getLeague, variables: { id: storedIds.leagueId }})
			const apiDataSeason = await API.graphql({ query: getSeasonShort, variables: { id: storedIds.seasonId }})
			const dataLeague = await apiDataLeague.data.getLeague;
			const dataSeason = await apiDataSeason.data.getSeason;
			setCurrentLeague(dataLeague);
			const timer = setTimeout(() => {
				setCurrentSeason(dataSeason);
				console.log(dataSeason);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}

	useEffect(() => {
		getAllLeagues();
		getLeagueSeasonLocalStorage();
	}, []);


	useEffect(() => {
		if (!currentSeason?.Divisions) return setDivisions([]);
			setDivisions(currentSeason?.Divisions.items);
			//Save currentSeason.id in LocalStorage (for convenience when reloading page)
			const dataIds = {
				leagueId: currentLeague.id,
				seasonId: currentSeason.id,
			}
			localStorage.setItem('schedule-season-id', JSON.stringify(dataIds));
			
	}, [currentSeason]);

	// Saves into localStorage for convenience
	// useEffect(() => {
	// 	if (currentLeague) {
	// 		console.log("league", currentLeague);
	// 	}
	// 	if (currentSeason) {
	// 		console.log("season", currentSeason);
	// 	}
	// }, [currentLeague, currentSeason])

	return (
		<>
			<main className="w-full flex flex-col gap-6 p-5">
				{modalVisible && (
					<ChangeSeasonModal
						setModalVisible={setModalVisible}
						currentSeason={currentSeason}
						setCurrentSeason={setCurrentSeason}
						currentLeague={currentLeague}
						setCurrentLeague={setCurrentLeague}
						leagues={leagues}
					/>
				)}
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-3 border-b border-brand-neutral-300 top-4">
						<h2 className="text-[1rem] self-center">
							{currentSeason ? (
								<p><b>League</b> - {currentLeague?.name} <br/><b>Season</b> - {currentSeason?.name}<br/>All Divisions</p>
							) : (
								<p>Choose Season for Divisions</p>
							)}
						</h2>
						<Button
							pill={true}
							className="px-[.9rem] bg-blue-900 hover:bg-blue-800"
							onClick={() => setModalVisible(true)}
						>
							<IconRepeat className="mr-2 h-5 w-5" />
							Change
						</Button>
					</div>

					<table className="table-auto">
						<thead className="bg-brand-neutral-100 border-b-[1px] border-gray-500">
							<tr className="text-left">
								<th className="py-3 px-5 text-sm font-light w-4/12">Name</th>
								<th className="py-3 text-center px-5 text-sm font-light w-4/12">Level</th>
								<th className="hidden md:table-cell py-3 px-5 text-sm font-light w-3/12">
									Description
								</th>
								<th className="py-3 text-center px-5 text-sm font-light w-2/12">Action </th>
							</tr>
						</thead>
						<tbody>
							{divisions.length > 0 ? (
								divisions.map((division, index) => (
									<DivisionRow
										key={index}
										division={division}
										selectedDivision={selectedDivision}
										setSelectedDivision={setSelectedDivision}
									/>
								))
							) : (
								<tr>
									<td
										colSpan={6}
										className="pt-8 pb-4 text-center text-sm text-brand-neutral-800"
									>
										No divisions available
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</main>
		</>
	);
};

export default soccer;
