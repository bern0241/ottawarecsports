/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES: https://flowbite.com/docs/components/dropdowns/
// https://flowbite.com/docs/components/modal/
// https://flowbite.com/docs/components/buttons/
// https://flowbite.com/docs/components/tables/
// https://www.youtube.com/watch?v=GsObT64SRhA&t=474s
// https://tabler.io/icons

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import DeleteDivisionModal from '../../../common/sports/Divisions/DeleteDivisionModal';
import EditDivisionModal from '../../../common/sports/Divisions/EditDivisionModal';
import { getDivisionWithTeams } from '@/src/graphql/custom-queries';
import { IconTrash, IconEdit, IconUsers } from '@tabler/icons-react';
import { API } from '@aws-amplify/api';
import { convertLevelToFull } from '@/utils/handy-dandy-functions';
import { Tooltip, useTooltip } from '@/utils/handy-dandy-functions';

export default function DivisionCard({
	division,
	selectedDivision,
	setSelectedDivision,
	selectedSeason,
	listDivisionsFunc,
}) {
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [teamCount, setTeamCount] = useState(0);
	const router = useRouter();
	const {
		tooltipX,
		tooltipY,
		handleMouseEnterTooltip,
		handleMouseLeaveTooltip,
	} = useTooltip();
	const [teamsTP, setTeamsTP] = useState(false);
	const [editTP, setEditTP] = useState(false);
	const [trashTP, setTrashTP] = useState(false);

	useEffect(() => {
		getTeamsCount();
	}, [selectedSeason, selectedDivision]);
	// When a division is clicked, go to all teams of division page.
	const clickedDivision = (e) => {
		e.preventDefault();
		setSelectedDivision(division);
		// teamsUINavigate(e, division);
	};
	// Open edit modal
	const editDivisionFunc = (e) => {
		e.stopPropagation();
		setEditModal(!editModal);
	};
	// Open delete modal
	const deleteDivisionFunc = (e) => {
		e.stopPropagation();
		setDeleteModal(!deleteModal);
	};
	// Goes to page that displays all teams of that division selected
	const teamsUINavigate = (e) => {
		e.stopPropagation();
		router.push(`/admin-portal/leagues/${division.id}`);
	};
	// Counts the number of teams in a division
	const getTeamsCount = async () => {
		const apiData = await API.graphql({
			query: getDivisionWithTeams,
			variables: { id: division.id },
		});
		if (apiData.data.getDivision)
			setTeamCount(apiData?.data?.getDivision?.Teams.items.length);
	};

	return (
		<>
			<tr	
				tabIndex='0'
				onKeyDown={(e) => {
					if (e.key === ' ') {
						clickedDivision(e);
					}
				}}
				onClick={(e) => clickedDivision(e)}
				className="bg-white border border-gray-400 cursor-pointer"
			>
				<th
					scope="row"
					className="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					{selectedDivision && selectedDivision.id === division.id && (
						<div className="w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute" />
					)}
					{division.name}
				</th>
				<td className="px-6 py-3 text-center">
					{convertLevelToFull(division.level)}
				</td>
				<td className="px-6 text-lg py-3 text-center hidden sm:table-cell">
					{teamCount}
				</td>
				<td className="flex gap-2 px-6 py-4 text-center justify-center">
					<div className="flex-grow"></div>
          		<button onClick={(e) => teamsUINavigate(e, division)}>
					<IconUsers
						onMouseEnter={(e) => handleMouseEnterTooltip(e, setTeamsTP)}
						onMouseLeave={(e) => handleMouseLeaveTooltip(setTeamsTP)}
						style={{ color: 'black', fontSize: '21px', cursor: 'pointer' }}
						name="calendar-outline"
					></IconUsers>
					{teamsTP && <Tooltip text="All teams on division"
											style={{ left: tooltipX, top: tooltipY }} />}
				</button>
				<button onClick={(e) => editDivisionFunc(e)}>
					<IconEdit
						onMouseEnter={(e) => handleMouseEnterTooltip(e, setEditTP)}
						onMouseLeave={(e) => handleMouseLeaveTooltip(setEditTP)}
						style={{ color: 'darkblue', fontSize: '21px', cursor: 'pointer' }}
						name="create-outline"
					></IconEdit>
					{editTP && <Tooltip text="Edit division" 
											style={{ left: tooltipX, top: tooltipY }} />}
				</button>
				<button onClick={(e) => deleteDivisionFunc(e)}>
					<IconTrash
						onMouseEnter={(e) => handleMouseEnterTooltip(e, setTrashTP)}
						onMouseLeave={(e) => handleMouseLeaveTooltip(setTrashTP)}
						style={{ color: 'red', fontSize: '21px', cursor: 'pointer' }}
						name="trash-outline"
					></IconTrash>
					{trashTP && <Tooltip text="Delete division" 
											style={{ left: tooltipX, top: tooltipY }} />}
          		</button>
				</td>
			</tr>

			{deleteModal && (
				<DeleteDivisionModal
					seasonInfo={selectedSeason}
					divisionInfo={division}
					setDeleteModal={setDeleteModal}
					listDivisionsFunc={listDivisionsFunc}
				/>
			)}
			{editModal && (
				<EditDivisionModal
					division={division}
					selectedSeason={selectedSeason}
					setOpenModal={setEditModal}
					listDivisionsFunc={listDivisionsFunc}
					setSelectedDivision={setSelectedDivision}
				/>
			)}
		</>
	);
}
