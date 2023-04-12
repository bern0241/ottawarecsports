/**
 * Last updated: 2023-04-11
 *
 * Author(s):
 * Greg Coghill (cogh0020@algonquinlive.com)
 * Son Tran <tran0460@algonquinlive.com>
 */

import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import DropdownInput from '../common/DropdownInput';
import LocationsDropdown from './LocationsDropdown';
import { useRouter } from 'next/router';
import makeid from '@/utils/makeId';
import { createGame } from '@/src/graphql/mutations';
import {
	listPlayers,
	listLocations as listLocationsQuery,
} from '@/src/graphql/queries';
import TeamDropDown from './TeamDropDown';
import TeamCardSelected from './TeamCardSelected';
import RefereeSearchBar from './RefereeSearchBar';
import RefereeChip from './RefereeChip';
import AWS from 'aws-sdk';
import DatePicker from 'tailwind-datepicker-react';
import TimeKeeper from 'react-timekeeper';
import moment from 'moment-timezone';
import { convertColorsDisplay } from '@/utils/handy-dandy-functions';
import MultiTeamSelectDropDown from './MultiTeamSelectDropDown';
import { scheduleGamesAutomatically } from '@/utils/graphql.services';

const ses = new AWS.SES();
const lambda = new AWS.Lambda();
const sns = new AWS.SNS();

const TeamBatchSelect = ({
	isVisible,
	setIsVisible,
	teams,
	selectedDate,
	generatedGames,
	setGeneratedGames,
}) => {
	const { v4: uuidv4 } = require('uuid');
	//const moment = require('moment-timezone');

	const [homeTeam, setHomeTeam] = useState();
	const [awayTeam, setAwayTeam] = useState();
	const [homeColour, setHomeColour] = useState('Red');
	const [awayColour, setAwayColour] = useState('Blue');
	const [matchDate, setMatchDate] = useState('');
	const [referees, setReferees] = useState([]);
	const [startTime, setStartTime] = useState('');
	const [matchLocation, setMatchLocation] = useState('');
	const [uiState, setUiState] = useState('main');

	const [openHomeTeamDrop, setOpenHomeTeamDrop] = useState(false);
	const [openAwayTeamDrop, setOpenAwayTeamDrop] = useState(false);
	const [openRefDrop, setOpenRefDrop] = useState(false);

	//Dates
	const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
	const [showFounded, setShowFounded] = useState(false);
	const [openStartTimeDrop, setOpenStartTimeDrop] = useState(false);

	const [listUsers, setListUsers] = useState([]);
	const [listLocations, setListLocations] = useState([]);
	const [homeEmails, setHomeEmails] = useState([]); //Meant for sending emails out
	const [awayEmails, setAwayEmails] = useState([]); //Meant for sending emails out
	const [homeDisplayColour, setHomeDisplayColour] = useState('Red');
	const [awayDisplayColour, setAwayDisplayColour] = useState('Blue');

	const [selectedTeams, setSelectedTeams] = useState([]);
	const [batchResults, setBatchResults] = useState([]);

	const [message, setMessage] = useState(null);
	const router = useRouter();

	var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
	const divisionID = router.query.id;

	//Options object for the data picker
	const options = {
		title: 'Select Game Date',
		autoHide: true,
		todayBtn: false,
		clearBtn: false,
		//Games can only be scheduled a year in advance
		maxDate: new Date().setFullYear(new Date().getFullYear() + 1),
		minDate: new Date('2009-01-01'),
		theme: {
			background:
				'border border-[1px] border-gray-500 shadow-lg relative right-0',
		},
		icons: {
			prev: () => (
				<ion-icon
					style={{ fontSize: '1.5rem' }}
					name="arrow-back-outline"
				></ion-icon>
			),
			next: () => (
				<ion-icon
					style={{ fontSize: '1.5rem' }}
					name="arrow-forward-outline"
				></ion-icon>
			),
		},
		datepickerClassNames: 'top-12',
		defaultDate: selectedDate ? new Date(selectedDate) : new Date(),
		// defaultDate: new Date(),
		language: 'en',
	};

	useEffect(() => {
		setUiState('main');
		if (selectedDate) {
			setMatchDate(
				new Date(selectedDate)
					.toISOString()
					.toLocaleString('en-CA')
					.split('T')[0]
			);
		} else {
			setMatchDate(new Date().toLocaleString('en-CA').split(',')[0]);
		}
	}, [isVisible, selectedDate]);

	useEffect(() => {
		// .toISOString().split('T')[0])
		setUiState('main');
		fetchLocations();
	}, []);

	const fetchLocations = async () => {
		const _locations = await API.graphql({
			query: listLocationsQuery,
		});
		setListLocations(_locations.data.listLocations.items);
	};

	function getConvertedDate(date) {
		let yourDate = date;
		yourDate.toISOString().split('T')[0];
		const offset = yourDate.getTimezoneOffset();
		yourDate = new Date(yourDate.getTime() - offset * 60 * 1000);
		return yourDate.toISOString().split('T')[0];
	}

	const handleChange = (selectedDate) => {
		setMatchDate(getConvertedDate(selectedDate));
	};
	const handleClose = (state) => {
		setShowFounded(state);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			setMessage(null);
		}, 5000);
		return () => clearTimeout(timer);
	}, [message]);

	useEffect(() => {
		if (homeTeam) {
			setHomeColour(homeTeam.home_colour);
		}
	}, [homeTeam]);

	useEffect(() => {
		if (awayTeam) {
			setAwayColour(awayTeam.away_colour);
		}
	}, [awayTeam]);

	useEffect(() => {
		fetchRefereeList();
		setStartTime(getCurrentTime());
	}, []);

	const getCurrentTime = () => {
		const now = new Date();
		let hours = now.getHours();
		let minutes = now.getMinutes();
		// Convert to 12-hour format
		const isPM = hours >= 12;
		hours = hours % 12;
		hours = hours ? hours : 12; // "0" should be "12"
		minutes = minutes < 10 ? '0' + minutes : minutes;
		// Add "am" or "pm"
		const suffix = isPM ? 'pm' : 'am';
		// Construct the formatted time string
		const formattedTime = `${hours}:${minutes} ${suffix}`;
		//console.log(formattedTime);
		return formattedTime;
	};

	const generateMatchFunc = (e) => {
		e.preventDefault();
		const dateTime = `${matchDate} ${startTime}`;
		const convertedTime = moment(dateTime, 'YYYY-MM-DD HH:mm A');
		const refereeUsernames = referees.map((a) => a.username);
		let matches = scheduleGamesAutomatically(selectedTeams, {
			division: divisionID,
			date: convertedTime,
			location: matchLocation,
			status: 'NOT_STARTED',
			home_color: 'Red',
			away_color: 'Blue',
			home_roster: JSON.stringify([{}]), //JSON.stringify(homeTeam.Players.items),
			away_roster: JSON.stringify([{}]), //JSON.stringify(awayTeam.Players.items),
			home_score: 0,
			away_score: 0,
			goals: [],
			round: 1,
			referees: refereeUsernames,
			// gameHomeTeamId: '', //homeTeam.id,
			// gameAwayTeamId: '', //awayTeam.id,
		});
		setBatchResults(matches);
		setGeneratedGames(batchResults);
		console.log(batchResults);
		const timer = setTimeout(() => {
			setIsVisible(false);
		}, 1000);
		return () => clearTimeout(timer);
	};

	useEffect(() => {
		if (batchResults) setGeneratedGames(batchResults);
	}, [batchResults]);

	useEffect(() => {
		if (uiState === 'send-emails') {
			setEmailsToAllPlayers();
		}
	}, [uiState]);

	const setEmailsToAllPlayers = async () => {
		if (homeTeam === undefined) return;
		if (awayTeam === undefined) return;
		console.log('HOME', homeTeam.Players.items);
		console.log('AWAY', awayTeam.Players.items);

		if (homeTeam.Players.items.length !== 0) {
			homeTeam.Players.items.map(async (player) => {
				await adminGetUserEmail(homeEmails, setHomeEmails, player.user_id);
			});
		}

		if (awayTeam.Players.items.length !== 0) {
			awayTeam.Players.items.map(async (player) => {
				await adminGetUserEmail(awayEmails, setAwayEmails, player.user_id);
			});
		}
	};

	const sendEmails = () => {
		if (homeTeam && homeEmails) {
			sendEmailsMessage(homeTeam, awayTeam, homeEmails);
		}
		if (awayTeam && awayEmails) {
			sendEmailsMessage(awayTeam, homeTeam, awayEmails);
		}
	};

	const sendEmailsMessage = async (userTeam, otherTeam, emails) => {
		let matchDateConvert = matchDate.replaceAll('-', '/');
		let matchDateDisplay = new Date(matchDateConvert).toDateString();
		let parseLocation = JSON.parse(matchLocation);

		const params = {
			Destination: {
				ToAddresses: emails,
			},
			Message: {
				Body: {
					Text: {
						Data: `Your team (${userTeam.name}) will be facing team ${otherTeam.name} on ${matchDateDisplay} at ${startTime}! You will be playing at the ${parseLocation.name}. You can find the address here: ${parseLocation.weblink}. Be there on time!`,
					},
				},
				Subject: {
					Data: `You have an upcoming game on ${matchDateDisplay} at the ${parseLocation.name}`,
				},
			},
			Source: 'justin.bernard320@gmail.com',
		};

		ses.sendEmail(params, (err, data) => {
			if (err) {
				alert('Error sending emails to all');
				console.log(err, err.stack);
			} else {
				router.reload();
				console.log('Email sent successfully:', data);
			}
		});
	};

	const adminGetUserEmail = async (state, setState, username) => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t',
			Username: username,
		};
		await cognitoidentityserviceprovider.adminGetUser(
			params,
			function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				// else     console.log(data);           // successful response
				let data2 = data.UserAttributes.find((o) => o.Name === 'email')[
					'Value'
				];
				setState((state) => {
					return uniqueBySelf([...state, data2]);
				});
			}
		);
	};

	function uniqueBySelf(items) {
		const set = new Set();
		return items.filter((item) => {
			const isDuplicate = set.has(item);
			set.add(item);
			return !isDuplicate;
		});
	}

	//Fetch our referees in advance
	const fetchRefereeList = (e) => {
		var params = {
			UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
		};
		cognitoidentityserviceprovider.listUsers(params, function (err, data) {
			if (err) {
				console.log(err, err.stack);
			} else {
				setGroupsForEachUser(data.Users);
				// setListUsers(data.Users);
			}
		});
	};

	const setGroupsForEachUser = (_users) => {
		let users = _users;
		users.map((user) => {
			//Attributes - Groups
			var params = {
				Username: user.Username,
				UserPoolId: 'us-east-1_70GCK7G6t' /* required */,
			};
			cognitoidentityserviceprovider.adminListGroupsForUser(
				params,
				function (err, data) {
					user.Groups = data.Groups.map((group) => group.GroupName);
					setListUsers((listUsers) => {
						return uniqueByUsername([...listUsers, user]);
					});
				}
			);
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

	const resetData = () => {
		//TODO: Clear all fields
		setStartTime(getCurrentTime());
	};

	useEffect(() => {
		if (homeColour) {
			convertColorsDisplay(homeColour, setHomeDisplayColour);
		}
	}, [homeColour]);
	useEffect(() => {
		if (awayColour) {
			convertColorsDisplay(awayColour, setAwayDisplayColour);
		}
	}, [awayColour]);

	return (
		<>
			{uiState === 'main' && (
				<>
					<div
						id="defaultModal"
						tabIndex="-1"
						aria-hidden="true"
						className="fixed top-0 bottom-0 left-0 right-0 z-[200] p-4 max-w-[42rem] mx-auto w-full h-[40rem]"
					>
						<div className="relative w-full h-full">
							{/* <!-- Modal content --> */}
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
								{/* <!-- Modal header --> */}
								<div className="flex items-start justify-between p-4 pb-0 border-b rounded-t dark:border-gray-600">
									<h3 className="text-md font-semibold text-gray-900 dark:text-white">
										Create New Matches
									</h3>
									<button
										onClick={() => {
											resetData();
											setIsVisible(false);
										}}
										type="button"
										className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
										data-modal-hide="defaultModal"
									>
										<svg
											aria-hidden="true"
											className="w-5 h-5"
											fill="currentColor"
											viewBox="0 0 20 20"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												fillRule="evenodd"
												d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
												clipRule="evenodd"
											></path>
										</svg>
										<span className="sr-only">Close modal</span>
									</button>
								</div>
								{/* <!-- Modal body --> */}
								<div className="p-5">
									{/**Teams */}
									<div className="relative cursor-pointer">
										{/* <MultiTeamSelectDropDown /> */}
										<MultiTeamSelectDropDown
											teams={teams}
											selectedTeams={selectedTeams}
											setSelectedTeams={setSelectedTeams}
										/>
										<button></button>
									</div>
									{/**Referees */}
									<div
										className="relative cursor-pointer"
										onClick={() => setOpenRefDrop(!openRefDrop)}
									>
										<label
											for="name"
											className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
										>
											Referee (s)
										</label>
										<input
											value=""
											disabled
											type="text"
											id="name"
											className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
										/>
										<div className="absolute right-2 top-[2.8rem]">
											<ion-icon
												style={{ fontSize: '25px' }}
												name="caret-down-circle-outline"
											></ion-icon>
										</div>
										<div className="flex absolute top-[1.9rem]">
											{referees &&
												referees.map((referee) => (
													<>
														<RefereeChip
															referee={referee}
															referees={referees}
															setReferees={setReferees}
														/>
													</>
												))}
										</div>
									</div>
									{openRefDrop && (
										<>
											<RefereeSearchBar
												OpenDropDown={openRefDrop}
												setOpenDropDown={setOpenRefDrop}
												referees={referees}
												setReferees={setReferees}
												listUsers={listUsers}
											/>
										</>
									)}

									{/**Date */}
									<div className="w-full">
										<label
											for="name"
											className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
										>
											Date
										</label>
										<DatePicker
											options={options}
											onChange={handleChange}
											show={showFounded}
											setShow={handleClose}
										/>
									</div>

									{/**Start Time */}
									<div className="relative">
										{openStartTimeDrop && (
											<>
												<div
													onClick={(e) => setOpenStartTimeDrop(false)}
													className="z-[25] opacity-0 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
												/>
												<div className="absolute z-[50] bottom-[0rem]">
													<TimeKeeper
														time={startTime}
														onChange={(data) => setStartTime(data.formatted12)}
													/>
												</div>
											</>
										)}
										<div
											onClick={(e) => {
												e.preventDefault();
												setOpenStartTimeDrop(!openStartTimeDrop);
											}}
											className="cursor-pointer"
										>
											<label
												htmlFor="startTime"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Start Time
											</label>
											<input
												disabled
												value={startTime}
												onChange={(e) => setStartTime(e.target.value)}
												type="text"
												id="startTime"
												className="cursor-pointer block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
											/>
											<div className="absolute right-2 top-[2.55rem]">
												<ion-icon
													style={{ fontSize: '25px' }}
													name="caret-down-circle-outline"
												></ion-icon>
											</div>
										</div>
									</div>
									{/**Location */}
									<div className="w-full">
										<label
											htmlFor="location"
											className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
										>
											Location
										</label>
										<LocationsDropdown
											listLocations={listLocations}
											state={matchLocation}
											setState={setMatchLocation}
											isCreate={true}
										/>
									</div>
								</div>
								{message && (
									<p
										id="standard_error_help"
										className={`mt-4 text-center text-sm ${
											message.status === 'success'
												? 'text-green-600 dark:text-green-400'
												: 'text-red-600 dark:text-red-400'
										}`}
									>
										<span className="font-medium">{message.message}</span>
									</p>
								)}
								{/* <!-- Modal footer --> */}
								<div className="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
									<button
										onClick={() => {
											setIsVisible(false);
											resetData();
										}}
										data-modal-hide="defaultModal"
										type="button"
										className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
									>
										Cancel
									</button>
									<button
										onClick={(e) => {
											generateMatchFunc(e);
										}}
										data-modal-hide="defaultModal"
										type="button"
										className="text-white bg-blue-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-[2rem] py-2.5 text-center dark:bg-blue-800 dark:hover:bg-blue-900 dark:focus:ring-blue-800"
									>
										Create
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						onClick={(e) => {
							setIsVisible(false);
						}}
						className="z-[150] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
					/>
				</>
			)}
		</>
	);
};

export default TeamBatchSelect;
