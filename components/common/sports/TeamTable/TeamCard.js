/**
 * Last updated: 2023-04-06
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import RemoveTeamModal from './RemoveTeamModal';
import { IconTrash } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { getImageFromS3 } from '@/utils/graphql.services';
import AWS from 'aws-sdk';
import Link from 'next/link';
import { useUser } from '@/context/userContext';

export default function TeamCard({ teamDivision, listTeamDivisionsFunc }) {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [removeModal, setRemoveModal] = useState(false);
	const [captains, setCaptains] = useState([]);
	const [membersCount, setMembersCount] = useState(0);
	const [teamImage, setTeamImage] = useState(null);
	const router = useRouter();

	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	useEffect(() => {
		if (teamDivision.team.Players.items) {
			setMembersCount(teamDivision.team.Players.items.length);
		}
		getTeamImage();
	}, [listTeamDivisionsFunc]);

	useEffect(() => {
		fetchCaptains(teamDivision.team.captains);
	}, []);

	const fetchCaptains = async (myCaptains) => {
		if (teamDivision.team.captains === null) return;
		setCaptains([]);
		myCaptains.forEach(async (captain) => {
			const params = {
				Username: captain,
				UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID,
			};
			cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
				if (err) console.log(err, err.stack);
				else {
					setCaptains((captains) => {
						return uniqueByUsername([...captains, data]);
					});
				}
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

	const getTeamImage = async () => {
		if (
			teamDivision.team.team_picture === null ||
			teamDivision.team.team_picture === ''
		) {
			setTeamImage(null);
		} else {
			const url = await getImageFromS3(teamDivision.team.team_picture);
			setTeamImage(url);
		}
	};

	const removeTeamFunc = (e) => {
		e.stopPropagation();
		setRemoveModal(!removeModal);
	};

	const goToTeamPage = (e) => {
		e.preventDefault();
		router.push(`/teams/${teamDivision.team.id}`);
	};

	const handleClick = (e) => {
		e.stopPropagation();
	};

	return (
		<>
			<tr
				tabIndex='0'
				onKeyDown={(e) => {
					if (e.key === ' ') {
						goToTeamPage(e);
					}
				}}
				onClick={(e) => goToTeamPage(e)}
				onKeyDown={(e) => {
					if (e.key === ' ') {
						goToTeamPage(e);
					}
				}}
				className="bg-white border border-gray-400 cursor-pointer"
			>
				<th
					scope="row"
					className="relative px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
				>
					<div className="flex items-center gap-2 pr-20">
						<img
							style={{ objectFit: 'cover' }}
							width={132}
							height={132}
							className="w-[3.4rem] h-[3.4rem] rounded-full shadow-md border border-black"
							src={`${teamImage ? teamImage : '/Logo.svg'}`}
						/>
						<p>{teamDivision.team.name}</p>
					</div>
				</th>
				<td className="px-6 py-3 hidden sm:block">
					{captains &&
						captains.map((captain, index) => (
							// <>
							<Link
								href={`/players/${captain.Username}`}
								className="cursor-pointer text-blue-700 underline text-center block py-[.2rem]" 
								onClick={(e) => handleClick(e)}
								key={index}
							>
								{captain.UserAttributes.find((o) => o.Name === 'name')['Value']}{' '}
								{
									captain.UserAttributes.find((o) => o.Name === 'family_name')[
										'Value'
									]
								}
							</Link>
						))}
				</td>
				<td className="px-6 py-3 text-center text-lg">{membersCount}</td>

				{(authRoles && authRoles.includes('User') && (
				<td className="text-center">
					<button onClick={(e) => removeTeamFunc(e)}>
						<IconTrash
							style={{
								color: 'red',
								fontSize: '21px',
								cursor: 'pointer',
								textAlign: 'center',
								marginLeft: 'auto',
								marginRight: 'auto',
							}}
							name="trash-outline"
						></IconTrash>
					</button>
				</td>
				))}
				<td className='block sm:hidden'></td>
			</tr>

			{removeModal && (
				<RemoveTeamModal
					teamDivision={teamDivision}
					setRemoveModal={setRemoveModal}
					listTeamDivisionsFunc={listTeamDivisionsFunc}
				/>
			)}
		</>
	);
}
