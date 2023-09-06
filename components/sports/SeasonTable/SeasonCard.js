/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { IconEdit, IconTrash, IconListDetails } from '@tabler/icons-react';
import EditSeasonModal from '@/components/common/sports/Seasons/EditSeasonModal';
import DeleteSeasonModal from '@/components/common/sports/Seasons/DeleteSeasonModal';
import { useUser } from '@/context/userContext';
import { Tooltip, useTooltip } from '@/utils/handy-dandy-functions';

export default function SeasonCard({
	season,
	selectedSeason,
	setSelectedSeason,
	selectedLeague,
	listSeasonsFunc,
}) {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [isCoordinator, setIsCoordinator] = useState(false);
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

	useEffect(() => {
		if (selectedLeague) {
			listSeasonsFunc();
			isCoordinatorOfLeagueCheck();
		}
		if ((selectedLeague = null)) {
			setSeasons([]);
			setSelectedSeason(null);
		}
	}, [selectedLeague]);

	const isCoordinatorOfLeagueCheck = () => {
		if (selectedLeague.coordinators.includes(user?.username)) {
			setIsCoordinator(true);
		} else {
			setIsCoordinator(false);
		}
	};

	const clickedSeason = (e) => {
		e.preventDefault();
		setSelectedSeason(season);
	};

	const convertDateReadable = (date) => {
		let convertedDate = date.replaceAll('-', '/');
		let newDate = new Date(convertedDate);
		newDate.toString().replaceAll('-', '/');
		let newDateSplit = newDate.toString().split(' ');
		let newDateConcatnate = `${newDateSplit[1]} ${newDateSplit[2]}`;
		return newDateConcatnate;
	};

	const goToSchedulePage = (e) => {
		e.preventDefault();
		router.push({
			pathname: '/schedule/soccer',
			query: { leagueID: selectedLeague.id, seasonID: selectedSeason.id },
		});
	};

	const editSeasonFunc = (e) => {
		e.stopPropagation();
		setEditModal(!editModal);
	};

	const deleteSeasonFunc = (e) => {
		e.stopPropagation();
		setDeleteModal(!deleteModal);
	};

	return (
		<>
			<tr
				tabIndex='0'
				onClick={(e) => clickedSeason(e)}
				onKeyDown={(e) => {
					if (e.key === ' ') {
						clickedSeason(e);
					}
				}}
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
					<p className="hidden sm:contents">
						{convertDateReadable(season.start_date)}
					</p>
				</td>
				<td className="text-center px-6 py-3">
					<p className="hidden sm:contents">
						{convertDateReadable(season.end_date)}
					</p>
				</td>
				<td className="flex gap-2 py-3 justify-center pr-5">
					<div className="flex-grow"></div>
					<button onClick={(e) => goToSchedulePage(e)}>
					<div className='relative'>
						<IconListDetails
							onMouseEnter={(e) => handleMouseEnterTooltip(e, setScheduleTP)}
          					onMouseLeave={(e) => handleMouseLeaveTooltip(setScheduleTP)}
							style={{ color: 'black', fontSize: '21px', cursor: 'pointer' }}
							name="people"
							>
						</IconListDetails>
						{scheduleTP && <Tooltip text="Schedule page" 
												style={{ left: tooltipX, top: tooltipY }} />}
					</div>
					</button>

					{(isCoordinator ||
						(authRoles && authRoles.includes('Admin')) ||
						(authRoles && authRoles.includes('Owner'))) && (
						<>
            			<button onClick={(e) => editSeasonFunc(e)}>
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
						</>
					)}
				</td>
			</tr>

			{deleteModal && (
				<DeleteSeasonModal
					leagueInfo={selectedLeague}
					seasonInfo={season}
					setDeleteModal={setDeleteModal}
					listSeasonsFunc={listSeasonsFunc}
				/>
			)}
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
