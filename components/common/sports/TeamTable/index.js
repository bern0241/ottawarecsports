/**
 * Last updated: 2023-04-04
 *
 * Author(s):
 * Justin Bernard <bern0241@algonquinlive.com>
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useState, useEffect } from 'react';
import TeamCard from './TeamCard';
import { getLeague } from '@/src/graphql/queries';
import {
	getDivisionShort,
	getSeasonShort,
	listTeamDivisionsShort,
} from '@/src/graphql/custom-queries';
import { API } from '@aws-amplify/api';
import { useRouter } from 'next/router';
import CreateButton from '../../CreateButton';
import AddTeamDropdown from './AddTeamDropdown';
import { useUser } from '@/context/userContext';

export default function TeamTable() {
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [isCoordinator, setIsCoordinator] = useState(false);

	const [league, setLeague] = useState();
	const [season, setSeason] = useState();
	const [division, setDivision] = useState();
	const [teamDivisions, setTeamDivisions] = useState([]);
	const [addTeamModal, setAddTeamModal] = useState(false);
	const router = useRouter();
	const { divisionID } = router.query;
	/**
	 * This useEffect fetches the division -> season -> league (in this order) for this page
	 */
	const moveUpLeagueId = async () => {
		// DIVISION
		const apiDataDivision = await API.graphql({
			query: getDivisionShort,
			variables: { id: divisionID },
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

	useEffect(() => {
		if (!divisionID) return;
		const callMeAsync = async () => {
			moveUpLeagueId();
			getDivisionFunc(divisionID);
			listTeamDivisionsFunc(divisionID);
		};
		callMeAsync();
	}, [divisionID]);

	useEffect(() => {
		if (league) {
			isCoordinatorOfLeagueCheck();
		}
	}, [league]);

	const isCoordinatorOfLeagueCheck = () => {
		if (league.coordinators.includes(user?.username)) {
			setIsCoordinator(true);
		} else {
			setIsCoordinator(false);
		}
	};

	const getDivisionFunc = async () => {
		const apiData = await API.graphql({
			query: getDivisionShort,
			variables: { id: divisionID },
		});
		const data = await apiData.data.getDivision;
		setDivision(data);
	};

	const listTeamDivisionsFunc = async () => {
		const timer = setTimeout(async () => {
			try {
				const variables = {
					filter: {
						divisionId: {
							eq: divisionID,
						},
					},
				};
				const teamDivisions = await API.graphql({
					query: listTeamDivisionsShort,
					variables: variables,
				});
				setTeamDivisions(teamDivisions.data.listTeamDivisions.items);
			} catch (error) {
				console.log(error);
			}
		}, 500);
		return () => clearTimeout(timer);
	};

	return (
		<>
			<div className="relative overflow-x-auto mx-auto px-4 w-full my-[1.3rem]">
				<table className="w-full text-sm text-left border border-gray-400">
					<thead className="text-md text-black bg-white">
						<tr>
							<th scope="col" className="text-lg font-medium px-6 py-[4.4rem]">
								<p className="absolute translate-y-[-57px]">
									<b>League</b> - {league?.name} <br />
									<b>Season</b> - {season?.name} <br />
									<b>Division</b> - {division?.name} <br />
									{/* <span className='font-light italic'>All Teams</span> */}
								</p>
							</th>
							<th scope="col" className="font-medium px-6 py-4"></th>
							<th scope="col" className="font-medium px-6 py-4"></th>
							<th scope="col" className="font-medium">
								<div className="absolute top-4 right-8 ">
									{(isCoordinator ||
										(authRoles && authRoles.includes('Admin')) ||
										(authRoles && authRoles.includes('Owner'))) && (
										<CreateButton
											label="Add Any Team"
											state={addTeamModal}
											setState={setAddTeamModal}
										/>
									)}
								</div>
							</th>
						</tr>
					</thead>
					<thead className="text-xs border border-gray-300 text-black bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
						<tr>
							<th
								scope="col"
								className="font-light px-6 py-2 border-l-[1px] border-gray-400"
							>
								Name
							</th>
							<th scope="col" className="font-light px-6 py-2 text-center">
								Captain (s)
							</th>
							<th scope="col" className="font-light px-6 py-2 text-center">
								Members
							</th>
							<th
								scope="col"
								className="font-light py-2 border-r-[1px] text-center border-gray-400"
							>
								Remove
							</th>
						</tr>
					</thead>
					<tbody>
						{teamDivisions &&
							teamDivisions.map((teamDiv) => (
								<React.Fragment key={teamDiv.id}>
									<TeamCard
										teamDivision={teamDiv}
										listTeamDivisionsFunc={listTeamDivisionsFunc}
									/>
								</React.Fragment>
							))}
						{teamDivisions && teamDivisions.length === 0 && (
							<tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
								<th
									scope="row"
									className="px-6 my-2 font-medium whitespace-nowrap dark:text-white flex items-center justify-center text-xs absolute left-0 right-0 mx-auto italic"
								>
									No teams for this division.
								</th>
								<td className="px-6 py-4"></td>
								<td className="px-6 py-4"></td>
								<td className="flex gap-4 px-6 py-4 text-center"></td>
							</tr>
						)}

						<tr className="bg-white border-b-[1px] border-t-[1px] border-gray-500">
							<th
								scope="row"
								className="px-6 py-6 font-medium whitespace-nowrap dark:text-white flex items-center gap-1 text-blue-700 cursor-pointer"
							></th>
							<td className="px-6 py-4"></td>
							<td className="px-6 py-4"></td>
							<td className="flex gap-4 px-6 py-4 text-center"></td>
						</tr>
					</tbody>
				</table>
			</div>
			{addTeamModal && (
				<AddTeamDropdown
					setOpenDropdown={setAddTeamModal}
					teamDivisions={teamDivisions}
					listTeamDivisionsFunc={listTeamDivisionsFunc}
				/>
			)}
		</>
	);
}
