/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES: https://flowbite.com/docs/components/dropdowns/
// https://flowbite.com/docs/components/tables/
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s
// https://flowbite.com/docs/forms/search-input/
// https://tabler.io/icons

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DeleteSeasonModal from '../../../common/sports/Seasons/DeleteSeasonModal';
import EditSeasonModal from '../../../common/sports/Seasons/EditSeasonModal';
import { IconTrash, IconEdit, IconUsers, IconListDetails } from '@tabler/icons-react';
import { Tooltip, useTooltip } from '@/utils/handy-dandy-functions';

export default function SeasonCard({
	season,
	selectedSeason,
	setSelectedSeason,
	selectedLeague,
	listSeasonsFunc,
}) {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const router = useRouter();
	const {
		tooltipX,
		tooltipY,
		handleMouseEnterTooltip,
		handleMouseLeaveTooltip,
	} = useTooltip();
	const [scheduleTP, setScheduleTP] = useState(false);
	const [editTP, setEditTP] = useState(false);
	const [trashTP, setTrashTP] = useState(false);

	// Select a season that gets clicked.
	const clickedSeason = (e) => {
		e.preventDefault();
		setSelectedSeason(season);
	};

	// Converts a date object to become human-readable within the season's card.
	const convertDateReadable = (date) => {
		let convertedDate = date.replaceAll('-', '/');
		let newDate = new Date(convertedDate);
		newDate.toString().replaceAll('-', '/');
		let newDateSplit = newDate.toString().split(' ');
		let newDateConcatnate = `${newDateSplit[1]} ${newDateSplit[2]}`;
		return newDateConcatnate;
	};
	// Opens edit season modal
	const editSeasonFunc = (e) => {
		e.stopPropagation();
		setEditModal(!editModal);
	};
	// Opens delete season modal
	const deleteSeasonFunc = (e) => {
		e.stopPropagation();
		setDeleteModal(!deleteModal);
	};
	// When corresponding icon is clicked, go to the schedule page using LeagueID and SeasonID as initial queries.
	const goToSchedulePage = (e) => {
		e.preventDefault();
		router.push({
			pathname: '/schedule/soccer',
			query: { leagueID: selectedLeague.id, seasonID: selectedSeason.id },
		});
	};

	return (
		<>
			<tr
				tabIndex='0'
				onKeyDown={(e) => {
					if (e.key === ' ') {
						clickedSeason(e);
					}
				}}
				onClick={(e) => clickedSeason(e)}
				className="bg-white border border-gray-400 cursor-pointer"
			>
				<th
					scope="row"
					className="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					{selectedSeason && selectedSeason.id === season.id && (
						<div className="w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute" />
					)}
					{season.name}
				</th>
				<td className="text-center px-6 py-3">
					{convertDateReadable(season.start_date)}
				</td>
				<td className="text-center px-6 py-3">
					{convertDateReadable(season.end_date)}
				</td>
				<td className="flex gap-2 py-3 justify-center pr-5">
					<div className="flex-grow"></div>
          		<button onClick={(e) => goToSchedulePage(e)}>
					<IconListDetails
						onMouseEnter={(e) => handleMouseEnterTooltip(e, setScheduleTP)}
						onMouseLeave={(e) => handleMouseLeaveTooltip(setScheduleTP)}
						style={{ color: 'black', fontSize: '21px', cursor: 'pointer' }}
						name="people"
					></IconListDetails>
					{scheduleTP && <Tooltip text="Schedule (divisions)" 
												style={{ left: tooltipX, top: tooltipY }} />}
				</button>
				<button onClick={(e) => editSeasonFunc(e)}>
					<IconEdit
						onMouseEnter={(e) => handleMouseEnterTooltip(e, setEditTP)}
						onMouseLeave={(e) => handleMouseLeaveTooltip(setEditTP)}
						style={{ color: 'darkblue', fontSize: '21px', cursor: 'pointer' }}
						name="create-outline"
					></IconEdit>
					{editTP && <Tooltip text="Edit season" 
											style={{ left: tooltipX, top: tooltipY }} />}
				</button>
				<button onClick={(e) => deleteSeasonFunc(e)}>
					<IconTrash
						onMouseEnter={(e) => handleMouseEnterTooltip(e, setTrashTP)}
						onMouseLeave={(e) => handleMouseLeaveTooltip(setTrashTP)}
						style={{ color: 'red', fontSize: '21px', cursor: 'pointer' }}
						name="trash-outline"
					></IconTrash>
					{trashTP && <Tooltip text="Delete season" 
											style={{ left: tooltipX, top: tooltipY }} />}
          		</button>
				</td>
			</tr>
			{/* Delete modal - Meant for deleting seasons */}
			{deleteModal && (
				<DeleteSeasonModal
					leagueInfo={selectedLeague}
					seasonInfo={season}
					setDeleteModal={setDeleteModal}
					listSeasonsFunc={listSeasonsFunc}
				/>
			)}
			{/* Edit modal - Meant for updating seasons */}
			{editModal && (
				<EditSeasonModal
					season={season}
					selectedLeague={selectedLeague}
					setOpenModal={setEditModal}
					setSelectedSeason={setSelectedSeason}
					listSeasonsFunc={listSeasonsFunc}
				/>
			)}
		</>
	);
}
