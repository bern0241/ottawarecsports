import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import DropdownInput from '../common/DropdownInput';
import LocationsDropdown from './LocationsDropdown';
import { useRouter } from 'next/router';
import { createGame } from '@/src/graphql/mutations';
import { listLocations as listLocationsQuery } from '@/src/graphql/queries';
import TeamDropDown from './TeamDropDown';
import TeamCardSelected from './TeamCardSelected';
import RefereeSearchBar from './RefereeSearchBar';
import RefereeChip from './RefereeChip';
import AWS from 'aws-sdk';
import DatePicker from 'tailwind-datepicker-react';
import TimeKeeper from 'react-timekeeper';
import moment from 'moment-timezone';
import { convertColorsDisplay } from '@/utils/handy-dandy-functions';
// var AWS = require('aws-sdk');
const ses = new AWS.SES();
const lambda = new AWS.Lambda();
const sns = new AWS.SNS();

//TODO:
//Get the existing roster of the home/away teams
//Import date picker

const CreateMatchModal = ({ isVisible, setIsVisible, selectedDate }) => {
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
		if (selectedDate && selectedDate !== 'All matches') {
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

	useEffect(() => {
		if (matchLocation) {
			console.log(matchLocation);
		}
	}, [matchLocation]);

	const createNewMatch = async (e) => {
		// let mySavedDate = new Date(matchDate).toDateString().split(' ');
		// let saveDate = `${mySavedDate[1]} ${mySavedDate[2]} ${mySavedDate[3]}`
		// console.log(saveDate);
		e.preventDefault();
		try {
			if (
				homeTeam === null ||
				awayTeam === null ||
				startTime === '' ||
				location === ''
			) {
				setMessage({
					status: 'error',
					message: 'Please fill out all required fields',
				});
				return;
			}
			if (homeTeam.id === awayTeam.id) {
				setMessage({
					status: 'error',
					message: 'Must have two different teams',
				});
				return;
			}
			if (homeColour === awayColour) {
				setMessage({
					status: 'error',
					message: 'Must have two different jersey colors',
				});
				return;
			}
			const dateTime = `${matchDate} ${startTime}`;
			const convertedTime = moment(dateTime, 'YYYY-MM-DD HH:mm A');
			// console.log(convertedTime.format());
			// console.log(matchDate);
			// return;
			const refereeUsernames = referees.map((a) => a.username);
			const matchData = {
				division: divisionID,
				date: convertedTime,
				location: matchLocation,
				status: 'NOT_STARTED',
				home_color: homeColour,
				away_color: awayColour,
				home_roster: JSON.stringify(homeTeam.Players.items),
				away_roster: JSON.stringify(awayTeam.Players.items),
				home_score: 0,
				away_score: 0,
				goals: [],
				round: 1,
				referees: refereeUsernames,
				gameHomeTeamId: homeTeam.id,
				gameAwayTeamId: awayTeam.id,
			};
			//console.log(matchData);
			const apiData = await API.graphql({
				query: createGame,
				variables: { input: matchData },
			});
			//console.log('New Game', apiData);
			setMessage({ status: 'success', message: 'Game created successfully' });
			setUiState('send-emails');
			// router.reload();
		} catch (error) {
			console.error(error);
			setMessage({ status: 'error', message: error.message });
		}
	};

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

	if (!isVisible) return;

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
										Create New Match
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
									{/**Home Team */}
									<div className="w-full">
										<div
											onClick={(e) => setOpenHomeTeamDrop(!openHomeTeamDrop)}
										>
											<label
												htmlFor="hometeam"
												className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
											>
												Home Team
											</label>
											{homeTeam && <TeamCardSelected team={homeTeam} />}
											{!homeTeam && (
												<div
													type="text"
													id="hometeam"
													class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer py-5"
													placeholder=""
													required
												/>
											)}
										</div>
									</div>
									{openHomeTeamDrop && (
										<TeamDropDown
											setState={setHomeTeam}
											setOpenDropDown={setOpenHomeTeamDrop}
										/>
									)}
									{/**Home Team Jersey*/}
									<div className="w-1/2">
										<label
											htmlFor="home-team-jersey"
											className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
										>
											Home Team Jersey Colour
										</label>
										<div className="flex gap-1">
											<div
												style={{ backgroundColor: homeColour }}
												className={`w-[3rem] border-[1.5px] border-black`}
											/>
											<div className="w-full">
												<DropdownInput
													options={[
														'Red',
														'Green',
														'Blue',
														'Yellow',
														'Black',
														'White',
													]}
													value={homeColour}
													setValue={setHomeColour}
												/>
											</div>
										</div>
									</div>
									{/**Away Team */}
									<div className="w-full">
										<div
											onClick={(e) => setOpenAwayTeamDrop(!openAwayTeamDrop)}
										>
											<label
												htmlFor="awayteam"
												className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
											>
												Away Team
											</label>
											{awayTeam && <TeamCardSelected team={awayTeam} />}
											{!awayTeam && (
												<div
													type="text"
													id="awayteam"
													className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer py-5"
													placeholder=""
													required
												/>
											)}
										</div>
									</div>
									{openAwayTeamDrop && (
										<TeamDropDown
											setState={setAwayTeam}
											setOpenDropDown={setOpenAwayTeamDrop}
										/>
									)}
									{/**Away Team Jersey */}
									<div className="w-1/2">
										<label
											htmlFor="email"
											className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
										>
											Away Team Jersey Colour
										</label>
										<div className="flex gap-1">
											<div
												style={{ backgroundColor: awayColour }}
												className={`w-[3rem] border-[1.5px] border-black`}
											/>
											<div className="w-full">
												<DropdownInput
													options={[
														'Red',
														'Green',
														'Blue',
														'Yellow',
														'Black',
														'White',
													]}
													value={awayColour}
													setValue={setAwayColour}
													// setValue={(color) => convertColorsDisplay(color, setHomeColour, setHomeDisplayColour)}
												/>
											</div>
										</div>
									</div>

									{/**Referee */}
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
												for="startTime"
												className="block mt-2 mb-1 text-sm font-medium text-gray-900 dark:text-white"
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
											createNewMatch(e);
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
						onClick={(e) => setIsVisible(false)}
						className="z-[150] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
					/>
				</>
			)}
			{uiState === 'send-emails' && (
				<>
					<div
						tabIndex="-1"
						className="z-[200] w-[32rem] fixed top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-50 p-4 overflow-x-hidden overflow-y-auto "
					>
						<div className="relative h-full md:h-auto">
							<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
								<button
									onClick={(e) => {
										e.stopPropagation();
										setOpenModal(false);
										router.reload();
									}}
									type="button"
									className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
									data-modal-hide="popup-modal"
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
								<div className="p-6 text-center">
									<svg
										aria-hidden="true"
										className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
										></path>
									</svg>
									<h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
										A game has been successfully created!
									</h3>
									<p className="mb-5 text-lg font-bold text-gray-500 dark:text-gray-400">
										Would you like to send everyone a email of the game
										schedule?
									</p>

									<button
										onClick={(e) => {
											e.stopPropagation();
											setIsVisible(false);
											router.reload();
										}}
										data-modal-hide="popup-modal"
										type="button"
										class="text-gray-900 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 border"
									>
										No thanks
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation();
											setIsVisible(false);
											sendEmails();
										}}
										data-modal-hide="popup-modal"
										type="button"
										className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
									>
										Yes, send emails to everyone
									</button>
								</div>
							</div>
						</div>
					</div>
					<div
						onClick={(e) => {
							setIsVisible(false);
							router.reload();
						}}
						className="z-[150] opacity-70 bg-gray-500 fixed top-0 left-0 w-[100%] h-[100%]"
					/>
				</>
			)}
		</>
	);
};

export default CreateMatchModal;
