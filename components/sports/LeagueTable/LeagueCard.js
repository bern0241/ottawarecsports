/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import EditLeagueModal from '@/components/common/sports/Leagues/EditLeagueModal';
import DeleteLeagueModal from '@/components/common/sports/Leagues/DeleteLeagueModal';
import { useRouter } from 'next/router';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useUser } from '@/context/userContext';
import Link from 'next/link';
import { Tooltip, useTooltip } from '@/utils/handy-dandy-functions';

export default function LeagueCard({
	league,
	sport,
	selectedLeague,
	setSelectedLeague,
	setLeagues,
	listLeaguesFunc,
}) {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [users, setUsers] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const router = useRouter();
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	const {
		tooltipX,
		tooltipY,
		handleMouseEnterTooltip,
		handleMouseLeaveTooltip,
	} = useTooltip();
	const [editTP, setEditTP] = useState(false);
	const [trashTP, setTrashTP] = useState(false);

	useEffect(() => {
		setUsers([]);
		getUserListByNames(league.coordinators);
	}, []);

	const getUserListByNames = (coordinators) => {
		setUsers([]);
		coordinators.forEach((coordinator) => {
			var params = {
				UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID,
				Username: coordinator,
			};
			cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				// else     console.log(data);           // successful response
				setUsers((users) => {
					return uniqueByUsername([...users, data]);
				});
			});
		});
	};

	function uniqueByUsername(items) {
		const set = new Set();
		return items.filter((item) => {
			const isDuplicate = set.has(item.Username);
			set.add(item.Username);
			return !isDuplicate;
		});
	}

	// const goToUserPage = (e, username) => {
	// 	e.stopPropagation();
	// 	router.push(`/players/${username}`);
	// };

	const clickedLeague = (e) => {
		e.preventDefault();
		setSelectedLeague(league);
	};

	const editLeagueFunc = (e) => {
		e.stopPropagation();
		setEditModal(!editModal);
	};

	const deleteLeagueFunc = (e) => {
		e.stopPropagation();
		setDeleteModal(!deleteModal);
	};

	return (
		<>
			<tr
				tabIndex='0'
				onKeyDown={(e) => {
					if (e.key === ' ') {
						clickedLeague(e);
					}
				}}
				onClick={(e) => clickedLeague(e)}
				className="bg-white border border-gray-400 cursor-pointer"
			>
				<th
					scope="row"
					className="relative px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					{selectedLeague && selectedLeague.id === league.id && (
						<div className="w-[.5rem] h-[100%] top-0 left-0 bg-blue-900 absolute" />
					)}
					{league.name}
				</th>
				<td className="py-3">
					<ul className="text-center hidden sm:contents">
						{users &&
							users.map((coordinator, index) => (
								<React.Fragment key={index}>
										<Link
											className="underline text-blue-700 py-[.2rem] block"
											// onClick={(e) => goToUserPage(e, coordinator.Username)}
											href={`/players/${coordinator.Username}`}
										>
											{
												coordinator.UserAttributes.find(
													(o) => o.Name === 'name'
												)['Value']
											}{' '}
											{
												coordinator.UserAttributes.find(
													(o) => o.Name === 'family_name'
												)['Value']
											}
										</Link>
								</React.Fragment>
							))}
					</ul>
				</td>
				<td className="flex gap-3 py-3 justify-center items-center pr-5 ">
					{((authRoles && authRoles.includes('Admin')) ||
						(authRoles && authRoles.includes('Owner'))) && (
							<>
							<div className="flex-grow"></div>
							
							<button onClick={(e) => editLeagueFunc(e)}>
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
							{editTP && <Tooltip text="Edit league" 
											style={{ left: tooltipX, top: tooltipY }} />}
							</button>
							<button onClick={(e) => deleteLeagueFunc(e)}>
							<IconTrash
								onMouseEnter={(e) => handleMouseEnterTooltip(e, setTrashTP)}
								onMouseLeave={(e) => handleMouseLeaveTooltip(setTrashTP)}
								style={{ color: 'red', fontSize: '21px', cursor: 'pointer' }}
								name="create-outline"
							></IconTrash>
							{trashTP && <Tooltip text="Delete league" 
											style={{ left: tooltipX, top: tooltipY }} />}
							</button>
						</>
					)}
				</td>
			</tr>

			{editModal && (
				<EditLeagueModal
					league={league}
					setOpenModal={setEditModal}
					sport={sport}
					setLeagues={setLeagues}
					setSelectedLeague={setSelectedLeague}
					getUserListByNames={getUserListByNames}
				/>
			)}
			{deleteModal && (
				<DeleteLeagueModal
					leagueInfo={league}
					setDeleteModal={setDeleteModal}
					listLeaguesFunc={listLeaguesFunc}
				/>
			)}
		</>
	);
}
