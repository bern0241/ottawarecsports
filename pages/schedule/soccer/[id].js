/**
 * Last updated: 2023-04-10
 *
 * Author(s):
 * Son Tran <tran0460@algonquinlive.com>
 * Justin Bernard <bern0241@algonquinlive.com>
 * Greg Coghill <cogh0020@algonquinlive.com>
 */
import MatchesTable from '@/components/schedule/MatchesTable';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Button } from 'flowbite-react';
import { IconCirclePlus } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import { getDivisionGames, getAllTeams } from '@/utils/graphql.services';
import CreateMatchModal from '@/components/schedule/CreateMatchModal';
import { getLeague } from '@/src/graphql/queries';
import { getDivisionShort, getSeasonShort } from '@/src/graphql/custom-queries';

import { API } from 'aws-amplify';
import AWS from 'aws-sdk';
import TeamBatchSelect from '@/components/schedule/TeamBatchSelect';
import EditMatchModal from '@/components/schedule/EditMatchModal';
import DeleteMatchModal from '@/components/schedule/DeleteMatchModal';
import { useUser } from '@/context/userContext';
import GeneratedMatchesTable from '@/components/schedule/GeneratedMatchesTable';

export default function DivisionMatches() {
	const [division, setDivision] = useState();
	const [season, setSeason] = useState();
	const [league, setLeague] = useState();

	const [user, setUser, authRoles, setAuthRoles] = useUser();
	const [modalVisible, setModalVisible] = useState(false);
	const [isEditingMatch, setIsEditingMatch] = useState(false);
	const [matchToEdit, setMatchToEdit] = useState('');
	const [isDeletingMatch, setIsDeletingMatch] = useState(false);
	const [isCoordinator, setIsCoordinator] = useState(false);
	const [selectedDate, setSelectedDate] = useState('');

	const [isMakingBatch, setIsMakingBatch] = useState(false);
	const [generatedGames, setGeneratedGames] = useState([]);
	const [saveBatchGame, setSaveBatchGame] = useState([]);

	const [games, setGames] = useState([]);
	const [teams, setTeams] = useState([]);
	const [referees, setReferees] = useState([]);
	const router = useRouter();
	const { id } = useRouter();
	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

	const fetchReferees = async () => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
			GroupName: 'Referee',
		};
		cognitoidentityserviceprovider.listUsersInGroup(
			params,
			function (err, data) {
				if (err) {
					console.log(err, err.stack);
				} else {
					setReferees(data.Users);
				}
			}
		);
	};
	const getGames = async () => {
		// if (!router.query.divisionID) return;

		if (!router.query.id) return;
		const resp = await getDivisionGames(router.query.id);
		// const resp = await getDivisionGames(router.query.divisionID);
		setGames(resp);
	};
	const getTeams = async () => {
		const resp = await getAllTeams();
		setTeams(resp);
	};
	useEffect(() => {
		getGames();
		getTeams();
		fetchReferees();
		moveUpLeagueId();
	}, [router]);

	/**
	 * This useEffect fetches the division -> season -> league (in this order) for this page
	 */
	const moveUpLeagueId = async () => {
		// DIVISION
		const apiDataDivision = await API.graphql({
			query: getDivisionShort,
			variables: { id: router.query.id },
		});
		const divisionData = await apiDataDivision.data.getDivision;
		setDivision(divisionData);
		// SEASON
		const apiDataSeason = await API.graphql({
			query: getSeasonShort,
			variables: { id: divisionData?.season },
		});
		const seasonData = await apiDataSeason.data.getSeason;
		setSeason(seasonData);
		// LEAGUE
		const apiDataLeague = await API.graphql({
			query: getLeague,
			variables: { id: seasonData?.league },
		});
		const leagueData = await apiDataLeague.data.getLeague;
		setLeague(leagueData);
	};

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

	return (
		<>
			<Head>
				<title>Ottawa Rec Sports - Schedule</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/images/ORS-Logo.png" />
			</Head>

			<main className="w-full flex flex-col gap-6 p-8 pt-0">
				{/* Results */}
				{(isCoordinator ||
					(authRoles && authRoles.includes('Admin')) ||
					(authRoles && authRoles.includes('Owner'))) && (
					<div className="flex flex-row-reverse gap-3">
						<Button
							pill={true}
							className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
							onClick={() => setModalVisible(!modalVisible)}
						>
							<IconCirclePlus className="mr-2 h-5 w-5" />
							Create New Match
						</Button>
						<Button
							pill={true}
							className="py-0.5 px-3 bg-blue-900 hover:bg-blue-800"
							onClick={() => setIsMakingBatch(!isMakingBatch)}
						>
							<IconCirclePlus className="mr-2 h-5 w-5" />
							Create Multiple
						</Button>
					</div>
				)}
				<MatchesTable
					matches={games}
					setMatchToEdit={setMatchToEdit}
					setSaveBatchGame={setSaveBatchGame}
					setIsEditing={setIsEditingMatch}
					setIsDeleting={setIsDeletingMatch}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					isCoordinator={isCoordinator}
				/>
				{generatedGames.length > 0 && (
					<GeneratedMatchesTable
						matches={generatedGames}
						setGeneratedGames={setGeneratedGames}
						setMatchToEdit={setMatchToEdit}
						setIsEditing={setIsEditingMatch}
						setIsDeleting={setIsDeletingMatch}
						setSaveBatchGame={setSaveBatchGame}
						// selectedDate={selectedDate}
						// setSelectedDate={setSelectedDate}
						isCoordinator={isCoordinator}
					/>
				)}
			</main>
			<CreateMatchModal
				isVisible={modalVisible}
				setIsVisible={setModalVisible}
				getGames={getGames}
				selectedDate={selectedDate}
			/>
			{isEditingMatch && (
				<EditMatchModal
					games={games}
					match={matchToEdit}
					makingNewGame={saveBatchGame}
					isVisible={isEditingMatch}
					setGames={setGames}
					getGames={getGames}
					setMakingNewGame={setSaveBatchGame}
					generatedGames={generatedGames}
					setGeneratedGames={setGeneratedGames}
					setIsVisible={setIsEditingMatch}
				/>
			)}
			{isDeletingMatch && (
				<DeleteMatchModal
					match={matchToEdit}
					openModal={isDeletingMatch}
					setOpenModal={setIsDeletingMatch}
				/>
			)}
			{isMakingBatch && (
				<TeamBatchSelect
					isVisible={isMakingBatch}
					teams={teams}
					generatedGames={generatedGames}
					setGeneratedGames={setGeneratedGames}
					setIsVisible={setIsMakingBatch}
				/>
			)}
		</>
	);
}
