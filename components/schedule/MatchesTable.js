/**
 * Last updated: 2023-04-05
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 */
import { useState, useEffect } from 'react';
import DropdownInput from '../common/DropdownInput';
import MatchRow from './MatchRow';
import { useRouter } from 'next/router';
import { API } from 'aws-amplify';
import { getLeague } from '@/src/graphql/queries';
import { getSeasonShort, getDivisionShort } from '@/src/graphql/custom-queries';

const MatchesTable = ({
	title = 'Scheduled matches',
	matches,
	setMatchToEdit,
	setIsEditing,
	setIsDeleting,
	//JUSTIN ADDED
	selectedDate,
	setSelectedDate,
	isCoordinator,
}) => {
	const [matchDates, setMatchDates] = useState([]);
	// const [selectedDate, setSelectedDate] = useState('');
	const [timeSortedMatches, setTimeSortedMatches] = useState([]);
	const [displayedMatches, setDisplayedMatches] = useState([]);

	const [league, setLeague] = useState();
	const [season, setSeason] = useState();
	const [division, setDivision] = useState();
	const router = useRouter();
	const { id } = router.query;

	/**
	 * This useEffect fetches the division -> season -> league (in this order) for this page
	 */
	useEffect(() => {
		if (!id) return;
		const moveUpLeagueId = async () => {
			// DIVISION
			const apiDataDivision = await API.graphql({
				query: getDivisionShort,
				variables: { id: id },
			});
			const divisionData = await apiDataDivision.data.getDivision;
			setDivision(divisionData);
			// SEASON
			const apiDataSeason = await API.graphql({
				query: getSeasonShort,
				variables: { id: divisionData.season },
			});
			const seasonData = await apiDataSeason.data.getSeason;
			setSeason(seasonData);
			// LEAGUE
			const apiDataLeague = await API.graphql({
				query: getLeague,
				variables: { id: seasonData.league },
			});
			const leagueData = await apiDataLeague.data.getLeague;
			setLeague(leagueData);
		};
		moveUpLeagueId();
	}, [id]);
	// go through the sorted match list, get all the dates and return them as an array
	const returnDateArray = () => {
		let dateArray = [];
		timeSortedMatches.map((match) => {
			if (!match) return;
			const matchDate = match.date
				? new Date(Date.parse(match.date))
				: new Date(Date.parse(match.createdAt));
			const matchDateString = matchDate.toDateString();
			// remove the year and add a comma after the day of week
			const dateWithoutWeekday = matchDateString.substring(
				4,
				matchDateString.length
			);
			if (!dateArray.includes(dateWithoutWeekday))
				dateArray.push(dateWithoutWeekday);
		});
		setSelectedDate('All matches');
		return ['All matches', ...dateArray];
	};
	useEffect(() => {
		if (!matches) return;
		// sort matches by time, small to large
		setTimeSortedMatches(
			matches.sort((matchA, matchB) => {
				let timeA = matchA.date ? matchA.date : matchA.createdAt;
				let timeB = matchB.date ? matchB.date : matchB.createdAt;
				return Date.parse(timeA) - Date.parse(timeB);
			})
		);
	}, [matches]);

	useEffect(() => {
		if (!timeSortedMatches) return;
		setMatchDates(returnDateArray());
	}, [timeSortedMatches]);

	useEffect(() => {
		if (selectedDate === 'All matches')
			return setDisplayedMatches(timeSortedMatches);
		setDisplayedMatches(
			timeSortedMatches.map((match) => {
				const matchDate = match.date
					? new Date(Date.parse(match.date))
					: new Date(Date.parse(match.createdAt));
				const matchDateString = matchDate.toDateString();
				if (matchDateString.includes(selectedDate)) return match;
			})
		);
	}, [selectedDate, timeSortedMatches]);
	return (
		<>
			<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex justify-between py-[35px] px-[20px] border-b border-brand-neutral-300 items-center w-12/12">
					<h1 className="text-base font-medium">
						<p className="absolute translate-y-[-38px]">
							<b>League</b> - {league?.name} <br />
							<b>Season</b> - {season?.name} <br />
							<b>Division</b> - {division?.name} <br />
							{/* <span className='font-light italic'>Matches</span> */}
						</p>
					</h1>
					{displayedMatches.length === 0 ? (
						<div className="py-[17px]"></div>
					) : (
						<DropdownInput
							value={selectedDate}
							setValue={setSelectedDate}
							customClass={
								'w-40 flex items-center justify-between px-3 gap-7 font-medium text-sm rounded-3xl border border-brand-blue-900 translate-y-[-1.1rem]'
							}
							options={matchDates}
						/>
					)}
				</div>
				<table className="table-auto w-">
					<thead className="w-full"></thead>
					<tbody>
						{displayedMatches.length > 0 ? (
							displayedMatches.map((match) => (
								<MatchRow
									match={match}
									setMatchToEdit={setMatchToEdit}
									setIsEditing={setIsEditing}
									setIsDeleting={setIsDeleting}
									isCoordinator={isCoordinator}
								/>
							))
						) : (
							<tr>
								<td
									colSpan={6}
									className="pt-8 pb-4 text-center text-sm text-brand-neutral-800"
								>
									No matches available
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default MatchesTable;
