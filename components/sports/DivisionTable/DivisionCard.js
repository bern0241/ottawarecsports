/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { getDivisionWithTeams } from '@/src/graphql/custom-queries';
import {
	IconUsers,
	IconEdit,
	IconTrash,
	IconCalendarDue,
} from '@tabler/icons-react';
import EditDivisionModal from '@/components/common/sports/Divisions/EditDivisionModal';
import DeleteDivisionModal from '@/components/common/sports/Divisions/DeleteDivisionModal';
import { API } from '@aws-amplify/api';
import { convertLevelToFull } from '@/utils/handy-dandy-functions';
import { useUser } from '@/context/userContext';
import { Tooltip, useTooltip } from '@/utils/handy-dandy-functions';

export default function DivisionCard({
	division,
	selectedDivision,
	setSelectedDivision,
	selectedSeason,
	listDivisionsFunc,
	selectedLeague,
}) {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [isCoordinator, setIsCoordinator] = useState(false);

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
	const [scheduleTP, setScheduleTP] = useState(false);
	const [teamsTP, setTeamsTP] = useState(false);
	const [editTP, setEditTP] = useState(false);
	const [trashTP, setTrashTP] = useState(false);

	useEffect(() => {
		getTeamsCount();
	}, [selectedSeason, selectedDivision]);

	useEffect(() => {
		if (selectedLeague) {
			isCoordinatorOfLeagueCheck();
		}
	}, [selectedLeague]);

	const isCoordinatorOfLeagueCheck = () => {
		if (selectedLeague.coordinators.includes(user?.username)) {
			setIsCoordinator(true);
		} else {
			setIsCoordinator(false);
		}
	};

	const clickedDivision = (e) => {
		e.preventDefault();
		setSelectedDivision(division);
	};

	const gameScheduleNavigate = (e) => {
		e.stopPropagation();
		router.push(`/schedule/soccer/${division.id}`);
	};

	const addTeamsUINavigate = (e) => {
		e.stopPropagation();
		router.push(`/sports/${division.id}`);
	};

	const editDivisionFunc = (e) => {
		e.stopPropagation();
		setEditModal(!editModal);
	};

	const deleteDivisionFunc = (e) => {
		e.stopPropagation();
		setDeleteModal(!deleteModal);
	};

	const getTeamsCount = async () => {
		const apiData = await API.graphql({
			query: getDivisionWithTeams,
			variables: { id: division.id },
		});
		setTeamCount(apiData?.data?.getDivision?.Teams.items.length);
	};

	return (
		<>
			<tr
				tabIndex='0'
				onClick={(e) => clickedDivision(e)}
				onKeyDown={(e) => {
					if (e.key === ' ') {
						clickedDivision(e);
					}
				}}
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
				<td className="text-center px-6 py-3">
					<p className="hidden sm:contents">
						{convertLevelToFull(division.level)}
					</p>
				</td>
				<td className="text-center text-lg px-6 py-3">
					<p className="hidden sm:contents">{teamCount}</p>
				</td>

				<td className="flex gap-2 py-3 justify-center pr-5">
				<div className="flex-grow"></div>
          		<button onClick={(e) => gameScheduleNavigate(e, division)}>
					<IconCalendarDue
						onMouseEnter={(e) => handleMouseEnterTooltip(e, setScheduleTP)}
						onMouseLeave={(e) => handleMouseLeaveTooltip(setScheduleTP)}
						data-tooltip-target="tooltip-default"
						style={{ color: 'black', fontSize: '21px', cursor: 'pointer' }}
						name="calendar-outline"
					></IconCalendarDue>
					{scheduleTP && <Tooltip text="Schedule (matches)" 
											style={{ left: tooltipX, top: tooltipY }} />}
				</button>
				<button onClick={(e) => addTeamsUINavigate(e, division)}>
					<IconUsers
						onMouseEnter={(e) => handleMouseEnterTooltip(e, setTeamsTP)}
						onMouseLeave={(e) => handleMouseLeaveTooltip(setTeamsTP)}
						style={{ color: 'black', fontSize: '21px', cursor: 'pointer' }}
						name="calendar-outline"
					></IconUsers>
					{teamsTP && <Tooltip text="All teams on division"
											style={{ left: tooltipX, top: tooltipY }} />}
          			</button>

					{(isCoordinator ||
						(authRoles && authRoles.includes('Admin')) ||
						(authRoles && authRoles.includes('Owner'))) && (
						<>
            			<button onClick={(e) => editDivisionFunc(e)}>
							<IconEdit
								onMouseEnter={(e) => handleMouseEnterTooltip(e, setEditTP)}
								onMouseLeave={(e) => handleMouseLeaveTooltip(setEditTP)}
								style={{
									color: 'darkblue',
									fontSize: '21px',
									cursor: 'pointer',
								}}
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
						</>
					)}
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
