import { useState, useEffect } from 'react';
import DropdownInput from '../common/DropdownInput';
import MatchRow from './MatchRow';

const MatchesTable = ({
	title = 'Scheduled matches',
	matches,
	setMatchToEdit,
	setIsEditing,
	setIsDeleting,
}) => {
	const [matchDates, setMatchDates] = useState([]);
	const [selectedDate, setSelectedDate] = useState('');
	const [timeSortedMatches, setTimeSortedMatches] = useState([]);
	const [displayedMatches, setDisplayedMatches] = useState([]);
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
		setSelectedDate(dateArray[0]);
		return dateArray;
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
		setDisplayedMatches(
			timeSortedMatches.map((match) => {
				const matchDate = match.date
					? new Date(Date.parse(match.date))
					: new Date(Date.parse(match.createdAt));
				const matchDateString = matchDate.toDateString();
				if (matchDateString.includes(selectedDate)) return match;
			})
		);
	}, [selectedDate]);
	return (
		<>
			<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
				<div className="flex justify-between py-[15px] px-[20px] border-b border-brand-neutral-300 items-center w-12/12">
					<h1 className="text-base self-center font-medium">{title}</h1>
					<DropdownInput
						value={selectedDate}
						setValue={setSelectedDate}
						customClass={
							'w-40 flex items-center justify-between py-[6.5px] px-3 gap-7 font-medium text-sm rounded-3xl border border-brand-blue-900'
						}
						options={matchDates}
					/>
				</div>
				<table className="table-auto w-">
					<thead className="w-full"></thead>
					<tbody>
						{displayedMatches
							? displayedMatches.map((match) => (
									<MatchRow
										match={match}
										setMatchToEdit={setMatchToEdit}
										setIsEditing={setIsEditing}
										setIsDeleting={setIsDeleting}
									/>
							  ))
							: ''}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default MatchesTable;
