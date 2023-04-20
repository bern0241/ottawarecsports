/**
 * Last updated: 2023-04-04
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

// REFERENCES: https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/Welcome.html
// https://tabler.io/icons

import React, { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import EditLeagueModal from '../../../common/sports/Leagues/EditLeagueModal';
import DeleteLeagueModal from '../../../common/sports/Leagues/DeleteLeagueModal';
import { useRouter } from 'next/router';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';

export default function LeagueCard({
	league,
	sport,
	selectedLeague,
	setSelectedLeague,
	setLeagues,
	listLeaguesFunc,
}) {
	const [users, setUsers] = useState([]);
	const [editModal, setEditModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const router = useRouter();
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
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

	const handleClick = (e) => {
		e.stopPropagation();
	};
  
  const goToUserPage = (e, username) => {
		e.stopPropagation();
		router.push(`/players/${username}`);
	};

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
						clickedLeague(e)
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
				<td className="px-6 py-3">
					<ul className="text-center">
						{users &&
							users.map((coordinator, index) => (
								<React.Fragment key={index}>
									<li
										key={index}
										className="text-blue-700 text-sm underline py-[.2rem]"
									>
										<Link href={`/players/${coordinator.Username}`}
                   						onClick={(e) => handleClick(e)}>
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
									</li>
								</React.Fragment>
							))}
					</ul>
				</td>
				<td className="px-6 py-3 text-center">{league.sport}</td>
				<td className="flex gap-3 px-6 py-3 text-center justify-center">
					<div className="flex-grow"></div>
          			<button onClick={(e) => editLeagueFunc(e)}>
					<IconEdit
						style={{ color: 'darkblue', fontSize: '21px', cursor: 'pointer' }}
						name="create-outline"
					></IconEdit>
					</button>
					<button onClick={(e) => deleteLeagueFunc(e)}>
					<IconTrash
						onClick={(e) => deleteLeagueFunc(e)}
						style={{ color: 'red', fontSize: '21px', cursor: 'pointer' }}
						name="create-outline"
					></IconTrash>
					</button>
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
