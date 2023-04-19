/**
 * Last updated: 2023-04-03
 *
 * Author(s):
 * Ghazaldeep Kaur <kaur0762@algonquinlive.com>
 */

import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'flowbite-react';
import { IconChevronLeft } from '@tabler/icons-react';
import Image from 'next/image';
import { getImageFromS3, getTeam } from '@/utils/graphql.services';
import AWS from 'aws-sdk';
import { useUser } from '@/context/userContext';
import { API } from 'aws-amplify';
import EditTeamModal from '@/components/teams/EditTeamModal';
import AddMemberDropdown from '@/components/teams/AddMemberDropdown';
import { listPlayers } from '@/src/graphql/queries';
import MemberCard from '@/components/teams/teamIdPage/MemberCard';
import { getDivisionShort, getSeasonShort } from '@/src/graphql/custom-queries';
import { getLeague } from '@/src/graphql/queries';

export default function TeamProfile() {
	const [team, setTeam] = useState();
	const [captains, setCaptains] = useState([]);
	const [members, setMembers] = useState([]);
	const [profileImage, setProfileImage] = useState('');
	const [playerUsername, setPlayerUsername] = useState([]);
	// Opens user dropdown
	const [openDropdown, setOpenDropdown] = useState(false);
	const [editModal, setEditModal] = useState(false);
	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [isCaptain, setIsCaptain] = useState(false);

	const [isCoordinator, setIsCoordinator] = useState(false);
	const [leagues, setLeagues] = useState([]);
	const [season, setSeason] = useState();
	const [division, setDivision] = useState();

	const router = useRouter();
	const { teamId } = router.query;
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	/**
	 * This function fetches the division -> season -> league (in this order) for this page
	 */
	const moveUpLeagueId = async () => {
		if (team.Divisions.items.length === 0) return;
		team.Divisions.items.map(async (_division) => {
			if (!_division.divisionId) return;
			// DIVISION
			const apiDataDivision = await API.graphql({
				query: getDivisionShort,
				variables: { id: _division.divisionId },
			});
			const divisionData = await apiDataDivision.data.getDivision;
			setDivision(divisionData);
			// SEASON
			if (!divisionData?.season) return;
			const apiDataSeason = await API.graphql({
				query: getSeasonShort,
				variables: { id: divisionData?.season },
			});
			const seasonData = await apiDataSeason.data.getSeason;
			setSeason(seasonData);
			// LEAGUE
			if (!seasonData?.league) return;
			const apiDataLeague = await API.graphql({
				query: getLeague,
				variables: { id: seasonData?.league },
			});
			const leagueData = await apiDataLeague.data.getLeague;
			setLeagues((leagues) => {
				return uniqueById([...leagues, leagueData]);
			});
		});
	};

	function uniqueById(items) {
		const set = new Set();
		return items.filter((item) => {
			const isDuplicate = set.has(item.id);
			set.add(item.id);
			return !isDuplicate;
		});
	}

	useEffect(() => {
		if (!teamId) {
			return;
		}
		const callMeAsync = async () => {
			await fetchTeam();
			await fetchPlayersFromTeam();
		};
		callMeAsync();
	}, [teamId]);

	useEffect(() => {
		if (leagues) {
			isCoordinatorOfLeagueCheck();
		}
	}, [leagues]);

	const isCoordinatorOfLeagueCheck = () => {
		let leagueCoordinator = false;
		leagues.forEach((league) => {
			if (league.coordinators.includes(user?.username)) {
				leagueCoordinator = true;
			}
		});
		setIsCoordinator(leagueCoordinator);
	};

	useEffect(() => {
		if (team != undefined) {
			fetchCaptains(team.captains);
			getPicture();
			fetchPlayer();
			moveUpLeagueId();
		}
	}, [team]);

	const fetchTeam = async () => {
		const data = await getTeam(teamId);
		setTeam(data);
	};

	const fetchPlayer = async () => {
		// if(!playerUsername) return;
		setMembers([]);
		playerUsername.forEach(async (player) => {
			const params = {
				Username: player,
				UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID,
			};
			cognitoidentityserviceprovider.adminGetUser(params, function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else {
					setMembers((members) => [...members, data]);
					return;
				} // successful response
			});
		});
	};

	const fetchCaptains = async (myCaptains) => {
		try {
			if (myCaptains === null) return;
			setCaptains([]);
			myCaptains.forEach(async (captain) => {
				const params = {
					Username: captain,
					UserPoolId: process.env.NEXT_PUBLIC_USERPOOLID,
				};
				cognitoidentityserviceprovider.adminGetUser(
					params,
					function (err, data) {
						if (err) console.log(err, err.stack); // an error occurred
						else {
							setCaptains((captains) => {
								return uniqueByUsername([...captains, data]);
							});
							// return;
						}
					}
				);
			});
			isCaptainCheckFunc();
		} catch (error) {
			console.log(error);
		}
	};
	function uniqueByUsername(items) {
		const set = new Set();
		return items.filter((item) => {
			const isDuplicate = set.has(item.Username);
			set.add(item.Username);
			return !isDuplicate;
		});
	}

	// CHECKS IF USER IS A CAPTAIN
	useEffect(() => {
		if (captains) {
			isCaptainCheckFunc();
		}
	}, [captains]);

	const isCaptainCheckFunc = () => {
		if (captains) {
			const captainUsernames = captains.map((captain) => captain.Username);
			if (captainUsernames.includes(user?.username)) {
				setIsCaptain(true);
			} else {
				setIsCaptain(false);
			}
		}
	};

	//Function for gettin profile image.

	const getPicture = async () => {
		if (!team.team_picture)
			return setProfileImage('/Logo.svg');
		const url = await getImageFromS3(team.team_picture);
		setProfileImage(url);
	};

	const fetchPlayersFromTeam = async () => {
		const timer = setTimeout(async () => {
			const variables = {
				filter: {
					teamID: {
						eq: teamId,
					},
				},
			};
			const players = await API.graphql({
				query: listPlayers,
				variables: variables,
			});
			setMembers(players.data.listPlayers.items);
		}, 550);
		return () => clearTimeout(timer);
	};

	const goToPlayerPage = (e, user) => {
		e.preventDefault();
		router.push(`/players/${user.Username}`);
	};

	return (
		<>
			<Head>
				<title>Ottawa Rec Sports</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/ORS-Logo.png" />
			</Head>
			<main className="w-full flex flex-col gap-6 p-[20px] pt-0">
				{/* Edit Modal */}
				<EditTeamModal
					isVisible={editModal}
					setIsVisible={setEditModal}
					teamId={teamId}
					team={team}
				/>
				{/* Results */}
				<div className="flex flex-col w-full h-auto bg-white border border-brand-neutral-300 rounded-md">
					<div className="flex justify-between py-3 px-5 border-b border-brand-neutral-300">
						<h2 className="text-xl sm:text-2xl self-center font-medium">
							{team && team.name}
						</h2>
						<Button
							pill={true}
							className="sm:py-0.5 sm:pr-3 bg-blue-900 hover:bg-blue-800"
							onClick={() => router.back()}
						>
							<div className="hidden sm:contents">
								<IconChevronLeft className="mr-2 h-5 w-5" />
							</div>
							Back
						</Button>
					</div>

					<div className="grid grid-cols-3 gap-4 p-8">
						{/* Team Image */}
						<div className="col-span-3 sm:col-span-1 row-span-2 flex flex-col gap-4">
							<img
								src={profileImage}
								className="rounded-full self-center w-[200px] h-[200px] object-cover"
								alt="Team profile image."
							></img>
							<div className="flex justify-center gap-1">
								<Image
									src="/images/medal.png"
									width="26"
									height="26"
									alt="Medal"
								/>
								<Image
									src="/images/medal.png"
									width="26"
									height="26"
									alt="Medal"
								/>
								<Image
									src="/images/medal.png"
									width="26"
									height="26"
									alt="Medal"
								/>
							</div>
							{(isCaptain ||
								isCoordinator ||
								(authRoles && authRoles.includes('Admin')) ||
								(authRoles && authRoles.includes('Owner'))) && (
								<button
									onClick={() => setEditModal(true)}
									type="button"
									className="border border-brand-blue-800 text-brand-blue-800 h-9 w-full rounded-2xl font-regular mb-3"
								>
									Edit Team Details
								</button>
							)}
						</div>

						{/* Player Information */}
						<div className="col-span-3 sm:col-span-2 grid grid-cols-2 gap-y-4 gap-x-8">
							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light text-sm sm:text-base">
									Team Name
								</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{team && team.name}
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light text-sm sm:text-base">
									Team Captain (s)
								</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{captains &&
										captains.map((captain, index) => (
											// <>
											<p
												className="cursor-pointer"
												onClick={(e) => goToPlayerPage(e, captain)}
												key={index}
											>
												{
													captain.UserAttributes.find((o) => o.Name === 'name')[
														'Value'
													]
												}{' '}
												{
													captain.UserAttributes.find(
														(o) => o.Name === 'family_name'
													)['Value']
												}
											</p>
										))}
								</div>
							</div>
							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-ligh text-sm sm:text-baset">Sport</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									Soccer
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light text-sm sm:text-base">
									Members
								</h3>
								<div className="py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									{team && team.Players.items.length}
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-light text-sm sm:text-base">
									Home Colours
								</h3>
								<div className="flex flex-wrap gap-4 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									<div
										style={{ backgroundColor: team?.home_colour }}
										className="w-6"
									/>
									<div>{team ? team.home_colour : ' '}</div>
								</div>
							</div>

							<div className="col-span-1 flex flex-col">
								<h3 className="mb-1 font-ligh text-sm sm:text-baset">
									Away Colours
								</h3>
								<div className="flex flex-wrap gap-4 py-2 px-3 border rounded-md border-brand-blue-900/25 font-medium">
									<div
										style={{ backgroundColor: team?.away_colour }}
										className="w-6"
									/>
									<div>{team ? team.away_colour : ' '}</div>
								</div>
							</div>

							{/* Player Teams */}
							<div className="col-span-2 mt-6 mb-10">
								<div className="w-full mx-auto max-w-[37rem] border border-brand-blue-900/25 rounded">
									<div className="w-full relative flex flex-row justify-between items-center my-1">
										<h2 className="mb-1 p-2 ml-1 text-[.92rem] font-light">
											Team Members
										</h2>
										{(isCaptain ||
											isCoordinator ||
											(authRoles && authRoles.includes('Admin')) ||
											(authRoles && authRoles.includes('Owner'))) && (
											<button
												onClick={(e) => setOpenDropdown(!openDropdown)}
												type="button"
												className="bg-brand-blue-800 rounded mr-1 px-5 py-1 text-white font-regular text-center rounded-lg text-sm sm:text-base"
											>
												Add Members
											</button>
										)}
										{/* // DROP */}
										{openDropdown && (
											<AddMemberDropdown
												members={members}
												setOpenDropdown={setOpenDropdown}
												fetchPlayersFromTeam={fetchPlayersFromTeam}
											/>
										)}
									</div>

									{members &&
										members.map((member) => (
											<div
												className="flex relative border-t border-brand-blue-900/25 pr-3 justify-between"
												key={member.id}
											>
												<MemberCard
													member={member}
													fetchPlayersFromTeam={fetchPlayersFromTeam}
													fetchCaptains={fetchCaptains}
													isCaptain={isCaptain}
													isCoordinator={isCoordinator}
												/>
											</div>
										))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
}
