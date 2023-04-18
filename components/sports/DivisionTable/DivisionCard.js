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
				onClick={(e) => clickedDivision(e)}
				tabIndex="0"
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
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
					<IconCalendarDue
						onClick={(e) => gameScheduleNavigate(e, division)}
						tabIndex="0"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								gameScheduleNavigate(e, division);
							}
						}}
						data-tooltip-target="tooltip-default"
						style={{ color: 'black', fontSize: '21px', cursor: 'pointer' }}
						name="calendar-outline"
					></IconCalendarDue>
					<IconUsers
						onClick={(e) => addTeamsUINavigate(e, division)}
						tabIndex="0"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								addTeamsUINavigate(e, division);
							}
						}}
						style={{ color: 'black', fontSize: '21px', cursor: 'pointer' }}
						name="calendar-outline"
					></IconUsers>

					{(isCoordinator ||
						(authRoles && authRoles.includes('Admin')) ||
						(authRoles && authRoles.includes('Owner'))) && (
						<>
							<IconEdit
								onClick={(e) => editDivisionFunc(e)}
								tabIndex="0"
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										editDivisionFunc(e);
									}
								}}
								style={{
									color: 'darkblue',
									fontSize: '21px',
									cursor: 'pointer',
								}}
								name="create-outline"
							></IconEdit>
							<IconTrash
								onClick={(e) => deleteDivisionFunc(e)}
								tabIndex="0"
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										deleteDivisionFunc(e);
									}
								}}
								style={{ color: 'red', fontSize: '21px', cursor: 'pointer' }}
								name="trash-outline"
							></IconTrash>
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
